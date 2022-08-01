import React, { Component } from "react";
import { NavLink } from "react-router-dom";
import "./App.scss";
import RouterMap from "./router/router";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="tabbars">
          <NavLink to="/">首页</NavLink>
          <NavLink to="/login">登录</NavLink>
          <NavLink to="/regist">注册</NavLink>
          <NavLink to="/cart">购物车</NavLink>
        </div>
        <RouterMap></RouterMap>
      </div>
    );
  }
}

export default App;
