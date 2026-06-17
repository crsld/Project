import { createRouter, createWebHistory } from 'vue-router'


const routes = [
  { path: '/',                   component: () => import('../views/LandingPage.vue') },
  { path: '/auth',               component: () => import('../views/AuthPage.vue') },
  { path: '/dashboard',          component: () => import('../views/Dashboard.vue'),     meta: { requiresAuth: true } },
  { path: '/dashboard/module/1', component: () => import('../views/Module1Detail.vue'), meta: { requiresAuth: true } },
  { path: '/profile',            component: () => import('../views/ProfilePage.vue'),   meta: { requiresAuth: true } },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (!to.meta.requiresAuth) return next()

  const unsubscribe = onAuthStateChanged(auth, (user) => {
    unsubscribe()
    if (user && user.emailVerified) {
      next()
    } else {
      next('/auth')
    }
  })
})

export default router