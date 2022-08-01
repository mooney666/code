import { Component } from "react";
import { Link, Outlet } from "react-router-dom";
import withRouter from "../../utils/withRouter";

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h3>首页</h3>
        <Link
          to="/list/100/小王?name=小明&age=22"
          state={{ name: "小王", age: 22 }}
        >
          列表页
        </Link>
        <br />
        <button
          onClick={() => {
            this.props.navigate("/list/200/小红?a=100&b=200", {
              replace: true,
              state: {
                a: 1000,
                b: 2000,
              },
            });
          }}
        >
          进入列表页
        </button>
        <div>
          <Outlet></Outlet>
        </div>
      </div>
    );
  }
  componentDidMount() {
    console.log(this.props.location.state);
  }
}

export default withRouter(Home);
