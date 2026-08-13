<template>
  <canvas ref="canvasEl" class="absolute inset-0 w-full h-full z-0 opacity-70" aria-hidden="true" />
</template>

<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { useReducedMotion } from '../../composables/useReducedMotion'

const canvasEl = ref<HTMLCanvasElement | null>(null)
const { prefersReduced } = useReducedMotion()

let animFrame: number | null = null
let cleanupResize: (() => void) | null = null
let pointer = { x: 0, y: 0 }

const onPointerMove = (e: PointerEvent) => {
  pointer.x = (e.clientX / window.innerWidth - 0.5) * 2
  pointer.y = (e.clientY / window.innerHeight - 0.5) * 2
}

const init = async () => {
  if (!canvasEl.value || prefersReduced.value) return

  const THREE = await import('three')
  const canvas = canvasEl.value
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true })
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
  renderer.setSize(canvas.clientWidth, canvas.clientHeight)

  const scene = new THREE.Scene()
  const camera = new THREE.PerspectiveCamera(60, canvas.clientWidth / canvas.clientHeight, 0.1, 1000)
  camera.position.z = 80

  const count = 180
  const positions = new Float32Array(count * 3)
  const velocities: THREE.Vector3[] = []
  for (let i = 0; i < count; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 160
    positions[i * 3 + 1] = (Math.random() - 0.5) * 100
    positions[i * 3 + 2] = (Math.random() - 0.5) * 60
    velocities.push(new THREE.Vector3((Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.06, (Math.random() - 0.5) * 0.03))
  }

  const geo = new THREE.BufferGeometry()
  geo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
  const mat = new THREE.PointsMaterial({ color: 0xb0603a, size: 0.8, transparent: true, opacity: 0.5 })
  const points = new THREE.Points(geo, mat)
  scene.add(points)

  const lineGeo = new THREE.BufferGeometry()
  const linePositions = new Float32Array(count * count * 6)
  lineGeo.setAttribute('position', new THREE.BufferAttribute(linePositions, 3))
  const lines = new THREE.LineSegments(lineGeo, new THREE.LineBasicMaterial({ color: 0x9a7b4f, transparent: true, opacity: 0.14 }))
  scene.add(lines)

  const pos = geo.attributes.position
  let targetRotY = 0
  let currentRotY = 0

  const animate = () => {
    animFrame = requestAnimationFrame(animate)
    let lineIdx = 0

    for (let i = 0; i < count; i++) {
      pos.array[i * 3] += velocities[i].x
      pos.array[i * 3 + 1] += velocities[i].y
      pos.array[i * 3 + 2] += velocities[i].z
      if (Math.abs(pos.array[i * 3]) > 80) velocities[i].x *= -1
      if (Math.abs(pos.array[i * 3 + 1]) > 50) velocities[i].y *= -1
      if (Math.abs(pos.array[i * 3 + 2]) > 30) velocities[i].z *= -1
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

    // Mouse-reactive parallax: the whole field drifts gently toward the pointer.
    targetRotY = pointer.x * 0.15
    currentRotY += (targetRotY - currentRotY) * 0.04
    scene.rotation.y = currentRotY + performance.now() * 0.000008
    scene.rotation.x += (pointer.y * 0.08 - scene.rotation.x) * 0.03

    renderer.render(scene, camera)
  }
  animate()

  const onResize = () => {
    camera.aspect = canvas.clientWidth / canvas.clientHeight
    camera.updateProjectionMatrix()
    renderer.setSize(canvas.clientWidth, canvas.clientHeight)
  }
  window.addEventListener('resize', onResize)
  window.addEventListener('pointermove', onPointerMove, { passive: true })

  cleanupResize = () => {
    window.removeEventListener('resize', onResize)
    window.removeEventListener('pointermove', onPointerMove)
    renderer.dispose()
    geo.dispose()
    lineGeo.dispose()
    mat.dispose()
  }
}

onMounted(() => {
  init().catch(() => {
    // Three.js failed to load - hero still reads fine without the particle field.
  })
})

onUnmounted(() => {
  if (animFrame) cancelAnimationFrame(animFrame)
  cleanupResize?.()
})
</script>
