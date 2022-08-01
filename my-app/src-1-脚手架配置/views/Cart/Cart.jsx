import { Component } from "react";
import "./Cart.scss";

class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <h3>购物车组件</h3>
        <div>
          <p>欢迎选购商品</p>
        </div>
        <span className="common">111</span>
        <div className="dd">
          <div>
            <p className="common">段落</p>
          </div>
        </div>
        <ul>
          <li>1</li>
          <li>2</li>
          <li>3</li>
        </ul>
        <p className="pp">一段文本</p>
      </div>
    );
  }
  componentDidMount() {
    this.$ajax();
  }
}

export default Cart;
