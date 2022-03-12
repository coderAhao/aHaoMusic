// components/song-list/index.js
import { rankingStore } from '../../store/index'
import { getSongDetail } from '../../api/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    info: {},
    songArr: [],
    songDetail: [],
    scrollSwitch: false,
    songDetailName: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.id && options.index) {
      this.getHasCoverSong(options)
    }
    console.log(options, '当前数据')
    this.getSongDetail(options.id)
  },
  // 从滚动歌单跳转过来的
  getHasCoverSong(options) {
    this.setData({scrollSwitch: true})
    this.getCommonData()
    const target = this.data.songArr.find(item => item.id == options.id)
    if (target) {
      this.setData({info: target})
    }
  },
  // 获取共享的数据
  getCommonData() {
    rankingStore.onState("hotSong", res => {
      this.data.songArr.push(...res)
    })
    rankingStore.onState("ancientStyle", res => {
      this.data.songArr.push(...res)
    })
    rankingStore.onState("chineseSong", res => {
      this.data.songArr.push(...res)
    })
  },
    // 获取歌单详情
    getSongDetail(val) {
      getSongDetail({id: val})
        .then(res => {
          console.log(res, '详情')
          // console.log(res.playlist.tracks, '歌单详情')
          this.setData({songDetail: res.playlist.tracks, songDetailName: res.playlist.name})
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