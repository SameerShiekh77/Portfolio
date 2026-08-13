import { ref } from 'vue'

const prefersReduced = ref(false)
let initialized = false

/** Single source of truth for `prefers-reduced-motion`, consumed by Lenis, GSAP, Motion One, and the loader. */
export const useReducedMotion = () => {
  if (!initialized && import.meta.client) {
    initialized = true
    const mql = window.matchMedia('(prefers-reduced-motion: reduce)')
    prefersReduced.value = mql.matches
    mql.addEventListener('change', (e) => {
      prefersReduced.value = e.matches
    })
  }

  return { prefersReduced }
}
