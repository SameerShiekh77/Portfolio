<template>
  <div class="scene" :class="{ 'scene-on': ready }" aria-hidden="true">
    <TresCanvas v-if="ready" alpha clear-color="#00000000" :dpr="[1, 1.75]" power-preference="high-performance" render-mode="always" :tone-mapping="ACESFilmicToneMapping" :tone-mapping-exposure="1.05">
      <SceneContent :density="density" />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ACESFilmicToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import SceneContent from './SceneContent.vue'
import { sceneState } from '../../composables/useScene'
import { useReducedMotion } from '../../composables/useReducedMotion'

const ready = ref(false)
const density = ref(150)
const { prefersReduced } = useReducedMotion()

const onPointer = (e: PointerEvent) => {
  sceneState.pointerX = (e.clientX / window.innerWidth - 0.5) * 2
  sceneState.pointerY = (e.clientY / window.innerHeight - 0.5) * 2
}

const webglAvailable = () => {
  try {
    const c = document.createElement('canvas')
    return !!(c.getContext('webgl2') || c.getContext('webgl'))
  } catch {
    return false
  }
}

onMounted(() => {
  // Reduced motion and no-WebGL both fall back to the static gradient behind the scene.
  if (prefersReduced.value || !webglAvailable()) return
  const small = window.innerWidth < 768
  density.value = small ? 60 : 110
  window.addEventListener('pointermove', onPointer, { passive: true })

  // Keep three.js off the critical path: the hero text paints first, the scene arrives when idle.
  const start = () => (ready.value = true)
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1200 })
  else setTimeout(start, 400)
})

onBeforeUnmount(() => window.removeEventListener('pointermove', onPointer))
</script>

<style scoped>
.scene {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.4s var(--ease-out);
}
.scene-on {
  opacity: 1;
}
@media (max-width: 899px) {
  .scene-on {
    opacity: 0.38;
  }
}
.scene :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
