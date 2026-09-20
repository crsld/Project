import { createRouter, createWebHistory } from 'vue-router'
import { isAuthenticated, acceptQr, takeQrTarget } from '../auth'

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
      if (!acceptQr(String(to.query.code || ''))) return { path: '/login', query: { invalid: '1' } }
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

// Two ways in, which do not interfere with each other:
//   Website link:   any page -> log in / sign up -> landing page (or the deep link they opened)
//   Station QR:     /access?code=SCANSHIP-MODULE-<n> -> log in / sign up -> that module
// Signed-in users skip log in and go straight to the page they asked for.
router.beforeEach((to) => {
  if (isAuthenticated()) {
    return to.meta.guestOnly ? { path: '/' } : true
  }

  // Log in / sign up (and the optional /scan page) are open to signed-out visitors.
  if (to.meta.guestOnly) return true

  // A normal visit: drop any module left over from an earlier QR scan so it cannot hijack this one.
  takeQrTarget()
  return { path: '/login', query: to.fullPath !== '/' ? { redirect: to.fullPath } : {} }
})

export default router
