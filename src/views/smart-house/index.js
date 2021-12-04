/*
 * @Author: your name
 * @Date: 2021-10-25 15:39:38
 * @LastEditTime: 2021-10-25 16:43:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\index.js
 */
// 仓库工作台台
const SmartHouseWorkBench = () => import('./components/SmartHouseWorkBench.vue')

// 包裹列表
const SmartHousePackage = () => import('./components/SmartHousePackage.vue')

// 退件管理  (国内仓退件管理)
const SmartHouseReturnManage = () => import('./components/SmartHouseReturnManage.vue')

// 二次销售列表
const SmartHouseSecondarySalesList = () => import('./components/SmartHouseSecondarySalesList.vue')

// // 二次销售列表
// const SmartHouseTheSecondSaleList = () => import('./components/SmartHouseTheSecondSaleList.vue')

// 失物招领
const SmartHouseUnclaimed = () => import('./components/SmartHouseUnclaimed.vue')

// 拒签收管理
const SmartHouseRefuseSign = () => import('./components/SmartHouseRefuseSign.vue')

// 我的赔付
const SmartHouseAbnormalPayment = () => import('./components/SmartHouseAbnormalPayment.vue')

// 自有仓库
const SmartHousePrivateWarehouse = () => import('./components/SmartHousePrivateWarehouse.vue')

// 商品备货-海外仓商品备货
const SmartHouseStockUpForeign = () => import('./components/SmartHouseStockUpForeign.vue')

// 商品备货-国内仓商品备货
const SmartHouseStockUpHome = () => import('./components/SmartHouseStockUpHome.vue')

// 库存列表-海外仓库存
const SmartHouseaBroadStock = () => import('./components/SmartHouseaBroadStock.vue')

// 库存列表-海外仓共享库存管理
const SmartHouseShareBroadStockManager = () => import('./components/SmartHouseShareBroadStockManager.vue')

// 库存列表-共享给我的海外仓库存
const SmartHouseShareMyBroadStock = () => import('./components/SmartHouseShareMyBroadStock.vue')

// 库存列表-国内仓库存
const SmartHouseChineseStock = () => import('./components/SmartHouseChineseStock.vue')

// 出库订单-海外仓出库订单
const SmartHouseBroadDeliveryOrder = () => import('./components/SmartHouseBroadDeliveryOrder.vue')

// 出库订单-国内仓出库订单
const SmartHouseChineseDeliveryOrder = () => import('./components/SmartHouseChineseDeliveryOrder.vue')

// 海外仓补件列表
const SmartHouseBroadPickUpList = () => import('./components/SmartHouseBroadPickUpList.vue')

// 海外仓库存
const SmartHouseOverseasWarehouse = () => import('./components/SmartHouseOverseasWarehouse.vue')

// 海外仓补件列表
const SmartHouseOverseasLupplementList = () => import('./components/OverseasLupplementList.vue')
// 导出
export {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartHouseReturnManage,
  SmartHouseRefuseSign,
  // SmartHouseTheSecondSaleList,
  SmartHouseUnclaimed,
  SmartHouseSecondarySalesList,
  SmartHouseAbnormalPayment,
  SmartHousePrivateWarehouse,
  SmartHouseStockUpForeign,
  SmartHouseStockUpHome,
  SmartHouseaBroadStock,
  SmartHouseShareBroadStockManager,
  SmartHouseShareMyBroadStock,
  SmartHouseChineseStock,
  SmartHouseBroadDeliveryOrder,
  SmartHouseChineseDeliveryOrder,
  SmartHouseBroadPickUpList,
  SmartHouseOverseasWarehouse,
  SmartHouseOverseasLupplementList
}
