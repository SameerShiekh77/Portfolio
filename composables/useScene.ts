import { reactive } from 'vue'

/**
 * Shared, non-reactive-ish state the 3D scene reads every frame.
 * `reactive` is fine here: the render loop only reads, and writers are scroll/pointer handlers.
 */
export const sceneState = reactive({
  /** 0..1 progress through the whole page. */
  progress: 0,
  /** Pointer position, -1..1 on both axes. */
  pointerX: 0,
  pointerY: 0,
})
