# 脚手架注意点

1. 类名作用域问题。默认全局生效。

- a. 每个组件中的根标签类名保证唯一性，设置 css 样式时，都以类名开头；
- b. 采用 css module 写法；不同组件样式的类名可以重复；此时.module.css 文件有作用域了；
- c. 使用 less 或 sass 语法，利用选择器嵌套语法解决样式冲突；

2. less 的使用

- 变量以及变量运算规则；
- Mixin 混入；
- 选择器嵌套；
- 配置脚手架识别.less 文件，默认是可以识别.scss 文件的；

3. sass/scss 的使用

> sass 也是 css 扩展语言，整体和 less 功能类似。传统的 sass 使用缩进语法来表达标签之间的关系，没有{}语法。scss 是 sass 的升级版，支持 css 语法结构了，有{}语法。推荐使用 scss。

4. 环境变量

> 在 .html 中、.env 中如何使用。注意自定义环境变量。

5. 全局挂载类组件属性。通过原型对象实现。

6. 脚手架配置跨域

- yarn add http-proxy-middleware
- 在项目 src 目录下创建 setupProxy.js，文件名固定，webpack 打包时，会自动寻找这个代理文件

7. 组件懒加载

- 什么场景下用？首次不需要展示的组件，都可以使用 React.lazy 懒加载；首次必须展示的组件直接正常 import from 即可；
- React.lazy 必须搭配 Suspense 才能使用；

8. antd

- 版本：antd@4.x 主要是 ts 和 hook 代码段，类组件没有提供代码段。使用类组件可以安装 antd@3.x 版本。
- React@17 版本中使用 antd@3.x 版本，浏览器控制台，包括 vscode 都会有警告信息，浏览器可以通过去除 React.StrickMode 严格模式解决。vscode 警告通过修改 webpack.config.js 解决(rules: {})。

9. 二级路由注意事项

- 二级路由使用嵌套的`<Route>`完成层级的限制。
- 匹配成功的二级路由组件，需要在对应的一级组件中使用`<Outlet>`设置占位符，`<Outlet>`就是二级路由组件展示的位置。
- 二级路由可以配合`<Route index />`index 属性，实现默认二级路由的写法。当进入某个一级路由的时候，默认展示哪个二级路由。
