// app.js: 该文件保存一些公共的数据和脚本。
App({
  // 这里存放共享数据，每个页面都可以获取这个数据。
  globalDatas: {
    gName: "小明",
    user: {}
  },
  showName() {
    return `全局姓名：${this.globalDatas.gName}`
  },
  setName() {
    this.globalDatas.gName = "小王"
  },
  onLaunch() {
    // 小程序初始化生命周期，在这里可以全局管理器初始化，比如：audio管理器，背景音频管理器等。只执行一次。
    console.log("onLaunch");
  },
  onShow() {
    // 小程序切到前台，会多次触发。做一些继续操作，继续播放音频/视频
    console.log("onShow");
  },
  onHide() {
    // 小程序切到后台，会多次触发。做一些停止操作，停止播放音频/视频等。
    console.log("onHide");
  }
})
