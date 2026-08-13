<template>
  <!-- Top progress hairline (all breakpoints) -->
  <div class="fixed top-0 left-0 w-full h-0.5 z-50 pointer-events-none" aria-hidden="true">
    <div class="h-full" :style="{ width: `${progress * 100}%`, background: 'var(--gradient-primary)' }" />
  </div>

  <!-- Desktop stage rail -->
  <nav
    class="hidden xl:flex fixed left-8 top-1/2 -translate-y-1/2 z-40 flex-col gap-0 pointer-events-none"
    aria-label="Deployment pipeline progress"
  >
    <div
      v-for="(stage, i) in pipelineStages"
      :key="stage.id"
      class="group relative flex items-center gap-3 h-9"
    >
      <span
        v-if="i < pipelineStages.length - 1"
        class="absolute left-[5px] top-[18px] w-px h-9 -z-10"
        :style="{ background: i < activeIndex ? 'var(--color-accent-clay)' : 'var(--color-border-subtle)' }"
        aria-hidden="true"
      />

      <span
        class="w-[11px] h-[11px] rounded-full border shrink-0 transition-all duration-500"
        :style="dotStyle(i)"
        aria-hidden="true"
      />

      <!-- Labels only once the viewport is wide enough that they clear the content column;
           between xl and 2xl the rail reads as dots alone rather than colliding with headlines. -->
      <span
        class="hidden 2xl:inline text-[11px] font-mono uppercase tracking-widest transition-all duration-500 whitespace-nowrap"
        :style="{
          color: i === activeIndex ? 'var(--color-text-primary)' : 'var(--color-text-muted)',
          opacity: i === activeIndex ? 1 : 0.45,
          transform: i === activeIndex ? 'translateX(2px)' : 'none',
        }"
      >
        {{ stage.label }}
      </span>
    </div>
  </nav>

</template>

<script setup lang="ts">
import { computed, ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { pipelineStages } from '../../data/pipeline'
import { journeyProgress } from '../../composables/useThemeJourney'

const activeIndex = ref(0)
const triggers: ScrollTrigger[] = []

const progress = computed(() => journeyProgress.value)

const dotStyle = (i: number) => {
  if (i < activeIndex.value) {
    return { background: 'var(--color-accent-clay)', borderColor: 'var(--color-accent-clay)' }
  }
  if (i === activeIndex.value) {
    return {
      background: 'var(--color-accent-olive)',
      borderColor: 'var(--color-accent-olive)',
      boxShadow: '0 0 0 4px color-mix(in srgb, var(--color-accent-olive) 22%, transparent)',
      transform: 'scale(1.25)',
    }
  }
  return { background: 'transparent', borderColor: 'var(--color-border-strong)' }
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  pipelineStages.forEach((stage, i) => {
    const el = document.getElementById(stage.section)
    if (!el) return
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) activeIndex.value = i
        },
      })
    )
  })

})

onUnmounted(() => triggers.forEach((t) => t.kill()))
</script>
