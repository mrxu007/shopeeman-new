import OrderService from './order-service'
import jxRequest from '../network/jx-request'
import { NetService } from 'cyt-ipc'
import Congfig from './application-config'

export default class {
  jdNetworkService = jxRequest.jdRequest
  jszNetworkService = jxRequest.jxRequest
  tbNetworkService = jxRequest.tbRequest
  $api = jxRequest
  orderService = new OrderService()
  CongfigServe = new Congfig()
  $NetService = NetService
  mall = undefined
  params = undefined
  writeLog = undefined
  lostOrder = []
  x5Info = ''
  x5Success = 0
  x5Fail = 0
  isLogin = true
  orderService = new OrderService()
  skuImageCache = {}
  constructor(mall, mode, logCallback, orderList) {
    this.mall = mall
    this.mode = mode
    this.writeLog = logCallback
    this.orderList = orderList
  }
  async _init(mall, mode, logCallback) {
    this.mall = mall
    this.mode = mode
    this.writeLog = logCallback
  }
  async start(isForce = false) {
    console.log(this.mode, 'this.mode=====>>>>>>>')
    this.lostOrder.length = 0
    const orderList = this.orderList
    if (orderList.length === 0) {
      this.writeLog(`暂无订单,同步订单详情已完成`, true)
      return console.log(`暂无订单,同步订单详情已完成`, true)
    }
    this.writeLog(`共${orderList.length}订单需同步`)
    console.log(`共${orderList.length}订单需同步`)
    let syncCount = 0
    let status = true
    while (status) {
      for (let index = 0; index < orderList.length; index++) {
        this.writeLog(
          `正在同步【${syncCount + 1}/${orderList.length}】【${
            orderList[index]
          }】订单详情信息`
        )
        console.log(
          `正在同步【${syncCount + 1}/${orderList.length}】【${
            orderList[index]
          }】订单详情信息`
        )
        const orderStatus = await this.syncOrderDetail(
          this.mall,
          orderList[index]
        )
        this.writeLog(
          `【${syncCount + 1}/${orderList.length}】【${
            orderList[index]
          }】订单详情同步${orderStatus ? '成功' : '失败'}`,
          orderStatus
        )
        console.log(
          `【${syncCount + 1}/${orderList.length}】【${
            orderList[index]
          }】订单详情同步${orderStatus ? '成功' : '失败'}`,
          orderStatus
        )
        if (!this.isLogin) {
          return this.writeLog('店铺登录信息失效,请重新登录店铺', false)
        }
        await this.delay(1000)
        syncCount++
        if (syncCount === orderList.length) {
          status = undefined
        }
      }
    }
    console.log(this.lostOrder)
    if (this.lostOrder.length !== 0) {
      for (let index = 0; index < this.lostOrder.length; index++) {
        await this.syncOrderDetail(this.mall, this.lostOrder[index])
        await this.delay(1000)
      }
    }
    this.writeLog(`同步订单详情已完成`, true)
    console.log(`同步订单详情已完成`, true)
  }
  async sendWebhook(content1) {
    const uid = await this.CongfigServe.getUserInfo()
    if (this.uidFile.includes(uid.muid)) {
      return
    }
    const content = {
      msgtype: 'markdown',
      markdown: {
        content: content1,
        mentioned_list: [''],
        mentioned_mobile_list: ['']
      }
    }
    const parameter = {
      system_code: 'taobaoWebDebug',
      secret_key: 'taobaoWebDebug',
      type: 1,
      level: 1,
      channel: 1,
      content: JSON.stringify(content),
      robot_name: '淘宝特价版 web'
    }
    this.$NetService
      .post('http://notice.91cyt.com/messagePush', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: parameter
      })
      .then(res => {
        console.log(JSON.parse(res))
      })
  }
  async syncOrderDetail(mall, order) {
    console.log(mall, order)
    let newAddress = ''
    let params = null
    // 调取云采集接口获取淘宝订单详情信息
    const data = await this.getOrderDetailInfo(mall, order)
    if (data === 307) {
      this.writeLog(`该订单详情不存在`, true)
      return true
    }
    if (!data) {
      return false
    }
    console.log(data)
    if (data && data?.address.length > 8) {
      newAddress = data?.address
    } else {
      newAddress = ''
    }
    const {
      buyMessage,
      mainOrder: { id, statusInfo },
      tabs
    } = data
    let address = ''
    let shipType = ''

    tabs.forEach(item => {
      if (item.id === 'logistics') {
        // 如果存在新的地址就拿最新的地址信息
        if (item?.content?.newAddress) {
          address = item.content.newAddress
        } else {
          address = item.content.address
        }
        shipType = item.content.shipType
      }
    })
    if (newAddress) {
      const temporaryParams = newAddress.split(',')
      const compositionData = `${temporaryParams[2].trim()}，${temporaryParams[3].trim()}，${
        temporaryParams[0]
      }，${temporaryParams[1].trim()}`
      params = {
        sys_mall_id: mall.id,
        order_id: id,
        main_order_sn: id,
        order_status: this.syncOrderDetailStatic(statusInfo.text),
        platform_remark: buyMessage || '',
        receiver_info: {
          receiverInfo: compositionData,
          buyersChoose: shipType
        }
      }
    } else {
      params = {
        sys_mall_id: mall.id,
        order_id: id,
        main_order_sn: id,
        order_status: this.syncOrderDetailStatic(statusInfo.text),
        platform_remark: buyMessage || '',
        receiver_info: {
          receiverInfo: address,
          buyersChoose: shipType
        }
      }
    }
    console.log(params)
    const { data2 } = await this.$api.upOrderDetail(params)
    console.log(data2)
    return true
  }
  async getOrderDetailInfo(mall, order) {
    try {
      const response = await this.orderService.searchOrderDetailInfo(
        mall,
        order
      )
      if (response === 307) {
        return 307
      }
      if (response) {
        return response
      }
    } catch (err) {
      return false
    }
  }
  // 获取单个订单详情
  async singleGetOrderDetailInfo(mall, order) {
    try {
      const response = await this.orderService.searchOrderDetailInfo(
        mall,
        order
      )
      if (response === 307) {
        return 307
      }
      if (response) {
        return response
      }
    } catch (err) {
      return false
    }
  }
  // 单个订单同步
  async singleSyncOrderDetail(mall, order) {
    console.log(mall, order)
    // 调取云采集接口获取淘宝订单详情信息
    const data = await this.singleGetOrderDetailInfo(mall, order)
    if (data === 307) {
      this.writeLog(`该订单详情不存在`, true)
      return true
    }
    console.log(data)
    let newAddress = ''
    let params = null
    if (!data) {
      return this.writeLog('获取订单详情失败', false)
    }
    if (data && data?.address.length > 8) {
      newAddress = data?.address
    } else {
      newAddress = ''
    }
    const {
      buyMessage,
      mainOrder: { id, statusInfo },
      tabs
    } = data
    let address = ''
    let shipType = ''
    tabs.forEach(item => {
      if (item.id === 'logistics') {
        if (item?.content?.newAddress) {
          address = item.content.newAddress
        } else {
          address = item.content.address
        }
        shipType = item.content.shipType
      }
    })
    if (newAddress) {
      const temporaryParams = newAddress.split(',')
      const compositionData = `${temporaryParams[2].trim()}，${temporaryParams[3].trim()}，${
        temporaryParams[0]
      }，${temporaryParams[1].trim()}`
      params = {
        sys_mall_id: mall.id,
        order_id: id,
        main_order_sn: id,
        order_status: this.syncOrderDetailStatic(statusInfo.text),
        platform_remark: buyMessage || '',
        receiver_info: {
          receiverInfo: compositionData,
          buyersChoose: shipType
        }
      }
    } else {
      params = {
        sys_mall_id: mall.id,
        order_id: id,
        main_order_sn: id,
        order_status: this.syncOrderDetailStatic(statusInfo.text),
        platform_remark: buyMessage || '',
        receiver_info: {
          receiverInfo: address,
          buyersChoose: shipType
        }
      }
    }
    console.log(params)
    const { data2 } = await this.$api.upOrderDetail(params)
    console.log(data2)
    return this.writeLog('获取订单详情成功', true)
  }
  // 判断同步详情订单状态
  syncOrderDetailStatic(str) {
    switch (str) {
      case (str.match(RegExp(/等待买家付款/)) || {}).input:
        return 2
      case (str.match(RegExp(/买家已付款/)) || {}).input:
        return 3
      case (str.match(RegExp(/商家已发货/)) || {}).input:
        return 4
      case (str.match(RegExp(/交易成功/)) || {}).input:
        return 5
      case (str.match(RegExp(/交易关闭/)) || {}).input:
        return 6
      default:
        return 11 // 异常状态
    }
  }
  // 获取当前时间
  creatDate() {
    this.dateList = []
    const base = new Date()
    let baseVal = [
      base.getFullYear(),
      base.getMonth() + 1,
      base.getDate() + ' '
    ].join('-')
    const aa = [base.getHours(), base.getMinutes(), base.getSeconds()].join(':')
    baseVal = baseVal.concat(aa)
    return baseVal
  }
  // 格式化时间
  dateFormat(time, fmt) {
    var o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      S: time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(
        RegExp.$1,
        (time.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  /**
   * 暂停n毫秒后返回
   */
  async delay(time) {
    return new Promise(resolve => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
}
