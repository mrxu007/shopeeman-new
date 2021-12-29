/**
 * 买手号操作服务
 */
export default class buyerAccountService {
  constructor() {
    this.nativeService = window['buyerAccountService']
    this.shortOrderService = window['ShortOrderBridgeService']
  }
  /**
   * 拼多多买手号登录
   */
  pddLogin() {
    return this.nativeService.pddLogin()
  }
  /**
   * 进入买手号个人中心
   * @param {*} account
   */
  pddUserCenter(account, url = '') {
    this.nativeService.pddUserCenter(account, url)
  }
  /**
   * 保存买手号信息到本地
   * @param {*} account
   */
  saveAsLocal(account) {
    return this.nativeService.saveAsLocal(account)
  }
  /**
   * 获取本地存储的买手号信息
   */
  getLocalAccounts() {
    return this.nativeService.getLocalAccounts()
  }
  /**
   * 淘宝登录
   */
  taobaoLogin() {
    return this.nativeService.taobaoLogin()
  }
  /**
   * 打开淘宝账号个人中心
   * @param {*} account
   */
  taobaoUserCenter(account, url = '') {
    return this.nativeService.taobaoUserCenter(account, url)
  }
  /**
   * 京东登录
   */
  jingdongLogin() {
    return this.nativeService.jingdongLogin()
  }
  /**
   * 打开京东账号个人中心
   * @param {*} account
   */
  jingdongUserCenter(account, url = '') {
    return this.nativeService.jingdongUserCenter(account, url)
  }
  /**
   * 京喜登录
   */
  jingxiLogin() {
    return this.nativeService.jingxiLogin()
  }
  /**
   * 打开京喜账号个人中心
   * @param {*} account
   */
  jingxiUserCenter(account, url = '') {
    return this.nativeService.jingxiUserCenter(account, url)
  }
  /**
   * 1688登录
   */
  AlibabaLogin() {
    return this.nativeService.alibabaLogin()
  }
  /**
   * 打开1688账号个人中心
   * @param {*} account
   */
  AlibabaUserCenter(account, url = '') {
    return this.nativeService.alibabaUserCenter(account, url)
  }
  /**
   * 拼多多优惠劵
   */
  pddCouponWindow(ShotOrderAccount) {
    if (this.nativeService.pddCouponWindow) {
      return this.nativeService.pddCouponWindow(ShotOrderAccount)
    }
  }

  /**
   * 拼多多规格映射
   * @param {*} relationSkuModel
   * @param {*} account
   * @returns
   */
  skuRelationWindow(relationSkuModel, account) {
    return this.nativeService.skuRelationWindow(relationSkuModel, account)
  }
  /**
   * 获取映射信息
   * @param {*} sysOrderIds
   * @returns
   */
  getBySysOrderIds(sysOrderIds) {
    return this.shortOrderService.getBySysOrderIds(sysOrderIds.toString())
  }
}
