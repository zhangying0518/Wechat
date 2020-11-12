//index.js
//获取应用实例
const app = getApp()
import {
  request
} from '../../request/index.js';
Page({
  data: {
    swiperList: [],
  },
  QueryParams: { //该接口所需要的参数
    query: "",
    cid: "",
    pagenum: 1,
    pagesize: 10
  },
  click() {
    this.QueryParams.pagenum++

  },
  onLoad: function (options) {
    this.swiperList()
  },
  // 实例请求
  async getGoodsList() {
    const res = await request({
      url: '/goods/search',
      data: this.QueryParams
    })
    this.setData({
      swiperList: [...this.data.swiperList, ...res.goods]
    })
  },
  async swiperList() {
    const res = await request({
      url: '/home/swiperdata'
    }) //执行这行代码请求没有回来是不会往下执行的，这就是await
    console.log("res", res)
    this.setData({
      swiperList: res
    })
  },

})