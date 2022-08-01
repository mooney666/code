const express = require("express");
const app = express();

app.get("/user", (req, res) => {
  const getData = req.query.cb;
  const data = {
    uname: "小明",
    age: 20,
  };
  // "getData(data)"
  res.send(`${getData}(${JSON.stringify(data)})`);
});

app.listen(8080, () => {
  console.log("服务已启动8080");
});
