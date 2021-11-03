export default class BaseUtilService {
  constructor() {
    this.nativeService = window['BaseUtilBridgeService']
  }

  UpdateProxy() { // 清除缓存
    return this.nativeService.updateProxy()
  }
  /**
       *  打开代理浏览器
       * @name : OpenProxyWeb
       * @param :{object}
       */
  OpenProxyWeb(param) { // 打开代理浏览器
    return this.nativeService.openProxyWeb(param)
  }
  stringGetEncodingGbk(writeString) {
    return this.nativeService.stringGetEncodingGbk(writeString.toString())
  }
  getTbAddressModel(addressName) {
    return this.nativeService.getTbAddressModel(addressName)
  }
  cookieRemove(cookie, removeName) {
    return this.nativeService.cookieRemove(cookie.toString(), removeName.toString())
  }
  getMallIp(sysMallId) { // 获取店铺下绑定的ip
    return this.nativeService.getMallIp(sysMallId.toString())
  }
  buildGoodCode(platformId, oriGoodsId) { // 商品编码加密
    return this.nativeService.buildGoodCode(platformId, oriGoodsId, '')
  }
  getLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 淘宝物流获取
    return this.nativeService.getLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  getTbLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 新淘宝物流获取
    return this.nativeService.getTbLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  getJxLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 京东物流获取
    return this.nativeService.getJxLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  getAliBaBaLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 1688物流获取
    return this.nativeService.getAliBaBaLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  aliBaBaRefreshPersonCenterAsync(shotOrderAccount) { // 1688维活
    return this.nativeService.aliBaBaRefreshPersonCenterAsync(shotOrderAccount)
  }
  /**
   * 转换cookie注入到头部
   * @param {*} str
   * @returns
   */
  changeCookies(str) {
    return this.nativeService.stringToCookies(str)
  }
  getPurchaseUa() {
    return this.nativeService.getPurchaseUa()
  }
  openUrl(url) {
    return this.nativeService.openUrl(url)
  }
  checkVersion(version) {
    return this.nativeService.checkVersion(version)
  }
  getPddAddressModel(val) {
    return this.nativeService.getPddAddressModel(val)
  }
  getAddressIP() { // 获取本地外网IP
    return this.nativeService.getAddressIP()
  }
}
