<template>
  <div class="bg-black min-h-screen text-white">
    <!-- Modern Navigation -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-300"
         :class="scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="text-xl font-bold">Portfolio</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a v-for="item in navItems" :key="item.id" 
               :href="`#${item.id}`"
               @click="scrollToSection(item.id)"
               class="text-gray-400 hover:text-pink-500 transition-colors relative group">
              {{ item.label }}
              <span class="absolute bottom-0 left-0 w-0 h-0.5 bg-pink-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- Hire Me Button -->
          <a href="#contact" class="hidden md:block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-pink-500/50">
            Hire Me
          </a>

          <!-- Mobile Menu Button -->
          <button @click="mobileMenuOpen = !mobileMenuOpen" class="md:hidden">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>
            </svg>
          </button>
        </div>

        <!-- Mobile Menu -->
        <div v-if="mobileMenuOpen" class="md:hidden mt-6 space-y-4 animate-fadeIn">
          <a v-for="item in navItems" :key="item.id"
             :href="`#${item.id}`" 
             @click="mobileMenuOpen = false; scrollToSection(item.id)"
             class="block text-gray-400 hover:text-pink-500 transition-colors py-2">
            {{ item.label }}
          </a>
          <a href="#contact" class="block px-6 py-3 bg-gradient-to-r from-pink-500 to-pink-600 rounded-full font-semibold text-center">
            Hire Me
          </a>
        </div>
      </div>
    </nav>

    <!-- Hero Section -->
    <ModernHero />

    <!-- Stats Section -->
    <StatsSection />

    <!-- Services Section -->
    <ServicesSection />

    <!-- Skills Section -->
    <section id="skills" class="py-32 bg-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-pink-500/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
            <span class="text-pink-500 font-semibold">My Skills</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Technical</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Expertise</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div v-for="(category, index) in skillCategories" :key="index" class="space-y-6">
            <h3 class="text-2xl font-bold text-pink-500 mb-6">{{ category.title }}</h3>
            <div v-for="skill in category.skills" :key="skill.name" class="space-y-2">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-pink-500 font-semibold">{{ skill.level }}%</span>
              </div>
              <div class="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div 
                  class="h-full bg-gradient-to-r from-pink-500 to-purple-500 rounded-full transition-all duration-1000 skill-bar"
                  :style="{ width: skill.level + '%' }">
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Projects Section -->
    <ProjectsSection />

    <!-- Experience Section -->
    <CareerJourney />

    <!-- Education Section -->
    <section id="education" class="py-32 bg-black relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
            <span class="text-pink-500 font-semibold">Education</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Academic</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Background</span>
          </h2>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="relative bg-gradient-to-br from-gray-900/50 to-black border border-pink-500/20 rounded-3xl p-10 hover:border-pink-500/50 transition-all">
            <div class="flex flex-col md:flex-row items-start gap-8">
              <div class="text-8xl">🎓</div>
              <div class="flex-1">
                <div class="flex items-center gap-4 mb-4">
                  <div class="px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full">
                    <span class="text-pink-500 font-semibold text-sm">2019 - 2023</span>
                  </div>
                </div>
                <h3 class="text-4xl font-bold mb-2 text-white">Bachelor of Science in Computer Science</h3>
                <div class="text-2xl text-pink-400 mb-6">BSCS</div>
                <p class="text-gray-400 leading-relaxed mb-6 text-lg">
                  Comprehensive study in computer science fundamentals, software engineering, cloud computing, 
                  and modern development practices. Graduated with honors and specialized in DevOps and full-stack development.
                </p>
                <div class="grid grid-cols-3 gap-4">
                  <div class="bg-pink-500/5 border border-pink-500/20 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                    <div class="text-3xl mb-2">📚</div>
                    <div class="text-sm text-gray-400">Software Engineering</div>
                  </div>
                  <div class="bg-pink-500/5 border border-pink-500/20 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                    <div class="text-3xl mb-2">☁️</div>
                    <div class="text-sm text-gray-400">Cloud Computing</div>
                  </div>
                  <div class="bg-pink-500/5 border border-pink-500/20 p-4 rounded-xl text-center hover:scale-105 transition-transform">
                    <div class="text-3xl mb-2">🤖</div>
                    <div class="text-sm text-gray-400">AI & ML</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Testimonials Section -->
    <TestimonialSlider />    

    <!-- Contact Section -->
    <section id="contact" class="py-32 bg-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-pink-500/10 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-pink-500/10 border border-pink-500/30 rounded-full mb-6">
            <span class="text-pink-500 font-semibold">Get In Touch</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Let's Work</span>
            <span class="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-500"> Together</span>
          </h2>
          <p class="text-gray-400 text-xl max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div class="bg-gradient-to-br from-gray-900/50 to-black border border-pink-500/20 rounded-2xl p-6 text-center hover:border-pink-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Email</h3>
              <p class="text-gray-400">your.email@example.com</p>
            </div>

            <div class="bg-gradient-to-br from-gray-900/50 to-black border border-pink-500/20 rounded-2xl p-6 text-center hover:border-pink-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Phone</h3>
              <p class="text-gray-400">+1 234 567 890</p>
            </div>

            <div class="bg-gradient-to-br from-gray-900/50 to-black border border-pink-500/20 rounded-2xl p-6 text-center hover:border-pink-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-pink-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Location</h3>
              <p class="text-gray-400">Karachi, Pakistan</p>
            </div>
          </div>

          <div class="bg-gradient-to-br from-gray-900/50 to-black border border-pink-500/20 rounded-3xl p-8">
            <form class="space-y-6">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" placeholder="Your Name" class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors">
                <input type="email" placeholder="Your Email" class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors">
              </div>
              <input type="text" placeholder="Subject" class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors">
              <textarea rows="6" placeholder="Your Message" class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-pink-500 focus:outline-none transition-colors resize-none"></textarea>
              <button type="submit" class="w-full px-8 py-4 bg-gradient-to-r from-pink-500 to-pink-600 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-pink-500/50">
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 bg-black border-t border-white/10">
      <div class="container mx-auto px-6">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-2">
            <div class="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">P</span>
            </div>
            <span class="text-xl font-bold">Portfolio</span>
          </div>

          <p class="text-gray-400">© 2025 All rights reserved | Built with ❤️ using Vue 3 & Nuxt.js</p>

          <div class="flex gap-4">
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
            </a>
            <a href="#" class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-pink-500 hover:border-pink-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
      <div 
        class="h-full bg-gradient-to-r from-pink-500 to-purple-500 transition-all duration-300"
        :style="{ width: scrollProgress + '%' }">
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import ModernHero from '../components/sections/ModernHero.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import EnhancedProjects from '../components/sections/EnhancedProjects.vue'
import CareerJourney from '../components/sections/CareerJourney.vue'
import TestimonialSlider from '../components/sections/TestimonialSlider.vue'

const mobileMenuOpen = ref(false)
const scrolled = ref(false)
const scrollProgress = ref(0)

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' }
]

const skillCategories = [
  {
    title: 'Backend & DevOps',
    skills: [
      { name: 'Python / Django', level: 95 },
      { name: 'AWS Cloud', level: 92 },
      { name: 'Docker / Kubernetes', level: 90 },
      { name: 'CI/CD Pipelines', level: 93 },
      { name: 'REST APIs', level: 94 }
    ]
  },
  {
    title: 'Frontend & Tools',
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 90 },
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Tailwind CSS', level: 85 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Linux Administration', level: 90 }
    ]
  }
]

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO, Tech Startup',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    text: 'Working with this DevOps expert transformed our infrastructure. Deployment times reduced by 80% and our team productivity skyrocketed!'
  },
  {
    name: 'Michael Chen',
    role: 'CTO, Digital Agency',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    text: 'Exceptional full-stack development skills. Delivered a complex e-commerce platform on time and exceeded all expectations.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    text: 'A true professional who understands both the technical and business sides. Highly recommend for any cloud or DevOps project!'
  }
]

const scrollToSection = (id) => {
  const element = document.getElementById(id)
  if (element) {
    element.scrollIntoView({ behavior: 'smooth' })
  }
  mobileMenuOpen.value = false
}

const handleScroll = () => {
  scrolled.value = window.scrollY > 50
  
  const winScroll = document.documentElement.scrollTop
  const height = document.documentElement.scrollHeight - document.documentElement.clientHeight
  scrollProgress.value = (winScroll / height) * 100
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll)
  handleScroll()
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
  background: #000;
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

.skill-bar {
  animation: growWidth 1.5s ease-out;
}

@keyframes growWidth {
  from {
    width: 0;
  }
}
</style>