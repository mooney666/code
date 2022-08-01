import { Component } from "react";
// import "./Regist.css";
import "./Regist.less";

class Regist extends Component {
  render() {
    return (
      <div className="Regist">
        <h3>注册组件</h3>
        <span>1111</span>
        <a href="https://www.baidu.com" className="link">
          百度一下
        </a>
        <p>段落标签</p>
        <div>
          <div>
            <span>标签</span>
          </div>
        </div>
        <div className="selector_mixin">
          <div>
            <span className="ss">123</span>
          </div>
          <p>
            <span className="ss">123</span>
          </p>
          <div>
            <div>
              <span className="ss">123</span>
            </div>
          </div>
        </div>
        <div className="selector">
          <p>1</p>
          <p>2</p>
          <p>3</p>
          <p>4</p>
        </div>
      </div>
    );
  }
  componentDidMount() {
    this.$ajax();
  }
}

export default Regist;
