const express = require("express");
const router = express.Router();
const db = require("../utils/dbhandler");
const fs = require("fs");

// multer包，作为某个路由的局部中间件使用。
const multer = require("multer");
const { log } = require("console");

/*
// 配置multer
const upload = multer({
  dest: "public/upload", // dest: 上传文件存放的目标地址
  // limits：对上传文件进行约束
  limits: {
    fileSize: 10000, // 默认是1M，单位是字节bytes。
  },
});
*/

// 配置multer: 自定义存储路径和文件名称，默认文件是加密生成的(例如: db811dcb263ccc3e36e335e970b027e3)
const storage = multer.diskStorage({
  // destination 存储路径
  destination: function (req, file, cb) {
    cb(null, "public/upload");
  },
  filename: function (req, file, cb) {
    // 对于多文件上传，仅使用时间戳是有问题的，同一时间多个文件生成的时间戳是一样的，造成文件名重复。
    // const tt = Date.now();
    // cb(null, file.fieldname + "-" + tt);

    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});
const upload = multer({
  storage, // dest 和 storage 二选一
  limits: {
    fileSize: 100000,
  },
});

// 单文件 上传接口
// upload.single("filecontent") 的参数，和input type=file的name保持一致
router.post("/fileupload", upload.single("filecontent"), (req, res) => {
  // req.file 是一个对象结构
  // req.files 是一个数据结构：
  /**
   * {
    fieldname: 'filecontent',
    originalname: '2022-5-19 周测.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'public/upload',
    filename: '9294340329cebe3c9ce98a1f1ef2821b',
    path: 'public\\upload\\9294340329cebe3c9ce98a1f1ef2821b',
    size: 445
  }
  */
  console.log("单文件: ", req.file);
  res.send({
    msg: "上传成功",
    filename: req.file.originalname,
  });
});

// 多文件 上传接口
// upload.array(input的name属性，最大文件个数)
router.post("/filesupload", upload.array("course", 2), (req, res) => {
  // req.files 是一个数据结构：
  /**
   * {
    fieldname: 'filecontent',
    originalname: '2022-5-19 周测.txt',
    encoding: '7bit',
    mimetype: 'text/plain',
    destination: 'public/upload',
    filename: '9294340329cebe3c9ce98a1f1ef2821b',
    path: 'public\\upload\\9294340329cebe3c9ce98a1f1ef2821b',
    size: 445
  }
   */
  console.log("多文件: ", req.files);
  res.send({
    msg: "多文件上传成功",
    files: req.files.map((file) => file.originalname),
  });
});

// 处理上传异常 接口
// 注意：加入异常捕获时的代码写法，和没有异常捕获代码结构不一致。
const manyUpload = multer({
  storage, // dest 和 storage 二选一
  limits: {
    fileSize: 10000,
  },
}).array("course", 1);
router.post("/testErr", (req, res) => {
  manyUpload(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      // Multer error: Multer配置问题，比如文件个数超出限制等。
      console.log("MulterError", multer.MulterError);
      res.send({
        msg: "请检查上传文件是否符合要求",
      });
    } else if (err) {
      // unknown error: 未知错误
      console.log("unknown error");
      res.send({
        msg: "未知错误，请稍后重试",
      });
    }
    res.send("ok");
  });
});

// 注册接口
router.get("/regist", (req, res) => {
  let name = req.query.name;
  let age = req.query.age || 0;
  let sex = req.query.sex || "男";
  let address = req.query.address || "暂无";
  db(
    `insert into info (name,age,sex,address,avatar) values ('${name}', ${age}, '${sex}', '${address}', '/images/holder.png')`
  ).then((data) => {
    res.json({
      userInfo: {
        name,
        age,
        sex,
        address,
        avatar: "/images/holder.png",
      },
      msg: "注册成功",
      status: 1,
    });
  });
});

// ajax上传头像接口
router.post("/ajaxupload", upload.single("avatar"), async (req, res) => {
  // 2. 将用户的旧的头像文件从服务器中删除
  let data = await db(`select avatar from info where name='${req.body.name}'`);
  let avatar = data.results[0].avatar;
  if (avatar.startsWith("/images")) {
    // 此时数据库里是默认头像说明是第一次上传。不需要删除旧头像。
  } else {
    // 以 '/upload' 开头，说明不是第一次上传。此时需要删除旧头像
    fs.unlink(`public${avatar}`, (err) => {
      console.log("删除成功", err);
    });
  }
  // 1. 更新数据库
  let path = `/upload/${req.file.filename}`;
  await db(`update info set avatar='${path}' where name='${req.body.name}'`);

  res.json({
    msg: "ok",
    path,
  });
});

module.exports = router;
