// pages/play-music/index.js
import {getPlayMusic, getLyric} from '../../api/music'
import { audioContext, commonMusic } from '../../store/index'
const globalData = getApp().globalData
Page({

  /**
   * 页面的初始数据
   */
  data: {
    songId: null,
    songInfo: {},
    currentIndex: 0,
    contentHeight: 0,
    isSliderChange: false,
    isPlay: true,
    sliderValue: 0, // 当前滑块值
    durationTime: 0, // 总时长 毫秒
    currentTime: 0, // 当前进度 毫秒
    lyric: '',
    showLyric: '',
    activeIndex: 0,
    topHeight: 0,
    modeList: ['order', 'random', 'repeat'],
    modeValue: 0,
    noPlay: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.switch) {
      this.setData({noPlay: true})
    }
    const {screenHeight, statusBarHeight, navBarHeight} = {...globalData}
    const contentHeight = screenHeight - statusBarHeight - navBarHeight 
    // this.setData({songId: options.id, contentHeight})
    this.setData({contentHeight})
    this.getPlayMusic(options.id)
  },
  // 请求歌曲播放
  getPlayMusic(ids) {
    this.setData({songId: ids})
    this.getLyric()
    getPlayMusic({ids})
      .then(res => {
        const songInfo = res.songs[0]
        const durationTime = res.songs[0].dt
        this.setData({songInfo, durationTime})
        console.log(this.data.songInfo, '获取的播放音乐')
        const id = this.data.songInfo.id
        this.createSong(id)
      })
  },
  // 请求歌词
  getLyric() {
    getLyric({id: this.data.songId})
      .then(res => {
        console.log(res, '歌词')
        const lyric = res.lrc.lyric
        this.setData({lyric})
        this.parseLyric()
      })
  },
  // 解析歌词
  parseLyric() {
    const lyricStr = this.data.lyric.split('\n')
    // console.log(lyricStr, '解析的歌词')
    const regExp = /\[(\d{2}):(\d{2}\.\d{2,3})\]/
    const lyric = []
    for (const item of lyricStr) {
      const itemRes = regExp.exec(item)
      if(!itemRes) continue
      const minute = itemRes[1] * 60 * 1000
      const second = itemRes[2] * 1000
      const timeStr = minute + second
      const textStr = item.replace(regExp, '')
      lyric.push({timeStr, textStr})
    }
    this.setData({lyric})
    console.log(lyric, '解析后的歌词')
  },
  // 时间匹配歌词
  matchLyric(time) {
    const lyric = this.data.lyric
    if (!(lyric && lyric.length > 0)) return
    let index = 0
    const target = lyric.find((item,i) => {
      if(time <= Number(item.timeStr)) {
        index = i === 0 ? 0 : i - 1
        return true
      }  
    })
    if(target) {
      // const showLyric = target.textStr
      const showLyric = this.data.lyric[index].textStr
      this.setData({showLyric, activeIndex: index, topHeight: 35 * index})
    }
  },
  // 创建歌曲实例
  createSong(id) {
    if (!this.data.noPlay) {      
      audioContext.stop()
      audioContext.src = `https://music.163.com/song/media/outer/url?id=${id}.mp3`
      audioContext.autoplay = true
      audioContext.loop = false
    }
    this.setData({noPlay: 0})
    audioContext.onCanplay(() => {
      const isPlay = this.data.isPlay
      if(isPlay) {
        audioContext.play()
      } else {
        audioContext.pause()
      }
      console.log('开始播放')
    })
    audioContext.onTimeUpdate(() => {
      const currentTime = audioContext.currentTime
      const sliderValue = audioContext.currentTime / audioContext.duration * 100
      const isSliderChange = this.data.isSliderChange
      if (!isSliderChange) {
        this.setData({sliderValue, currentTime: currentTime * 1000})
      }
      this.matchLyric(currentTime * 1000)
    })
    audioContext.onEnded(() => {
      this.setData({isPlay: false})
      const modeValue = this.data.modeValue
      this.switchMusic(modeValue)
      this.getPlayMusic(this.data.songId)
      this.initData()  
    })
  },
  // 拖拽改变进度条
  changeingCurrentTime(options) {
    const sliderValue = options.detail.value
    const durationTime = this.data.durationTime
    const currentTime = sliderValue / 100 * durationTime
    this.setData({currentTime, isSliderChange: true})
  },
  // 拖拽完成
  changeCurrentTime(options) {
    const sliderValue = options.detail.value
    const durationTime = this.data.durationTime
    const currentTime = sliderValue / 100 * durationTime
    audioContext.pause()
    audioContext.seek(currentTime / 1000)
    this.setData({currentTime, isSliderChange: false})
  },
  // 暂停/播放
  playOrPause() {
    const isPlay = this.data.isPlay
    if(isPlay) {
      audioContext.pause()
    } else {
      audioContext.play()
    }
    this.setData({isPlay: !isPlay})
  },
  // 切换歌曲歌词
  swiperChange(option) {
    console.log(option)
    const currentIndex = option.detail.current
    this.setData({currentIndex})
  },
  // 切换播放模式
  clickMode() {
    let modeValue = this.data.modeValue
    modeValue = modeValue === 2 ? 0 : modeValue + 1
    this.switchMusic(modeValue)
    this.setData({modeValue})
  },
  switchMusic(modeValue) {  
    let id = null
    let i = null
    const {index, musicList} = {...commonMusic.state}
    if (modeValue === 0) {
      i = index === musicList.length - 1 ? 0 : index + 1
      id = musicList[i].id
    } else if(modeValue === 1) {
      i = Math.floor(Math.random() * musicList.length)
      id = musicList[i].id
    } else {
      id = this.data.songId
      i = index
    }
    commonMusic.dispatch('changeCurrentId', id, i)
    this.setData({songId: id})
    console.log(i, '播放完成')
  },
  // 点击上/下一首
  clickNext(options) {
    console.log(options)
    const val = options.currentTarget.dataset.val
    const {index, musicList} = {...commonMusic.state}
    let i = 0
    console.log(index, 'index')
    if (val) {
      i = index === musicList.length - 1 ? 0 : index + 1
      console.log(i, '---')
    } else {
      i = index === 0 ? musicList.length - 1 : index - 1
      console.log(i, '+++')
    }
    console.log(musicList)
    console.log(i, 'i---------')
    const id = Number(musicList[i].id)
    console.log(id, '++++++++++++')
    this.getPlayMusic(id)
    commonMusic.dispatch('changeCurrentId', id, i)
    this.initData()
  },
  // 初始化data数据
  initData() {
    this.setData({
      sliderValue: 0,
      currentTime: 0,
      isPlay: true
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