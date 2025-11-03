<template>
        <section id="education" class="py-32 bg-black relative overflow-hidden">
      <div class="container mx-auto px-6 relative z-10">
        <div class="text-center mb-20">
          <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
            <span class="text-blue-500 font-semibold">Education</span>
          </div>
          <h2 class="text-5xl md:text-6xl font-bold mb-6">
            <span class="text-white">Academic</span>
            <span class="text-transparent bg-clip-text bg-linear-to-r from-blue-500 to-cyan-500"> Background</span>
          </h2>
        </div>

        <div class="max-w-4xl mx-auto">
          <div v-for="(education, index) in educations" :key="index" class="relative bg-linear-to-br from-gray-900/50 to-black border border-blue-500/20 rounded-3xl p-10 hover:border-blue-500/50 transition-all">
            <div class="flex flex-col md:flex-row items-start gap-8">
              <div class="text-8xl">{{ education.icon }}</div>
              <div class="flex-1">
                <div class="flex items-center gap-4 mb-4">
                  <div class="px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full">
                    <span class="text-blue-500 font-semibold text-sm">{{ education.period }}</span>
                  </div>
                </div>
                <h3 class="text-4xl font-bold mb-2 text-white">{{ education.degree }}</h3>
                <span class="text-2xl text-gray-400 mt-4">{{ education.campus }}</span>

                <div class="text-2xl text-blue-400 mb-6">{{ education.abbreviation }}
                    <span class="text-gray-400 text-lg ml-4">{{ education.score }}</span>
                </div>
                <p class="text-gray-400 leading-relaxed mb-6 text-lg">
                  {{ education.description }}
                </p>
                
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
</template>


<script setup>

let educations = [
  {
    icon: '🎓',
    period: '2019 - 2023',
    degree: 'Bachelor of Science in Computer Science',
    campus: 'Federal Urdu University of Arts, Science & Technology (FUUAST)',
    abbreviation: 'BSCS',
    description: 'Comprehensive study in computer science fundamentals, software engineering, cloud computing, and modern development practices. Graduated with honors and specialized in DevOps and full-stack development.',
    score: '3.4/4.0 CGPA',
  },
  {
    icon: '🎓',
    period: '2017 - 2019',
    degree: 'Intermediate in Computer Science',
    campus: 'Govt. College For Men Nazimabad, Karachi',
    abbreviation: 'BIEK',
    description: 'Focused on the practical applications of information technology, including software development, database management, and network administration. Graduated with honors.',
    score: 'B Grade',
  },
  {
    icon: '🎓',
    period: '2016 - 2017',
    degree: 'Matriculation in Computer Science',
    campus: 'Karachi Cambridge School',
    abbreviation: 'BSEK',
    description: 'Focused on the practical applications of information technology, including software development, database management, and network administration. Graduated with honors.',
    score: 'A+ Grade',
  },
];



</script>