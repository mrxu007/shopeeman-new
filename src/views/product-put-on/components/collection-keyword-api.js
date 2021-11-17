
class CollectKeyWordApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.platformId = null
    this.commonAttr = null
    this.keywordAttr = null
  }
  _initKeyWord(platformId, commonAttr) { // 初始化过滤条件  平台ID、
    this.platformId = platformId // 关键词采集----平台ID
    this.commonAttr = commonAttr // // 关键词采集----公共参数
  }
  keywordSearch(key) {
    let StartPage = this.commonAttr.StartPage
    const EndPage = this.commonAttr.EndPage
    return new Promise((resolve, reject) => {
      const GoodsData = []
      const len = key.length
      const params = {}
      key.map(async (item, index) => {
        try {
          while (StartPage) {
            switch (this.platformId) {
              case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
              case 1.2:
                params['page'] = StartPage // 页码
                break
              case 2: // '淘宝'  3: '天猫',  天猫 === 淘宝
                break
              case 4: // '京东'
                break
              case 5: // '自有'
                break
              case 7: // '货源甲'
                break
              case 8: // '1688'
                break
              case 9: // 'Lazada'
                break
              case 10: // '京喜'
                break
              case 11: // '虾皮'
                break
              case 12: // '速卖通'
                break
              case 13: // '天猫淘宝海外平台'
                break
              case 15: // '货老板云仓
                break
            }
            params['key'] = item // 关键词
            let res = await this._this.$collectService.querySpuByKeyworld(this.platformId, params)
            res = JSON.parse(res)
            console.log(item, res)
            debugger
            if (StartPage > EndPage) {
              break
            }
            StartPage++
          }
        } catch (error) {
          console.log('keywordSearch-catch', error)
          return { code: -2, data: `keywordSearch-catch: ${error}` }
        }
        if (index === len - 1) {
          this.writeLog('关键词采集完毕')
          resolve({ code: 200, data: GoodsData })
        }
      })
    })
  }
  writeLog(msg, color) {
    if (this._this.consoleMsg === undefined) {
      return
    }
    this._this.consoleMsg += msg + '\n'
  }
}

export default CollectKeyWordApI
