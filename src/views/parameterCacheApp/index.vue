<template>
  <div id="parameter-cache-app-container"></div>
</template>

<script>
import { start } from 'qiankun'
export default {
  name: 'parameterCacheApp',
  components: {},
  mounted () {
    if (!window.qiankunStarted) {
      window.qiankunStarted = true
      start({
        prefetch: true, // 是否开启预加载
        sandbox: {
          experimentalStyleIsolation: true // 实验性的样式隔离
        }
      })
    }
  }
}
</script>
