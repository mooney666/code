import { Routes, Route } from "react-router-dom";
import AuthConfig from "../utils/auth";
import Home from "../views/Home/Home";
import Login from "../views/Login/Login";
import { useSelector } from "react-redux";
import Users from "../views/Users/Users";
import Roles from "../views/Roles/Roles";
import Rights from "../views/Rights/Rights";
import Goods from "../views/Goods/Goods";
import Params from "../views/Params/Params";
import Cates from "../views/Cates/Cates";
import Orders from "../views/Orders/Orders";
import Reports from "../views/Reports/Reports";
const pathToComs = {
  users: <Users></Users>,
  roles: <Roles></Roles>,
  rights: <Rights></Rights>,
  goods: <Goods></Goods>,
  params: <Params></Params>,
  categories: <Cates></Cates>,
  orders: <Orders></Orders>,
  reports: <Reports></Reports>,
};

let routes = [
  {
    path: "/",
    component: <Home></Home>,
    name: "home",
    meta: {
      auth: true,
    },
    children: [],
  },
  {
    path: "/login",
    component: <Login></Login>,
    name: "login",
    meta: {
      auth: false,
    },
  },
];

function RouterMap() {
  let newroutes = JSON.parse(localStorage.getItem("subroutes"));
  if (newroutes) {
    newroutes.forEach(obj => {
      obj.component = pathToComs[obj.path];
    });
  }
  const subRoutes = useSelector(state => {
    return state.subRoutes.length ? state.subRoutes : newroutes;
  });
  routes[0].children = subRoutes;
  return (
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
        </Route>
      ))}
    </Routes>
  );
}

export { RouterMap, routes };
