export default class AddressSet {
  constructor(that) {
    this._this = that
  }
  // 获取数据
  async getUserWarehouse() {
    try {
      const res = await this._this.$api.getUserWarehouse()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取用户仓库地址异常： ${error}` }
    }
  }
  // 获取星卓越地址
  async xzyAllIndex() {
    try {
      const res = await this._this.$api.xzyAllIndex()
      if (res.data.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.data.code, data: `${res.data.message}` }
    } catch (error) {
      return { code: -2, data: `获取所属仓库异常： ${error}` }
    }
  }
}
