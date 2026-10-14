<script setup>
import { useTheme } from './theme'

// Starts the live time-of-day theme switching for the whole app.
const { isLight } = useTheme()
</script>

<template>
  <div class="font-['Kanit'] min-h-screen transition-colors duration-300" :class="isLight ? 'bg-[#E1F1F0] text-[#141414]' : 'bg-[#002E4B] text-white'">
    <router-view />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
