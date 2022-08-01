const express = require("express");
const app = express();

// 配置全局跨域中间件
const cors = require("cors");
app.use(cors());

// express.urlencoded() 这个中间件，只能解析前端发送的 application/x-www-form-urlencoded 这种类型的数据到req.body中。
app.use(express.urlencoded({ extends: false }));

// express.json() 这个中间件，只能解析前端发送的 application/json 这种类型的数据到req.body中。
app.use(express.json());

app.get("/user", (req, res) => {
  // res.send("恭喜你，获取信息成功");
  console.log("++++", req.query);
  // res.json(): 给前端返回json数据
  res.json({
    name: "admin",
    info: "是一名海外华人",
    hobby: "荒野求生",
  });
});

app.post("/login", (req, res) => {
  console.log("----", req.body);
  res.send(JSON.stringify({ msg: "登录成功", status: 1 }));
});

app.listen(8080, () => {
  console.log("服务已启动");
});

// 跨域一般是由后端解决：只需要想办法在响应头中添加 Access-Control-Allow-Origin 即可，它的作用就是告诉浏览器服务器端允许这个origin跨域请求数据，你浏览器就不要再阻止了。
/*
cors 是 Express 的一个第三方中间件，通过安装和配置 cors 中间件，可以方便解决跨域问题。
使用步骤：
    1. npm i cors 安装中间件
    2. const cors = require('cors');  // 导入中间件
    3. app.use(cors());  // 路由之前注册中间件
*/
