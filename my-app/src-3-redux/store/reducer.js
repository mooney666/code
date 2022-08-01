import { combineReducers } from "redux";
import { SET_RAGE, SET_RNAME, SET_USER, SET_ARR } from "./types";
// reducer: 其实就是一个函数，它是负责定义Redux中的初始state数据，以及后续根据action更新state。总之它负责维护Redux中的公共数据state。

// 定义 reducer 函数
function redux_name(state = "小明", action) {
  if (action.type === SET_RNAME) {
    console.log("name - ", action);
    return action.name;
  }
  return state; // 这个形参state就是 redux_name 这个reducer的初始值。
}

function redux_age(state = 20, action) {
  if (action.type === SET_RAGE) {
    console.log("age - ", action);
    return action.age;
  }
  return state;
}

function redux_user(state = { name: "张三", age: 22, sex: "男" }, action) {
  if (action.type === SET_USER) {
    return { ...action.user };
  }
  return state;
}

function redux_arr(state = [1, 2, 3], action) {
  if (action.type === SET_ARR) {
    return [...action.arr];
  }
  return state;
}

function redux_list(state = [], action) {
  if (action.type === "SET_LIST") {
    return [...action.data];
  }
  return state;
}

// combineReducers(reducers): 它是负责合并多个reducers函数的，因为createStore()只允许设置一个reducer参数。
export default combineReducers({
  redux_name,
  redux_age,
  redux_user,
  redux_arr,
  redux_list,
});
