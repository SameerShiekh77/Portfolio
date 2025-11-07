<template>
  <div class="bg-black min-h-screen text-white">
    <!-- Modern Navigation -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-300"
      :class="scrolled ? 'bg-black/80 backdrop-blur-xl border-b border-white/10' : 'bg-transparent'">
      <div class="container mx-auto px-6 py-4">
        <div class="flex justify-between items-center">
          <!-- Logo -->
          <div class="flex items-center gap-2">
            <div
              class="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">MS</span>
            </div>
            <span class="text-xl font-bold">Muhammad Sameer</span>
          </div>

          <!-- Desktop Menu -->
          <div class="hidden md:flex items-center gap-8">
            <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`" @click="scrollToSection(item.id)"
              class="text-gray-400 hover:text-blue-500 transition-colors relative group">
              {{ item.label }}
              <span
                class="absolute bottom-0 left-0 w-0 h-0.5 bg-blue-500 group-hover:w-full transition-all duration-300"></span>
            </a>
          </div>

          <!-- Hire Me Button -->
          <a href="#contact"
            class="hidden md:block px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-500/50">
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
          <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`"
            @click="mobileMenuOpen = false; scrollToSection(item.id)"
            class="block text-gray-400 hover:text-blue-500 transition-colors py-2">
            {{ item.label }}
          </a>
          <a href="#contact"
            class="block px-6 py-3 bg-linear-to-r from-blue-500 to-blue-600 rounded-full font-semibold text-center">
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
    <section id="skills" class="py-16 bg-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div class="absolute top-0 right-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span class="text-blue-500 font-semibold">My Skills</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Technical</span>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500"> Expertise</span>
          </h2>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          <div v-for="(category, index) in skillCategories" :key="index" class="space-y-6">
            <h3 class="text-2xl font-bold text-blue-500 mb-6">{{ category.title }}</h3>
            <div v-for="skill in category.skills" :key="skill.name" class="space-y-2">
              <div class="flex justify-between text-sm mb-2">
                <span class="text-gray-300">{{ skill.name }}</span>
                <span class="text-blue-500 font-semibold">{{ skill.level }}%</span>
              </div>
              <div class="h-3 bg-gray-800 rounded-full overflow-hidden">
                <div
                  class="h-full bg-linear-to-r from-blue-500 to-cyan-500 rounded-full transition-all duration-1000 skill-bar"
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
    <Education />

    <!-- Testimonials Section -->
    <TestimonialSlider />

    <!-- Contact Section -->
    <section id="contact" class="py-32 bg-black relative overflow-hidden">
      <div class="absolute inset-0">
        <div
          class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-500/10 rounded-full blur-3xl">
        </div>
      </div>

      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span class="text-blue-500 font-semibold">Get In Touch</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Let's Work</span>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500"> Together</span>
          </h2>
          <p class="text-gray-400 text-xl max-w-2xl mx-auto">
            Have a project in mind? Let's discuss how I can help bring your ideas to life.
          </p>
        </div>

        <div class="max-w-4xl mx-auto">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <div
              class="bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z">
                  </path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Email</h3>
              <p class="text-gray-400">muhammadsameer.css@gmail.com</p>
            </div>

            <div
              class="bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z">
                  </path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Phone</h3>
              <p class="text-gray-400">+923166368782</p>
            </div>

            <div
              class="bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M3 10h1l1 2h.89a1 1 0 01.832.445l1.528 2.042a1 1 0 01-.132 1.316l-1.414 1.414a11.042 11.042 0 005.516 5.516l1.414-1.414a1 1 0 011.316-.132l2.042 1.528a1 1 0 01.445.832V21a2 2 0 01-2 2h-1C9.716 23 3 16.284 3 8v2z">
                  </path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">WhatsApp</h3>
              <p class="text-gray-400">+923431396493</p>
            </div>

            <div
              class="bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-2xl p-6 text-center hover:border-blue-500/50 transition-all hover:scale-105">
              <div class="w-14 h-14 bg-blue-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg class="w-7 h-7 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                </svg>
              </div>
              <h3 class="text-lg font-semibold text-white mb-2">Location</h3>
              <p class="text-gray-400">Karachi, Pakistan</p>
            </div>
          </div>

          <div class="bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-3xl p-8">
            <form action="https://api.web3forms.com/submit" method="POST">
               <input type="hidden" name="access_key" value="2dda2782-f7fe-45fe-918c-6fc64f4b6f93">
              <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <input type="text" name="name" placeholder="Your Name"
                  class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors">
                <input type="email" name="email" placeholder="Your Email"
                  class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors">
              </div>
              <input type="text" name="subject" placeholder="Subject"
                class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors">
              <textarea rows="6" name="message" placeholder="Your Message"
                class="w-full px-6 py-4 bg-black/50 border border-white/10 rounded-xl text-white placeholder-gray-500 focus:border-blue-500 focus:outline-none transition-colors resize-none"></textarea>
              <button type="submit"
                class="cursor-pointer w-full px-8 py-4 bg-linear-to-r from-blue-500 to-blue-600 rounded-xl font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-500/50">
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
            <div
              class="w-10 h-10 bg-linear-to-br from-blue-500 to-cyan-500 rounded-lg flex items-center justify-center">
              <span class="text-white font-bold text-xl">MS</span>
            </div>
            <span class="text-xl font-bold">Muhammad Sameer</span>
          </div>

          <p class="text-gray-400">© 2025 All rights reserved </p>

          <div class="flex gap-4">
            <a href="https://www.facebook.com/MuhammadSameer47"
              class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
              </svg>
            </a>
            
            <a href="https://www.linkedin.com/in/muhammadsameer/"
              class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a href="https://github.com/SameerShiekh77"
              class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
              </svg>
            </a>
            <a href="https://wa.me/+93431396493" class="w-10 h-10 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all">
              <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path
                  d="M21.707 20.293l-4.586-4.586a8.001 8.001 0 10-1.414 1.414l4.586 4.586a1 1 0 001.414-1.414zM12 2a10 10 0 100 20 10 10 0 000-20z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>

    <!-- Scroll Progress Bar -->
    <div class="fixed top-0 left-0 w-full h-1 bg-gray-900 z-50">
      <div class="h-full bg-linear-to-r from-blue-500 to-cyan-500 transition-all duration-300"
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
import Education from '../components/sections/Education.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'

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
      { name: 'Python', level: 70 },
      { name: 'Django', level: 90 },
      { name: 'Flask', level: 60 },
      { name: 'Streamlit', level: 70 },
      { name: 'AWS Cloud', level: 50 },

      { name: 'Monolithic Architecture', level: 90 },
      { name: 'Docker', level: 50 },
      { name: 'CI/CD Pipelines', level: 60 },
      { name: 'REST APIs', level: 94 },
      { name: 'Microservices Architecture', level: 80 },
      { name: 'Database Management (SQL & NoSQL)', level: 70 },
      { name: 'Azure', level: 20 },
      { name: 'ERP Next', level: 60 },
      { name: 'PHP / Laravel', level: 40 },

    ]
  },
  {
    title: 'Frontend & Tools',
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 90 },
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Tailwind CSS / Bootstrap', level: 85 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Linux Administration', level: 90 },
      { name: 'Agile Methodologies', level: 80 },
      { name: 'Trello', level: 75 },
      { name: 'Sentry', level: 70 },
      { name: 'Postman', level: 80 },
      { name: 'Visual Studio Code', level: 90 },
      { name: 'Copilot', level: 70 },
      { name: 'WordPress', level: 40 },
      { name: 'AI Integration', level: 70 },

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