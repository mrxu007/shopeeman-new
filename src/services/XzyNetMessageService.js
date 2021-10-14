/*
 * @Author: your name
 * @Date: 2021-10-13 16:56:39
 * @LastEditTime: 2021-10-13 17:47:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\XzyNetMessageService.js
 */
export default class XzyNetMessageService {
    baseUrl='http://api.xzygyl.com'
    constructor() {
      this.nativeService = window['XzyNetMessageBridgeService']
    }
    get(apiName,params) {
      return this.nativeService.get(this.baseUrl+apiName, JSON.stringify(params))
    }
    post(apiName, data, options = { 'Content-Type': 'application/json' }) {
      return this.nativeService.post(`${this.baseUrl}`, apiName, JSON.stringify({ headers: options }), data ? JSON.stringify(data) : null)
    }
  }
  