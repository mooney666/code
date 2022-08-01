const express = require("express");
const router = express.Router();
const db = require("../utils/dbhandler");

// 添加用户API，对应POST请求
// POST: 往服务器上新增资源(数据)时使用。
router.post("/add", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  // 将这两个数据添加到数据库中。
  /*
  pool.getConnection((err, connect) => {
    if (err) {
      // err是pool获取连接失败。
      res.send({
        msg: "服务器内部错误",
        status: 500,
      });
    }
    // connect 本地获取的连接对象，由它执行SQL语句
    // 注意：SQL语句中，字符串类型的值，一定使用引号包裹。
    connect.query(
      `insert into info (name, age) values ('${name}', ${age})`,
      (err) => {
        if (err) {
          res.send({
            msg: "服务器内部错误",
            status: 500,
          });
        } else {
          res.send({
            msg: "添加成功",
          });
        }
      }
    );
  });
  */

  db(`insert into info (name, age) values ('${name}', ${age})`).then(
    (success) => {
      res.send({
        msg: "添加成功",
      });
    },
    (error) => {
      console.log(error.msg);
      res.send({
        msg: "添加失败，服务器内部错误",
      });
    }
  );
});

// 删除数据API，使用DELETE请求。
// DELETE请求：删除服务器资源(数据)
router.delete("/del", async (req, res) => {
  const id = req.query.id;
  /*
  pool.getConnection((err, connect) => {
    if (err) {
      // err是pool获取连接失败。
      res.send({
        msg: "服务器内部错误",
        status: 500,
      });
    } else {
      // WHERE 后面跟条件
      connect.query(`DELETE FROM info WHERE id=${id}`, (err, data) => {
        console.log(err, data);
        if (err) {
          res.send({
            msg: "服务器内部错误",
            status: 500,
          });
        } else {
          res.send({
            msg: "删除成功",
          });
        }
      });
    }
  });
  */

  let data = await db(`DELETE FROM info WHERE id=${id}`);
  if (data.status) res.send({ msg: "删除成功" });
  else res.send({ msg: "删除失败，服务器内部错误" });
});

// 修改数据API，对应PUT请求。
// PUT请求，修改服务器资源，参数可以放在请求体中，或者?拼接都行。
router.put("/update", async (req, res) => {
  // let data = await db(`update info set age=10`); // 没有where条件，就是全部更新。

  // let data = await db(`update info set age=20 where name='小王'`); // 将name='小王'的数据记录修改age字段的值

  // and 且
  // or 或者
  // let data = await db(`update info set age=30 where name='小王' and id=2`); // 将name='小王'且id=2的数据 设置age=20

  // let data = await db(`update info set age=33 where name='小明' or name='111'`);

  // like 模糊匹配
  // '小%'：以小开头
  // '%小%'：包含小
  let data = await db(`update info set age=55 where name like '%小%'`);
  if (data.status) res.send({ msg: "修改成功" });
  else res.send({ msg: "修改失败，服务器内部错误" });
});

// 查询数据API
router.get("/list", async (req, res) => {
  // * 通配符，它表示所有字段
  // let data = await db(`SELECT * FROM info`); // 查询info表的所有数据

  // let data = await db(`SELECT * FROM info WHERE age >= 35`); // age大于等于35的数据

  // let data = await db(`SELECT name,age FROM info WHERE age >= 35`);

  // let data = await db(`SELECT name,age FROM info WHERE name LIKE '小%'`); // name以'小'开头的数据

  // let data = await db(`SELECT COUNT(*) FROM info`); // 查询info表的数据总个数，一般制作分页。

  let data = await db(`SELECT * FROM info LIMIT 2,4`); // 分页查询，第一个数起始索引，第二个数是返回数据个数
  if (data.status) res.send({ msg: "查询成功", lists: data.results });
  else res.send({ msg: "查询失败，服务器内部错误" });
});

module.exports = router;
