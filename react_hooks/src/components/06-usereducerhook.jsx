import { useState, useReducer, useCallback } from "react";
import ReducerSubCom from "../subcoms/subcom";

function UseReducerHook() {
  let [name, setName] = useState("小明");
  let [userState, dispatch] = useReducer(
    (userState, action) => {
      if (action.type === "SET_NAME") {
        return { ...userState, uname: action.name };
      } else if (action.type === "SET_AGE") {
        return { ...userState, uage: action.age };
      }
    },
    {
      uname: "小明",
      uage: 22,
    }
  );

  let receiveName = useCallback(newName => {
    setName(newName);
  }, []);

  return (
    <div>
      <h3>useReducer Hooks</h3>
      <p>
        useReducer: 以redux工作流的形式,
        来维护当前组件的数据声明及修改功能。是useState的替代方案。
      </p>
      <p>{JSON.stringify(userState)}</p>
      <button
        onClick={() => {
          dispatch({
            type: "SET_NAME",
            name: "小李",
          });
        }}
      >
        setName
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_AGE",
            age: 30,
          });
        }}
      >
        setAge
      </button>
      <hr />
      <p>name: {name}</p>
      <ReducerSubCom cb={receiveName} dispatch={dispatch}></ReducerSubCom>
    </div>
  );
}

export default UseReducerHook;
