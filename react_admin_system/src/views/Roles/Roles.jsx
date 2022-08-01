import "./Roles.css";
import { useState, useEffect, useRef, useCallback } from "react";
import { Table, Button, Tag, Tree, Modal, message } from "antd";
import {
  EditOutlined,
  DeleteOutlined,
  SettingOutlined,
  CaretRightOutlined,
} from "@ant-design/icons";
import {
  get_user_roles,
  get_all_rights,
  set_role_rights,
} from "../../apis/index";

function Roles() {
  const [roles, setRoles] = useState([]);
  const [rights, setRights] = useState([]);
  const curRoles = useRef();
  const halfNodeKeys = useRef();
  const [m, setM] = useState(0);
  // 将表格原始数据中的children属性全部替换为subs属性。这里其实就是深拷贝的实现过程，逐层将每个对象的属性都递归生成新对象及其属性。
  const deepChangeRolesChildren = useCallback((rolesArr, newRolesArr) => {
    rolesArr.forEach(item => {
      let newObj = {};
      for (const key in item) {
        if (key !== "children") newObj[key] = item[key];
        else if (key === "children") {
          newObj["subs"] = [];
          deepChangeRolesChildren(item[key], newObj["subs"]);
        }
      }
      newRolesArr.push(newObj);
    });
    return newRolesArr;
  }, []);
  // 递归渲染角色的权限列表接口：三级权限
  const deepRenderRights = useCallback(rights => {
    return (
      <div>
        {rights.map(right => {
          return (
            <div className={right.subs ? "subs" : ""} key={right.id}>
              <div>
                <Tag color="#2db7f5" closable>
                  {right.authName}
                </Tag>
                {right.subs && <CaretRightOutlined></CaretRightOutlined>}
              </div>
              {right.subs && deepRenderRights(right.subs)}
            </div>
          );
        })}
      </div>
    );
  }, []);
  // 分配权限的按钮点击事件
  // 递归三级权限key数组
  const deepGetLastRightKeys = useCallback((rights, target) => {
    rights.forEach(item => {
      if (item.subs) deepGetLastRightKeys(item.subs, target);
      else target.push(String(item.id));
    });
    return target;
  }, []);
  const settingRightsEvent = useCallback(
    curRowData => {
      curRoles.current = curRowData;
      const checkKeys = deepGetLastRightKeys(curRowData.subs, []);
      setCheckedKeys(checkKeys);
      setExpandedKeys(checkKeys);
      showModal();
    },
    [deepGetLastRightKeys]
  );
  const deepRightsTreeData = useCallback(rights => {
    rights.forEach(right => {
      right["key"] = String(right.id);
      right["title"] = right.authName;
      if (right.children) deepRightsTreeData(right.children);
    });
  }, []);
  const getRolesList = useCallback(async () => {
    console.log("getRolesList 执行了");
    let {
      data: { data: rolesList },
    } = await get_user_roles();
    rolesList.forEach(role => (role["key"] = role.id));
    let newRolesList = deepChangeRolesChildren(rolesList, []);
    setRoles(newRolesList);
  }, [deepChangeRolesChildren]);

  useEffect(() => {
    (async () => {
      getRolesList();
      // 获取权限树形结构列表
      let {
        data: { data: rightsList },
      } = await get_all_rights();
      deepRightsTreeData(rightsList);
      setRights(rightsList);
    })();
  }, [getRolesList, deepRightsTreeData]);

  // 权限模态框的事件和数据
  const [isModalVisible, setIsModalVisible] = useState(false);
  const showModal = () => {
    setIsModalVisible(true);
  };
  const handleOk = async () => {
    let { data } = await set_role_rights(
      curRoles.current.id,
      checkedKeys.concat(halfNodeKeys.current).join(",")
    );
    if (data.meta.status === 200) {
      message.success("权限分配成功");
      setIsModalVisible(false);
      // 刷新当前分页的角色列表数据,重新请求最新的角色列表数据
      getRolesList();
    } else {
      message.error(`权限分配失败: ${data.meta.msg}`);
    }
  };
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  // 权限树形结构事件和数据
  const [expandedKeys, setExpandedKeys] = useState([]); // 控制当前展开的权限复选框
  const [checkedKeys, setCheckedKeys] = useState([]); // 控制当前选中的权限复选框
  const [selectedKeys] = useState([]);
  const onExpand = expandedKeysValue => {
    setExpandedKeys(expandedKeysValue);
  };
  const onCheck = (checkedKeysValue, e) => {
    halfNodeKeys.current = e.halfCheckedKeys; // 半选中的节点keys数组
    console.log("onCheck", checkedKeysValue, e); // 参数是数组, 保存的是当前选中的复选框的key值(包括1级2级3级,只要被勾选,就会放在这个数组里.还有半选中的父节点的key)
    setCheckedKeys(checkedKeysValue);
  };

  const columns = [
    {
      title: "角色id",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "角色名称",
      dataIndex: "roleName",
      key: "roleName",
    },
    {
      title: "角色描述",
      dataIndex: "roleDesc",
      key: "roleDesc",
    },
    {
      title: "操作",
      key: "action",
      render: (_, record) => {
        return (
          <div className="btns">
            <Button type="primary" size="small" icon={<EditOutlined />}>
              编辑
            </Button>
            <Button type="primary" size="small" icon={<DeleteOutlined />}>
              删除
            </Button>
            <Button
              onClick={() => settingRightsEvent(record)}
              type="primary"
              size="small"
              icon={<SettingOutlined />}
            >
              分配权限
            </Button>
          </div>
        );
      },
    },
  ];
  return (
    <div className="Roles">
      <p>{m}</p>
      <button onClick={() => setM(m + 1)}>m++</button>
      <Table
        columns={columns}
        expandable={{
          // childrenColumnName: "subs",
          // Warning: `expandedRowRender` should not use with nested Table, 数据源roles中含有children属性，因此控制台报警告，不建议使用expandedRowRender方法，解决方法：将数据源中的每一层children属性，全换成其他属性。
          expandedRowRender: record => (
            <div
              className="rights"
              style={{
                margin: 0,
              }}
            >
              {deepRenderRights(record.subs)}
            </div>
          ),
          rowExpandable: record => record.subs.length > 0, // 配置行是否可展开
        }}
        dataSource={roles}
      />
      <Modal
        title="分配权限"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        okText="确定"
        cancelText="取消"
        destroyOnClose
      >
        <Tree
          checkable
          onExpand={onExpand}
          expandedKeys={expandedKeys}
          onCheck={onCheck} // 选中/取消选中 复选框时 会触发的事件
          checkedKeys={checkedKeys}
          selectedKeys={selectedKeys}
          treeData={rights}
        />
      </Modal>
    </div>
  );
}

export default Roles;
