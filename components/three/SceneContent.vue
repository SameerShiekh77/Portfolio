<template>
  <TresPerspectiveCamera ref="cameraRef" :position="[0, 0, 9]" :fov="48" :near="0.1" :far="60" />

  <AvatarModel />

  <TresGroup ref="rigRef">
    <!-- The growing network: nodes and the links between them. -->
    <primitive :object="network" />
  </TresGroup>
</template>

<script setup lang="ts">
import { onBeforeUnmount, ref, watch } from 'vue'
import * as THREE from 'three'
import { useLoop } from '@tresjs/core'
import AvatarModel from './AvatarModel.vue'
import { sceneState } from '../../composables/useScene'
import { theme } from '../../composables/useTheme'

const props = defineProps<{ density: number }>()

const cameraRef = ref<THREE.PerspectiveCamera | null>(null)
const rigRef = ref<THREE.Group | null>(null)

/* ---------- Build the network once ---------- */

// Seeded RNG so server/client and reloads produce the same constellation.
let seed = 7
const rand = () => {
  seed = (seed * 16807) % 2147483647
  return (seed - 1) / 2147483646
}
const gauss = () => (rand() + rand() + rand() - 1.5) / 1.5

const HUBS = 7
const N = props.density
const positions = new Float32Array(N * 3)
const colors = new Float32Array(N * 3)

const palette = [
  new THREE.Color('#ffb62e'),
  new THREE.Color('#ff6a2b'),
  new THREE.Color('#ff3d7f'),
  new THREE.Color('#2ef2b0'),
]

const hubCenters: THREE.Vector3[] = []
for (let h = 0; h < HUBS; h++) {
  // Fibonacci sphere keeps hubs evenly spread.
  const y = 1 - (h / (HUBS - 1)) * 2
  const r = Math.sqrt(1 - y * y)
  const phi = h * 2.399963
  hubCenters.push(new THREE.Vector3(Math.cos(phi) * r, y, Math.sin(phi) * r).multiplyScalar(3.6))
}

for (let i = 0; i < N; i++) {
  const c = new THREE.Color()
  if (i < HUBS) {
    positions.set([hubCenters[i].x, hubCenters[i].y, hubCenters[i].z], i * 3)
    c.copy(palette[1]).lerp(palette[0], 0.35)
  } else {
    const hub = hubCenters[i % HUBS]
    positions.set([hub.x + gauss() * 1.5, hub.y + gauss() * 1.5, hub.z + gauss() * 1.5], i * 3)
    const roll = rand()
    c.copy(roll < 0.08 ? palette[3] : roll < 0.4 ? palette[0] : roll < 0.75 ? palette[1] : palette[2])
  }
  colors.set([c.r, c.g, c.b], i * 3)
}

// Link every node to its two nearest earlier neighbours, so draw order == reveal order.
interface Edge { a: number; b: number }
const edges: Edge[] = []
for (let i = 1; i < N; i++) {
  const near: { j: number; d: number }[] = []
  for (let j = 0; j < i; j++) {
    const dx = positions[i * 3] - positions[j * 3]
    const dy = positions[i * 3 + 1] - positions[j * 3 + 1]
    const dz = positions[i * 3 + 2] - positions[j * 3 + 2]
    near.push({ j, d: dx * dx + dy * dy + dz * dz })
  }
  near.sort((p, q) => p.d - q.d)
  for (let k = 0; k < Math.min(2, near.length); k++) edges.push({ a: i, b: near[k].j })
}
// edges are already ordered by their higher endpoint `a`; remember where each node's run ends.
const edgeEnd = new Uint32Array(N + 1)
{
  let e = 0
  for (let i = 0; i <= N; i++) {
    while (e < edges.length && edges[e].a < i) e++
    edgeEnd[i] = e
  }
}

const linePos = new Float32Array(edges.length * 6)
const lineCol = new Float32Array(edges.length * 6)
edges.forEach((edge, idx) => {
  linePos.set(positions.subarray(edge.a * 3, edge.a * 3 + 3), idx * 6)
  linePos.set(positions.subarray(edge.b * 3, edge.b * 3 + 3), idx * 6 + 3)
  lineCol.set(colors.subarray(edge.a * 3, edge.a * 3 + 3), idx * 6)
  lineCol.set(colors.subarray(edge.b * 3, edge.b * 3 + 3), idx * 6 + 3)
})

// Soft round sprite so nodes read as glowing points, not squares.
const sprite = (() => {
  const canvas = document.createElement('canvas')
  canvas.width = canvas.height = 64
  const ctx = canvas.getContext('2d')!
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32)
  g.addColorStop(0, 'rgba(255,255,255,1)')
  g.addColorStop(0.35, 'rgba(255,255,255,0.55)')
  g.addColorStop(1, 'rgba(255,255,255,0)')
  ctx.fillStyle = g
  ctx.fillRect(0, 0, 64, 64)
  return new THREE.CanvasTexture(canvas)
})()

const pointGeo = new THREE.BufferGeometry()
pointGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3))
pointGeo.setAttribute('color', new THREE.BufferAttribute(colors, 3))
const pointMat = new THREE.PointsMaterial({
  size: 0.2,
  map: sprite,
  vertexColors: true,
  transparent: true,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})

const lineGeo = new THREE.BufferGeometry()
lineGeo.setAttribute('position', new THREE.BufferAttribute(linePos, 3))
lineGeo.setAttribute('color', new THREE.BufferAttribute(lineCol, 3))
const lineMat = new THREE.LineBasicMaterial({
  vertexColors: true,
  transparent: true,
  opacity: 0.2,
  depthWrite: false,
  blending: THREE.AdditiveBlending,
})

const network = new THREE.Group()
network.add(new THREE.Points(pointGeo, pointMat), new THREE.LineSegments(lineGeo, lineMat))

// Additive blending glows on dark but vanishes on paper, so light theme switches to normal blending.
watch(
  theme,
  (t) => {
    const additive = t === 'dark'
    pointMat.blending = lineMat.blending = additive ? THREE.AdditiveBlending : THREE.NormalBlending
    lineMat.opacity = additive ? 0.2 : 0.4
    pointMat.needsUpdate = lineMat.needsUpdate = true
  },
  { immediate: true },
)

/* ---------- Scroll-driven choreography ---------- */

// Where the rig sits (x, camera z) at each point of the page. Hero core sits right of the headline.
const keys = [
  { p: 0.0, x: 1.5, z: 9.5 },
  { p: 0.14, x: -2.8, z: 8.5 },
  { p: 0.32, x: 0.0, z: 6.2 },
  { p: 0.52, x: 2.4, z: 8.8 },
  { p: 0.72, x: -1.8, z: 7.2 },
  { p: 0.9, x: 0.0, z: 9.5 },
  { p: 1.0, x: 0.0, z: 6.8 },
]

const sample = (p: number) => {
  for (let i = 1; i < keys.length; i++) {
    if (p <= keys[i].p) {
      const a = keys[i - 1]
      const b = keys[i]
      const t = (p - a.p) / (b.p - a.p)
      const e = t * t * (3 - 2 * t)
      return { x: a.x + (b.x - a.x) * e, z: a.z + (b.z - a.z) * e }
    }
  }
  return keys[keys.length - 1]
}

const damp = (cur: number, target: number, rate: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-rate * dt))

let x = keys[0].x
let z = keys[0].z
let rotY = 0
let rotX = 0
let visible = 12
let last = performance.now()

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  const now = performance.now()
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now

  const rig = rigRef.value
  const cam = cameraRef.value
  if (!rig || !cam) return

  const p = sceneState.progress
  const k = sample(p)
  // On narrow screens the core sits behind the copy, so centre it instead of pushing it aside.
  const xScale = window.innerWidth < 900 ? 0.15 : 1
  x = damp(x, k.x * xScale, 2.4, dt)
  z = damp(z, k.z, 2.4, dt)

  rotY = damp(rotY, p * Math.PI * 2.4 + sceneState.pointerX * 0.35, 3, dt)
  rotX = damp(rotX, sceneState.pointerY * 0.2 + Math.sin(p * 6) * 0.12, 3, dt)

  rig.position.x = x
  rig.rotation.y = rotY + now * 0.00005
  rig.rotation.x = rotX
  cam.position.z = z

  // The network grows as the story advances: a handful of nodes in the hero, the whole team by the end.
  const target = HUBS + 5 + (N - HUBS - 5) * Math.min(1, p * 1.25)
  visible = damp(visible, target, 2, dt)
  const count = Math.max(2, Math.min(N, Math.floor(visible)))
  pointGeo.setDrawRange(0, count)
  lineGeo.setDrawRange(0, edgeEnd[count] * 2)
})

onBeforeUnmount(() => {
  pointGeo.dispose()
  lineGeo.dispose()
  pointMat.dispose()
  lineMat.dispose()
  sprite.dispose()
})
</script>
