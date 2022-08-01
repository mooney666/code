import { memo } from "react";

// React.memo(): 它的作用是相当于PureComponent类，会对父组件传递的props数据，进行浅层的对比，该函数只对比props，不对比私有数据state，它可以减少没必要的组件更新，优化渲染性能。

// React.memo()是高阶组件，和connect()类似。

function SubCom(props) {
  console.log("subcom 子组件渲染了");
  return (
    <div>
      <h3>subcom组件 - {props.name}</h3>
    </div>
  );
}
export default memo(SubCom);
