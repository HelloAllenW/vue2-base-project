# 前端项目构建
基于 **vue2 + webpack** 搭建

## Available Scripts
In the project directory, you can run:
1. `yarn serve`
2. `yarn build`
3. `yarn install`

## 项目构建基础
1. 通过脚手架`@vue/cli`手动搭建一个完整的vue项目。
2. 使用配置文件`.editorconfig`统一项目代码风格，抹平编译器差异。
3. VSCode配置文件`Settings.json`调整。
4. 配置`jsconfig.json`提升 JavaScript 开发体验。
5. 代码格式化`Prettier`：
- 安装`Prettier依赖`来为我们格式化代码；
- 需要我们自己手动创建一个 `.prettierrc.js` ，这时我们可以手动通过命令行来格式化某个文件；
- 我们希望每次保存代码时就直接自动格式化代码 ，这时就用到了我们vscode中的 `prettier插件`；
- 我们的prettier的规则，不单单可以在.prettierrc.js中配置，也可以在我们的vscode中进行配置规则；
6. 代码规范性工具`ESLint`：
- 安装`ESLint依赖`，作用是用来规范或者约束代码，例如引号用单引号还是双引号，代码结尾是否要加分号，定义变量是否被调用了，等等。这时可以通过命令行检测某个文件或文件夹；
- 安装`ESLint插件`，作用是鼠标指向代码时就能看到了警告与错误提示；
- 那么我们怎么做到保存时自动修正代码呢，我们需要配置VSCode的 settings.json；
7. Git流程规范配置：借助 `husky` 来拦截 git 操作，在 git 操作之前再进行一次代码检测。
- 安装`husky依赖`；
- 在package.json中添加配置；
- 如果只需要修改新代码，不考虑存量的。那么使用`lint-staged`依赖只针对当前修改的部分进行检测；
8. 通过`commitlint`规范commit。
9. 根据`commit message`自动生成changlog。
10. 样式规范工具`StyleLint`。
11. `.env.*` 多环境配置。
12. 配置兼容浏览器`.browserslistrc`。
13. .vscode 配置插件推荐
14. `vue.config.js`配置优化

## 项目构建进阶
1. 通过[`eslint-plugin-compat`实现自动化兼容性检查](https://zhuanlan.zhihu.com/p/647874867)。防止本地谷歌浏览器调试没问题，线上遇到IE等低版本设备报错导致App异常。
2. 通过`lighthouse-ci`实现一个[性能守卫插件](https://juejin.cn/post/7253331974051823675)