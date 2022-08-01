import "./App.css";
import React, { Component, Suspense } from "react";
import ajax from "./utils/ajax";
import Login from "@views/Login/Login";
import { Button } from "antd";

// import Regist from "@views/Regist/Regist";
// import Cart from "@views/Cart/Cart";

const Regist = React.lazy(() => import("@views/Regist/Regist"));
const Cart = React.lazy(() => import("@views/Cart/Cart"));

class App extends Component {
  state = {
    comname: "login",
  };
  changeType(type) {
    this.setState({ comname: type });
  }
  test() {
    console.log("-----");
  }
  render() {
    return (
      <div className="App">
        <h3>
          {process.env.NODE_ENV === "production" ? "生产环境" : "开发环境"} -
          App根组件
        </h3>
        <button onClick={() => this.changeType("login")}>登录</button>
        <button onClick={() => this.changeType("regist")}>注册</button>
        <button onClick={() => this.changeType("cart")}>购物车</button>
        <Button type="primary" onClick={this.test.bind(this)}>
          Primary
        </Button>
        <Button>Default</Button>
        <Button type="dashed">Dashed</Button>
        <Button type="danger">Danger</Button>
        <Button type="link">Link</Button>
        <hr />
        {this.state.comname === "login" && (
          <Login name="小明" age={22} sex={1}></Login>
        )}
        <Suspense fallback={<div>正在加载中...</div>}>
          {this.state.comname === "regist" && <Regist></Regist>}
          {this.state.comname === "cart" && <Cart></Cart>}
        </Suspense>
      </div>
    );
  }
  componentDidMount() {
    ajax();
    fetch(
      "/lqb/school/special-training-list?status=show&limit=20&page=1&course_style_ids=11&weight=desc"
    )
      .then(response => response.json())
      .then(data => {
        console.log(data);
      });
  }
}

export default App;
