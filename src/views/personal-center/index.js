// 账单核算
const PersonalCenterCheckaccounting = () => import('./components/PersonalCenterCheckaccounting.vue')

// 软件财务中心
const PersonalCenterSoftwareFinance = () => import('./components/PersonalCenterSoftwareFinance.vue')

// 仓库财务中心
const PersonalCenterStoreFinance = () => import('./components/PersonalCenterStoreFinance.vue')

// 团队管理
const PersonalCenterTeamManagement = () => import('./components/PersonalCenterTeamManagement.vue')

// 信任IP管理
const PersonalCenterTrustIPManagement = () => import('./components/PersonalCenterTrustIPManagement.vue')

// 导出
export {
  PersonalCenterCheckaccounting,
  PersonalCenterSoftwareFinance,
  PersonalCenterStoreFinance,
  PersonalCenterTeamManagement,
  PersonalCenterTrustIPManagement
}
