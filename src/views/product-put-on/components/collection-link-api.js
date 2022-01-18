import { dateFormat, delay } from '../../../util/util'
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
      console.log(params)
      const res = await this._this.$collectService.queryDetailById(Number(platformId || Platform), params, isUseCache)
      const isJSONData = this.isJsonString(res)
      if (isJSONData?.Code === 200) {
        return { code: 200, data: isJSONData }
      }
      return { code: -2, data: res }
    } catch (error) {
      return { code: -2, data: `getGoodsDeail-catch: ${error}` }
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
      const execPlatform = /(yangkeduo.com)|(taobao.com)|(aliexpress.com)|(jd.com)|(1688.com)|(detail.tmall.com)|(pinduoduo.com)|(lazada)|(xiapibuy)|(shopee.com)|(distributor.taobao.global)/g
      let GoodsId = null
      let platformId = null
      let Site = null
      let ShopId = null
      linkArr.map(item => {
        const platform = item.Url.match(execPlatform)
        if (!platform) {
          this.writeLog(`链接:${item.Url} 识别支持平台失败`, false)
        } else {
          GoodsId = null
          platformId = null
          Site = null
          ShopId = null
          switch (platform[0]) {
            case 'yangkeduo.com':
            case 'pinduoduo.com':
              GoodsId = item.Url.match(/goods_id=(\d+)/)[1]
              platformId = 1
              break
            case 'taobao.com':
              GoodsId = item.Url.match(/id=(\d+)/)[1]
              platformId = 2
              break
            case 'detail.tmall.com':
              GoodsId = item.Url.match(/id=(\d+)/)[1]
              platformId = 3
              break
            case 'jd.com':
              GoodsId = item.Url.match(/(\d+)\.html/)[1]
              platformId = 10
              break
            case '1688.com':
              GoodsId = item.Url.match(/(\d+)\.html/)[1]
              platformId = 8
              break
            case 'jinritemai.com':
              GoodsId = item.Url.match(/id=(\d+)/)[1]
              platformId = 14
              break
            case 'aliexpress.com':
              GoodsId = item.Url.match(/(\d+)\.html/)[1]
              platformId = 12
              break
            case 'lazada':
              GoodsId = item.Url.match(/(\d+)\.html/)[1]
              platformId = 9
              Site = item.Url.match(/\.(\w+)\/products/)[1]
              break
            case 'xiapibuy':
              platformId = 11
              Site = item.Url.match(/\/\/(\w+)/)[1] === 'xiapi' ? 'tw' : item.Url.match(/\/\/(\w+)/)[1]
              ShopId = item.Url.match(/product\/(\d+)/)[1]
              GoodsId = item.Url.match(/product\/(\d+)\/(\d+)/)[2]
              break
            case 'shopee.com':
              platformId = 11
              Site = item.Url.match(/shopee.com\.(\w+)/)[1]
              ShopId = item.Url.match(/product\/(\d+)/)[1]
              GoodsId = item.Url.match(/product\/(\d+)\/(\d+)/)[2]
              break
            case 'distributor.taobao.global':
              GoodsId = item.Url.match(/mpId=(\d+)/)[1]
              break
          }
          try {
            if (GoodsId) {
              goodsArrInfo.push({
                platformId,
                GoodsId,
                Site,
                ShopId,
                Url: item.Url,
                Weight: item.Weight,
                Length: item.Length,
                Width: item.Width,
                Height: item.Height
              })
            } else {
              this.writeLog(`链接:${item.Url} 识别商品ID失败`, false)
            }
          } catch (error) {
            this.writeLog(`链接:${item.Url} 识别商品ID失败`, false)
          }
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
