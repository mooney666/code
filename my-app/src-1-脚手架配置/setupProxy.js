const { createProxyMiddleware } = require("http-proxy-middleware");

module.exports = app => {
  app.use(
    "/lqb",
    createProxyMiddleware({
      target: "https://www.lanqb.com",
      changeOrigin: true,
      pathRewrite: {
        "^/lqb": "",
      },
    })
  );
  app.use(
    "/baidu",
    createProxyMiddleware({
      target: "https://api.baidu.com",
      changeOrigin: true,
      pathRewrite: {
        "^/baidu": "",
      },
    })
  );
};
