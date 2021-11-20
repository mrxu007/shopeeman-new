/**
 * 国内仓库存
 */
export default class ChineseStock {
  constructor(that) {
    this._this = that
  }
  // 获取数据
  async getStock(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.shopifyV2.get_stock', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取国内仓库存列表异常： ${error}` }
    }
  }
  // 获取仓库
  async getWarehouseList() {
    try {
      const res = await this._this.$api.getWarehouseList()
      debugger
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取仓库异常： ${error}` }
    }
  }
}

