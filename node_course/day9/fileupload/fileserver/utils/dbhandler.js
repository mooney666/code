const mysql = require("mysql");

// 利用连接池获取数据库连接，从而更高效的执行MySQL任务。
// 连接池的特点：1. 自动根据任务量创建连接数；2. 它会自动找到之前创建的空闲的连接执行任务，不会每个任务都创建新的连接；3. 一段时间之后如果连接没有任务，会自动关闭；
const pool = mysql.createPool({
  connectionLimit: 10, // 最大创建连接数
  host: "localhost",
  user: "root",
  password: "root",
  database: "users",
});

function db(sql) {
  return new Promise((resolve, reject) => {
    pool.getConnection((err, connect) => {
      if (err) {
        reject({ msg: "获取连接对象失败", status: 0 });
      } else {
        connect.query(sql, (err, data) => {
          if (err)
            reject({
              msg: "SQL语句执行失败",
              status: 0,
            });
          else {
            resolve({ msg: "ok", status: 1, results: data });
          }
        });
      }
    });
  });
}

module.exports = db;
