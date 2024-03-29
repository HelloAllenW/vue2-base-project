# 前端项目构建
基于 **vue2 + webpack** 搭建

## Available Scripts
In the project directory, you can run:
1. `yarn serve`：启动本地服务
2. `yarn build`：打包
3. `yarn install`：安装依赖
4. `npm run prepare`：创建.husky
5. `npm run commit`: 使用图形化选择规范的commit
6. `npm run changelog`: 生成changelog.md文件
7. `yarn add [packageName] -D`：添加依赖
8. `yarn remove <packageName>`：删除依赖

## 项目构建基础
1. 通过脚手架`@vue/cli`手动搭建一个完整的vue项目。

2. 使用配置文件`.editorconfig`统一项目代码风格，抹平编译器差异。

3. VSCode配置文件`Settings.json`调整。

4. 配置`jsconfig.json`提升 JavaScript 开发体验。

5. 代码格式化`Prettier`：  
（1）安装`Prettier依赖`来为我们格式化代码；  
（2）需要我们自己手动创建一个 `.prettierrc.js` ，这时我们可以手动通过命令行来格式化某个文件；  
（3）我们希望每次保存代码时就直接自动格式化代码 ，这时就用到了我们vscode中的 `prettier插件`；  
（4）我们的prettier的规则，不单单可以在.prettierrc.js中配置，也可以在我们的vscode中进行配置规则；

6. 代码规范性工具`ESLint`：  
（1）安装`ESLint依赖`，作用是用来规范或者约束代码，例如引号用单引号还是双引号，代码结尾是否要加分号，定义变量是否被调用了，等等。这时可以通过命令行检测某个文件或文件夹；  
（2）安装`ESLint插件`，作用是鼠标指向代码时就能看到了警告与错误提示；  
（3）那么我们怎么做到保存时自动修正代码呢，我们需要配置VSCode的 settings.json；

7. Git流程规范配置：借助 `husky` 来拦截 git 操作，在 git 操作之前再进行一次代码检测。  
（1）安装`husky依赖`；  
（2）在package.json中添加配置；  
（3）如果只需要修改新代码，不考虑存量的。那么使用`lint-staged`依赖只针对当前修改的部分进行检测；

8. 通过`commitlint.config.js`规范commit。

9. 根据`commit message`自动生成changlog。

10. 自定义`changelog-option.js`。

11. 样式规范工具`StyleLint`。

12. `.env.*` 多环境配置。

13. 配置兼容浏览器`.browserslistrc`。

14. .vscode 配置插件推荐：
在`.vscode`文件夹下配置`extensions.json`，每次打开vscode会提示安装插件。

## webpack 配置
1. [vue.config.js相关配置](https://cli.vuejs.org/zh/config/)。
2. webpack 配置优化（待补充）

## 项目构建进阶（待办）
1. 通过`eslint-plugin-compat`实现自动化兼容性检查[参考](https://zhuanlan.zhihu.com/p/647874867)。防止本地谷歌浏览器调试没问题，线上遇到IE等低版本设备报错导致App异常。

2. 通过`lighthouse-ci`实现一个[性能守卫插件](https://juejin.cn/post/7253331974051823675)

3. `swagger` 的使用

4. 设置全局的 settings.js

5. route-create 功能

## 项目公共组件和工具类封装（待办）
1. 公共组件

2. 工具类

3. [table上方的搜索条件展开收起功能](https://github.com/hubary/element-plugins)
