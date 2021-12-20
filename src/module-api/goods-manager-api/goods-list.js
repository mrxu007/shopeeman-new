export default class GoodsList {
  constructor(that) {
    this._this = that
  }
  // 获取折扣活动
  async getMallDiscountsIdByKeyword(val) {
    const parmas = {
      mallId: val.mallId,
      keyword: val.keyword,
      search_type: val.search_type
    }
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/discount/standard_search/', parmas)
      const jsonData = this.isJsonString(res)
      // if (jsonData.code === 200) {
      //   return { code: 200, data: jsonData.data }
      // }
      // return { code: 201, data: jsonData.msg }
    } catch (error) {
      return { code: -2, data: `折扣活动异常： ${error}` }
    }
  }
  // 通过id获取类目信息
  async getCategoryName(country, categoryId, isParent, tableType) {
    try {
      const res = await this._this.$commodityService.getCategoryTbInfo(country, categoryId + '', isParent, tableType)
      const jsonData = this.isJsonString(res)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: jsonData.msg }
    } catch (error) {
      return { code: -2, data: `获取类目名异常： ${error}` }
    }
  }
  // 输入条件时查询
  async searchProductList(val) {
    const { mItem, pageSize, searchType, keyword, goodsMin, goodsMax, soldMin, soldMax, listType, categoryId } = val
    try {
      const params = {
        page_number: mItem.pageNumberA,
        page_size: pageSize,
        mallId: mItem.platform_mall_id,
        search_type: searchType,
        keyword: keyword,
        category_id: categoryId,
        stock_min: goodsMin,
        stock_max: goodsMax,
        sold_min: soldMin,
        sold_max: soldMax,
        list_type: listType,
        count_list_types: 'sold_out,banned,deboosted,deleted,unlisted',
        source: 'seller_center',
        version: '4.0.0'
      }
      const res = await this._this.$shopeemanService.getChinese(mItem.country, '/api/v3/product/search_product_list/?', params, { headers: { 'accept': 'application/json, text/plain, */*' }})
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
      return { code: -2, data: `获取数据异常： ${error}`
      }
    }
  }
  // 未输入条件时查询
  async getMpskuList(val) {
    const { mItem, pageSize, listType, listOrderType } = val
    try {
      const params = {
        page_number: mItem.pageNumber,
        page_size: pageSize,
        mallId: mItem.platform_mall_id,
        list_type: listType,
        source: 'seller_center',
        version: '1.0.0'
      }
      if (listOrderType) {
        params['list_order_type'] = listOrderType
      }
      const res = await this._this.$shopeemanService.getChinese(mItem.country, '/api/v3/mpsku/get_mpsku_list/?', params, { headers: { 'accept': 'application/json, text/plain, */*' }})
      const jsonData = this.isJsonString(res)
      console.log(jsonData)
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

