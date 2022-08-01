import "./App.css";
import { RouterMap } from "./router/router";
// import { useEffect } from "react";
// import { useSelector } from "react-redux";

function App() {
  // const reload = useSelector(state => state.reload);
  // useEffect(() => {}, [reload]);
  return (
    <div className="App">
      <RouterMap></RouterMap>
    </div>
  );
}

export default App;
