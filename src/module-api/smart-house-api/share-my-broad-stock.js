/**
 * 海外仓共享库存管理
 */
export default class ShareMyBroadStock {
  constructor(that) {
    this._this = that
  }
  // 获取数据
  async getSharedIndex(val) {
    try {
      const res = await this._this.$XzyNetMessageService.post('xzy.getSharedIndex', val)
      const jsonData = JSON.parse(JSON.parse(res).data)
      if (jsonData.code === 200) {
        return { code: 200, data: jsonData.data }
      }
      return { code: jsonData.code, data: `${jsonData.message}` }
    } catch (error) {
      return { code: -2, data: `获取共享给我的海外仓库存列表异常： ${error}` }
    }
  }
  // 获取仓库
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
}

