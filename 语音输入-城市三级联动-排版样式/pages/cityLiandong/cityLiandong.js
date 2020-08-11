// -------------------
// 方式2的代码
const date = new Date()
const years = []
const months = []
const days = []

for (let i = 1970; i <= date.getFullYear(); i++) {
  years.push(i)
}

for (let i = 1; i <= 12; i++) {
  months.push(i)
}

for (let i = 1; i <= 31; i++) {
  days.push(i)
}
// ------------------------
Page({
  data: {
    detailed: '请选择',
    // --------------
    // 方式2的代码
    years: years,
    year: date.getFullYear(),
    months: months,
    month: 2,
    days: days,
    day: 2,
    value: [5, 5, 5],
    isShow:false,//是否显示日期框
    // ------------------
  },
  click:function(){
    this.setData({
      isShow:true
    })
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
  // ----------------
  // 方式2的代码
  bindChange: function (e) {
    const val = e.detail.value
    this.setData({
      year: this.data.years[val[0]],
      month: this.data.months[val[1]],
      day: this.data.days[val[2]],
    })
  },
  confirm:function(){
    this.setData({
      isShow:false
    })
  }
  // -----------------
})