<template>
  <section id="architecture" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="architecture-heading">
    <div class="container mx-auto px-6 lg:px-12">
      <SectionHeader
        title-id="architecture-heading"
        stage="infrastructure"
        title="How I Architect Systems"
        accent="Architect"
        subtitle="The same request pipeline shows up, in shape, across almost every platform I've built."
      />

      <div ref="diagramEl" class="relative max-w-6xl mx-auto">
        <div class="grid grid-cols-1 lg:grid-cols-5 gap-8 lg:gap-0">
          <template v-for="(tier, ti) in architectureTiers" :key="tier.id">
            <div class="relative flex flex-col items-center gap-4 lg:px-4">
              <span class="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">{{ tier.title }}</span>

              <div class="flex flex-col gap-3 w-full">
                <div
                  v-for="node in tier.nodes"
                  :key="node.id"
                  class="node-card relative rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] px-4 py-4 text-center hover:border-[var(--color-border-hover)] transition-colors duration-300"
                >
                  <span class="w-9 h-9 rounded-xl flex items-center justify-center mx-auto mb-2 bg-[var(--color-accent-olive)]/10 border border-[var(--color-accent-olive)]/25">
                    <DynamicIcon :name="node.icon" class="w-4 h-4 text-[var(--color-accent-olive)]" />
                  </span>
                  <div class="text-sm font-bold text-[var(--color-text-primary)]">{{ node.label }}</div>
                  <div class="text-[11px] text-[var(--color-text-muted)] mt-1 leading-snug">{{ node.detail }}</div>
                </div>
              </div>
            </div>

            <div v-if="ti < architectureTiers.length - 1" class="hidden lg:flex items-center justify-center relative" aria-hidden="true">
              <div class="connector-line w-full h-px bg-[var(--color-surface-2)] relative overflow-visible">
                <span v-for="n in 3" :key="n" class="flow-dot absolute top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full" :style="{ background: 'var(--color-accent-clay-light)', animationDelay: `${n * 0.6}s` }" />
              </div>
            </div>
          </template>
        </div>
      </div>

      <div class="max-w-4xl mx-auto mt-20">
        <h3 class="text-center text-sm font-mono uppercase tracking-widest text-[var(--color-text-muted)] mb-8">Deployment Flow</h3>
        <div ref="flowEl" class="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-0">
          <template v-for="(step, i) in deploymentFlow" :key="step.step">
            <div class="flex-1 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-5 text-center">
              <div class="text-xs font-mono text-[var(--color-accent-clay-ink)] mb-1">{{ String(i + 1).padStart(2, '0') }}</div>
              <div class="font-bold text-[var(--color-text-primary)] text-sm">{{ step.step }}</div>
              <div class="text-xs text-[var(--color-text-muted)] mt-1">{{ step.detail }}</div>
            </div>
            <div v-if="i < deploymentFlow.length - 1" class="hidden sm:flex items-center justify-center px-2" aria-hidden="true">
              <ChevronRight class="w-4 h-4 text-[var(--color-text-muted)]" />
            </div>
          </template>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ChevronRight } from '@lucide/vue'
import SectionHeader from '../ui/SectionHeader.vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import { architectureTiers, deploymentFlow } from '../../data/architecture'
import { useScrollReveal } from '../../composables/useScrollReveal'

const diagramEl = ref<HTMLElement | null>(null)
const flowEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()

onMounted(() => {
  if (diagramEl.value) {
    reveal(Array.from(diagramEl.value.querySelectorAll('.node-card')), { y: 20, stagger: 0.05, start: 'top 85%' })
  }
  if (flowEl.value) {
    reveal(Array.from(flowEl.value.children).filter((el) => el.classList.contains('flex-1')), { y: 16, stagger: 0.08, start: 'top 90%' })
  }
})
</script>

<style scoped>
@keyframes flow {
  0% {
    left: 0%;
    opacity: 0;
  }
  10% {
    opacity: 1;
  }
  90% {
    opacity: 1;
  }
  100% {
    left: 100%;
    opacity: 0;
  }
}

.flow-dot {
  left: 0%;
  animation: flow 2.4s linear infinite;
  box-shadow: 0 0 8px var(--color-accent-clay-light);
}

@media (prefers-reduced-motion: reduce) {
  .flow-dot {
    animation: none;
    opacity: 0.6;
  }
}
</style>
