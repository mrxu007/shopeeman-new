/*
 * @Author: your name
 * @Date: 2021-10-22 11:35:50
 * @LastEditTime: 2022-01-18 11:56:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\BaseUtilService.js
 */
export default class BaseUtilService {
  constructor() {
    this.nativeService = window['BaseUtilBridgeService']
  }

  /**
   @param :json
   @name :params
   *
   */
  updateUserConfig(params) { // 更改用户配置
    return this.nativeService.updateUserConfig(params)
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
  // </summary>
  // int platform 上家平台
  // string goodsId 上家商品id
  // string site 站点
  // string shopId 店铺id
  // string tmallCrossBorderUserId 天猫淘宝海外用户id
  buildGoodCode(platform, goodsId, site, shopId, tmallCrossBorderUserId) { // 商品编码加密
    return this.nativeService.buildGoodCode(platform, goodsId.toString(), site, shopId.toString(), tmallCrossBorderUserId.toString())
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
    // console.log(platform, orderSn, buyerAccount, 'baseconfig')
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
  async getLocalTranslationThesaurus(word) {
    return await this.nativeService.getLocalTranslationThesaurus('auto', 'zh-Hans', word)
  }
  // 获取海外地址信息
  async getLazadaDetailAddress(provinceid, contry) {
    return await this.nativeService.getLazadaDetailAddress(provinceid, contry)
  }
  // 下载条形码
  downloadBarCode(data) {
    return this.nativeService.downloadBarCode([data])
  }
  // 解密sku
  decGoodCode(itemSku) {
    return this.nativeService.decGoodCode(itemSku)
  }
  async loginNeedPopUps(name, data) {
    return await this.nativeService.loginNeedPopUps(name, JSON.stringify(data))
  }
  async gotoUploadTab(type, ids) {
    return this.nativeService.gotoUploadTab(type.toString(), ids.toString())
  }
  async getUploadGoodsId() {
    return this.nativeService.getUploadGoodsId()
  }
  // 获取插件port
  async getPluginPorts() {
    return this.nativeService.getPluginPorts()
  }
  // 清理缓存
  async clealAllCache() {
    return this.nativeService.clealAllCache()
  }
  /**
   * 清理翻译缓存
   * @param {*} start "2022-01-01 00:00:00"
   * @param {*} end "2022-01-13 00:00:00"
   * @returns
   */
  async clearGoodsTranslateInfo(start, end) {
    return this.nativeService.clearGoodsTranslateInfo(start, end)
  }

  /**
   * 获取翻译缓存
   * @param fromLanguage 原语言
   * @param toLanguage 翻译后语言
   * @param text 原数据
   * @returns {Promise<*>}
   */
  async getGoodsTranslateInfo(fromLanguage, toLanguage, text) {
    return this.nativeService.getGoodsTranslateInfo(fromLanguage, toLanguage, text)
  }

  /**
   * 保存翻译
   * @param jsonStr
   * @returns {*}
   */
  async saveGoodsTranslation(jsonStr) {
    return this.nativeService.saveGoodsTranslation(jsonStr)
  }

  /**
   * 图片转base64
   * @param url
   * @returns {Promise<*>}
   */
  async imageToBase64String(url){
    return this.nativeService.imageToBase64String(url)
  }
}
