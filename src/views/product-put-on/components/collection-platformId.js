//      public const int PddPlatform = 1; //拼多多
//      public const int TbPlatform = 2; //淘宝
//      public const int TmPlatform = 3; //天猫
//      public const int JdPlatform = 4; //京东
//      public const int JxPlatform = 10; //京喜
//      public const int OwnPlatform = 5; //自有
//      public const int PpxiasGHPT = 6; //皮皮虾供货平台
//      public const int AlibabaPlatform = 8; //阿里巴巴供货平台
//      public const int HyjPlatform = 7; //货源甲
//      public const int ShopeePlatform = 11;//Shopee平台
//      public const int AliExpress = 12;//速卖通
//      public const int HlbOverseasPlatform = 15;//货老板云仓
//      public const int TmallCrossBorderPlatform = 13;//天猫淘宝海外平台
//      /// <summary>
//      /// 来赞
//      /// </summary>
//      public const int LazadaPlatform = 9;

// 拼多多优惠采集platform=1，但是调用此方法是为和拼多多区分传参1.2
const platformCode = {
  PddPlatform: 1, // 拼多多
  TbPlatform: 2, // 淘宝
  TmPlatform: 3, // 天猫
  JdPlatform: 4, // 京东
  OwnPlatform: 5, // 自有
  PpxiasGHPT: 6, // 皮皮虾供货平台
  HyjPlatform: 7, // 货源甲
  AlibabaPlatform: 8, // 阿里巴巴供货平台
  JxPlatform: 10, // 京喜
  ShopeePlatform: 11, // Shopee平台
  AliExpress: 12, // 速卖通
  TmallCrossBorderPlatform: 13, // 天猫淘宝海外平台
  HlbOverseasPlatform: 15 // 货老板云仓
}
const platformObj = {
  1: '拼多多', // 拼多多接口： 1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
  1.2: '拼多多优惠采集',
  2: '淘宝', // 3: '天猫',  天猫 === 淘宝
  4: '京东',
  5: '自有',
  // 6: '皮皮虾供货平台',   平台已废弃
  7: '货源甲',
  8: '1688',
  9: 'Lazada',
  10: '京喜',
  11: '虾皮',
  12: '速卖通',
  13: '天猫淘宝海外平台',
  15: '货老板云仓'
}
function getPlatform(platformIdArr) {
  const platformArr = []
  if (!Array.isArray(platformIdArr)) {
    return platformArr
  }
  platformIdArr.map(item => { //  [1, 1.1, 2, 8, 9, 10, 11,  12] 默认平台ID
    if (platformObj[item]) {
      platformArr.push({ 'label': platformObj[item], value: item })
    }
  })
  return platformArr
}
export default getPlatform
