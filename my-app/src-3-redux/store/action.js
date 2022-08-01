import { SET_RNAME, SET_RAGE, SET_USER, SET_ARR } from "./types";
// 这里专门封装各种action对象。

function setName(name) {
  return {
    type: SET_RNAME,
    name,
  };
}

function setAge(age) {
  return {
    type: SET_RAGE,
    age,
  };
}

function setUser(user) {
  return {
    type: SET_USER,
    user,
  };
}

function setArr(arr) {
  return {
    type: SET_ARR,
    arr,
  };
}

function setList(data) {
  return {
    type: "SET_LIST",
    data,
  };
}

// 异步action：这个action不再返回一个对象了，内部返回一个函数，函数里面可以封装ajax请求异步任务，将请求的结果，保存到redux中，供其他组件使用。
// 注意：异步action并不能修改redux数据，只是可以让我们发送额外的请求而已，最终请求结果的保存还是要靠dispatch({type: ""})的同步action完成。
function ipLocation(url) {
  return dispatch => {
    console.log("异步任务：", dispatch, url);
    dispatch(setList([{ a: 1 }, { a: 2 }, { a: 3 }]));
  };
}

export { setName, setAge, setUser, setArr, ipLocation };
