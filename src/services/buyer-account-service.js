/**
 * 买手号操作服务
 */
export default class buyerAccountService {
  constructor() {
    this.nativeService = window['buyerAccountService']
  }
  ShotOrderPlatform = {
    TaoBao: 0,
    PinDuoduo: 1,
    JingDong: 2,
    JingXi: 3,
    HYJ: 4,
    Alibaba: 5,
    YunPaiDan: 6,
    Lazada: 7,
    Shopee: 8,
    CrossBorder: 9,
    OwnPlatform: 10,
    PpxiasGhpt: 11,
    AliExpressPlatform: 12
  }
  /** shopee ppx项目
   *  public const int PddPlatform = 1; //拼多多
          public const int TbPlatform = 2; //淘宝
          public const int TmPlatform = 3; //天猫
          public const int JdPlatform = 4; //京东
          public const int JxPlatform = 10; //京喜
          public const int OwnPlatform = 5; //自有
          public const int PpxiasGHPT = 6; //皮皮虾供货平台
          public const int AlibabaPlatform = 8; //皮皮虾供货平台
          9 //lazada
          public const int HyjPlatform = 7; //货源甲
          public const int ShopeePlatform = 11;//Shopee平台
          public const int AliExpress = 12;//Shopee平台
          public const int HlbOverseasPlatform = 15;//货老板云仓
          public const int TmallCrossBorderPlatform = 13;//天猫淘宝海外平台
   */
  platformCode = {
    'Tb': 2,
    'Pdd': 1,
    '1688': 8,
    'jx': 10,
    'lazada': 9
  }
  // lazada前台地址  [country] /user/profile#/
  'lazada' = {
    'MY': 'https://member.lazada.com.my',
    'VN': 'https://member.lazada.vn',
    'ID': 'https://member.lazada.co.id',
    'PH': 'https://member.lazada.com.ph',
    'TH': 'https://member.lazada.co.th',
    'SG': 'https://member.lazada.sg'
  }
  // shopee前台地址  [country] /user/account/address
  'shopee' = {
    'MY': 'https://shopee.com.my',
    'TW': 'https://shopee.tw',
    'VN': 'https://shopee.vn',
    'ID': 'https://shopee.co.id',
    'PH': 'https://shopee.ph',
    'TH': 'https://shopee.co.th',
    'SG': 'https://shopee.sg',
    'BR': 'https://shopee.com.br'
  }
  chinessUrl = {
    'Tb': 'https://login.taobao.com/member/login.jhtml?from=taobaoindex&f=top&style=&sub=true&redirect_url=https%3A%2F%2Fmember1.taobao.com%2Fmember%2Ffresh%2Fdeliver_address.html',
    'Pdd': 'http://mobile.yangkeduo.com/login.html',
    '1688': 'https://login.1688.com/member/signin.htm?tracelog=member_signout_signin',
    'jx': 'https://plogin.m.jd.com/login/login'
  }
  async buyerCenterLogin(platform, url, ShotOrderBuyerAccount) {
    this.nativeService.buyerLogin(platform, url, ShotOrderBuyerAccount)
  }
  /**
   * 1688登陆
   */
  alibabaLogin() {
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.Alibaba, 'https://login.1688.com/member/signin.htm?tracelog=member_signout_signin', null)
  }
  /**
   * taobao登陆
   */
  taobaoLogin() {
    console.log(2)
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.TaoBao, 'https://login.taobao.com/member/login.jhtml?from=taobaoindex&f=top&style=&sub=true&redirect_url=https://member1.taobao.com/member/fresh/deliver_address.htm', null)
  }
  /**
   * pdd登陆
   */
  pddLogin() {
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.PinDuoduo, 'http://mobile.yangkeduo.com/login.html', null)
  }
  /**
   * jx登陆
   */
  jingxiLogin() {
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.JingXi, 'https://plogin.m.jd.com/login/login', null)
  }
  /**
   * lazada登陆
   */
  lazadaLogin(country) {
    const url = this.lazada[country] + '/user/profile#/'
    console.log(7, url, country)
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.Lazada, url, {
      'Country': country
    })
  }
  /**
   * shopee登陆
   */
  shopeeLogin(country) {
    const url = this.shopee[country] + '/user/account/address'
    console.log(8, url, country)
    return this.nativeService.buyerLogin(this.ShotOrderPlatform.Shopee, url, {
      'Country': country
    })
  }
  /**
   * pdd个人中心
   */
  pddUserCenter(account) {
    return this.nativeService.userCenter(this.ShotOrderPlatform.PinDuoduo, 'http://mobile.yangkeduo.com/personal.html', account)
  }
  /**
   * taobao个人中心
   */
  taobaoUserCenter(account) {
    return this.nativeService.userCenter(this.ShotOrderPlatform.TaoBao, 'https://www.taobao.com', account)
  }
  /**
   * jingxi个人中心
   */
  jingxiUserCenter(account) {
    return this.nativeService.userCenter(this.ShotOrderPlatform.JingXi, 'https://home.m.jd.com/myJd/newhome.action', account)
  }
  /**
   * 1688个人中心
   */
  AlibabaUserCenter(account) {
    return this.nativeService.userCenter(this.ShotOrderPlatform.Alibaba, 'https://work.1688.com/home/buyer.htm?', account)
  }
  /**
   * lazada个人中心
   */
  lazadaUserCenter(country, account) {
    const url = this.lazada[country] + '/user/profile#/'
    console.log(7, url, country)
    return this.nativeService.userCenter(this.ShotOrderPlatform.Lazada, url, account)
  }
  /**
   * shopee个人中心
   */
  shopeeUserCenter(country, account) {
    const url = this.shopee[country] + '/user/account/address'
    console.log(8, url, country)
    return this.nativeService.userCenter(this.ShotOrderPlatform.Shopee, url, account)
  }

  /**
   *登录阿里云翻译
   */
  loginAliTranslation() {
    return this.nativeService.aliTranslateLogin()
  }
  /**
   * @name : 拼多多月卡
   * @param  {*}
   */
  pddCouponWindow(arr) {
    return this.nativeService.callPddCouponWindow(arr)
  }
  /**
   *登录阿里云翻译账户中心
   */
  aliTranslateCenter(data) {
    console.log(JSON.stringify(data))
    return this.nativeService.aliTranslateCenter(JSON.stringify(data))
  }
  /**
   * @name : 
   * @param  {*}
   * @param {*} skuInfo 订单信息
   * @param {*} buyerAccount 买手号
   */  
  getSkuRelation(skuInfo,buyerAccount){
    return this.nativeService.getSkuRelation(skuInfo,buyerAccount)
  }
    /**
   * pdd个人中心
   */
     pddOrderCenter(account,orderNo) {
      return this.nativeService.userCenter(this.ShotOrderPlatform.PinDuoduo, ` http://mobile.yangkeduo.com/order.html?order_sn=${orderNo}`, account)
    }
    /**
     * taobao个人中心
     */
    taobaoOrderCenter(account,orderNo) {
      return this.nativeService.userCenter(this.ShotOrderPlatform.TaoBao, `https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=${orderNo}`, account)
    }
    /**
     * jingxi个人中心
     */
    jingxiOrderCenter(account,orderNo) {
      return this.nativeService.userCenter(this.ShotOrderPlatform.JingXi, `https://wqs.jd.com/order/n_detail_v2.shtml?deal_id=${orderNo}&isoldpin=0&sceneval=2`, account)
    }
    /**
     * 1688个人中心
     */
    AlibabaOrderCenter(account,orderNo) {
      return this.nativeService.userCenter(this.ShotOrderPlatform.Alibaba, `https://trade.1688.com/order/new_step_order_detail.htm?orderId=${orderNo}`, account)
    }
    /**
     * lazada个人中心
     */
    lazadaOrderCenter(country, account,orderNo) {
      const url = this.lazada[country] + `/customer/order/view/?tradeOrderId=${orderNo}`
      console.log(7, url, country)
      return this.nativeService.userCenter(this.ShotOrderPlatform.Lazada, url, account)
    }
    /**
     * shopee个人中心
     */
    shopeeOrderCenter(country, account,URL) {
      const url = this.shopee[country] + URL
      console.log(8, url, country)
      return this.nativeService.userCenter(this.ShotOrderPlatform.Shopee, url, account)
    }
}
