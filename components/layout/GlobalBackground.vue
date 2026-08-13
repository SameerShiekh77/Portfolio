<template>
  <div class="fixed inset-0 -z-10 pointer-events-none" aria-hidden="true">
    <!-- Base plate: token-driven, so it rides the sand -> cream journey. -->
    <div class="absolute inset-0 transition-none" :style="{ background: 'var(--color-bg-base)' }" />

    <!-- Warm washes, strongest at the sand end where there is tone to tint, easing off as
         the page brightens toward cream and they would only read as smudges. -->
    <div
      class="absolute inset-0"
      :style="{ opacity: 1 - progress * 0.7 }"
    >
      <div
        class="absolute -top-40 left-1/4 w-[46rem] h-[46rem] rounded-full"
        style="background: radial-gradient(circle, rgba(176, 96, 58, 0.13) 0%, transparent 68%)"
      />
      <div
        class="absolute top-1/3 -right-40 w-[38rem] h-[38rem] rounded-full"
        style="background: radial-gradient(circle, rgba(154, 123, 79, 0.12) 0%, transparent 68%)"
      />
      <div
        class="absolute bottom-0 left-0 w-[34rem] h-[34rem] rounded-full"
        style="background: radial-gradient(circle, rgba(95, 107, 78, 0.09) 0%, transparent 68%)"
      />
    </div>

    <!-- Grid gains presence in the light half, echoing blueprint/schematic paper. -->
    <div
      class="absolute inset-0"
      :style="{
        opacity: 0.25 + progress * 0.35,
        backgroundImage:
          'linear-gradient(var(--color-border-subtle) 1px, transparent 1px), linear-gradient(90deg, var(--color-border-subtle) 1px, transparent 1px)',
        backgroundSize: '64px 64px',
        maskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 78%)',
        WebkitMaskImage: 'radial-gradient(ellipse at 50% 40%, black 20%, transparent 78%)',
      }"
    />

    <div class="absolute inset-0 noise-overlay" :style="{ opacity: 0.03 - progress * 0.015 }" />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { journeyProgress } from '../../composables/useThemeJourney'

const progress = computed(() => journeyProgress.value)
</script>
