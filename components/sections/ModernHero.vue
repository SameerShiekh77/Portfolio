<template>
  <section id="home" class="relative min-h-screen flex items-center overflow-hidden bg-[#070412]">

    <!-- Three.js canvas -->
    <canvas ref="threeCanvas" class="absolute inset-0 w-full h-full z-0 opacity-70" />

    <!-- Radial ambient glow -->
    <div class="absolute inset-0 z-[1] pointer-events-none">
      <div class="absolute top-1/4 left-1/3 w-[700px] h-[700px] rounded-full"
        style="background: radial-gradient(circle, rgba(108,62,239,0.15) 0%, transparent 70%)" />
      <div class="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full"
        style="background: radial-gradient(circle, rgba(34,211,238,0.08) 0%, transparent 70%)" />
    </div>

    <!-- Noise texture overlay -->
    <div class="absolute inset-0 z-[2] opacity-[0.025] pointer-events-none"
      style="background-image: url('data:image/svg+xml,%3Csvg viewBox=%220 0 256 256%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22n%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.9%22 numOctaves=%224%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23n)%22/%3E%3C/svg%3E'); background-size: 200px" />

    <div class="container mx-auto px-6 lg:px-12 relative z-10 pt-28 pb-20">
      <div class="grid grid-cols-1 lg:grid-cols-5 gap-12 items-center">

        <!-- LEFT: Copy -->
        <div class="lg:col-span-3 space-y-8">

          <!-- Status badge -->
          <div class="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-violet-500/30 bg-violet-500/10 backdrop-blur-sm"
            :class="{ 'animate-fadeSlideUp': mounted }" style="animation-delay:0.1s; opacity:0">
            <span class="relative flex h-2 w-2">
              <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
              <span class="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
            </span>
            <span class="text-sm font-medium text-violet-300 tracking-wide">Open to Sr. Software Engineering opportunities</span>
          </div>

          <!-- Name -->
          <div :class="{ 'animate-fadeSlideUp': mounted }" style="animation-delay:0.25s; opacity:0">
            <p class="text-gray-500 text-lg mb-2 tracking-widest uppercase font-mono">Hello, I'm</p>
            <h1 class="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight leading-none text-white">
              Muhammad<br />
              <span class="text-transparent"
                style="background: linear-gradient(135deg, #a78bfa, #6C3EEF, #22d3ee); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Sameer</span>
            </h1>
          </div>

          <!-- Typewriter role -->
          <div :class="{ 'animate-fadeSlideUp': mounted }" style="animation-delay:0.4s; opacity:0">
            <div class="flex items-center gap-3">
              <div class="h-px w-8 bg-amber-400" />
              <div class="text-xl sm:text-2xl font-semibold font-mono min-h-[2rem]">
                <span class="text-amber-400">{{ typedRole }}</span>
                <span class="text-amber-400/60 animate-blink">|</span>
              </div>
            </div>
          </div>

          <!-- Summary -->
          <p class="text-gray-400 text-base sm:text-lg leading-relaxed max-w-xl"
            :class="{ 'animate-fadeSlideUp': mounted }" style="animation-delay:0.55s; opacity:0">
            Sr. Software Engineer with <strong class="text-white font-semibold">5+ years</strong> building and leading
            high-impact teams. Expert in full-stack architecture, cloud/DevOps pipelines, and AI integration.
            Proven track record shipping 50+ production systems at scale.
          </p>

          <!-- Stat chips -->
          <div class="grid grid-cols-2 gap-4 " :class="{ 'animate-fadeSlideUp': mounted }"
            style="animation-delay:0.7s; opacity:0">
            <div v-for="stat in stats" :key="stat.label"
              class="px-5 py-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center gap-3 hover:border-violet-500/40 transition-all duration-300">
              <span class="text-2xl font-black" :style="{ color: stat.color }">{{ stat.value }}</span>
              <span class="text-gray-400 text-sm leading-tight">{{ stat.label }}</span>
            </div>
          </div>

          <!-- CTAs -->
          <div class="flex flex-wrap gap-4" :class="{ 'animate-fadeSlideUp': mounted }"
            style="animation-delay:0.85s; opacity:0">
            <a href="#contact"
              class="group relative px-8 py-4 rounded-2xl font-bold text-white overflow-hidden transition-all duration-300 hover:scale-105"
              style="background: linear-gradient(135deg, #6C3EEF, #a78bfa)">
              <span class="relative z-10 flex items-center gap-2">
                Let's Connect
                <svg class="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor"
                  viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </span>
              <div class="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a href="#projects"
              class="px-8 py-4 rounded-2xl font-bold border border-white/20 text-white hover:border-violet-400/50 hover:bg-violet-500/10 transition-all duration-300 flex items-center gap-2">
              View Projects
            </a>

            <a href="Muhammad-Sameer-CV.pdf" download
              class="px-8 py-4 rounded-2xl font-bold border border-amber-500/30 text-amber-400 hover:bg-amber-500/10 transition-all duration-300 flex items-center gap-2">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                  d="M12 10v6m0 0l-3-3m3 3l3-3M7 19H5a2 2 0 01-2-2V7a2 2 0 012-2h14a2 2 0 012 2v10a2 2 0 01-2 2h-2" />
              </svg>
              Resume
            </a>
          </div>

          <!-- Socials -->
          <div class="flex gap-3 pt-2" :class="{ 'animate-fadeSlideUp': mounted }"
            style="animation-delay:1s; opacity:0">
            <a v-for="social in socials" :key="social.label" :href="social.href" target="_blank" rel="noopener"
              :aria-label="social.label"
              class="w-10 h-10 rounded-xl border border-white/10 flex items-center justify-center text-gray-400 hover:text-white hover:border-violet-500/50 hover:bg-violet-500/10 transition-all duration-300">
              <span v-html="social.icon" class="w-5 h-5 [&>svg]:w-5 [&>svg]:h-5" />
            </a>
          </div>
        </div>

        <!-- RIGHT: Profile card -->
        <div class="lg:col-span-2 flex justify-center lg:justify-end"
          :class="{ 'animate-fadeSlideUp': mounted }" style="animation-delay:0.5s; opacity:0">
          <div class="relative" ref="cardRef" @mousemove="onMouseMove" @mouseleave="onMouseLeave">
            <!-- Glow aura -->
            <div class="absolute -inset-4 rounded-3xl blur-2xl opacity-30 animate-pulse"
              style="background: linear-gradient(135deg, #6C3EEF, #22d3ee)" />

            <!-- Card -->
            <div class="relative rounded-3xl overflow-hidden border border-white/10 bg-linear-to-br from-white/5 to-white/[0.02] backdrop-blur-xl p-2 transition-transform duration-300"
              :style="cardTransform">

              <!-- Profile image -->
              <div class="rounded-2xl overflow-hidden">
                <img src="https://media.licdn.com/dms/image/v2/D4D03AQEJB8L_IhxMrA/profile-displayphoto-scale_400_400/B4DZviL_BBIgAg-/0/1769026353282?e=1776297600&v=beta&t=107Jj9PpZYGAFJCauhsdHy7ngYtSvZnUFLNRxeh51fY" alt="Muhammad Sameer"
                  class="w-full max-w-[340px] h-auto object-cover block" />
              </div>

              <!-- Floating badge: Experience -->
              <!-- <div
                class="absolute top-6 -left-6 bg-[#0d0920]/90 backdrop-blur-xl border border-violet-500/30 rounded-2xl px-4 py-3 shadow-2xl">
                <div class="text-3xl font-black text-violet-400">5+</div>
                <div class="text-xs text-gray-400 font-medium">Years Exp</div>
              </div> -->

              <!-- Floating badge: Projects -->
              <!-- <div
                class="absolute bottom-8 -right-6 bg-[#0d0920]/90 backdrop-blur-xl border border-cyan-500/30 rounded-2xl px-4 py-3 shadow-2xl">
                <div class="text-3xl font-black text-cyan-400">50+</div>
                <div class="text-xs text-gray-400 font-medium">Projects</div>
              </div> -->

              <!-- Floating badge: Team -->
              <!-- <div
                class="absolute top-1/2 -right-6 -translate-y-1/2 bg-[#0d0920]/90 backdrop-blur-xl border border-amber-500/30 rounded-2xl px-4 py-3 shadow-2xl">
                <div class="text-3xl font-black text-amber-400">8</div>
                <div class="text-xs text-gray-400 font-medium">Team Lead</div>
              </div> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Scroll indicator -->
    <div class="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 animate-bounce">
      <span class="text-xs text-gray-600 tracking-widest uppercase font-mono">scroll</span>
      <div class="w-px h-8 bg-linear-to-b from-gray-600 to-transparent" />
    </div>
  </section>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'

const threeCanvas = ref(null)
const cardRef = ref(null)
const mounted = ref(false)
const typedRole = ref('')
const cardTransform = ref('perspective(1200px) rotateX(0deg) rotateY(0deg)')

const roles = ['Engineering Manager', 'Full Stack Architect','Sr. Software Engineer',  'DevOps Leader', 'AI Integration Developer']
let roleIndex = 0

const stats = [
  { value: '5+', label: 'Years\nExperience', color: '#a78bfa' },
  { value: '50+', label: 'Production\nSystems', color: '#22d3ee' },
  { value: '8', label: 'Engineers\nMentored', color: '#f59e0b' },
  { value: '99.9%', label: 'Avg\nUptime', color: '#34d399' },
]

const socials = [
  {
    label: 'LinkedIn', href: 'https://www.linkedin.com/in/muhammadsameer/',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>`
  },
  {
    label: 'GitHub', href: 'https://github.com/SameerShiekh77',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>`
  },
  {
    label: 'Facebook', href: 'https://www.facebook.com/MuhammadSameer47',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  },
  {
    label: 'WhatsApp', href: 'https://wa.me/923431396493',
    icon: `<svg viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`
  },
]

// Typewriter
const typeRole = () => {
  const role = roles[roleIndex]
  let i = 0
  const typeInterval = setInterval(() => {
    if (i <= role.length) { typedRole.value = role.slice(0, i); i++ }
    else { clearInterval(typeInterval); setTimeout(deleteRole, 2000) }
  }, 80)
}
const deleteRole = () => {
  const deleteInterval = setInterval(() => {
    if (typedRole.value.length > 0) { typedRole.value = typedRole.value.slice(0, -1) }
    else { clearInterval(deleteInterval); roleIndex = (roleIndex + 1) % roles.length; setTimeout(typeRole, 400) }
  }, 40)
}

// 3D card tilt
const onMouseMove = (e) => {
  if (!cardRef.value) return
  const rect = cardRef.value.getBoundingClientRect()
  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20
  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -20
  cardTransform.value = `perspective(1200px) rotateY(${x}deg) rotateX(${y}deg) scale3d(1.02,1.02,1.02)`
}
const onMouseLeave = () => {
  cardTransform.value = 'perspective(1200px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
}

// Three.js particle network
let animFrame = null
const initThree = async () => {
  if (!threeCanvas.value) return
  try {
    const THREE = await import('three')
    const canvas = threeCanvas.value
    const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)

    const scene = new THREE.Scene()
    const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
    camera.position.z = 80

    // Particle points
    const count = 180
    const positions = new Float32Array(count * 3)
    const particleData = []
    for (let i = 0; i < count; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 160
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100
      positions[i * 3 + 2] = (Math.random() - 0.5) * 60
      particleData.push({
        velocity: new THREE.Vector3((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.03)
      })
    }

    const geo = new THREE.BufferGeometry()
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    const mat = new THREE.PointsMaterial({ color: 0x6C3EEF, size: 0.8, transparent: true, opacity: 0.7 })
    const points = new THREE.Points(geo, mat)
    scene.add(points)

    // Connection lines
    const lineGeo = new THREE.BufferGeometry()
    const linePositions = new Float32Array(count * count * 6)
    lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
    const lineMat = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x6C3EEF, transparent: true, opacity: 0.15 }))
    scene.add(lineMat)

    const pos = geo.attributes.position
    const animate = () => {
      animFrame = requestAnimationFrame(animate)
      let lineIdx = 0
      for (let i = 0; i < count; i++) {
        pos.array[i * 3] += particleData[i].velocity.x
        pos.array[i * 3 + 1] += particleData[i].velocity.y
        pos.array[i * 3 + 2] += particleData[i].velocity.z
        if (Math.abs(pos.array[i * 3]) > 80) particleData[i].velocity.x *= -1
        if (Math.abs(pos.array[i * 3 + 1]) > 50) particleData[i].velocity.y *= -1
        if (Math.abs(pos.array[i * 3 + 2]) > 30) particleData[i].velocity.z *= -1
      }
      for (let i = 0; i < count; i++) {
        for (let j = i + 1; j < count; j++) {
          const dx = pos.array[i * 3] - pos.array[j * 3]
          const dy = pos.array[i * 3 + 1] - pos.array[j * 3 + 1]
          const dz = pos.array[i * 3 + 2] - pos.array[j * 3 + 2]
          const dist = Math.sqrt(dx * dx + dy * dy + dz * dz)
          if (dist < 28 && lineIdx + 5 < linePositions.length) {
            linePositions[lineIdx++] = pos.array[i * 3]
            linePositions[lineIdx++] = pos.array[i * 3 + 1]
            linePositions[lineIdx++] = pos.array[i * 3 + 2]
            linePositions[lineIdx++] = pos.array[j * 3]
            linePositions[lineIdx++] = pos.array[j * 3 + 1]
            linePositions[lineIdx++] = pos.array[j * 3 + 2]
          }
        }
      }
      pos.needsUpdate = true
      lineGeo.attributes.position.needsUpdate = true
      lineGeo.setDrawRange(0, lineIdx / 3)
      scene.rotation.y += 0.0008
      renderer.render(scene, camera)
    }
    animate()

    const onResize = () => {
      if (!canvas) return
      camera.aspect = canvas.clientWidth / canvas.clientHeight
      camera.updateProjectionMatrix()
      renderer.setSize(canvas.clientWidth, canvas.clientHeight)
    }
    window.addEventListener('resize', onResize)
  } catch (e) {
    console.warn('Three.js not available', e)
  }
}

onMounted(() => {
  mounted.value = true
  setTimeout(typeRole, 600)
  initThree()
})
onUnmounted(() => { if (animFrame) cancelAnimationFrame(animFrame) })
</script>

<style scoped>
@keyframes fadeSlideUp {
  from { opacity: 0; transform: translateY(24px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeSlideUp { animation: fadeSlideUp 0.7s cubic-bezier(0.22, 1, 0.36, 1) forwards; }

@keyframes blink { 0%, 50% { opacity: 1 } 51%, 100% { opacity: 0 } }
.animate-blink { animation: blink 1s infinite; }
</style>