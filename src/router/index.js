import { createRouter, createWebHistory } from 'vue-router'

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

export default router