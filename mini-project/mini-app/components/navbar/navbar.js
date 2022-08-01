// components/navbar/navbar.js
Component({
  /**
   * 组件的属性列表: 接收父组件传递的prop
   */
  properties: {
    title: {
      type: String,
      value: "导航条"
    }
  },
  /**
   * observers: 用于监听 properties 和 data 的变化
   */
  observers: {
    "search": (newKW) => {
      console.log("---", newKW);
    }
  },
  /**
   * 组件的初始数据：私有数据，类似于Page的data，修改数据使用this.setData
   */
  data: {
    search: ""
  },

  /**
   * 组件的方法列表: 保存子组件的事件
   */
  methods: {
    changeEvent(e) {
      this.setData({
        search: e.detail.value,
      })
      // 子组件触发父组件传递的函数
      this.triggerEvent("searchevent", e.detail.value);
    }
  }
})
