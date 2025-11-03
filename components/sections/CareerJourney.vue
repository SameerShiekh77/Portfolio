<template>
  <section id="experience" class="py-16 bg-black relative overflow-hidden">
    <!-- Background Effects -->
    <div class="absolute inset-0">
      <div class="absolute top-20 left-10 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl animate-pulse"></div>
      <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-pulse"
        style="animation-delay: 2s;"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
          <span class="text-blue-500 font-semibold">Career Path</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-white">My</span>
          <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500"> Journey</span>
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
            <div class="h-full bg-gradient-to-b from-cyan-500 via-blue-500 to-cyan-500 relative overflow-hidden">
              <div
                class="absolute inset-0 bg-gradient-to-b from-transparent via-white to-transparent opacity-20 animate-shimmer">
              </div>
            </div>
          </div>

          <!-- Experience Cards -->
          <div class="space-y-16 md:space-y-24">
            <div v-for="(exp, index) in experiences" :key="index" :ref="el => experienceRefs[index] = el"
              class="relative opacity-0" :class="index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'"
              :style="`transition-delay: ${index * 0.2}s`">

              <!-- Timeline Node -->
              <div class="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 -translate-y-1/2 top-8 z-20"
                :class="{ 'animate-ping-slow': hoveredIndex === index }">
                <div class="relative">
                  <!-- Outer Ring -->
                  <div
                    class="absolute inset-0 w-8 h-8 bg-linear-to-br from-cyan-500 to-blue-500 rounded-full animate-pulse">
                  </div>
                  <!-- Inner Dot -->
                  <div
                    class="relative w-8 h-8 bg-linear-to-br from-cyan-600 to-blue-600 rounded-full flex items-center justify-center ring-4 ring-gray-900 shadow-lg shadow-cyan-500/50">
                    <div class="w-3 h-3 bg-white rounded-full"></div>
                  </div>
                  <!-- Glow Effect -->
                  <div
                    class="absolute inset-0 w-8 h-8 bg-linear-to-br from-cyan-400 to-blue-400 rounded-full blur-md opacity-50">
                  </div>
                </div>
              </div>

              <!-- Content Card -->
              <div :class="index % 2 === 0 ? 'md:mr-auto md:pr-16' : 'md:ml-auto md:pl-16'"
                class="pl-16 md:pl-0 md:w-full">
                <div @mouseenter="hoveredIndex = index" @mouseleave="hoveredIndex = null"
                  class="group relative bg-linear-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-xl rounded-3xl overflow-hidden border border-cyan-500/20 hover:border-cyan-500/60 transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl hover:shadow-cyan-500/20">

                  <!-- Card Glow Effect -->
                  <div
                    class="absolute inset-0 bg-linear-to-br from-cyan-600/0 via-blue-600/0 to-cyan-600/0 group-hover:from-cyan-600/10 group-hover:via-blue-600/5 group-hover:to-cyan-600/10 transition-all duration-500">
                  </div>

                  <!-- Animated Border -->
                  <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    <div
                      class="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-cyan-500 to-transparent animate-shimmer">
                    </div>
                    <div
                      class="absolute bottom-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-blue-500 to-transparent animate-shimmer"
                      style="animation-delay: 1s;"></div>
                  </div>

                  <div class="relative p-8">
                    <!-- Period Badge -->
                    <div class="inline-flex items-center gap-2 mb-4">
                      <div
                        class="flex items-center gap-2 px-4 py-2 bg-linear-to-r from-cyan-500/20 to-blue-500/20 rounded-full border border-cyan-500/30 backdrop-blur-sm">
                        <svg class="w-4 h-4 text-cyan-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z">
                          </path>
                        </svg>
                        <span class="text-cyan-400 font-semibold text-sm">{{ exp.period }}</span>
                      </div>
                      <div v-if="exp.current"
                        class="px-3 py-1 bg-green-500/20 text-green-400 rounded-full text-xs font-semibold border border-green-500/30 animate-pulse">
                        Current
                      </div>
                    </div>

                    <!-- Title & Company -->
                    <h3
                      class="text-3xl font-bold mb-2 bg-linear-to-r from-white to-cyan-200 bg-clip-text text-transparent group-hover:from-cyan-400 group-hover:to-blue-400 transition-all duration-300">
                      {{ exp.title }}
                    </h3>
                    <div class="flex items-center gap-2 mb-4">
                      <svg class="w-5 h-5 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4">
                        </path>
                      </svg>
                      <span class="text-xl text-blue-400 font-semibold">{{ exp.company }}</span>
                    </div>

                    <!-- Description -->
                    <p class="text-gray-300 leading-relaxed mb-6 text-lg">
                      {{ exp.description }}
                    </p>

                    <!-- Key Achievements -->
                    <div v-if="exp.achievements" class="mb-6 p-4 bg-cyan-500/5 rounded-xl border border-cyan-500/10">
                      <h4 class="text-sm font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z">
                          </path>
                        </svg>
                        Key Achievements
                      </h4>
                      <ul class="space-y-2">
                        <li v-for="(achievement, idx) in exp.achievements" :key="idx"
                          class="flex items-start gap-2 text-gray-400 text-sm">
                          <svg class="w-4 h-4 text-cyan-400 mt-0.5 flex-shrink-0" fill="currentColor"
                            viewBox="0 0 20 20">
                            <path fill-rule="evenodd"
                              d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                              clip-rule="evenodd"></path>
                          </svg>
                          <span>{{ achievement }}</span>
                        </li>
                      </ul>
                    </div>

                    <!-- Technologies -->
                    <div class="flex flex-wrap gap-2 mb-4">
                      <span v-for="(tech, techIndex) in exp.technologies" :key="tech"
                        class="px-4 py-2 bg-linear-to-r from-cyan-500/10 to-blue-500/10 rounded-lg text-sm text-cyan-300 border border-cyan-500/20 hover:border-cyan-500/50 hover:scale-105 transition-all cursor-default backdrop-blur-sm"
                        :style="`animation-delay: ${techIndex * 0.05}s`">
                        {{ tech }}
                      </span>
                    </div>

                    <!-- Stats -->
                    <div v-if="exp.stats" class="grid grid-cols-3 gap-4 pt-4 border-t border-cyan-500/20">
                      <div v-for="(stat, key) in exp.stats" :key="key" class="text-center group/stat">
                        <div
                          class="text-2xl font-bold bg-linear-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent group-hover/stat:scale-110 transition-transform">
                          {{ stat.value }}
                        </div>
                        <div class="text-xs text-gray-500 mt-1">{{ stat.label }}</div>
                      </div>
                    </div>

                    <!-- Decorative Corner -->
                    <div
                      class="absolute top-0 right-0 w-32 h-32 bg-linear-to-br from-cyan-500/10 to-transparent rounded-bl-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                    <div
                      class="absolute bottom-0 left-0 w-32 h-32 bg-linear-to-tr from-blue-500/10 to-transparent rounded-tr-full opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Download Resume CTA -->
        <div class="mt-20 text-center">
          <div class="inline-block p-1 bg-linear-to-r from-cyan-500 to-blue-500 rounded-2xl">
            <a href="Muhammad-Sameer-CV.pdf" download="Muhammad-Sameer-CV.pdf"
              class="flex items-center gap-3 px-8 py-4 bg-gray-900 rounded-xl hover:bg-gray-800 transition-all group">
              <svg class="w-6 h-6 text-cyan-400 group-hover:scale-110 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z">
                </path>
              </svg>
              <span class="text-lg font-semibold text-white">Download Full Resume</span>
              <svg class="w-5 h-5 text-gray-400 group-hover:translate-x-1 transition-transform" fill="none"
                stroke="currentColor" viewBox="0 0 24 24">
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
    period: 'Oct 2024 - Present.',
    title: 'Full Stack Developer ',
    company: 'Nexia Tech',
    current: true,
    description: 'Developing end-to-end web applications and solutions for diverse clients. Focusing on building scalable, maintainable, and high-performance systems that align with business objectives.',
    achievements: [
      'Built custom HRM and CRM solutions, improving internal workflow automation by 40%',
      'Resolved diverse client challenges by delivering full-cycle software solutions tailored to business goals',
      'Collaborated cross-functionally to create scalable web platforms using Django, Vue.js, and REST APIs',
      'Enhanced application responsiveness and maintainability, reducing bug reports by 25%',
      'Delivered secure backend systems integrated with intuitive frontend interfaces'
    ],
    technologies: ['Python', 'Django', 'PHP', 'Streamlit', 'JavaScript', 'Git/Github', 'AWS', 'Nginx', 'MySQL', 'REST APIs','React'],
    stats: {
      team: { value: '1', label: 'Team Size' },
      uptime: { value: '99.99%', label: 'Uptime' },
      projects: { value: '20+', label: 'Projects' }
    }
  },
  {
    period: 'Aug 2022 - Present',
    title: 'DevOps Manager and Software Engineer',
    company: 'Al Nafi E-Learning Private Ltd.',
    current: true,
    description: 'Leading a team of 8 engineers in building and maintaining cloud infrastructure. Spearheading DevOps transformation initiatives, implementing cutting-edge CI/CD pipelines, and driving automation across the organization.',
    achievements: [
      'Mentored 5 junior developers to mid-level positions',
      'Achieved 99.99% uptime across all production services',
      '2x Employee of the Month awards for outstanding leadership',
      'Lead Team to complete 25+ successful deployments with zero downtime',
      'Implemented robust security measures, ensuring data integrity and compliance with industry standards',
      'Spearheaded migration from monolithic to microservices architecture across 20+ applications, boosting scalability and maintainability',
      'Oversee 5 cross-functional teams (UI/UX, Frontend, Backend, QA, DataOps), improving delivery timelines by 30%',
      'Led architecture and deployment of projects using Docker, NGINX, EC2, and serverless AWS services',
      'Built 10+ high-impact platforms, including a custom LMS, fintech systems, and internal automation pipelines',
      'Automated CI/CD pipelines and infrastructure provisioning, reducing manual deployment time by 75%',
      'Integration of Stripe, PayPal, and other payment gateways into e-learning platforms, enhancing user experience and transaction security'
    ],
    technologies: ['Python', 'Django', 'Flask', 'Streamlit', 'Vue.js', 'Nuxt.js', 'JavaScript', 'Git/Github', 'Sentry', 'Selenium', 'Playwright', 'AWS', 'Docker', 'CI/CD Pipelines', 'Linux', 'Nginx', 'PostgreSQL', 'Redis', 'MySQL', 'REST APIs', 'GraphQL', 'APM'],
    stats: {
      team: { value: '8', label: 'Team Size' },
      uptime: { value: '99.99%', label: 'Uptime' },
      projects: { value: '50+', label: 'Projects' }
    }
  },

  {
    period: 'Jun 2022 - Sep 2022',
    title: 'Junior Faculty Instructor',
    company: 'Aptech.',
    description: 'As a Junior Faculty Instructor, I was responsible for teaching and mentoring students in various programming languages and web development technologies. I designed curriculum, conducted practical sessions, and evaluated student performance to ensure a comprehensive learning experience. My role also involved staying updated with the latest industry trends to provide relevant knowledge to students.',
    achievements: [
      'Taught ACCP 2.0 Diploma courses to 4 batches of 20+ students, covering Python, Django, web dev, and mor',
      "Designed semester-long projects and conducted hackathons, boosting students' practical skills and engagement",
      'Generated and maintained SAR reports, conducted PTMs, and tracked academic performance metrics',
      'Received positive feedback from 75% of students for effective teaching methods and course delivery',
      'Conduct Teachers Training Sessions to enhance technical skills and stay updated with latest educational technologies'

    ],
    technologies: ['MS Office', 'HTML/CSS', 'JavaScript', 'Python', 'Django', 'Wordpress', 'Git/Github', 'C# Windows Forms', 'PHP', 'Laravel', 'MySQL', 'REST APIs', 'Bootstrap', 'jQuery', 'SEO'],
    stats: {
      users: { value: '100+', label: 'Students' },
      projects: { value: '10+', label: 'Projects' }
    }
  },
  {
    period: 'Mar 2022 - July 2022',
    title: 'Full Stack Developer',
    company: 'Coderz House LTD',
    description: 'Contributed to multiple high-impact projects in a fast-paced startup environment. Developed RESTful APIs, responsive frontends, and integrated third-party services. Learned to thrive under pressure and deliver quality code quickly.',
    achievements: [
      'Developed Django-based HRM system and multi-page web apps tailored to diverse client needs',
      'Delivered complete software solutions from UI design to backend API logic and server deployment',
      'Implemented secure and responsive interfaces using Tailwind CSS, Vue.js, and integrated REST APIs',
      'Reduced page load times by 40%',

    ],
    technologies: ['JavaScript', 'Python', 'MySQL', 'Hostinger', 'Django', 'HTML/CSS','REST APIs'],
    stats: {
      projects: { value: '10', label: 'Projects' },

    }
  },
  {
    period: 'Sep 2021 – Mar 2022',
    title: '(Remote) - Data Analyst Intern',
    company: 'ML Sense',
    description: 'Worked on real-world datasets to extract insights and support decision-making processes. Created visualizations and reports to communicate findings effectively. Gained hands-on experience with data analysis tools and techniques.',
    achievements: [
      'Analyzed real-world datasets using Python, producing visual insights and trend reports',
      'Created data dashboards and charts to communicate patterns to clients in real-time',
      'Explored and used Django during internship, laying a foundation for full-stack transition'

    ],
    technologies: ['Python', 'Tableau', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks'],
    stats: {
    }
  },
  {
    period: 'Nov 2020 – Present',
    title: 'Co-Founder',
    company: 'TechShoor',
    description: 'Founded a tech community to foster learning and collaboration among developers. Organized courses, blog posting, networking events to promote knowledge sharing. Teached programming fundamentals and mentored aspiring developers.',
    achievements: [
      'Managed, initiated, deployed AI models, and converted machine learning models into APIs.',
      'Served as a Python Course Instructor for the PEPC: Programming Essentials in Python course.',
      'Designed a course covering Python programming fundamentals and object-oriented concepts.'

    ],
    technologies: ['Python', 'Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Jupyter Notebooks', 'Django', 'Flask', 'REST APIs'],
    stats: {
      users: { value: '500+', label: 'Students' },
      team: { value: '3', label: 'Team Size' },
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

  75%,
  100% {
    transform: scale(1.5);
    opacity: 0;
  }
}

.animate-ping-slow {
  animation: ping-slow 2s cubic-bezier(0, 0, 0.2, 1) infinite;
}
</style>