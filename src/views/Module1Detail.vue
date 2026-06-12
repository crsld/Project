<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

const router = useRouter()

const lessons = [
  {
    id: 1,
    number: '01',
    title: 'Definition & Types of Wastewater',
    duration: '45 min',
    description: 'Blackwater, graywater, bilge water, ballast water — what each stream contains and why segregation matters.',
    icon: '💧',
    status: 'completed'
  },
  {
    id: 2,
    number: '02',
    title: 'Wastewater Collection & Monitoring',
    duration: '60 min',
    description: 'Gravity-fed and pumped collection networks, holding tanks, flow meters, sensors, and automated controls.',
    icon: '⚙️',
    status: 'in-progress'
  },
  {
    id: 3,
    number: '03',
    title: 'ScanShip AWP & Regulatory Compliance',
    duration: '75 min',
    description: 'The Moving Bed Biofilm Reactor (MBBR) system, MARPOL Annex IV, IMO Guidelines, and technology advancements.',
    icon: '📋',
    status: 'locked'
  }
]

const activeLesson = ref(null)
</script>

<template>
  <div class="min-h-screen bg-[#040f1e] text-white font-['DM_Sans']">
    <Navbar />

    <!-- ── HERO BANNER ── -->
    <section class="pt-24 pb-0">
      <div class="relative overflow-hidden bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]" style="min-height:220px">
        <!-- Background texture -->
        <div class="absolute inset-0 opacity-10"
          style="background-image: radial-gradient(circle at 20% 50%, white 1px, transparent 1px), radial-gradient(circle at 80% 20%, white 1px, transparent 1px); background-size: 60px 60px;">
        </div>
        <!-- Decorative circles -->
        <div class="absolute -right-16 -top-16 w-64 h-64 rounded-full border-2 border-white/20"></div>
        <div class="absolute right-24 bottom-0 w-32 h-32 rounded-full border border-white/10"></div>
        <div class="absolute left-1/2 top-0 w-48 h-48 rounded-full border border-white/10 -translate-x-1/2"></div>

        <div class="relative z-10 max-w-[900px] mx-auto px-8 py-16 text-center">
          <!-- Back button -->
          <button @click="router.push('/dashboard')"
            class="inline-flex items-center gap-2 text-white/70 hover:text-white text-[0.8rem] font-semibold mb-6 transition-colors cursor-pointer">
            ← Back to All Modules
          </button>
          <div class="inline-block text-[0.65rem] font-bold px-3 py-1.5 rounded-full bg-white/20 border border-white/30 text-white mb-4 tracking-[0.15em] uppercase">
            Foundation Module
          </div>
          <h1 class="font-['Bricolage_Grotesque'] text-[clamp(2rem,5vw,3.2rem)] font-extrabold text-white leading-tight">
            Introduction to Wastewater Systems
          </h1>
        </div>
      </div>
    </section>

    <!-- ── CONTENT ── -->
    <section class="max-w-[900px] mx-auto px-8 py-12">

      <!-- Meta row -->
      <div class="flex flex-wrap items-center gap-6 pb-8 mb-8 border-b border-white/[0.08]">
        <div>
          <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">Competency Category</p>
          <span class="inline-block text-[0.75rem] font-semibold px-3 py-1 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b]">
            Foundation
          </span>
        </div>
        <div class="w-px h-8 bg-white/[0.08] hidden md:block"></div>
        <div>
          <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">Total Duration</p>
          <p class="text-[0.9rem] font-semibold text-white">4 Hours</p>
        </div>
        <div class="w-px h-8 bg-white/[0.08] hidden md:block"></div>
        <div>
          <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">Lessons</p>
          <p class="text-[0.9rem] font-semibold text-white">3 Lessons</p>
        </div>
        <div class="w-px h-8 bg-white/[0.08] hidden md:block"></div>
        <div>
          <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">Learners</p>
          <p class="text-[0.9rem] font-semibold text-white">12,500+</p>
        </div>
      </div>

      <!-- Grid: main content + sidebar -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        <!-- LEFT COLUMN -->
        <div>

          <!-- Learning Tools -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-3">
              Learning Tools
            </h2>
            <p class="text-[0.9rem] text-white/60 leading-relaxed">
              Computer or tablet with internet access. Access to ScanShip system documentation and regulatory references (MARPOL Annex IV, IMO Guidelines).
            </p>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Focus of Lesson -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-3">
              Focus of Lesson
            </h2>
            <p class="text-[0.9rem] text-white/60 leading-relaxed">
              Establish foundational knowledge of maritime wastewater management by defining wastewater types (blackwater, graywater, bilge water), exploring onboard collection systems, and introducing the ScanShip Advanced Wastewater Plant (AWP). Learners will understand regulatory compliance under MARPOL Annex IV and IMO standards as essential operational requirements for cruise vessels.
            </p>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Prior Knowledge -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-3">
              Prior Knowledge
            </h2>
            <p class="text-[0.9rem] text-white/60 leading-relaxed">
              Basic familiarity with shipboard operations and general environmental concepts. No advanced engineering background is required.
            </p>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Duration breakdown -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-4">
              Duration
            </h2>
            <div class="space-y-3">
              <div class="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <span class="text-[0.85rem] text-white/60">Total Duration</span>
                <span class="text-[0.85rem] font-semibold text-white">4 Hours</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <span class="text-[0.85rem] text-white/60">Lesson 1 — Definition & Types</span>
                <span class="text-[0.85rem] font-semibold text-white">45 min</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <span class="text-[0.85rem] text-white/60">Lesson 2 — Collection & Monitoring</span>
                <span class="text-[0.85rem] font-semibold text-white">60 min</span>
              </div>
              <div class="flex items-center justify-between py-3 border-b border-white/[0.05]">
                <span class="text-[0.85rem] text-white/60">Lesson 3 — AWP & Compliance</span>
                <span class="text-[0.85rem] font-semibold text-white">75 min</span>
              </div>
              <div class="flex items-center justify-between py-3">
                <span class="text-[0.85rem] text-white/60">Assessment & Review</span>
                <span class="text-[0.85rem] font-semibold text-white">60 min</span>
              </div>
            </div>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Key Topics -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-4">
              Key Topics Covered
            </h2>
            <ul class="space-y-3">
              <li v-for="topic in [
                'Definition of wastewater and effluent categories',
                'Blackwater, graywater, bilge water, and ballast water characteristics',
                'Gravity-fed and pumped collection network design',
                'Real-time monitoring: flow meters, sensors, automated controls',
                'ScanShip AWP — Moving Bed Biofilm Reactor (MBBR) technology',
                'MARPOL Annex IV compliance and discharge restrictions',
                'IMO performance standards for sewage treatment plants',
                'Technology advancements in circular economy waste design'
              ]" :key="topic"
                class="flex items-start gap-3 text-[0.85rem] text-white/60">
                <span class="mt-1 w-4 h-4 rounded-full bg-[#f59e0b]/20 border border-[#f59e0b]/40 flex items-center justify-center shrink-0">
                  <span class="w-1.5 h-1.5 rounded-full bg-[#f59e0b]"></span>
                </span>
                {{ topic }}
              </li>
            </ul>
          </div>

        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="space-y-5">

          <!-- Progress card -->
          <div class="rounded-[16px] border border-white/[0.1] bg-white/[0.04] p-6">
            <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-4">Your Progress</p>
            <div class="flex items-end justify-between mb-3">
              <span class="font-['Bricolage_Grotesque'] text-[2.2rem] font-black text-[#f59e0b]">78%</span>
              <span class="text-[0.75rem] text-white/40 mb-1">1 of 3 complete</span>
            </div>
            <div class="h-2.5 bg-white/[0.06] rounded-full overflow-hidden mb-5">
              <div class="h-full rounded-full bg-gradient-to-r from-[#f59e0b] to-[#d97706]" style="width:78%"></div>
            </div>
            <button class="w-full py-3 rounded-[10px] text-[0.85rem] font-bold bg-[#f59e0b] hover:bg-[#d97706] text-white transition-all cursor-pointer">
              Continue Learning →
            </button>
          </div>

          <!-- Module info card -->
          <div class="rounded-[16px] border border-white/[0.1] bg-white/[0.04] p-6 space-y-4">
            <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase">Module Info</p>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Category</span>
              <span class="font-semibold text-white">Foundation</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Regulation</span>
              <span class="font-semibold text-white">MARPOL Annex IV</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Certificate</span>
              <span class="font-semibold text-[#10b981]">Yes, on completion</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Created by</span>
              <span class="font-semibold text-white">Ian Estanislao</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Approved by</span>
              <span class="font-semibold text-white">Micheal Taylor</span>
            </div>
          </div>

          <!-- About ScanShip teaser -->
          <div class="rounded-[16px] border border-[#4da8f0]/20 bg-[#4da8f0]/[0.04] p-5">
            <p class="text-[0.65rem] font-bold tracking-[0.15em] text-[#4da8f0] uppercase mb-2">About ScanShip</p>
            <p class="text-[0.8rem] text-white/50 leading-relaxed">
              World-leading solutions for cleaner oceans. ScanShip AWP combines MBBR biological treatment with chemical processing for full MARPOL compliance.
            </p>
          </div>
        </div>

      </div>

      <!-- ── LESSONS LIST ── -->
      <div class="mt-16">
        <div class="mb-8">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#4da8f0] uppercase mb-2">Course Content</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[1.8rem] font-extrabold text-white">
            Module Lessons
          </h2>
        </div>

        <div class="space-y-4">
          <div v-for="lesson in lessons" :key="lesson.id"
            @click="activeLesson = activeLesson === lesson.id ? null : lesson.id"
            class="rounded-[14px] border transition-all duration-300 cursor-pointer overflow-hidden"
            :class="[
              lesson.status === 'locked'
                ? 'border-white/[0.06] bg-white/[0.02] opacity-60'
                : 'border-white/[0.1] bg-white/[0.04] hover:border-white/[0.15] hover:bg-white/[0.06]',
              activeLesson === lesson.id ? 'border-[#f59e0b]/30' : ''
            ]">

            <!-- Lesson header -->
            <div class="flex items-center gap-5 p-5">
              <!-- Number -->
              <div class="shrink-0 w-12 h-12 rounded-[10px] flex items-center justify-center font-['Bricolage_Grotesque'] text-[1rem] font-black"
                :class="lesson.status === 'completed' ? 'bg-[#10b981]/15 text-[#10b981]' : lesson.status === 'in-progress' ? 'bg-[#f59e0b]/15 text-[#f59e0b]' : 'bg-white/[0.05] text-white/30'">
                <span v-if="lesson.status === 'completed'">✓</span>
                <span v-else>{{ lesson.number }}</span>
              </div>

              <!-- Info -->
              <div class="flex-1 min-w-0">
                <div class="flex items-center gap-2 mb-0.5">
                  <h3 class="font-['Bricolage_Grotesque'] text-[1rem] font-bold text-white truncate">
                    {{ lesson.title }}
                  </h3>
                  <span v-if="lesson.status === 'completed'"
                    class="shrink-0 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-[#10b981]/15 border border-[#10b981]/30 text-[#10b981]">
                    Completed
                  </span>
                  <span v-else-if="lesson.status === 'in-progress'"
                    class="shrink-0 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-[#f59e0b]/15 border border-[#f59e0b]/30 text-[#f59e0b]">
                    In Progress
                  </span>
                  <span v-else
                    class="shrink-0 text-[0.6rem] font-bold px-2 py-0.5 rounded-full bg-white/[0.06] border border-white/[0.1] text-white/30">
                    🔒 Locked
                  </span>
                </div>
                <p class="text-[0.78rem] text-white/40">{{ lesson.duration }}</p>
              </div>

              <!-- Chevron -->
              <div class="shrink-0 text-white/30 transition-transform duration-200"
                :class="activeLesson === lesson.id ? 'rotate-180' : ''">
                ▼
              </div>
            </div>

            <!-- Expanded content -->
            <Transition name="expand">
              <div v-if="activeLesson === lesson.id" class="px-5 pb-5 border-t border-white/[0.06]">
                <p class="text-[0.85rem] text-white/50 leading-relaxed mt-4 mb-4">
                  {{ lesson.description }}
                </p>
                <button v-if="lesson.status !== 'locked'"
                  class="py-2.5 px-6 rounded-[10px] text-[0.82rem] font-bold transition-all cursor-pointer"
                  :class="lesson.status === 'completed' ? 'bg-white/[0.06] text-white/60 hover:bg-white/[0.1]' : 'bg-[#f59e0b] text-white hover:bg-[#d97706]'">
                  {{ lesson.status === 'completed' ? 'Review Lesson' : 'Start Lesson →' }}
                </button>
              </div>
            </Transition>
          </div>
        </div>
      </div>

    </section>

    <Footer />
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');

.expand-enter-active,
.expand-leave-active {
  transition: all 0.25s ease;
  overflow: hidden;
}

.expand-enter-from,
.expand-leave-to {
  opacity: 0;
  max-height: 0;
}

.expand-enter-to,
.expand-leave-from {
  opacity: 1;
  max-height: 300px;
}
</style>