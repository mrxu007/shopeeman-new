import jxRequest from '../../network/jx-request'
// import tborderDetail from '../tbOrder-detail'
import BaseUtilService from '../BaseUtilService'
import LogisticBridgeService from '../LogisticBridgeService'
import AppConfig from '../application-config'
import {
  DomUtils
} from 'htmlparser2'
/**
 * 物流同步服务
 */
export default class logisticeSyncService {
  $appConfig = new AppConfig()
  $baseUtilService = new BaseUtilService()
  $LogisticBridgeService = new LogisticBridgeService()
  $api = jxRequest
  userInfo = this.$appConfig.getUserInfo()
  logCallback
  buyerAccountContainer = null // 存放开始同步订单的 买手号
  ordersContainer = null // 存放开始同步订单的订单号
  allSetting
  _that = null
  writeLog = undefined
  constructor(writeLog) {
    this.writeLog = writeLog
  }
  /**
   *
   * @param {vue 实例} that
   * @param {买手号信息} buyerAccounts
   * @param {订单} ordersList
   * @returns
   */
  async start(that, buyerAccounts, ordersList = []) { // singleOrders
    this._that = that
    await this.getGlobalSetting() // 全局设置
    let orders = []
    if (ordersList.length) { // 同步选择的订单
      orders = ordersList
    } else { // 自动获取需要同步物流的订单
      orders = await this.getOrdersFromServer() // 服务端返回需要同步物流的订单
    }
    orders = this.filterOrder(orders) // 过滤有物流信息,但是未发货状态 的订单
    if (!orders.length) {
      this.writeLog(`目前没有需要获取物流单号的订单`, false)
      return
    }
    this.writeLog(`获取到【${orders.length}】条需要同步物流的订单`, true)
    // 买手号与订单归类
    const accountMapOrderId = new Map()
    for (let i = 0; i < orders.length; i++) {
      const item = orders[i]
      console.log(item,"item")
      const buyer_name =  item.shot_order_info.buy_account_info ? item.shot_order_info.buy_account_info.name : '' 
      // const buyer_name = "tt939242551"
      console.log(buyer_name,"buyer_name")
      const shot_order_sn = item.shot_order_sn || item.order_sn
      const account = buyerAccounts.find(buyer => buyer.name === buyer_name)
      if (!account) {
        this.writeLog(`订单【${shot_order_sn}】对应的买手号【${buyer_name}】没有找到，请登录对应买手号.`, false)
        continue
      }
      if (accountMapOrderId.has(account)) {
        const value = accountMapOrderId.get(account)
        value.push(item)
      } else {
        accountMapOrderId.set(account, [item])
      }
    }
    if (accountMapOrderId.size !== 0) {
      for (const key of accountMapOrderId.keys()) {
        const ordersArr = accountMapOrderId.get(key)
        this.buyerAccountContainer = key
        this.ordersContainer = ordersArr
        await this.syncLogistic()
      }
    }
  }
  /**
   *
   * @returns // 服务端返回需要同步物流的订单
   */
  async getOrdersFromServer() {
    let orderList = []
    const res = await this.getOrdersFromServerCycle()
    console.log(res)
    if (res.code === 200) {
      orderList = res.data.orderList
    } else {
      this.writeLog(`获取需要同步物流的订单失败原因:${res.code}: ${res.data}`, false)
    }
    return orderList
  }
  async getOrdersFromServerCycle() {
    try {
      const res = await this.$api.getOriginalTrackingNumberEmpty()
      console.log(res, "getOrdersFromServerCycle")
      if (res.data.code === 200) {
        const data = {
          total: res.data.data.length,
          orderList: res.data.data
        }
        return {
          code: 200,
          data
        }
      }
      return {
        code: res.data.code,
        data: res.data.message
      }
    } catch (error) {
      if (error.response) {
        return {
          code: error.response.status,
          data: error.response.data.message
        }
      }
      return {
        code: -2,
        data: `getOrdersFromServerCycle-catch:${error}`
      }
    }
  }
  // 筛选需要获取物流信息的订单
  filterOrder(orders) {
    return orders.filter(item => !item.logistics || !item.logistics.tracking_number && item.shot_order_info && item.shot_order_info.shot_order_sn && item.buy_account_info)
  }
  /**
   * 获取上家真实物流
   * @param {*} buyerAccount
   * @param {*} orders
   */
  async syncLogistic() {
    console.log(this.buyerAccountContainer, this.ordersContainer, "syncLogistic")
    if (this.buyerAccountContainer && this.ordersContainer) {
      switch (this.buyerAccountContainer.type) {
        case 1: // 拼多多
          await this.syncLogisticAggregation('拼多多')
          break
        case 2: // 淘宝
          await this.syncLogisticAggregation('淘宝')
          break
        case 8: // 1688
          await this.syncLogisticAggregation('1688')
          break
        case 9: // lazada
          await this.syncLogisticAggregation('lazada')
          break
        case 10: // 京喜
          await this.syncLogisticAggregation('京喜')
          break
        case 11: // shopee
          await this.syncLogisticAggregation('shopee')
          break
        default:
          break
      }
    }
  }
  //转换拍单平台type
  changeType(type) {
    switch (type) {
      //pdd
      case 1:
        return 1
        //tb
      case 2:
        return 0
        //1688
      case 8:
        return 5
        //jingxi
      case 10:
        return 3
        //lazada
      case 9:
        return 7
        //shopee
      case 11:
        return 8
      default:
        return type
    }
  }
  //买手号转换参数为壳需要
  changeAccountParams(account) {
    let params = {
      UserNameCache: account.cache_path,
      Password: '',
      shotOrderPlatform: this.changeType(account.type),
      LoginedCookies: account.login_info,
      UserName: account.name,
      Cookiestr: JSON.stringify(account.login_info),
      AccountType: account.type,
      Ua: account.ua,
      Country: account.site || '',
    }
    return params
  }
  /**
   * 买手号物流同步聚合接口
   */
  async syncLogisticAggregation(type) {
    console.log(type, "syncLogisticAggregation", this.ordersContainer)
    const orders = this.ordersContainer
    const ordersLen = orders.length
    const buyerAccount = this.changeAccountParams(this.buyerAccountContainer)
    for (let index = 0; index < ordersLen; index++) {
      const item = orders[index]
      console.log(item, "56656")
      const shot_order_sn = item.shot_order_info.shot_order_sn || ''
      // const shot_order_sn = '2229427695828657966' //tb
      // const shot_order_sn = '2161702586001984947' //1688
      try {
        console.log(buyerAccount.shotOrderPlatform, shot_order_sn, JSON.stringify(buyerAccount), "=========================")
        const logisticInfo = await this.$baseUtilService.getOriginLogistics(buyerAccount.shotOrderPlatform, shot_order_sn, buyerAccount)
        console.log(logisticInfo)
        if (logisticInfo.Code !== 200) {
          this.writeLog(`(${type})订单【${shot_order_sn}获取上家物流失败原因: ${logisticInfo.Code} : ${logisticInfo.Msg}(买手号: ${buyerAccount.UserName})`, false)
          continue
        }
        if (!logisticInfo.TrackingNumber) {
          this.writeLog(`(${type})订单【${shot_order_sn}】未发货`, false, '#ff9900')
          continue
        }
        const tbshippingName = this.changetbOrderName(logisticInfo.TrackingName)
        const params = {
          sysOrderId: item.id, //系统订单id
          trackingNumber: logisticInfo.TrackingNumber, //平台物流单号
          // shippingId: logisticInfo.TrackCode, //物流公司id
          // deliveryTime: logisticInfo.DeliveryTime, //上家发货时间
          trackingNumberCompany: logisticInfo.TrackingName, //快递物流公司
          // transitList: JSON.parse(logisticInfo.LogisticsRoute) || [], //物流轨迹
        }
        // JSON.parse(res.replace(/^\"|\"$/g, ''))
        const res = await this.saveOrderLogistics(params)
        if (res.code !== 200) {
          this.writeLog(`(${type})订单【${shot_order_sn}】上报物流失败原因: ${res.code}: ${res.data}`, false)
          continue
        }
        this.writeLog(`(${type})订单【${shot_order_sn}】同步物流成功`, true)
        if (!item.logistics) {

          item.logistics = {}
        }
        item.logistics.tracking_number = logisticInfo.TrackingNumber
        item.logistics.logistics_company = logisticInfo.TrackingName
        item.logistics.logistics_company_code = tbshippingName
      } catch (e) {
        console.log(e)
        this.writeLog(`订单【${shot_order_sn}获取上家物流失败原因(${type}): ${JSON.stringify(e)}`, false)
        continue
      }
    }

    this.ordersContainer = null
    this.buyerAccountContainer = null
  }
  // 获取全局设置(本地化)
  async getGlobalSetting() {
    try {
      const response = await this.$appConfig.getUserConfig()
      const data = JSON.parse(response)
      this.allSetting = data
    } catch {
      this.allSetting = null
    }
  }

  async saveOrderLogistics(params) { // 上报/更新 物流信息
    try {
      const res = await  this.$api.uploadTrackingNumber(params)
      console.log(res, "saveOrderLogistics")
      if (res.data.code === 200) {
        return {
          code: 200,
          data: '物流信息上报成功'
        }
      }
      return {
        code: res.data.code,
        data: res.data.message
      }
    } catch (error) {
      if (error.response) {
        return {
          code: error.response.status,
          data: error.response.data.message
        }
      }
      return {
        code: -2,
        data: `sync-service-saveOrderLogistics-catch:${JSON.stringify(error)}`
      }
    }
  }
  // 辅助函数------------------
  async delay(time) {
    return new Promise(resolve => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
  // 转换订单状态 物流公司简称
  changetbOrderName(trackingNumber) {
    let newText = JSON.parse(JSON.stringify(trackingNumber))
    switch (newText) {
      case (newText.match(RegExp(/圆通速递/)) || {}).input:
        newText = 'YTO'
        break
      case (newText.match(RegExp(/圆通快递/)) || {}).input:
        newText = 'YTO'
        break
      case (newText.match(RegExp(/韵达快递/)) || {}).input:
        newText = 'YUNDA'
        break
      case (newText.match(RegExp(/天天快递/)) || {}).input:
        newText = 'TTKDEX'
        break
      case (newText.match(RegExp(/顺丰速运/)) || {}).input:
        newText = 'SF'
        break
      case (newText.match(RegExp(/顺丰快递/)) || {}).input:
        newText = 'SF'
        break
      case (newText.match(RegExp(/百世快递/)) || {}).input:
        newText = 'HTKY'
        break
      case (newText.match(RegExp(/申通快递/)) || {}).input:
        newText = 'STO'
        break
      case (newText.match(RegExp(/中通快递/)) || {}).input:
        newText = 'ZTO'
        break
      case (newText.match(RegExp(/优速快递/)) || {}).input:
        newText = 'UC'
        break
      case (newText.match(RegExp(/EMS/)) || {}).input:
        newText = 'EMS'
        break
      case (newText.match(RegExp(/国通快递/)) || {}).input:
        newText = 'GTO'
        break
      case (newText.match(RegExp(/其它/)) || {}).input:
        newText = 'OTHER'
        break
      case (newText.match(RegExp(/极兔速递/)) || {}).input:
        newText = 'OTHER'
        break
      case (newText.match(RegExp(/邮政快递包裹/)) || {}).input:
        newText = 'POSTB'
        break
      case (newText.match(RegExp(/EMS经济快递/)) || {}).input:
        newText = 'EYB'
        break
      default:
        newText = ''
        break
    }
    return newText
  }
}