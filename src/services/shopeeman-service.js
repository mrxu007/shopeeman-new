export default class NetMessageBridgeService {
  NetMessageBridgeService() {
    return window['NetMessageBridgeService']
  }

  getExtraInfo(data) {
    return {
      mallId: data.mallId || data.platform_mall_id || data.shop_id,
      isEmoticons: false
    }
  }

  //大陆后台
  site_domain_chinese_bk = {
    'MY': 'https://seller.my.shopee.cn',
    'TW': 'https://seller.xiapi.shopee.cn',
    'VN': 'https://seller.vn.shopee.cn',
    'ID': 'https://seller.id.shopee.cn',
    'PH': 'https://seller.ph.shopee.cn',
    'TH': 'https://seller.th.shopee.cn',
    'SG': 'https://seller.sg.shopee.cn',
    'BR': 'https://seller.br.shopee.cn',
    'MX': 'https://seller.mx.shopee.cn',
    'CO': 'https://seller.co.shopee.cn',
    'CL': 'https://seller.cl.shopee.cn',
    'PL': 'https://seller.pl.shopee.cn'
  }
  //本土后台
  site_domain_local_bk = {
    'MY': 'https://seller.shopee.com.my',
    'TW': 'https://seller.shopee.tw',
    'VN': 'https://banhang.shopee.vn',
    'ID': 'https://seller.shopee.co.id',
    'PH': 'https://seller.shopee.ph',
    'TH': 'https://seller.shopee.co.th',
    'SG': 'https://seller.shopee.sg',
    'BR': 'https://seller.shopee.com.br',
    'MX': 'https://seller.shopee.com.mx',
    'CO': 'https://seller.shopee.com.co',
    'CL': 'https://seller.shopee.cl',
    'PL': 'https://seller.shopee.pl'
  }

  /**
   * @param country 站点
   * @param api api尾缀
   * @param data  参数
   * @param options 头部
   */
  getChinese(country, api, data, options = {}) {
    let url = this.site_domain_chinese_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  getLocal(country, api, data, options) {
    let url = this.site_domain_local_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  postChinese(country, api, data, options) {
    let url = this.site_domain_chinese_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  postLocal(country, api, data, options) {
    let url = this.site_domain_local_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  //获取离线回复数据
  scOfflineReply(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/offline_reply', data)
  }
  //获取自动回复数据
  scChatSetting(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/chat_setting', data)
  }

}
