<template>
  <section id="projects" class="py-32 relative">
    <div class="container mx-auto px-6">
      <SectionTitle 
        title="Featured Projects" 
        subtitle="Showcasing excellence in full-stack development and DevOps engineering" />
      
      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-12 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-6 py-2 rounded-full font-semibold transition-all"
          :class="activeFilter === filter 
            ? 'bg-gradient-to-r from-purple-600 to-pink-600 text-white scale-105' 
            : 'border border-purple-500 text-purple-400 hover:bg-purple-500/10'">
          {{ filter }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          :style="`animation-delay: ${index * 0.1}s`"
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
const filters = ['All', 'Full Stack', 'DevOps', 'AI/ML', 'Cloud']

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Built a scalable e-commerce platform with Django backend, Vue.js frontend, and AWS infrastructure. Implemented CI/CD pipeline reducing deployment time by 80%.',
    icon: '🛒',
    status: 'Live',
    technologies: ['Django', 'Vue.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis'],
    category: 'Full Stack',
    metrics: {
      users: '50K+',
      performance: '98%',
      uptime: '99.9%'
    },
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'AI Content Generator',
    description: 'Developed an AI-powered content generation tool using Python and OpenAI API. Automated content creation workflow saving 100+ hours monthly.',
    icon: '🤖',
    status: 'Live',
    technologies: ['Python', 'FastAPI', 'OpenAI', 'React', 'MongoDB'],
    category: 'AI/ML',
    metrics: {
      users: '10K+',
      performance: '95%',
      uptime: '99.5%'
    },
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Designed and implemented Infrastructure as Code using Terraform for multi-region AWS deployment. Reduced infrastructure provisioning time by 70%.',
    icon: '☁️',
    status: 'Production',
    technologies: ['Terraform', 'AWS', 'Kubernetes', 'Docker', 'Jenkins'],
    category: 'DevOps',
    metrics: {
      users: 'N/A',
      performance: '100%',
      uptime: '99.99%'
    },
    githubUrl: '#'
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Created a real-time analytics dashboard processing millions of events daily. Built with microservices architecture and deployed on Kubernetes.',
    icon: '📊',
    status: 'Live',
    technologies: ['Python', 'Kafka', 'Elasticsearch', 'Vue.js', 'Docker'],
    category: 'Full Stack',
    metrics: {
      users: '5K+',
      performance: '97%',
      uptime: '99.8%'
    },
    liveUrl: '#',
    githubUrl: '#'
  },
  {
    title: 'CI/CD Pipeline Framework',
    description: 'Developed a custom CI/CD framework automating testing, building, and deployment across 20+ microservices. Improved deployment frequency by 10x.',
    icon: '🚀',
    status: 'Production',
    technologies: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'ArgoCD'],
    category: 'DevOps',
    metrics: {
      users: 'Team',
      performance: '100%',
      uptime: '99.9%'
    },
    githubUrl: '#'
  },
  {
    title: 'Multi-Cloud Cost Optimizer',
    description: 'Built an intelligent cost optimization tool for AWS and Azure. Automated resource scaling and achieved 40% cost reduction across infrastructure.',
    icon: '💰',
    status: 'Live',
    technologies: ['Python', 'AWS', 'Azure', 'Terraform', 'Grafana'],
    category: 'Cloud',
    metrics: {
      users: 'Internal',
      performance: '96%',
      uptime: '99.7%'
    },
    liveUrl: '#'
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
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