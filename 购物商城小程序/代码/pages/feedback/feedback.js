// pages/feedback/feedback.js
Page({
  data: {
    tabs: [{
        id: 0,
        value: "体验问题",
        isActive: true
      },
      {
        id: 1,
        value: "商品，商家投诉",
        isActive: false
      }
    ],
    textVal: "",
    chooseImgs: []
  },
  upLoadImgs: [], //外网的图片路径
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
  // 选择图片
  handleChooseImg() {
    wx.chooseImage({
      count: 9,
      sizeType: ['original', 'compressed'],
      sourceType: ['album', 'camera'],
      success: (result) => {
        this.setData({
          chooseImgs: [...this.data.chooseImgs, ...result.tempFilePaths]
        })
      }
    })
  },
  // 点击图片的删除标志
  handleRemoveImg(e) {
    var {
      index
    } = e.currentTarget.dataset
    let {
      chooseImgs
    } = this.data
    chooseImgs.splice(index, 1)
    this.setData({
      chooseImgs
    })
  },
  // 文本域输入内容
  handleTextInput(e) {
    this.setData({
      textVal: e.detail.value
    })
  },
  // 提交按钮
  handleFormSubmit() {
    const {
      textVal,
      chooseImgs
    } = this.data
    if (!textVal.trim()) {
      wx.showToast({
        title: '输入不合法',
        icon: "none",
        mask: true
      })
      return
    }
    wx.showLoading({
      title: '正在上传中',
      mask: true
    })
    // 上传图片,uploadFile这个api只能一张一张的上传图片，而这里有多张图片，所以只能通过循环一张纸的上传
    console.log("chooseImgs.length",chooseImgs.length)
    if (chooseImgs.length!==0) {
      chooseImgs.forEach((v, i) => {
        wx.uploadFile({
          filePath: v, //被上传的文件路径
          name: 'file', //上传文件的名称，后台通过这个名称来获取文件，前后端约定好就可以
          url: 'https://images.ac.cn/Home/Index/UploadAction/', //图片要上传到哪个接口
          success: (res) => { //该文件上传接口有问题 这里只是模仿一下
            wx.hideLoading()
            let url = JSON.parse(res.data).url
            this.upLoadImgs.push(url)
            if (i == chooseImgs.length - 1) { //表示所有图片都上传完
              this.setData({
                textVal: "",
                chooseImgs: []
              })
              wx.navigateBack({
                delta: 1,
              })
            }
          }
        })
      })
    } else {
      console.log("上传中")
      wx.hideLoading()
      wx.navigateBack({
        delta: 1,
      })
    }
  }
})