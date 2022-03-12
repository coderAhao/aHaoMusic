// components/song-swiper/index.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 点击跳转到歌单详情页
    clickSwitch(options) {
      const {itemid, itemindex } = { ...options.currentTarget.dataset }
      console.log(options.currentTarget.dataset)
      wx.navigateTo({
        url: `/pages/song-list/index?id=${itemid}&index=${itemindex}`,
      })
      console.log(options)
    }
  }
})
