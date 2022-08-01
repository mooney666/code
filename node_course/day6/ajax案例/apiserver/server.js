const express = require("express");
const cors = require("cors");

let singers = [
  {
    name: "周杰伦1",
    sex: "男1",
    list: [
      {
        name: "跨时代1",
        saleNum: 1000000, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 14440000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 34560000, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
  {
    name: "周杰伦2",
    sex: "男2",
    list: [
      {
        name: "跨时代1",
        saleNum: 100042320, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 124123000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 3550000, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
  {
    name: "周杰伦3",
    sex: "男3",
    list: [
      {
        name: "跨时代1",
        saleNum: 2042320, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 423000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 6000, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
  {
    name: "周杰伦4",
    sex: "男4",
    list: [
      {
        name: "跨时代1",
        saleNum: 5552320, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 453000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 23200, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
  {
    name: "周杰伦5",
    sex: "男5",
    list: [
      {
        name: "跨时代1",
        saleNum: 5552320, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 453000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 23200, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
  {
    name: "周杰伦6",
    sex: "男6",
    list: [
      {
        name: "跨时代1",
        saleNum: 5552320, // 专辑销量
        singerNum: 10, // 歌曲数量
        singers: ["东风破"],
      },
      {
        name: "跨时代2",
        saleNum: 453000, // 专辑销量
        singerNum: 5, // 歌曲数量
        singers: ["东风破2"],
      },
      {
        name: "跨时代3",
        saleNum: 23200, // 专辑销量
        singerNum: 15, // 歌曲数量
        singers: ["东风破3"],
      },
    ],
  },
];

const app = express();
app.use(cors());

app.use(express.urlencoded({ extends: false }));
app.use(express.json());

// 分页接口：前端的页码和数据起始索引之间的关系。
// 第1页：slice对应索引0 2 (页码-1)*2
// 第2页：slice对应索引2 4 (页码-1)*2
// 第3页：slice对应索引4 6 (页码-1)*2
app.get("/list", (req, res) => {
  const page = req.query.page;
  const size = req.query.size || 2; // 或运算，如果size前端没有传递，默认是2条。
  if (!page) {
    res.send("请正确填写参数");
  }
  // 根据page页码，找对应的起始索引值
  const startIdx = (page - 1) * size;
  const endIdx = startIdx + size * 1;
  const result = singers.slice(startIdx, endIdx);
  // res.send(
  //   JSON.stringify({
  //     msg: "ok",
  //     status: 1,
  //     sings: result,
  //   })
  // );

  res.json({
    msg: "ok",
    status: 1,
    sings: result,
    nums: Math.ceil(singers.length / size), // 计算总分页数量
  });
});

app.listen(8080, () => {
  console.log("服务已启动");
});
