export default class MattingService {
    constructor() {
        this.nativeService = window['MattingBridgeService']
    }
    getDrawbotMatting(file, name, flag, type = "") {
        return this.nativeService.drawbotMatting(file, name, flag, type)
    }
    getDrawbotMattingByUrl(file, name, type = "") {
        return this.nativeService.drawbotMattingByUrl(file, name, type)
    }
}
