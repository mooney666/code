const express = require("express");
const session = require("express-session");
const app = express();

app.use(express.static("./pages"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// 这个session中间件会自动往接口的req中，绑定一个session属性，通过req.session直接调用即可。这个session对象是后期登录成功之后，往里面存储用户信息数据的。
app.use(
  session({
    secret: "falsdfjas;dfjaljsdgjasdfads",
    resave: false,
    saveUninitialized: false,
  })
);

// 这里保存注册成功的用户。
let users = [
  {
    uname: "admin",
    upwd: "admin",
  },
];

// 注册接口
app.post("/regist", (req, res) => {
  // 1. 判断参数是否存在
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.send({
      msg: "账号密码不能为空",
      status: 0,
    });
  } else {
    // 2. 此用户是否已被占用
    const idx = users.findIndex((user) => {
      return user.uname === username;
    });
    if (idx == -1) {
      users.push({
        uname: username,
        upwd: password,
      });
      res.send({
        msg: "注册成功",
        status: 1,
      });
    } else {
      res.send({
        msg: "用户名已被占用",
        status: 0,
      });
    }
  }
});

// 登录接口
app.post("/login", (req, res) => {
  // 1. 判断参数是否存在
  const username = req.body.username;
  const password = req.body.password;
  if (!username || !password) {
    res.send({
      msg: "账号密码不能为空",
      status: 0,
    });
  } else {
    // 2. 账号密码是否正确
    const idx = users.findIndex((user) => {
      return user.uname == username && user.upwd == password;
    });
    if (idx == -1) {
      res.send({
        msg: "账号或密码错误",
        status: 0,
      });
    } else {
      // 将用户的关键信息，存储到session中，同时，session中间件会向响应头中注入Cookie信息(响应头Set-Cookie字段)，随着本次响应发送给前端。
      req.session.userInfo = {
        info: req.body,
        address: "郑州市",
      };
      res.send({
        msg: "登录成功",
        userInfo: {
          nickname: username,
          desc: "我喜欢吃饭",
        },
        status: 1,
      });
    }
  }
});

// 验证是否授权的中间件。
function checkAuth(req, res, next) {
  const userInfo = req.session.userInfo;
  if (userInfo) next();
  else {
    res.send({
      msg: "需要授权登录",
      status: 1,
    });
  }
}

// 购物车接口(需授权)
app.get("/cart", checkAuth, (req, res) => {
  res.json({
    carts: [
      { id: 1, title: "啤酒" },
      { id: 2, title: "苹果" },
    ],
    msg: "ok",
    status: 1,
  });
});

// 个人订单接口(需授权)

app.listen(9000, () => {
  console.log("服务器已启动");
});
