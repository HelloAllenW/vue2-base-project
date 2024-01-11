// @see: https://cli.vuejs.org/zh/config/
/** 说明：
 * 1. 项目根目录下的vue.config.js文件默认会被 @vue/cli-service 自动加载
 * 2. 如何查看默认的webpack配置：
 *    Vue CLI 官方文档：vue-cli-service 暴露了 inspect 命令用于审查解析好的 webpack 配置。那个全局的 vue 可执行程序同样提供了 inspect 命令，这个命令只是简单的把 vue-cli-service``inspect 代理到了你的项目中。
 *    被抽象化的webpack，我们要想去理解它默认的一些配置的话是比较困难的，所以我们可以通过指令去查看。该指令会将webpack的配置输出到output.js文件，这样方便去查看。
 *    `vue inspect > output.js`
 */
const { defineConfig } = require('@vue/cli-service')
const path = require('path')
const chalk = require('chalk')
const webpack = require('webpack')
// const CompressionPlugin = require('compression-webpack-plugin')
// const HotHashWebpackPlugin = require('hot-hash-webpack-plugin')
// const WebpackBar = require('webpackbar')
const { name } = require('./package.json')
const { npm_config_target, dev_api } = require('./vue.proxy.js')

const resolve = (dir) => path.join(__dirname, '.', dir)
// const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i
const publicPath = '/'
const assetsDir = 'assets'
const FULL_ASSETS_PATH = publicPath + assetsDir

// defineConfig 是 @vue/cli-service 提供的帮手函数，以获得更好的类型提示
module.exports = defineConfig({
  publicPath, // Vue CLI 3.3之前是baseUrl。如果你的应用被部署在 https://www.my-app.com/my-app/，则设置 publicPath 为 /my-app/。（同 webpack 的 output.publicPath）
  outputDir: 'dist', // 生成的生产环境构建文件的目录，注意目标目录的内容在构建之前会被清除 (构建时传入 --no-clean 可关闭该行为)。（同 webpack 的 output.path）
  assetsDir, // 放置生成的静态资源 (js、css、img、fonts) 的 (相对于 outputDir 的) 目录。
  indexPath: 'index.html', // 指定生成的 index.html 的输出路径 (相对于 outputDir)。也可以是一个绝对路径。（当你设置为./test/index1.html就会把index.html改为/test/index1.html）
  filenameHashing: true, // 当你无法使用 Vue CLI 生成的 index HTML，你可以通过将这个选项设为 false 来关闭文件名哈希。
  lintOnSave: 'default', // 是否在开发环境下通过 eslint-loader 在每次保存时 lint 代码。这个值会在 @vue/cli-plugin-eslint 被安装之后生效。
  transpileDependencies: false, // 默认情况下 babel-loader 会忽略所有 node_modules 中的文件。你可以启用本选项，以避免构建后的代码中出现未转译的第三方依赖。不过，对所有的依赖都进行转译可能会降低构建速度。如果对构建性能有所顾虑，你可以只转译部分特定的依赖：给本选项传一个数组，列出需要转译的第三方包包名或正则表达式即可。
  productionSourceMap: false, // 如果你不需要生产环境的 source map，可以将其设置为 false 以加速生产环境构建。

  // 所有 webpack-dev-server 的选项都支持。
  devServer: {
    port: '8080', // 开发运行时的端口
    hot: true, // 设置代码保存时是否进行热更新（局部刷新，不刷新整个页面）
    host: '0.0.0.0', // 设置成'0.0.0.0',在同一个局域网下，如果你的项目在运行，同时可以通过你的`ip:port/...访问你的项目
    https: false, // 是否启用 https
    open: true, // npm run serve 时是否直接打开浏览器
    compress: true, // 对 devServer 所有服务启用 gzip 压缩
    client: {
      overlay: false // 禁止：当出现编译错误或警告时，在浏览器中显示全屏覆盖
    },
    /**
     *设置让浏览器 overlay 同时显示警告和错误
      overlay: {
        warnings: true,
        errors: true
      },
     */

    // 在所有响应中添加首部内容
    headers: {
      'Access-Control-Allow-Origin': '*'
    },
    proxy: {
      [process.env.VUE_APP_BASE_API]: {
        target: 'http://localhost:9080',
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        },
        changeOrigin: true
      }
    }
    // 跨域之前会优先匹配mock（模拟数据）
    // before: require('./mock/mock-server.js')
  },

  // @see: https://cli.vuejs.org/zh/guide/webpack.html
  /** 用来调整 webpack 配置：
   * 如果这个值是一个对象，则会通过 webpack-merge 合并到最终的配置中。
   * 如果这个值是一个函数，则会接收被解析的配置作为参数。该函数既可以修改配置并不返回任何东西，也可以返回一个被克隆或合并过的配置版本。
   */
  configureWebpack: {
    // provide the app's title in webpack's name field, so that it can be accessed in index.html to inject the correct title.
    name,
    // output: {
    //   jsonpFunction: `webpackGateway`
    // },
    resolve: {
      // 设置别名alias
      alias: {
        // webpack默认是将src的别名设置为@, 此外，我们可以进行添加
        '@': resolve('src')
        // api: resolve('src/apis'),
        // 'paas-common': resolve('paas-common')

        /** 当然也可以在chainWebpack中配置别名：
         * config.resolve.alias
            .set('@', resolve('src'))
            .set('api', resolve('src/apis'))
            .set('paas-common', resolve('paas-common'))
         */
      }
    },
    // 用来配置不打包某些依赖包，而是在运行时从外部获取。这样做的好处是可以减少打包后的文件体积，并且可以使用 CDN 等外部资源加速加载。
    // https://juejin.cn/post/7001138300178137118
    // externals: {
    //   globalSettings: 'globalSettings',
    //   '@antv/x6': 'X6'
    // },
    plugins: [
      // DefinePlugin允许在编译时创建配置的全局常量
      new webpack.DefinePlugin({
        FULL_ASSETS_PATH: JSON.stringify(FULL_ASSETS_PATH)
      }),
      // 版权声明
      new webpack.BannerPlugin('Copyright 2024-2999 of blog.helloallen.com')
      /**
       * 对于一些公共的变量或者方法，为了简化调用我们往往会通过providePlugin将他们设置成全局变量或者方法。
       * 这样使用时可以直接调用：_deepCopy({name:'小明', age:18})、_formatTime(new Date()).format('YYYY-MM-DD')
       * 我们将函数挂载在Vue.prototype上一样可以在组件中共享，但是挂载太多会造成根root体积过大。
       * https://zhuanlan.zhihu.com/p/419915768
       */
      // new webpack.ProvidePlugin({
      //   _deepCopy: [path.join(__dirname, 'src/tools/index.js'),'deepCopy'], // 深拷贝函数
      //   _formatTime: 'dayjs',  // dayjs 插件
      // }),
    ]
  },

  // 是一个函数，会接收一个基于 webpack-chain 的 ChainableConfig 实例。允许对内部的 webpack 配置进行更细粒度的修改。
  chainWebpack: (config) => {
    // 1. 通过 style-resources-loader 来添加less全局变量（建议在CSS属性中设置）
    /*
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => {
      let rule = config.module.rule('less').oneOf(type)
      rule
        .use('style-resource')
        .loader('style-resources-loader')
        .options({
          patterns: [path.resolve(__dirname, './lessVariates.less')]
        })
    })
    */
    // 3. `url-loader`是webpack默认已经配置的，现在我们来修改它的参数
    /*
    config.module
      .rule('images')
      .use('url-loader')
      .tap((options) => ({
        name: './assets/images/[name].[ext]',
        quality: 85,
        limit: 0,
        esModule: false
      }))
    */
    // 4. html-webpack-plugin 是 webpack 已经默认配置的，默认的源模版文件是 public/index.html; 我们可以对其参数进行修改
    /*
    config.plugin('html').tap((options) => [
      {
        template: '../../index.html', // 修改源模版文件
        title: 'test'
      }
    ])
    */
    // 5. webpack 默认的 entry 入口是 scr/main.ts，可通过以下方式修改
    /*
    config.entryPoints.clear(); // 清空默认入口
    config.entry('test').add(getPath('./test/main.ts')); // 重新设置
    */
    // 6. 定义全局全局变量，DefinePlugin 是 webpack 已经默认配置的，我们可以对参数进行修改
    /*
    config.plugin('define').tap((args) => [
      {
        ...args,
        'window.isDefine': JSON.stringify(true)
      }
    ])
    */
    // 7. 自定义打包后js文件的路径及文件名字
    /*
    config.output.filename('./js/[name].[chunkhash:8].js')
    config.output.chunkFilename('./js/[name].[chunkhash:8].js')
    */
    // 8. 修改打包时css抽离后的filename及抽离所属目录
    /*
    config.plugin('extract-css').tap((args) => [
      {
        filename: 'css/[name].[contenthash:8].css',
        chunkFilename: 'css/[name].[contenthash:8].css'
      }
    ])
    */
    // 9. 新增一个`hot-hash-webpack-plugin`
    // 注意：这里use的时候不需要使用`new HotHashWebpackPlugin()`
    /*
    config.plugin('hotHash').use(HotHashWebpackPlugin, [{ version: '1.0.0' }])
    config.plugin('webpackBar').use(WebpackBar)
    */

    // 删除预加载
    config.plugins.delete('preload') // TODO: need test
    config.plugins.delete('prefetch') // TODO: need test

    // `svg-sprite-loader`: 将svg打包成雪碧图（项目中需要使用svg则进行以下配置）
    config.module.rule('svg').exclude.add(resolve('src/icons')).end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]'
      })
      .end()

    // set preserveWhitespace。vue-loader识别vue-loader
    config.module
      .rule('vue')
      .use('vue-loader')
      .loader('vue-loader')
      .tap((options) => {
        // vue打包保留标签的空白
        options.compilerOptions.preserveWhitespace = true
        return options
      })
      .end()

    config
      // 生产模式和开发模式下分别配置
      .when(process.env.NODE_ENV === 'development', (config) => {
        config.devtool('cheap-source-map')
        config.cache(true)
        // 在控制台中打印出来
        console.log(chalk`
          npm_config_target: {blue ${npm_config_target}}
          swagger-ui: {blue ${dev_api}/swagger-ui.html}
          proxy: {green dev_api}: {yellow ${dev_api}}
        `)
      })

    config.when(process.env.NODE_ENV !== 'development', (config) => {
      config.optimization.minimizer('terser').tap((args) => {
        // remove console.*
        args[0].terserOptions.compress.drop_console = true
        // remove debugger
        args[0].terserOptions.compress.drop_debugger = true
        // remove console.log
        args[0].terserOptions.compress.pure_funcs = ['console.log']
        args[0].terserOptions.output = {
          comments: false
        }
        return args
      })
      // script-ext-html-webpack-plugin 是一个Webpack插件HtmlWebpackPlugin的扩展插件，该插件简化了HTML文件的创建。
      /*
      config
        .plugin('ScriptExtHtmlWebpackPlugin')
        .after('html')
        .use('script-ext-html-webpack-plugin', [
          {
            // `runtime` must same as runtimeChunk name. default is `runtime`
            inline: /runtime\..*\.js$/
          }
        ])
        .end()
      */
      // 打成多个chunks：标示打包（优化前）的哪些 modules 被用于优化到不同chunks中
      // https://webpack.docschina.org/plugins/split-chunks-plugin/
      config.optimization.splitChunks({
        // 采用什么样的方式来优化分离 chunks。all表示不管是同步导入还是异步导入都会分离为独立的模块
        chunks: 'all',
        // 生成 chunk 的最大体积（以 bytes 为单位）。
        maxSize: 2.3 * 1024 * 1024,
        // 通过 cacheGroups，可以自定义 chunk 输出分组。设置 test 对模块进行过滤，符合条件的模块分配到相同的组。
        cacheGroups: {
          vendor: {
            name: 'chunk-libs',
            test: /[\\/]node_modules[\\/]/,
            priority: 10,
            chunks: 'initial' // only package third parties that are initially dependent
          },
          elementUI: {
            name: 'chunk-elementUI', // split elementUI into a single package
            priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
            test: /[\\/]node_modules[\\/]_?element-ui(.*)/ // in order to adapt to cnpm
          },
          antvG6: {
            name: 'chunk-antvG6',
            priority: 30,
            test: /[\\/]node_modules[\\/]_?@antv(.*)/ // in order to adapt to cnpm
          },
          echarts: {
            // split echarts libs
            name: 'chunk-echarts',
            test: /[\\/]node_modules[\\/]_?echarts(.*)/,
            priority: 50,
            chunks: 'async'
          },
          commons: {
            name: 'chunk-commons',
            test: resolve('src/components'), // can customize your rules
            chunks: 'all',
            minSize: 1,
            minChunks: 3, //  minimum common number
            priority: 5,
            reuseExistingChunk: true
          }
        }
      })

      config.optimization.runtimeChunk('single')

      /*
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          filename: '[path][base].gz',
          algorithm: 'gzip',
          test: productionGzipExtensions,
          threshold: 10240,
          minRatio: 0.8,
          deleteOriginalAssets: false
        })
      )
      */
    })
  },
  css: {
    // 是否使用css分离插件 ExtractTextPlugin
    extract: true,
    // 开启 CSS source maps?
    sourceMap: false,
    // 启用 CSS modules for all css / pre-processor files.
    // modules: false,
    // 向 webpack 的预处理器 loader 传递选项
    loaderOptions: {
      /*
      // 给 sass-loader 传递选项
      sass: {
        // @/ 是 src/ 的别名
        // 所以这里假设你有 `src/variables.sass` 这个文件
        // 注意：在 sass-loader v8 中，这个选项名是 'prependData'
        additionalData: `@import '~@/variables.sass'`
      },
      */
      // 这里的选项会传递给 scss-loader
      // 默认情况下 `sass` 选项会同时对 `sass` 和 `scss` 语法同时生效
      // 因为 `scss` 语法在内部也是由 sass-loader 处理的
      // 但是在配置 `prependData(additionalData)` 选项的时候
      // `scss` 语法会要求语句结尾必须有分号，`sass` 则要求必须没有分号
      // 在这种情况下，我们可以使用 `scss` 选项，对 `scss` 语法进行单独配置
      scss: {
        // 注入全局变量和全局变量样式
        prependData: `
          $FULL_ASSETS_PATH: ${FULL_ASSETS_PATH};
          @import '~@/styles/variables.scss';
        `
      }
      /*
      // 给 less-loader 传递 Less.js 相关选项
      less: {
        // http://lesscss.org/usage/#less-options-strict-units `Global Variables`
        // `primary` is global variables fields name
        globalVars: {
          primary: '#fff'
        }
      }
      */
    }
  }
})
