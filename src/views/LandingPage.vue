<script setup>
import { auth } from '../firebase.js'
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from 'firebase/auth'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { ref, onMounted } from 'vue'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack.vue'

import { useRouter } from 'vue-router'

const router = useRouter()

const email   = ref('')
const email2  = ref('')
const password = ref('')
const showAuth = ref(false)
const isLogin  = ref(true)

const handleAuth = async () => {
  try {
    if (isLogin.value) {
      await signInWithEmailAndPassword(auth, email.value, password.value)
    } else {
      await createUserWithEmailAndPassword(auth, email2.value, password.value)
    }
    showAuth.value = false
    router.push('/dashboard')
  } catch (err) {
    console.error(err.message)
    alert(err.message)
  }
}

const handleGoogle = async () => {
  try {
    const provider = new GoogleAuthProvider()
    await signInWithPopup(auth, provider)
    showAuth.value = false
    router.push('/dashboard')
  } catch (err) {
    console.error(err.message)
    alert(err.message)
  }
}

const modules = [
  { id:1,  name:'Intro to Wastewater Systems', label:'Module 1',  badge:'Foundation',   badgeColor:'rgba(255,255,255,0.8)', badgeBorder:'rgba(255,255,255,0.2)', badgeBg:'rgba(255,255,255,0.06)', icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>' },
  { id:2,  name:'Pre-treatment Operations',     label:'Module 2',  badge:null, icon:'<svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
  { id:3,  name:'Mixing & Bioreactor',          label:'Module 3',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="1 4 1 10 7 10"/><path d="M3.51 15a9 9 0 1 0 .49-4.5"/></svg>' },
  { id:4,  name:'Flocculation Unit',            label:'Module 4',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="2"/><path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83"/></svg>' },
  { id:5,  name:'Polymer Unit',                 label:'Module 5',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="3" y="3" width="18" height="18" rx="2"/></svg>' },
  { id:6,  name:'Coagulant Unit',               label:'Module 6',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M10 2v7.527a2 2 0 0 1-.211.896L4.72 19.1A2 2 0 0 0 6.5 22h11a2 2 0 0 0 1.78-2.9l-5.069-8.677A2 2 0 0 1 14 9.527V2"/><path d="M8.5 2h7"/></svg>' },
  { id:7,  name:'Dissolved Air Flotation',      label:'Module 7',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>' },
  { id:8,  name:'Polishing Filter Unit',        label:'Module 8',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polyline points="22 12 18 12 15 21 9 3 6 12 2 12"/></svg>' },
  { id:9,  name:'UV Unit',                      label:'Module 9',  badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><circle cx="12" cy="12" r="5"/><line x1="12" y1="1" x2="12" y2="3"/><line x1="12" y1="21" x2="12" y2="23"/><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"/><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"/><line x1="1" y1="12" x2="3" y2="12"/><line x1="21" y1="12" x2="23" y2="12"/></svg>' },
  { id:10, name:'Effluent Holding Discharge',   label:'Module 10', badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><ellipse cx="12" cy="5" rx="9" ry="3"/><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3"/><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"/></svg>' },
  { id:11, name:'Ventilation Systems',          label:'Module 11', badge:null, icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><path d="M9.59 4.59A2 2 0 1 1 11 8H2m10.59 11.41A2 2 0 1 0 14 16H2m15.73-8.27A2.5 2.5 0 1 1 19.5 12H2"/></svg>' },
  { id:12, name:'Automation',                   label:'Module 12', badge:'Full system', badgeColor:'#10b981', badgeBorder:'rgba(16,185,129,0.3)', badgeBg:'rgba(16,185,129,0.1)', icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><rect x="2" y="3" width="20" height="14" rx="2"/><line x1="8" y1="21" x2="16" y2="21"/><line x1="12" y1="17" x2="12" y2="21"/></svg>' },
]

const accentColors = [
  { num: '#f59e0b' },
  { num: '#4da8f0' },
  { num: 'rgba(255,255,255,0.2)' },
]

onMounted(() => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible')
          observer.unobserve(entry.target)
        }
      })
    },
    { threshold: 0.12 }
  )
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el))
})
</script>

<template>
  <div class="font-['DM_Sans'] bg-[#061120] text-white">
    <Navbar @open-auth="showAuth = true" />

    <!-- ── HERO ── -->
    <section class="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-30 pb-20 relative overflow-hidden bg-[#040f1e]">
      <div class="relative max-w-3xl mx-auto w-full">
        <h1 class="font-sans-serif text-[clamp(3.6rem,5.5vw,4.2rem)] font-black leading-[1.08] tracking-[0.08em] mb-6 text-white">
          Unlimited access to Maritime System modules,
          <span class="text-[#9ddbff]">Anytime.</span>
        </h1>

        <p class="text-[0.98rem] text-white/70 leading-[1.75] mb-8 max-w-[600px] mx-auto">
          ScanShip gives your fleet instant access to a comprehensive library of maritime system modules from navigation and cargo management to safety compliance. 
          Subscribe once, deploy everywhere.
        </p>

        <div class="flex justify-center gap-2 max-w-[480px] mx-auto mb-6">
          <button
            @click="showAuth = true"
            class="px-5 py-3 bg-white text-black font-bold text-[0.9rem] rounded-[10px] hover:bg-[#9ddbff] transition-colors whitespace-nowrap cursor-pointer">
            Sign In →
          </button>
        </div>
        <p class="text-[0.78rem] text-white/25">Ready to subscribe? Enter your email to create an account.</p>
      </div>
    </section>

    <!-- ── ABOUT ── -->
    <section id="about" class="pt-28 pb-8 px-8 bg-[#040f1e] text-center">
      <div class="max-w-[1100px] mx-auto">
        <p class="text-[0.68rem] font-bold tracking-[0.2em] text-white/35 mb-4 uppercase">About ScanShip</p>
        <h2 class="font-sans text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white mb-5">
          The technology behind cleaner oceans
        </h2>
        <p class=" max-w-[580px] mx-auto mb-10 text-white/45 leading-[1.8] text-[0.95rem]">
          ScanShip delivers world-leading wastewater and waste management systems to the maritime industry. For over 20 years, our modular technology has helped cruise operators reduce emissions, meet compliance, and convert waste into energy, all from one platform.
        </p>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-[860px] mx-auto">
          <div
            v-for="(stat, i) in [
              { value:'20+',  label:'Years of experience' },
              { value:'400+', label:'Systems installed'   },
              { value:'175',  label:'Cruise ships served' },
              { value:'MEPC', label:'277(64) compliant'   },
            ]" :key="stat.value"
            class="reveal bg-white/[0.04] border border-white/[0.08] rounded-2xl p-7 flex flex-col gap-2 items-center hover:bg-white/[0.07] hover:border-white/[0.14] transition-all duration-300"
            :style="`--delay:${i * 80}ms`">
            <span class="font-['Bricolage_Grotesque'] text-[2.4rem] font-black text-white tracking-tight">{{ stat.value }}</span>
            <span class="text-[0.76rem] text-white/40 leading-snug text-center">{{ stat.label }}</span>
          </div>
        </div>
      </div>
    </section>

   <!-- ── MODULES SCROLL STACK ── -->
<section id="modules" class="py-12 px-8 bg-[#040f1e] text-center">
  <!-- Header Container -->
  <div class="max-w-[650px] mx-auto px-6 pt-10 pb-2"> 
    <div class="flex flex-col items-center gap-0">
      <div>
        <h2 class="font-['Bricolage_Grotesque'] text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-white leading-[1.06] m-0 text-center">
          Subscribe to the modules you need
        </h2>
      </div>
      <div>  
        <p class="text-[0.95rem] text-white/40 mt-2 mb-4 max-w-[580px] mx-auto">
          Choose from a comprehensive library of wastewater and waste management modules. Subscribe to what you need, when you need it, and deploy across your fleet with ease.
        </p>
      </div>
    </div>
  </div>

  <!-- Stack viewport (The Scrolling Area) -->
  <div class="w-[800px] mx-auto h-[600px] overflow-hidden relative [&_*]:![scrollbar-width:none] [&_*]:![-ms-overflow-style:none]">
    <ScrollStack
      :item-distance="80" 
      :item-scale="0.03"
      :item-stack-distance="24"
      stack-position="0%" 
      scale-end-position="5%"
      :base-scale="0.85"
      :rotation-amount="0"
      :blur-amount="1"
    >
      <ScrollStackItem
        v-for="(mod, index) in modules.slice(0, 6)"
        :key="mod.id"
        item-class-name="module-stack-card"
      >
        <div class="h-full flex flex-col justify-between text-left">
          <!-- Top -->
          <div class="flex items-start justify-between">
            <span
              class="font-['Bricolage_Grotesque'] text-[3.8rem] font-black leading-none"
              :style="`color:${accentColors[index % 3].num}`">
              {{ String(mod.id).padStart(2, '0') }}
            </span>
            <div class="flex items-center gap-3">
              <span v-if="mod.badge"
                class="inline-flex items-center gap-1.5 text-[0.62rem] font-semibold px-3 py-1.5 rounded-full border tracking-[0.04em]"
                :style="`border-color:${mod.badgeBorder};background:${mod.badgeBg};color:${mod.badgeColor};`">
                <span class="w-1.5 h-1.5 rounded-full bg-current opacity-60"></span>
                {{ mod.badge }}
              </span>
              <div class="w-12 h-12 rounded-[14px] bg-white/[0.06] border border-white/[0.09] flex items-center justify-center text-white/55 shrink-0"
                v-html="mod.icon"></div>
            </div>
          </div>
          <!-- Title -->
          <div class="flex-1 flex flex-col justify-end pb-2">
            <p class="text-[0.65rem] font-semibold tracking-[0.16em] uppercase text-white/28 mb-1.5">{{ mod.label }}</p>
            <h3 class="font-['Bricolage_Grotesque'] text-[clamp(1.5rem,2.5vw,2.2rem)] font-extrabold text-white leading-[1.1] m-0">{{ mod.name }}</h3>
          </div>
          <!-- Bottom -->
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-2">
              <span class="w-2 h-2 rounded-full bg-[#10b981] shrink-0"></span>
              <span class="text-[0.78rem] text-white/38">Available to subscribe</span>
            </div>
            <button
              @click="showAuth = true"
              class="w-10 h-10 rounded-full border border-white/18 bg-transparent text-white/45 flex items-center justify-center cursor-pointer text-base hover:border-white/50 hover:text-white hover:bg-white/[0.06] transition-all duration-250">
              →
            </button>
          </div>
        </div>
      </ScrollStackItem>
    </ScrollStack>
  </div>

  <!-- Button Container -->
  <div class="mt-8">
    <button 
      @click="showAuth = true"
      class="inline-flex items-center gap-3 px-8 py-3.5 border border-white/10 rounded-[14px] text-white/90 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group"
    >
      <span class="font-bold text-[1rem]">View more modules</span>
      <span class="text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
    </button>
  </div>
</section>

    <!-- ── PRICING ── -->
     <section id="pricing" class="py-24 px-8 bg-[#040f1e] text-center">
      <div class="max-w-[1100px] mx-auto">
        <p class="reveal text-[0.68rem] font-bold tracking-[0.2em] text-[#4da8f0] mb-4 uppercase">Pricing Plans</p>
        <h2 class="reveal reveal-delay-1 font-['Bricolage_Grotesque'] text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white mb-3">Simple, transparent pricing</h2>
        <p class="reveal reveal-delay-2 text-white/40 mb-14 text-[0.93rem]">Pay per module or save with a full-system plan. Cancel any time.</p>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-5 max-w-[940px] mx-auto items-start">

          <!-- Single Module -->
          <div class="reveal bg-white/[0.03] border border-white/[0.08] rounded-[18px] p-8 text-left hover:border-white/[0.14] transition-colors" style="--delay:0ms">
            <p class="text-[0.63rem] font-bold tracking-[0.14em] text-[#4da8f0] uppercase mb-5">Single Module</p>
            <div class="flex items-end gap-1 mb-1">
              <span class="font-['Bricolage_Grotesque'] text-[2.6rem] font-black text-white leading-none">$29</span>
              <span class="text-[0.85rem] text-white/35 pb-1">/mo</span>
            </div>
            <p class="text-[0.8rem] text-white/32 mb-7">One system module</p>
            <ul class="list-none p-0 mb-8 flex flex-col gap-2.5">
              <li v-for="item in ['Full access to 1 module','Documentation & manuals','Standard support']" :key="item"
                class="text-[0.875rem] text-white/55 pl-[1.4rem] relative">
                <span class="absolute left-0 text-[#10b981] font-bold">✓</span>{{ item }}
              </li>
            </ul>
            <button @click="showAuth = true"
              class="w-full py-3 rounded-[10px] text-[0.9rem] font-semibold cursor-pointer bg-transparent border border-white/15 text-white hover:bg-white/[0.05] hover:border-white/25 transition-all duration-200">
              Subscribe
            </button>
          </div>

          <!-- Vessel Plan (featured) -->
          <div class="reveal bg-white/[0.03] border border-[#4da8f0]/55 rounded-[18px] px-8 pt-12 pb-8 text-left relative hover:border-[#4da8f0] transition-colors" style="--delay:100ms">
            <div class="absolute top-[-1px] left-1/2 -translate-x-1/2 bg-[#4da8f0] text-white text-[0.6rem] font-bold tracking-[0.1em] px-4 py-[0.28rem] rounded-b-lg whitespace-nowrap">
              MOST POPULAR
            </div>
            <p class="text-[0.63rem] font-bold tracking-[0.14em] text-[#4da8f0] uppercase mb-5">Vessel Plan</p>
            <div class="flex items-end gap-1 mb-1">
              <span class="font-['Bricolage_Grotesque'] text-[2.6rem] font-black text-white leading-none">$199</span>
              <span class="text-[0.85rem] text-white/35 pb-1">/mo</span>
            </div>
            <p class="text-[0.8rem] text-white/32 mb-7">All 12 modules, one vessel</p>
            <ul class="list-none p-0 mb-8 flex flex-col gap-2.5">
              <li v-for="item in ['All 12 system modules','Unlimited crew access','Priority support']" :key="item"
                class="text-[0.875rem] text-white/55 pl-[1.4rem] relative">
                <span class="absolute left-0 text-[#10b981] font-bold">✓</span>{{ item }}
              </li>
            </ul>
            <button @click="showAuth = true"
              class="w-full py-3 rounded-[10px] text-[0.9rem] font-bold cursor-pointer bg-[#4da8f0] border-none text-black hover:bg-[#3a8fe0] transition-colors duration-200">
              Subscribe
            </button>
          </div>

          <!-- Fleet Plan -->
          <div class="reveal bg-white/[0.03] border border-white/[0.08] rounded-[18px] p-8 text-left hover:border-white/[0.14] transition-colors" style="--delay:200ms">
            <p class="text-[0.63rem] font-bold tracking-[0.14em] text-[#4da8f0] uppercase mb-5">Fleet Plan</p>
            <div class="mb-1">
              <span class="font-['Bricolage_Grotesque'] text-[2.2rem] font-black text-white leading-none">Custom</span>
            </div>
            <p class="text-[0.8rem] text-white/32 mb-7">Multiple vessels</p>
            <ul class="list-none p-0 mb-8 flex flex-col gap-2.5">
              <li v-for="item in ['All modules, all vessels','Centralized fleet dashboard','Dedicated account manager']" :key="item"
                class="text-[0.875rem] text-white/55 pl-[1.4rem] relative">
                <span class="absolute left-0 text-[#10b981] font-bold">✓</span>{{ item }}
              </li>
            </ul>
            <button
              class="w-full py-3 rounded-[10px] text-[0.9rem] font-semibold cursor-pointer bg-transparent border border-white/15 text-white hover:bg-white/[0.05] hover:border-white/25 transition-all duration-200">
              Contact Sales
            </button>
          </div>

        </div>
      </div>
    </section>

    <Footer />

    <!-- ── AUTH MODAL ── -->
    <Transition name="fade">
      <div v-if="showAuth"
        class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/70"
        style="backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px)"
        @click.self="showAuth = false">

        <div class="relative w-full max-w-[400px] flex flex-col gap-3.5 rounded-[18px] border border-white/10 p-10"
          style="background:rgba(8,18,36,0.97)">

          <!-- Close -->
          <button @click="showAuth = false"
            class="absolute top-4 right-4 bg-transparent border-none text-white/35 text-base cursor-pointer leading-none hover:text-white transition-colors">
            ✕
          </button>

          <!-- Header -->
          <p class="font-['Bricolage_Grotesque'] text-[1.1rem] font-black text-[#4da8f0] m-0">ScanShip</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[1.8rem] font-black text-white m-0">
            {{ isLogin ? 'Sign In' : 'Create Account' }}
          </h2>
          <p class="text-[0.85rem] text-white/38 m-0">
            {{ isLogin ? 'Welcome back.' : 'Start your free trial today.' }}
          </p>

          <!-- Google -->
          <button @click="handleGoogle" class="flex items-center justify-center gap-2.5 w-full py-3 px-4 bg-white/[0.05] border border-white/14 rounded-[10px] text-white text-[0.88rem] font-semibold cursor-pointer hover:bg-white/[0.09] hover:border-white/28 transition-all font-['DM_Sans']">
            <svg width="18" height="18" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            Continue with Google
          </button>

          <!-- Divider -->
          <div class="flex items-center gap-3 text-[0.78rem] text-white/20">
            <span class="flex-1 h-px bg-white/[0.08]"></span>
            or
            <span class="flex-1 h-px bg-white/[0.08]"></span>
          </div>

          <!-- Inputs -->
<input 
  v-model="email" 
  type="email" 
  placeholder="Email address"
  class="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-[10px] text-white text-[0.88rem] outline-none focus:border-white/32 transition-colors placeholder:text-white/25 font-['DM_Sans']" 
/>
<input 
  v-model="password" 
  type="password" 
  placeholder="Password"
  class="w-full px-4 py-3 bg-white/[0.05] border border-white/10 rounded-[10px] text-white text-[0.88rem] outline-none focus:border-white/32 transition-colors placeholder:text-white/25 font-['DM_Sans']" 
/>

<!-- Submit Button -->
<button
  @click="handleAuth" 
  class="w-full py-3 bg-[#4da8f0] border-none rounded-[10px] text-black text-[0.9rem] font-bold cursor-pointer hover:bg-[#3a8fe0] transition-colors font-['DM_Sans']">
  {{ isLogin ? 'Sign In' : 'Create Account' }}
</button>

          <!-- Switch -->
          <p class="text-center text-[0.82rem] text-white/35 m-0">
            {{ isLogin ? "New to ScanShip?" : "Already have an account?" }}
            <span @click="isLogin = !isLogin"
              class="text-white/75 underline cursor-pointer hover:text-white transition-colors">
              {{ isLogin ? 'Sign up now' : 'Sign in' }}
            </span>
          </p>

        </div>
      </div>
    </Transition>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

/* Reveal animation */
.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
  transition-delay: var(--delay, 0ms);
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }
.reveal-delay-1 { --delay: 100ms; }
.reveal-delay-2 { --delay: 200ms; }

/* Scrollbar hide for stack */
:deep(.scroll-stack-container),
:deep(.scroll-stack-inner) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
  padding-left: 0 !important;
  padding-right: 0 !important;
}
:deep(.scroll-stack-container)::-webkit-scrollbar,
:deep(.scroll-stack-inner)::-webkit-scrollbar { display: none !important; }

/* Card styles */
:deep(.module-stack-card) {
  background: linear-gradient(145deg, rgba(255,255,255,0.05) 0%, rgba(255,255,255,0.02) 100%) !important;
  border: 1px solid rgba(255,255,255,0.08) !important;
  border-radius: 24px !important;
  color: white;
  height: 280px !important;
  padding: 2rem 2.5rem !important;
  box-sizing: border-box;
}
:deep(.module-stack-card:nth-child(3n+1)) {
  background: linear-gradient(145deg, rgba(245,158,11,0.08) 0%, rgba(245,158,11,0.02) 100%) !important;
  border-color: rgba(245,158,11,0.16) !important;
}
:deep(.module-stack-card:nth-child(3n+2)) {
  background: linear-gradient(145deg, rgba(77,168,240,0.08) 0%, rgba(77,168,240,0.02) 100%) !important;
  border-color: rgba(77,168,240,0.16) !important;
}
:deep(.module-stack-card:nth-child(3n)) {
  background: linear-gradient(145deg, rgba(16,185,129,0.06) 0%, rgba(16,185,129,0.02) 100%) !important;
  border-color: rgba(16,185,129,0.12) !important;
}

/* Modal fade */
.fade-enter-active, .fade-leave-active { transition: opacity 0.22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>