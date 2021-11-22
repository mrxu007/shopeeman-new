import orderService from './order-service'
import jx from '../network/jx-request'
import api from '../network/jx-request'
import applicationConfig from '../services/application-config'
import JSEncrypt from 'jsencrypt'
import shopeemanService from '../services/shopeeman-service'
import {
  site_mall
} from '../views/order-manager/components/orderCenter/orderCenter'

export default class {
  tbNetworkService = jx.tbRequest;
  $api = api;
  $shopeemanService = new shopeemanService()
  jdNetworkService = jx.jdRequest;
  jszNetworkService = jx.jxRequest
  isStop = false;
  mall = undefined;
  _this = null;
  pageSize = 40;
  orderService = new orderService();
  skuImageCache = {};
  syncStatus = undefined
  mallNo = ''
  upLoadType = ''
  writeLog = undefined
  constructor(mall, syncStatus, that, writeLog) {
    this.mall = mall,
      this._this = that
    this.syncStatus = syncStatus
    this.writeLog = writeLog
  }
  //单个订单同步
  async startSingel(order) {
    let params = {
      order_id: order.order_id,
      shop_id: order.shop_id
    }
    let res = await this.$shopeemanService.getDetailsSinger(order.country, params)
    if (res.code === 200) {
      let orderDetail = [res.data]
      await this.getOrderOtherInfo(orderDetail)
      await this.upLoadOrders(orderDetail)
      this.writeLog(`【${order.order_id}】订单同步成功`, true)
    } else {
      this.writeLog(`【${order.order_id}】订单同步失败${res.data}`, false)
    }
  }
  //手动同步/自动同步
  async start(mallNo, upLoadType) {
    if (this.syncStatus.value === 'refund') {
      await this.refund(mallNo, upLoadType)
    } else if (this.syncStatus.value === 'toShip') {
      await this.toShip(mallNo, upLoadType)
    } else {
      await this.otherStatus(mallNo, upLoadType)
    }
  }
  //to ship 类型的同步
  async toShip(mallNo, upLoadType) {
    this.mallNo = mallNo
    this.upLoadType = upLoadType
    try {
      let params = {
        page_size: this.pageSize,
        page_number: 1,
        total: 0,
        sort_by: "confirmed_date_desc",
        shop_id: this.mall.platform_mall_id
      }
      let res = await this.$shopeemanService.getToShipOrderIdList(this.mall.country, params)
      console.log(res, "toShip")
      if (res.code === 200) {
        let {
          package_list,
          total
        } = res.data
        let orderDetailListCount = 0
        let orderDetailListFa = []
        while (package_list.length) {
          //orderLen-a<5
          for (let a = 0; a < orders.length; a = a + 5) {
            let orderArr = orders.slice(a, a + 5)
            let resDetail = await this.$shopeemanService.getDetailsByOrderIds(this.mall.country, {
              from_seller_data: false,
              orders: this.changeParams(orderArr),
              shop_id: this.mall.platform_mall_id
            })
            console.log(resDetail, "resDetail")
            if (resDetail.code === 200) {
              let orderDetailList = resDetail.data && resDetail.data.orders || []
              orderDetailListFa = orderDetailListFa.concat(resDetail.data.orders)
              if (orderDetailList && orderDetailList.length) {
                //过滤不是今天的订单 new Date().getTime()-item.create_time*1000 < 1*24*60*60*1000
                let orderDetailListFilter = orderDetailList.filter(item => {
                  return new Date().getTime() - item.create_time * 1000 > 1 * 24 * 60 * 60 * 1000
                })
                orderDetailListCount += orderDetailListFilter.length
                await this.getOrderOtherInfo(orderDetailListFilter)
                //检测订单是否需要上报
                let checkedList = []
                checkedList = await this.checkOrderSnStatus(orderDetailListFilter)
                checkedList.length && await this.upLoadOrders(checkedList)
              }
            }
          }
          //自动翻页
          if (package_list.length < 40) {
            package_list = []
          } else {
            params.page_number++
            params.total = total
            let pageUp = await this.$shopeemanService.getToShipOrderIdList(this.mall.country, params)
            package_list = pageUp && pageUp.data && pageUp.data.package_list || []
          }
        }
        this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】成功-【${orderDetailListCount}】条`, true)
      } else if (res.code === 403) {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】未登录`, false)
      } else {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】${res.code}-${res.data}`, false)
      }
    } catch (e) {
      console.log(e)
      return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】同步失败`, false)
    }
  }
  //refund 类型的同步
  async refund(mallNo, upLoadType) {
    this.mallNo = mallNo
    this.upLoadType = upLoadType
    try {
      let params = {
        page_size: this.pageSize,
        page_number: 1,
        keyword: '',
        from_page_number: 1,
        shop_id: this.mall.platform_mall_id
      }
      let res = await this.$shopeemanService.getRefundOrderIdList(this.mall.country, params)
      console.log(res, "refund")
      if (res.code === 200) {
        let {
          list,
          page_info
        } = res.data
        let orderDetailListCount = 0
        while (list.length) {
          //orderLen-a<5
          for (let a = 0; a < list.length; a++) {
            let order = list[a]
            let par = {
              return_sn: order.return_sn,
              shop_id: this.mall.platform_mall_id
            }
            let resDetail = await this.$shopeemanService.getRefundOrderDetail(this.mall.country, par)
            console.log("resDetail",resDetail)
            if (resDetail.code === 200) {
              order.refundDetail = resDetail.data
              await this.getOrderOtherInfoRefund(order)
              let checkFlag = await this.checkAfterOrderSnStatus(order)
              if(checkFlag){
                let afterRes = await this.afterUpLoadOrders(order)
                if(afterRes){
                  orderDetailListCount++
                }
              }
              // checkFlag && this.afterUpLoadOrders(order)
              // console.log(order, "refund-order")
            }
          }
          //自动翻页
          if (list.length < 40) {
            list = []
          } else {
            params.page_number++
            let pageUp = await this.$shopeemanService.getRefundOrderIdList(this.mall.country, params)
            list = pageUp && pageUp.data && pageUp.data.list || []
          }
        }
        this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】成功-【${orderDetailListCount}】条`, true)
      } else if (res.code === 403) {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】未登录`, false)
      } else {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】${res.code}-${res.data}`, false)
      }
    } catch (e) {
      console.log(e)
      return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】同步失败`, false)
    }
  }
  //其它状态的同步
  async otherStatus(mallNo, upLoadType) {
    this.mallNo = mallNo
    this.upLoadType = upLoadType
    try {
      let params = {
        from_page_number: 1,
        source: this.syncStatus.value,
        page_size: this.pageSize,
        page_number: 1,
        total: 0,
        is_massship: false,
        shop_id: this.mall.platform_mall_id
      }
      let res = await this.$shopeemanService.getOrderIdList(this.mall.country, params)
      console.log(res, "res")
      if (res.code === 200) {
        let {
          orders,
          page_info
        } = res.data
        let orderDetailListCount = 0
        let orderDetailListFa = []
        while (orders.length) {
          //orderLen-a<5
          for (let a = 0; a < orders.length; a = a + 5) {
            let orderArr = orders.slice(a, a + 5)
            let resDetail = await this.$shopeemanService.getDetailsByOrderIds(this.mall.country, {
              from_seller_data: false,
              orders: orderArr,
              shop_id: this.mall.platform_mall_id
            })
            console.log(resDetail, "resDetail")
            if (resDetail.code === 200) {
              let orderDetailList = resDetail.data && resDetail.data.orders || []
              orderDetailListFa = orderDetailListFa.concat(resDetail.data.orders)
              if (orderDetailList && orderDetailList.length) {
                //过滤不是今天的订单 new Date().getTime()-item.create_time*1000 < 1*24*60*60*1000
                let orderDetailListFilter = orderDetailList.filter(item => {
                  return new Date().getTime() - item.create_time * 1000 > 1 * 24 * 60 * 60 * 1000
                })
                orderDetailListCount += orderDetailListFilter.length
                await this.getOrderOtherInfo(orderDetailListFilter)
                //检测订单是否需要上报
                let checkedList = []
                checkedList = await this.checkOrderSnStatus(orderDetailListFilter)
                console.log(checkedList, "checkedList")
                checkedList.length && await this.upLoadOrders(checkedList)
              }
            }
          }
          //自动翻页
          if (orders.length < 40) {
            orders = []
          } else {
            params.page_number++
            params.total = page_info.total
            let pageUp = await this.$shopeemanService.getOrderIdList(this.mall.country, params)
            orders = pageUp && pageUp.data && pageUp.data.orders || []
          }
        }
        this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】成功-【${orderDetailListCount}】条`, true)
      } else if (res.code === 403) {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】未登录`, false)
      } else {
        return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】${res.code}-${res.data}`, false)
      }
    } catch (e) {
      console.log(e)
      return this.writeLog(`${this.upLoadType !=='manual'?"【"+this.upLoadType+"】":'' }${this.mallNo} 店铺【${this.mall.platform_mall_name}】【${this.syncStatus.label}】同步失败`, false)
    }
  }
  //转换请求参数
  changeParams(array) {
    let params = []
    array.forEach(item => {
      let par = {
        order_id: item.order_id,
        region_id: item.region_id || item.region,
        shop_id: item.shop_id,
      }
      params.push(par)
    })
    return params
  }
  //获取其它信息
  //3、获取订单交易记录
  //4、获取订单历史轨迹
  //5、获取物流轨迹的发货时间 
  //6、申请运单号
  async getOrderOtherInfo(orderDetailList) {
    for (let i = 0; i < orderDetailList.length; i++) {
      let order = orderDetailList[i]
      let params = {
        order_id: order.order_id,
        shop_id: this.mall.platform_mall_id
      }
      //3、获取订单交易记录
      let res3 = await this.$shopeemanService.getIncomeTransactionHistoryDetail(this.mall.country, params)
      console.log(res3, "res3")
      if (res3.code === 200) {
        order['transactionHistoryDetail'] = res3.data
      }
      //4、获取订单历史轨迹
      let res4 = await this.$shopeemanService.getOrdeTrackingHistory(this.mall.country, params)
      console.log(res4, "res4")
      if (res4.code === 200) {
        order['ordeTrackingHistory'] = res4.data
      }
      //5、获取物流轨迹的发货时间 
      let res5 = await this.$shopeemanService.getLogisticsTrackingHistory(this.mall.country, params)
      console.log(res5, "res5")
      if (res5.code === 200) {
        order['logisticsTrackingHistory'] = res5.data
      }
      console.log(order, "orderAll")
      //6、申请运单号
      let res6 = await this.$shopeemanService.getForderLogistics(this.mall.country, params)
      if (res6.code === 200) {
        order['forderLogistics'] = res6.data
      }
      console.log(res6, "res6")
    }
  }
  //售后订单
  async getOrderOtherInfoRefund(order) {
    let params = {
      order_id: order.order_id,
      shop_id: this.mall.platform_mall_id
    }
    //3、获取订单交易记录
    let res3 = await this.$shopeemanService.getIncomeTransactionHistoryDetail(this.mall.country, params)
    console.log(res3, "res3")
    if (res3.code === 200) {
      order['transactionHistoryDetail'] = res3.data
    }
    //4、获取订单历史轨迹
    let res4 = await this.$shopeemanService.getOrdeTrackingHistory(this.mall.country, params)
    console.log(res4, "res4")
    if (res4.code === 200) {
      order['ordeTrackingHistory'] = res4.data
    }
    //5、获取物流轨迹的发货时间 
    let params5 = {
      order_id: order.order_id,
      shop_id: this.mall.platform_mall_id,
      log_id:1
    }
    let res5 = await this.$shopeemanService.getLogisticsTrackingHistoryRefund(this.mall.country, params5)
    console.log(res5.data, "res5-res5")
    if (res5.code === 200) {
      order['logisticsTrackingHistory'] = res5.data
    }
    console.log(order, "orderAll")
    //6、申请运单号
    let res6 = await this.$shopeemanService.getForderLogistics(this.mall.country, params)
    if (res6.code === 200) {
      order['forderLogistics'] = res6.data
    }
    console.log(res6, "res6")
  }
  //服务端检测订单 ---正常订单

  //orderKey组装： main_order_sn  + status  +   status_ext  + logistics_status + log_current_status  + actual_shipping_cost
  //其中： log_current_status  为此接口（获取历史记录节点）：/api/v3/order/get_order_tracking_history/  中的new_status，如无，则为''
  //其中： actual_shipping_cost 为此接口（订单收入明细）：/api/v3/finance/income_transaction_history_detail  中的 shipping_fee_paid_by_shopee_on_your_behalf ，若无，则为0
  async checkOrderSnStatus(orderDetailListFilter) {
    let checkList = []
    for (let i = 0; i < orderDetailListFilter.length; i++) {
      let order = orderDetailListFilter[i]
      let log_current_status = order && order.ordeTrackingHistory && order.ordeTrackingHistory.history && order.ordeTrackingHistory.history[0] && order.ordeTrackingHistory.history[0].new_status || ''
      let actual_shipping_cost = order && order.transactionHistoryDetail && order.transactionHistoryDetail.payment_info && order.transactionHistoryDetail.payment_info.shipping_subtotal && order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf || 0
      let key = order.order_sn + '_' + order.status + '_' + order.status_ext + '_' + order.logistics_status + '_' + log_current_status + '_' + actual_shipping_cost
      let res = await this.$api.checkOrderSnStatus({
        orderKey: key
      })
      if (!res.data.orderKey) {
        checkList.push(order)
      }
      console.log(res, "checkOrderSnStatus")
    }
    return checkList
  }
  //服务端检测订单 ---售后订单
  //key组成：return_id +   status + mtime （若mtime没有值，则为0）
  async checkAfterOrderSnStatus(order) {
    let flag = false
    let key = `${order.return_id}'_'${order.status}'_'${order.mtime?order.mtime:0}`
    let res = await this.$api.checkOrderSnStatus({
      orderKey: key
    })
    console.log(res, "checkAfterOrderSnStatus")
    if (!res.data.orderKey) {
      flag = true
    }
    return flag
  }
  //订单上报
  async upLoadOrders(checkedList) {
    try {
      let paramsArr = []
      for (let i = 0; i < checkedList.length; i++) {
        let order = checkedList[i]
        let params = {
          "order_id": order.order_id,
          "ordersn": order.order_sn,
          "currency": order.order_items[0].product.currency,
          "shipping_carrier": order.actual_carrier,
          "days_to_ship": order.days_to_ship || 7,
          "auto_cancel_date": order.auto_cancel_3pl_ack_date,
          "note": order.note,
          "note_update_time": order.note_mtime,
          "payment_method": order.payment_method,
          "create_time": order.create_time,
          "update_time": order.ordeTrackingHistory && order.ordeTrackingHistory.history && order.ordeTrackingHistory.history[0] && order.ordeTrackingHistory.history[0].ctime || 0,
          "pay_time": order.shipping_confirm_time,
          // "credit_card_number": null,
          "ship_by_date": order.ship_by_date,
          "delivery_time": this.getDeliveryTime(order),
          "tracking_no": order.shipping_traceno || this.getTrackingNo(order),
          "buyer_cancel_reason": order.buyer_cancel_reason,
          "message_to_seller": order.remark,
          // "voucher_absorbed_by_seller": order.voucher_absorbed_by_seller,
          // "service_code": "",
          // "cod": 0,
          "goods_to_declare": 0,
          // "buyer_username": order.buyer_user.user_name,
          "recipient_address": {
            "phone": order.buyer_address_phone,
            "name": order.buyer_address_name,
            "full_address": order.shipping_address
          },
          "logistics_status": order.logistics_status,
          "status": order.status,
          "status_ext": order.status_ext,
          "return_id": order.return_id,
          "order_status": "",
          "sip_shop_id": "",
          "country_ext": "",
          "income_detail": JSON.stringify(order.transactionHistoryDetail),
          "total_amount": this.getTotalAmount(order),
          "goods_price": Math.abs(order.transactionHistoryDetail.payment_info.merchant_subtotal.product_price),
          "actual_shipping_cost": Math.abs(order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf),
          "shipping_fee": Math.abs(order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_buyer),
          "estimated_shipping_fee": Math.abs(order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_buyer),
          "shipping_rebate": Math.abs(order.transactionHistoryDetail.buyer_payment_info.shopee_coins_redeemed),
          "voucher_price": Math.abs(order.transactionHistoryDetail.buyer_payment_info.seller_voucher),
          "card_txn_fee": Math.abs(order.transactionHistoryDetail.payment_info.fees_and_charges.transaction_fee),
          "comm_fee": Math.abs(order.transactionHistoryDetail.payment_info.fees_and_charges.transaction_fee),
          "tax_amount": Math.abs(order.transactionHistoryDetail.buyer_payment_info.tax_amount) || 0,
          "seller_service_fee": Math.abs(order.transactionHistoryDetail.payment_info.fees_and_charges.service_fee),
          "shopee_rebate": Math.abs(order.transactionHistoryDetail.payment_info.rebate_and_voucher.product_discount_rebate_from_shopee),
          "escrow_amount": Math.abs(order.transactionHistoryDetail.amount),
          "needCheckactualShippingCost": Math.abs(order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf),
          "items": this.getItems(order),
          "apply_time": this.getApplyTime(order),
          "log_current_status": order.ordeTrackingHistory.history[0].new_status,
          "order_logistics_info": "",
          "ckeckOrderSnKey": this.getCheckKey(order),
          "checkOrderSnKeyNew": this.getCheckKeyNew(order)
        }
        paramsArr.push(params)
        console.log(paramsArr)
        //线上接口
        // let res = await this.$api.uploadOrderSave({
        //   paramsArr
        // })
        //测试接口
        if (this.syncStatus.value === 'refund') {
          let res = await this.$api.uploadOrderAfterSale({
            "afterOrderData": paramsArr,
            "sysMallId": this.mall.id,
            "mallId": this.mall.platform_mall_id
          })
          console.log(this.mall, "上报after", res)
        } else {
          let res = await this.$api.uploadOrderSaveTest({
            "orderData": paramsArr,
            "sysMallId": this.mall.id,
            "mallId": this.mall.platform_mall_id
          })
          console.log(this.mall, "上报", res)
        }

      }
    } catch (error) {
      console.log(error)
    }

  }
  //售后订单上报
  async afterUpLoadOrders(order) {
    try {
      let paramsArr = []
      let params = {
        "return_detail_info": {
          "buyer_images": order.refundDetail.buyer_images,
          "return_pickup_address": order.refundDetail.return_pickup_address?order.refundDetail.return_pickup_address:'',
          "return_address": order.refundDetail.return_address.address.replace('\n',""),
          "requested_time": '',
          "tracking_number": order.refundDetail.tracking_number,
          "buyer": {
            "portrait": order.buyer.portrait || '',
            "shop_id": order.buyer.shop_id || '',
            "followed": true,
            "id": order.buyer.id || '',
            "name": order.buyer.name || ''
          },
          "return_delivery_time": ''
        },
        "return_id": order.return_id,
        "return_sn": order.return_sn,
        "order_id": order.order_id,
        "return_channel_id": order.return_channel_id?order.return_channel_id:0,
        "text_reason": order.refundDetail.text_reason,
        "reason_id": order.refundDetail.reason,
        "ctime":  this.dealWithCtime(order),//  order.return_header.attribute_list, //return_attributes
        // "mtime": order, //
        "refund_amount": order.refund_amount, //
        "refund_total_price": order.amount_before_discount, //
        "status": order.status, //
        // "currency":"", //不传
        // "judging_time":"", //不传
        // "accepted_time":"", //不传
        // "cancelled_time":"", //不传
        "closed_time":order.refundDetail.closed_time, //售后关闭时间
        // "refund_paid_time":"", //不传
        // "requested_time":"", //不传
        "return_item":this.dealWithReturnTime(order),
        "ckeckAfterOrderSnKey": this.getCheckRefundKey(order)
      }
      paramsArr.push(params)
      console.log(paramsArr)
      //线上接口
      // let res = await this.$api.uploadOrderSave({
      //   paramsArr
      // })
      //测试接口
      let res = await this.$api.uploadOrderAfterSale({
        "afterOrderData": paramsArr,
        "sysMallId": this.mall.id,
        "mallId": this.mall.platform_mall_id
      })
      if(res.data.code === 200){
        return true
      }else{
        return false
      }
      console.log(this.mall, "上报after", res)
    } catch (error) {
      console.log(error)
    }

  }
  //chulictime
  dealWithCtime(order){
    let ctime = 0
    if(order.return_header&&order.return_header.attribute_list&&order.return_header.attribute_list.return_attributes){
      let par = order.return_header.attribute_list.return_attributes.find(item=>{return item.key === 'heimao_contact_by'})
      ctime = par.value || 0
    }
    return ctime
  }
  //处理售后验证key //return_id_status_mtime 组成
  getCheckRefundKey(order){
    let key = ''
    key = `${order.return_id}'_'${order.status}'_'${order.mtime?order.mtime:0}`
    return key
  }
  //处理return_item 取：order_product_list，若存在捆绑销售的活动，售后获取商品信息则取：bundle_deal_product_list
  dealWithReturnTime(order){
    let list = []
    order.order_product_list.forEach(item=>{
      let params = {
        "price": item.model.price,
        "modelid":item.model.id,
        "sku":item.model.sku,
        "itemid":item.product.id,
        "id":item.product.id,
        "price_before_discount":item.product.price,
      }
      list.push(params)
    })
    return list
  }
  //处理delivery_time
  getDeliveryTime(order) {
    let res = 0
    console.log(site_mall)
    let logi = site_mall.find(item => {
      return item.ShipId == order.logistics_channel
    })
    console.log(logi)
    if (!logi) {
      return res
    }
    if (order.logistics_status > 1) {
      if (logi.IsDeafult) {
        //第三方物流：直接获取最后一条数据   获取物流轨迹的发货时间接口
        res = order.logisticsTrackingHistory.list[0].tracking_info[order.logisticsTrackingHistory.list[0].tracking_info.length - 1].ctime
      } else {
        //平台物流：抓取倒数第二条数据   获取物流轨迹的发货时间接口
        res = order.logisticsTrackingHistory.list[0].tracking_info[order.logisticsTrackingHistory.list[0].tracking_info.length - 1 - 1].ctime
      }
    }
    return res
  }
  //处理tracking_no
  getTrackingNo(order) {
    let res = ''
    let data = order.forderLogistics && order.forderLogistics.list && order.forderLogistics.list[0] && order.forderLogistics.list[0].forders && order.forderLogistics.list[0].forders[0].third_party_tn || ''
    res = data || order.forderLogistics.list[0].consignment_no
    return res
  }
  //处理total_amount
  getTotalAmount(order) {
    /**
     * 订单交易记录接口下的data.buyer_payment_info下的部分值和的绝对值
        merchant_subtotal：买家支付总和
        shipping_fee：运费
        import_tax：进口税
        seller_voucher：卖家优惠金额
        shopee_coins_redeemed：Shopee币回扣金额
        shopee_voucher：平台优惠金额
        credit_card_promotion：信用卡交易费用
        total_amount= Math.Abs(merchant_subtotal+shipping_fee+import_tax+seller_voucher+shopee_coins_redeemed+shopee_voucher+credit_card_promotion）
     */
    let res = 0
    let merchant_subtotal = order.transactionHistoryDetail.buyer_payment_info.merchant_subtotal || 0
    let shipping_fee = order.transactionHistoryDetail.buyer_payment_info.shipping_fee || 0
    let import_tax = order.transactionHistoryDetail.buyer_payment_info.import_tax || 0
    let seller_voucher = order.transactionHistoryDetail.buyer_payment_info.seller_voucher || 0
    let shopee_coins_redeemed = order.transactionHistoryDetail.buyer_payment_info.shopee_coins_redeemed || 0
    let shopee_voucher = order.transactionHistoryDetail.buyer_payment_info.shopee_voucher || 0
    let credit_card_promotion = order.transactionHistoryDetail.buyer_payment_info.credit_card_promotion || 0
    res = Math.abs(merchant_subtotal + shipping_fee + import_tax + seller_voucher + shopee_coins_redeemed + shopee_voucher + credit_card_promotion) || 0
    return res
  }
  //组装CheckKey
  /**
   * 上报信息里面的一些信息的拼接（订单唯一key）,用"_"拼接
    actual_shipping_cost 为空时，用0替代
    key='order_sn + status'_'status_ext'_'logistics_status'_'log_current_status'_'update_time'_'tracking_no'_'actual_shipping_cost'
   */
  getCheckKey(order) {
    let key = ''
    let update_time = order.ordeTrackingHistory && order.ordeTrackingHistory.history && order.ordeTrackingHistory.history[0] && order.ordeTrackingHistory.history[0].ctime || 0
    let tracking_no = order.shipping_traceno || this.getTrackingNo(order)
    let actual_shipping_cost = Math.abs(order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf) || 0
    let log_current_status = order && order.ordeTrackingHistory && order.ordeTrackingHistory.history && order.ordeTrackingHistory.history[0] && order.ordeTrackingHistory.history[0].new_status || ''
    key = order.order_sn + '_' + order.status + '_' + order.status_ext + '_' + order.logistics_status + '_' + log_current_status + '_' + update_time + '_' + tracking_no + '_' + actual_shipping_cost
    return key
  }

  //组装CheckKeyNew
  /**
   * 
   * 上报信息里面的一些信息的拼接（订单唯一key  新）,用"_"拼接
    key=' status'_'status_ext'_'logistics_status'_'log_current_status'
    如果订单同步类型为“single”或者为空时此key为空
   */
  getCheckKeyNew(order) {
    let key = ''
    let log_current_status = order && order.ordeTrackingHistory && order.ordeTrackingHistory.history && order.ordeTrackingHistory.history[0] && order.ordeTrackingHistory.history[0].new_status || ''
    let actual_shipping_cost = order && order.transactionHistoryDetail && order.transactionHistoryDetail.payment_info && order.transactionHistoryDetail.payment_info.shipping_subtotal && order.transactionHistoryDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf || 0
    key = order.order_sn + '_' + order.status + '_' + order.status_ext + '_' + order.logistics_status + '_' + log_current_status + '_' + actual_shipping_cost
    return key
  }
  // 处理 apply_time
  /**
   * shopee订单历史轨迹接口
    if(data.history[0].new_status ==16&&data.history[0].old_status ==2)
    apply_time=data.history[0]。ctime
    else
    apply_time=""
   */
  getApplyTime(order) {
    let res = ''
    if (order.ordeTrackingHistory.history[0].new_status === 16 && order.ordeTrackingHistory.history[0].old_status === 2) {
      res = order.ordeTrackingHistory.history[0].ctime
    }
    return res
  }
  //处理items
  getItems(order) {
    let orderItem = []
    order.order_items.forEach(item => {
      let product = item.product
      let itemModel = item.item_model
      let bundleDealProducts = item.bundle_deal_product
      let bundleDealModels = item.bundle_deal_model

      let is_wholesale = item.is_wholesale === true ? "1" : "0";
      let item_status = item.status;
      let item_lists = item.item_list || [];
      let item_lists_arr = []
      let actual_item_price = 0
      let rate = 0
      if (item_lists.length) {
        item_lists.forEach(itemList => {
          actual_item_price += itemList.item_price
        })
        rate = item.order_price / actual_item_price
        item_lists.forEach(itemList => {
          let itemListObj = {
            "actual_item_price": itemList.item_price * rate,
            "amount": itemList.amount,
            "snapshotid": itemList.snapshot_id,
            "modelid": itemList.model_id,
          }
          item_lists_arr.push(itemListObj)
        })
      } else {
        let itemListObj = {
          "actual_item_price": item.order_price,
          "amount": item.amount,
          "snapshotid": item.snapshot_id,
          "modelid": item.model_id,
        }
        item_lists_arr.push(itemListObj)
      }

      item_lists_arr.forEach((arrItem, i) => {
        let variation_discounted_price = arrItem["actual_item_price"];
        let variation_quantity_purchased = arrItem["amount"];
        let snapshotid = arrItem["snapshotid"];
        let modelid = arrItem["modelid"];

        let item_sku = "";
        let item_name = "";
        let catid = "";
        let images = [];
        let variation_original_price = "0";
        let item_id = "0";
        let variation_id = "0";
        let variation_name = "";
        let variation_sku = "";
        let ctime = ""; //商品创建时间

        if (bundleDealProducts.length > 0) {
          item_sku = bundleDealProducts[i]["sku"];
          item_name = bundleDealProducts[i]["name"];
          catid = bundleDealProducts[i]["cat_id"];
          images = (bundleDealProducts[i]["images"]);
          variation_original_price = bundleDealProducts[i]["price_before_discount"];
          item_id = bundleDealProducts[i]["item_id"];
          variation_discounted_price = bundleDealProducts[i]["price"];

          variation_id = bundleDealModels[i]["model_id"];
          variation_name = bundleDealModels[i]["name"];
          variation_sku = bundleDealModels[i]["sku"];
          ctime = bundleDealModels[i]("ctime");
        } else {
          item_sku = product["sku"];
          item_name = product["name"];
          catid = product["cat_id"];
          images = product["images"];
          variation_original_price = product["price_before_discount"];
          item_id = product["item_id"];

          variation_id = itemModel["model_id"];
          variation_name = itemModel["name"];
          variation_sku = itemModel["sku"];
          ctime = itemModel["ctime"];
        }

        let itemPrams = {}
        itemPrams["is_wholesale"] = is_wholesale.toString();
        itemPrams["variation_quantity_purchased"] = variation_quantity_purchased.toString();
        itemPrams["item_sku"] = item_sku.toString();
        itemPrams["item_name"] = item_name.toString();
        itemPrams["variation_id"] = variation_id.toString();
        itemPrams["variation_name"] = variation_name.toString();
        itemPrams["variation_sku"] = variation_sku.toString();
        itemPrams["variation_discounted_price"] = variation_discounted_price.toString();
        itemPrams["variation_original_price"] = variation_original_price.toString();
        itemPrams["item_id"] = item_id.toString();
        itemPrams["item_cat_id"] = catid.toString();
        itemPrams["item_images"] = images;
        itemPrams["weight"] = 0;
        itemPrams["item_status"] = item_status.toString();
        itemPrams["item_ctime"] = ctime.toString();
        orderItem.push(itemPrams)
      })
    })
    console.log(orderItem, "orderItem")
    return orderItem
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