/*
 * @Author: your name
 * @Date: 2021-10-13 16:56:39
 * @LastEditTime: 2021-10-15 16:04:39
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\XzyNetMessageService.js
 */
export default class XzyNetMessageService {
<<<<<<< HEAD
    baseUrl='http://api.xzy.com/api/route'
    baseUrlA = ''
=======
    baseUrl='http://api.xzy.com'
    baseUrlA = 'http://user.xzygyl.com'
>>>>>>> d61e27e3c7b2e00d2bac764d267e013cd99ffbb9
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
      return this.nativeService.post(`${this.baseUrl}`, apiName, JSON.stringify({ headers: options }), data ? JSON.stringify(data) : null)
    }
}
