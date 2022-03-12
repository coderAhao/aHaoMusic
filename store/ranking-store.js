import {HYEventStore} from 'hy-event-store' 
import { getRankingData, getSongList} from '../api/music'
const rankingStore = new HYEventStore({
  state: {
    hotRanking: [],
    hotSong: [], // 热门
    ancientStyle: [], // 古风
    chineseSong: [], // 华语
  },
  actions: {
    getRankingData(ctx) {
      getRankingData({idx:1})
        .then(res => {
          // ctx.hotRanking = res.tracks ? res.tracks : []
          ctx.hotRanking = res
        })
    },
    getSongList(ctx, val, tag = '全部', limit = 6) {
      getSongList({cat: tag, limit})
        .then(res => {
          console.log(res, '获取的歌曲')
          const newArr = [...res.playlists]
          if(val === 3) {
            ctx.hotSong = newArr
          } else if(val === 1) {
            ctx.chineseSong = newArr
          } else {
            ctx.ancientStyle = newArr
          }
        })
    },
  
  }
})
const commonMusic = new HYEventStore({
  state: {
    currentId: '',
    index: 0,
    musicList: []
  },
  actions: {
    changeCurrentId(ctx, id, index, list) {
      if (id) {
        ctx.currentId = id
      }
      if (index !== undefined || index !== null || index !== '') {
        ctx.index = index
      }
      if (list && list.length > 0) {
        ctx.musicList = list
      }
      console.log(id,index,list, '共享id')
    }
  }
})
export { rankingStore, commonMusic }