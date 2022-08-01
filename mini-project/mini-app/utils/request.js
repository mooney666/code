function request(url, method, ...params) {
  return new Promise((resolve, reject) => {
    wx.request({
      url,
      data: params,
      method,
      success(data) {
        resolve(data.data);
      }
    })
  })
}