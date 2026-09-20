import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated } from '../auth'

const routes = [
  {
    path: '/',
    name: 'LandingPage',
    component: () => import('../views/LandingPage.vue')
  },
  {
    path: '/module/1',
    name: 'Module1Detail',
    component: () => import('../views/Module1Detail.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/LoginPage.vue'),
    meta: { guestOnly: true }
  },
  {
    path: '/signup',
    name: 'SignUp',
    component: () => import('../views/SignUpPage.vue'),
    meta: { guestOnly: true }
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      return { el: to.hash, behavior: 'smooth' }
    }
    return { top: 0 }
  }
})

// Everything except the guest-only pages (login/signup) requires a session.
router.beforeEach((to) => {
  if (to.meta.guestOnly) {
    return isAuthenticated() ? { path: '/' } : true
  }
  if (!isAuthenticated()) {
    return { path: '/login', query: to.fullPath !== '/' ? { redirect: to.fullPath } : {} }
  }
})

export default router
