import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    title: 'Home',
    icon: 'el-icon-user',
    component: () => import('@/views/HomeView.vue')
  },
  {
    name: 'Menu',
    path: '/menu',
    title: 'Menu',
    icon: 'el-icon-phone-outline',
    component: () => import('@/views/Menu/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
