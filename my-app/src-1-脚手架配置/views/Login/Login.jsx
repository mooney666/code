import { Component } from "react";
import "./Login.less";
import loginStyle from "./Login.module.css";
import PropTypes from "prop-types";

class Login extends Component {
  static defaultProps = {
    num: 100,
  };
  static propTypes = {
    num: PropTypes.number,
    name: PropTypes.string.isRequired,
    age: PropTypes.number.isRequired,
    sex: PropTypes.oneOfType([PropTypes.number, PropTypes.bool]),
  };
  render() {
    let { num, name, age, sex } = this.props;
    return (
      <div className="Login">
        <h3>登录组件</h3>
        <a href="https://www.baidu.com" className={loginStyle.link}>
          知乎一下
        </a>
        <div>
          <p>
            欢迎登录: num={num} name={name} age={age} sex={sex.toString()}
          </p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.$ajax();
  }
}

export default Login;
