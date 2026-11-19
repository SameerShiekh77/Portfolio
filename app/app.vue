<template>
  <div id="app-root">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <!-- Static gradient: the whole look when WebGL or motion is unavailable, and the backdrop behind the scene. -->
    <div class="backdrop" aria-hidden="true" />
    <SceneCanvas />
    <AvatarCanvas />
    <div class="grain" aria-hidden="true" />
    <SiteNav />

    <main id="main-content" class="relative z-10">
      <HeroSection />
      <StorySection />
      <JourneySection />
      <WorkSection />
      <SkillsSection />
      <LeadershipSection />
      <VoicesSection />
      <!-- <WritingSection /> -->
      <ContactSection />
    </main>

    <SiteFooter />
  </div>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SceneCanvas from '../components/three/SceneCanvas.client.vue'
import AvatarCanvas from '../components/three/AvatarCanvas.client.vue'
import SiteNav from '../components/layout/SiteNav.vue'
import SiteFooter from '../components/layout/SiteFooter.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import StorySection from '../components/sections/StorySection.vue'
import JourneySection from '../components/sections/JourneySection.vue'
import WorkSection from '../components/sections/WorkSection.vue'
import SkillsSection from '../components/sections/SkillsSection.vue'
import LeadershipSection from '../components/sections/LeadershipSection.vue'
import VoicesSection from '../components/sections/VoicesSection.vue'
import WritingSection from '../components/sections/WritingSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { sceneState } from '../composables/useScene'
import { initTheme } from '../composables/useTheme'
import { hero } from '../data/site'
import { profile } from '../data/profile'

const route = useRoute()
if (route.path !== '/') {
  throw createError({ statusCode: 404, statusMessage: 'Page not found', fatal: true })
}

let progressTrigger: ScrollTrigger | null = null

onMounted(() => {
  initTheme()
  // One trigger turns page scroll into the 0..1 value the 3D scene and the nav bar both read.
  progressTrigger = ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => (sceneState.progress = self.progress),
  })
  // The pinned Work section adds scroll distance after the nav's triggers were measured; re-measure once everything has mounted.
  requestAnimationFrame(() => ScrollTrigger.refresh())
})

onBeforeUnmount(() => progressTrigger?.kill())

const title = `${profile.name} - ${hero.title} | ${hero.subtitle}`
useSeoMeta({
  title,
  description: profile.summary,
  ogTitle: title,
  ogDescription: profile.summary,
  ogImage: profile.avatar,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: title,
  twitterDescription: profile.summary,
  twitterImage: profile.avatar,
})
</script>

<style scoped>
.backdrop {
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(60rem 40rem at 85% 10%, color-mix(in srgb, var(--c-ember) 22%, transparent), transparent 70%),
    radial-gradient(50rem 40rem at 5% 75%, color-mix(in srgb, var(--c-rose) 16%, transparent), transparent 70%),
    var(--c-bg);
}
/* Fine film grain over everything: takes the digital sheen off the gradients. */
.grain {
  position: fixed;
  inset: 0;
  z-index: 60;
  pointer-events: none;
  opacity: 0.07;
  mix-blend-mode: overlay;
  background-image: url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='160' height='160'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>");
}
</style>
