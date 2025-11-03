<template>
  <div 
    class="group relative bg-linear-to-br from-cyan-900/40 to-blue-900/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    
    <!-- Project Image/Placeholder -->
    <div class="relative h-48 bg-linear-to-br from-cyan-600/30 to-blue-600/30 overflow-hidden">
      <div class="absolute inset-0 flex items-center justify-center text-6xl">
        {{ project.icon || '🚀' }}
      </div>
      <div 
        class="absolute inset-0 bg-gradient-to-t from-gray-900 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
      </div>
      
      <!-- Status Badge -->
      <div class="absolute top-4 right-4">
        <span class="px-3 py-1 rounded-full text-xs font-semibold" 
              :class="project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'">
          {{ project.status }}
        </span>
      </div>
    </div>

    <!-- Content -->
    <div class="p-6">
      <h3 class="text-2xl font-bold mb-2 text-white group-hover:text-cyan-400 transition-colors">
        {{ project.title }}
      </h3>
      <p class="text-gray-400 mb-4 line-clamp-3">
        {{ project.description }}
      </p>

      <!-- Tech Stack -->
      <div class="flex flex-wrap gap-2 mb-4">
        <span 
          v-for="tech in project.technologies" 
          :key="tech"
          class="px-3 py-1 bg-cyan-500/20 rounded-full text-xs text-cyan-300 border border-cyan-500/30">
          {{ tech }}
        </span>
      </div>

      <!-- Metrics -->
      <div class="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-cyan-500/20">
        <div class="text-center">
          <div class="text-xl font-bold text-cyan-400">{{ project.metrics.users }}</div>
          <div class="text-xs text-gray-500">Users</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-blue-400">{{ project.metrics.performance }}</div>
          <div class="text-xs text-gray-500">Performance</div>
        </div>
        <div class="text-center">
          <div class="text-xl font-bold text-cyan-400">{{ project.metrics.uptime }}</div>
          <div class="text-xs text-gray-500">Uptime</div>
        </div>
      </div>

      <!-- Action Buttons -->
      <div class="flex gap-3">
        <a 
          v-if="project.liveUrl"
          :href="project.liveUrl" 
          target="_blank"
          class="flex-1 px-4 py-2 bg-linear-to-r from-cyan-600 to-blue-600 rounded-lg text-center text-sm font-semibold hover:scale-105 transition-transform">
          View Live
        </a>
        <a 
          v-if="project.githubUrl"
          :href="project.githubUrl" 
          target="_blank"
          class="flex-1 px-4 py-2 border border-cyan-500 rounded-lg text-center text-sm font-semibold hover:bg-cyan-500/10 transition-colors">
          GitHub
        </a>
      </div>
    </div>

    <!-- Hover Overlay Effect -->
    <div 
      class="absolute inset-0 bg-linear-to-br from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/10 group-hover:to-blue-600/10 transition-all duration-500 pointer-events-none">
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>