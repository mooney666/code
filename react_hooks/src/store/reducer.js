import { combineReducers } from "redux";

function name(state = "小明", action) {
  if (action.type === "SET_NAME") {
    return action.name;
  }
  return state;
}

function age(state = 20, action) {
  if (action.type === "SET_AGE") {
    return action.age;
  }
  return state;
}

export default combineReducers({
  name,
  age,
});
