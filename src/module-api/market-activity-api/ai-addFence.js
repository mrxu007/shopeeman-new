export default class GoodsDiscount {
  constructor(that) {
    this._this = that
  }
  // 搜索关注店铺
  async addCancerMall(val) {
    const { item } = val
    try {
      const params = {}
      params['country'] = item.country
      params['mallId'] = item.mallId
      params['by'] = item.by
      params['keyword'] = item.keyword
      params['limit'] = item.limit
      params['newest'] = item.newest
      params['order'] = item.order
      params['page_type'] = item.page_type
      params['version'] = 2

      const res = await this._this.$shopeemanService.getChineseBuyer(item.country, '/api/v2/search_items/?', params, {
        headers: {
          referer: `/search?keyword=${item.keyword}}`,
          Accept: 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml'
        }
      })
      return res
    } catch (error) {
      return { code: -2, data: `店铺搜索异常 ${error}` }
    }
  }
}

