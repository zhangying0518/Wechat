// pages/login/login.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  handleGetUserInfo(e){
    let {userInfo} = e.detail
    wx.setStorageSync('userInfo', userInfo)
    wx.navigateBack({
      delta: 1,
    })
  }
})