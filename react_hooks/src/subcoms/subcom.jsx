import { memo } from "react";

function ReducerSubCom(props) {
  return (
    <div>
      <h3>ReducerSubCom 子组件</h3>
      <button
        onClick={() => {
          props.cb("小王");
        }}
      >
        setName
      </button>
      <button
        onClick={() => {
          props.dispatch({
            type: "SET_NAME",
            name: "张三",
          });
        }}
      >
        dispatch_name
      </button>
    </div>
  );
}
export default memo(ReducerSubCom);
