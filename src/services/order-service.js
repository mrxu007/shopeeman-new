import jxRequest from '../network/jx-request'
import applicationConfig from '../services/application-config'
import BaseUtilService from '../services/BaseUtilService'
import _ from 'lodash'
export default class orderService {
  networkService = jxRequest.jdRequest
  jszNetworkService = jxRequest.jxRequest
  $api = jxRequest
  $BaseUtilService = new BaseUtilService()
  /**
   * 搜索订单
   * @param {*} mall
   * @param {{
   * current:number,//当前页
   * pageSize:number,
   * sortName:string,
   * orderId:string,
   * skuName:string,
   * orderCreateDateRange:string[],
   * orderCompleteDateRange:string[]
   * receiverName:string,//收件人
   * receiverTel:string//收件人电话
   * userPin:string,
   * skuId:string,
   * logiNo:string,
   * paymentType:string,//支付方式
   * orderType:string,//订单类型
   * deliveryType:string,
   * storeId:string
   * huoHao:string,//货号
   * selectedTabName:string,//所有订单：allOrders，未付款：notPay，暂停：suspend，待出库：waitOut，已出库：hadOut，已完成：completed，已取消：canceled，已锁定：locked
   * }} paramter
   */
  // 搜索淘宝订单
  // async searchOrder(mall,formData={auctionType: 1,close: 0,pageNum: 1,pageSize: 15,queryMore: false,rxAuditFlag: 0,rxElectronicAllFlag: 0,rxElectronicAuditFlag: 0,rxHasSendFlag: 0,rxOldFlag: 0,rxSendFlag: 0,rxSuccessflag: 0,rxWaitSendflag: 0,tradeTag: 0,useCheckcode: false,useOrderInfo: false,errorCheckcode: false,action: 'itemlist/SoldQueryAction',prePageNo: 1}){
  async searchOrder(mall, formData) {
    const headers = await this.gettjbOrderListHeaders(mall)
    const cookies = await this.changeCookies(headers?.cookie)

    const url =
      'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&isFrame=true&from=tejia'
    const response = await this.networkService.post(url, formData, {
      headers: {
        ...headers,
        cookies
      }
    })
    this.uptjbOrderListResult(headers, response)
    if (response.status === 200 && response.data.mainOrders) {
      return response.data
    }
  }
  // 搜索淘宝订单详情(买家地址信息)
  async searchOrderDetailInfo(mall, order) {
    const headers = await this.gettjbOrderListHeaders(mall)
    const cookies = await this.changeCookies(headers?.cookie)
    const address = await this.getEncryptedInfo(order, headers, cookies)
    const url = `https://trade.taobao.com/trade/detail/trade_order_detail.htm?biz_order_id=${order}`
    const response = await this.networkService.get(url, {
      headers: {
        ...headers,
        cookies,
        isGBK: false,
        urlencoded: false
      }
    })
    console.log(response)
    const data = response.data
    // 返回html页面 需要从页面解析地址的信息
    let str = data.toString().match(/JSON.parse\(('{.*}')\)/)
    console.log(str)
    if (str) {
      str = str[0]
      // 解析地址信息
      const data = eval(str.replace(/^\'|\'$/g, ''))
      data.address = address || ''
      return data
    } else {
      this.uptjbOrderListResult(headers, response)
      return false
    }
  }
  // 获取地址脱敏信息
  async getEncryptedInfo(order, headers, cookies) {
    try {
      // 获取订单查发货的orderID
      const url1 = `https://wuliu2.taobao.com/user/queryOrderList?listType=all&tradeId=${order}&x-frames-allow-from=wuliu2`
      const response1 = await this.networkService.get(url1, {
        headers: {
          ...headers,
          cookies,
          referer: 'https://wuliu2.taobao.com/user/batch_consign.htm?x-frames-allow-from=wuliu2',
          isGBK: false,
          urlencoded: false
        }
      })
      if (response1 && response1?.data && response1?.data.data.length) {
        const orderId = response1?.data?.data[0]?.baseInfo?.fields[0]?.value ?? ''
        if (orderId) {
          // 通过orderID查询该订单的脱敏地址信息
          const url2 = `https://wuliu2.taobao.com/user/getRealReceiverInfo?orderId=${orderId}&x-frames-allow-from=wuliu2`
          const response2 = await this.networkService.get(url2, {
            headers: {
              ...headers,
              cookies,
              referer: 'https://wuliu2.taobao.com/user/batch_consign.htm?x-frames-allow-from=wuliu2',
              isGBK: false,
              urlencoded: false
            }
          })
          if (response2 && response2?.data && response2?.data?.data?.length > 10) {
            console.log(response2.data.data)
            return response2.data.data
          }
        }
      } else {
        if (response1?.data.data.length === 0) {
          return '暂无地址信息'
        }
      }
    } catch (err) {
      console.log(err)
      return false
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
        console.log('异常订单')
        return 11
    }
  }
  // 转换cookie带到头部
  async changeCookies(str) {
    try {
      const response = await this.$BaseUtilService.changeCookies(str)
      return response
    } catch (err) {
      console.log(err)
      return ''
    }
  }
  // 获取云采集头部
  async gettjbOrderListHeaders(mall) {
    try {
      const params = {
        cookie: JSON.stringify(mall.web_login_info),
        userAgent:
          'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
      }
      const response = await this.$api.tjbOrderListHeaders(params)
      if (
        response?.data &&
        response?.data?.data &&
        response?.data?.data?.headers
      ) {
        return response.data.data.headers
      }
      return false
    } catch (e) {
      return {
        referer:
          'https://trade.taobao.com/trade/itemlist/list_sold_items.htm?isFrame=true&from=tejia',
        'content-type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookies: mall.web_login_info
      }
    }
  }
  // 上报用头请求的结果
  async uptjbOrderListResult(headers, data) {
    try {
      const params = {
        reqHeaders: headers,
        resText: JSON.stringify(data.data)
      }
      const response = await this.$api.tjbOrderListResult(params)
      console.log(response)
    } catch (err) {
      console.log(err)
    }
  }
  /**
   * 查找指定订单号
   * @param {*} mall
   * @param {*} orderId
   */
  async searchOrderById(mall, orderIds) {
    if (orderIds) {
      const result = []
      const paramter = {
        current: 1,
        pageSize: 10,
        sortName: 'desc',
        orderId: '',
        skuName: '',
        orderCreateDateRange: null,
        orderCompleteDateRange: [],
        receiverName: '',
        receiverTel: '',
        userPin: '',
        skuId: '',
        logiNo: '',
        paymentType: '',
        orderType: '',
        orderSource: '',
        deliveryType: '',
        storeId: '',
        huoHao: '',
        orderStatusArray: [],
        o2oStoreIds: null,
        selectedTabName: 'allOrders'
      }
      for (let index = 0; index < orderIds.length; index++) {
        const itemId = orderIds[index]
        paramter.orderId = itemId
        const { orderList } = await this.searchOrder(mall, paramter)
        if (orderList) {
          result.push(...orderList)
        }
      }
      return result
    }
    return null
  }
  /**
   * 检测订单是否已同步过
   * @param {number} orderId
   */
  async orderExist(orderId) {
    const userInfo = await new applicationConfig().getUserInfo()
    if (!userInfo) {
      return true
    }
    const url = `/api/order/checkExist?muid=${userInfo.muid}&orderSn=${orderId}`
    const response = await this.jszNetworkService.get(url)
    // console.log(response,"check order exist");
    return response.data.order_sn == orderId.toString()
  }
  /**
   * 同步订单状态
   */
  async syncOrderStatus(orderId, orderStatus) {
    const url = '/api/order/updateOrderStatus'
    const data = { orderSn: orderId, orderStatus: orderStatus }
    const response = await this.jszNetworkService.post(url, data)
    return response.data.status_code == 200
  }

  /**
   * 获取sku图片
   * @param {string[]} skuIds sku id 列表
   */
  async getSkusImage(mall, skuIds) {
    console.log(skuIds, 'origin sku ids')
    const maxLength = 18
    const skus = Array.from(new Set(skuIds)) // 去除重复值
    const newIds = _.chunk(skus, maxLength)
    console.log(skus, 'new sku ids')

    const result = {}
    return new Promise(async(resolve, reject) => {
      for (let index = 0; index < newIds.length; index++) {
        const element = newIds[index]
        const ids = element.join(',')
        const url = `https://porder.shop.jd.com/order/global/getSkuImgs?skuIds=${ids}`
        const response = await this.networkService.get(url, {
          headers: {
            cookies: mall.web_login_info,
            referer: 'https://porder.shop.jd.com/order/orderlist/allOrders'
          }
        })
        Object.assign(result, response.data)
      }
      resolve(result)
    })
  }
  /**
   * 上传订单信息
   * @param {*} order
   */
  async uploadOrderInfo(order) {
    const url = '/api/order/sync'
    const response = await this.jszNetworkService.post(url, order)
    return response
  }

  /**
   * 获取收件人电话号码
   */
  async getPhonenumber(mall, orderId) {
    const url = `https://morder.shop.jd.com/api/orderlist/sensInfo/${orderId}`
    const response = await this.networkService.get(url, {
      headers: {
        cookies: mall.web_login_info,
        'User-Agent':
          'Mozilla/5.0 (Linux; Android 9; ONEPLUS A6000 Build/PKQ1.180716.001; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/66.0.3359.126 MQQBrowser/6.2 TBS/044904 Mobile Safari/537.36;JM_ANDROID/4.1.0 Language/zh_CN Region/CN',
        referer: url
      }
    })
    console.log(response)
    if (response.status == 200 && response.data.privacyMobilePhone) {
      return response.data.privacyMobilePhone
    }
  }
  /**
   * 获取拆单树
   * @param {*} mall
   * @param {*} orderId
   */
  async getSplitOrderTree(mall, orderId) {
    const url =
      'https://porder.shop.jd.com/order/global/getSplitOrderTree?orderId=' +
      orderId
    const response = await this.networkService.get(url, {
      headers: {
        cookies: mall.web_login_info
      }
    })
    console.log(response)
    if (response.status == 200) {
      return response.data
    }
  }
  /**
   * 上传拆分订单树
   * @param {*} splitOrderInfo
   */
  async uploadSplitOrderInfo(splitOrderInfo) {
    const url = '/api/order/splitDetailV2'
    const response = await this.jszNetworkService.post(url, splitOrderInfo)
    return response
  }
}
