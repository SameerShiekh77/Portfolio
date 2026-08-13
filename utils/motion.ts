export const duration = {
  fast: 0.15,
  base: 0.3,
  slow: 0.5,
  slower: 0.8,
} as const

export const ease = {
  expoOut: [0.16, 1, 0.3, 1] as [number, number, number, number],
  premium: [0.22, 1, 0.36, 1] as [number, number, number, number],
}

export const easeCss = {
  expoOut: 'cubic-bezier(0.16, 1, 0.3, 1)',
  premium: 'cubic-bezier(0.22, 1, 0.36, 1)',
}

/**
 * GSAP parses eases by name, not as cubic-bezier arrays - handing it `ease.expoOut`
 * silently falls back to the default curve. These are the GSAP-native equivalents of
 * the bezier tokens above; use them for anything driven by gsap/ScrollTrigger.
 */
export const easeGsap = {
  expoOut: 'expo.out',
  premium: 'power4.out',
}

export const stagger = {
  tight: 0.06,
  base: 0.08,
  loose: 0.1,
}

export const springs = {
  snappy: { type: 'spring', stiffness: 400, damping: 28 } as const,
  gentle: { type: 'spring', stiffness: 220, damping: 24 } as const,
  cursor: { type: 'spring', stiffness: 600, damping: 40, mass: 0.4 } as const,
}
