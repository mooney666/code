import ImperativeHandle from "../subcoms/imperativecom";
import { useRef, useEffect, useState, useLayoutEffect } from "react";

function UseImperativeHandleHook() {
  // 1. 父组件声明空ref对象；
  // 2. 通过ref属性，将这个空的ref对象传给子组件；
  // 3. 子组件接收到空的ref对象，往这个空对象上绑定属性和方法；
  // 4. 子组件使用forwardRef高阶组件包裹；
  let parent_ref = useRef();
  let [obj, setObj] = useState({});
  useLayoutEffect(() => {
    console.log("useLayoutEffect");
  }, []);
  useEffect(() => {
    console.log("useEffect");
    setObj(parent_ref.current);
  }, []);
  return (
    <div>
      <h3>useImperativeHandle Hooks</h3>
      <p>
        通过该hooks 搭配 forwardRef
        这个高阶组件，可以实现子组件向父组件暴漏方法和属性，让父组件可以直接使用子组件的属性和方法。
      </p>
      <p>{JSON.stringify(obj)}</p>
      <button
        onClick={() => {
          console.log(parent_ref.current.age);
          parent_ref.current.test(100);
        }}
      >
        获取子组件属性和方法
      </button>
      <hr />
      <ImperativeHandle
        ref={parent_ref}
        name="小明"
        age={20}
      ></ImperativeHandle>
    </div>
  );
}
export default UseImperativeHandleHook;
