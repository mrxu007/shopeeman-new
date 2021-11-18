// 平台选品库 ：关键词采集、商品链接采集、整店采集、图搜同款、天猫淘宝海外平台采集
const ProductPutOnPlatformSelection = () => import('./components/ProductPutOnPlatformSelection.vue')

// 平台选品库：采集设置
const ProductPutOnSettings = () => import('./components/ProductPutOnSettings.vue')

// 私有选品库
const ProductPutOnPersonalLibrary = () => import('./components/ProductPutOnPersonalLibrary.vue')

// 一键上新
const ProductPutOnShangxin = () => import('./components/ProductPutOnShangxin.vue')

// 定时刊登
const ProductPutOnTimerPublish = () => import('./components/ProductPutOnTimerPublish.vue')

// 爆款选品
const ProductPutOnPopularSelection = () => import('./components/ProductPutOnPopularSelection.vue')

// 成交价格建议
const ProductPutOnHotSuggest = () => import('./components/ProductPutOnHotSuggest.vue')

// 热搜词推荐
const ProductPutOnHotWord = () => import('./components/ProductPutOnHotWord.vue')

// 上新统计
const ProductPutOnStatistics = () => import('./components/ProductPutOnStatistics.vue')

// 品牌词库
const ProductPutOnBandlibrary = () => import('./components/ProductPutOnBandlibrary.vue')

// 类目黑名单
const ProductPutOnCategoryblack = () => import('./components/ProductPutOnCategoryblack.vue')
// l拼多多买手号
const ProductPutOnPDD = () => import('./components/ProductPutOnPDD.vue')
// 天猫淘宝海外平台
const ProductPutOnTaobao = () => import('./components/ProductPutOnTaobao.vue')

// 拼多多选品库
const ProductPutOnPddAccount = () => import('./components/ProductPutOnPddAccount.vue')

// 导出
export {
  ProductPutOnPlatformSelection,
  ProductPutOnSettings,
  ProductPutOnPersonalLibrary,
  ProductPutOnShangxin,
  ProductPutOnTimerPublish,
  ProductPutOnPopularSelection,
  ProductPutOnHotSuggest,
  ProductPutOnHotWord,
  ProductPutOnStatistics,
  ProductPutOnBandlibrary,
  ProductPutOnCategoryblack,
  ProductPutOnPDD,
  ProductPutOnTaobao,
  ProductPutOnPddAccount
}
