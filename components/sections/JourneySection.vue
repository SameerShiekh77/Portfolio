<template>
  <section id="journey" ref="root" class="section" aria-labelledby="journey-title">
    <div class="wrap">
      <h2 id="journey-title" class="h2">From classroom to running 50 systems</h2>

      <div class="grid gap-16 lg:grid-cols-[7fr_5fr] mt-16 lg:mt-24">
        <!-- The timeline is a true sequence, so it is an ordered list. -->
        <ol class="timeline" aria-label="Career timeline">
          <span class="rail" aria-hidden="true"><span ref="fillEl" class="fill" /></span>
          <li v-for="m in milestones" :key="m.date + m.title" class="node" :data-type="m.type">
            <span class="pip" aria-hidden="true" />
            <p class="date font-display">{{ m.date }}</p>
            <div>
              <h3 class="node-title">{{ m.title }}</h3>
              <p class="node-detail">{{ m.detail }}</p>
            </div>
          </li>
        </ol>

        <div>
          <h3 class="font-display text-2xl font-semibold mb-6">Roles</h3>
          <ul class="roles">
            <li v-for="(r, i) in experience" :key="r.company + r.title" class="role">
              <button
                type="button"
                class="role-head"
                :aria-expanded="openRole === i"
                :aria-controls="`role-${i}`"
                @click="openRole = openRole === i ? -1 : i"
              >
                <span>
                  <span class="block font-semibold text-ink">{{ r.title }}</span>
                  <span class="block text-sm text-ink-3">{{ r.company }} &middot; {{ r.period }}</span>
                </span>
                <ChevronDown class="w-5 h-5 shrink-0 chev" :class="{ open: openRole === i }" aria-hidden="true" />
              </button>
              <div :id="`role-${i}`" class="role-body" :class="{ open: openRole === i }">
                <div class="role-inner">
                  <div class="role-content">
                    <p class="text-ink-2 mb-3">{{ r.description }}</p>
                    <ul class="space-y-1.5 mb-4">
                      <li v-for="a in r.achievements" :key="a" class="flex gap-2 text-sm text-ink-2">
                        <span class="mt-2 w-1.5 h-1.5 rounded-full bg-ember shrink-0" aria-hidden="true" />{{ a }}
                      </li>
                    </ul>
                    <div class="flex flex-wrap gap-1.5">
                      <span v-for="t in r.technologies.slice(0, 8)" :key="t" class="tag">{{ t }}</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import gsap from 'gsap'
import { ChevronDown } from '@lucide/vue'
import { milestones, experience } from '../../data/experience'
import { useReducedMotion } from '../../composables/useReducedMotion'

const root = ref<HTMLElement | null>(null)
const fillEl = ref<HTMLElement | null>(null)
const openRole = ref(1)
const { prefersReduced } = useReducedMotion()
let ctx: gsap.Context | null = null

onMounted(() => {
  if (!root.value || !fillEl.value) return
  if (prefersReduced.value) {
    fillEl.value.style.transform = 'scaleY(1)'
    return
  }
  ctx = gsap.context(() => {
    // The ember line draws itself down the rail as you read, which is the whole story of this section.
    gsap.fromTo(
      fillEl.value,
      { scaleY: 0 },
      { scaleY: 1, ease: 'none', scrollTrigger: { trigger: '.timeline', start: 'top 70%', end: 'bottom 60%', scrub: 0.4 } },
    )
    gsap.utils.toArray<HTMLElement>('.node').forEach((n) => {
      gsap.fromTo(
        n.querySelector('.pip'),
        { scale: 0.4, backgroundColor: 'var(--c-bg)' },
        { scale: 1, backgroundColor: 'var(--c-ember)', ease: 'back.out(3)', duration: 0.5, scrollTrigger: { trigger: n, start: 'top 68%', toggleActions: 'play none none reverse' } },
      )
    })
  }, root.value)
})

onBeforeUnmount(() => ctx?.revert())
</script>

<style scoped>
.timeline {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 2.75rem;
  padding-left: 2.25rem;
}
.rail {
  position: absolute;
  left: 0.5rem;
  top: 0.5rem;
  bottom: 0.5rem;
  width: 2px;
  background: var(--c-line);
}
.fill {
  display: block;
  width: 100%;
  height: 100%;
  background: linear-gradient(var(--c-gold), var(--c-ember), var(--c-rose));
  transform-origin: top;
  transform: scaleY(0);
}
.node {
  position: relative;
  display: grid;
  gap: 0.4rem;
}
.pip {
  position: absolute;
  left: -2.25rem;
  top: 0.35rem;
  width: 1.1rem;
  height: 1.1rem;
  border-radius: 50%;
  border: 2px solid var(--c-ember);
  background: var(--c-bg);
}
.node[data-type='leadership'] .pip,
.node[data-type='achievement'] .pip {
  border-color: var(--c-mint);
}
.date {
  font-size: 1.1rem;
  font-weight: 600;
  color: var(--c-ember-ink);
}
.node-title {
  font-size: 1.3rem;
  font-weight: 600;
  line-height: 1.25;
  margin-bottom: 0.3rem;
}
.node-detail {
  max-width: 56ch;
  color: var(--c-ink-2);
}
@media (min-width: 768px) {
  .node {
    grid-template-columns: 7rem 1fr;
    gap: 1.5rem;
  }
}
.roles {
  border-top: 1px solid var(--c-line);
}
.role {
  border-bottom: 1px solid var(--c-line);
}
.role-head {
  display: flex;
  width: 100%;
  justify-content: space-between;
  align-items: center;
  gap: 1rem;
  padding: 1.1rem 0;
  text-align: left;
}
.chev {
  transition: transform 0.35s var(--ease-out);
  color: var(--c-ink-3);
}
.chev.open {
  transform: rotate(180deg);
  color: var(--c-ember-ink);
}
/* Height animates by moving a grid row between 0fr and 1fr, so it works for any content height.
   visibility keeps closed content out of the tab order once it has finished collapsing. */
.role-body {
  display: grid;
  grid-template-rows: 0fr;
  visibility: hidden;
  opacity: 0;
  transition: grid-template-rows 0.5s var(--ease-out), opacity 0.35s ease, visibility 0s linear 0.5s;
}
.role-body.open {
  grid-template-rows: 1fr;
  visibility: visible;
  opacity: 1;
  transition: grid-template-rows 0.5s var(--ease-out), opacity 0.45s ease 0.08s, visibility 0s;
}
.role-inner {
  min-height: 0;
  overflow: hidden;
}
.role-content {
  padding-bottom: 1.4rem;
}
</style>
