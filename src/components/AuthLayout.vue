<script setup>
import { computed } from 'vue'
import LogoFull from '../assets/LOGO.png'
import LogoFullDark from '../assets/LOGO-FORDARKMODE.PNG'
import { useRouter } from 'vue-router'
import { isLight, pageBg, mutedText, lightSurfaceText, lightMutedText, lightAccentText } from '../theme'

defineProps({
  title: String,
  subtitle: String
})

const router = useRouter()

// The light-mode logo has dark navy text baked in, so it only reads on the
// light page background; swap to the white-text variant when dark.
const logo = computed(() => isLight.value ? LogoFull : LogoFullDark)
</script>

<template>
  <div class="font-['Kanit'] min-h-screen selection:bg-[#2D5C6F]/30 relative overflow-hidden flex flex-col items-center justify-center px-6 py-12 transition-colors duration-300" :class="pageBg">
    <!-- soft background glow -->
    <div class="pointer-events-none absolute -top-40 left-1/2 -translate-x-1/2 w-[700px] h-[700px] rounded-full bg-[#2D5C6F]/10 blur-3xl"></div>

    <a href="#" @click.prevent="router.push('/login')" class="relative flex items-center no-underline mb-5">
      <img :src="logo" alt="Scanship" class="h-12 w-auto object-contain" />
    </a>

    <!-- Card stays a soft off-white regardless of the site theme -->
    <div class="relative w-full max-w-[440px] rounded-[24px] p-8 sm:p-10 shadow-2xl border bg-[#E1F1F0] border-black/10" :class="lightSurfaceText">
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
