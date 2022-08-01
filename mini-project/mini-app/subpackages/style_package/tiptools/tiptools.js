Page({
  data: {
    goods: [], // 商品列表数据
  },
  page: 1,
  totalPages: 0, // 总页数
  onLoad() {
    this.ajax();
  },
  onPullDownRefresh() {
    this.page = 1; // 将页码重置为1
    wx.showLoading({
      title: '正在加载...',
    })
    this.ajax(); // 请求最新的第一页数据，替换旧数据
  },
  onReachBottom() {
    // 触底加载更多数据
    this.page++;
    if (this.page <= this.totalPages) {
      this.ajax();
    } else {
      wx.showToast({
        title: '已经到底啦~',
        icon: "none"
      })
    };
  },
  ajax() {
    const _self = this;
    wx.request({
      url: `https://apif.java.crmeb.net/api/front/index/product/1/?page=${_self.page}&limit=10`,
      success(data) {
        wx.hideLoading();
        wx.stopPullDownRefresh();
        if (_self.page === 1) {
          _self.setData({
            goods: data.data.data.list
          })
          _self.totalPages = data.data.data.totalPage;
        } else {
          // console.log("--", _self.page);
          _self.setData({
            goods: _self.data.goods.concat(data.data.data.list)
          })
        }
      }
    })
  },
  showToastEvent() {
    // wx.showToast({
    //   title: '成功',
    //   icon: 'success',
    //   duration: 2000
    // })
    // wx.showLoading({
    //   title: '加载中',
    // });
    // setTimeout(()=>{
    //   wx.hideLoading()
    // }, 1000)

    // wx.showModal({
    //   title: '提示',
    //   content: '这是一个模态弹窗',
    //   success (res) {
    //     if (res.confirm) {
    //       console.log('用户点击确定')
    //     } else if (res.cancel) {
    //       console.log('用户点击取消')
    //     }
    //   }
    // })

    wx.showActionSheet({
      itemList: ['修改标题'],
      success(res) {
        console.log(res.tapIndex)
        wx.setNavigationBarTitle({
          title: '提示框'
        })
        wx.hideHomeButton();
      },
      fail(res) {
        console.log(res.errMsg)
      }
    })
  }
})