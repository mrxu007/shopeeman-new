import { dateFormat, delay } from '../../../util/util'
class CollectEntireApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
  }

  async checkMallLink(link) { // 检测店铺链接
    try {
      const res = await this._this.$collectService.getMallByLink(link)
      return { code: 200, data: res }
    } catch (error) {
      return { code: -2, data: `checkMallLink-catch: ${error}` }
    }
  }
  async mallSearch(link) {
    const res = await this.checkMallLink(link)
    if (res.code !== 200) {
      return { code: res.code, data: res.data }
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
        return false
      }
    } else {
      return false
    }
  }
}

export default CollectEntireApI
