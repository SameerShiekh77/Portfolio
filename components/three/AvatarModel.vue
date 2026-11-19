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
/** Local height of the face, used to frame the close-up. */
const FACE_Y = FEET_Y + HEIGHT * 0.93
/** The avatar camera is fixed: fov 40 at z = 9, so the half-height of the view is ~3.28 units. */
const CAM_Z = 9
const CAM_FOV = 40

const root = new THREE.Group() // moved by scroll
const holder = new THREE.Group() // yaw + entrance
root.add(holder)
root.visible = false

/* ---------- Studio lighting ---------- */
const lights = new THREE.Group()
const hemi = new THREE.HemisphereLight('#ffe9dc', '#1a0f26', 0.9)
const key = new THREE.DirectionalLight('#fff1e6', 2.6)
key.position.set(-3, 5, 6)
const rimA = new THREE.DirectionalLight('#ff6a2b', 4.2)
rimA.position.set(5, 3, -4)
const rimB = new THREE.DirectionalLight('#ff3d7f', 2.4)
rimB.position.set(-5, 2, -4)
const fill = new THREE.DirectionalLight('#7aa7ff', 0.5)
fill.position.set(4, 0, 5)
lights.add(hemi, key, rimA, rimB, fill)
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

/* ---------- Moods ---------- */
// A mood is a pose plus a posture and a light colour. The page blends between them as you scroll.
// Arm angles: ax lowers the arm (same sign both sides, the bones are mirrored); az lifts the elbow
// forward and ay twists the upper arm (both flip per side); fz bends the elbow.
interface Mood {
  ax: number; az: number; ay: number; fz: number
  lean: number // spine forward/back
  pitch: number // head up/down
  tilt: number // head roll
  rimA: THREE.Color
  rimB: THREE.Color
}
const MOODS: Record<'confident' | 'thoughtful', Mood> = {
  // Hero: tall, chest open, arms relaxed with a slight elbow bend, chin up. Hot ember light.
  confident: { ax: 1.32, az: 0.04, ay: 0, fz: 0.22, lean: -0.035, pitch: 0.05, tilt: 0, rimA: new THREE.Color('#ff6a2b'), rimB: new THREE.Color('#ff3d7f') },
  // Story: hands loosely together, head down and tilted, a little forward. Calmer gold and violet light.
  thoughtful: { ax: 1.2, az: 0.15, ay: 0.9, fz: 1.6, lean: 0.05, pitch: -0.1, tilt: 0.09, rimA: new THREE.Color('#ffb62e'), rimB: new THREE.Color('#9b6bff') },
}

/* ---------- Load the model ---------- */
interface Bones {
  head?: THREE.Object3D; neck?: THREE.Object3D; spine?: THREE.Object3D; hips?: THREE.Object3D
  armL?: THREE.Object3D; armR?: THREE.Object3D; foreL?: THREE.Object3D; foreR?: THREE.Object3D
}
const bones: Bones = {}
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
    Object.assign(bones, {
      head: get('Head'), neck: get('Neck'), spine: get('Spine2'), hips: get('Hips'),
      armL: get('LeftArm'), armR: get('RightArm'), foreL: get('LeftForeArm'), foreR: get('RightForeArm'),
    })
    for (const b of Object.values(bones)) if (b) rest.set(b, b.quaternion.clone())

    loaded = true
    loadedAt = performance.now()
    root.visible = true
  },
  undefined,
  () => {
    /* The page still works without the avatar if the model fails to load. */
  },
)

/* ---------- Scroll anchors ---------- */
// The avatar only lives in the first two sections: a face close-up in the hero, then full body in the
// story, then it leaves. xf is a fraction of the half-width of the view, so it is right at any aspect ratio.
// dy is chosen so the face sits at `face` units from the view centre once scaled.
interface Stop { y: number; xf: number; scale: number; face: number | null; dy: number; yaw: number; mood: number }
let stops: Stop[] = [{ y: 0, xf: 0.44, scale: 2.3, face: 0.3, dy: 0, yaw: -0.2, mood: 0 }]

const measure = () => {
  const vh = window.innerHeight
  const wide = window.innerWidth >= 1024
  const story = document.getElementById('story')
  if (!story) return
  const top = story.getBoundingClientRect().top + window.scrollY
  const bottom = top + story.offsetHeight

  if (!wide) {
    // Phones and tablets: full body behind the hero copy, then away.
    stops = [
      { y: 0, xf: 0.1, scale: 0.8, face: null, dy: 0, yaw: -0.2, mood: 0 },
      { y: vh * 0.6, xf: 0.1, scale: 0.8, face: null, dy: 0, yaw: -0.2, mood: 0 },
      { y: vh * 1.1, xf: 1.7, scale: 0.8, face: null, dy: 0, yaw: 0.6, mood: 1 },
    ]
    return
  }

  stops = [
    // Hero: big face close-up, chest and shoulders in frame.
    { y: 0, xf: 0.44, scale: 2.3, face: 0.3, dy: 0, yaw: -0.2, mood: 0 },
    { y: vh * 0.2, xf: 0.44, scale: 2.3, face: 0.3, dy: 0, yaw: -0.2, mood: 0 },
    // Pull back to full body, still confident.
    { y: vh * 0.85, xf: 0.4, scale: 0.98, face: null, dy: 0, yaw: -0.3, mood: 0 },
    // Cross to the left for the story and turn thoughtful.
    { y: Math.max(vh * 1.2, top - vh * 0.1), xf: -0.56, scale: 0.68, face: null, dy: -0.75, yaw: 0.5, mood: 1 },
    { y: Math.max(vh * 1.3, bottom - vh * 1.3), xf: -0.56, scale: 0.68, face: null, dy: -0.75, yaw: 0.4, mood: 1 },
    // Then walk away; nothing stays on screen after the second section.
    { y: Math.max(vh * 1.4, bottom - vh * 0.5), xf: -1.7, scale: 0.68, face: null, dy: -0.75, yaw: 0.95, mood: 1 },
  ]
}

const sample = (y: number): Stop => {
  if (y <= stops[0].y) return { ...stops[0], dy: stops[0].face === null ? stops[0].dy : stops[0].face - FACE_Y * stops[0].scale }
  for (let i = 1; i < stops.length; i++) {
    if (y <= stops[i].y) {
      const a = stops[i - 1]
      const b = stops[i]
      const t = (y - a.y) / Math.max(1, b.y - a.y)
      const e = t * t * (3 - 2 * t)
      const m = (p: number, q: number) => p + (q - p) * e
      // Face-framed stops carry their own dy; full-body stops use the plain one.
      const dyA = a.face === null ? a.dy : a.face - FACE_Y * a.scale
      const dyB = b.face === null ? b.dy : b.face - FACE_Y * b.scale
      return { y, xf: m(a.xf, b.xf), scale: m(a.scale, b.scale), face: null, dy: m(dyA, dyB), yaw: m(a.yaw, b.yaw), mood: m(a.mood, b.mood) }
    }
  }
  const last = stops[stops.length - 1]
  return { ...last, dy: last.face === null ? last.dy : last.face - FACE_Y * last.scale }
}

const onRefresh = () => measure()
onMounted(() => {
  measure()
  ScrollTrigger.addEventListener('refresh', onRefresh)
})

/* ---------- Per-frame ---------- */
const damp = (cur: number, target: number, rate: number, dt: number) => cur + (target - cur) * (1 - Math.exp(-rate * dt))
const lerp = (a: number, b: number, t: number) => a + (b - a) * t
const halfWidth = () => Math.tan(THREE.MathUtils.degToRad(CAM_FOV / 2)) * CAM_Z * (window.innerWidth / window.innerHeight)

let x = 9
let yaw = 0
let sc = 2.3
let dy = 0
let mood = 0
let hx = 0
let hy = 0
let last = performance.now()

const AX = new THREE.Vector3(1, 0, 0)
const AY = new THREE.Vector3(0, 1, 0)
const AZ = new THREE.Vector3(0, 0, 1)
const q1 = new THREE.Quaternion()
const q2 = new THREE.Quaternion()
const q3 = new THREE.Quaternion()
const euler = new THREE.Euler()

/** Rest rotation, then an Euler offset. */
const offset = (bone: THREE.Object3D | undefined, rx: number, ry: number, rz: number) => {
  const r = bone && rest.get(bone)
  if (!bone || !r) return
  q1.setFromEuler(euler.set(rx, ry, rz))
  bone.quaternion.copy(r).multiply(q1)
}

/** Rest rotation, then successive rotations about the bone's local X, Z and Y (same order the pose was tuned in). */
const articulate = (bone: THREE.Object3D | undefined, rx: number, rz: number, ry: number) => {
  const r = bone && rest.get(bone)
  if (!bone || !r) return
  q1.setFromAxisAngle(AX, rx)
  q2.setFromAxisAngle(AZ, rz)
  q3.setFromAxisAngle(AY, ry)
  bone.quaternion.copy(r).multiply(q1).multiply(q2).multiply(q3)
}

const { onBeforeRender } = useLoop()
onBeforeRender(() => {
  if (!loaded) return
  const now = performance.now()
  const dt = Math.min((now - last) / 1000, 0.05)
  last = now
  const t = now / 1000

  const k = sample(window.scrollY)
  // Past the story the avatar is gone. If you got there by jumping (a nav click, a reload mid-page),
  // snap it away instead of letting it glide across the screen on the way out.
  const pastStory = window.scrollY > stops[stops.length - 1].y
  if (pastStory) {
    x = k.xf * halfWidth()
    sc = k.scale
    dy = k.dy
    mood = k.mood
  }
  x = damp(x, k.xf * halfWidth(), 3, dt)
  sc = damp(sc, k.scale, 3, dt)
  dy = damp(dy, k.dy, 3, dt)
  mood = damp(mood, k.mood, 3, dt)
  yaw = damp(yaw, k.yaw + sceneState.pointerX * 0.2, 3, dt)

  // Off screen: stop drawing the model entirely.
  root.visible = x > -halfWidth() * 1.45

  // Rise into place on first appearance.
  const intro = Math.min(1, (now - loadedAt) / 1400)
  const ease = 1 - Math.pow(1 - intro, 3)

  root.position.x = x
  root.position.y = dy + (1 - ease) * -1.4
  root.scale.setScalar(sc * (0.95 + 0.05 * ease))
  holder.rotation.y = yaw + (1 - ease) * 0.7

  // Blend the two moods.
  const A = MOODS.confident
  const B = MOODS.thoughtful
  const ax = lerp(A.ax, B.ax, mood)
  const az = lerp(A.az, B.az, mood)
  const ay = lerp(A.ay, B.ay, mood)
  const fz = lerp(A.fz, B.fz, mood)
  rimA.color.lerpColors(A.rimA, B.rimA, mood)
  rimB.color.lerpColors(A.rimB, B.rimB, mood)

  // Arms. Y and Z flip per side because the bones are mirrored.
  articulate(bones.armL, ax, az, ay)
  articulate(bones.armR, ax, -az, -ay)
  const sway = Math.sin(t * 0.9) * 0.03
  offset(bones.foreL, 0, 0, fz + sway)
  offset(bones.foreR, 0, 0, -(fz + sway))

  // Breathing (calmer in the thoughtful mood) and a slow weight shift.
  const breath = Math.sin(t * lerp(1.7, 1.2, mood))
  offset(bones.spine, lerp(A.lean, B.lean, mood) + breath * 0.012, 0, 0)
  offset(bones.hips, 0, Math.sin(t * 0.5) * 0.03, Math.sin(t * 0.6) * 0.012)

  // The face follows the pointer; the effect is strongest in the hero close-up.
  const closeness = THREE.MathUtils.clamp((sc - 0.9) / 1.4, 0, 1)
  const gain = 1 + closeness * 0.9
  hx = damp(hx, sceneState.pointerX, 5, dt)
  hy = damp(hy, sceneState.pointerY, 5, dt)
  const pitch = lerp(A.pitch, B.pitch, mood)
  const tilt = lerp(A.tilt, B.tilt, mood)
  offset(bones.neck, hy * 0.07 * gain + pitch * 0.4, hx * 0.13 * gain, tilt * 0.4)
  offset(bones.head, hy * 0.09 * gain + pitch * 0.6 + Math.sin(t * 0.7) * 0.01, hx * 0.17 * gain, tilt * 0.6)

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
