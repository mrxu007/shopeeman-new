export default class GoodsList {
  constructor(that) {
    this._this = that
  }
  // 获取第三方数据
  async getMpskuList(pageNumber, pageSize, mallData) {
    try {
      const params = {
        page_number: pageNumber,
        page_size: pageSize,
        mallId: mallData.platform_mall_id,
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

