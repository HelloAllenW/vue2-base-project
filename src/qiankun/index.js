import { registerMicroApps, start, addGlobalUncaughtErrorHandler, initGlobalState } from 'qiankun'
import apps from './app'

// 微应用生命周期
const microAppLifCycles = {
  beforeLoad: [ // 全局的微应用生命周期钩子，子应用加载前
    app => {
      console.log('子应用加载-beforeLoad', app)
      return Promise.resolve()
    }
  ],
  beforeMount: [ // 全局的微应用生命周期钩子，子应用挂载前
    app => {
      console.log('2-beforeMount', app)
      return Promise.resolve()
    }
  ],
  afterMount: [ // 全局的微应用生命周期钩子，子应用挂载后
    app => {
      console.log('3-afterMount', app)
      return Promise.resolve()
    }
  ],
  beforeUnmount: [
    app => {
      console.log('4-beforeUnmount', app)
    }
  ]
}

registerMicroApps(apps, microAppLifCycles)

// 添加全局的未捕获异常处理器
addGlobalUncaughtErrorHandler((event) => {
  const { message: msg } = event
  if (msg && msg.includes('died in status LOADING_SOURCE_CODE')) {
    console.error('微应用加载失败，请检查应用是否可运行', event)
  }
})

// 定义全局状态，并返回通信方法，建议在主应用使用，微应用通过 props 获取通信方法
const { onGlobalStateChange, setGlobalState } = initGlobalState({
  user: 'qiankun'
})

// 在当前应用监听全局状态，有变更触发 callback
onGlobalStateChange((value, prev) => console.log('[onGlobalStateChange - main]:', value + prev))

// 按一级属性设置全局状态,微应用中只能修改已存在的一级属性
setGlobalState({
  ignore: 'master',
  user: {
    name: 'master'
  }
})

export default start
