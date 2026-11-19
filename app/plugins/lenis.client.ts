import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export default defineNuxtPlugin(() => {
  gsap.registerPlugin(ScrollTrigger)

  // Trigger offsets are measured once, but web fonts and late images change element
  // heights after that — leaving every ScrollTrigger on the page firing at the wrong
  // scroll position. Recompute once each of those has settled.
  document.fonts?.ready.then(() => ScrollTrigger.refresh())
  window.addEventListener('load', () => ScrollTrigger.refresh(), { once: true })

  const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  let lenis: Lenis | null = null

  if (!prefersReduced) {
    lenis = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    })

    lenis.on('scroll', ScrollTrigger.update)

    gsap.ticker.add((time) => {
      lenis!.raf(time * 1000)
    })
    gsap.ticker.lagSmoothing(0)

    document.documentElement.classList.add('lenis', 'lenis-smooth')

    // Anchor links (nav, footer) should route through Lenis so the smoothing applies.
    document.addEventListener('click', (e) => {
      const anchor = (e.target as HTMLElement)?.closest('a[href^="#"]')
      if (!anchor) return
      const id = anchor.getAttribute('href')?.slice(1)
      if (!id) return
      const target = document.getElementById(id)
      if (!target) return
      e.preventDefault()
      lenis?.scrollTo(target, { offset: -80 })
    })
  }

  return {
    provide: {
      lenis,
    },
  }
})
