<template>
  <div v-if="enabled" aria-hidden="true" class="pointer-events-none fixed inset-0 z-90">
    <div
      ref="dotEl"
      class="fixed top-0 left-0 w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-[var(--color-accent-clay-light)] transition-opacity duration-200"
      :style="{ opacity: visible ? 1 : 0 }"
    />
    <div
      ref="ringEl"
      class="fixed top-0 left-0 w-9 h-9 -ml-[18px] -mt-[18px] rounded-full border transition-[opacity,border-color,background-color] duration-200"
      :class="hovering ? 'border-[var(--color-accent-clay-light)] bg-[var(--color-accent-clay-light)]/10' : 'border-[var(--color-border-strong)]'"
      :style="{ opacity: visible ? 1 : 0 }"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { animate } from 'motion'
import { useReducedMotion } from '../../composables/useReducedMotion'
import { springs } from '../../utils/motion'

const dotEl = ref<HTMLElement | null>(null)
const ringEl = ref<HTMLElement | null>(null)
const enabled = ref(false)
const visible = ref(false)
const hovering = ref(false)

const { prefersReduced } = useReducedMotion()

const INTERACTIVE_SELECTOR = 'a, button, input, textarea, select, [role="button"], [data-cursor-hover]'

const onMove = (e: MouseEvent) => {
  visible.value = true
  if (dotEl.value) {
    dotEl.value.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`
  }
  if (ringEl.value) {
    animate(ringEl.value, { x: e.clientX, y: e.clientY }, springs.cursor)
  }
}

const onLeave = () => {
  visible.value = false
}

const onOver = (e: MouseEvent) => {
  hovering.value = Boolean((e.target as HTMLElement)?.closest(INTERACTIVE_SELECTOR))
}

onMounted(() => {
  if (prefersReduced.value) return
  enabled.value = window.matchMedia('(hover: hover) and (pointer: fine)').matches
  if (!enabled.value) return

  window.addEventListener('mousemove', onMove, { passive: true })
  window.addEventListener('mouseover', onOver, { passive: true })
  document.addEventListener('mouseleave', onLeave)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', onMove)
  window.removeEventListener('mouseover', onOver)
  document.removeEventListener('mouseleave', onLeave)
})
</script>
