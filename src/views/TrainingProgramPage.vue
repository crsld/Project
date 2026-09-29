<script setup>
import { computed, nextTick, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import { trainingPrograms } from '../data/trainingPrograms'
import { isLight, pageBg, mutedText, subtleText, cardClasses, accentText, ghostButtonClasses } from '../theme'

const route = useRoute()
const router = useRouter()

const program = computed(() => trainingPrograms[route.params.program])

const goToModule = (mod) => {
  if (mod.route) router.push(mod.route)
}

onMounted(async () => {
  await nextTick()
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
  <div class="min-h-screen font-['Kanit'] transition-colors duration-300" :class="pageBg">
    <Navbar />

    <section class="pt-32 pb-16 px-8">
      <div class="max-w-[1100px] mx-auto">
        <template v-if="program">
          <router-link to="/#courses" class="inline-flex items-center gap-2 text-sm font-bold no-underline mb-8 transition-colors" :class="accentText">
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 19"/></svg>
            Back to Training Programs
          </router-link>

          <div class="mb-14">
            <p class="text-[0.7rem] font-bold tracking-[0.2em] uppercase mb-3" :class="accentText">{{ program.number }} · {{ program.moduleCount }} Modules</p>
            <h1 class="font-['Kanit'] text-[clamp(2.2rem,6vw,3.6rem)] font-black leading-none mb-3">{{ program.name }}</h1>
            <p class="text-[1.1rem] font-semibold mb-4" :class="accentText">{{ program.subtitle }}</p>
            <p class="text-[1rem] leading-relaxed max-w-[600px]" :class="mutedText">{{ program.description }}</p>
          </div>

          <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            <div v-for="(mod, i) in program.modules" :key="mod.number"
              @click="goToModule(mod)"
              class="reveal group relative rounded-2xl border p-6 transition-all duration-300"
              :class="[
                cardClasses,
                mod.route ? 'cursor-pointer hover:-translate-y-1 hover:border-[#2D5C6F]/60' : ''
              ]"
              :style="{ '--delay': (i * 60) + 'ms' }">
              <div class="flex items-start justify-between mb-6">
                <span class="text-[2rem] font-black leading-none opacity-30 transition-opacity duration-300" :class="[accentText, mod.route ? 'group-hover:opacity-60' : '']">
                  {{ String(mod.number).padStart(2, '0') }}
                </span>
                <span class="text-[0.62rem] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border"
                  :class="mod.route
                    ? 'border-[#2D5C6F]/40 bg-[#2D5C6F]/10'
                    : (isLight ? 'border-black/10 bg-black/5 text-black/40' : 'border-white/10 bg-white/5 text-white/40')"
                  :style="mod.route ? { color: isLight ? '#2D5C6F' : '#E1F1F0' } : {}">
                  {{ mod.route ? 'Available' : 'Coming Soon' }}
                </span>
              </div>
              <h3 class="font-bold text-[1.05rem] mb-4 leading-tight">{{ mod.title }}</h3>
              <span v-if="mod.route" class="inline-flex items-center gap-2 font-bold text-[0.85rem] transition-all duration-300 group-hover:gap-3" :class="accentText">
                Start Module
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" class="transition-transform duration-300 group-hover:translate-x-1"><line x1="5" y1="12" x2="19" y2="12"/><polyline points="12 5 19 12 12 19"/></svg>
              </span>
              <span v-else class="inline-flex items-center gap-2 font-bold text-[0.85rem]" :class="subtleText">
                Not yet available
              </span>
            </div>
          </div>
        </template>

        <!-- Unknown program key -->
        <template v-else>
          <div class="text-center py-20">
            <p class="text-[1.3rem] font-bold mb-3">Training program not found</p>
            <p class="mb-8" :class="mutedText">Check the link and try again, or head back to the training programs overview.</p>
            <router-link to="/#courses" class="inline-block px-8 py-4 rounded-full font-bold no-underline transition-all border" :class="ghostButtonClasses">
              Back to Training Programs
            </router-link>
          </div>
        </template>
      </div>
    </section>

    <Footer />
  </div>
</template>

<style scoped>
.reveal {
  opacity: 0;
  transform: translateY(24px);
  transition: all 0.7s cubic-bezier(0.22, 1, 0.36, 1);
  transition-delay: var(--delay, 0ms);
}
.reveal.is-visible {
  opacity: 1;
  transform: translateY(0);
}
</style>
