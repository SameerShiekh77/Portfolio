<template>
  <section id="journey" ref="sectionEl" class="relative" aria-labelledby="journey-heading">
    <!-- The heading travels with the track: pinning only the track left the title behind
         and parked a short strip in an otherwise empty viewport. On desktop this wrapper
         is exactly one screen tall, so the pinned state fills the view instead of leaving
         a gap underneath. -->
    <div ref="pinWrapEl" class="py-24 lg:py-0 lg:h-screen lg:flex lg:flex-col lg:justify-center overflow-hidden">
      <div class="container mx-auto px-6 lg:px-12">
        <SectionHeader
          title-id="journey-heading"
          stage="history"
          title="My Engineering Journey"
          accent="Journey"
          subtitle="From a computer science classroom to leading a 12-engineer team - the milestones along the way."
        />
      </div>

      <div ref="viewportEl" class="lg:overflow-hidden">
        <div
          ref="trackEl"
          class="flex gap-5 px-6 lg:px-12 pb-4 overflow-x-auto lg:overflow-visible snap-x snap-mandatory lg:snap-none scrollbar-none"
        >
          <div
            v-for="(m, i) in milestones"
            :key="m.title + i"
            class="group relative shrink-0 w-[280px] sm:w-[320px] snap-start rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-6 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-500"
          >
            <div
              class="w-11 h-11 rounded-2xl flex items-center justify-center mb-5"
              :style="{ background: typeColor(m.type) + '18', border: `1px solid ${typeColor(m.type)}40` }"
            >
              <component :is="typeIcon(m.type)" class="w-5 h-5" :style="{ color: typeColor(m.type) }" aria-hidden="true" />
            </div>
            <span class="text-xs font-mono uppercase tracking-widest text-[var(--color-text-muted)]">{{ m.date }}</span>
            <h3 class="text-lg font-bold text-[var(--color-text-primary)] mt-1.5 mb-2 group-hover:text-[var(--color-accent-clay-ink)] transition-colors">
              {{ m.title }}
            </h3>
            <p class="text-[var(--color-text-secondary)] text-sm leading-relaxed">{{ m.detail }}</p>
          </div>
        </div>
      </div>
      <p class="lg:hidden text-center text-xs text-[var(--color-text-muted)] mt-3 font-mono">swipe to explore →</p>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, type Component } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { GraduationCap, Briefcase, Users, Trophy } from '@lucide/vue'
import SectionHeader from '../ui/SectionHeader.vue'
import { milestones, type Milestone } from '../../data/experience'
import { useReducedMotion } from '../../composables/useReducedMotion'

const sectionEl = ref<HTMLElement | null>(null)
const pinWrapEl = ref<HTMLElement | null>(null)
const viewportEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()

const typeIcon = (type: Milestone['type']): Component => {
  switch (type) {
    case 'education': return GraduationCap
    case 'leadership': return Users
    case 'achievement': return Trophy
    default: return Briefcase
  }
}

const typeColor = (type: Milestone['type']) => {
  switch (type) {
    case 'education': return 'var(--color-accent-olive)'
    case 'leadership': return '#f472b6'
    case 'achievement': return 'var(--color-accent-gold)'
    default: return 'var(--color-accent-clay-light)'
  }
}

let st: ScrollTrigger | null = null
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  if (prefersReduced.value) return
  gsap.registerPlugin(ScrollTrigger)

  mm = gsap.matchMedia()
  mm.add('(min-width: 1024px)', () => {
    if (!trackEl.value || !viewportEl.value) return

    // Measured lazily, never captured: ScrollTrigger.refresh() re-runs these when fonts,
    // images or lazy-loaded sections change the layout. A captured constant would leave
    // the scroll distance and the tween's end position disagreeing after any refresh.
    const distance = () => Math.max(0, (trackEl.value?.scrollWidth ?? 0) - (viewportEl.value?.offsetWidth ?? 0))
    if (distance() <= 0) return

    const tween = gsap.to(trackEl.value, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: sectionEl.value,
        start: 'top top',
        end: () => `+=${distance()}`,
        pin: pinWrapEl.value,
        scrub: 0.6,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      },
    })
    st = tween.scrollTrigger ?? null

    return () => {
      st?.kill()
      gsap.set(trackEl.value, { clearProps: 'x' })
    }
  })
})

onUnmounted(() => {
  mm?.revert()
})
</script>

<style scoped>
.scrollbar-none {
  scrollbar-width: none;
}
.scrollbar-none::-webkit-scrollbar {
  display: none;
}
</style>
