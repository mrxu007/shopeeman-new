export default class ImageService {
    constructor() {
        this.nativeService = window['ImageBridgeService']
    }
    getImageBase64Url(url, suffix) {
        return this.nativeService.getImageAsBase64Url(url, suffix)
    }
}
