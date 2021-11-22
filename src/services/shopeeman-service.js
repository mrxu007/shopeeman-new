import { sha256 } from 'js-sha256'
import md5 from 'js-md5'
import { getImgMd5 } from '../util/util'
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
    const domain_switch = data.SwitchDominTypeSetting || data.domain_switch
    const domainType = domain_switch === 'Local' ||  domain_switch === 'Auto'
    return domainType && this.site_domain_chinese_bk[country] || this.site_domain_local_bk[country]
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
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
    options['params'] = data
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    // console.log(url, JSON.stringify(options))
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  async postChinese(country, api, data, options = {}, exportInfo) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    if (exportInfo) { // 适配店铺管理---导入店铺
      options['extrainfo']['exportInfo'] = exportInfo
    }
    delete data.mallId
    const referer = options['headers'] && options['headers'].referer
    if (referer) {
      options['headers'] = Object.assign(options['headers'],
        {
          origin: url,
          referer: url + referer
        })
    }
    console.log(url, JSON.stringify(options), JSON.stringify(data))
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  async postChineseImageFile(country, api, data, options = {}, base64File) {
    data = JSON.parse(JSON.stringify(data))
    // options {extrainfo // 第三方接口, params, header}
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
    const base64 = base64File.dataURL
    const ext = base64File.ext
    const filename = `${getImgMd5(base64)}.${ext}`
    return this.NetMessageBridgeService().uploadFile(url, JSON.stringify(options), null, base64, filename, 'multipart/form-data')
  }
  async putChinese(country, api, data, options = {}) {
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
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
    data = JSON.parse(JSON.stringify(data))
    const url = await this.getUrlPrefix(country) + api
    options['extrainfo'] = this.getExtraInfo(data)
    delete data.mallId // body 里面不能带店铺id
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
    return country === 'SG' || country === 'ID' ? account : reg[country] + account
  }

  // 获取店铺评价列表
  getShopEvaluateList(country, data) {
    return this.getChinese(country, '/api/v3/settings/search_shop_rating_comments', data)
  }
  // 回复商店评价
  replyShopRating(country, data) {
    return this.postChinese(country, '/api/v3/settings/reply_shop_rating', data, { Headers: { 'Content-Type': ' application/json' } })
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
    const acccount_info = {
      username: '',
      password: mall_account_info.password
    }
    const reg = new RegExp('[\\u4E00-\\u9FFFa-zA-Z]+', 'g')
    if (accountName.indexOf('@') > -1) {
      params['email'] = accountName
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
      copy_mallInfo = JSON.parse(JSON.stringify(mallInfo))
      copy_mallInfo['accountName'] = acccount_info.username
      copy_mallInfo['mall_account_info'] = acccount_info
    }
    try {
      let res = await this.postChinese(country, '/api/v2/login', params, { // option
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'charset': 'UTF-8'
        }
      }, copy_mallInfo)
      res = JSON.parse(res)
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

        const Cookie_new = { // 店铺cookie信息(导入店铺专用)(更新壳)
          'SPC_CDS_VER': '2',
          'SPC_EC': data.sso,
          'ShopeeUid': mallUId,
          'SPC_F': '',
          'CNSC_SSO': '',
          'SPC_CNSC_TK': '',
          'SPC_CNSC_UD': '',
          'SC_DFP': '',
          'SPC_SC_SA_UD': '',
          'SPC_SC_SA_TK': '',
          'SPC_SC_UD': '',
          'token': data.token,
          'cstoken': data.cs_token,
          'satoken': '',
          'sso': data.sso,
          'shopeeuid': mallUId,
          'shopid': mallId,
          'portrait': data.portrait,
          'userRealName': username,
          'mainAccountId': '',
          'spc_f': '',
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
        return { code: 200, data: obj }
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
      return { code, 'data': { 'message': message, 'data': res.data } }
    } catch (e) {
      console.log('e', e)
      return { code: -2, data: `login -catch: ${e} ` }
    }
  }
  // 店铺登录 get版本
  async getLogin(mallInfo) {
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

        const Cookie_new = { // 店铺cookie信息(导入店铺专用)(更新壳)
          'SPC_CDS_VER': '2',
          'SPC_EC': data.sso,
          'ShopeeUid': mallUId,
          'SPC_F': '',
          'CNSC_SSO': '',
          'SPC_CNSC_TK': '',
          'SPC_CNSC_UD': '',
          'SC_DFP': '',
          'SPC_SC_SA_UD': '',
          'SPC_SC_SA_TK': '',
          'SPC_SC_UD': '',
          'token': data.token,
          'cstoken': data.cs_token,
          'satoken': '',
          'sso': data.sso,
          'shopeeuid': mallUId,
          'shopid': mallId,
          'portrait': data.portrait,
          'userRealName': username,
          'mainAccountId': '',
          'spc_f': '',
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
        return { code: 200, data: obj }
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
      return { code, 'data': { 'message': message, 'data': res.data } }
    } catch (e) {
      console.log('e', e)
      return { code: -2, data: `login -catch: ${e} ` }
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

  //-----------------一键上新--------------------//
  //创建活动
  discount(country, data, option){
    return this.postChinese(country,'/api/marketing/v3/discount/',data,option)
  }

  //获取品牌词库
  getBrandList(country, data, option){
    return this.getChinese(country,'/api/v3/category/get_brand_list',data,option)
  }

  //获取类目属性
  getAttributeTree(country, data, option){
    return this.getChinese(country,'/api/v3/category/get_attribute_tree/',data,option)
  }
}

