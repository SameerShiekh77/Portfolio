<template>
  <section id="top" ref="root" class="hero" aria-labelledby="hero-name">
    <div class="wrap hero-grid">
      <div class="hero-copy">
        <p class="chip" data-hero>
          <span class="dot" aria-hidden="true" />
          {{ profile.availability }}
        </p>

        <h1 id="hero-name" class="hero-name">
          <span class="mask"><span class="line" data-line>Muhammad</span></span>
          <span class="mask"><span class="line" data-line>Sameer</span></span>
        </h1>

        <p class="hero-title" data-hero>
          <span class="text-ink font-semibold">{{ hero.title }}</span>
          <span class="bar" aria-hidden="true" />
          <span class="heat-text font-semibold">{{ hero.subtitle }}</span>
        </p>

        <p class="hero-tag" data-hero>{{ hero.tagline }}</p>

        <div class="flex flex-wrap items-center gap-3" data-hero>
          <a href="#work" class="btn btn-primary">
            See the work
            <ArrowDown class="w-4 h-4" aria-hidden="true" />
          </a>
          <a href="#contact" class="btn btn-ghost">Get in touch</a>
          <a :href="profile.resumeFile" download class="btn btn-ghost">
            <Download class="w-4 h-4" aria-hidden="true" />
            Resume
          </a>
        </div>
      </div>

      <dl class="stats" data-hero>
        <div v-for="s in hero.stats" :key="s.label" class="stat">
          <dt class="text-ink-3 text-sm">{{ s.label }}</dt>
          <dd class="font-display stat-value">
            <span data-count :data-to="s.value" :data-decimals="'decimals' in s ? s.decimals : 0">{{ s.value }}</span
            >{{ s.suffix }}
          </dd>
        </div>
      </dl>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ArrowDown, Download } from '@lucide/vue'
import { hero } from '../../data/site'
import { profile } from '../../data/profile'
import { useReducedMotion } from '../../composables/useReducedMotion'

const root = ref<HTMLElement | null>(null)
const { prefersReduced } = useReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (prefersReduced.value || !root.value) return
  ctx = gsap.context(() => {
    // fromTo with explicit end states: a bare .from() leaves copy invisible if the tween is disturbed.
    const tl = gsap.timeline({ defaults: { ease: 'expo.out', immediateRender: false }, delay: 0.15 })
    tl.fromTo('[data-line]', { yPercent: 115 }, { yPercent: 0, duration: 1.3, stagger: 0.12 })
      .fromTo('[data-hero]', { opacity: 0, y: 22 }, { opacity: 1, y: 0, duration: 0.9, stagger: 0.1, clearProps: 'opacity,transform' }, '-=0.8')

    root.value!.querySelectorAll<HTMLElement>('[data-count]').forEach((el) => {
      const to = Number(el.dataset.to)
      const decimals = Number(el.dataset.decimals)
      const obj = { v: 0 }
      gsap.to(obj, {
        v: to,
        duration: 2,
        delay: 0.9,
        ease: 'power3.out',
        onUpdate: () => (el.textContent = obj.v.toFixed(decimals)),
        onComplete: () => (el.textContent = to.toFixed(decimals)),
      })
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.hero {
  position: relative;
  z-index: 1;
  min-height: 100svh;
  display: flex;
  align-items: flex-end;
  padding-top: 8rem;
  padding-bottom: clamp(2rem, 5vw, 4rem);
}
.hero-grid {
  display: grid;
  gap: clamp(2rem, 5vw, 4rem);
}
.hero-copy {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.6rem;
}
.chip {
  display: inline-flex;
  align-items: center;
  gap: 0.6rem;
  padding: 0.45rem 1rem 0.45rem 0.8rem;
  border-radius: 999px;
  border: 1px solid var(--c-line-2);
  background: var(--c-surface);
  backdrop-filter: blur(10px);
  font-size: 0.85rem;
  font-weight: 600;
  color: var(--c-ink-2);
}
.dot {
  width: 0.55rem;
  height: 0.55rem;
  border-radius: 50%;
  background: var(--c-mint);
  box-shadow: 0 0 0 0 var(--c-mint);
  animation: ping 2.2s infinite;
}
@keyframes ping {
  70% { box-shadow: 0 0 0 0.6rem transparent; }
  100% { box-shadow: 0 0 0 0 transparent; }
}
.hero-name {
  font-size: clamp(3.25rem, 1.25rem + 7.4vw, 9.5rem);
  font-weight: 700;
  line-height: 0.88;
  letter-spacing: -0.045em;
}
/* The mask clips the sliding line; a little bottom padding stops descenders being cut. */
.mask {
  display: block;
  overflow: hidden;
  padding-bottom: 0.08em;
  margin-bottom: -0.08em;
}
.line {
  display: block;
}
.hero-title {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.5rem 1rem;
  font-size: clamp(1.1rem, 0.9rem + 0.9vw, 1.6rem);
}
.bar {
  width: 1px;
  height: 1.3em;
  background: var(--c-line-2);
}
.hero-tag {
  max-width: 34ch;
  font-size: clamp(1.15rem, 1rem + 0.7vw, 1.5rem);
  line-height: 1.45;
  color: var(--c-ink-2);
}
.stats {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  border-top: 1px solid var(--c-line-2);
}
.stat {
  display: flex;
  flex-direction: column-reverse;
  padding: 1.2rem 0 0.4rem;
}
.stat + .stat {
  padding-left: 0;
}
.stat-value {
  font-size: clamp(2rem, 1.4rem + 2.2vw, 3.5rem);
  font-weight: 600;
  line-height: 1;
  letter-spacing: -0.03em;
}
@media (min-width: 768px) {
  .stats {
    grid-template-columns: repeat(4, 1fr);
  }
  .stat {
    padding-right: 1rem;
  }
  .stat + .stat {
    padding-left: 1.5rem;
    border-left: 1px solid var(--c-line);
  }
}
</style>
