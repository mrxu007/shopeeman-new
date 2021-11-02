/*
 * @Author: your name
 * @Date: 2021-10-13 16:56:39
 * @LastEditTime: 2021-11-02 10:34:03
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\XzyNetMessageService.js
 */
export default class XzyNetMessageService {
  baseUrl = 'http://api.xzy.com'
  baseUrlA = 'http://user.xzygyl.com'
  constructor() {
    this.nativeService = window['XzyNetMessageBridgeService']
  }
  getA(apiName, params) {
    return this.nativeService.get(this.baseUrlA + apiName, JSON.stringify(params))
  }
  get(apiName, params) {
    return this.nativeService.get(this.baseUrl + apiName, JSON.stringify(params))
  }
  post(apiName, data, options = { 'Content-Type': 'application/json' }) {
    console.log(this.baseUrl,apiName,JSON.stringify({ headers: options }),JSON.stringify(data))
    return this.nativeService.post(`${this.baseUrl}`, apiName, JSON.stringify({ headers: options }), data ? JSON.stringify(data) : null)
  }
}
