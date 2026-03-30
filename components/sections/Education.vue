<template>
  <section id="education" class="py-20  bg-[#070412] relative overflow-hidden">
    <div class="absolute bottom-0 right-0 w-125 h-[400px] opacity-10 pointer-events-none"
      style="background: radial-gradient(ellipse, #22d3ee 0%, transparent 70%)" />

    <div class="container mx-auto px-6 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
          <span class="text-violet-400 text-sm font-semibold tracking-wide">Education</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          Academic <span class="text-transparent"
            style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Background</span>
        </h2>
      </div>

      <div class="max-w-4xl mx-auto space-y-6">
        <div v-for="(edu, i) in educations" :key="i"
          class="group relative rounded-3xl border border-white/5 bg-white/2 p-8 lg:p-10 hover:border-violet-500/30 hover:bg-white/4 transition-all duration-500 overflow-hidden">

          <!-- Degree number watermark -->
          <div class="absolute right-8 top-6 text-8xl font-black opacity-[0.03] select-none text-violet-400 leading-none">
            {{ String(educations.length - i).padStart(2, '0') }}
          </div>

          <div class="relative z-10 flex flex-col sm:flex-row gap-6">
            <!-- Icon -->
            <div class="w-16 h-16 rounded-2xl flex items-center justify-center text-2xl flex-shrink-0 bg-violet-500/10 border border-violet-500/20 group-hover:scale-110 transition-transform duration-500">
              🎓
            </div>

            <!-- Content -->
            <div class="flex-1">
              <div class="flex flex-wrap items-center gap-3 mb-3">
                <span class="text-xs font-mono text-gray-500 border border-white/10 px-3 py-1 rounded-full">
                  {{ edu.period }}
                </span>
                <span class="text-xs font-bold px-3 py-1 rounded-full text-cyan-400 border border-cyan-500/30 bg-cyan-500/10">
                  {{ edu.abbreviation }}
                </span>
                <span class="text-xs text-amber-400 font-semibold">{{ edu.score }}</span>
              </div>

              <h3 class="text-xl font-bold text-white mb-1 group-hover:text-violet-300 transition-colors">
                {{ edu.degree }}
              </h3>
              <p class="text-violet-400 font-medium mb-3 text-sm">{{ edu.campus }}</p>
              <p class="text-gray-500 text-sm leading-relaxed">{{ edu.description }}</p>
            </div>
          </div>

          <!-- Bottom accent -->
          <div class="absolute bottom-0 left-0 h-px w-0 group-hover:w-full transition-all duration-700 rounded-full"
            style="background: linear-gradient(90deg, #6C3EEF, #22d3ee)" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
const educations = [
  {
    period: '2019 – 2023',
    degree: 'Bachelor of Science in Computer Science',
    campus: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
    abbreviation: 'BSCS',
    score: '3.4 / 4.0 CGPA',
    description: 'Comprehensive study in software engineering, cloud computing, algorithms, and modern development practices. Specialized in DevOps and full-stack development.',
  },
  {
    period: '2017 – 2019',
    degree: 'Intermediate in Computer Science',
    campus: 'Govt. College For Men Nazimabad, Karachi',
    abbreviation: 'BIEK',
    score: 'B Grade',
    description: 'Focused on practical applications of information technology including software development, database management, and network administration.',
  },
  {
    period: '2016 – 2017',
    degree: 'Matriculation in Computer Science',
    campus: 'Karachi Cambridge School',
    abbreviation: 'BSEK',
    score: 'A+ Grade',
    description: 'Strong foundation in computer science fundamentals, mathematics, and practical IT skills. Graduated with top honors.',
  },
]
</script>