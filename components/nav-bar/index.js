// components/nav-bar/index.js
const globalData = getApp().globalData
Component({
  /**
   * 组件的属性列表
   */
  options: {
    multipleSlots: true
  },
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    defaultTitle: '默认标题',
    statusBarHeight: globalData.statusBarHeight,
    navBarHeight: globalData.navBarHeight,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    clickGoBack() {
      wx.navigateBack({})
    }
  }
})
