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

// Official brand palette (strictly followed; status colors below are the
// only intentional exception, kept for functional error/success/warning UX):
//   Dark Blue #002E4B · Blue #2D5C6F · Light Blue #E1F1F0 · White #FFFFFF · Black #141414

// Shared class tokens so every page/component switches consistently instead
// of hand-picking colors per element.
export const pageBg = computed(() => isLight.value ? 'bg-[#E1F1F0] text-[#141414]' : 'bg-[#002E4B] text-white')
export const cardClasses = computed(() => isLight.value
  ? 'bg-black/[0.03] border-black/[0.08]'
  : 'bg-white/[0.03] border-white/[0.08]')
export const mutedText = computed(() => isLight.value ? 'text-[#141414]/70' : 'text-white/70')
export const subtleText = computed(() => isLight.value ? 'text-[#141414]/40' : 'text-white/40')
export const inputClasses = computed(() => isLight.value
  ? 'bg-black/5 border-black/10 text-[#141414] placeholder-black/30 focus:bg-black/[0.07]'
  : 'bg-white/5 border-white/10 text-white placeholder-white/30 focus:bg-white/[0.07]')
export const ghostButtonClasses = computed(() => isLight.value
  ? 'bg-black/5 hover:bg-black/10 text-[#141414] border-black/10'
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
// Light Blue accent (section eyebrows, "Expected:" labels) reads fine on the
// dark navy background but washes out on the light one, so use Blue there.
export const accentText = computed(() => isLight.value ? 'text-[#2D5C6F]' : 'text-[#E1F1F0]')
export const accentLink = computed(() => isLight.value
  ? 'text-[#2D5C6F] hover:text-[#002E4B]'
  : 'text-[#E1F1F0] hover:text-white')

// Fixed "light surface" tokens (not theme-reactive) for the auth card, which
// sits on a fixed photo background and stays a light card regardless of the
// site-wide theme toggle.
export const lightSurfaceText = 'text-[#141414]'
export const lightMutedText = 'text-[#141414]/70'
export const lightSubtleText = 'text-[#141414]/40'
export const lightInputClasses = 'bg-black/5 border-black/10 text-[#141414] placeholder-black/30 focus:bg-black/[0.07]'
export const lightGhostButtonClasses = 'bg-black/5 hover:bg-black/10 text-[#141414] border-black/10'
export const lightDangerClasses = 'text-red-700 bg-red-500/10 border-red-500/30'
export const lightSuccessClasses = 'text-emerald-700 bg-emerald-500/10 border-emerald-500/30'
export const lightNoticeClasses = 'text-amber-700 bg-amber-500/10 border-amber-500/30'
export const lightAccentText = 'text-[#2D5C6F]'
export const lightAccentLink = 'text-[#2D5C6F] hover:text-[#002E4B]'
