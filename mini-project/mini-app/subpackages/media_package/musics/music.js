// pages/musics/music.js
Page({
  data: {
    musicLists: [{
        name: "孤勇者",
        src: "http://freetyst.nf.migu.cn/public/product9th/product45/2021/12/0915/2021%E5%B9%B412%E6%9C%8807%E6%97%A517%E7%82%B913%E5%88%86%E7%B4%A7%E6%80%A5%E5%86%85%E5%AE%B9%E5%87%86%E5%85%A5%E6%AD%A3%E4%B8%9C9%E9%A6%96475537/%E6%A0%87%E6%B8%85%E9%AB%98%E6%B8%85/MP3_128_16_Stero/6005663SX43151214.mp3?channelid=02&msisdn=be8fa59f-a156-4442-a2f1-efcff1004946&Tim=1657697605965&Key=0bef9ec339122969",
      },
      {
        name: "最佳损友",
        src: "http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=PQ&netType=00&copyrightId=0&contentId=600914000007180652&resourceType=2&channel=0",
      },
      {
        name: "漠河舞厅",
        src: "http://218.205.239.34/MIGUM2.0/v1.0/content/sub/listenSong.do?toneFlag=PQ&netType=00&copyrightId=0&contentId=600919000004874143&resourceType=2&channel=0",
      }
    ],
    total_time: "00:00", // 记录总时长，结构是分:秒
    current_time: "00:00", // 记录当前时长，结构是分:秒
    slider_value: 0, // 滑块的值
  },
  bgAudio: null,
  isdraing: false,
  onLoad(options) {
    // 全局背景音频管理器，管理歌曲播放。
    this.bgAudio = wx.getBackgroundAudioManager();
    // 监听音频播放进度，获取实时的时长，一直执行。
    this.bgAudio.onTimeUpdate(() => {
      const curTime = this.bgAudio.currentTime; // 当前时长, 单位s
      const step = Math.ceil((curTime / this.bgAudio.duration) * 100);
      // console.log(curTime, this.bgAudio.duration,step);
      if (!this.isdraing) {
        this.setData({
          current_time: this.formatTime(curTime),
          slider_value: step
        })
      } else {
        this.setData({
          current_time: this.formatTime(curTime),
        })
      }
    });
    // 监听音频开始播放。只执行一次
    this.bgAudio.onPlay(() => {
      // console.log("onPlay: ", this.bgAudio.duration);
    })
    // 监听音频处于待播放状态，说明src歌曲加载完毕，可以播放了。只执行一次
    this.bgAudio.onCanplay(() => {
      this.setData({
        total_time: this.formatTime(this.bgAudio.duration)
      })
    });
    // 歌曲自然播放结束，一般处理自动播放下一曲。
    this.bgAudio.onEnded(() => {});
    // 歌曲播放错误，比如：断网、需要VIP、等异常情况，自动切换下一首。
    this.bgAudio.onEnded(() => {});
  },
  formatTime(seconds) {
    let m = parseInt(seconds / 60);
    m = m < 10 ? '0' + m : m;
    let s = parseInt(seconds % 60);
    s = s < 10 ? '0' + s : s;
    return `${m}:${s}`
  },
  musicEvent(e) {
    const idx = e.target.dataset.idx;
    const curMusic = this.data.musicLists[idx]; // 当前歌曲对象
    this.bgAudio.src = curMusic.src; // 第一次赋值src属性，不会自动播放，必须有旧的src，然后切换到新的src时才会自动播放。
    this.bgAudio.title = curMusic.name; // 必填项，不设置歌曲不播放。
    this.bgAudio.play();
  },
  dragEvent(e) {
    const curTime = (e.detail.value / 100) * this.bgAudio.duration;
    this.bgAudio.startTime = curTime;
    this.bgAudio.seek(curTime);
    this.isdraing = false;
    this.setData({
      slider_value: e.detail.value
    })
  },
  dragingEvent(e) {
    this.isdraing = true;
  }
})