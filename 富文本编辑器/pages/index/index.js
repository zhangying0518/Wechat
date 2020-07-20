const app = getApp();

Page({
  data: {
    formats: {},
    bottom: 0,
    readOnly: false,
    placeholder: '开始编辑介绍吧...',
    _focus: false,
    textTool: false, //文本工具
    options: {},
    introduce_html: '', //富文本
    // btnActive:false,
    zwloading: true,
  },

  onLoad(options) {
   
    wx.loadFontFace({
      family: 'Pacifico',
      source: 'url("https://sungd.github.io/Pacifico.ttf")'
    })
  },

  //富文本工具点击事件
  toolEvent(res) {
    let tool_name = res.currentTarget.dataset.tool_name;
    switch (tool_name) {
      case 'insert_image': //插入图片
        this.insertImage();
        break;
      case 'show_texttool': //展示文字编辑工具
        this.showTextTool();
        break;
      case 'undo': //撤退（向前）
        this.undo();
        break;
      case 'redo': //撤退（向后）
        this.redo();
        break;
      case 'clear': //清除
        this.clear();
        break;
      case 'insertdate': //清除
        this.insertDate();
        break;
    }
  },

  readOnlyChange() {
    this.setData({
      readOnly: !this.data.readOnly
    })
  },

  //编辑器加载完毕
  onEditorReady() {
    wx.createSelectorQuery().select('#editor').context(res => {
      this.editorCtx = res.context;
      this.setContents('我的默认内容');
    }).exec()
  },

  setContents(rechtext) {
    this.editorCtx.setContents({
      html: rechtext,
      // delta: _rechtext.ops,
      success: res => {}
    })
  },

  undo() {
    this.editorCtx.undo()
  },

  redo() {
    this.editorCtx.redo()
  },

  format(e) {
    let {
      name,
      value
    } = e.target.dataset
    if (!name) return
    this.editorCtx.format(name, value)

  },
  onStatusChange(e) {
    const formats = e.detail
    this.setData({
      formats
    })
  },

  insertDivider() {
    this.editorCtx.insertDivider({
      success: function() {
        console.log('insert divider success')
      }
    })
  },
  clear() {
    this.editorCtx.clear({
      success: function(res) {
        console.log("clear success")
      }
    })
  },
  removeFormat() {
    this.editorCtx.removeFormat()
  },
  insertDate() {
    const date = new Date()
    const formatDate = `${date.getFullYear()}/${date.getMonth() + 1}/${date.getDate()}`
    this.editorCtx.insertText({
      text: formatDate
    })
  },
  insertImage() {
    wx.chooseImage({
      count: 1,
      success: res => {
        console.log('图片=>',res)
        this.editorCtx.insertImage({
          src: res.tempFilePaths[0],
          data: {
            id: 'abcd',
            role: 'god'
          },
          success: res => {
            console.log('insert image success')
          }
        })
      }
    })
  },

  //获取编辑器内容
  getEditorContent(res) {
    wx.showLoading({
      title: '保存中',
      mask: true,
    })
    this.editorCtx.getContents({
      success: res => {
        console.log('getEditorContent=>', res)
        wx.showToast({
          title: '保存成功',
          icon: 'success',
        })
      }
    })
  },

  bindfocus(res) {},

  bindinput(res) {
   
  },

  //show文本工具栏
  showTextTool() {
    this.setData({
      [`textTool`]: !this.data.textTool
    })
  },
  nullEvent() {},
})