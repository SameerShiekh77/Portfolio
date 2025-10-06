<template>
  <section class="py-16 bg-black relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
          <span class="text-blue-500 font-semibold">Services</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-white">What</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"> I Do</span>
        </h2>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
          Delivering end-to-end solutions from cloud architecture to full-stack development
        </p>
      </div>

      <!-- Services Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div v-for="(service, index) in services" :key="index"
             class="group relative bg-gradient-to-br from-gray-900/50 to-black border border-white/5 rounded-3xl p-8 hover:border-blue-500/50 transition-all duration-500 hover:-translate-y-2">
          <!-- Icon -->
          <div class="w-16 h-16 bg-gradient-to-br from-blue-500/20 to-cyan-500/20 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
            <div class="text-4xl">{{ service.icon }}</div>
          </div>

          <!-- Content -->
          <h3 class="text-2xl font-bold text-white mb-4 group-hover:text-blue-500 transition-colors">
            {{ service.title }}
          </h3>
          <p class="text-gray-400 leading-relaxed mb-6">
            {{ service.description }}
          </p>

          <!-- Arrow -->
          <div class="flex items-center text-blue-500 opacity-0 group-hover:opacity-100 transition-opacity">
            <span class="text-sm font-semibold mr-2">Learn More</span>
            <svg class="w-5 h-5 transform group-hover:translate-x-2 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
            </svg>
          </div>

          <!-- Hover Effect -->
          <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 rounded-3xl transition-all duration-500"></div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '☁️',
    title: 'Cloud DevOps',
    description: 'AWS infrastructure design, implementation, and management. CI/CD pipelines and automation for seamless deployments.'
  },
  {
    icon: '💻',
    title: 'Full Stack Dev',
    description: 'End-to-end web application development using modern frameworks like Django, Vue.js, and React.'
  },
  {
    icon: '🤖',
    title: 'AI Integration',
    description: 'Implementing machine learning models and AI-powered features into production applications.'
  },
  {
    icon: '🎨',
    title: 'UI/UX Design',
    description: 'Creating beautiful, intuitive interfaces with modern design principles and best practices.'
  }
]
</script>