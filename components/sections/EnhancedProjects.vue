<template>
  <section id="projects" class="py-32 bg-black relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute top-0 right-0 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
          <span class="text-pink-500 font-semibold">Portfolio</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-white">Featured</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Projects</span>
        </h2>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
          Transforming ideas into exceptional digital experiences
        </p>
      </div>

      <!-- Filter Tabs -->
      <div class="flex justify-center gap-4 mb-16 flex-wrap">
        <button
          v-for="filter in filters"
          :key="filter"
          @click="activeFilter = filter"
          class="px-6 py-3 rounded-full font-semibold transition-all"
          :class="activeFilter === filter 
            ? 'bg-gradient-to-r from-pink-500 to-pink-600 text-white scale-105 shadow-lg shadow-pink-500/50' 
            : 'bg-white/5 border border-white/10 text-gray-400 hover:bg-white/10 hover:border-pink-500/30'">
          {{ filter }}
        </button>
      </div>

      <!-- Projects Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <div
          v-for="(project, index) in filteredProjects"
          :key="index"
          class="group relative"
          @mouseenter="hoveredProject = index"
          @mouseleave="hoveredProject = null">
          
          <!-- Project Card -->
          <div class="relative bg-gradient-to-br from-gray-900/50 to-black border border-white/5 rounded-3xl overflow-hidden hover:border-pink-500/50 transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-pink-500/20">
            
            <!-- Project Image with 3D Effect -->
            <div class="relative h-64 overflow-hidden"
                 @mousemove="handleMouseMove($event, index)"
                 @mouseleave="resetTransform(index)">
              <div class="absolute inset-0 bg-gradient-to-br from-pink-500/20 to-purple-500/20"></div>
              <img 
                :src="project.image" 
                :alt="project.title"
                class="w-full h-full object-cover transition-transform duration-500"
                :style="project.transform || ''">
              
              <!-- Overlay -->
              <div class="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-80 transition-opacity"></div>
              
              <!-- Status Badge -->
              <div class="absolute top-4 right-4">
                <span class="px-3 py-1 rounded-full text-xs font-semibold backdrop-blur-md"
                      :class="project.status === 'Live' ? 'bg-green-500/20 text-green-400 border border-green-500/50' : 'bg-blue-500/20 text-blue-400 border border-blue-500/50'">
                  {{ project.status }}
                </span>
              </div>

              <!-- Project Icon -->
              <div class="absolute top-4 left-4 text-5xl">{{ project.icon }}</div>
            </div>

            <!-- Content -->
            <div class="p-6">
              <h3 class="text-2xl font-bold mb-3 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-pink-500 group-hover:to-purple-500 transition-all">
                {{ project.title }}
              </h3>
              <p class="text-gray-400 mb-4 line-clamp-2">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4">
                <span 
                  v-for="tech in project.technologies.slice(0, 3)" 
                  :key="tech"
                  class="px-3 py-1 bg-pink-500/10 border border-pink-500/20 rounded-lg text-xs text-pink-300">
                  {{ tech }}
                </span>
                <span v-if="project.technologies.length > 3" class="px-3 py-1 bg-gray-800 rounded-lg text-xs text-gray-400">
                  +{{ project.technologies.length - 3 }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex gap-3 opacity-0 group-hover:opacity-100 transition-opacity">
                <a 
                  v-if="project.liveUrl"
                  :href="project.liveUrl" 
                  target="_blank"
                  class="flex-1 px-4 py-2 bg-gradient-to-r from-pink-500 to-pink-600 rounded-lg text-center text-sm font-semibold hover:scale-105 transition-transform flex items-center justify-center gap-2">
                  <span>Live Demo</span>
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                  </svg>
                </a>
                <a 
                  v-if="project.githubUrl"
                  :href="project.githubUrl" 
                  target="_blank"
                  class="flex-1 px-4 py-2 border border-pink-500 rounded-lg text-center text-sm font-semibold hover:bg-pink-500/10 transition-colors flex items-center justify-center gap-2">
                  <span>Code</span>
                  <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                </a>
              </div>
            </div>

            <!-- Hover Glow Effect -->
            <div class="absolute inset-0 bg-gradient-to-br from-pink-500/0 to-purple-500/0 group-hover:from-pink-500/5 group-hover:to-purple-500/5 pointer-events-none transition-all duration-500 rounded-3xl"></div>
          </div>
        </div>
      </div>

      <!-- View All Projects Button -->
      <div class="text-center mt-16">
        <a href="#" class="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-pink-500/50">
          <span>View All Projects</span>
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
          </svg>
        </a>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed } from 'vue'

const activeFilter = ref('All')
const hoveredProject = ref(null)

const filters = ['All', 'Web Apps', 'DevOps', 'AI/ML', 'Mobile']

const projects = [
  {
    title: 'E-Commerce Platform',
    description: 'Full-stack e-commerce solution with Django backend, Vue.js frontend, and AWS infrastructure. Features include real-time inventory, payment processing, and analytics dashboard.',
    icon: '🛒',
    status: 'Live',
    category: 'Web Apps',
    technologies: ['Django', 'Vue.js', 'PostgreSQL', 'AWS', 'Docker', 'Redis', 'Stripe'],
    image: 'https://images.unsplash.com/photo-1557821552-17105176677c?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
    transform: ''
  },
  {
    title: 'AI Content Generator',
    description: 'AI-powered content generation platform using GPT-4. Automated blog posts, social media content, and marketing copy with SEO optimization.',
    icon: '🤖',
    status: 'Live',
    category: 'AI/ML',
    technologies: ['Python', 'OpenAI', 'FastAPI', 'React', 'MongoDB', 'Docker'],
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
    transform: ''
  },
  {
    title: 'Cloud Infrastructure Automation',
    description: 'Complete Infrastructure as Code solution using Terraform for multi-region AWS deployment with auto-scaling and monitoring.',
    icon: '☁️',
    status: 'Production',
    category: 'DevOps',
    technologies: ['Terraform', 'AWS', 'Kubernetes', 'Prometheus', 'Grafana'],
    image: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800&h=600&fit=crop',
    githubUrl: '#',
    transform: ''
  },
  {
    title: 'Real-Time Analytics Dashboard',
    description: 'Interactive analytics dashboard processing millions of events daily. Built with microservices architecture and real-time data streaming.',
    icon: '📊',
    status: 'Live',
    category: 'Web Apps',
    technologies: ['Python', 'Kafka', 'Elasticsearch', 'Vue.js', 'Docker', 'Redis'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
    transform: ''
  },
  {
    title: 'Mobile Fitness App',
    description: 'Cross-platform fitness tracking app with workout plans, nutrition tracking, and social features. Built with React Native.',
    icon: '💪',
    status: 'Live',
    category: 'Mobile',
    technologies: ['React Native', 'Node.js', 'MongoDB', 'Firebase', 'AWS'],
    image: 'https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?w=800&h=600&fit=crop',
    liveUrl: '#',
    githubUrl: '#',
    transform: ''
  },
  {
    title: 'CI/CD Pipeline Framework',
    description: 'Custom CI/CD framework automating testing, building, and deployment across 20+ microservices with blue-green deployment strategy.',
    icon: '🚀',
    status: 'Production',
    category: 'DevOps',
    technologies: ['Jenkins', 'GitLab CI', 'Docker', 'Kubernetes', 'ArgoCD', 'Helm'],
    image: 'https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=800&h=600&fit=crop',
    githubUrl: '#',
    transform: ''
  }
]

const filteredProjects = computed(() => {
  if (activeFilter.value === 'All') {
    return projects
  }
  return projects.filter(project => project.category === activeFilter.value)
})

// 3D hover effect for project images
const handleMouseMove = (e, index) => {
  const card = e.currentTarget
  const rect = card.getBoundingClientRect()
  const x = e.clientX - rect.left
  const y = e.clientY - rect.top
  const centerX = rect.width / 2
  const centerY = rect.height / 2
  const rotateX = (y - centerY) / 20
  const rotateY = (centerX - x) / 20

  projects[index].transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`
}

const resetTransform = (index) => {
  projects[index].transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)'
}
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
</style>