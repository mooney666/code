const express = require("express");
const app = express();
app.use(express.static("./pages"));
app.use(express.urlencoded({ extended: true }));

// 模拟用户数据库
let users = [
  {
    uname: "小明",
    upwd: "123123",
  },
];

const session = require("express-session");
app.use(
  session({
    secret: "fl;asjdguaosiw3ur42394qwefa",
    resave: false,
    saveUninitialized: false,
  })
);

// 判断参数是否为空的中间件。
function paramsCheck(req, res, next) {
  const { username, password } = req.body;
  if (username == "" || password == "") {
    res.json({
      msg: "请正确填写参数",
      status: 0,
    });
  } else {
    next();
  }
}

// 点击 注册按钮的 接口
app.post("/regist", paramsCheck, (req, res) => {
  const { username, password } = req.body;
  const { type } = req.query;

  if (type == "regist") {
    const idx = users.findIndex((obj) => {
      return obj.uname === username;
    });
    if (idx == -1) {
      // 此时可以注册用户
      res.json({
        msg: "恭喜你，注册成功",
        status: 1,
      });
    } else {
      // 此时不可以注册用户，用户已被注册
      res.json({
        msg: "用户已被注册",
        status: 0,
      });
    }
  } else if (type == "check") {
    const idx = users.findIndex((obj) => {
      return obj.uname === username;
    });

    let msg = "";
    if (idx != -1) msg = "用户名已被占用";
    else msg = "用户名可以使用";
    res.json({
      msg,
      status: 1,
    });
  }
});

// 登录接口
app.post("/login", paramsCheck, (req, res) => {
  const idx = users.findIndex((user) => {
    return user.uname == req.body.username && user.upwd == req.body.password;
  });
  if (idx != -1) {
    req.session.user = req.body;
    res.json({
      msg: "登录成功",
      nickname: req.body.username,
      status: 1,
    });
  } else {
    res.json({
      msg: "账号密码错误",
      status: 0,
    });
  }
});

// 验证是否登录接口
app.get("/checkLogin", (req, res) => {
  let user = req.session.user;
  if (user) {
    res.json({
      msg: "已登录",
      status: 1,
    });
  } else {
    res.json({
      msg: "未登录",
      status: 0,
    });
  }
});

// 退出登录接口
app.get("/logout", (req, res) => {
  req.session.destroy(); // 清空session存储信息
  res.json({
    msg: "退出登录成功",
    status: 1,
  });
});

app.listen(9000, function () {
  console.log("服务已启动");
});
