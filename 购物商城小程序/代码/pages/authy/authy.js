import {
  login,
  request
} from "../../request/index"
Page({
  data: {},
  onLoad: function (options) {},
  async handleGetUserInfo(e) {
    try { //try里面放正常逻辑代码
      const { encryptedData,rawData,iv,signature} = e.detail  // 1.获取用户信息
      const { code } = await login()      // 2.获取小程序登录成功后的code
      const loginParams = {encryptedData,rawData,iv,signature,code}
      // 3.获取用户的token,该appid获取不到token，这里暂时写一个死的
      const res = await request({ url: "/users/wxlogin",data: loginParams,method: "post" })
      const token = "jor9rA8vC4bO0QCR28dnh2vfMN8cX3cFR83BFaKh5IiYjvflC+KUBigPsyWhFPcI"
      wx.setStorageSync('token', token)
      wx.navigateBack({delta: 1,})
    } catch (err) { //catch里面放异常处理
      console.log("err", err)
    }
  }
})