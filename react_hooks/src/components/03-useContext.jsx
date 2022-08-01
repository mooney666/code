import { useState, useEffect } from "react";
import SubContext from "../subcoms/subcontext";
import Context from "../utils/context";

function UseContext() {
  let [age, setAge] = useState(0);
  return (
    <div>
      <h3>useContext Hooks</h3>
      <button
        onClick={() => {
          setAge(age + 1);
        }}
      >
        setAge
      </button>
      <Context.Provider value={{ age }}>
        <SubContext></SubContext>
      </Context.Provider>
    </div>
  );
}

export default UseContext;
