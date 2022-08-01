// pages/list/list.js
Page({
  data: {
    id: 0,
    kw: ""
  },
  // 页面加载时触发。一个页面只会调用一次
  onLoad(option) {
    console.log("list onLoad");
    const app = getApp();
    this.setData({
      id: option.id,
      kw: option.kw
    })
  },
  back() {
    wx.navigateBack({
      delta:1,
    })
  },
  onShow() {
    console.log("list onShow");
  },
  onHide() {
    console.log("list onHide");
  },
  onReady() {
    console.log("list onReady");
    // 页面准备完毕，可以和页面交互了。设置window和tabbar等配置项。
  },
  onUnload() {
    console.log("list unload");
  }
})