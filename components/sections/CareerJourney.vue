<template>
  <section id="experience" class="py-32 bg-black relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-pink-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
          <span class="text-pink-500 font-semibold">Career Path</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-white">My</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Journey</span>
        </h2>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
          From code to leadership - Every step tells a story
        </p>
      </div>
      
      <div class="max-w-6xl mx-auto">
        <!-- Interactive Timeline -->
        <div class="relative">
          <!-- Animated Central Line -->
          <div class="absolute left-4 md:left-1/2 top-0 bottom-0 w-1 md:w-1 transform md:-translate-x-1/2">
            <div class="h-full bg-gradient-to-b from-purple-500 via-pink-500 to-purple-500 relative overflow-hidden">
              <div class="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-shimmer"></div>
            </div>
          </div>

          <!-- Experience Cards -->
          <div class="space-y-16 md:space-y-24">
            <div
              v-for="(exp, index) in experiences"
              :key="index"
              :ref="el => experienceRefs[index] = el"
              class="relative opacity-0"
              :class="index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'"
              :style="`transition-delay: ${index * 0.2}s`">
              
              <!-- Timeline Node -->
              <div 
                class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 z-20"
                :class="{'animate-ping-slow': hoveredIndex === index}">
                <div class="relative">
                  <!-- Outer Ring -->
                  <div class="absolute inset-0 w-8 h-8 bg-gradient-to-br from-purple-500 to-pink-500 rounded-full animate-pulse"></div>
                  <!-- Inner Dot -->
                  <div class="relative w-8 h-8 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full flex items-center justify-center ring-4 ring-gray-900 shadow-lg shadow-purple-500/50">
                    <div class="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <!-- Glow Effect -->
                  <div class="absolute inset-0 w-8 h-8 bg-gradient-to-br from-purple-400 to-pink-400 rounded-full blur-md opacity-50"></div>
                </div>
              </div>

              <!-- Content Card -->
              <div 
                :class="index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'"
                class="pl-16 md:pl-0 md:w-full">
                <div 
                  @mouseenter="hoveredIndex = index"
                  @mouseleave="hoveredIndex = null"
                  class="group relative bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-purple-500/20 hover:border-purple-500/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-purple-500/20">
                  
                  <!-- Card Glow Effect -->
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-600/0 via-pink-600/0 to-purple-600/0 group-hover:from-purple-600/10 group-hover:via-pink-600/5 group-hover:to-purple-600/10 transition-all duration-500"></div>
                  
                  <!-- Animated Border -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div class="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent animate-shimmer"></div>
                    <div class="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-pink-500 to-transparent animate-shimmer" style="animation-delay: 1s;"></div>
                  </div>

                  <div class="relative p-8">
                    <!-- Period Badge -->
                    <div class="inline-flex items-center gap-2 mb-4">
                      <div class="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full border border-purple-500/30 backdrop-blur-sm">
                        <svg class="w-4 h-4 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path>
                        </svg>
                        <span class="text-purple-400 font-semibold text-sm">{{ exp.period }}</span>
                      </div>
                      <div v-if="exp.current" class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30 animate-pulse">
                        Current
                      </div>
                    </div>

                    <!-- Title & Company -->
                    <h3 class="text-3xl font-bold mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      {{ exp.title }}
                    </h3>
                    <div class="flex items-center gap-2 mb-4">
                      <svg class="w-5 h-5 text-pink-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path>
                      </svg>
                      <span class="text-xl text-pink-400 font-semibold">{{ exp.company }}</span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-300 leading-relaxed mb-6 text-lg">
                      {{ exp.description }}
                    </p>

                    <!-- Key Achievements -->
                    <div v-if="exp.achievements" class="mb-6 p-4 bg-purple-500/5 rounded-xl border border-purple-500/10">
                      <h4 class="text-sm font-semibold text-purple-400 mb-3 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"></path>
                        </svg>
                        Key Achievements
                      </h4>
                      <ul class="space-y-2">
                        <li v-for="(achievement, idx) in exp.achievements" :key="idx" class="flex items-start gap-2 text-gray-400 text-sm">
                          <svg class="w-4 h-4 text-purple-400 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
                          </svg>
                          <span>{{ achievement }}</span>
                        </li>
                      </ul>
                    </div>

                    <!-- Technologies -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span 
                        v-for="(tech, techIndex) in exp.technologies" 
                        :key="tech"
                        class="px-4 py-2 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-lg text-sm text-purple-300 border border-purple-500/20 hover:border-purple-500/50 hover:scale-105 transition-all cursor-default backdrop-blur-sm"
                        :style="`animation-delay: ${techIndex * 0.05}s`">
                        {{ tech }}
                      </span>
                    </div>

                    <!-- Stats -->
                    <div v-if="exp.stats" class="grid grid-cols-3 gap-4 pt-4 border-t border-purple-500/20">
                      <div v-for="(stat, key) in exp.stats" :key="key" class="text-center group/stat">
                        <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">
                          {{ stat.value }}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">{{ stat.label }}</div>
                      </div>
                    </div>

                    <!-- Decorative Corner -->
                    <div class="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-purple-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <div class="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-pink-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Resume CTA -->
        <div class="mt-20 text-center">
          <div class="inline-block p-1 bg-gradient-to-r from-purple-500 to-pink-500 rounded-2xl">
            <a 
              href="#" 
              class="flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all group">
              <svg class="w-6 h-6 text-purple-400 group-hover:scale-110 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path>
              </svg>
              <span class="text-lg font-semibold text-white">Download Full Resume</span>
              <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import SectionTitle from '../ui/SectionTitle.vue'

const experienceRefs = ref([])
const hoveredIndex = ref(null)

const experiences = [
  {
    period: '2020 - Present',
    title: 'DevOps Manager',
    company: 'Tech Innovations Inc.',
    current: true,
    description: 'Leading a team of 8 engineers in building and maintaining cloud infrastructure. Spearheading DevOps transformation initiatives, implementing cutting-edge CI/CD pipelines, and driving automation across the organization.',
    achievements: [
      'Reduced deployment time from 4 hours to 15 minutes',
      'Achieved 99.99% uptime across all production services',
      'Cut infrastructure costs by 35% through optimization',
      'Mentored 5 junior developers to mid-level positions'
    ],
    technologies: ['AWS', 'Docker', 'Kubernetes', 'Terraform', 'Jenkins', 'Python', 'Ansible'],
    stats: {
      team: { value: '8', label: 'Team Size' },
      uptime: { value: '99.99%', label: 'Uptime' },
      savings: { value: '35%', label: 'Cost Saved' }
    }
  },
  {
    period: '2019 - 2020',
    title: 'Senior Full Stack Developer',
    company: 'Digital Solutions Ltd.',
    description: 'Architected and developed enterprise-grade web applications serving 100K+ users. Led the migration from monolithic to microservices architecture, significantly improving scalability and maintainability.',
    achievements: [
      'Built 3 major applications from scratch to production',
      'Improved application performance by 60%',
      'Reduced bug reports by 45% through testing automation',
      'Implemented real-time features using WebSockets'
    ],
    technologies: ['Django', 'Vue.js', 'PostgreSQL', 'Redis', 'AWS', 'REST APIs', 'GraphQL'],
    stats: {
      users: { value: '100K+', label: 'Users' },
      performance: { value: '+60%', label: 'Speed Up' },
      projects: { value: '15+', label: 'Projects' }
    }
  },
  {
    period: '2018 - 2019',
    title: 'Full Stack Developer',
    company: 'StartUp Ventures',
    description: 'Contributed to multiple high-impact projects in a fast-paced startup environment. Developed RESTful APIs, responsive frontends, and integrated third-party services. Learned to thrive under pressure and deliver quality code quickly.',
    achievements: [
      'Delivered 8 projects ahead of schedule',
      'Integrated 10+ third-party APIs and services',
      'Reduced page load times by 40%',
      'Contributed to 50+ production releases'
    ],
    technologies: ['JavaScript', 'PHP', 'MySQL', 'Vue.js', 'WordPress', 'HTML/CSS'],
    stats: {
      projects: { value: '8', label: 'Projects' },
      releases: { value: '50+', label: 'Releases' },
      speed: { value: '40%', label: 'Faster' }
    }
  }
]

const handleScroll = () => {
  experienceRefs.value.forEach((ref, index) => {
    if (ref) {
      const rect = ref.getBoundingClientRect()
      const windowHeight = window.innerHeight || document.documentElement.clientHeight
      
      if (rect.top <= windowHeight * 0.75) {
        ref.style.opacity = '1'
        ref.style.transform = index % 2 === 0 
          ? 'translateX(0)' 
          : 'translateX(0)'
        ref.style.transition = `all 0.8s ease-out ${index * 0.2}s`
      }
    }
  })
}

onMounted(() => {
  // Set initial transform
  experienceRefs.value.forEach((ref, index) => {
    if (ref) {
      ref.style.transform = index % 2 === 0 
        ? 'translateX(-50px)' 
        : 'translateX(50px)'
    }
  })
  
  window.addEventListener('scroll', handleScroll)
  handleScroll()
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style scoped>
@keyframes shimmer {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

.animate-shimmer {
  animation: shimmer 3s ease-in-out infinite;
}

@keyframes ping-slow {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>