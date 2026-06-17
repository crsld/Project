<script setup>
import { ref, onMounted, computed } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()
const user = ref(null)
const selectedVideo = ref(null)

const videos = [
  {
    id: 1,
    title: 'Wastewater Systems Overview',
    description: 'Understanding the fundamentals of maritime wastewater management',
    youtubeId: 'Dzg0nwCpY8c',
    thumbnail: 'https://img.youtube.com/vi/Dzg0nwCpY8c/maxresdefault.jpg'
  },
  {
    id: 2,
    title: 'Treatment Technologies Explained',
    description: 'Comprehensive overview of modern treatment systems',
    youtubeId: '2QfEAr3kmHE',
    thumbnail: 'https://img.youtube.com/vi/2QfEAr3kmHE/maxresdefault.jpg'
  },
  {
    id: 3,
    title: 'Regulatory Compliance Guide',
    description: 'MARPOL Annex IV and international standards',
    youtubeId: 'WteGcQ_GcBw',
    thumbnail: 'https://img.youtube.com/vi/WteGcQ_GcBw/maxresdefault.jpg'
  },
  {
    id: 4,
    title: 'Operational Best Practices',
    description: 'Optimization tips and maintenance procedures',
    youtubeId: 'MpKaKnOM75o',
    thumbnail: 'https://img.youtube.com/vi/MpKaKnOM75o/maxresdefault.jpg'
  }
]


const modules = [
  {
    id: 1,
    route: '/dashboard/module/1',
    name: 'Intro to Wastewater Systems',
    price: '$29/mo',
    status: 'unlocked',
    lessonCount: 3,
    learnersCount: '12,500+',
    description: 'An introduction to maritime wastewater management systems, regulatory frameworks, and shipboard treatment principles.',
    color: '#f59e0b',
    gradientFrom: '#f59e0b',
    gradientTo: '#d97706',
    thumbnail: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80',
  },
  {
    id: 2,
    route: null,
    name: 'Pre-treatment Operations',
    price: '$29/mo',
    status: 'unlocked',
    lessonCount: 4,
    learnersCount: '8,200+',
    description: 'Covers the initial screening and comminution steps that prepare raw wastewater before biological or chemical treatment.',
    color: '#4da8f0',
    gradientFrom: '#4da8f0',
    gradientTo: '#3b82f6',
    thumbnail: 'https://images.unsplash.com/photo-1504328345606-18bbc8c9d7d1?w=600&q=80',
  },
  {
    id: 3,
    route: null,
    name: 'Mixing & Bioreactor',
    price: '$49/mo',
    status: 'locked',
    lessonCount: 5,
    learnersCount: '5,100+',
    description: 'Biological treatment using activated sludge, MBBR, and sequencing batch reactor technologies for organic matter removal.',
    color: '#10b981',
    gradientFrom: '#10b981',
    gradientTo: '#059669',
    thumbnail: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=600&q=80',
  },
  {
    id: 4,
    route: null,
    name: 'Flocculation Unit',
    price: '$49/mo',
    status: 'locked',
    lessonCount: 4,
    learnersCount: '4,800+',
    description: 'Physical-chemical treatment using flocculation and sedimentation to remove suspended solids and colloidal matter.',
    color: '#8b5cf6',
    gradientFrom: '#8b5cf6',
    gradientTo: '#7c3aed',
    thumbnail: 'https://images.unsplash.com/photo-1564419320461-6870880221ad?w=600&q=80',
  },
]

const totalLearners = computed(() =>
  modules.reduce((sum, m) => sum + parseInt(m.learnersCount.replace(/[^\d]/g, '')), 0)
)
const totalModules = computed(() => modules.length)

const handleSeeDetails = (mod) => {
  if (mod.route) {
    router.push(mod.route)
  }
}
</script>

<template>
  <div class="min-h-screen bg-[#040f1e] text-white font-['DM_Sans']">
    <Navbar />

    <!-- ── HERO SECTION ── -->
    <section id="home" class="pt-32 pb-16 px-8 bg-gradient-to-br from-[#040f1e] via-[#0a1527] to-[#040f1e]">
      <div class="max-w-[1200px] mx-auto">
        <div class="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          <div class="max-w-[600px]">
            <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#4da8f0] uppercase mb-3">Welcome Back</p>
            <h1 class="font-['Bricolage_Grotesque'] text-[clamp(2.2rem,5vw,3.6rem)] font-extrabold text-white leading-[1.1] mb-3">
              Maritime System Mastery
            </h1>
            <p class="text-[0.95rem] text-white/60 leading-[1.7]">
              Access comprehensive modules on wastewater management, regulatory compliance, and operational excellence. Unlock advanced training and stay ahead in maritime sustainability.
            </p>
          </div>
        </div>
      </div>
    </section>

   <!-- ── FEATURED VIDEOS SECTION ── -->
    <section id="featured-videos" class="px-8 py-16 bg-[#040f1e] border-b border-white/[0.05]">
      <div class="max-w-[900px] mx-auto">
        <div class="mb-12 text-center">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#4da8f0] uppercase mb-3">Learn More</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-white mb-3">
            About ScanShip
          </h2>
          <p class="text-white/50 text-[0.95rem] max-w-[500px] mx-auto">
            Discover how ScanShip is revolutionizing maritime wastewater management with cutting-edge technology and industry expertise.
          </p>
        </div>

        <!-- Main Featured Video (Current Layout) -->
        <div class="mb-12">
          <div class="group rounded-[18px] overflow-hidden border border-white/[0.1] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300">
            <div class="relative w-full pt-[56.25%] bg-black rounded-t-[18px] overflow-hidden">
              <iframe class="absolute top-0 left-0 w-full h-full"
                :src="`https://www.youtube.com/embed/${videos[0].youtubeId}`"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
              </iframe>
            </div>
            <div class="bg-gradient-to-t from-black/80 to-transparent p-6">
              <p class="text-[0.65rem] font-bold tracking-[0.1em] text-white/60 uppercase mb-2">Featured Video</p>
              <h3 class="font-['Bricolage_Grotesque'] text-[1.5rem] font-extrabold text-white leading-snug">
                {{ videos[0].title }}
              </h3>
              <p class="text-[0.9rem] text-white/70 mt-2">{{ videos[0].description }}</p>
            </div>
          </div>
        </div>

        <!-- More Videos (Now styled like the Main Featured Video) -->
        <div class="space-y-8">
          <h3 class="font-['Bricolage_Grotesque'] text-[1.2rem] font-extrabold text-white mb-6">More Videos</h3>
          
          <!-- Grid for the other 3 videos -->
          <div class="grid grid-cols-1 gap-8">
            <div v-for="video in videos.slice(1)" :key="video.id"
              @click="selectedVideo = video.id"
              class="group cursor-pointer rounded-[18px] overflow-hidden border border-white/[0.1] bg-white/[0.02] hover:border-white/[0.15] hover:bg-white/[0.05] transition-all duration-300">
              
              <!-- Video Frame Area -->
              <div class="relative w-full pt-[56.25%] overflow-hidden bg-black">
                <img :src="`https://img.youtube.com/vi/${video.youtubeId}/maxresdefault.jpg`" :alt="video.title"
                  class="absolute top-0 left-0 w-full h-full object-cover opacity-60 group-hover:opacity-80 transition-all duration-500 group-hover:scale-105" />
                
                <!-- Center Play Button Overlay -->
                <div class="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-black/40 transition-all duration-300">
                  <div class="w-16 h-16 rounded-full bg-[#4da8f0] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="white">
                      <polygon points="5 3 19 12 5 21 5 3"/>
                    </svg>
                  </div>
                </div>
              </div>

              <!-- Content Area (Matches the Featured style) -->
              <div class="bg-gradient-to-t from-black/80 to-transparent p-6">
                <p class="text-[0.65rem] font-bold tracking-[0.15em] text-[#4da8f0] uppercase mb-2">Technical Insight</p>
                <h4 class="font-['Bricolage_Grotesque'] text-[1.3rem] font-extrabold text-white leading-tight">
                  {{ video.title }}
                </h4>
                <p class="text-[0.88rem] text-white/60 mt-2 leading-relaxed">
                  {{ video.description }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- ── VIDEO MODAL ── -->
    <Transition name="fade">
      <div v-if="selectedVideo"
        class="fixed inset-0 z-[500] flex items-center justify-center p-4 bg-black/80"
        style="backdrop-filter:blur(20px)"
        @click.self="selectedVideo = null">
        <div class="relative w-full max-w-5xl">
          <button @click="selectedVideo = null"
            class="absolute -top-10 right-0 text-white/60 hover:text-white text-2xl transition-colors cursor-pointer">✕</button>
          <div class="relative w-full pt-[56.25%] rounded-[16px] overflow-hidden border border-white/[0.1]">
            <iframe :src="`https://www.youtube.com/embed/${videos.find(v => v.id === selectedVideo)?.youtubeId}?autoplay=1`"
              class="absolute top-0 left-0 w-full h-full"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen>
            </iframe>
          </div>
        </div>
      </div>
    </Transition>

    <!-- ── OUR COURSES SECTION ── -->
    <section id="all-modules" class="px-8 py-16 bg-[#040f1e]">
      <div class="max-w-[1200px] mx-auto">

        <!-- Section Header -->
        <div class="text-center mb-12">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#4da8f0] uppercase mb-3">Our Courses</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[clamp(1.8rem,3vw,2.6rem)] font-extrabold text-white mb-3">
            Our Most Popular <span class="text-[#4da8f0]">Modules</span>
          </h2>
          <p class="text-white/50 text-[0.95rem] max-w-[500px] mx-auto">
            Industry leading maritime wastewater training built for compliance and operational excellence.
          </p>
        </div>

        <!-- Modules Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div v-for="mod in modules" :key="mod.id"
            class="group rounded-[16px] overflow-hidden border border-white/[0.1] bg-white/[0.03] hover:border-white/[0.2] hover:bg-white/[0.06] transition-all duration-300 flex flex-col">

            <!-- Card Thumbnail Image -->
            <div class="relative h-44 overflow-hidden">
              <img :src="mod.thumbnail" :alt="mod.name"
                class="w-full h-full object-cover opacity-70 group-hover:opacity-85 group-hover:scale-105 transition-all duration-500" />

              <!-- Overlay gradient -->
              <div class="absolute inset-0"
                :style="`background: linear-gradient(to bottom, ${mod.gradientFrom}30, rgba(4,15,30,0.6))`">
              </div>

              <!-- Status badges -->
              <div class="absolute top-3 left-3 flex gap-2 flex-wrap">
                <span class="text-[0.6rem] font-bold px-2.5 py-1 rounded-full"
                  :style="`background:${mod.color}25;border:1px solid ${mod.color}50;color:${mod.color}`">
                  {{ mod.category }}
                </span>
                <span v-if="mod.status === 'unlocked'"
                  class="text-[0.6rem] font-bold px-2.5 py-1 rounded-full bg-[#10b981]/20 border border-[#10b981]/40 text-[#10b981]">
                  ● Unlocked
                </span>
                <span v-else
                  class="text-[0.6rem] font-bold px-2.5 py-1 rounded-full bg-black/40 border border-white/20 text-white/50">
                  🔒 Locked
                </span>
              </div>

              <!-- Duration badge top-right -->
              <div class="absolute top-3 right-3">
                <span class="flex items-center gap-1 text-[0.6rem] font-bold px-2.5 py-1 rounded-full bg-black/50 border border-white/10 text-white/70">
                  ● {{ mod.duration }}
                </span>
              </div>
            </div>

            <!-- Card Body -->
            <div class="p-5 flex flex-col flex-1">

              <!-- Category pill below image (matches reference style) -->
              <div class="flex items-center justify-between mb-3">
                <span class="text-[0.7rem] font-bold px-2.5 py-1 rounded-full"
                  :style="`background:${mod.color}15;color:${mod.color}`">
                  {{ mod.category }}
                </span>
                <span class="flex items-center gap-1 text-[0.7rem] text-white/40">
                  ⏱ {{ mod.duration }}
                </span>
              </div>

              <!-- Title -->
              <h3 class="font-['Bricolage_Grotesque'] text-[1rem] font-extrabold text-white leading-snug mb-2 line-clamp-2">
                {{ mod.name }}
              </h3>

              <!-- Stats row -->
              <div class="flex items-center gap-4 mb-4 mt-auto pt-3 border-t border-white/[0.05]">
                <span class="flex items-center gap-1 text-[0.72rem] text-white/50">
                  📚 {{ mod.lessonCount }} Modules
                </span>
                <span class="flex items-center gap-1 text-[0.72rem] text-white/50">
                  👥 {{ mod.learnersCount }} Learners
                </span>
              </div>

              <!-- Progress bar (unlocked only) -->
              <div v-if="mod.status === 'unlocked'" class="mb-4">
                <div class="flex items-center justify-between mb-1.5">
                  <span class="text-[0.65rem] text-white/40">Progress</span>
                  <span class="text-[0.7rem] font-semibold" :style="`color:${mod.color}`">{{ mod.progress }}%</span>
                </div>
                <div class="h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
                  <div class="h-full rounded-full transition-all duration-500"
                    :style="`width:${mod.progress}%;background:${mod.color}`">
                  </div>
                </div>
              </div>

              <!-- See Details Button -->
              <button
                @click="handleSeeDetails(mod)"
                class="w-full py-2.5 rounded-[10px] text-[0.82rem] font-bold transition-all duration-200 cursor-pointer"
                :class="[
                  mod.route
                    ? 'text-white hover:opacity-90'
                    : 'bg-white/[0.05] text-white/40 cursor-not-allowed border border-white/[0.08]'
                ]"
                :style="mod.route ? `background:${mod.color};border:1px solid ${mod.color}` : ''">
                {{ mod.route ? 'See Details' : mod.price }}
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.fade-enter-active, .fade-leave-active { transition: opacity 0.3s ease; }
.fade-enter-from, .fade-leave-to { opacity: 0; }

::-webkit-scrollbar { width: 8px; height: 8px; }
::-webkit-scrollbar-track { background: transparent; }
::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.1); border-radius: 4px; }
::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.2); }
</style>