//

export default class TranslationBridgeService {
  user = ''
  nativeService = window['TranslationBridgeService']
  /**
   * 阿里付费翻译
   * @content 翻译文本（json对象）["V窄边框+油画肌理画芯","V窄边框+大韩水晶烤瓷镜面"]
   * @fromLanguage 源语言
   * @toLanguage 目标语言
   */
  getAliYunTransResult(content, fromLanguage, toLanguage) {
    return this.nativeService.getAliYunTransResult(content, fromLanguage, toLanguage)
  }

  /**
   * 谷歌翻译
   */
  getGoogleTransResult(content, fromLanguage, toLanguage) {
    return this.nativeService.getGoogleTransResult(JSON.stringify(content), fromLanguage, toLanguage)
  }

  /**
   * 阿里图片付费翻译
   */
  getAliYunTranslateImg(content, fromLanguage, toLanguage) {
    return this.nativeService.getAliYunTranslateImg(content, fromLanguage, toLanguage)
  }

  /**
   * 云图片翻译
   */
  getYunTranslateImg(content, toLanguage,type = '') {
    return this.nativeService.getYunTranslateImg(content, toLanguage,type)
  }

}
