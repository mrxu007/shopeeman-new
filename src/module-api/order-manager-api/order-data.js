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
      let res = await this._this.$shopeemanService.postChinese(country, '/api/v3/order/respond_cancel_request/?', params,
        { headers: { referer: '/portal/sale/88860579400074', 'Content-Type': 'application/json' }})
      // debugger
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `getMallGoodsAmount-catch: ${error}` }
    }
  }

  // 删除shopee商品
  async deleteProduct(orderInfo) {
    try {
      const { country, platform_mall_id, product_id_list } = orderInfo
      const data = {
        country: country,
        mallId: platform_mall_id,
        product_id_list: product_id_list,
        version: '3.1.0'
      }
      let res = await this._this.$shopeemanService.postChinese(country, '/api/v3/product/delete_product/?', data,
        { headers: { 'Content-Type': 'application/json;charset=UTF-8' }})
      debugger
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 0) {
        return { code: 200, data: res.data } // count_for_limit
      }
      return { code: res.errcode, data: `${res.errcode} ${res.message}` }
    } catch (error) {
      return { code: -2, data: `deleteProduct-catch: ${error}` }
    }
  }
}
