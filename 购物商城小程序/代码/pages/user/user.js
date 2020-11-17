// pages/user/user.js
Page({

  data: {
    userInfo:{},
    collectNums:[]
  },
  onShow(){
    var userInfo = wx.getStorageSync('userInfo')
    var collect = wx.getStorageSync('collect')
    this.setData({userInfo,collectNums:collect})
  }
})