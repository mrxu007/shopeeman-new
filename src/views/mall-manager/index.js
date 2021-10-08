// 聊天助手
const MallManagerChat = () => import('./components/MallManagerChat.vue')

// 贷款对账
const MallManagerLoanReconciliation = () => import('./components/MallManagerLoanReconciliation.vue')

// 店铺数据
const MallManagerMallData = () => import('./components/MallManagerMallData.vue')

// 店铺分组
const MallManagerMallGroup = () => import('./components/MallManagerMallGroup.vue')

// 店铺列表
const MallManagerMallList = () => import('./components/MallManagerMallList.vue')

// 店铺指标
const MallManagerMallTarget = () => import('./components/MallManagerMallTarget.vue')

// 店铺提现
const MallManagerMallWithdrawal = () => import('./components/MallManagerMallWithdrawal.vue')

// 店铺评价
const MallManagerStoreEvaluation = () => import('./components/MallManagerStoreEvaluation.vue')

// 店铺主体管理
const MallManagerStoreMainManagement = () => import('./components/MallManagerStoreMainManagement.vue')

// 提现记录
const MallManagerWithdrawalRecord = () => import('./components/MallManagerWithdrawalRecord.vue')

// 导出
export {
  MallManagerChat,
  MallManagerLoanReconciliation,
  MallManagerMallData,
  MallManagerMallGroup,
  MallManagerMallList,
  MallManagerMallTarget,
  MallManagerMallWithdrawal,
  MallManagerStoreEvaluation,
  MallManagerStoreMainManagement,
  MallManagerWithdrawalRecord
}
