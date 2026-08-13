<template>
  <component :is="as" ref="rootEl"><slot /></component>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useReducedMotion } from '../../composables/useReducedMotion'
import { easeGsap } from '../../utils/motion'

const props = withDefaults(
  defineProps<{
    as?: string
    splitBy?: 'chars' | 'words' | 'lines'
    useScrollTrigger?: boolean
    delay?: number
    staggerAmount?: number
  }>(),
  {
    as: 'div',
    splitBy: 'words',
    useScrollTrigger: true,
    delay: 0,
    staggerAmount: undefined,
  }
)

const rootEl = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()
let split: SplitText | null = null

onMounted(() => {
  if (!rootEl.value || prefersReduced.value) return

  gsap.registerPlugin(SplitText, ScrollTrigger)

  // Gradient spans must stay intact: splitting them leaves each fragment with the
  // inherited transparent text-fill but no background of its own, rendering the word
  // invisible - and even patched, a per-word gradient restarts mid-phrase.
  split = SplitText.create(rootEl.value, { type: props.splitBy, ignore: '.text-gradient' })
  const targets = props.splitBy === 'lines' ? split.lines : props.splitBy === 'chars' ? split.chars : split.words

  gsap.set(targets, { opacity: 0, y: 24, filter: 'blur(6px)' })

  gsap.to(targets, {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    duration: 0.8,
    ease: easeGsap.expoOut,
    stagger: props.staggerAmount ?? (props.splitBy === 'chars' ? 0.018 : 0.05),
    delay: props.delay,
    scrollTrigger: props.useScrollTrigger ? { trigger: rootEl.value, start: 'top 85%', once: true } : undefined,
  })
})

onUnmounted(() => {
  split?.revert()
})
</script>
