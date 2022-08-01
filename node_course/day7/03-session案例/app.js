const express = require("express");
const app = express();

let registUsers = [
  {
    uname: "xxx",
    upwd: "xxx",
  },
  {
    uname: "xxx",
    upwd: "xxx",
  },
  {
    uname: "xxx",
    upwd: "xxx",
  },
];

const cors = require("cors");
app.use(cors());

// 由于Session是应用在前后端不分离的项目，前端代码和后端代码是使用同一台服务器的，因此不存在跨域问题。只有前后端分离的项目才会出现跨域问题。
app.use(express.static("./pages")); // 配置静态目录，托管静态页面资源。
app.use(express.urlencoded({ extended: true }));

// node 实现session 登录认证需要安装：npm install express-session
const session = require("express-session");
// 将session注册为全局中间件，前端的每次请求都会经过它，处理请求头中的Cookie(前提是请求有Cookie)
app.use(
  session({
    secret: "fl;asjdguaosiw3ur42394qwefa", // 加密密钥，用于后续生成Cookie，并且后面验证Cookie的正确性都要用。
    resave: false, // 是否重复保存Cookie
    saveUninitialized: false, // 是否保存为初始化的cookie
  })
);

app.get("/test", (req, res) => {
  console.log("用户信息：", req.session.user);
  if (req.session.user) {
    res.send("已经登录，给你返回数据");
  } else {
    res.send("请先登录，再获取信息");
  }
});

// 登录接口
app.post("/login", (req, res) => {
  let { username, password } = req.body;
  if (username !== "admin" || password !== "admin") {
    res.send(
      JSON.stringify({
        msg: "账号或密码错误",
        status: 0,
      })
    );
  }
  // 账号密码正确，那就将重要的用户信息，保存到session中，让session利用secret密钥对信息进行加密，生成Cookie返回给前端。
  req.session.user = req.body;
  res.send(
    JSON.stringify({
      msg: "登录成功",
      status: 1,
    })
  );
});

app.listen(9000, function () {
  console.log("服务已启动");
});
