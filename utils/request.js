const BASE_URL = 'http://123.207.32.32:9001/'
function request(options) {
  return new Promise((resolve, reject) => {
    wx.request({
      url: BASE_URL + options.url,
      method: options.method || 'GET',
      data: options.data || {},
      success: function(res){
        resolve(res.data)
      },
      fail: reject
    })
  })
}
export default request