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
      const { country, mallId, offset, limit } = goodsinfo
      const params = {
        mallId: mallId,
        offset: offset,
        limit: limit // pageSize:0-1000
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/marketing/v4/follow_prize/list/?', params, {
        headers: {
          'accept': 'application/json, text/plain, */*',
          'accept-encoding': 'gzip, deflate, br',
          'referer': '/portal/marketing/follow-prize/list'
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data) || des.data
      const ecode = data.code
      const message = data.message || des.status
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `FollowPrize-catch: ${error}` }
    }
  }

  // 关注礼-列表详情
  async FollowPrizeDetail(goodsinfo) {
    try {
      const { country, mallId, campaign_id } = goodsinfo
      const params = {
        mallId: mallId,
        campaign_id: campaign_id
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/marketing/v4/follow_prize/?', params, {
        headers: {
          'accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
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
      return { code: -2, data: `FollowPrize-catch: ${error}` }
    }
  }

  // 关注礼-创建
  async followPrizeCreate(goodsinfo) {
    try {
      const { country, mallId, discount, end_time, follow_prize_name,
        min_spend, quota, reward_type, start_time, coin_cash_back } = goodsinfo
      const params = {
        mallId: mallId,
        shopid: Number(mallId), // 店铺id
        follow_prize_name: follow_prize_name, // name
        start_time: Number(start_time), // 开始时间
        end_time: Number(end_time), // 结束时间
        quota: Number(quota), // 可使用数量
        min_spend: Number(min_spend), // 最低消费金额
        reward_type: Number(reward_type), // 类型
        discount: discount // 折扣
        // coin_cash_back: coin_cash_back // shoppB折扣
        // coin_cash_back:{
        //   cap:'',
        //   percentage:''
        // }
      }
      if (coin_cash_back) {
        params.coin_cash_back = coin_cash_back
        delete params.discount
      }
      debugger
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/marketing/v4/follow_prize/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          referer: `/portal/marketing/follow-prize/create`
        }
      })

      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.errcode || data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `followPrizeCreate-catch: ${error}` }
    }
  }

  // 关注礼-删除/停止
  async MallPrizeDel(goodsinfo) {
    try {
      const { country, mallId, campaign_id, action } = goodsinfo
      const params = {
        mallId: mallId,
        campaign_id: campaign_id,
        action: action
      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/marketing/v4/follow_prize/operation/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          referer: `/portal/marketing/follow-prize?tab=list`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data.code
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `MallPrizeDel-catch: ${error}` }
    }
  }
  // 运费折扣
  async logisticsPromotion(goodsinfo) {
    try {
      const { country, mallId, offset, limit } = goodsinfo
      const params = {
        mallId: mallId,
        status: 0,
        offset: offset,
        limit: limit
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/marketing/v3/logistics_promotion/list/?', params, {
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping?status=ongoing`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `MallPrizeDel-catch: ${error}` }
    }
  }
  // 运费折扣--停止活动
  async stopPromotion(goodsinfo) {
    try {
      const { country, mallId, datainfo } = goodsinfo
      const params = {
        mallId: mallId,
        status: datainfo.status,
        tiers: [datainfo.tiers[0]],
        channel_ids: datainfo.channel_ids,
        start_time: datainfo.start_time,
        end_time: datainfo.end_time,
        group_id: datainfo.group_id,
        promotion_name: datainfo.promotion_name,
        all_channels: {
          channels: [datainfo.channalData],
          mask_channels_ids: [],
          is_all_mask: false
        },
        expire_now: true
      }
      const res = await this._this.$shopeemanService.putChinese(country, '/api/marketing/v3/logistics_promotion/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping?status=ongoing`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `stopPromotion-catch: ${error}` }
    }
  }
  // 运费折扣--删除活动
  async delPromotion(goodsinfo) {
    try {
      const { country, mallId, datainfo } = goodsinfo
      const params = {
        mallId: mallId,
        status: datainfo.status,
        tiers: [datainfo.tiers[0]],
        channel_ids: datainfo.channel_ids,
        start_time: datainfo.start_time,
        end_time: datainfo.end_time,
        group_id: datainfo.group_id,
        promotion_name: datainfo.promotion_name,
        all_channels: {
          channels: [datainfo.channalData],
          mask_channels_ids: [],
          is_all_mask: false
        },
        expire_now: true
      }
      const res = await this._this.$shopeemanService.putChinese(country, '/api/marketing/v3/logistics_promotion/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping?status=all`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `delPromotion-catch: ${error}` }
    }
  }
  // 运费折扣--获取物流
  async ProDelivery(goodsinfo) {
    try {
      const { country, mallId } = goodsinfo
      const params = {
        mallId: mallId
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/marketing/v3/shop/logistics_info/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping/new`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `delPromotion-catch: ${error}` }
    }
  }
  // 运费折扣--查重冲突时间
  async checkDeliveryTime(goodsinfo) {
    try {
      const { country, mallId, start_time, end_time, channel_ids } = goodsinfo
      const params = {
        mallId: mallId,
        start_time: start_time,
        end_time: end_time,
        channel_ids: channel_ids
      }
      const res = await this._this.$shopeemanService.getChineseReferer(country, '/api/marketing/v3/logistics_promotion/check_channel/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping/new`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `delPromotion-catch: ${error}` }
    }
  }
  // 运费折扣--创建运费
  async checkPromotionTest(goodsinfo) {
    try {
      const { country, mallId, start_time, end_time, tiers, channel_ids, promotion_name } = goodsinfo
      const params = {
        mallId: mallId,
        start_time: start_time,
        end_time: end_time,
        tiers: tiers,
        channel_ids: channel_ids,
        promotion_name: promotion_name
      }
      const res = await this._this.$shopeemanService.postChineseReferer(country, '/api/marketing/v3/logistics_promotion/?', params, {
        headers: {
          'Content-Type': 'application/json; charset=utf-8',
          'Accept': 'application/json, text/plain, */*',
          referer: `/portal/marketing/shipping/new`
        }
      })
      const des = JSON.parse(res)
      const data = JSON.parse(des.data)
      const ecode = data?.data ? data.code : data.errcode
      const message = data.message
      //   console.log('=============', 'mallid:' + params.mallId, ecode, des)
      return { ecode, data, message }
    } catch (error) {
      return { code: -2, data: `delPromotion-catch: ${error}` }
    }
  }
}
