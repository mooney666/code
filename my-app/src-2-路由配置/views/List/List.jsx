import { Component } from "react";
import withRouter from "../../utils/withRouter";

class List extends Component {
  render() {
    return (
      <div className="List">
        <h3>列表页</h3>
        <button
          onClick={() => {
            // this.props.navigate(-1); // 类似于返回按钮，返回上一页。
            this.props.navigate("/", {
              replace: true,
              state: {
                test: "测试",
                user: {
                  a: 100,
                },
              },
            });
          }}
        >
          返回
        </button>
      </div>
    );
  }
  componentDidMount() {
    // console.log(this.props.location.state);

    // const { search } = this.props;
    // console.log(search.get("name"));
    // console.log(search.get("age"));
    // console.log(search.get("a"));
    // console.log(search.get("b"));

    console.log(this.props.params);
  }
}

export default withRouter(List);
