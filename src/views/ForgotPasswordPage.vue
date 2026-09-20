<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref } from 'vue'
import { requestPasswordReset } from '../auth'

const email = ref('')
const error = ref('')
const sent = ref(false)
const loading = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await requestPasswordReset(email.value)
    sent.value = true
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Forgot password?" subtitle="Enter your email and we'll send you a link to reset it.">
    <!-- Sent -->
    <div v-if="sent" class="flex flex-col gap-5" role="status">
      <p class="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3 leading-relaxed">
        Check your email. If an account exists for <strong class="text-white">{{ email }}</strong>, we've sent a link to reset your password.
      </p>
      <p class="text-[0.8rem] text-white/50 leading-relaxed">
        It can take a minute to arrive. If you don't see it, check your spam folder.
      </p>
      <button type="button" @click="sent = false"
        class="w-full py-4 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-full font-bold backdrop-blur-md transition-all cursor-pointer">
        Send again
      </button>
    </div>

    <!-- Form -->
    <form v-else @submit.prevent="submit" class="flex flex-col gap-5" novalidate>
      <div>
        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@company.com"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
      </div>

      <p v-if="error" role="alert" class="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{{ error }}</p>

      <button type="submit" :disabled="loading || !email.trim()"
        class="w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Sending…' : 'Send reset link' }}
      </button>
    </form>

    <template #footer>
      Remembered it?
      <router-link to="/login" class="text-[#9ddbff] hover:text-[#4da8f0] font-bold no-underline transition-colors">Back to log in</router-link>
    </template>
  </AuthLayout>
</template>
