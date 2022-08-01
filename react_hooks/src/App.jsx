import UseStateHook from "./components/01-usestatehook";
import UseEffectHook from "./components/02-useeffecthook";
import UseContext from "./components/03-useContext";
import UseMemoHook from "./components/04-usememohook";
import UseRefHook from "./components/05-userefhook";
import { useState } from "react";
import UseReducerHook from "./components/06-usereducerhook";
import UseImperativeHandleHook from "./components/07-useimperative";
import { Link, Routes, Route } from "react-router-dom";

let com = null;
function App() {
  let [comName, setComName] = useState("useimperative");
  switch (comName) {
    case "useeffect":
      com = <UseEffectHook></UseEffectHook>;
      break;
    case "usestate":
      com = <UseStateHook></UseStateHook>;
      break;
    case "usecontext":
      com = <UseContext></UseContext>;
      break;
    case "usememo":
      com = <UseMemoHook></UseMemoHook>;
      break;
    case "useref":
      com = <UseRefHook></UseRefHook>;
      break;
    case "usereducer":
      com = <UseReducerHook></UseReducerHook>;
      break;
    case "useimperative":
      com = <UseImperativeHandleHook></UseImperativeHandleHook>;
      break;
    default:
      break;
  }
  return (
    <div className="App">
      <h3>App根组件</h3>
      <Link to="/state">useState组件</Link>
      <Link to="/effect">useEffect组件</Link>
      <hr />
      <button
        onClick={() => {
          setComName("usestate");
        }}
      >
        useState
      </button>
      <button
        onClick={() => {
          setComName("useeffect");
        }}
      >
        useEffect
      </button>
      <hr />
      {com}
      <Routes>
        <Route path="/state" element={<UseStateHook></UseStateHook>}></Route>
        <Route path="/effect" element={<UseEffectHook></UseEffectHook>}></Route>
      </Routes>
    </div>
  );
}

export default App;
