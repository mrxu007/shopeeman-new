/**
 * 买手号操作服务
 */
export default class LogisticBridgeService {
  constructor() {
    this.nativeService = window['LogisticBridgeService']
  }
  getLogisticByOrderIdAsync(shotOrderAccount, orderSn) {
    return this.nativeService.getLogisticByOrderIdAsync(shotOrderAccount, orderSn)
  }
}
