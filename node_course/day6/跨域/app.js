const express = require("express");
// const cors = require("cors");

// 1. 创建服务器对象
const app = express();
// app.use(cors()); // 配置请求跨域


app.get("/jsonpurl", (request, response) => {
  // 获取前端请求传递的函数
  let callback = request.query.callback;
  // console.log(callback);
  let data = {
    a: 11,
    b: 12,
  };
  // end() 表示结束本次响应，不需要给前端传递数据。
  response.end(`${callback}(${JSON.stringify(data)})`);
});

// 2. 配置服务器启动端口
// 注意：本地服务默认域名都是localhost，因此在浏览器中输入：http://localhost:8000 就可以给当前服务器发送请求了。
app.listen(8000, () => {
  console.log("服务器已经启动");
});
