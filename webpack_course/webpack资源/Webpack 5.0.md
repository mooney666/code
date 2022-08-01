# Webpack 5.0

## 一、基本概念

### 1. webpack的作用

> `webpack` 是一个用于现代 JavaScript 应用程序的 *静态模块打包工具*，当 webpack 处理应用程序时，它会在内部从一个或多个入口点构建一个 [依赖图(dependency graph)](https://webpack.docschina.org/concepts/dependency-graph/)，然后将你项目中所需的每一个模块组合成一个或多个 *bundles*，它们均为静态资源，用于展示你的内容。
>
> 简单理解：它以一个或多个文件作为打包入口，将我们整个项目所有文件编译组合成一个或多个文件输出出去，供浏览器使用。

### 2. webpack的特点

> 仅能编译 JS 中的 `ES Module` 语法，对于css、less、sass、scss、图片、音视频等静态资源默认是处理不了的会报错，需要借助于第三方loader加载器。所以我们学习webpack，主要学习的是如何处理其他静态资源。

1. 处理兼容性：css和js
2. 压缩代码：css和js
3. 处理模块化：模块文件多且引入关系混乱

### 3. 体验打包

> `webpack`打包分为两种模式：
>
> 1. 开发模式：仅能编译 JS 语法。
> 2. 生产模式：能编译JS语法，同时能够对JS语法进行代码压缩，减少代码体积。

1. 新建项目目录webpackdemo，注意不要使用webpack命名，防止和系统包webpack命名冲突。

2. 执行 `npm init -y` 命令，初始化包文件。

3. 执行`npm i webpack webpack-cli -D`安装webpack所需包文件。

4. 构建项目目录结构

   ![项目目录结构](D:\Typora\images\webpackimgs\项目目录结构.png)

5. 使用webpack打包
   - 开发模式打包命令：`npx webpack ./main.js --mode=development`
   - 生产模式打包命令：`npx webpack ./main.js --mode=production`
   - 注意：默认 `Webpack` 会将文件打包输出到 `dist` 目录下。
   - 打包成功的截图如下：
     - ![开发模式下打包](D:\Typora\images\webpackimgs\开发模式打包.png)
     - ![生产模式下打包](D:\Typora\images\webpackimgs\生产模式打包.png)

6. 打包成功之后，将`dist/main.js`这个打包文件，引入到`public/index.html`中即可查看到运行的结果。

## 二、webpack配置

### 1. 配置项目打包命令

> 每次进行项目打包时，由于都要执行很长的命令，为了防止出错，可以在`package.json`的`script`配置项中配置启动命令，减少长命令可能带来的错误。

![启动命令](D:\Typora\images\webpackimgs\启动命令.png)

### 2. 通过配置文件自定义打包配置

> 之前体验了`webpack`的打包过程，有很多的内容都是webpack默认的配置，比如打包后默认放在了`dist`目录，打包后的文件名和代码中的入口文件保持一致等。那我们也可以自定义打包配置，在项目根目录下创建`webpack.config.js`即可实现。

1. 项目根目录下新建`webpack.config.js`文件，这个文件名是固定的，不能修改。

   ```js
   module.exports = {
     // 入口：指示 Webpack 从哪个文件开始打包
     entry: "./main.js",
     // 输出：指示 Webpack 打包完的文件输出到哪里去，如何命名
     output: {
       path: path.resolve(__dirname, 'dist'), // 打包存放路径
       filename: 'static/js/bundle.js', // 打包后的路径和文件名
       clean: true, // 自动删除上一次的打包文件，默认不会删除
     },
     // loader加载器：webpack只能处理 js、json等资源，其他资源需要借助 loader才能解析，module是配置loader解析器的规则
     module: {
       rules: [],
     },
     // 插件：扩展Webpack的功能
     plugins: [],
     // 模式：指定开发模式打包，还是生产模式打包
     mode: "development",
   };
   ```

2. 通过命令`npx webpack`就可以利用上述配置文件进行项目的打包了。

### 3. 配置css打包loader

1. 安装`style-loader`和`css-loader`两个loader来处理css资源。

   ```js
   npm install --save-dev css-loader style-loader
   ```

   - `css-loader` webpack将 css文件内容编译到`bundle.js`文件中
   - `style-loader` 将 `bundle.js` 中的样式，动态生成到style标签中，从而在浏览器中使用

2. 在 `src` 目录下新建 `css` 目录，并创建 `index.css` 文件。

3. 在 `main.js` 中导入 `index.css`。

   ```js
   import "./src/css/index.css";
   ```

4. 配置loader加载器

   ```js
   module: {
     rules: [
       {
         test: /\.css$/i, // 用来匹配 .css 结尾的文件
         use: ["style-loader", "css-loader"], // use 数组里面 Loader 执行顺序是从右到左
       },
     ],
   },
   ```

5. 执行 `npx webpack` 进行打包。

### 4. 单独抽离CSS资源(性能优化)

> css 文件目前被打包到 js 文件中，当 js 文件加载时，会创建一个 style 标签来生成样式。这样对于网站来说，如果网速比较慢会出现闪屏现象，用户体验不好。可以将 css 文件单独抽离出来形成一个独立的文件，然后通过 link 标签加载，这样性能好，没有闪屏现象。

1. 安装 `MiniCssExtractPlugin` 扩展：本插件会将 CSS 提取到单独的文件中，为每个包含 CSS 的 JS 文件创建一个 CSS 文件，并且支持 CSS 和 SourceMaps 的按需加载。
   - 本插件基于 webpack v5 的新特性构建，并且需要 webpack 5 才能正常工作。

2. 安装 `mini-css-extract-plugin` 。

   ```js
   npm install --save-dev mini-css-extract-plugin
   ```

3. 修改 `webpack.config.js` 文件

   - 用 `MiniCssExtractPlugin.loader` 替换之前的 `style-loader`

   ```js
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   module: {
     rules: [
       {
         test: /\.css$/i,
         use: [MiniCssExtractPlugin.loader, "css-loader"],
       },
       {
         test: /\.less$/i,
         use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"],
       },
       {
         test: /\.s[ac]ss$/i,
         use: [
           MiniCssExtractPlugin.loader,
           "css-loader",
           "sass-loader",
         ],
       },
     ],
   },
   plugins: [new MiniCssExtractPlugin()],
   ```

4. 在 `index.html` 中，手动引入 `bundle.css` 文件。

### 5. 样式兼容性处理(兼容性优化)

1. 安装 `postcss-loader` 和 `postcss`。

   ```js
   npm install --save-dev postcss-loader postcss postcss-preset-env
   ```

2. 配置 `webpack.config.js` 文件：css、less、sass都需要配置兼容性。这里以 css 为例。

   ```js
   rules: [
     {
       test: /\.css$/i,
       use: [
         'style-loader',
         'css-loader',
         {
           loader: 'postcss-loader',
           options: {
             postcssOptions: {
               plugins: [
                 [
                   'postcss-preset-env'
                 ],
               ],
             },
           },
         },
       ],
     },
   ],
   ```

3. 如果不想配置在 `webpack.config.js` 中，也可以单独配置在 `postcss.config.js` 文件中，loader 将会自动搜索该配置文件。

   ```js
   module.exports = {
     plugins: [
       [
         'postcss-preset-env',
       ],
     ],
   };
   
   // 修改css解析规则
   rules: [
     {
       test: /\.css$/i,
       use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
     },
     {
       test: /\.less$/i,
       use: [
         MiniCssExtractPlugin.loader,
         "css-loader",
         "postcss-loader", // 注意位置
         "less-loader",
       ],
     },
     {
       test: /\.s[ac]ss$/i,
       use: [
         MiniCssExtractPlugin.loader,
         "css-loader",
         "postcss-loader", // 注意位置
         "sass-loader",
       ],
     },
   ],
   ```

4. 控制兼容性：以在 `package.json` 文件中添加 `browserslist` 来控制样式的兼容性。

   ```js
   {
     ...
     "browserslist": ["ie >= 8"] // 兼容ie8以上。
   }
   
   // 常规设置方法
   {
     ...
     "browserslist": ["last 2 version", "> 1%", "not dead"] // last 2 version最新两个版本 > 1%处理99%的兼容性 not dead健在的浏览器
   }
   ```



### 6. 配置less打包loader

1. 需要先安装 `less` 和 `less-loader` 。

   ```js
   npm install less less-loader --save-dev
   ```

   - `less-loader` 负责将 less 文件编译成 css 文件

2. 将该 loader 添加到 `webpack` 的配置中去 。

   ```js
   module: {
     rules: [
       {
         test: /\.less$/i,
         use: [
           'style-loader',
           'css-loader',
           'less-loader',
         ],
       },
     ],
   },
   ```

3. 在 `src` 目录下新建 `less` 目录，并创建 `index.less` 文件。

4. 在 `main.js` 中导入 `index.css` 。

   ```js
   import "./src/less/index.less";
   ```

5. 执行 `npx webpack` 进行打包。



### 7. 配置sass打包loader

1. 安装所需包。

   ```js
   npm install sass-loader sass --save-dev
   ```

2. 配置webpack.config.js文件。

   ```js
   module: {
     rules: [
       {
         test: /\.s[ac]ss$/i,
         use: [
           // 将 JS 字符串生成为 style 节点
           'style-loader',
           // 将 CSS 转化成 CommonJS 模块
           'css-loader',
           // 将 Sass 编译成 CSS
           'sass-loader',
         ],
       },
     ],
   },
   ```

3. 在 `main.js` 入口文件中引入sass文件。

   ```js
   import "./src/sass/index.sass";
   ```

4. 开始打包。

### 8. 配置webpack热更新

> ​		每次修改了代码之后，都需要重新运行打包命令，将最新的代码打包之后，浏览器才能正确加载，这个过程较为繁琐。
>
> ​		为了解决这个问题，webpack提供了打包热更新功能，可以监测代码的变动，实时打包，较少每次都需要手动打包的繁琐。
>
> ​		热更新实际上是webpack启动了一个node服务，实时监听代码的变化，自动编译最新的代码到浏览器中，可以实时查看最新的结果。
>
> **注意：热更新由于实时监听最新代码，webpack为了提高编译打包效率，并不会将每次打包后的代码，编译到本地的dist的目录，这样太耗时了，而是将打包后的代码放在了所启动的服务内存中，等到调试完毕，需要最终的打包文件，可以结束热更新模式，直接运行命令npm run build手动打包即可。**

1. 安装 `npm i webpack-dev-server -D`

2. 在 `webpack.config.js`中配置启动服务

   ```js
   // 开发服务器
   devServer: {
     host: "localhost", // 启动服务器域名
     port: "3000", // 启动服务器端口号
     open: true, // 是否自动打开浏览器
   },
   ```

3. 删除`index.html`文件中，之前引入的本地css和js文件，因为webpack-dev-server实时打包文件在内存中，本地文件就不适用了

```html
<link rel="stylesheet" href="../dist/static/css/bundle.css" />
<script src="../dist/static/js/bundle.js"></script>
```

4. 运行webpack服务命令`npx webpack serve`

5. 此时发现页面自动打开`localhost:3000`，但是之前的样式都消失了，是因为没有配置webpack-dev-server应该以哪个html为模板进行实时打包编译

6. 安装配置`npm i html-webpack-plugin -D`

7. 配置`webpack.config.js`文件

   ```js
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   plugins: [
     new HtmlWebpackPlugin({
       // 以 public/index.html 为模板创建文件
       // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js等资源
       template: path.resolve(__dirname, "public/index.html"),
     }),
   ],
   ```

8. 重新启动服务，此时样式生效，右键查看源代码，可以发现`index.html`中自动引入了内存中的css和js资源，截图如下：

   ![热更新服务](D:\Typora\images\webpackimgs\热更新.png)

9. 可以将 `npx webpack server` 配置到 `package.json` 的scripts脚本命令中，方便启动

   ```rea
   "scripts": {
     "start-dev": "npm run dev",
     "start-serve": "npx webpack serve",
     "dev": "npx webpack ./main.js --mode=development",
     "build": "npx webpack ./main.js --mode=production"
   },
   ```


### 9. webpack配置文件分离

> 一般项目中，为了将生产环境和开发环境做出更细致的划分，通常会将webpack配置分成多个文件，然后根据打包环境去加载对应的配置即可。

1. 在项目根目录下创建 `config` 目录，并创建三个配置文件

   ![config目录结构](D:\Typora\images\webpackimgs\config结构.png)

- `webpack.common.js `  该文件负责提取公共配置环境，将生产环境和测试环境的通用配置放在该文件内部，同时负责对 `webpack.dev.js` 和 `webpack.prod.js` 的配置进行合并
- `webpack.dev.js` 只设置开发环境下的打包配置
- `webpack.prod.js` 只设置生产环境下的打包配置

2. 配置  `webpack.common.js`

   - 安装 `webpack-merge` 包，它可以合并多个打包配置文件

   ```react
   const path = require("path");
   const { merge } = require("webpack-merge");
   const prodConfig = require("./webpack.prod");
   const devConfig = require("./webpack.dev");
   const HtmlWebpackPlugin = require("html-webpack-plugin");
   const MiniCssExtractPlugin = require("mini-css-extract-plugin");
   
   const commonConfig = {
     context: path.resolve(__dirname, "../"),
     entry: "./main.js",
     module: {
       rules: [
         {
           test: /\.css$/i,
           use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
         },
         {
           test: /\.less$/i,
           use: [
             MiniCssExtractPlugin.loader,
             "css-loader",
             "postcss-loader",
             "less-loader",
           ],
         },
         {
           test: /\.s[ac]ss$/i,
           use: [
             // 将 JS 字符串生成为 style 节点
             MiniCssExtractPlugin.loader,
             // 将 CSS 转化成 CommonJS 模块
             "css-loader",
             "postcss-loader",
             // 将 Sass 编译成 CSS
             "sass-loader",
           ],
         },
       ],
     },
     resolve: {
       extensions: [".js"], // 哪些文件扩展支持省略
       alias: { // 配置路径别名，引入文件时，路径更加简洁
         "@": path.resolve(__dirname, "../src"),
       },
     },
     // plugins: 开发生产都需要的插件
     plugins: [
       new MiniCssExtractPlugin({
         filename: "static/css/bundle.css",
       }),
       new HtmlWebpackPlugin({
         template: path.resolve(__dirname, "../public/index.html"), // 注意路径
       }),
     ],
   };
   module.exports = function (env) {
     console.log("++++", env);
     // env.production 获取环境变量env中是否包含production，如果包含则返回true，如果不包含说明是开发环境，此时env.development为true
     return env.production
       ? merge(commonConfig, prodConfig)
     : merge(commonConfig, devConfig);
   };
   ```

3. 配置 `webpack.prod.js` 文件

   ```js
   // 存放生产环境下的配置
   const path = require("path");
   
   module.exports = {
     output: {
       path: path.resolve(__dirname, "../dist"), // 注意路径
       filename: "static/js/bundle.js",
     },
     plugins: [],
     mode: "production",
   };
   
   ```

4. 配置 `webpack.dev.js` 文件

   ```js
   // 存放开发环境下的配置
   module.exports = {
     devServer: {
       host: "localhost",
       port: "3300",
       open: true,
     },
     plugins: [],
     mode: "development",
   };
   
   ```

5. 修改 `main.js` 文件

   ```js
   // webpack打包时，已经配置了路径别名 @ 等价于 src
   import sum from "@/js/sum";
   console.log(sum(100, 22));
   
   import "@/css/index.css";
   import "@/less/index.less";
   import "@/sass/index.sass";
   ```

6. 删除默认的配置文件 `webpack.config.js` 文件

7. 修改启动命令脚本

   ```react
   "scripts": {
     "start": "npm run dev",
     "dev": "npx webpack serve --config ./config/webpack.common.js --env development",
     "build": "npx webpack --config ./config/webpack.common.js --env production"
   },
   ```



