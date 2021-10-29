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
//自由仓库
const PrivateWarehouse = () => import('./components/PrivateWarehouse.vue')

// 导出
export {
  SmartHouseWorkBench,
  PrivateWarehouse

}
