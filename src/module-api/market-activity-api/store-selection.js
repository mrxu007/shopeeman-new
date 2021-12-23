export default class StoreSelection {
  constructor(that) {
    this._this = that
  }
  // 查询商品
  async productSelector(val) {
    const params = {}
    params['offset'] = 0
    params['limit'] = 100
    params['need_brand'] = 0
    params['need_item_model'] = 0
    params['is_ads'] = 0
    if (val.sort_by) {
      params['sort_by'] = val.sort_by
    }
    if (val.id) {
      params['search_content'] = val.id
      params['search_type'] = 1
    }
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/public/product_selector/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data.item_list }
      }
      return { code: 201, data: `${jsonData.errcode} ${jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `getHotSalePlanList-error ${error}` }
    }
  }
  // 获取详情数据
  async getGraphql(val) {
    const params = { variables: {}}
    params['query'] = `query Products($productIds: [String], $statusType: Int) {
        products(productIds: $productIds, statusType: $statusType) {
      items {
        itemid,
        name,
        images,
        sold,
        price,
      }
    }
      }`
    params['variables']['productIds'] = val.item_id_list
    params['variables']['statusType'] = 0
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.postChineseReferer(val.country, '/api/marketing/v4/graphql/query/?', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/marketing/hotsale`
        }
      })
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      const data = jsonData?.data?.products?.items
      if (data.length > 0) {
        return { code: 200, data: data }
      }
      return { code: 201, data: `${jsonData.errcode} ${jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `getGraphql-error ${error}` }
    }
  }
  async markeHotSalePlan(val, method) {
    const params = {}
    let referer = ''
    switch (method) {
      case 'postChineseReferer': // 添加
        params['item_id_list'] = val.item_id_list
        params['name'] = val.name
        referer = 'portal/marketing/hotsale/new'
        break
      case 'deleteChinese': // 删除
        params['plan_id'] = val.plan_id
        referer = 'portal/marketing/hotsale'
        break
      case 'putChinese': // 修改
        params['plan_id'] = val.plan_id
        params['name'] = val.name
        params['status'] = val.status
        params['item_id_list'] = val.item_id_list
        referer = 'portal/marketing/hotsale'
        break
    }
    params['mallId'] = val.platform_mall_id
    console.log('添加请求', params)
    try {
      const res = await this._this.$shopeemanService[method](val.country, '/api/marketing/v4/hot_sale/plan/', params, {
        headers: {
          'Content-Type': 'application/json',
          referer
        }
      })
      console.log('res', this.isJsonString(res))
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log('jsonData', jsonData)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.errcode || jsonData.code} ${jsonData.message && jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `getHotSalePlanList-error ${error}` }
    }
  }
  async markeHotSalePlanList(val) {
    const params = {}
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChineseReferer(val.country, '/api/marketing/v4/hot_sale/plan/list/?', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/marketing/hotsale`
        }
      })
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.errcode} ${jsonData.message && jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `getHotSalePlanList-error ${error}` }
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
