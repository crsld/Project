<script setup>
import { ref, computed, watch, nextTick } from 'vue'
import { useRouter } from 'vue-router'
import Navbar from '../components/Navbar.vue'
import Footer from '../components/Footer.vue'
import AssistanceRequest from '../components/AssistanceRequest.vue'
import { currentUser } from '../auth'

// I-import ang background image
import BG_PerModule from '../assets/BG_PerModule.jpg'

const router = useRouter()
const activeLesson = ref(null)

// ── Guided-step progress (saved per user in this browser) ──
const progressKey = () => `scanship_progress_${currentUser.value?.email || 'guest'}`
const loadProgress = () => {
  try {
    return JSON.parse(localStorage.getItem(progressKey())) || {}
  } catch {
    return {}
  }
}
const progress = ref(loadProgress()) // { [lessonId]: number of completed steps }
watch(progress, (value) => {
  try {
    localStorage.setItem(progressKey(), JSON.stringify(value))
  } catch {
    // storage unavailable: progress simply won't persist
  }
}, { deep: true })

const openHelp = ref(null)
const helpKey = (lessonId, i) => `${lessonId}-${i}`
const toggleHelp = (lessonId, i) => {
  const k = helpKey(lessonId, i)
  openHelp.value = openHelp.value === k ? null : k
}

const completedCount = (lesson) => Math.min(progress.value[lesson.id] || 0, lesson.steps.length)
const isLessonDone = (lesson) => completedCount(lesson) === lesson.steps.length
const stepState = (lesson, i) => {
  const c = completedCount(lesson)
  return i < c ? 'done' : i === c ? 'current' : 'upcoming'
}
const setProgress = (lesson, count) => {
  progress.value[lesson.id] = count
  openHelp.value = null
}
const completeStep = (lesson) => setProgress(lesson, completedCount(lesson) + 1)
const reopenStep = (lesson, i) => setProgress(lesson, i)


// ── End-of-module actions ──
const nextModuleRoute = null // set to '/module/2' once the next module exists
const handleDone = () => router.push({ path: '/', hash: '#modules' })
const proceedToNextModule = () => {
  if (nextModuleRoute) router.push(nextModuleRoute)
}

const requestOpen = ref(false)
const allLessonsDone = computed(() => lessons.every(isLessonDone))

const goToNextLesson = async (lesson) => {
  const next = lessons.find(l => l.id === lesson.id + 1)
  if (!next) return
  activeLesson.value = next.id
  await nextTick()
  document.getElementById(`lesson-${next.id}`)?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

const lessons = [
  {
    id: 1,
    number: '01',
    title: 'How to Use This Manual: Safety & Method',
    summary: 'Start here before working on any equipment. This is the standard sequence to follow for every fault.',
    safety: 'Always isolate and lock out (LOTO) all energy sources before opening, cleaning or adjusting any equipment. Never bypass a guard or safety device.',
    tools: ['PPE (gloves, glasses, safety shoes)', 'LOTO kit', 'Torch', 'Logbook'],
    steps: [
      { action: 'Stop and assess', detail: 'Note the alarm, equipment tag number, the symptom and when it started.', expected: 'Symptom and equipment tag are written in the log.' },
      { action: 'Make it safe', detail: 'Put on PPE. Isolate electrical, hydraulic, pneumatic and stored energy. Apply your lock and tag.', expected: 'Try-start confirms the equipment cannot run; gauges read zero.' },
      { action: 'Check the simple things first', detail: 'Power supply, tripped breakers, valve positions, tank levels, blocked strainers.', expected: 'Common causes are confirmed or ruled out.' },
      { action: 'Find the cause', detail: 'Go to the procedure that matches the symptom. Change one thing at a time.', expected: 'Each check is recorded as OK or faulty.' },
      { action: 'Fix and verify', detail: 'Repair the fault, remove locks per procedure, restart and watch the readings.', expected: 'Pressure, temperature, current and noise are back in the normal range.' },
      { action: 'Record and report', detail: 'Log the fault, cause, action taken and any parts used.', expected: 'Log entry complete and handed over to the next shift.' },
    ],
    escalate: 'If any step is unsafe or unclear, stop and request service. Do not continue on assumptions.'
  },
  {
    id: 2,
    number: '02',
    title: 'Pump: No Flow or Low Flow',
    summary: 'The pump is running but delivers little or no liquid, or discharge pressure is below normal.',
    safety: 'Lock out the motor, close and tag suction and discharge valves, then depressurize and drain before opening any casing or strainer. Fluid may be hazardous.',
    tools: ['Pressure gauge', 'Clamp meter', 'Wrench set', 'Torch'],
    steps: [
      { action: 'Check the basics', detail: 'Confirm the pump is running, rotation matches the arrow on the casing, suction and discharge valves are fully open and tank level is above minimum.', expected: 'Correct rotation, valves open, level adequate.' },
      { action: 'Read the pressures', detail: 'Compare suction and discharge pressure with the commissioning values.', expected: 'Discharge is close to normal. Low suction suggests a blockage or air; low discharge with normal suction suggests a worn impeller.' },
      { action: 'Look for air or cavitation', detail: 'Listen for a gravel or crackling noise. Check the suction line and shaft seal area for air leaks.', expected: 'Smooth running noise and no air entering the suction line.' },
      { action: 'Clean the suction strainer', detail: 'Lock out and isolate, drain, then open and clean the strainer.', expected: 'Strainer is free of debris and refitted with a good gasket.' },
      { action: 'Measure motor current', detail: 'Use the clamp meter on each phase and compare with the nameplate current.', expected: 'Current at or below nameplate and balanced. Very low current points to low load (air, closed valve, worn impeller); high current points to binding.' },
      { action: 'Inspect the impeller', detail: 'With the pump locked out, open the casing and check for wear, clogging and damage.', expected: 'Impeller is clean, undamaged and clearances are within OEM limits.' },
    ],
    escalate: 'If flow is not restored after step 6, or the impeller, shaft or wear rings are damaged, request service.'
  },
  {
    id: 3,
    number: '03',
    title: 'Abnormal Vibration or Noise',
    summary: 'A motor, pump or blower shakes more than usual, or produces grinding, knocking or squealing.',
    safety: 'Keep clear of rotating parts. Never remove a guard while the machine is running. Wear hearing protection near noisy equipment.',
    tools: ['Vibration meter or stethoscope', 'Alignment tool', 'Torque wrench', 'Hearing protection'],
    steps: [
      { action: 'Locate the source', detail: 'Measure or listen at the motor drive end, motor non-drive end, coupling and driven-machine bearing housing.', expected: 'You know which component has the highest vibration.' },
      { action: 'Check the mounting', detail: 'Look for loose bolts, cracked baseplate, worn mounts or a soft foot.', expected: 'All fasteners tight to specification; no movement at the base.' },
      { action: 'Inspect coupling and guard', detail: 'Lock out and inspect the coupling elements and check that the guard is not rubbing.', expected: 'Coupling is intact and the guard has clearance all round.' },
      { action: 'Check shaft alignment', detail: 'Measure alignment with a dial gauge or laser tool.', expected: 'Alignment is within the OEM tolerance.' },
      { action: 'Check the bearings', detail: 'Listen for grinding, feel the housing temperature and check the lubricant level and condition.', expected: 'Bearings run quietly and smoothly; lubricant is clean and at the correct level.' },
      { action: 'Check for imbalance', detail: 'Inspect the impeller, fan or rotor for fouling, damage or missing balance weights.', expected: 'No build-up, damage or missing material.' },
    ],
    escalate: 'If vibration stays above the OEM limit after these corrections, stop the equipment and request service.'
  },
  {
    id: 4,
    number: '04',
    title: 'Motor or Bearing Overheating',
    summary: 'A motor frame or bearing housing is hotter than normal, or the motor trips on thermal overload.',
    safety: 'Hot surfaces can cause burns. Let the equipment cool before touching it and use an infrared thermometer instead of your hand.',
    tools: ['IR thermometer', 'Clamp meter', 'Grease gun', 'Multimeter'],
    steps: [
      { action: 'Measure the temperature', detail: 'Use the IR thermometer on the bearing housing and motor frame and compare with the OEM limits.', expected: 'You have a recorded temperature to compare against the limit.' },
      { action: 'Check ventilation and cooling', detail: 'Check that the cooling fan turns, cooling fins are clean and air can flow freely around the motor.', expected: 'Fan turning, fins clean, no obstruction.' },
      { action: 'Check the electrical load', detail: 'Measure current on each phase and compare with the nameplate.', expected: 'Current is at or below nameplate and balanced across phases.' },
      { action: 'Check the lubrication', detail: 'Check the grease or oil type, level and condition. Do not over-grease.', expected: 'Correct lubricant in the correct quantity.' },
      { action: 'Check for binding', detail: 'With the equipment locked out, turn the shaft by hand.', expected: 'Shaft turns freely with no tight spots or rubbing.' },
      { action: 'Restart and monitor', detail: 'Remove locks per procedure, run the equipment and log the temperature every 10 minutes for 30 minutes.', expected: 'Temperature stabilizes below the limit.' },
    ],
    escalate: 'If the temperature keeps rising, or the motor trips again, stop the equipment and request service.'
  },
  {
    id: 5,
    number: '05',
    title: 'Leaks: Mechanical Seals & Flanges',
    summary: 'Liquid is dripping or spraying from a shaft seal, flange joint, casing or pipe fitting.',
    safety: 'Wastewater can carry pathogens. Wear gloves and a face shield. Isolate and depressurize before tightening or opening any joint.',
    tools: ['Torque wrench', 'Spare gaskets and O-rings', 'Absorbent pads', 'Gloves and face shield'],
    steps: [
      { action: 'Find the exact source', detail: 'Wipe the area clean, run the equipment and watch where liquid first appears. Classify it as shaft seal, flange, casing or fitting.', expected: 'Leak point identified.' },
      { action: 'Judge the leak rate', detail: 'A slight weep on start-up is normal for some seals. A steady drip or spray is a fault.', expected: 'You know if the leak is acceptable or must be fixed now.' },
      { action: 'Flange or joint leak', detail: 'Isolate and depressurize. Check bolt torque in a cross pattern and replace the gasket if it is damaged or was reused.', expected: 'Bolts torqued to specification and gasket seated evenly.' },
      { action: 'Shaft seal leak', detail: 'Check the seal flush line for flow, look for dry-running history and inspect the shaft or sleeve surface.', expected: 'Flush flow is present; shaft or sleeve is smooth and undamaged.' },
      { action: 'Replace worn parts', detail: 'Replace seal faces and O-rings as a set per the OEM manual. Never reuse old elastomers.', expected: 'New parts fitted and the seal is set to the correct length.' },
      { action: 'Pressure test', detail: 'Restore the system and watch the joint at operating pressure for 15 minutes.', expected: 'No visible leakage.' },
    ],
    escalate: 'If the leak continues after replacing the seal or gasket, or the casing is cracked, request service.'
  },
  {
    id: 6,
    number: '06',
    title: 'Valve or Actuator Not Moving',
    summary: 'A valve does not open or close, does not travel fully, or leaks through when closed.',
    safety: 'Actuators can move without warning. Isolate the air or electrical supply and release stored energy such as spring or trapped air before working on them.',
    tools: ['Multimeter', 'Air pressure gauge', 'Lubricant', 'Wrench set'],
    steps: [
      { action: 'Compare command and feedback', detail: 'Check the control command against the position indicator on the valve.', expected: 'Valve position matches the command; if not, the fault is between the signal and the valve.' },
      { action: 'Check the supply', detail: 'Measure the air pressure or electrical supply at the actuator.', expected: 'Supply is within the rating on the actuator label.' },
      { action: 'Try the manual override', detail: 'Isolate the actuator and operate the valve with the handwheel or override.', expected: 'Valve moves smoothly through full travel. If it is stiff, the fault is in the valve, not the actuator.' },
      { action: 'Inspect stem and packing', detail: 'Look for corrosion, a seized stem or an over-tightened gland.', expected: 'Stem is clean and lubricated; gland is only tight enough to stop leakage.' },
      { action: 'Check the seat', detail: 'For a valve that passes when closed, isolate and inspect the seat and disc for debris or wear.', expected: 'Seat is clean and undamaged and the valve seals fully.' },
      { action: 'Reset the travel limits', detail: 'Adjust the open and closed stops and limit switches as per the actuator manual.', expected: 'Open and closed feedback are correct at both ends of travel.' },
    ],
    escalate: 'If the valve is seized, the seat is damaged or the actuator does not respond with correct supply, request service.'
  },
]

</script>

<template>
  <div class="min-h-screen bg-[#040f1e] text-white font-['Trebuchet_MS']">
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
            <h1 class="font-['Trebuchet_MS'] text-[clamp(2.5rem,7vw,4.2rem)] font-extrabold text-white leading-[1.1] drop-shadow-2xl">
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
            <h2 class="font-['Trebuchet_MS'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-3">Overview</h2>
            <p class="text-[0.9rem] text-white leading-relaxed mb-3">
              This manual gives mechanical engineers clear, step-by-step instructions for finding and fixing common faults on shipboard mechanical equipment such as pumps, motors, blowers and valves. Each procedure starts with the safety precautions, lists the tools you need, and then walks through the checks in order, with the result you should expect at every step.
            </p>
            <p class="text-[0.9rem] text-white leading-relaxed">
              Read the first procedure before you start any job. Then go to the procedure that matches the symptom you see. Tick each step off as you complete it, and request service if a fault is not resolved.
            </p>
          </div>


          <!-- Contents -->
          <div class="mb-8">
            <h2 class="font-['Trebuchet_MS'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-4">Contents</h2>
            <div>
              <div v-for="(item, i) in lessons" :key="item.id" class="flex items-center gap-4 py-3 border-b border-white/50">
                <span class="text-[0.75rem] font-black text-[#b5f4ff] w-4 shrink-0">{{ i + 1 }}</span>
                <span class="text-[0.88rem] text-white">{{ item.title }}</span>
              </div>
            </div>
          </div>


          <!-- Prior Knowledge -->
          <div class="mb-8">
            <h2 class="font-['Trebuchet_MS'] text-[1.1rem] font-extrabold text-[#b5f4ff] mb-3">Prior Knowledge</h2>
            <p class="text-[0.9rem] text-white leading-relaxed">
              Basic mechanical knowledge, familiarity with your vessel's lock-out / tag-out procedure, and access to the OEM manual for the equipment. Always follow the ship's safety management system.
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
              <span class="font-semibold text-white text-right">Micheal Taylor<br><span class="text-white/40 font-normal text-[0.75rem]">EVP After Sales</span></span>
            </div>
            <div class="h-px bg-white"></div>
            <div class="flex items-center justify-between text-[0.82rem]">
              <span class="text-white">Safety basis</span>
              <span class="font-semibold text-white">LOTO / ISM Code</span>
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
          <p class="text-[0.7rem] font-bold tracking-[0.3em] text-[#4da8f0] uppercase mb-3">Step-by-Step Procedures</p>
          <h2 class="font-['Trebuchet_MS'] text-[2.2rem] font-extrabold text-white leading-tight">Troubleshooting Procedures</h2>
        </div>

        <div class="space-y-4">
          <div v-for="lesson in lessons" :key="lesson.id" :id="`lesson-${lesson.id}`"
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
              <div class="shrink-0 w-12 h-12 rounded-[12px] flex items-center justify-center font-['Trebuchet_MS'] text-[1rem] font-black transition-all duration-500"
                :class="activeLesson === lesson.id ? 'bg-[#4da8f0] text-white shadow-[0_0_15px_rgba(77,168,240,0.5)]' : 'bg-white/10 text-white/50 group-hover:text-white'">
                {{ lesson.number }}
              </div>

              <div class="flex-1 min-w-0">
                <h3 class="font-['Trebuchet_MS'] text-[1.05rem] md:text-[1.15rem] font-bold text-white transition-colors duration-300"
                  :class="activeLesson === lesson.id ? 'text-[#4da8f0]' : 'group-hover:text-white'">
                  {{ lesson.title }}
                </h3>
                <div class="flex items-center gap-3 mt-1">
                   <span class="text-[0.65rem] font-bold tracking-wider uppercase text-white/30">Procedure</span>
                   <div class="h-px w-8 bg-white/10"></div>
                   <span v-if="isLessonDone(lesson)" class="inline-flex items-center gap-1 text-[0.65rem] font-bold tracking-wider uppercase text-[#34d399]">
                     <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                     Completed
                   </span>
                   <span v-else-if="completedCount(lesson) > 0" class="text-[0.65rem] font-bold tracking-wider uppercase text-[#9ddbff]">
                     {{ completedCount(lesson) }} / {{ lesson.steps.length }} steps
                   </span>
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
              <div v-if="activeLesson === lesson.id" class="relative px-6 pb-8 md:px-24 cursor-default" @click.stop>
                <div class="pt-2 space-y-6 border-t border-white/10">
                  <div class="mt-6">
                    <p class="text-[0.95rem] text-white/80 leading-relaxed italic border-l-2 border-[#4da8f0] pl-4">
                      {{ lesson.summary }}
                    </p>
                  </div>

                  <!-- Safety -->
                  <div class="flex items-start gap-3 rounded-xl border border-amber-400/30 bg-amber-400/10 p-4">
                    <svg class="shrink-0 mt-0.5" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#fbbf24" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/></svg>
                    <p class="text-[0.88rem] text-white/80 leading-relaxed">
                      <strong class="text-amber-300">Safety first.</strong> {{ lesson.safety }}
                    </p>
                  </div>

                  <!-- Tools -->
                  <div>
                    <p class="text-[0.65rem] font-bold tracking-[0.15em] text-[#b5f4ff] uppercase mb-3">Tools &amp; PPE</p>
                    <div class="flex flex-wrap gap-2">
                      <span v-for="tool in lesson.tools" :key="tool"
                        class="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-[0.78rem] text-white/80">
                        {{ tool }}
                      </span>
                    </div>
                  </div>

                  <!-- Steps (guided) -->
                  <div>
                    <div class="flex items-center justify-between mb-4">
                      <p class="text-[0.65rem] font-bold tracking-[0.15em] text-[#b5f4ff] uppercase">Procedure</p>
                      <span class="text-[0.72rem] font-bold text-white/50">{{ completedCount(lesson) }} of {{ lesson.steps.length }} completed</span>
                    </div>
                    <div class="h-1 rounded-full bg-white/10 mb-6 overflow-hidden">
                      <div class="h-full bg-[#34d399] transition-all duration-500" :style="{ width: (completedCount(lesson) / lesson.steps.length * 100) + '%' }"></div>
                    </div>

                    <ol class="space-y-3">
                      <li v-for="(step, i) in lesson.steps" :key="i"
                        class="flex items-start gap-4 rounded-2xl p-4 border transition-all duration-300"
                        :class="stepState(lesson, i) === 'current' ? 'border-[#4da8f0]/40 bg-white/[0.05]' : 'border-transparent'"
                        :aria-current="stepState(lesson, i) === 'current' ? 'step' : undefined">

                        <!-- Status badge -->
                        <button v-if="stepState(lesson, i) === 'done'" type="button" @click="reopenStep(lesson, i)"
                          :aria-label="`Step ${i + 1} completed. Click to redo from this step`"
                          title="Completed. Click to redo from this step"
                          class="shrink-0 w-9 h-9 rounded-full bg-[#34d399] flex items-center justify-center cursor-pointer border-none hover:brightness-110 transition-all">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04241a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </button>
                        <div v-else-if="stepState(lesson, i) === 'current'"
                          class="shrink-0 w-9 h-9 rounded-full bg-[#00364D] border border-[#4da8f0] text-white flex items-center justify-center font-black text-[0.85rem] shadow-[0_0_15px_rgba(77,168,240,0.4)]">
                          {{ i + 1 }}
                        </div>
                        <div v-else
                          class="shrink-0 w-9 h-9 rounded-full bg-white/5 border border-white/15 text-white/40 flex items-center justify-center font-black text-[0.85rem]">
                          {{ i + 1 }}
                        </div>

                        <div class="flex-1 min-w-0">
                          <div :class="stepState(lesson, i) === 'upcoming' ? 'opacity-45' : ''">
                            <h4 class="text-[0.95rem] font-bold text-white">{{ step.action }}</h4>
                            <p class="text-[0.88rem] text-white/70 leading-relaxed mt-1">{{ step.detail }}</p>
                            <p class="mt-2 text-[0.82rem] text-white/60 leading-relaxed bg-white/5 border border-white/5 rounded-lg px-3 py-2">
                              <strong class="text-[#b5f4ff]">Expected:</strong> {{ step.expected }}
                            </p>
                          </div>

                          <!-- Actions for the current step only -->
                          <div v-if="stepState(lesson, i) === 'current'" class="mt-5">
                            <button type="button" @click="completeStep(lesson)"
                              class="px-6 py-3 rounded-xl bg-[#00364D] hover:bg-[#4da8f0] border border-[#4da8f0]/60 text-white text-[0.88rem] font-bold cursor-pointer transition-all">
                              {{ i === lesson.steps.length - 1 ? 'Done, finish procedure' : 'Done, next step' }}
                            </button>

                            <button type="button" @click="toggleHelp(lesson.id, i)"
                              :aria-expanded="openHelp === helpKey(lesson.id, i)"
                              class="mt-4 w-full py-3 rounded-xl border border-[#4da8f0]/50 bg-transparent text-[#9ddbff] hover:bg-[#4da8f0]/10 hover:border-[#4da8f0] text-[0.9rem] font-medium cursor-pointer transition-all">
                              Need help?
                            </button>

                            <Transition name="help">
                              <AssistanceRequest v-if="openHelp === helpKey(lesson.id, i)" class="mt-3"
                                title="Need help?"
                                :subtitle="`Step ${i + 1} of ${lesson.steps.length} · ${lesson.title}`"
                                :context="{ procedure: lesson.title, step: i + 1, stepAction: step.action, stepsCompleted: completedCount(lesson), totalSteps: lesson.steps.length }"
                                @close="openHelp = null" />
                            </Transition>
                          </div>
                        </div>
                      </li>
                    </ol>

                    <!-- Procedure completed -->
                    <div v-if="isLessonDone(lesson)" class="mt-6 rounded-xl border border-[#34d399]/30 bg-[#34d399]/10 p-5 flex flex-col sm:flex-row sm:items-center gap-4">
                      <div class="flex items-center gap-3 flex-1">
                        <span class="shrink-0 w-9 h-9 rounded-full bg-[#34d399] flex items-center justify-center">
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04241a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
                        </span>
                        <p class="text-[0.9rem] text-white"><strong>Procedure completed.</strong> Check the result and log it.</p>
                      </div>
                      <div class="flex flex-wrap gap-3">
                        <button type="button" @click="reopenStep(lesson, 0)"
                          class="px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-[0.82rem] font-bold cursor-pointer transition-all">
                          Start over
                        </button>
                        <button v-if="lesson.id < lessons.length" type="button" @click="goToNextLesson(lesson)"
                          class="px-5 py-2.5 rounded-xl bg-[#4da8f0] hover:bg-[#3b97e0] border-none text-white text-[0.82rem] font-bold cursor-pointer transition-all">
                          Next procedure
                        </button>
                      </div>
                    </div>
                  </div>

                  <!-- Escalation -->
                  <div class="bg-white/5 rounded-xl p-5 border border-white/5">
                    <p class="text-[0.88rem] text-white/60 leading-relaxed">
                      <strong class="text-white block mb-1 font-['Trebuchet_MS']">If the fault is not resolved:</strong>
                      {{ lesson.escalate }}
                    </p>
                  </div>
                </div>
              </div>
            </Transition>
          </div>
        </div>

        <!-- MODULE COMPLETE -->
        <Transition name="help">
          <div v-if="allLessonsDone" class="mt-10 rounded-[20px] border border-[#34d399]/30 bg-[#34d399]/5 p-6 md:p-8">
            <div class="flex items-center gap-3 mb-6">
              <span class="shrink-0 w-9 h-9 rounded-full bg-[#34d399] flex items-center justify-center">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#04241a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
              </span>
              <p class="text-[0.95rem] text-white"><strong>Module completed.</strong> All {{ lessons.length }} procedures are done.</p>
            </div>

            <!-- Final actions -->
            <div class="flex flex-col sm:flex-row flex-wrap gap-3">
              <button type="button" @click="handleDone"
                class="px-6 py-3 rounded-xl bg-[#00364D] hover:bg-[#4da8f0] border border-[#4da8f0]/60 text-white text-[0.88rem] font-bold cursor-pointer transition-all">
                Done
              </button>
              <button type="button" @click="requestOpen = !requestOpen" :aria-expanded="requestOpen"
                class="px-6 py-3 rounded-xl border border-[#4da8f0]/50 bg-transparent text-[#9ddbff] hover:bg-[#4da8f0]/10 hover:border-[#4da8f0] text-[0.88rem] font-bold cursor-pointer transition-all">
                Request Future Assistance
              </button>
              <button type="button" @click="proceedToNextModule" :disabled="!nextModuleRoute"
                :title="nextModuleRoute ? '' : 'The next module is coming soon'"
                class="px-6 py-3 rounded-xl bg-[#4da8f0] hover:bg-[#3b97e0] border-none text-white text-[0.88rem] font-bold cursor-pointer transition-all disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0]">
                Proceed to Next Module
              </button>
            </div>
            <p v-if="!nextModuleRoute" class="mt-2 text-[0.75rem] text-white/40">The next module is coming soon.</p>

            <!-- Request Future Assistance form -->
            <Transition name="help">
              <AssistanceRequest v-if="requestOpen" class="mt-5"
                title="Request assistance"
                subtitle="Module 1: Introduction to Wastewater Systems · Module completed"
                :context="{ procedure: 'Whole module', stepsCompleted: lessons.reduce((n, l) => n + completedCount(l), 0), totalSteps: lessons.reduce((n, l) => n + l.steps.length, 0) }"
                @close="requestOpen = false" />
            </Transition>
          </div>
        </Transition>
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

/* Help panel */
.help-enter-active, .help-leave-active {
  transition: opacity 0.25s ease, transform 0.25s ease;
}
.help-enter-from, .help-leave-to {
  opacity: 0;
  transform: translateY(-6px);
}

/* Ensure images and containers don't overflow during transition */
.expand-leave-from, .expand-enter-to {
  opacity: 1;
  max-height: 2000px;
  transform: translateY(0);
}

</style>