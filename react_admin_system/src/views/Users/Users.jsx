import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
} from "@ant-design/icons";
import {
  Button,
  Modal,
  Form,
  Input,
  message,
  Table,
  Space,
  Switch,
  Select,
} from "antd";
import { useState, useEffect } from "react";
import {
  add_user,
  get_user,
  set_user_state,
  get_user_roles,
  set_user_roles,
} from "../../apis/index";
const { Option } = Select;

function Users() {
  const [form] = Form.useForm();
  const [roleForm] = Form.useForm();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [roleModalVisiable, setRoleModalVisiable] = useState(false);
  const [tablesData, setTablesData] = useState([]);
  const [usersData, setUsersData] = useState({});
  const [curUser, setCurUser] = useState({});
  const [size, setSize] = useState(5);
  const [userRoles, setUserRoles] = useState([]);
  //#region 获取分页数据
  const getUsers = async (page = 1, size = 5) => {
    let tables = [];
    let { data } = await get_user(page, size);
    setUsersData(data.data);
    data.data.users.forEach(user => {
      tables.push({
        key: user.id,
        id: user.id,
        name: user.username,
        email: user.email,
        mobile: user.mobile,
        role_name: user.role_name,
        mg_state: user.mg_state,
      });
    });
    setTablesData(tables);
  };
  //#endregion
  //#region 初始挂载请求
  useEffect(() => {
    getUsers();
    // 获取角色列表
    async function getRoles() {
      let { data } = await get_user_roles();
      setUserRoles(
        data.data.map(item => {
          return { id: item.id, roleName: item.roleName };
        })
      );
    }
    getRoles();
  }, []);
  //#endregion
  //#region 添加用户Modal弹出框相关事件
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const onFinish = async values => {
    let { data } = await add_user(values);
    if (data.meta.status === 201) {
      form.setFieldsValue({
        username: "",
        password: "",
        email: "",
        mobile: "",
      });
      setIsModalVisible(false);
      message.success("添加用户成功");
    }
  };
  const onFinishFailed = errorInfo => {
    console.log("Failed:", errorInfo);
  };
  //#endregion
  //#region 状态开关事件
  const switchChange = async (uid, curStatus) => {
    let { data } = await set_user_state(uid, curStatus);
    if (data.meta.status === 200) {
      message.success("状态修改成功");
      tablesData.forEach(user => {
        if (user.id === uid) {
          user.mg_state = curStatus;
        }
      });
      setTablesData([...tablesData]);
    }
  };
  //#endregion
  //#region 角色Modal弹出框相关事件
  const setUserRole = async uid => {
    const idx = tablesData.findIndex(user => user.id === uid);
    setCurUser(tablesData[idx]);
    setRoleModalVisiable(true);
  };
  const roleModalCancel = () => {
    roleForm.setFieldsValue({
      role: "请选择",
    });
    setRoleModalVisiable(false);
  };
  const roleFinish = async values => {
    const roles = values.role.split(";");
    let { data } = await set_user_roles(curUser.id, Number(roles[0]));
    if (data.meta.status === 200) {
      message.success("新角色分配成功");
      tablesData.forEach(user => {
        if (user.id === data.data.id) {
          user.role_name = roles[1];
        }
      });
      setRoleModalVisiable(false);
      setTablesData(JSON.parse(JSON.stringify(tablesData)));
      roleForm.setFieldsValue({
        role: "请选择",
      });
    } else {
      message.error(data.meta.msg);
    }
  };
  //#endregion
  const columns = [
    {
      title: "用户ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "用户名",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "邮箱",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "电话",
      key: "mobile",
      dataIndex: "mobile",
    },
    {
      title: "角色",
      key: "role_name",
      dataIndex: "role_name",
    },
    {
      title: "状态",
      key: "mg_status",
      render: rowData => {
        return (
          <Switch
            defaultChecked={rowData.mg_state}
            onChange={checked => switchChange(rowData.id, checked)}
          />
        );
      },
    },
    {
      title: "操作",
      key: "action",
      render: rowData => (
        <Space size="middle">
          <Button type="primary" shape="round" icon={<EditOutlined />} />
          <Button
            type="primary"
            danger
            shape="round"
            icon={<DeleteOutlined />}
          />
          <Button
            onClick={() => setUserRole(rowData.id)}
            type="primary"
            shape="round"
            icon={<SettingOutlined />}
          />
        </Space>
      ),
    },
  ];
  //#region 分页切换事件
  const changeEvent = async (page, size) => {
    setSize(size);
    getUsers(page, size);
  };
  //#endregion
  return (
    <div className="Users">
      <Button type="primary" onClick={showModal}>
        添加用户
      </Button>
      <hr />
      <Modal
        title="添加用户"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={null}
      >
        <Form
          form={form}
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
            label="用户名"
            name="username"
            rules={[
              {
                required: true,
                message: "必须输入用户名!",
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
                message: "必须输入密码!",
              },
            ]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item
            label="邮箱"
            name="email"
            rules={[
              {
                required: true,
                message: "必须输入邮箱!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="手机"
            name="mobile"
            rules={[
              {
                required: true,
                message: "必须输入手机!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button htmlType="button" onClick={handleCancel}>
              取消
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
      <Table
        columns={columns}
        dataSource={tablesData}
        pagination={{
          total: usersData.total,
          defaultPageSize: 5,
          pageSize: size,
          onChange: changeEvent,
          position: ["bottomLeft"],
        }}
      />
      <Modal
        title="分配新角色"
        visible={roleModalVisiable}
        footer={null}
        onCancel={roleModalCancel}
      >
        <p>当前用户：{curUser.name}</p>
        <p>当前角色：{curUser.role_name}</p>
        <Form form={roleForm} name="roleForm" onFinish={roleFinish}>
          <Form.Item name="role" label="分配角色">
            <Select
              style={{
                width: 120,
              }}
              placeholder="请选择"
              allowClear
            >
              {userRoles.map(role => (
                <Option key={role.id} value={`${role.id};${role.roleName}`}>
                  {role.roleName}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 16,
            }}
          >
            <Button htmlType="button" onClick={roleModalCancel}>
              取消
            </Button>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <Button type="primary" htmlType="submit">
              确定
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default Users;
