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
      debugger
      const res = await this._this.$shopeemanService.postChinese(country, '/api/v3/product/boost_product/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      debugger
      const des = JSON.parse(JSON.parse(res).data)
      // let ecode = des.code || des.errcode
      // if (des.errcode) {
      //   ecode = des.errcode
      // } else {
      //   ecode = des.code
      // }
      const ecode = des.code
      const message = des.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
  // 店铺优惠卷
  async Mallvoucher(goodsinfo) {
    try {
      const { country, mallId, offset, limit, promotion_type } = goodsinfo
      const params = {
        mallId: mallId,
        offset: offset,
        limit: limit, // pageSize:0-1000
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
      const ecode = data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
  // 店铺优惠卷-停止
  async MallvoucherStop(goodsinfo) {
    try {
      const { country, mallId, voucher_id } = goodsinfo
      const params = {
        mallId: mallId,
        voucher_id: voucher_id
      }
      const res = await this._this.$shopeemanService.putChinese(country, '/api/marketing/v3/voucher/stop/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
  // 店铺优惠卷-删除
  async MallvoucherDel(goodsinfo) {
    try {
      const { country, mallId, voucher_id } = goodsinfo
      const params = {
        mallId: mallId,
        voucher_id: voucher_id
      }
      const res = await this._this.$shopeemanService.deleteChinese(country, '/api/marketing/v3/voucher/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept-Encoding': 'gzip, deflate',
          referer: `/portal/marketing/vouchers/${voucher_id}`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
  // 店铺优惠卷-创建
  async MallvoucherCreate(goodsinfo) {
    try {
      const { country, mallId, min_price, name, value,
        end_time, start_time, max_value, discount, usage_quantity, claim_quantity,
        rule, voucher_code } = goodsinfo
      const params = {
        mallId: mallId,
        min_price: min_price,
        name: name,
        value: value,
        end_time: end_time,
        start_time: start_time,
        max_value: max_value,
        discount: discount,
        usage_quantity: usage_quantity,
        claim_quantity: claim_quantity,
        rule: {
          voucher_landing_page: rule.voucher_landing_page,
          reward_type: rule.reward_type,
          hide: rule.hide,
          backend_created: rule.backend_created,
          items: rule.items, // items=[]格式
          coin_cashback_voucher: {
            coin_percentage_real: rule.coin_cashback_voucher.coin_percentage_real,
            max_coin: rule.coin_cashback_voucher.max_coin
          }
        },
        voucher_code: voucher_code

      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/marketing/v3/voucher/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          referer: `/portal/marketing/vouchers/new?edit=shop`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.errcode || data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `MallvoucherCreate-catch: ${error}` }
    }
  }

  // 官网获取userName
  async getShoppUserName(goodsinfo) {
    try {
      const { country, platform_mall_id } = goodsinfo
      const params = {
        mallId: platform_mall_id
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/selleraccount/user_info/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/settings/shop/profile`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data).data
      // let ecode=data.errcode
      // const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { data }
    } catch (error) {
      return { code: -2, data: `getShoppUserName-catch: ${error}` }
    }
  }

  // 关注礼-列表
  async FollowPrize(goodsinfo) {
    try {
      const { country, mallId, offset, limit, promotion_type } = goodsinfo
      const params = {
        mallId: mallId,
        offset: offset,
        limit: limit, // pageSize:0-1000
        promotion_type: promotion_type
      }
      const res = await this._this.$shopeemanService.getChinese(country, 'api/marketing/v4/follow_prize/list/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': 'gzip, deflate'
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `getSkuList-catch: ${error}` }
    }
  }
}
