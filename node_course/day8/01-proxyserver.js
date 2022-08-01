const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());
app.use(
  createProxyMiddleware({
    target: "https://api.map.baidu.com",
    changeOrigin: true,
  })
);

app.listen(9000, () => {
  console.log("代理服务已启动");
});
