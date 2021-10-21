export default class ImageService {
    constructor() {
        this.nativeService = window['ImageBridgeService']
    }
    getImageBase64Url(url, suffix) {
        return this.nativeService.getImageAsBase64Url(url, suffix)
    }
    // / <param name="url">图片链接</param>
    // / <param name="suffix">后缀名</param>
    // / <param name="waterText">水印文字</param>
    // / <param name="fontSize">字体大小</param>
    // / <param name="hexColor">十六进制颜色</param>
    // / <param name="watermarkPosition">位置</param>
    // TopLeft, 0
    // TopRight, 1
    // BottomLeft, 2
    // BottomRight, 3
    // Center 4
    // (string url, string suffix,string waterText, int fontSize, string hexColor, int watermarkPosition)
    getImageAsBase64UrlWithWater(url, suffix, waterText, fontSize, hexColor, watermarkPosition) {
        return this.nativeService.getImageAsBase64UrlWithWater(url, suffix, waterText, fontSize, hexColor, watermarkPosition)
    }

    // public async Task<ImageBaseModel> GetImageWithWater(string url, string suffix, string waterText)
    getImageWithWater(url, suffix, waterText) {
        return this.nativeService.getImageWithWater(url, suffix, waterText)
    }
}
