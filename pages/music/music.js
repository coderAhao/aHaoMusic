// pages/music/music.js
import { getSwiperBanner } from '../../api/music'
import { queryRect, throttle } from '../../utils/util'
import { rankingStore, commonMusic, audioContext } from '../../store/index'
import { getRankingData } from '../../api/music'
const throttleQueryRect = throttle(queryRect)
Page({

  /**
   * 页面的初始数据
   */
  data: {
    swiperBanner: [], // 轮播图列表
    imgHeight: 0, // 图片加载后的高度
    rankingList: [], // 推荐歌曲列表
    hotList: [], // 热门歌曲列表
    ancientList: [], // 古风歌曲列表
    chineseList: [], // 华语歌曲列表
    allSong: [], // 巅峰榜三个榜歌单
    picUrl: '',
    musicName: '',
    currentId: null,
    isPlay: true,
    showPlay: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getSwiperBanner()
    this.getCommonData()

    // 发起共享数据请求
    rankingStore.dispatch("getSongList", 3)
    rankingStore.dispatch("getSongList", 0, '古风')
    rankingStore.dispatch("getSongList", 1, '华语')

    // 从store中获取共享的数据
    this.setSongList("hotSong", "hotList")
    this.setSongList("ancientStyle", "ancientList")
    this.setSongList("chineseSong", "chineseList")

    this.getSongList(0) // 新歌榜
    this.getSongList(2) // 原创
    this.getSongList(3) // 飙升
  },
  // 点击搜索跳转到搜索页
  clickSearch() {
    wx.navigateTo({
      url: '/pages/search-music/index',
    })
  },
  // 请求轮播图
  getSwiperBanner() {
    getSwiperBanner({type: 2})
      .then(res => {
        console.log(res, '轮播图列表')
        this.setData({swiperBanner: res.banners})
      })
  },
  // 监听轮播图图片加载完成
  handleImgLoaded() {
    // const query = wx.createSelectorQuery()
    // query.select('.swiper-img').boundingClientRect()
    // query.exec(res => {
    //   const rect = res[0]
    //   this.setData({imgHeight: rect.height})
    // })
    // 将动态获取高度的方法抽出去
    // 动态获取的方法是异步，因此封装时需要return为promise
    // queryRect('.swiper-img').then(res => { // 不节流的话直接用动态获取高度的方法
    throttleQueryRect('.swiper-img').then(res => {
      this.setData({imgHeight: res[0].height})
    })
  },
  // 请求共享的数据，即推荐歌曲
  getCommonData() {
    rankingStore.dispatch('getRankingData')
    rankingStore.onState('hotRanking', res => {
      console.log(res)
      if (res.playlist && res.playlist.tracks) {
        const list = res.playlist.tracks.slice(0, 6)
        this.setData({rankingList: list})
        console.log(list)
      }
    })
  },
  // 抽取方法设置滚动歌单列表
  setSongList(dataName, valName) {
    rankingStore.onState(`${dataName}`, res => {
      this.setData({[valName]: res})
    })
  },
  // 请求新歌、原创和飙升歌曲
  getSongList(val) {
    getRankingData({idx: val})
      .then(res => {
        console.log(res, '获取的歌曲123456')
        const {name, id, playCount, coverImgUrl} = {...res.playlist}
        const obj = {name, id, playCount, coverImgUrl}
        obj.tracks = res.playlist.tracks.slice(0, 3)
        const arr = [...this.data.allSong, obj]
        this.setData({allSong: arr})
        console.log(this.data.allSong, 'allsong')
      })
  },
   // 点击巅峰榜进行跳转
   clickBillBoard(options) {
     const id = options.currentTarget.dataset.id
     wx.navigateTo({
       url: `/pages/song-list/index?id=${id}`,
     })
    console.log(options, '123')
   },
  //  获取正在播放的音乐
  getIsPlaying() {
    const {currentId,index, musicList} = {...commonMusic.state}
    if (!(musicList && musicList.length > 0)) return
    const picUrl = musicList[index].al.picUrl
    const musicName = musicList[index].al.name
    console.log(picUrl, 'picurl')
    this.setData({currentId,picUrl,musicName})
  },
  // 点击播放/暂停
  clickSwitch(options) {
    console.log(options, 'options')
    const val = options.currentTarget.dataset.val
    let isPlay = true
    if (val === 1) {
      isPlay = false
      audioContext.pause()
    } else {
      audioContext.play()
    }
    this.setData({isPlay})
    console.log(isPlay)
  },
  // 是否显示播放界面
  showPlayContent() {
    const list = commonMusic.state.musicList
    if(list && list.length > 0) {
      this.setData({showPlay: true})
    }
  },
  // 跳转到播放页
  switchToPlay() {
    const id = this.data.currentId
    wx.navigateTo({
      url: `/pages/play-music/index?id=${id}&switch=1`,
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
    this.getIsPlaying()
    this.showPlayContent()
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