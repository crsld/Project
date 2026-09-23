<script setup>
import Logo from '../assets/Company_Logo.png'
import { useRouter } from 'vue-router'

defineProps({
  title: String,
  subtitle: String
})

const router = useRouter()
</script>

<template>
  <div class="font-['Trebuchet_MS'] min-h-screen bg-[#040f1e] text-white selection:bg-[#4da8f0]/30 relative overflow-hidden flex flex-col items-center justify-center px-6 py-12">
    <!-- soft background glow -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#4da8f0]/10 blur-3xl"></div>

    <a href="#" @click.prevent="router.push('/login')" class="relative flex items-center gap-3 mb-10 no-underline">
      <img :src="Logo" alt="Scanship" class="h-10 w-10 object-contain rounded-full" />
      <span class="font-bold tracking-tight text-2xl text-white">Scanship</span>
    </a>

    <div class="relative w-full max-w-[440px] bg-white/[0.03] border border-white/[0.08] rounded-[24px] p-8 sm:p-10 backdrop-blur-md shadow-2xl">
      <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#b5f4ff] uppercase mb-3 text-center">Scanship Wastewater System Modules</p>
      <h1 class="text-[clamp(1.8rem,5vw,2.2rem)] font-black leading-tight tracking-tight text-center mb-2">
        {{ title }}
      </h1>
      <p class="text-white/70 text-[0.95rem] text-center mb-8">{{ subtitle }}</p>

      <slot />
    </div>

    <p class="relative mt-8 text-sm text-white/70 text-center">
      <slot name="footer" />
    </p>
  </div>
</template>
