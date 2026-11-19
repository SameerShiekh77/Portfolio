<template>
  <section id="writing" class="section" aria-labelledby="writing-title">
    <div class="wrap">
      <div class="flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <h2 id="writing-title" class="h2">Notes from the engine room</h2>
        <p class="text-ink-2 max-w-[34ch]">Short, honest write-ups on infrastructure and engineering management. The first posts are on the way.</p>
      </div>

      <ul class="mt-14 grid gap-5 md:grid-cols-3">
        <li v-for="p in posts" :key="p.title">
          <article class="post">
            <span class="tag">{{ p.tag }}</span>
            <h3 class="font-display text-xl font-semibold leading-snug">{{ p.title }}</h3>
            <p class="text-ink-3 text-sm">{{ p.summary }}</p>
            <p class="mt-auto text-sm font-semibold text-ink-3">Coming soon</p>
          </article>
        </li>
      </ul>
    </div>
  </section>
</template>

<script setup lang="ts">
import { posts } from '../../data/site'
</script>

<style scoped>
.post {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  height: 100%;
  min-height: 15rem;
  padding: 1.75rem;
  border-radius: 1.5rem;
  border: 1px dashed var(--c-line-2);
  transition: border-color 0.3s, transform 0.4s var(--ease-out);
}
.post:hover {
  border-color: var(--c-ember);
  transform: translateY(-4px);
}
</style>
