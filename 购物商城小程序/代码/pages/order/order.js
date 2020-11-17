import {
  request
} from '../../request/index.js';
Page({
  data: {
    orders: [
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10},
      {order_number:111111111111111111111,order_price:1998,create_price:2020-10-10}
    ],
    tabs: [{
        id: 0,
        value: "全部",
        isActive: true
      },
      {
        id: 1,
        value: "待付款",
        isActive: false
      },
      {
        id: 2,
        value: "代发货",
        isActive: false
      },
      {
        id: 3,
        value: "退款/退货",
        isActive: false
      }
    ],
  },

  onShow: function () {
    var token = wx.getStorageSync('token')
    if (!token) {
      wx.navigateTo({
        url: '/pages/authy/authy',
      })
      return
    }
    var pages = getCurrentPages() //获取当前页面栈，是一个数组,这个数组的最后一个元素里面的options就是当前页面的参数
    var currentPage = pages[pages.length - 1]
    var {
      type
    } = currentPage.options
    this.changeTitleByIndex(type-1)
    this.getOrders(type)
  },
  // 获取订单列表数据
  async getOrders(type) {
    const res = await request({
      url: "/my/orders/all",
      data: {
        type
      }
    })
    console.log(res)
  },
  // tab的标题是否被选中的封装函数
  changeTitleByIndex(index) {
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
  // 接收tabs组件传过来的值
  handTabsItemChange(e) {
    let {
      index
    } = e.detail
    this.changeTitleByIndex(index)
    this.getOrders(index+1)
  },
})