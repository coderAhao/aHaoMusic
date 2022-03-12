// components/song-list-item/index.js
import { commonMusic } from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    songDetail: {
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
    switchToPlay(options) {
      const id = options.currentTarget.dataset.item.id
      const index = options.currentTarget.dataset.index
      console.log(id)
      wx.navigateTo({
        url: `/pages/play-music/index?id=${id}`,
      })
      commonMusic.dispatch('changeCurrentId', '', index, this.properties.songDetail)
    }
  }
})
