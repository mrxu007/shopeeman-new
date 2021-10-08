import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
// ----------------------------------- 引入umy-ui
import 'umy-ui/lib/theme-chalk/index.css' // 引入样式

import { IpcMain, NetService } from 'cyt-ipc'
import api from './network/jx-request'
import gatewayService from './network/gateway/gateway-request'
import mallServce from './services/mall-servers'
import commodityService from './services/commodity-service'
import buyerAccountService from './services/buyer-account-service'
import BaseUtilService from './services/BaseUtilService'
import CloudLogBridgeService from './services/CloudLogBridgeService'
import ImageService from './services/ImageService'
import MattingService from './services/MattingService'

import orderService from './services/order-service'
import collectService from './services/collect-service'
import applicationConfig from './services/application-config'
import aliyunOssService from './services/aliyun-oss-service'
import viewManagerService from './services/view-manager-service'
import SvgIcon from 'vue-svgicon'
import VueDND from 'awe-dnd'
import { UTable, UTableColumn } from 'umy-ui'
import errorHanleCature from 'error-capture-handle'
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

Vue.use(SvgIcon, {
  tagName: 'svgicon'
})
Vue.use(VueDND)


Vue.prototype.$IpcMain = IpcMain
Vue.prototype.$NetService = NetService
Vue.prototype.$api = api
Vue.prototype.$jxrequest = api.jxRequest
Vue.prototype.$jdrequest = api.jdRequest
Vue.prototype.$gatewayService = gatewayService.gatewayService
Vue.prototype.$mallService = new mallServce()
Vue.prototype.$commodityService = new commodityService()
Vue.prototype.$buyerAccountService = new buyerAccountService()
Vue.prototype.$BaseUtilService = new BaseUtilService()
Vue.prototype.$CloudLogBridgeService = new CloudLogBridgeService()
Vue.prototype.$ImageService = new ImageService()
Vue.prototype.$MattingService = new MattingService()
Vue.prototype.$collectService = new collectService()
Vue.prototype.$orderService = new orderService()
Vue.prototype.$appConfig = new applicationConfig()
Vue.prototype.$ossService = new aliyunOssService()
Vue.prototype.$viewManagerService = new viewManagerService()

// 所有的input框自动获取焦点
Vue.directive('fo', {
  inserted(el, binding, vnode) {
    // 聚焦元素
    el.querySelector('input').focus()
  }
})

Vue.config.productionTip = false
new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
