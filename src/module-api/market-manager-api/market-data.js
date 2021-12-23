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
      const { country, mallId, offset,limit,promotion_type } = goodsinfo
      const params = {
        mallId: mallId,
        offset: offset,
        limit: limit, //pageSize:0-1000
        promotion_type: promotion_type
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
  //店铺优惠卷-停止
  async MallvoucherStop(goodsinfo) {
    try {
      const { country, mallId, voucher_id } = goodsinfo
      const params = {
        mallId: mallId,
        voucher_id:voucher_id
      }
      const res = await this._this.$shopeemanService.putChinese(country, '/api/marketing/v3/voucher/stop/?', params, {
        headers: {
          'Content-Type': 'application/json',
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
  //店铺优惠卷-删除
  async MallvoucherDel(goodsinfo) {
    try {
      const { country, mallId, voucher_id } = goodsinfo
      const params = {
        mallId: mallId,
        voucher_id:voucher_id
      }
      debugger
      const res = await this._this.$shopeemanService.deleteChinese(country, '/api/marketing/v3/voucher/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          referer: `/portal/marketing/vouchers/${voucher_id}`
        }
      })
      debugger
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
  //店铺优惠卷-创建
  async MallvoucherCreate(goodsinfo) {
    try {
      const { country, mallId, min_price,name,value,
        end_time,start_time,max_value,discount,usage_quantity,claim_quantity,
        voucher_landing_page,reward_type,hide,backend_created,
        items,coin_percentage_real,max_coin,voucher_code} = goodsinfo
      const params = {
        mallId: mallId,
        min_price:min_price,
        name:name,
        value:value,
        end_time:end_time,
        start_time:start_time,
        max_value:max_value,
        discount:discount,
        usage_quantity:usage_quantity,
        claim_quantity:claim_quantity,
        rule:{
            voucher_landing_page:voucher_landing_page,
            reward_type:reward_type,
            hide:hide,
            backend_created:backend_created,
            items:items,//items=[]格式
            coin_cashback_voucher:{
                coin_percentage_real:coin_percentage_real,
                max_coin:max_coin
            }
        },
        voucher_code:voucher_code
    
      }
      debugger
      const res = await this._this.$shopeemanService.postChinese(country, '/api/marketing/v3/voucher/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          referer: `/portal/marketing/vouchers/new?edit=shop`
        }
      })
      debugger
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
