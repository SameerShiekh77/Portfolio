<template>
  <section id="projects" class="py-3 relative">
    <div class="container mx-auto px-6">
      <SectionTitle title="Featured Projects"
        subtitle="Showcasing excellence in full-stack development and DevOps engineering" />

      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-12 flex-wrap">
        <button v-for="filter in filters" :key="filter" @click="activeFilter = filter"
          class="px-6 py-2 rounded-full font-semibold transition-all cursor-pointer" :class="activeFilter === filter
            ? 'bg-linear-to-r from-cyan-600 to-blue-600 text-white scale-105'
            : 'border border-cyan-500 text-cyan-400 hover:bg-cyan-500/10'">
          {{ filter }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div v-for="(project, index) in filteredProjects" :key="index" :style="`animation-delay: ${index * 0.1}s`"
          class="animate-fadeInUp">
          <ProjectCard :project="project" />
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredProjects.length === 0" class="text-center py-20">
        <div class="text-6xl mb-4">🔍</div>
        <p class="text-xl text-gray-400">No projects found in this category</p>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'
import SectionTitle from '../ui/SectionTitle.vue'
import ProjectCard from '../ui/ProjectCard.vue'

const activeFilter = ref('All')
const filters = ['All', 'Web Application', 'Cloud', 'AI', 'Internal Application']

const projects = [
  {
    title: 'Al Nafi International College',
    description: 'Developed a comprehensive web platform for Al Nafi International College using modern web technologies. Built with microservices-based architecture ensuring scalability and performance. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '🏫',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'Strapi', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '5K+',
      performance: '75%',
      uptime: '99.9%'
    },
    liveUrl: 'https://alnafi.com',
  },
  {
    title: 'Al Nafi Cloud',
    description: 'Built a scalable cloud platform for Al Nafi Cloud services, focusing on delivering robust cloud solutions. We provide AWS EC2 instances as containers where users can perform labs and practical exercises. Implemented advanced monitoring with Sentry and optimized performance for a seamless user experience. Security best practices were followed throughout the development process.',
    icon: '☁️',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Cloud', 'Web Application', 'AI'],
    metrics: {
      users: '5K+',
      performance: '80%',
      uptime: '99.5%'
    },
    liveUrl: 'https://alnafi.cloud',
  },
  {
    title: 'Al Nafi Academy O-Level/IGCSE',
    description: 'Built a scalable e-learning platform for Al Nafi Academy focusing on O-Level and IGCSE courses. Integrated multiple payment gateways like easypaisa, UBL, Epay, Stripe. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '🎓',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '500',
      performance: '70%',
      uptime: '99.8%'
    },
    liveUrl: 'https://alnafi.academy',
  },
  {
    title: 'Affiliate Management System',
    description: 'Developed a robust affiliate management system for Al Nafi Affiliate Program. This platform enables users to sign up as affiliates, track their referrals, and earn commissions through various management channels. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '💼',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '1k+',
      performance: '93%',
      uptime: '99.8%'
    },
    liveUrl: 'https://affiliate.alnafi.com/',
  },
  {
    title: 'Learning Management System',
    description: 'Developed a comprehensive learning management system with advanced features for course management, student tracking, and interactive learning experiences. The platform includes video streaming, quiz systems, and progress analytics for enhanced educational delivery.',
    icon: '📚',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '1k+',
      performance: '93%',
      uptime: '99.8%'
    },
    liveUrl: 'https://lms.alnafi.com/',
  },
  {
    title: 'Islamic Academy',
    description: 'Developed a comprehensive e-learning platform for Islamic Academy, focusing on delivering high-quality religious educational content. Implemented advanced features like live classes, quizzes, and progress tracking. Integrated Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '🕌',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '1k+',
      performance: '93%',
      uptime: '99.8%'
    },
    liveUrl: 'https://islamic.alnafi.com/',
  },
  {
    title: 'Job Portal',
    description: 'Developed a feature-rich job portal for connecting employers with potential candidates. The platform includes job listings, application tracking, and resume management. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '💼',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '100',
      performance: '71%',
      uptime: '99.8%'
    },
    liveUrl: 'https://islamic.alnafi.com/',
  },
  {
    title: 'Email Marketing System',
    description: 'Developed a comprehensive email marketing system that allows users to create, manage, and analyze email campaigns. Features include customizable templates, audience segmentation, and performance analytics. This system was built with scalability and security in mind. This is a replica of Mailchimp. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '📧',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '50k',
      performance: '100%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/EMS-1.png',
      '/images/screenshots/EMS-2.png',
      '/images/screenshots/EMS-3.png'
    ]
  },
  {
    title: 'Al Baseer',
    description: 'Built a comprehensive Data Lake system where all data from our applications is collected for monitoring and visualization. This centralized data platform provides insights and analytics across all organizational systems. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '📊',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '40',
      performance: '95%',
      uptime: '99.8%'
    },
  },
  {
    title: 'Epay (Fintech Solution)',
    description: 'Built a comprehensive Fintech solution named Epay, which is a payment gateway system where users can pay through multiple payment gateways like Easypaisa or any other Pakistani banking application using 1-bill integration. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '💳',
    status: 'Live',
    technologies: ['Python', 'Flask', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '1k',
      performance: '71%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/Epay-1.png',
      '/images/screenshots/Epay-2.png'
    ]
  },
  {
    title: 'MCQ and Notes Generator',
    description: 'Developed an internal application where our team uploads CSV files and runs multiple jobs to generate MCQs from that file, which can then be downloaded in CSV format. The system also allows teams to upload CSV files or provide content to create well-structured notes with proper headings. Integrated multiple AI models like OpenAI and Claude to generate high-quality content efficiently. Implemented Sentry for error tracking and performance monitoring.',
    icon: '📝',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'AI', 'Internal Application'],
    metrics: {
      users: '1k',
      performance: '95%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/placeholder.svg',
      '/images/screenshots/placeholder.svg'
    ]
  },
  {
    title: 'Resume Generator',
    description: 'Developed an internal application where our team uploads CSV files or provides content to automatically generate professional user resumes. The system uses AI-powered content generation to create well-formatted resumes with proper sections and styling. Integrated multiple AI models like OpenAI and Claude to generate high-quality content efficiently. Implemented Sentry for error tracking and performance monitoring.',
    icon: '📄',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'AI', 'Internal Application'],
    metrics: {
      users: '1k',
      performance: '95%',
      uptime: '99.8%'
    },
  },
  {
    title: 'Instructor Payout System',
    description: 'Developed a comprehensive system that CFO and Accounts teams use to manage instructor payouts on a monthly basis. The system creates real-time commissions on any purchase and integrates seamlessly with other applications. Features automated calculations, payment tracking, and detailed reporting. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '💰',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '1k',
      performance: '95%',
      uptime: '99.8%'
    },

  },
  {
    title: 'Sales and Support Dashboard',
    description: 'Developed a comprehensive dashboard that sales and support teams use to monitor user data, including user information, course performance metrics, token utilization, support ticket statistics, and payment information. The dashboard provides real-time insights and analytics to improve customer service and sales performance. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '📈',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '1k',
      performance: '95%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/sasd-1.png',
      '/images/screenshots/sasd-2.png',
      '/images/screenshots/sasd-3.png',
      '/images/screenshots/sasd-4.png',
      '/images/screenshots/sasd-5.png',
      '/images/screenshots/sasd-6.png',
    ]
  },
  {
    title: 'Al Nafi Loyalty Program',
    description: 'Developed a comprehensive loyalty program for Al Nafi, allowing users to earn and redeem points across various services. The system includes a user-friendly interface for tracking points, managing rewards, and viewing transaction history. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '🎁',
    status: 'Live',
    technologies: ['Python', 'Django', 'Vue.js', 'Nuxt.js', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Redis', 'Kubernetes', 'Tailwind CSS', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application'],
    metrics: {
      users: '100',
      performance: '95%',
      uptime: '99.8%'
    },
    liveUrl: 'https://loyalty.alnafi.com/',
  }, {
    title: 'Campus Management System',
    description: 'Developed a comprehensive campus management system that streamlines administrative tasks, including student enrollment, attendance tracking, and grade management with teachers tracking. The system features a user-friendly interface for both administrators and teachers, with robust reporting capabilities. Implemented Sentry for error tracking and performance monitoring. Security best practices were followed throughout the development process.',
    icon: '🏫',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '10',
      performance: '70%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/sms-1.png',
      '/images/screenshots/sms-2.png',
      '/images/screenshots/sms-3.png',
      '/images/screenshots/sms-4.png',
      '/images/screenshots/sms-5.png',
      '/images/screenshots/sms-6.png',
    ]
  }, {
    title: 'SEO Management System',
    description: 'Developed a comprehensive SEO or backlinks management system that helps businesses optimize their online presence. The system includes features for keyword research, on-page optimization, backlink tracking, and performance analytics.',
    icon: '🔍',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '25',
      performance: '98%',
      uptime: '99.8%'
    }
  },
  {
    title: 'HRM System',
    description: 'Developed a comprehensive HRM system that helps businesses manage their human resources effectively. The system includes features for employee onboarding, performance tracking, leave management, and payroll processing. This enterprise-grade solution streamlines HR processes and provides real-time insights into workforce management.',
    icon: '👥',
    status: 'Live',
    technologies: ['Python', 'Django', 'REST APIs', 'Sentry', 'APM', 'Git/Github', 'MySQL', 'AWS', 'Docker', 'Kubernetes', 'JavaScript', 'Copilot', 'OpenAI', 'Claude'],
    category: ['Web Application', 'Internal Application'],
    metrics: {
      users: '100',
      performance: '98%',
      uptime: '99.8%'
    },
    screenshots: [
      '/images/screenshots/placeholder.svg'
    ]
  },

]





const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => {
    // Handle both single category (string) and multiple categories (array)
    if (Array.isArray(project.category)) {
      return project.category.includes(activeFilter.value)
    }
    return project.category === activeFilter.value
  })
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

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}
</style>