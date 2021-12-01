/**
 * 国内商品备货
 */
export default class StrockUpHome {
  constructor(that) {
    this._this = that
  }
  // 下载条形码
  async downloadBarCode(params) {
    try {
      const res = await this._this.$BaseUtilService.downloadBarCode(params)
      const jsonData = this.isJsonString(res)
      console.log(jsonData)
      if (jsonData.code === 200) {
        return { code: 200 }
      }
      return { code: jsonData.code, data: `${jsonData.msg}` }
    } catch (error) {
      return { code: -2, data: `下载条形码异常： ${error}` }
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
  // 获取预报单列表
  async getHomeWarehouse(val) {
    try {
      const createdAt = val.createdAt ? `${this._this.$dayjs(val.createdAt[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(val.createdAt[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const parmas = {
        wid: val.wid,
        purchaseOrderSn: val.purchaseOrderSn,
        packageCode: val.packageCode,
        createdAt: createdAt,
        page: val.page,
        pageSize: val.pageSize
      }
      const res = await this._this.$api.getHomeWarehouse(parmas)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `数据获取失败： ${error}` }
    }
  }

  // 删除预报单
  async deleteHomeForecast(mainId) {
    const params = {
      mainId: mainId
    }
    try {
      const res = await this._this.$api.deleteHomeForecast(params)
      if (res.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `删除预报单异常： ${error}` }
    }
  }

  // 获取中转仓
  async getWarehouseList() {
    try {
      const res = await this._this.$api.getWarehouseList()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取中转仓异常： ${error}` }
    }
  }
  // 获取用户信息，用来判断中转仓的显示
  async getUserInfo() {
    try {
      const res = await this._this.$appConfig.getUserInfo()
      return { code: 200, data: res }
    } catch (error) {
      return { code: -2, data: `获取用户信息异常： ${error}` }
    }
  }
  // 国内仓商品备货：发起商品预报
  async stockingHomeUpload(val) {
    try {
      const res = await this._this.$api.stockingHomeUpload(val)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `发起商品预报异常： ${error}` }
    }
  }
  // 获取产品中心列表
  async getProductList(val) {
    try {
      const res = await this._this.$commodityService.getProductList(val)
      const jsonData = JSON.parse(res)
      if (jsonData.status_code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.status_code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取产品中心数据异常： ${error}` }
    }
  }
  // 获取产品中心产品skulist
  async getProductSkuList(val) {
    try {
      const res = await this._this.$commodityService.getProductSkuList(val)
      const jsonData = JSON.parse(res)
      if (jsonData.status_code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.status_code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取产品SKU数据异常： ${error}` }
    }
  }
}
