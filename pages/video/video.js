// pages/video/video.js
import { topMv } from '../../api/mv'
Page({
  /**
   * 页面的初始数据
   */
  data: {
    topMVs: [],
    hasMore: true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getListData()  
  },
  // 请求数据
  getListData(type = 0, offset = 0) { // 0刷新 1加载更多 offset/10 为第几页
    if(type && !this.data.hasMore) return
    wx.showNavigationBarLoading()
    topMv({limit: 12, offset})
      .then(res => {
        console.log(res)
        this.setData({
          hasMore: res.hasMore
        })
        const newData = res.data
        if(!type) {
          this.setData({topMVs: newData})
          setTimeout(() => {
            wx.stopPullDownRefresh()
          }, 800)
        } else {
          this.setData({topMVs: [...this.data.topMVs, ...newData]})
        }
      })
      .catch(() => {})
      .finally(() => {wx.hideNavigationBarLoading()})
  },
  // 点击跳转到视频页
  handleVideoItemClick(e) {
    const id = e.currentTarget.dataset.item.id
    wx.navigateTo({
      url: `/pages/detail-video/index?id=${id}`,
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.getListData(0, Math.floor(Math.random() * 4) * 10)
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    console.log(123)
    this.getListData(1, this.data.topMVs.length)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})