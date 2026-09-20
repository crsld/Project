import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, isQrVerified, acceptQr, takeQrTarget } from '../auth'

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
    // Target of a station QR link. Validates the code, then:
    //  - signed in: opens the scanned module right away
    //  - signed out: goes to log in / sign up (the module opens after that)
    path: '/access',
    name: 'Access',
    redirect: (to) => {
      if (!acceptQr(String(to.query.code || ''))) return { path: '/scan', query: { invalid: '1' } }
      if (isAuthenticated()) return { path: takeQrTarget() || '/', query: {} }
      return { path: '/login', query: {} } // also drops ?code= from the address bar
    }
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
