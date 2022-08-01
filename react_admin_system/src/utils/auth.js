import { Navigate } from "react-router-dom";
export default function AuthConfig(props) {
  let userinfo = localStorage.getItem("userinfo") || "";
  if (userinfo) {
    return props.target;
  } else {
    return (
      <Navigate
        to={`/login?redirect=${props.targetURL}`}
        replace={true}
      ></Navigate>
    );
  }
}
