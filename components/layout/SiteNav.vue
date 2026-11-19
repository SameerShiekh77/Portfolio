<template>
  <header class="nav" :class="{ 'nav-solid': scrolled }">
    <div class="progress" aria-hidden="true" :style="{ transform: `scaleX(${sceneState.progress})` }" />
    <div class="wrap nav-row">
      <a href="#top" class="brand" aria-label="Muhammad Sameer, back to top">
        <span class="brand-mark font-display">MS</span>
        <span class="brand-name hidden sm:inline">Muhammad Sameer</span>
      </a>

      <nav aria-label="Primary" class="hidden lg:flex items-center gap-1">
        <a
          v-for="link in navLinks"
          :key="link.id"
          :href="`#${link.id}`"
          class="nav-link"
          :class="{ 'is-active': active === link.id }"
          :aria-current="active === link.id ? 'true' : undefined"
        >
          {{ link.label }}
        </a>
      </nav>

      <div class="flex items-center gap-2">
        <button
          type="button"
          class="icon-btn"
          :aria-label="theme === 'dark' ? 'Switch to light theme' : 'Switch to dark theme'"
          @click="toggleTheme"
        >
          <Sun v-if="theme === 'dark'" class="w-[18px] h-[18px]" aria-hidden="true" />
          <Moon v-else class="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
        <a href="#contact" class="btn btn-primary hidden sm:inline-flex !py-3">Hire me</a>
        <button
          type="button"
          class="icon-btn menu-btn"
          :aria-expanded="open"
          aria-controls="mobile-menu"
          :aria-label="open ? 'Close menu' : 'Open menu'"
          @click="open = !open"
        >
          <X v-if="open" class="w-[18px] h-[18px]" aria-hidden="true" />
          <Menu v-else class="w-[18px] h-[18px]" aria-hidden="true" />
        </button>
      </div>
    </div>

    <Transition name="menu">
      <nav v-if="open" id="mobile-menu" class="mobile" aria-label="Mobile">
        <a v-for="link in navLinks" :key="link.id" :href="`#${link.id}`" class="mobile-link font-display" @click="open = false">
          {{ link.label }}
        </a>
      </nav>
    </Transition>
  </header>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { Menu, Moon, Sun, X } from '@lucide/vue'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navLinks } from '../../data/site'
import { sceneState } from '../../composables/useScene'
import { theme, toggleTheme } from '../../composables/useTheme'

const scrolled = ref(false)
const open = ref(false)
const active = ref('')
const triggers: ScrollTrigger[] = []

onMounted(() => {
  triggers.push(
    ScrollTrigger.create({
      start: 40,
      end: 'max',
      onUpdate: (self) => (scrolled.value = self.scroll() > 40),
    }),
  )
  for (const { id } of navLinks) {
    const el = document.getElementById(id)
    if (!el) continue
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top 55%',
        end: 'bottom 55%',
        // Measure after the pinned Work section has added its scroll distance.
        refreshPriority: -1,
        onToggle: (self) => {
          if (self.isActive) active.value = id
          else if (active.value === id) active.value = ''
        },
      }),
    )
  }
})

onBeforeUnmount(() => triggers.forEach((t) => t.kill()))
</script>

<style scoped>
.nav {
  position: fixed;
  inset: 0 0 auto 0;
  z-index: 50;
  transition: background-color 0.4s, backdrop-filter 0.4s, border-color 0.4s;
  border-bottom: 1px solid transparent;
}
.nav-solid {
  background: color-mix(in srgb, var(--c-bg) 72%, transparent);
  backdrop-filter: blur(16px) saturate(1.3);
  -webkit-backdrop-filter: blur(16px) saturate(1.3);
  border-bottom-color: var(--c-line);
}
.nav-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 4.5rem;
  gap: 1rem;
}
.progress {
  position: absolute;
  inset: 0 0 auto 0;
  height: 2px;
  background: var(--heat);
  transform-origin: left;
}
.brand {
  display: inline-flex;
  align-items: center;
  gap: 0.7rem;
  font-weight: 700;
}
.brand-mark {
  display: grid;
  place-items: center;
  width: 2.5rem;
  height: 2.5rem;
  border-radius: 0.8rem;
  background: var(--heat);
  color: var(--c-on-ember);
  font-weight: 700;
  font-size: 1rem;
  letter-spacing: -0.02em;
}
.nav-link {
  padding: 0.5rem 0.85rem;
  border-radius: 999px;
  font-size: 0.9rem;
  font-weight: 500;
  color: var(--c-ink-2);
  transition: color 0.2s, background-color 0.2s;
}
.nav-link:hover {
  color: var(--c-ink);
}
.nav-link.is-active {
  color: var(--c-ink);
  background: var(--c-surface-2);
}
.icon-btn {
  display: grid;
  place-items: center;
  width: 2.75rem;
  height: 2.75rem;
  border-radius: 999px;
  border: 1px solid var(--c-line-2);
  color: var(--c-ink);
  background: var(--c-surface);
  transition: border-color 0.2s, background-color 0.2s;
}
.icon-btn:hover {
  border-color: var(--c-ember);
}
@media (min-width: 1024px) {
  .menu-btn {
    display: none;
  }
}
.mobile {
  display: flex;
  flex-direction: column;
  padding: 1rem var(--gutter) 2rem;
  background: color-mix(in srgb, var(--c-bg) 94%, transparent);
  backdrop-filter: blur(18px);
  border-bottom: 1px solid var(--c-line);
}
.mobile-link {
  padding: 0.7rem 0;
  font-size: 1.9rem;
  font-weight: 600;
  border-bottom: 1px solid var(--c-line);
}
.menu-enter-active,
.menu-leave-active {
  transition: opacity 0.25s, transform 0.35s var(--ease-out);
}
.menu-enter-from,
.menu-leave-to {
  opacity: 0;
  transform: translateY(-8px);
}
</style>
