<template>
  <section id="testimonials" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="testimonials-heading">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-150 h-150 opacity-[0.06] pointer-events-none rounded-full" style="background: radial-gradient(circle, var(--color-accent-clay), transparent)" aria-hidden="true" />

    <div class="container mx-auto px-6 lg:px-12 relative">
      <SectionHeader title-id="testimonials-heading" stage="monitor" title="What People Say" accent="Say" />

      <div class="max-w-4xl mx-auto relative" @mouseenter="paused = true" @mouseleave="paused = false">
        <div class="relative min-h-70 sm:min-h-60">
          <div
            v-for="(t, i) in testimonials"
            :key="t.name"
            class="absolute inset-x-0 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-8 lg:p-12 transition-all duration-700"
            :class="cardClasses(i)"
            :aria-hidden="currentIndex !== i"
          >
            <div class="absolute top-6 right-8 text-8xl leading-none font-black select-none" style="color: rgba(176, 96, 58, 0.14)" aria-hidden="true">"</div>

            <div class="flex gap-1 mb-6" aria-hidden="true">
              <Star v-for="s in 5" :key="s" class="w-4 h-4 text-[var(--color-accent-gold-ink)] fill-current" />
            </div>

            <p class="text-[var(--color-text-primary)] text-base lg:text-lg leading-relaxed italic mb-8 relative z-10">"{{ t.text }}"</p>

            <div class="flex items-center gap-4">
              <div class="relative shrink-0">
                <div class="absolute inset-0 rounded-full blur-lg opacity-40" style="background: var(--gradient-primary)" aria-hidden="true" />
                <img :src="t.image" :alt="t.name" width="48" height="48" loading="lazy" class="relative w-12 h-12 rounded-full object-cover border border-[var(--color-accent-clay)]/30" />
              </div>
              <div>
                <div class="text-[var(--color-text-primary)] font-bold">{{ t.name }}</div>
                <div class="text-[var(--color-text-muted)] text-sm">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>

        <div class="flex items-center justify-between mt-10 pt-8 border-t border-[var(--color-border-subtle)]">
          <div class="flex gap-2" role="tablist" aria-label="Select testimonial">
            <button
              v-for="(t, i) in testimonials"
              :key="t.name"
              type="button"
              role="tab"
              :aria-selected="currentIndex === i"
              :aria-label="`Testimonial from ${t.name}`"
              class="transition-all duration-300 rounded-full"
              :class="currentIndex === i ? 'w-8 h-2 bg-[var(--color-accent-clay)]' : 'w-2 h-2 bg-[var(--color-surface-3)] hover:bg-[var(--color-surface-3)]'"
              @click="goTo(i)"
            />
          </div>

          <div class="flex gap-3">
            <button
              type="button"
              aria-label="Previous testimonial"
              class="w-11 h-11 rounded-xl border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)] transition-all duration-300"
              :class="{ 'opacity-30 cursor-not-allowed': currentIndex === 0 }"
              :disabled="currentIndex === 0"
              @click="prev"
            >
              <ChevronLeft class="w-4 h-4" />
            </button>
            <button
              type="button"
              aria-label="Next testimonial"
              class="w-11 h-11 rounded-xl border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)] transition-all duration-300"
              :class="{ 'opacity-30 cursor-not-allowed': currentIndex === testimonials.length - 1 }"
              :disabled="currentIndex === testimonials.length - 1"
              @click="next"
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
import { ref, onMounted, onUnmounted } from 'vue'
import { Star, ChevronLeft, ChevronRight } from '@lucide/vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { testimonials } from '../../data/testimonials'
import { useReducedMotion } from '../../composables/useReducedMotion'

const currentIndex = ref(0)
const paused = ref(false)
const { prefersReduced } = useReducedMotion()
let autoplay: ReturnType<typeof setInterval> | null = null

const cardClasses = (i: number) => {
  const diff = i - currentIndex.value
  if (diff === 0) return 'relative z-20 opacity-100 scale-100 translate-y-0 pointer-events-auto'
  if (diff === -1) return 'z-10 opacity-0 pointer-events-none translate-y-4 scale-95'
  if (diff === 1) return 'z-10 opacity-20 pointer-events-none translate-y-2 scale-97'
  return 'opacity-0 pointer-events-none z-0'
}

const goTo = (i: number) => (currentIndex.value = i)
const prev = () => currentIndex.value > 0 && currentIndex.value--
const next = () => currentIndex.value < testimonials.length - 1 && currentIndex.value++

onMounted(() => {
  if (prefersReduced.value) return
  autoplay = setInterval(() => {
    if (paused.value) return
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 6000)
})
onUnmounted(() => {
  if (autoplay) clearInterval(autoplay)
})
</script>
