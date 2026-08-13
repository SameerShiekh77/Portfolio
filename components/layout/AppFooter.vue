<template>
  <footer class="py-12 border-t border-[var(--color-border-subtle)] bg-[var(--color-bg-base)]">
    <div class="container mx-auto px-6 lg:px-12">
      <div class="flex flex-col md:flex-row justify-between items-center gap-6">
        <a href="#home" class="flex items-center gap-3">
          <span class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs" style="background: var(--gradient-primary)">
            {{ profile.initials }}
          </span>
          <span class="text-left">
            <span class="block font-bold text-sm text-[var(--color-text-primary)]">{{ profile.name }}</span>
            <span class="block text-xs font-mono text-[var(--color-accent-clay-ink)]">{{ profile.title }}</span>
          </span>
        </a>

        <p class="text-[var(--color-text-muted)] text-sm">© {{ year }} {{ profile.name }}. All rights reserved.</p>

        <div class="flex gap-3">
          <a
            v-for="s in socials"
            :key="s.label"
            :href="s.href"
            target="_blank"
            rel="noopener noreferrer"
            :aria-label="s.label"
            class="w-9 h-9 rounded-xl border border-[var(--color-border-subtle)] flex items-center justify-center text-[var(--color-text-muted)] transition-all duration-200 hover:scale-110 hover:text-[var(--color-accent-clay-ink)] hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-1)]"
          >
            <SocialIcon :name="s.icon" class="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { profile, socials } from '../../data/profile'
import SocialIcon from '../ui/SocialIcon.vue'

const year = new Date().getFullYear()
</script>
