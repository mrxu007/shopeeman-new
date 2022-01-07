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
      const { platformId, GoodsId, ShopId, Site, Platform } = this.goods
      const params = {}
      params['GoodsId'] = GoodsId
      params['ShopId'] = ShopId
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
          params['ShopId'] = ShopId
          params['AccessToken'] = ''
          break
      }
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
      const execPlatform = /(yangkeduo.com)|(taobao.com)|(jd.com)|(1688.com)|(detail.tmall.com)|(pinduoduo.com)/g
      linkArr.map(item => {
        const platform = item.Url.match(execPlatform)
        if (!platform) {
          this.writeLog(`链接:${item.Url} 识别支持平台失败`, false)
        } else {
          let GoodsId = null
          switch (platform[0]) {
            case 'yangkeduo.com':
              try {
                GoodsId = item.Url.match(/goods_id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 1,
                    GoodsId,
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
              break
            case 'pinduoduo.com':
              try {
                GoodsId = item.Url.match(/goods_id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 1,
                    GoodsId,
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
              break
            case 'taobao.com':
              try {
                GoodsId = item.Url.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 2,
                    GoodsId,
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
              break
            case 'detail.tmall.com':
              try {
                GoodsId = item.Url.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 3,
                    GoodsId,
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
              break
            case 'jd.com':
              try {
                GoodsId = item.Url.match(/(\d+)\.html/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 10,
                    GoodsId,
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
              break
            case '1688.com':
              try {
                GoodsId = item.Url.match(/(\d+)\.html/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 8,
                    GoodsId,
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
              break
            case 'jinritemai.com':
              try {
                GoodsId = item.Url.match(/id=(\d+)/)[1]
                if (GoodsId) {
                  goodsArrInfo.push({
                    'platformId': 14,
                    GoodsId,
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
              break
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
