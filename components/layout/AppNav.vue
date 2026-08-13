<template>
  <header>
    <nav
      class="fixed top-4 sm:top-6 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-1.5rem)] sm:w-max max-w-[calc(100vw-3rem)] transition-shadow duration-500"
      aria-label="Primary"
    >
      <!-- w-max (not w-auto) so the pill hugs its own content; with w-auto the fixed
           element got a capped width and the Hire Me button spilled outside the panel. -->
      <div class="glass-panel rounded-2xl sm:rounded-full px-4 sm:px-2 py-2 flex flex-nowrap items-center justify-between sm:justify-start sm:gap-1 shadow-[0_8px_40px_rgba(0,0,0,0.18)]">
        <a
          href="#home"
          class="flex items-center gap-2.5 pl-1 pr-3 sm:pr-4 py-1 rounded-full shrink-0"
          aria-label="Muhammad Sameer - back to top"
        >
          <span
            class="w-8 h-8 rounded-lg flex items-center justify-center font-black text-white text-xs shrink-0"
            style="background: var(--gradient-primary)"
          >{{ profile.initials }}</span>
          <span class="hidden md:block lg:hidden xl:block text-sm font-semibold text-[var(--color-text-primary)] whitespace-nowrap">{{ profile.firstName }} {{ profile.lastName }}</span>
        </a>

        <ul class="hidden lg:flex items-center gap-0.5">
          <li v-for="item in navItems" :key="item.id">
            <a
              :href="`#${item.id}`"
              :aria-current="activeId === item.id ? 'true' : undefined"
              class="relative px-3 xl:px-4 py-2 rounded-full text-sm font-medium transition-colors duration-200 block whitespace-nowrap"
              :class="activeId === item.id ? 'text-[var(--color-text-primary)] font-semibold' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)]'"
            >
              <span
                v-if="activeId === item.id"
                class="absolute inset-0 rounded-full bg-[var(--color-surface-2)] -z-10"
                aria-hidden="true"
              />
              {{ item.label }}
            </a>
          </li>
        </ul>

        <a
          href="#contact"
          class="hidden lg:flex ml-1 xl:ml-2 items-center gap-2 px-4 xl:px-5 py-2 rounded-full font-semibold text-sm text-white shrink-0 whitespace-nowrap transition-transform duration-300 hover:scale-105"
          style="background: var(--gradient-primary)"
        >
          Hire Me
        </a>

        <button
          type="button"
          class="lg:hidden w-10 h-10 flex items-center justify-center rounded-full text-[var(--color-text-primary)]"
          :aria-expanded="mobileOpen"
          aria-controls="mobile-nav-panel"
          aria-label="Toggle navigation menu"
          @click="mobileOpen = !mobileOpen"
        >
          <MenuIcon v-if="!mobileOpen" class="w-5 h-5" aria-hidden="true" />
          <XIcon v-else class="w-5 h-5" aria-hidden="true" />
        </button>
      </div>

      <Transition :css="false" @enter="onPanelEnter" @leave="onPanelLeave">
        <div
          v-if="mobileOpen"
          id="mobile-nav-panel"
          class="lg:hidden glass-panel rounded-2xl mt-2 p-2 origin-top"
        >
          <a
            v-for="item in navItems"
            :key="item.id"
            :href="`#${item.id}`"
            :aria-current="activeId === item.id ? 'true' : undefined"
            class="block px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
            :class="activeId === item.id ? 'text-[var(--color-text-primary)] font-semibold bg-[var(--color-surface-2)]' : 'text-[var(--color-text-secondary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-surface-1)]'"
            @click="mobileOpen = false"
          >
            {{ item.label }}
          </a>
          <a
            href="#contact"
            class="block mt-2 px-4 py-3 rounded-xl font-bold text-sm text-center text-white"
            style="background: var(--gradient-primary)"
            @click="mobileOpen = false"
          >
            Hire Me
          </a>
        </div>
      </Transition>
    </nav>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { Menu as MenuIcon, X as XIcon } from '@lucide/vue'
import { animate } from 'motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { navItems } from '../../data/nav'
import { profile } from '../../data/profile'
import { duration, ease } from '../../utils/motion'

const mobileOpen = ref(false)
const activeId = ref('home')
const triggers: ScrollTrigger[] = []

const onPanelEnter = (el: Element, done: () => void) => {
  animate(el as HTMLElement, { opacity: [0, 1], y: [-12, 0] }, { duration: duration.base, ease: ease.expoOut }).finished.then(done)
}
const onPanelLeave = (el: Element, done: () => void) => {
  animate(el as HTMLElement, { opacity: [1, 0], y: [0, -12] }, { duration: duration.fast, ease: ease.expoOut }).finished.then(done)
}

onMounted(() => {
  gsap.registerPlugin(ScrollTrigger)

  navItems.forEach((item) => {
    const el = document.getElementById(item.id)
    if (!el) return
    triggers.push(
      ScrollTrigger.create({
        trigger: el,
        start: 'top center',
        end: 'bottom center',
        onToggle: (self) => {
          if (self.isActive) activeId.value = item.id
        },
      })
    )
  })
})

onUnmounted(() => {
  triggers.forEach((t) => t.kill())
})
</script>
