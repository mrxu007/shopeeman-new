/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-12 12:06:13
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\main.js
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './plugins/element'
// ----------------------------------- 引入umy-ui
import 'umy-ui/lib/theme-chalk/index.css' // 引入样式

import { IpcMain, NetService } from 'cyt-ipc'
import api from './network/jx-request'
import gatewayService from './network/gateway/gateway-request'
import SvgIcon from 'vue-svgicon'
import VueDND from 'awe-dnd'
import { UTable, UTableColumn } from 'umy-ui'
import errorHanleCature from 'error-capture-handle'
import dayjs from 'dayjs'

import * as echarts from 'echarts'
Vue.prototype.$echarts = echarts
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
Vue.prototype.$AppRequest = api.AppRequest
Vue.prototype.$otherRequest = api.otherRequest
Vue.prototype.$gatewayService = gatewayService.gatewayService
Vue.prototype.$dayjs = dayjs
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
