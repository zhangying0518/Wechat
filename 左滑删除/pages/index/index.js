Page({
  /**
   * 页面的初始数据
   */
  data: {
      list: [
          { id: "0001", title: "商品1" },
          { id: "0002", title: "商品2" },
      ],
      startX: 0,        // 开始X坐标
      startY: 0,        // 开始Y坐标

  },

  // 手指触摸动作开始
  touchStart: function(e){
      let that = this;
      //开始触摸时 重置所有删除
      that.data.list.forEach(function (v, i) {
          if (v.isTouchMove) v.isTouchMove = false; // 只操作为true的
      })
      // 记录手指触摸开始坐标
      that.setData({
          startX: e.changedTouches[0].clientX,  // 开始X坐标
          startY: e.changedTouches[0].clientY,  // 开始Y坐标
          list: that.data.list
      })
  },

  // 手指触摸后移动
  touchMove: function(e){
    console.log("list",this.data.list)
      let that = this,
          index = e.currentTarget.dataset.index,    // 当前下标
          startX = that.data.startX,                // 开始X坐标
          startY = that.data.startY,                // 开始Y坐标
          touchMoveX = e.changedTouches[0].clientX, // 滑动后变化的坐标
          touchMoveY = e.changedTouches[0].clientY, // 滑动后变化的坐标
          // 获取滑动角度
          angle = that.angle({ X: startX, Y: startY }, { X: touchMoveX, Y: touchMoveY });
　　　　　// 判断滑动角度
      that.data.list.forEach(function (v, i) {
          v.isTouchMove = false
          // 滑动超过30度角 return
          if (Math.abs(angle) > 30) return;
          if (i == index) {
              // 右滑
              if (touchMoveX > startX) 
                  v.isTouchMove = false
              // 左滑
              else 
                  v.isTouchMove = true
          }
    })
    // 更新数据
    that.setData({
        list: that.data.list
    })
  },

  // 计算滑动角度
  angle: function (start, end) {
      let that = this,
          _X = end.X - start.X,
          _Y = end.Y - start.Y;
      // 返回角度 /Math.atan()返回数字的反正切值
      return 360 * Math.atan(_Y / _X) / (2 * Math.PI);
  },

  // 删除
  delList: function(e){
      let that = this,
          index = e.currentTarget.dataset.index;  // 当前下标
　　　　　// 切割当前下标元素，更新数据
      that.data.list.splice(index, 1); 
      that.setData({
          list: that.data.list
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {}
})