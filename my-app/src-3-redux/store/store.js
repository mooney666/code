import reducers from "./reducer";
// 1. store负责串联React组件和Redux之间的工作，当用户在组件中要修改Redux的公共数据，需要触发action，store对象就会将这个action转发给reducer，让reducer根据用户触发的action，修改对应的state，store再将这个最新的state渲染到组件中。
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

const store = createStore(reducers, applyMiddleware(thunk));

export default store;
