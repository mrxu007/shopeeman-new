export default class MarketManagerAPI {
  constructor(that) {
    this._this = that
  }

  // 置顶商品
  async topGoods(goodsinfo) {
    try {
      const { country, mallId, goodsID } = goodsinfo
      const params = {
        mallId: mallId,
        id: goodsID
      }
      const res = await this._this.$shopeemanService.postChinese(country, '/api/v3/product/boost_product/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const des = JSON.parse(JSON.parse(res).data)
      let ecode = des.code || des.errcode
      if (des.errcode) {
        ecode = des.errcode
      } else {
        ecode = des.code
      }
      const data = des.data
      const message = des.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
  //店铺优惠卷
  async Mallvoucher(goodsinfo) {
    try {
      const { country, mallId, offset,limit } = goodsinfo
      const params = {
        mallId: mallId,
        offset: offset,
        limit: limit, //pageSize:0-1000
        promotion_type: 0
      }
      const res = await this._this.$shopeemanService.getChinese(country, '/api/marketing/v3/voucher/list/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      let ecode=data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
}
