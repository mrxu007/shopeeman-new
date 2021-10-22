import orderService from './order-service'
import jxRequest from '../network/jx-request'
import { NetService } from 'cyt-ipc'
import Congfig from './application-config'

export default class {
    jdNetworkService=jxRequest.jdRequest;
    jszNetworkService=jxRequest.jxRequest;
    tbNetworkService = jxRequest.tbRequest;
    $api = jxRequest
    CongfigServe = new Congfig();
    $NetService = NetService;
    mall=undefined;
    params=undefined;
    writeLog=undefined;
    lostOrder=[];
    x5Info='';
    x5Success=0;
    x5Fail=0;
    isLogin=true;
    uidFile=[
      '617290',
      '589030',
      '645856',
      '655282',
      '653643',
      '644151',
      '654897',
      '588279',
      '650779',
      '617652']
    allErrorInfo={
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
    orderService=new orderService();
    skuImageCache={};
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
      // const params = { sys_mall_id: this.mall.id }
      // const url = '/api/order/needSyncOrders'
      // const { data } = await this.jszNetworkService.get(url, { params })
      // const { data } = await this.$api.getNeedSyncOrdersDetail()
      // console.log(data)
      // let orderList = data.data.ids
      // const newArray = []
      // orderList.filter(item => {
      //   if (item.sys_mall_id === this.mall.id) {
      //     return newArray.push(item.main_order_sn)
      //   }
      // })
      // orderList = newArray
      const orderList = this.orderList
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
      let newAddress = ''
      let params = null
      // 调取云采集接口获取淘宝订单详情信息
      const data = await this.getOrderDetailInfo(mall, order)
      if (data === 307) {
        this.writeLog(`该订单详情不存在`, true)
        return true
      }
      if (!data?.data?.data) {
        return false
      }
      if (data?.data && data?.data?.address.length > 8) {
        newAddress = data?.data?.address
      } else {
        newAddress = ''
      }
      const { buyMessage, mainOrder: { id, statusInfo }, tabs } = data.data.data
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
        const compositionData = `${temporaryParams[2].trim()}，${temporaryParams[3].trim()}，${temporaryParams[0]}，${temporaryParams[1].trim()}`
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
      const url2 = '/api/order/syncOther'
      const { data2 } = await this.jszNetworkService.post(url2, params)
      console.log(data2)
      return true
    }
    async getOrderDetailInfo(mall, order) {
      // 测试店铺是否掉线
      // const url = `https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=${order}`
      // const data1 = await this.jdNetworkService.post(url, { headers: {
      //   isGBK: false,
      //   cookies: mall.web_login_info
      // }})
      // console.log(data1)
      try {
        const url = '/yflow/api/tbX5V1/tbOrder'
        const params = {
          cookie: JSON.stringify(mall.web_login_info),
          orderId: order
        }
        console.log(params)
        const data = await this.tbNetworkService.post(url, params)
        this.getallErrorInfo(data, order)
        if (data.data.code === 205) {
          this.writeLog(`获取订单详情失败,返回码[${data.data.code}]云采集提示:${data.data.msg}`, false)
          this.isLogin = false
          return false
        }
        if (data.data.code === 307) {
          return 307
        }
        if (data.data.code !== 0) {
          this.writeLog(`获取订单详情失败,返回码[${data.data.code}]云采集提示:${data.data.msg}`, false)
          return false
        }
        return data
      } catch (e) {
        this.allErrorInfo.codeinterfaces.order.push(order)
        const body = document.getElementById('app')
        const doms = document.createElement('a')
        doms.style.display = 'none'
        doms.innerText = `${e}`
        body.appendChild(doms)
        this.writeLog(`获取失败${e?.response?.status ?? ''}`, false)
        this.allErrorInfo.codeinterfaces.text = e?.response?.statusText ?? ''
        this.allErrorInfo.codeinterfaces.code = e?.response?.status ?? ''
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
        const data = await this.tbNetworkService.post(url, params)
        this.getallErrorInfo(data, order)
        if (data.data.code === 205) {
          return false
        }
        if (data.data.code === 307) {
          return 307
        }
        if (data.data.code !== 0) {
          return false
        }
        return data
      } catch (e) {
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
      let newAddress = ''
      let params = null
      if (!data) {
        return this.writeLog('获取订单详情失败', false)
      }
      if (data?.data && data?.data?.address.length > 8) {
        newAddress = data?.data?.address
      } else {
        newAddress = ''
      }
      const { buyMessage, mainOrder: { id, statusInfo }, tabs } = data.data.data
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
        const compositionData = `${temporaryParams[2].trim()}，${temporaryParams[3].trim()}，${temporaryParams[0]}，${temporaryParams[1].trim()}`
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
      const url2 = '/api/order/syncOther'
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
        case (str.match(RegExp(/买家已付款/)) || {}).input:
          return 3
        case (str.match(RegExp(/商家已发货/)) || {}).input:
          return 4
        case (str.match(RegExp(/交易成功/)) || {}).input:
          return 5
        case (str.match(RegExp(/交易关闭/)) || {}).input:
          return 6
        default:
          return 11 // 异常订单
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
