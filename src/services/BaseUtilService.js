/*
 * @Author: your name
 * @Date: 2021-10-22 11:35:50
 * @LastEditTime: 2021-11-06 16:41:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\BaseUtilService.js
 */
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
  /**
   * @name :
   * @param  {*}
   * @param {*} platform 平台
   * @param {*} orderSn 订单号
   * @param {*} buyerAccount 买手号实体
   * @param {*} collectStatus ture 只获取揽收的物流 false 所有物流
   */
  // / code:200=>有物流 401=》账号失效 402=》未获取到物流 403=》未揽收 405=》cookie解析异常 406=》物流匹配失败 407=>订单不存在 408=>未知平台 409 需要验证
  getOriginLogistics(platform, orderSn, buyerAccount, collectStatus = false) {
    console.log(platform, orderSn, buyerAccount, 'baseconfig')
    return this.nativeService.getOriginLogistics(platform, orderSn, buyerAccount, false)
  }
  /**
   * @name : 代开订单详情等窗口
   * @param  {*} 店铺id
   * @param {*} shopId
   * @param {*} reqStr
   * let reqStr = {
       type: type,
           /// orderDetail(id(order list)):订单详情；
           /// itemDetail(id(goods)):商品详情
           /// personalDetail（to_shop_id）:个人详情
           /// reportUser(to_shop_id):举报用户
           /// shopVouchers:店铺优惠券 itemVouchers:商品优惠券  </param>
           /// frontItemDetail: 前台商品查看
           /// vouchersDetail：优惠券详情
       shopId: shopId, 店铺id
       id: id /// 商品id、或者优惠券id
     }
   */
  async getOrderDetailInfo(shopId, reqStr) {
    return await this.nativeService.getOrderDetailInfo(shopId, reqStr)
  }
}
