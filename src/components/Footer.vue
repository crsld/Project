<script setup>
import { isLight } from '../theme'
</script>
<template>
  <footer class="border-t pt-2 pb-8 font-['Kanit'] transition-colors duration-300" :class="isLight ? 'bg-white border-black/10' : 'border-white/40'">
    <div class="max-w-[1200px] mx-auto px-2 pt-4 flex flex-col md:row flex-nowrap md:flex-row items-center justify-between gap-4">
      <span class="font-['Kanit'] text-[0.8rem]">© 2026 Scanship. All rights reserved.</span>
    </div>
  </footer>
</template>
