<template>
  <div
    class="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] font-mono text-[11px]"
  >
    <span class="w-1.5 h-1.5 rounded-full bg-[var(--color-accent-olive)]" aria-hidden="true" />
    <span class="text-[var(--color-text-muted)]">{{ index }}</span>
    <span class="text-[var(--color-accent-olive)]" aria-hidden="true">$</span>
    <span class="text-[var(--color-text-secondary)] tracking-wide">{{ command }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { pipelineStages } from '../../data/pipeline'

const props = defineProps<{ stage: string; label?: string }>()

const index = computed(() => {
  const i = pipelineStages.findIndex((s) => s.id === props.stage)
  return `${String(i + 1).padStart(2, '0')}/${pipelineStages.length}`
})
const command = computed(
  () => props.label ?? pipelineStages.find((s) => s.id === props.stage)?.command ?? ''
)
</script>
