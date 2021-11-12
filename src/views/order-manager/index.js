/*
 * @Author: your name
 * @Date: 2021-10-25 15:39:38
 * @LastEditTime: 2021-10-25 16:43:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\index.js
 */
// 订单列表
const OrderManagerList = () => import('./components/OrderManagerList.vue')

// 虾皮售后
const OrderManagerAfterSales = () => import('./components/OrderManagerAfterSales.vue')

// 仓库收货地址设置
const OrderManagerReceivingAddress = () => import('./components/OrderManagerReceivingAddress.vue')

// 发货管理
const OrderManagerDeliveryManagement = () => import('./components/OrderManagerDeliveryManagement.vue')

// 丢件信息查询
const OrderManagerLostInfoQuery = () => import('./components/OrderManagerLostInfoQuery.vue')

// 采购价变更记录
const OrderManagerChangeRecord = () => import('./components/OrderManagerChangeRecord.vue')

// 导出
export {
  OrderManagerList,
  OrderManagerAfterSales,
  OrderManagerReceivingAddress,
  OrderManagerDeliveryManagement,
  OrderManagerLostInfoQuery,
  OrderManagerChangeRecord
}
