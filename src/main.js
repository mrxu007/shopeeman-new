/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2022-01-14 10:18:24
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
// ----------------------------------- 引入umy-ui
// import 'umy-ui/lib/theme-chalk/index.css' // 引入样式
// import 'element-ui/lib/theme-chalk/index.css'

import { IpcMain, NetService } from 'cyt-ipc'
import api from './network/jx-request'
import gatewayService from './network/gateway/gateway-request'
import SvgIocn from 'vue-svgicon'
import VueDND from 'awe-dnd'
import { UTable, UTableColumn } from 'umy-ui'
import errorHanleCature from 'error-capture-handle'
import dayjs from 'dayjs'
import applicationConfig from './services/application-config'
import ShopeemanConfig from './services/shopeeman-config'
import XzyNetMessageService from './services/XzyNetMessageService'
import YipService from './services/YipService'
import mallServce from './services/mall-servers'
import commodityService from './services/commodity-service'
import buyerAccountService from './services/buyer-account-service'
import BaseUtilService from './services/BaseUtilService'
import CloudLogBridgeService from './services/CloudLogBridgeService'
import ImageService from './services/ImageService'
import MattingService from './services/MattingService'
import platformId from './services/platform-utils'
import orderService from './services/order-service'
import orderDetail from './services/order-detail'
import tborderDetail from './services/tbOrder-detail'
import collectService from './services/collect-service'
import aliyunOssService from './services/aliyun-oss-service'
import viewManagerService from './services/view-manager-service'
import SonAccountService from './services/son-acccount-service'
import shopeemanService from './services/shopeeman-service'
import translationBridgeService from './services/translation-bridge-service'
import { Logs } from 'cyt-pl-plug'
import * as echarts from 'echarts'
import * as filters from './plugins/filters'

Vue.prototype.$echarts = echarts
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])// 插入过滤器名和对应方法
})
// const config = {
//   openDebugger: process.env.NODE_ENV === 'development',
//   userName: 'xxx项目', // 当前操作的项目名
//   system_code: '', // 申请机器人 system_code
//   secret_key: '', // 申请机器人 secret_key
//   robot_name: '' // 申请机器人 robot_name
// }
// errorHanleCature(config).ListenerError().ListenerVueError(Vue) // 监听全局 error 、监听vue中的错误

Vue.use(UTable)
Vue.use(UTableColumn)

// Vue.use(SvgIcon, {
//   tagName: 'svgicon'
// })

Vue.use(Logs)
Vue.use(VueDND)


Vue.prototype.$YipService = new YipService()
Vue.prototype.$XzyNetMessageService = new XzyNetMessageService()
Vue.prototype.$shopeeManConfig = new ShopeemanConfig()

Vue.prototype.$IpcMain = IpcMain
Vue.prototype.$NetService = NetService
Vue.prototype.$api = api
Vue.prototype.$AppRequest = api.AppRequest
Vue.prototype.$otherRequest = api.otherRequest
Vue.prototype.$gatewayService = gatewayService.gatewayService
Vue.prototype.$XzyNetMessageService = new XzyNetMessageService()
Vue.prototype.$appConfig = new applicationConfig()
Vue.prototype.$shopeeManConfig = new ShopeemanConfig()
Vue.prototype.$mallService = new mallServce()
Vue.prototype.$commodityService = new commodityService()
Vue.prototype.$translationBridgeService = new translationBridgeService()
Vue.prototype.$buyerAccountService = new buyerAccountService()
Vue.prototype.$BaseUtilService = new BaseUtilService()
Vue.prototype.$CloudLogBridgeService = new CloudLogBridgeService()
Vue.prototype.$ImageService = new ImageService()
Vue.prototype.$MattingService = new MattingService()
Vue.prototype.$collectService = new collectService()
Vue.prototype.$orderService = new orderService()
Vue.prototype.$ossService = new aliyunOssService()
Vue.prototype.$viewManagerService = new viewManagerService()
Vue.prototype.$SonAccountService = new SonAccountService()
Vue.prototype.$shopeemanService = new shopeemanService()
Vue.prototype.$dayjs = dayjs
Vue.prototype.$filters = filters


// 所有的input框自动获取焦点
Vue.directive('fo', {
  inserted(el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})
Vue.directive('focus', {
  inserted(el, binding, vnode) {
    // 聚焦元素
    console.log('el', el)
    el.querySelector('textarea').focus()
  }
})
async function getUserInfo() {
  const userInfo = await new applicationConfig().getUserInfo()
  const userConfig = await new applicationConfig().getUserConfig()
  Vue.prototype.$userInfo = userInfo
  Vue.prototype.$userConfig = userConfig && JSON.parse(userConfig)
}
getUserInfo()

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
