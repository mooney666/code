import { useState, useRef, useEffect } from "react";
function UseStateHook() {
  // console.log("UseStateHook 函数执行了");
  // useState初始渲染，会给第一个参数state(count,name,arr,obj)赋初始值，后续渲染期间，useState会返回state的最新值，不会每次都初始化state。而数组结构每次都会重新结构。
  let [count, setCount] = useState(0);
  let [name, setName] = useState("小明");
  let [arr, setArr] = useState([10, 20, 30]);
  let [obj, setObj] = useState({ a: 1, b: 2 });
  let countRef = useRef();

  return (
    <div className="statehook">
      <h3>useState hooks</h3>
      <p>
        count:{count}, name:{name}, arr:{arr.join(";")}, obj:
        {JSON.stringify(obj)}
      </p>
      <button
        onClick={() => {
          // let newCount = count + 1;
          // countRef.current = newCount;
          // setCount(newCount);

          // 参数count都是更新之后的最新值。内部的返回值，会更新到count这个state上。
          setCount(count => {
            let newCount = count + 1;
            countRef.current = newCount;
            return newCount;
          });
        }}
      >
        setCount
      </button>
      <button
        onClick={() => {
          function test() {
            console.log(count);
            console.log(countRef.current);
          }
          setTimeout(test, 3000);
        }}
      >
        异步任务
      </button>
      <button
        onClick={() => {
          setName("小王");
        }}
      >
        setCount
      </button>
      <button
        onClick={() => {
          // setArr([...arr, 1, 2, 3]); // 保留旧数据
          // setArr([1, 2, 3]); // 替换旧数据
        }}
      >
        setArr
      </button>
      <button
        onClick={() => {
          setObj({ ...obj, a: 100, c: 300 });
        }}
      >
        setArr
      </button>
    </div>
  );
}

export default UseStateHook;
