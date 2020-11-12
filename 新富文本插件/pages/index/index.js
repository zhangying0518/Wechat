//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    html:""
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },
  linkpress(e) {
    console.log("e",e)
    console.log("e.detail.href.includes('.doc')",e.detail.href.includes('.lxs'))
    if (e.detail.href) {
      if (e.detail.href.includes('.doc')) {
        e.detail.ignore(); // 禁用自动复制
        wx.showLoading({
          title: '附件下载中',
        })
        wx.downloadFile({
          url: e.detail.href,
          success(res) {
            wx.hideLoading();
            wx.openDocument({
              filePath: res.tempFilePath
            })
          }
        })
      }
    }
  },
  click:function(){
    var that = this
    wx.request({
      method: 'POST',
      url: 'https://www.gz12366.com.cn:20366/WeChatSys/wxPolicyInfo/queryDetailInfo.do',
      data: {
        id:46519,
        userId:10
      },
      header: {
        'content-type': 'application/x-www-form-urlencoded'
      },
      success(res) {
        console.log("res",res)
        that.setData({
          html:res.data.result.detail
        })
      },
     
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
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
