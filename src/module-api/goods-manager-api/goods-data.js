export default class GoodsManagerAPI {
  constructor(that) {
    this._this = that
    this.mallList = []
  }

  // 同步数据
  async getSkuList(goodsinfo) {
    try {
      const { country, page_number, mallId, page_size } = goodsinfo
      const params = {
        page_number: page_number,
        mallId: mallId,
        page_size: page_size,
        source: 'seller_center',
        version: '1.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/v3/mpsku/get_mpsku_list/?', params, {
        headers: {
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'Accept-Encoding': 'gzip, deflate, br',
          'Accept-Language': 'zh-CN,zh;q=0.9'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code ? des.code : des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
}

