// 智能仓库
const SmartHouseWorkBench = () => import('./components/SmartHouseWorkBench.vue')

// 包裹列表
const SmartHousePackage = () => import('./components/SmartHousePackage.vue')

// 国内仓退件管理
const SmartHouseReturnManage = () => import('./components/SmartHouseReturnManage.vue')

// 失物招领
const SmartHouseUnclaimed = () => import('./components/SmartHouseUnclaimed.vue')

// 我的赔付
const SmartHouseAbnormalPayment = () => import('./components/SmartHouseAbnormalPayment.vue')

// 导出
export {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartHouseReturnManage,
  SmartHouseUnclaimed,
  SmartHouseAbnormalPayment
}
