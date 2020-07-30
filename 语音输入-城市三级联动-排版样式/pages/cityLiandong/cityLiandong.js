Page({
  data: {
    detailed: '请选择',
  },

  onLoad: function (options) {
  },
 
  //省市联动
  bindRegionChange: function (e) {
    console.log('picker发送选择改变，携带值为', e,e.detail.value)
    this.setData({
      detailed: e.detail.value[0] + " " + e.detail.value[1] + " " + e.detail.value[2],
    })
  },
})