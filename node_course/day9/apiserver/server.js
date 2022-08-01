const express = require("express");
const cors = require("cors");
const userRouter = require("./router/user");
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use("/user", userRouter);

app.listen(9000, () => {
  console.log("服务已启动");
});
