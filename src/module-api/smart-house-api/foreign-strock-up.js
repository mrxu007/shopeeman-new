export default class ForeginStrockUp {
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
      return { code: -2, data: `getStockingForecastLists-catch： ${error}` }
    }
  }

  // 删除预报单
  async deleteForecast(forecast_code) {
    const params = {
      purchase_order_sn: forecast_code
    }
    try {
      const res = await this._this.$api.deleteForecast(params)
      console.log(res)
      if (res.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `deleteForecast-catch： ${error}` }
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
      return { code: -2, data: `getOverseasWarehouse-catch： ${error}` }
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
      return { code: -2, data: `stockingForecastUpload-catch： ${error}` }
    }
  }
}
