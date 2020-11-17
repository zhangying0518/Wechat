import {
  request,
} from "../../request/index"
Page({
  data: {
    goods:[],
    isFous:false,//取消按钮是否显示，默认不显示
    inputValue:""
  },
  TimeId:-1,//用作输入框的定时器，随便写一个值都可以，好像是只要是负数就行了
  handleInput(e) {
    var {
      value
    } = e.detail
    if(!value.trim()){
      this.setData({
        goods:[],
        isFous:false
      })
    }
    this.setData({
      isFous:true
    })
    clearTimeout(this.TimeId)
    this.TimeId = setTimeout(()=>{
      this.qsearch(value)
    },1000)
  },
  async qsearch(query){
    const res = await request({
      url: '/goods/search',
      data: {query},
    })
    this.setData({
      goods:res.goods
    })
  },
  // 点击取消按钮
  handleCancle(){
    this.setData({
      goods:[],
      isFous:false,
      inputValue:""
    })
  }
})