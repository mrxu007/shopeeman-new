export default class MattingService {
    constructor() {
        this.nativeService = window['MattingBridgeService']
    }
    getDrawbotMatting(file, name, type) {
        return this.nativeService.drawbotMattingByUrl(file, name, type)
    }
}
