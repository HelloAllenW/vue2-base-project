const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  devServer: {
    client: {
      overlay: false // 禁止：当出现编译错误或警告时，在浏览器中显示全屏覆盖
    }
  }
})
