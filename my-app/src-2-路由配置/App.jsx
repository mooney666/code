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
        {/*
        <Routes> 用来包裹单个路由信息
        <Route> 配置单个路由信息：路由和组件的对应关系。
        */}
        {/*<Routes>
          <Route
            path="/"
            element={<Navigate to="/login" replace={true}></Navigate>}
          ></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/regist" element={<Regist />}></Route>
          <Route path="/cart" element={<Cart />}></Route>
        </Routes>*/}
        <RouterMap></RouterMap>
      </div>
    );
  }
}

export default App;
