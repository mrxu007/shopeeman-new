
class CollectKeyWordApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.platformId = null
    this.commonAttr = null
    this.keywordAttr = null
    this.delayTime = 1000
    this.GoodsData = null
  }
  _initKeyWord(platformId, commonAttr) { // 初始化过滤条件  平台ID、
    this.platformId = platformId // 关键词采集----平台ID
    this.commonAttr = commonAttr // // 关键词采集----公共参数
  }
  async keywordSearch(key) { // 采集关键字模块
    this.GoodsData = null
    this.GoodsData = []
    let StartPage = this.commonAttr.StartPage - 0
    const EndPage = this.commonAttr.EndPage - 0
    const StartPrice = this.commonAttr.StartPrice - 0
    const EndPrice = this.commonAttr.EndPrice - 0

    const sortWayVal = this.commonAttr.sortWayVal
    const By = sortWayVal.split(',')[0]
    const Order = sortWayVal.split(',')[1]

    const siteCode = this.commonAttr.siteCode
    const Location = this.commonAttr.placeVal

    const params = {}
    params['key'] = key
    try {
      while (StartPage) {
        switch (this.platformId) {
          case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
          case 1.2:
            params['Page'] = StartPage // 页码
            break
          case 2: // '淘宝'  3: '天猫',  天猫 === 淘宝
            params['Page'] = StartPage // 页码
            params['StartPrice'] = StartPrice // 价格范围
            params['EndPrice'] = EndPrice
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
            params['Page'] = StartPage // 页码
            params['By'] = By // 排序名称
            params['Order'] = Order // 排序方式
            params['StartPrice'] = StartPrice // 价格范围
            params['EndPrice'] = EndPrice
            params['Site'] = siteCode.toLowerCase() // 站点
            params['Location'] = Location.join(',') // 发货位置
            break
          case 12: // '速卖通'
            break
          case 13: // '天猫淘宝海外平台'
            break
          case 15: // '货老板云仓
            break
        }
        // 关键词请求
        debugger
        let res = await this._this.$collectService.querySpuByKeyworld(this.platformId, params)
        res = JSON.parse(res)
        if (res.Code !== 200) {
          this.writeLog(`采集${key}关键词第${StartPage}页第一部分失败：${res.Code}-${res.Msg}`, false)
        }
        const len = res?.ListItem?.length
        this.writeLog(`采集${key}关键词第${StartPage}页第一部分，采集到约${len}条`, true)
        if (!len) {
          break
        }

        // 存放采集数据
        this.GoodsData.push(...res.ListItem)

        // 采集初始页大于总页码
        if (StartPage >= EndPage) {
          break
        }
        StartPage++
      }
    } catch (error) {
      this.writeLog(`采集${key}关键词第${StartPage}页第一部分，捕获错误${error}`, false)
    }
    // 处理所需参数
    this.GoodsData = this.GoodsData.map((item, index) => {
      item.id = index + 1
      item.information = ''
      return item
    })
    return { code: 200, data: this.GoodsData }
  }
  async keywordSearchTwo(key) { // 如果当前平台为拼多多需额外调用 拼多多补充接口  1.1-------------------------
    this.GoodsData = null
    this.GoodsData = []
    let StartPage = this.commonAttr.StartPage - 0
    const EndPage = this.commonAttr.EndPage - 0
    const params = {}
    params['key'] = key
    StartPage = this.commonAttr.StartPage - 0
    try {
      while (StartPage) {
        params['page'] = StartPage // 页码
        // 关键词请求
        let res = await this._this.$collectService.querySpuByKeyworld(1.1, params)
        res = JSON.parse(res)
        if (res.Code !== 200) {
          this.writeLog(`采集${key}关键词第${StartPage}页第二部分失败：${res.Code}-${res.Msg}`, false)
        }
        const len = res?.ListItem?.length
        this.writeLog(`采集${key}关键词第${StartPage}页第二部分，采集到约${len}条`, true)
        if (!len) {
          break
        }
        // 存放采集数据
        this.GoodsData.push(...res.ListItem)
        // 采集初始页大于总页码
        if (StartPage >= EndPage) {
          break
        }
        StartPage++
      }
    } catch (error) {
      this.writeLog(`采集${key}关键词第${StartPage}页第二部分，捕获错误${error}`, false)
    }
    // 处理所需参数
    this.GoodsData = this.GoodsData.map((item, index) => {
      item.id = index + 1
      item.information = ''
      return item
    })
    return { code: 200, data: this.GoodsData }
  }
  writeLog(msg, success = true) {
    if (this._this.consoleMsg === undefined) {
      return
    }
    if (!msg) { return }
    const color = success ? 'green' : 'red'
    const time = this.dateFormat(new Date(Date.now()), 'hh:mm:ss')
    this._this.consoleMsg += `<p style="color:${color}; margin-top: 5px;">${time}:${msg}</p>`
  }
  dateFormat(time, fmt) {
    var o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  async delay(time) {
    return new Promise(resolve => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
}

export default CollectKeyWordApI
