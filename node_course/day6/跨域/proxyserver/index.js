const express = require("express");
const { createProxyMiddleware } = require("http-proxy-middleware");
const cors = require("cors");

const app = express();
app.use(cors());

// 前端发送的以localhost:9000开头的请求，都会经过这个代理中间件，因为你没有配置前缀。
app.use(
  createProxyMiddleware({
    target: "https://www.lanqb.com",
    changeOrigin: true, // 切换源，域名，实现偷梁换柱。
  })
);

app.listen(9000, () => {
  console.log("代理服务已启动 9000");
});
