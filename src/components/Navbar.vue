<script setup>
import Logo from '../assets/Company_Logo.png'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

// Dahil tinanggal ang firebase, i-set muna natin ang user sa null
// para ipakita ang "About" at "Modules" links lang.
const user = ref(null) 
const showDropdown = ref(false)

const handleSignOut = () => {
  // Simple sign out logic: i-clear ang localStorage at ibalik sa Landing Page
  localStorage.removeItem('user')
  user.value = null
  router.push('/')
}
</script>

<template>
  <nav class="fixed top-0 left-0 right-0 z-[100] bg-white border-b border-[#040f1e]/20 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
    <div class="max-w-[1400px] mx-auto px-8 lg:px-16 h-20 flex items-center justify-between">

      <!-- Logo -->
      <a href="#" class="flex items-center gap-3 no-underline" @click.prevent="user ? router.push('/dashboard') : router.push('/')">
        <img :src="Logo" alt="Scanship" class="h-10 w-10 rounded-full object-contain" />
        <span class="font-['Bricolage_Grotesque'] text-2xl font-bold tracking-tight text-[#040f1e]">Scanship</span>
      </a>

      <!-- ── GUEST VIEW (Kapag hindi nakalog-in) ── -->
      <div v-if="!user" class="flex items-center gap-8">
        <a href="#about" class="font-['DM_Sans'] font-medium text-base no-underline text-[#040f1e] hover:text-[#0066cc] transition-colors">About</a>
        <a href="#modules" class="font-['DM_Sans'] font-medium text-base no-underline text-[#040f1e] hover:text-[#0066cc] transition-colors">Modules</a>
        <!-- TINANGGAL ANG SIGN IN BUTTON DITO -->
      </div>

      <!-- ── AUTHENTICATED VIEW (Kapag nakalog-in) ── -->
      <div v-else class="flex items-center gap-8">
        <a href="#" 
           @click.prevent="router.push('/dashboard')" 
           class="font-['DM_Sans'] font-medium text-base no-underline text-[#040f1e] hover:text-[#4da8f0] transition-colors">
           Home
        </a>
        <a href="#" 
           @click.prevent="router.push('/dashboard')" 
           class="font-['DM_Sans'] font-medium text-base no-underline text-[#040f1e] hover:text-[#4da8f0] transition-colors">
           Modules
        </a>

        <!-- Profile dropdown -->
        <div class="relative profile-dropdown ml-3">
          <button @click.stop="showDropdown = !showDropdown"
            class="flex items-center gap-2 pl-3 pr-2.5 py-2 rounded-[10px] border border-[#040f1e]/15 bg-[#040f1e]/5 hover:bg-[#040f1e]/10 hover:border-[#040f1e]/25 transition-all cursor-pointer">
            
            <div class="w-7 h-7 rounded-full bg-[#4da8f0]/30 border border-[#4da8f0]/40 flex items-center justify-center text-[0.7rem] font-bold text-[#4da8f0]">
              {{ user?.displayName?.charAt(0).toUpperCase() ?? user?.email?.charAt(0).toUpperCase() ?? 'U' }}
            </div>
            <span class="font-['DM_Sans'] text-[0.88rem] text-[#040f1e] max-w-[130px] truncate">
              {{ user?.displayName ?? user?.email?.split('@')[0] ?? 'Profile' }}
            </span>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"
              class="text-[#040f1e]/50 transition-transform duration-200" :class="showDropdown ? 'rotate-180' : ''">
              <polyline points="6 9 12 15 18 9"/>
            </svg>
          </button>

          <!-- Dropdown Menu -->
          <Transition name="drop">
            <div v-if="showDropdown"
              class="absolute right-0 top-[calc(100%+10px)] w-[210px] rounded-[14px] border border-[#040f1e]/10 shadow-xl overflow-hidden"
              style="background:rgba(255,255,255,0.98);backdrop-filter:blur(20px)">

              <div class="px-4 py-3.5 border-b border-[#040f1e]/[0.07]">
                <p class="text-[0.78rem] font-semibold text-[#040f1e] truncate">
                  {{ user?.displayName ?? user?.email?.split('@')[0] }}
                </p>
                <p class="text-[0.72rem] text-[#040f1e]/50 truncate mt-0.5">{{ user?.email }}</p>
              </div>

              <button @click="router.push('/profile'); showDropdown=false"
                class="w-full flex items-center gap-2.5 px-4 py-3 text-[0.875rem] font-['DM_Sans'] text-[#040f1e]/70 hover:text-[#040f1e] hover:bg-[#040f1e]/[0.05] transition-all cursor-pointer border-none bg-transparent text-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/>
                </svg>
                Profile Settings
              </button>

              <div class="border-t border-[#040f1e]/[0.07] mt-1"></div>

              <button @click="handleSignOut"
                class="w-full flex items-center gap-2.5 px-4 py-3 text-[0.875rem] font-['DM_Sans'] text-red-500/80 hover:text-red-500 hover:bg-red-500/[0.06] transition-all cursor-pointer border-none bg-transparent text-left">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8">
                  <path d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4"/>
                  <polyline points="16 17 21 12 16 7"/>
                  <line x1="21" y1="12" x2="9" y2="12"/>
                </svg>
                Sign Out
              </button>
            </div>
          </Transition>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
.drop-enter-active, .drop-leave-active { transition: opacity 0.15s ease, transform 0.15s ease; }
.drop-enter-from, .drop-leave-to { opacity: 0; transform: translateY(-6px); }
.rotate-180 { transform: rotate(180deg); }
</style>