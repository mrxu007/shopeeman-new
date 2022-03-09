import { dateFormat, delay } from '../../../util/util'
class CollectKeyWordApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.platformId = null
    this.commonAttr = null
    this.keywordAttr = null
    this.delayTime = 1000
    this.GoodsData = null

    this.errorCatchText = null // 日志收集
  }
  _initKeyWord(platformId, commonAttr) { // 初始化过滤条件  平台ID、
    this.platformId = platformId // 关键词采集----平台ID
    this.commonAttr = commonAttr // // 关键词采集----公共参数
  }
  async keywordSearch(key, itemList) { // 采集关键字模块
    this.GoodsData = null
    this.GoodsData = []
    // 公共
    let StartPage = this.commonAttr.StartPage - 0
    const EndPage = this.commonAttr.EndPage - 0

    // 淘宝
    const StartPrice = this.commonAttr.StartPrice - 0
    const EndPrice = this.commonAttr.EndPrice - 0

    // shopee
    const shopeeSortTypeVal = this.commonAttr.shopeeSortTypeVal
    const By = shopeeSortTypeVal.split(',')[0]
    const Order = shopeeSortTypeVal.split(',')[1]
    const shopeeSiteCode = this.commonAttr.shopeeSiteCode
    const Location = this.commonAttr.shopeePlaceVal

    // Lazada
    const lazadaSiteCode = this.commonAttr.lazadaSiteCode
    const lazadaLocation = this.commonAttr.lazadaPlaceVal0.concat(this.commonAttr.lazadaPlaceVal1)
    // 1688
    const alibabaSortTypeVal = this.commonAttr.alibabaSortTypeVal

    const params = {}
    params['Key'] = key
    while (StartPage) {
      if (this._this.flag) { // 取消采集
        break
      }
      if (this.platformId === 2) {
        const filterData = this._this.goodsList.filter(item => {
          return item.wordLimitKey === key
        })
        if (filterData.length >= Number(this.commonAttr.wordLimit)) break
      }
      switch (this.platformId) {
        case 1: // 拼多多  1 拼多多接口、  1.1 拼多多补充接口
          params['Page'] = StartPage // 页码
          break
        case 2: // '淘宝'
        case 3: // '天猫'   天猫 === 淘宝
          params['Page'] = StartPage // 页码
          params['StartPrice'] = StartPrice // 价格范围
          params['EndPrice'] = EndPrice
          break
        case 8: // '1688'
          params['Page'] = StartPage // 页码
          params['SortType'] = alibabaSortTypeVal // 页码
          break
        case 9: // 'Lazada'
          params['Page'] = StartPage // 页码
          params['Site'] = lazadaSiteCode.toLowerCase() // 站点
          params['StartPrice'] = StartPrice // 价格范围
          params['EndPrice'] = EndPrice
          params['Location'] = lazadaLocation.join(',') // 发货位置
          break
        case 10: // '京喜/京东'
          params['Page'] = StartPage // 页码
          // params['StartPrice'] = StartPrice // 价格范围
          // params['EndPrice'] = EndPrice
          break
        case 11: // 'shopee'
          params['Page'] = StartPage // 页码
          params['By'] = By // 排序名称
          params['Order'] = Order // 排序方式
          params['StartPrice'] = StartPrice // 价格范围
          params['EndPrice'] = EndPrice
          params['Site'] = shopeeSiteCode.toLowerCase() // 站点
          params['Location'] = Location // 发货位置
          break
        case 12: // '速卖通'
          params['Page'] = StartPage // 页码
          break
        case 13: // '天猫淘宝海外平台' 不支持关键词采集
          break
      }
      // 关键词请求
      let res = null
      try {
        res = await this._this.$collectService.querySpuByKeyworld(this.platformId, params)
      } catch (error) {
        this.errorCatchText = error
        res = this.handleError()
      }
      res = JSON.parse(res)
      if (res.Code !== 200) {
        if (this.platformId === 1) {
          this.writeLog(`采集${key}关键词第${StartPage}页第一部分失败：已无可采数据`, false)
        } else {
          this.writeLog(`采集${key}关键词第${StartPage}页失败：已无可采数据`, false)
        }
        break
      } else {
        res.ListItem = res.ListItem.map((item, index) => {
          item.id = index + 1
          item.information = ''
          if (this.platformId === 9) {
            item.Site = params.Site
          }
          item.wordLimitKey = key
          return item
        })
        const newData = this._this.filterData(res.ListItem)
        if (this.platformId === 1) {
          this.writeLog(`采集${key}关键词第${StartPage}页第一部分，采集到约${res.ListItem.length}条，过滤${res.ListItem.length - newData.length}条`, true)
        } else {
          this.writeLog(`采集${key}关键词第${StartPage}页数据，采集到约${res.ListItem.length}条，过滤${res.ListItem.length - newData.length}条`, true)
        }
        if (this.platformId === 2) { // 淘宝关键词 判断单词最大
          const nameData = this._this.goodsList.filter(item => { return item.wordLimitKey === key })
          const num = Number(this.commonAttr.wordLimit) - nameData.length
          itemList = newData.splice(0, num)
          this._this.goodsList = this._this.goodsList.concat(itemList)
        } else {
          this._this.goodsList = this._this.goodsList.concat(newData)
        }
      }
      // 采集初始页大于总页码
      if (this.platformId !== 2 && StartPage >= EndPage) {
        break
      }
      StartPage++
    }
  }
  async keywordSearchTwo(key) { // 如果当前平台为拼多多需额外调用 拼多多补充接口  1.1-------------------------
    this.GoodsData = null
    this.GoodsData = []
    let StartPage = this.commonAttr.StartPage - 0
    const EndPage = this.commonAttr.EndPage - 0
    const params = {}
    params['key'] = key
    while (StartPage) {
      if (this._this.flag) { // 取消采集
        break
      }
      params['page'] = StartPage // 页码
      // 关键词请求
      let res = null
      try {
        res = await this._this.$collectService.querySpuByKeyworld(1.1, params)
      } catch (error) {
        this.errorCatchText = error
        res = this.handleError()
      }
      res = JSON.parse(res)
      console.log('res', res)
      if (res.Code !== 200) {
        // this.writeLog(`采集${key}关键词第${StartPage}页第二部分失败：${res.Code} ${res.Msg}`, false)
        this.writeLog(`采集${key}关键词第${StartPage}页第二部分失败：已无可采数据`, false)
        break
      } else {
        res.ListItem = res.ListItem.map((item, index) => {
          item.id = index + 1
          item.information = ''
          return item
        })
        const newData = this._this.filterData(res.ListItem)
        this._this.goodsList = this._this.goodsList.concat(newData)
        this.writeLog(`采集${key}关键词第${StartPage}页第二部分，采集到约${res.ListItem.length}条，过滤${res.ListItem.length - newData.length}条`, true)
      }
      // 采集初始页大于总页码
      if (StartPage >= EndPage) {
        break
      }
      StartPage++
    }
  }
  // 辅助--------------------------------------------
  handleError() {
    let errorText = JSON.stringify(this.errorCatchText).replace(/\s/g, '')
    if (errorText.indexOf('数据列表为空') > -1) {
      errorText = '数据列表为空'
    } else if (errorText.indexOf('返回数据不能为空') > -1) {
      errorText = '返回数据不能为空'
    } else if (errorText.indexOf('超出页数限制') > -1 || errorText.indexOf('获取Shopee商品详情为空') > -1) {
      errorText = '采集完成，采集已达最大页数限制'
    }
    this.errorCatchText = null
    return JSON.stringify({ Code: -2, Msg: `捕获错误${errorText}` })
  }
  handleKeyFactory(key) {
    try {
      let keyword = key.trim()
      if (!keyword) {
        return { code: -3, data: '关键词不能为空' }
      }
      keyword = keyword.replace(/\s/g, ';').split(';') //
      // const data = [[]]
      // let index = 0
      // keyword.map(item => { // 分组
      //   if (data[index].length >= num) {
      //     index++
      //     data[index] = []
      //   }
      //   data[index].push(item)
      // })
      // keyword = null
      return { code: 200, data: keyword }
    } catch (error) {
      return { code: -2, data: `关键词格式不规范：${error}` }
    }
  }
  // 处理标题过滤字段
  filterLinkKeyWord(tData, fKeyArr) {
    const title = tData
    console.log(title)
    let result = false
    const keyword = []
    // fKeyArr.forEach(item => {
    //   var reg = RegExp(item)
    //   console.log(reg.test(title)) // true
    // })
    for (let index = 0; index < fKeyArr.length; index++) {
      const element = fKeyArr[index]
      console.log(element)
      var reg = RegExp(element.replace(/^[^\w^\s^\u4e00-\u9fa5]/i, '')) // 先替换开头的特殊字符
      result = reg.test(title)
      if (result) {
        keyword.push(element)
        break
      }
    }
    console.log('keyword', keyword)
    return keyword.join(',')
  }
  // 处理标题过滤限制方法
  handleKeyFilter(arr) {
    console.log(arr, '处理数据')
    if (Array.isArray(arr)) {
      if (arr.length > 1000) {
        arr = arr.slice(0, 1000)
        this.notify('标题过滤设置', '请输入小于1000组以内的关键词', 'warning')
      }
    } else {
      arr = arr.split('\n')
      if (arr.length > 1000) {
        arr = arr.slice(0, 1000)
        this.notify('标题过滤设置', '请输入小于1000组以内的关键词', 'warning')
      }
    }
    return arr
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
}

export default CollectKeyWordApI
