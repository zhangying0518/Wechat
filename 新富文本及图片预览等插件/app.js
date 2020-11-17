// app.js11
App({
  onPageNotFound() {
    wx.redirectTo({
      url: "/pages/index/index",
    })
  }
})