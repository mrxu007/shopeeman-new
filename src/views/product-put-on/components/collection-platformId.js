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
// const platformCode = {
//   PddPlatform: 1, // 拼多多
//   TbPlatform: 2, // 淘宝
//   TmPlatform: 3, // 天猫
//   JdPlatform: 4, // 京东
//   OwnPlatform: 5, // 自有
//   PpxiasGHPT: 6, // 皮皮虾供货平台
//   HyjPlatform: 7, // 货源甲
//   AlibabaPlatform: 8, // 阿里巴巴供货平台
//   LazadaPlatform: 9, // lazada
//   JxPlatform: 10, // 京喜
//   ShopeePlatform: 11, // Shopee平台
//   AliExpress: 12, // 速卖通
//   TmallCrossBorderPlatform: 13, // 天猫淘宝海外平台
//   HlbOverseasPlatform: 15 // 货老板云仓
// }
// 虾皮采集站点
const shopeeSite = [
  { value: 'TW', label: '台湾' },
  { value: 'ID', label: '印尼' },
  { value: 'MY', label: '马来' },
  { value: 'SG', label: '新加坡' },
  { value: 'PH', label: '菲律宾' },
  { value: 'VN', label: '越南' },
  { value: 'TH', label: '泰国' },
  { value: 'BR', label: '巴西' },
  { value: 'MX', label: '墨西哥' }
]
// 虾皮出货地点
const shopeeSitePlace = {
  'TW': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' }
  ],
  'ID': [
    { lebel: '本地', value: 'Dalam Negeri' },
    { lebel: '海外', value: 'Luar Negeri' },
    { lebel: 'Jabodetabek（雅博德塔别克）', value: 'Jabodetabek' },
    { lebel: 'DKI Jakarta（DKI雅加达）', value: 'DKI Jakarta' },
    { lebel: 'Jawa Barat（西爪哇）', value: 'Jawa Barat' },
    { lebel: 'Jawa Timur（东爪哇）', value: 'Jawa Timur' },
    { lebel: 'Jawa Tengah（中爪哇）', value: 'Jawa Tengah' },
    { lebel: 'Kepulauan Riau（廖内群岛）', value: 'Kepulauan Riau' },
    { lebel: 'Banten（万丹）', value: 'Banten' },
    { lebel: 'Sumatera Utara（北苏门答腊）', value: 'Sumatera Utara' },
    { lebel: 'DI Yogyakarta（在日惹）', value: 'DI Yogyakarta' },
    { lebel: 'Bali（巴厘岛）', value: 'Bali' },
    { lebel: 'Lampung（楠榜）', value: 'Lampung' },
    { lebel: 'Sumatera Selatan（南苏门答腊）', value: 'Sumatera Selatan' },
    { lebel: 'Sulawesi Selatan（南苏拉威西）', value: 'Sulawesi Selatan' },
    { lebel: 'Riau（廖内）', value: 'Riau' },
    { lebel: 'Jambi（占碑）', value: 'Jambi' },
    { lebel: 'Kalimantan Timur（东加里曼丹）', value: 'Kalimantan Timur' },
    { lebel: 'Kalimantan Selatan（南加里曼丹）', value: 'Kalimantan Selatan' },
    { lebel: 'Kalimantan Barat（西加里曼丹）', value: 'Kalimantan Barat' }
    // ["Dalam Negeri"] = "Dalam Negeri（国内的）", 和本地海外重复
    // ["Luar Negeri"] = "Luar Negeri（海外）"
  ],
  'MY': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' },
    { label: 'West Malaysia（西马）', value: 'West Malaysia' },
    { label: 'East Malaysia（东马来西亚）', value: 'East Malaysia' },
    { label: 'Selangor（雪兰莪）', value: 'Selangor' },
    { label: 'Kuala Lumpur（吉隆坡）', value: 'Kuala Lumpur' },
    { label: 'Penang（槟城）', value: 'Penang' },
    { label: 'Johor（柔佛）', value: 'Johor' },
    { label: 'Kedah（吉打）', value: 'Kedah' },
    { label: 'Perak（霹雳州）', value: 'Perak' },
    { label: 'Melaka（马六甲）', value: 'Melaka' },
    { label: 'Pahang（彭亨）', value: 'Pahang' },
    { label: 'Negeri Sembilan（森美兰州）', value: 'Negeri Sembilan' },
    { label: 'Terengganu（登嘉楼）', value: 'Terengganu' },
    { label: 'Sarawak（砂拉越）', value: 'Sarawak' },
    { label: 'Kelantan（吉兰丹）', value: 'Kelantan' },
    { label: 'Perlis（玻璃市）', value: 'Perlis' },
    { label: 'Sabah（沙巴）', value: 'Sabah' },
    { label: 'Putrajaya（布城）', value: 'Putrajaya' },
    { label: 'Labuan（纳闽）', value: 'Labuan' }
  ],
  'SG': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' }
  ],
  'PH': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' },
    { label: 'Metro Manila（马尼拉大都会）', value: 'Metro Manila' },
    { label: 'North Luzon（北吕宋）', value: 'North Luzon' },
    { label: 'South Luzon（南吕宋岛）', value: 'South Luzon' },
    { label: 'Visayas（米沙鄢）', value: 'Visayas' },
    { label: 'Mindanao（棉兰老岛）', value: 'Mindanao' }
  ],
  'VN': [
    { label: '海外', value: 'Nước ngoài' },
    { label: 'Hà Nội（河内）', value: 'Hà Nội' },
    { label: 'TP. Hồ Chí Minh（胡志明）', value: 'TP. Hồ Chí Minh' },
    { label: 'Thái Nguyên（泰阮）', value: 'Thái Nguyên' },
    { label: 'Vĩnh Phúc（永福）', value: 'Vĩnh Phúc' },
    { label: 'Hải Phòng（海防）', value: 'Hải Phòng' },
    { label: 'Đồng Nai（同奈）', value: 'Đồng Nai' },
    { label: 'Hưng Yên（红颜）', value: 'Hưng Yên' },
    { label: 'Bình Dương（平阳）', value: 'Bình Dương' },
    { label: 'Bắc Ninh（北宁）', value: 'Bắc Ninh' },
    { label: 'Đà Nẵng（岘港）', value: 'Đà Nẵng' },
    { label: 'Quảng Ninh（广宁）', value: 'Quảng Ninh' },
    { label: 'Hải Dương（海阳）', value: 'Hải Dương' },
    { label: 'Nam Định（南定）', value: 'Nam Định' },
    { label: 'Cần Thơ（芹苴）', value: 'Cần Thơ' },
    { label: 'Phú Thọ（富都）', value: 'Phú Thọ' },
    { label: 'Bà Rịa - Vũng Tàu（BA Ria 头顿）', value: 'Bà Rịa - Vũng Tàu' },
    { label: 'Đắk Lắk（多乐）', value: 'Đắk Lắk' },
    { label: 'Thanh Hóa（清化）', value: 'Thanh Hóa' },
    { label: 'Thái Bình（平静的）', value: 'Thái Bình' },
    { label: 'Nước ngoài（外国的）', value: 'Nước ngoài' }
  ],
  'TH': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' },
    { label: 'กรุงเทพและปริมณฑล（曼谷及周边地区）', value: 'กรุงเทพและปริมณฑล' },
    { label: 'ภาคกลาง（中央）', value: 'ภาคกลาง' },
    { label: 'ภาคตะวันออกเฉียงเหนือ（东北）', value: 'ภาคตะวันออกเฉียงเหนือ' },
    { label: 'ภาคใต้（南）', value: 'ภาคใต้' },
    { label: 'ภาคเหนือ（北方）', value: 'ภาคเหนือ' },
    { label: 'ภาคตะวันออก（东部地区）', value: 'ภาคตะวันออก' },
    { label: 'ภาคตะวันตก（西部地区）', value: 'ภาคตะวันตก' }
  ],
  'BR': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' },
    { label: 'São Paulo（圣保罗）', value: 'São Paulo' },
    { label: 'Acre（英亩）', value: 'Acre' },
    { label: 'Alagoas（阿拉戈斯）', value: 'Alagoas' },
    { label: 'Amapá（阿马帕）', value: 'Amapá' },
    { label: 'Amazonas（亚马逊人）', value: 'Amazonas' },
    { label: 'Bahia（巴伊亚）', value: 'Bahia' },
    { label: 'Ceará（塞阿拉）', value: 'Ceará' },
    { label: 'Distrito Federal（联邦区）', value: 'Distrito Federal' },
    { label: 'Espírito Santo（神圣的灵魂）', value: 'Espírito Santo' },
    { label: 'Goiás（戈亚斯）', value: 'Goiás' },
    { label: 'Maranhão（马拉尼昂）', value: 'Maranhão' },
    { label: 'Mato Grosso（马托格罗索州）', value: 'Mato Grosso' },
    { label: 'Mato Grosso do Sul（南马托格罗索州）', value: 'Mato Grosso do Sul' },
    { label: 'Minas Gerais（米纳斯吉拉斯州）', value: 'Minas Gerais' },
    { label: 'Pará（为了）', value: 'Pará' },
    { label: 'Paraíba（帕拉伊巴）', value: 'Paraíba' },
    { label: 'Paraná（巴拉那）', value: 'Paraná' },
    { label: 'Pernambuco（伯南布哥）', value: 'Pernambuco' },
    { label: 'Piauí（皮奥伊）', value: 'Piauí' },
    { label: 'Rio de Janeiro（里约热内卢）', value: 'Rio de Janeiro' },
    { label: 'Rio Grande do Norte（北大河）', value: 'Rio Grande do Norte' },
    { label: 'Rio Grande do Sul（南里奥格兰德）', value: 'Rio Grande do Sul' },
    { label: 'Rondônia（朗多尼亚）', value: 'Rondônia' },
    { label: 'Roraima（罗赖马）', value: 'Roraima' },
    { label: 'Santa Catarina（圣卡塔琳娜）', value: 'Santa Catarina' },
    { label: 'Sergipe（塞尔吉佩）', value: 'Sergipe' },
    { label: 'Tocantins（托坎廷斯）', value: 'Tocantins' }
  ],
  'MX': [
    { label: '本地', value: '-1' },
    { label: '海外', value: '-2' }
  ]
}
// Lazada采集站点
const lazadaSite = [
  // { value: 'TW', label: '台湾' },
  { value: 'TH', label: '泰国' },
  { value: 'MY', label: '马来' },
  { value: 'ID', label: '印尼' },
  { value: 'VN', label: '越南' },
  { value: 'SG', label: '新加坡' },
  { value: 'PH', label: '菲律宾' }
  // { value: 'BR', label: '巴西' },
  // { value: 'MX', label: '墨西哥' }
]
// Lazada
const lazadaSitePlace = {
  'ID': {
    'Lokal（本地）：': [
      {
        label: 'Jawa Barat（西爪哇）',
        value: '1794'
      },

      {
        label: 'DKI Jakarta（雅加达DKI）',
        value: '1796'
      },

      {
        label: 'Jawa Timur（东爪哇）',
        value: '1795'
      },

      {
        label: 'Banten（万丹）',
        value: '1791'
      },

      {
        label: 'Jawa Tengah（中爪哇省）',
        value: '1797'
      },

      {
        label: 'North Sumatra（北苏门答腊）',
        value: '1817'
      },

      {
        label: 'Riau Islands（廖内群岛）',
        value: '1800'
      },

      {
        label: 'Di Yogyakarta（在日惹）',
        value: '1818'
      },

      {
        label: 'South Sumatra（南苏门答腊）',
        value: '1815'
      },

      {
        label: 'Sulawesi Selatan（南苏拉威西岛）',
        value: '1813'
      },

      {
        label: 'Riau（廖内）',
        value: '1809'
      },

      {
        label: 'West Sumatra（西苏门答腊）',
        value: '1811'
      },

      {
        label: 'Bali（巴厘岛）',
        value: '1788'
      },

      {
        label: 'West Kalimantan（西加里曼丹）',
        value: '1798'
      }
    ],
    'Luar Negeri（海外）：': [

      {
        label: 'Tiongkok（中国）',
        value: '-49'
      },

      {
        label: 'Amerika Serikat（美国）',
        value: '-231'
      },

      {
        label: 'India（印度）',
        value: '-105'
      },

      {
        label: 'Jerman（德国）',
        value: '-57'
      },

      {
        label: 'Korea Selatan（南韩）',
        value: '-122'
      },

      {
        label: 'Taiwan（台湾）',
        value: '-226'
      },

      {
        label: 'Makau SAR Tiongkok（澳门）',
        value: '-148'
      },

      {
        label: 'Malaysia（马来西亚）',
        value: '-158'
      },

      {
        label: 'Kanada（加拿大）',
        value: '-39'
      }
    ]
  },
  'MY': {
    'Local（本地）：': [

      {
        label: 'West Malaysia（西马）',
        value: 'West Malaysia'
      },

      {
        label: 'East Malaysia（东马）',
        value: 'East Malaysia'
      }
    ],
    'Overseas（海外）：': [

      {
        value: '-49',
        label: 'China（中国）'
      },

      {
        value: '-226',
        label: 'Taiwan（台湾）'
      },

      {
        value: '-15',
        label: 'Australia（澳大利亚）'
      },

      {
        value: '-105',
        label: 'India（印度）'
      },

      {
        value: '-231',
        label: 'United States（美国）'
      },

      {
        value: '-122',
        label: 'South Korea（韩国）'
      },

      {
        value: '-148',
        label: 'Macau SAR China（澳门）'
      },

      {
        value: '-114',
        label: 'Japan（日本）'
      },

      {
        value: '-47',
        label: 'Chile（智利）'
      },

      {
        value: '-75',
        label: 'France（法国）'
      },

      {
        value: '-14',
        label: 'Austria（奥地利）'
      },

      {
        value: '-7',
        label: 'Albania（阿尔巴尼亚）'
      },

      {
        value: '-167',
        label: 'Norway（挪威）'
      },

      {
        value: '-4',
        label: 'Afghanistan（阿富汗）'
      },

      {
        value: '-177',
        label: 'Philippines（菲律宾）'
      },

      {
        value: '-22',
        label: 'Belgium（比利时）'
      },

      {
        value: '-39',
        label: 'Canada（加拿大）'
      },

      {
        value: '-77',
        label: 'United Kingdom（英国）'
      },

      {
        value: '-117',
        label: 'Cambodia（柬埔寨）'
      },

      {
        value: '-171',
        label: 'New Zealand（新西兰）'
      }
    ]
  },
  'SG': {
    'Location（位置）：': [

      {
        label: 'Singapore（新加坡）',
        value: 'local'
      },

      {
        label: 'China（中国）',
        value: '-49'
      },

      {
        label: 'Malaysia（马来西亚）',
        value: '-158'
      },

      {
        label: 'South Korea（南韩）',
        value: '-122'
      },

      {
        label: 'Germany（德国）',
        value: '-57'
      },

      {
        label: 'United States（美国）',
        value: '-231'
      },

      {
        label: 'Macau SAR China（澳门）',
        value: '-148'
      },

      {
        label: 'Canada（加拿大）',
        value: '-39'
      }
    ]
  },
  'PH': {
    'Location（位置）：': [

      {
        label: 'NCR',
        value: 'NCR'
      },

      {
        label: 'South Luzon（南吕宋）',
        value: 'South Luzon'
      },

      {
        label: 'Visayas（米沙鄢）',
        value: 'Visayas'
      },

      {
        label: 'Mindanao（棉兰老）',
        value: 'Mindanao'
      },

      {
        label: 'North Luzon（北吕宋）',
        value: 'North Luzon'
      },

      {
        label: 'Overseas（海外）',
        value: 'overseas'
      }
    ]
  },
  'VN': {
    'Nội địa（本地）：': [
      {
        label: 'Hồ Chí Minh（胡志明市）',
        value: 'Ho Chi Minh'
      },
      {
        label: 'Hà Nội（河内）',
        value: 'Hanoi'
      },
      {
        label: 'Miền Nam（南方）',
        value: 'South'
      },

      {
        label: 'Miền Bắc（北方）',
        value: 'North'
      },

      {
        label: 'Miền Trung（中央）',
        value: 'Middle'
      }
    ],
    'Nước ngoài（海外）：': [

      {
        value: '-49',
        label: 'Trung Quốc（中国）'
      },

      {
        value: '-57',
        label: 'Germany（德国）'
      },

      {
        value: '-231',
        label: 'Hoa Kỳ（美国）'
      },

      {
        value: '-226',
        label: 'Đài Loan（台湾）'
      }
    ]
  },
  'TH': {
    'สถานที่（本地）：': [
      {
        value: 'local',
        label: 'ในประเทศ（本地）'
      },

      {
        value: '-49',
        label: 'จีน（中国）'
      },

      {
        value: '-231',
        label: 'สหรัฐอเมริกา（美国）'
      },

      {
        value: '-226',
        label: 'ไต้หวัน（台湾）'
      },

      {
        value: '-148',
        label: 'มาเก๊า（澳门）'
      },

      {
        value: '-8',
        label: 'อาร์เมเนีย（亚美尼亚）'
      },

      {
        value: '-57',
        label: 'เยอรมัน（德语）'
      }
    ]
  }
}
// 图搜同款平台
const pictureSearchOrigin = [
  { value: '2', label: '淘宝' },
  { value: '8', label: '1688' }
]
// 关键词采集banner
const platformObj = {
  1: '拼多多', // 拼多多接口： 1 拼多多接口、  1.1 拼多多补充接口、  1.2 拼多多优惠采集
  1.2: '拼多多优惠采集',
  2: '淘宝', //  天猫 === 淘宝
  3: '天猫',
  4: '京东', // 京喜就是京东
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
function getShopeeSitePlace(siteCode) {
  return shopeeSitePlace[siteCode]
}
function getLazadaSitePlace(siteCode) {
  return lazadaSitePlace[siteCode]
}

// 私有选品库

// 采购来源
const source = [
  {
    value: '1',
    label: '拼多多'
  },
  {
    value: '2',
    label: '淘宝'
  },
  {
    value: '3',
    label: '天猫'
  },
  {
    value: '4',
    label: '京东'
  },
  {
    value: '10',
    label: '京喜'
  },
  {
    value: '8',
    label: '1688'
  },
  {
    value: '6',
    label: '货老板'
  },
  {
    value: '7',
    label: '多多进宝'
  }
]

const sourceObj = {
  '1': '拼多多',
  '2': '淘宝',
  '3': '天猫',
  '4': '京东',
  '10': '京喜',
  '8': '1688',
  '6': '货老版',
  '7': '多多进宝'
}
export {
  getPlatform,
  getShopeeSitePlace,
  getLazadaSitePlace,
  shopeeSite,
  lazadaSite,
  pictureSearchOrigin,
  platformObj,
  sourceObj,
  source
}
