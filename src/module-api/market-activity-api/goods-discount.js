export default class GoodsDiscount {
  constructor(that) {
    this._this = that
  }
  // 查询折扣活动详情
  async getDiscountNominate(val) {
    const { item } = val
    try {
      const params = {}
      params['limit'] = 100 // 最多1000条数据
      params['offset'] = item.offset
      params['mallId'] = item.platform_mall_id
      params['discount_id'] = item.discount_id
      const res = await this._this.$shopeemanService.getChinese(item.country, '/api/marketing/v3/discount/nominate/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.code || jsonData.errcode}， ${jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `查询折扣活动详情异常： ${error}` }
    }
  }
  // 输入条件时查询
  async getByDiscountids(val) {
    const { mItem, promotionid, limit, discountType } = val
    try {
      const params = {}
      params['discount_id_list'] = promotionid
      params['discount_type'] = discountType
      params['limit'] = limit
      params['offset'] = mItem.offset
      params['mallId'] = mItem.platform_mall_id
      const res = await this._this.$shopeemanService.getChinese(mItem.country, '/api/marketing/v3/discount/get_by_discountids/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.code || jsonData.errcode}， ${jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取列表数据异常： ${error}` }
    }
  }
  // 获取promotionid
  async getDiscountStandardSearch(val) {
    const { mItem, keyword, searchType, discountType } = val
    try {
      const params = {}
      params['keyword'] = keyword
      params['search_type'] = searchType
      if (discountType !== 'all') {
        params['promotion_status'] = discountType
      }
      params['mallId'] = mItem.platform_mall_id
      const res = await this._this.$shopeemanService.getChinese(mItem.country, '/api/marketing/v3/discount/standard_search/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.code || jsonData.errcode}， ${jsonData.message && jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取promotionid数据异常： ${error}` }
    }
  }
  // 获取折扣列表数据（未输入条件）
  async getDiscountList(val) {
    const { mItem, limit, discountType } = val
    try {
      const params = {}
      params['limit'] = limit
      params['offset'] = mItem.offset
      params['discount_type'] = discountType
      params['mallId'] = mItem.platform_mall_id
      const res = await this._this.$shopeemanService.getChinese(mItem.country, '/api/marketing/v3/discount/list/?', params)
      const jsonData = this.isJsonString(this.isJsonString(res).data)
      console.log("111",jsonData)
      if (jsonData.message === 'success') {
        return { code: 200, data: jsonData.data }
      }
      return { code: 201, data: `${jsonData.code || jsonData.errcode}， ${jsonData.message.indexOf('token not found') > -1 ? '未登录，请登录后再查询' : jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取折扣列表数据异常： ${error}` }
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
  async stopActive(val,actionType){
    try {
      let params = {}
      params['discount_id'] = val.discount_id.toString()
      params['action'] = actionType
      params['mallId'] = val.platform_mall_id
      const res = await this._this.$shopeemanService.mixChinese(val.country, '/api/marketing/v3/discount/?', params,{
        Headers: {
          'Content-Type': ' application/json'
        }},'delete')
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
  // {
  //   "fe_status": "upcoming",
  //   "highlight": "",
  //   "title": "56折+115%",
  //   "start_time": 1641381154,
  //   "end_time": 1641471154,
  //   "status": 1
  // }
  async createAcitive(params){
    try {
      const res = await this._this.$shopeemanService.postChinese(val.country, '/api/marketing/v3/discount/?', params,{
        Headers: {
          'Content-Type': ' application/json'
        }})
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
  async putActive(country,params){
    try {
      const res = await this._this.$shopeemanService.mixChinese(country, '/api/marketing/v3/discount/?', params,{
        Headers: {
          'Content-Type': ' application/json'
        }},'put')
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
  async putModelActive(country,params){
    try {
      const res = await this._this.$shopeemanService.mixChinese(country, '/api/marketing/v3/discount/nominate/', params,{
        Headers: {
          'Content-Type': ' application/json'
        }},'put')
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
}

