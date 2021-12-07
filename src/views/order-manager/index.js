/*
 * @Author: your name
 * @Date: 2021-11-09 10:09:21
 * @LastEditTime: 2021-11-18 16:19:36
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\index.js
 */
// 虾皮售后
// const OrderManagerAfterSale = () => import('./components/OrderManagerAfterSale.vue')
const OrderManagerAfterSales = () => import('./components/OrderManagerAfterSales.vue')

// 仓库收货地址设置
const OrderManagerReceivingAddress = () => import('./components/OrderManagerReceivingAddress.vue')

// 发货管理
const OrderManagerDeliveryManagement = () => import('./components/OrderManagerDeliveryManagement.vue')

// 丢件信息查询
const OrderManagerLostInfoQuery = () => import('./components/OrderManagerLostInfoQuery.vue')
// 采购信息查询
// const OrderManagerPriceChangeRecorde = () => import('./components/OrderManagerPriceChangeRecorde.vue')
const OrderManagerChangeRecord = () => import('./components/OrderManagerChangeRecord.vue')

// 订单列表
const OrderManagerOrderCenter = () => import('./components/OrderManagerOrderCenter.vue')
// 仓库收货地址设置
const OrderManagerStoreAdressSet = () => import('./components/OrderManagerStoreAdressSet.vue')

// 导出
export {
  // OrderManagerAfterSale,
  // OrderManagerLostSearch,
  // OrderManagerPriceChangeRecorde,
  OrderManagerOrderCenter,
  OrderManagerStoreAdressSet,
  // OrderManagerList,
  OrderManagerAfterSales,
  OrderManagerReceivingAddress,
  OrderManagerDeliveryManagement,
  OrderManagerLostInfoQuery,
  OrderManagerChangeRecord
}

