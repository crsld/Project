import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { authReady, currentUser, recoveryPending } from './auth'
import './style.css'

// Wait for the saved Supabase session to be restored so the first route check is correct.
authReady.finally(() => {
  createApp(App).use(router).mount('#app')

  // The session ended (expired, or signed out in another tab): leave protected pages.
  watch(currentUser, (user) => {
    const meta = router.currentRoute.value.meta
    if (!user && !meta.guestOnly && !meta.public) router.replace('/login')
  })

  // Arrived from a password-reset email: always finish by setting a new password, even if the
  // link landed on another page.
  const showResetPage = () => {
    if (recoveryPending.value && router.currentRoute.value.path !== '/reset-password') {
      router.replace('/reset-password')
    }
  }
  watch(recoveryPending, showResetPage)
  router.isReady().then(showResetPage)
})
