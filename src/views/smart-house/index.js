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

// 国内仓退件管理
const SmartHouseReturnManage = () => import('./components/SmartHouseReturnManage.vue')

// 拒签收管理
const SmartHouseRefuseSign = () => import('./components/SmartHouseRefuseSign.vue')

// 失物招领
const SmartHouseUnclaimed = () => import('./components/SmartHouseUnclaimed.vue')

// 我的赔付
const SmartHouseAbnormalPayment = () => import('./components/SmartHouseAbnormalPayment.vue')

// 自有仓库
const SmartHousePrivateWarehouse = () => import('./components/SmartHousePrivateWarehouse.vue')

// 商品备货-海外仓商品备货
const SmartHouseForeignStockUp = () => import('./components/SmartHouseForeignStockUp.vue')

// 导出
export {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartHouseReturnManage,
  SmartHouseRefuseSign,
  SmartHouseUnclaimed,
  SmartHouseAbnormalPayment,
  SmartHousePrivateWarehouse,
  SmartHouseForeignStockUp
}
