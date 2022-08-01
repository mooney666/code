
Page({
  data: {
    bgc: "lightblue",
    styles: [],
    kw: "",
    search: "",
    btnStyle: ""
  },
  radioEvent(e) {
    this.setData({
      bgc: e.detail.value,
    })
  },
  checkboxChange(e) {
    console.log(e.detail);
    this.setData({
      styles: e.detail.value
    })
  },
  inputEvent(e) {
    console.log(e.detail.value);
    // 接下来，就可以根据e.detail.value发送请求了。
  },
  searchEvent(e) {
    this.setData({
      kw: e.detail.value
    })
  },
  searchBtn() {
    // 接下来，利用this.kw发送请求。
  },
  searchTest() {
    console.log(this.data.search);
  },
  fontRadioEvent(e) {
    this.setData({
      btnStyle: `font-size:${e.detail.value}`,
    })
  }
})