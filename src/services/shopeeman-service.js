import { sha256 } from 'js-sha256'
import md5 from 'js-md5'
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
   * @param options 头部 referer只需要添加尾缀
   */
  async getChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  async postChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  async putChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    return this.NetMessageBridgeService().put(url, JSON.stringify(options), JSON.stringify(data))
  }

  async deleteChinese(country, api, data, options = {}) {
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)

    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    return this.NetMessageBridgeService().delete(url, JSON.stringify(options), JSON.stringify(data))
  }

  // 手机号是否符合各个国家的手机号
  getTelephoneNumberIsTrue(country, account) {
    // ar-DZ
    // ar-SY
    // ar-SA
    // en-US
    // cs-CZ
    // de-DE
    // da-DK
    // el-GR
    // en-AU
    // en-GB
    // en-HK
    // en-IN
    // en-NZ
    // en-ZA
    // en-ZM
    // es-ES
    // fi-FI
    // fr-FR
    // he-IL
    // hu-HU
    // it-IT
    // ja-JP
    // ms-MY
    // nb-NO
    // nl-BE
    // nn-NO
    // pl-PL
    // pt-BR
    // pt-PT
    // ru-RU
    // sr-RS
    // tr-TR
    // vi-VN
    // zh-CN
    // zh-TW
    const reg = {
      'DZ': /^(\+?213|0)(5|6|7)\d{8}$/,
      'SY': /^(!?(\+?963)|0)?9\d{8}$/,
      'SA': /^(!?(\+?966)|0)?5\d{8}$/,
      'US': /^(\+?1)?[2-9]\d{2}[2-9](?!11)\d{6}$/,
      'CZ': /^(\+?420)? ?[1-9][0-9]{2} ?[0-9]{3} ?[0-9]{3}$/,
      'DE': /^(\+?49[ \.\-])?([\(]{1}[0-9]{1,6}[\)])?([0-9 \.\-\/]{3,20})((x|ext|extension)[ ]?[0-9]{1,4})?$/,
      'DK': /^(\+?45)?(\d{8})$/,
      'GR': /^(\+?30)?(69\d{8})$/,
      'AU': /^(\+?61|0)4\d{8}$/,
      'GB': /^(\+?44|0)7\d{9}$/,
      'HK': /^(\+?852\-?)?[569]\d{3}\-?\d{4}$/,
      'IN': /^(\+?91|0)?[789]\d{9}$/,
      'NZ': /^(\+?64|0)2\d{7,9}$/,
      'ZA': /^(\+?27|0)\d{9}$/,
      'ZM': /^(\+?26)?09[567]\d{7}$/,
      'ES': /^(\+?34)?(6\d{1}|7[1234])\d{7}$/,
      'FI': /^(\+?358|0)\s?(4(0|1|2|4|5)?|50)\s?(\d\s?){4,8}\d$/,
      'FR': /^(\+?33|0)[67]\d{8}$/,
      'IL': /^(\+972|0)([23489]|5[0248]|77)[1-9]\d{6}/,
      'HU': /^(\+?36)(20|30|70)\d{7}$/,
      'IT': /^(\+?39)?\s?3\d{2} ?\d{6,7}$/,
      'JP': /^(\+?81|0)\d{1,4}[ \-]?\d{1,4}[ \-]?\d{4}$/,
      'MY': /^(\+?6?01){1}(([145]{1}(\-|\s)?\d{7,8})|([236789]{1}(\s|\-)?\d{7}))$/,
      'NO': /^(\+?47)?[49]\d{7}$/,
      'BE': /^(\+?32|0)4?\d{8}$/,
      'PL': /^(\+?48)? ?[5-8]\d ?\d{3} ?\d{2} ?\d{2}$/,
      'BR': /^(\+?55|0)\-?[1-9]{2}\-?[2-9]{1}\d{3,4}\-?\d{4}$/,
      'PT': /^(\+?351)?9[1236]\d{7}$/,
      'RU': /^(\+?7|8)?9\d{9}$/,
      'RS': /^(\+3816|06)[- \d]{5,9}$/,
      'TR': /^(\+?90|0)?5\d{9}$/,
      'VN': /^(\+?84|0)?((1(2([0-9])|6([2-9])|88|99))|(9((?!5)[0-9])))([0-9]{7})$/,
      'CN': /^(\+?0?86\-?)?1[345789]\d{9}$/,
      'TW': /^(\+?886\-?|0)?9\d{8}$/
    }
    return reg[country]?.test(account)
  }

  // 获取店铺评价列表
  getShopEvaluateList(country, data) {
    return this.getChinese(country, '/api/v3/settings/search_shop_rating_comments', data)
  }
  // 回复商店评价
  replyShopRating(country, data) {
    return this.postChinese(country, '/api/v3/settings/reply_shop_rating', data, { Headers: { 'Content-Type': ' application/json' }})
  }
  // 店铺提现记录
  getWithDrawalRecord(country, data) {
    return this.getChinese(country, '/api/v3/finance/get_wallet_transactions', data)
  }
  // 获取银行卡信息
  getBankAccount(country, data) {
    return this.getChinese(country, '/api/v3/finance/get_bank_account', data)
  }
  // 获取货款对账list
  getIncomeTransaction(country, data) {
    return this.getChinese(country, '/api/v3/finance/income_transaction_histories', data)
  }
  // 店铺登录
  async login(mallInfo, flat) {
    const { country, mall_account_info, platform_mall_id } = mallInfo
    const accountName = mall_account_info.username
    const encryptPwd = sha256(md5(mall_account_info.password))
    // const encryptPwd = sha256(md5('Th123654'))
    // const accountName = 'hellohappy586'
    const params = {
      mallId: platform_mall_id || '1111', // 导入店铺初始没有mallId
      remember: false,
      password_hash: encryptPwd
    }
    if (accountName.indexOf('@') > -1) {
      params['email'] = accountName
    } else if (country === 'SG' || this.getTelephoneNumberIsTrue(country, accountName)) {
      params['phone'] = accountName
    } else {
      params['username'] = accountName
    }
    flat === 2 ? params['exportInfo'] = mallInfo : ''// 导入店铺必须参数   flat 1 一键登陆  2导入店铺
    try {
      let res = await this.postChinese(country, '/api/v2/login', params)
      res = JSON.parse(res)
      debugger
      if (res.status === 200) {
        const data = JSON.parse(res.data)
        // { 官方返回字段
        //   "username": "bibbyrunp1907",
        //   "shopid": 227067897,
        //   "phone": "*****85",
        //   "sso": "In0lULeRz2sYMG8lNkcLSGn4QhD2anvuH06jYnQTe7bDLWRrJVFy8TTztxKww9oQcnJNtBqUlgzpWyHHpA4/R+QeKyiAm1tIjlgvil2pBQY9z1IGJGeEPRk2EISgfvJTuQUmneqRI9ysPS1binsuxfkEDa6aECOE1vuYKwJeqyM=",
        //   "cs_token": "In0lULeRz2sYMG8lNkcLSGn4QhD2anvuH06jYnQTe7bDLWRrJVFy8TTztxKww9oQcnJNtBqUlgzpWyHHpA4/R+QeKyiAm1tIjlgvil2pBQY9z1IGJGeEPRk2EISgfvJTuQUmneqRI9ysPS1binsuxfkEDa6aECOE1vuYKwJeqyM=",
        //   "portrait": "e8d017e5d3f23f6b28b619b2a1cff8d0",
        //   "id": 227072342,
        //   "sso_v2": ".dmtSWFN4dFVGNWZtMUtleaZztQKg7ItfjnZZnlHv54/XD5s7zZ+ygvftJC7FV3RLfYfRY1180l+1+bdxdAXZpz0PWhoamGT1nhpJ0/estdbLCk8+/vrXxXl/dkO0U/CcWFECN/sv6N11vvDCdlOpdgDsXo8Ml0xTSR0hL905C+boP8bxTiebv3CGErFve2Gqbzz5Wii06QzZeAHB287+/g==",
        //   "language": "th",
        //   "errcode": 0,
        //   "token": "e41ef37f09ef7a151d2cb570cb49a264",
        //   "sub_account_token": null,
        //   "email": ""
        // }
        const Cookie = {}
        Cookie['SPC_EC'] = data.sso
        Cookie['SPC_SC_TK'] = data.token
        Cookie['ShopeeUid'] = data.id // 虾皮平台用户Uid
        Cookie['shopid'] = data.shopid // 平台店铺ID
        const obj = {
          shopid: data.shopid + '',
          ShopeeUid: data.id,
          username: data.username,
          Cookie
        }
        return { code: 200, data: obj }
      }
      return { code: res.status, data: `${res.status} ${res.data} ` }
    } catch (e) {
      console.log('e', e)
      return { code: -2, data: `login-catch: ${e}` }
    }
  }

  // 获取自动回复数据
  scChatSetting(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/chat_setting', data)
  }

  // 设置自动回复数据
  setChatSetting(country, data) {
    const options = {
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

  // 设置离线回复数据
  setOfflineReply(country, data, options = {}) {
    options.headers = Object.assign(options.headers, {
      'Content-Type': 'application/json;charset=UTF-8'
    })

    return this.putChinese(country, '/webchat/api/workbenchapi/v1.2/sc/offline_reply', data, options)
  }

  // 获取快捷消息
  messageShortcutsGroups(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/groups', data)
  }

  // 设置快捷消息
  setShortcutsGroups(country, data) {
    return this.postChinese(country, '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group', data)
  }

  // 开关快捷消息
  switchMessageShortcutsGroups(country, data) {
    const url = '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group/' + data.id
    return this.putChinese(country, url, data)
  }

  // 删除快捷消息
  deleteMessageShortcutsGroups(country, data, options = {}) {
    const url = '/webchat/api/workbenchapi/v1.2/sc/message_shortcuts/group/' + data.id
    return this.deleteChinese(country, url, data, options)
  }

  // 获取问题问候语
  scFaqs(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs', data)
  }

  // 设置问题问候语
  faqsShopSettings(country, data) {
    return this.putChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data)
  }

  // 提交问题问候语
  updateFaqsShopSettings(country, data) {
    return this.postChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data)
  }

  // 删除问题问候语
  deleteFaqsShopSettings(country, data, options = {}) {
    return this.deleteChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data,options)
  }

  // 获取银行卡信息
  getBankAccounts(country, data, option) {
    return this.postChinese(country, '/api/v3/finance/get_bank_accounts/', data, option)
  }

  // 获取银行卡详细信息
  getWalletTransactions(country, data, option) {
    return this.getChinese(country, '/api/v3/finance/get_wallet_transactions/', data, option)
  }

  // 获取银行卡金额
  getWalletStatus(country, data, option) {
    return this.getChinese(country, '/api/v3/finance/get_wallet_status', data, option)
  }

  // 提取金额
  // getBankAccounts(country, data,option) {
  //   return this.postChinese(country, '/api/v3/finance/get_bank_accounts/', data,option)
  // }
}

