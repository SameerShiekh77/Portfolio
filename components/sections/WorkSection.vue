<template>
  <section id="work" ref="root" class="work" aria-labelledby="work-title">
    <div ref="pinEl" class="pin">
      <div class="wrap head">
        <h2 id="work-title" class="h2">Production systems I've built and run</h2>
        <p class="lede">{{ projects.length }} platforms in production. Open any card for the problem, architecture and what changed.</p>
      </div>

      <div class="viewport" tabindex="0" role="group" aria-label="Project cards, scroll horizontally">
        <ul ref="trackEl" class="track">
          <li v-for="p in projects" :key="p.slug" class="slot">
            <article class="card" @pointermove="tilt($event)" @pointerleave="untilt($event)">
              <div class="shot">
                <NuxtImg v-if="p.screenshots[0]" :src="p.screenshots[0]" :alt="`${p.title} interface`" width="640" height="400" format="webp" loading="lazy" />
                <div v-else class="shot-fallback" aria-hidden="true">
                  <DynamicIcon :name="p.icon" class="w-14 h-14" />
                </div>
                <span class="status"><span class="dot" aria-hidden="true" />{{ p.status }}</span>
              </div>
              <div class="body">
                <h3 class="card-title">{{ p.title }}</h3>
                <p class="card-tag">{{ p.tagline }}</p>
                <dl class="metrics">
                  <div v-for="m in p.metrics" :key="m.label">
                    <dd class="font-display heat-text">{{ m.value }}</dd>
                    <dt>{{ m.label }}</dt>
                  </div>
                </dl>
                <div class="flex flex-wrap gap-1.5 mb-5">
                  <span v-for="t in p.technologies.slice(0, 4)" :key="t" class="tag">{{ t }}</span>
                </div>
                <button type="button" class="more" @click="selected = p">
                  Read case study
                  <ArrowUpRight class="w-4 h-4" aria-hidden="true" />
                  <span class="sr-only">for {{ p.title }}</span>
                </button>
              </div>
            </article>
          </li>
        </ul>
      </div>
    </div>

    <ProjectDialog :project="selected" @close="selected = null" />
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ArrowUpRight } from '@lucide/vue'
import DynamicIcon from '../ui/DynamicIcon.vue'
import ProjectDialog from './ProjectDialog.vue'
import { projects, type Project } from '../../data/projects'

const root = ref<HTMLElement | null>(null)
const pinEl = ref<HTMLElement | null>(null)
const trackEl = ref<HTMLElement | null>(null)
const selected = ref<Project | null>(null)
let mm: gsap.MatchMedia | null = null

onMounted(() => {
  mm = gsap.matchMedia()
  // Desktop: the section pins and the cards travel sideways as you scroll down.
  // Everywhere else the viewport is a native, snap-scrolling strip - no pin, no hijacked scroll.
  mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', () => {
    const track = trackEl.value
    const pin = pinEl.value
    if (!track || !pin) return
    const distance = () => Math.max(0, track.scrollWidth - track.parentElement!.clientWidth)
    gsap.to(track, {
      x: () => -distance(),
      ease: 'none',
      scrollTrigger: {
        trigger: pin,
        pin: true,
        scrub: 0.6,
        start: 'top top',
        end: () => `+=${distance()}`,
        invalidateOnRefresh: true,
      },
    })
  })
})

onBeforeUnmount(() => mm?.revert())

// Pointer-driven 3D tilt. Only writes CSS variables, so it stays off the layout path.
const tilt = (e: PointerEvent) => {
  const card = e.currentTarget as HTMLElement
  if (e.pointerType !== 'mouse') return
  const r = card.getBoundingClientRect()
  card.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 9}deg`)
  card.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -9}deg`)
  card.style.setProperty('--mx', `${((e.clientX - r.left) / r.width) * 100}%`)
  card.style.setProperty('--my', `${((e.clientY - r.top) / r.height) * 100}%`)
}
const untilt = (e: PointerEvent) => {
  const card = e.currentTarget as HTMLElement
  card.style.setProperty('--rx', '0deg')
  card.style.setProperty('--ry', '0deg')
}
</script>

<style scoped>
.work {
  position: relative;
  z-index: 1;
  padding-block: clamp(5rem, 9vw, 8rem);
}
.pin {
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: clamp(2rem, 4vw, 3.5rem);
}
@media (min-width: 1024px) {
  .pin {
    min-height: 100svh;
    padding-block: 5.5rem 2rem;
  }
}
.head {
  display: flex;
  flex-direction: column;
  gap: 1.25rem;
}
@media (min-width: 1024px) {
  .head {
    flex-direction: row;
    align-items: flex-end;
    justify-content: space-between;
  }
  .head .h2 {
    max-width: 18ch;
    font-size: clamp(2.25rem, 1.2rem + 2.6vw, 4rem);
  }
}
.lede {
  max-width: 36ch;
  color: var(--c-ink-2);
}
.viewport {
  overflow-x: auto;
  scroll-snap-type: x proximity;
  padding-inline: var(--gutter);
  padding-block: 1.5rem 2rem;
  scrollbar-width: thin;
}
@media (min-width: 1024px) {
  .viewport {
    overflow: visible;
  }
}
.track {
  display: flex;
  gap: clamp(1rem, 2vw, 1.75rem);
  width: max-content;
  will-change: transform;
}
.slot {
  width: min(84vw, 28rem);
  scroll-snap-align: start;
  perspective: 1200px;
}
.card {
  --rx: 0deg;
  --ry: 0deg;
  --mx: 50%;
  --my: 0%;
  position: relative;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 1.5rem;
  border: 1px solid var(--c-line);
  background: var(--c-bg-2);
  overflow: hidden;
  transform: rotateX(var(--rx)) rotateY(var(--ry));
  transform-style: preserve-3d;
  transition: transform 0.45s var(--ease-out), border-color 0.3s, box-shadow 0.4s;
}
.card::after {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: radial-gradient(22rem circle at var(--mx) var(--my), var(--glow), transparent 60%);
  opacity: 0;
  transition: opacity 0.3s;
}
.card:hover,
.card:focus-within {
  border-color: var(--c-ember);
  box-shadow: 0 30px 70px -30px var(--glow);
}
.card:hover::after {
  opacity: 0.7;
}
.shot {
  position: relative;
  aspect-ratio: 16 / 10;
  background: var(--c-surface-2);
  overflow: hidden;
}
.shot img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: top;
  display: block;
}
.shot-fallback {
  position: absolute;
  inset: 0;
  display: grid;
  place-items: center;
  color: var(--c-ember-ink);
  background: radial-gradient(circle at 30% 20%, var(--glow), transparent 70%), var(--c-surface);
}
.status {
  position: absolute;
  top: 0.9rem;
  left: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.45rem;
  padding: 0.3rem 0.75rem;
  border-radius: 999px;
  background: color-mix(in srgb, var(--c-bg) 80%, transparent);
  backdrop-filter: blur(8px);
  font-size: 0.78rem;
  font-weight: 700;
  color: var(--c-ink);
}
.dot {
  width: 0.45rem;
  height: 0.45rem;
  border-radius: 50%;
  background: var(--c-mint);
}
.body {
  display: flex;
  flex: 1;
  flex-direction: column;
  padding: 1.4rem 1.5rem 1.6rem;
}
.card-title {
  font-size: 1.45rem;
  font-weight: 600;
  line-height: 1.15;
}
.card-tag {
  margin-top: 0.5rem;
  color: var(--c-ink-2);
  font-size: 0.95rem;
  line-height: 1.5;
  min-height: 3em;
}
.metrics {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 0.75rem;
  margin-block: 1.2rem;
  padding-block: 1rem;
  border-block: 1px solid var(--c-line);
}
.metrics dd {
  font-size: 1.7rem;
  font-weight: 600;
  line-height: 1;
  width: fit-content;
}
.metrics dt {
  margin-top: 0.3rem;
  font-size: 0.78rem;
  color: var(--c-ink-3);
}
.more {
  margin-top: auto;
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-weight: 700;
  color: var(--c-ember-ink);
  width: fit-content;
}
.more:hover {
  text-decoration: underline;
  text-underline-offset: 4px;
}
</style>
