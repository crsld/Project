<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { isLight, pageBg, mutedText, subtleText, ghostButtonClasses, accentText } from '../theme'
import { trainingPrograms } from '../data/trainingPrograms'

const router = useRouter()
const showAuth = ref(false)
const selectedVideo = ref(null)

const videos = [
  {
    id: 1,
    title: 'Wastewater Systems Overview',
    description: 'Understanding the fundamentals of maritime wastewater management',
    youtubeId: 'Dzg0nwCpY8c'
  },
  {
    id: 2,
    title: 'Treatment Technologies Explained',
    description: 'Comprehensive overview of modern treatment systems',
    youtubeId: '2QfEAr3kmHE'
  },
  {
    id: 3,
    title: 'Regulatory Compliance Guide',
    description: 'MARPOL Annex IV and international standards',
    youtubeId: 'WteGcQ_GcBw'
  },
  {
    id: 4,
    title: 'Operational Best Practices',
    description: 'Optimization tips and maintenance procedures',
    youtubeId: 'MpKaKnOM75o'
  }
]

const programs = Object.values(trainingPrograms).map(p => ({
  ...p,
  moduleCount: p.modules.length,
  availableModules: p.modules.filter(m => m.route).length,
}))

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
  <div class="font-['Kanit'] selection:bg-[#2D5C6F]/30 transition-colors duration-300" :class="pageBg">
    <!-- Pass prop to navbar to handle scrolling instead of routing if needed -->
    <Navbar @open-auth="showAuth = true" />

    <!-- ── 1. HERO SECTION (HOME) ── -->
    <section id="home" class="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden">
      <div class="relative max-w-4xl mx-auto w-full reveal">
        <h1 class="font-['Kanit'] text-[clamp(2.4rem,8vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8">
          Unlimited access to Maritime System modules,
          <span :class="accentText">anytime.</span>
        </h1>
        <p class="text-[1.1rem] leading-[1.75] mb-10 max-w-[650px] mx-auto" :class="mutedText">
          Scanship gives your fleet instant access to a comprehensive library of maritime system modules from navigation to safety compliance. Subscribe once, deploy everywhere.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#courses" class="px-8 py-4 bg-[#2D5C6F] hover:bg-[#002E4B] text-white rounded-full font-bold transition-all transform hover:scale-105">
            Explore Courses
          </a>
          <a href="#about" class="px-8 py-4 rounded-full font-bold backdrop-blur-md transition-all border" :class="ghostButtonClasses">
            About the Training
          </a>
        </div>
      </div>
    </section>


    <!-- ──  2. ABOUT THE TRAINING + VIDEOS  ── -->
    <section id="about" class="py-24 px-8">
      <div class="max-w-[1000px] mx-auto">
        <div class="text-center mb-16">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3" :class="accentText">About the Training</p>
          <h2 class="font-['Kanit'] text-[clamp(1.8rem,4vw,2.6rem)] font-extrabold mb-4">
            Welcome to the onboard waste management training platform.
          </h2>
          <p class="text-[1rem] max-w-[800px] mx-auto" :class="mutedText">
            This learning portal is designed to help you develop the knowledge and practical understanding needed to safely and effectively operate onboard waste management systems. Through a series of structured training modules, you will learn about the different systems, how they work, and how to operate them correctly in day-to-day situations.
          </p>
        </div>

        <!-- Learn at Your Own Pace / Start Your Training -->
        <div class="reveal grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          <div class="rounded-2xl border p-6 sm:p-8" :class="isLight ? 'bg-white border-black/10' : 'border-white/[0.08] bg-white/[0.03]'">
            <h3 class="font-['Kanit'] font-bold text-[1.15rem] mb-3" :class="accentText">Learn at Your Own Pace</h3>
            <p class="text-[0.92rem] leading-relaxed" :class="mutedText">
              Each training area is divided into clear, step-by-step modules, making it easy to follow the learning path and return to specific topics whenever needed. You can track your progress, continue where you left off, and access the information you need as you develop your knowledge, skills, and confidence in operating these systems.
            </p>
          </div>
          <div class="rounded-2xl border p-6 sm:p-8" :class="isLight ? 'bg-white border-black/10' : 'border-white/[0.08] bg-white/[0.03]'">
            <h3 class="font-['Kanit'] font-bold text-[1.15rem] mb-3" :class="accentText">Start Your Training</h3>
            <p class="text-[0.92rem] leading-relaxed" :class="mutedText">
              Explore the available training modules and begin with the system most relevant to your role. Each module will guide you through the system, its operation, and the key procedures you need to know for safe and effective operation.
            </p>
          </div>
        </div>

        <!-- Featured Video -->
        <div class="reveal mb-10 group cursor-pointer" @click="selectedVideo = videos[0].id">
          <div class="relative aspect-video rounded-[24px] overflow-hidden border border-white/[0.1] bg-black shadow-2xl">
            <img :src="`https://img.youtube.com/vi/${videos[0].youtubeId}/hqdefault.jpg`" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 flex items-center justify-center">
               <div class="w-20 h-20 rounded-full bg-[#2D5C6F] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-5 sm:p-8 bg-gradient-to-t from-black to-transparent">
              <h3 class="text-lg sm:text-2xl font-bold text-white">{{ videos[0].title }}</h3>
              <p class="text-sm sm:text-base text-white/70">{{ videos[0].description }}</p>
            </div>
          </div>
        </div>

        <!-- Other Videos Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="video in videos.slice(1)" :key="video.id"
            @click="selectedVideo = video.id"
            class="reveal group cursor-pointer rounded-2xl overflow-hidden border transition-all"
            :class="isLight ? 'border-black/[0.05] bg-black/[0.02] hover:bg-black/[0.05]' : 'border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05]'">
            <div class="relative aspect-video">
              <img :src="`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`" class="w-full h-full object-cover opacity-50" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#2D5C6F] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>
            <div class="p-5">
              <h4 class="font-bold text-sm line-clamp-2">{{ video.title }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 3. COURSES (TRAINING PROGRAMS: AWP / EP) ── -->
    <section id="courses" class="py-24 px-8">
      <div class="max-w-[1100px] mx-auto">
        <div class="text-center mb-16">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3" :class="accentText">Our Courses</p>
          <h2 class="font-['Kanit'] text-[clamp(2rem,4vw,3rem)] font-extrabold mb-4">
            Choose Your <span :class="accentText">Training Path</span>
          </h2>
          <p class="text-[1rem] max-w-[800px] mx-auto" :class="mutedText">
            Three training programs covering the onboard systems your crew works with, each broken into progressive modules you can complete at your own pace.
          </p>
        </div>

        <div class="flex flex-col gap-8">
          <div v-for="program in programs" :key="program.key"
            @click="router.push(program.route)"
            class="reveal group relative rounded-[28px] border overflow-hidden cursor-pointer transition-all duration-500 hover:-translate-y-1 hover:border-[#2D5C6F]/60"
            :class="isLight ? 'bg-white border-black/10' : 'bg-white/[0.03] border-white/[0.08]'">
            <div class="grid grid-cols-1 md:grid-cols-[1.2fr_1fr]">
              <!-- Info -->
              <div class="p-8 sm:p-10 flex flex-col justify-center">
                <span class="text-[2.6rem] font-black leading-none mb-3 opacity-25 group-hover:opacity-50 transition-opacity duration-500" :class="accentText">{{ program.number }}</span>
                <h3 class="font-['Kanit'] text-[2.4rem] sm:text-[2.8rem] font-black leading-none mb-2">{{ program.name }}</h3>
                <p class="text-[1rem] font-semibold mb-4" :class="accentText">{{ program.subtitle }}</p>
                <p class="text-[0.95rem] leading-relaxed mb-6 max-w-[420px]" :class="mutedText">{{ program.description }}</p>
                <div class="flex flex-wrap items-center gap-4">
                  <span class="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider px-3 py-1.5 rounded-full border" :class="isLight ? 'border-black/10 bg-black/5' : 'border-white/10 bg-white/5'">
                    {{ program.moduleCount ? `${program.moduleCount} Modules` : 'Modules Coming Soon' }}
                  </span>
                  <span class="inline-flex items-center gap-2 font-bold text-[0.95rem] transition-all duration-300" :class="accentText">
                    View Training
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-1.5"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
                  </span>
                </div>
              </div>

              <!-- Module preview grid -->
              <div class="relative p-8 sm:p-10 flex items-center justify-center" :class="isLight ? 'bg-black/[0.02]' : 'bg-white/[0.02]'">
                <div v-if="program.moduleCount" class="grid grid-cols-4 gap-3 w-full max-w-[260px]">
                  <div v-for="n in program.moduleCount" :key="n"
                    class="aspect-square rounded-xl border flex items-center justify-center text-sm font-black transition-all duration-300 group-hover:scale-110"
                    :class="n <= program.availableModules
                      ? 'bg-[#2D5C6F] border-[#2D5C6F] text-white'
                      : (isLight ? 'border-black/10 bg-black/[0.03] text-black/30' : 'border-white/10 bg-white/[0.03] text-white/30')"
                    :style="{ transitionDelay: (n * 40) + 'ms' }">
                    {{ n }}
                  </div>
                </div>
                <div v-else class="flex flex-col items-center gap-3 text-center" :class="subtleText">
                  <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 3"/></svg>
                  <span class="text-xs font-bold uppercase tracking-wider">Module list coming soon</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VIDEO MODAL ── -->
    <Transition name="fade">
      <div v-if="selectedVideo" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" @click.self="selectedVideo = null">
        <div class="relative w-full max-w-5xl">
          <button @click="selectedVideo = null" class="absolute -top-12 right-0 text-white hover:text-[#2D5C6F] text-3xl transition-colors">✕</button>
          <div class="aspect-video rounded-2xl overflow-hidden shadow-2xl border border-white/10">
            <iframe :src="`https://www.youtube.com/embed/${videos.find(v => v.id === selectedVideo)?.youtubeId}?autoplay=1`" class="w-full h-full" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>
          </div>
        </div>
      </div>
    </Transition>

    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,700;12..96,800&family=DM+Sans:wght@400;500;700&display=swap');

/* Smooth Scroll Animation */
.reveal {
  opacity: 0;
  transform: translateY(30px);
  transition: all 0.8s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.4s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

html { scroll-behavior: smooth; }

/* Scrollbar Customization */
::-webkit-scrollbar { width: 10px; }
::-webkit-scrollbar-track { background: #002E4B; }
::-webkit-scrollbar-thumb { background: #2D5C6F; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #002E4B; }
</style>