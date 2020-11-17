// app.js111
App({
  onPageNotFound() {
    wx.redirectTo({
      url: "/pages/index/index",
    })
  }
})