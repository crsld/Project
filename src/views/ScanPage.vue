<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import jsQR from 'jsqr'
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { acceptQr } from '../auth'

const router = useRouter()
const route = useRoute()

const videoEl = ref(null)
const fileInput = ref(null)
const status = ref('idle') // idle | starting | scanning | checking | success
const error = ref('')

let stream = null
let rafId = 0
let lastScan = 0
let canvas = null
let ctx = null

const busy = computed(() => ['starting', 'checking', 'success'].includes(status.value))

const stopCamera = () => {
  cancelAnimationFrame(rafId)
  rafId = 0
  stream?.getTracks().forEach(t => t.stop())
  stream = null
  if (videoEl.value) videoEl.value.srcObject = null
  if (status.value === 'scanning' || status.value === 'starting') status.value = 'idle'
}

onBeforeUnmount(() => {
  stopCamera()
  clearTimeout(redirectTimer)
})

let redirectTimer = 0
const goToLogin = () => {
  const redirect = typeof route.query.redirect === 'string' && route.query.redirect.startsWith('/') && !route.query.redirect.startsWith('//')
    ? route.query.redirect
    : null
  router.replace({ path: '/login', query: redirect ? { redirect } : {} })
}

// Returns true when the QR code was accepted.
const handleResult = (text) => {
  if (!acceptQr(text)) {
    error.value = "That QR code isn't a valid Scanship code. Please try another one."
    return false
  }
  error.value = ''
  stopCamera()
  status.value = 'success'
  redirectTimer = setTimeout(goToLogin, 1000)
  return true
}

// ── Camera ──
const startCamera = async () => {
  error.value = ''
  if (!navigator.mediaDevices?.getUserMedia) {
    error.value = window.isSecureContext
      ? 'Camera is not supported on this device. Upload a QR image instead.'
      : 'Camera access needs a secure (HTTPS) connection. Upload a QR image instead.'
    return
  }

  status.value = 'starting'
  try {
    stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: { ideal: 'environment' } },
      audio: false
    })
  } catch (e) {
    status.value = 'idle'
    error.value = e?.name === 'NotAllowedError'
      ? 'Camera permission was denied. Allow camera access or upload a QR image instead.'
      : e?.name === 'NotFoundError'
        ? 'No camera found on this device. Upload a QR image instead.'
        : 'Could not start the camera. Upload a QR image instead.'
    return
  }

  const video = videoEl.value
  video.srcObject = stream
  try {
    await video.play()
  } catch {
    // autoplay quirks: frames will still arrive once the stream starts
  }
  canvas = document.createElement('canvas')
  ctx = canvas.getContext('2d', { willReadFrequently: true })
  status.value = 'scanning'
  rafId = requestAnimationFrame(tick)
}

const tick = (time) => {
  rafId = requestAnimationFrame(tick)
  const video = videoEl.value
  if (!video || video.readyState < 2 || !video.videoWidth || time - lastScan < 120) return
  lastScan = time

  const scale = Math.min(1, 640 / video.videoWidth)
  canvas.width = Math.round(video.videoWidth * scale)
  canvas.height = Math.round(video.videoHeight * scale)
  ctx.drawImage(video, 0, 0, canvas.width, canvas.height)
  const frame = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const code = jsQR(frame.data, frame.width, frame.height, { inversionAttempts: 'dontInvert' })
  if (code?.data) handleResult(code.data)
}

// ── Upload ──
const loadImage = (file) => new Promise((resolve, reject) => {
  const url = URL.createObjectURL(file)
  const img = new Image()
  img.onload = () => { URL.revokeObjectURL(url); resolve(img) }
  img.onerror = () => { URL.revokeObjectURL(url); reject(new Error('load')) }
  img.src = url
})

const decodeImage = async (file) => {
  const img = await loadImage(file)
  const longest = Math.max(img.naturalWidth, img.naturalHeight)
  // Try a large and a small version: large photos with a small code often decode better scaled down.
  for (const target of [1200, 600]) {
    const scale = Math.min(1, target / longest)
    const c = document.createElement('canvas')
    c.width = Math.max(1, Math.round(img.naturalWidth * scale))
    c.height = Math.max(1, Math.round(img.naturalHeight * scale))
    const cx = c.getContext('2d', { willReadFrequently: true })
    cx.drawImage(img, 0, 0, c.width, c.height)
    const data = cx.getImageData(0, 0, c.width, c.height)
    const code = jsQR(data.data, data.width, data.height, { inversionAttempts: 'attemptBoth' })
    if (code?.data) return code.data
  }
  return null
}

const onFile = async (e) => {
  const file = e.target.files?.[0]
  e.target.value = ''
  if (!file) return
  error.value = ''
  if (!file.type.startsWith('image/')) {
    error.value = 'Please choose an image file.'
    return
  }

  stopCamera()
  status.value = 'checking'
  try {
    const text = await decodeImage(file)
    if (!text) {
      error.value = 'No QR code was found in that image. Try a clearer, well-lit picture.'
    } else {
      handleResult(text)
    }
  } catch {
    error.value = 'Could not read that image. Please try another file.'
  } finally {
    if (status.value === 'checking') status.value = 'idle'
  }
}
</script>

<template>
  <AuthLayout title="Scan QR Code" subtitle="Scan or upload your Scanship QR code to continue.">
    <!-- Viewport -->
    <div class="relative aspect-square w-full rounded-2xl overflow-hidden border border-white/10 bg-black/40">
      <video v-show="status === 'scanning'" ref="videoEl" playsinline muted
        class="absolute inset-0 w-full h-full object-cover"></video>

      <!-- Idle / starting / checking -->
      <div v-if="status !== 'scanning' && status !== 'success'"
        class="absolute inset-0 flex flex-col items-center justify-center gap-4 px-6 text-center text-white/60">
        <svg width="72" height="72" viewBox="0 0 24 24" fill="none" stroke="#4da8f0" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/>
          <line x1="14" y1="14" x2="14" y2="14.01"/><line x1="18" y1="14" x2="21" y2="14"/><line x1="14" y1="18" x2="14" y2="21"/><line x1="17.5" y1="17.5" x2="21" y2="17.5"/><line x1="21" y1="21" x2="21" y2="21.01"/>
        </svg>
        <p class="text-[0.9rem]">
          <template v-if="status === 'starting'">Starting camera…</template>
          <template v-else-if="status === 'checking'">Reading image…</template>
          <template v-else>Point your camera at the QR code, or upload an image of it.</template>
        </p>
      </div>

      <!-- Scanning overlay -->
      <template v-if="status === 'scanning'">
        <div class="absolute top-6 left-6 w-10 h-10 border-t-4 border-l-4 border-[#4da8f0] rounded-tl-xl"></div>
        <div class="absolute top-6 right-6 w-10 h-10 border-t-4 border-r-4 border-[#4da8f0] rounded-tr-xl"></div>
        <div class="absolute bottom-6 left-6 w-10 h-10 border-b-4 border-l-4 border-[#4da8f0] rounded-bl-xl"></div>
        <div class="absolute bottom-6 right-6 w-10 h-10 border-b-4 border-r-4 border-[#4da8f0] rounded-br-xl"></div>
        <div class="scan-line absolute left-6 right-6 h-0.5 bg-[#4da8f0] shadow-[0_0_12px_rgba(77,168,240,0.9)]"></div>
      </template>

      <!-- Success -->
      <div v-if="status === 'success'"
        class="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-[#34d399]/10 text-center px-6" role="status">
        <span class="w-16 h-16 rounded-full bg-[#34d399] flex items-center justify-center">
          <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#04241a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
        </span>
        <p class="text-[1.1rem] font-bold text-white">QR code recognized</p>
        <p class="text-[0.85rem] text-white/60">Taking you to log in…</p>
      </div>
    </div>

    <!-- Actions -->
    <div class="mt-6 flex flex-col gap-3">
      <button type="button" @click="status === 'scanning' ? stopCamera() : startCamera()" :disabled="busy"
        class="w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0] text-white rounded-full font-bold transition-all cursor-pointer border-none flex items-center justify-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M23 19a2 2 0 01-2 2H3a2 2 0 01-2-2V8a2 2 0 012-2h4l2-3h6l2 3h4a2 2 0 012 2z"/><circle cx="12" cy="13" r="4"/></svg>
        {{ status === 'starting' ? 'Starting camera…' : status === 'scanning' ? 'Stop Camera' : 'Scan with Camera' }}
      </button>

      <div class="flex items-center gap-3 text-white/30 text-xs uppercase tracking-widest">
        <span class="h-px flex-1 bg-white/10"></span>or<span class="h-px flex-1 bg-white/10"></span>
      </div>

      <button type="button" @click="fileInput.click()" :disabled="busy"
        class="w-full py-4 bg-white/5 hover:bg-white/10 disabled:opacity-50 disabled:cursor-not-allowed text-white border border-white/10 rounded-full font-bold backdrop-blur-md transition-all cursor-pointer flex items-center justify-center gap-2">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/></svg>
        Upload QR Image
      </button>
      <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="onFile" />
    </div>

    <p v-if="error" role="alert" class="mt-5 text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{{ error }}</p>
  </AuthLayout>
</template>

<style scoped>
.scan-line {
  animation: scan 2.2s ease-in-out infinite alternate;
}
@keyframes scan {
  from { top: 12%; }
  to { top: 88%; }
}
</style>
