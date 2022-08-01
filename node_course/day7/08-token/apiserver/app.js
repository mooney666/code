const express = require("express");
const app = express();

// jsonwebtoken: 主要负责生成token
const jwt = require("jsonwebtoken");
// express-jwt: 主要负责对token进行解密，它会将前端传递的token进行解密，放在req.user属性中。
const { expressjwt } = require("express-jwt");

const cors = require("cors");
app.use(cors());
app.use(express.urlencoded({ extended: false }));
const secret = "23rwq3rqedfasdgasdf";

// 配置解密的全局中间件
// secret: 密钥，必填参数，参与token加密
// algorithms: 加密算法方式，必填参数
app.use(
  expressjwt({ secret: secret, algorithms: ["HS256"] }).unless({
    path: [/^\/noauth\//],
  })
);

// 登录接口
app.post("/noauth/login", (req, res) => {
  let { username, password } = req.body;
  if (username == "123" && password == "123") {
    // 登录成功
    const token = jwt.sign({ username, password }, secret, {
      expiresIn: "1600s",
    });
    res.send({
      msg: "登录成功",
      stauts: 1,
      token,
      nickname: "admin",
    });
  }
});

app.get("/auth/cart", (req, res) => {
  console.log("====", req.auth);
  res.send({
    msg: "购物车列表",
  });
});

app.listen(8000, () => {
  console.log("8000端口启动");
});
