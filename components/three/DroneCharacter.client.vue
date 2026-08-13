<template>
  <div class="fixed inset-0 -z-[5] pointer-events-none" aria-hidden="true">
    <canvas ref="canvasEl" class="w-full h-full" />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import type * as Three from 'three'
import { journeyProgress } from '../../composables/useThemeJourney'
import { useReducedMotion } from '../../composables/useReducedMotion'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const { prefersReduced } = useReducedMotion()

let frame: number | null = null
let cleanup: (() => void) | null = null

const pointer = { x: 0, y: 0 }
const onPointerMove = (e: PointerEvent) => {
  pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
}

/**
 * The drone flies a fixed S-curve across the viewport as the page scrolls, so it reads
 * as one continuous character travelling from commit to production. Built entirely from
 * primitives - no external model, so there's no extra payload or licence to carry.
 */
const init = async () => {
  if (!canvasEl.value) return

  const THREE = await import('three')
  const canvas = canvasEl.value

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(window.innerWidth, window.innerHeight, false)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 100)
  camera.position.z = 14

  // ---- Drone rig -----------------------------------------------------------
  const drone = new THREE.Group()
  scene.add(drone)

  const shell = new THREE.MeshStandardMaterial({ color: 0x3a332b, metalness: 0.6, roughness: 0.35 })
  const trim = new THREE.MeshStandardMaterial({ color: 0xb0603a, metalness: 0.55, roughness: 0.3, emissive: 0x6e3a22, emissiveIntensity: 0.5 })
  const glass = new THREE.MeshStandardMaterial({ color: 0xc87b52, emissive: 0xa8752f, emissiveIntensity: 1.1, metalness: 0.2, roughness: 0.1 })

  const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.62, 0.5, 8, 24), shell)
  body.rotation.z = Math.PI / 2
  drone.add(body)

  const visor = new THREE.Mesh(new THREE.SphereGeometry(0.3, 24, 24), glass)
  visor.position.set(0, 0.08, 0.55)
  visor.scale.set(1.5, 0.62, 0.5)
  drone.add(visor)

  const core = new THREE.Mesh(new THREE.IcosahedronGeometry(0.2, 0), trim)
  core.position.set(0, -0.18, 0.2)
  drone.add(core)

  // Counter-rotating rings: the "orbit" that makes it feel alive while hovering.
  const ringGeo = new THREE.TorusGeometry(1.05, 0.028, 10, 72)
  const ringA = new THREE.Mesh(ringGeo, trim)
  ringA.rotation.x = Math.PI / 2.1
  drone.add(ringA)
  const ringB = new THREE.Mesh(new THREE.TorusGeometry(1.28, 0.016, 10, 72), glass)
  ringB.rotation.x = Math.PI / 1.7
  ringB.rotation.y = 0.4
  drone.add(ringB)

  const thrusters: Three.Mesh[] = []
  for (const x of [-0.42, 0.42]) {
    const t = new THREE.Mesh(new THREE.ConeGeometry(0.14, 0.42, 16), glass)
    t.position.set(x, -0.52, -0.1)
    t.rotation.x = Math.PI
    drone.add(t)
    thrusters.push(t)
  }

  // ---- Exhaust trail -------------------------------------------------------
  const TRAIL = 90
  const trailPos = new Float32Array(TRAIL * 3)
  const trailGeo = new THREE.BufferGeometry()
  trailGeo.setAttribute('position', new THREE.BufferAttribute(trailPos, 3))
  const trailMat = new THREE.PointsMaterial({ color: 0xb0603a, size: 0.075, transparent: true, opacity: 0.5, sizeAttenuation: true })
  scene.add(new THREE.Points(trailGeo, trailMat))
  let trailHead = 0

  // ---- Lights --------------------------------------------------------------
  const key = new THREE.DirectionalLight(0xffffff, 2.1)
  key.position.set(3, 4, 6)
  scene.add(key)
  scene.add(new THREE.DirectionalLight(0x9a7b4f, 0.7).translateX(-6))
  const ambient = new THREE.AmbientLight(0xffffff, 0.5)
  scene.add(ambient)
  const coreLight = new THREE.PointLight(0xb0603a, 3, 8)
  scene.add(coreLight)

  // ---- Flight path ---------------------------------------------------------
  // Normalised viewport units; converted to world space so it tracks any aspect ratio.
  const viewHeight = 2 * Math.tan((camera.fov * Math.PI) / 180 / 2) * camera.position.z
  const viewWidth = viewHeight * camera.aspect

  const pathAt = (p: number) => {
    // Weaves left/right 3 times over the full scroll, drifting down the viewport.
    const x = Math.sin(p * Math.PI * 3) * 0.3
    const y = 0.26 - p * 0.06
    return { x: x * viewWidth, y: y * viewHeight }
  }

  let smoothed = 0
  let lastX = 0
  let bank = 0
  let tick = 0

  const render = () => {
    frame = requestAnimationFrame(render)
    tick++

    const target = journeyProgress.value
    smoothed += (target - smoothed) * 0.07

    const { x, y } = pathAt(smoothed)
    const t = performance.now() * 0.001

    drone.position.x = x + pointer.x * 0.5
    drone.position.y = y + Math.sin(t * 1.4) * 0.16 - pointer.y * 0.35
    drone.position.z = Math.sin(smoothed * Math.PI) * 1.5

    // Bank into the turn, proportional to horizontal velocity.
    const vx = drone.position.x - lastX
    lastX = drone.position.x
    bank += (-vx * 2.6 - bank) * 0.08
    drone.rotation.z = bank
    drone.rotation.y = Math.sin(t * 0.5) * 0.35 + smoothed * Math.PI * 0.5
    drone.rotation.x = Math.sin(t * 0.9) * 0.08

    ringA.rotation.z += 0.012
    ringB.rotation.z -= 0.019
    core.rotation.x += 0.02
    core.rotation.y += 0.03

    const pulse = 0.75 + Math.sin(t * 3) * 0.25
    glass.emissiveIntensity = 1.1 + pulse * 0.5
    coreLight.position.copy(drone.position)
    coreLight.intensity = 2.2 + pulse

    thrusters.forEach((th, i) => {
      th.scale.y = 0.8 + Math.sin(t * 12 + i) * 0.18
    })

    // Shell darkens into a graphite that still reads once the page turns off-white.
    const j = journeyProgress.value
    shell.color.setRGB(0.165 + j * 0.05, 0.141 + j * 0.03, 0.251 - j * 0.06)
    trailMat.opacity = 0.55 - j * 0.25

    if (tick % 2 === 0) {
      trailPos[trailHead * 3] = drone.position.x
      trailPos[trailHead * 3 + 1] = drone.position.y - 0.6
      trailPos[trailHead * 3 + 2] = drone.position.z
      trailHead = (trailHead + 1) % TRAIL
      trailGeo.attributes.position.needsUpdate = true
    }

    renderer.render(scene, camera)
  }
  render()

  const onResize = () => {
    camera.aspect = window.innerWidth / window.innerHeight
    camera.updateProjectionMatrix()
    renderer.setSize(window.innerWidth, window.innerHeight, false)
  }
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  cleanup = () => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    scene.traverse((obj) => {
      const mesh = obj as Three.Mesh
      mesh.geometry?.dispose?.()
    })
    ;[shell, trim, glass, trailMat].forEach((m) => m.dispose())
    trailGeo.dispose()
    renderer.dispose()
  }
}

onMounted(() => {
  // A constantly-moving character is the definition of non-essential motion.
  if (prefersReduced.value) return
  init().catch(() => {
    /* WebGL unavailable - the page reads fine without the drone. */
  })
})

onUnmounted(() => {
  if (frame) cancelAnimationFrame(frame)
  cleanup?.()
})
</script>
