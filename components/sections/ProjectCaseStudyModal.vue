<template>
  <Teleport to="body">
    <Transition name="modal-fade">
      <div
        v-if="project"
        class="fixed inset-0 z-100 flex items-center justify-center p-3 sm:p-6"
        role="dialog"
        aria-modal="true"
        :aria-labelledby="`case-study-title`"
        @click.self="close"
        @keydown.esc="close"
      >
        <div class="absolute inset-0 bg-[#2a2621]/55 backdrop-blur-sm" aria-hidden="true" />

        <!-- Capped to the viewport with the body scrolling inside, rather than letting the
             dialog grow past the screen. Centring a taller-than-viewport box in a scroll
             container pushes its top out of reach, which hid the title and close button. -->
        <div
          ref="dialogEl"
          tabindex="-1"
          class="relative flex flex-col w-full max-w-3xl max-h-[calc(100dvh-1.5rem)] sm:max-h-[calc(100dvh-3rem)] rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-bg-base)] shadow-2xl overflow-hidden"
        >
          <!-- Sticky header: title, status and close stay visible however long the body is. -->
          <div class="flex items-start gap-4 p-5 sm:p-7 border-b border-[var(--color-border-subtle)] shrink-0">
            <div class="min-w-0 flex-1">
              <span
                class="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1 rounded-full mb-3"
                :class="project.status === 'Live' ? 'text-emerald-600 border border-emerald-500/30 bg-emerald-500/10' : 'text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]'"
              >
                <span v-if="project.status === 'Live'" class="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {{ project.status === 'Live' ? 'Live in Production' : 'Internal / Private' }}
              </span>
              <h3 id="case-study-title" class="text-xl sm:text-2xl font-display font-bold text-[var(--color-text-primary)] leading-tight">{{ project.title }}</h3>
              <p class="text-[var(--color-text-secondary)] text-sm mt-1">{{ project.tagline }}</p>
            </div>

            <button
              type="button"
              class="w-10 h-10 shrink-0 rounded-full flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-2)] transition-colors"
              aria-label="Close case study"
              @click="close"
            >
              <X class="w-5 h-5" />
            </button>
          </div>

          <div class="overflow-y-auto overscroll-contain p-5 sm:p-7">

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
