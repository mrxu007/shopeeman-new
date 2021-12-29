import {
  sha256
} from 'js-sha256'
import md5 from 'js-md5'
import {
  getImgMd5
} from '../util/util'
export default class NetMessageBridgeService {
  NetMessageBridgeService() {
    return window['NetMessageBridgeService']
  }
  ConfigBridgeService() {
    return window['ConfigBridgeService']
  }

  getExtraInfo(data) {
    return {
      mallId: data.mallId || data.platform_mall_id || data.shop_id,
      isEmoticons: false
    }
  }

  async getWebUrl(country, data) {
    const mallId = data.mallId || data.platform_mall_id || data.shop_id
    let userSettings = await this.ConfigBridgeService().getUserConfig()
    userSettings = JSON.parse(userSettings)
    console.log('userSettings', userSettings)
    const mallInfo = await this.ConfigBridgeService().getGlobalCacheInfo('mallInfo', mallId)
    const {
      mall_main_id,
      IPType
    } = JSON.parse(mallInfo)
    // auto 1、auto  2、mallinfo.MallMainId  3、IPType  包含 大陆   或者  ‘1’
    // local 国内
    // Abroad 本土
    let url = this.site_domain_chinese_pre[country]
    const domain_switch = userSettings && (userSettings.SwitchDominTypeSetting || userSettings.domain_switch) || '1'
    if (domain_switch === '3' || domain_switch === `Abroad`) {
      url = this.site_domain_local_pre[country]
    } else if ((domain_switch === '1' || domain_switch === 'Auto') &&
      mall_main_id > 0 && (IPType.indexOf('大陆') === -1 || IPType === '1')) {
      url = this.site_domain_local_pre[country]
    }
    return url
  }

  async getUrlPrefix(country, data) {
    const mallId = data.mallId || data.platform_mall_id || data.shop_id
    let userSettings = await this.ConfigBridgeService().getUserConfig()
    userSettings = JSON.parse(userSettings)
    console.log('userSettings', userSettings)
    const mallInfo = await this.ConfigBridgeService().getGlobalCacheInfo('mallInfo', mallId)
    const {
      mall_main_id,
      IPType
    } = JSON.parse(mallInfo)
    const domain_switch = userSettings && (userSettings.SwitchDominTypeSetting || userSettings.domain_switch) || '1'
    let url = this.site_domain_chinese_bk[country]
    if (domain_switch === '3' || domain_switch === `Abroad`) {
      url = this.site_domain_local_bk[country]
    } else if ((domain_switch === '1' || domain_switch === 'Auto') &&
      mall_main_id > 0 && (IPType.indexOf('大陆') === -1 || IPType === '1')) {
      url = this.site_domain_local_bk[country]
    }
    return url
    // const dominType = data.SwitchDominTypeSetting === 'Local'
    // return dominType && this.site_domain_chinese_bk[country] || this.site_domain_local_bk[country]
  }
  // 各站点大陆前台网址
  site_domain_chinese_pre = {
    'MY': 'https://my.xiapibuy.com',
    'TW': 'https://xiapi.xiapibuy.com',
    'VN': 'https://vn.xiapibuy.com',
    'ID': 'https://id.xiapibuy.com',
    'PH': 'https://ph.xiapibuy.com',
    'TH': 'https://th.xiapibuy.com',
    'SG': 'https://sg.xiapibuy.com',
    'BR': 'https://br.xiapibuy.com',
    'MX': 'https://mx.xiapibuy.com',
    'CO': 'https://co.xiapibuy.com',
    'CL': 'https://cl.xiapibuy.com',
    'PL': 'https://pl.xiapibuy.com'
  }
  // 各站点本土前台网址
  site_domain_local_pre = {
    'MY': 'https://shopee.com.my',
    'TW': 'https://shopee.tw',
    'VN': 'https://shopee.vn',
    'ID': 'https://shopee.co.id',
    'PH': 'https://shopee.ph',
    'TH': 'https://shopee.co.th',
    'SG': 'https://shopee.sg',
    'BR': 'https://shopee.com.br',
    'MX': 'https://shopee.com.mx',
    'CO': 'https://shopee.com.co',
    'CL': 'https://shopee.cl',
    'PL': 'https://shopee.pl'
  }

  // 大陆后台 (国内)
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
  // 本土后台(国外)
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
  async getChinese(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    delete data.mallId // body 里面不能带店铺id
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    console.log('-----', url, JSON.stringify(options))
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  async getChineseLaiZan(url, data, options = {}) {
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    // console.log(url, JSON.stringify(options))
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  async postChineseLaiZan(url, data, options = {}) {
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    // console.log(url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }
  async getChineseBuyer(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getWebUrl(country, data) + api
    const baseurl = await this.getWebUrl(country, data)
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    delete data.mallId // body 里面不能带店铺id
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: baseurl,
        referer: baseurl + referer
      })
    }
    console.log('-----', url, JSON.stringify(options))
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }
  async postChineseBuyer(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getWebUrl(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
      // Object.assign(options['extrainfo'],JSON.parse(JSON.stringify()))
    }
    delete data.mallId
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    console.log(url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  async postChinese(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    delete data.mallId
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    debugger
    console.log('NetMessageBridgeService', url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }
  // refer 与url 不一样
  async postChineseReferer(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    const baseUrl = await this.getUrlPrefix(country, data)
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    delete data.mallId
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: baseUrl,
        referer: baseUrl + referer
      })
    }
    console.log(url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }
  async getChineseReferer(country, api, data, options = {}) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    const baseUrl = await this.getUrlPrefix(country, data)
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: baseUrl,
        referer: baseUrl + referer
      })
    }
    // console.log('-----get', url, JSON.stringify(options))
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }
  async postChineseShop(country, api, data, params, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    console.log(url, JSON.stringify(options), JSON.stringify(params))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(params))
  }
  async postChineseImageFile(country, api, data, options = {}, base64File) {
    data = JSON.parse(JSON.stringify(data))
    // options {extrainfo // 第三方接口, params, header}
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    const base64 = base64File.dataURL
    const ext = base64File.ext
    const filename = `${getImgMd5(base64)}.${ext}`
    return this.NetMessageBridgeService().uploadFile(url, JSON.stringify(options), null, base64, filename, 'multipart/form-data')
  }
  async putChinese(country, api, data, options = {}) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    return this.NetMessageBridgeService().put(url, JSON.stringify(options), JSON.stringify(data))
  }
  async deleteChinese(country, api, data, options = {}) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country, data) + api
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'], {
        origin: url,
        referer: url + referer
      })
    }
    console.log(url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().delete(url, JSON.stringify(options), JSON.stringify(data))
  }

  // 手机号是否符合各个国家的手机号
  getTelephoneNumberIsTrue(country, account) {
    let phoneList = account.match(/[0-9]*/g)
    account = phoneList.join('')
    const reg = {
      'MY': '60',
      'TW': '886',
      'VN': '84',
      'ID': '62',
      'PH': '63',
      'TH': '66',
      'SG': '65',
      'BR': '55',
      'CN': '86',
      'MX': '52',
      'CO': '57',
      'CL': '56',
      'PL': '48'
    }
    if (account.startsWith('0')) {
      account = account.substring(1)
    }
    // return country === 'SG' || country === 'ID' ? account : reg[country] + account
    return country === 'SG' ? account : reg[country] + account
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
  // 店铺登录 post版本
  async login(mallInfo, flat, options = {}) {
    console.log('mallInfo', mallInfo)
    const { country, mall_account_info, platform_mall_id } = mallInfo
    const accountName = mall_account_info.username
    const encryptPwd = sha256(md5(mall_account_info.password))
    const params = {
      mallId: platform_mall_id || '8888888888', // 导入店铺初始没有mallId
      remember: false,
      password_hash: encryptPwd
    }
    const acccount_info = {
      username: '',
      password: mall_account_info.password
    }
    const reg = new RegExp('[\\u4E00-\\u9FFFa-zA-Z]+', 'g')
    if (accountName.indexOf('@') > -1) {
      params['email'] = encodeURIComponent(accountName).split('%').length > 1 && encodeURIComponent(accountName) || accountName
      acccount_info['username'] = accountName
    } else if (reg.test(accountName)) {
      params['username'] = accountName
      acccount_info['username'] = accountName
    } else {
      const phone = this.getTelephoneNumberIsTrue(country, accountName)
      params['phone'] = phone
      acccount_info['username'] = phone
    }
    options.vcode ? params['vcode'] = options.vcode : ''
    let copy_mallInfo = null
    if (flat === 2) { // 导入店铺必须参数   flat 1 一键登陆  2导入店铺
      copy_mallInfo = {}
      copy_mallInfo['accountName'] = acccount_info.username
      copy_mallInfo['mall_account_info'] = acccount_info
      copy_mallInfo['mallGroup'] = mallInfo.group_name
      copy_mallInfo['mallMainName'] = mallInfo.MallMainName
      copy_mallInfo['platformMallName'] = mall_account_info.userRealName
      copy_mallInfo['mallAliasName'] = mallInfo.mall_alias_name
      copy_mallInfo['country'] = mallInfo.country
      copy_mallInfo['malltype'] = '1'
      copy_mallInfo['SPC_EC'] = mallInfo.SPC_EC
      copy_mallInfo['SPC_SC_TK'] = mallInfo.SPC_SC_TK
      copy_mallInfo['SPC_F'] = mallInfo.SPC_F
    }
    console.log('copy_mallInfo', copy_mallInfo)
    try {
      let res = await this.postChinese(country, '/api/v2/login/?', params, { // option
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'charset': 'UTF-8'
        }
      }, copy_mallInfo)
      res = JSON.parse(res)
      console.log('postChinese', res)
      let SetCookie = null
      SetCookie = res.headers.find(item => item.Name === 'Set-Cookie')
      if (SetCookie) {
        try {
          SetCookie = SetCookie.Value.split(';').find(item => item.indexOf('SPC_F') > -1).match(/SPC_F=(.+)/)[1]
        } catch (error) {
          SetCookie = null
        }
      }
      if (res.status === 200) {
        const data = JSON.parse(res.data)
        // const data = {
        //   'username': 'hellohappy586',
        //   'shopid': 213693788,
        //   'phone': '*****86',
        //   'sso': 'frcMkzWmlozOjCMsYjn4+SJdOFw3F1zwoGxKht+0PeJ5f+fqw1dWWBDl750dr1h9qlJKJpVABAYX/+tUA1Xduf2Ra/liYgYoSBYIwitiD7ph6mCmoCfuMudx0VLia/r7wIxmOX3KcCvE13zdf1PHSYIdPTk5vnmzyFX1kxSbp6Q=',
        //   'cs_token': 'frcMkzWmlozOjCMsYjn4+SJdOFw3F1zwoGxKht+0PeJ5f+fqw1dWWBDl750dr1h9qlJKJpVABAYX/+tUA1Xduf2Ra/liYgYoSBYIwitiD7ph6mCmoCfuMudx0VLia/r7wIxmOX3KcCvE13zdf1PHSYIdPTk5vnmzyFX1kxSbp6Q=',
        //   'portrait': 'ee7db10b758fe62fdca22df0407930ed',
        //   'id': 213697505,
        //   'language': 'en',
        //   'errcode': 0,
        //   'token': '19ec9cb05c71d9f99d3aa4465abbaf51',
        //   'sub_account_token': null,
        //   'email': ''
        // }
        const mallId = `${data.shopid}` // 平台店铺ID
        const mallUId = `${data.id}` // 平台店铺ID
        const username = data.username

        const Cookie = {} // (一键登陆专用)
        Cookie['SPC_EC'] = data.sso
        Cookie['SPC_SC_TK'] = data.token
        Cookie['ShopeeUid'] = mallUId // 虾皮平台用户Uid
        Cookie['shopid'] = mallId // 平台店铺ID
        Cookie['SPC_F'] = SetCookie || mallInfo.SPC_F// 短信验证码标识
        Cookie['spc_f'] = SetCookie || mallInfo.SPC_F// 短信验证码标识

        const Cookie_new = { // 店铺cookie信息(导入店铺专用)(更新壳)
          'SPC_CDS_VER': '2',
          'SPC_EC': data.sso,
          'ShopeeUid': mallUId,
          'SPC_F': SetCookie || mallInfo.SPC_F || '',
          'CNSC_SSO': '',
          'SPC_CNSC_TK': '',
          'SPC_CNSC_UD': '',
          'SC_DFP': '',
          'SPC_SC_SA_UD': '',
          'SPC_SC_SA_TK': '',
          'SPC_SC_UD': '',
          'cstoken': data.cs_token,
          'satoken': '',
          'shopeeuid': mallUId,
          'shopid': mallId,
          'portrait': data.portrait,
          'userRealName': username,
          'mainAccountId': '',
          'spc_f': SetCookie || mallInfo.SPC_F || '',
          'SPC_SC_TK': data.token,
          'OtherCookieInfo': '',
          'spcf_update_time': ''
        }

        const mallInfo_new = { // 通知壳更新店铺信息 (导入店铺、一键登陆) 数据结构与壳内店铺信息一致
          'IPIsExpired': true,
          'IsOpenSIP': false,
          'ProxyType': 'ssr',
          'IsTransit': 0,
          'IPType': '',
          'GroupName': mallInfo.group_name, // 店铺分组
          'web_login_info': Cookie_new, // 店铺cookie
          'MallMainName': mallInfo.MallMainName,
          'id': 0,
          'uid': 0,
          'country': mallInfo.country, // 国家
          'platform_mall_name': mallInfo.mall_account_info.username,
          'platform_mall_id': mallId, // 店铺平台ID
          'platform_mall_uid': mallUId, // 店铺平台卖家ID
          'is_global': 0,
          'mall_main_id': 0,
          'mall_account_info': mallInfo.mall_account_info, // 店铺账户信息(导入模板里面的信息)
          //  { 'password': 'Bibbyrunp888',
          //   'username': 'bibbyrunp1907',
          //   'userRealName': 'bibbyrunp1907',
          //   'subsiteindex': 0
          // },
          'watermark': mallInfo.watermark, // 店铺水印
          'mall_alias_name': mallInfo.mall_alias_name, // 店铺别名
          'mall_type': mallInfo.mall_type, // 店铺类型
          'mall_group_id': mallInfo.mall_group_id // 店铺分组id
        }
        const obj = {
          mallId,
          mallUId,
          username,
          Cookie,
          mallInfo_new
        }
        return {
          code: 200,
          data: obj
        }
      }
      let message = res.data
      let code = res.status
      if (message.indexOf('username: ensure this value has at most 30 chars') > -1) {
        code = 'username: ensure this value has at most 30 chars'
        message = `账号${accountName}：登录异常，店铺账号过长。店铺账号长度应小于等于30`
      } else if (message.indexOf('username: ensure this value matches') > -1) {
        code = 'username: ensure this value matches'
        message = `账号${accountName}：登录异常，店铺账号名包含的字符不规范, 字符应在 A-Z a-z 0-9 之间`
      } else if (message.indexOf('error_api') > -1) {
        code = 'error_api'
        message = `账号${accountName}：手机验证码发送频繁`
      } else if (message.indexOf('error_need_otp') > -1 || message.indexOf('error_need_vcode') > -1) {
        code = 'error_need_otp'
        message = `账号${accountName}：账号或主账号手机验证码`
      } else if (message.indexOf('error_need_ivs') > -1) {
        code = 'error_need_ivs'
        message = `账号${accountName}：需要进行IVS验证`
      } else if (message.indexOf('error_require_captcha') > -1 || message.indexOf('error_captcha_trigger') > -1) {
        code = 'error_require_captcha'
        message = `账号${accountName}：需要图片或者滑块验证`
      } else if (message.indexOf('error_name') > -1 || message.indexOf('incorrect') > -1 || message.indexOf('error_password') > -1) {
        code = 'error_name'
        message = `账号${accountName}：请检查账号密码：${message}`
      } else if (message.indexOf('error_notfound') > -1) {
        code = 'error_notfound'
        message = '账号不存在，账号：' + accountName
      } else if (message.indexOf('error_perm') > -1) { // 账号密码错误
        code = 'error_perm'
        message = '请检查账号密码，账号：' + accountName + ' 密码：' + mall_account_info.password
      } else if (message.indexOf('error_banned') > -1) {
        code = 'error_banned'
        message = '您的登录被拒绝是因为您的帐户有不当行为'
      } else if (message.indexOf('error_otp') > -1) {
        code = 'error_otp'
        message = '手机验证码错误。'
      } else if (message.indexOf('error_shop_binded2merchant') > -1) {
        code = 'error_shop_binded2merchant'
        message = '检测到您的账号为子母账号，请使用带(:main)格式的账号登录'
      } else if (message.indexOf('error_invalid_vcode') > -1) {
        code = 'error_invalid_vcode'
        message = '无效的验证码'
      } else if (message.indexOf('has_shop_upgraded') > -1) {
        code = 'has_shop_upgraded'
        message = '已升级为全球店铺，请更换店铺类型进行导入'
      }
      return { code, 'data': { 'message': message, 'data': res.data, SetCookie }}
    } catch (e) {
      console.log('e', e)
      return {
        code: -2,
        data: `login -catch: ${e} `
      }
    }
  }

  // 店铺登录 get版本
  async getLogin(mallInfo, SPC_F) {
    const { country, mall_account_info, platform_mall_id } = mallInfo
    const params = {
      mallId: platform_mall_id
    }
    const accountName = mall_account_info.username
    try {
      let res = await this.getChinese(country, '/api/v2/login', params, { // options
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'charset': 'UTF-8'
        }
      })
      res = JSON.parse(res)
      console.log('getLogin', res)
      let SetCookie = null
      SetCookie = res.headers.find(item => item.Name === 'Set-Cookie')
      if (SetCookie) {
        try {
          SetCookie = SetCookie.Value.split(';').find(item => item.indexOf('SPC_F') > -1).match(/SPC_F=(.+)/)[1]
        } catch (error) {
          SetCookie = null
        }
      }
      if (res.status === 200) {
        const data = JSON.parse(res.data)
        const mallId = `${data.shopid}` // 平台店铺ID
        const mallUId = `${data.id}` // 平台店铺ID
        const username = data.username

        const Cookie = {} // (一键登陆专用)
        Cookie['SPC_EC'] = data.sso
        Cookie['SPC_SC_TK'] = data.token
        Cookie['ShopeeUid'] = mallUId // 虾皮平台用户Uid
        Cookie['shopid'] = mallId // 平台店铺ID
        Cookie['SPC_F'] = SetCookie ||　SPC_F // 短信验证码标识
        Cookie['spc_f'] = SetCookie ||　SPC_F // 短信验证码标识

        const Cookie_new = { // 店铺cookie信息(导入店铺专用)(更新壳)
          'SPC_CDS_VER': '2',
          'SPC_EC': data.sso,
          'ShopeeUid': mallUId,
          'SPC_F': SetCookie || SPC_F,
          'CNSC_SSO': '',
          'SPC_CNSC_TK': '',
          'SPC_CNSC_UD': '',
          'SC_DFP': '',
          'SPC_SC_SA_UD': '',
          'SPC_SC_SA_TK': '',
          'SPC_SC_UD': '',
          'cstoken': data.cs_token,
          'satoken': '',
          'shopeeuid': mallUId,
          'shopid': mallId,
          'portrait': data.portrait,
          'userRealName': username,
          'mainAccountId': '',
          'spc_f': SetCookie || SPC_F,
          'SPC_SC_TK': data.token,
          'OtherCookieInfo': '',
          'spcf_update_time': ''
        }

        const mallInfo_new = { // 通知壳更新店铺信息 (导入店铺、一键登陆) 数据结构与壳内店铺信息一致
          'IPIsExpired': true,
          'IsOpenSIP': false,
          'ProxyType': 'ssr',
          'IsTransit': 0,
          'IPType': '',
          'GroupName': mallInfo.group_name, // 店铺分组
          'web_login_info': Cookie_new, // 店铺cookie
          'MallMainName': mallInfo.MallMainName,
          'id': 0,
          'uid': 0,
          'country': mallInfo.country, // 国家
          'platform_mall_name': mallInfo.mall_account_info.username,
          'platform_mall_id': mallId, // 店铺平台ID
          'platform_mall_uid': mallUId, // 店铺平台卖家ID
          'is_global': 0,
          'mall_main_id': 0,
          'mall_account_info': mallInfo.mall_account_info, // 店铺账户信息(导入模板里面的信息)
          //  { 'password': 'Bibbyrunp888',
          //   'username': 'bibbyrunp1907',
          //   'userRealName': 'bibbyrunp1907',
          //   'subsiteindex': 0
          // },
          'watermark': mallInfo.watermark, // 店铺水印
          'mall_alias_name': mallInfo.mall_alias_name, // 店铺别名
          'mall_type': mallInfo.mall_type, // 店铺类型
          'mall_group_id': mallInfo.mall_group_id // 店铺分组id
        }
        const obj = {
          mallId,
          mallUId,
          username,
          Cookie,
          mallInfo_new
        }
        return {
          code: 200,
          data: obj
        }
      }
      let message = res.data
      let code = res.status
      if (message.indexOf('username: ensure this value has at most 30 chars') > -1) {
        code = 'username: ensure this value has at most 30 chars'
        message = `账号${accountName}：登录异常，店铺账号过长。店铺账号长度应小于等于30`
      } else if (message.indexOf('username: ensure this value matches') > -1) {
        code = 'username: ensure this value matches'
        message = `账号${accountName}：登录异常，店铺账号名包含的字符不规范, 字符应在 A-Z a-z 0-9 之间`
      } else if (message.indexOf('error_api') > -1) {
        code = 'error_api'
        message = `账号${accountName}：手机验证码发送频繁`
      } else if (message.indexOf('error_need_otp') > -1 || message.indexOf('error_need_vcode') > -1) {
        code = 'error_need_otp'
        message = `账号${accountName}：账号或主账号手机验证码`
      } else if (message.indexOf('error_need_ivs') > -1) {
        code = 'error_need_ivs'
        message = `账号${accountName}：需要进行IVS验证`
      } else if (message.indexOf('error_require_captcha') > -1 || message.indexOf('error_captcha_trigger') > -1) {
        code = 'error_require_captcha'
        message = `账号${accountName}：需要图片或者滑块验证`
      } else if (message.indexOf('error_name') > -1 || message.indexOf('incorrect') > -1 || message.indexOf('error_password') > -1) {
        code = 'error_name'
        message = `账号${accountName}：请检查账号密码：${message}`
      } else if (message.indexOf('error_notfound') > -1) {
        code = 'error_notfound'
        message = '账号不存在，账号：' + accountName
      } else if (message.indexOf('error_perm') > -1) { // 账号密码错误
        code = 'error_perm'
        message = '请检查账号密码，账号：' + accountName + ' 密码：' + mall_account_info.password
      } else if (message.indexOf('error_banned') > -1) {
        code = 'error_banned'
        message = '您的登录被拒绝是因为您的帐户有不当行为'
      } else if (message.indexOf('error_otp') > -1) {
        code = 'error_otp'
        message = '手机验证码错误。'
      } else if (message.indexOf('error_shop_binded2merchant') > -1) {
        code = 'error_shop_binded2merchant'
        message = '检测到您的账号为子母账号，请使用带(:main)格式的账号登录'
      } else if (message.indexOf('error_invalid_vcode') > -1) {
        code = 'error_invalid_vcode'
        message = '无效的验证码'
      } else if (message.indexOf('has_shop_upgraded') > -1) {
        code = 'has_shop_upgraded'
        message = '已升级为全球店铺，请更换店铺类型进行导入'
      }
      return { code, 'data': { 'message': message, 'data': res.data, SetCookie }}
    } catch (e) {
      console.log('e', e)
      return {
        code: -2,
        data: `login -catch: ${e} `
      }
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
    return this.deleteChinese(country, '/webchat/api/workbenchapi/v1.2/sc/faqs/shop/settings', data, options)
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
  verifyPaymentPass(country, data, option) {
    return this.getChinese(country, '/api/v3/finance/verify_payment_pass/', data, option)
  }

  // 验证码
  getWalletOtpSeed(country, data, option) {
    return this.getChinese(country, '/api/v3/general/get_wallet_otp_seed', data, option)
  }

  // 绑卡
  bindBankAccount(country, data, option) {
    return this.postChinese(country, '/api/v3/finance/bind_bank_account/', data, option)
  }
  // 同步订单IDs
  async getOrderIdList(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_order_id_list', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 同步订单详情
  async getDetailsByOrderIds(country, data) {
    const res = await this.postChinese(country, '/api/v3/order/get_order_list_by_order_ids_multi_shop', data, {
      Headers: {
        'Content-Type': ' application/json'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取详情失败${resObj.statusText}`
      }
    }
  }
  // 手动发货
  async handleOutOrder(country, data) {
    const res = await this.postChinese(country, '/api/v3/shipment/init_order/', data, {
      Headers: {
        'Content-Type': ' application/json'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `手动发货失败${resObj.statusText}`
      }
    }
  }
  // 同步单个订单详情
  async getDetailsSinger(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_one_order', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取详情失败${resObj.statusText}`
      }
    }
  }
  //查询订单 /api/v3/order/get_order_hint
  async getOrderHint(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_order_hint', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取详情失败${resObj.statusText}`
      }
    }
  }
  // 获取订单历史轨迹
  async getOrdeTrackingHistory(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_order_tracking_history/', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `订单历史轨迹${resObj.statusText}`
      }
    }
  }
  // 获取售后订单历史轨迹
  async getRefundOrdeTrackingHistory(country, data) {
    const res = await this.getChinese(country, '/api/v1/return/return_tracking_history/', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `订单历史轨迹${resObj.statusText}`
      }
    }
  }
  // 获取订单交易记录
  async getIncomeTransactionHistoryDetail(country, data) {
    const res = await this.getChinese(country, '/api/v3/finance/income_transaction_history_detail/', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `订单历史轨迹${resObj.statusText}`
      }
    }
  }
  // 获取物流轨迹的发货时间
  async getLogisticsTrackingHistory(country, data) {
    const res = await this.getChinese(country, '/api/v3/logistics/get_logistics_tracking_history', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `订单历史轨迹${resObj.statusText}`
      }
    }
  }
  // 获取物流轨迹的发货时间 ---单个退货退款订单物流详情---售后订单
  async getLogisticsTrackingHistoryRefund(country, data) {
    const res = await this.getChinese(country, '/api/v1/return/reverse_logistics_tracking_history/ ', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `订单历史轨迹${resObj.statusText}`
      }
    }
  }
  // 获取状态to ship的订单
  async getToShipOrderIdList(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_package_list', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 获取状态Refund的订单
  async getRefundOrderIdList(country, data) {
    const res = await this.getChinese(country, '/api/v1/return/list', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 获取状态Refund的订单详情
  async getRefundOrderDetail(country, data) {
    const res = await this.getChinese(country, '/api/v1/return/detail', data)
    const resObj = res && JSON.parse(res)
    console.log(resObj, "getRefundOrderDetail")
    if (resObj) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 申请运单号
  async getForderLogistics(country, data) {
    const res = await this.getChinese(country, '/api/v3/order/get_forder_logistics/', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 查询商品
  async searchProductList(country, data) {
    const res = await this.getChinese(country, '/api/v3/product/search_product_list/', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 查询产品详情
  async searchProductDetail(country, data) {
    const res = await this.getChinese(country, '/api/v3/product/get_product_detail/', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 产品编辑
  async handleProductEdit(country, data, params) {
    const res = await this.postChineseShop(country, '/api/v3/product/update_product/', data, params, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        version: '3.1.0',
        source: 'seller_center'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else if (info.code === 100010006) {
        return {
          code: 100010006,
          data: info.data.result[0].message || '' // 物流判断
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `商品编辑失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `商品编辑失败${resObj.statusText}`
      }
    }
  }
  // 商品下架
  async handleGoodsDelist(country, data, params) {
    const res = await this.postChineseShop(country, '/api/v3/product/update_product/', data, params, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        version: '3.1.0',
        source: 'seller_center'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `商品下架失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `商品下架失败${resObj.statusText}`
      }
    }
  }
  // 商品删除
  async handleGoodsDelete(country, data) {
    const res = await this.postChinese(country, '/api/v3/product/delete_product/', data, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        version: '3.1.0'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `商品删除失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `商品删除失败${resObj.statusText}`
      }
    }
  }
  // 商品置顶
  async handleGoodsTop(country, data) {
    const res = await this.postChinese(country, '/api/v3/product/boost_product/', data, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        version: '3.1.0'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `商品置顶失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `商品置顶失败${resObj.statusText}`
      }
    }
  }
  // 回复买家
  async rateOrder(country, data) {
    const res = await this.postChinese(country, '/api/v3/order/rate_order/', data, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        version: '3.1.0'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `评论回复失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `评论回复失败${resObj.statusText}`
      }
    }
  }
  // 更新买家留言
  async updateNode(country, data) {
    const res = await this.postChinese(country, '/api/v3/order/update_note/', data, {
      Headers: {
        'Content-Type': ' application/json'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `评论回复失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `评论回复失败${resObj.statusText}`
      }
    }
  }
  // 获取面单类型 
  async getPrintWaybillType(country, data) {
    const res = await this.getChinese(country, '/api/v3/logistics/get_print_waybill_type', data)
    const resObj = res && JSON.parse(res)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  // 获取物流
  async getLogistics(country, params) {
    params['version'] = '3.1.0'
    const res = await this.getChinese(country, '/api/v3/logistics/get_product_channels/?', params)
    const resObj = res && JSON.parse(res)
    console.log(resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || resObj.statusText || ''
        }
      }
    } else {
      if (resObj.status === 403) {
        return {
          code: resObj.status,
          data: `获取物流失败，店铺未登录！`
        }
      }
      return {
        code: resObj.status,
        data: `获取物流失败${resObj.statusText}`
      }
    }
  }
  // 取卖家真实姓名  
  async getShopSellerRealName(country, data) {
    const res = await this.getChinese(country, '/api/v3/logistics/get_shop_seller_real_name', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return info.data.seller_real_name || null

      } else {
        return null
      }
    } else {
      return null
    }
  }
  //获取店铺信息 
  async getShop(country, data) {
    const res = await this.getChinese(country, '/api/v3/general/get_shop/', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  //获取申请时间 /api/v3/shipment/get_drop_off
  async getPickupTimeSlots(country, data) {
    const res = await this.getChinese(country, '/api/v3/shipment/get_pickup_time_slots/', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  //获取虾皮物流单号
  async getDropOff(country, data) {
    const res = await this.getChinese(country, '/api/v3/shipment/get_drop_off', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  //  获取包裹号
  async checkPackagePrintWaybillMultiShop(country, data) {
    const res = await this.postChinese(country, '/api/v3/logistics/check_package_print_waybill_multi_shop', data, {
      Headers: {
        'Content-Type': ' application/json'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  //  获取面单打印配置 schemaType
  async getSdConfig(country, data) {
    const res = await this.getChinese(country, '/api/v3/logistics/get_sd_config', data)
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
  //创建面单打印任务
  async createSdJobsMultiShop(country, data) {
    const res = await this.postChinese(country, '/api/v3/logistics/create_sd_jobs_multi_shop', data, {
      Headers: {
        'Content-Type': ' application/json'
      },
      params: {
        async_sd_version: '0.2'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `获取失败${resObj.statusText}`
      }
    }
  }
    //处理越南首公里面单
    async getForderId(country, data) {
      const res = await this.postChinese(country, '/api/v3/shipment/can_order_arrange_shipment_multi_shop/?', data, {
        Headers: {
          'Content-Type': ' application/json'
        },
        params: {
          async_sd_version: '0.2'
        }
      })
      const resObj = res && JSON.parse(res)
      // console.log(res,resObj)
      if (resObj && resObj.status === 200) {
        const info = JSON.parse(resObj.data)
        if (info && info.code === 0) {
          return {
            code: 200,
            data: info.data || []
          }
        } else {
          return {
            code: 50001,
            data: info.message || []
          }
        }
      } else {
        return {
          code: resObj.status,
          data: `获取失败${resObj.statusText}`
        }
      }
    }
    //  莱尔富经济包的面单信息
    async getLaiErFuFace(country, data) {
      const res = await this.postChinese(country, '/api/v3/logistics/get_waybill_list', data, {
        Headers: {
          'Content-Type': ' application/json'
        }
      })
      const resObj = res && JSON.parse(res)
      // console.log(res,resObj)
      if (resObj && resObj.status === 200) {
        const info = JSON.parse(resObj.data)
        if (info && info.code === 0) {
          return {
            code: 200,
            data: info.data || []
          }
        } else {
          return {
            code: 50001,
            data: info.message || []
          }
        }
      } else {
        return {
          code: resObj.status,
          data: `获取失败${resObj.statusText}`
        }
      }
    }
  //拒绝取消订单-接受取消订单
  async respondCancelRequest(country, data) {
    const res = await this.postChinese(country, `/api/v3/order/respond_cancel_request/?`, data, {
      Headers: {
        'referer': `/portal/sale/${data.order_id}`,
        'Content-Type': ' application/json'
      }
    })
    const resObj = res && JSON.parse(res)
    // console.log(res,resObj)
    if (resObj && resObj.status === 200) {
      const info = JSON.parse(resObj.data)
      if (info && info.code === 0) {
        return {
          code: 200,
          data: info.data || []
        }
      } else {
        return {
          code: 50001,
          data: info.message || []
        }
      }
    } else {
      return {
        code: resObj.status,
        data: `操作失败${resObj.statusText}`
      }
    }
  }
  //下载面单信息
  async downloadSdJob(country, data) {
    const res = await this.getChinese(country, '/api/v3/logistics/download_sd_job', data)
    const resObj = res && JSON.parse(res)
    // console.log(resObj, "resObj")
    if (resObj && resObj.status === 200) {
      return resObj
    } else {
      return null
    }
  }

      
  // 获取地址
  getNextLevelAddresses(country, data, option) {
    return this.getChinese(country, '/api/v3/general/get_next_level_addresses', data, option)
  }

  // 获取邮编
  getZipCodeByAddressId(country, data, option) {
    return this.getChinese(country, '/api/v3/general/get_zip_code_by_address_id', data, option)
  }

  // 添加地址
  addAddress(country, data, option) {
    return this.postChinese(country, '/api/v3/settings/add_address', data, option)
  }

  // 设置默认的地址
  setDefaultAddress(country, data, option) {
    return this.postChinese(country, '/api/v3/settings/set_default_address', data, option)
  }

  // 设置店铺的地址
  setShopAddress(country, data, option) {
    return this.postChinese(country, '/api/v3/settings/set_shop_address', data, option)
  }

  // -----------------一键上新--------------------//
  // 创建活动
  discount(country, data, option) {
    return this.postChinese(country, '/api/marketing/v3/discount/', data, option)
  }

  // 获取品牌词库
  getBrandList(country, data, option) {
    return this.getChinese(country, '/api/v3/category/get_brand_list', data, option)
  }

  // 获取类目属性
  getAttributeTree(country, data, option) {
    return this.getChinese(country, '/api/v3/category/get_attribute_tree/', data, option)
  }

  // 获取类目属性
  dashboard(country, data, option) {
    return this.getChinese(country, '/api/mydata/v3/dashboard/key-metrics/', data, option)
  }

  // -------------------商业分析-------------------//
  // 获取买家数据
  getCustomers(country, data, option) {
    return this.getChinese(country, '/api/mydata/v1/metrics/shop/customers/', data, option)
  }

  // 获取类目排行数据
  getCateRank(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/dashboard/category-rankings/', data, option)
  }

  // 获取排行数据
  getRank(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/dashboard/product-rankings/', data, option)
  }

  // 获取流量数据
  getFlow(country, data, option) {
    return this.getChinese(country, '/api/mydata/traffic/dashboard/overview/', data, option)
  }

  // 获取商品诊断数据
  getdiagnosis(country, data, option) {
    return this.getChinese(country, '/api/seller/mydata/prod_diagnosis/items/', data, option)
  }

  // 获取商品概述数据
  getoverview(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/product/overview/', data, option)
  }

  // 获取商品表现数据
  getperformance(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/product/performance/', data, option)
  }

  // 获取商品表现数据
  getperformance1(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/product/performance/batch/', data, option)
  }

  // 获取销售额概述数据
  getsalasoverview(country, data, option) {
    return this.getChinese(country, '/api/mydata/v3/sales/overview/funnel/', data, option)
  }

  // 获取销售额结构数据1
  getsalasstructure1(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/sales/composition/category/', data, option)
  }

  // 获取销售额结构数据2
  getsalasstructure2(country, data, option) {
    return this.getChinese(country, '/api/mydata/sales/composition/pricezone/', data, option)
  }

  // 获取销售额结构数据3
  getsalasstructure3(country, data, option) {
    return this.getChinese(country, '/api/mydata/sales/composition/buyers/', data, option)
  }

  // 获取行销活动数据
  getactivity(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/discount/key-metrics/', data, option)
  }

  // 获取行销活动概览按钮数据
  getactivitybt(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/discount/overview/', data, option)
  }

  // 获取优惠套装数据
  getpackage(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/bundle/key-metrics/', data, option)
  }

  // 获取优惠套装按钮数据
  getpackageview(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/bundle/overview/', data, option)
  }

  // 获取关注礼数据
  getattention(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/follow-prize/key-metrics/', data, option)
  }

  // 获取关注礼概述数据
  getattentionview(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/follow-prize/overview/', data, option)
  }

  // 获取优惠卷数据
  getcoupon(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/voucher/key-metrics/', data, option)
  }

  // 获取优惠卷概述数据
  getcouponview(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/voucher/performance/', data, option)
  }

  // 获取商品限时选购数据
  getlimittime(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/flash-sale/key-metrics/', data, option)
  }

  // 获取加购优惠数据1
  getAdditionalpurchase1(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/marketing/add-on-deal/key-metrics/', data, option)
  }

  // 获取加购优惠数据2
  getAdditionalpurchase2(country, data, option) {
    return this.getChinese(country, '/api/mydata/marketing/add-on-deal/gift-with-purchase/key-metrics/', data, option)
  }

  // 获取实时聊天数据
  getrealtime(country, data, option) {
    return this.getChinese(country, '/api/mydata/v2/chat/dashboard/funnel/', data, option)
  }

  // 获取常见问题助手数据
  getfaqassistant(country, data, option) {
    return this.getChinese(country, '/api/mydata/chat/faq/overview/', data, option)
  }

  // 获取常见问题助手按钮数据
  getfaqassistant1(country, data, option) {
    return this.getChinese(country, '/api/mydata/chat/faq/list/', data, option)
  }

  // 获取销售辅助数据
  getsalesassistance(country, data, option) {
    return this.getChinese(country, '/api/mydata/v4/selling-coach/listing-optimiser/overview/', data, option)
  }

  // 获取行销活动套装优惠数据
  getdiscount(country, data, option) {
    return this.getChinese(country, '/api/marketing/v3/bundle_deal/list/', data, option)
  }

  // 创建套装促销活动
  creatdiscount(country, data, option) {
    return this.postChinese(country, '/api/marketing/v3/bundle_deal/', data, option)
  }
  }

