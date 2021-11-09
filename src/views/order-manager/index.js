// 虾皮售后
const AfterSale = () => import('./components/OrderManagerAfterSale.vue')
// 丢件信息查询
const LostSearch = () => import('./components/OrderManagerLostSearch.vue')
// 采购信息查询
const PriceChangeRecorde = () => import('./components/OrderManagerPriceChangeRecorde.vue')

// 导出
export {
  AfterSale,
  LostSearch,
  PriceChangeRecorde
}

