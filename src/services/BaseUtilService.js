export default class BaseUtilService {
  constructor() {
    this.nativeService = window['BaseUtilBridgeService']
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
  getJxLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 京东物流获取
    return this.nativeService.getJxLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  getAliBaBaLogisticByOrderIdAsync(shotOrderAccount, orderSn) { // 1688物流获取
    return this.nativeService.getAliBaBaLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
  aliBaBaRefreshPersonCenterAsync(shotOrderAccount) { // 1688维活
    return this.nativeService.aliBaBaRefreshPersonCenterAsync(shotOrderAccount)
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
  /**
   *  获取拼多多类目
   * @param {*} level 级别
   * @param {*} parenID 类目ID
   * @returns
   */
  getPddCategoryModel(level, parenID) {
    return this.nativeService.getPddCategoryModel(level, parenID)
  }
  /**
   *  获取淘宝类目
   * @param {*} level 级别
   * @param {*} parenID 类目ID
   * @returns
   */
  getTbCategoryModel(level, parentId, CategoryId) {
    return this.nativeService.getTbCategoryModel(level, parentId, CategoryId)
  }
}
