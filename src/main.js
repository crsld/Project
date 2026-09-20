import { createApp, watch } from 'vue'
import App from './App.vue'
import router from './router'
import { authReady, currentUser } from './auth'
import './style.css'

// Wait for the saved Supabase session to be restored so the first route check is correct.
authReady.finally(() => {
  createApp(App).use(router).mount('#app')

  // The session ended (expired, or signed out in another tab): leave protected pages.
  watch(currentUser, (user) => {
    if (!user && !router.currentRoute.value.meta.guestOnly) router.replace('/login')
  })
})
