import "./Home.css";
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Layout, Menu } from "antd";
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import { useDispatch } from "react-redux";
import useRouter from "../../hooks/useRouter";
// import { routes } from "../../router/router";
import { menus } from "../../apis/index";
import Users from "../Users/Users";
import Roles from "../Roles/Roles";
import Rights from "../Rights/Rights";
import Goods from "../Goods/Goods";
import Params from "../Params/Params";
import Cates from "../Cates/Cates";
import Orders from "../Orders/Orders";
import Reports from "../Reports/Reports";
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
const { Header, Sider, Content } = Layout;

const keyPathMap = {};

function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const [openKeys, setOpenKeys] = useState([]);
  let [menus_data, setMenusData] = useState([]);
  const [username, setUsername] = useState("");
  const [rootKeys, setRootkeys] = useState([]);
  const [selectedKeys, setSelectedKeys] = useState([]);
  const { navigate, location } = useRouter();
  const dispatch = useDispatch();

  // 发送初始化请求，获取左侧菜单
  useEffect(() => {
    async function getLeftMenus() {
      let {
        data: { data: leftMenusData },
      } = await menus();
      let arr = [];
      let routesArr = [];
      leftMenusData.forEach(one_level => {
        let one_level_obj = {
          key: one_level.id,
          label: one_level.authName,
          icon: <UserOutlined></UserOutlined>,
          children: [],
        };
        one_level.children.forEach(two_level => {
          keyPathMap[two_level.id] = `/${two_level.path}`;
          if (two_level.path === location.pathname.replace("/", "")) {
            setOpenKeys([String(one_level.id)]);
            setSelectedKeys([String(two_level.id)]);
          }
          routesArr.push({
            path: two_level.path,
            component: pathToComs[two_level.path],
            name: two_level.path,
            meta: {
              auth: false,
            },
          });
          let two_level_obj = {
            key: two_level.id,
            label: two_level.authName,
            icon: <UserOutlined></UserOutlined>,
          };
          one_level_obj.children.push(two_level_obj);
        });
        arr.push(one_level_obj);
      });

      // routes[0].children = routesArr;
      // console.log(keyPathMap);
      // dispatch({
      //   type: "SET_RELOAD",
      //   val: true,
      // });

      dispatch({
        type: "SET_ROUTES",
        routes: routesArr,
      });
      localStorage.setItem("subroutes", JSON.stringify(routesArr));
      setMenusData(arr);
      setRootkeys(leftMenusData.map(item => String(item.id)));
    }
    getLeftMenus();
    setUsername(JSON.parse(localStorage.getItem("userinfo")).username);
  }, [dispatch, location]);

  const onOpenChange = keys => {
    // console.log(keys); // keys是当前展开的数组项，里面存的都是第一级目录的key值。
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1);
    if (rootKeys.indexOf(latestOpenKey) === -1) {
      setOpenKeys(keys);
    } else {
      setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
    }
  };

  // 二级菜单点击事件
  const menuItemClick = obj => {
    setSelectedKeys([String(obj.key)]);
    navigate(keyPathMap[obj.key]);
  };

  return (
    <div className="Home">
      <Layout>
        <Sider trigger={null} collapsible collapsed={collapsed}>
          <div className="logo">{username}</div>
          <Menu
            theme="dark"
            mode="inline"
            selectedKeys={selectedKeys}
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            onClick={menuItemClick}
            items={menus_data}
          />
        </Sider>
        <Layout className="site-layout">
          <Header
            className="site-layout-background"
            style={{
              padding: 0,
            }}
          >
            {React.createElement(
              collapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
              {
                className: "trigger",
                onClick: () => setCollapsed(!collapsed),
              }
            )}
          </Header>
          <div className="scroll-layout">
            <Content
              className="site-layout-background"
              style={{
                margin: "24px 16px",
                padding: 24,
                minHeight: 280,
              }}
            >
              <Outlet></Outlet>
            </Content>
          </div>
        </Layout>
      </Layout>
    </div>
  );
}
export default Home;
