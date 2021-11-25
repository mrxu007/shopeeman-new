/** 爆款选品 */

export default class PopularSelectionApi {
  constructor(that) {
    this._this = that
  }
  // 获取电霸数据
  async tokenDianBdata(userinfo) {
    try {
      const params = userinfo
      const res = await this._this.$shopeemanService.getChineseLaiZan('http://open.dianba6.com/?', params, { // options
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate',
          'Accept-Language': 'zh-CN,zh;q=0.9',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/95.0.4638.69 Safari/537.36'
        }
      })
      console.log('第三方', JSON.parse(res))
      //   const data = JSON.parse(res)
      //   const des = JSON.parse(data.data)
      return { code: des.code, data: des.data, message: des.message }
    } catch (error) {
      return { code: -2, data: `refreshAccessToken-catch: ${error}` }
    }
  }
}

