/*
 * @Author: your name
 * @Date: 2021-10-25 15:39:38
 * @LastEditTime: 2021-10-25 16:43:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\index.js
 */
// 智能仓库
const SmartHouseWorkBench = () => import('./components/SmartHouseWorkBench.vue')
const RefuseSign = () => import('./components/RefuseSign.vue')
// 自由仓库
const PrivateWarehouse = () => import('./components/PrivateWarehouse.vue')

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
  SmartHouseAbnormalPayment,
  RefuseSign,
  PrivateWarehouse
}
