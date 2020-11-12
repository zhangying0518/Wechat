import {
  request
} from '../../request/index.js';
Page({
  data: {
    leftMenuList: [], //左边数据
    rightContent: [], //右边数据
    currentIndex: 0, //左边选中的索引
    scrollTop:0,//右边内容距离顶部的距离
  },
  Cates: [], //存放接口返回的左边右边数据，左右是一个接口一起放回了，临时存放 类似用于过滤
  onLoad: function (options) {
    var Cates = wx.getStorageSync('cates')
    if (!Cates) { //没有缓存就发请求
      this.getCategoryDatas()
    } else { //有缓存
      if (Date.now() - Cates.time > 1000 * 10) { //如果请求过期就用缓存的数据，暂时定的过期时间是10s
        this.getCategoryDatas()
      }else{//没有过期
        this.Cates = Cates.data
        let leftMenuList = this.Cates.map(v => v.cat_name)
        let rightContent = this.Cates[0].children
        this.setData({
          leftMenuList,
          rightContent
        })
      }
    }
  },
  handleItemTap(e) {// 点击左边菜单
    var {index} = e.currentTarget.dataset
    let rightContent = this.Cates[index].children
    this.setData({
      currentIndex: index,
      rightContent,
      scrollTop:0
    })
  },
  // 分类数据
  async getCategoryDatas() {
    const res = await request({
      url: '/categories'
    })
    this.Cates = res
    wx.setStorageSync('cates', {
      time: Date.now(),
      data: this.Cates
    }) //数据请求成功之后存一下数据，下次在一定时间内再请求就不用重发发请求
    let leftMenuList = this.Cates.map(v => v.cat_name)
    let rightContent = this.Cates[0].children
    this.setData({
      leftMenuList,
      rightContent
    })
  },
})