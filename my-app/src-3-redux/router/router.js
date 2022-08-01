import { Component, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";

const Login = lazy(() => import("@views/Login"));
const Regist = lazy(() => import("@views/Regist"));
const Cart = lazy(() => import("@views/Cart"));
const Home = lazy(() => import("@views/Home"));

let routes = [
  {
    path: "/",
    component: <Home></Home>,
    name: "home",
  },
  {
    path: "/login",
    component: <Login></Login>,
    name: "login",
  },
  {
    path: "/regist",
    component: <Regist></Regist>,
    name: "regist",
  },
  {
    path: "/cart",
    component: <Cart></Cart>,
    name: "cart",
  },
];

class RouterMap extends Component {
  render() {
    return (
      <Suspense fallback={<div>loading...</div>}>
        <Routes>
          {routes.map(route => (
            <Route
              key={route.name}
              path={route.path}
              element={route.component}
            ></Route>
          ))}
        </Routes>
      </Suspense>
    );
  }
}

export default RouterMap;
