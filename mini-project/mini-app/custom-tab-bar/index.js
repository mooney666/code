Component({
  data: {
    selected: 0, // 当前选中tabbar索引
    color: "#7A7E83",
    selectedColor: "#3cc51f",
    list: [{
      pagePath: "/pages/index/index",
      iconPath: "/static/tabbars/home.png",
      selectedIconPath: "/static/tabbars/home-selected.png",
      text: "首页"
    },{
      pagePath: "/pages/center/center",
      iconPath: "/static/tabbars/center.png",
      selectedIconPath: "/static/tabbars/center-selected.png",
      text: "我的"
    }]
  },
  methods: {
    switchTab(e) {
      const data = e.currentTarget.dataset
      const url = data.path
      wx.switchTab({url})
      // this.setData({
      //   selected: data.index
      // })
    }
  }
})