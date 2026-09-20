<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref, computed, onBeforeUnmount } from 'vue'
import { useRouter } from 'vue-router'
import { isAuthenticated, updatePassword, postAuthPath } from '../auth'

const router = useRouter()

// Opening the link from the reset email signs the user in with a short-lived recovery session.
// Without one, the link is missing, used already, or expired.
const linkValid = isAuthenticated()

const password = ref('')
const confirm = ref('')
const error = ref('')
const done = ref(false)
const loading = ref(false)
let timer = 0

const passwordProblem = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) return 'Use at least one letter and one number.'
  return ''
})

const mismatch = computed(() => confirm.value && confirm.value !== password.value)

const canSubmit = computed(() =>
  password.value && confirm.value && !passwordProblem.value && !mismatch.value && !loading.value
)

const submit = async () => {
  if (!canSubmit.value) return
  error.value = ''
  loading.value = true
  try {
    await updatePassword(password.value)
    done.value = true
    timer = setTimeout(() => router.replace(postAuthPath(undefined)), 1800)
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}

onBeforeUnmount(() => clearTimeout(timer))
</script>

<template>
  <!-- Link expired / invalid -->
  <AuthLayout v-if="!linkValid" title="Link expired" subtitle="This reset link is invalid or has expired.">
    <router-link to="/forgot-password"
      class="block w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] text-white text-center rounded-full font-bold no-underline transition-all">
      Request a new link
    </router-link>
    <template #footer>
      <router-link to="/login" class="text-[#9ddbff] hover:text-[#4da8f0] font-bold no-underline transition-colors">Back to log in</router-link>
    </template>
  </AuthLayout>

  <!-- Set a new password -->
  <AuthLayout v-else title="Set a new password" subtitle="Choose a new password for your account.">
    <p v-if="done" role="status" class="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">
      Password updated. Taking you in…
    </p>

    <form v-else @submit.prevent="submit" class="flex flex-col gap-5" novalidate>
      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">New password</label>
        <input id="password" v-model="password" type="password" required autocomplete="new-password" placeholder="At least 8 characters"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
        <p v-if="passwordProblem" class="mt-2 text-xs text-red-300">{{ passwordProblem }}</p>
      </div>

      <div>
        <label for="confirm" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Confirm new password</label>
        <input id="confirm" v-model="confirm" type="password" required autocomplete="new-password" placeholder="Re-enter password"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
        <p v-if="mismatch" class="mt-2 text-xs text-red-300">Passwords do not match.</p>
      </div>

      <p v-if="error" role="alert" class="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{{ error }}</p>

      <button type="submit" :disabled="!canSubmit"
        class="w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Updating…' : 'Update password' }}
      </button>
    </form>
  </AuthLayout>
</template>
