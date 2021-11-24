/**
 * 海外仓出库订单
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
  // 获取海外仓库中文名
  async overseasWh(wid) {
    try {
      const res = await this._this.$appConfig.getGlobalCacheInfo('overseasWh', wid)
      if (res !== 'null') {
        const jsonData = JSON.parse(res)
        return { code: 200, data: jsonData.warehouse_name }
      }
      return { code: 200, data: '' }
    } catch (error) {
      return { code: -2, data: `获取海外仓库中文名异常： ${error}` }
    }
  }
  // 取消订单
  async cancelOverseaOrder(val) {
    try {
      const res = await this._this.$api.cancelOverseaOrder(val)
      if (res.data.code === 200) {
        return { code: 200 }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `取消订单异常： ${error}` }
    }
  }
  // 海外仓补件：新增补件
  async addReissueStore(val) {
    try {
      const res = await this._this.$api.addReissueStore(val)
      if (Number(res.data.code) === 200) {
        return { code: 200 }
      }
      return { code: Number(res.data.code), data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `补件异常： ${error}` }
    }
  }
  // 获取库存
  async getStock(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.stock.index', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.code, data: jsonData.message }
    } catch (error) {
      return { code: -2, data: `获取海外仓补件数据异常${error}` }
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

