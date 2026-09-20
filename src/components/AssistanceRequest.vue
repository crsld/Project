<script setup>
import { ref } from 'vue'
import { currentUser } from '../auth'

const props = defineProps({
  title: { type: String, default: 'Request assistance' },
  subtitle: { type: String, default: '' },
  // Extra info stored with the request (procedure, step, progress...). Included automatically.
  context: { type: Object, default: () => ({}) }
})
const emit = defineEmits(['close'])

const REQUESTS_KEY = 'scanship_assistance_requests'

const message = ref('')
const sent = ref(false)
const error = ref('')

// Frontend-only for now: requests are saved in this browser. Replace with an API call once a backend exists.
const submit = () => {
  const text = message.value.trim()
  if (!text) return
  error.value = ''
  const entry = {
    user: currentUser.value?.email || 'guest',
    module: 'Module 1: Introduction to Wastewater Systems',
    ...props.context,
    message: text,
    createdAt: new Date().toISOString(),
  }
  try {
    const all = JSON.parse(localStorage.getItem(REQUESTS_KEY)) || []
    all.push(entry)
    localStorage.setItem(REQUESTS_KEY, JSON.stringify(all))
    sent.value = true
    message.value = ''
  } catch {
    error.value = 'Could not save your request. Please try again.'
  }
}
</script>

<template>
  <div class="rounded-2xl border border-white/10 overflow-hidden bg-[#040f1e] shadow-[0_10px_30px_rgba(0,0,0,0.3)]" role="region" :aria-label="title">
    <!-- Header -->
    <div class="flex items-center gap-4 px-5 py-4 bg-gradient-to-r from-[#00364D] to-[#011c29] border-b border-white/10">
      <button type="button" @click="emit('close')" aria-label="Close"
        class="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white cursor-pointer border-none transition-colors">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="19" y1="12" x2="5" y2="12"/><polyline points="12 19 5 12 12 5"/></svg>
      </button>
      <div class="min-w-0">
        <p class="text-[1.05rem] font-extrabold text-white leading-tight">{{ title }}</p>
        <p v-if="subtitle" class="text-[0.78rem] text-white/60 truncate">{{ subtitle }}</p>
      </div>
    </div>

    <!-- Sent -->
    <div v-if="sent" class="p-6 flex items-start gap-3">
      <span class="shrink-0 w-8 h-8 rounded-full bg-[#34d399] flex items-center justify-center">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#04241a" stroke-width="3.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"/></svg>
      </span>
      <div class="flex-1">
        <p class="text-[0.95rem] text-white"><strong>Request submitted.</strong></p>
        <p class="text-[0.8rem] text-white/50 mt-1 leading-relaxed">It is saved in this browser only for now. It is not sent to a service team until a backend is connected.</p>
        <button type="button" @click="emit('close')"
          class="mt-4 px-5 py-2.5 rounded-xl bg-white/5 hover:bg-white/10 border border-white/15 text-white text-[0.82rem] font-bold cursor-pointer transition-all">
          Close
        </button>
      </div>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" class="p-5 sm:p-6 space-y-4">
      <div>
        <label for="assist-message" class="block text-[0.82rem] font-bold text-[#9ddbff] mb-2">What do you need help with?</label>
        <textarea id="assist-message" v-model="message" rows="4" required
          placeholder="Type your concern, question or the assistance you need."
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white text-[0.95rem] leading-relaxed placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07] resize-y"></textarea>
      </div>

      <p class="text-[0.75rem] text-white/40 leading-relaxed">
        Included automatically: module, procedure, current step and steps already done.
      </p>

      <p v-if="error" role="alert" class="text-sm text-red-300">{{ error }}</p>

      <button type="submit" :disabled="!message.trim()"
        class="w-full py-3.5 rounded-xl bg-[#f59e0b] hover:bg-[#e08e0a] text-[#040f1e] text-[0.95rem] font-extrabold cursor-pointer border-none transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#f59e0b]">
        Submit
      </button>
    </form>
  </div>
</template>
