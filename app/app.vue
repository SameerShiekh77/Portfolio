<!-- app.vue -->
<template>
  <div class="min-h-screen text-white transition-colors duration-500"
    :class="darkMode ? 'bg-[#070412]' : 'bg-slate-50 text-slate-900'">

    <!-- ── Navigation ── -->
    <nav class="fixed top-0 w-full z-50 transition-all duration-500"
      :class="scrolled
        ? (darkMode ? 'bg-[#070412]/90 backdrop-blur-xl border-b border-white/5' : 'bg-white/90 backdrop-blur-xl border-b border-slate-200/80')
        : 'bg-transparent'">
      <div class="container mx-auto px-6 lg:px-12 py-4">
        <div class="flex justify-between items-center">

          <!-- Logo -->
          <a href="#home" @click.prevent="scrollToSection('home')" class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-xl flex items-center justify-center font-black text-white text-sm"
              style="background: linear-gradient(135deg, #6C3EEF, #a78bfa)">MS</div>
            <div>
              <div class="font-bold text-sm leading-none" :class="darkMode ? 'text-white' : 'text-slate-900'">Muhammad Sameer</div>
              <div class="text-xs font-mono leading-none mt-0.5" style="color: #a78bfa">Sr. Software Engineer</div>
            </div>
          </a>

          <!-- Desktop links -->
          <div class="hidden md:flex items-center gap-1">
            <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`"
              @click.prevent="scrollToSection(item.id)"
              class="px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200"
              :class="activeSection === item.id
                ? 'text-violet-400 bg-violet-500/10'
                : (darkMode ? 'text-gray-400 hover:text-white hover:bg-white/5' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100')">
              {{ item.label }}
            </a>
          </div>

          <!-- Right controls -->
          <div class="flex items-center gap-3">
            <!-- Dark/light toggle -->
            <button @click="darkMode = !darkMode"
              class="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200"
              :class="darkMode
                ? 'border-white/10 text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10'
                : 'border-slate-200 text-slate-500 hover:text-slate-900 hover:bg-slate-100'">
              <svg v-if="darkMode" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364-6.364l-.707.707M6.343 17.657l-.707.707M17.657 17.657l-.707-.707M6.343 6.343l-.707-.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
              <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
              </svg>
            </button>

            <a href="#contact" @click.prevent="scrollToSection('contact')"
              class="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm text-white transition-all duration-300 hover:scale-105"
              style="background: linear-gradient(135deg, #6C3EEF, #a78bfa); box-shadow: 0 4px 20px rgba(108,62,239,0.3)">
              Hire Me
            </a>

            <!-- Mobile hamburger -->
            <button @click="mobileOpen = !mobileOpen" class="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5">
              <span class="block h-0.5 w-5 rounded-full transition-all duration-300"
                :class="[mobileOpen ? 'rotate-45 translate-y-2 bg-violet-400' : (darkMode ? 'bg-white' : 'bg-slate-900')]" />
              <span class="block h-0.5 w-5 rounded-full transition-all duration-300"
                :class="[mobileOpen ? 'opacity-0' : (darkMode ? 'bg-white' : 'bg-slate-900')]" />
              <span class="block h-0.5 w-5 rounded-full transition-all duration-300"
                :class="[mobileOpen ? '-rotate-45 -translate-y-2 bg-violet-400' : (darkMode ? 'bg-white' : 'bg-slate-900')]" />
            </button>
          </div>
        </div>

        <!-- Mobile menu -->
        <div v-if="mobileOpen"
          class="md:hidden mt-4 pb-4 space-y-1 border-t pt-4"
          :class="darkMode ? 'border-white/5' : 'border-slate-200'">
          <a v-for="item in navItems" :key="item.id" :href="`#${item.id}`"
            @click.prevent="scrollToSection(item.id); mobileOpen = false"
            class="block px-4 py-3 rounded-xl text-sm font-medium transition-all duration-200"
            :class="darkMode ? 'text-gray-300 hover:text-white hover:bg-white/5' : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'">
            {{ item.label }}
          </a>
          <a href="#contact" @click.prevent="scrollToSection('contact'); mobileOpen = false"
            class="block mt-3 px-4 py-3 rounded-xl font-bold text-sm text-center text-white"
            style="background: linear-gradient(135deg, #6C3EEF, #a78bfa)">
            Hire Me
          </a>
        </div>
      </div>
    </nav>

    <!-- ── Scroll progress ── -->
    <div class="fixed top-0 left-0 w-full h-0.5 z-[60]">
      <div class="h-full transition-all duration-300"
        :style="{ width: scrollProgress + '%', background: 'linear-gradient(90deg, #6C3EEF, #22d3ee)' }" />
    </div>

    <!-- ── Sections ── -->
      <ModernHero />
    <StatsSection />
    <ServicesSection />

    <!-- Skills Section -->
    <section id="skills" class="py-20  relative overflow-hidden"
      :class="darkMode ? 'bg-[#050310]' : 'bg-white'">
      <div class="container mx-auto px-6 lg:px-12">
          <!-- Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <span class="text-violet-400 text-sm font-semibold tracking-wide">Expertise</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight"
            :class="darkMode ? 'text-white' : 'text-slate-900'">
            Technical <span class="text-transparent"
              style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Stack</span>
          </h2>
        </div>

        <!-- Category tabs -->
        <div class="flex flex-wrap justify-center gap-2 mb-12">
          <button v-for="cat in skillCategories" :key="cat.title"
            @click="activeSkillCat = cat.title"
            class="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300"
            :class="activeSkillCat === cat.title
              ? 'bg-violet-600 text-white shadow-lg shadow-violet-500/25'
              : (darkMode ? 'border border-white/10 text-gray-400 hover:border-violet-500/40 hover:text-violet-300' : 'border border-slate-200 text-slate-500 hover:border-violet-300')">
            {{ cat.title }}
          </button>
        </div>

        <!-- Skills grid -->
        <div v-for="cat in skillCategories" :key="cat.title" v-show="activeSkillCat === cat.title">
          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
            <div v-for="skill in cat.skills" :key="skill.name"
              class="group rounded-2xl border p-5 transition-all duration-300 hover:border-violet-500/40"
              :class="darkMode ? 'border-white/5 bg-white/[0.02] hover:bg-white/[0.04]' : 'border-slate-100 bg-white hover:bg-violet-50/50'">
              <div class="flex justify-between items-center mb-3">
                <span class="font-semibold text-sm" :class="darkMode ? 'text-white' : 'text-slate-800'">{{ skill.name }}</span>
                <span class="text-xs font-bold tabular-nums" style="color: #a78bfa">{{ skill.level }}%</span>
              </div>
              <!-- Bar -->
              <div class="h-1.5 rounded-full overflow-hidden"
                :class="darkMode ? 'bg-white/5' : 'bg-slate-100'">
                <div class="h-full rounded-full transition-all duration-1000 ease-out"
                  :style="{ width: skillsVisible ? skill.level + '%' : '0%', background: 'linear-gradient(90deg, #6C3EEF, #22d3ee)' }" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <ProjectsSection />
    <CareerJourney />
    <Education />
    <TestimonialSlider />

    <!-- Contact Section -->
    <section id="contact" class="py-20  relative overflow-hidden"
      :class="darkMode ? 'bg-[#050310]' : 'bg-slate-50'">
      <div class="absolute inset-0 pointer-events-none">
        <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-[0.08]"
          style="background: radial-gradient(circle, #6C3EEF, transparent)" />
      </div>

      <div class="container mx-auto px-6 lg:px-12 relative z-10">
        <!-- Header -->
        <div class="text-center mb-20">
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
            <span class="text-violet-400 text-sm font-semibold tracking-wide">Get In Touch</span>
          </div>
          <h2 class="text-4xl md:text-5xl lg:text-6xl font-black leading-tight mb-4"
            :class="darkMode ? 'text-white' : 'text-slate-900'">
            Let's Build <span class="text-transparent"
              style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Together</span>
          </h2>
          <p class="text-gray-400 text-lg max-w-2xl mx-auto">
            Open to senior engineering roles, fractional CTO engagements, and consulting on complex systems.
          </p>
        </div>

        <div class="max-w-5xl mx-auto grid grid-cols-1 lg:grid-cols-5 gap-8">
          <!-- Contact cards -->
          <div class="lg:col-span-2 space-y-4">
            <div v-for="item in contactItems" :key="item.label"
              class="flex items-center gap-4 rounded-2xl border p-5 transition-all duration-300 hover:border-violet-500/40"
              :class="darkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-white'">
              <div class="w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0"
                style="background: rgba(108,62,239,0.12); border: 1px solid rgba(108,62,239,0.2)">
                <span v-html="item.icon" class="w-5 h-5 text-violet-400 [&>svg]:w-5 [&>svg]:h-5 [&>svg]:text-violet-400" />
              </div>
              <div>
                <div class="text-xs font-semibold text-gray-500 mb-0.5">{{ item.label }}</div>
                <div class="text-sm font-medium" :class="darkMode ? 'text-white' : 'text-slate-800'">{{ item.value }}</div>
              </div>
            </div>

            <!-- Availability badge -->
            <div class="rounded-2xl border border-emerald-500/30 bg-emerald-500/5 p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span class="text-emerald-400 font-bold text-sm">Available for hire</span>
              </div>
              <p class="text-gray-500 text-xs leading-relaxed">
                Open to full-time Engineering Manager, VP Engineering, or senior architect roles.
              </p>
            </div>
          </div>

          <!-- Contact form -->
          <div class="lg:col-span-3 rounded-3xl border p-8"
            :class="darkMode ? 'border-white/5 bg-white/[0.02]' : 'border-slate-100 bg-white'">
            <form v-if="!formSent" action="https://api.web3forms.com/submit" method="POST" @submit.prevent="submitForm" class="space-y-5">
              <input type="hidden" name="access_key" value="2dda2782-f7fe-45fe-918c-6fc64f4b6f93" />
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Name</label>
                  <input v-model="form.name" type="text" name="name" placeholder="John Doe" required
                    class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    :class="darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-slate-50 border-slate-200 text-slate-800'" />
                </div>
                <div>
                  <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Email</label>
                  <input v-model="form.email" type="email" name="email" placeholder="john@company.com" required
                    class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                    :class="darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-slate-50 border-slate-200 text-slate-800'" />
                </div>
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Subject</label>
                <input v-model="form.subject" type="text" name="subject" placeholder="Opportunity / Project / Consulting" required
                  class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20"
                  :class="darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-slate-50 border-slate-200 text-slate-800'" />
              </div>
              <div>
                <label class="block text-xs font-semibold text-gray-500 mb-2 uppercase tracking-wider">Message</label>
                <textarea v-model="form.message" name="message" rows="5" placeholder="Tell me about your project or role..." required
                  class="w-full px-4 py-3 rounded-xl border text-sm transition-all duration-200 outline-none focus:border-violet-500 focus:ring-2 focus:ring-violet-500/20 resize-none"
                  :class="darkMode ? 'bg-white/5 border-white/10 text-white placeholder-gray-600' : 'bg-slate-50 border-slate-200 text-slate-800'" />
              </div>
              <button type="submit" :disabled="sending"
                class="w-full py-4 rounded-xl font-bold text-white transition-all duration-300 hover:scale-[1.02] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                style="background: linear-gradient(135deg, #6C3EEF, #a78bfa); box-shadow: 0 8px 32px rgba(108,62,239,0.3)">
                <svg v-if="sending" class="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
                {{ sending ? 'Sending...' : 'Send Message' }}
                <svg v-if="!sending" class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </form>

            <!-- Success state -->
            <div v-else class="flex flex-col items-center justify-center py-16 text-center">
              <div class="w-16 h-16 rounded-full flex items-center justify-center mb-4"
                style="background: rgba(52,211,153,0.15); border: 1px solid rgba(52,211,153,0.3)">
                <svg class="w-8 h-8 text-emerald-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 class="text-xl font-bold text-white mb-2">Message sent!</h3>
              <p class="text-gray-400 text-sm">I'll get back to you within 24 hours.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 border-t"
      :class="darkMode ? 'bg-[#040210] border-white/5' : 'bg-white border-slate-100'">
      <div class="container mx-auto px-6 lg:px-12">
        <div class="flex flex-col md:flex-row justify-between items-center gap-6">
          <div class="flex items-center gap-3">
            <div class="w-9 h-9 rounded-xl flex items-center justify-center font-black text-white text-xs"
              style="background: linear-gradient(135deg, #6C3EEF, #a78bfa)">MS</div>
            <div>
              <div class="font-bold text-sm" :class="darkMode ? 'text-white' : 'text-slate-900'">Muhammad Sameer</div>
              <div class="text-xs font-mono" style="color: #a78bfa">Engineering Manager</div>
            </div>
          </div>

          <p class="text-gray-600 text-sm">© 2025 Muhammad Sameer. All rights reserved.</p>

          <div class="flex gap-3">
            <a v-for="s in footerSocials" :key="s.label" :href="s.href" target="_blank" :aria-label="s.label"
              class="w-9 h-9 rounded-xl border flex items-center justify-center transition-all duration-200 hover:scale-110"
              :class="darkMode ? 'border-white/10 text-gray-500 hover:border-violet-500/40 hover:text-violet-400 hover:bg-violet-500/10' : 'border-slate-200 text-slate-400 hover:border-violet-300 hover:text-violet-500'">
              <span v-html="s.icon" class="w-4 h-4 [&>svg]:w-4 [&>svg]:h-4" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import ModernHero from '../components/sections/ModernHero.vue'
import StatsSection from '../components/sections/StatsSection.vue'
import ServicesSection from '../components/sections/ServicesSection.vue'
import CareerJourney from '../components/sections/CareerJourney.vue'
import TestimonialSlider from '../components/sections/TestimonialSlider.vue'
import Education from '../components/sections/Education.vue'
import ProjectsSection from '../components/sections/ProjectsSection.vue'

const darkMode = ref(true)
const scrolled = ref(false)
const scrollProgress = ref(0)
const mobileOpen = ref(false)
const activeSection = ref('home')
const activeSkillCat = ref('Backend & DevOps')
const skillsVisible = ref(false)
const formSent = ref(false)
const sending = ref(false)
const form = ref({ name: '', email: '', subject: '', message: '' })

const navItems = [
  { id: 'home', label: 'Home' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'contact', label: 'Contact' },
]

const skillCategories = [
  {
    title: 'Backend & DevOps',
    skills: [
      { name: 'REST APIs', level: 95 },
      { name: 'Django', level: 90 },
      { name: 'Microservices Architecture', level: 85 },
      { name: 'Monolithic Architecture', level: 90 },
      { name: 'CI/CD Pipelines', level: 80 },
      { name: 'Docker', level: 75 },
      { name: 'AWS Cloud', level: 70 },
      { name: 'Python', level: 70 },
      { name: 'Database (SQL & NoSQL)', level: 75 },
      { name: 'Linux Administration', level: 90 },
      { name: 'Flask', level: 65 },
      { name: 'Streamlit', level: 70 },
    ]
  },
  {
    title: 'Frontend & Tools',
    skills: [
      { name: 'Vue.js / Nuxt.js', level: 90 },
      { name: 'JavaScript / TypeScript', level: 88 },
      { name: 'Git / GitHub', level: 95 },
      { name: 'Tailwind CSS / Bootstrap', level: 88 },
      { name: 'Postman', level: 85 },
      { name: 'Sentry / APM', level: 80 },
      { name: 'Agile Methodologies', level: 85 },
      { name: 'AI Integration', level: 75 },
    ]
  },
  {
    title: 'Leadership',
    skills: [
      { name: 'Team Leadership (8 engineers)', level: 95 },
      { name: 'Project Management', level: 90 },
      { name: 'Stakeholder Communication', level: 88 },
      { name: 'Technical Mentoring', level: 92 },
      { name: 'Architecture Decisions', level: 85 },
      { name: 'Cross-functional Collaboration', level: 90 },
    ]
  },
]

const contactItems = [
  { label: 'Email', value: 'muhammadsameer.css@gmail.com', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"/></svg>` },
  { label: 'Phone', value: '+92 316 636 8782', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"/></svg>` },
  { label: 'WhatsApp', value: '+92 343 139 6493', icon: `<svg fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>` },
  { label: 'Location', value: 'Karachi, Pakistan', icon: `<svg fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/></svg>` },
]

const footerSocials = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammadsameer/', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>` },
  { label: 'GitHub', href: 'https://github.com/SameerShiekh77', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>` },
  { label: 'Facebook', href: 'https://www.facebook.com/MuhammadSameer47', icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>` },
]

const scrollToSection = (id) => {
  const el = document.getElementById(id)
  if (el) el.scrollIntoView({ behavior: 'smooth' })
  mobileOpen.value = false
}

const handleScroll = () => {
  const y = window.scrollY
  scrolled.value = y > 60
  const total = document.documentElement.scrollHeight - window.innerHeight
  scrollProgress.value = total > 0 ? (y / total) * 100 : 0

  // Active section tracking
  for (const item of [...navItems].reverse()) {
    const el = document.getElementById(item.id)
    if (el && y >= el.offsetTop - 120) {
      activeSection.value = item.id
      break
    }
  }

  // Skills visibility
  const skillsEl = document.getElementById('skills')
  if (skillsEl) {
    const rect = skillsEl.getBoundingClientRect()
    if (rect.top < window.innerHeight * 0.8) skillsVisible.value = true
  }
}

const submitForm = async () => {
  sending.value = true
  try {
    const data = new FormData()
    data.append('access_key', '2dda2782-f7fe-45fe-918c-6fc64f4b6f93')
    data.append('name', form.value.name)
    data.append('email', form.value.email)
    data.append('subject', form.value.subject)
    data.append('message', form.value.message)
    await fetch('https://api.web3forms.com/submit', { method: 'POST', body: data })
    formSent.value = true
  } catch (e) {
    console.error(e)
  } finally {
    sending.value = false
  }
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  handleScroll()
})
onUnmounted(() => window.removeEventListener('scroll', handleScroll))
</script>

<style>
@import "tailwindcss";

* { scroll-behavior: smooth; }

body {
  font-family: 'Sora', 'Inter', sans-serif;
  margin: 0;
  padding: 0;
}

@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
}

::selection {
  background: rgba(108, 62, 239, 0.3);
  color: white;
}

/* Custom scrollbar */
::-webkit-scrollbar { width: 4px; }
::-webkit-scrollbar-track { background: #070412; }
::-webkit-scrollbar-thumb { background: #6C3EEF; border-radius: 2px; }
</style>