import {
  request
} from '../../request/index.js';
Page({
  data: {
    tabs: [{
        id: 0,
        value: "综合",
        isActive: true
      },
      {
        id: 1,
        value: "销量",
        isActive: false
      },
      {
        id: 2,
        value: "价格",
        isActive: false
      }
    ],
    goodList: []
  },
  QueryParams: {
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  }, //分类数据参数
  totalPages: 1, //总页数
  onLoad: function (options) {
    this.QueryParams.cid = options.cid
    this.getCategoryDatas()
  },
  // 用户上滑页面 滚动条触底 开始加载下一页数据
  onReachBottom() {
    if (this.QueryParams.pagenum > this.QueryParams) { //没有数据
      wx.showToast({
        title: '没有更多数据了',
      })
    } else { //还有数据
      this.QueryParams.pagenum++
      this.getCategoryDatas()
    }
  },
  // 下拉刷新
  onPullDownRefresh(){
    this.setData({
      goodList:[]
    })
    this.QueryParams.pagenum = 1
    this.getCategoryDatas()
  },
  // 接收tabs组件传过来的值
  handTabsItemChange(e) {
    let {
      index
    } = e.detail
    let {
      tabs
    } = this.data
    tabs.forEach((v, i) => {
      i === index ? v.isActive = true : v.isActive = false
    })
    this.setData({
      tabs
    })
  },
  async getCategoryDatas() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    const total = res.total
    this.totalPages = Math.ceil(total / this.QueryParams.pagesize)
    this.setData({
      goodList: [...this.data.goodList, ...res.goods]
    })
    wx.stopPullDownRefresh()//停止下拉刷新
  },
})