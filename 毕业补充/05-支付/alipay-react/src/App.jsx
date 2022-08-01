import { Component } from "react";
import axios from "axios";
class App extends Component {
  orderId = ""; // 订单号
  payEvent = () => {
    this.orderId = Date.now() + Math.floor(Math.random() * 100);
    localStorage.setItem("order", this.orderId);
    axios({
      method: "post",
      url: "http://localhost:8000/api/pcpay",
      data: {
        orderId: this.orderId, // 商户订单号，必须保证唯一
      },
    })
      .then(function (res) {
        console.log("res = ", res.data);
        window.open(res.data.result, "_self"); // 打开支付宝官方接口返回的支付界面
      })
      .catch(function (err) {
        console.log("err: ", err);
      });
  };
  queryEvent = () => {
    this.orderId = localStorage.getItem("order");
    console.log("---", this.orderId);
    axios({
      method: "get",
      url: "http://localhost:8000/query",
      params: {
        orderId: this.orderId, // 商户订单号
      },
    }).then(function (res) {
      console.log(res.data);
    });
  };
  render() {
    return (
      <div className="App">
        <h1>首页</h1>
        <button onClick={this.payEvent}>支付</button>
        <button onClick={this.queryEvent}>查询订单</button>
      </div>
    );
  }
}

export default App;
