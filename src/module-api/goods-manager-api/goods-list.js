export default class GoodsList {
  constructor(that) {
    this._this = that
  }
  // 输入条件时查询
  async searchProductList(val) {
    const { mallData, pageNumber, pageSize, searchType, keyword } = val
    try {
      const params = {
        page_number: pageNumber,
        page_size: pageSize,
        mallId: mallData.platform_mall_id,
        search_type: searchType,
        keyword: keyword,
        list_type: 'all',
        count_list_types: 'sold_out,banned,deboosted,deleted,unlisted',
        source: 'seller_center',
        version: '4.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(mallData.country, '/api/v3/product/search_product_list/?', params, { headers: { 'accept': 'application/json, text/plain, */*' }})
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        if (data.message === 'success') {
          return { code: 200, data: data.data }
        }
        return { code: 201, data: `数据获取失败：${data.message}` }
      }
      if (jsonData.status === 403) {
        return { code: 403, data: `未登录，请登录后再查询` }
      }
      if (jsonData.status === 0) {
        return { code: 0, data: `异常，请检查代理` }
      }
      return { code: jsonData.status, data: `${jsonData.statusText}` }
    } catch (error) {
      // return { code: -2, data: `获取数据异常： ${error}`
      return { code: -2, data: `获取数据异常`
      }
    }
  }
  // 未输入条件时查询
  async getMpskuList(val) {
    const { mallData, pageNumber, pageSize } = val
    try {
      const params = {
        page_number: pageNumber,
        page_size: pageSize,
        mallId: mallData.platform_mall_id,
        list_type: 'all',
        source: 'seller_center',
        version: '1.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(mallData.country, '/api/v3/mpsku/get_mpsku_list/?', params, { headers: { 'accept': 'application/json, text/plain, */*' }})
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        if (data.message === 'success') {
          return { code: 200, data: data.data }
        }
        return { code: 201, data: `数据获取失败：${data.message}` }
      }
      if (jsonData.status === 403) {
        return { code: 403, data: `未登录，请登录后再查询` }
      }
      if (jsonData.status === 0) {
        return { code: 0, data: `异常，请检查代理` }
      }
      return { code: jsonData.status, data: `${jsonData.statusText}` }
    } catch (error) {
      return { code: -2, data: `获取数据异常： ${error}` }
    }
  }
  // 判断能否转JSON
  isJsonString(str) {
    if (typeof str === 'string') {
      try {
        JSON.parse(str)
        return JSON.parse(str)
      } catch (e) {
        return str
      }
    } else {
      return str
    }
  }
}

