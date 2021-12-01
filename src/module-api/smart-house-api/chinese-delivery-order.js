/**
 * 国内仓出库订单
 */
export default class ChineseDeliveryOrder {
  constructor(that) {
    this._this = that
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
  // 获取仓库中文名
  async transferWarehouse(wid) {
    try {
      const res = await this._this.$appConfig.getGlobalCacheInfo('transferWarehouse', wid)
      if (res !== 'null') {
        const jsonData = JSON.parse(res)
        return { code: 200, data: jsonData.warehouse_name }
      }
      return { code: 200, data: '' }
    } catch (error) {
      return { code: -2, data: `获取仓库中文名异常： ${error}` }
    }
  }
  // 取消订单
  async cancelHomeOrder(val) {
    try {
      const res = await this._this.$api.cancelHomeOrder(val)
      if (Number(res.data.code) === 200) {
        return { code: 200 }
      }
      return { code: Number(res.data.code), data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `取消订单异常： ${error}` }
    }
  }
  // 国内出库单: 列表
  async getHomeOutStockOrder(val) {
    try {
      const createdAt = val.createdAt ? `
      ${this._this.$dayjs(val.createdAt[0]).format('YYYY-MM-DD 00:00:00')}/
      ${this._this.$dayjs(val.createdAt[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const pamars = JSON.parse(JSON.stringify(val))
      pamars.createdAt = createdAt
      const res = await this._this.$api.getHomeOutStockOrder(pamars)
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取数据异常：${error}` }
    }
  }
  // 获取仓库
  async getWarehouseList() {
    try {
      const res = await this._this.$api.getWarehouseList()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取仓库异常： ${error}` }
    }
  }
}

