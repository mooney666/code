import { combineReducers } from "redux";

function reload(state = false, action) {
  if (action.type === "SET_RELOAD") {
    return action.val;
  }
  return state;
}

function subRoutes(state = [], action) {
  if (action.type === "SET_ROUTES") {
    return action.routes;
  }
  return state;
}

// 保存左侧菜单
function left_menus(state = [], action) {
  if (action.type === "SET_MENUS") {
    return action.menus;
  }
  return state;
}

export default combineReducers({
  reload,
  left_menus,
  subRoutes,
});
