<script setup>
import { computed, ref } from 'vue'
import { isLight, theme, themePreference, setThemePreference } from '../theme'

// Pill-shaped Auto / Light / Dark selector with a sliding thumb. Behaves as a
// radio group: click a segment, or use the arrow keys when it has focus.
const OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
]

const selectedIndex = computed(() => OPTIONS.findIndex(o => o.value === themePreference.value))

const optionTitle = (option) => option.value === 'auto'
  ? `Auto: light by day, dark at night (now ${theme.value === 'light' ? 'Light' : 'Dark'})`
  : `${option.label} mode`

const buttonRefs = ref([])

const onKeydown = (event) => {
  const step = { ArrowRight: 1, ArrowDown: 1, ArrowLeft: -1, ArrowUp: -1 }[event.key]
  if (!step) return
  event.preventDefault()
  const next = (selectedIndex.value + step + OPTIONS.length) % OPTIONS.length
  setThemePreference(OPTIONS[next].value)
  buttonRefs.value[next]?.focus()
}
</script>

<template>
  <div role="radiogroup" aria-label="Color theme" @keydown="onKeydown"
    class="relative inline-flex p-1 rounded-full border transition-colors duration-300"
    :class="isLight ? 'bg-black/5 border-black/10' : 'bg-white/5 border-white/10'">
    <!-- Sliding thumb under the selected option -->
    <span aria-hidden="true"
      class="absolute top-1 bottom-1 left-1 w-7 sm:w-8 rounded-full bg-[#2D5C6F] shadow-md transition-transform duration-300 ease-out"
      :style="{ transform: `translateX(${selectedIndex * 100}%)` }" />

    <button v-for="(option, i) in OPTIONS" :key="option.value"
      :ref="el => { buttonRefs[i] = el }"
      type="button" role="radio"
      :aria-checked="themePreference === option.value"
      :tabindex="themePreference === option.value ? 0 : -1"
      :title="optionTitle(option)"
      @click="setThemePreference(option.value)"
      class="relative z-10 flex items-center justify-center w-7 h-7 sm:w-8 rounded-full bg-transparent border-none cursor-pointer transition-colors duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5C6F] focus-visible:ring-offset-1"
      :class="themePreference === option.value
        ? 'text-white'
        : (isLight ? 'text-[#141414]/60 hover:text-[#141414]' : 'text-white/60 hover:text-white')">
      <span class="sr-only">{{ option.label }}</span>
      <!-- Auto: sun-moon -->
      <svg v-if="option.value === 'auto'" aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 8a2.83 2.83 0 0 0 4 4 4 4 0 1 1-4-4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M6.3 17.7l-1.4 1.4M19.1 4.9l-1.4 1.4"/></svg>
      <!-- Light: sun -->
      <svg v-else-if="option.value === 'light'" aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
      <!-- Dark: moon -->
      <svg v-else aria-hidden="true" width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
    </button>
  </div>
</template>
