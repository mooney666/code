import { useState, useCallback, useEffect, useMemo } from "react";
import SubCom from "../subcoms/suncom";
function UseMemoHook() {
  console.log("UseMemoHook 父组件渲染了");
  let [count, setCount] = useState(0);
  let [a, setA] = useState(0);
  let [b, setB] = useState(0);

  // let receiveData = useCallback(data => {
  //   setCount(data);
  // }); // 这里不加依赖项，相当于每次组件渲染，都创建了一个新的函数，被useCallback缓存起来了，那么和不使用useCallback一个效果。因为每次缓存的函数下次更新组件的时候，都没有及时获取去使用，而是又创建新的函数进行缓存，是没有意义的缓存，无效的缓存。

  let receiveData = useCallback(data => {
    setCount(data);
  }, []); // 添加依赖项，每次组件渲染，useCallback中的函数都不会重新声明了，useCallback会把上一次缓存的的函数返回。

  // let result = () => {
  //   console.log("-----");
  //   return a * 1 + b * 1;
  // };

  // result称为计算属性：这个属性需要依赖于其他的state，比如:count, a, b等计算得到。
  // useMemo(): 它的第一个参数是函数，这个函数的返回值就是useMemo()要缓存的结果，一旦结果被缓存，后续组件中有连续使用这个结果的时候，直接读取缓存的值，不会重新计算。
  let result = useMemo(() => {
    console.log("-----");
    return a * 1 + b * 1;
  }, [a, b]);

  return (
    <div>
      <h3>useMemo Hooks / useCallback Hooks</h3>
      <p>count: {count}</p>
      <button
        onClick={() => {
          setCount(count + 1);
        }}
      >
        setCount
      </button>
      <div>
        <input
          type="text"
          placeholder="输入a"
          value={a}
          onChange={e => setA(e.target.value)}
        />
        +
        <input
          type="text"
          placeholder="输入b"
          value={b}
          onChange={e => setB(e.target.value)}
        />
        = {result}-{result}-{result}-{result}-{result}
      </div>
      <br />
      <SubCom name="小明" cb={receiveData}></SubCom>
    </div>
  );
}

export default UseMemoHook;
