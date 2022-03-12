import request from '../utils/request'
const api = {
  topMv: 'top/mv', // 首页mv列表
  mvUrl: 'mv/url', // mv播放地址
  mvDetail: 'mv/detail', // mv详情
  relatedMv: 'related/allVideo', // 推荐mv
}
export function topMv(options) {
  return request({
    url: api.topMv,
    method: 'GET',
    data: options
  })
}
export function getMvUrl(options) {
  return request({
    url: api.mvUrl,
    method: 'GET',
    data: options
  })
}
export function getMvDetail(options) {
  return request({
    url: api.mvDetail,
    method: 'GET',
    data: options
  })
}
export function getRelatedMv(options) {
  return request({
    url: api.relatedMv,
    method: 'GET',
    data: options
  })
}
