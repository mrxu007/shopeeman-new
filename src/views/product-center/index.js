/*
 * @Author: your name
 * @Date: 2021-12-01 15:17:41
 * @LastEditTime: 2022-01-11 16:44:26
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\product-center\index.js
 */
// 自有商品
const ProductCenterOwnGoods = () => import('./components/ProductCenterOwnGoods.vue')
const ProductCenterOwnGoodsCopy = () => import('./components/ProductCenterOwnGoods-copy.vue')
// 导出
export {
  ProductCenterOwnGoods,
  ProductCenterOwnGoodsCopy
}
