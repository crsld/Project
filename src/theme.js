import { ref, computed, watchEffect, onMounted, onBeforeUnmount } from 'vue'

// Site-wide light / dark theme, shared by the navbar and every page background.
// The visitor's preference is 'auto' (default), 'light' or 'dark'. In 'auto' the
// theme follows the device's local time: light 6:00 AM-5:59 PM, dark otherwise,
// and switches live at the boundary while the page is open. A manual choice
// sticks across visits until the visitor goes back to Automatic.
// NOTE: index.html has an inline copy of this logic (same key and hours) that
// applies the theme before the app loads to avoid a flash; keep them in sync.
const THEME_KEY = 'scanship_theme_preference'
// The old light/dark toggle saved its last click under this key. Drop it so
// those visitors start on Automatic instead of being stuck on a stale choice.
const LEGACY_THEME_KEY = 'scanship_theme'
try { localStorage.removeItem(LEGACY_THEME_KEY) } catch { /* storage unavailable */ }
const DAY_START_HOUR = 6
const NIGHT_START_HOUR = 18
// Upper bound between re-checks so a manual clock / timezone change is still
// picked up eventually even if no visibility or focus event fires.
const MAX_RECHECK_MS = 15 * 60 * 1000

export const timeBasedTheme = (date = new Date()) => {
  const hour = date.getHours()
  return (hour >= DAY_START_HOUR && hour < NIGHT_START_HOUR) ? 'light' : 'dark'
}

// Milliseconds from `date` until the next 6:00 AM or 6:00 PM local time.
const msUntilNextBoundary = (date = new Date()) => {
  const next = new Date(date)
  next.setMinutes(0, 0, 0)
  const hour = date.getHours()
  if (hour < DAY_START_HOUR) next.setHours(DAY_START_HOUR)
  else if (hour < NIGHT_START_HOUR) next.setHours(NIGHT_START_HOUR)
  else {
    next.setDate(next.getDate() + 1)
    next.setHours(DAY_START_HOUR)
  }
  return next - date
}

const readPreference = () => {
  try {
    const saved = localStorage.getItem(THEME_KEY)
    return saved === 'light' || saved === 'dark' ? saved : 'auto'
  } catch {
    return 'auto'
  }
}

export const themePreference = ref(readPreference())
const autoTheme = ref(timeBasedTheme())

export const theme = computed(() => themePreference.value === 'auto' ? autoTheme.value : themePreference.value)

export const isLight = computed(() => theme.value === 'light')

export const setThemePreference = (preference) => {
  themePreference.value = preference
  autoTheme.value = timeBasedTheme()
  try {
    if (preference === 'auto') localStorage.removeItem(THEME_KEY)
    else localStorage.setItem(THEME_KEY, preference)
  } catch { /* storage unavailable: preference lasts for this visit only */ }
}

watchEffect(() => {
  const root = document.documentElement
  root.dataset.theme = theme.value
  // `dark` class drives Tailwind's `dark:` variant (see style.css).
  root.classList.toggle('dark', theme.value === 'dark')
  root.style.colorScheme = theme.value
})

// ── Live time-of-day switching ──
// One timer, armed for the next 6 AM / 6 PM boundary, re-checked whenever the
// tab becomes visible again (covers sleep, tab suspension and clock changes).
let recheckTimer = null
let subscribers = 0

const refreshAutoTheme = () => {
  autoTheme.value = timeBasedTheme()
  clearTimeout(recheckTimer)
  // +250ms so the timer lands just past the boundary rather than a hair before it.
  recheckTimer = setTimeout(refreshAutoTheme, Math.min(msUntilNextBoundary() + 250, MAX_RECHECK_MS))
}

const onVisibilityChange = () => {
  if (document.visibilityState === 'visible') refreshAutoTheme()
}

// Another tab changed the preference: follow it.
const onStorage = (event) => {
  if (event.key === THEME_KEY || event.key === null) themePreference.value = readPreference()
}

const startScheduler = () => {
  refreshAutoTheme()
  document.addEventListener('visibilitychange', onVisibilityChange)
  window.addEventListener('focus', refreshAutoTheme)
  window.addEventListener('pageshow', refreshAutoTheme)
  window.addEventListener('storage', onStorage)
}

const stopScheduler = () => {
  clearTimeout(recheckTimer)
  recheckTimer = null
  document.removeEventListener('visibilitychange', onVisibilityChange)
  window.removeEventListener('focus', refreshAutoTheme)
  window.removeEventListener('pageshow', refreshAutoTheme)
  window.removeEventListener('storage', onStorage)
}

// Composable: call from a component's setup to keep the theme live while it is
// mounted. Shared state, so any number of callers run a single scheduler.
export const useTheme = () => {
  onMounted(() => {
    if (subscribers++ === 0) startScheduler()
  })
  onBeforeUnmount(() => {
    if (--subscribers === 0) stopScheduler()
  })
  return { theme, isLight, themePreference, setThemePreference }
}

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
