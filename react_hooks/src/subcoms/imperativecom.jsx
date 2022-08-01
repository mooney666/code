import { useState, useImperativeHandle, forwardRef } from "react";
// 函数组件两个参数：
// 参数1：父组件传递的props;
// 参数2：父组件传递的ref;
function ImperativeHandle(props, ref) {
  let [count, setCount] = useState(0);
  let [age, setAge] = useState(22);
  let test = data => {
    console.log("+++++", data);
  };
  // 三个参数：1.父组件传递的空ref对象；2.是个函数，要暴漏的属性和方法；3.依赖项，哪些依赖项发生变化时，要重新向父组件暴漏属性和方法。
  useImperativeHandle(
    ref,
    () => {
      return {
        age,
        test,
      };
    },
    [count, age]
  );

  return (
    <div>
      <h3>ImperativeHandle</h3>
      <p>age: {age}</p>
      <button
        onClick={() => {
          setAge(age + 1);
        }}
      >
        setAge
      </button>
    </div>
  );
}
export default forwardRef(ImperativeHandle);
