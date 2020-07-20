//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    Length: 6, //验证码输入框个数 
    isFocus: true, //伪输入框聚焦 
    Value: "", //伪输入框输入的验证码 
    ispassword: false, //是否密文显示 true为密文， false为明文。
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  inputCode() {
    console.log("inputCode",this.data.isFocus)
    var that = this;
    that.setData({
      isFocus: true,
    })
  },
  // 伪输入框输入时
  Focus(e) {
    var that = this;
    var inputValue = e.detail.value;
    console.log("inputValue", inputValue)
    that.setData({
      Value: inputValue,
    })
  },
  clear:function(){
    this.setData({
      Value:"",
      isFocus: true
    })
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
