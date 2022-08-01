import { Component } from "react";
import { connect } from "react-redux";
import withRouter from "../utils/withRouter";
import { setName } from "../store/action";

class Regist extends Component {
  render() {
    const { rName, rAge, dispatch } = this.props;
    console.log(this.props);
    return (
      <div className="Regist">
        <h3>注册</h3>
        <p>
          姓名: {rName}, 年龄: {rAge}
        </p>
        <button
          onClick={() => {
            // dispatch(action): 分发action到store中，
            // dispatch({
            //   type: "SET_RNAME",
            //   name: "小王",
            // });
            dispatch(setName("小李"));
          }}
        >
          set rName
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
  };
})(withRouter(Regist));
