<script setup>
import LogoFullDark from '../assets/LOGO-FORDARKMODE.PNG'
import BgPerModule from '../assets/BG_PerModule.jpg'
import { useRouter } from 'vue-router'
import { lightSurfaceText, lightMutedText, lightAccentText } from '../theme'

defineProps({
  title: String,
  subtitle: String
})

const router = useRouter()
</script>

<template>
  <div class="min-h-screen relative overflow-hidden flex flex-col items-center justify-center px-6 py-12 font-['Kanit'] selection:bg-[#2D5C6F]/30">
    <!-- Full-bleed background image -->
    <img :src="BgPerModule" alt="" class="absolute inset-0 w-full h-full object-cover" />
    <div class="absolute inset-0 bg-gradient-to-b from-[#002E4B]/90 via-[#002E4B]/70 to-[#002E4B]/95"></div>

    <a href="#" @click.prevent="router.push('/')" class="relative flex items-center no-underline mb-3">
      <img :src="LogoFullDark" alt="Scanship" class="h-12 w-auto object-contain" />
    </a>

    <!-- Card stays a light surface regardless of the site theme -->
    <div class="relative w-full max-w-[440px] rounded-[24px] p-8 sm:p-10 shadow-2xl border bg-[#E1F1F0] border-black/10" :class="lightSurfaceText">
      <p class="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3 text-center" :class="lightAccentText">Maritime System Modules</p>
      <h1 class="text-[clamp(1.8rem,5vw,2.2rem)] font-black leading-tight tracking-tight text-center mb-2">
        {{ title }}
      </h1>
      <p class="text-[0.95rem] text-center mb-8" :class="lightMutedText">{{ subtitle }}</p>

      <slot />
    </div>

    <p class="relative mt-8 text-sm text-center text-white/80">
      <slot name="footer" />
    </p>
  </div>
</template>
