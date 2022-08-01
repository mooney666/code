import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { HashRouter as RouterRoot } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./store/store";

ReactDOM.render(
  <RouterRoot>
    {/* <Provider store={store}> 包裹根组件，那么根组件内部的子组件，都可以访问redux。类似于Context组件树传值。 */}
    <Provider store={store}>
      <App />
    </Provider>
  </RouterRoot>,
  document.getElementById("root")
);
