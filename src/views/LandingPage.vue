<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ScrollStack, { ScrollStackItem } from '../components/ScrollStack.vue'

// Initialize router and state
const router = useRouter()
const showAuth = ref(false)

// Function to navigate to Dashboard
const goToDashboard = () => {
  router.push('/dashboard')
}

const modules = [
  { id:1,  name:'Intro to Wastewater Systems', label:'Module 1', badge:'Foundation',   badgeColor:'rgba(255,255,255,0.8)', badgeBorder:'rgba(255,255,255,0.2)', badgeBg:'rgba(255,255,255,0.06)', icon:'<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3"/></svg>' },
  { id:2,  name:'Pre-treatment Operations',     label:'Module 2', badge:null, icon:'<svg width="20" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8"><line x1="8" y1="6" x2="21" y2="6"/><line x1="8" y1="12" x2="21" y2="12"/><line x1="8" y1="18" x2="21" y2="18"/><line x1="3" y1="6" x2="3.01" y2="6"/><line x1="3" y1="12" x2="3.01" y2="12"/><line x1="3" y1="18" x2="3.01" y2="18"/></svg>' },
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
          <span class="text-[#9ddbff]">anytime.</span>
        </h1>

        <p class="text-[0.98rem] text-white/70 leading-[1.75] mb-8 max-w-[600px] mx-auto">
          Scanship gives your fleet instant access to a comprehensive library of maritime system modules from navigation and cargo management to safety compliance. 
          Subscribe once, deploy everywhere.
        </p>
        </div>
    </section>

    <!-- ── ABOUT ── -->
    <section id="about" class="pt-28 pb-8 px-8 bg-[#040f1e] text-center">
      <div class="max-w-[1100px] mx-auto">
        <p class="text-[0.68rem] font-bold tracking-[0.2em] text-white/35 mb-4 uppercase">About Scanship</p>
        <h2 class="font-sans text-[clamp(1.8rem,3vw,2.8rem)] font-extrabold text-white mb-5">
          The technology behind cleaner oceans
        </h2>
        <p class=" max-w-[580px] mx-auto mb-10 text-white/45 leading-[1.8] text-[0.95rem]">
          Scanship delivers world-leading wastewater and waste management systems to the maritime industry. For over 20 years, our modular technology has helped cruise operators reduce emissions, meet compliance, and convert waste into energy, all from one platform.
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
<section id="modules" class="py-10 px-8 bg-[#040f1e] text-center">
  <!-- Header Container -->
  <div class="max-w-[900px] mx-auto px-6 pt-4 pb-2"> 
    <div class="flex flex-col items-center gap-0">
      <div>
        <h2 class="font-sans text-[clamp(2.2rem,5vw,3.8rem)] font-extrabold text-white leading-[1.06] m-0 text-center">
          Scanship Wastewater Management System Modules
        </h2>
      </div>      
    </div>
  </div>

  <!-- Stack viewport -->
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
            <!-- REVISED: Individual card arrow now goes to Dashboard -->
            <button
              @click="goToDashboard"
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
    <!-- REVISED: "View more modules" now goes to Dashboard -->
    <button 
      @click="goToDashboard"
      class="inline-flex items-center gap-3 px-8 py-3.5 border border-white/10 rounded-[14px] text-white/90 bg-white/5 hover:bg-white/10 hover:border-white/30 transition-all cursor-pointer group"
    >
      <span class="font-bold text-[1rem]">View more modules</span>
      <span class="text-xl group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform">↗</span>
    </button>
  </div>
</section>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,500;12..96,600;12..96,700;12..96,800&family=DM+Sans:ital,opsz,wght@0,9..40,300;0,9..40,400;0,9..40,500;1,9..40,300&display=swap');

.reveal {
  opacity: 0;
  transform: translateY(22px);
  transition: opacity 0.6s cubic-bezier(0.22,1,0.36,1), transform 0.6s cubic-bezier(0.22,1,0.36,1);
  transition-delay: var(--delay, 0ms);
}
.reveal.is-visible { opacity: 1; transform: translateY(0); }

:deep(.scroll-stack-container),
:deep(.scroll-stack-inner) {
  scrollbar-width: none !important;
  -ms-overflow-style: none !important;
}
:deep(.scroll-stack-container)::-webkit-scrollbar,
:deep(.scroll-stack-inner)::-webkit-scrollbar { display: none !important; }

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

.fade-enter-active, .fade-leave-active { transition: opacity 0.22s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>