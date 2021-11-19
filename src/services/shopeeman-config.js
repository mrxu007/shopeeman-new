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

    // 各站点店铺信息
    this.site_mall = {
      'TH': [
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '7000',
          'ShipName': 'Standard Delivery - ส่งธรรมดาในประเทศ'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '7001',
          'ShipName': 'Standard Delivery Bulky - ส่งสินค้าขนาดใหญ่'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '70021',
          'ShipName': 'Kerry'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '70023',
          'ShipName': 'Best Express'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '70022',
          'ShipName': 'J&T Express'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '70020',
          'ShipName': 'DHL Domestic'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '70024',
          'ShipName': 'DHL Bulky'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '70016',
          'ShipName': 'Thailand Post - Registered Mail'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '70015',
          'ShipName': 'Thailand Post - EMS'
        },
        {
          'Country': '泰国站',
          'CountryCode': 'TH',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '79003',
          'ShipName': 'Seller Own Fleet'
        }
      ],
      'TW': [
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30005',
          'ShipName': '7-11'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30013',
          'ShipName': '蝦皮店到店'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30007',
          'ShipName': '萊爾富'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30006',
          'ShipName': '全家'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30001',
          'ShipName': '黑貓宅急配'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '30008',
          'ShipName': 'OK Mart'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '30010',
          'ShipName': '萊爾富-經濟包'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '39303',
          'ShipName': '中華郵政'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '39304',
          'ShipName': '賣家宅配'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '39312',
          'ShipName': '賣家宅配：大型/超重物品運送'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': true,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '39308',
          'ShipName': '賣家宅配：箱購'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '39013',
          'ShipName': '賣家宅配：虛擬物品'
        },
        {
          'Country': '台湾站',
          'CountryCode': 'TW',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '30012',
          'ShipName': '蝦皮宅配'
        }
      ],
      'MY': [
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '20021',
          'ShipName': 'Ninja Van'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '20010',
          'ShipName': 'DHL eCommerce'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '20011',
          'ShipName': 'J&T Express'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '20007',
          'ShipName': 'Poslaju'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '2000',
          'ShipName': 'Standard Delivery'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '20023',
          'ShipName': 'City-Link Express'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '29910',
          'ShipName': 'Others (West Malaysia)'
        },
        {
          'Country': '马来站',
          'CountryCode': 'MY',
          'IsDeafult': false,
          'IsSelected': false,
          'IsCustomShipFee': true,
          'ShipId': '29911',
          'ShipName': 'Others (East Malaysia)'
        }
      ],
      'PH': [
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '40018',
          'ShipName': 'J&T Express'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '40012',
          'ShipName': 'XPost Integrated'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '40017',
          'ShipName': 'Ninja Van Own Packaging'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '40066',
          'ShipName': 'Standard Delivery'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '40021',
          'ShipName': 'GoGo Xpress'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '4000',
          'ShipName': 'Standard Local'
        },
        {
          'Country': '菲律宾站',
          'CountryCode': 'PH',
          'ShipId': '49900',
          'ShipName': 'Other Logistics Provider'
        }
      ],
      'VN': [
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50016',
          'ShipName': 'VNPost Tiết Kiệm'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50018',
          'ShipName': 'J&T Express'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50020',
          'ShipName': 'GrabExpress'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50022',
          'ShipName': 'NowShip'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50023',
          'ShipName': 'Ninja Van'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50024',
          'ShipName': 'BEST Express'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50010',
          'ShipName': 'Viettel Post'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50011',
          'ShipName': 'Giao Hàng Nhanh'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50012',
          'ShipName': 'Giao Hàng Tiết Kiệm'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '50015',
          'ShipName': 'VNPost Nhanh'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '5001',
          'ShipName': 'Nhanh'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '5002',
          'ShipName': 'Tiết kiệm'
        },
        {
          'Country': '越南站',
          'CountryCode': 'VN',
          'IsDeafult': true,
          'IsSelected': false,
          'ShipId': '5000',
          'ShipName': 'Hoả Tốc'
        }
      ],
      'SG': [
        {
          'Country': '新加坡站',
          'CountryCode': 'SG',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '18035',
          'ShipName': 'SpeedPost Economy'
        },
        {
          'Country': '新加坡站',
          'CountryCode': 'SG',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '10014',
          'ShipName': 'J&T Express'
        },
        {
          'Country': '新加坡站',
          'CountryCode': 'SG',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '10007',
          'ShipName': 'Ninja Van (Home Delivery)'
        },
        {
          'Country': '新加坡站',
          'CountryCode': 'SG',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '19100',
          'ShipName': 'Singpost - Normal Mail'
        }
      ],
      'ID': [
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '8003',
          'ShipName': 'Reguler (Cashless)'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '8005',
          'ShipName': 'Hemat'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '8001',
          'ShipName': 'Same Day'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '8000',
          'ShipName': 'Instant'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '8002',
          'ShipName': 'Next Day'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '80008',
          'ShipName': 'JNE Trucking (JTR)'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': false,
          'IsSelected': false,
          'ShipId': '80031',
          'ShipName': 'Sicepat Gokil'
        },
        {
          'Country': '印尼站',
          'CountryCode': 'ID',
          'IsDeafult': true,
          'IsSelected': true,
          'ShipId': '80024',
          'ShipName': 'J&T Jemari'
        }
      ]
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
  getLogisticsList() { // 各站点对应店铺
    return this.site_mall
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
