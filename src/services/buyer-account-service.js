/**
 * 买手号操作服务
 */
export default class buyerAccountService {
  constructor() {
    this.nativeService = window['buyerAccountService']
  }
/**拍单模块
 *      TaoBao, 0
        PinDuoduo, 1
        JingDong, 2
        JingXi, 3
        HYJ, 4
        Alibaba, 5
        YunPaiDan, 6
        Lazada, 7
        Shopee, 8
        CrossBorder 9
 */
/** shopee ppx项目
 *  public const int PddPlatform = 1; //拼多多
        public const int TbPlatform = 2; //淘宝
        public const int TmPlatform = 3; //天猫
        public const int JdPlatform = 4; //京东
        public const int JxPlatform = 10; //京喜
        public const int OwnPlatform = 5; //自有
        public const int PpxiasGHPT = 6; //皮皮虾供货平台
        public const int AlibabaPlatform = 8; //皮皮虾供货平台
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
  //lazada前台地址  [country] /user/profile#/
  'lazada' = {
    "MY": "https://member.lazada.com.my",
    "VN": "https://member.lazada.vn",
    "ID": "https://member.lazada.co.id",
    "PH": "https://member.lazada.com.ph",
    "TH": "https://member.lazada.co.th",
    "SG": "https://member.lazada.sg",
  }
  //shopee前台地址  [country] /user/account/address
  'shopee' = {
    "MY": "https://shopee.com.my",
    "TW": "https://shopee.tw",
    "VN": "https://shopee.vn",
    "ID": "https://shopee.co.id",
    "PH": "https://shopee.ph",
    "TH": "https://shopee.co.th",
    "SG": "https://shopee.sg",
    "BR": "https://shopee.com.br",
  }
  chinessUrl = {
    'Tb': 'https://login.taobao.com/member/login.jhtml?from=taobaoindex&f=top&style=&sub=true&redirect_url=https%3A%2F%2Fmember1.taobao.com%2Fmember%2Ffresh%2Fdeliver_address.html',
    'Pdd': 'http://mobile.yangkeduo.com/login.html',
    '1688': 'https://login.1688.com/member/signin.htm?tracelog=member_signout_signin',
    'jx': 'https://plogin.m.jd.com/login/login'
  }
  async buyerCenterLogin(platform, url,ShotOrderBuyerAccount) {
    this.nativeService.buyerLogin(platform, url,ShotOrderBuyerAccount)
  }
  /**
   * 1688登陆
   */
  alibabaLogin() {
    return this.nativeService.buyerLogin(5, 'https://login.1688.com/member/signin.htm?tracelog=member_signout_signin',null)
  }
  /**
   * taobao登陆
   */
  taobaoLogin() {
    console.log(2)
    return this.nativeService.buyerLogin(0, 'https://login.taobao.com/member/login.jhtml?from=taobaoindex&f=top&style=&sub=true&redirect_url=https%3A%2F%2Fmember1.taobao.com%2Fmember%2Ffresh%2Fdeliver_address.html',null)
  }
  /**
   * pdd登陆
   */
  pddLogin() {
    return this.nativeService.buyerLogin(1, 'http://mobile.yangkeduo.com/login.html',null)
  }
  /**
   * jx登陆
   */
  jingxiLogin() {
    return this.nativeService.buyerLogin(3, 'https://plogin.m.jd.com/login/login',null)
  }
  /**
   * lazada登陆
   */
  lazadaLogin(country) {
    const url = this.lazada[country] +'/user/profile#/'
    console.log(7,url,country)
    return this.nativeService.buyerLogin(7, url,{"Country":country})
  }

  /**
   *登录阿里云翻译
   */
  loginAliTranslation() {
    return this.nativeService.aliTranslateLogin()
  }
}
