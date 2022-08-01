const express = require("express");
const cors = require("cors");
const router = require("./router/index");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(router);

app.listen(8000, () => {
  console.log("服务已启动");
});
