const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 查询城市接口
app.get("/getcity", (req, res) => {
  const cityname = req.query.cityname;
  res.send({
    name: cityname,
    status: 1,
  });
});

// 天气接口
app.get("/weather", (req, res) => {
  const cityname = req.query.cityname;
  switch (cityname) {
    case "郑州市":
      res.json({
        weather: {
          temp: "15℃",
          wind: "3级",
        },
      });
      break;
    case "北京市":
      res.json({
        weather: {
          temp: "27℃",
          wind: "1级 南风",
        },
      });
      break;
    default:
      break;
  }
});

// 出行建议接口
app.get("/suggest", (req, res) => {
  const temp = req.query.temp.split("℃")[0] * 1;
  if (temp < 20) {
    res.send({
      suggest: "多穿衣服",
    });
  } else {
    res.send({
      suggest: "可以外出活动",
    });
  }
});

app.get("/test1", (req, res) => {
  res.json({
    msg: "test1接口",
  });
});
app.get("/test2", (req, res) => {
  res.json({
    msg: "test2接口",
  });
});
app.get("/test3", (req, res) => {
  res.json({
    msg: "test3接口",
  });
});
app.get("/test4", (req, res) => {
  res.json({
    msg: "test4接口",
    data: {
      name: req.query.name,
      age: req.query.age,
    },
  });
});
app.post("/test5", (req, res) => {
  res.json({
    msg: "test5接口",
    data: {
      name: req.body.name,
      age: req.body.age,
    },
  });
});
// 指定端口号，并启动服务
app.listen(8080, () => {
  console.log("服务已启动, 127.0.0.1:8080");
});
