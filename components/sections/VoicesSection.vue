<template>
  <section id="voices" class="section" aria-labelledby="voices-title">
    <div class="wrap">
      <h2 id="voices-title" class="h2">What the people I work with say</h2>

      <div class="mt-14 grid gap-10 lg:grid-cols-[8fr_4fr] lg:gap-16">
        <figure class="quote" aria-live="polite">
          <blockquote :key="current.name" class="quote-text">&ldquo;{{ current.text }}&rdquo;</blockquote>
          <figcaption class="flex items-center gap-4 mt-8">
            <span class="avatar font-display" aria-hidden="true">{{ initials(current.name) }}</span>
            <span>
              <span class="block font-semibold">{{ current.name }}</span>
              <span class="block text-sm text-ink-3">{{ current.role }}</span>
            </span>
          </figcaption>
        </figure>

        <div>
          <ul class="picker" aria-label="Choose a testimonial">
            <li v-for="(t, i) in testimonials" :key="t.name">
              <button type="button" class="pick" :class="{ on: i === index }" :aria-pressed="i === index" @click="index = i">
                <span class="avatar sm font-display" aria-hidden="true">{{ initials(t.name) }}</span>
                <span class="text-left">
                  <span class="block font-semibold leading-tight">{{ t.name }}</span>
                  <span class="block text-xs text-ink-3">{{ t.role }}</span>
                </span>
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { testimonials } from '../../data/testimonials'

const index = ref(0)
const current = computed(() => testimonials[index.value]!)

// Initials, not remote photos: several of the stored image URLs are expiring LinkedIn CDN links.
const initials = (name: string) =>
  name
    .split(' ')
    .map((w) => w[0])
    .slice(0, 2)
    .join('')
</script>

<style scoped>
.quote {
  min-height: 22rem;
}
.quote-text {
  font-family: var(--font-display);
  font-size: clamp(1.4rem, 1rem + 1.6vw, 2.3rem);
  font-weight: 500;
  line-height: 1.3;
  letter-spacing: -0.01em;
  word-spacing: 0.1em;
  max-width: 36ch;
  animation: swap 0.6s var(--ease-out);
}
@keyframes swap {
  from { opacity: 0; transform: translateY(14px); }
}
.avatar {
  display: grid;
  place-items: center;
  width: 3.25rem;
  height: 3.25rem;
  border-radius: 50%;
  background: var(--heat);
  color: var(--c-on-ember);
  font-weight: 700;
}
.avatar.sm {
  width: 2.5rem;
  height: 2.5rem;
  font-size: 0.85rem;
  flex: none;
}
.picker {
  display: flex;
  flex-direction: column;
  border-top: 1px solid var(--c-line);
}
.pick {
  display: flex;
  align-items: center;
  gap: 0.9rem;
  width: 100%;
  padding: 0.8rem 0.25rem;
  border-bottom: 1px solid var(--c-line);
  color: var(--c-ink-2);
  transition: padding-left 0.3s var(--ease-out), color 0.2s;
}
.pick:hover {
  color: var(--c-ink);
}
.pick.on {
  color: var(--c-ink);
  padding-left: 0.9rem;
  box-shadow: inset 3px 0 0 var(--c-ember);
}
</style>
