<template>
  <section
    id="home"
    class="relative min-h-screen flex items-center overflow-hidden"
    aria-label="Introduction"
  >
    <ParticleField />

    <div class="container mx-auto px-6 lg:px-12 relative z-10 pt-32 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">
        <div class="lg:col-span-3 space-y-8">
          <div ref="badgeEl" class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-[var(--color-accent-clay)]/30 glass-panel">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span class="text-sm font-medium text-[var(--color-accent-clay-ink)] tracking-wide">{{ profile.heroBadge }}</span>
          </div>

          <div>
          
            <h1 class="font-display font-bold tracking-tight leading-[0.92]" style="font-size: var(--text-display)">
              <span class="block overflow-hidden">
                <span ref="line1El" class="block text-[var(--color-text-primary)]">{{ profile.firstName }}</span>
              </span>
              <span class="block overflow-hidden">
                <span ref="line2El" class="block text-gradient">{{ profile.lastName }}</span>
              </span>
            </h1>
          </div>

          <div ref="roleEl" class="flex items-center gap-3">
            <div class="h-px w-8 bg-[var(--color-accent-gold)]" aria-hidden="true" />
            <div class="text-xl sm:text-2xl font-semibold font-mono min-h-8">
              <span class="text-[var(--color-accent-gold-ink)]">{{ typedRole }}</span>
              <span class="text-[var(--color-accent-gold-ink)]/60 animate-pulse" aria-hidden="true">|</span>
            </div>
          </div>

          <p ref="summaryEl" class="text-[var(--color-text-secondary)] text-base sm:text-lg leading-relaxed max-w-xl">
            I don't just build software. I build scalable systems - cloud infrastructure, automation, DevOps
            pipelines, and backend engineering that keep production running at
            <strong class="text-[var(--color-text-primary)] font-semibold">99.9%+ uptime</strong>.
          </p>

          <div ref="statsEl" class="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div
              v-for="stat in heroStats"
              :key="stat.label"
              class="px-4 py-3 rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] flex flex-col justify-center transition-all duration-300 hover:border-[var(--color-border-hover)]"
            >
              <span class="text-2xl font-black" :style="{ color: stat.color }">{{ stat.value }}</span>
              <span class="text-[var(--color-text-muted)] text-xs leading-tight whitespace-pre-line">{{ stat.label }}</span>
            </div>
          </div>

          <div ref="ctaEl" class="flex flex-wrap gap-4">
            <a
              href="#projects"
              class="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-transform duration-300 hover:scale-105 flex items-center gap-2"
              style="background: var(--gradient-primary)"
            >
              View Projects
              <ArrowRight class="w-4 h-4 group-hover:translate-x-1 transition-transform" aria-hidden="true" />
            </a>

            <a
              :href="profile.resumeFile"
              download
              class="px-8 py-4 rounded-2xl font-bold border border-[var(--color-accent-gold)]/30 text-[var(--color-accent-gold-ink)] hover:bg-[var(--color-accent-gold)]/10 transition-all duration-300 flex items-center gap-2"
            >
              <Download class="w-4 h-4" aria-hidden="true" />
              Resume
            </a>

            <a
              v-for="social in primarySocials"
              :key="social.label"
              :href="social.href"
              target="_blank"
              rel="noopener noreferrer"
              :aria-label="social.label"
              class="w-14 h-14 rounded-2xl border border-[var(--color-border-strong)] flex items-center justify-center text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)] transition-all duration-300"
            >
              <SocialIcon :name="social.icon" class="w-5 h-5" />
            </a>
          </div>
        </div>

        <div ref="cardWrapEl" class="lg:col-span-2 flex justify-center lg:justify-end">
          <div class="relative" ref="cardEl" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
            <div class="absolute -inset-4 rounded-3xl blur-2xl opacity-30 animate-pulse" style="background: var(--gradient-primary)" aria-hidden="true" />
            <div
              class="relative rounded-3xl overflow-hidden border border-[var(--color-border-subtle)] glass-panel p-2 transition-transform duration-300 will-change-transform"
              :style="cardTransform"
            >
              <div class="rounded-2xl overflow-hidden">
                <NuxtImg
                  :src="profile.avatar"
                  :alt="profile.name"
                  width="480"
                  height="600"
                  format="webp"
                  preload
                  class="w-full object-cover block"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2" aria-hidden="true">
      <span class="text-xs text-[var(--color-text-muted)] tracking-widest uppercase font-mono animate-bounce">scroll</span>
      <div class="w-px h-8 bg-linear-to-b from-[var(--color-border-strong)] to-transparent" />
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import gsap from 'gsap'
import { ArrowRight, Download } from '@lucide/vue'
import ParticleField from '../three/ParticleField.client.vue'
import SocialIcon from '../ui/SocialIcon.vue'
import { profile, heroStats, socials } from '../../data/profile'
import { useReducedMotion } from '../../composables/useReducedMotion'
import { easeGsap, duration as dur } from '../../utils/motion'

const primarySocials = socials.filter((s) => s.icon === 'linkedin' || s.icon === 'github')

const badgeEl = ref<HTMLElement | null>(null)
const line1El = ref<HTMLElement | null>(null)
const line2El = ref<HTMLElement | null>(null)
const roleEl = ref<HTMLElement | null>(null)
const summaryEl = ref<HTMLElement | null>(null)
const statsEl = ref<HTMLElement | null>(null)
const ctaEl = ref<HTMLElement | null>(null)
const cardWrapEl = ref<HTMLElement | null>(null)
const cardEl = ref<HTMLElement | null>(null)

const typedRole = ref('')
const cardTransform = ref('perspective(1200px) rotateX(0deg) rotateY(0deg)')

const roles = ['DevOps Manager', 'Senior Software Engineer', 'Cloud Infrastructure Architect', 'Engineering Team Lead', 'AI Integration Engineer']
let roleIndex = 0

const { prefersReduced } = useReducedMotion()

const typeRole = () => {
  const role = roles[roleIndex]
  let i = 0
  const typeInterval = setInterval(() => {
    if (i <= role.length) {
      typedRole.value = role.slice(0, i)
      i++
    } else {
      clearInterval(typeInterval)
      setTimeout(deleteRole, 2000)
    }
  }, 70)
}
const deleteRole = () => {
  const deleteInterval = setInterval(() => {
    if (typedRole.value.length > 0) {
      typedRole.value = typedRole.value.slice(0, -1)
    } else {
      clearInterval(deleteInterval)
      roleIndex = (roleIndex + 1) % roles.length
      setTimeout(typeRole, 300)
    }
  }, 35)
}

const onMouseMove = (e: MouseEvent) => {
  if (!cardEl.value || prefersReduced.value) return
  const rect = cardEl.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -16
  cardTransform.value = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
}
const onMouseLeave = () => {
  cardTransform.value = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
}

onMounted(() => {
  setTimeout(typeRole, 900)

  if (prefersReduced.value) return

  // fromTo, not from: a bare .from() has no declared end state, so if anything disturbs
  // the tween the element is simply left on its start value - which here means permanently
  // invisible copy. Every step below lands on an explicit opacity:1, and clearProps drops
  // the inline styles afterwards so nothing lingers on the elements.
  const statItems = Array.from(statsEl.value?.children ?? [])
  const ctaItems = Array.from(ctaEl.value?.children ?? [])
  const introTargets = [
    badgeEl.value, line1El.value, line2El.value, roleEl.value,
    summaryEl.value, ...statItems, ...ctaItems, cardWrapEl.value,
  ].filter(Boolean) as HTMLElement[]

  // immediateRender:false matters: creating these tweens used to paint the from-state
  // (opacity 0) immediately, and anything that re-rendered the playhead afterwards -
  // a ScrollTrigger.refresh() from a pin being built elsewhere on the page - left the
  // badge, role and summary stranded there permanently. Deferring the from-state means
  // an undisturbed element simply stays visible.
  const tl = gsap.timeline({
    defaults: { ease: easeGsap.expoOut, immediateRender: false },
    // Whatever happens to the tweens, the hero must not be left mid-animation. Scoped to
    // the animated properties only — 'all' also strips inline styles GSAP never set, which
    // wiped the gradient background off the primary CTA.
    onComplete: () => gsap.set(introTargets, { clearProps: 'opacity,transform' }),
  })
  tl.fromTo(badgeEl.value, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: dur.slow })
    .fromTo([line1El.value, line2El.value], { yPercent: 110 }, { yPercent: 0, duration: dur.slower, stagger: 0.08 }, '-=0.25')
    .fromTo(roleEl.value, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur.slow }, '-=0.4')
    .fromTo(summaryEl.value, { opacity: 0, y: 12 }, { opacity: 1, y: 0, duration: dur.slow }, '-=0.35')
    .fromTo(statItems, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: dur.slow, stagger: 0.06 }, '-=0.3')
    .fromTo(ctaItems, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: dur.slow, stagger: 0.06 }, '-=0.3')
    .fromTo(cardWrapEl.value, { opacity: 0, y: 24, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: dur.slower }, '-=0.6')
})
</script>
