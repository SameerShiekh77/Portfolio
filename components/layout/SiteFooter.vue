<template>
  <footer class="relative z-10 border-t border-line">
    <div class="wrap flex flex-col gap-4 py-10 sm:flex-row sm:items-center sm:justify-between text-sm text-ink-3">
      <p>&copy; {{ year }} Muhammad Sameer. Built with Nuxt, GSAP and TresJS.</p>
      <ul class="flex items-center gap-3">
        <li v-for="s in socials" :key="s.label">
          <a
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="grid place-items-center w-10 h-10 rounded-full border border-line text-ink-2 hover:text-ember-ink hover:border-ember transition-colors"
          >
            <SocialIcon :name="s.icon" class="w-4 h-4" />
          </a>
        </li>
      </ul>
    </div>
  </footer>
</template>

<script setup lang="ts">
import SocialIcon from '../ui/SocialIcon.vue'
import { socials } from '../../data/profile'

const year = new Date().getFullYear()
</script>
