import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, isQrVerified, acceptQr } from '../auth'

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
    // Target of the QR code link. Validates the code, then continues to log in / sign up.
    path: '/access',
    name: 'Access',
    redirect: (to) => (acceptQr(String(to.query.code || ''))
      ? { path: '/login', query: {} } // drop ?code= from the address bar
      : { path: '/scan', query: { invalid: '1' } })
  },
  {
    path: '/scan',
    name: 'Scan',
    component: () => import('../views/ScanPage.vue'),
    meta: { guestOnly: true }
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

// Flow: scan/upload QR -> log in / sign up -> site.
// Signed-in users skip straight to the site. Everyone else must pass the QR step first.
router.beforeEach((to) => {
  if (isAuthenticated()) {
    return to.meta.guestOnly ? { path: '/' } : true
  }

  if (to.name === 'Scan') return true

  const isAuthPage = to.name === 'Login' || to.name === 'SignUp'
  const query = !isAuthPage && to.fullPath !== '/' ? { redirect: to.fullPath } : {}

  if (!isQrVerified()) return { path: '/scan', query }
  if (isAuthPage) return true
  return { path: '/login', query }
})

export default router
