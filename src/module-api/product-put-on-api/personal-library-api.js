export default class PersonalLibraryAPI {
  constructor(that) {
    this._this = that
  }
  async getCollectGoodsV2(params) {
    try {
      let res = await this._this.$commodityService.getCollectGoodsV2(params)
      res = JSON.parse(res)
      if (res.code === 200) {
        return { code: 200, data: { total: res.data.total, data: res.data.data } }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `getCollectGoodsV2-catch: ${error}` }
    }
  }
}
