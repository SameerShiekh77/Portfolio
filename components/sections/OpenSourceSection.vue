<template>
  <section id="opensource" ref="sectionEl" class="relative py-24 lg:py-28 overflow-hidden" aria-labelledby="opensource-heading">
    <div class="container mx-auto px-6 lg:px-12">
      <SectionHeader
        title-id="opensource-heading"
        stage="scale"
        title="On GitHub"
        accent="GitHub"
        subtitle="Live activity, pulled straight from the GitHub API."
      />

      <div class="max-w-5xl mx-auto">
        <div v-if="status === 'error'" class="text-center py-12 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)]">
          <p class="text-[var(--color-text-secondary)] text-sm">GitHub's API is momentarily unavailable.</p>
          <a :href="`https://github.com/${username}`" target="_blank" rel="noopener noreferrer" class="inline-flex items-center gap-1.5 mt-3 text-sm text-[var(--color-accent-clay-ink)] hover:text-[var(--color-text-primary)] font-semibold">
            View profile directly on GitHub
            <ExternalLink class="w-3.5 h-3.5" />
          </a>
        </div>

        <template v-else>
          <div class="flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-10 rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-7">
            <div v-if="status !== 'success'" class="w-20 h-20 rounded-2xl bg-[var(--color-surface-1)] animate-pulse shrink-0" />
            <img v-else :src="profile?.avatarUrl" :alt="`${profile?.login} avatar`" width="80" height="80" class="w-20 h-20 rounded-2xl border border-[var(--color-border-subtle)] shrink-0" loading="lazy" />

            <div class="flex-1 text-center sm:text-left">
              <div v-if="status !== 'success'" class="space-y-2">
                <div class="h-5 w-40 bg-[var(--color-surface-1)] rounded animate-pulse mx-auto sm:mx-0" />
                <div class="h-4 w-64 bg-[var(--color-surface-1)] rounded animate-pulse mx-auto sm:mx-0" />
              </div>
              <template v-else>
                <a :href="profile?.htmlUrl" target="_blank" rel="noopener noreferrer" class="font-bold text-[var(--color-text-primary)] hover:text-[var(--color-accent-clay-ink)] transition-colors">
                  @{{ profile?.login }}
                </a>
                <p class="text-[var(--color-text-secondary)] text-sm mt-1">{{ profile?.bio || 'Building production systems, one commit at a time.' }}</p>
              </template>

              <div class="flex justify-center sm:justify-start gap-6 mt-4">
                <div class="text-center">
                  <div class="text-lg font-bold text-[var(--color-accent-clay-ink)]">{{ profile?.publicRepos ?? '-' }}</div>
                  <div class="text-[11px] text-[var(--color-text-muted)]">Repositories</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-[var(--color-accent-clay-ink)]">{{ profile?.followers ?? '-' }}</div>
                  <div class="text-[11px] text-[var(--color-text-muted)]">Followers</div>
                </div>
                <div class="text-center">
                  <div class="text-lg font-bold text-[var(--color-accent-clay-ink)]">{{ Object.keys(languageTotals).length || '-' }}</div>
                  <div class="text-[11px] text-[var(--color-text-muted)]">Languages</div>
                </div>
              </div>
            </div>
          </div>

          <div class="rounded-3xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-6 mb-10 overflow-x-auto">
            <img
              v-if="!heatmapFailed"
              :src="`https://ghchart.rshah.org/b0603a/${username}`"
              :alt="`${username}'s GitHub contribution heatmap`"
              class="min-w-175 w-full"
              loading="lazy"
              @load="onHeatmapSettled"
              @error="heatmapFailed = true; onHeatmapSettled()"
            />
            <p v-else class="text-center text-[var(--color-text-muted)] text-sm py-8">Contribution graph unavailable right now.</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            <template v-if="status !== 'success'">
              <div v-for="n in 6" :key="n" class="h-32 rounded-2xl bg-[var(--color-surface-1)] border border-[var(--color-border-subtle)] animate-pulse" />
            </template>
            <a
              v-else
              v-for="repo in repos"
              :key="repo.name"
              :href="repo.htmlUrl"
              target="_blank"
              rel="noopener noreferrer"
              class="group rounded-2xl border border-[var(--color-border-subtle)] bg-[var(--color-surface-1)] p-5 hover:border-[var(--color-border-hover)] hover:bg-[var(--color-surface-2)] transition-all duration-300"
            >
              <div class="flex items-center justify-between mb-2">
                <span class="font-bold text-sm text-[var(--color-text-primary)] group-hover:text-[var(--color-accent-clay-ink)] transition-colors truncate">{{ repo.name }}</span>
                <span class="flex items-center gap-1 text-xs text-[var(--color-text-muted)] shrink-0 ml-2">
                  <Star class="w-3 h-3" />
                  {{ repo.stars }}
                </span>
              </div>
              <p class="text-xs text-[var(--color-text-secondary)] line-clamp-2 mb-3 min-h-8">{{ repo.description || 'No description provided.' }}</p>
              <div class="flex items-center gap-2 text-[11px] text-[var(--color-text-muted)]">
                <span v-if="repo.language" class="flex items-center gap-1">
                  <span class="w-2 h-2 rounded-full bg-[var(--color-accent-olive)]" />
                  {{ repo.language }}
                </span>
                <span v-if="repo.forks">· {{ repo.forks }} forks</span>
              </div>
            </a>
          </div>
        </template>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { ExternalLink, Star } from '@lucide/vue'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import SectionHeader from '../ui/SectionHeader.vue'
import { useGithubStats } from '../../composables/useGithubStats'
import { githubUsername } from '../../data/profile'

const username = githubUsername
const { profile, repos, languageTotals, status, load } = useGithubStats(username)
const sectionEl = ref<HTMLElement | null>(null)
const heatmapFailed = ref(false)

// The heatmap is a remote image with no intrinsic size until it arrives; once it does
// (or fails) the section's height changes, so trigger offsets below need recomputing.
const onHeatmapSettled = () => nextTick(() => ScrollTrigger.refresh())
let trigger: ScrollTrigger | null = null

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)
  trigger = ScrollTrigger.create({
    trigger: sectionEl.value,
    start: 'top 90%',
    once: true,
    // This section grows once the GitHub data lands, which pushes everything below it
    // down. Without a refresh, every trigger further down the page keeps firing against
    // the old offsets and the animations run at the wrong scroll positions.
    onEnter: () => {
      load().finally(() => nextTick(() => ScrollTrigger.refresh()))
    },
  })
})

onUnmounted(() => trigger?.kill())
</script>
