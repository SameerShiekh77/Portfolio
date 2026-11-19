import { ref } from 'vue'

export type Theme = 'dark' | 'light'

/** Module-level so every component shares one value. Dark is the default. */
export const theme = ref<Theme>('dark')

const apply = (t: Theme) => {
  theme.value = t
  document.documentElement.dataset.theme = t
  const meta = document.querySelector('meta[name="theme-color"]')
  meta?.setAttribute('content', t === 'dark' ? '#0a0710' : '#fbf4ec')
}

export const initTheme = () => {
  const current = document.documentElement.dataset.theme
  theme.value = current === 'light' ? 'light' : 'dark'
}

export const toggleTheme = () => {
  const next: Theme = theme.value === 'dark' ? 'light' : 'dark'
  apply(next)
  try {
    localStorage.setItem('theme', next)
  } catch {
    /* storage blocked: the choice simply won't persist */
  }
}
