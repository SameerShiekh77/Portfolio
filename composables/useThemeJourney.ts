import { ref } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { journeyStart, journeyEnd, parseColor, mixColor, smoothstep, clamp01, type Rgba } from '../utils/palette'
import { useReducedMotion } from './useReducedMotion'

/** Live 0..1 journey progress — the drone and pipeline rail read this too. */
export const journeyProgress = ref(0)

interface Stop {
  prop: string
  from: Rgba
  to: Rgba
}

const stops: Stop[] = Object.keys(journeyStart).map((prop) => ({
  prop,
  from: parseColor(journeyStart[prop]!),
  to: parseColor(journeyEnd[prop]!),
}))

/**
 * Drives the page's warm-sand -> cream transition by lerping design tokens on :root.
 *
 * Both endpoints are light and share the same ink, so every token can ride one curve —
 * there is no luminance crossover where text would lose contrast against its backdrop.
 */
export const useThemeJourney = () => {
  const { prefersReduced } = useReducedMotion()
  let trigger: ScrollTrigger | null = null
  let lastApplied = -1

  const apply = (raw: number) => {
    // S-curve: hold the opening tone, move through the middle, settle on cream.
    const t = smoothstep(clamp01(raw), 0.28, 0.88)
    if (Math.abs(t - lastApplied) < 0.002) return
    lastApplied = t
    journeyProgress.value = t

    const root = document.documentElement
    for (const stop of stops) {
      root.style.setProperty(stop.prop, mixColor(stop.from, stop.to, t))
    }
    root.style.setProperty('--journey', t.toFixed(3))
  }

  const init = () => {
    // A scroll-linked colour shift is the kind of effect reduced-motion users opt out of —
    // hold the page on its opening tone instead.
    if (prefersReduced.value) return

    gsap.registerPlugin(ScrollTrigger)
    trigger = ScrollTrigger.create({
      start: 0,
      end: 'max',
      onUpdate: (self) => apply(self.progress),
    })
    apply(0)
  }

  const destroy = () => {
    trigger?.kill()
    trigger = null
  }

  return { init, destroy, journeyProgress }
}
