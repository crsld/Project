<script setup>
import { isLight } from './theme'
</script>

<template>
  <div class="font-['Kanit'] min-h-screen transition-colors duration-300" :class="isLight ? 'bg-[#eef2f6] text-[#0b1a2b]' : 'bg-[#061120] text-white'">
    <router-view />
  </div>
</template>

<style>
html {
  scroll-behavior: smooth;
}
</style>
