<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { signUp, postAuthPath } from '../auth'

const router = useRouter()
const route = useRoute()

const name = ref('')
const email = ref('')
const password = ref('')
const confirm = ref('')
const error = ref('')
const info = ref('')
const loading = ref(false)

const passwordProblem = computed(() => {
  if (!password.value) return ''
  if (password.value.length < 8) return 'Password must be at least 8 characters.'
  if (!/[A-Za-z]/.test(password.value) || !/\d/.test(password.value)) return 'Use at least one letter and one number.'
  return ''
})

const mismatch = computed(() => confirm.value && confirm.value !== password.value)

const canSubmit = computed(() =>
  name.value.trim() && email.value && password.value && confirm.value &&
  !passwordProblem.value && !mismatch.value && !loading.value
)

const submit = async () => {
  if (!canSubmit.value) return
  error.value = ''
  info.value = ''
  loading.value = true
  try {
    const result = await signUp({ name: name.value, email: email.value, password: password.value })
    if (result.needsConfirmation) {
      info.value = 'Account created! Check your email and click the confirmation link, then log in.'
      password.value = ''
      confirm.value = ''
    } else {
      router.replace(postAuthPath(route.query.redirect))
    }
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Create your account" subtitle="Sign up to unlock unlimited access to Scanship modules.">
    <form @submit.prevent="submit" class="flex flex-col gap-5" novalidate>
      <div>
        <label for="name" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Full name</label>
        <input id="name" v-model="name" type="text" required autocomplete="name" placeholder="Jane Doe"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
      </div>

      <div>
        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@company.com"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
      </div>

      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Password</label>
        <input id="password" v-model="password" type="password" required autocomplete="new-password" placeholder="At least 8 characters"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
        <p v-if="passwordProblem" class="mt-2 text-xs text-red-300">{{ passwordProblem }}</p>
      </div>

      <div>
        <label for="confirm" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Confirm password</label>
        <input id="confirm" v-model="confirm" type="password" required autocomplete="new-password" placeholder="Re-enter password"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
        <p v-if="mismatch" class="mt-2 text-xs text-red-300">Passwords do not match.</p>
      </div>

      <p v-if="error" role="alert" class="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{{ error }}</p>

      <p v-if="info" role="status" class="text-sm text-emerald-300 bg-emerald-500/10 border border-emerald-500/20 rounded-xl px-4 py-3">{{ info }}</p>

      <button type="submit" :disabled="!canSubmit"
        class="w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Creating account…' : 'Sign Up' }}
      </button>
    </form>

    <template #footer>
      Already have an account?
      <router-link to="/login" class="text-[#9ddbff] hover:text-[#4da8f0] font-bold no-underline transition-colors">Log in</router-link>
    </template>
  </AuthLayout>
</template>
