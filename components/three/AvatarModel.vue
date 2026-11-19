<template>
  <primitive :object="root" />
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted } from 'vue'
import * as THREE from 'three'
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js'
import { MeshoptDecoder } from 'three/examples/jsm/libs/meshopt_decoder.module.js'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useLoop } from '@tresjs/core'
import { sceneState } from '../../composables/useScene'

/** Height of the avatar in scene units (the real model is ~1.75 m). */
const HEIGHT = 4.9
const FEET_Y = -2.5

const root = new THREE.Group() // moved by scroll
const holder = new THREE.Group() // yaw + entrance
root.add(holder)
root.visible = false

/* ---------- Studio lighting: warm key, ember + rose rims, cool fill ---------- */
const lights = new THREE.Group()
const hemi = new THREE.HemisphereLight('#ffe9dc', '#1a0f26', 0.9)
const key = new THREE.DirectionalLight('#fff1e6', 2.6)
key.position.set(-3, 5, 6)
const rimEmber = new THREE.DirectionalLight('#ff6a2b', 4.2)
rimEmber.position.set(5, 3, -4)
const rimRose = new THREE.DirectionalLight('#ff3d7f', 2.4)
rimRose.position.set(-5, 2, -4)
const fill = new THREE.DirectionalLight('#7aa7ff', 0.5)
fill.position.set(4, 0, 5)
lights.add(hemi, key, rimEmber, rimRose, fill)
root.add(lights)

/* ---------- The stage: a glowing ring + soft pool of light under the feet ---------- */
const pool = (() => {
  const c = document.createElement('canvas')
  c.width = c.height = 128
  const g = c.getContext('2d')!
  const grad = g.createRadialGradient(64, 64, 0, 64, 64, 64)
  grad.addColorStop(0, 'rgba(255,106,43,0.55)')
  grad.addColorStop(0.5, 'rgba(255,61,127,0.16)')
  grad.addColorStop(1, 'rgba(255,61,127,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 128, 128)
  return new THREE.CanvasTexture(c)
})()
const poolMesh = new THREE.Mesh(
  new THREE.PlaneGeometry(4.6, 4.6),
  new THREE.MeshBasicMaterial({ map: pool, transparent: true, depthWrite: false, blending: THREE.AdditiveBlending }),
)
poolMesh.rotation.x = -Math.PI / 2
poolMesh.position.y = FEET_Y + 0.01
const ring = new THREE.Mesh(
  new THREE.RingGeometry(1.28, 1.3, 96),
  new THREE.MeshBasicMaterial({ color: '#ff6a2b', transparent: true, opacity: 0.8, side: THREE.DoubleSide }),
)
ring.rotation.x = -Math.PI / 2
ring.position.y = FEET_Y + 0.02
root.add(poolMesh, ring)

/* ---------- Load the model ---------- */
interface Rig { head?: THREE.Object3D; neck?: THREE.Object3D; spine?: THREE.Object3D; hips?: THREE.Object3D; armL?: THREE.Object3D; armR?: THREE.Object3D }
const rig: Rig = {}
const rest = new Map<THREE.Object3D, THREE.Quaternion>()
let loaded = false
let loadedAt = 0
let disposed = false

const loader = new GLTFLoader()
loader.setMeshoptDecoder(MeshoptDecoder)
loader.load(
  '/models/avatar-opt.glb',
  (gltf) => {
    if (disposed) return
    const model = gltf.scene
    model.traverse((o) => {
      const mesh = o as THREE.SkinnedMesh
      if (mesh.isMesh) mesh.frustumCulled = false // quantized skin bounds are unreliable
    })

    // Normalise: feet on the floor, fixed height regardless of the export's units.
    const box = new THREE.Box3().setFromObject(model)
    const h = box.max.y - box.min.y || 1.75
    const s = HEIGHT / h
    model.scale.setScalar(s)
    model.position.y = FEET_Y - box.min.y * s
    holder.add(model)

    const get = (n: string) => model.getObjectByName(n) ?? undefined
    Object.assign(rig, {
      head: get('Head'), neck: get('Neck'), spine: get('Spine2'), hips: get('Hips'),
      armL: get('LeftArm'), armR: get('RightArm'),
    })

    // The export is a T-pose. Swing both arms down about each arm bone's local X axis;
    // the bones are mirrored, so both sides take the same sign. 1.45 rad leaves a natural gap at the sides.
    rig.armL?.rotateX(1.45)
    rig.armR?.rotateX(1.45)

    for (const b of Object.values(rig)) if (b) rest.set(b, b.quaternion.clone())
    loaded = true
    loadedAt = performance.now()
    root.visible = true
  },
  undefined,
  () => {
    /* The network still tells the story if the model fails to load. */
  },
)

/* ---------- Scroll anchors: where the avatar stands in each part of the page ---------- */
interface Stop { y: number; x: number; dy: number; yaw: number; scale: number }
let stops: Stop[] = [{ y: 0, x: 2.6, dy: 0, yaw: -0.3, scale: 1 }]

const measure = () => {
  const vh = window.innerHeight
  const story = document.getElementById('story')
  const narrow = window.innerWidth < 900
  if (!story) return
  const top = story.getBoundingClientRect().top + window.scrollY
  const bottom = top + story.offsetHeight
  const heroX = narrow ? 0.4 : 2.6
  const storyX = narrow ? 0 : -3.7
  stops = [
    { y: 0, x: heroX, dy: 0, yaw: -0.3, scale: 1 },
    { y: vh * 0.55, x: heroX, dy: 0, yaw: -0.3, scale: 1 },
    { y: Math.max(vh * 1.1, top - vh * 0.1), x: storyX, dy: -0.75, yaw: 0.5, scale: 0.78 },
    { y: Math.max(vh * 1.2, bottom - vh * 1.0), x: storyX, dy: -0.75, yaw: 0.4, scale: 0.78 },
    { y: Math.max(vh * 1.3, bottom - vh * 0.15), x: -9, dy: -0.75, yaw: 0.9, scale: 0.78 },
  ]
}

const sample = (y: number): Stop => {
  if (y <= stops[0].y) return stops[0]
  for (let i = 1; i < stops.length; i++) {
    if (y <= stops[i].y) {
      const a = stops[i - 1]
      const b = stops[i]
      const t = (y - a.y) / Math.max(1, b.y - a.y)
      const e = t * t * (3 - 2 * t)
      return { y, x: a.x + (b.x - a.x) * e, dy: a.dy + (b.dy - a.dy) * e, yaw: a.yaw + (b.yaw - a.yaw) * e, scale: a.scale + (b.scale - a.scale) * e }
    }
  }
  return stops[stops.length - 1]
}

const onRefresh = () => measure()
onMounted(() => {
  measure()
  ScrollTrigger.addEventListener('refresh', onRefresh)
})

/* ---------- Per-frame: scroll choreography + life ---------- */
const damp = (cur: number, target: number, rate: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-rate * dt))
let x = 9
let yaw = 0
let sc = 1
let dy = 0
let hx = 0
let hy = 0
let last = performance.now()
const tmp = new THREE.Quaternion()
const euler = new THREE.Euler()

const bump = (bone: THREE.Object3D | undefined, rx: number, ry: number, rz: number) => {
  const r = bone && rest.get(bone)
  if (!bone || !r) return
  tmp.setFromEuler(euler.set(rx, ry, rz))
  bone.quaternion.copy(r).multiply(tmp)
}

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  if (!loaded) return
  const now = performance.now()
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const t = now / 1000

  const k = sample(window.scrollY)
  x = damp(x, k.x, 3, dt)
  yaw = damp(yaw, k.yaw + sceneState.pointerX * 0.25, 3, dt)
  sc = damp(sc, k.scale, 3, dt)
  dy = damp(dy, k.dy, 3, dt)

  // Rise into place on first appearance.
  const intro = Math.min(1, (now - loadedAt) / 1400)
  const ease = 1 - Math.pow(1 - intro, 3)

  root.position.x = x
  root.position.y = dy + (1 - ease) * -1.2
  root.scale.setScalar(sc * (0.94 + 0.06 * ease))
  holder.rotation.y = yaw + (1 - ease) * 0.8

  // Breathing and a slow weight shift keep it from reading as a statue.
  const breath = Math.sin(t * 1.5)
  bump(rig.spine, breath * 0.012, 0, 0)
  bump(rig.hips, 0, Math.sin(t * 0.5) * 0.03, Math.sin(t * 0.6) * 0.012)

  // Head and neck follow the pointer.
  hx = damp(hx, sceneState.pointerX, 5, dt)
  hy = damp(hy, sceneState.pointerY, 5, dt)
  bump(rig.neck, hy * 0.12, hx * 0.25, 0)
  bump(rig.head, hy * 0.14 + Math.sin(t * 0.7) * 0.01, hx * 0.3, 0)

  ring.rotation.z = t * 0.2
  ;(ring.material as THREE.MeshBasicMaterial).opacity = 0.6 + Math.sin(t * 1.6) * 0.15
})

onBeforeUnmount(() => {
  disposed = true
  ScrollTrigger.removeEventListener('refresh', onRefresh)
  root.traverse((o) => {
    const m = o as THREE.Mesh
    if (m.isMesh) {
      m.geometry?.dispose()
      const mats = Array.isArray(m.material) ? m.material : [m.material]
      mats.forEach((mat) => mat?.dispose())
    }
  })
  pool.dispose()
})
</script>
