/*
 * @Author: your name
 * @Date: 2021-10-13 11:44:45
 * @LastEditTime: 2021-10-13 15:41:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\application-config.js
 */
export default class applicationConfig {
    nativeService=window['ConfigBridgeService'];
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

    async getConfigByName(name) {
      return await this.nativeService.getConfigByName(name)
    }
    // 获取用户账号
    async getUserConfig() {
      return await this.nativeService.getUserConfig()
    }
    /**
     * 获取店铺信息
     */
    async getGlobalCacheInfo(type, id) {
      return await this.nativeService.getGlobalCacheInfo(type, id)
    }
}
