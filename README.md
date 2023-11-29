# vue-components
**(vue2 + webpack)**

## Available Scripts
In the project directory, you can run:
1. `yarn serve`
2. `yarn build`
3. `yarn install`

## 项目构建
1. [通过脚手架@vue/cli手动搭建一个完整的vue2项目](https://zhuanlan.zhihu.com/p/628439854)
2. 使用配置文件`.editorconfig`统一项目代码风格，抹平编译器差异。注意：vscode需要安装 EditorConfig for VS Code 插件。
3. 通过[`eslint-plugin-compat`实现自动化兼容性检查](https://zhuanlan.zhihu.com/p/647874867)。防止本地谷歌浏览器调试没问题，线上遇到IE等低版本设备报错导致App异常。
4. 通过`lighthouse-ci`实现一个[性能守卫插件](https://juejin.cn/post/7253331974051823675)
5. `.browserslistrc`：用来配置兼容浏览器。[browserslist](https://zhuanlan.zhihu.com/p/618578523?utm_id=0) 包在安装 webpack 的时候自动下载。在使用脚手架搭建项目时，会自动生成.browserslistrc文件，对于部分配置参数做一些解释:  
```
" >1%" : 代表着全球超过1%人使用的浏览器  
"last 2 versions" : 表示所有浏览器兼容到最后两个版本  
"not ie <=8" : 表示IE浏览器版本大于8（实则用npx browserslist 跑出来不包含IE9 ）  
"safari >=7": 表示safari浏览器版本大于等于7
```
6. `.env.*` 多环境配置文件
7. ESLint
- 安装ESLint依赖，作用是用来规范或者约束代码，例如引号用单引号还是双引号 ，代码结尾是否要加分号，定义变量是否被调用了，等等。这时可以通过命令行检测某个文件或文件夹。
- 安装ESLint插件，作用是鼠标指向代码时就能看到了警告与错误提示。
- 那么我们怎么做到保存时自动修正代码呢，我们需要配置VSCode 的 settings.json。
8. Prettier
- 安装 Prettier 的 npm 包来为我们 格式化代码。
- 需要我们自己手动创建一个 .prettierrc.js ，这时我们可以手动通过命令行来格式化某个文件。
- 我们希望每次 保存代码时就直接自动格式化代码 ，这时就用到了我们 vscode 中的 prettier 插件
- 我们的 prettier 的规则，不单单可以在 .prettierrc.js 中配置，也可以在我们的 vscode 中进行配置规则
[参考文档](https://www.kancloud.cn/wangjiachong/xuexi/3035552)
9. 借助 husky 来拦截 git 操作，在 git 操作之前再进行一次代码检测。
- 安装husky依赖
- 在package.json中添加配置
- 如果只需要修改新代码，不考虑存量的。那么使用lint-staged依赖只针对当前修改的部分进行检测。
10. 通过`commitlint`规范commit
11. 根据`commit message`自动生成changlog