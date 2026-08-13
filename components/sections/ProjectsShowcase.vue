<template>
  <section id="projects" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="projects-heading">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-14">
        <div>
          <h2 id="projects-heading" class="font-display font-bold leading-[1.03] text-[var(--color-text-primary)]" style="font-size: var(--text-h1)">
            Production <span class="text-gradient">Systems</span>
          </h2>
          <p class="text-[var(--color-text-secondary)] text-lg mt-3 max-w-xl">
            12 production case studies - e-learning platforms, fintech, cloud labs, and internal automation systems.
          </p>
        </div>

        <div class="flex flex-wrap gap-2" role="group" aria-label="Filter projects by category">
          <button
            v-for="f in projectFilters"
            :key="f"
            type="button"
            :aria-pressed="activeFilter === f"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeFilter === f
              ? 'bg-[var(--color-accent-clay)] text-white shadow-lg shadow-[var(--color-accent-clay)]/25'
              : 'border border-[var(--color-border-subtle)] text-[var(--color-text-secondary)] hover:border-[var(--color-border-hover)] hover:text-[var(--color-accent-clay-ink)]'"
            @click="activeFilter = f; showAll = false"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <div ref="gridEl" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <article
          v-for="project in visibleProjects"
          :key="project.slug"
          class="project-card group relative rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-7 hover:border-[var(--color-border-hover)] transition-colors duration-500 overflow-hidden flex flex-col"
          @mousemove="onCardMove"
        >
          <div class="spotlight absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" aria-hidden="true" />

          <div class="relative flex items-center justify-between mb-5">
            <span class="w-11 h-11 rounded-2xl flex items-center justify-center bg-[var(--color-accent-clay)]/10 border border-[var(--color-accent-clay)]/25">
              <DynamicIcon :name="project.icon" class="w-5 h-5 text-[var(--color-accent-clay-ink)]" />
            </span>
            <span
              v-if="project.status === 'Live'"
              class="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full"
            >
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
            <span v-else class="text-xs font-semibold text-[var(--color-text-muted)] border border-[var(--color-border-subtle)] px-3 py-1 rounded-full">Internal</span>
          </div>

          <h3 class="relative text-lg font-bold text-[var(--color-text-primary)] mb-1.5 group-hover:text-[var(--color-accent-clay-ink)] transition-colors">
            {{ project.title }}
          </h3>
          <p class="relative text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5 line-clamp-2">{{ project.tagline }}</p>

          <div class="relative flex gap-4 mb-5 pb-5 border-b border-[var(--color-border-subtle)]">
            <div v-for="m in project.metrics" :key="m.label" class="text-center">
              <div class="text-sm font-bold text-[var(--color-accent-clay-ink)]">{{ m.value }}</div>
              <div class="text-[10px] text-[var(--color-text-muted)]">{{ m.label }}</div>
            </div>
          </div>

          <div class="relative flex flex-wrap gap-1.5 mb-6">
            <span v-for="tech in project.technologies.slice(0, 4)" :key="tech" class="px-2 py-0.5 rounded-md text-xs text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">{{ tech }}</span>
            <span v-if="project.technologies.length > 4" class="px-2 py-0.5 rounded-md text-xs text-[var(--color-accent-clay-ink)]">+{{ project.technologies.length - 4 }}</span>
          </div>

          <div class="relative mt-auto flex items-center gap-4 pt-1">
            <a
              v-if="project.liveUrl"
              :href="project.liveUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-1.5 text-xs text-[var(--color-accent-clay-ink)] hover:text-[var(--color-text-primary)] font-semibold transition-colors"
            >
              View Live
              <ExternalLink class="w-3 h-3" />
            </a>
            <button
              type="button"
              class="inline-flex items-center gap-1.5 text-xs text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] font-semibold transition-colors"
              @click="selected = project"
            >
              Case Study
              <ArrowRight class="w-3 h-3 group-hover:translate-x-0.5 transition-transform" />
            </button>
          </div>
        </article>
      </div>

      <div v-if="!showAll && filteredProjects.length > INITIAL_COUNT" class="flex flex-col items-center gap-4 pt-14">
        <p class="text-[var(--color-text-muted)] text-sm">Showing {{ visibleProjects.length }} of {{ filteredProjects.length }} projects</p>
        <button
          type="button"
          class="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[var(--color-text-primary)] border border-[var(--color-accent-clay)]/30 bg-[var(--color-accent-clay)]/10 hover:bg-[var(--color-accent-clay)]/20 hover:border-[var(--color-accent-clay)]/60 hover:scale-105 transition-all duration-300"
          @click="showAll = true"
        >
          <ChevronDown class="w-5 h-5 text-[var(--color-accent-clay-ink)] group-hover:translate-y-0.5 transition-transform" />
          See All {{ filteredProjects.length }} Projects
        </button>
      </div>

      <div v-else-if="filteredProjects.length > INITIAL_COUNT" class="flex justify-center pt-10">
        <button
          type="button"
          class="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-[var(--color-text-secondary)] border border-[var(--color-border-subtle)] hover:border-[var(--color-border-subtle)] hover:text-[var(--color-text-primary)] transition-all duration-300"
          @click="showAll = false"
        >
          <ChevronDown class="w-4 h-4 rotate-180" />
          Show Less
        </button>
      </div>
    </div>

    <ProjectCaseStudyModal :project="selected" @close="selected = null" />
  </section>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { ExternalLink, ArrowRight, ChevronDown } from '@lucide/vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import StageBadge from '../ui/StageBadge.vue'
import ProjectCaseStudyModal from './ProjectCaseStudyModal.vue'
import { projects, projectFilters, type Project } from '../../data/projects'
import { useScrollReveal } from '../../composables/useScrollReveal'

const INITIAL_COUNT = 6
const activeFilter = ref<(typeof projectFilters)[number]>('All')
const showAll = ref(false)
const selected = ref<Project | null>(null)
const gridEl = ref<HTMLElement | null>(null)

const { reveal } = useScrollReveal()

const filteredProjects = computed(() =>
  activeFilter.value === 'All' ? projects : projects.filter((p) => p.category.includes(activeFilter.value))
)
const visibleProjects = computed(() => (showAll.value ? filteredProjects.value : filteredProjects.value.slice(0, INITIAL_COUNT)))

const onCardMove = (e: MouseEvent) => {
  const card = e.currentTarget as HTMLElement
  const rect = card.getBoundingClientRect()
  card.style.setProperty('--mx', `${e.clientX - rect.left}px`)
  card.style.setProperty('--my', `${e.clientY - rect.top}px`)
}

onMounted(() => {
  if (gridEl.value) {
    reveal(Array.from(gridEl.value.children), { y: 24, stagger: 0.08, start: 'top 88%' })
  }
})
</script>

<style scoped>
.project-card {
  --mx: 50%;
  --my: 0%;
}
.spotlight {
  background: radial-gradient(320px circle at var(--mx) var(--my), rgba(176, 96, 58, 0.14), transparent 70%);
}
</style>
