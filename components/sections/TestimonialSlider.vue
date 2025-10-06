<template>
  <section class="py-32 bg-black relative overflow-hidden">
    <!-- Background -->
    <div class="absolute inset-0">
      <div class="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl"></div>
    </div>

    <div class="container mx-auto px-6 relative z-10">
      <!-- Section Header -->
      <div class="text-center mb-20">
        <div class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full mb-6">
          <span class="text-blue-500 font-semibold">Testimonials</span>
        </div>
        <h2 class="text-5xl md:text-6xl font-bold mb-6">
          <span class="text-white">What Clients</span>
          <span class="text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500"> Say</span>
        </h2>
        <p class="text-gray-400 text-xl max-w-2xl mx-auto">
          Don't just take my word for it - hear from some of my satisfied clients
        </p>
      </div>

      <!-- Testimonial Slider -->
      <div class="max-w-6xl mx-auto relative">
        <!-- Slider Container -->
        <div class="relative overflow-hidden">
          <div 
            class="flex transition-transform duration-700 ease-out"
            :style="{ transform: `translateX(-${currentIndex * 100}%)` }">
            
            <div 
              v-for="(testimonial, index) in testimonials" 
              :key="index"
              class="w-full flex-shrink-0 px-4">
              
              <div class="bg-gradient-to-br from-gray-900/50 to-black border border-white/5 rounded-3xl p-8 md:p-12 hover:border-blue-500/50 transition-all relative overflow-hidden group">
                <!-- Quote Icon -->
                <div class="absolute top-8 right-8 text-8xl text-blue-500/10 group-hover:text-blue-500/20 transition-colors">
                  "
                </div>

                <!-- Content -->
                <div class="relative z-10">
                  <!-- Stars -->
                  <div class="flex gap-1 mb-6">
                    <svg v-for="i in 5" :key="i" class="w-6 h-6 text-yellow-500" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"></path>
                    </svg>
                  </div>

                  <!-- Testimonial Text -->
                  <p class="text-gray-300 text-lg md:text-xl leading-relaxed mb-8 italic">
                    "{{ testimonial.text }}"
                  </p>

                  <!-- Author Info -->
                  <div class="flex items-center gap-4">
                    <div class="relative">
                      <div class="absolute inset-0 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full blur-lg opacity-50"></div>
                      <img 
                        :src="testimonial.image" 
                        :alt="testimonial.name" 
                        class="relative w-16 h-16 md:w-20 md:h-20 rounded-full object-cover border-2 border-blue-500">
                    </div>
                    <div>
                      <h4 class="text-xl md:text-2xl font-bold text-white">{{ testimonial.name }}</h4>
                      <p class="text-gray-400">{{ testimonial.role }}</p>
                      <p class="text-blue-500 text-sm">{{ testimonial.company }}</p>
                    </div>
                  </div>
                </div>

                <!-- Decorative gradient -->
                <div class="absolute inset-0 bg-gradient-to-br from-blue-500/0 to-cyan-500/0 group-hover:from-blue-500/5 group-hover:to-cyan-500/5 transition-all duration-500 rounded-3xl pointer-events-none"></div>
              </div>
            </div>
          </div>
        </div>

        <!-- Navigation Arrows -->
        <button 
          @click="previousSlide"
          class="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-blue-500/50 group"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === 0 }">
          <svg class="w-6 h-6 text-white transform group-hover:-translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
          </svg>
        </button>

        <button 
          @click="nextSlide"
          class="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-16 w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br from-blue-500 to-blue-600 rounded-full flex items-center justify-center hover:scale-110 transition-all shadow-lg shadow-blue-500/50 group"
          :class="{ 'opacity-50 cursor-not-allowed': currentIndex === testimonials.length - 1 }">
          <svg class="w-6 h-6 text-white transform group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"></path>
          </svg>
        </button>

        <!-- Dots Indicator -->
        <div class="flex justify-center gap-3 mt-12">
          <button
            v-for="(testimonial, index) in testimonials"
            :key="index"
            @click="goToSlide(index)"
            class="transition-all duration-300 rounded-full"
            :class="currentIndex === index 
              ? 'w-12 h-3 bg-gradient-to-r from-blue-500 to-cyan-500' 
              : 'w-3 h-3 bg-gray-600 hover:bg-gray-500'">
          </button>
        </div>

        <!-- Counter -->
        <div class="text-center mt-8">
          <span class="text-blue-500 font-semibold text-lg">
            {{ currentIndex + 1 }} / {{ testimonials.length }}
          </span>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const currentIndex = ref(0)
let autoplayInterval = null

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'CEO',
    company: 'Tech Startup Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop',
    text: 'Working with this DevOps expert transformed our infrastructure completely. Our deployment times were reduced by 80% and team productivity skyrocketed. The attention to detail and commitment to excellence is unmatched!'
  },
  {
    name: 'Michael Chen',
    role: 'CTO',
    company: 'Digital Solutions Ltd.',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop',
    text: 'Exceptional full-stack development skills combined with deep DevOps knowledge. Delivered a complex e-commerce platform on time and exceeded all our expectations. A true professional who understands both technical and business needs.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Product Manager',
    company: 'Innovation Labs',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop',
    text: 'Outstanding communication and technical expertise. The cloud infrastructure setup was seamless and the CI/CD pipelines have made our development process so much smoother. Highly recommend for any cloud or DevOps project!'
  },
  {
    name: 'David Kim',
    role: 'Engineering Director',
    company: 'Global Tech Corp',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop',
    text: 'An absolute pleasure to work with! The full-stack application delivered was not only technically sound but also beautifully designed. The DevOps practices implemented have saved us countless hours and headaches.'
  },
  {
    name: 'Lisa Anderson',
    role: 'Founder',
    company: 'StartUp Ventures',
    image: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=200&h=200&fit=crop',
    text: 'From concept to deployment, everything was handled professionally. The AWS architecture is robust and scalable, and the automation has freed up our team to focus on innovation. Best investment we made for our infrastructure!'
  }
]

const nextSlide = () => {
  if (currentIndex.value < testimonials.length - 1) {
    currentIndex.value++
  }
}

const previousSlide = () => {
  if (currentIndex.value > 0) {
    currentIndex.value--
  }
}

const goToSlide = (index) => {
  currentIndex.value = index
}

const startAutoplay = () => {
  autoplayInterval = setInterval(() => {
    if (currentIndex.value < testimonials.length - 1) {
      currentIndex.value++
    } else {
      currentIndex.value = 0
    }
  }, 5000) // Change slide every 5 seconds
}

const stopAutoplay = () => {
  if (autoplayInterval) {
    clearInterval(autoplayInterval)
  }
}

onMounted(() => {
  startAutoplay()
})

onUnmounted(() => {
  stopAutoplay()
})

// Touch/Swipe support for mobile
let touchStartX = 0
let touchEndX = 0

const handleTouchStart = (e) => {
  touchStartX = e.changedTouches[0].screenX
}

const handleTouchEnd = (e) => {
  touchEndX = e.changedTouches[0].screenX
  handleSwipe()
}

const handleSwipe = () => {
  if (touchStartX - touchEndX > 50) {
    // Swipe left
    nextSlide()
  }
  
  if (touchEndX - touchStartX > 50) {
    // Swipe right
    previousSlide()
  }
}

onMounted(() => {
  const sliderContainer = document.querySelector('.overflow-hidden')
  if (sliderContainer) {
    sliderContainer.addEventListener('touchstart', handleTouchStart)
    sliderContainer.addEventListener('touchend', handleTouchEnd)
  }
})
</script>

<style scoped>
/* Smooth transition for slider */
.transition-transform {
  transition: transform 0.7s cubic-bezier(0.4, 0, 0.2, 1);
}

/* Pause autoplay on hover */
section:hover {
  --autoplay-paused: true;
}
</style>