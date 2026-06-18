<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

// I-import ang background image
import BG_PerModule from '../assets/BG_PerModule.jpg'

const router = useRouter()
const activeLesson = ref(null)

const lessons = [
  {
    id: 1,
    number: '01',
    title: 'Definition of Wastewater',
    content: {
      intro: 'Wastewater is used water that originates from various sources, including:',
      bullets: [
        'Blackwater (Sewage)',
        'Graywater (sinks, showers, and galleys)',
        'Foodwaste (grease separators and decanters)',
      ],
      closing: 'Wastewater, called effluent, from these sources contains various contaminants including but not limited to organic matter, chemicals, pathogens and solid waste. As such, effluents must be treated before releasing back into the environment.'
    }
  },
  {
    id: 2,
    number: '02',
    title: 'Types of Wastewaters',
    content: {
      intro: 'Cruise ships produce several categories of wastewater, each with unique characteristics:',
      bullets: [
        'Blackwater: Sanitary sewage from toilets and medical facilities. Contains high concentrations of pathogens, nitrogen, phosphorus, and organic matter.',
        'Graywater: Wastewater from sinks, showers, laundries, dishwashers, and galleys. Although less contaminated than blackwater, it contains detergents, food waste, and grease.',
        'Bilge Water: Oily water that collects in the lowest part of the ship\'s hull, typically treated separately.',
        'Ballast Water: Taken in or discharged to maintain vessel stability; often regulated to prevent invasive species transfer (not part of sewage but relevant to water discharge).',
        'Other Waste Streams: Including condensate, pool water, and drain water from various systems.',
      ],
      closing: null
    }
  },
  {
    id: 3,
    number: '03',
    title: 'Wastewater Collection',
    content: {
      intro: 'Wastewater is collected through a network of gravity-fed and pumped systems. Blackwater and graywater are typically routed to holding tanks before entering treatment processes. Segregation of waste streams is critical to optimize treatment efficiency and prevent cross-contamination.',
      bullets: [],
      closing: 'Advanced onboard systems use flow meters, sensors, and automated controls to monitor flow rates, tank levels, and treatment performance in real time. Food digesters, decanters and dryers are also used to extract water content to further reduce carbon footprint in waste incineration and offshore offloading.'
    }
  },
  {
    id: 4,
    number: '04',
    title: 'Scanship Advance Wastewater Technology',
    content: {
      intro: 'The Scanship Advance Wastewater Plant (AWP) is a Moving Bed Biofilm Reactor (MBBR) system combined with chemical treatment that cleans wastewater in accordance to international and national standards before discharging to the marine environment.',
      bullets: [],
      closing: null
    }
  },
  {
    id: 5,
    number: '05',
    title: 'Regulatory Framework',
    content: {
      intro: 'Cruise ship wastewater systems must comply with multiple international and national regulations, including:',
      bullets: [
        'MARPOL Annex IV: International Convention for the Prevention of Pollution from Ships, governing sewage discharge from ships.',
        'IMO Guidelines: Provide performance standards for sewage treatment plants.',
        'U.S. EPA Vessel General Permit (VGP): Requires specific effluent limits and best management practices (BMPs) for vessels operating in U.S. waters.',
        'Alaska Cruise Ship Regulations: Enforce stricter discharge standards due to the sensitivity of marine ecosystems.',
      ],
      closing: 'Discharges are often restricted to certain distances from shore (e.g., >12 nautical miles) and may be prohibited in protected zones or no-discharge areas.'
    }
  },
  {
    id: 6,
    number: '06',
    title: 'Technology Advancements',
    content: {
      intro: 'Multiple advancements have been made on Scanship\'s AWP. Efforts to produce smaller, more energy-efficient, circular economy-designed equipment have established Scanship systems as a cruise-leading sustainable solution to waste management.',
      bullets: [],
      closing: 'This document contains further information regarding leading technological advancements from our newly installed systems.'
    }
  },
]
</script>

<template>
  <div class="min-h-screen bg-[#040f1e] text-white font-['DM_Sans']">
    <Navbar />

<!-- HERO BANNER -->
<section class="pt-20 pb-0">
    <div 
      class="relative overflow-hidden flex items-center justify-center" 
      :style="{ 
        backgroundImage: `url(${BG_PerModule})`, 
        backgroundPosition: 'center center', 
        backgroundSize: 'cover', 
        backgroundRepeat: 'no-repeat',
        minHeight: '500px' 
      }" 
    >
        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-[#040f1e]/50"></div>

        <!-- 1. CENTERED CONTENT (Main Title) -->
        <div class="relative z-10 w-full max-w-[1000px] mx-auto px-8 text-center"> 
            <h1 class="font-['Bricolage_Grotesque'] text-[clamp(2.5rem,7vw,4.2rem)] font-extrabold text-white leading-[1.1] drop-shadow-2xl">
                Module 1: Introduction to <br class="hidden md:block"> Wastewater Systems
            </h1>
        </div>

        <!-- 2. BOTTOM CONTENT (Subtitle at the Footer of the Image) -->
        <div class="absolute bottom-4 left-0 right-0 z-10 text-center px-8">
            <p class="text-white text-[0.9rem] md:text-[1.1rem] font-medium tracking-[0.2em] uppercase drop-shadow-md">
                World leading solutions for cleaner oceans
            </p>
            <!-- Optional: A small accent line -->
            <div class="bg-[#4da8f0] mx-auto mt-2 opacity-60"></div>
        </div>
    </div>
</section>

    <!-- MAIN CONTENT -->
    <section class="max-w-[1000px] mx-auto px-8 py-10 lg:px-0">

      <!-- Two column grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        <!-- LEFT -->
        <div>
          <!-- Overview -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-3">Overview</h2>
            <p class="text-[0.9rem] text-white leading-relaxed mb-3">
              Cruise vessels generally produce significant amounts of wastewater from various onboard sources. This includes blackwater (sewage), graywater (from sinks, showers and galleys, as well as bilge and ballast water). To accommodate the large number of passengers and crew members, an advance wastewater system is required to protect the marine environment, maintain public health standards, and comply with international maritime standards.
            </p>
            <p class="text-[0.9rem] text-white leading-relaxed">
              This document provides an introduction of advanced wastewater systems provided by Scanship specific to cruise vessels with detailing the types of wastewaters handled, system components, treatment processes and regulatory frameworks outlined in this document.
            </p>
          </div>


          <!-- Contents -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-4">Contents</h2>
            <div>
              <div v-for="(item, i) in [
                'Definition of Wastewater',
                'Types of Wastewaters',
                'Wastewater Collection',
                'Scanship Advance Wastewater Technology',
                'Regulatory Framework',
                'Technology Advancements'
              ]" :key="i" class="flex items-center gap-4 py-3 border-b border-white/50">
                <span class="text-[0.75rem] font-black text-[#b5f4ff] w-4 shrink-0">{{ i + 1 }}</span>
                <span class="text-[0.88rem] text-white">{{ item }}</span>
              </div>
            </div>
          </div>


          <!-- Prior Knowledge -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-3">Prior Knowledge</h2>
            <p class="text-[0.9rem] text-white leading-relaxed">
              Basic familiarity with shipboard operations and general environmental concepts. No advanced engineering background is required.
            </p>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="space-y-5">

          <!-- Module Info -->
          <div class="rounded-[20px] border border-white bg-[#00364D] p-8 space-y-3">
            <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white uppercase mb-1">Module Info</p>
            <div class="flex items-start justify-between text-[0.82rem] gap-2">
              <span class="text-white shrink-0">Created by</span>
              <span class="font-semibold text-white text-right">Ian Estanislao<br><span class="text-white/40 font-normal text-[0.75rem]">Service Manager</span></span>
            </div>
            <div class="h-px bg-white"></div>
            <div class="flex items-start justify-between text-[0.82rem] gap-2">
              <span class="text-white shrink-0">Approved by</span>
              <span class="font-semibold text-white text-right">Micheal Taylor<br><span class="text-white/40 font-normal text-[0.75rem]">Vice President</span></span>
            </div>
            <div class="h-px bg-white"></div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white">Regulation</span>
              <span class="font-semibold text-white">MARPOL Annex IV</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white">Doc Rev</span>
              <span class="font-semibold text-white">2025</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LESSONS LIST -->
      <!-- LESSONS LIST -->
      <div class="mt-16">
        <div class="mb-10 text-center lg:text-left">
          <p class="text-[0.7rem] font-bold tracking-[0.3em] text-[#4da8f0] uppercase mb-3">Technical Deep-Dive</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[2.2rem] font-extrabold text-white leading-tight">Module Lessons</h2>
        </div>

        <div class="space-y-4">
          <div v-for="lesson in lessons" :key="lesson.id"
            @click="activeLesson = activeLesson === lesson.id ? null : lesson.id"
            class="group relative rounded-[20px] border transition-all duration-500 overflow-hidden cursor-pointer"
            :class="[
              activeLesson === lesson.id 
              ? 'border-[#4da8f0]/60 bg-gradient-to-b from-[#00364D] to-[#011c29] shadow-[0_10px_30px_rgba(0,0,0,0.3)]' 
              : 'border-white/10 bg-white/[0.03] hover:border-white/30 hover:bg-white/[0.06] hover:-translate-y-1'
            ]">
            
            <!-- Glow Effect on Hover (Hidden by default) -->
            <div class="absolute inset-0 bg-gradient-to-r from-[#4da8f0]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            <div class="relative flex items-center gap-5 p-6 md:p-7">
              <!-- Animated Number Badge -->
              <div class="shrink-0 w-12 h-12 rounded-[12px] flex items-center justify-center font-['Bricolage_Grotesque'] text-[1rem] font-black transition-all duration-500"
                :class="activeLesson === lesson.id ? 'bg-[#4da8f0] text-white shadow-[0_0_15px_rgba(77,168,240,0.5)]' : 'bg-white/10 text-white/50 group-hover:text-white'">
                {{ lesson.number }}
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-['Bricolage_Grotesque'] text-[1.05rem] md:text-[1.15rem] font-bold text-white transition-colors duration-300"
                  :class="activeLesson === lesson.id ? 'text-[#4da8f0]' : 'group-hover:text-white'">
                  {{ lesson.title }}
                </h3>
                <div class="flex items-center gap-3 mt-1">
                   <span class="text-[0.65rem] font-bold tracking-wider uppercase text-white/30">Lesson Contents</span>
                   <div class="h-px w-8 bg-white/10"></div>
                </div>
              </div>

              <!-- Modern SVG Chevron -->
              <div class="shrink-0 w-8 h-8 rounded-full border border-white/10 flex items-center justify-center transition-all duration-500"
                :class="activeLesson === lesson.id ? 'rotate-180 bg-[#4da8f0] border-[#4da8f0]' : 'bg-white/5'">
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round">
                  <polyline points="6 9 12 15 18 9"></polyline>
                </svg>
              </div>
            </div>

            <!-- Expanded content with Slide-down logic -->
            <Transition name="expand">
              <div v-if="activeLesson === lesson.id" class="relative px-6 pb-8 md:px-24">
                <div class="pt-2 space-y-5 border-t border-white/10">
                  <div class="mt-6">
                    <p class="text-[0.95rem] text-white/80 leading-relaxed italic border-l-2 border-[#4da8f0] pl-4">
                      {{ lesson.content.intro }}
                    </p>
                  </div>
                  
                  <ul v-if="lesson.content.bullets.length > 0" class="space-y-4">
                    <li v-for="(bullet, i) in lesson.content.bullets" :key="i"
                      class="flex items-start gap-4 text-[0.9rem] text-white/70 leading-relaxed group/item">
                      <div class="mt-1.5 w-2 h-2 rounded-full bg-[#4da8f0]/40 group-hover/item:bg-[#4da8f0] transition-colors shrink-0 shadow-[0_0_8px_rgba(77,168,240,0)] group-hover/item:shadow-[0_0_8px_rgba(77,168,240,0.6)]"></div>
                      <span class="transition-colors group-hover/item:text-white">{{ bullet }}</span>
                    </li>
                  </ul>

                  <div v-if="lesson.content.closing" class="bg-white/5 rounded-xl p-5 border border-white/5">
                    <p class="text-[0.88rem] text-white/60 leading-relaxed">
                      <strong class="text-white block mb-1 font-['Bricolage_Grotesque']">Summary:</strong>
                      {{ lesson.content.closing }}
                    </p>
                  </div>
                </div>
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

.expand-enter-active, .expand-leave-active {
  transition: all 0.3s ease;
  overflow: hidden;
}
.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
}
.expand-enter-to, .expand-leave-from {
  opacity: 1;
  max-height: 1000px;
}

@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,400;12..96,700;12..96,800&family=DM+Sans:wght@300;400;500&display=swap');

/* Smooth Lesson Expansion */
.expand-enter-active, .expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
  max-height: 2000px; /* High value to allow full expansion */
}

.expand-enter-from, .expand-leave-to {
  opacity: 0;
  max-height: 0;
  transform: translateY(-10px);
}

/* Ensure images and containers don't overflow during transition */
.expand-leave-from, .expand-enter-to {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

</style>