import {
  request
} from '../../request/index.js';
import regeneratorRuntime from '../../lib/runtime/runtime'
Page({
  data: {
    goodsObj: {},
  },
  onLoad: function (options) {
    console.log("goods_id",options)
    this.getGoodsDetail(options.goods_id)
  },
  // 点击加入购物车
  handleCartAdd(){
    var goodsObj = this.data.goodsObj
    // 1.获取缓存中的购物车数组
    var cart = wx.getStorageSync('cart')||[]
    // 2.判断需要添加的这个商品数据是否存在于缓存中
    var index = cart.findIndex(v=>v.goods_id==goodsObj.goods_id)
    console.log("index",index)
    if(index==-1){//3.购物车中不存在数据，也就是第一次添加
      goodsObj.num = 1
      goodsObj.checked = true
      cart.push(goodsObj)
    }else{//4.已经存在购物车 执行num++
      cart[index].num++
    }
    // 5.把购物车重新添加到缓存中
    wx.setStorageSync('cart', cart)
    // 6.弹框提示
    wx.showToast({
      title: '加入成功',
      icon:"success",
      mask:true
    })

  },
  // 预览轮播图图片
  handlePrevewImage(e) {
    const urls = this.data.goodsObj.pics.map(v => v.pics_mid)
    const current = e.currentTarget.dataset.url
    wx.previewImage({
      current: current, // 当前点击的这张显示图片的http链接，也就是当前这张图片的地址
      urls: urls // 需要预览的图片http链接列表，也就是当前这个图片所在的数组
    })
  },
  // 详情数据
  async getGoodsDetail(id) {
    const goodsObj = await request({
      url: '/goods/detail',
      data: {
        goods_id: id
      }
    })
    this.setData({
      goodsObj
    })
  },
})