import {
  useNavigate,
  useLocation,
  useSearchParams,
  useParams,
} from "react-router-dom";

// 高阶组件：高阶组件必须是一个函数，withRouter保证是一个函数。该函数接收一个组件作为参数，withRouter函数被调用时
function withRouter(Com) {
  return function () {
    const navigate = useNavigate();
    // useLocation 和 useSearchParams 都能读取到路由?参数，只是useLocation得到的是原始字符串"?a=100&b=200"，需要通过querystring包二次解析成对象才能使用。useSearchParams直接通过.get(key)获取参数值。
    const location = useLocation();
    const [searchParams] = useSearchParams();

    // useParams() 用来获取动态传参。
    const params = useParams();
    return (
      <Com
        navigate={navigate}
        location={location}
        search={searchParams}
        params={params}
      ></Com>
    );
  };
}

export default withRouter;
