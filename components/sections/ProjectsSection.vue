<template>
  <section id="projects" class="pb-20 bg-[#050310] relative overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12">

      <!-- Header -->
      <div class="flex flex-col md:flex-row md:items-end md:justify-between gap-8 mb-16">
        <div>
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <span class="text-violet-400 text-sm font-semibold tracking-wide">Featured Work</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
            Production <span class="text-transparent"
              style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Systems</span>
          </h2>
          <p class="text-gray-400 text-lg mt-3 max-w-xl">
            50+ projects shipped — LMS, fintech, cloud platforms, AI tools, and internal automation systems.
          </p>
        </div>

        <!-- Filter pills -->
        <div class="flex flex-wrap gap-2">
          <button v-for="f in filters" :key="f" @click="activeFilter = f; showAll = false"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeFilter === f
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
              : 'border border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-violet-300'">
            {{ f }}
          </button>
        </div>
      </div>

      <!-- Grid -->
      <div v-if="visibleProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(project, index) in visibleProjects" :key="project.title"
          class="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-7 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden cursor-default animate-fadeInUp"
          :style="`animation-delay: ${index * 60}ms`">

          <!-- Hover glow -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl pointer-events-none"
            style="background: radial-gradient(circle at 10% 10%, rgba(108,62,239,0.07) 0%, transparent 60%)" />

          <!-- Icon + status -->
          <div class="flex items-center justify-between mb-5">
            <span class="text-2xl select-none">{{ project.icon }}</span>
            <span v-if="project.status === 'Live'"
              class="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
              <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Live
            </span>
            <span v-else class="text-xs font-semibold text-gray-600 border border-white/5 px-3 py-1 rounded-full">Internal</span>
          </div>

          <!-- Title & description -->
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">{{ project.title }}</h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{{ project.description }}</p>

          <!-- Metrics -->
          <div v-if="project.metrics" class="flex gap-4 mb-5 pb-5 border-b border-white/5">
            <div v-for="(val, key) in project.metrics" :key="key" class="text-center">
              <div class="text-sm font-bold text-violet-400">{{ val }}</div>
              <div class="text-[10px] text-gray-600 capitalize">{{ key }}</div>
            </div>
          </div>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            <span v-for="tech in project.technologies.slice(0, 5)" :key="tech"
              class="px-2 py-0.5 rounded-md text-xs text-gray-500 border border-white/5">{{ tech }}</span>
            <span v-if="project.technologies.length > 5" class="px-2 py-0.5 rounded-md text-xs text-violet-500">
              +{{ project.technologies.length - 5 }}
            </span>
          </div>

          <!-- Footer -->
          <div class="flex items-center justify-between">
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" rel="noopener"
              class="inline-flex items-center gap-1.5 text-xs text-violet-400 hover:text-violet-300 font-semibold transition-colors group/link">
              View Live
              <svg class="w-3 h-3 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform"
                fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
            <span v-else class="text-xs text-gray-700 font-medium">Internal / Private</span>
<!-- 
            <NuxtLink :to="`/projects#${slugify(project.title)}`"
              class="inline-flex items-center gap-1 text-xs text-gray-600 hover:text-violet-400 font-medium transition-colors">
              Details
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </NuxtLink> -->
          </div>
        </div>
      </div>

      <!-- See All / fade -->
      <div v-if="!showAll && filteredProjects.length > INITIAL_COUNT" class="relative mt-0">
        <div class="absolute -top-32 left-0 right-0 h-32 pointer-events-none"
          style="background: linear-gradient(to bottom, transparent, #050310)" />
        <div class="flex flex-col items-center gap-4 pt-10">
          <p class="text-gray-600 text-sm">Showing {{ visibleProjects.length }} of {{ filteredProjects.length }} projects</p>
          <button @click="showAll = true"
            class="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-500/60 hover:scale-105 transition-all duration-300"
            style="box-shadow: 0 0 30px rgba(108,62,239,0.15)">
            <svg class="w-5 h-5 text-violet-400 group-hover:translate-y-0.5 transition-transform"
              fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
            </svg>
            See All {{ filteredProjects.length }} Projects
          </button>
        
        </div>
      </div>

      <!-- Collapse when expanded -->
      <div v-if="showAll && filteredProjects.length > INITIAL_COUNT" class="flex justify-center mt-10 gap-6">
        <button @click="showAll = false; scrollToSection()"
          class="flex items-center gap-2 px-6 py-3 rounded-xl text-sm font-semibold text-gray-500 border border-white/5 hover:border-white/10 hover:text-gray-300 transition-all duration-300">
          <svg class="w-4 h-4 rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
          Show Less
        </button>
        
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const INITIAL_COUNT = 6
const activeFilter = ref('All')
const showAll = ref(false)
const filters = ['All', 'Web Application', 'Cloud', 'AI', 'Internal Application']

const slugify = (str) => str.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
const scrollToSection = () => {
  document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
}

const projects = [
  { title: 'Al Nafi International College', description: 'Comprehensive web platform with microservices architecture, Sentry monitoring, and AWS infrastructure. Serves 5K+ active users with 99.9% uptime.', icon: '🏫', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Sentry', 'OpenAI', 'Claude'], category: ['Web Application'], metrics: { users: '5K+', performance: '75%', uptime: '99.9%' }, liveUrl: 'https://alnafi.com' },
  { title: 'Al Nafi Cloud', description: 'Scalable cloud platform delivering AWS EC2 containers where users perform real-world labs and practical exercises. Advanced monitoring with 99.5% uptime.', icon: '☁️', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'OpenAI', 'Claude'], category: ['Cloud', 'Web Application', 'AI'], metrics: { users: '5K+', performance: '80%', uptime: '99.5%' }, liveUrl: 'https://alnafi.cloud' },
  { title: 'Learning Management System', description: 'Full-featured LMS with video streaming, quiz engines, progress analytics, and payment gateway integrations (Easypaisa, UBL, Stripe).', icon: '📚', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'Kubernetes'], category: ['Web Application'], metrics: { users: '1K+', performance: '93%', uptime: '99.8%' }, liveUrl: 'https://lms.alnafi.com/' },
  { title: 'Epay — Fintech Solution', description: 'Payment gateway system integrating Easypaisa and Pakistani banking apps via 1-bill. Secure transaction processing with real-time settlement.', icon: '💳', status: 'Live', technologies: ['Flask', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'Redis'], category: ['Web Application', 'Internal Application'], metrics: { users: '1K', performance: '71%', uptime: '99.8%' }, liveUrl: null },
  { title: 'MCQ & Notes Generator', description: 'AI-powered tool where teams upload CSVs to generate MCQs and structured notes using OpenAI and Claude. Handles batch jobs at scale.', icon: '📝', status: 'Live', technologies: ['Django', 'REST APIs', 'OpenAI', 'Claude', 'AWS', 'Docker'], category: ['Web Application', 'AI', 'Internal Application'], metrics: { users: '1K', performance: '95%', uptime: '99.8%' }, liveUrl: null },
  { title: 'Email Marketing System', description: 'Mailchimp-like email marketing platform with customizable templates, audience segmentation, A/B testing, and performance analytics for 50K+ subscribers.', icon: '📧', status: 'Live', technologies: ['Django', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'OpenAI'], category: ['Web Application', 'Internal Application'], metrics: { users: '50K', performance: '100%', uptime: '99.8%' }, liveUrl: null },
  { title: 'Al Baseer — Data Lake', description: 'Centralized data platform collecting metrics from all org applications for monitoring, visualization, and cross-system analytics.', icon: '📊', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'OpenAI'], category: ['Web Application', 'Internal Application'], metrics: { users: '40', performance: '95%', uptime: '99.8%' }, liveUrl: null },
  { title: 'HRM System', description: 'Enterprise HR management with employee onboarding, performance tracking, leave management, and payroll processing for 100+ employees.', icon: '👥', status: 'Live', technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'Docker'], category: ['Web Application', 'Internal Application'], metrics: { users: '100', performance: '98%', uptime: '99.8%' }, liveUrl: null },
  { title: 'Instructor Payout System', description: 'Real-time commission tracking and monthly payout automation for CFO and Accounts teams. Integrates with all e-learning platforms.', icon: '💰', status: 'Live', technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'OpenAI'], category: ['Web Application', 'Internal Application'], metrics: { users: '1K', performance: '95%', uptime: '99.8%' }, liveUrl: null },
  { title: 'Al Nafi Loyalty Program', description: 'Points-based loyalty system allowing users to earn and redeem across all Al Nafi services with transaction history and reward management.', icon: '🎁', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Redis'], category: ['Web Application'], metrics: { users: '100', performance: '95%', uptime: '99.8%' }, liveUrl: 'https://loyalty.alnafi.com/' },
  { title: 'Affiliate Management System', description: 'Multi-channel affiliate portal enabling users to sign up, track referrals, and manage commissions. Integrates with main e-learning platform.', icon: '🔗', status: 'Live', technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker'], category: ['Web Application'], metrics: { users: '1K+', performance: '93%', uptime: '99.8%' }, liveUrl: 'https://affiliate.alnafi.com/' },
  { title: 'Campus Management System', description: 'Streamlines student enrollment, attendance, grade management, and teacher tracking. Robust reporting for administrators and faculty.', icon: '🏛️', status: 'Live', technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'OpenAI'], category: ['Web Application', 'Internal Application'], metrics: { users: '10', performance: '70%', uptime: '99.8%' }, liveUrl: null },
]

const filteredProjects = computed(() =>
  activeFilter.value === 'All'
    ? projects
    : projects.filter(p => Array.isArray(p.category) ? p.category.includes(activeFilter.value) : p.category === activeFilter.value)
)

const visibleProjects = computed(() =>
  showAll.value ? filteredProjects.value : filteredProjects.value.slice(0, INITIAL_COUNT)
)
</script>

<style scoped>
@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeInUp { animation: fadeInUp 0.5s ease-out both; }
</style>