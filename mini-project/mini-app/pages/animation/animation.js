// pages/animation/animation.js
Page({
  data: {
    transition: "",
    keyframe: "",
    keyframestop: "",
    ani: ""
  },
  animationObj: null, 
  onLoad() {
    // 初始化动画实例
    this.animationObj = wx.createAnimation({
      delay: 0,
      timingFunction: "linear",
      duration: "2000",
    })
  },
  transitionEvent() {
    this.setData({
      transition: "transition-name"
    })
  },
  kframeEvent() {
    this.setData({
      keyframe: "keyframe-ani"
    })
  },
  kframeStopEvent() {
    this.setData({
      keyframestop: "keyframe-stop"
    })
  },
  kframeStartEvent() {
    console.log("----");
    this.setData({
      keyframestop: "keyframe-start"
    })
  },
  apiEvent() {
    // 使用动画实例对象，描述动画
    // this.animationObj.translateX(150).translateY(150).scale(0.5).opacity(0.5).step(); // 几个动画同时开始
    this.animationObj.translateX(150).step().translateY(150).step().scale(0.5).step().opacity(0.5).step(); // 每个step()都是一个动画过程，按顺序执行
    this.setData({
      ani: this.animationObj.export()
    })
  }
})