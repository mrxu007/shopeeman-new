export default class PersonalLibraryAPI {
  constructor(that) {
    this._this = that
  }

  // 获取选品库商品列表
  async getCollectGoodsV2(params) {
    try {
      let res = await this._this.$commodityService.getCollectGoodsV2(params)
      res = JSON.parse(res)
      if (res.code === 200) {
        const data = res.data.data.map(item => {
          item.information
          return item
        })
        return { code: 200, data: { total: res.data.total, data } }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `getCollectGoodsV2-catch: ${error}` }
    }
  }

  // 获取标签
  async getLabelList() {
    try {
      let res = await this._this.$commodityService.getGoodsTagList()
      res = JSON.parse(res)
      if (res.code === 200) {
        return { code: 200, data: res.data }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `getLabelList-catch: ${error}` }
    }
  }
  // 添加标签
  async createLabel(labelName, sysLabelId = '0') {
    try {
      let res = await this._this.$commodityService.addGoodsTag(
        labelName,
        sysLabelId
      )
      res = JSON.parse(res)
      if (res.code === 200) {
        return { code: 200, data: res.msg }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `createLabel-catch: ${error}` }
    }
  }
  // 添加商品到标签
  async addGoodsToTag(tagId, sysGoodsId) {
    try {
      let res = await this._this.$commodityService.addGoodsToTag(
        tagId,
        sysGoodsId
      )
      res = JSON.parse(res)
      if (res.code === 200) {
        return { code: 200, data: res.msg }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `createLabel-catch: ${error}` }
    }
  }
  // 标记/取消优选商品
  async markPreferredGoods(sysGoodsIds, type) {
    try {
      let res = await this._this.$commodityService.markPreferredGoods(sysGoodsIds, type)
      res = JSON.parse(res)
      if (res.code === 200) {
        return { code: 200, data: res.data }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `markPreferredGoods-catch: ${error}` }
    }
  }

  // 取消商品
  async deleteGoods(sysGoodsIds) {
    try {
      let res = await this._this.$commodityService.deleteCollectGoodsInfo(
        sysGoodsIds
      )
      res = JSON.parse(res)
      debugger
      if (res.code === 200) {
        return { code: 200, data: res.msg }
      }
      return { code: res.code, data: res.msg }
    } catch (error) {
      return { code: -2, data: `createLabel-catch: ${error}` }
    }
  }
}
