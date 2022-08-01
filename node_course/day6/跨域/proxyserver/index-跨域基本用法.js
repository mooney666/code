// http-proxy-middleware 代理服务器使用的包，代理你的接口服务器，实现跨域。
// 我们的前端，向这个代理服务器发请求，首先保证不能有跨域问题。要解决跨域问题

const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// 配置代理接口
// http://localhost:9000/local/users -> http://localhost:8000/users
// http://localhost:9000/local/info
// http://localhost:9000/local/list
app.use(
  "/local",
  createProxyMiddleware({
    target: "http://localhost:8000", // 前端接口以/local开头的，都会走这个代理，往http://localhost:8000接口服务器转化请求。
    changeOrigin: true, // 这个配置必须设置
    pathRewrite: {
      // 路径重写
      "^/local": "", // 代理服务器真正转发请求时，需将 /local 去除，因为接口服务器没有这个前缀。
    },
  })
);

// http://localhost:9000/baidu/users
// http://localhost:9000/baidu/info
// http://localhost:9000/baidu/list
app.use(
  "/baidu",
  createProxyMiddleware({
    target: "https://www.baidu.com",
    changeOrigin: true,
    pathRewrite: {
      "^/baidu": "", // 代理服务器真正转发请求时，需将 /baidu 去除，因为接口服务器没有这个前缀。
    },
  })
);

app.listen(9000, () => {
  console.log("代理服务器已启动 端口9000");
});
