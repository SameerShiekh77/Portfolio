<template>
  <section id="story" ref="sectionEl" class="relative py-24 lg:py-32 overflow-hidden" aria-labelledby="story-heading">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16">
        <!-- CSS sticky rather than a GSAP pin: a pin with pinSpacing:false took the label
             out of flow, so the paragraph column scrolled independently and ran up under
             the fixed nav. Sticky keeps it in flow, needs no pin-spacer, and survives the
             ScrollTrigger refreshes that happen when content below this section loads. -->
        <div class="lg:col-span-4 lg:sticky lg:top-28 lg:self-start">
          <h2 id="story-heading" class="font-display font-bold leading-[1.03] text-[var(--color-text-primary)]" style="font-size: var(--text-h1)">
            Who I <span class="text-gradient">Am</span>
          </h2>
          <p class="text-[var(--color-text-secondary)] text-lg mt-5 max-w-sm">
            Not a straight line from student to engineer - a series of pulls toward harder, more foundational problems.
          </p>
        </div>

        <div class="lg:col-span-7 lg:col-start-6 space-y-14">
          <article
            v-for="(para, i) in storyParagraphs"
            :key="para.heading"
            :ref="(el) => setParaRef(el, i)"
            class="relative pl-8 border-l border-[var(--color-border-subtle)]"
          >
            <span class="absolute -left-[7px] top-1 w-3.5 h-3.5 rounded-full border-2 border-[var(--color-accent-clay-light)] bg-[var(--color-bg-base)]" aria-hidden="true" />
            <span class="block text-xs font-mono uppercase tracking-widest text-[var(--color-accent-clay-ink)] mb-2">{{ String(i + 1).padStart(2, '0') }} - {{ para.heading }}</span>
            <p class="text-[var(--color-text-primary)] text-lg sm:text-xl leading-relaxed">{{ para.text }}</p>
          </article>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { storyParagraphs } from '../../data/profile'
import { useScrollReveal } from '../../composables/useScrollReveal'

const sectionEl = ref<HTMLElement | null>(null)
const paraRefs: HTMLElement[] = []
const { reveal } = useScrollReveal()

const setParaRef = (el: unknown, i: number) => {
  if (el instanceof HTMLElement) paraRefs[i] = el
}

onMounted(() => {
  paraRefs.forEach((el) => {
    reveal(el, { y: 28, start: 'top 80%' })
  })
})
</script>
