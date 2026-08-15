<template>
  <Transition name="loader-fade" @after-leave="$emit('complete')">
    <!-- The inline style duplicates the utility classes on purpose. This element is in the
         SSR HTML, so on a cold load it paints before the stylesheet arrives - with classes
         alone it laid out as plain inline text and the raw page showed through. Inline
         styles need no stylesheet, so the very first paint is already the sand panel. -->
    <div
      v-if="visible"
      class="fixed inset-0 z-100 flex flex-col items-center justify-center bg-[var(--color-bg-base)]"
      style="position: fixed; inset: 0; z-index: 100; display: flex; flex-direction: column; align-items: center; justify-content: center; background: #ede7dc"
      role="status"
      aria-live="polite"
      aria-label="Loading portfolio"
    >
      <div class="absolute inset-0 noise-overlay opacity-[0.03] pointer-events-none" />
      <div class="absolute inset-0 pointer-events-none" style="background: radial-gradient(circle at 50% 45%, rgba(176,96,58,0.12) 0%, transparent 60%)" />

      <!-- markEl is left empty for Lottie to own. It previously also held the fallback
           spinner as a v-if child, so when lottieReady flipped Vue patched a container
           whose children Lottie had replaced — the render threw and this whole overlay
           froze on screen permanently. Vue-managed nodes stay siblings, never children. -->
      <div class="relative w-28 h-28 sm:w-36 sm:h-36">
        <div ref="markEl" class="absolute inset-0" />
        <div v-if="!lottieReady" class="absolute inset-0 rounded-full border-2 border-[var(--color-border-subtle)] border-t-[var(--color-accent-clay-light)] animate-spin" />
      </div>

      <div class="mt-8 h-6 font-mono text-sm text-[var(--color-text-secondary)] tracking-wide" aria-hidden="true">
        {{ currentLine }}<span class="text-[var(--color-accent-clay-ink)]">_</span>
      </div>

      <div class="mt-6 w-48 h-0.5 rounded-full bg-[var(--color-surface-1)] overflow-hidden">
        <div class="h-full rounded-full" :style="{ width: progress + '%', background: 'var(--gradient-primary, linear-gradient(90deg, #a04e2e, #b0603a, #8f6a45))', transition: 'width 0.2s linear' }" />
      </div>
    </div>
  </Transition>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useReducedMotion } from '../../composables/useReducedMotion'
import { useLenis } from '../../composables/useLenis'

defineEmits<{ complete: [] }>()

const STORAGE_KEY = 'ms-portfolio-booted'

const visible = ref(true)
const lottieReady = ref(false)
const progress = ref(0)
const currentLine = ref('')
const markEl = ref<HTMLElement | null>(null)

const bootLines = [
  'Booting infrastructure…',
  'Loading services…',
  'Provisioning containers…',
  'Containers started.',
  'Deployment successful.',
]

const { prefersReduced } = useReducedMotion()

// Resolved during setup, not inside the async mounted hook: useNuxtApp() must run while
// the Nuxt instance is active, and a throw inside an async hook is swallowed as an
// unhandled rejection — which left this full-screen overlay covering the entire site.
const lenis = useLenis()

const typeLine = (text: string, speed = 22) =>
  new Promise<void>((resolve) => {
    let i = 0
    currentLine.value = ''
    const tick = () => {
      currentLine.value = text.slice(0, i)
      i++
      if (i <= text.length) {
        setTimeout(tick, speed)
      } else {
        resolve()
      }
    }
    tick()
  })

const dismiss = () => {
  if (!visible.value) return
  visible.value = false
  document.body.style.overflow = ''
  lenis?.start()
  try {
    sessionStorage.setItem(STORAGE_KEY, '1')
  } catch {
    // sessionStorage unavailable (private mode) - non-fatal, loader just replays next time
  }
}

onMounted(async () => {
  let alreadyBooted = false
  try {
    alreadyBooted = sessionStorage.getItem(STORAGE_KEY) === '1'
  } catch {
    alreadyBooted = false
  }

  if (alreadyBooted || prefersReduced.value) {
    dismiss()
    return
  }

  lenis?.stop()
  document.body.style.overflow = 'hidden'

  // Hard ceiling. Nothing in a decorative boot sequence justifies holding the page
  // hostage, so the overlay always leaves on its own even if the sequence below stalls.
  const failsafe = setTimeout(dismiss, 5000)

  const progressTimer = setInterval(() => {
    progress.value = Math.min(96, progress.value + Math.random() * 14)
  }, 140)

  if (markEl.value) {
    try {
      const lottie = (await import('lottie-web')).default
      const anim = lottie.loadAnimation({
        container: markEl.value,
        renderer: 'svg',
        loop: true,
        autoplay: true,
        path: '/lottie/loader-mark.json',
      })
      anim.addEventListener('DOMLoaded', () => {
        lottieReady.value = true
      })
      anim.addEventListener('data_failed', () => {
        lottieReady.value = false
      })
    } catch {
      lottieReady.value = false
    }
  }

  try {
    for (const line of bootLines) {
      // eslint-disable-next-line no-await-in-loop
      await typeLine(line)
      // eslint-disable-next-line no-await-in-loop
      await new Promise((r) => setTimeout(r, 130))
    }

    progress.value = 100
    await new Promise((r) => setTimeout(r, 220))
  } finally {
    clearInterval(progressTimer)
    clearTimeout(failsafe)
    dismiss()
  }
})
</script>

<style scoped>
.loader-fade-enter-active {
  transition: none;
}
.loader-fade-leave-active {
  transition: opacity 0.5s var(--ease-expo-out, cubic-bezier(0.16, 1, 0.3, 1));
}
.loader-fade-leave-to {
  opacity: 0;
}
</style>
