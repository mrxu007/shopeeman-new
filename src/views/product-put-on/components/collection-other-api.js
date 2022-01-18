import { dateFormat, waitStart } from '../../../util/util'
class CollectOtherApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
    this.errorCatchText = null
    this.GoodsData = null
  }
  // 以图搜图
  async picSearch(platform, params) {
    try {
      let res = await this._this.$collectService.imgSearch(platform, params)
      res = this.isJsonString(res)
      if (typeof res === 'object' && res.Code === 0) {
        const newData = this._this.filterData(res.ListItem)
        return { code: 200, data: newData }
      }
      return { code: -2, data: typeof res === 'string' ? res : res.Msg }
    } catch (error) {
      return { code: -2, data: `picSearch-catch: ${error}` }
    }
  }

  // 天猫淘宝海外平台账号
  async getTaobaoAbroadAccount() {
    try {
      const { muid } = this._this.$userInfo // 变量已注入全局
      waitStart(() => {
        return muid
      }, 5000)
      const params = {
        uid: muid,
        uuid: '0',
        account: '',
        accountAliasName: ''
        // app_key: 'KYsyQGFviz2i0uQF'
      }
      let res = await this._this.$shopeemanService.getChineseLaiZan('http://api.laizand.com/api/open/getTbGlobalUser?', params, { // options
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': ' gzip, deflate',
          'User-Agent': 'RestSharp/106.3.1.0'
        }
      })
      res = JSON.parse(JSON.parse(res).data)
      if (res.code === 200) {
        return { code: 200, data: res.data.data }
      }
      return { code: res.code, data: res.message }
    } catch (error) {
      return { code: -2, data: `getTaobaoAbroadAccount-catch: ${error}` }
    }
  }
  async queryTmCrossBorder(account, time) {
    this.GoodsData = null
    this.GoodsData = []
    let StartPage = 1
    const params = {
      'Page': StartPage,
      'pageSize': 100,
      'SortType': 'DESC',
      'StartModifiedTime': time[0],
      'EndModifiedTime': time[1],
      'SortField': 'modified',
      'Status': 'NORMAL'
    }
    while (StartPage) {
      if (this._this.flag) { // 取消采集
        break
      }
      params['Page'] = StartPage
      let res = null
      try {
        res = await this._this.$collectService.queryTmCrossBorder(account.access_token, params)
        res = JSON.parse(res)
      } catch (error) {
        this.errorCatchText = error
        res = this.handleError()
      }
      if (res.data?.item_id !== 0) {
        this.writeLog(`采集第${StartPage}页失败，数据为空`, false)
        break
      } else {
        let data = res.data.product_list
        console.log('天猫淘宝海外平台', data)
        if (data.length === 0) { // 如果商品长度为0 跳出
          break
        }
        // 存放采集数据
        this.writeLog(`采集第${StartPage}页，采集到约${data.length}条`, true)
        data = data.map(item => {
          item.Image = item.images[0]
          item.GoodsId = item.item_id
          item.Title = item.title
          item.CategoryName = item.category_name
          item.Price = item.price
          item.Sales = 0
          item.Origin = '天猫淘宝海外平台'
          item.Url = `https://distributor.taobao.global/apps/product/detail?mpId=${item.item_id}`
          item.platformId = 13
          item.AccessToken = account.access_token
          return item
        })
        this.GoodsData.push(...data)
      }
      // 采集初始页大于总页码
      StartPage++
    }
    return { code: 200, data: this.GoodsData }
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

export default CollectOtherApI
