/**
 * 国内商品备货
 */
export default class StrockUpHome {
  constructor(that) {
    this._this = that
  }

  // 获取预报单列表
  async getHomeWarehouse(item) {
    try {
      const createdAt = item.createdAt ? `${this._this.$dayjs(item.createdAt[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(item.createdAt[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const parmas = {
        wid: item.wid,
        purchaseOrderSn: item.purchaseOrderSn,
        packageCode: item.packageCode,
        createdAt: createdAt,
        page: item.page,
        pageSize: item.pageSize
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
  async stockingHomeUpload(item) {
    try {
      const res = await this._this.$api.stockingHomeUpload(item)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `发起商品预报异常： ${error}` }
    }
  }
  // 获取产品中心列表
  async getProductList(item) {
    try {
      const res = await this._this.$commodityService.getProductList(item)
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
  async getProductSkuList(item) {
    try {
      const res = await this._this.$commodityService.getProductSkuList(item)
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
