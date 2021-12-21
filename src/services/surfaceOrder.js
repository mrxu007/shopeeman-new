import api from '../network/jx-request'
import shopeemanService from './shopeeman-service'
import AppConfig from './application-config'
import cheerio from 'cheerio'
import html2canvas from "html2canvas"
import {
  randomWord,
  batchOperation
} from '../util/util'
import {
  site_mall
} from '../views/order-manager/components/orderCenter/orderCenter'
export default class {
  $api = api;
  $shopeemanService = new shopeemanService()
  $appConfig = new AppConfig()
  isStop = false;
  _this = null;
  pageSize = 40;
  writeLog = undefined
  orders = []
  schemaType = ''
  isApplyForceFaceInfo = false //是否强制申请面单
  /// <param name="isApplyForceFaceInfo">是否强制申请面单 </param>
  /// 增量同步运输中和已完成订单 同步面单时 false 启动后8分钟开始同步面单,4小时间隔
  /// 全量同步订单 同步面单时 false 启动后5分钟开始同步面单,4小时间隔
  /// 定时同步仓库没有面单的订单时 true          启动后3分钟开始同步面单，每隔1小时监测一次
  /// 定时同步订单中没有面单的订单时 false    启动后2分钟开始同步面单，每隔2小时监测一次
  /// 仓库工作台同步面单时 true
  /// 发货管理-单个申请运输单号信息时 true
  /// 发货管理-批量下载面单信息时 询问用户“是否同时批量同步台湾站点的面单（同步台湾站的面单将会缩短发货时效，请谨慎选择）” 如此文档第一张截图所示
  /// 发货管理-单个同步面单信息时 true
  /// 发货管理-批量下载拣货单时 false
  /// 海外仓商品出库- 获取面单信息时 true
  /// 即将过期订单- 申请虾皮物流单号时 true
  /// 即将过期订单- 同步面单时 true
  constructor(that, writeLog) {
    this._this = that
    this.writeLog = writeLog
  }

  //自动同步物流
  async startLogi(isApplyForceFaceInfo) {
    this.isApplyForceFaceInfo = isApplyForceFaceInfo
    let res = await this.$api.getEmptyTrackingNoOrder()
    if (res.data.code === 200) {
      let arrList = res.data.data || []
      // arrList
    } else {
      this.writeLog('获取待同步物流订单数据失败', false)
    }
    console.log("res", res)
  }

  //自动同步流程（不能同步台湾面单）
  async autoStart(order) {
    this.autoMainFlow(order)
  }
  //自动同步流程（不能同步台湾面单）
  async autoMainFlow(order) {
    if (order.country === 'TW') {
      return this.writeLog('自动流程不同步台湾站面单', false)
    }
    try {
      //2、判断有无订单号
      let orderInfo = null
      if (order.order_id == 0 || !order.order_id) {
        //2-1、无/api/v3/order/get_order_hint 订单搜索接口
        let params = {
          "keyword": order.order_sn,
          "shop_id": order.mall_info.platform_mall_id
        }
        let res = await this.$shopeemanService.getOrderHint(order.country, params)
        orderInfo = res.code === 200 && res.data && res.data.orders && res.data.orders.length && res.data.orders[0] || null
      } else {
        //2-2、有/api/v3/order/get_one_order 订单详情接口
        let params = {
          "order_id": order.order_id,
          "shop_id": order.mall_info.platform_mall_id
        }
        let res = await this.$shopeemanService.getDetailsSinger(order.country, params)
        orderInfo = res.code === 200 && res.data || null
      }
      console.log(orderInfo, "orderInfo", order)
      if (!orderInfo) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败[506]`, false)
        return
      }
      //检查是否有物流信息
      let trackInfo = this.checkTrackInfo(orderInfo)
      console.log(trackInfo, "trackInfo")
      //3、判断有无物流单号
      if (trackInfo.trackingNo) {
        //3-1、有,下载面单
        await this.getPrintInfoFlow(order.mall_info.id, orderInfo, order.country, trackInfo.trackingNo)
      } else {
        //3-2、无 申请运单号
        let applyInfo = await this.applyOrderTrackingNo(orderInfo.order_id, orderInfo.shop_id, orderInfo.logistics_channel, order.country)
        console.log("applyInfo", applyInfo)
        if (applyInfo.code === 200) {
          await this.getPrintInfoFlow(order.mall_info.id, orderInfo, order.country, applyInfo.data)
        } else {
          this.writeLog(`订单【${order.order_sn}】同步面单失败[507]-[${applyInfo.code}],${applyInfo.data}`, false)
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  //手动同步
  async handleStart(orders) {
    this.orders = orders
    orders.forEach(order => {
      console.log(order)
      this.handleMainFlow(order)
    })
  }
  //手动同步
  async handleMainFlow(order) {
    try {
      //2、判断有无订单号
      let orderInfo = null
      if (order.order_id == 0 || !order.order_id) {
        //2-1、无/api/v3/order/get_order_hint 订单搜索接口
        let params = {
          "keyword": order.order_sn,
          "shop_id": order.mall_info.platform_mall_id
        }
        let res = await this.$shopeemanService.getOrderHint(order.country, params)
        orderInfo = res.code === 200 && res.data && res.data.orders && res.data.orders.length && res.data.orders[0] || null
      } else {
        //2-2、有/api/v3/order/get_one_order 订单详情接口
        let params = {
          "order_id": order.order_id,
          "shop_id": order.mall_info.platform_mall_id
        }
        let res = await this.$shopeemanService.getDetailsSinger(order.country, params)
        orderInfo = res.code === 200 && res.data || null
      }
      console.log(orderInfo, "orderInfo", order)
      if (!orderInfo) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败[506]`, false)
        return
      }
      //检查是否有物流信息
      let trackInfo = this.checkTrackInfo(orderInfo)
      console.log(trackInfo, "trackInfo")
      //3、判断有无物流单号
      if (trackInfo.trackingNo) {
        //3-1、有,下载面单
        if (order.country === 'TW') {
          await this.getPrintTWinfoFlow(order.mall_info.id, orderInfo, order.country, trackInfo.trackingNo)
        } else {
          await this.getPrintInfoFlow(order.mall_info.id, orderInfo, order.country, trackInfo.trackingNo)
        }
      } else {
        //3-2、无 申请运单号
        let applyInfo = await this.applyOrderTrackingNo(orderInfo.order_id, orderInfo.shop_id, orderInfo.logistics_channel, order.country)
        console.log("applyInfo", applyInfo)
        if (applyInfo.code === 200) {
          if (order.country === 'TW') {
            await this.getPrintTWinfoFlow(order.mall_info.id, orderInfo, order.country, applyInfo.data)
          } else {
            await this.getPrintInfoFlow(order.mall_info.id, orderInfo, order.country, applyInfo.data)
          }
        } else {
          this.writeLog(`订单【${order.order_sn}】同步面单失败[507]-[${applyInfo.code}],${applyInfo.data}`, false)
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }


  //检查是否有物流信息
  checkTrackInfo(orderInfo) {
    let trackInfo = {}
    trackInfo['orderId'] = orderInfo.order_id
    let trackNo = orderInfo.shipping_traceno
    if (!trackNo) {
      let logisticsExtra = JSON.parse(orderInfo.logistics_extra_data)
      if (logisticsExtra && logisticsExtra.sls_info && logisticsExtra.sls_info.last_mile_tracking_number)
        trackNo = logisticsExtra.sls_info.last_mile_tracking_number
    }
    trackInfo['trackingNo'] = trackNo
    trackInfo['logistics_channel'] = orderInfo.logistics_channel || ''
    return trackInfo
  }
  //申请物流单号
  async applyOrderTrackingNo(orderId, shopId, logisticsChannel, country) {
    if (country === 'TW' && !this.isApplyForceFaceInfo) {
      return {
        code: 50001,
        data: '台湾站不强制申请物流单号'
      }
    }
    let configInfo = await this.$appConfig.getUserConfig()
    let configInfoObj = configInfo && JSON.parse(configInfo)
    //设置信息中的是否自动申请Shopee物流单号选项
    if (country !== 'TW' && (!configInfoObj || !configInfoObj.is_apply_shopee_logistics)) {
      if (!this.isApplyForceFaceInfo) {
        return this.getShopeeShipNumber(orderId, shopId, country); //获取shopee运输单号
      }
    }
    //判断所选择的运输方式能否申请物流单号  和店铺导入的那份物流信息比对，判断物流id的信息的default值是否为true orderInfo.logistics_channel
    let logisDefault = site_mall.find(n => {
      return n.ShipId == logisticsChannel
    })
    if (logisDefault && !logisDefault.IsDeafult) {
      //非默认物流 获取下运输单号
      return this.getShopeeShipNumber(orderId, shopId, country); //获取shopee运输单号
    }
    try {
      if (country === 'TW') {
        //获取卖家真实姓名 api/v3/logistics/get_shop_seller_real_name
        let params = {
          shop_id: shopId
        }
        let userName = await this.$shopeemanService.getShopSellerRealName(country, params)
        let sellerUserName = userName == '' || !userName ? null : userName
        if (!sellerUserName) {
          sellerUserName = 'nick'
        }
        //黑猫宅急便
        if (logisticsChannel == '30001') {
          //申请黑猫的物流单号
          //获取店铺信息/api/v3/general/get_shop/?
          let param = {
            shop_id: shopId
          }
          let ShopInfoResult = await this.$shopeemanService.getShop(country, param)
          let pickupAddressId = ShopInfoResult.code === 200 && ShopInfoResult.data.pickup_address_id || null
          if (!pickupAddressId) {
            return {
              code: 50002,
              data: "no_address"
            }
          }
          //获取申请时间/api/v3/shipment/get_pickup_time_slots/
          let para = {
            order_id: orderId,
            address_id: pickupAddressId,
            channel_id: logisticsChannel,
            shop_id: shopId
          }
          let pickTimeResult = await this.$shopeemanService.getPickupTimeSlots(country, para)
          let pickupTime = pickTimeResult.code === 200 && pickTimeResult.data.time_slots && pickTimeResult.data.time_slots[0].value || null
          console.log(pickTimeResult, pickupTime, "pickTimeResult")
          console.log("ShopInfoResult", ShopInfoResult)
          if (!pickupTime) {
            return {
              code: 50003,
              data: 'no_pickup_time'
            }
          }
          //进行物流单号的申请/api/v3/shipment/init_order/
          let pa = {
            order_id: orderId,
            channel_id: logisticsChannel,
            forder_id: orderId,
            seller_real_name: sellerUserName,
            pickup_time: pickupTime,
            seller_address_id: pickupAddressId,
            shop_id: shopId
          }
          //申请Shopee物流单号
          let applyResult = await this.$shopeemanService.handleOutOrder(country, pa)
          console.log("applyResult11", applyResult)
        } else {
          let params = {
            order_id: orderId,
            channel_id: logisticsChannel,
            forder_id: orderId,
            seller_real_name: sellerUserName,
            shop_id: shopId
          }
          //申请Shopee物流单号
          let applyResult = await this.$shopeemanService.handleOutOrder(country, params)
          console.log("applyResult22", applyResult)
        }
      } else {
        //申请Shopee物流单号
        let params = {
          order_id: orderId,
          channel_id: logisticsChannel,
          forder_id: orderIdd,
          shop_id: shopId
        }
        let applyResult = await this.$shopeemanService.handleOutOrder(country, params)
        console.log("applyResult33", applyResult)
      }
      return this.getShopeeShipNumber(orderId, shopId, country); //获取shopee运输单号
    } catch (error) {
      console.log(error)
      return {
        code: 50004,
        data: 'error'
      }
    }
  }
  //获取物流单号
  async getShopeeShipNumber(orderId, mallId, country) {
    console.log(orderId, mallId, country)
    try {
      let trackNo = ''
      let params = {
        order_id: orderId,
        shop_id: mallId
      }
      for (let i = 0; i < 3; i++) {
        console.log(orderId, mallId, country, params)
        let res = await this.$shopeemanService.getDropOff(country, params)
        console.log("--------", orderId, mallId, country, res)
        if (!res || !res.code === 200 || !res.data) {
          continue
        }
        let third_party_tn = res.data && res.data.list && res.data.list[0] && res.data.list[0].forders[0].third_party_tn || ''
        if (third_party_tn == null || third_party_tn == '') {
          third_party_tn = res.data.consignment_no || ''
        }
        trackNo = third_party_tn ? third_party_tn : ''
        if (trackNo === '') {
          continue
        } else {
          break
        }
      }
      if (trackNo === '') {
        return {
          code: 50005,
          data: '未获取到物流单号'
        }
      } else {
        return {
          code: 200,
          data: trackNo
        }
      }
    } catch (error) {
      console.log(error)
      return {
        code: 50006,
        data: 'error'
      }
    }
  }
  //获取其它站点的面单信息
  async getPrintInfoFlow(sysMallId, order, country, trackingNo) {
    try {
      //1、获取面单类型
      let res1 = await this.getPrintWaybillType(order.shop_id, country)
      if (!(res1.code === 200 && res1.data)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败[501]`, false)
        return
      }
      let fileType = res1.data.waybill_type
      console.log(fileType, res1, "fileType")
      //2、获取包裹号
      let packParams = [{
        "order_id": Number(order.order_id),
        "shop_id": Number(order.shop_id),
        "region_id": country
      }]
      let res2 = await this.checkPackagePrintWaybillMultiShop(packParams, order.shop_id, country)
      if (!(res2.code === 200 && res2.data.list && res2.data.list.length && res2.data.list[0].package_number)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，未获取到包裹号[502]`, false)
        return
      }
      let packageNumber = res2.data.list[0].package_number
      //3、获取面单打印配置
      let schemaType = await this.getSdConfig(order.shop_id, country)
      console.log(schemaType, "schemaType")
      if (!schemaType) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[503]`, false)
        return
      }
      if (country === 'VN' && fileType === 'NORMAL') {
        schemaType = 2
      }
      if (fileType === 'THERMAL') {
        schemaType = 3
      }
      //4、创建面单打印任务
      let packList = [{
        "order_id": Number(order.order_id),
        "package_number": packageNumber,
        "region_id": country,
        "shop_id": Number(order.shop_id),
        "channel_id": Number(order.logistics_channel)
      }]
      let res4 = await this.createSdJobsMultiShop(packList, order.shop_id, country, fileType + '_PDF', "Air Waybill." + order.actual_carrier, schemaType)
      if (!(res4.code === 200 && res4.data.list && res4.data.list.length && res4.data.list[0].job_id)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，创建打印任务失败[504]`, false)
        return
      }
      let jobId = res4.data.list[0].job_id
      //5、下载面单信息
      let bytes = await this.downloadSdJob(order.shop_id, jobId, country)
      if (!bytes) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败[505]`, false)
        return
      }
      //6、checkInfo
      let res6 = await this.checkFaceInfo(bytes, order.order_sn, trackingNo, order.actual_carrier, country, schemaType)
      console.log(res6, "res6")
      if (res6.code !== 200) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，${res6.data}[508]`, false)
        return
      }
      //7、上报面单信息
      let res7 = await this.uploadFaceInfo(sysMallId.toString(), order.shop_id.toString(), order.order_sn.toString(), res6.data)
      console.log(res7, "res7")
      // if (res7 && res7.code === 200) {
      //   this.writeLog(`订单【${order.order_sn}】同步面单成功`, true)
      // } else {
      //   this.writeLog(`订单【${order.order_sn}】同步面单失败，上报失败，${res7.msg}`, false)
      // }
    } catch (error) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[000]`, false)
      console.log(error)
    }
  }
  //上报面单信息
  async uploadFaceInfo(sysMallId, mallId, orderSn, cutBase64) {
    const name = randomWord(false, 32) + '_' + new Date().getTime() + '.PDF'
    const url = await this._this.$ossService.uploadFile(cutBase64, name)
    console.log("url", url)
    if (url) {
      //7、上报面单信息
      let params = {
        sysMallId: sysMallId.toString(),
        mallId: mallId,
        faceSheetInfos: [{
          url: url,
          orderSn: orderSn.toString()
        }]
      }
      console.log(params)
      let res7 = await this.$api.uploadOrderFaceSheetInfo(params)
      console.log(res7, "res7")
      if (res7 && res7.data.code === 200) {
        return this.writeLog(`订单【${orderSn}】同步面单成功,上报成功`, true)
      } else {
        return this.writeLog(`订单【${orderSn}】同步面单失败，上报失败，${res7.data.message}`, false)
      }

      // 线上接口
      // let res7 = await this.uploadFaceInfo(sysMallId.toString(), shopId, orderSn.toString(), url)
      // console.log(res7, "res7")
      // if (res7 && res7.code === 200) {
      //   return this.writeLog(`订单【${orderSn}】同步面单成功`, true)
      // } else {
      //   return this.writeLog(`订单【${orderSn}】同步面单失败，上报失败，${res7.msg}`, false)
      // }
    } else {
      return this.writeLog(`订单【${orderSn}】获取面单异常！`, false)
    }
  }
  //获取台湾站点的面单信息
  async getPrintTWinfoFlow(sysMallId, order, country='TW', trackingNo) {
    try {
    //莱尔富经济包面单
    if (order.logistics_channel == "30010") {

    } else if (order.logistics_channel == "30001") {
      return null;
    }
    //1、获取面单类型
    let fileType = order.logistics_channel == "30012" ? "THERMAL_PDF" : "C2C_SHIPPING_LABEL_HTML";
    //2、获取包裹号
    let packParams = [{
      "order_id": Number(order.order_id),
      "shop_id": Number(order.shop_id),
      "region_id": country
    }]
    let res2 = await this.checkPackagePrintWaybillMultiShop(packParams, order.shop_id, country)
    if (!(res2.code === 200 && res2.data.list && res2.data.list.length && res2.data.list[0].package_number)) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败，未获取到包裹号[502]`, false)
      return
    }
    let packageNumber = res2.data.list[0].package_number
    //3、获取面单打印配置
    let schemaType = null
    if (order.logistics_channel == "30012") {
      schemaType = 3
    } else {
      schemaType = await this.getSdConfig(order.shop_id, country)
      console.log(schemaType, "schemaType")
    }
    if (!schemaType) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[503]`, false)
      return
    }
    //4、创建面单打印任务
    let packList = [{
      "order_id": Number(order.order_id),
      "package_number": packageNumber,
      "region_id": country,
      "shop_id": Number(order.shop_id)
    }]
    let res4 = await this.createSdJobsMultiShop(packList, order.shop_id, country, fileType, "寄件单" + order.actual_carrier, schemaType)
    if (!(res4.code === 200 && res4.data.list && res4.data.list.length && res4.data.list[0].job_id)) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败，创建打印任务失败[504]`, false)
      return
    }
    let jobId = res4.data.list[0].job_id
    let base64 = await this.downloadTwFace(order,jobId,country,trackingNo)
    if(base64){
      if(order.logistics_channel == "30005" || order.logistics_channel == "30006"){
        //直接上报
        await this.uploadFaceInfo(sysMallId.toString(), order.shop_id.toString(), order.order_sn.toString(), base64)
      }else{

      }
      // const name = randomWord(false, 32) + '_' + new Date().getTime() + '.html'
      // const url = await this._this.$ossService.uploadFile(base64, name)
      // console.log(url,"twtwtwtwwtwt")
    }else{
      this.writeLog(`订单【${order.order_sn}】同步面单失败，下载面单失败[504]`, false)
      return
    }
  } catch (error) {
      console.log("error",error)
  }  
  }
  //下载台湾站面单
  async downloadTwFace(order,jobId,country,trackingNo){
    console.log(order.logistics_channel,"order.logistics_channel")
    ////7-11的面单信息 -HTML
    if (order.logistics_channel == "30005") {
      let faceData = await this.downloadSdJobTW(order.shop_id, jobId, country)
      // console.log(faceData,"faceData")
      if (!faceData) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败[505]`, false)
        return null
      }
       return this.get711FaceInfo(trackingNo, faceData)
    }
    //全家面单信息
    if (order.logistics_channel == "30006") {
      let faceData = await this.downloadSdJobTW(order.shop_id, jobId, country)
      console.log(faceData,"faceData")
      if (!faceData) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败[505]`, false)
        return
      }
      return this.getQuanJiaFaceInfo(trackingNo, faceData)
    }
    let faceData = await this.downloadSdJob(order.shop_id, jobId, country)
    console.log(faceData,"faceData")
    return true
  }
  //莱尔富经济包的面单信息
  async getLaiErFuFace(orderId, shopId) {
    // api/v3/get_waybill_list
  }
  //711面单类型
  async get711FaceInfo(trackingNo, faceData) {
    const $ = cheerio.load(faceData)
    let tempvar = $('input[name="tempvar"]')[0].attribs.value || undefined
    if(!tempvar){return null}
    let params = {
      'PinCodeNumber':trackingNo,
      'tempvar':tempvar,
      'NewWindow':'Y',
      'BackTag':"https://seller.shopee.tw/portal/sale/"
    }
    let options = {
      headers:{
        "Referer": "https://epayment.7-11.com.tw/C2C/C2CWeb/C2C.aspx",
        'User-Agent':'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'isGBK':false
      }
    }
    options['params'] = params
    let res= await window['NetMessageBridgeService'].post('https://epayment.7-11.com.tw/C2C/C2CWeb/PrintC2CPinCode.aspx',JSON.stringify(options),JSON.stringify(params))
    let resObj = JSON.parse(res)
    let finishFaceData = resObj.data
    if(finishFaceData && finishFaceData.includes(trackingNo)){
      finishFaceData = finishFaceData.replace("css/C2CPrint.css", "https://epayment.7-11.com.tw/C2C/C2CWeb/css/C2CPrint.css")
      .replace("BarCode.ashx?CodeValue=", "https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode.ashx?CodeValue=")
      .replace("QRCode.ashx?CodeValue=", "https://epayment.7-11.com.tw/C2C/C2CWeb/QRCode.ashx?CodeValue=")
      .replace("BarCode128.ashx?CodeValue=", "https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode128.ashx?CodeValue=");
      // console.log(finishFaceData,"res")
      var encode = encodeURI(finishFaceData);
      // 对编码的字符串转化base64
      var base64 = btoa(encode);
      // console.log(base64,"base64")
      return base64
    }else{
      return null
    }
  }
  dataURLtoFile(base64File, filename){
    var arr = base64File.split(","),
      mime = arr[0].match(/:(.*?);/)[1],
      bstr = atob(arr[1]),
      n = bstr.length,
      u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    return new File([u8arr], filename, { type: mime });
}
  //全家面单类型
  async getQuanJiaFaceInfo(trackingNo, faceData) {
    debugger
    const $ = cheerio.load(faceData)
    console.log($('input'),"11111111111111111111")
    return true
  }









  //获取面单类型
  async getPrintWaybillType(mallId, country) {
    let params = {
      shop_id: mallId
    }
    let res = await this.$shopeemanService.getPrintWaybillType(country, params)
    console.log(res, "面单类型")
    return res
  }
  //获取包裹号
  async checkPackagePrintWaybillMultiShop(orderInfolist, mallId, country) {
    let params = {
      "order_info_list": orderInfolist,
      "shop_id": mallId
    }
    let res = await this.$shopeemanService.checkPackagePrintWaybillMultiShop(country, params)
    console.log(res, "包裹号")
    return res
  }
  //获取面单打印配置
  async getSdConfig(mallId, country) {
    let params = {
      shop_id: mallId
    }
    let res = await this.$shopeemanService.getSdConfig(country, params)
    console.log(res, "打印配置")
    let schemaType = null
    if (res.code === 200 && res.data && res.data.suggest_schema && res.data.suggest_schema.last_normal_selected_schema) {
      let flag = false
      let last_normal_selected_schem = res.data.suggest_schema.last_normal_selected_schema
      let suggest_default_schema = res.data.suggest_schema.suggest_default_schema
      if ((last_normal_selected_schem.length < 1 && suggest_default_schema.length > 1) || last_normal_selected_schem.length > 1) {
        flag = true
      }
      if (flag || country === 'VN') {
        if (country === 'TW') {
          schemaType = 6
        } else if (country === 'MY' || country === 'PH' || country === 'VN') {
          schemaType = 3
        } else if (country === 'TH' || country === 'ID') {
          schemaType = 2
        } else {
          schemaType = Number(suggest_default_schema[1])
        }
      } else {
        schemaType = last_normal_selected_schem.length < 1 ? Number(suggest_default_schema[0]) : Number(last_normal_selected_schem[0])
      }
      return schemaType
    } else {
      return null
    }
  }
  //创建面单打印任务
  async createSdJobsMultiShop(packList, mallId, country, fileType, fileName, schemaType) {
    let params = {
      "record_generate_schema": false,
      "package_list": packList,
      "generate_file_details": [{
        "file_type": fileType,
        "file_name": fileName,
        "file_contents": [schemaType]
      }],
      shop_id: mallId
    }
    let res = await this.$shopeemanService.createSdJobsMultiShop(country, params)
    console.log(res, "创建面单打印任务")
    return res
  }
  //下载面单信息
  async downloadSdJob(shop_id, job_id, country) {
    let params = {
      job_id: job_id,
      shop_id: shop_id
    }
    let res = await this.$shopeemanService.downloadSdJob(country, params)
    console.log(res, "下载面单信息")
    return res.rawBytes || ''
  }
    //下载台湾面单信息
    async downloadSdJobTW(shop_id, job_id, country) {
      let params = {
        job_id: job_id,
        shop_id: shop_id
      }
      let res = await this.$shopeemanService.downloadSdJob(country, params)
      console.log(res, "下载面单信息")
      return res.data || ''
    }
  //检查面单信息
  async checkFaceInfo(base64, orderSn, logisticsNumber, trackName, country, schemaType) {
    console.log(base64.length, orderSn, logisticsNumber, schemaType)
    if (base64 === null || base64.length < 500 || !orderSn || !logisticsNumber) {
      return {
        code: 50001,
        data: "面单大小或平台物流获取异常，请重新同步！"
      }
    } else {
      let cutBase64 = base64
      // cutRes = await this.cutFaseSize(base64, orderSn, true, 300, 420, -420)
      if (country == 'VN' && trackName == 'J&T Exoress' && schemaType == 2) {
        let cutRes = await this.cutFaseSize(base64, orderSn, true, 300, 420, -420)
        if (!(cutRes.code == 200 && cutRes.data)) {
          return {
            code: 50001,
            data: cutRes.msg
          }
        }
        cutBase64 = cutRes.code == 200 && cutRes.data || base64
      } else if (country == 'VN' && trackName == 'VNPost Nhanh') {
        let cutRes = await this.cutFaseSize(base64, orderSn, true, 300, 425, -420)
        if (!(cutRes.code == 200 && cutRes.data)) {
          return {
            code: 50001,
            data: cutRes.msg
          }
        }
        cutBase64 = cutRes.code == 200 && cutRes.data || base64
      } else if (country == 'ID') {
        let cutRes = await this.cutFaseSize(base64, orderSn, true, 425, 595, 0)
        if (!(cutRes.code == 200 && cutRes.data)) {
          return {
            code: 50001,
            data: cutRes.msg
          }
        }
        cutBase64 = cutRes.code == 200 && cutRes.data || base64
      }
      // console.log(orderSn, logisticsNumber, "check-check")
      //检测面单
      let checkInfo = await window['BaseUtilBridgeService'].checkFaceInfo(cutBase64, orderSn, logisticsNumber)
      let checkInfoObj = JSON.parse(checkInfo)
      console.log(checkInfoObj, "blobToDataURL")
      if (checkInfoObj.code === 200) {
        return {
          code: 200,
          data: cutBase64
        }
      } else {
        return {
          code: 50001,
          data: `订单【${orderSn}】获取面单异常, ${checkInfoObj.data}`
        }
      }
    }
  }
  async cutFaseSize(base64, orderSn, isA4, pdfWidth, pdfHeight, locationY) {
    let model = {
      OrderNo: orderSn,
      IsUseA4Size: isA4,
      PdfWidth: pdfWidth,
      PdfHeight: pdfHeight,
      LocationY: locationY,
    }
    console.log(base64, true, JSON.stringify(model))
    let res = await window['BaseUtilBridgeService'].getFaceData(base64, true, model)
    let objRes = res && JSON.parse(res)
    console.log(objRes, "cutFaseSize")
    return objRes
  }
  blobToDataURL(blob, callBack) {
    var a = new FileReader();
    a.onload = function (e) {
      callBack(e.target.result)
    }
    a.readAsDataURL(blob);
    // return a;
  }
  //-------------------------------------------------------下载拣货单--------------------------------//

  async getPickListData(orderArr) {
    let orderGrop = this.dealWithMallOrderGroup(orderArr)
    console.log("orderGrop", orderGrop)
    let wayBillType = "NORMAL"
    for (const key in orderGrop) {
      let orderList = orderGrop[key]
      let country = orderList[0].country
      let mallId = key
      let mallName = orderGrop[key][0].mall_info.platform_mall_name
      console.log("orderList", orderList, country, mallId)
      for (let i = 0; i < orderList.length; i = i + 50) {
        let orderFifty = orderList.slice(i, i + 50)
        let orderInfolist = []
        orderFifty.forEach(item => {
          if (item.order_id != 0) {
            let obj = {
              "order_id": Number(item.order_id),
              "shop_id": Number(mallId),
              "region_id": country
            }
            orderInfolist.push(obj)
          }
        })
        console.log(orderInfolist, "orderInfolist")
        let packInfo = await this.checkPackagePrintWaybillMultiShop(orderInfolist, mallId, country)
        if (packInfo.code === 200) {
          if (!packInfo.data.list.length) {
            this.writeLog(`店铺【${mallName}】当前数据没有可下载的拣货单`, false)
            continue
          } else {
            let packNums = packInfo.data.list
            let packList = []
            packNums.forEach(item => {
              let par = {
                "order_id": Number(item.order_id),
                "package_number": item.package_number,
                "region_id": country,
                "shop_id": Number(mallId)
              }
              packList.push(par)
            })
            let creatInfo = await this.createSdJobsMultiShop(packList, mallId, country, wayBillType + '_PDF', "PickList", 0)
            console.log(creatInfo)
            if (!(creatInfo.code === 200 && creatInfo.data.list && creatInfo.data.list.length && creatInfo.data.list[0].job_id)) {
              this.writeLog(`创建拣货单失败，${creatInfo.data}`, false)
              // this.writeLog(`订单【${order.order_sn}】同步面单失败，创建打印任务失败[504]`, false)
            } else {
              let jobId = creatInfo.data.list[0].job_id
              let base64 = await this.downloadSdJob(mallId, jobId, country)
              let res = await window['BaseUtilBridgeService'].downloadPickForm(base64, mallName)
              let resObj = JSON.parse(res)
              if (resObj.code === 200) {
                this.writeLog(`店铺【${mallName}】下载拣货单成功`, true)
              } else {
                this.writeLog(`店铺【${mallName}】下载拣货单失败，${resObj.msg}`, false)
              }
            }
          }
        }
        console.log("packInfo", packInfo)
      }
    }
    this.writeLog(`下载拣货单完成`, true)
  }

  dealWithMallOrderGroup(orderList) {
    let orderGrop = {}
    for (let i = 0; i < orderList.length; i++) {
      let item = orderList[i]
      if (orderGrop[item.mall_info.platform_mall_id]) {
        orderGrop[item.mall_info.platform_mall_id].push(item)
      } else {
        orderGrop[item.mall_info.platform_mall_id] = []
        orderGrop[item.mall_info.platform_mall_id].push(item)
      }
    }
    return orderGrop
  }




  //------------------------------------------------------------------------------------------------//
}