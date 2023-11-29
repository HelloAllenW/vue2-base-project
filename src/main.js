import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import './styles/normalize.less'
import start from '@/qiankun/index'

Vue.config.productionTip = false
Vue.use(ElementUI)

start({
  prefetch: true, // 是否开启预加载
  sandbox: {
    experimentalStyleIsolation: true // 实验性的样式隔离
  }
})

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#main-app')
