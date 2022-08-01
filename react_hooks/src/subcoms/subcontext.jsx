import { useState, useEffect, useContext } from "react";
import Context from "../utils/context";

function SubContext() {
  const obj = useContext(Context);
  return (
    <div>
      <h3>子组件</h3>
      <p>obj: {JSON.stringify(obj)}</p>
    </div>
  );
}

export default SubContext;
