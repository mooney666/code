const express = require("express");
const app = express();

app.get("/users", (req, res) => {
  res.send(
    JSON.stringify({
      name: "admin",
      pwd: "admin",
    })
  );
});

app.listen(8000, () => {
  console.log("接口服务器已启动 端口8000");
});
