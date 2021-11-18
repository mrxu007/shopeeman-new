/*
 * @Author: your name
 * @Date: 2021-10-25 15:39:38
 * @LastEditTime: 2021-10-25 16:43:44
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\index.js
 */
// 商品列表
const GoodsManagerList = () => import('./components/GoodsManagerList.vue')

// 商品同步
const GoodsManagerAsync = () => import('./components/GoodsManagerAsync.vue')

// 商品分类
const GoodsManagerCategory = () => import('./components/GoodsManagerCategory.vue')

// 互赞平台
const GoodsManagerOtherPlatform = () => import('./components/GoodsManagerOtherPlatform.vue')

// 导出
export {
  GoodsManagerList,
  GoodsManagerAsync,
  GoodsManagerCategory,
  GoodsManagerOtherPlatform
}
