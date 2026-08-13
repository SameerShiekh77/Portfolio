<!-- app.vue -->
<template>
  <div class="min-h-screen text-[var(--color-text-primary)]">
    <a href="#main-content" class="skip-link">Skip to content</a>

    <template v-if="route.path === '/'">
      <GlobalBackground />
      <DroneCharacter />

      <AppLoader />
      <CustomCursor />
      <PipelineRail />
      <AppNav />

      <main id="main-content" class="relative z-10">
        <HeroSection />
        <StorySection />
        <JourneyTimeline />
        <SkillsEcosystem />
        <ProjectsShowcase />
        <ArchitectureSection />
        <ExperienceSection />
        <OpenSourceSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <AppFooter />
    </template>
  </div>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import GlobalBackground from '../components/layout/GlobalBackground.vue'
import DroneCharacter from '../components/three/DroneCharacter.client.vue'
import AppLoader from '../components/layout/AppLoader.vue'
import AppNav from '../components/layout/AppNav.vue'
import AppFooter from '../components/layout/AppFooter.vue'
import CustomCursor from '../components/layout/CustomCursor.vue'
import PipelineRail from '../components/layout/PipelineRail.vue'
import HeroSection from '../components/sections/HeroSection.vue'
import StorySection from '../components/sections/StorySection.vue'
import JourneyTimeline from '../components/sections/JourneyTimeline.vue'
import SkillsEcosystem from '../components/sections/SkillsEcosystem.vue'
import ProjectsShowcase from '../components/sections/ProjectsShowcase.vue'
import ArchitectureSection from '../components/sections/ArchitectureSection.vue'
import ExperienceSection from '../components/sections/ExperienceSection.vue'
import OpenSourceSection from '../components/sections/OpenSourceSection.vue'
import TestimonialsSection from '../components/sections/TestimonialsSection.vue'
import ContactSection from '../components/sections/ContactSection.vue'
import { useThemeJourney } from '../composables/useThemeJourney'
import { profile } from '../data/profile'

const route = useRoute()

if (route.path !== '/') {
  throw createError({
    statusCode: 404,
    statusMessage: 'Page not found',
    fatal: true,
  })
}

const { init: initJourney, destroy: destroyJourney } = useThemeJourney()

onMounted(() => initJourney())
onUnmounted(() => destroyJourney())

useSeoMeta({
  title: `${profile.name} - ${profile.title}`,
  description: profile.summary,
  ogTitle: `${profile.name} - ${profile.title}`,
  ogDescription: profile.summary,
  ogImage: profile.avatar,
  ogType: 'website',
  twitterCard: 'summary_large_image',
  twitterTitle: `${profile.name} - ${profile.title}`,
  twitterDescription: profile.summary,
  twitterImage: profile.avatar,
})
</script>
