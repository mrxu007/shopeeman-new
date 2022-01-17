export default class GoodsList {
  constructor(that) {
    this._this = that
  }
  async putModelActive(country, params) {
    try {
      const res = await this._this.$shopeemanService.mixChinese(country, '/api/marketing/v3/discount/nominate/', params, {
        Headers: {
          'Content-Type': ' application/json'
        }}, 'put')
      const resObj = res && JSON.parse(res)
      console.log(resObj)
      if (resObj && resObj.status === 200) {
        const info = JSON.parse(resObj.data)
        if (info && info.code === 0) {
          return {
            code: 200,
            data: info.data || []
          }
        } else {
          return {
            code: 50001,
            data: info.message || resObj.statusText || ''
          }
        }
      } else {
        if (resObj.status === 403) {
          return {
            code: resObj.status,
            data: `操作失败，店铺未登录！`
          }
        }
        return {
          code: resObj.status,
          data: `操作失败${resObj.statusText}`
        }
      }
    } catch (error) {
      return { code: -2, data: `操作异常： ${error}` }
    }
  }
  // 删除云商品库数据
  async deleteCollectGoodsInfo(id) {
    try {
      const res = await this._this.$commodityService.deleteCollectGoodsInfo(id)
      const jsonData = this.isJsonString(res)
      if (jsonData.code === 200) {
        return { code: 200 }
      }
      return { code: 201, data: jsonData.msg }
    } catch (error) {
      return { code: -2, data: `删除云商品库数据异常 ${error}` }
    }
  }
  // 确认虾皮禁卖
  async dismissInvalidProducts(val) {
    try {
      const params = {}
      params['ids'] = [val.id]
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.postChinese(val.country, '/api/v3/product/dismiss_invalid_products?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        if (data.code === 0) {
          return { code: 200 }
        }
      }
      return { code: 201, data: jsonData.statusText }
    } catch (error) {
      return { code: -2, data: `确认虾皮禁卖异常： ${error}` }
    }
  }
  // 删除子商品加购活动
  async deleteAddOnDealSubItemList(val, activityid, subItemList) {
    try {
      const params = {}
      params['add_on_deal_id'] = activityid
      params['create_type'] = 0
      params['sub_item_list'] = subItemList
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.postChinese(val.country, '/api/marketing/v3/add_on_deal/sub_item_list/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log('删除子加购商品', jsonData)
      if (jsonData.message === 'success') {
        return { code: 200 }
      }
      return { code: 201, data: jsonData.message }
    } catch (error) {
      return { code: -2, data: `删除加购子商品异常： ${error}` }
    }
  }
  // 获取子商品加购活动列表
  async getAdd0nDealAggrSubItemList(val, activityid) {
    const params = {}
    params['add_on_deal_id'] = activityid
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/add_on_deal/aggr_sub_item_list/?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        return { code: 200, data: data.data }
      }
      return { code: 201, data: jsonData.statusText }
    } catch (error) {
      return { code: -2, data: `子商品加购活动列表异常： ${error}` }
    }
  }
  // 删除主商品加购活动
  async deleteAddOnDealMainItemList(val, status, activityid) {
    try {
      const params = {}
      params['add_on_deal_id'] = activityid
      params['main_item_list'] = [{ item_id: val.id, status: status }]
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.postChinese(val.country, '/api/marketing/v3/add_on_deal/main_item_list/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log('删除主加购商品', jsonData)
      if (jsonData.message === 'success') {
        return { code: 200 }
      }
      return { code: 201, data: jsonData.message }
    } catch (error) {
      return { code: -2, data: `删除加购主商品异常： ${error}` }
    }
  }
  // 获取主商品加购活动列表
  async getAdd0nDealAggrMainItemList(val, activityid) {
    const params = {}
    params['add_on_deal_id'] = activityid
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/add_on_deal/aggr_main_item_list/?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        return { code: 200, data: data.data }
      }
      return { code: 201, data: jsonData.statusText }
    } catch (error) {
      return { code: -2, data: `主商品加购活动列表异常： ${error}` }
    }
  }
  // 获取该参加的加购活动ID
  async getAddOnDealStandardSearch(val) {
    const params = {}
    params['search_type'] = 'item_id'
    params['keyword'] = val.id
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/add_on_deal/standard_search/?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        return { code: 200, data: data.data }
      }
      return { code: 201, data: jsonData.statusText }
    } catch (error) {
      return { code: -2, data: `加购活动异常： ${error}` }
    }
  }
  // 删除套装商品
  async deleteBundleGoods(val, activityid) {
    try {
      const params = {}
      params['bundle_deal_id'] = activityid
      params['items'] = [{ item_id: val.id }]
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.deleteChinese(val.country, '/api/marketing/v3/bundle_deal/item/', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `portal/marketing/bundle/${activityid}`
        }
      })
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log('删除套装商品', jsonData)
      if (jsonData.message === 'success') {
        return { code: 200 }
      }
      return { code: 201, data: jsonData.message }
    } catch (error) {
      return { code: -2, data: `删除套装商品异常： ${error}` }
    }
  }
  // 获取该商品参加的套装活动ID
  async getBundleDeal(val) {
    const params = {}
    params['keyword'] = val.id
    params['search_type'] = 'item_id'
    params['mallId'] = val.platform_mall_id
    try {
      const res = await this._this.$shopeemanService.getChineseReferer(val.country, '/api/marketing/v3/bundle_deal/standard_search/?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        return { code: 200, data: data.data }
      }
      return { code: 201, data: jsonData.statusText }
    } catch (error) {
      return { code: -2, data: `套装活动异常： ${error}` }
    }
  }
  // 删除折扣商品
  async deleteDiscountCampainDetail(val, activityid) {
    try {
      const params = {}
      params['discount_id'] = activityid
      params['itemid_list'] = [val.id]
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.deleteChinese(val.country, '/api/marketing/v3/discount/nominate/abnormal/', params, {
        headers: {
          'Content-Type': 'application/json',
          referer: `/portal/marketing/discount/${activityid}/`
        }
      })
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log('删除折扣商品', jsonData)
      if (jsonData.message === 'success') {
        return { code: 200 }
      }
      return { code: 201, data: jsonData.message }
    } catch (error) {
      return { code: -2, data: `删除折扣商品异常： ${error}` }
    }
  }
  // 获取该商品参加的折扣活动ID
  async getMallDiscountsIdByKeyword(val) {
    const params = {}
    params['search_type'] = 'item_id'
    params['keyword'] = val.id
    params['mallId'] = val.platform_mall_id
    params['promotion_status'] = 'ongoing'
    try {
      const res = await this._this.$shopeemanService.getChinese(val.country, '/api/marketing/v3/discount/standard_search/?', params)
      const jsonData = this.isJsonString(res)
      if (jsonData.status === 200) {
        const data = this.isJsonString(jsonData.data)
        return { code: 200, data: data.data }
      }
      return { code: 201, data: jsonData.statusText }
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

