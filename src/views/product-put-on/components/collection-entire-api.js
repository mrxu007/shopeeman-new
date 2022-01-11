import { dateFormat, delay } from '../../../util/util'
class CollectEntireApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.GoodsData = null
  }

  async checkMallLink(link) { // 检测店铺链接
    try {
      const res = await this._this.$collectService.getMallByLink(link)
      if (res.Platform !== undefined) {
        return { code: 200, data: res }
      }
      return { code: -2, data: '未获取到正确的平台ID' }
    } catch (error) {
      return { code: -2, data: `checkMallLink-catch: ${error}` }
    }
  }
  async mallSearch(link) { // 整店采集
    //  淘宝：callFunction（“SearchTbMallGoodsAsync”，MallInformationModel）
    // 速卖通：callFunction（“SearchExpressMallGoodsAsync”，MallInformationModel）
    // Lazada：callFunction（“SearchLazadaMallGoodsAsync”，MallInformationModel）
    // 京喜：callFunction（“SearchJxMallGoodsAsync”，MallInformationModel）
    // 京喜：callFunction（“SearchJxAppMallGoodsAsync”，MallInformationModel）
    // shopee：callFunction（“SearchShopeeMallGoodsAsync”，MallInformationModel）
    // AliBaBa：callFunction（“SearchAliBaBaMallGoodsAsync”，MallInformationModel）
    // pdd：callFunction（“SearchPddMallGoodsAsync”，MallInformationModel）
    this.GoodsData = null
    this.GoodsData = []
    const res = await this.checkMallLink(link)
    if (res.code !== 200) {
      return { code: res.code, data: res.data }
    }
    let res2 = null
    switch (res.data.Platform) {
      case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
      case 1.2:
        res2 = await this.searchMallGoodsAsync(res.data, 'searchPddMallGoodsAsync')
        break
      case 2: // '淘宝'
      case 3: // '天猫'   天猫 === 淘宝
        res2 = await this.searchMallGoodsAsync(res.data, 'searchTbMallGoodsAsync')
        break
      case 8: // '1688'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchAliBaBaMallGoodsAsync')
        break
      case 9: // 'Lazada'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchLazadaMallGoodsAsync')
        break
      case 10: // '京喜/京东'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchJxMallGoodsAsync')
        break
      case 11: // 'shopee'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchShopeeMallGoodsAsync')
        break
      case 12: // '速卖通'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchExpressMallGoodsAsync')
        break
    }
    if (res2.code === 200) {
      const newData = this._this.filterData(this.GoodsData)
      return { code: 200, data: newData }
    }
    return { code: -2, data: res2.data }
  }

  async searchMallGoodsAsync(params, methodName) {
    try {
      let res = await this._this.$collectService[methodName](params)
      res = this.isJsonString(res)
      if (typeof res === 'object' && res.Result.Code === 200) {
        // && res.Result.ListItem.length > 0
        this.GoodsData.push(...res.Result.ListItem)
        return { code: 200, data: '' }
      }
      return { code: -2, data: typeof res === 'string' ? res : res.Result.Msg }
    } catch (error) {
      return { code: -2, data: `SearchPddMallGoodsAsync-catch: ${error}` }
    }
  }
  // 辅助--------------------------------------------
  handleError() {
    let errorText = JSON.stringify(this.errorCatchText).replace(/\s/g, '')
    if (errorText.indexOf('数据列表为空') > -1) {
      errorText = '数据列表为空'
    } else if (errorText.indexOf('返回数据不能为空') > -1) {
      errorText = '返回数据不能为空'
    }
    this.errorCatchText = null
    return JSON.stringify({ Code: -2, Msg: `捕获错误${errorText}` })
  }
  handleEntireKeyFactory(key) {
    try {
      let keyword = key.trim()
      if (!keyword) {
        return { code: -3, data: '整店链接不能为空' }
      }
      keyword = keyword.replace(/\s/g, ';').split(';')
      return { code: 200, data: keyword }
    } catch (error) {
      return { code: -2, data: `整店链接不规范：${error}` }
    }
  }
  writeLog(msg, success = true) {
    if (this._this.consoleMsg === undefined) {
      return
    }
    if (!msg) { return }
    const color = success ? 'green' : 'red'
    const time = dateFormat(new Date(Date.now()), 'hh:mm:ss')
    this._this.consoleMsg += `<p style="color:${color}; margin-top: 5px;">${time}:${msg}</p>`
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
}

export default CollectEntireApI
