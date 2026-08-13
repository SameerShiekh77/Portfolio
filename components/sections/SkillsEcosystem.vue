<template>
  <section id="skills" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="skills-heading">
    <div class="absolute inset-0 opacity-[0.4] pointer-events-none" style="background-image: radial-gradient(circle, rgba(42,38,33,0.09) 1px, transparent 1px); background-size: 28px 28px" aria-hidden="true" />

    <div class="container mx-auto px-6 lg:px-12 relative">
      <SectionHeader
        title-id="skills-heading"
        stage="dependencies"
        title="The Engineering Ecosystem"
        accent="Ecosystem"
        subtitle="Not a checklist - a set of interconnected disciplines I move between daily, from infrastructure to interface."
      />

      <div ref="gridEl" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-6xl mx-auto">
        <div
          v-for="cat in skillCategories"
          :key="cat.id"
          class="group rounded-3xl border transition-all duration-500 overflow-hidden"
          :class="isOpen(cat.id) ? 'border-[var(--color-border-hover)] bg-[var(--color-surface-2)]' : 'border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] hover:border-[var(--color-border-strong)]'"
        >
          <button
            type="button"
            class="w-full flex items-start gap-4 p-6 text-left"
            :aria-expanded="isOpen(cat.id)"
            :aria-controls="`skill-panel-${cat.id}`"
            @click="toggle(cat.id)"
          >
            <span
              class="relative w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 transition-transform duration-500 group-hover:scale-110"
              :style="{ background: cat.color + '18', border: `1px solid ${cat.color}40` }"
            >
              <span
                class="absolute inset-0 rounded-2xl border border-dashed opacity-0 group-hover:opacity-60 transition-opacity duration-500"
                :style="{ borderColor: cat.color, animation: 'spin 8s linear infinite' }"
                aria-hidden="true"
              />
              <DynamicIcon :name="cat.icon" class="w-5 h-5" :style="{ color: cat.color }" />
            </span>

            <span class="flex-1 min-w-0">
              <span class="flex items-center justify-between gap-2">
                <span class="font-bold text-[var(--color-text-primary)]">{{ cat.title }}</span>
                <ChevronDown
                  class="w-4 h-4 text-[var(--color-text-muted)] shrink-0 transition-transform duration-300"
                  :class="isOpen(cat.id) ? 'rotate-180' : ''"
                  aria-hidden="true"
                />
              </span>
              <span class="block text-sm text-[var(--color-text-secondary)] mt-1">{{ cat.description }}</span>
              <span class="block text-xs font-mono text-[var(--color-text-muted)] mt-2">{{ cat.skills.length }} skills</span>
            </span>
          </button>

          <Transition :css="false" @enter="onEnter" @leave="onLeave">
            <div v-if="isOpen(cat.id)" :id="`skill-panel-${cat.id}`" class="px-6 pb-6 overflow-hidden">
              <div class="flex flex-wrap gap-2 pt-1 border-t border-[var(--color-border-subtle)]">
                <span
                  v-for="skill in cat.skills"
                  :key="skill.name"
                  class="mt-3 inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-transform duration-300 hover:scale-105"
                  :style="nodeStyle(skill, cat.color)"
                >
                  {{ skill.name }}
                </span>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { reactive } from 'vue'
import { ChevronDown } from '@lucide/vue'
import { animate } from 'motion'
import SectionHeader from '../ui/SectionHeader.vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import { skillCategories, type Skill } from '../../data/skills'
import { duration as dur, ease } from '../../utils/motion'

const openIds = reactive(new Set<string>(['cloud-devops']))

const isOpen = (id: string) => openIds.has(id)
const toggle = (id: string) => {
  if (openIds.has(id)) openIds.delete(id)
  else openIds.add(id)
}

const nodeStyle = (skill: Skill, color: string) => {
  // Level modulates visual weight (glow + boldness) instead of a literal progress bar.
  const glow = 0.15 + (skill.level / 100) * 0.35
  return {
    borderColor: `${color}40`,
    background: `${color}${skill.level > 80 ? '1a' : '0d'}`,
    color: 'var(--color-text-primary)',
    boxShadow: `0 0 ${Math.round(skill.level / 5)}px ${color}${Math.round(glow * 100)
      .toString(16)
      .padStart(2, '0')}`,
  }
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
  const start = node.scrollHeight
  animate(node, { height: [start, 0], opacity: [1, 0] }, { duration: dur.base, ease: ease.expoOut }).finished.then(done)
}
</script>
