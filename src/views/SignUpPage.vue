<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref, computed } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { signUp, postAuthPath } from '../auth'
import { lightMutedText, lightInputClasses, lightDangerClasses, lightSuccessClasses } from '../theme'

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
        <label for="name" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Full name</label>
        <input id="name" v-model="name" type="text" required autocomplete="name" placeholder="Jane Doe"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
      </div>

      <div>
        <label for="email" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@company.com"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
      </div>

      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Password</label>
        <input id="password" v-model="password" type="password" required autocomplete="new-password" placeholder="At least 8 characters"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
        <p v-if="passwordProblem" class="mt-2 text-xs text-red-500">{{ passwordProblem }}</p>
      </div>

      <div>
        <label for="confirm" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Confirm password</label>
        <input id="confirm" v-model="confirm" type="password" required autocomplete="new-password" placeholder="Re-enter password"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
        <p v-if="mismatch" class="mt-2 text-xs text-red-500">Passwords do not match.</p>
      </div>

      <p v-if="error" role="alert" class="text-sm rounded-xl px-4 py-3 border" :class="lightDangerClasses">{{ error }}</p>

      <p v-if="info" role="status" class="text-sm rounded-xl px-4 py-3 border" :class="lightSuccessClasses">{{ info }}</p>

      <button type="submit" :disabled="!canSubmit"
        class="w-full py-4 bg-[#2D5C6F] hover:bg-[#002E4B] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2D5C6F] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Creating account…' : 'Sign Up' }}
      </button>
    </form>

    <template #footer>
      Already have an account?
      <router-link to="/login" class="font-bold no-underline transition-colors text-[#E1F1F0] hover:text-white">Log in</router-link>
    </template>
  </AuthLayout>
</template>
