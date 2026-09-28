<script setup>
import Logo from '../assets/Company_Logo.png'
import { useRouter } from 'vue-router'
import { pageBg, mutedText, lightSurfaceText, lightMutedText, lightAccentText } from '../theme'

defineProps({
  title: String,
  subtitle: String
})

const router = useRouter()
</script>

<template>
  <div class="font-['Kanit'] min-h-screen selection:bg-[#4da8f0]/30 relative overflow-hidden flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300" :class="pageBg">
    <!-- soft background glow -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#4da8f0]/10 blur-3xl"></div>

    <a href="#" @click.prevent="router.push('/login')" class="relative flex items-center gap-3 mb-10 no-underline">
      <img :src="Logo" alt="Scanship" class="h-10 w-10 object-contain rounded-full" />
      <span class="font-bold tracking-tight text-2xl">Scanship</span>
    </a>

    <!-- Card stays solid white regardless of the site theme -->
    <div class="relative w-full max-w-[440px] rounded-[24px] p-8 sm:p-10 shadow-2xl border bg-white border-black/10" :class="lightSurfaceText">
      <p class="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3 text-center" :class="lightAccentText">Maritime System Modules</p>
      <h1 class="text-[clamp(1.8rem,5vw,2.2rem)] font-black leading-tight tracking-tight text-center mb-2">
        {{ title }}
      </h1>
      <p class="text-[0.95rem] text-center mb-8" :class="lightMutedText">{{ subtitle }}</p>

      <slot />
    </div>

    <p class="relative mt-8 text-sm text-center" :class="mutedText">
      <slot name="footer" />
    </p>
  </div>
</template>
