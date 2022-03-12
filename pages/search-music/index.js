// pages/search-music/index.js
import { getKeyWord, searchSong, getSearchResult } from '../../api/music'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    keyWordList: [], // 热门文字
    songList: [], // 搜索结果
    songNodes: [], // 搜索结果转为富文本
    searchWord: '', // 搜索时输入的文字
    showKeyWord: true, // 默认展示热词
    songResult: [], // 根据歌名搜索的结果
    offset: 1,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getKeyWord()
    this.searchSong()
  },
  // 热门搜索文字
  getKeyWord() {
    getKeyWord()
      .then(res => {
        console.log(res, '关键字列表')
        this.setData({keyWordList: res.result.hots})
      })
  },
  // 热门搜索文字被点击
  clickTipWord(options) {
    const word = options.target.dataset.tipword
    this.setData({searchWord: word})
    console.log(options)
    this.getSearchResult()
  },
  // 点击取消
  clickCancel() {
    this.setData({searchWord: null, songResult: []})
  },
  // 联想的结果被点击
  clickResultWord(options) {
    const index = options.currentTarget.dataset.resultword
    const searchWord = this.data.songList[index].keyword
    this.setData({searchWord})
    this.getSearchResult()
  },
  // 搜索歌曲
  searchSong(event) {
    console.log(event)
    if(!event || (event && !event.detail)) {
      this.setData({searchWord: '', showKeyWord: true, songResult: []})
      return
    }
    const keywords = event.detail
    this.setData({searchWord: keywords, showKeyWord: false})
    searchSong({type: 'mobile',keywords})
      .then(res => {
        console.log(res, '搜索的歌曲列表')
        const result = res.result.allMatch
        this.setData({songList: result})
        const songNodes = []
        const songListNode = result.map(item => item.keyword)
        for (const keyword of songListNode) {
          const nodes = []
          if (keyword.startsWith(keywords)) {
            const key1 = keyword.slice(0,keywords.length)
            const key2 = keyword.slice(keywords.length, keyword.length)
            const node1 = {
              name: 'span',
              attrs: { style: "color: #26ce8a; font-size: 18px" },
              children: [{type: "text", text: key1}]
            }
            const node2 = {
              name: 'span',
              attrs: { style: "color: #000" },
              children: [{type: "text", text: key2}]
            }
            nodes.push(node1,node2)
          } else {
            const node = {
              name: 'span',
              attr: { style: "color: #000" },
              children: [{type: "text", text: keyword}]
            }
            nodes.push(node)
          }
          songNodes.push(nodes)
        }
        this.setData({songNodes})
        console.log(songNodes)
      })
  },
  // 根据具体歌名搜索到的列表
  getSearchResult() {
    console.log(this.data.searchWord, '具体的列表')
    const keywords = this.data.searchWord
    const offset = this.data.offset * 30
    getSearchResult({keywords, offset})
      .then(res => {
        console.log(res, '具体的列表')
        const result = res.result.songs
        const songResult = this.data.songResult
        songResult.push(...result)
        this.setData({songResult})
        console.log(this.data.songResult, '列表')
      })
  },
  // 上拉加载更多
  // onReachBottom: function() {
  //   console.log('上拉加载更多')
  //   const val = this.data.offset
  //   this.setData({offset: val + 1})
  //   this.getSearchResult()
  // },
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
    console.log('上拉加载更多')
    const val = this.data.offset
    this.setData({offset: val + 1})
    this.getSearchResult()
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})