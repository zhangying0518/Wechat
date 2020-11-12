// pages/cart/cart.js
// 全选功能逻辑

Page({
  data: {
    address: {},
    cart: [],
    allChecked: false,
    totalNum: "",
    totalPrice: ""
  },
  onLoad: function (options) {},

  onShow() {
    this.cartMethod()
    // this.allCheckedMethod()
    this.addressMethod()
    this.totalPriceNum()
  },
  allCheckedMethod() { // 全选逻辑函数
    // 1.获取缓存的购物车数据
    // 2.使用every函数判断是不是购物车数组的每一条数据的checked都是true
    // 3.给data赋值
    // every函数解释 every是一个数组方法,会遍历, 遍历里面的每一项都对应的值都是true时,every方法返回true,只要有一项不为true,那么不再循环执行,直接返回false
    const cart = wx.getStorageSync('cart') || []
    const allChecked = cart.length ? cart.every(v => v.checked) : false
    this.setData({
      allChecked
    })
    // 可以把这里的全选放在totalPriceNum函数里面 因为在onShow里面两个循环浪费性能 如注释部分
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
    // 1.回到商品详情页 第一次添加商品的时候 手动添加了checked=true属性
    // 2.获取缓存中的购物车数组  
    const cart = wx.getStorageSync('cart')
    this.setData({
      cart, // 3.把购物车数据填充到data中渲染
    })
  },
  // 总价格和总数据逻辑
  totalPriceNum() {
    const cart = wx.getStorageSync('cart')
    this.setCart(cart)
    // let totalPrice = 0
    // let totalNum = 0
    // let allChecked = true
    // cart.forEach(v => {
    //   if (v.checked) {
    //     totalPrice += v.num * v.goods_price
    //     totalNum += v.num
    //   } else {
    //     allChecked = false
    //   }
    // })
    // this.setData({
    //   totalPrice,
    //   totalNum,
    //   allChecked
    // })
  },
  // 点击复选框
  handleItemChange(e) {
    // 1.获取被修改的商品的id
    const goods_id = e.currentTarget.dataset.id
    // 2.获取购物车数组
    let {
      cart
    } = this.data
    // 3.找到被修改的商品对象
    let index = cart.findIndex(v => v.goods_id === goods_id)
    // 4.选中状态取反
    cart[index].checked = !cart[index].checked
    // 6.重新计算总数量总价格
    this.setCart(cart)
  },

  // 设置购物车状态同时，重新计算，底部工具栏的数据，全选，总价格，购买数量
  setCart(cart) {
    let totalPrice = 0
    let totalNum = 0
    let allChecked = true
    cart.forEach(v => {
      if (v.checked) {
        totalPrice += v.num * v.goods_price
        totalNum += v.num
      } else {
        allChecked = false
      }
    })
    this.setData({
      cart,
      totalPrice,
      totalNum,
      allChecked
    })
     // 5.把购物车书画院重新设置回data中和缓存中
    wx.setStorageSync('cart', cart)
  },

  //点击获取收货地址
  handleChooseAddress() {
    wx.chooseAddress({
      success: (res) => {
        let address = res
        address.all = address.provinceName + address.cityName + address.countyName
        wx.setStorageSync('address', address)
      }
    })
  }
})