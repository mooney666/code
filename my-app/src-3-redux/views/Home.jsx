import { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../utils/withRouter";
import { setAge, setUser, setArr, ipLocation } from "../store/action";

class Home extends Component {
  render() {
    const { rName, rAge, rUser, rArr, rList, dispatch } = this.props;
    return (
      <div className="Home">
        <h3>首页</h3>
        <p>
          姓名: {rName}, 年龄: {rAge}
        </p>
        <button
          onClick={() => {
            // dispatch(action): 分发action到store中，
            // dispatch({
            //   type: "SET_RAGE",
            //   age: 25,
            // });
            dispatch(setAge(30));
          }}
        >
          set rAge
        </button>
        <hr />
        <p>用户: {JSON.stringify(rUser)}</p>
        <button
          onClick={() => {
            rUser.name = "王五";
            rUser.address = "郑州市";
            dispatch(setUser(rUser));
          }}
        >
          set user
        </button>
        <hr />
        <p>arr: {rArr}</p>
        <button
          onClick={() => {
            rArr.push(4, 5, 6);
            dispatch(setArr(rArr));
          }}
        >
          set arr
        </button>
        <hr />
        <dir>
          {rList.map((obj, i) => (
            <p key={i}>{obj.a}</p>
          ))}
        </dir>
        <button
          onClick={() => {
            // 此时dispatch(函数)分发的不再是对象，而是一个函数，此时需要借助于redux-thunk这个包处理这种方法。默认，dispatch(对象)只能分发同步action，里面只能是对象。
            dispatch(ipLocation("xxx"));
          }}
        >
          异步action
        </button>
      </div>
    );
  }
}

export default connect(state => {
  // return 的新对象中的属性，会合并到当前组件的props中。
  return {
    rName: state.redux_name,
    rAge: state.redux_age,
    rUser: state.redux_user,
    rArr: state.redux_arr,
    rList: state.redux_list,
  };
})(withRouter(Home));
