/*
 * @Author: your name
 * @Date: 2021-10-22 20:47:53
 * @LastEditTime: 2021-10-23 17:50:08
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\services\shopeeman-service.js
 */
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
  getChinese(country, api, data, options = {}) {
    const url = this.site_domain_chinese_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  getLocal(country, api, data, options) {
    const url = this.site_domain_local_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    options['params'] = data
    return this.NetMessageBridgeService().get(url, JSON.stringify(options))
  }

  postChinese(country, api, data, options) {
    const url = this.site_domain_chinese_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  postLocal(country, api, data, options) {
    const url = this.site_domain_local_bk[country] + api
    options['extrainfo'] = this.getExtraInfo(data)
    return this.NetMessageBridgeService().post(url, JSON.stringify(options), JSON.stringify(data))
  }

  // 获取离线回复数据
  scOfflineReply(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/offline_reply', data)
  }
  // 获取自动回复数据
  scChatSetting(country, data) {
    return this.getChinese(country, '/webchat/api/workbenchapi/v1.2/sc/chat_setting', data)
  }
  //获取店铺评价列表
  getShopEvaluateList(country, data){
    return this.getChinese(country, '/api/v3/settings/search_shop_rating_comments', data)
  }
  //回复商店评价
  replyShopRating(country, data){
    return this.postChinese(country, '/api/v3/settings/reply_shop_rating/', data) 
  }
  // https://seller.th.shopee.cn/api/v3/settings/reply_shop_rating/?SPC_CDS=ce76cffe-61aa-4a77-a1c6-70d848438ba6&SPC_CDS_VER=2

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
}
