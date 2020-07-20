// pages/video.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    data: {
      mapUrl: "",
      hideModal: false,//是否显示弹出评论框
      animationData: "",//弹出评论框的动画
      video:3
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function() {
    this.setData({
      mapUrl: "http://wxsnsdy.tc.qq.com/105/20210/snsdyvideodownload?filekey=30280201010421301f0201690402534804102ca905ce620b1241b726bc41dcff44e00204012882540400&bizid=1023&hy=SH&fileparam=302c020101042530230204136ffd93020457e3c4ff02024ef202031e8d7f02030f42400204045a320a0201000400"
    })
  },
  click:function(e){
    console.log("ppp")
  },
  // 点击视频评论
  showcommBox: function () {
    var that = this;
    that.setData({
      hideModal: true
    })
    var animation = wx.createAnimation({
      duration: 200,
      timingFunction: 'ease',
    })
    that.animation = animation
    setTimeout(function () {
      that.fadeIn();
    }, 100)
  },
  // 关闭视频评论框
  hideCommBox: function () {
    var that = this;
    var animation = wx.createAnimation({
      duration: 400,
      timingFunction: 'ease',
    })
    this.animation = animation
    that.fadeDown();
    setTimeout(function () {
      that.setData({ hideModal: false })
    }, 400)
  },
  // 评论框弹出动画
  fadeIn: function () {
    this.animation.translateY(0).step()
    this.setData({
      animationData: this.animation.export()
    })
  },
  // 评论框消失动画
  fadeDown: function () {
    this.animation.translateY(367).step()
    this.setData({
      animationData: this.animation.export(),
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function() {

  },

// 选择视频
  addVideo: function() {
    wx.chooseVideo({
      success(res) {
        const tempFilePaths = res.tempFilePath
        console.log("tempFilePaths", tempFilePaths)
        wx.uploadFile({
          url: 'https://example.weixin.qq.com/upload', 
          filePath: tempFilePaths[0],
          name: 'file',
          formData: {
            'user': 'test'
          },
          success(res) {
            
          }
        })
      }
    })
  },


  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function() {

  }
})