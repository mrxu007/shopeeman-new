import { dateFormat, delay } from '../../../util/util'
class CollectEntireApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
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
    const res = await this.checkMallLink(link)
    if (res.code !== 200) {
      return this.writeLog(`${res.data}`, false)
    }
    let res2 = null
    switch (res.data.Platform) {
      case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
        res2 = await this.searchMallGoodsAsync(res.data, 'searchPddMallGoodsAsync', 'PddMallInformation')
        break
      case 2: // '淘宝'
      case 3: // '天猫'   天猫 === 淘宝
        res2 = await this.searchMallGoodsAsync(res.data, 'searchTbMallGoodsAsync', 'TbMallInformation')
        break
      case 8: // '1688'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchAliBaBaMallGoodsAsync', 'AliBaBaMallInformation')
        break
      case 9: // 'Lazada'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchLazadaMallGoodsAsync', 'LazadaMallInformation')
        break
      case 10: // '京喜/京东'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchJxMallGoodsAsync', 'JxMallInformation')
        break
      case 11: // 'shopee'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchShopeeMallGoodsAsync', 'ShopeeMallInformation')
        break
      case 12: // '速卖通'
        res2 = await this.searchMallGoodsAsync(res.data, 'searchExpressMallGoodsAsync', 'ExpressMallInformation')
        break
    }
  }

  async searchMallGoodsAsync(params, methodName, name) {
    let Page = 1
    while (Page) {
      if (this._this.flag) { // 取消采集
        break
      }
      try {
        params[name].Page = Page
        let res = await this._this.$collectService[methodName](params)
        res = this.isJsonString(res)
        console.log('整店返回数据', res)
        if (typeof res === 'object' && res.Result.Code === 200) {
          const newData = this._this.filterData(res.Result.ListItem)
          this.writeLog(`开始采集第【${Page}】页商品，共采集到【${res.Result.ListItem.length}】条，过滤【${res.Result.ListItem.length - newData.length}】条`, true)
          this._this.goodsList = this._this.goodsList.concat(newData)
        } else {
          this.writeLog(`开始采集第【${Page}】页商品，采集失败${typeof res === 'string' ? res : res.Result.Msg || ''}`, false)
          break
        }
      } catch (error) {
        if (error.indexOf('超出页数限制') > -1 || error.indexOf('获取Shopee商品详情为空') > -1) {
          this.writeLog(`采集完成，采集已达最大页数限制`, false)
          break
        }
        this.writeLog(`采集异常，${error}`, false)
        break
      }
      Page++
    }
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
