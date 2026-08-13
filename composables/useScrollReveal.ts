import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from './useReducedMotion'
import { duration, easeGsap } from '../utils/motion'

if (import.meta.client) {
  gsap.registerPlugin(ScrollTrigger)
}

export interface RevealOptions {
  y?: number
  x?: number
  opacity?: number
  scale?: number
  duration?: number
  delay?: number
  stagger?: number
  start?: string
  trigger?: gsap.DOMTarget
}

/**
 * GSAP + ScrollTrigger reveal helper. Call from `onMounted` only (never during SSR setup) -
 * consuming components own their own ScrollTrigger instances and are responsible for
 * `.kill()`-ing them in `onUnmounted` if the component can unmount while the page is alive.
 */
export const useScrollReveal = () => {
  const { prefersReduced } = useReducedMotion()

  const reveal = (target: gsap.TweenTarget, opts: RevealOptions = {}) => {
    if (!target) return null

    if (prefersReduced.value) {
      gsap.set(target, { opacity: 1, x: 0, y: 0, scale: 1 })
      return null
    }

    return gsap.fromTo(
      target,
      {
        opacity: opts.opacity ?? 0,
        y: opts.y ?? 32,
        x: opts.x ?? 0,
        scale: opts.scale ?? 1,
      },
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        duration: opts.duration ?? duration.slower,
        delay: opts.delay ?? 0,
        stagger: opts.stagger ?? 0,
        ease: easeGsap.expoOut,
        scrollTrigger: {
          trigger: opts.trigger ?? (target as gsap.DOMTarget),
          start: opts.start ?? 'top 85%',
          once: true,
        },
      }
    )
  }

  return { reveal, gsap, ScrollTrigger, prefersReduced }
}
