import { Component, lazy, Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import AuthConfig from "../utils/auth";

const Login = lazy(() => import("@views/Login/Login"));
const Regist = lazy(() => import("@views/Regist/Regist"));
const Cart = lazy(() => import("@views/Cart/Cart"));
const Home = lazy(() => import("@views/Home/Home"));
const NotFound = lazy(() => import("@views/NotFound/NotFound"));
const List = lazy(() => import("@views/List/List"));
const Women = lazy(() => import("@views/Women/Women"));
const Man = lazy(() => import("@views/Man/Man"));


let routes = [
  {
    path: "/",
    component: <Home></Home>,
    name: "home",
    children: [
      {
        path: "man", // 二级路由
        component: <Man></Man>,
        name: "man",
      },
      {
        component: <Women></Women>,
        name: "women",
      },
    ],
    meta: {
      auth: false,
    },
  },
  {
    path: "/login",
    component: <Login></Login>,
    name: "login",
    meta: {
      auth: false,
    },
  },
  {
    path: "/regist",
    component: <Regist></Regist>,
    name: "regist",
    meta: {
      auth: false,
    },
  },
  {
    path: "/cart",
    component: <Cart></Cart>,
    name: "cart",
    children: [
      {
        component: <Man></Man>,
        name: "man",
      },
      {
        path: "women", // 二级路由
        component: <Women></Women>,
        name: "women",
      },
    ],
    meta: {
      auth: true,
    },
  },
  {
    path: "/list/:id/:name",
    component: <List></List>,
    name: "list",
    meta: {
      auth: false,
    },
  },
  {
    path: "*",
    component: <NotFound></NotFound>,
    name: "notfound",
    meta: {
      auth: false,
    },
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
              element={
                route.meta.auth ? (
                  <AuthConfig
                    target={route.component}
                    targetURL={route.path}
                  ></AuthConfig>
                ) : (
                  route.component
                )
              }
            >
              {route.children &&
                route.children.map(subroute =>
                  subroute.path ? (
                    <Route
                      key={subroute.name}
                      path={subroute.path}
                      element={subroute.component}
                    ></Route>
                  ) : (
                    <Route
                      key={subroute.name}
                      index
                      element={subroute.component}
                    ></Route>
                  )
                )}
              {/*<Route
                    key={subroute.name}
                    index
                    element={subroute.component}
                  ></Route> 中的index属性，是用来指定默认的子路由组件的。*/}
            </Route>
          ))}
        </Routes>
      </Suspense>
    );
  }
}

export default RouterMap;
