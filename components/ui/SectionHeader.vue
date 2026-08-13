<template>
  <div class="mb-16 lg:mb-20" :class="align === 'center' ? 'text-center mx-auto max-w-2xl' : 'text-left'">
    <!-- Pipeline stage badge: renders the section as a step in the deploy narrative. -->

    <RevealText :id="titleId" as="h2" split-by="words" class="font-display font-bold leading-[1.03]" style="font-size: var(--text-h1)">
      {{ titleBefore }}<span v-if="accent" class="text-gradient">{{ accent }}</span>{{ titleAfter }}
    </RevealText>

    <p
      v-if="subtitle"
      class="text-[var(--color-text-secondary)] text-lg mt-5 max-w-2xl"
      :class="align === 'center' ? 'mx-auto' : ''"
    >
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import RevealText from './RevealText.vue'

const props = withDefaults(
  defineProps<{
    /** Pipeline stage id from data/pipeline.ts - drives the terminal-style badge. */
    stage: string
    title: string
    accent?: string
    subtitle?: string
    align?: 'center' | 'left'
    titleId?: string
    /** Overrides the stage command when a section needs bespoke wording. */
    eyebrow?: string
  }>(),
  { align: 'center' }
)

const titleBefore = computed(() => (props.accent ? props.title.split(props.accent)[0] : props.title))
const titleAfter = computed(() => (props.accent ? props.title.split(props.accent)[1] ?? '' : ''))
</script>
