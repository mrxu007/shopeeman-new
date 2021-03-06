export default class OrderManagerAPI {
  constructor(that) {
    this._this = that
    this.mallList = []
  }

  // 第三方接口-------------------------------------------------
  // 批量拒绝/同意买家取消订单
  async refuseCancerOrder(orderInfo) {
    try {
      // 同意取消action传入：accept
      // 拒绝取消action传入：reject
      const { type, order_id, country, platform_mall_id } = orderInfo
      const params = {
        action: type,
        order_id: order_id,
        mallId: platform_mall_id
      }
      console.log('params', params)
      const res = await this._this.$shopeemanService.postChinese(country, '/api/v3/order/respond_cancel_request/?', params,
        { headers: { referer: '/portal/sale/88860579400074', 'Content-Type': 'application/json' }})
      console.log('del', res)
      // res = JSON.parse(JSON.parse(res).data)
      // if (res.code === 0) {
      //   return { code: 200, data: res.data } // count_for_limit
      // }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallGoodsAmount-catch: ${error}` }
    }
  }

  // 删除shopee商品
  async deleteProduct(mallInfo) {
    try {
      const { country, platform_mall_id, product_id_list } = mallInfo
      const params = {
        mallId: platform_mall_id,
        product_id_list: product_id_list,
        version: '3.1.0'
      }
      let res = await this._this.$shopeemanService.postChinese(country, '/api/v3/product/delete_product/?', params,
        { headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `deleteProduct-catch: ${error}` }
    }
  }

  // 下架shopee商品
  async deListProduct(mallInfo) {
    try {
      const { country, platform_mall_id, product_id_list } = mallInfo
      const params = {
        mallId: platform_mall_id,
        product_id_list,
        version: '3.1.0',
        source: 'seller_center'
      }
      let res = await this._this.$shopeemanService.postChinese(country, '/api/v3/product/update_product/?', params,
        { headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `delListProduct-catch: ${error}` }
    }
  }
}
