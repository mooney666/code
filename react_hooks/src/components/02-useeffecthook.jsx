import { useState, useEffect } from "react";
import useRouter from "../hooks/useRouter";
import { useDispatch, useStore, useSelector } from "react-redux";
import useRedux from "../hooks/useRedux";

function UseEffectHook() {
  let [location, search] = useRouter();
  console.log(location, search.get("a"));

  // let myage = useSelector(state => state.age);
  // console.log(myage);

  // let state = useSelector(state => state); // 获取所有redux的公共数据
  // let dispatch = useDispatch();
  // let store = useStore();
  // console.log("---", store.getState(), store.dispatch);

  let [state, dispatch] = useRedux();
  console.log("---------", state);

  // 三个写法：
  // 1. 模拟componentDidMount()钩子，只在组件初始化渲染时执行；
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(10);
  let [kw, setKw] = useState("");

  useEffect(() => {
    console.log("count", count);
    return function () {
      console.log("第一个useEffect的return执行了");
    };
  }, []); // 第二个参数是state数据依赖项，如果不设置该参数，组件每次渲染，它都会执行。如果设置为[]空数组，则只在首次渲染执行一次，用于组件的初始化数据请求，类似于componentDidMount()的作用。

  // 2. 模拟componetDidUpdate()钩子，在组件更新渲染时触发。
  useEffect(() => {
    // 在这里可以获取最新的更新之后的DOM。
    const p = document.querySelector("p");
    console.log("p标签:", p.innerText);
    return function () {
      console.log("第二个useEffect的return执行了");
    };
  }, [count]);

  // 2.1 场景：当输入框搜索内容发生改变时，根据最新的搜索关键字发送请求。
  useEffect(() => {
    if (kw) {
      console.log(`根据 ${kw} 发送请求`);
    }
  }, [kw]);

  // 3. 模拟componentWillUnmount()钩子，组件销毁期间才执行；
  useEffect(() => {
    return function () {
      console.log("组件被销毁了, 才会调用retrun的这个函数, 清理定时器，事件");
    };
  }, []);
  return (
    <div className="effecthook">
      <h3>useEffect Hooks</h3>
      <p>
        count: {count}, age: {age}
      </p>
      <p>redux: {JSON.stringify(state)}</p>
      <button
        onClick={() => {
          // setCount(count + 1);
          setAge(age + 1);
          dispatch({
            type: "SET_NAME",
            name: "123",
          });
        }}
      >
        setCount
      </button>
      <br />
      <input
        type="text"
        placeholder="输入搜索关键字"
        onChange={e => {
          setKw(e.target.value);
        }}
      />
    </div>
  );
}

export default UseEffectHook;
