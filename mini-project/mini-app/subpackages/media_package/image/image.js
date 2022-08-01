// pages/image/image.js
Page({
  data: {

  },
  previewEvent() {
    wx.previewImage({
      current: 'https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110814%2F6351-110Q40R44376.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660266653&t=37954412ffb3f81a3a605de57d299c28', // 进入预览时，默认显示图片的链接
      urls: ["https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1112%2F051519134149%2F1Z515134149-1-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660266653&t=4d52a00356a48f00218505f2df14b6b5", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.jj20.com%2Fup%2Fallimg%2F1113%2F011220113I3%2F200112113I3-7-1200.jpg&refer=http%3A%2F%2Fimg.jj20.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660266653&t=a5f3c9f24e70cbf118629df3c2996415", "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fimg.taopic.com%2Fuploads%2Fallimg%2F110814%2F6351-110Q40R44376.jpg&refer=http%3A%2F%2Fimg.taopic.com&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=auto?sec=1660266653&t=37954412ffb3f81a3a605de57d299c28"] // 需要预览的图片 http 链接列表
    })
  }
})