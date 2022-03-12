// pages/detail-video/index.js
import { getMvUrl, getMvDetail, getRelatedMv } from '../../api/mv'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    mvUrl: null,
    mvDetail: {},
    relatedMv: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // console.log(options)
    this.getData(options.id)
    this.makeDanMu()
  },
  // 发送网络请求
  getData(id) {
    getMvUrl({id})
      .then(res => {
        console.log(res, 'url')
        this.setData({
          mvUrl: res.data.url
        })
      })
      .catch(() => {})
    getMvDetail({mvid: id})
      .then(res => {
        console.log(res, 'datail')
        this.setData({
          mvDetail: res.data
        })
      })
      .catch(() => {})
    getRelatedMv({id})
      .then(res => {
        console.log(res, 'related')
        this.setData({
          relatedMv: res.data
        })
      })
      .catch(() => {})
  },
    // 生成弹幕
    makeDanMu() {
      const text = ['哈哈哈哈哈哈','随机出现的弹幕','有意思呵呵','阿昊音乐-音乐搬运工','付出总有回报，加油！','我好渴望钱啊']
      const color = ['#ff0','#f0f','#FF1493','#F0F','00F','#0ff']
      let list = []
      for(let i = 0; i< 60; i++) {
        const obj = {}
        obj.text = text[Math.floor(Math.random() * 6)]
        obj.color = color[Math.floor(Math.random() * 6)]
        obj.time = Math.floor(Math.random() * (60 - 1 + 1) + 1)
        list.push(obj)
      }
      this.setData({danmuList: list}) 
    },
    // 点击了推荐视频
    clickItemVideo(options) {
      const id = options.currentTarget.dataset.videoid
      this.getData(id)
      // console.log(options)
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

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})