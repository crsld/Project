<script setup>
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

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

const modules = [
  {
    id: 1,
    route: '/module/1',
    name: 'Intro to Wastewater Systems',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 2,
    route: null,
    name: 'Pre-treatment Operations',
    color: '#4da8f0',
    gradientFrom: '#4da8f0',
    thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  },
  {
    id: 3,
    route: null,
    name: 'Advanced Filtration',
    color: '#10b981',
    gradientFrom: '#10b981',
    thumbnail: 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=600&q=80',
  },
  {
    id: 4,
    route: null,
    name: 'Sludge Management',
    color: '#6366f1',
    gradientFrom: '#6366f1',
    thumbnail: 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=600&q=80',
  }
]

const handleSeeDetails = (mod) => {
  if (mod.route) {
    router.push(mod.route)
  }
}

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
  <div class="font-['DM_Sans'] bg-[#040f1e] text-white selection:bg-[#4da8f0]/30">
    <!-- Pass prop to navbar to handle scrolling instead of routing if needed -->
    <Navbar @open-auth="showAuth = true" />

    <!-- ── 1. HERO SECTION (HOME) ── -->
    <section id="home" class="min-h-screen flex flex-col items-center justify-center text-center px-6 pt-20 relative overflow-hidden bg-[#040f1e]">
      <div class="relative max-w-4xl mx-auto w-full reveal">
        <h1 class="font-['Bricolage_Grotesque'] text-[clamp(3.5rem,6vw,4.5rem)] font-black leading-[1.05] tracking-tight mb-8 text-white">
          Unlimited access to Maritime System modules,
          <span class="text-[#9ddbff]">anytime.</span>
        </h1>
        <p class="text-[1.1rem] text-white/70 leading-[1.75] mb-10 max-w-[650px] mx-auto">
          Scanship gives your fleet instant access to a comprehensive library of maritime system modules from navigation to safety compliance. Subscribe once, deploy everywhere.
        </p>
        <div class="flex flex-wrap justify-center gap-4">
          <a href="#modules" class="px-8 py-4 bg-[#4da8f0] hover:bg-[#3b97e0] text-white rounded-full font-bold transition-all transform hover:scale-105">
            Explore Modules
          </a>
          <a href="#about" class="px-8 py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold backdrop-blur-md transition-all">
            About Scanship
          </a>
        </div>
      </div>
    </section>


    <!-- ──  2. VIDEOS  ── -->
    <section id="about" class="py-24 px-8 bg-[#040f1e]">
      <div class="max-w-[1000px] mx-auto">
        <div class="text-center mb-16">
          <p class="text-[1.4rem] font-bold tracking-[0.2em] text-[#b5f4ff] uppercase mb-3">About Scanship</p>
          <p class="text-white text-[1rem] max-w-[900px] mx-auto">
            Discover how Scanship is revolutionizing maritime wastewater management with cutting-edge technology.
          </p>
        </div>

        <!-- Featured Video -->
        <div class="reveal mb-10 group cursor-pointer" @click="selectedVideo = videos[0].id">
          <div class="relative aspect-video rounded-[24px] overflow-hidden border border-white/[0.1] bg-black shadow-2xl">
            <img :src="`https://img.youtube.com/vi/${videos[0].youtubeId}/maxresdefault.jpg`" class="w-full h-full object-cover opacity-60 group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 flex items-center justify-center">
               <div class="w-20 h-20 rounded-full bg-[#4da8f0] flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                <svg width="30" height="30" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
              </div>
            </div>
            <div class="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black to-transparent">
              <h3 class="text-2xl font-bold text-white">{{ videos[0].title }}</h3>
              <p class="text-white/70">{{ videos[0].description }}</p>
            </div>
          </div>
        </div>

        <!-- Other Videos Grid -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div v-for="video in videos.slice(1)" :key="video.id" 
            @click="selectedVideo = video.id"
            class="reveal group cursor-pointer rounded-2xl overflow-hidden border border-white/[0.05] bg-white/[0.02] hover:bg-white/[0.05] transition-all">
            <div class="relative aspect-video">
              <img :src="`https://img.youtube.com/vi/${video.youtubeId}/mqdefault.jpg`" class="w-full h-full object-cover opacity-50" />
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="w-12 h-12 rounded-full bg-white/20 backdrop-blur-md flex items-center justify-center group-hover:bg-[#4da8f0] transition-colors">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="white"><polygon points="5 3 19 12 5 21 5 3"/></svg>
                </div>
              </div>
            </div>
            <div class="p-5">
              <h4 class="font-bold text-white text-sm line-clamp-2">{{ video.title }}</h4>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── 4. MODULES (OUR COURSES) ── -->
    <section id="modules" class="py-10 px-8 bg-[#040f1e]">
      <div class="max-w-[1200px] mx-auto">
        <div class="text-center mb-16">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#b5f4ff] uppercase mb-3">Our Courses</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[clamp(2rem,4vw,3rem)] font-extrabold text-white mb-4">
            Our Most Popular <span class="text-[#b5f4ff]">Modules</span>
          </h2>
          <p class="text-white text-[1rem] max-w-[800px] mx-auto">
            Industry leading maritime wastewater training built for compliance and operational excellence.
          </p>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-2">
          <div v-for="mod in modules" :key="mod.id" class="reveal group bg-white/[0.03] border border-white/[0.08] rounded-2xl overflow-hidden flex flex-col hover:border-[#4da8f0]/50 transition-all">
            <div class="h-44 overflow-hidden relative">
              <img :src="mod.thumbnail" class="w-full h-full object-cover opacity-60 group-hover:scale-110 transition-transform duration-500" />
              <div class="absolute inset-0 bg-gradient-to-t from-[#061120] to-transparent"></div>
            </div>
            <div class="p-6 flex flex-col flex-1">
              <h3 class="font-bold text-[1.1rem] mb-6 leading-tight h-12">{{ mod.name }}</h3>
              <button @click="handleSeeDetails(mod)" 
                class="mt-auto w-full py-3 rounded-xl font-bold text-xs uppercase tracking-wider transition-all"
                :class="mod.route ? 'bg-[#4da8f0] hover:bg-[#3b97e0] text-white' : 'bg-white/5 text-white/30 cursor-not-allowed'">
                {{ mod.route ? 'See Details' : 'Coming Soon' }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VIDEO MODAL ── -->
    <Transition name="fade">
      <div v-if="selectedVideo" class="fixed inset-0 z-[1000] flex items-center justify-center p-4 bg-black/90 backdrop-blur-xl" @click.self="selectedVideo = null">
        <div class="relative w-full max-w-5xl">
          <button @click="selectedVideo = null" class="absolute -top-12 right-0 text-white hover:text-[#4da8f0] text-3xl transition-colors">✕</button>
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
::-webkit-scrollbar-track { background: #040f1e; }
::-webkit-scrollbar-thumb { background: #1a293d; border-radius: 5px; }
::-webkit-scrollbar-thumb:hover { background: #4da8f0; }
</style>