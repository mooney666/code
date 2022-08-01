import axios from "axios";

const BASE = "http://106.12.150.223:8090/api/private/v1/";
// 登录接口
async function login(username, password) {
  let data = await axios({
    url: BASE + "login",
    method: "post",
    data: {
      username,
      password,
    },
  });
  return data;
}

// 获取左侧菜单列表接口
async function menus() {
  let data = await axios({
    url: BASE + "menus",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 添加用户接口
async function add_user(user) {
  let data = await axios({
    url: BASE + "users",
    method: "post",
    data: user,
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 用户列表接口
async function get_user(pagenum, pagesize) {
  let data = await axios({
    url: BASE + "users",
    params: {
      pagenum,
      pagesize,
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 修改用户状态
async function set_user_state(uid, type) {
  let data = await axios({
    url: BASE + `users/${uid}/state/${type}`,
    method: "put",
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 角色列表
async function get_user_roles() {
  let data = await axios({
    url: BASE + `roles`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 分配用户角色
async function set_user_roles(uid, rid) {
  let data = await axios({
    url: BASE + `users/${uid}/role`,
    method: "put",
    data: {
      rid,
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 获取所有权限的树形结构
async function get_all_rights() {
  let data = await axios({
    url: BASE + `rights/tree`,
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

// 分配角色权限
async function set_role_rights(rid, rids) {
  let data = await axios({
    url: BASE + `roles/${rid}/rights`,
    method: "post",
    data: {
      rids,
    },
    headers: {
      Authorization: JSON.parse(localStorage.getItem("userinfo")).token,
    },
  });
  return data;
}

export {
  login,
  menus,
  add_user,
  get_user,
  set_user_state,
  get_user_roles,
  set_user_roles,
  get_all_rights,
  set_role_rights,
};
