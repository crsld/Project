<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const navItems = [
  { key: 'overview',   label: 'Overview',   icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>' },
  { key: 'membership', label: 'Membership', icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M20 12V22H4V12"/><path d="M22 7H2v5h20V7z"/><path d="M12 22V7"/><path d="M12 7H7.5a2.5 2.5 0 010-5C11 2 12 7 12 7z"/><path d="M12 7h4.5a2.5 2.5 0 000-5C13 2 12 7 12 7z"/></svg>' },
  { key: 'security',   label: 'Security',   icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>' },
]

// FIX: Moved from template to script to avoid parsing errors
const quickLinks = [
  { 
    label: 'Change plan', 
    sub: null, 
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M11 4H4a2 2 0 00-2 2v14a2 2 0 002 2h14a2 2 0 002-2v-7"/><path d="M18.5 2.5a2.121 2.121 0 013 3L12 15l-4 1 1-4 9.5-9.5z"/></svg>', 
    action: () => activeSection.value = 'membership' 
  },
  { 
    label: 'Manage payment method', 
    sub: 'Pay for purchases added to your plan', 
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="1" y="4" width="22" height="16" rx="2"/><line x1="1" y1="10" x2="23" y2="10"/></svg>', 
    action: () => {} 
  },
  { 
    label: 'Update password', 
    sub: null, 
    icon: '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="11" width="18" height="11" rx="2"/><path d="M7 11V7a5 5 0 0110 0v4"/></svg>', 
    action: () => activeSection.value = 'security' 
  },
]
</script>

<template>
  <div class="min-h-screen bg-[#040f1e] text-white font-['DM_Sans']">
    <div class="pt-16 max-w-250 mx-auto px-4 pb-10 flex gap-8">
    
      <aside class="w-50 shrink-0 pt-4">
        <button @click="router.push('/dashboard')"
          class="flex items-center gap-2 text-[0.82rem] text-white hover:text-white/80 transition-colors cursor-pointer border-none bg-transparent mb-6 px-0">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="15 18 9 12 15 6"/></svg>
          Back to Dashboard
        </button>

        <nav class="flex flex-col gap-0.5">
          <button v-for="item in navItems" :key="item.key"
            @click="activeSection = item.key"
            class="flex items-center gap-3 px-3 py-2.5 rounded-[10px] text-[0.88rem] transition-all cursor-pointer border-none text-left w-full"
            :class="activeSection === item.key
              ? 'bg-white/[0.07] text-white font-medium'
              : 'bg-transparent text-white/45 hover:text-white/80 hover:bg-white/4'">
            <span v-html="item.icon" class="shrink-0" :class="activeSection === item.key ? 'text-[#4da8f0]' : ''"></span>
            {{ item.label }}
          </button>
        </nav>
      </aside>

      <!-- ── MAIN ── -->
      <main class="flex-1 min-w-0 pt-2">

        <!-- ── OVERVIEW ── -->
        <div v-if="activeSection === 'overview'">
          <!-- Member card -->
          <div class="rounded-2xl border border-white/8 bg-white/3 overflow-hidden mb-5">
            <div class="px-6 pt-5 pb-2">
              <span class="inline-block text-[0.7rem] font-bold px-3 py-1.5 rounded-full bg-[#4da8f0] text-[#040f1e] mb-4">
                Member since {{ user ? new Date(user.metadata.creationTime).toLocaleDateString('en-US', { month:'long', year:'numeric' }) : '—' }}
              </span>
              <div class="border-b border-white/6 pb-4 mb-4">
                <p class="text-[0.95rem] font-semibold text-white">Vessel Plan</p>
                <p class="text-[0.8rem] text-white/35 mt-0.5">All 12 modules · One vessel</p>
              </div>
              <button @click="activeSection = 'membership'"
                class="w-full flex items-center justify-between py-3 text-[0.88rem] text-white/70 hover:text-white transition-colors cursor-pointer border-none bg-transparent text-left">
                Manage membership
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="9 18 15 12 9 6"/></svg>
              </button>
            </div>
          </div>

          <!-- Quick links -->
          <p class="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-white/25 mb-3">Quick Links</p>
          <div class="rounded-2xl border border-white/8 bg-white/3 overflow-hidden divide-y divide-white/6">
            <!-- UPDATED v-for to use quickLinks from script -->
            <button v-for="(link, i) in quickLinks" :key="i"
              @click="link.action()"
              class="w-full flex items-center gap-4 px-6 py-4 hover:bg-white/4 transition-colors cursor-pointer border-none bg-transparent text-left">
              <span v-html="link.icon" class="text-white/40 shrink-0"></span>
              <div class="flex-1">
                <p class="text-[0.88rem] text-white/80">{{ link.label }}</p>
                <p v-if="link.sub" class="text-[0.75rem] text-white/30 mt-0.5">{{ link.sub }}</p>
              </div>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" class="text-white/25 shrink-0"><polyline points="9 18 15 12 9 6"/></svg>
            </button>
          </div>
        </div>

        <!-- ── MEMBERSHIP ── -->
        <div v-else-if="activeSection === 'membership'">
          <!-- Rest of the sections remain same... -->
          <div class="rounded-2xl border border-white/8 bg-white/3 overflow-hidden divide-y divide-white/6 mb-5">
            <div class="px-6 py-5">
              <p class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-[#4da8f0] mb-2">Current Plan</p>
              <p class="text-[1.1rem] font-semibold text-white">Vessel Plan</p>
              <p class="text-[0.8rem] text-white/35 mt-1">$199 / month · All 12 modules · One vessel</p>
            </div>
            <div class="px-6 py-4 flex items-center justify-between">
              <div>
                <p class="text-[0.88rem] text-white/70">Next billing date</p>
                <p class="text-[0.8rem] text-white/35 mt-0.5">July 7, 2026</p>
              </div>
              <span class="text-[0.65rem] font-bold px-2.5 py-1 rounded-full bg-[#10b981]/10 border border-[#10b981]/25 text-[#10b981]">Active</span>
            </div>
          </div>
          
          <p class="text-[0.7rem] font-bold tracking-[0.14em] uppercase text-white/25 mb-3">Available Plans</p>
          <div class="flex flex-col gap-3">
            <div v-for="plan in [
              { name:'Single Module', price:'$29/mo', desc:'Full access to 1 module', current: false },
              { name:'Vessel Plan',   price:'$199/mo', desc:'All 12 modules, one vessel', current: true },
              { name:'Fleet Plan',    price:'Custom', desc:'Multiple vessels · Dedicated support', current: false },
            ]" :key="plan.name"
              class="rounded-[14px] border px-5 py-4 flex items-center justify-between transition-all"
              :class="plan.current ? 'border-[#4da8f0]/40 bg-[#4da8f0]/5' : 'border-white/7 bg-white/2 hover:border-white/12 hover:bg-white/4'">
              <div>
                <p class="text-[0.92rem] font-semibold text-white">{{ plan.name }}</p>
                <p class="text-[0.78rem] text-white/35 mt-0.5">{{ plan.desc }}</p>
              </div>
              <div class="flex items-center gap-3">
                <p class="text-[0.88rem] font-bold" :class="plan.current ? 'text-[#4da8f0]' : 'text-white/60'">{{ plan.price }}</p>
                <span v-if="plan.current" class="text-[0.62rem] font-bold px-2 py-0.5 rounded-full bg-[#4da8f0]/15 border border-[#4da8f0]/30 text-[#4da8f0]">Current</span>
                <button v-else class="text-[0.78rem] font-semibold px-3 py-1.5 rounded-lg border border-white/15 text-white/50 hover:text-white hover:border-white/30 transition-all cursor-pointer bg-transparent">
                  Switch
                </button>
              </div>
            </div>
          </div>
        </div>

        <!-- ── SECURITY ── -->
        <div v-else-if="activeSection === 'security'">
          <div class="rounded-2xl border border-white/8 bg-white/3 overflow-hidden mb-5">
            <div class="px-6 py-5 border-b border-white/6">
              <p class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-1">Email address</p>
              <p class="text-[0.92rem] text-white">{{ user?.email }}</p>
            </div>
            <div class="px-6 py-5">
              <p class="text-[0.72rem] font-bold tracking-[0.12em] uppercase text-white/30 mb-1">Sign-in method</p>
              <p class="text-[0.92rem] text-white capitalize">
                {{ user?.providerData?.[0]?.providerId === 'google.com' ? 'Google Account' : 'Email & Password' }}
              </p>
            </div>
          </div>

          <div v-if="user?.providerData?.[0]?.providerId !== 'google.com'"
            class="rounded-2xl border border-white/8 bg-white/3 px-6 py-5">
            <p class="text-[0.88rem] font-semibold text-white mb-4">Update Password</p>
            <div class="flex flex-col gap-3 max-w-95">
              <div>
                <label class="text-[0.72rem] text-white/35 mb-1 block">Current password</label>
                <input v-model="currentPassword" type="password" placeholder="••••••••"
                  class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-[0.88rem] outline-none focus:border-white/30 transition-colors placeholder:text-white/20 font-['DM_Sans']"/>
              </div>
              <div>
                <label class="text-[0.72rem] text-white/35 mb-1 block">New password</label>
                <input v-model="newPassword" type="password" placeholder="••••••••"
                  class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-[0.88rem] outline-none focus:border-white/30 transition-colors placeholder:text-white/20 font-['DM_Sans']"/>
              </div>
              <div>
                <label class="text-[0.72rem] text-white/35 mb-1 block">Confirm new password</label>
                <input v-model="confirmPassword" type="password" placeholder="••••••••"
                  class="w-full px-4 py-2.5 bg-white/5 border border-white/10 rounded-lg text-white text-[0.88rem] outline-none focus:border-white/30 transition-colors placeholder:text-white/20 font-['DM_Sans']"/>
              </div>
              <p v-if="passwordError" class="text-[0.78rem] text-red-400">{{ passwordError }}</p>
              <p v-if="passwordSuccess" class="text-[0.78rem] text-[#10b981]">{{ passwordSuccess }}</p>
              <button @click="handleUpdatePassword"
                class="mt-1 px-5 py-2.5 bg-[#4da8f0] rounded-lg text-[0.88rem] font-bold text-black cursor-pointer hover:bg-[#3a8fe0] transition-colors border-none w-fit">
                Update Password
              </button>
            </div>
          </div>
          <div v-else class="rounded-2xl border border-white/7 bg-white/2 px-6 py-5">
            <p class="text-[0.88rem] text-white/50">Password is managed by Google. To change it, visit your Google Account settings.</p>
          </div>

          <div class="mt-5 rounded-2xl border border-red-400/12 bg-red-400/3 px-6 py-5 flex items-center justify-between">
            <div>
              <p class="text-[0.92rem] font-semibold text-white">Sign out</p>
              <p class="text-[0.78rem] text-white/35 mt-0.5">Sign out of your ScanShip account</p>
            </div>
            <button @click="handleSignOut"
              class="px-4 py-2 rounded-lg text-[0.82rem] font-semibold border border-red-400/30 text-red-400/80 hover:text-red-400 hover:bg-red-400/8 transition-all cursor-pointer bg-transparent">
              Sign Out
            </button>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');
</style>