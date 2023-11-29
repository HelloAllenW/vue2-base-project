module.exports = {
  // 表示当前目录即为根目录，ESLint规则被现在到该目录下
  root: true,
  // env 表示启用 ESLint 检查的环境
  env: {
    // 在 node 环境下启动ESLint检测
    node: true
  },
  // ESLint 中基础配置需要继承的配置，这里不知道怎么配置需要看文档
  extends: [
    'plugin:vue/essential',
    '@vue/standard'
  ],
  // 解析器
  parserOptions: {
    parser: '@babel/eslint-parser' // 是一个解析器，允许您使用ESLint对所有有效的Babel代码进行检查。
  },
  // 需要修改的启用规则及其各自的错误级别
  /**
   * 错误级别分为三种：
   * "off" 或 0 -   关闭规则
   * "warn" 或 1 -  开启规则，使用警告级别的错误：warn（不会导致程序退出）
   * "error" 或 2 - 开启规则，使用错误级别的错误：error（当被触发的时候，程序会）
   */
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off'
  }
}
