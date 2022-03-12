import request from '../utils/request'
const api = {
  swiperBanner: 'banner', // 轮播图
  ranking: 'top/list', // 共享的数据
  songList: 'top/playlist', // 歌曲排行
  keyWord: 'search/hot', // 搜索热门文字
  searchSongList: 'search/suggest', // 搜索歌曲
  songDetail: 'playlist/detail/dynamic', // 歌单详情
  searchResult: 'search', // 根据具体歌名搜索结果
  playMusic: 'song/detail', // 根据id获取的播放音乐
  getLyric: 'lyric', // 根据id获取的歌词
}
// 获取轮播图
export function getSwiperBanner(options) {
  return request({
    url: api.swiperBanner,
    method: 'GET',
    data: options
  })
}
// 获取巅峰榜
export function getRankingData(options) {
  return request({
    url: api.ranking,
    method: 'GET',
    data: options
  })
}
// 获取歌曲列表
export function getSongList(options) {
  return request({
    url: api.songList,
    method: 'GET',
    data: options
  })
}
// 获取搜索热门文字列表
export function getKeyWord(options) {
  return request({
    url: api.keyWord,
    method: 'GET',
    data: options
  })
}
// 搜索歌曲
export function searchSong(options) {
  return request({
    url: api.searchSongList,
    method: 'GET',
    data: options
  })
}
// 歌单详情
export function getSongDetail(options) {
  return request({
    url: api.songDetail,
    method: 'GET',
    data: options
  })
}
// 根据具体歌名搜索结果
export function getSearchResult(options) {
  return request({
    url: api.searchResult,
    method: 'GET',
    data: options
  })
}
// 根据id获取播放音乐
export function getPlayMusic(options) {
  return request({
    url: api.playMusic,
    method: 'GET',
    data: options
  })
}
// 根据id获取歌词
export function getLyric(options) {
  return request({
    url: api.getLyric,
    method: 'GET',
    data: options
  })
}

