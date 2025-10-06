<template>
  <div class="mb-16 text-center" :class="{ 'animate-fadeInUp': isVisible }">
    <h2 class="text-5xl md:text-6xl font-bold mb-4">
      <span class="bg-gradient-to-r from-cyan-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient">
        {{ title }}
      </span>
    </h2>
    <p v-if="subtitle" class="text-xl text-gray-400 max-w-2xl mx-auto">
      {{ subtitle }}
    </p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const props = defineProps({
  title: {
    type: String,
    required: true
  },
  subtitle: {
    type: String,
    default: ''
  }
})

const isVisible = ref(false)

onMounted(() => {
  setTimeout(() => {
    isVisible.value = true
  }, 100)
})
</script>

<style scoped>
@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes gradient {
  0%, 100% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
}

.animate-fadeInUp {
  animation: fadeInUp 0.8s ease-out forwards;
}

.animate-gradient {
  background-size: 200% auto;
  animation: gradient 3s ease infinite;
}
</style>