<template>
  <section id="skills" class="section" aria-labelledby="skills-title">
    <div class="wrap">
      <h2 id="skills-title" class="h2">The stack, and the people side of it</h2>

      <div class="mt-14 grid gap-8 lg:grid-cols-[4fr_8fr] lg:gap-16">
        <div role="tablist" aria-label="Skill groups" aria-orientation="vertical" class="tabs" @keydown="onKey">
          <button
            v-for="(c, i) in skillCategories"
            :id="`tab-${c.id}`"
            :key="c.id"
            ref="tabEls"
            type="button"
            role="tab"
            class="tab"
            :class="{ on: i === active }"
            :aria-selected="i === active"
            :aria-controls="`panel-${c.id}`"
            :tabindex="i === active ? 0 : -1"
            @click="active = i"
          >
            <DynamicIcon :name="c.icon" class="w-5 h-5 shrink-0" />
            <span class="font-display font-semibold">{{ c.title }}</span>
            <span class="count">{{ c.skills.length }}</span>
          </button>
        </div>

        <div
          :id="`panel-${current.id}`"
          role="tabpanel"
          :aria-labelledby="`tab-${current.id}`"
          class="panel p-6 sm:p-9"
          tabindex="0"
        >
          <Transition name="swap" mode="out-in">
            <div :key="current.id">
              <p class="text-lg text-ink-2 max-w-[50ch] mb-8">{{ current.description }}</p>
              <ul class="grid gap-x-10 gap-y-5 sm:grid-cols-2">
                <li v-for="(s, i) in current.skills" :key="current.id + s.name" class="skill" :style="{ '--i': i }">
              <div class="flex items-center justify-between text-sm mb-2">
                <span class="flex items-center gap-2 font-semibold">
                  <DynamicIcon :name="s.icon" class="w-4 h-4 text-ember-ink" />{{ s.name }}
                </span>
                <span class="text-ink-3">{{ s.level }}%</span>
              </div>
                  <div class="meter" role="presentation">
                    <span class="meter-fill" :style="{ width: s.level + '%' }" />
                  </div>
                </li>
              </ul>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, nextTick, ref } from 'vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import { skillCategories } from '../../data/skills'

const active = ref(0)
const tabEls = ref<HTMLElement[]>([])
const current = computed(() => skillCategories[active.value]!)

// Arrow keys move between tabs, as the ARIA tabs pattern expects.
const onKey = async (e: KeyboardEvent) => {
  const n = skillCategories.length
  const step = e.key === 'ArrowDown' || e.key === 'ArrowRight' ? 1 : e.key === 'ArrowUp' || e.key === 'ArrowLeft' ? -1 : 0
  if (!step) return
  e.preventDefault()
  active.value = (active.value + step + n) % n
  await nextTick()
  tabEls.value[active.value]?.focus()
}
</script>

<style scoped>
.tabs {
  display: flex;
  gap: 0.5rem;
  overflow-x: auto;
  padding-bottom: 0.5rem;
}
@media (min-width: 1024px) {
  .tabs {
    flex-direction: column;
    overflow: visible;
    padding: 0;
    gap: 0;
    border-top: 1px solid var(--c-line);
  }
}
.tab {
  display: flex;
  align-items: center;
  gap: 0.8rem;
  padding: 0.85rem 1.1rem;
  border-radius: 999px;
  border: 1px solid var(--c-line);
  color: var(--c-ink-2);
  white-space: nowrap;
  text-align: left;
  transition: color 0.25s, background-color 0.25s, border-color 0.25s;
}
.tab:hover {
  color: var(--c-ink);
}
.tab.on {
  color: var(--c-on-ember);
  background: var(--c-ember);
  border-color: var(--c-ember);
}
.count {
  margin-left: auto;
  font-size: 0.8rem;
  opacity: 0.7;
}
@media (min-width: 1024px) {
  .tab {
    border-radius: 0;
    border: 0;
    border-bottom: 1px solid var(--c-line);
    padding: 1.25rem 0.25rem;
    font-size: 1.15rem;
    background: transparent;
  }
  .tab.on {
    background: transparent;
    color: var(--c-ink);
    padding-left: 1rem;
    box-shadow: inset 3px 0 0 var(--c-ember);
  }
  .tab.on .count {
    color: var(--c-ember-ink);
    opacity: 1;
  }
}
.swap-enter-active {
  transition: opacity 0.4s var(--ease-out), transform 0.4s var(--ease-out);
}
.swap-leave-active {
  transition: opacity 0.18s ease, transform 0.18s ease;
}
.swap-enter-from {
  opacity: 0;
  transform: translateY(14px);
}
.swap-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
.skill {
  animation: skill-in 0.5s var(--ease-out) both;
  animation-delay: calc(var(--i, 0) * 45ms + 120ms);
}
@keyframes skill-in {
  from { opacity: 0; transform: translateY(10px); }
}
.meter {
  height: 0.35rem;
  border-radius: 999px;
  background: var(--c-line);
  overflow: hidden;
}
.meter-fill {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: var(--heat);
  animation: grow 0.9s var(--ease-out) both;
  transform-origin: left;
}
@keyframes grow {
  from { transform: scaleX(0); }
}
</style>
