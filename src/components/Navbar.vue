<script setup>
import Logo from '../assets/Company_Logo.png'
import { ref, onMounted, onUnmounted, nextTick } from 'vue'
import { useRouter, useRoute } from 'vue-router'

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


onMounted(() => {
  window.addEventListener('scroll', handleScroll, { passive: true })
})


onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll)
})


// ── Navigation helpers ──

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
    :class="(retracted && !mobileMenuOpen) ? '-translate-y-full opacity-0 pointer-events-none' : 'bg-[#040f1e]/80 backdrop-blur-md border-white/30 opacity-100'"
  >
    <div class="max-w-[1400px] mx-auto px-4 sm:px-8 lg:px-16 flex items-center justify-between h-20">
      <!-- Logo + Wordmark -->
      <div class="flex items-center gap-3">
        <a href="#" class="flex items-center no-underline transition-transform hover:scale-110" @click.prevent="goHome">
          <img :src="Logo" alt="Scanship" class="h-10 w-10 object-contain rounded-full" />
        </a>
        <a href="#" class="flex items-center no-underline" @click.prevent="goHome">
          <span class="font-['Trebuchet_MS'] font-bold tracking-tight text-2xl text-white">
            Scanship
          </span>
        </a>
      </div>

      <!-- Navigation Links (desktop) -->
      <div class="hidden md:flex items-center gap-8">
        <a href="#" @click.prevent="goHome"
           class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200">
          Home
        </a>
        <a href="#" @click.prevent="goToSection('about')"
           class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200">
          About
        </a>
        <a href="#" @click.prevent="goToSection('modules')"
           class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200">
          Modules
        </a>
      </div>

      <!-- Mobile Menu Toggle -->
      <button
        type="button"
        class="md:hidden flex items-center justify-center w-10 h-10 text-white cursor-pointer bg-transparent border-none"
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
      <div v-if="mobileMenuOpen" class="md:hidden border-t border-white/10">
        <div class="flex flex-col px-4 py-3">
          <a href="#" @click.prevent="goHome"
             class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200 py-3 border-b border-white/5">
            Home
          </a>
          <a href="#" @click.prevent="goToSection('about')"
             class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200 py-3 border-b border-white/5">
            About
          </a>
          <a href="#" @click.prevent="goToSection('modules')"
             class="font-['Trebuchet_MS'] font-medium text-sm uppercase tracking-widest no-underline text-white hover:text-[#4da8f0] transition-colors duration-200 py-3">
            Modules
          </a>
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
      class="flex items-center gap-2 px-4 py-2 rounded-full bg-[#040f1e]/60 backdrop-blur-xl border border-white/10 hover:border-white/30 pointer-events-auto transition-all duration-300 hover:bg-[#040f1e]/80 hover:scale-110 group"
    >
      <img :src="Logo" alt="Scanship" class="h-8 w-8 object-contain rounded-full transition-transform group-hover:rotate-12" />
      <span class="font-['Trebuchet_MS'] font-bold tracking-tight text-lg text-white whitespace-nowrap">
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
  max-height: 220px;
}
</style>