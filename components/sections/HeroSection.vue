<template>
  <section id="home" class="min-h-screen flex items-center justify-center relative overflow-hidden pt-20">
    <!-- Animated Background -->
    <div class="absolute inset-0 overflow-hidden">
      <div 
        class="absolute w-96 h-96 bg-purple-500/30 rounded-full blur-3xl animate-pulse" 
        :style="`top: ${mouseY * 0.05}px; left: ${mouseX * 0.05}px;`">
      </div>
      <div 
        class="absolute w-96 h-96 bg-pink-500/30 rounded-full blur-3xl animate-pulse" 
        style="bottom: -10%; right: -10%; animation-delay: 1s;">
      </div>
    </div>
    
    <div class="container mx-auto px-6 relative z-10">
      <div class="text-center" :class="{'animate-fadeInUp': isVisible}">
        <!-- Animated Avatar -->
        <div class="mb-6 inline-block">
          <div class="w-32 h-32 rounded-full bg-gradient-to-br from-purple-400 to-pink-600 p-1 animate-spin-slow">
            <div class="w-full h-full rounded-full bg-gray-900 flex items-center justify-center">
              <span class="text-5xl">👨‍💻</span>
            </div>
          </div>
        </div>
        
        <!-- Typing Effect Title -->
        <h1 class="text-6xl md:text-8xl font-bold mb-4 bg-gradient-to-r from-purple-400 via-pink-400 to-purple-400 bg-clip-text text-transparent animate-gradient">
          {{ displayText }}<span class="animate-blink">|</span>
        </h1>
        
        <h2 class="text-4xl md:text-6xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500">
          DevOps Manager & Full Stack Developer
        </h2>
        
        <p class="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
          Crafting <span class="text-purple-400 font-semibold">scalable solutions</span> from cloud infrastructure to 
          <span class="text-pink-400 font-semibold"> AI-powered applications</span>. 
          5 years of transforming ideas into production-ready systems.
        </p>
        
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <a 
            href="#contact" 
            class="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full font-semibold hover:scale-105 transform transition-all shadow-lg hover:shadow-purple-500/50">
            Let's Connect
          </a>
          <a 
            href="#projects" 
            class="px-8 py-4 border-2 border-purple-500 rounded-full font-semibold hover:bg-purple-500/10 transition-all">
            View My Work
          </a>
        </div>

        <!-- Stats -->
        <div class="flex justify-center gap-6 flex-wrap">
          <div 
            v-for="(stat, index) in stats" 
            :key="index"
            class="text-center transform hover:scale-110 transition-transform">
            <div class="text-4xl font-bold" :class="stat.color">{{ stat.value }}</div>
            <div class="text-gray-400">{{ stat.label }}</div>
          </div>
        </div>
      </div>
    </div>
    
    <!-- Scroll Indicator -->
    <div class="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
      <svg class="w-6 h-6 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
      </svg>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const isVisible = ref(false)
const mouseX = ref(0)
const mouseY = ref(0)
const displayText = ref('')
const fullText = 'Hello, I\'m a'

const stats = [
  { value: '5+', label: 'Years Experience', color: 'text-purple-400' },
  { value: '50+', label: 'Projects', color: 'text-pink-400' },
  { value: '∞', label: 'Coffee Cups', color: 'text-purple-400' }
]

const handleMouseMove = (e) => {
  mouseX.value = e.clientX
  mouseY.value = e.clientY
}

// Typing effect
const typeText = () => {
  let index = 0
  const interval = setInterval(() => {
    if (index <= fullText.length) {
      displayText.value = fullText.slice(0, index)
      index++
    } else {
      clearInterval(interval)
    }
  }, 100)
}

onMounted(() => {
  isVisible.value = true
  typeText()
  window.addEventListener('mousemove', handleMouseMove)
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

@keyframes blink {
  0%, 50% {
    opacity: 1;
  }
  51%, 100% {
    opacity: 0;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}

.animate-spin-slow {
  animation: spin 8s linear infinite;
}

.animate-blink {
  animation: blink 1s infinite;
}

@keyframes spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}
</style>