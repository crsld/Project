<script setup>
import AuthLayout from '../components/AuthLayout.vue'
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { logIn, postAuthPath } from '../auth'

const router = useRouter()
const route = useRoute()

const email = ref('')
const password = ref('')
const error = ref('')
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
        <label for="email" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Email</label>
        <input id="email" v-model="email" type="email" required autocomplete="email" placeholder="you@company.com"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
      </div>

      <div>
        <label for="password" class="block text-xs font-bold uppercase tracking-wider text-white/70 mb-2">Password</label>
        <input id="password" v-model="password" type="password" required autocomplete="current-password" placeholder="••••••••"
          class="w-full px-4 py-3 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 outline-none transition-all focus:border-[#4da8f0] focus:bg-white/[0.07]" />
      </div>

      <p v-if="error" role="alert" class="text-sm text-red-300 bg-red-500/10 border border-red-500/20 rounded-xl px-4 py-3">{{ error }}</p>

      <button type="submit" :disabled="loading || !email || !password"
        class="w-full py-4 bg-[#4da8f0] hover:bg-[#3b97e0] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-[#4da8f0] text-white rounded-full font-bold transition-all cursor-pointer border-none">
        {{ loading ? 'Logging in…' : 'Log In' }}
      </button>
    </form>

    <template #footer>
      Don't have an account?
      <router-link to="/signup" class="text-[#9ddbff] hover:text-[#4da8f0] font-bold no-underline transition-colors">Sign up</router-link>
    </template>
  </AuthLayout>
</template>
