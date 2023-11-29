import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    name: 'home',
    path: '/',
    title: '首页',
    icon: 'el-icon-user',
    component: () => import('@/views/HomeView.vue')
  },
  {
    name: 'parameterCacheApp',
    path: '/parameter-cache-app',
    title: 'JVM参数缓存',
    icon: 'el-icon-phone-outline',
    component: () => import('@/views/parameterCacheApp/index.vue')
  },
  {
    name: 'gatewayApp',
    path: '/gateway-app',
    title: '联机网关',
    icon: 'el-icon-goods',
    component: () => import('@/views/gatewayApp/index.vue')
  },
  {
    name: 'distributedTransactionsApp',
    path: '/distributed-transactions-app',
    title: '分布式事务',
    icon: 'el-icon-warning-outline',
    component: () => import('@/views/distributedTransactionsApp/index.vue')
  },
  {
    name: 'distributedSequenceApp',
    path: '/distributed-sequence-app',
    title: '分布式序列',
    icon: 'el-icon-help',
    component: () => import('@/views/distributedSequenceApp/index.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
