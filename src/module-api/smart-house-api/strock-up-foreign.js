/**
 * 海外商品备货
 */
export default class StrockUpForegin {
  constructor(that) {
    this._this = that
  }
  // 下载条形码
  async downloadBarCode(params) {
    try {
      const res = await this._this.$BaseUtilService.downloadBarCode(params)
      const jsonData = this.isJsonString(res)
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
  async getStockingForecastLists(val) {
    try {
      const created_time = val.created_time ? `${this._this.$dayjs(val.created_time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(val.created_time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const sign_Time = val.sign_Time ? `${this._this.$dayjs(val.sign_Time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(val.sign_Time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const store_time = val.store_time ? `${this._this.$dayjs(val.store_time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(val.store_time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const parmas = {
        wid: val.wid,
        oversea_wid: val.oversea_wid,
        package_code: val.package_code,
        forecast_code: val.forecast_code,
        created_time: created_time,
        sign_Time: sign_Time,
        store_time: store_time,
        is_verify: val.is_verify,
        page: val.page,
        pageSize: val.pageSize
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

  // // 获取中转仓库和目标仓库列表(海外仓备货)
  // async getOverseasWarehouse() {
  //   try {
  //     const res = await this._this.$api.getOverseasWarehouse()
  //     if (res.data.code === 200) {
  //       return { code: 200, data: res.data.data }
  //     }
  //     return { code: res.data.code, data: `${res.data.message}` }
  //   } catch (error) {
  //     return { code: -2, data: `获取仓库列表异常： ${error}` }
  //   }
  // }
  // 获取中转仓库和目标仓库列表(海外仓备货) --- 壳
  async getOverseasWarehouse() {
    try {
      const res = await this._this.$appConfig.getGlobalCacheInfo('allWh', '')
      const jsonData = this.isJsonString(res)
      if (jsonData?.length) {
        return { code: 200, data: jsonData }
      }
      return { code: 201, data: `仓库列表为空` }
    } catch (error) {
      return { code: -2, data: `获取仓库列表异常： ${error}` }
    }
  }
  // 海外仓商品备货：发起商品预报
  async stockingForecastUpload(val) {
    try {
      const res = await this._this.$api.stockingForecastUpload(val)
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
      return { code: -2, data: `获取产品中心SKU列表异常： ${error}` }
    }
  }
}
