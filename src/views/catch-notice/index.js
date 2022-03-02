// 即将过期订单
const CatchNoticeExpiringOrder = () => import('./components/CatchNoticeExpiringOrder.vue')

// 待获取物流单号
const CatchNoticeGetLogisticsOrderNo = () => import('./components/CatchNoticeGetLogisticsOrderNo.vue')

// 仓库公众号绑定
const CatchNoticeOfficialAccountBind = () => import('./components/CatchNoticeOfficialAccountBind.vue')

// 签收包裹异常
const CatchNoticeSignForPackage = () => import('./components/CatchNoticeSignForPackage.vue')

// 仓库异常信息
const CatchNoticeStoreExceptionInfo = () => import('./components/CatchNoticeStoreExceptionInfo.vue')

// 海外仓库异常信息
const CatchNoticeStoreExceptionOverSea = () => import('./components/CatchNoticeStoreExceptionOverSea.vue')

// 导出
export {
  CatchNoticeExpiringOrder,
  CatchNoticeGetLogisticsOrderNo,
  CatchNoticeOfficialAccountBind,
  CatchNoticeSignForPackage,
  CatchNoticeStoreExceptionInfo,
  CatchNoticeStoreExceptionOverSea
}
