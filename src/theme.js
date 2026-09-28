import { ref, computed, watchEffect } from 'vue'

// Site-wide light / dark theme, shared by the navbar and every page background.
// Defaults to time-of-day (light 6am-6pm, dark otherwise) unless the visitor
// has already picked a preference, which then sticks across visits.
const THEME_KEY = 'scanship_theme'

const timeBasedTheme = () => {
  const hour = new Date().getHours()
  return (hour >= 6 && hour < 18) ? 'light' : 'dark'
}

export const theme = ref(localStorage.getItem(THEME_KEY) || timeBasedTheme())

export const isLight = computed(() => theme.value === 'light')

export const toggleTheme = () => {
  theme.value = isLight.value ? 'dark' : 'light'
  localStorage.setItem(THEME_KEY, theme.value)
}

watchEffect(() => {
  document.documentElement.dataset.theme = theme.value
})

// Shared class tokens so every page/component switches consistently instead
// of hand-picking colors per element.
export const pageBg = computed(() => isLight.value ? 'bg-[#eef2f6] text-[#0b1a2b]' : 'bg-[#040f1e] text-white')
export const cardClasses = computed(() => isLight.value
  ? 'bg-black/[0.03] border-black/[0.08]'
  : 'bg-white/[0.03] border-white/[0.08]')
export const mutedText = computed(() => isLight.value ? 'text-[#0b1a2b]/70' : 'text-white/70')
export const subtleText = computed(() => isLight.value ? 'text-[#0b1a2b]/40' : 'text-white/40')
export const inputClasses = computed(() => isLight.value
  ? 'bg-black/5 border-black/10 text-[#0b1a2b] placeholder-black/30 focus:bg-black/[0.07]'
  : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:bg-white/[0.07]')
export const ghostButtonClasses = computed(() => isLight.value
  ? 'bg-black/5 hover:bg-black/10 text-[#0b1a2b] border-black/10'
  : 'bg-white/5 hover:bg-white/10 text-white border-white/10')
export const dangerClasses = computed(() => isLight.value
  ? 'text-red-700 bg-red-500/10 border-red-500/30'
  : 'text-red-300 bg-red-500/10 border-red-500/20')
export const successClasses = computed(() => isLight.value
  ? 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30'
  : 'text-emerald-300 bg-emerald-500/10 border-emerald-500/20')
export const noticeClasses = computed(() => isLight.value
  ? 'text-amber-700 bg-amber-500/10 border-amber-500/30'
  : 'text-amber-200 bg-amber-500/10 border-amber-500/20')
// The #b5f4ff light-cyan accent (section eyebrows, "Expected:" labels) reads
// fine on the dark navy background but washes out on the light one.
export const accentText = computed(() => isLight.value ? 'text-[#0f6fd1]' : 'text-[#b5f4ff]')

// Fixed "light surface" tokens (not theme-reactive) for the auth card, which
// stays solid white regardless of the site-wide theme toggle.
export const lightSurfaceText = 'text-[#0b1a2b]'
export const lightMutedText = 'text-[#0b1a2b]/70'
export const lightSubtleText = 'text-[#0b1a2b]/40'
export const lightInputClasses = 'bg-black/5 border-black/10 text-[#0b1a2b] placeholder-black/30 focus:bg-black/[0.07]'
export const lightGhostButtonClasses = 'bg-black/5 hover:bg-black/10 text-[#0b1a2b] border-black/10'
export const lightDangerClasses = 'text-red-700 bg-red-500/10 border-red-500/30'
export const lightSuccessClasses = 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30'
export const lightNoticeClasses = 'text-amber-700 bg-amber-500/10 border-amber-500/30'
export const lightAccentText = 'text-[#0f6fd1]'
