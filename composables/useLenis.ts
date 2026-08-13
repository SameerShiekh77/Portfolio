import type Lenis from 'lenis'

/** Returns the app-wide Lenis instance, or null under prefers-reduced-motion (native scroll). */
export const useLenis = (): Lenis | null => {
  const { $lenis } = useNuxtApp()
  return ($lenis as Lenis | null) ?? null
}

export const scrollToSection = (id: string, offset = -80) => {
  const lenis = useLenis()
  const target = document.getElementById(id)
  if (!target) return

  if (lenis) {
    lenis.scrollTo(target, { offset })
  } else {
    target.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }
}
