import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/torso',
      name: 'torso',
      component: () => import('../views/Torso.vue')
    },
    {
      path: '/brick',
      name: 'brick',
      component: () => import('../views/Brick.vue')
    },
    {
      path: '/order',
      name: 'order',
      component: () => import('../views/Order.vue')
    },
    {
      path: '/admin',
      name: 'admin',
      component: () => import('../views/Admin.vue')
    },
    {
      path: '/set-credentials',
      name: 'setCredentials',
      component: () => import('../views/SetCredentials.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: () => import("../views/NotFound.vue"),
    }
  ]
})

export default router
