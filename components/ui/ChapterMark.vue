<template>
  <!-- Renders a section as a numbered beat of the deploy narrative: "04 / 10 - Dependencies". -->
  <p v-if="chapter" class="chapter-mark" :class="align === 'center' ? 'justify-center' : ''">
    <span class="chapter-mark__index">{{ chapter.index }}</span>
    <span class="chapter-mark__rule" aria-hidden="true" />
    <span>{{ label ?? chapter.label }}</span>
  </p>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pipelineStages } from '../../data/pipeline'

const props = withDefaults(
  defineProps<{
    /** Pipeline stage id from data/pipeline.ts. */
    stage: string
    /** Overrides the stage label when a section needs bespoke wording. */
    label?: string
    align?: 'center' | 'left'
  }>(),
  { align: 'left' }
)

const chapter = computed(() => {
  const i = pipelineStages.findIndex((s) => s.id === props.stage)
  if (i < 0) return null
  return {
    index: `${String(i + 1).padStart(2, '0')} / ${String(pipelineStages.length).padStart(2, '0')}`,
    label: pipelineStages[i]!.label,
  }
})
</script>
