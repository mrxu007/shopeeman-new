import applicationConfig from './application-config'
export default class ShopeemanConfig {
  /**
   * 获取当前登录的用户信息
   */
  constructor() {
    //   站点及简码对应关系
    this.site_code = {
      'MY': '马来站',
      'TW': '台湾站',
      'VN': '越南站',
      'ID': '印尼站',
      'PH': '菲律宾站',
      'TH': '泰国站',
      'SG': '新加坡站',
      'BR': '巴西站',
      'MX': '墨西哥站',
      'CO': '哥伦比亚站',
      'CL': '智利站',
      'PL': '波兰站'
    }

    // 各站点号码开头（shopee登录时账号判断会用到）
    this.site_start_number = {
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

    // 各站点货币简码
    this.site_coin_code = {
      'MY': 'MYR',
      'TW': 'TWD',
      'VN': 'VND',
      'ID': 'IDR',
      'PH': 'PHP',
      'TH': 'YHB',
      'SG': 'SGD',
      'BR': 'BRL',
      'MX': 'MX',
      'CO': 'COP',
      'CL': 'CL',
      'PL': 'CL'
    }

    // 各站点货币符号
    this.site_coin_symbol = {
      'MY': 'RM',
      'TW': '$',
      'VN': '₫',
      'ID': 'Rp',
      'PH': '₱',
      'TH': '฿',
      'SG': '$',
      'BR': 'R$',
      'MX': 'MX$',
      'CO': '$',
      'CL': '$',
      'PL': 'zł'
    }

    // 各站点的网址(大陆、本土)和域名选择方式，根据页面（设置->基础设置->域名设置）配置来确定

    // 各站点大陆前台网址
    this.site_domain_chinese = {
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
    this.site_domain_local = {
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

    // 全球站
    this.site_world = 'https://seller.shopee.cn'

    // 各站点大陆后台网址
    this.site_domain_chinese_bk = {
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

    // 各站点本土后台网址
    this.site_domain_local_bk = {
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

    // 全球站cookie域：seller.shopee.cn
    this.site_cookie_world = 'seller.shopee.cn'

    // 各站点大陆cookie域
    this.site_cookie_chinese = {
      'MY': '.my.shopee.cn',
      'TW': '.xiapi.shopee.cn',
      'VN': '.vn.shopee.cn',
      'ID': '.id.shopee.cn',
      'PH': '.ph.shopee.cn',
      'TH': '.th.shopee.cn',
      'SG': '.sg.shopee.cn',
      'BR': '.br.shopee.cn',
      'MX': '.mx.shopee.cn',
      'CO': '.co.shopee.cn',
      'CL': '.cl.shopee.cn',
      'PL': '.pl.shopee.cn'
    }

    // 各站点本土cookie域
    this.site_cookie_local = {
      'MY': '.shopee.com.my',
      'TW': '.shopee.tw',
      'VN': '.shopee.vn',
      'ID': '.shopee.co.id',
      'PH': '.shopee.ph',
      'TH': '.shopee.co.th',
      'SG': '.shopee.sg',
      'BR': '.shopee.com.br',
      'MX': '.shopee.com.mx',
      'CO': '.shopee.com.co',
      'CL': '.shopee.com.cl',
      'PL': '.shopee.com.pl'
    }
  }
  async getUserInfo() {
    const res = await new applicationConfig().getUserConfig()
    return JSON.parse(res) || ''
  }

  getMallFormation(country, IPType) {
    const params = {
      country,
      loginLink: '', // 各站点对应后台域名
      Origin: '', // 各站点对应后台域名
      host: ''
    }
    switch (IPType) { // 根据 country [站点] + IPType  [全局设置大陆 or  本土域名]
      case 1: // 大陆
        params['loginLink'] = `${this.site_domain_chinese_bk[country]}/account/signin`
        params['Origin'] = `${this.site_domain_chinese_bk[country]}`
        params['host'] = `${this.site_domain_chinese_bk[country].replace('https://', '')}`
        break
      case 2: // 本地
        params['loginLink'] = `${this.site_domain_local_bk[country]}/account/signin`
        params['Origin'] = `${this.site_domain_local_bk[country]}`
        params['host'] = `${this.site_domain_chinese_bk[country].replace('https://', '')}`
        break
      default: // 随便 大陆 or  本地  因为后台会自动
        params['loginLink'] = `${this.site_domain_chinese_bk[country]}/account/signin`
        params['Origin'] = `${this.site_domain_chinese_bk[country]}`
        params['host'] = `${this.site_domain_chinese_bk[country].replace('https://', '')}`
        break
    }
    return params
  }
  getSiteCode(val) { // 站点及简码对应关系
    return this.site_code[val] || 'invalid_value'
  }
  getSiteStartNumber() { // 各站点号码开头（shopee登录时账号判断会用到）
    return this.site_start_number || 'invalid_value'
  }
  getSiteCoinCode(val) { // 各站点货币简码
    return this.site_coin_symbol[val] || 'invalid_value'
  }
  getSiteCoinSymbol(val) { // 各站点货币符号
    return this.site_coin_symbol[val] || 'invalid_value'
  }
  // 域名切换设置 Auto:自动切换  Local：大陆  Abroad：境外
  async getSiteWebUrl(val) {
    let weburl = ''
    const userInfo = await this.getUserInfo()
    const domain = userInfo && userInfo.SwitchDominTypeSetting
    if (domain === 'Local') {
      weburl = this.site_domain_chinese[val]
    } else if (domain === 'Abroad') {
      weburl = this.site_domain_local[val]
    }
    return weburl
  }
  // getSiteDomainChinese(val) { // 各站点大陆前台网址
  //   return this.site_domain_chinese[val] || 'invalid_value'
  // }
  // getSiteDomainLocal(val) { // 各站点本土前台网址
  //   return this.site_domain_local[val] || 'invalid_value'
  // }
  // getSiteDomainchineseBk(val) { // 各站点大陆后台网址
  //   return this.site_domain_chinese_bk[val] || 'invalid_value'
  // }
  // getSiteDomainLocalBk(val) { // 各站点本土后台网址
  //   return this.site_domain_local_bk[val] || 'invalid_value'
  // }
  // getSiteCookiechinese(val) { // 各站点大陆cookie域
  //   return this.site_cookie_chinese[val] || 'invalid_value'
  // }
  // getSiteCookieLocal(val) { // 各站点本土cookie域
  //   return this.site_cookie_local[val] || 'invalid_value'
  // }
}
