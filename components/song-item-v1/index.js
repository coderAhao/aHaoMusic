// components/song-item-v1/index.js
import {commonMusic} from '../../store/index'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    rankingList: {
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
    clickItem(options) {
      console.log(options)
      console.log(this.properties.rankingList, '传值')
      const id = options.currentTarget.dataset.id
      const index = options.currentTarget.dataset.index
      const list = this.properties.rankingList
      commonMusic.dispatch("changeCurrentId", id, index, list)
      wx.navigateTo({
        url: `/pages/play-music/index?id=${id}`,
      })
    }
  }
})
