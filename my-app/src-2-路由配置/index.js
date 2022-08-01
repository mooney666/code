import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import ajax from "./utils/ajax";

// HashRouter: 通过切换hash值来跳转组件。/#/login; /#/cart;
// BrowserRouter: History模式，模仿的是h5的history模式，实现页面的跳转，没有#号，/login; /cart;
import { HashRouter as RouterRoot } from "react-router-dom";

React.Component.prototype.$ajax = ajax;

// 2. 利用这两个路由类，包裹根组件，往组件中注入路由系统，此时根组件内部就可以使用路由API来管理路由跳转了。
ReactDOM.render(
  <RouterRoot>
    <App />
  </RouterRoot>,
  document.getElementById("root")
);
