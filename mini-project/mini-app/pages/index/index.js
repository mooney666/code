// index.js
Page({
  // data 存放页面私有数据
  data: {
    uname: "小明",
    uage: 22,
    usex: true,
    uarr: [10, 20, 30],
    uinfo: {
      address: "郑州市",
    },
    users: [
      {
        id: 101,
        uname: "小王1",
      },
      {
        id: 102,
        uname: "小王2",
      },
      {
        id: 103,
        uname: "小王3",
      },
    ],
    isshow: false,
    type: "login",
  },
  app: null, // 类中声明的普通的实例属性，data里面保存的都是页面中要用到的响应式数据，修改data数据使用this.setData()。而这里的app，没有放在data中，意味着它只供当前类内部的函数使用，不需要写在data中。
  loginEvent() {
    this.setData({
      type: "login",
    });
  },
  registEvent() {
    this.setData({
      type: "regist",
    });
  },
  onLoad() {
    this.app = getApp();
    console.log(this.app.globalDatas.gName);
    const res = this.app.showName();
    this.app.setName();
    console.log("index onLoad");
  },
  event1(e) {
    console.log("event1: ", e);
  },
  event2: e => {
    console.log("event2: ", this); // this是undefined，指向丢失了，尽量采用普通函数，只要不使用this，可以用箭头函数。
  },
  event3(e) {
    console.log("event3: ", e.target.dataset);
  },
  enterToList() {
    this.app.globalDatas.user = {
      a: 1,
      b: 2,
    };
    wx.navigateTo({
      url: "/subpackages/style_package/list/list?id=200&kw=123",
    });
  },
  onShow() {
    console.log("index onShow");
    // this.getTabBar() 返回tabbar实例
    this.getTabBar().setData({
      selected: 0
    })
  },
  onHide() {
    console.log("index onHide");
  },
  onReady() {
    console.log("index onReady");
    // 页面准备完毕，可以和页面交互了。设置window和tabbar等配置项。
  },
  onUnload() {
    console.log("index unload");
  }
});
