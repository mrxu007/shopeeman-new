export default class ReceivingAddress {
  constructor(that) {
    this._this = that
  }
  // 获取数据
  async warehouseAddress() {
    try {
      const res = await this._this.$api.warehouseAddress()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取用户仓库地址异常： ${error}` }
    }
  }
}
