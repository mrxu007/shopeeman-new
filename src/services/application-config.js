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
  /**
   * 保存全局设置信息
   * @config 配置信息
   */
  async saveConfig(config) {
    return await this.nativeService.saveConfig(config)
  }

  async getConfigByName(name) {
    return await this.nativeService.getConfigByName(name)
  }
  /**
   * 软件标识
   */
  async appCode() {
    return await this.nativeService.appCode()
  }
  /**
   * 获取全局设置信息
   */
  async getUserConfig() {
    return await this.nativeService.getUserConfig()
  }

  /**
 *
 * @returns 保存个人常用设置
 */
  async saveCustomConfig(name, configJson) {
    return await this.nativeService.saveCustomConfig(name, configJson)
  }
  /**
 *
 * @returns 获取个人常用设置
 */
  async getCustomConfig(name) {
    return await this.nativeService.getCustomConfig(name)
  }
}
