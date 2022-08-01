const express = require("express");
const app = express();
const jwt = require("jsonwebtoken");
const expressJWT = require("express-jwt");
const cors = require("cors");
app.use(cors());

app.use(express.urlencoded({ extended: false }));

const secret = "fajsdligjoaisufuaospdufopasduwae";
// 1. 注册全局中间件：expressJWT 它会处理所有前端过来的请求，因为请求头中可能含有token字段，expressJWT是负责对token进行解密，验证token的正确性
// expressJWT 它解密后的token是一个JSON对象，会被放在req.user上。
// unless: 排除不需要认证的接口信息
app.use(expressJWT({ secret: secret }).unless({ path: [/^\/noauth\//] }));

// 分类一：不需要登录认证的接口，没有token，不需要expressJWT进行验证；
// 登录接口：不需要认证
app.post("/noauth/login", (req, res) => {
  console.log("login", req.user);
  // .sign(加密数据(payload), 密钥, 其他配置)
  const token = jwt.sign({ uname: "小明", age: 22, upwd: "12345" }, secret, {
    expiresIn: "10s",
  });
  res.json({
    status: 1,
    token: token,
    nickname: "小明",
  });
});
// 分类导航：不需要认证
app.get("/noauth/cates", (req, res) => {
  res.send("分类导航数据");
});

// 分类二：需要登录认证的接口，携带token
app.get("/auth/cart", (req, res) => {
  console.log("cart: ", req.user);
  if (req.user) {
    res.send("购物车列表数据");
  } else {
    res.send("没有登录认证，无法访问");
  }
});

app.use((err, req, res, next) => {
  if (err.name == "UnauthorizedError") {
    res.send({ msg: "token无效，请重新登录", status: 100 });
  } else {
    res.send("未知错误");
  }
});

app.listen(9000, function () {
  console.log("http://127.0.0.1:9000");
});
