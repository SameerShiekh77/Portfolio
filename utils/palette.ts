/**
 * The two endpoints of the scroll journey. useThemeJourney lerps between them and
 * writes the result onto :root, so every token-driven component shifts together.
 *
 * The page is light end-to-end: it opens on a warm sand and settles on a bright cream,
 * so the "deploy going live" beat reads as the room brightening rather than a hard
 * dark/light inversion. Ink is identical at both ends — with both surfaces light there
 * is no crossover to manage, so text contrast stays above 10:1 the whole way down.
 */
export const journeyStart: Record<string, string> = {
  '--color-bg-base': '#ede7dc',
  '--color-surface-1': 'rgba(42, 38, 33, 0.035)',
  '--color-surface-2': 'rgba(42, 38, 33, 0.065)',
  '--color-surface-3': 'rgba(42, 38, 33, 0.10)',
  '--color-border-subtle': 'rgba(42, 38, 33, 0.12)',
  '--color-border-strong': 'rgba(42, 38, 33, 0.22)',
  '--color-border-hover': 'rgba(176, 96, 58, 0.50)',
  '--color-text-primary': '#2a2621',
  '--color-text-secondary': '#5c5449',
  '--color-text-muted': '#6e6558',
  '--color-accent-clay': '#b0603a',
  '--color-accent-clay-light': '#c87b52',
  '--color-accent-clay-ink': '#9b5433',
  '--color-accent-bronze': '#9a7b4f',
  '--color-accent-olive': '#5f6b4e',
  '--color-accent-gold': '#a8752f',
  '--color-accent-gold-ink': '#8a6027',
  '--color-accent-sage': '#6b7f5e',
}

export const journeyEnd: Record<string, string> = {
  '--color-bg-base': '#fbf9f5',
  '--color-surface-1': 'rgba(42, 38, 33, 0.030)',
  '--color-surface-2': 'rgba(42, 38, 33, 0.055)',
  '--color-surface-3': 'rgba(42, 38, 33, 0.09)',
  '--color-border-subtle': 'rgba(42, 38, 33, 0.10)',
  '--color-border-strong': 'rgba(42, 38, 33, 0.20)',
  '--color-border-hover': 'rgba(176, 96, 58, 0.50)',
  '--color-text-primary': '#2a2621',
  '--color-text-secondary': '#5c5449',
  '--color-text-muted': '#6e6558',
  '--color-accent-clay': '#b0603a',
  '--color-accent-clay-light': '#c87b52',
  '--color-accent-clay-ink': '#9b5433',
  '--color-accent-bronze': '#9a7b4f',
  '--color-accent-olive': '#5f6b4e',
  '--color-accent-gold': '#a8752f',
  '--color-accent-gold-ink': '#8a6027',
  '--color-accent-sage': '#6b7f5e',
}

export type Rgba = [number, number, number, number]

export const parseColor = (input: string): Rgba => {
  const value = input.trim()

  if (value.startsWith('#')) {
    const hex = value.slice(1)
    const full = hex.length === 3 ? hex.split('').map((c) => c + c).join('') : hex
    return [
      parseInt(full.slice(0, 2), 16),
      parseInt(full.slice(2, 4), 16),
      parseInt(full.slice(4, 6), 16),
      1,
    ]
  }

  const parts = value.replace(/rgba?\(|\)/g, '').split(',').map((n) => parseFloat(n))
  return [parts[0] ?? 0, parts[1] ?? 0, parts[2] ?? 0, parts[3] ?? 1]
}

const lerp = (a: number, b: number, t: number) => a + (b - a) * t

export const clamp01 = (n: number) => Math.min(Math.max(n, 0), 1)

/** Smooth 0..1 ramp between two edges — gives the journey an S-curve rather than a flat ramp. */
export const smoothstep = (value: number, edge0: number, edge1: number) => {
  const t = clamp01((value - edge0) / (edge1 - edge0))
  return t * t * (3 - 2 * t)
}

/** WCAG relative luminance — used by the contrast checks in the verification script. */
export const relativeLuminance = ([r, g, b]: Rgba): number => {
  const channel = (v: number) => {
    const s = v / 255
    return s <= 0.03928 ? s / 12.92 : Math.pow((s + 0.055) / 1.055, 2.4)
  }
  return 0.2126 * channel(r) + 0.7152 * channel(g) + 0.0722 * channel(b)
}

export const toCss = ([r, g, b, a]: Rgba): string =>
  a >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`

export const mixColor = (from: Rgba, to: Rgba, t: number): string => {
  const r = Math.round(lerp(from[0], to[0], t))
  const g = Math.round(lerp(from[1], to[1], t))
  const b = Math.round(lerp(from[2], to[2], t))
  const a = Number(lerp(from[3], to[3], t).toFixed(3))
  return a >= 1 ? `rgb(${r}, ${g}, ${b})` : `rgba(${r}, ${g}, ${b}, ${a})`
}
