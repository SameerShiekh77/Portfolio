<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="project"
        class="fixed inset-0 z-100 flex items-start sm:items-center justify-center p-4 sm:p-8 overflow-y-auto"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`case-study-title`"
        @click.self="close"
        @keydown.esc="close"
      >
        <div class="absolute inset-0 bg-[#2a2621]/55 backdrop-blur-sm" aria-hidden="true" />

        <div
          ref="dialogEl"
          tabindex="-1"
          class="relative w-full max-w-3xl my-8 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] shadow-2xl"
        >
          <button
            type="button"
            class="absolute top-4 right-4 sm:top-6 sm:right-6 w-10 h-10 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors z-10"
            aria-label="Close case study"
            @click="close"
          >
            <X class="w-5 h-5" />
          </button>

          <div class="p-7 sm:p-10">
            <div class="flex items-center gap-2 mb-4">
              <span
                class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full"
                :class="project.status === 'Live' ? 'text-emerald-400 border border-emerald-500/30 bg-emerald-500/10' : 'text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]'"
              >
                <span v-if="project.status === 'Live'" class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                {{ project.status === 'Live' ? 'Live in Production' : 'Internal / Private' }}
              </span>
            </div>

            <h3 id="case-study-title" class="text-2xl sm:text-3xl font-black text-[var(--color-text-primary)] mb-2">{{ project.title }}</h3>
            <p class="text-[var(--color-text-secondary)] text-base mb-8">{{ project.tagline }}</p>

            <div v-if="project.screenshots.length" class="grid grid-cols-2 gap-3 mb-8">
              <div v-for="(src, i) in project.screenshots" :key="src" class="rounded-2xl overflow-hidden border border-[var(--color-border-subtle)]" :class="i === 0 ? 'col-span-2' : ''">
                <NuxtImg :src="src" :alt="`${project.title} screenshot ${i + 1}`" width="800" height="500" loading="lazy" class="w-full h-auto object-cover" />
              </div>
            </div>

            <div class="grid grid-cols-3 gap-4 mb-8 p-5 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)]">
              <div v-for="m in project.metrics" :key="m.label" class="text-center">
                <div class="text-lg sm:text-xl font-bold text-[var(--color-accent-clay-ink)]">{{ m.value }}</div>
                <div class="text-[11px] text-[var(--color-text-muted)] mt-0.5">{{ m.label }}</div>
              </div>
            </div>

            <dl class="space-y-6">
              <div v-for="block in blocks" :key="block.label">
                <dt class="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-olive)] mb-2">{{ block.label }}</dt>
                <dd class="text-[var(--color-text-primary)] text-sm sm:text-base leading-relaxed">{{ block.value }}</dd>
              </div>

              <div>
                <dt class="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-olive)] mb-2">Impact</dt>
                <dd>
                  <ul class="space-y-1.5">
                    <li v-for="line in project.impact" :key="line" class="flex items-start gap-2 text-sm text-[var(--color-text-primary)]">
                      <span class="w-1 h-1 rounded-full bg-[var(--color-accent-clay-light)] mt-2 shrink-0" />
                      {{ line }}
                    </li>
                  </ul>
                </dd>
              </div>

              <div class="grid grid-cols-2 gap-6">
                <div>
                  <dt class="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-olive)] mb-2">Deployment</dt>
                  <dd class="text-sm text-[var(--color-text-secondary)]">{{ project.deployment }}</dd>
                </div>
                <div>
                  <dt class="text-xs font-mono uppercase tracking-widest text-[var(--color-accent-olive)] mb-2">Scalability</dt>
                  <dd class="text-sm text-[var(--color-text-secondary)]">{{ project.scalability }}</dd>
                </div>
              </div>
            </dl>

            <div class="flex flex-wrap gap-2 mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
              <span v-for="tech in project.technologies" :key="tech" class="px-3 py-1 rounded-lg text-xs text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)]">{{ tech }}</span>
            </div>

            <div v-if="project.liveUrl" class="mt-8">
              <a
                :href="project.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-white transition-transform duration-300 hover:scale-105"
                style="background: var(--gradient-primary)"
              >
                Visit Live Site
                <ExternalLink class="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import { computed, ref, watch, nextTick } from 'vue'
import { X, ExternalLink } from '@lucide/vue'
import type { Project } from '../../data/projects'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()

const dialogEl = ref<HTMLElement | null>(null)
let previouslyFocused: HTMLElement | null = null

const close = () => emit('close')

const blocks = computed(() =>
  props.project
    ? [
        { label: 'Problem', value: props.project.problem },
        { label: 'Challenge', value: props.project.challenge },
        { label: 'Architecture', value: props.project.architecture },
        { label: 'Solution', value: props.project.solution },
      ]
    : []
)

watch(
  () => props.project,
  async (project) => {
    if (project) {
      previouslyFocused = document.activeElement as HTMLElement
      document.body.style.overflow = 'hidden'
      await nextTick()
      dialogEl.value?.focus()
    } else {
      document.body.style.overflow = ''
      previouslyFocused?.focus()
    }
  }
)
</script>

<style scoped>
.modal-fade-enter-active,
.modal-fade-leave-active {
  transition: opacity 0.25s ease;
}
.modal-fade-enter-from,
.modal-fade-leave-to {
  opacity: 0;
}
</style>
