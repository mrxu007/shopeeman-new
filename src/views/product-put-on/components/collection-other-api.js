import { dateFormat, delay } from '../../../util/util'
class CollectOtherApI {
  _this = null // vue 实例
  constructor(that) {
    this._this = that
  }
  async picSearch(platform, params) {
    try {
      let res = await this._this.$collectService.imgSearch(platform, params)
      res = this.isJsonString(res)
      if (typeof res === 'object' && res.Code === 0) {
        return { code: 200, data: res.ListItem }
      }
      return { code: -2, data: typeof res === 'string' ? res : res.Msg }
    } catch (error) {
      return { code: -2, data: `picSearch-catch: ${error}` }
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
