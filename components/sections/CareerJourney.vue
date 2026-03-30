<template>
  <section id="experience" class="py-20  bg-[#050310] relative overflow-hidden">

    <!-- Ambient glow -->
    <div class="absolute top-1/2 left-0 w-[400px] h-[600px] -translate-y-1/2 opacity-20 pointer-events-none"
      style="background: radial-gradient(ellipse, #6C3EEF 0%, transparent 70%)" />

    <div class="container mx-auto px-6 lg:px-12 relative z-10">

      <!-- Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
          <span class="text-violet-400 text-sm font-semibold tracking-wide">Career Path</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          My <span class="text-transparent"
            style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Journey</span>
        </h2>
        <p class="text-gray-400 text-lg mt-4 max-w-2xl mx-auto">From writing my first lines of code to leading engineering teams - every step shaped who I am.</p>
      </div>

      <!-- Timeline -->
      <div class="relative max-w-5xl mx-auto">
        <!-- Central spine -->
        <div class="absolute left-6 md:left-1/2 top-0 bottom-0 w-px md:-translate-x-px"
          style="background: linear-gradient(to bottom, #6C3EEF, #22d3ee, rgba(108,62,239,0.1))" />

        <div class="space-y-16">
          <div v-for="(exp, index) in experiences" :key="index" :ref="el => expRefs[index] = el"
            class="relative flex flex-col md:flex-row items-start opacity-0 translate-y-8 transition-all duration-700"
            :class="index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'">

            <!-- Timeline node -->
            <div class="absolute left-6 md:left-1/2 -translate-x-1/2 top-8 z-20">
              <div class="w-4 h-4 rounded-full border-2 border-violet-500 bg-[#050310] relative">
                <div v-if="exp.current" class="absolute inset-0 rounded-full animate-ping bg-violet-500 opacity-40" />
              </div>
            </div>

            <!-- Content card - left or right -->
            <div class="pl-14 md:pl-0 w-full md:w-[calc(50%-2rem)]"
              :class="index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'">
              <div class="group rounded-3xl border border-white/5 bg-white/[0.03] p-8 hover:border-violet-500/30 hover:bg-white/[0.05] transition-all duration-500 overflow-hidden relative">

                <!-- Current glow -->
                <div v-if="exp.current"
                  class="absolute inset-0 opacity-[0.05] rounded-3xl"
                  style="background: linear-gradient(135deg, #f59e0b, transparent)" />

                <!-- Period + current badge -->
                <div class="flex flex-wrap items-center gap-3 mb-4">
                  <span class="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                    {{ exp.period }}
                  </span>
                  <span v-if="exp.current"
                    class="text-xs font-bold px-3 py-1 rounded-full text-amber-400 border border-amber-500/30 bg-amber-500/10 animate-pulse">
                    Current
                  </span>
                </div>

                <!-- Role & company -->
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                  {{ exp.title }}
                </h3>
                <div class="flex items-center gap-2 mb-4">
                  <span class="text-violet-400 font-semibold">{{ exp.company }}</span>
                </div>

                <!-- Description -->
                <p class="text-gray-400 text-sm leading-relaxed mb-5">{{ exp.description }}</p>

                <!-- Achievements (collapsible) -->
                <div v-if="exp.achievements">
                  <button @click="exp.expanded = !exp.expanded"
                    class="text-xs text-violet-400 hover:text-violet-300 font-semibold flex items-center gap-1 mb-3 transition-colors">
                    <svg class="w-3 h-3 transition-transform duration-300" :class="exp.expanded ? 'rotate-90' : ''"
                      fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
                    </svg>
                    {{ exp.expanded ? 'Hide' : 'Show' }} key achievements
                  </button>
                  <div v-if="exp.expanded" class="space-y-2 mb-5">
                    <div v-for="(a, ai) in exp.achievements" :key="ai"
                      class="flex items-start gap-2 text-xs text-gray-400">
                      <div class="w-1 h-1 rounded-full bg-violet-500 mt-1.5 flex-shrink-0" />
                      {{ a }}
                    </div>
                  </div>
                </div>

                <!-- Tech tags -->
                <div class="flex flex-wrap gap-1.5">
                  <span v-for="tech in exp.technologies.slice(0, 8)" :key="tech"
                    class="px-2 py-0.5 rounded-md text-xs text-gray-500 border border-white/5 bg-white/[0.02]">
                    {{ tech }}
                  </span>
                  <span v-if="exp.technologies.length > 8"
                    class="px-2 py-0.5 rounded-md text-xs text-violet-500 border border-violet-500/20">
                    +{{ exp.technologies.length - 8 }} more
                  </span>
                </div>

                <!-- Stats row -->
                <div v-if="exp.stats && Object.keys(exp.stats).length" class="grid grid-cols-3 gap-3 mt-6 pt-5 border-t border-white/5">
                  <div v-for="(stat, key) in exp.stats" :key="key" class="text-center">
                    <div class="text-lg font-bold text-violet-400">{{ stat.value }}</div>
                    <div class="text-[10px] text-gray-600 mt-0.5">{{ stat.label }}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Download CV -->
        <div class="mt-20 flex justify-center">
          <a href="Muhammad-Sameer-CV.pdf" download
            class="group flex items-center gap-3 px-8 py-4 rounded-2xl font-bold text-white border border-violet-500/30 bg-violet-500/10 hover:bg-violet-500/20 hover:border-violet-500/60 transition-all duration-300">
            <svg class="w-5 h-5 text-violet-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
            </svg>
            Download Full Resume
            <svg class="w-4 h-4 text-gray-500 group-hover:translate-x-1 transition-transform" fill="none"
              stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted, reactive } from 'vue'

const expRefs = ref([])

const experiences = reactive([
  {
    period: 'Oct 2024 – Present',
    title: 'Senior Full Stack Developer',
    company: 'Nexia Tech',
    current: true,
    expanded: false,
    description: 'Building scalable HRM, CRM, and custom web platforms for diverse clients. Delivering end-to-end solutions using modern backend and frontend stacks with a focus on maintainability.',
    achievements: [
      'Built custom HRM and CRM solutions improving workflow automation by 40%',
      'Reduced bug reports by 25% through architecture improvements',
      'Delivered secure backend systems integrated with intuitive frontend interfaces',
    ],
    technologies: ['Python', 'Django', 'PHP', 'Streamlit', 'JavaScript', 'AWS', 'Nginx', 'MySQL', 'REST APIs', 'React'],
    stats: { team: { value: '1', label: 'Team Size' }, uptime: { value: '99.99%', label: 'Uptime' }, projects: { value: '20+', label: 'Projects' } }
  },
  {
    period: 'Aug 2022 – Present',
    title: 'Engineering Manager - Core Applications',
    company: 'Al Nafi E-Learning Pvt. Ltd.',
    current: true,
    expanded: false,
    description: 'Leading a team of 8 engineers building and maintaining cloud infrastructure and 50+ production applications. Driving DevOps transformation, CI/CD automation, and microservices migration across the organization.',
    achievements: [
      'Mentored 5 junior developers to mid-level positions',
      'Achieved 99.99% uptime across all production services',
      '2× Employee of the Month for outstanding leadership',
      'Led 25+ zero-downtime deployments',
      'Reduced deployment time by 75% via CI/CD automation',
      'Migrated monolithic architecture to microservices across 20+ apps',
      'Managed 5 cross-functional teams improving delivery timelines by 30%',
    ],
    technologies: ['Python', 'Django', 'Flask', 'Vue.js', 'Nuxt.js', 'AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'PostgreSQL', 'Redis', 'Sentry', 'APM', 'GraphQL'],
    stats: { team: { value: '8', label: 'Team Size' }, uptime: { value: '99.99%', label: 'Uptime' }, projects: { value: '50+', label: 'Projects' } }
  },
  {
    period: 'Jun 2024 – Present',
    title: 'Freelance Full Stack Developer',
    company: 'Ranked Designs',
    current: true,
    expanded: false,
    description: 'Building custom PMS and web solutions for diverse clients, improving internal workflow automation and delivering full-cycle software tailored to business goals.',
    achievements: [
      'Built custom PMS solutions improving workflow automation by 40%',
      'Delivered full-cycle software solutions aligned to client business objectives',
    ],
    technologies: ['Python', 'Django', 'JavaScript', 'Git', 'Hostinger', 'MySQL', 'REST APIs'],
    stats: {}
  },
  {
    period: 'Jun 2022 – Sep 2022',
    title: 'Junior Faculty Instructor',
    company: 'Aptech',
    current: false,
    expanded: false,
    description: 'Teaching and mentoring students in Python, Django, and web development. Designed curriculum, conducted practical sessions, and organized hackathons.',
    achievements: [
      'Taught ACCP 2.0 Diploma to 4 batches of 20+ students',
      'Received positive feedback from 75% of students',
      'Conducted Teacher Training Sessions on latest educational technologies',
    ],
    technologies: ['Python', 'Django', 'HTML/CSS', 'JavaScript', 'WordPress', 'Git', 'PHP', 'Laravel', 'MySQL'],
    stats: { users: { value: '100+', label: 'Students' }, projects: { value: '10+', label: 'Projects' } }
  },
  {
    period: 'Mar 2022 – Jul 2022',
    title: 'Full Stack Developer',
    company: 'Coderz House LTD',
    current: false,
    expanded: false,
    description: 'Contributed to high-impact projects in a fast-paced startup. Developed RESTful APIs, responsive frontends, and reduced page load times by 40%.',
    achievements: [
      'Developed Django-based HRM system and multi-page web apps',
      'Reduced page load times by 40%',
      'Implemented secure, responsive UIs with Tailwind CSS and Vue.js',
    ],
    technologies: ['JavaScript', 'Python', 'MySQL', 'Django', 'HTML/CSS', 'REST APIs'],
    stats: { projects: { value: '10', label: 'Projects' } }
  },
  {
    period: 'Sep 2021 – Mar 2022',
    title: 'Data Analyst Intern (Remote)',
    company: 'ML Sense',
    current: false,
    expanded: false,
    description: 'Analyzed real-world datasets, created data dashboards and visualizations to communicate patterns and support business decision-making.',
    achievements: [
      'Analyzed datasets with Python, producing visual insights and trend reports',
      'Created dashboards communicating patterns to clients in real-time',
    ],
    technologies: ['Python', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Jupyter'],
    stats: {}
  },
])

let observer = null

const handleScroll = () => {
  expRefs.value.forEach((el) => {
    if (!el) return
    const rect = el.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.85) {
      el.style.opacity = '1'
      el.style.transform = 'translateY(0)'
    }
  })
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>