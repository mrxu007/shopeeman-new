import { dateFormat, getGoodLinkModel } from '../../../util/util'
class CollectLinkApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.goods = null
  }
  // 获取商品详情
  async getGoodsDeail(goods, isUseCache = true) {
    // 请注意   (商品列表  订单列表)  不需要使用缓存,其他模块调用需要使用缓存,
    try {
      this.goods = goods
      console.log('goodsData', this.goods)
      const { platformId, GoodsId, ShopId, Site, Platform, AccessToken } = this.goods
      const params = {}
      params['GoodsId'] = GoodsId
      switch (platformId || Platform) {
        case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
        case 1.2:
          break
        case 2: // '淘宝'   天猫 === 淘宝
        case 3: // '天猫'
          break
        case 8: // '1688'
          break
        case 9: // 'Lazada'
          params['Site'] = Site
          break
        case 10: // '京喜/京东'
          break
        case 11: // 'shopee'
          params['ShopId'] = ShopId
          params['Site'] = Site
          break
        case 12: // '速卖通'
          break
        case 13: // '天猫淘宝海外平台'
          // params['ShopId'] = ShopId
          params['AccessToken'] = AccessToken
          break
      }
      console.log(Number(platformId || Platform), params, isUseCache)
      const res = await this._this.$collectService.queryDetailById(Number(platformId || Platform), params, isUseCache)
      console.log(res)
      const isJSONData = this.isJsonString(res)
      if (isJSONData?.Code === 200) {
        return { code: 200, data: isJSONData }
      }
      return { code: -2, data: res }
    } catch (error) {
      return { code: -2, data: `getGoodsDeail-catch: ${error}` }
    }
  }
  handleLinkKeyFactory(linkKey, type) {
    try {
      const goodsArrInfo = []
      let linkArr = []
      if (type === 1) {
        const link = linkKey.trim()
        if (!link) {
          return { code: -3, data: '关键词不能为空' }
        }
        const linkObj = link.trim().replace(/\s/g, ';').split(';')
        linkObj.map((item, index) => {
          linkArr[index] = {}
          linkArr[index]['Url'] = item
        })
      } else {
        linkArr = linkKey
      }
      linkArr.map(item => {
        const linkRes = getGoodLinkModel(item.Url.toString())
        if (linkRes.code !== 200) this.writeLog(`${linkRes.data}`, false)
        const data = linkRes.data
        if (data.GoodsId) {
          goodsArrInfo.push({
            platformId: data['platformId'],
            GoodsId: data['GoodsId'],
            Site: data['Site'],
            ShopId: data['ShopId'],
            Url: item.Url,
            Weight: item.Weight,
            Length: item.Length,
            Width: item.Width,
            Height: item.Height
          })
        }
      })
      return { code: 200, data: goodsArrInfo }
    } catch (error) {
      console.log(error)
      return { code: -2, data: `关键词格式不规范：${error}` }
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
        return false
      }
    } else {
      return false
    }
  }
}

export default CollectLinkApI
