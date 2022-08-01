import { Navigate } from "react-router-dom";
export default function AuthConfig(props) {
  let token = localStorage.getItem("token") || "";
  if (token) {
    // 登录了，给一级路由的element属性，传递目标组件
    return props.target;
  } else {
    // 没有登录，给一级路由的element属性，传递Navigate
    return <Navigate to={`/login?redirect=${props.targetURL}`} replace={true}></Navigate>;
  }
}
