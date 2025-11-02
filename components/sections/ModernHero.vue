<template>
    <section id="home" class="relative min-h-screen bg-black text-white overflow-hidden flex items-center">
        <!-- Animated Background Grid -->
        <div class="absolute inset-0">
            <div class="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-black to-cyan-500/5"></div>
            <div class="absolute inset-0"
                style="background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0); background-size: 40px 40px;">
            </div>
        </div>

        <!-- Floating Background Text -->
        <div class="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none">
            <div
                class="text-[15vw] md:text-[12vw] font-bold text-white/5 whitespace-nowrap animate-float-text select-none">
                {{ backgroundText }}
            </div>
        </div>

        <!-- Floating Elements -->
        <div class="absolute top-20 left-10 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-10 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl animate-float-delayed">
        </div>

        <div class="container mx-auto px-4 sm:px-6 relative z-10">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
                <!-- Left Content -->
                <div class="space-y-6 md:space-y-8 order-2 lg:order-1">
                    <div
                        class="inline-block px-4 py-2 bg-blue-500/10 border border-blue-500/30 rounded-full animate-fadeIn">
                        <span class="text-blue-500 font-semibold text-sm md:text-base">👋 Welcome to my Portfolio</span>
                    </div>

                    <div>
                        <h2 class="text-xl md:text-2xl lg:text-3xl text-gray-400 mb-2">Hello, I'm</h2>

                        <!-- Typewriter Effect for Name -->
                        <h1 class="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4">
                            <span class="text-white">{{ displayedName }}</span>
                            <span v-if="showNameCursor" class="text-blue-500 animate-blink">|</span>
                        </h1>

                        <!-- Role with Typewriter Effect -->
                        <div
                            class="text-3xl sm:text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-500 to-cyan-500 mb-6 min-h-[3rem] sm:min-h-[4rem] md:min-h-[5rem]">
                            {{ typedRole }}<span class="animate-blink">|</span>
                        </div>
                    </div>

                    <p class="text-gray-400 text-base md:text-lg leading-relaxed max-w-xl">
                        I'm a DevOps Manager with 5+ years of experience in building scalable cloud infrastructure,
                        implementing CI/CD pipelines, and leading high-performing engineering teams. Passionate about
                        automation, cloud technologies, and creating seamless development workflows.
                    </p>

                    <!-- CTA Buttons -->
                    <div class="flex flex-wrap gap-4">
                        <a href="#contact"
                            class="px-6 md:px-8 py-3 md:py-4 bg-gradient-to-r from-blue-500 to-blue-600 rounded-full font-semibold hover:scale-105 transition-all shadow-lg shadow-blue-500/50 flex items-center gap-2 text-sm md:text-base">
                            <span>Hire Me</span>
                            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                            </svg>
                        </a>
                        <a href="#projects"
                            class="px-6 md:px-8 py-3 md:py-4 border-2 border-blue-500 rounded-full font-semibold hover:bg-blue-500/10 transition-all flex items-center gap-2 text-sm md:text-base">
                            <span>View Projects</span>
                            <svg class="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z">
                                </path>
                            </svg>
                        </a>
                    </div>

                    <!-- Social Links -->
                    <div class="flex gap-3 md:gap-4">
                        <a href="https://www.facebook.com/MuhammadSameer47"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all group">
                            <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
                            </svg>
                        </a>
                        
                        <a href="https://www.linkedin.com/in/muhammadsameer/"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all group">
                            <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                            </svg>
                        </a>
                        <a href="https://github.com/SameerShiekh77"
                            class="w-10 h-10 md:w-12 md:h-12 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-blue-500 hover:border-blue-500 transition-all group">
                            <svg class="w-4 h-4 md:w-5 md:h-5 text-gray-400 group-hover:text-white" fill="currentColor"
                                viewBox="0 0 24 24">
                                <path
                                    d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                            </svg>
                        </a>
                    </div>
                </div>

                <!-- Right Content - Medium Size 3D Image -->
                <div class="relative order-1 lg:order-2 flex justify-center lg:justify-end">
                    <div class="relative group w-full max-w-[280px] sm:max-w-[320px] md:max-w-[380px] lg:max-w-[420px]">
                        <!-- Glowing Border -->
                        <div
                            class="absolute inset-0 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity">
                        </div>

                        <!-- Image Container with 3D Effect -->
                        <div class="relative bg-gradient-to-br from-gray-900 to-black p-1.5 md:p-2 rounded-3xl transform hover:scale-105 transition-all duration-500"
                            @mousemove="handleMouseMove" @mouseleave="resetTransform" :style="imageTransform">
                            <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=500&h=600&fit=crop"
                                alt="Professional Portrait" class="w-full h-auto rounded-3xl object-cover">

                            <!-- Floating Stats -->
                            <div
                                class="absolute top-4 -left-4 sm:-left-6 bg-black/80 backdrop-blur-md border border-blue-500/30 rounded-2xl p-3 md:p-4 animate-float">
                                <div class="text-2xl md:text-3xl font-bold text-blue-500">5+</div>
                                <div class="text-xs md:text-sm text-gray-400">Years Exp</div>
                            </div>

                            <div
                                class="absolute bottom-4 -right-4 sm:-right-6 bg-black/80 backdrop-blur-md border border-cyan-500/30 rounded-2xl p-3 md:p-4 animate-float-delayed">
                                <div class="text-2xl md:text-3xl font-bold text-cyan-500">50+</div>
                                <div class="text-xs md:text-sm text-gray-400">Projects</div>
                            </div>
                        </div>
                    </div>

                    <!-- Decorative Elements -->
                    <div
                        class="absolute -top-4 -right-4 w-16 h-16 md:w-24 md:h-24 border-4 border-blue-500 rounded-full opacity-20">
                    </div>
                    <div
                        class="absolute -bottom-4 -left-4 w-20 h-20 md:w-32 md:h-32 border-4 border-cyan-500 rounded-full opacity-20">
                    </div>
                </div>
            </div>
        </div>

        <!-- Scroll Indicator -->
        <div class="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
            <div
                class="w-5 h-8 md:w-6 md:h-10 border-2 border-blue-500 rounded-full flex items-start justify-center p-2">
                <div class="w-1 h-2 bg-blue-500 rounded-full animate-scroll"></div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { ref, onMounted } from 'vue'

const fullName = 'Muhammad Sameer'
const displayedName = ref('')
const showNameCursor = ref(true)
const typedRole = ref('')
const backgroundText = ref('Full Stack Developer')

const roles = ['DevOps Manager', 'Full Stack Developer', 'Cloud Architect', 'Team Leader']
let currentRoleIndex = 0
let nameTypingComplete = false

const imageTransform = ref('')

// Typewriter effect for name
const typeName = () => {
    let charIndex = 0

    const typeInterval = setInterval(() => {
        if (charIndex <= fullName.length) {
            displayedName.value = fullName.slice(0, charIndex)
            charIndex++
        } else {
            clearInterval(typeInterval)
            showNameCursor.value = false
            nameTypingComplete = true
            // Start typing role after name is complete
            setTimeout(typeRole, 300)
        }
    }, 100)
}

// Typewriter effect for role
const typeRole = () => {
    const role = roles[currentRoleIndex]
    let charIndex = 0

    const typeInterval = setInterval(() => {
        if (charIndex <= role.length) {
            typedRole.value = role.slice(0, charIndex)
            charIndex++
        } else {
            clearInterval(typeInterval)
            // Update background text to match current role
            backgroundText.value = role
            setTimeout(() => {
                deleteRole()
            }, 2000)
        }
    }, 100)
}

// Delete role text
const deleteRole = () => {
    const deleteInterval = setInterval(() => {
        if (typedRole.value.length > 0) {
            typedRole.value = typedRole.value.slice(0, -1)
        } else {
            clearInterval(deleteInterval)
            currentRoleIndex = (currentRoleIndex + 1) % roles.length
            setTimeout(typeRole, 500)
        }
    }, 50)
}

// 3D Image effect
const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    imageTransform.value = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
}

const resetTransform = () => {
    imageTransform.value = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)'
}

onMounted(() => {
    // Start name typing animation
    setTimeout(typeName, 500)
})
</script>

<style scoped>
@keyframes float {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-20px);
    }
}

@keyframes float-delayed {

    0%,
    100% {
        transform: translateY(0px);
    }

    50% {
        transform: translateY(-30px);
    }
}

@keyframes float-text {

    0%,
    100% {
        transform: translateX(0) translateY(-50%);
    }

    50% {
        transform: translateX(30px) translateY(-50%);
    }
}

@keyframes scroll {
    0% {
        transform: translateY(0);
    }

    100% {
        transform: translateY(100%);
    }
}

@keyframes blink {

    0%,
    50% {
        opacity: 1;
    }

    51%,
    100% {
        opacity: 0;
    }
}

@keyframes fadeIn {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.animate-float {
    animation: float 3s ease-in-out infinite;
}

.animate-float-delayed {
    animation: float-delayed 4s ease-in-out infinite;
    animation-delay: 1s;
}

.animate-float-text {
    animation: float-text 8s ease-in-out infinite;
}

.animate-scroll {
    animation: scroll 1.5s ease-in-out infinite;
}

.animate-blink {
    animation: blink 1s infinite;
}

.animate-fadeIn {
    animation: fadeIn 0.8s ease-out;
}


</style>