import { useState, useRef } from "react";

// let c = 0;
function UseRefHook() {
  // 1. 操作DOM；
  // 2. useRef的.current属性，可以用来保存任意类型的其他数据，这种用法，就相当于class类组件中的属性一样。
  let p_ref = useRef();
  let [count, setCount] = useState(0);
  let count_ref = useRef(); // useRef的返回值在整个组件生命周期内，这个ref对象是保持不变的。不管后续组件如何更新，这个ref对象都会保持不变。每次useRef返回的都是同一个ref对象。
  return (
    <div>
      <h3>useRef Hooks</h3>
      <p ref={p_ref}>段落</p>
      <button
        onClick={() => {
          console.log(p_ref.current);
        }}
      >
        设置样式
      </button>
      <hr />
      <p>count: {count}</p>
      <button
        onClick={() => {
          // c = count + 1;
          // setCount(c);
          count_ref.current = count + 1;
          setCount(count_ref.current);
        }}
      >
        count++
      </button>
      <button
        onClick={() => {
          setTimeout(() => {
            // console.log(count);
            // console.log(c);
            console.log(count_ref.current);
          }, 3000);
        }}
      >
        异步
      </button>
    </div>
  );
}

export default UseRefHook;
