import {
  request,
  requestPayment,
  showToast
} from "../../request/index"
Page({
  data: {
    address: {}, //收货地址对象
    cart: [], //购物车数据数组
    totalNum: "", //总数量
    totalPrice: "", //总价格
  },

  onShow() {
    this.cartMethod()
    this.addressMethod()
  },
  // 地址数据显示逻辑函数
  addressMethod() {
    const address = wx.getStorageSync('address')
    this.setData({
      address,
    })
  },
  // 购物车数据显示逻辑函数
  cartMethod() {
    // 获取缓存中的购物车数组  
    let cart = wx.getStorageSync('cart')
    // 过滤后的购物车数组 就是过滤到购物车里面所有的checked为true的商品
    cart = cart.filter(v => v.checked) // 1.从缓存获取到购物车数据,渲染到页面，但是这些数据必须是checked=true的才渲染
    let totalPrice = 0
    let totalNum = 0
    cart.forEach(v => {
      totalPrice += v.num * v.goods_price
      totalNum += v.num
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
    })
  },
  // 微信支付
  async goPay() {
    try { //支付成功，每一个环节都不出问题的情况执行
      // 一.创建订单
      // 1.先判断缓存中有没有token
      var token = wx.getStorageSync('token')
      // 2.没有就到授权页面进行授权获取token
      if (!token) {
        wx.navigateTo({
          url: '/pages/authy/authy',
        })
        return
      }
      // 3.有就执行下面的流程创建订单‘
      // 3.1准备相关参数
      const order_price = this.data.totalPrice
      const consignee_addr = this.data.address.all
      const cart = this.data.cart
      let goods = []
      cart.forEach(v => {
        goods.push({
          goods_id: v.goods_id,
          goods_number: v.num,
          goods_price: v.goods_price
        })
      })
      const orderPatams = {
        order_price,
        consignee_addr,
        goods
      }
      // 4.创建订单，其实就是发请求，获取订单编号字段
      const orderNumber = await request({ //这个接口就有订单字段
        url: "/my/orders/create",
        method: "post",
        data: orderPatams
      })
      // 二.准备预支付
      // 5.发起预支付接口
      const {
        pay
      } = await request({ //调微信内置支付接口wx.requestPayment的时候需要很多参数 ，所以这个接口目的就是为了获取支付需要的参数
        url: "/my/orders/req_unifiedorder",
        method: "post",
        data: {
          order_number: "0000"
        }
      })
      // 三.发起微信支付
    //  6. 发起微信支付
      const wxpay = await requestPayment(pay) //这里会直接吊起微信支付，付款成功后会返回一个值表示支付成功
      console.log("res", wxpay)
      // 四.查询后台订单状态
      // 7.查询后台订单状态
      const payState = await request({ //调微信内置支付接口wx.requestPayment的时候需要很多参数 ，所以这个接口目的就是为了获取支付需要的参数
        url: "/my/orders/chkOrder",
        method: "post",
        data: {
          order_number: "0000"
        }
      })
      console.log("payState", payState) //这个接口正常的话会返回支付成功
      await showToast({
        title: "支付成功"
      })
       // 8.支付成功，要手动删除缓存中的订单商品，因为已经支付了，所以不能再存在购物车
       let newCart = wx.getStorageSync('cart')
       newCart = newCart.filter(v=>!v.checked)
       wx.setStorageSync('cart', newCart)
      // 9.然后跳转到订单页面
      wx.navigateTo({
        url: '/pages/order/order',
      })
    } catch (err) { //支付异常
      await showToast({
        title: "支付失败"
      })
    }
  }
})