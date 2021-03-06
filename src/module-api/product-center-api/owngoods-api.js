/**
 * 海外商品备货
 */
export default class StrockUpForegin {
  constructor(that) {
    this._this = that
  }

  // 获取预报单列表
  async getStockingForecastLists(item) {
    try {
      const created_time = item.created_time ? `${this._this.$dayjs(item.created_time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(item.created_time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const sign_Time = item.sign_Time ? `${this._this.$dayjs(item.sign_Time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(item.sign_Time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const store_time = item.store_time ? `${this._this.$dayjs(item.store_time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(item.store_time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const parmas = {
        wid: item.wid,
        oversea_wid: item.oversea_wid,
        package_code: item.package_code,
        forecast_code: item.forecast_code,
        created_time: created_time,
        sign_Time: sign_Time,
        store_time: store_time,
        is_verify: item.is_verify,
        page: item.page,
        pageSize: item.pageSize
      }
      const res = await this._this.$api.getStockingForecastLists(parmas)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取数据异常： ${error}` }
    }
  }

  // 删除预报单
  async deleteForecast(forecast_code) {
    const params = {
      purchase_order_sn: forecast_code
    }
    try {
      const res = await this._this.$api.deleteForecast(params)
      if (res.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `删除预报单异常： ${error}` }
    }
  }

  // 获取中转仓库和目标仓库列表(海外仓备货)
  async getOverseasWarehouse() {
    try {
      const res = await this._this.$api.getOverseasWarehouse()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取仓库列表异常： ${error}` }
    }
  }
  // 海外仓商品备货：发起商品预报
  async stockingForecastUpload(item) {
    try {
      const res = await this._this.$api.stockingForecastUpload(item)
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
      return { code: -2, data: `获取产品中心SKU列表异常： ${error}` }
    }
  }
  // 保存商品
  async SaveProduct(item) {
    try {
      const res = await this._this.$commodityService.SaveProduct(item)
      const jsonData = JSON.parse(res)
      if (jsonData.status_code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.status_code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `保存异常： ${error}` }
    }
  }
  // 删除商品
  async delgoods(data) {
    try {
      const res = await this._this.$commodityService.delgoods(data.productId, data.productUid, data.language)
      const jsonData = JSON.parse(res)
      if (jsonData.status_code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.status_code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `删除失败： ${error}` }
    }
  }
}
