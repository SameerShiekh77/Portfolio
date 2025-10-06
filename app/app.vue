<template>
  <div class="bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 min-h-screen text-white overflow-x-hidden">
    <!-- Navigation -->
    <nav class="fixed top-0 w-full z-50 backdrop-blur-lg bg-gray-900/70 border-b border-purple-500/20 transition-all duration-300"
         :class="{ 'bg-gray-900/90': scrolled }">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <div class="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
            Portfolio
          </div>
          <div class="hidden md:flex space-x-8">
            <a v-for="item in navItems" :key="item.id" 
               :href="`#${item.id}`" 
               @click="scrollToSection(item.id)"
               class="hover:text-purple-400 transition-colors relative group">
              {{ item.label }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>
        
        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-4 space-y-4 animate-fadeIn">
          <a v-for="item in navItems" :key="item.id"
             :href="`#${item.id}`" 
             @click="mobileMenuOpen = false; scrollToSection(item.id)"
             class="block hover:text-purple-400 transition-colors">
            {{ item.label }}
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <HeroSection />

    <!-- Story Timeline -->
    <section id="about" class="py-32 relative">
      <div class="container mx-auto px-6">
        <SectionTitle 
          title="My Journey" 
          subtitle="A story of passion, growth, and continuous learning" />
        
        <div class="max-w-4xl mx-auto space-y-8">
          <div 
            v-for="(story, index) in storyTimeline" 
            :key="index"
            :ref="el => storyRefs[index] = el"
            class="story-card opacity-0 transform translate-y-20">
            <div class="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20 hover:border-purple-500/50 transition-all hover:scale-105">
              <div class="flex items-start gap-4">
                <div class="text-4xl">{{ story.icon }}</div>
                <div class="flex-1">
                  <h3 class="text-2xl font-bold mb-3 text-purple-400">{{ story.title }}</h3>
                  <p class="text-gray-300 leading-relaxed">{{ story.description }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Skills Section with Scroll Animation -->
    <section id="skills" class="py-32 relative">
      <div class="container mx-auto px-6">
        <SectionTitle 
          title="Technical Arsenal" 
          subtitle="Tools and technologies I've mastered over the years" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          <div 
            v-for="(category, index) in skillCategories" 
            :key="index"
            :ref="el => skillRefs[index] = el"
            class="skill-card opacity-0 transform translate-y-20">
            <SkillCardP 
              :icon="category.icon"
              :title="category.title"
              :skills="category.skills" />
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Career Journey Section -->
    <CareerJourney />

    <!-- Education Section -->
    <section id="education" class="py-32 relative">
      <div class="container mx-auto px-6">
        <SectionTitle 
          title="Education" 
          subtitle="Academic foundation and continuous learning" />
        
        <div class="max-w-4xl mx-auto">
          <div 
            ref="educationRef"
            class="education-card bg-gradient-to-br from-purple-900/40 to-pink-900/20 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105 opacity-0 transform translate-y-20">
            <div class="flex items-start gap-6">
              <div class="text-6xl">🎓</div>
              <div class="flex-1">
                <div class="text-purple-400 font-semibold mb-2">2019 - 2023</div>
                <h3 class="text-3xl font-bold mb-2">Bachelor of Science in Computer Science</h3>
                <div class="text-pink-400 text-xl mb-4">BSCS</div>
                <p class="text-gray-300 mb-6">
                  Built a strong foundation in computer science fundamentals, software engineering principles, 
                  and modern development practices. Specialized in full-stack development, cloud computing, and DevOps methodologies.
                </p>
                <div class="grid grid-cols-2 md:grid-cols-3 gap-4">
                  <div class="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform">
                    <div class="text-2xl mb-2">📚</div>
                    <div class="text-sm text-gray-400">Software Engineering</div>
                  </div>
                  <div class="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform">
                    <div class="text-2xl mb-2">☁️</div>
                    <div class="text-sm text-gray-400">Cloud Computing</div>
                  </div>
                  <div class="bg-purple-500/10 p-4 rounded-lg border border-purple-500/20 hover:scale-105 transition-transform">
                    <div class="text-2xl mb-2">🤖</div>
                    <div class="text-sm text-gray-400">AI & ML</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Achievements Section -->
    <section id="achievements" class="py-32 relative">
      <div class="container mx-auto px-6">
        <SectionTitle 
          title="Achievements & Highlights" 
          subtitle="Recognition and impact throughout my career" />
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          <div 
            v-for="(achievement, index) in achievements" 
            :key="index"
            :ref="el => achievementRefs[index] = el"
            class="achievement-card bg-gradient-to-br from-purple-900/40 to-pink-900/20 p-6 rounded-2xl backdrop-blur-sm border border-purple-500/30 hover:border-purple-500/60 transition-all hover:scale-105 opacity-0 transform scale-90">
            <div class="text-5xl mb-4">{{ achievement.icon }}</div>
            <h3 class="text-xl font-bold mb-2 text-purple-400">{{ achievement.title }}</h3>
            <p class="text-gray-300">{{ achievement.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-32 relative">
      <div class="container mx-auto px-6">
        <SectionTitle 
          title="Let's Build Something Amazing" 
          subtitle="Open to opportunities, collaborations, and interesting conversations" />
        
        <div class="max-w-2xl mx-auto text-center">
          <p class="text-xl text-gray-300 mb-8">
            Whether you're looking to collaborate on a project, need DevOps expertise, 
            or just want to chat about technology, I'd love to hear from you!
          </p>
          
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <a href="mailto:your.email@example.com" 
               class="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-purple-600 to-pink-600 rounded-full hover:scale-105 transition-all shadow-lg hover:shadow-purple-500/50">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z"></path>
                <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z"></path>
              </svg>
              Email Me
            </a>
            <a href="https://linkedin.com/in/yourprofile" target="_blank"
               class="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M16.338 16.338H13.67V12.16c0-.995-.017-2.277-1.387-2.277-1.39 0-1.601 1.086-1.601 2.207v4.248H8.014v-8.59h2.559v1.174h.037c.356-.675 1.227-1.387 2.526-1.387 2.703 0 3.203 1.778 3.203 4.092v4.711zM5.005 6.575a1.548 1.548 0 11-.003-3.096 1.548 1.548 0 01.003 3.096zm-1.337 9.763H6.34v-8.59H3.667v8.59zM17.668 1H2.328C1.595 1 1 1.581 1 2.298v15.403C1 18.418 1.595 19 2.328 19h15.34c.734 0 1.332-.582 1.332-1.299V2.298C19 1.581 18.402 1 17.668 1z" clip-rule="evenodd"></path>
              </svg>
              LinkedIn
            </a>
            <a href="https://github.com/yourprofile" target="_blank"
               class="flex items-center gap-2 px-6 py-3 border-2 border-purple-500 rounded-full hover:bg-purple-500/10 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fill-rule="evenodd" d="M10 0C4.477 0 0 4.484 0 10.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0110 4.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.203 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.31.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0020 10.017C20 4.484 15.522 0 10 0z" clip-rule="evenodd"></path>
              </svg>
              GitHub
            </a>
          </div>
          
          <div class="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-8 rounded-2xl backdrop-blur-sm border border-purple-500/20">
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="hover:scale-105 transition-transform">
                <div class="text-3xl mb-2">📧</div>
                <div class="text-gray-400 text-sm">Email</div>
                <div class="text-purple-400">your.email@example.com</div>
              </div>
              <div class="hover:scale-105 transition-transform">
                <div class="text-3xl mb-2">📍</div>
                <div class="text-gray-400 text-sm">Location</div>
                <div class="text-purple-400">Your City, Country</div>
              </div>
              <div class="hover:scale-105 transition-transform">
                <div class="text-3xl mb-2">⚡</div>
                <div class="text-gray-400 text-sm">Response Time</div>
                <div class="text-purple-400">24-48 hours</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-8 border-t border-purple-500/20">
      <div class="container mx-auto px-6 text-center text-gray-400">
        <p>© 2025 Built with ❤️ using Vue 3 & Nuxt.js</p>
        <p class="mt-2">Deployed on AWS | Powered by Coffee ☕</p>
      </div>
    </footer>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-800 z-50">
      <div 
        class="h-full bg-gradient-to-r from-purple-500 to-pink-500 transition-all duration-300"
        :style="{ width: scrollProgress + '%' }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import HeroSection from '../components/sections/HeroSection.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'
import SectionTitle from '../components/ui/SectionTitle.vue'
import SkillCardP from '../components/ui/SkillCardP.vue'
import CareerJourney from '../components/sections/CareerJourney.vue'


// State
const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)

// Refs for scroll animations
const storyRefs = ref([])
const skillRefs = ref([])
const experienceRefs = ref([])
const achievementRefs = ref([])
const educationRef = ref(null)

// Navigation
const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'achievements', label: 'Achievements' },
  { id: 'contact', label: 'Contact' }
]

// Data
const storyTimeline = [
  {
    icon: '🚀',
    title: 'The Beginning',
    description: 'My journey into tech began with curiosity and evolved into a passion for building robust, scalable systems. Graduating with a BSCS in 2023, I dove deep into the world of DevOps and Full Stack Development.'
  },
  {
    icon: '⚡',
    title: 'The Transformation',
    description: 'Over 5 years in the IT industry, I\'ve mastered the art of bridging development and operations. From writing clean code to orchestrating cloud infrastructure, I\'ve learned to see the bigger picture while perfecting every detail.'
  },
  {
    icon: '🎯',
    title: 'Today & Beyond',
    description: 'As a DevOps Manager, I lead teams in creating seamless CI/CD pipelines and cloud-native architectures. My expertise spans from Python and Django backends to Vue.js frontends, all deployed on AWS with precision. I\'m also exploring AI integration to make applications smarter and more efficient.'
  }
]

const skillCategories = [
  {
    icon: '🚀',
    title: 'DevOps & Cloud',
    skills: [
      { name: 'AWS', level: 95 },
      { name: 'Docker', level: 90 },
      { name: 'CI/CD', level: 92 },
      { name: 'Automation', level: 88 }
    ]
  },
  {
    icon: '💻',
    title: 'Backend Development',
    skills: [
      { name: 'Python', level: 95 },
      { name: 'Django', level: 90 },
      { name: 'REST APIs', level: 93 },
      { name: 'PHP', level: 75 }
    ]
  },
  {
    icon: '🎨',
    title: 'Frontend Development',
    skills: [
      { name: 'Vue.js', level: 90 },
      { name: 'Nuxt.js', level: 88 },
      { name: 'JavaScript', level: 92 },
      { name: 'Tailwind CSS', level: 85 }
    ]
  },
  {
    icon: '🤖',
    title: 'AI & Data',
    skills: [
      { name: 'Machine Learning', level: 80 },
      { name: 'AI Integration', level: 82 },
      { name: 'Data Analysis', level: 78 }
    ]
  },
  {
    icon: '🔧',
    title: 'Tools & Platforms',
    skills: [
      { name: 'Git', level: 95 },
      { name: 'Linux', level: 90 },
      { name: 'WordPress', level: 75 }
    ]
  },
  {
    icon: '📊',
    title: 'Management',
    skills: [
      { name: 'Team Leadership', level: 88 },
      { name: 'Agile', level: 85 },
      { name: 'Project Planning', level: 90 }
    ]
  }
]

const experiences = [
  {
    period: '2020 - Present',
    title: 'DevOps Manager',
    company: 'Tech Company',
    description: 'Leading DevOps initiatives, managing cloud infrastructure on AWS, implementing CI/CD pipelines, and mentoring development teams in modern deployment practices.',
    technologies: ['AWS', 'Docker', 'Python', 'Terraform', 'Jenkins', 'Kubernetes']
  },
  {
    period: '2019 - 2020',
    title: 'Full Stack Developer',
    company: 'Software Solutions Inc',
    description: 'Developed end-to-end web applications using Django and Vue.js, integrated AI models, and deployed scalable solutions on AWS.',
    technologies: ['Python', 'Django', 'Vue.js', 'PostgreSQL', 'AWS', 'REST APIs']
  },
  {
    period: '2018 - 2019',
    title: 'Junior Developer',
    company: 'StartUp Tech',
    description: 'Started my professional journey building web applications, learning best practices, and contributing to various full-stack projects.',
    technologies: ['JavaScript', 'PHP', 'MySQL', 'HTML/CSS', 'WordPress']
  }
]

const achievements = [
  {
    icon: '🏆',
    title: 'Cloud Architecture Excellence',
    description: 'Designed and implemented highly scalable AWS infrastructure serving 100K+ users'
  },
  {
    icon: '⚡',
    title: 'Automation Champion',
    description: 'Reduced deployment time by 80% through comprehensive CI/CD automation'
  },
  {
    icon: '🎯',
    title: 'Full Stack Mastery',
    description: 'Successfully delivered 50+ production applications from concept to deployment'
  },
  {
    icon: '👥',
    title: 'Team Leadership',
    description: 'Mentored 10+ developers in DevOps practices and modern development workflows'
  },
  {
    icon: '🚀',
    title: 'Performance Optimization',
    description: 'Improved application performance by 60% through strategic optimization'
  },
  {
    icon: '🔐',
    title: 'Security Implementation',
    description: 'Established robust security practices ensuring zero major incidents'
  }
]

// Methods
const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  
  // Calculate scroll progress
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100

  // Animate elements on scroll
  animateOnScroll(storyRefs.value, 'story-card')
  animateOnScroll(skillRefs.value, 'skill-card')
  animateOnScroll(experienceRefs.value, 'experience-card')
  animateOnScroll(achievementRefs.value, 'achievement-card')
  
  if (educationRef.value) {
    animateElement(educationRef.value, 'education-card')
  }
}

const animateOnScroll = (refs, className) => {
  refs.forEach(ref => {
    if (ref) {
      animateElement(ref, className)
    }
  })
}

const animateElement = (element, className) => {
  const rect = element.getBoundingClientRect()
  const windowHeight = window.innerHeight || document.documentElement.clientHeight
  
  if (rect.top <= windowHeight * 0.75) {
    element.classList.add('animate-' + className)
    element.style.opacity = '1'
    element.style.transform = 'none'
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll() // Initial check
})

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})
</script>

<style>
@import "tailwindcss";

* {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.animate-fadeIn {
  animation: fadeIn 0.3s ease-out;
}

.animate-story-card,
.animate-skill-card,
.animate-experience-card,
.animate-achievement-card,
.animate-education-card {
  animation: slideInUp 0.8s ease-out forwards;
}

@keyframes slideInUp {
  to {
    opacity: 1;
    transform: translateY(0) translateX(0) scale(1);
  }
}
</style>