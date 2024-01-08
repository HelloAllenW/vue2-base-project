// 不同的后端调试地址
const targetProxy = {
  107: {
    dev_api: 'http://10.50.4.107:9080'
  },
  197: {
    dev_api: 'http://10.64.7.197:9080'
  }
}

/**
 * npm run dev 后默认的代理地址
 */
const defaultProxy = 'http://localhost:9080'

/**
 * 从两种方式获取target 名称以及代理地址
 *
 * 后端:  直接运行 npm run dev 代理指向defaultProxy
 * 前端:  可以有两种方式
 * 1. npm run dev --target=xxx
 * 2. npm run dev -- --xxx 【!!!注意  这里有两个--, 中间是有空格】
 * (xxx为targetProxy重定义的属性名称, 比如fushaohui)
 *
 * @returns {object dev_api ,npm_config_target}
 */
function getProxy() {
  const len = process.argv.length
  const last = process.argv[len - 1]
  const result = {
    npm_config_target: '本机后端',
    dev_api: defaultProxy
  }
  // console.log(process.argv);
  let target = null
  if (last.startsWith('--')) {
    target = last.slice(2)
  } else if (process.env.npm_config_target) {
    target = process.env.npm_config_target
  }
  if (target && targetProxy[target]) {
    result.dev_api = targetProxy[target].dev_api
    result.npm_config_target = target
  }
  return result
}

const proxy = getProxy()
module.exports = {
  dev_api: proxy.dev_api,
  npm_config_target: proxy.npm_config_target,
  targetProxy
}
