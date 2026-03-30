<template>
  <section class="py-20  bg-[#070412] relative overflow-hidden">
    <div class="container mx-auto px-6 lg:px-12">

      <!-- Header -->
      <div class="max-w-2xl mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
          <span class="text-violet-400 text-sm font-semibold tracking-wide">Capabilities</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-4">
          What I <span class="text-transparent"
            style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Build</span>
        </h2>
        <p class="text-gray-400 text-lg leading-relaxed">
          End-to-end engineering leadership - from architecture decisions to production deployments.
        </p>
      </div>

      <!-- Services grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div v-for="(service, i) in services" :key="i"
          class="group relative rounded-3xl border border-white/5 bg-white/2 p-8 lg:p-10 hover:border-violet-500/30 transition-all duration-500 overflow-hidden cursor-default">

          <!-- Background glow on hover -->
          <div class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
            :style="{ background: `radial-gradient(circle at 0% 100%, ${service.color}10 0%, transparent 60%)` }" />

          <!-- Number -->
          <div class="text-7xl font-black opacity-[0.04] absolute top-4 right-6 select-none leading-none"
            :style="{ color: service.color }">
            {{ String(i + 1).padStart(2, '0') }}
          </div>

          <div class="relative z-10">
            <!-- Icon + title row -->
            <div class="flex items-start gap-4 mb-6">
              <div class="w-14 h-14 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0"
                :style="{ background: service.color + '15', border: `1px solid ${service.color}30` }">
                {{ service.icon }}
              </div>
              <div>
                <h3 class="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                  {{ service.title }}
                </h3>
                <div class="h-0.5 w-8 rounded-full transition-all duration-500 group-hover:w-20"
                  :style="{ background: service.color }" />
              </div>
            </div>

            <!-- Description -->
            <p class="text-gray-400 leading-relaxed mb-6">{{ service.description }}</p>

            <!-- Tech tags -->
            <div class="flex flex-wrap gap-2">
              <span v-for="tag in service.tags" :key="tag"
                class="px-3 py-1 rounded-lg text-xs font-medium border border-white/10 text-gray-400"
                :style="{ borderColor: service.color + '20', color: service.color + 'cc' }">
                {{ tag }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const services = [
  {
    icon: '🏗️',
    title: 'Full-Stack Architecture & Development',
    description: 'Designing and building scalable web platforms from scratch - RESTful APIs, microservices, event-driven systems, and responsive frontends. Every decision made with production and maintainability in mind.',
    color: '#a78bfa',
    tags: ['Django', 'Vue.js / Nuxt.js', 'REST APIs', 'Microservices', 'PostgreSQL', 'Redis'],
  },
  {
    icon: '☁️',
    title: 'Cloud Infrastructure & DevOps',
    description: 'End-to-end cloud architecture on AWS - EC2, containers, serverless - plus CI/CD pipeline automation that cut deployment times by 75%. Infrastructure as code, zero-downtime deployments.',
    color: '#22d3ee',
    tags: ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Nginx', 'Linux'],
  },
  {
    icon: '🤖',
    title: 'AI Integration & Automation',
    description: 'Embedding OpenAI and Anthropic Claude into production workflows - MCQ generators, resume builders, intelligent dashboards, and content pipelines that run reliably at scale.',
    color: '#f59e0b',
    tags: ['OpenAI', 'Claude API', 'Streamlit', 'Python', 'Automation', 'Prompt Engineering'],
  },
  {
    icon: '👥',
    title: 'Engineering Leadership & Mentoring',
    description: 'Leading cross-functional teams (Frontend, Backend, QA, DevOps, DataOps), defining engineering standards, conducting code reviews, and mentoring 5+ engineers from junior to senior.',
    color: '#34d399',
    tags: ['Team Leadership', 'Agile', 'Code Review', 'Mentoring', 'Stakeholder Management', 'Trello'],
  },
]
</script>