import api from '../network/jx-request'
import shopeemanService from './shopeeman-service'
import commodityService from './commodity-service'
import AppConfig from './application-config'
import cheerio from 'cheerio'
import {
  randomWord
} from '../util/util'
import {
  site_mall
} from '../views/order-manager/components/orderCenter/orderCenter'
export default class {
  $api = api;
  $shopeemanService = new shopeemanService()
  $commodityService = new commodityService()
  $appConfig = new AppConfig()
  isStop = false;
  _this = null;
  pageSize = 40;
  writeLog = undefined
  orders = []
  schemaType = ''
  activeType = 'handle'
  isAuto = false // 是否自动同步
  isApplyForceFaceInfo = false // 是否强制申请面单
  // / <param name="isApplyForceFaceInfo">是否强制申请面单 </param>
  // / 增量同步运输中和已完成订单 同步面单时 false 启动后8分钟开始同步面单,4小时间隔            auto-third
  // / 全量同步订单 同步面单时 false 启动后5分钟开始同步面单,4小时间隔                         auto-first
  // / 定时同步仓库没有面单的订单时 true          启动后3分钟开始同步面单，每隔1小时监测一次
  // / 定时同步订单中没有面单的订单时 false    启动后2分钟开始同步面单，每隔2小时监测一次
  // / 仓库工作台同步面单时 true
  // / 发货管理-单个申请运输单号信息时 true
  // / 发货管理-批量下载面单信息时 询问用户“是否同时批量同步台湾站点的面单（同步台湾站的面单将会缩短发货时效，请谨慎选择）” 如此文档第一张截图所示
  // / 发货管理-单个同步面单信息时 true
  // / 发货管理-批量下载拣货单时 false
  // / 海外仓商品出库- 获取面单信息时 true
  // / 即将过期订单- 申请虾皮物流单号时 true
  // / 即将过期订单- 同步面单时 true
  constructor(that, writeLog) {
    this._this = that
    this.writeLog = writeLog
  }

  // 自动同步流程（不能同步台湾面单）
  async autoStart() {
    this.isAuto = true
    this.activeType = 'auto'
    try {
      this.isApplyForceFaceInfo = false
      const res = await this.$api.getEmptyTrackingNoOrder()
      if (res.data.code === 200) {
        const arrList = res.data.data || []
        const arrFilter = arrList.filter(n => {
          return n.country != 'TW'
        })
        if (!arrFilter.length) {
          return this.writeLog(`【自动同步物流-面单】，终止-目前没有要同步的订单！`, false)
        }
        this.writeLog(`一共获取到需要自动同步的订单${arrFilter.length}条`, true)
        for (let i = 0; i < arrFilter.length; i++) {
          const order = arrFilter[i]
          await this.autoMainFlow(order)
        }
        this.writeLog(`自动同步物流-面单完成`, true)
      } else {
        this.writeLog('【自动同步物流-面单】，终止-获取待同步物流订单数据失败', false)
      }
    } catch (error) {
      console.log(error, 'error')
      return this.writeLog(`【自动同步物流-面单】，终止-${error}`, false)
    }
  }
  //仓库中面单
  async autoStartStore() {
    this.isAuto = true
    this.activeType = 'auto'
    try {
      this.isApplyForceFaceInfo = false
      const res = await this.$api.getNotHaveLogisticsInformations()
      if (res.data.code === 200) {
        const arrList = res.data.data || []
        let listResult = []
        arrList.forEach(item => {
          item.orders.forEach(sub => {
            sub.platform_mall_id = item.platform_mall_id
            listResult.push(sub)
          })
        })
        if (!listResult.length) {
          return this.writeLog(`【自动同步仓库中没有面单-面单】，终止-目前没有要同步的订单！`, false)
        }
        this.writeLog(`【仓库中没有面单】一共获取到需要自动同步的订单${listResult.length}条`, true)
        for (let i = 0; i < listResult.length; i++) {
          const order = listResult[i]
          await this.autoMainFlow(order)
        }
        this.writeLog(`自动仓库中没有面单完成`, true)
      } else {
        this.writeLog('【自动仓库中没有面单】，终止获取数据失败', false)
      }
    } catch (error) {
      return this.writeLog(`【自动仓库中没有面单】，终止-${error}`, false)
    }
  }
  //同步订单中没有面单
  async autoStartNoLogi() {
    this.isAuto = true
    this.activeType = 'auto'
    try {
      this.isApplyForceFaceInfo = false
      const res = await this.$api.getNoLogisticsOrders()
      if (res.data.code === 200) {
        const arrList = res.data.data || []
        let listResult = []
        arrList.forEach(item => {
          item.orders.forEach(sub => {
            sub.platform_mall_id = item.platform_mall_id
            listResult.push(sub)
          })
        })
        if (!listResult.length) {
          return this.writeLog(`【自动同步订单中没有面单-面单】，终止-目前没有要同步的订单！`, false)
        }
        this.writeLog(`【订单中没有面单】一共获取到需要自动同步的订单${listResult.length}条`, true)
        for (let i = 0; i < listResult.length; i++) {
          const order = listResult[i]
          await this.autoMainFlow(order)
        }
        this.writeLog(`自动同步物流-面单完成`, true)
      } else {
        this.writeLog('【自动同步物流-面单】，终止-获取待同步物流订单数据失败', false)
      }
    } catch (error) {
      console.log(error, 'error')
      return this.writeLog(`【自动同步物流-面单】，终止-${error}`, false)
    }
  }
  // 自动同步流程（不能同步台湾面单）
  async autoMainFlow(order) {
    if (order.country === 'TW') {
      return this.writeLog('自动流程不同步台湾站面单', false)
    }
    const mallId = order.platform_mall_id || (order.mall_info ? order.mall_info.platform_mall_id : '')
    const sysMallId = order.sys_mall_id || (order.mall_info ? order.mall_info.id : '') || ''
    const orderId = order.order_id || order.platform_order_id
    const country = order.country || ''
    const orderSn = order.order_sn || order.main_order_sn || order.platform_order_sn
    try {
      // 2、判断有无订单号
      let orderInfo = null
      if (orderId == 0 || !orderId) {
        // 2-1、无/api/v3/order/get_order_hint 订单搜索接口
        const params = {
          'keyword': orderSn,
          'shop_id': mallId
        }
        const res = await this.$shopeemanService.getOrderHint(country, params)
        orderInfo = res.code === 200 && res.data && res.data.orders && res.data.orders.length && res.data.orders[0] || null
      } else {
        // 2-2、有/api/v3/order/get_one_order 订单详情接口
        const params = {
          'order_id': orderId,
          'shop_id': mallId
        }
        const res = await this.$shopeemanService.getDetailsSinger(country, params)
        orderInfo = res.code === 200 && res.data || null
      }
      if (!orderInfo) {
        this.writeLog(`订单【${orderSn}】同步面单失败,获取订单详情失败,请检查店铺登录状态！`, false)
        return
      }
      // 检查是否有物流信息
      const trackInfo = this.checkTrackInfo(orderInfo)
      console.log(trackInfo, 'trackInfo')
      // 3、判断有无物流单号
      if (trackInfo.trackingNo) {
        // 3-1、有,下载面单 并上报物流
        await this.uploadTrackingNo(sysMallId, mallId, orderSn, trackInfo.trackingNo, trackInfo.logistics_channel)
        // 渲染表格
        await this.getPrintInfoFlow(sysMallId, orderInfo, country, trackInfo.trackingNo)
      } else {
        // 3-2、无 申请运单号
        const applyInfo = await this.applyOrderTrackingNo(orderId, mallId, orderInfo.logistics_channel, country, sysMallId, orderSn)
        console.log('applyInfo', applyInfo)
        if (applyInfo.code === 200) {
          await this.getPrintInfoFlow(sysMallId, orderInfo, country, applyInfo.data)
        } else {
          this.writeLog(`订单【${orderSn}】同步面单失败,获取运单号失败,${applyInfo.data}`, false)
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 手动同步
  async handleStart(orders, isApplyForceFaceInfo) {
    this.isAuto = false
    this.activeType = 'handle'
    this.isApplyForceFaceInfo = isApplyForceFaceInfo || false
    this.orders = orders
    for (let i = 0; i < orders.length; i++) {
      const order = orders[i]
      console.log(order)
      await this.handleMainFlow(order)
    }
    this.writeLog('面单同步已完成', true)
  }
  // 手动同步
  async handleMainFlow(order) {
    const mallId = order.platform_mall_id || (order.mall_info ? order.mall_info.platform_mall_id : '')
    const sysMallId = order.sys_mall_id || (order.mall_info ? order.mall_info.id : '')
    const orderId = order.order_id
    const country = order.country
    const orderSn = order.order_sn || order.main_order_sn
    try {
      // 2、判断有无订单号
      let orderInfo = null
      if (orderId == 0 || !orderId) {
        // 2-1、无/api/v3/order/get_order_hint 订单搜索接口
        const params = {
          'keyword': orderSn,
          'shop_id': mallId
        }
        const res = await this.$shopeemanService.getOrderHint(country, params)
        console.log(res, 'getOrderHint')
        orderInfo = res.code === 200 && res.data && res.data.orders && res.data.orders.length && res.data.orders[0] || null
      } else {
        // 2-2、有/api/v3/order/get_one_order 订单详情接口
        const params = {
          'order_id': orderId,
          'shop_id': mallId
        }
        const res = await this.$shopeemanService.getDetailsSinger(country, params)
        orderInfo = res.code === 200 && res.data || null
      }
      console.log(orderInfo, 'orderInfo', order)
      if (!orderInfo) {
        this.writeLog(`订单【${orderSn}】同步面单失败,获取订单详情失败,请检查店铺登录状态！`, false)
        return
      }
      // 检查是否有物流信息
      const trackInfo = this.checkTrackInfo(orderInfo)
      console.log(trackInfo, 'trackInfo')
      // 3、判断有无物流单号
      if (trackInfo.trackingNo) {
        // 3-1、有,下载面单,并上报物流
        await this.uploadTrackingNo(sysMallId, mallId, orderSn, trackInfo.trackingNo, trackInfo.logistics_channel)
        // 渲染表格
        const index = this._this.tableData.findIndex(m => {
          return m.order_sn === order.order_sn
        })
        if (index > -1) {
          this._this.$set(this._this.tableData[index], 'tracking_no', trackInfo.trackingNo)
        }
        if (order.country === 'TW') {
          await this.getPrintTWinfoFlow(sysMallId, orderInfo, country, trackInfo.trackingNo)
        } else {
          await this.getPrintInfoFlow(sysMallId, orderInfo, country, trackInfo.trackingNo)
        }
      } else {
        // 3-2、无 申请运单号
        const applyInfo = await this.applyOrderTrackingNo(orderId, mallId, orderInfo.logistics_channel, country, sysMallId, orderSn)
        console.log('applyInfo', applyInfo)
        if (applyInfo.code === 200) {
          // 并上报物流
          const index = this._this.tableData.findIndex(m => {
            return m.order_sn === order.order_sn
          })
          if (index > -1) {
            this._this.$set(this._this.tableData[index], 'tracking_no', applyInfo.data)
          }
          if (order.country === 'TW') {
            await this.getPrintTWinfoFlow(sysMallId, orderInfo, country, applyInfo.data)
          } else {
            await this.getPrintInfoFlow(sysMallId, orderInfo, country, applyInfo.data)
          }
        } else {
          this.writeLog(`订单【${orderSn}】同步面单失败，获取运单号失败,${applyInfo.data}`, false)
          return
        }
      }
    } catch (error) {
      console.log(error)
    }
  }
  // 检查是否有物流信息
  checkTrackInfo(orderInfo) {
    const trackInfo = {}
    trackInfo['orderId'] = orderInfo.order_id
    let trackNo = orderInfo.shipping_traceno
    if (!trackNo) {
      const logisticsExtra = JSON.parse(orderInfo.logistics_extra_data)
      if (logisticsExtra && logisticsExtra.sls_info && logisticsExtra.sls_info.last_mile_tracking_number) {
        trackNo = logisticsExtra.sls_info.last_mile_tracking_number
      }
    }
    trackInfo['trackingNo'] = trackNo
    trackInfo['logistics_channel'] = orderInfo.logistics_channel || ''
    return trackInfo
  }
  // 判断默认物流
  checkIsAutoApplyTrackingNumber(logisticsChannel) {
    const logisDefault = site_mall.find(n => {
      return n.ShipId == logisticsChannel
    })
    if (logisDefault && logisDefault.IsDeafult == true) {
      return true
    } else {
      return false
    }
  }
  // 申请物流单号
  async applyOrderTrackingNo(orderId, shopId, logisticsChannel, country, sysMallId, orderSn) {
    if (country === 'TW' && !this.isApplyForceFaceInfo) {
      return {
        code: 50001,
        data: '台湾站不强制申请物流单号'
      }
    }
    const configInfo = await this.$appConfig.getUserConfig()
    const configInfoObj = configInfo && JSON.parse(configInfo)
    console.log()
    // 设置信息中的是否自动申请Shopee物流单号选项
    if (country !== 'TW' && (!configInfoObj || !configInfoObj.is_apply_shopee_logistics)) {
      if (!this.isApplyForceFaceInfo) {
        return this.getShopeeShipNumber(orderId, shopId, country, sysMallId, orderSn) // 获取shopee运输单号
      }
    }
    // 判断所选择的运输方式能否申请物流单号  和店铺导入的那份物流信息比对，判断物流id的信息的default值是否为true orderInfo.logistics_channel
    const logisDefault = this.checkIsAutoApplyTrackingNumber(logisticsChannel)
    if (!logisDefault) {
      // 非默认物流 获取下运输单号
      return this.getShopeeShipNumber(orderId, shopId, country, sysMallId, orderSn, `不支持自动申请虾皮运输单号功能`) // 获取shopee运输单号
    }
    try {
      if (country === 'TW') {
        // 获取卖家真实姓名 api/v3/logistics/get_shop_seller_real_name
        const params = {
          shop_id: shopId
        }
        const userName = await this.$shopeemanService.getShopSellerRealName(country, params)
        let sellerUserName = userName == '' || !userName ? null : userName
        if (!sellerUserName) {
          sellerUserName = 'nick'
        }
        // 黑猫宅急便
        if (logisticsChannel == '30001') {
          // 申请黑猫的物流单号
          // 获取店铺信息/api/v3/general/get_shop/?
          const param = {
            shop_id: shopId
          }
          const ShopInfoResult = await this.$shopeemanService.getShop(country, param)
          const pickupAddressId = ShopInfoResult.code === 200 && ShopInfoResult.data.pickup_address_id || null
          if (!pickupAddressId) {
            return {
              code: 50002,
              data: 'no_address'
            }
          }
          // 获取申请时间/api/v3/shipment/get_pickup_time_slots/
          const para = {
            order_id: orderId,
            address_id: pickupAddressId,
            channel_id: logisticsChannel,
            shop_id: shopId
          }
          const pickTimeResult = await this.$shopeemanService.getPickupTimeSlots(country, para)
          const pickupTime = pickTimeResult.code === 200 && pickTimeResult.data.time_slots && pickTimeResult.data.time_slots[0].value || null
          console.log(pickTimeResult, pickupTime, 'pickTimeResult')
          console.log('ShopInfoResult', ShopInfoResult)
          if (!pickupTime) {
            return {
              code: 50003,
              data: 'no_pickup_time'
            }
          }
          // 进行物流单号的申请/api/v3/shipment/init_order/
          const pa = {
            order_id: orderId,
            channel_id: logisticsChannel,
            forder_id: orderId,
            seller_real_name: sellerUserName,
            pickup_time: pickupTime,
            seller_address_id: pickupAddressId,
            shop_id: shopId
          }
          // 申请Shopee物流单号
          const applyResult = await this.$shopeemanService.handleOutOrder(country, pa)
          console.log('applyResult11', applyResult)
        } else {
          const params = {
            order_id: orderId,
            channel_id: logisticsChannel,
            forder_id: orderId,
            seller_real_name: sellerUserName,
            shop_id: shopId
          }
          // 申请Shopee物流单号
          const applyResult = await this.$shopeemanService.handleOutOrder(country, params)
          console.log('applyResult22', applyResult)
        }
      } else {
        // 申请Shopee物流单号
        const params = {
          order_id: orderId,
          channel_id: logisticsChannel,
          forder_id: orderId,
          shop_id: shopId
        }
        const applyResult = await this.$shopeemanService.handleOutOrder(country, params)
        console.log('applyResult33', applyResult)
      }
      return this.getShopeeShipNumber(orderId, shopId, country, sysMallId, orderSn) // 获取shopee运输单号
    } catch (error) {
      console.log(error)
      return {
        code: 50004,
        data: 'catch - error'
      }
    }
  }
  async uploadTrackingNo(sysMallId, mallId, orderSn, trackNo, logisticsId) {
    const logisticsInfos = [{
      orderSn: orderSn,
      trackingNo: trackNo,
      logisticsId: logisticsId
    }]
    const params = {
      sysMallId: sysMallId,
      mallId: mallId,
      logisticsInfos: logisticsInfos
    }
    const res = await this.$commodityService.saveLogisticsInfo(sysMallId, mallId, logisticsInfos)
    const uploadInfo = JSON.parse(res)
    if (uploadInfo.code === 200) {
      this.writeLog(`订单【${orderSn}】同步物流成功，上报成功`, true)
    } else {
      this.writeLog(`订单【${orderSn}】同步物流失败，上报失败`, false)
    }
  }
  // 获取物流单号
  async getShopeeShipNumber(orderId, mallId, country, sysMallId, orderSn, warningType) {
    try {
      let trackNo = ''
      let channelId = ''
      const params = {
        order_id: orderId,
        shop_id: mallId
      }
      for (let i = 0; i < 3; i++) {
        const res = await this.$shopeemanService.getDropOff(country, params)
        if (!res || !res.code === 200 || !res.data) {
          continue
        }
        let third_party_tn = res.data && res.data.list && res.data.list[0] && res.data.list[0].forders[0].third_party_tn || ''
        if (third_party_tn == null || third_party_tn == '') {
          third_party_tn = res.data.consignment_no || ''
        }
        channelId = res.data && res.data.channel_id || ''
        trackNo = third_party_tn || ''
        if (trackNo === '') {
          continue
        } else {
          break
        }
      }
      if (trackNo) {
        await this.uploadTrackingNo(sysMallId, mallId, orderSn, trackNo, channelId)
        return {
          code: 200,
          data: trackNo
        }
      } else {
        return {
          code: 50005,
          data: warningType || '未获取到物流单号'
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
  // 获取其它站点的面单信息
  async getPrintInfoFlow(sysMallId, order, country, trackingNo) {
    try {
      // 1、获取面单类型
      const res1 = await this.getPrintWaybillType(order.shop_id, country)
      if (!(res1.code === 200 && res1.data)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败[501]`, false)
        return
      }
      this.writeLog(`订单【${order.order_sn}】获取面单类型成功`, true)
      const fileType = res1.data.waybill_type
      console.log(fileType, res1, 'fileType')
      // 2、获取包裹号
      const packParams = [{
        'order_id': Number(order.order_id),
        'shop_id': Number(order.shop_id),
        'region_id': country
      }]
      const res2 = await this.checkPackagePrintWaybillMultiShop(packParams, order.shop_id, country)
      if (!(res2.code === 200 && res2.data.list && res2.data.list.length && res2.data.list[0].package_number)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，未获取到包裹号[502]`, false)
        return
      }
      this.writeLog(`订单【${order.order_sn}】获取包裹号成功`, true)
      const packageNumber = res2.data.list[0].package_number
      // 3、获取面单打印配置
      let schemaType = await this.getSdConfig(order.shop_id, country)
      console.log(schemaType, 'schemaType')
      if (!schemaType) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[503]`, false)
        return
      }
      this.writeLog(`订单【${order.order_sn}】获取面单打印配置成功`, true)
      if (country === 'VN' && fileType === 'NORMAL') {
        schemaType = 2
      }
      if (fileType === 'THERMAL') {
        schemaType = 3
      }
      // 4、创建面单打印任务
      const packList = [{
        'order_id': Number(order.order_id),
        'package_number': packageNumber,
        'region_id': country,
        'shop_id': Number(order.shop_id),
        'channel_id': Number(order.logistics_channel)
      }]
      const res4 = await this.createSdJobsMultiShop(packList, order.shop_id, country, fileType + '_PDF', 'Air Waybill.' + order.actual_carrier, schemaType)
      if (!(res4.code === 200 && res4.data.list && res4.data.list.length && res4.data.list[0].job_id)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，创建打印任务失败[504]`, false)
        return
      }
      this.writeLog(`订单【${order.order_sn}】创建打印任务成功`, true)
      const jobId = res4.data.list[0].job_id
      // 5、下载面单信息
      const downRes = await this.downloadSdJob(order.shop_id, jobId, country)
      if (downRes.code !== 200) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，${downRes.message}`, false)
        return
      }
      const bytes = downRes.data
      if (!bytes) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败`, false)
        return
      }
      // 6、checkInfo
      const res6 = await this.checkFaceInfo(bytes, order.order_sn, trackingNo, order.actual_carrier, country, schemaType, order)
      if (res6.code !== 200) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，${res6.data}[508]`, false)
        return
      }
      // 7、上报面单信息
      await this.uploadFaceInfo(sysMallId.toString(), order.shop_id.toString(), order.order_sn.toString(), res6.data, '.PDF')
    } catch (error) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[000]`, false)
      console.log(error)
    }
  }
  // 上报面单信息
  async uploadFaceInfo(sysMallId, mallId, orderSn, cutBase64, suffix) {
    const name = randomWord(false, 32) + '_' + new Date().getTime() + suffix
    const url = await this._this.$ossService.uploadFile(cutBase64, name)
    console.log('url', url)
    if (url) {
      // 7、上报面单信息
      const faceSheetInfos = [{
        url: url,
        orderSn: orderSn.toString(),
        is_auto: this.isAuto
      }]
      const params = {
        sysMallId: sysMallId.toString(),
        mallId: mallId,
        faceSheetInfos: faceSheetInfos
      }
      console.log(params)
      const res = await this.$commodityService.saveFaceSheetInfo(sysMallId, mallId, faceSheetInfos)
      const res7 = JSON.parse(res)
      console.log(res7, 'res7')
      if (res7 && res7.code === 200) {
        // 更新表格
        if (this.activeType === 'handle') {
          const index = this._this.tableData.findIndex(m => {
            return m.order_sn === orderSn
          })
          if (index > -1) {
            this._this.$set(this._this.tableData[index], 'hasLogistics', '1')
          }
        }
        return this.writeLog(`订单【${orderSn}】同步面单成功,上报成功`, true)
      } else {
        return this.writeLog(`订单【${orderSn}】同步面单失败，上报失败，${res7.data.message}`, false)
      }
    } else {
      return this.writeLog(`订单【${orderSn}】获取面单异常！`, false)
    }
  }

  // 获取台湾站点的面单信息
  async getPrintTWinfoFlow(sysMallId, order, country = 'TW', trackingNo) {
    try {
      if (order.logistics_channel == '30001') {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，黑猫无面单`, false)
        return null
      }
      // 1、获取面单类型
      const fileType = order.logistics_channel == '30012' ? 'THERMAL_PDF' : 'C2C_SHIPPING_LABEL_HTML'
      // 2、获取包裹号
      const packParams = [{
        'order_id': Number(order.order_id),
        'shop_id': Number(order.shop_id),
        'region_id': country
      }]
      const res2 = await this.checkPackagePrintWaybillMultiShop(packParams, order.shop_id, country)
      if (!(res2.code === 200 && res2.data.list && res2.data.list.length && res2.data.list[0].package_number)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，未获取到包裹号[502]`, false)
        return
      }
      const packageNumber = res2.data.list[0].package_number
      // 3、获取面单打印配置
      let schemaType = null
      if (order.logistics_channel == '30012') {
        schemaType = 3
      } else {
        schemaType = await this.getSdConfig(order.shop_id, country)
        console.log(schemaType, 'schemaType')
      }
      if (!schemaType) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，获取面单打印配置失败[503]`, false)
        return
      }
      // 4、创建面单打印任务
      const packList = [{
        'order_id': Number(order.order_id),
        'package_number': packageNumber,
        'region_id': country,
        'shop_id': Number(order.shop_id)
      }]
      const res4 = await this.createSdJobsMultiShop(packList, order.shop_id, country, fileType, '寄件单' + order.actual_carrier, schemaType)
      console.log('res4', res4)
      if (!(res4.code === 200 && res4.data.list && res4.data.list.length && res4.data.list[0].job_id)) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，创建打印任务失败`, false)
        return
      }
      const jobId = res4.data.list[0].job_id
      const base64 = await this.downloadTwFace(order, jobId, country, trackingNo)
      // console.log("base64",base64)
      if (base64) {
        if (order.logistics_channel == '30005' || order.logistics_channel == '30006') {
          // 直接上报
          await this.uploadFaceInfo(sysMallId.toString(), order.shop_id.toString(), order.order_sn.toString(), base64, '.html')
        } else {
          const checkRes = await this.checkFaceInfo(base64, order.order_sn, trackingNo, order.actual_carrier, country, schemaType)
          console.log(checkRes, 'checkRes')
          if (checkRes.code !== 200) {
            this.writeLog(`订单【${order.order_sn}】同步面单失败，${checkRes.data}`, false)
            return
          } else {
            // 7、上报面单信息
            await this.uploadFaceInfo(sysMallId.toString(), order.shop_id.toString(), order.order_sn.toString(), checkRes.data, '.PDF')
          }
        }
      } else {
        this.writeLog(`订单【${order.order_sn}】同步面单失败，下载面单失败`, false)
        return
      }
    } catch (error) {
      console.log('error', error)
    }
  }
  // 下载台湾站面单
  async downloadTwFace(order, jobId, country, trackingNo) {
    console.log(order.logistics_channel, 'order.logistics_channel')
    // //7-11的面单信息 -HTML
    if (order.logistics_channel == '30005') {
      const faceData = await this.downloadSdJobTW(order.shop_id, jobId, country)
      if (!faceData) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败`, false)
        return null
      }
      return this.get711FaceInfo(trackingNo, faceData)
    }
    // 全家面单信息
    if (order.logistics_channel == '30006') {
      const faceData = await this.downloadSdJobTW(order.shop_id, jobId, country)
      // console.log(faceData,"faceData")
      if (!faceData) {
        this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败]`, false)
        return
      }
      return this.getQuanJiaFaceInfo(trackingNo, faceData, order.shop_id)
    }
    const downRes = await this.downloadSdJob(order.shop_id, jobId, country)
    if (downRes.code !== 200) {
      this.writeLog(`订单【${order.order_sn}】同步面单失败,下载失败,${downRes.message}`, false)
      return null
    }
    return downRes.data
  }
  // 莱尔富经济包的面单信息
  async getLaiErFuFace(orderId, shopId) {
    // /api/v3/logistics/get_waybill_list
    const params = {

    }
    const res = await this.$shopeemanService.getLaiErFuFace('TW', params)
  }
  // 711面单类型
  async get711FaceInfo(trackingNo, faceData) {
    const $ = cheerio.load(faceData)
    const tempvar = $('input[name="tempvar"]')[0].attribs.value || undefined
    if (!tempvar) {
      return null
    }
    const params = {
      'PinCodeNumber': trackingNo,
      'tempvar': tempvar,
      'NewWindow': 'Y',
      'BackTag': 'https://seller.shopee.tw/portal/sale/'
    }
    const options = {
      headers: {
        'Referer': 'https://epayment.7-11.com.tw/C2C/C2CWeb/C2C.aspx',
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded',
        'isGBK': false
      }
    }
    options['params'] = params
    const res = await window['NetMessageBridgeService'].post('https://epayment.7-11.com.tw/C2C/C2CWeb/PrintC2CPinCode.aspx', JSON.stringify(options), JSON.stringify(params))
    const resObj = JSON.parse(res)
    let finishFaceData = resObj.data
    if (finishFaceData && finishFaceData.includes(trackingNo)) {
      finishFaceData = finishFaceData.replaceAll('css/C2CPrint.css', 'https://epayment.7-11.com.tw/C2C/C2CWeb/css/C2CPrint.css')
        .replaceAll('BarCode.ashx?CodeValue=', 'https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode.ashx?CodeValue=')
        .replaceAll('QRCode.ashx?CodeValue=', 'https://epayment.7-11.com.tw/C2C/C2CWeb/QRCode.ashx?CodeValue=')
        .replaceAll('BarCode128.ashx?CodeValue=', 'https://epayment.7-11.com.tw/C2C/C2CWeb/BarCode128.ashx?CodeValue=')
      const base64 = await window['BaseUtilBridgeService'].htmlToBase64(finishFaceData)
      return base64
    } else {
      return null
    }
  }
  dataURLtoFile(base64File, filename) {
    var arr = base64File.split(',')
    var mime = arr[0].match(/:(.*?);/)[1]
    var bstr = atob(arr[1])
    var n = bstr.length
    var u8arr = new Uint8Array(n)
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n)
    }
    return new File([u8arr], filename, {
      type: mime
    })
  }
  // 全家面单类型
  async getQuanJiaFaceInfo(trackingNo, faceData, shopID) {
    try {
      const $ = cheerio.load(faceData)
      const ApiKey = $('input')[0].attribs.value
      let Data = $('input')[1].attribs.value
      Data = Data.replace('&lt;', '<').replace('&gt;', '>').replace('&#39;', "'")
      const TimeStamp = Number($('input')[2].attribs.value)
      const Signature = $('input')[3].attribs.value
      // 代理信息
      const mallInfo = await window['ConfigBridgeService'].getGlobalCacheInfo('mallInfo', shopID)
      const {
        mall_main_id,
        IPType
      } = JSON.parse(mallInfo)
      const params = {
        'ApiKey': ApiKey,
        'Data': Data,
        'TimeStamp': TimeStamp,
        'Signature': Signature
      }
      const options = {
        headers: {
          'Host': 'external2.shopee.tw',
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/78.0.3904.108 Safari/537.36',
          'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3',
          'isProxyMallId': mall_main_id.toString(),
          'Content-Type': 'application/x-www-form-urlencoded',
          'isGBK': false
        }
      }
      options['params'] = params
      const res = await window['NetMessageBridgeService'].post('https://external2.shopee.tw/ext/familymart/OrderPrint/OrderPrint.aspx', JSON.stringify(options), JSON.stringify(params))
      const resObj = JSON.parse(res)
      let finishFaceData = resObj.data
      if (!(finishFaceData && finishFaceData.includes('.gif'))) {
        return null
      }
      const $$ = cheerio.load(finishFaceData)
      console.log($$('img'))
      if ($$('img')) {
        const img = $$('img')[0].attribs.src
        const imageUrl = 'https://external2.shopee.tw/ext/familymart/OrderPrint/' + img
        finishFaceData = finishFaceData.replace(img, imageUrl)
        const base64 = await window['BaseUtilBridgeService'].htmlToBase64(finishFaceData)
        return base64
      } else {
        return null
      }
    } catch (error) {
      console.log(error)
      return null
    }
  }

  // 获取面单类型
  async getPrintWaybillType(mallId, country) {
    const params = {
      shop_id: mallId
    }
    const res = await this.$shopeemanService.getPrintWaybillType(country, params)
    console.log(res, '面单类型')
    return res
  }
  // 获取包裹号
  async checkPackagePrintWaybillMultiShop(orderInfolist, mallId, country) {
    const params = {
      'order_info_list': orderInfolist,
      'shop_id': mallId
    }
    const res = await this.$shopeemanService.checkPackagePrintWaybillMultiShop(country, params)
    // console.log(res, "包裹号")
    return res
  }
  // 获取面单打印配置
  async getSdConfig(mallId, country) {
    const params = {
      shop_id: mallId
    }
    const res = await this.$shopeemanService.getSdConfig(country, params)
    // console.log(res, "打印配置")
    let schemaType = null
    if (res.code === 200 && res.data && res.data.suggest_schema && res.data.suggest_schema.last_normal_selected_schema) {
      let flag = false
      const last_normal_selected_schem = res.data.suggest_schema.last_normal_selected_schema
      const suggest_default_schema = res.data.suggest_schema.suggest_default_schema
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
  // 创建面单打印任务
  async createSdJobsMultiShop(packList, mallId, country, fileType, fileName, schemaType) {
    const params = {
      'record_generate_schema': false,
      'package_list': packList,
      'generate_file_details': [{
        'file_type': fileType,
        'file_name': fileName,
        'file_contents': [schemaType]
      }],
      shop_id: mallId
    }
    const res = await this.$shopeemanService.createSdJobsMultiShop(country, params)
    // console.log(res, "创建面单打印任务")
    return res
  }
  // 下载面单信息
  async downloadSdJob(shop_id, job_id, country) {
    const params = {
      job_id: job_id,
      shop_id: shop_id
    }
    const res = await this.$shopeemanService.downloadSdJob(country, params)
    try {
      const data = res && JSON.parse(res.data)
      if (data && data.code === 0) {
        return {
          code: 200,
          data: res.rawBytes
        }
      } else {
        return {
          code: 50001,
          message: data.message || ''
        }
      }
    } catch (error) {
      return {
        code: 200,
        data: res.rawBytes
      }
    }
  }
  // 下载台湾面单信息
  async downloadSdJobTW(shop_id, job_id, country) {
    const params = {
      job_id: job_id,
      shop_id: shop_id
    }
    const res = await this.$shopeemanService.downloadSdJob(country, params)
    return res.data || ''
  }
  // 检查面单信息
  async checkFaceInfo(base64, orderSn, logisticsNumber, trackName, country, schemaType, order) {
    console.log(base64.length, orderSn, logisticsNumber, schemaType)
    if (base64 === null || base64.length < 500 || !orderSn || !logisticsNumber) {
      window['BaseUtilBridgeService'].checkAutoScriptLog(`[${orderSn}]面单长度小于500`)
      return {
        code: 50001,
        data: '面单大小或平台物流获取异常，请重新同步！'
      }
    }
    let cutBase64 = base64
    if (country == 'VN' && trackName == 'J&T Exoress' && schemaType == 2) {
      const cutRes = await this.cutFaseSize(base64, orderSn, true, 300, 420, -420)
      if (!(cutRes.code == 200 && cutRes.data)) {
        return {
          code: 50001,
          data: cutRes.msg
        }
      }
      cutBase64 = cutRes.code == 200 && cutRes.data || base64
    } else if (country == 'VN' && trackName == 'VNPost Nhanh') {
      const cutRes = await this.cutFaseSize(base64, orderSn, true, 300, 425, -420)
      if (!(cutRes.code == 200 && cutRes.data)) {
        return {
          code: 50001,
          data: cutRes.msg
        }
      }
      cutBase64 = cutRes.code == 200 && cutRes.data || base64
    } else if (country == 'ID') {
      const cutRes = await this.cutFaseSize(base64, orderSn, true, 425, 595, 0)
      if (!(cutRes.code == 200 && cutRes.data)) {
        return {
          code: 50001,
          data: cutRes.msg
        }
      }
      cutBase64 = cutRes.code == 200 && cutRes.data || base64
    }
    // console.log(orderSn, logisticsNumber, "check-check")
    // 检测面单
    const checkInfo = await window['BaseUtilBridgeService'].checkFaceInfo(cutBase64, orderSn, logisticsNumber)
    const checkInfoObj = JSON.parse(checkInfo)
    console.log(checkInfoObj, 'blobToDataURL')
    if (checkInfoObj.code === 200) {
      return {
        code: 200,
        data: cutBase64
      }
    } else {
      return {
        code: 50001,
        data: `订单【${orderSn}】获取面单异常, ${checkInfoObj.msg}`
      }
    }
  }
  // 处理越南首公里面单
  // async GetFirstMileFaceInfo(orderId, shopId) {
  //   let params = {
  //     orders: [{
  //       order_id: orderId,
  //       shop_id: shopId,
  //       region_id: 'VN'
  //     }],
  //     shop_id: shopId
  //   }
  //   let res = await this.$shopeemanService.getForderId('VN', params)
  //   console.log("res", res)
  //   return {
  //     code: 50001,
  //     data: `订单【${orderSn}】获取面单异常, ${checkInfoObj.msg}`
  //   }
  // }
  async cutFaseSize(base64, orderSn, isA4, pdfWidth, pdfHeight, locationY) {
    const model = {
      OrderNo: orderSn,
      IsUseA4Size: isA4,
      PdfWidth: pdfWidth,
      PdfHeight: pdfHeight,
      LocationY: locationY
    }
    console.log(base64, true, JSON.stringify(model))
    const res = await window['BaseUtilBridgeService'].getFaceData(base64, true, model)
    const objRes = res && JSON.parse(res)
    console.log(objRes, 'cutFaseSize')
    return objRes
  }
  blobToDataURL(blob, callBack) {
    var a = new FileReader()
    a.onload = function (e) {
      callBack(e.target.result)
    }
    a.readAsDataURL(blob)
    // return a;
  }
  // -------------------------------------------------------下载拣货单--------------------------------//
  async getPickListData(orderArr) {
    try {
      const orderGrop = this.dealWithMallOrderGroup(orderArr)
      const wayBillType = 'NORMAL'
      for (const key in orderGrop) {
        const orderList = orderGrop[key]
        const country = orderList[0].country
        const mallId = key
        const mallName = orderGrop[key][0].mall_info.platform_mall_name
        // console.log("orderList", orderList, country, mallId)
        for (let i = 0; i < orderList.length; i = i + 50) {
          const orderFifty = orderList.slice(i, i + 50)
          const orderInfolist = []
          orderFifty.forEach(item => {
            if (item.order_id != 0) {
              const obj = {
                'order_id': Number(item.order_id),
                'shop_id': Number(mallId),
                'region_id': country
              }
              orderInfolist.push(obj)
            }
          })
          console.log(orderInfolist, 'orderInfolist')
          const packInfo = await this.checkPackagePrintWaybillMultiShop(orderInfolist, mallId, country)
          console.log(packInfo, 'packInfo')
          if (packInfo.code === 200) {
            if (!packInfo.data.list.length) {
              this.writeLog(`店铺【${mallName}】当前数据没有可下载的拣货单`, false)
              continue
            } else {
              const packNums = packInfo.data.list
              const packList = []
              packNums.forEach(item => {
                const par = {
                  'order_id': Number(item.order_id),
                  'package_number': item.package_number,
                  'region_id': country,
                  'shop_id': Number(mallId)
                }
                packList.push(par)
              })
              const creatInfo = await this.createSdJobsMultiShop(packList, mallId, country, wayBillType + '_PDF', 'PickList', 0)
              // console.log(creatInfo)
              if (!(creatInfo.code === 200 && creatInfo.data.list && creatInfo.data.list.length && creatInfo.data.list[0].job_id)) {
                this.writeLog(`创建拣货单失败，${creatInfo.data}`, false)
              } else {
                const jobId = creatInfo.data.list[0].job_id
                const downRes = await this.downloadSdJob(mallId, jobId, country)
                if (downRes.code !== 200) {
                  this.writeLog(`店铺【${mallName}】下载拣货单失败，${downRes.message}`, false)
                  continue
                }
                const base64 = downRes.data
                if (!base64 || base64.length < 500) {
                  this.writeLog(`店铺【${mallName}】下载拣货单失败，稍后请重试`, false)
                  continue
                }
                const res = await window['BaseUtilBridgeService'].downloadPickForm(base64, mallName)
                const resObj = JSON.parse(res)
                if (resObj.code === 200) {
                  this.writeLog(`店铺【${mallName}】下载拣货单成功`, true)
                } else {
                  this.writeLog(`店铺【${mallName}】下载拣货单失败，${resObj.msg}`, false)
                }
              }
            }
          } else if (packInfo.code === 403) {
            this.writeLog(`店铺【${mallName}】下载拣货单失败,店铺未登录`, false)
          } else {
            this.writeLog(`店铺【${mallName}】下载拣货单失败`, false)
          }
        }
      }
    } catch (error) {
      console.log(error, 'error')
    }
    this.writeLog(`下载拣货单完成，请前往桌面【平台拣货单】文件夹查看`, true)
  }

  dealWithMallOrderGroup(orderList) {
    const orderGrop = {}
    for (let i = 0; i < orderList.length; i++) {
      const item = orderList[i]
      if (orderGrop[item.mall_info.platform_mall_id]) {
        orderGrop[item.mall_info.platform_mall_id].push(item)
      } else {
        orderGrop[item.mall_info.platform_mall_id] = []
        orderGrop[item.mall_info.platform_mall_id].push(item)
      }
    }
    return orderGrop
  }

  // ------------------------------------------------------------------------------------------------//
}