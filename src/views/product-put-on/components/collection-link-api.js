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
      const { platformId, GoodsId, ShopId, Site } = this.goods
      const params = {}
      params['GoodsId'] = GoodsId
      params['shop_id'] = ShopId
      switch (platformId) {
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
          params['ShopId'] = ShopId
          params['AccessToken'] = ''
          break
      }
      const res = await this._this.$collectService.queryDetailById(Number(platformId), params, isUseCache)
      const isJSONData = this.isJsonString(res)
      debugger
      if (isJSONData?.Code === 200) {
        isJSONData.Image = isJSONData.ListItem[0].Image
        isJSONData.GoodsId = isJSONData.CollectGoodsData.GoodsId
        isJSONData.Title = isJSONData.CollectGoodsData.Title
        isJSONData.CategoryName = isJSONData.ListItem[0].CategoryName
        isJSONData.Price = isJSONData.CollectGoodsData.Price
        isJSONData.Sales = isJSONData.CollectGoodsData.Sales
        isJSONData.Origin = isJSONData.ListItem[0].Origin
        isJSONData.isDetail = true
        return { code: 200, data: isJSONData }
      }
      return { code: -2, data: res }
    } catch (error) {
      return { code: -2, data: `getGoodsDeail-catch: ${error}` }
    }
  }
  async saveGoodsDeail() { // 收藏商品到选品库

  }

  // 收藏采集
  async goodsFactory() { // 组装数据结构
  }
  async saveGoods() { // 收藏商品到选品库
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
  handleLinkKeyFactory(linkKey) {
    try {
      const goodsArrInfo = []
      // if (Array.isArray(linkKey)) { // 处理选择的商品
      //   linkKey.map(item => {
      //     goodsArrInfo.push({
      //       'platformId': item.Platform,
      //       'GoodsId': item.GoodsId
      //     })
      //   })
      // } else { // 处理链接采集
      let linkArr = linkKey.trim()
      if (!linkArr) {
        return { code: -3, data: '关键词不能为空' }
      }
      linkArr = linkArr.trim().replace(/\s/g, ';').split(';')
      const execPlatform = /(yangkeduo.com)|(taobao.com)|(jd.com)|(1688.com)|(detail.tmall.com)|(pinduoduo.com)/g
      // const goodsId = item.match(/\d+/g)
      linkArr.map(item => {
        const platform = item.match(execPlatform)
        if (!platform) {
          this.writeLog(`链接:${item} 识别支持平台失败`, false)
        } else {
          let GoodsId = null
          switch (platform[0]) {
            case 'yangkeduo.com':
              try {
                GoodsId = item.match(/goods_id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 1,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case 'pinduoduo.com':
              try {
                GoodsId = item.match(/goods_id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 1,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case 'taobao.com':
              try {
                GoodsId = item.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 2,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case 'detail.tmall.com':
              try {
                GoodsId = item.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 3,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case 'jd.com':
              try {
                GoodsId = item.match(/(\d+)\.html/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 10,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case '1688.com':
              try {
                GoodsId = item.match(/(\d+)\.html/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 8,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
            case 'jinritemai.com':
              try {
                GoodsId = item.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 14,
                    GoodsId
                  })
                } else {
                  this.writeLog(`链接:${item} 识别商品ID失败`, false)
                }
              } catch (error) {
                this.writeLog(`链接:${item} 识别商品ID失败`, false)
              }
              break
          }
        }
      })
      // }
      return { code: 200, data: goodsArrInfo }
    } catch (error) {
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
