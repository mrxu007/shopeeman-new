export default class CloudLogBridgeService {
  constructor() {
    this.nativeService = window['CloudLogBridgeService']
    console.log("window['BaseUtilBridgeService']", window['BaseUtilBridgeService'])
  }
  upLoadWebError(message, noteJson, route) { // 上报 web端抛出异常
    return this.nativeService.upLoadWebError(message, noteJson, route)
  }
  upLoadWebFail(data) { // 上报web失败
    const { message, noteJson, route } = data
    return this.nativeService.upLoadWebFail(message, noteJson, route)
  }
  upLoadWebNewGoodSuccess(data) {
    const { oriGoodId, goodId, mallId } = data
    return this.nativeService.upLoadWebNewGoodSuccess(oriGoodId, goodId, mallId)
  }
  upLoadWebNewGoodFail(data) {
    const { oriGoodId, goodId, mallId, message } = data
    return this.nativeService.upLoadWebNewGoodFail(oriGoodId, goodId, mallId, message)
  }
}
