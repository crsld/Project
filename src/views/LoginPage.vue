<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logIn, postAuthPath } from '../auth'
import { lightMutedText, lightInputClasses, lightDangerClasses, lightNoticeClasses, accentLink } from '../theme'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
const notice = route.query.invalid
  ? "That QR link isn't valid, but you can still log in."
  : ''
const loading = ref(false)

const submit = async () => {
  error.value = ''
  loading.value = true
  try {
    await logIn({ email: email.value, password: password.value })
    router.replace(postAuthPath(route.query.redirect))
  } catch (e) {
    error.value = e.message
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <AuthLayout title="Welcome back" subtitle="Log in to access your maritime system modules.">
    <form @submit.prevent="submit" class="flex flex-col gap-5" novalidate>
      <div>
        <label for="email" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@company.com"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
      </div>

      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider mb-2" :class="lightMutedText">Password</label>
        <input id="password" v-model="password" type="password" required autocomplete="current-password" placeholder="••••••••"
          class="w-full px-4 py-3 rounded-xl border outline-none transition-all focus:border-[#2D5C6F]" :class="lightInputClasses" />
        <div class="mt-2 text-right">
          <router-link to="/forgot-password" class="text-xs text-[#2D5C6F] hover:text-[#002E4B] font-bold no-underline transition-colors">Forgot password?</router-link>
        </div>
      </div>

      <p v-if="notice" role="status" class="text-sm rounded-xl px-4 py-3 border" :class="lightNoticeClasses">{{ notice }}</p>

      <p v-if="error" role="alert" class="text-sm rounded-xl px-4 py-3 border" :class="lightDangerClasses">{{ error }}</p>

      <button type="submit" :disabled="loading || !email || !password"
        class="w-full py-4 bg-[#2D5C6F] hover:bg-[#002E4B] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#2D5C6F] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Logging in…' : 'Log In' }}
      </button>
    </form>

    <template #footer>
      Don't have an account?
      <router-link to="/signup" class="font-bold no-underline transition-colors" :class="accentLink">Sign up</router-link>
    </template>
  </AuthLayout>
</template>
