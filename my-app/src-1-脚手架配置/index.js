import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import ajax from "./utils/ajax";

// 全局挂载类组件内部的通用属性和方法。针对很多组件都要使用这个方法或属性，为了避免在每个组件中频繁的导入，可以挂载到全局的Component.prototype原型对象上。子类通过this.$ajax()就可以使用这个方法了。
React.Component.prototype.$ajax = ajax;

ReactDOM.render(<App />, document.getElementById("root"));
