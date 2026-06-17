import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  { 
    path: '/',                   
    component: () => import('../views/LandingPage.vue') 
  },
  { 
    path: '/dashboard',          
    component: () => import('../views/Dashboard.vue')
  },
  { 
    path: '/dashboard/module/1', 
    component: () => import('../views/Module1Detail.vue')
  },
  { 
    path: '/profile',            
    component: () => import('../views/ProfilePage.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  next()
})

export default router