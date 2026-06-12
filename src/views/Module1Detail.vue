<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'

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
    title: 'ScanShip Advance Wastewater Technology',
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
    <section class="pt-20 pb-0"> <!-- Changed pt-24 to pt-0 -->
        <div class="relative overflow-hidden bg-gradient-to-br from-[#f59e0b] via-[#d97706] to-[#b45309]" style="min-height:160px"> 
            <div class="relative z-10 max-w-[600px] mx-auto px-8 py-10 text-center"> 
            <h1 class="font-['Bricolage_Grotesque'] text-[clamp(2rem,5vw,2.8rem)] font-extrabold text-white leading-tight">
                Module 1: Introduction to Wastewater Systems
            </h1>
            <p class="text-white/70 text-[0.9rem] mt-2">World leading solutions for cleaner oceans</p>
            </div>
        </div>
        </section>

    <!-- MAIN CONTENT -->
    <section class="max-w-[900px] mx-auto px-8 py-12">

      <!-- Two column grid -->
      <div class="grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-12">

        <!-- LEFT -->
        <div>
          <!-- Overview -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-3">Overview</h2>
            <p class="text-[0.9rem] text-white/60 leading-relaxed mb-3">
              Cruise vessels generally produce significant amounts of wastewater from various onboard sources. This includes blackwater (sewage), graywater (from sinks, showers and galleys, as well as bilge and ballast water). To accommodate the large number of passengers and crew members, an advance wastewater system is required to protect the marine environment, maintain public health standards, and comply with international maritime standards.
            </p>
            <p class="text-[0.9rem] text-white/60 leading-relaxed">
              This document provides an introduction of advanced wastewater systems provided by Scanship specific to cruise vessels with detailing the types of wastewaters handled, system components, treatment processes and regulatory frameworks outlined in this document.
            </p>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Contents -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-4">Contents</h2>
            <div>
              <div v-for="(item, i) in [
                'Definition of Wastewater',
                'Types of Wastewaters',
                'Wastewater Collection',
                'ScanShip Advance Wastewater Technology',
                'Regulatory Framework',
                'Technology Advancements'
              ]" :key="i" class="flex items-center gap-4 py-3 border-b border-white/[0.05]">
                <span class="text-[0.75rem] font-black text-[#f59e0b] w-4 shrink-0">{{ i + 1 }}</span>
                <span class="text-[0.88rem] text-white/60">{{ item }}</span>
              </div>
            </div>
          </div>

          <div class="h-px bg-white/[0.06] mb-8"></div>

          <!-- Prior Knowledge -->
          <div class="mb-8">
            <h2 class="font-['Bricolage_Grotesque'] text-[1.1rem] font-extrabold text-[#4da8f0] mb-3">Prior Knowledge</h2>
            <p class="text-[0.9rem] text-white/60 leading-relaxed">
              Basic familiarity with shipboard operations and general environmental concepts. No advanced engineering background is required.
            </p>
          </div>
        </div>

        <!-- RIGHT SIDEBAR -->
        <div class="space-y-5">

          <!-- Module Info -->
          <div class="rounded-[16px] border border-white/[0.1] bg-white/[0.04] p-6 space-y-3">
            <p class="text-[0.65rem] font-bold tracking-[0.15em] text-white/40 uppercase mb-1">Module Info</p>
            <div class="flex items-start justify-between text-[0.82rem] gap-2">
              <span class="text-white/50 shrink-0">Created by</span>
              <span class="font-semibold text-white text-right">Ian Estanislao<br><span class="text-white/40 font-normal text-[0.75rem]">Service Manager</span></span>
            </div>
            <div class="h-px bg-white/[0.05]"></div>
            <div class="flex items-start justify-between text-[0.82rem] gap-2">
              <span class="text-white/50 shrink-0">Approved by</span>
              <span class="font-semibold text-white text-right">Micheal Taylor<br><span class="text-white/40 font-normal text-[0.75rem]">Vice President</span></span>
            </div>
            <div class="h-px bg-white/[0.05]"></div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Regulation</span>
              <span class="font-semibold text-white">MARPOL Annex IV</span>
            </div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white/50">Doc Rev</span>
              <span class="font-semibold text-white">2025</span>
            </div>
          </div>
        </div>
      </div>

      <!-- LESSONS LIST -->
      <div class="mt-16">
        <div class="mb-8">
          <p class="text-[0.7rem] font-bold tracking-[0.2em] text-[#4da8f0] uppercase mb-2">Technical Content</p>
          <h2 class="font-['Bricolage_Grotesque'] text-[1.8rem] font-extrabold text-white">Module Lessons</h2>
        </div>

        <div class="space-y-4">
          <div v-for="lesson in lessons" :key="lesson.id"
            @click="activeLesson = activeLesson === lesson.id ? null : lesson.id"
            class="rounded-[14px] border border-white/[0.1] bg-white/[0.04] hover:border-white/[0.18] hover:bg-white/[0.06] transition-all duration-300 overflow-hidden cursor-pointer"
            :class="activeLesson === lesson.id ? 'border-[#f59e0b]/40 bg-[#f59e0b]/[0.03]' : ''">

            <div class="flex items-center gap-4 p-5">
              <!-- Uniform Number Circle -->
              <div class="shrink-0 w-11 h-11 rounded-[10px] flex items-center justify-center font-['Bricolage_Grotesque'] text-[0.95rem] font-black bg-white/[0.04] text-white/60">
                <span>{{ lesson.number }}</span>
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-['Bricolage_Grotesque'] text-[0.95rem] font-bold text-white">{{ lesson.title }}</h3>
                <p class="text-[0.75rem] text-white/35">{{ lesson.duration }}</p>
              </div>

              <div class="shrink-0 text-white/25 text-[0.65rem] transition-transform duration-200"
                :class="activeLesson === lesson.id ? 'rotate-180' : ''">▼</div>
            </div>

            <!-- Expanded content -->
            <Transition name="expand">
              <div v-if="activeLesson === lesson.id" class="px-5 pb-6 border-t border-white/[0.06]">
                <div class="pt-5 space-y-4">
                  <p class="text-[0.88rem] text-white/65 leading-relaxed">{{ lesson.content.intro }}</p>
                  <ul v-if="lesson.content.bullets.length > 0" class="space-y-2.5 pl-1">
                    <li v-for="(bullet, i) in lesson.content.bullets" :key="i"
                      class="flex items-start gap-3 text-[0.85rem] text-white/60 leading-relaxed">
                      <span class="mt-[7px] w-1.5 h-1.5 rounded-full bg-[#f59e0b] shrink-0"></span>
                      <span>{{ bullet }}</span>
                    </li>
                  </ul>
                  <p v-if="lesson.content.closing" class="text-[0.88rem] text-white/65 leading-relaxed">{{ lesson.content.closing }}</p>
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
</style>