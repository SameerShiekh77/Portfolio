<template>
  <section id="experience" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="experience-heading">
    <div class="absolute top-1/2 left-0 w-100 h-150 -translate-y-1/2 opacity-20 pointer-events-none" style="background: radial-gradient(ellipse, var(--color-accent-clay) 0%, transparent 70%)" aria-hidden="true" />

    <div class="container mx-auto px-6 lg:px-12 relative">
      <SectionHeader
        title-id="experience-heading"
        stage="rollout"
        title="Where I've Worked"
        accent="Worked"
        subtitle="Six roles, one throughline: take ownership of the system, not just the ticket."
      />

      <div class="relative max-w-5xl mx-auto">
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px" style="background: linear-gradient(to bottom, var(--color-accent-clay), var(--color-accent-olive), transparent)" aria-hidden="true" />

        <div ref="listEl" class="space-y-14">
          <div
            v-for="(exp, index) in experience"
            :key="exp.company"
            class="exp-card relative flex flex-col md:flex-row items-start"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'"
          >
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-20">
              <div class="w-4 h-4 rounded-full border-2 border-[var(--color-accent-clay)] relative">
                <div v-if="exp.current" class="absolute inset-0 rounded-full animate-ping bg-[var(--color-accent-clay)] opacity-40" />
              </div>
            </div>

            <div class="pl-14 md:pl-0 w-full md:w-[calc(50%-2rem)]" :class="index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'">
              <div class="group rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-7 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-500">
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <span class="text-xs font-mono text-[var(--color-text-muted)] border border-[var(--color-border-subtle)] px-3 py-1 rounded-full">{{ exp.period }}</span>
                  <span v-if="exp.current" class="text-xs font-bold px-3 py-1 rounded-full text-[var(--color-accent-gold-ink)] border border-[var(--color-accent-gold)]/30 bg-[var(--color-accent-gold)]/10">Current</span>
                </div>

                <h3 class="text-xl font-bold text-[var(--color-text-primary)] mb-1 group-hover:text-[var(--color-accent-clay-ink)] transition-colors">{{ exp.title }}</h3>
                <div class="text-[var(--color-accent-clay-ink)] font-semibold mb-4">{{ exp.company }}</div>
                <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed mb-5">{{ exp.description }}</p>

                <div v-if="exp.achievements.length">
                  <button
                    type="button"
                    class="text-xs text-[var(--color-accent-clay-ink)] hover:text-[var(--color-text-primary)] font-semibold flex items-center gap-1 mb-3 transition-colors"
                    :aria-expanded="isOpen(exp.company)"
                    @click="toggle(exp.company)"
                  >
                    <ChevronRight class="w-3 h-3 transition-transform duration-300" :class="isOpen(exp.company) ? 'rotate-90' : ''" />
                    {{ isOpen(exp.company) ? 'Hide' : 'Show' }} key achievements
                  </button>

                  <Transition :css="false" @enter="onEnter" @leave="onLeave">
                    <ul v-if="isOpen(exp.company)" class="space-y-2 mb-5 overflow-hidden">
                      <li v-for="a in exp.achievements" :key="a" class="flex items-start gap-2 text-xs text-[var(--color-text-secondary)]">
                        <span class="w-1 h-1 rounded-full bg-[var(--color-accent-clay-light)] mt-1.5 shrink-0" />
                        {{ a }}
                      </li>
                    </ul>
                  </Transition>
                </div>

                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tech in exp.technologies.slice(0, 8)" :key="tech" class="px-2 py-0.5 rounded-md text-xs text-[var(--color-text-muted)] border border-[var(--color-border-subtle)]">{{ tech }}</span>
                  <span v-if="exp.technologies.length > 8" class="px-2 py-0.5 rounded-md text-xs text-[var(--color-accent-clay-ink)] border border-[var(--color-accent-clay)]/20">+{{ exp.technologies.length - 8 }} more</span>
                </div>

                <div v-if="Object.keys(exp.stats).length" class="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-[var(--color-border-subtle)]">
                  <div v-for="(stat, key) in exp.stats" :key="key" class="text-center">
                    <div class="text-lg font-bold text-[var(--color-accent-clay-ink)]">{{ stat.value }}</div>
                    <div class="text-[10px] text-[var(--color-text-muted)] mt-0.5">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mt-16 flex justify-center">
          <a
            :href="profile.resumeFile"
            download
            class="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-[var(--color-text-primary)] border border-[var(--color-accent-clay)]/30 bg-[var(--color-accent-clay)]/10 hover:bg-[var(--color-accent-clay)]/20 hover:border-[var(--color-accent-clay)]/60 transition-all duration-300"
          >
            <Download class="w-5 h-5 text-[var(--color-accent-clay-ink)]" />
            Download Full Resume
            <ArrowRight class="w-4 h-4 text-[var(--color-text-muted)] group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive, ref, onMounted } from 'vue'
import { ChevronRight, Download, ArrowRight } from '@lucide/vue'
import { animate } from 'motion'
import SectionHeader from '../ui/SectionHeader.vue'
import { experience } from '../../data/experience'
import { profile } from '../../data/profile'
import { useScrollReveal } from '../../composables/useScrollReveal'
import { duration as dur, ease } from '../../utils/motion'

const openCompanies = reactive(new Set<string>())
const listEl = ref<HTMLElement | null>(null)
const { reveal } = useScrollReveal()

const isOpen = (company: string) => openCompanies.has(company)
const toggle = (company: string) => {
  if (openCompanies.has(company)) openCompanies.delete(company)
  else openCompanies.add(company)
}

const onEnter = (el: Element, done: () => void) => {
  const node = el as HTMLElement
  const target = node.scrollHeight
  animate(node, { height: [0, target], opacity: [0, 1] }, { duration: dur.slow, ease: ease.expoOut }).finished.then(() => {
    node.style.height = 'auto'
    done()
  })
}
const onLeave = (el: Element, done: () => void) => {
  const node = el as HTMLElement
  animate(node, { height: [node.scrollHeight, 0], opacity: [1, 0] }, { duration: dur.base, ease: ease.expoOut }).finished.then(done)
}

onMounted(() => {
  if (listEl.value) {
    reveal(Array.from(listEl.value.children), { y: 32, stagger: 0.1, start: 'top 88%' })
  }
})
</script>
