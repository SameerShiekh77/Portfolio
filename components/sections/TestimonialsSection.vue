<template>
  <section id="testimonials" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="testimonials-heading">
    <div
      class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 opacity-[0.05] pointer-events-none rounded-full"
      style="background: radial-gradient(circle, var(--color-accent-clay), transparent)"
      aria-hidden="true"
    />

    <div class="container mx-auto px-6 lg:px-12 relative">
      <SectionHeader title-id="testimonials-heading" stage="monitor" title="What People Say" accent="Say" />

      <div
        class="max-w-3xl mx-auto"
        @mouseenter="paused = true"
        @mouseleave="paused = false"
        @focusin="paused = true"
        @focusout="paused = false"
      >
        <!-- mode="out-in" keeps exactly one testimonial in the DOM. The previous build
             stacked the neighbouring card behind at 20% opacity, which showed through the
             active one as ghost text. min-height holds the layout steady between quotes. -->
        <div class="relative min-h-[22rem] sm:min-h-[19rem]">
          <Transition name="quote" mode="out-in">
            <figure
              :key="active.name"
              class="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-8 sm:p-10"
            >
              <div class="flex items-center gap-1 mb-6" :aria-label="`Rated 5 out of 5 by ${active.name}`">
                <Star v-for="s in 5" :key="s" class="w-4 h-4 text-[var(--color-accent-gold)] fill-current" aria-hidden="true" />
              </div>

              <blockquote class="text-[var(--color-text-primary)] text-lg sm:text-xl leading-relaxed">
                {{ active.text }}
              </blockquote>

              <figcaption class="flex items-center gap-4 mt-8 pt-6 border-t border-[var(--color-border-subtle)]">
                <!-- Initials are the base layer and a photo fades in over them only once
                     it actually decodes. Several of these are hotlinked LinkedIn URLs with
                     expiring tokens which hang rather than firing `error`, so an
                     error-triggered fallback never runs and leaves an empty circle. -->
                <span
                  class="relative w-12 h-12 rounded-full shrink-0 overflow-hidden flex items-center justify-center text-sm font-bold text-white border border-[var(--color-border-subtle)]"
                  style="background: var(--gradient-primary)"
                >
                  <span aria-hidden="true">{{ initials(active.name) }}</span>
                  <img
                    :src="active.image"
                    alt=""
                    width="48"
                    height="48"
                    loading="lazy"
                    referrerpolicy="no-referrer"
                    class="absolute inset-0 w-full h-full object-cover transition-opacity duration-300"
                    :class="loadedAvatars.has(active.name) ? 'opacity-100' : 'opacity-0'"
                    @load="loadedAvatars.add(active.name)"
                  />
                </span>

                <span class="min-w-0">
                  <span class="block text-[var(--color-text-primary)] font-bold">{{ active.name }}</span>
                  <span class="block text-[var(--color-text-secondary)] text-sm">{{ active.role }}</span>
                </span>
              </figcaption>
            </figure>
          </Transition>
        </div>

        <div class="flex items-center justify-between gap-6 mt-8">
          <div class="flex flex-wrap gap-2" role="tablist" aria-label="Choose a testimonial">
            <button
              v-for="(t, i) in testimonials"
              :key="t.name"
              type="button"
              role="tab"
              :aria-selected="currentIndex === i"
              :aria-label="`Testimonial from ${t.name}`"
              class="h-2 rounded-full transition-all duration-300"
              :class="currentIndex === i
                ? 'w-8 bg-[var(--color-accent-clay)]'
                : 'w-2 bg-[var(--color-border-strong)] hover:bg-[var(--color-accent-clay-light)]'"
              @click="goTo(i)"
            />
          </div>

          <div class="flex gap-3 shrink-0">
            <button
              type="button"
              aria-label="Previous testimonial"
              class="w-11 h-11 rounded-xl border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)] transition-all duration-300"
              @click="step(-1)"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              class="w-11 h-11 rounded-xl border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)] transition-all duration-300"
              @click="step(1)"
            >
              <ChevronRight class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, computed, reactive, onMounted, onUnmounted } from 'vue'
import { Star, ChevronLeft, ChevronRight } from '@lucide/vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { testimonials } from '../../data/testimonials'
import { useReducedMotion } from '../../composables/useReducedMotion'

const currentIndex = ref(0)
const paused = ref(false)
const loadedAvatars = reactive(new Set<string>())
const { prefersReduced } = useReducedMotion()
let autoplay: ReturnType<typeof setInterval> | null = null

const active = computed(() => testimonials[currentIndex.value]!)

const initials = (name: string) =>
  name.split(' ').filter(Boolean).slice(0, 2).map((n) => n[0]!.toUpperCase()).join('')

const goTo = (i: number) => (currentIndex.value = i)
// Wraps rather than dead-ending: with seven quotes, disabled arrows at the extremes just
// looked broken.
const step = (delta: number) => {
  currentIndex.value = (currentIndex.value + delta + testimonials.length) % testimonials.length
}

onMounted(() => {
  if (prefersReduced.value) return
  autoplay = setInterval(() => {
    if (!paused.value) step(1)
  }, 7000)
})
onUnmounted(() => {
  if (autoplay) clearInterval(autoplay)
})
</script>

<style scoped>
.quote-enter-active,
.quote-leave-active {
  transition: opacity 0.35s var(--ease-expo-out), transform 0.35s var(--ease-expo-out);
}
.quote-enter-from {
  opacity: 0;
  transform: translateY(12px);
}
.quote-leave-to {
  opacity: 0;
  transform: translateY(-12px);
}

@media (prefers-reduced-motion: reduce) {
  .quote-enter-active,
  .quote-leave-active {
    transition: none;
  }
}
</style>
