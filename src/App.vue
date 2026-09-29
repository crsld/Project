<script setup>
import { isLight } from './theme'
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
