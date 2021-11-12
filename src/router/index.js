/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-12 10:26:19
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\router\index.js
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
Vue.use(VueRouter)

const routes = [
  //   {
  //   path: '/',
  //   name: 'Home',
  //   component: () =>
  //     import('../views/mall-manger/Tag-manger.vue')
  // },
  {
    path: '/personal-center', // 个人中心
    name: 'personal-center',
    component: () =>
      import('../views/personal-center/index.vue')
  },
  {
    path: '/catch-notice', // 异常公告
    name: 'catch-notice',
    component: () =>
      import('../views/catch-notice/index.vue')
  },
  {
    path: '/mall-manager', // 店铺管理
    name: 'mall-manager',
    component: () =>
      import('../views/mall-manager/index.vue')
  },
  {
    path: '/data-statistics', // 数据统计
    name: 'data-statistics',
    component: () =>
      import('../views/data-statistics/index.vue')
  },
  {
    path: '/product-put', // 选品上新
    name: 'product-put',
    component: () =>
      import('../views/product-put-on/index.vue')
  },
  {
    path: '/smart-house', // 选品上新
    name: 'smart-house',
    component: () =>
      import('../views/smart-house/index.vue')
  },
  {
    path: '/user-config', // 用户配置
    name: 'user-config',
    component: () =>
      import('../views/user-config/index.vue')
  },
  {
    path: '/test-api', // 测试联调接口
    name: 'test-api',
    component: () =>
      import('../views/test-api/index.vue')
  },
  {
    path: '/order-manager', // 订单管理
    name: '/order-manager',
    component: () =>
      import('../views/order-manager/index.vue')
  },
  {
    path: '/orderAuto', // 订单管理
    name: '/orderAuto',
    component: () =>
      import('../views/order-manager/components/orderCenter/autoUploadOrder.vue')
  }
]
const originalPush = VueRouter.prototype.push

VueRouter.prototype.push = function push(location) {
  return originalPush.call(this, location).catch(err => err)
}
const router = new VueRouter({
  mode: 'history',
  routes
})

export default router
