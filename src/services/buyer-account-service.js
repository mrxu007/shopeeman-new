/**
 * 买手号操作服务
 */
export default class buyerAccountService {
  constructor() {
    this.nativeService = window['BuyerAccountBridgeService']
  }
  /**   BuyerLogin（platform,url）
   *    platform:平台
        url:登录链接
        public const int PddPlatform = 1; //拼多多
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
  async buyerCenterLogin(platform, url) {
    this.nativeService.buyerLogin(platform, url)
  }
}
