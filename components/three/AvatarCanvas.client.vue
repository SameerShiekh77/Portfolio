<template>
  <div class="avatar-layer" :class="{ on: ready }" aria-hidden="true">
    <TresCanvas v-if="ready" alpha clear-color="#00000000" :dpr="[1, 1.75]" power-preference="high-performance" :tone-mapping="ACESFilmicToneMapping" :tone-mapping-exposure="1.05">
      <TresPerspectiveCamera :position="[0, 0, 9]" :fov="40" :near="0.1" :far="40" />
      <AvatarModel />
    </TresCanvas>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { ACESFilmicToneMapping } from 'three'
import { TresCanvas } from '@tresjs/core'
import AvatarModel from './AvatarModel.vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const ready = ref(false)
const { prefersReduced } = useReducedMotion()

onMounted(() => {
  if (prefersReduced.value) return
  try {
    const c = document.createElement('canvas')
    if (!(c.getContext('webgl2') || c.getContext('webgl'))) return
  } catch {
    return
  }
  const start = () => (ready.value = true)
  if ('requestIdleCallback' in window) window.requestIdleCallback(start, { timeout: 1000 })
  else setTimeout(start, 300)
})
</script>

<style scoped>
/* Behind the page content, so the headline always reads over the face. On narrow screens it is dimmed. */
.avatar-layer {
  position: fixed;
  inset: 0;
  z-index: 1;
  pointer-events: none;
  opacity: 0;
  transition: opacity 1.2s var(--ease-out);
}
.avatar-layer.on {
  opacity: 0.4;
}
@media (min-width: 1024px) {
  .avatar-layer.on {
    opacity: 1;
  }
}
.avatar-layer :deep(canvas) {
  width: 100% !important;
  height: 100% !important;
}
</style>
