<template>
  <section id="leadership" class="section" aria-labelledby="lead-title">
    <div class="wrap grid gap-14 lg:grid-cols-[5fr_7fr] lg:gap-20">
      <div class="lg:sticky lg:top-28 lg:self-start">
        <h2 id="lead-title" class="h2">How I lead</h2>
        <p class="lead-intro">{{ leadershipIntro }}</p>

        <div class="rituals">
          <h3 class="font-display font-semibold text-lg mb-3">How the team runs</h3>
          <ul class="space-y-2 text-ink-2">
            <li v-for="r in cultureRituals" :key="r" class="flex gap-3">
              <span class="mt-2.5 w-1.5 h-1.5 rounded-full bg-mint shrink-0" aria-hidden="true" />{{ r }}
            </li>
          </ul>
        </div>
      </div>

      <ul class="principles">
        <li v-for="(p, i) in principles" :key="p.title" class="principle">
          <h3 class="principle-title">{{ p.title }}</h3>
          <p class="text-ink-2 max-w-[54ch]">{{ p.body }}</p>
          <p class="proof"><span class="proof-mark" aria-hidden="true" />{{ p.proof }}</p>
          <span class="sr-only">Principle {{ i + 1 }} of {{ principles.length }}</span>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { cultureRituals, leadershipIntro, principles } from '../../data/site'
</script>

<style scoped>
.lead-intro {
  margin-top: 1.75rem;
  max-width: 40ch;
  font-size: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  color: var(--c-ink-2);
}
.rituals {
  margin-top: 2.5rem;
  padding-top: 1.5rem;
  border-top: 1px solid var(--c-line);
  max-width: 40ch;
}
.principles {
  border-top: 1px solid var(--c-line-2);
}
.principle {
  padding: 2.25rem 0;
  border-bottom: 1px solid var(--c-line);
  transition: padding-left 0.4s var(--ease-out);
}
.principle:hover {
  padding-left: 0.75rem;
}
.principle-title {
  font-size: var(--text-h3);
  font-weight: 600;
  line-height: 1.1;
  margin-bottom: 0.8rem;
}
.proof {
  display: flex;
  align-items: baseline;
  gap: 0.7rem;
  margin-top: 1.1rem;
  font-weight: 600;
  font-size: 0.95rem;
  color: var(--c-ember-ink);
}
.proof-mark {
  flex: none;
  width: 1.5rem;
  height: 2px;
  background: var(--heat);
  transform: translateY(-0.25em);
}
</style>
