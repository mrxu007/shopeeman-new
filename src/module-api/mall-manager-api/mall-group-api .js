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

  async getUrlPrefix(country) {
    const response = await window['ConfigBridgeService'].getUserConfig()
    const data = JSON.parse(response)
    const dominType = data.SwitchDominTypeSetting === 'Local'
    return dominType && this.site_domain_chinese_bk[country] || this.site_domain_local_bk[country]
  }

  // 大陆后台
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
  // 本土后台
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
  async getChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  async postChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
    let param = data
    if (data.isString) {
      param = data.isString
    }
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(param))
  }

  async putChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))

    let referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: this.site_domain_chinese_bk[country],
          referer: this.site_domain_chinese_bk[country] + referer
        })
    }
    return this.NetMessageBridgeService().put(url, JSON.stringify(options), JSON.stringify(data))
  }

  async deleteChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
    let referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: this.site_domain_chinese_bk[country],
          referer: this.site_domain_chinese_bk[country] + referer
        })
    }
    return this.NetMessageBridgeService().delete(url, JSON.stringify(options), JSON.stringify(data))
  }

  // 获取自动回复数据
  scChatSetting(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/chat_setting', data)
  }

  //设置自动回复数据
  setChatSetting(country, data) {
    let options = {
      headers: {
        'Content-Type': 'application/json;charset=UTF-8'
      }
    }
    return this.putChinese(country, '/webchat/api/workbenchapi/v1.2/sc/chat_setting', data, options)
  }

  // 获取离线回复数据
  scOfflineReply(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/offline_reply', data)
  }

  //设置离线回复数据
  setOfflineReply(country, data, options = {}) {
    options.headers = Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    })

    return this.putChinese(country, '/webchat/api/workbenchapi/v1.2/sc/offline_reply', data, options)
  }

  // 店铺登录
  async login(country, data) {
    let res = await this.getChinese(country, '/api/v2/login', data)
    try {
      res = JSON.parse(res)
      if (res.status === 200) {
        const data = JSON.parse(res.data)
        const Cookie = {}
        Cookie['token'] = data.token
        Cookie['cstoken'] = data.cs_token
        Cookie['satoken'] = data.satoken || ''
        Cookie['sso'] = data.sso
        Cookie['shopeeuid'] = data.shopId
        Cookie['shopid'] = data.id
        Cookie['portrait'] = data.portrait
        Cookie['userRealName'] = data.username
        Cookie['mainAccountId'] = data.mainAccountId || ''
        Cookie['portrait'] = data.portrait
        const obj = {
          mallId: data.shopid + '',
          username: data.username,
          Cookie
        }
        return { code: 200, data: obj }
      }
      return { code: res.status, data: `${res.status} ${res.data} ` }
    } catch (e) {
    }
  }

  //获取快捷消息
  messageShortcutsGroups(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/groups', data)
  }

  //设置快捷消息
  setShortcutsGroups(country, data) {
    return this.postChinese(country, '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group', data)
  }

  //开关快捷消息
  switchMessageShortcutsGroups(country, data) {
    let url = '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group/' + data.id
    return this.putChinese(country, url, data)
  }

  //删除快捷消息
  deleteMessageShortcutsGroups(country, data, options = {}) {
    let url = '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group/' + data.id
    return this.deleteChinese(country, url, data, options)
  }

  //获取问题问候语
  scFaqs(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs', data)
  }

  //设置问题问候语
  faqsShopSettings(country, data) {
    return this.putChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data)
  }

  //提交问题问候语
  updateFaqsShopSettings(country, data) {
    return this.postChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data)
  }

  //删除问题问候语
  deleteFaqsShopSettings(country, data) {
    return this.deleteChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data)
  }

  //获取银行卡信息
  getBankAccounts(country, data, option) {
    return this.postChinese(country, '/api/v3/finance/get_bank_accounts/', data, option)
  }

  //获取银行卡详细信息
  getWalletTransactions(country, data, option) {
    return this.getChinese(country, '/api/v3/finance/get_wallet_transactions/', data, option)
  }

  //获取银行卡金额
  getWalletStatus(country, data, option) {
    return this.getChinese(country, '/api/v3/finance/get_wallet_status', data, option)
  }

  //提取金额
  // getBankAccounts(country, data,option) {
  //   return this.postChinese(country, '/api/v3/finance/get_bank_accounts/', data,option)
  // }

}
