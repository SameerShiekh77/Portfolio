<template>
  <section id="projects" class="py-20  bg-[#050310] relative overflow-hidden">
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
            50+ projects shipped - LMS, fintech, cloud platforms, AI tools, and internal automation systems.
          </p>
        </div>

        <!-- Filter pills -->
        <div class="flex flex-wrap gap-2">
          <button v-for="f in filters" :key="f" @click="activeFilter = f"
            class="px-4 py-2 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeFilter === f
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
              : 'border border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-violet-300'">
            {{ f }}
          </button>
        </div>
      </div>

      <!-- Bento grid -->
      <div v-if="filteredProjects.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div v-for="(project, index) in filteredProjects" :key="project.title"
          class="group relative rounded-3xl border border-white/5 bg-white/[0.02] p-7 hover:border-violet-500/30 hover:bg-white/[0.04] transition-all duration-500 overflow-hidden cursor-default"
          :class="index === 0 ? 'md:col-span-2 lg:col-span-1' : ''">

          <!-- Hover glow -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-3xl"
            style="background: radial-gradient(circle at 0% 0%, rgba(108,62,239,0.08) 0%, transparent 60%)" />

          <!-- Status + category -->
          <div class="flex items-center justify-between mb-5">
            <span class="text-2xl select-none">{{ project.icon }}</span>
            <div class="flex items-center gap-2">
              <span v-if="project.status === 'Live'"
                class="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-3 py-1 rounded-full">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Live
              </span>
            </div>
          </div>

          <!-- Title & description -->
          <h3 class="text-lg font-bold text-white mb-2 group-hover:text-violet-300 transition-colors">
            {{ project.title }}
          </h3>
          <p class="text-gray-500 text-sm leading-relaxed mb-5 line-clamp-3">{{ project.description }}</p>

          <!-- Metrics row -->
          <div v-if="project.metrics" class="flex gap-4 mb-5 pb-5 border-b border-white/5">
            <div v-for="(val, key) in project.metrics" :key="key" class="text-center">
              <div class="text-sm font-bold text-violet-400">{{ val }}</div>
              <div class="text-[10px] text-gray-600 capitalize">{{ key }}</div>
            </div>
          </div>

          <!-- Tech tags -->
          <div class="flex flex-wrap gap-1.5 mb-5">
            <span v-for="tech in project.technologies.slice(0, 6)" :key="tech"
              class="px-2 py-0.5 rounded-md text-xs text-gray-500 border border-white/5">
              {{ tech }}
            </span>
            <span v-if="project.technologies.length > 6"
              class="px-2 py-0.5 rounded-md text-xs text-violet-500">
              +{{ project.technologies.length - 6 }}
            </span>
          </div>

          <!-- Live link -->
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
        </div>
      </div>

      <div v-else class="text-center py-20">
        <p class="text-gray-500 text-lg">No projects in this category yet.</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const filters = ['All', 'Web Application', 'Cloud', 'AI', 'Internal Application']

const projects = [
  {
    title: 'Al Nafi International College',
    description: 'Comprehensive web platform with microservices architecture, Sentry monitoring, and AWS infrastructure. Serves 5K+ active users with 99.9% uptime.',
    icon: '🏫', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Sentry', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: { users: '5K+', performance: '75%', uptime: '99.9%' },
    liveUrl: 'https://alnafi.com',
  },
  {
    title: 'Al Nafi Cloud',
    description: 'Scalable cloud platform delivering AWS EC2 containers where users perform real-world labs and practical exercises. Advanced monitoring with 99.5% uptime.',
    icon: '☁️', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'OpenAI', 'Claude'],
    category: ['Cloud', 'Web Application', 'AI'],
    metrics: { users: '5K+', performance: '80%', uptime: '99.5%' },
    liveUrl: 'https://alnafi.cloud',
  },
  {
    title: 'Learning Management System',
    description: 'Full-featured LMS with video streaming, quiz engines, progress analytics, and payment gateway integrations (Easypaisa, UBL, Stripe).',
    icon: '📚', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'Kubernetes'],
    category: ['Web Application'],
    metrics: { users: '1K+', performance: '93%', uptime: '99.8%' },
    liveUrl: 'https://lms.alnafi.com/',
  },
  {
    title: 'Epay - Fintech Solution',
    description: 'Payment gateway system integrating Easypaisa and Pakistani banking apps via 1-bill. Secure transaction processing with real-time settlement.',
    icon: '💳', status: 'Live',
    technologies: ['Flask', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'Redis'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '1K', performance: '71%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'MCQ & Notes Generator',
    description: 'AI-powered tool where teams upload CSVs to generate MCQs and structured notes using OpenAI and Claude. Handles batch jobs at scale.',
    icon: '📝', status: 'Live',
    technologies: ['Django', 'REST APIs', 'OpenAI', 'Claude', 'AWS', 'Docker'],
    category: ['Web Application', 'AI', 'Internal Application'],
    metrics: { users: '1K', performance: '95%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'Email Marketing System',
    description: 'Mailchimp-like email marketing platform with customizable templates, audience segmentation, A/B testing, and performance analytics for 50K+ subscribers.',
    icon: '📧', status: 'Live',
    technologies: ['Django', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'OpenAI'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '50K', performance: '100%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'Al Baseer - Data Lake',
    description: 'Centralized data platform collecting metrics from all org applications for monitoring, visualization, and cross-system analytics.',
    icon: '📊', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker', 'OpenAI'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '40', performance: '95%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'HRM System',
    description: 'Enterprise HR management with employee onboarding, performance tracking, leave management, and payroll processing for 100+ employees.',
    icon: '👥', status: 'Live',
    technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'Docker'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '100', performance: '98%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'Instructor Payout System',
    description: 'Real-time commission tracking and monthly payout automation for CFO and Accounts teams. Integrates with all e-learning platforms.',
    icon: '💰', status: 'Live',
    technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'OpenAI'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '1K', performance: '95%', uptime: '99.8%' },
    liveUrl: null,
  },
  {
    title: 'Al Nafi Loyalty Program',
    description: 'Points-based loyalty system allowing users to earn and redeem across all Al Nafi services with transaction history and reward management.',
    icon: '🎁', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Redis'],
    category: ['Web Application'],
    metrics: { users: '100', performance: '95%', uptime: '99.8%' },
    liveUrl: 'https://loyalty.alnafi.com/',
  },
  {
    title: 'Affiliate Management System',
    description: 'Multi-channel affiliate portal enabling users to sign up, track referrals, and manage commissions. Integrates with main e-learning platform.',
    icon: '🔗', status: 'Live',
    technologies: ['Django', 'Vue.js', 'Nuxt.js', 'MySQL', 'AWS', 'Docker'],
    category: ['Web Application'],
    metrics: { users: '1K+', performance: '93%', uptime: '99.8%' },
    liveUrl: 'https://affiliate.alnafi.com/',
  },
  {
    title: 'Campus Management System',
    description: 'Streamlines student enrollment, attendance, grade management, and teacher tracking. Robust reporting for administrators and faculty.',
    icon: '🏛️', status: 'Live',
    technologies: ['Django', 'REST APIs', 'MySQL', 'AWS', 'OpenAI'],
    category: ['Web Application', 'Internal Application'],
    metrics: { users: '10', performance: '70%', uptime: '99.8%' },
    liveUrl: null,
  },
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') return projects
  return projects.filter(p =>
    Array.isArray(p.category)
      ? p.category.includes(activeFilter.value)
      : p.category === activeFilter.value
  )
})
</script>