import { Component } from "react";
import withRouter from "../../utils/withRouter";

class Login extends Component {
  render() {
    return (
      <div className="Login">
        <h3>登录页面</h3>
        <button
          onClick={() => {
            localStorage.setItem("token", "123");
            this.props.navigate(this.props.search.get("redirect"), {
              replace: true,
            });
          }}
        >
          登录
        </button>
      </div>
    );
  }
}

export default withRouter(Login);
