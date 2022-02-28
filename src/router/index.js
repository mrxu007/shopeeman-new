/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-12-27 11:33:25
 * @LastEditors: Please set LastEditors
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
    path: '/data-statistics',
    name: 'data-statistics',
    component: () =>
      import('../views/data-statistics/index.vue')
  }, // 数据统计
  {
    path: '/order-manager',
    name: 'order-manager',
    component: () =>
      import('../views/order-manager/index.vue')
  }, // 订单管理
  {
    path: '/product-put',
    name: 'product-put',
    component: () =>
      import('../views/product-put-on/index.vue')
  }, // 选品上新
  {
    path: '/smart-house',
    name: 'smart-house',
    component: () =>
      import('../views/smart-house/index.vue')
  }, // 智能仓库
  {
    path: '/goods-manager',
    name: 'goods-manager',
    component: () =>
      import('../views/goods-manager/index.vue')
  }, // 商品管理
  {
    path: '/market-activity',
    name: 'market-activity',
    component: () =>
      import('../views/market-activity/index.vue')
  }, // 行销活动
  {
    path: '/mall-manager',
    name: 'mall-manager',
    component: () =>
      import('../views/mall-manager/index.vue')
  }, // 店铺管理
  {
    path: '/catch-notice',
    name: 'catch-notice',
    component: () =>
      import('../views/catch-notice/index.vue')
  }, // 异常公告
  {
    path: '/personal-center',
    name: 'personal-center',
    component: () =>
      import('../views/personal-center/index.vue')
  }, // 个人中心
  {
    path: '/business-analyse',
    name: 'business-analyse',
    component: () =>
      import('../views/business-analyse/index.vue')
  }, // 商业分析
  {
    path: '/user-config',
    name: 'user-config',
    component: () =>
      import('../views/user-config/index.vue')
  }, // 用户配置
  // {
  //   path: '/test-api', // 测试联调接口
  //   name: 'test-api',
  //   component: () =>
  //     import('../views/test-api/index.vue')
  // },
  {
    path: '/order-manager', // 订单管理
    name: '/order-manager',
    component: () =>
      import('../views/order-manager/index.vue')
  },
  {
    path: '/product-center', // 产品中心
    name: 'product-center',
    component: () =>
      import('../views/product-center/index.vue')
  },
  {
    path: '/business-analysis', // 商业分析
    name: 'business-analysis',
    component: () =>
      import('../views/business-analysis/index.vue')
  },
  {
    path: '/orderAuto', // 自动同步订单
    name: '/orderAuto',
    component: () =>
      import('../views/order-manager/components/orderCenter/autoUploadOrder.vue')
  },
  {
    path: '/customer-service',
    name: 'customer-service',
    component: () =>
      import('../views/customer-service/index.vue')
  }, // 客服
  {
    path: '/history-notice',
    name: 'history-notice',
    component: () =>
      import('../views/history-notice/index.vue')
  }, // 历史公告
  {
    path: '/encyclopedia',
    name: 'encyclopedia',
    component: () =>
      import('../views/encyclopedia/index.vue')
  } // 百科
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
