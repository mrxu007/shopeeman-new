/*
 * @Author: your name
 * @Date: 2021-10-13 11:44:45
 * @LastEditTime: 2021-11-11 22:02:54
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\application-config.js
 */
export default class applicationConfig {
  nativeService = window['ConfigBridgeService'];
  /**
   * 获取当前登录的用户信息
   */
  async getUserInfo() {
    return await this.nativeService.getUserInfo()
  }
  /**
   * 获取当前配置的主题色
   */
  async primaryColor() {
    return await this.nativeService.primaryColor()
  }

  async saveConfig(config) {
    return await this.nativeService.saveConfig(config)
  }

  // 获取仓库信息
  async getWarehouseInfo(val) {
    return await this.nativeService.getWarehouseInfo(val)
  }
  async getConfigByName(name) {
    return await this.nativeService.getConfigByName(name)
  }
  // 获取用户账号
  async getUserConfig() {
    return await this.nativeService.getUserConfig()
  }
  /**
   * 获取店铺信息 买手号信息 type: buyerInfo 
    mallInfo (mallInfo:根据店铺id查询店铺信息   ****
    sysMallId：根据系统店铺id查询店铺信息) id:店铺id or 系统店铺id
    allMallInfo：获取所有店铺信息~
   */
  async getGlobalCacheInfo(type, id) {
    return await this.nativeService.getGlobalCacheInfo(type, id)
  }
   /**
    * @name : UpdateCacheInfo 更新买手号
    * @param  {*}
    * @param {*} type user.type
    * @param {*} key key值的组合规则用type+用户昵称+手机号
    * @param {*} value
    */
   async UpdateCacheInfo(type,key,value) {
    return await this.nativeService.updateCacheInfo(type,key,value)
  }
  async updateInfoMall(mallId, webLoginInfo) {
    return await this.nativeService.updateInfo(mallId, webLoginInfo)
  }
}
