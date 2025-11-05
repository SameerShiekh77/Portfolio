<template>
  <div 
    class="group relative bg-linear-to-br from-cyan-900/40 to-blue-900/20 rounded-2xl overflow-hidden backdrop-blur-sm border border-cyan-500/30 hover:border-cyan-500/60 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20"
    @mouseenter="isHovered = true"
    @mouseleave="isHovered = false">
    
    <!-- Project Image/Placeholder -->
    <div class="relative h-48 bg-linear-to-br from-cyan-600/30 to-blue-600/30 overflow-hidden">
      <!-- Project Screenshot -->
      <div v-if="project.screenshots && project.screenshots.length > 0" class="relative w-full h-full">
        <img 
          :src="project.screenshots[0]" 
          :alt="`${project.title} screenshot`"
          class="w-full h-full object-cover cursor-pointer"
          @click="openImageModal(0)">
        <div 
          class="absolute inset-0 bg-linear-to-t from-gray-900/80 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        </div>
        <!-- Multiple images indicator -->
        <div v-if="project.screenshots.length > 1" class="absolute bottom-2 left-2">
          <span class="px-2 py-1 bg-black/70 rounded-full text-xs text-white">
            +{{ project.screenshots.length - 1 }} more
          </span>
        </div>
        <!-- View Images Button -->
        <div class="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button 
            @click="openImageModal(0)"
            class="px-4 py-2 bg-cyan-600/90 text-white rounded-lg text-sm font-semibold hover:bg-cyan-500 transition-colors">
            View Images
          </button>
        </div>
      </div>
      <!-- Fallback Icon -->
      <div v-else class="absolute inset-0 flex items-center justify-center text-6xl">
        {{ project.icon || '🚀' }}
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
      
      <!-- Expandable Description -->
      <div class="text-gray-400 mb-4">
        <p :class="{ 'line-clamp-3': !isDescriptionExpanded }">
          {{ project.description }}
        </p>
        <button 
          v-if="project.description.length > 150"
          @click="toggleDescription"
          class="text-cyan-400 hover:text-cyan-300 text-sm mt-2 font-semibold">
          {{ isDescriptionExpanded ? 'Read Less' : 'Read More' }}
        </button>
      </div>

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
        <button 
          v-if="project.screenshots && project.screenshots.length > 0 && !project.liveUrl && !project.githubUrl"
          @click="openImageModal(0)"
          class="flex-1 px-4 py-2 bg-linear-to-r from-purple-600 to-pink-600 rounded-lg text-center text-sm font-semibold hover:scale-105 transition-transform">
          View Screenshots
        </button>
        <button 
          v-if="(!project.liveUrl && !project.githubUrl && (!project.screenshots || project.screenshots.length === 0))"
          class="flex-1 px-4 py-2 bg-gray-600 rounded-lg text-center text-sm font-semibold cursor-not-allowed opacity-50">
          Private Project
        </button>
      </div>
    </div>

    <!-- Hover Overlay Effect -->
    <div 
      class="absolute inset-0 bg-linear-to-br from-cyan-600/0 to-blue-600/0 group-hover:from-cyan-600/10 group-hover:to-blue-600/10 transition-all duration-500 pointer-events-none">
    </div>
  </div>

  <!-- Image Modal -->
  <div v-if="isModalOpen" 
       class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
       @click="closeModal">
    <div class="relative max-w-6xl max-h-[90vh] w-full h-full flex flex-col">
      <!-- Modal Header -->
      <div class="flex justify-between items-center mb-4">
        <h3 class="text-2xl font-bold text-white">{{ project.title }} - Screenshots</h3>
        <button @click="closeModal" 
                class="text-white hover:text-red-400 text-2xl p-2">
          ✕
        </button>
      </div>
      
      <!-- Image Container -->
      <div class="flex-1 flex items-center justify-center bg-gray-900/50 rounded-lg overflow-hidden">
        <img v-if="project.screenshots && project.screenshots[currentImageIndex]"
             :src="project.screenshots[currentImageIndex]" 
             :alt="`${project.title} screenshot ${currentImageIndex + 1}`"
             class="max-w-full max-h-full object-contain"
             @click.stop>
      </div>
      
      <!-- Navigation -->
      <div v-if="project.screenshots && project.screenshots.length > 1" 
           class="flex justify-center items-center gap-4 mt-4">
        <button @click="previousImage" 
                class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
          ← Previous
        </button>
        <span class="text-white">
          {{ currentImageIndex + 1 }} / {{ project.screenshots.length }}
        </span>
        <button @click="nextImage" 
                class="px-4 py-2 bg-cyan-600 text-white rounded-lg hover:bg-cyan-500 transition-colors">
          Next →
        </button>
      </div>
      
      <!-- Thumbnails -->
      <div v-if="project.screenshots && project.screenshots.length > 1" 
           class="flex gap-2 mt-4 justify-center flex-wrap">
        <img v-for="(screenshot, index) in project.screenshots" 
             :key="index"
             :src="screenshot" 
             :alt="`${project.title} thumbnail ${index + 1}`"
             class="w-16 h-16 object-cover rounded cursor-pointer border-2 transition-all"
             :class="currentImageIndex === index ? 'border-cyan-400' : 'border-gray-600 hover:border-gray-400'"
             @click="currentImageIndex = index">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

const props = defineProps({
  project: {
    type: Object,
    required: true
  }
})

const isHovered = ref(false)
const isDescriptionExpanded = ref(false)
const isModalOpen = ref(false)
const currentImageIndex = ref(0)

const toggleDescription = () => {
  isDescriptionExpanded.value = !isDescriptionExpanded.value
}

const openImageModal = (index = 0) => {
  currentImageIndex.value = index
  isModalOpen.value = true
  document.body.style.overflow = 'hidden' // Prevent background scrolling
}

const closeModal = () => {
  isModalOpen.value = false
  currentImageIndex.value = 0
  document.body.style.overflow = 'auto' // Restore scrolling
}

const nextImage = () => {
  if (props.project.screenshots && currentImageIndex.value < props.project.screenshots.length - 1) {
    currentImageIndex.value++
  } else {
    currentImageIndex.value = 0 // Loop back to first image
  }
}

const previousImage = () => {
  if (currentImageIndex.value > 0) {
    currentImageIndex.value--
  } else if (props.project.screenshots) {
    currentImageIndex.value = props.project.screenshots.length - 1 // Loop to last image
  }
}

// Keyboard navigation
const handleKeydown = (event) => {
  if (!isModalOpen.value) return
  
  switch(event.key) {
    case 'Escape':
      closeModal()
      break
    case 'ArrowLeft':
      previousImage()
      break
    case 'ArrowRight':
      nextImage()
      break
  }
}

// Add keyboard listener
if (typeof window !== 'undefined') {
  window.addEventListener('keydown', handleKeydown)
}

// Cleanup on unmount
import { onUnmounted } from 'vue'
onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
    document.body.style.overflow = 'auto' // Ensure scrolling is restored
  }
})
</script>

<style scoped>
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>