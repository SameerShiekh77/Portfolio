<template>
  <section class="py-20 bg-black relative overflow-hidden">
    <div class="container mx-auto px-6">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        <!-- Experience Card -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div class="relative bg-gradient-to-br from-gray-900 to-black border border-pink-500/20 rounded-3xl p-8 hover:border-pink-500/50 transition-all">
            <div class="text-6xl mb-4">💼</div>
            <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-pink-600 mb-2">
              {{ stats.experience }}+
            </div>
            <div class="text-gray-400 text-lg">Years of Experience</div>
            <p class="text-gray-500 text-sm mt-2">Building scalable solutions and leading teams</p>
          </div>
        </div>

        <!-- Projects Card -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-purple-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div class="relative bg-gradient-to-br from-gray-900 to-black border border-purple-500/20 rounded-3xl p-8 hover:border-purple-500/50 transition-all">
            <div class="text-6xl mb-4">🚀</div>
            <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-purple-600 mb-2">
              {{ stats.projects }}+
            </div>
            <div class="text-gray-400 text-lg">Completed Projects</div>
            <p class="text-gray-500 text-sm mt-2">From concept to production deployment</p>
          </div>
        </div>

        <!-- Clients Card -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div class="relative bg-gradient-to-br from-gray-900 to-black border border-blue-500/20 rounded-3xl p-8 hover:border-blue-500/50 transition-all">
            <div class="text-6xl mb-4">👥</div>
            <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-blue-600 mb-2">
              {{ stats.clients }}+
            </div>
            <div class="text-gray-400 text-lg">Happy Clients</div>
            <p class="text-gray-500 text-sm mt-2">Worldwide satisfied customers</p>
          </div>
        </div>

        <!-- Awards Card -->
        <div class="relative group">
          <div class="absolute inset-0 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-3xl blur-xl group-hover:blur-2xl transition-all"></div>
          <div class="relative bg-gradient-to-br from-gray-900 to-black border border-yellow-500/20 rounded-3xl p-8 hover:border-yellow-500/50 transition-all">
            <div class="text-6xl mb-4">🏆</div>
            <div class="text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 to-yellow-600 mb-2">
              {{ stats.awards }}+
            </div>
            <div class="text-gray-400 text-lg">Awards Won</div>
            <p class="text-gray-500 text-sm mt-2">Recognition for excellence</p>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const stats = ref({
  experience: 0,
  projects: 0,
  clients: 0,
  awards: 0
})

const finalStats = {
  experience: 5,
  projects: 50,
  clients: 30,
  awards: 15
}

const animateValue = (key, end, duration = 2000) => {
  const start = 0
  const range = end - start
  const increment = end > start ? 1 : -1
  const stepTime = Math.abs(Math.floor(duration / range))
  
  let current = start
  const timer = setInterval(() => {
    current += increment
    stats.value[key] = current
    if (current === end) {
      clearInterval(timer)
    }
  }, stepTime)
}

onMounted(() => {
  setTimeout(() => {
    Object.keys(finalStats).forEach(key => {
      animateValue(key, finalStats[key])
    })
  }, 500)
})
</script>