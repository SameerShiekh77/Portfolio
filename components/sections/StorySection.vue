<template>
  <section id="story" ref="root" class="section" aria-labelledby="story-title">
    <div class="wrap story">
      <div class="story-sticky">
        <h2 id="story-title" class="h2">Who I am, in four chapters</h2>
      </div>

      <div class="chapters">
        <article
          v-for="(c, i) in storyParagraphs"
          :key="c.heading"
          :ref="setChapter(i)"
          class="chapter"
          :class="{ on: current === i }"
        >
          <h3 class="chapter-title">{{ c.heading }}</h3>
          <p class="chapter-body">{{ c.text }}</p>
        </article>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { storyParagraphs } from '../../data/profile'

const root = ref<HTMLElement | null>(null)
const chapterEls = ref<HTMLElement[]>([])
const current = ref(0)
const triggers: ScrollTrigger[] = []

const setChapter = (i: number) => (el: unknown) => {
  if (el) chapterEls.value[i] = el as HTMLElement
}

onMounted(() => {
  chapterEls.value.forEach((el, i) => {
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 60%',
        end: 'bottom 60%',
        onToggle: (self) => self.isActive && (current.value = i),
      }),
    )
  })
})

onBeforeUnmount(() => triggers.forEach((t) => t.kill()))
</script>

<style scoped>
.story {
  display: grid;
  gap: 3rem;
}
.story-sticky {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.portrait {
  width: min(16rem, 60%);
  border-radius: 1.5rem;
  overflow: hidden;
  border: 1px solid var(--c-line-2);
  box-shadow: 0 30px 70px -30px var(--glow);
}
.portrait img {
  display: block;
  width: 100%;
  aspect-ratio: 4 / 5;
  object-fit: cover;
}
.chapter-nav {
  display: none;
}
.chapters {
  display: flex;
  flex-direction: column;
  gap: 2rem;
}
.chapter {
  padding: 1.75rem 0 2rem;
  border-top: 1px solid var(--c-line);
  opacity: 0.45;
  transition: opacity 0.5s var(--ease-out);
}
.chapter.on {
  opacity: 1;
  border-top-color: var(--c-ember);
}
.chapter-title {
  font-size: var(--text-h3);
  font-weight: 600;
  margin-bottom: 1rem;
  line-height: 1.1;
}
.chapter-body {
  max-width: 58ch;
  font-size: clamp(1.1rem, 1rem + 0.5vw, 1.35rem);
  line-height: 1.7;
  color: var(--c-ink-2);
}
@media (min-width: 1024px) {
  .story {
    grid-template-columns: 5fr 7fr;
    gap: 6rem;
  }
  .story-sticky {
    position: sticky;
    top: 7rem;
    align-self: start;
  }
  .chapters {
    gap: 0;
  }
  .chapter {
    min-height: 62vh;
    padding-top: 2.5rem;
  }
  .chapter-nav {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }
  .chapter-nav li {
    display: flex;
    gap: 0.9rem;
    align-items: baseline;
    color: var(--c-ink-3);
    transition: color 0.3s;
  }
  .chapter-nav li.on {
    color: var(--c-ink);
  }
  .chapter-nav li.on span:first-child {
    color: var(--c-ember-ink);
  }
}
</style>
