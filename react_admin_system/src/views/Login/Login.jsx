import "./Login.css";
import { Button, Form, Input, message } from "antd";
import { useDispatch } from "react-redux";
import { login, menus } from "../../apis/index";
import useRouter from "../../hooks/useRouter";
import { routes } from "../../router/router";
import Users from "../Users/Users";
import Roles from "../Roles/Roles";
import Rights from "../Rights/Rights";
import Goods from "../Goods/Goods";
import Params from "../Params/Params";
import Cates from "../Cates/Cates";
import Orders from "../Orders/Orders";
import Reports from "../Reports/Reports";

// 定义路由与组件的映射关系
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

function Login() {
  let { search, navigate } = useRouter();
  let dispatch = useDispatch();
  const onFinish = async values => {
    // 开始登录
    let { data } = await login(values.username, values.password);
    if (data.meta.status !== 200) {
      message.error(data.meta.msg);
    } else {
      // 登录成功，存储用户登录凭证token。
      localStorage.setItem("userinfo", JSON.stringify(data.data));
      // 重定向到redirect地址
      navigate(search.get("redirect"), { replace: true });
    }
  };

  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className="Login">
      <Form
        name="basic"
        labelCol={{
          span: 8,
        }}
        wrapperCol={{
          span: 16,
        }}
        initialValues={{
          remember: true,
        }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: "输入账号!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="密码"
          name="password"
          rules={[
            {
              required: true,
              message: "输入密码!",
            },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          wrapperCol={{
            offset: 8,
            span: 16,
          }}
        >
          <Button type="primary" htmlType="submit">
            登录
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
export default Login;
