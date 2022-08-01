const path = require("path");

module.exports = {
  // 配置开发服务器，一旦启动不会关闭，时刻处于监听状态，代码发生改变，它就会实时自动打包最新代码到内存中。
  devServer: {
    host: "localhost", // 启动服务器域名
    port: "3000", // 启动服务器端口号
    open: true, // 是否自动打开浏览器
  },
  // 模式：指定开发模式打包
  mode: "development",
};