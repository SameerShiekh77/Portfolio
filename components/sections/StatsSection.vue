<template>
  <section class="py-20 bg-[#070412] relative overflow-hidden">
    <!-- Top border shimmer -->
    <div class="absolute top-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, #6C3EEF, #22d3ee, transparent)" />

    <div class="container mx-auto px-6 lg:px-12">
      <div class="grid grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(stat, i) in stats" :key="i" ref="statRefs"
          class="group relative rounded-3xl border border-white/5 bg-white/[0.03] backdrop-blur-sm p-8 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden cursor-default">

          <!-- Glow bg -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            :style="{ background: `radial-gradient(circle at 50% 100%, ${stat.glow}15 0%, transparent 70%)` }" />

          <!-- Icon -->
          <div class="text-3xl mb-4 select-none">{{ stat.icon }}</div>

          <!-- Value -->
          <div class="text-4xl lg:text-5xl font-black mb-2 tabular-nums"
            :style="{ color: stat.color }">
            {{ stat.animated }}{{ stat.suffix }}
          </div>

          <!-- Label -->
          <div class="text-gray-400 text-sm font-medium">{{ stat.label }}</div>
          <div class="text-gray-600 text-xs mt-1">{{ stat.sub }}</div>

          <!-- Bottom accent line -->
          <div class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
            :style="{ background: stat.color }" />
        </div>
      </div>
    </div>

    <!-- Bottom border shimmer -->
    <div class="absolute bottom-0 left-0 right-0 h-px"
      style="background: linear-gradient(90deg, transparent, rgba(108,62,239,0.4), transparent)" />
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const statRefs = ref([])

const stats = ref([
  { icon: '💼', value: 5, suffix: '+', label: 'Years of Experience', sub: 'Shipping production systems', color: '#a78bfa', glow: '#a78bfa', animated: 0 },
  { icon: '🚀', value: 50, suffix: '+', label: 'Projects Delivered', sub: 'Concept to production', color: '#22d3ee', glow: '#22d3ee', animated: 0 },
  { icon: '👥', value: 30, suffix: '+', label: 'Happy Clients', sub: 'Worldwide', color: '#f59e0b', glow: '#f59e0b', animated: 0 },
  { icon: '🏆', value: 8, suffix: '', label: 'Engineers Mentored', sub: 'To mid & senior levels', color: '#34d399', glow: '#34d399', animated: 0 },
])

const animateCount = (statItem, duration = 1800) => {
  const end = statItem.value
  const steps = 60
  const increment = end / steps
  let current = 0
  let step = 0
  const timer = setInterval(() => {
    step++
    current = Math.min(Math.round(increment * step), end)
    statItem.animated = current
    if (step >= steps) clearInterval(timer)
  }, duration / steps)
}

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          stats.value.forEach((s, i) => setTimeout(() => animateCount(s), i * 150))
          observer.disconnect()
        }
      })
    },
    { threshold: 0.3 }
  )
  if (statRefs.value[0]) observer.observe(statRefs.value[0])
})
</script>