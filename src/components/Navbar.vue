<script setup>
import Logo from '../assets/Company_Logo.png'
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logOut, currentUser } from '../auth'
import { isLight, toggleTheme } from '../theme'

const router = useRouter()
const route = useRoute()

const showDropdown = ref(false)
const mobileMenuOpen = ref(false)

// ── Scroll-retract state ──
const retracted = ref(false)
const lastScrollY = ref(0)
const SCROLL_THRESHOLD = 50 // How far down before we hide the navbar


const handleScroll = () => {
  const currentY = window.scrollY

  if (currentY <= SCROLL_THRESHOLD) {
    // Near top: always show full navbar
    retracted.value = false
  } else if (currentY > lastScrollY.value) {
    // Scrolling down -> hide navbar, show floating logo
    retracted.value = true
  } else if (currentY < lastScrollY.value) {
    // Scrolling up -> show full navbar again
    retracted.value = false
  }

  lastScrollY.value = currentY
}


// ── User menu ──
const userMenuOpen = ref(false)
const userMenuRef = ref(null)
const userName = computed(() => currentUser.value?.name || currentUser.value?.email || 'Account')
const userInitial = computed(() => userName.value.trim().charAt(0).toUpperCase())

const handleClickOutside = (e) => {
  if (userMenuRef.value && !userMenuRef.value.contains(e.target)) {
    userMenuOpen.value = false
  }
}
const handleKeydown = (e) => {
  if (e.key === 'Escape') userMenuOpen.value = false
}

onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeydown)
})


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeydown)
})


// ── Navigation helpers ──

const handleLogout = async () => {
  mobileMenuOpen.value = false
  userMenuOpen.value = false
  await logOut()
  await router.replace('/login')
}

const goHome = async () => {
  showDropdown.value = false
  mobileMenuOpen.value = false

  if (route.path === '/') {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  } else {
    await router.push('/')
    await nextTick()
    window.scrollTo({ top: 0, behavior: 'auto' })
  }
}

const goToSection = async (sectionId) => {
  showDropdown.value = false
  mobileMenuOpen.value = false

  const scrollToEl = () => {
    const el = document.getElementById(sectionId)
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  if (route.path === '/') {
    scrollToEl()
  } else {
    await router.push('/')
    await nextTick()
    setTimeout(scrollToEl, 100)
  }
}
</script>


<template>
  <!-- ===== FULL NAVBAR (shows when at top / scrolling up) ===== -->
  <nav
    class="fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ease-in-out border-b"
    :class="[
      (retracted && !mobileMenuOpen)
        ? '-translate-y-full opacity-0 pointer-events-none'
        : (isLight ? 'bg-white/90 border-black/10 opacity-100' : 'bg-[#040f1e]/80 border-white/30 opacity-100'),
      'backdrop-blur-md'
    ]"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-20">
      <!-- Logo + Wordmark -->
      <div class="flex items-center gap-3">
        <a href="#" class="flex items-center no-underline transition-transform hover:scale-110" @click.prevent="goHome">
          <img :src="Logo" alt="Scanship" class="h-10 w-10 object-contain rounded-full" />
        </a>
        <a href="#" class="flex items-center no-underline" @click.prevent="goHome">
          <span class="font-['Kanit'] font-bold tracking-tight text-2xl transition-colors duration-300" :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
            Scanship
          </span>
        </a>
      </div>

      <!-- Navigation Links + Signed-in user (desktop), grouped on the right -->
      <div class="hidden md:flex items-center gap-8 ml-auto">
        <a href="#" @click.prevent="goHome"
           class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200"
           :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
          Home
        </a>
        <a href="#" @click.prevent="goToSection('about')"
           class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200"
           :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
          About
        </a>
        <a href="#" @click.prevent="goToSection('modules')"
           class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200"
           :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
          Modules
        </a>

        <!-- Light / dark toggle -->
        <button type="button" @click="toggleTheme"
          class="flex items-center justify-center w-9 h-9 rounded-full border cursor-pointer transition-all"
          :class="isLight ? 'bg-black/5 hover:bg-black/10 border-black/10 text-[#0b1a2b]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'"
          :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
        >
          <svg v-if="isLight" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
          <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
        </button>

        <!-- Signed-in user -->
        <div ref="userMenuRef" class="relative">
          <button type="button" @click="userMenuOpen = !userMenuOpen"
            aria-haspopup="menu" :aria-expanded="userMenuOpen"
            class="flex items-center gap-2 pl-2 pr-4 py-1.5 border rounded-full cursor-pointer transition-all"
            :class="isLight ? 'bg-black/5 hover:bg-black/10 text-[#0b1a2b] border-black/10' : 'bg-white/5 hover:bg-white/10 text-white border-white/10'">
            <span class="w-7 h-7 rounded-full bg-[#4da8f0] flex items-center justify-center text-xs font-black text-white">{{ userInitial }}</span>
            <span class="font-['Kanit'] font-medium text-sm max-w-[160px] truncate">{{ userName }}</span>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"
              class="transition-transform duration-200" :class="userMenuOpen ? 'rotate-180' : ''">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <Transition name="user-menu">
            <div v-if="userMenuOpen" role="menu"
              class="absolute right-0 mt-3 w-56 rounded-2xl border backdrop-blur-md shadow-2xl overflow-hidden"
              :class="isLight ? 'bg-white/95 border-black/10' : 'bg-[#040f1e]/95 border-white/10'">
              <div class="px-4 py-3 border-b" :class="isLight ? 'border-black/10' : 'border-white/10'">
                <p class="text-[0.65rem] font-bold tracking-[0.15em] text-[#4da8f0] uppercase mb-1">Signed in as</p>
                <p class="text-sm truncate" :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">{{ currentUser?.email }}</p>
              </div>
              <button type="button" role="menuitem" @click="handleLogout"
                class="w-full flex items-center gap-3 px-4 py-3 text-left text-sm font-medium hover:text-[#4da8f0] bg-transparent border-none cursor-pointer transition-colors"
                :class="isLight ? 'text-[#0b1a2b] hover:bg-black/5' : 'text-white hover:bg-white/10'">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/><polyline points="16 17 21 12 16 7"/><line x1="21" y1="12" x2="9" y2="12"/></svg>
                Log Out
              </button>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Light / dark toggle (mobile) -->
      <button type="button" @click="toggleTheme"
        class="md:hidden flex items-center justify-center w-9 h-9 mr-2 rounded-full border cursor-pointer transition-all"
        :class="isLight ? 'bg-black/5 hover:bg-black/10 border-black/10 text-[#0b1a2b]' : 'bg-white/5 hover:bg-white/10 border-white/10 text-white'"
        :aria-label="isLight ? 'Switch to dark mode' : 'Switch to light mode'"
      >
        <svg v-if="isLight" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"/></svg>
        <svg v-else width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1111.21 3 7 7 0 0021 12.79z"/></svg>
      </button>

      <!-- Mobile Menu Toggle -->
      <button
        type="button"
        class="md:hidden flex items-center justify-center w-10 h-10 cursor-pointer bg-transparent border-none"
        :class="isLight ? 'text-[#0b1a2b]' : 'text-white'"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-expanded="mobileMenuOpen"
        aria-label="Toggle navigation menu"
      >
        <svg v-if="!mobileMenuOpen" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="3" y1="6" x2="21" y2="6"/>
          <line x1="3" y1="12" x2="21" y2="12"/>
          <line x1="3" y1="18" x2="21" y2="18"/>
        </svg>
        <svg v-else width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round">
          <line x1="18" y1="6" x2="6" y2="18"/>
          <line x1="6" y1="6" x2="18" y2="18"/>
        </svg>
      </button>
    </div>

    <!-- Mobile Menu Panel -->
    <Transition name="mobile-menu">
      <div v-if="mobileMenuOpen" class="md:hidden border-t" :class="isLight ? 'border-black/10' : 'border-white/10'">
        <div class="flex flex-col px-4 py-3">
          <a href="#" @click.prevent="goHome"
             class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200 py-3 border-b"
             :class="isLight ? 'text-[#0b1a2b] border-black/5' : 'text-white border-white/5'">
            Home
          </a>
          <a href="#" @click.prevent="goToSection('about')"
             class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200 py-3 border-b"
             :class="isLight ? 'text-[#0b1a2b] border-black/5' : 'text-white border-white/5'">
            About
          </a>
          <a href="#" @click.prevent="goToSection('modules')"
             class="font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200 py-3 border-b"
             :class="isLight ? 'text-[#0b1a2b] border-black/5' : 'text-white border-white/5'">
            Modules
          </a>
          <div class="flex items-center justify-between gap-3 py-3">
            <span class="flex items-center gap-2 min-w-0">
              <span class="w-7 h-7 shrink-0 rounded-full bg-[#4da8f0] flex items-center justify-center text-xs font-black text-white">{{ userInitial }}</span>
              <span class="font-['Kanit'] font-medium text-sm truncate" :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">{{ userName }}</span>
            </span>
            <a href="#" @click.prevent="handleLogout"
               class="shrink-0 font-['Kanit'] font-medium text-sm uppercase tracking-widest no-underline hover:text-[#4da8f0] transition-colors duration-200"
               :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
              Log Out
            </a>
          </div>
        </div>
      </div>
    </Transition>
  </nav>

  <!-- ===== FLOATING CENTERED LOGO (shows when scrolling down) ===== -->
  <div
    class="fixed top-0 left-0 right-0 h-16 z-[99] flex items-center justify-center pointer-events-none transition-all duration-500 ease-in-out"
    :class="retracted ? 'opacity-100' : 'opacity-0 -translate-y-8'"
  >
    <a
      href="#"
      @click.prevent="goHome"
      class="flex items-center gap-2 px-4 py-2 rounded-full backdrop-blur-xl border pointer-events-auto transition-all duration-300 hover:scale-110 group"
      :class="isLight ? 'bg-white/70 border-black/10 hover:border-black/20 hover:bg-white/90' : 'bg-[#040f1e]/60 border-white/10 hover:border-white/30 hover:bg-[#040f1e]/80'"
    >
      <img :src="Logo" alt="Scanship" class="h-8 w-8 object-contain rounded-full transition-transform group-hover:rotate-12" />
      <span class="font-['Kanit'] font-bold tracking-tight text-lg whitespace-nowrap" :class="isLight ? 'text-[#0b1a2b]' : 'text-white'">
        Scanship
      </span>
    </a>
  </div>
</template>


<style scoped>
/* Smooth transform utilities */
.-translate-y-full {
  transform: translateY(-100%);
}

.-translate-y-8 {
  transform: translateY(-2rem);
}

/* User dropdown transition */
.user-menu-enter-active, .user-menu-leave-active {
  transition: opacity 0.2s ease, transform 0.2s ease;
}
.user-menu-enter-from, .user-menu-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Mobile menu slide-down transition */
.mobile-menu-enter-active, .mobile-menu-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}
.mobile-menu-enter-from, .mobile-menu-leave-to {
  opacity: 0;
  max-height: 0;
}
.mobile-menu-enter-to, .mobile-menu-leave-from {
  opacity: 1;
  max-height: 280px;
}
</style>