import { useDispatch, useSelector } from "react-redux";

export default function useRedux() {
  let state = useSelector(state => state);
  let dispatch = useDispatch();
  return [state, dispatch];
}
