// pages/center/center.js
Page({
  data: {
    userInfo: {}, // 用户信息
    hasUserInfo: false,
    audioSrc: "",
  },
  recordManger: null, // 录音管理器
  audioManger: null, // 音频管理器，替换旧的audio组件
  onLoad(options) {
    // 页面初始加载，创建全局唯一的录音管理器。
    this.recordManger = wx.getRecorderManager();
    this.recordManger.onStop((data) => {
      console.log(data);
      this.audioManger.src = data.tempFilePath;
    });
    this.recordManger.onStart(() => {
      
    });
    // 创建音频管理器对象
    this.audioManger = wx.createInnerAudioContext();
  },
  getUserProfile(e) {
    // wx.getUserProfile 它会弹起授权窗口，不管允许还是拒绝，下次点击还会弹。需要根据条件将授权按钮隐藏。
    wx.getUserProfile({
      desc: '用于完善会员资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true,
        })
      }
    })
  },
  startRecord() {
    // 开始录音之前，先判断用户是否授权了(wx.getSetting)，如果没有授权，就调用wxwx.authorize弹起授权窗口进行授权，如果已经授权，直接开始录音。
    const _self = this;
    wx.getSetting({
      success(res) {
        // 默认有四个权限默认授权了，不需要弹窗口让用户进行授权了。
        // scope.address: true
        // scope.invoice: true
        // scope.invoiceTitle: true
        // scope.userInfo: true
        // console.log(res.authSetting)
        if (!res.authSetting["scope.record"]) {
          // 需要授权
          wx.authorize({
            scope: 'scope.record', // 需要授权的权限范围
            success () {
              // 用户已经同意小程序使用录音功能，后续调用 wx.startRecord 接口不会弹窗询问
              wx.startRecord({
                success: (result) => {
                  console.log("---", result);
                  _self.setData({
                    audioSrc: result.tempFilePath,
                  })
                }
              });
            }
          })
        } else {
          wx.startRecord({
            success: (result) => {
              console.log("====", result);
              _self.setData({
                audioSrc: result.tempFilePath,
              })
            },
          })
          setTimeout(function () {
            wx.stopRecord() // 结束录音
          }, 10000)
        }
      }
    })
  },
  startNewRecord() {
    const _self = this;
    wx.getSetting({
      success: (result) => {
        console.log("----", result);
        if (result.authSetting["scope.record"] === undefined) {
          // 说明之前没有授权过，是第一次授权
          wx.authorize({
            scope: 'scope.record',
            success: (data) => {
              console.log(data); //{errMsg: "authorize:ok"}
              _self.recordManger.start({
                duration: 10000,
                format: "mp3",
              });
            }
          })
        } else if (result.authSetting["scope.record"] === false) {
          // 之前弹授权窗口时，用户选择的拒绝
          // wx.openSetting 打开授权设置页面，进行二次授权，这里面只会显示小程序曾经向用户获取过授权，但是用户选择了拒绝。
          wx.openSetting({
            success: (res) => {
              console.log(res);
            }
          })
        } else {
          _self.recordManger.start({
            duration: 10000,
            format: "mp3",
          });
        }
      }
    })
  },
  startPlayRecord() {
    this.audioManger.play();
  },
  onShow() {
    this.getTabBar().setData({
      selected: 1
    })
  }
})