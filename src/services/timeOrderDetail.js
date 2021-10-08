import orderService from './order-service'
import jxRequest from '../network/jx-request'
import { NetService } from 'cyt-ipc'
import orderDetail from './order-detail'

export default class {
  jdNetworkService = jxRequest.jdRequest;
  jszNetworkService = jxRequest.jxRequest;
  tbNetworkService = jxRequest.tbRequest;
  $NetService = NetService
  mall = undefined;
  params = undefined;
  writeLog = undefined;
  lostOrder = [];
  x5Info = '';
  x5Success = 0;
  x5Fail = 0;
  isLogin = true;
  allErrorInfo = {
    code205: {
      code: 205,
      order: [],
      text: ''
    },
    code401: {
      code: 401,
      order: [],
      text: ''
    },
    code403: {
      code: 403,
      order: [],
      text: ''
    },
    code405: {
      code: 405,
      order: [],
      text: ''
    },
    code407: {
      code: 407,
      order: [],
      text: ''
    },
    code305: {
      code: 305,
      order: [],
      text: ''
    },
    codeinterfaces: {
      code: 500,
      order: [],
      text: ''
    }
  };
  orderService = new orderService();
  skuImageCache = {};
  constructor(mall, mode, logCallback) {
    this.mall = mall
    this.mode = mode
    this.writeLog = logCallback
  }

  async start(isForce = false) {
    console.log(this.mode, 'this.mode=====>>>>>>>')
    this.lostOrder.length = 0
    const params = { sys_mall_id: this.mall.id }
    const url = '/api/tbtj/order/needSyncOrders'
    const { data } = await this.jszNetworkService.get(url, { params })
    console.log(data)
    const orderList = data.data.ids
    if (orderList.length === 0) {
      this.writeLog(`暂无订单,同步订单详情已完成`, true)
      return console.log(`暂无订单,同步订单详情已完成`, true)
    }
    this.writeLog(`共${orderList.length}订单需同步`)
    console.log(`共${orderList.length}订单需同步`)
    this.allErrorInfo = {
      code205: {
        code: 205,
        order: [],
        text: ''
      },
      code401: {
        code: 401,
        order: [],
        text: ''
      },
      code403: {
        code: 403,
        order: [],
        text: ''
      },
      code405: {
        code: 405,
        order: [],
        text: ''
      },
      code407: {
        code: 407,
        order: [],
        text: ''
      },
      code305: {
        code: 305,
        order: [],
        text: ''
      },
      codeinterfaces: {
        code: 500,
        order: [],
        text: ''
      }
    }
    let syncCount = 0
    let status = true
    let retryOrder = 0
    let robotSuccess = 0; let robotFail = 0
    let retrySuccess = 0; let retryFail = 0
    const startTime = new Date().getTime()
    while (status) {
      for (let index = 0; index < orderList.length; index++) {
        this.writeLog(`正在同步【${syncCount + 1}/${orderList.length}】【${orderList[index]}】订单详情信息`)
        console.log(`正在同步【${syncCount + 1}/${orderList.length}】【${orderList[index]}】订单详情信息`)
        const orderStatus = await this.syncOrderDetail(this.mall, orderList[index])
        this.writeLog(`【${syncCount + 1}/${orderList.length}】【${orderList[index]}】订单详情同步${orderStatus ? '成功' : '失败'}`, orderStatus)
        console.log(`【${syncCount + 1}/${orderList.length}】【${orderList[index]}】订单详情同步${orderStatus ? '成功' : '失败'}`, orderStatus)
        if (!this.isLogin) {
          return this.writeLog('店铺登录信息失效,请重新登录店铺', false)
        }
        if (orderStatus) {
          if (retryOrder > 0) {
            retrySuccess++
          } else {
            robotSuccess++
          }
        } else {
          if (retryOrder > 0) {
            retryFail++
          } else {
            robotFail++
            this.lostOrder.push(orderList[index])
          }
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
      retryOrder = this.lostOrder.length
      for (let index = 0; index < this.lostOrder.length; index++) {
        const orderStatus = await this.syncOrderDetail(this.mall, this.lostOrder[index])
        if (orderStatus) {
          if (retryOrder > 0) {
            retrySuccess++
          } else {
            robotSuccess++
          }
        } else {
          if (retryOrder > 0) {
            retryFail++
          } else {
            robotFail++
          }
        }
        await this.delay(1000)
      }
    }
    const endTime = new Date().getTime()
    const Time = (endTime - startTime) / 1000 / 60
    const successRate = parseInt(((robotSuccess + retrySuccess) / orderList.length) * 100)
    let str = `同步时间: ${this.creatDate()}\n淘宝特价：同步订单详情数据统计${this.mode}\n店铺名为:【${this.mall.platform_mall_name}】\n需要同步订单数：${orderList.length}\n同步详情成功数：${robotSuccess}\n同步详情失败数：${robotFail}\n重试的订单数:${retryOrder}\n重试订单详情同步成功数:${retrySuccess}\n重试订单详情同步失败数:${retryFail}\n订单详情同步成功总数:${robotSuccess + retrySuccess}\n订单详情同步失败总数:${robotFail + retryFail}\n同步成功率:${successRate}%（计算公式：总同步成功数量/总订单数）\n耗时:${Time.toFixed(2)}分钟`
    str += `\n错误日志`
    for (const key in this.allErrorInfo) {
      if (Object.hasOwnProperty.call(this.allErrorInfo, key)) {
        const element = this.allErrorInfo[key]
        if (element.code !== 405 && element.order.length) {
          str += `\n【${element.order}】==>${element.code}:${element.text}`
        }
        if (element.code === 405 && element.order.length) {
          element.order.length < 20 ? element.order.length : element.order.length = 15
          element.order.forEach((item) => {
            str += `\n【${item.id}】==>405:${item.text}`
          })
        }
      }
    }
    console.log(str)
    if (successRate < 90) {
      this.sendWebhook(str)
    }
    console.log(str)
    this.writeLog(`同步订单详情已完成`, true)
    console.log(`同步订单详情已完成`, true)
  }
  sendWebhook(content1) {
    const content = {
      msgtype: 'markdown',
      markdown: {
        content: content1,
        mentioned_list: [''],
        mentioned_mobile_list: ['']
      }
    }
    const parameter = {
      system_code: 'chuzhuang.com',
      secret_key: 'uFpCWLGQgt4DPwAT',
      type: 1,
      level: 1,
      channel: 1,
      content: JSON.stringify(content),
      robot_name: '小妆'
    }
    this.$NetService
      .post('http://notice.91cyt.com/messagePush', {
        headers: {
          'Content-Type': 'application/json'
        },
        params: parameter
      })
      .then((res) => {
        console.log(JSON.parse(res))
      })
  }
  /**
       * 同步单个订单并上传服务器
       */

  async getCookie() {
    let count = 1
    while (count) {
      const params = { type: 3 }
      const url = '/yflow/api/tbX5/tbX5WorkBench'
      const { data } = await this.tbNetworkService.get(url, { params })
      console.log(count)
      if (data.data && data.data.x5sec !== 0) {
        this.x5Info = data.data.x5sec
        this.x5Success++
        break
      }
      count++
      this.x5Fail++
      if (count === 10) {
        count = undefined
      }
      await this.delay(3000)
    }
  }
  async syncOrderDetail(mall, order) {
    console.log(mall, order)
    // 调取云采集接口获取淘宝订单详情信息
    const data = await this.getOrderDetailInfo(mall, order)
    if (!data) {
      return false
    }
    const { buyMessage, mainOrder: { id, statusInfo }, tabs } = data
    let address = ''
    let shipType = ''
    tabs.forEach(item => {
      if (item.id === 'logistics') {
        address = item.content.address
        shipType = item.content.shipType
      }
    })
    const params = {
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
    console.log(params)
    const url2 = '/api/tbtj/order/syncOther'
    const { data2 } = await this.jszNetworkService.post(url2, params)
    console.log(data2)
    return true
  }
  async getOrderDetailInfo(mall, order) {
    try {
      const url = '/yflow/api/tbX5V1/tbOrder'
      const params = {
        cookie: JSON.stringify(mall.web_login_info),
        orderId: order
      }
      console.log(params)
      const { data } = await this.tbNetworkService.post(url, params)
      this.getallErrorInfo(data, order)
      if (data.code === 205) {
        this.writeLog(`获取失败${data.code} ${data.msg}`, false)
        this.isLogin = false
        return false
      }
      if (data.code !== 0) {
        this.writeLog(`获取失败${data.code} ${data.msg}`, false)
        return false
      }
      return data.data
    } catch (e) {
      this.writeLog(`获取失败${e.response.status}`, false)
      this.allErrorInfo.codeinterfaces.order.push(order)
      this.allErrorInfo.codeinterfaces.text = e.response?.statusText ?? ''
      this.allErrorInfo.codeinterfaces.code = e.response.status
      return false
    }
  }
  // 获取单个订单详情
  async singleGetOrderDetailInfo(mall, order) {
    try {
      const url = '/yflow/api/tbX5V1/tbOrder'
      const params = {
        cookie: JSON.stringify(mall.web_login_info),
        orderId: order
      }
      console.log(params)
      const { data } = await this.tbNetworkService.post(url, params)
      this.getallErrorInfo(data, order)
      if (data.code === 205) {
        return false
      }
      if (data.code !== 0) {
        return false
      }
      return data.data
    } catch (e) {
      return false
    }
  }
  // 单个订单同步
  async singleSyncOrderDetail(mall, order) {
    console.log(mall, order)
    // 调取云采集接口获取淘宝订单详情信息
    const data = await this.singleGetOrderDetailInfo(mall, order)
    if (!data) {
      return this.writeLog('获取订单详情失败', false)
    }
    const { buyMessage, mainOrder: { id, statusInfo }, tabs } = data
    let address = ''
    let shipType = ''
    tabs.forEach(item => {
      if (item.id === 'logistics') {
        address = item.content.address
        shipType = item.content.shipType
      }
    })
    const params = {
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
    console.log(params)
    const url2 = '/api/tbtj/order/syncOther'
    const { data2 } = await this.jszNetworkService.post(url2, params)
    console.log(data2)
    return this.writeLog('获取订单详情成功', true)
  }
  // 统计错误信息
  getallErrorInfo(data, order) {
    const code = data.code
    switch (code) {
      case 0:
        break
      case 205:
        this.allErrorInfo.code205.order.push(order)
        this.allErrorInfo.code205.text = data.msg
        break
      case 401:
        this.allErrorInfo.code401.order.push(order)
        this.allErrorInfo.code401.text = data.msg
        break
      case 403:
        this.allErrorInfo.code403.order.push(order)
        this.allErrorInfo.code403.text = data.msg
        break
      case 305:
        this.allErrorInfo.code305.order.push(order)
        this.allErrorInfo.code305.text = data.msg
        break
      case 405:
        const obj = { id: '', text: '' }
        obj.id = order
        obj.text = data.msg
        this.allErrorInfo.code405.order.push(obj)
        break
      case 407:
        this.allErrorInfo.code407.order.push(order)
        this.allErrorInfo.code407.text = data.msg
        break
      default:
        break
    }
  }
  // 判断同步详情订单状态
  syncOrderDetailStatic(str) {
    switch (str) {
      case (str.match(RegExp(/等待买家付款/)) || {}).input:
        return 2
        break
      case (str.match(RegExp(/买家已付款/)) || {}).input:
        return 3
        break
      case (str.match(RegExp(/商家已发货/)) || {}).input:
        return 4
        break
      case (str.match(RegExp(/交易成功/)) || {}).input:
        return 5
        break
      case (str.match(RegExp(/交易关闭/)) || {}).input:
        return 6
        break
      default:
        return 11
        console.log('异常订单')
        break
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
      'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) { fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length)) }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  /**
       * 暂停n毫秒后返回
       */
  async delay(time) {
    return new Promise((resolve) => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
}
