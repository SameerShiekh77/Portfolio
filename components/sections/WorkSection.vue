<template>
  <section id="work" class="section" aria-labelledby="work-title">
    <div class="wrap">
      <div class="head">
        <div>
          <h2 id="work-title" class="h2">Production systems I've built and run</h2>
          <p class="lede">{{ projects.length }} production case studies: e-learning platforms, fintech, cloud labs and internal automation.</p>
        </div>

        <div class="filters" role="group" aria-label="Filter projects">
          <button
            v-for="f in projectFilters"
            :key="f"
            type="button"
            class="filter"
            :class="{ on: f === filter }"
            :aria-pressed="f === filter"
            @click="filter = f"
          >
            {{ f }}
          </button>
        </div>
      </div>

      <TransitionGroup tag="ul" name="card" class="grid" :aria-label="`${shown.length} projects`">
        <li v-for="(p, i) in shown" :key="p.slug" :style="{ '--i': i }">
          <article class="card">
            <header class="card-top">
              <span class="icon" aria-hidden="true"><DynamicIcon :name="p.icon" class="w-6 h-6" /></span>
              <span class="status"><span class="dot" aria-hidden="true" />{{ p.status }}</span>
            </header>

            <h3 class="card-title">{{ p.title }}</h3>
            <p class="card-tag">{{ p.tagline }}</p>

            <dl class="metrics">
              <div v-for="m in p.metrics" :key="m.label">
                <dd class="font-display">{{ m.value }}</dd>
                <dt>{{ m.label }}</dt>
              </div>
            </dl>

            <div class="tags">
              <span v-for="t in p.technologies.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
              <span v-if="p.technologies.length > 4" class="more-tags">+{{ p.technologies.length - 4 }}</span>
            </div>

            <footer class="actions">
              <a
                v-if="p.liveUrl"
                :href="p.liveUrl"
                target="_blank"
                rel="noopener noreferrer"
                class="action"
              >
                View live
                <ExternalLink class="w-4 h-4" aria-hidden="true" />
                <span class="sr-only">({{ p.title }}, opens in a new tab)</span>
              </a>
              <button type="button" class="action" @click="selected = p">
                Case study
                <ArrowRight class="w-4 h-4" aria-hidden="true" />
                <span class="sr-only">for {{ p.title }}</span>
              </button>
            </footer>
          </article>
        </li>
      </TransitionGroup>
    </div>

    <ProjectDialog :project="selected" @close="selected = null" />
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { ArrowRight, ExternalLink } from '@lucide/vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import ProjectDialog from './ProjectDialog.vue'
import { projectFilters, projects, type Project } from '../../data/projects'

const filter = ref<(typeof projectFilters)[number]>('All')
const selected = ref<Project | null>(null)
const shown = computed(() => (filter.value === 'All' ? projects : projects.filter((p) => p.category.includes(filter.value))))
</script>

<style scoped>
.head {
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: clamp(2.5rem, 5vw, 4rem);
}
@media (min-width: 1024px) {
  .head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
}
.lede {
  margin-top: 1.5rem;
  max-width: 44ch;
  color: var(--c-ink-2);
}
.filters {
  display: flex;
  flex-wrap: wrap;
  gap: 0.6rem;
  max-width: 34rem;
}
.filter {
  padding: 0.65rem 1.2rem;
  border-radius: 0.9rem;
  border: 1px solid var(--c-line);
  background: var(--c-surface);
  color: var(--c-ink-2);
  font-weight: 600;
  font-size: 0.95rem;
  transition: background-color 0.25s, color 0.25s, border-color 0.25s;
}
.filter:hover {
  border-color: var(--c-ember);
  color: var(--c-ink);
}
.filter.on {
  background: var(--c-ember);
  border-color: var(--c-ember);
  color: var(--c-on-ember);
}

.grid {
  display: grid;
  gap: 1.25rem;
  grid-template-columns: 1fr;
}
@media (min-width: 720px) {
  .grid {
    grid-template-columns: repeat(2, 1fr);
  }
}
@media (min-width: 1100px) {
  .grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
.grid > li {
  display: flex;
}
/* Filtering: cards ease out quickly, new ones rise in one after another, the rest slide into place. */
.card-enter-active {
  transition: opacity 0.55s var(--ease-out), transform 0.55s var(--ease-out);
  transition-delay: calc(var(--i, 0) * 55ms);
}
.card-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.card-enter-from {
  opacity: 0;
  transform: translateY(28px) scale(0.97);
}
.card-leave-to {
  opacity: 0;
  transform: scale(0.96);
}
.card-move {
  transition: transform 0.5s var(--ease-out);
}
.card {
  display: flex;
  flex-direction: column;
  width: 100%;
  padding: 1.6rem;
  border-radius: 1.5rem;
  border: 1px solid var(--c-line);
  background: var(--c-surface);
  backdrop-filter: blur(12px);
  -webkit-backdrop-filter: blur(12px);
  transition: transform 0.4s var(--ease-out), border-color 0.3s, box-shadow 0.4s;
}
.card:hover,
.card:focus-within {
  transform: translateY(-4px);
  border-color: var(--c-ember);
  box-shadow: 0 28px 60px -32px var(--glow);
}
.card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1.4rem;
}
.icon {
  display: grid;
  place-items: center;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 1rem;
  background: color-mix(in srgb, var(--c-ember) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-ember) 30%, transparent);
  color: var(--c-ember-ink);
}
.status {
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.8rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--c-mint) 14%, transparent);
  border: 1px solid color-mix(in srgb, var(--c-mint) 35%, transparent);
  font-size: 0.8rem;
  font-weight: 700;
  color: var(--c-mint);
}
.dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--c-mint);
}
.card-title {
  font-size: 1.35rem;
  font-weight: 600;
  line-height: 1.2;
}
.card-tag {
  margin-top: 0.6rem;
  color: var(--c-ink-2);
  font-size: 0.97rem;
  line-height: 1.55;
  min-height: 3.1em;
}
.metrics {
  display: flex;
  gap: 1.6rem;
  margin-top: 1.4rem;
}
.metrics dd {
  font-size: 1.25rem;
  font-weight: 600;
  color: var(--c-ember-ink);
  line-height: 1.1;
}
.metrics dt {
  margin-top: 0.15rem;
  font-size: 0.78rem;
  color: var(--c-ink-3);
}
.tags {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.45rem;
  margin-block: 1.4rem 1.3rem;
  padding-top: 1.3rem;
  border-top: 1px solid var(--c-line);
}
.more-tags {
  padding-inline: 0.3rem;
  font-size: 0.85rem;
  color: var(--c-ink-3);
}
.actions {
  display: flex;
  align-items: center;
  gap: 1.4rem;
  margin-top: auto;
}
.action {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  font-size: 0.95rem;
  color: var(--c-ink);
}
.action:hover {
  color: var(--c-ember-ink);
}
</style>
