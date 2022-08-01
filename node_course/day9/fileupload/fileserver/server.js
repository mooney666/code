const express = require("express");
const cors = require("cors");
const path = require("path");
const userRouter = require("./router/user");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.use(userRouter);

app.listen(9000, () => {
  console.log("服务已启动");
});
