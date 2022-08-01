const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { merge } = require("webpack-merge"); // 它是负责合并webpack配置文件的。
const prodConfig = require("./webpack.prod");
const devConfig = require("./webpack.dev");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const commonConfig = {
  // 入口：指示 Webpack 从哪个文件开始打包
  entry: path.resolve(__dirname, "../main.js"),
  // 输出：指示 Webpack 打包完的文件输出到哪里去，如何命名
  output: {
    path: path.resolve(__dirname, "../build"), // 打包存放路径
    filename: "js/main.js", // 打包后的路径和文件名
    clean: true, // 自动删除上一次的打包文件，默认不会删除
  },
  module: {
    rules: [
      {
        test: /\.css$/i, // 用来匹配 .css 结尾的文件，i忽略文件名大小写
        use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"], // use 数组里面 Loader 执行顺序是从右到左。
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
          MiniCssExtractPlugin.loader,
          "css-loader",
          "postcss-loader",
          "sass-loader",
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new HtmlWebpackPlugin({
      // 以 public/index.html 为模板创建文件
      // 新的html文件有两个特点：1. 内容和源文件一致 2. 自动引入打包生成的js,css等资源
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
  resolve: {
    extensions: [".js", ".html", ".css"], // 哪些文件扩展后缀支持省略
    alias: {
      // 配置路径别名，引入文件时，路径更加简洁
      "@cs": path.resolve(__dirname, "../src/css"),
      "@ls": path.resolve(__dirname, "../src/less"),
      "@ss": path.resolve(__dirname, "../src/sass"),
    },
  },
};

module.exports = env => {
  console.log("----", env);
  return env.production
    ? merge(commonConfig, prodConfig)
    : merge(commonConfig, devConfig);
};
