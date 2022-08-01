import { Component } from "react";
import { Outlet, Link } from "react-router-dom";

class Cart extends Component {
  render() {
    return (
      <div className="Cart">
        <h3>购物车页面</h3>
        <Link to="/cart">男装</Link>
        <Link to="/cart/women">女装</Link>
        <hr />
        <Outlet></Outlet>
      </div>
    );
  }
}

export default Cart;
