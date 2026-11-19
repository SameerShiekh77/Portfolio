<template>
  <dialog ref="dialogEl" class="dlg" :aria-labelledby="project ? 'dlg-title' : undefined" @close="emit('close')" @click="onBackdrop">
    <article v-if="project" class="dlg-body">
      <button type="button" class="dlg-close" aria-label="Close case study" @click="dialogEl?.close()">
        <X class="w-5 h-5" aria-hidden="true" />
      </button>

      <p class="text-sm font-semibold text-ember-ink mb-2">{{ project.category.join(' / ') }}</p>
      <h3 id="dlg-title" class="font-display text-3xl sm:text-4xl font-semibold leading-tight">{{ project.title }}</h3>
      <p class="mt-3 text-lg text-ink-2 max-w-[60ch]">{{ project.tagline }}</p>

      <dl class="grid grid-cols-3 gap-4 my-8 border-y border-line py-5">
        <div v-for="m in project.metrics" :key="m.label">
          <dd class="font-display text-3xl font-semibold heat-text w-fit">{{ m.value }}</dd>
          <dt class="text-sm text-ink-3">{{ m.label }}</dt>
        </div>
      </dl>

      <div class="grid gap-6 sm:grid-cols-2">
        <section v-for="s in sections" :key="s.title">
          <h4 class="font-semibold mb-1.5">{{ s.title }}</h4>
          <p class="text-ink-2 text-[0.97rem]">{{ s.text }}</p>
        </section>
      </div>

      <h4 class="font-semibold mt-8 mb-2">Impact</h4>
      <ul class="space-y-1.5">
        <li v-for="i in project.impact" :key="i" class="flex gap-2 text-ink-2">
          <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-mint shrink-0" aria-hidden="true" />{{ i }}
        </li>
      </ul>

      <div class="flex flex-wrap gap-1.5 mt-8">
        <span v-for="t in project.technologies" :key="t" class="tag">{{ t }}</span>
      </div>

      <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener noreferrer" class="btn btn-primary mt-8">
        Visit live site
        <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
      </a>
    </article>
  </dialog>
</template>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { ArrowUpRight, X } from '@lucide/vue'
import type { Project } from '../../data/projects'

const props = defineProps<{ project: Project | null }>()
const emit = defineEmits<{ close: [] }>()
const dialogEl = ref<HTMLDialogElement | null>(null)

const sections = computed(() =>
  props.project
    ? [
        { title: 'The problem', text: props.project.problem },
        { title: 'The challenge', text: props.project.challenge },
        { title: 'Architecture', text: props.project.architecture },
        { title: 'What I did', text: props.project.solution },
      ]
    : [],
)

// Native <dialog> gives focus trapping, Esc to close and a backdrop for free.
watch(
  () => props.project,
  (p) => {
    const d = dialogEl.value
    if (!d) return
    if (p && !d.open) d.showModal()
    if (!p && d.open) d.close()
  },
  { flush: 'post' },
)

const onBackdrop = (e: MouseEvent) => {
  if (e.target === dialogEl.value) dialogEl.value?.close()
}
</script>

<style scoped>
.dlg {
  margin: auto;
  width: min(54rem, calc(100vw - 2rem));
  max-height: calc(100svh - 2rem);
  padding: 0;
  border: 1px solid var(--c-line-2);
  border-radius: 1.75rem;
  background: var(--c-bg-2);
  color: var(--c-ink);
  overflow: auto;
  overscroll-behavior: contain;
}
.dlg::backdrop {
  background: rgba(5, 3, 10, 0.72);
  backdrop-filter: blur(6px);
}
.dlg[open] {
  animation: rise 0.45s var(--ease-out);
}
@keyframes rise {
  from { opacity: 0; transform: translateY(24px) scale(0.98); }
}
.dlg-body {
  position: relative;
  padding: clamp(1.5rem, 4vw, 3rem);
}
.dlg-close {
  position: absolute;
  top: 1rem;
  right: 1rem;
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 50%;
  border: 1px solid var(--c-line-2);
  background: var(--c-surface);
}
.dlg-close:hover {
  border-color: var(--c-ember);
}
</style>
