// app.js
App({
  onLaunch() {
    // 展示本地存储能力
    const logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)
    // 获取手机基本信息
    const info = wx.getSystemInfoSync()
    const {screenWidth, screenHeight, statusBarHeight} = {...info}
    Object.assign(this.globalData, {screenWidth, screenHeight, statusBarHeight})
    console.log(info, '设备信息')

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
  },
  globalData: {
    userInfo: null,
    screenWidth: 0,
    screenHeight: 0,
    statusBarHeight: 0,
    navBarHeight: 44,
  }
})
