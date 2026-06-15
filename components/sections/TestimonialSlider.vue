<template>
  <section class="pb-20  bg-[#070412] relative overflow-hidden">
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] opacity-[0.06] pointer-events-none rounded-full"
      style="background: radial-gradient(circle, #6C3EEF, transparent)" />

    <div class="container mx-auto px-6 lg:px-12 relative z-10">
      <!-- Header -->
      <div class="text-center mb-20">
        <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 mb-6">
          <span class="text-violet-400 text-sm font-semibold tracking-wide">Testimonials</span>
        </div>
        <h2 class="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight">
          What People <span class="text-transparent"
            style="background: linear-gradient(135deg, #a78bfa, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Say</span>
        </h2>
      </div>

      <!-- Slider -->
      <div class="max-w-4xl mx-auto relative">
        <!-- Cards stack -->
        <div class="relative h-auto min-h-[280px]">
          <div v-for="(t, i) in testimonials" :key="i"
            class="absolute inset-x-0 rounded-3xl border border-white/5 bg-white/[0.03] p-8 lg:p-12 transition-all duration-700 overflow-hidden"
            :class="getCardClasses(i)">

            <!-- Quote mark -->
            <div class="absolute top-6 right-8 text-8xl leading-none font-black select-none"
              style="color: rgba(108,62,239,0.1)">"</div>

            <!-- Stars -->
            <div class="flex gap-1 mb-6">
              <svg v-for="s in 5" :key="s" class="w-4 h-4 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
            </div>

            <!-- Text -->
            <p class="text-gray-300 text-base lg:text-lg leading-relaxed italic mb-8 relative z-10">
              "{{ t.text }}"
            </p>

            <!-- Author -->
            <div class="flex items-center gap-4">
              <div class="relative flex-shrink-0">
                <div class="absolute inset-0 rounded-full blur-lg opacity-40"
                  style="background: linear-gradient(135deg, #6C3EEF, #22d3ee)" />
                <img :src="t.image" :alt="t.name"
                  class="relative w-12 h-12 rounded-full object-cover border border-violet-500/30" />
              </div>
              <div>
                <div class="text-white font-bold">{{ t.name }}</div>
                <div class="text-gray-500 text-sm">{{ t.role }}</div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation -->
        <div class="flex items-center justify-between mt-10 pt-8 border-t border-white/5">
          <div class="flex gap-2">
            <button v-for="(t, i) in testimonials" :key="i" @click="goTo(i)"
              class="transition-all duration-300 rounded-full"
              :class="currentIndex === i ? 'w-8 h-2 bg-violet-500' : 'w-2 h-2 bg-gray-700 hover:bg-gray-500'" />
          </div>

          <div class="flex gap-3">
            <button @click="prev"
              class="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
              :class="{ 'opacity-30 cursor-not-allowed': currentIndex === 0 }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button @click="next"
              class="w-11 h-11 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/40 hover:bg-violet-500/10 transition-all duration-300"
              :class="{ 'opacity-30 cursor-not-allowed': currentIndex === testimonials.length - 1 }">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
let autoplay = null

const testimonials = [
  { name: 'Isra Ilyas Qureshi', role: 'MERN Stack Developer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', text: "Muhammad Sameer is an exceptional full stack developer and DevOps engineer. His mentorship has been invaluable and his willingness to share knowledge is a testament to his character. He genuinely cares about helping others grow. I highly recommend him for any role that requires a skilled and supportive developer." },
  { name: 'Sajjad Hussain', role: 'Mobile Application Developer', image: 'https://media.licdn.com/dms/image/v2/C4D03AQGatdWnm8h3lA/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1660488636937?e=1782950400&v=beta&t=fIziy1wWpdSFVXSV14FKAr11SIUbtA-BWguAlGQ4d3Y', text: "I wholeheartedly recommend Sameer for his outstanding tech and presentation skills. His rare combination of technical proficiency and presentation acumen makes him an invaluable asset to any team." },
  { name: 'Mahrukh Naz', role: 'Founder, CodeBuds Global', image: 'https://media.licdn.com/dms/image/v2/D4D03AQGwffpvf5uErg/profile-displayphoto-scale_100_100/B4DZl65wW7JAAc-/0/1758703587154?e=1782950400&v=beta&t=_S38d4Yo-jtDWSkwPcNzhhMIv4qVmZFM7KLYi3GoU3A', text: 'I highly recommend Sameer for his exceptional technical knowledge in DevOps. He is a dedicated team player with a deep understanding of DevOps principles and consistently impresses with his ability to apply them effectively.' },
  { name: 'Saba Parveen', role: 'Frontend Developer', image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop', text: 'I highly recommend Muhammad Sameer for his exceptional skills as a web developer. His passion for coding, quick learning abilities, and pleasant personality make him a valuable asset to any team. 😊' },
  { name: 'Shaheer Haider', role: 'CEO & Founder, Softech Ops', image: 'https://media.licdn.com/dms/image/v2/D5603AQHCWP227p-U6g/profile-displayphoto-shrink_100_100/profile-displayphoto-shrink_100_100/0/1722613345110?e=1782950400&v=beta&t=SHuaOrXGw_Ckleaq3lDIOwY0LrWxJDMSZHaR19MStSI', text: "He's one of the fastest learners I know. He'll surprise you with his knowledge in almost every area of development and cloud, and his habit of working and learning tirelessly." },
  { name: 'Hasnain Saeed', role: 'Software Engineer, Absolutely Digital', image: 'https://media.licdn.com/dms/image/v2/D5603AQGuKzNcn4hapg/profile-displayphoto-scale_100_100/B56Z4WPvR1G0Ac-/0/1778489688419?e=1782950400&v=beta&t=Vv_RE8zBJ8OkPBYkdrC1RgQNHGiO73Rtw7WOo19dJPM', text: "Sameer is a fantastic team player who fosters a collaborative and inclusive work environment. His ability to communicate effectively and mentor peers has been instrumental in creating a positive and productive work atmosphere." },
  { name: 'Hamza Naveed', role: 'Senior UI/UX Designer, GssTech Solutions', image: 'https://media.licdn.com/dms/image/v2/D4D03AQGGNzyppojexA/profile-displayphoto-scale_100_100/B4DZoVyCI4GwAc-/0/1761302029782?e=1782950400&v=beta&t=q0ihzS29iZX029VbW5aSEL8-biod9zHIUbgIJgWF6sE', text: "Muhammad Sameer is an exceptional backend developer. His coding skills and attention to detail set him apart. His technical prowess and collaborative nature make him an invaluable team member." },
]

const getCardClasses = (i) => {
  const diff = i - currentIndex.value
  if (diff === 0) return 'relative z-20 opacity-100 scale-100 translate-y-0'
  if (diff === -1) return 'z-10 opacity-0 pointer-events-none translate-y-4 scale-95'
  if (diff === 1) return 'z-10 opacity-20 pointer-events-none translate-y-2 scale-97'
  return 'opacity-0 pointer-events-none z-0'
}

const goTo = (i) => { currentIndex.value = i }
const prev = () => { if (currentIndex.value > 0) currentIndex.value-- }
const next = () => { if (currentIndex.value < testimonials.length - 1) currentIndex.value++ }

onMounted(() => {
  autoplay = setInterval(() => {
    currentIndex.value = (currentIndex.value + 1) % testimonials.length
  }, 6000)
})
onUnmounted(() => clearInterval(autoplay))
</script>