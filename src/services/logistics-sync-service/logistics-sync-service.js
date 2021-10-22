import jxRequest from '../../network/jx-request'
import PddService from '../pdd-services/pdd-service'
import tborderDetail from '../tbOrder-detail'
import BaseUtilService from '../BaseUtilService'
import AliBaBaLogistic from '../AliBaBaLogistic'
import AppConfig from '../application-config'
import taobaoMallSendMessage from '../../util/sendMessage'
/**
 * 物流同步服务
 */
export default class logisticeSyncService {
  jdNetworkService = jxRequest.jdRequest
  jszNetworkService = jxRequest.jxRequest
  $appConfig = new AppConfig()
  $baseUtilService = new BaseUtilService()
  $api = jxRequest
  logCallback
  mode
  result = []
  malls
  allSeting
  LogisticsPush = null
  constructor(logCallback, mode) {
    this.logCallback = logCallback
    this.mode = mode
  }
  writeLog(log, success, setcolor) {
    if (this.logCallback) {
      this.logCallback(log, success, setcolor)
    }
  }
  /**
   * 开始同步
   * @param {*} buyerAccouns
   */
  async start(mall, buyerAccouns, singleOrders, LogisticsPush) {
    this.result = []
    this.LogisticsPush = LogisticsPush // 物流信息是否打开推送
    await this.getGlobalSetting()
    const loginMalls = mall.filter(b => b.isLogined == true)
    if (!loginMalls || loginMalls.length == 0) {
      this.writeLog(`当前没有登录状态的店铺.`)
      return
    }
    this.malls = mall
    const mallIds = loginMalls.map(n => n.id).join(',')
    let allOrders = []
    let orders = []
    // let allOrders = await this.getNoShippenOrder({page:1,systemMallId:mallIds});
    if (singleOrders) {
      orders = singleOrders
    } else {
      orders = await this.getNoShippenOrder({
        page: 1,
        per_page: 100,
        systemMallId: mallIds
      })
    }
    // const orders = await this.getNoShippenOrder({
    //   page: 1,
    //   per_page: 100,
    //   systemMallId: mallIds
    // })
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    if (this.allSeting) {
      if (this.allSeting.pddTrackingWay === 3) {
        // 拼多多物流发货方式3 只查询 不进行发货
      } else {
        this.directSendNewDelivery(noSearchOrders)
        noSearchOrders.forEach(item => {
          this.setRemarks(item)
        })
      }
    } else {
      this.directSendNewDelivery(noSearchOrders)
      noSearchOrders.forEach(item => {
        this.setRemarks(item)
      })
    }
    allOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${allOrders.length}】条需要同步物流的订单`,
      !!allOrders.length
    )
    // }
    console.log(allOrders, 'allOrders')
    // 同步物流单号到 标记备注那
    allOrders.forEach(item => {
      this.setRemarks(item)
    })
    // const others = allOrders.filter(item => {
    //   return item.tracking_no
    // })
    // this.writeLog(`获取到【${others.length}】可以直接发货的物流`, !!others.length)
    // allOrders = allOrders.filter(item => {
    //   return !item.tracking_no
    // })
    // console.log(allOrders, '所有带同步物流订单列表')
    // this.writeLog(`获取到【${allOrders.length}】条需要同步物流的订单`, !!allOrders.length)
    // allOrders = others
    // if (this.mode === 'new') {
    //   this.directSendNewDelivery(others)
    // } else {
    //   this.directSendDelivery(others)
    // }
    // console.log(others, 'others')
    // 把相同买手号的订单放到字典中
    const accounsMap = new Map()

    allOrders.forEach(element => {
      const singleaccountName = element.shot_order_info.buyer_account
        ? JSON.parse(element.shot_order_info.buyer_account).name
        : ''
      const singleaccount = element.shot_order_info.buyer_account
        ? JSON.parse(element.shot_order_info.buyer_account).type
        : ''
      const accountName = element?.buyer_account_info?.name ?? singleaccountName
      const type = element?.buyer_account_info?.type ?? singleaccount
      console.log(
        singleaccountName,
        singleaccount,
        accountName,
        type,
        '========single'
      )
      const account = buyerAccouns.find(
        n => n.name == accountName && n.type == type
      )
      if (account) {
        if (accounsMap.has(account)) {
          const value = accounsMap.get(account)
          value.push(element)
        } else {
          accounsMap.set(account, [element])
        }
      } else {
        this.writeLog(
          `订单【${element.order_sn}】对应的买手号【${element
            ?.buyer_account_info?.name ??
          singleaccountName}】没有找到，请登录对应买手号.`,
          false
        )
      }
    })
    console.log(accounsMap, 'full')
    if (accounsMap.size != 0) {
      for (var key of accounsMap.keys()) {
        // 只循环key
        const orders = accounsMap.get(key)
        await this.syncLogistic(key, orders)
      }
    }
  }

  /**
   * 获取上家真实物流并出库
   * @param {*} buyerAccount
   * @param {*} orders
   */
  async syncLogistic(buyerAccount, orders) {
    if (buyerAccount && orders) {
      switch (buyerAccount.type) {
        case 1: // 拼多多
          await this.pddSyncLogistic(buyerAccount, orders)
          break
        case 3: // 淘宝
          await this.taobaoNewSyncLogistic(buyerAccount, orders)
          break
        case 10: // 京东
          await this.jdSyncLogistic(buyerAccount, orders)
          break
        case 8: // 1688
          await this.AliBaBaSyncLogistic(buyerAccount, orders)
          break
        default:
          break
      }
    }
  }
  /**
   * 拼多多买手号物流同步
   */
  async pddSyncLogistic(buyerAccount, orders) { // taobaoBuyerName pdd的同步物流信息，也要发往淘宝买手号，只需要知道买手号的名字即可
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    const needSearchOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${needSearchOrders.length}】条需要同步物流的订单`,
      !!needSearchOrders.length
    )
    if (this.allSeting) {
      if (this.allSeting.pddTrackingWay === 3) {
        // 拼多多物流发货方式3 只查询 不进行发货
      } else {
        this.directSendNewDelivery(noSearchOrders)
      }
    } else {
      this.directSendNewDelivery(noSearchOrders)
    }
    console.log(buyerAccount, 'buyerAccount')
    const pddService = new PddService(buyerAccount)
    for (let index = 0; index < needSearchOrders.length; index++) {
      const item = needSearchOrders[index]
      try {
        const mall = this.malls.find(n => n.id === item.sys_mall_id)
        const logisticInfo = await pddService.getPddLogisticsInfo(
          item?.shot_order_sn ?? item.shot_order_info.shot_order_sn
        )
        console.log('logisticInfo', logisticInfo)
        if (logisticInfo) {
          if (logisticInfo.trackingNumber == null) {
            this.writeLog(`订单【${item.order_sn}】未发货`, false, '#ff9900')
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              order_status: item.order_status,
              delivery_sync_status: 2
            })
            continue
          }
          const trackingNumber = logisticInfo.trackingNumber
          const shippingName = logisticInfo.shippingName
          const tbshippingName = this.changetbOrderName(shippingName)
          console.log(tbshippingName, 'tbshippingName')
          const totalNumber = 0
          console.log(totalNumber, 'totalNumber')

          const orderInfo = {
            orderId: item?.shot_order_sn ?? item.shot_order_info.shot_order_sn,
            mallName: mall.platform_mall_name,
            buyerAccountName: item.receiver_info.buyer_account
          }
          if (item?.receiver_info?.buyer_account && this.LogisticsPush) {
            if (mall && mall.web_login_info) {
              taobaoMallSendMessage(mall.web_login_info, orderInfo.buyerAccountName, `[发货提醒]您的订单由于软件错录单号，正确单号是【${shippingName}】【${trackingNumber}】`, this.jdNetworkService, this.writeLog.bind(this), orderInfo)
            } else {
              this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】未获取到相应的店铺信息,疑似店铺已被删除,无法使用物流推送功能(拼多多订单)(联系技术)`, false)
            }
          } else {
            if (this.LogisticsPush) {
              this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】无买家昵称,无法使用物流推送功能(拼多多订单)`, false)
            }
          }

          if (totalNumber === 0) {
            const result = await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 4
            })
            if (this.allSeting) {
              if (this.allSeting.pddTrackingWay === 2) {
                console.log(item, trackingNumber, 'orderID', '其它')
                await this.newOrderDelivery(
                  item,
                  trackingNumber,
                  'orderID',
                  '其它'
                )
              } else if (this.allSeting.pddTrackingWay === 3) {
                // 拼多多物流发货方式3 只查询 不进行发货
                this.writeLog(`获取上家物流,不进行发货`, true)
                const result = await this.uploadShippingInfo({
                  sys_mall_id: item.sys_mall_id,
                  order_id: item.main_order_sn,
                  order_sn: item.order_sn,
                  main_order_sn: item.main_order_sn,
                  logistics_name: shippingName,
                  tracking_no: trackingNumber,
                  order_status: item.order_status,
                  delivery_sync_status: 5
                })
                console.log(result, '获取物流信息成功')
              } else {
                await this.newOrderDelivery(
                  item,
                  trackingNumber,
                  'orderID',
                  shippingName
                )
              }
            }
            this.writeLog(
              `更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'
              }`,
              result.message
            )
            // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
          } else {
            this.writeLog(`订单【${item.order_sn}】已发货`, true)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 1
            })
            // this.writeLog(`更新订单【${item.order_sn}】物流信息${result.success?"成功":"失败"}`);
          }
        } else {
          this.writeLog(
            `订单【${item?.shot_order_sn ??
            item.shot_order_info.shot_order_sn}】获取上家拼多多物流信息失败.`,
            false
          )
          await this.uploadShippingInfo({
            sys_mall_id: item.sys_mall_id,
            order_id: item.main_order_sn,
            order_sn: item.order_sn,
            main_order_sn: item.main_order_sn,
            order_status: item.order_status,
            delivery_sync_status: 3
          })
        }
      } catch (e) {
        console.log(e)
        this.writeLog(
          `订单【${item?.shot_order_sn ??
          item.shot_order_info
            .shot_order_sn}】获取上家拼多多物流信息失败.${e}`,
          false
        )
        await this.uploadShippingInfo({
          sys_mall_id: item.sys_mall_id,
          order_id: item.main_order_sn,
          order_sn: item.order_sn,
          main_order_sn: item.main_order_sn,
          order_status: item.order_status,
          delivery_sync_status: 3
        })
        continue
      }
    }
  }
  /**
   * 淘宝买手号物流同步
   */
  async taobaoSyncLogistic(buyerAccount, orders) {
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    const needSearchOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${needSearchOrders.length}】条需要同步物流的订单`,
      !!needSearchOrders.length
    )
    this.directSendNewDelivery(noSearchOrders)
    console.log(buyerAccount)
    for (let index = 0; index < needSearchOrders.length; index++) {
      const item = needSearchOrders[index]
      try {
        const logisticInfo = await this.$baseUtilService.getLogisticByOrderIdAsync(
          buyerAccount,
          item?.shot_order_sn ?? item.shot_order_info.shot_order_sn
        )
        const ret = logisticInfo?.Ret[0]
        const errMessage = logisticInfo?.Message
        console.log('logisticInfo', logisticInfo)
        if (
          logisticInfo.TaoBaoData &&
          logisticInfo.TaoBaoData.TaoBaoOrderList.length
        ) {
          if (
            logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0]
              .MailNo == null
          ) {
            this.writeLog(`订单【${item.order_sn}】未发货`)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              order_status: item.order_status,
              delivery_sync_status: 2
            })
            continue
          }
          const trackingNumber =
            logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].MailNo
          const shippingName =
            logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0]
              .PartnerName
          const PartnerCode =
            logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0]
              .PartnerCode
          const tbshippingName = this.changetbOrderName(shippingName)
          console.log(trackingNumber, tbshippingName, 'tbshippingName')
          try {
            var orderID = await this.gettbOrderDetail(item)
          } catch {
            orderID = ''
          }
          await this.delay(2000)
          const totalNumber = 0
          console.log(totalNumber, 'totalNumber')
          if (totalNumber === 0) {
            const result = await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 4
            })
            this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】${errMessage}`, false)
            if (this.mode === 'new') {
              await this.newOrderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName,
                PartnerCode
              )
            } else {
              await this.orderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName
              )
            }
          } else {
            this.writeLog(`订单【${item.order_sn}】已发货`, true)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 1
            })
          }
        } else if (/令牌过期/.test(ret) || /令牌为空/.test(ret)) {
          this.writeLog(
            `${errMessage}`,
            false
          )
          continue
        } else {
          // this.writeLog(
          //   `订单【${item?.shot_order_sn ??
          //   item.shot_order_info
          //     .shot_order_sn}】获取上家淘宝物流信息失败,账号可能不在线.`,
          //   false
          // )
          this.writeLog(
            `${errMessage}`,
            false
          )
          console.log('aback1')
          await this.uploadShippingInfo({
            sys_mall_id: item.sys_mall_id,
            order_id: item.main_order_sn,
            order_sn: item.order_sn,
            main_order_sn: item.main_order_sn,
            order_status: item.order_status,
            delivery_sync_status: 3
          })
        }
      } catch (e) {
        console.log(e)
        this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家淘宝物流信息失败:${e}.`, false)
        await this.uploadShippingInfo({
          sys_mall_id: item.sys_mall_id,
          order_id: item.main_order_sn,
          order_sn: item.order_sn,
          main_order_sn: item.main_order_sn,
          order_status: item.order_status,
          delivery_sync_status: 3
        })
        continue
      }
    }
  }
  /**
   * （new）淘宝买手号物流同步
   */
  async taobaoNewSyncLogistic(buyerAccount, orders) {
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    const needSearchOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${needSearchOrders.length}】条需要同步物流的订单`,
      !!needSearchOrders.length
    )
    this.directSendNewDelivery(noSearchOrders)
    console.log(buyerAccount)
    for (let index = 0; index < needSearchOrders.length; index++) {
      const item = needSearchOrders[index]
      try {
        // const sys_mall_id = item.sys_mall_id === 633 ? 10239 : item.sys_mall_id // 好礼百货 以前店铺被删过，但是店铺id没有被删
        const mall = this.malls.find(n => n.id === item.sys_mall_id) // 所属店铺信息
        const logisticInfo = await this.$baseUtilService.getTbLogisticByOrderIdAsync(
          buyerAccount,
          item?.shot_order_sn ?? item.shot_order_info.shot_order_sn
        )
        debugger

        console.log('logisticInfo', logisticInfo)
        if (logisticInfo?.Message) {
          this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】:${logisticInfo.Message}`)
        } else {
          if (
            logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].MailNo == null
          ) {
            this.writeLog(`订单【${item.order_sn}】未发货`)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              order_status: item.order_status,
              delivery_sync_status: 2
            })
            continue
          }
          const trackingNumber = logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].MailNo
          const shippingName = logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].PartnerName
          const PartnerCode = logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].PartnerCode
          const tbshippingName = this.changetbOrderName(shippingName)
          // const orderInfo = {
          //   orderId: item?.shot_order_sn ?? item.shot_order_info.shot_order_sn,
          //   buyerAccountName: buyerAccount.name
          // }
          // if (mall && mall.web_login_info) {
          //   taobaoMallSendMessage(mall.web_login_info, orderInfo.buyerAccountName, `您的订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】已发货，发货物流公司：${this.changetbOrderCode(PartnerCode)} , 物流单号【${trackingNumber}】(淘宝订单)`, this.jdNetworkService, this.writeLog.bind(this), orderInfo)
          // } else {
          //   this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】未获取到相应的店铺信息,疑似店铺已被删除,无法使用物流推送功能(淘宝订单)(联系技术)`, false)
          // }
          const orderInfo = {
            orderId: item?.shot_order_sn ?? item.shot_order_info.shot_order_sn,
            mallName: mall.platform_mall_name,
            buyerAccountName: item.receiver_info.buyer_account
          }
          if (item?.receiver_info?.buyer_account && this.LogisticsPush) {
            if (mall && mall.web_login_info) {
              taobaoMallSendMessage(mall.web_login_info, orderInfo.buyerAccountName, `[发货提醒]您的订单由于软件错录单号，正确单号是【${this.changetbOrderCode(PartnerCode)}】【${trackingNumber}】`, this.jdNetworkService, this.writeLog.bind(this), orderInfo)
            } else {
              this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】未获取到相应的店铺信息,疑似店铺已被删除,无法使用物流推送功能(淘宝订单)(联系技术)`, false)
            }
          } else {
            if (this.LogisticsPush) {
              this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】无买家昵称,无法使用物流推送功能(淘宝订单)`, false)
            }
          }
          // 上报物流信息
          await this.uploadShippingInfo({
            sys_mall_id: item.sys_mall_id,
            order_id: item.main_order_sn,
            order_sn: item.order_sn,
            main_order_sn: item.main_order_sn,
            logistics_name: this.changetbOrderCode(PartnerCode),
            tracking_no: trackingNumber,
            order_status: item.order_status,
            delivery_sync_status: 5 // 更新物流状态
          })
          await this.newOrderDelivery(item, trackingNumber, '', shippingName, PartnerCode)
        }
      } catch (err) {
        this.writeLog(`获取物流信息异常原因：${err}`)
      }
    }
  }
  /**
   * 京东买手号物流同步
   */
  async jdSyncLogistic(buyerAccount, orders) {
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    const needSearchOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${needSearchOrders.length}】条需要同步物流的订单`,
      !!needSearchOrders.length
    )
    this.directSendNewDelivery(noSearchOrders)
    console.log(buyerAccount)
    const jdService = new BaseUtilService()
    for (let index = 0; index < needSearchOrders.length; index++) {
      const item = needSearchOrders[index]
      try {
        const logisticInfo = await jdService.getJxLogisticByOrderIdAsync(
          buyerAccount,
          item?.shot_order_sn ?? item.shot_order_info.shot_order_sn
        )
        console.log('logisticInfo', logisticInfo)
        if (logisticInfo.CarriageId && logisticInfo.Carrier) {
          if (logisticInfo.CarriageId == null) {
            this.writeLog(`订单【${item.order_sn}】未发货`)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              order_status: item.order_status,
              delivery_sync_status: 2
            })
            continue
          }
          const trackingNumber = logisticInfo.CarriageId
          const shippingName = logisticInfo.Carrier
          const tbshippingName = this.changetbOrderName(shippingName)
          console.log(tbshippingName, 'tbshippingName')
          try {
            var orderID = await this.gettbOrderDetail(item)
          } catch {
            orderID = ''
          }
          await this.delay(2000)
          const totalNumber = 0
          console.log(totalNumber, 'totalNumber')
          if (totalNumber === 0) {
            const result = await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 4
            })
            if (this.mode === 'new') {
              await this.newOrderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName
              )
            } else {
              await this.orderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName
              )
            }
            this.writeLog(
              `更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'
              }`,
              result.message
            )
            // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
          } else {
            this.writeLog(`订单【${item.order_sn}】已发货`, true)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 1
            })
            // this.writeLog(`更新订单【${item.order_sn}】物流信息${result.success?"成功":"失败"}`);
          }
        } else {
          this.writeLog(
            `订单【${item?.shot_order_sn ??
            item.shot_order_info.shot_order_sn}】获取上家京东物流信息失败.`,
            false
          )
          console.log('aback1')
          await this.uploadShippingInfo({
            sys_mall_id: item.sys_mall_id,
            order_id: item.main_order_sn,
            order_sn: item.order_sn,
            main_order_sn: item.main_order_sn,
            order_status: item.order_status,
            delivery_sync_status: 3
          })
        }
      } catch (e) {
        console.log(e)
        this.writeLog(
          `订单【${item?.shot_order_sn ??
          item.shot_order_info
            .shot_order_sn}】获取上家京东物流信息失败,账号可能不在线.`,
          false
        )
        await this.uploadShippingInfo({
          sys_mall_id: item.sys_mall_id,
          order_id: item.main_order_sn,
          order_sn: item.order_sn,
          main_order_sn: item.main_order_sn,
          order_status: item.order_status,
          delivery_sync_status: 3
        })
        continue
      }
    }
  }
  /**
   * 1688买手号物流同步
   */
  async AliBaBaSyncLogistic(buyerAccount, orders) {
    const noSearchOrders = this.getSendOrders(orders)
      ? this.getSendOrders(orders)
      : [] // 不需要查询物流信息的订单
    this.writeLog(
      `获取到【${noSearchOrders.length}】可以直接发货的物流`,
      !!noSearchOrders.length
    )
    const needSearchOrders = this.getNeedInfoOrders(orders)
      ? this.getNeedInfoOrders(orders)
      : [] // 需要查询物流信息的订单
    this.writeLog(
      `获取到【${needSearchOrders.length}】条需要同步物流的订单`,
      !!needSearchOrders.length
    )
    this.directSendNewDelivery(noSearchOrders)
    console.log(buyerAccount)
    const AliBaBaService = new BaseUtilService()
    for (let index = 0; index < needSearchOrders.length; index++) {
      const item = needSearchOrders[index]
      try {
        // 拿到的物流信息是html形式需要解析
        let logisticInfo = await AliBaBaService.getAliBaBaLogisticByOrderIdAsync(
          buyerAccount,
          item?.shot_order_sn ?? item.shot_order_info.shot_order_sn
        )
        // 解析1688物流信息
        const analysisAliBaBaService = new AliBaBaLogistic(logisticInfo)
        const info = await analysisAliBaBaService.getInfo()
        logisticInfo = info
        if (logisticInfo.trackingNumber && logisticInfo.logisticsCompany) {
          if (logisticInfo.trackingNumber === '') {
            this.writeLog(`订单【${item.order_sn}】未发货`)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              order_status: item.order_status,
              delivery_sync_status: 2
            })
            continue
          }
          const trackingNumber = logisticInfo.trackingNumber
          const shippingName = logisticInfo.logisticsCompany
          const tbPartnerCode = this.changetbOrderName(shippingName)
          console.log(tbPartnerCode, '转换物流简码')
          try {
            var orderID = await this.gettbOrderDetail(item)
          } catch {
            orderID = ''
          }
          await this.delay(2000)
          const totalNumber = 0
          console.log(totalNumber, 'totalNumber')
          if (totalNumber === 0) {
            const result = await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 4
            })
            if (this.mode === 'new') {
              await this.newOrderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName,
                tbPartnerCode
              )
            } else {
              await this.orderDelivery(
                item,
                trackingNumber,
                orderID,
                shippingName
              )
            }
            this.writeLog(
              `更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'
              }`,
              result.message
            )
            // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
          } else {
            this.writeLog(`订单【${item.order_sn}】已发货`, true)
            await this.uploadShippingInfo({
              sys_mall_id: item.sys_mall_id,
              order_id: item.main_order_sn,
              order_sn: item.order_sn,
              main_order_sn: item.main_order_sn,
              logistics_name: shippingName,
              tracking_no: trackingNumber,
              order_status: item.order_status,
              delivery_sync_status: 1
            })
            // this.writeLog(`更新订单【${item.order_sn}】物流信息${result.success?"成功":"失败"}`);
          }
        } else {
          this.writeLog(
            `订单【${item?.shot_order_sn ??
            item.shot_order_info.shot_order_sn}】获取上家京东物流信息失败.`,
            false
          )
          await this.uploadShippingInfo({
            sys_mall_id: item.sys_mall_id,
            order_id: item.main_order_sn,
            order_sn: item.order_sn,
            main_order_sn: item.main_order_sn,
            order_status: item.order_status,
            delivery_sync_status: 3
          })
        }
      } catch (e) {
        console.log(e)
        this.writeLog(
          `订单【${item?.shot_order_sn ??
          item.shot_order_info
            .shot_order_sn}】获取上家京东物流信息失败,账号可能不在线.`,
          false
        )
        await this.uploadShippingInfo({
          sys_mall_id: item.sys_mall_id,
          order_id: item.main_order_sn,
          order_sn: item.order_sn,
          main_order_sn: item.main_order_sn,
          order_status: item.order_status,
          delivery_sync_status: 3
        })
        continue
      }
    }
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
        newText = 'JT'
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
  // 转换订单状态 物流公司名称
  changetbOrderCode(shippingName) {
    let newText = JSON.parse(JSON.stringify(shippingName))
    switch (newText) {
      case (newText.match(RegExp(/YTO/i)) || {}).input:
        newText = '圆通快递'
        break
      case (newText.match(RegExp(/YUNDA/i)) || {}).input:
        newText = '韵达快递'
        break
      case (newText.match(RegExp(/TTKDEX/i)) || {}).input:
        newText = '天天快递'
        break
      case (newText.match(RegExp(/HTKY/i)) || {}).input:
        newText = '百世快递'
        break
      case (newText.match(RegExp(/ZTO/i)) || {}).input:
        newText = '中通快递'
        break
      case (newText.match(RegExp(/SF/i)) || {}).input:
        newText = '顺丰快递'
        break
      case (newText.match(RegExp(/STO/i)) || {}).input:
        newText = '申通快递'
        break
      case (newText.match(RegExp(/UC/i)) || {}).input:
        newText = '优速快递'
        break
      case (newText.match(RegExp(/EMS/i)) || {}).input:
        newText = 'EMS经济快递'
        break
      case (newText.match(RegExp(/GTO/i)) || {}).input:
        newText = '国通快递'
        break
      case (newText.match(RegExp(/FAST/i)) || {}).input:
        newText = '快捷快递'
        break
      case (newText.match(RegExp(/OTHER/i)) || {}).input:
        newText = '其它'
        break
      case (newText.match(RegExp(/POSTB/i)) || {}).input:
        newText = '邮政快递包裹'
        break
      case (newText.match(RegExp(/EYB/i)) || {}).input:
        newText = 'EMS经济快递'
        break
      default:
        newText = ''
        break
    }
    return newText
  }
  // 获取订单orderID
  async gettbOrderDetail(order) {
    console.log(order, 'order')
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    const url = 'https://wuliu.taobao.com/user/order_list_new.htm'
    const fordata = { taobaoTradeId: order.main_order_sn }
    const { data } = await this.jdNetworkService.post(url, fordata, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        cookies: mall.web_login_info,
        Accept: '*/*'
      }
    })
    const orderDetail = new tborderDetail(data)
    const orderID = orderDetail.getorderID()
    console.log(orderID)
    return orderID
  }
  // 查询淘宝是否出库
  async searchOrder(order) {
    console.log(1234)
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    const formdata = {
      auctionType: 0,
      close: 0,
      pageNum: 1,
      pageSize: 15,
      queryMore: 'true',
      rxAuditFlag: 0,
      rxElectronicAllFlag: 0,
      rxElectronicAuditFlag: 0,
      rxHasSendFlag: 0,
      rxOldFlag: 0,
      rxSendFlag: 0,
      rxSuccessflag: 0,
      rxWaitSendflag: 0,
      tradeTag: 0,
      useCheckcode: 'false',
      useOrderInfo: 'false',
      errorCheckcode: 'false',
      action: 'itemlist/SoldQueryAction',
      orderId: order.main_order_sn,
      prePageNo: 1,
      buyerNick: '',
      dateBegin: 0,
      dateEnd: 0,
      logisticsService: '',
      queryOrder: 'desc',
      rateStatus: '',
      refund: '',
      sellerNick: '',
      tabCode: 'haveSendGoods',
      orderStatus: 'SEND'
    }
    const url =
      'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&isFrame=true&from=tejia'
    const response = await this.jdNetworkService.post(url, formdata, {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookies: mall.web_login_info,
        referer:
          'https://trade.taobao.com/trade/itemlist/list_sold_items.htm?isFrame=true&from=tejia'
      }
    })
    if (response.status == 200 && response.data.mainOrders) {
      if (response.data.error === '') {
        delete response.data.error
        return response.data
      } else {
        return response.data
      }
    }
  }
  /**
   * 上传物流信息
   */
  async uploadShippingInfo(
    params = {
      sys_mall_id: '',
      order_id: '',
      order_sn: '',
      main_order_sn: '',
      logistics_name: '',
      tracking_no: '',
      delivery_time: ''
    }
  ) {
    const url = '/api/callback/deliver'
    // const url="/api/order/uploadShotOrderStatus";
    const response = await this.jszNetworkService.post(url, params)
    console.log(response)
    const { code, data } = response.data
    return {
      success: code == 200,
      message: data.ok
    }
  }
  // 有订单号直接发旧物流
  async directSendDelivery(orders) {
    for (let index = 0; index < orders.length; index++) {
      const item = orders[index]
      const trackingNumber = item.tracking_no
      const shippingName = item.logistics_name
      const orderID = await this.gettbOrderDetail(item)
      if (orderID) {
        return this.writeLog(`获取发货ID失败，请检查订单状态`, false)
      }
      await this.orderDelivery(item, trackingNumber, orderID, shippingName)
    }
  }
  // 有订单号直接发新物流
  async directSendNewDelivery(orders, mall) {
    if (mall) {
      this.malls = mall
    }
    for (let index = 0; index < orders.length; index++) {
      const item = orders[index]
      const trackingNumber = item.tracking_no
      const shippingName = item.logistics_name
      await this.newOrderDelivery(item, trackingNumber, '', shippingName)
    }
  }
  // 新淘宝物流发货方式
  async newOrderDelivery(
    order,
    trackingNumber,
    orderID,
    shippingName,
    tbPartnerCode
  ) {
    if (shippingName.match(RegExp(/极兔/)) || tbPartnerCode === 'JT') {
      this.writeLog('检测到为极兔物流,暂停发货', true)
      return
    }
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    const uuid = this.uuid()
    if (!mall) {
      return this.writeLog(`订单【${order.main_order_sn}】未找到相对应的店铺信息,疑似店铺已被删除(联系技术)`, false)
    }
    const dateCookie = this.updateCookie(mall, uuid)
    // const tbshippingName = this.changetbOrderName(shippingName)
    // 请求接口验证状态
    const param = await this.getNewOrderDelivery(order)
    if (!param) {
      return this.writeLog(`订单【${order.main_order_sn}】该订单不是发货状态`, false, '#ff9900')
    }
    console.log(param, '=====>')
    const formdata = {}
    formdata._csrf = uuid
    formdata.params = param
    formdata.params.logisticInfo = {
      mode: 0,
      data: [
        {
          mailInfo: {
            mailNo: trackingNumber,
            cpCode: tbPartnerCode || this.changetbOrderName(shippingName),
            label: tbPartnerCode
              ? this.changetbOrderCode(tbPartnerCode)
              : this.changetbOrderCode(this.changetbOrderName(shippingName))
          }
        }
      ]
    }
    formdata['x-frames-allow-from'] = 'wuliu2'
    console.log(dateCookie, formdata)
    try {
      const url = `https://wuliu2.taobao.com/user/do_consign.do`
      const { data } = await this.jdNetworkService.post(url, formdata, {
        headers: {
          isGBK: false,
          urlencoded: false,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          referer: `https://wuliu2.taobao.com/user/consign.htm?tradeId=${order.main_order_sn}&x-frames-allow-from=wuliu2`,
          origin: 'https://wuliu2.taobao.com',
          cookies: JSON.stringify(dateCookie)
        }
      })
      console.log(data)
      if (data.success) {
        const result = await this.uploadShippingInfo({
          sys_mall_id: order.sys_mall_id,
          order_id: order.main_order_sn,
          order_sn: order.order_sn,
          main_order_sn: order.main_order_sn,
          logistics_name: shippingName,
          tracking_no: trackingNumber,
          order_status: 4,
          delivery_sync_status: 1
        })
        return this.writeLog(
          `订单【${order.main_order_sn}】发货成功,快递单号【${trackingNumber}】`,
          true
        )
      }

      this.writeLog(
        `订单【${order.main_order_sn}】发货失败,快递单号【${trackingNumber}】</br> 淘宝官方平台错误信息：${data.message}`,
        false
      )
    } catch (e) {
      this.writeLog(
        `订单【${order.main_order_sn}】发货失败,快递单号【${trackingNumber}】`,
        false
      )
    }
  }
  // 修改cookie
  updateCookie(mallInfo, token) {
    const allCookie = JSON.parse(JSON.stringify(mallInfo.web_login_info))
    const isexist = false
    allCookie.forEach(item => {
      if (item['Name'] === 'XSRF-TOKEN') {
        item['Value'] = token
        this.isrepeat = true
      }
    })
    if (!isexist) {
      const cookie1 = mallInfo.web_login_info[0]
      cookie1['Name'] = 'XSRF-TOKEN'
      cookie1['Value'] = token
      allCookie.unshift(cookie1)
    }
    return allCookie
  }
  // 生成淘宝token
  uuid() {
    var s = []
    var hexDigits = '0123456789abcdef'
    for (var i = 0; i < 36; i++) {
      s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
    }
    s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
    s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
    s[8] = s[13] = s[18] = s[23] = '-'

    var uuid = s.join('')
    return uuid
  }
  // 组装新物流参数
  async getNewOrderDelivery(order) {
    const mainOrderSn = order.main_order_sn
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    const url = `https://wuliu2.taobao.com/user/consign.do?tradeId=${mainOrderSn}&x-frames-allow-from=wuliu2`
    try {
      const { data } = await this.jdNetworkService.get(url, {
        headers: {
          isGBK: false,
          cookies: mall.web_login_info,
          accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          referer: url
        }
      })

      if (data && data.success === false) {
        this.writeLog(`订单【${mainOrderSn}】请检查该订单是否已发货,检测到发货状态异常`, false, '#ff9900')
        return false
      }

      const sourData = data.data
      const orderId =
        sourData?.OrderBlock?.fields.dataSource[0]?.baseInfo?.fields[0]?.value
      const receiverDisplayAddress =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[0]
          ?.value
      const receiverMobilePhone =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[1]
          ?.value
      const receiverProvince =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[2]
          ?.value
      const receiverDetailAddress =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[3]
          ?.value
      const receiverCity =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[4]
          ?.value
      const receiverCountryId =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[5]
          ?.value
      const receiverDivisionId =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[7]
          ?.value
      const receiverZipCode =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[9]
          ?.value
      const receiverContactName =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info
          .fields[10]?.value
      const receiverDistrict =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info
          .fields[11]?.value
      const receiverTown =
        sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info
          .fields[13]?.value
      const fetcherContactId =
        sourData?.ContactsBlock.fields.dataSource[0].fields[0].value
      const refunderContactId =
        sourData?.ContactsBlock.fields.dataSource[1].fields[0].value
      const params = {
        orderId: orderId,
        receiverDisplayAddress: receiverDisplayAddress,
        receiverMobilePhone: receiverMobilePhone,
        receiverProvince: receiverProvince,
        receiverDetailAddress: receiverDetailAddress,
        receiverCity: receiverCity,
        receiverCountryId: receiverCountryId,
        receiverDivisionId: receiverDivisionId,
        receiverZipCode: receiverZipCode,
        receiverContactName: receiverContactName,
        receiverDistrict: receiverDistrict,
        receiverTown: receiverTown,
        selectedItemList: sourData?.OrderBlock?.fields?.dataSource[0]?.children,
        allData: sourData?.OrderBlock?.fields?.dataSource[0]?.children,
        fetcherContactId: fetcherContactId,
        refunderContactId: refunderContactId,
        logisticInfo: {
          mode: 0,
          data: [
            {
              mailInfo: {
                mailNo: '',
                cpCode: '',
                label: ''
              }
            }
          ]
        },
        mailType: 'OFFLINE',
        hasChangeDeliver: true
      }
      console.log(params)
      return params
    } catch (e) {
      this.writeLog('店铺信息可能失效，请重新登录店铺', false)
    }
  }
  /**
   * 淘宝订单出库
   * @param {*} order
   * @param {*} shippingInfo
   */
  async orderDelivery(order, trackingNumber, orderID, shippingName) {
    const tbshippingName = this.changetbOrderName(shippingName)
    const GBKFormat = new BaseUtilService()
    console.log('start orderDelivery')
    console.log(order, trackingNumber)
    const {
      Street,
      ZipCode,
      sender_city,
      sender_name,
      sender_county,
      sender_mobile,
      sender_address,
      sender_province
    } = order.mall_address
    const {
      state,
      city,
      town,
      zip_code,
      phone,
      buyer_name,
      detail_address
    } = order.receiver_info
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    let town_id = await GBKFormat.getTbAddressModel(town)
    console.log(town_id.RegionId)
    if (town_id.RegionId) {
      town_id = town_id.RegionId
    } else {
      town_id = 0
    }
    console.log(mall, 'mall')
    // if(mall){
    let formdata = {}
    const copy = `source=&callUrl=&_tb_token_=fed337ef3b13e&mailNo=&companyCode=&orderId=424196449319&tradeId=%24%7btaobaoTradeId%7d&taobaoTradeId=1234078106863763994&branchName=&branchCode=&courierName=&courierMobile=&courierId=&cpName=&selected_tab=&selected_tab=logis:offline&receiverDetail=光弘中心&receiverZipCode=000000&receiverProvince=${state}&receiverCity=${city}&receiverDistrict=${town}&receiverContactName=${buyer_name}&receiverTown=&receiverPhone=&receiverTelePhone=&receiverMobilePhone=13887186635&fetcherContactName=${sender_name}&fetcherPhone=&fetcherMobilephone=13534007504&addressFull=&fetcherZipCode=518116&isOverSea=false&flag=&forwardFlag=&province=${state}&action=user/consign_action&event_submit_do_online_consign=1&event_submit_do_offline_consign=&event_submit_do_nosheet_consign=&event_submit_do_dummy=&event_submit_do_cod_consign=&event_submit_do_store_consign=&event_submit_do_refresh_address=&event_submit_do_refresh_store=&event_submit_do_store_cod_consign=&event_submit_do_refresh_address_ensured=&event_submit_do_submit_oversea=&isFreshUser=false&J_SetUrl=//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies&offlineNewFlag=0&companyId=&_fmw.r._0.count=${town_id}&_fmw.r._0.c=${buyer_name}&_fmw.r._0.p=${state}&_fmw.r._0.ci=${city}&_fmw.r._0.d=${town}&_fmw.r._0.to=&_fmw.r._0.i=false&_fmw.r._0.di=${town_id}&_fmw.r._0.coun=${town}&_fmw.r._0.adr=${detail_address}&_fmw.r._0.dd=${detail_address}&_fmw.r._0.ad=${state}^^^${city}^^^${town}^^^${detail_address}&_fmw.r._0.z=000000&_fmw.r._0.ddd=&_fmw.r._0.ph=&_fmw.r._0.b=&_fmw.r._0.t=&_fmw.r._0.mo=13887186635&splitFlag=&orderGoodsListSize=1&_fmw.n._0.g=&_fmw.f._0.co=1890518315&_fmw.f._0.coun=440307&_fmw.f._0.c=${sender_name}&_fmw.f._0.p=${sender_province}&_fmw.f._0.ci=${sender_city}&_fmw.f._0.cou=${sender_county}&_fmw.f._0.adr= ${Street}&_fmw.f._0.dd=${sender_address}&_fmw.f._0.ad=${sender_address}&_fmw.f._0.z=518116&_fmw.f._0.ddd=&_fmw.f._0.ph=&_fmw.f._0.b=&_fmw.f._0.t=&_fmw.f._0.m=13534007504&_fmw.re._0.co=1890518315&_fmw.re._0.coun=440307&_fmw.re._0.c=${sender_name}&_fmw.re._0.p=${sender_province}&_fmw.re._0.ci=${sender_city}&_fmw.re._0.cou=${sender_county}&_fmw.re._0.adr= ${Street}&_fmw.re._0.dd=${sender_address}&_fmw.re._0.ad=${sender_address}&_fmw.re._0.z=518116&_fmw.re._0.ddd=&_fmw.re._0.ph=&_fmw.re._0.b=&_fmw.re._0.t=&_fmw.re._0.m=13534007504&initialWeightOld=all&_fmw.f._0.f=&_fmw.f._0.fe=&_fmw.f._0.fet=`
    const newForm = copy
    const newformdata = await GBKFormat.stringGetEncodingGbk(newForm)
    formdata = this.formattingParams(newformdata)
    formdata.companyCode = tbshippingName
    formdata.tradeId = '${taobaoTradeId}'
    formdata.action = 'user/consign_action'
    formdata.J_SetUrl =
      '//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies'
    formdata.mailNo = trackingNumber
    formdata.orderId = orderID
    formdata.receiverMobilePhone = phone
    formdata.fetcherMobilephone = sender_mobile
    formdata.taobaoTradeId = order.main_order_sn
    formdata.selected_tab = 'logis:offline'
    formdata.event_submit_do_online_consign = ''
    formdata.event_submit_do_offline_consign = 1

    console.log(formdata)
    const url = `https://wuliu.taobao.com/user/consign.htm?order_id=${orderID}`
    try {
      const { data } = await this.jdNetworkService.post(url, formdata, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          origin: 'https://wuliu.taobao.com',
          Host: 'wuliu.taobao.com',
          'Accept-Encoding': 'gzip, deflate, br',
          cookies: mall.web_login_info
        }
      })
    } catch (e) {
      console.log(e, e.response.status)
      if (e.response.status === 302) {
        const result = await this.uploadShippingInfo({
          sys_mall_id: order.sys_mall_id,
          order_id: order.main_order_sn,
          order_sn: order.order_sn,
          main_order_sn: order.main_order_sn,
          logistics_name: shippingName,
          tracking_no: trackingNumber,
          order_status: 4,
          delivery_sync_status: 1
        })
        this.writeLog(
          `订单【${order.main_order_sn}】发货成功,快递单号【${trackingNumber}】`,
          true
        )
      }
      if (this.allSeting.pddTrackingWay === 1) {
        this.noOrderDelivery(order, trackingNumber, orderID, shippingName)
      }
    }
  }
  /**
   * 淘宝无需物流发货
   * @param {*} order
   */
  async noOrderDelivery(order, trackingNumber, orderID, shippingName) {
    const tbshippingName = this.changetbOrderName(shippingName)
    const GBKFormat = new BaseUtilService()
    console.log('start orderDelivery')
    console.log(order, trackingNumber)
    const {
      Street,
      ZipCode,
      sender_city,
      sender_name,
      sender_county,
      sender_mobile,
      sender_address,
      sender_province
    } = order.mall_address
    const {
      state,
      city,
      town,
      zip_code,
      phone,
      buyer_name,
      detail_address
    } = order.receiver_info
    const mall = this.malls.find(n => n.id == order.sys_mall_id)
    let town_id = await GBKFormat.getTbAddressModel(town)
    console.log(town_id.RegionId)
    if (town_id.RegionId) {
      town_id = town_id.RegionId
    } else {
      town_id = 0
    }
    console.log(mall, 'mall')
    // if(mall){
    let formdata = {}
    const copy = `source=&callUrl=&_tb_token_=fed337ef3b13e&mailNo=&companyCode=&orderId=424196449319&tradeId=%24%7btaobaoTradeId%7d&taobaoTradeId=1234078106863763994&branchName=&branchCode=&courierName=&courierMobile=&courierId=&cpName=&selected_tab=&selected_tab=logis:offline&receiverDetail=光弘中心&receiverZipCode=000000&receiverProvince=${state}&receiverCity=${city}&receiverDistrict=${town}&receiverContactName=${buyer_name}&receiverTown=&receiverPhone=&receiverTelePhone=&receiverMobilePhone=13887186635&fetcherContactName=${sender_name}&fetcherPhone=&fetcherMobilephone=13534007504&addressFull=&fetcherZipCode=518116&isOverSea=false&flag=&forwardFlag=&province=${state}&action=user/consign_action&event_submit_do_online_consign=1&event_submit_do_offline_consign=&event_submit_do_nosheet_consign=&event_submit_do_dummy=&event_submit_do_cod_consign=&event_submit_do_store_consign=&event_submit_do_refresh_address=&event_submit_do_refresh_store=&event_submit_do_store_cod_consign=&event_submit_do_refresh_address_ensured=&event_submit_do_submit_oversea=&isFreshUser=false&J_SetUrl=//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies&offlineNewFlag=0&companyId=&_fmw.r._0.count=${town_id}&_fmw.r._0.c=${buyer_name}&_fmw.r._0.p=${state}&_fmw.r._0.ci=${city}&_fmw.r._0.d=${town}&_fmw.r._0.to=&_fmw.r._0.i=false&_fmw.r._0.di=${town_id}&_fmw.r._0.coun=${town}&_fmw.r._0.adr=${detail_address}&_fmw.r._0.dd=${detail_address}&_fmw.r._0.ad=${state}^^^${city}^^^${town}^^^${detail_address}&_fmw.r._0.z=000000&_fmw.r._0.ddd=&_fmw.r._0.ph=&_fmw.r._0.b=&_fmw.r._0.t=&_fmw.r._0.mo=13887186635&splitFlag=&orderGoodsListSize=1&_fmw.n._0.g=您可以在此输入备忘信息（仅卖家自己可见）。&_fmw.f._0.co=1890518315&_fmw.f._0.coun=440307&_fmw.f._0.c=${sender_name}&_fmw.f._0.p=${sender_province}&_fmw.f._0.ci=${sender_city}&_fmw.f._0.cou=${sender_county}&_fmw.f._0.adr= ${Street}&_fmw.f._0.dd=${sender_address}&_fmw.f._0.ad=${sender_address}&_fmw.f._0.z=518116&_fmw.f._0.ddd=&_fmw.f._0.ph=&_fmw.f._0.b=&_fmw.f._0.t=&_fmw.f._0.m=13534007504&_fmw.re._0.co=1890518315&_fmw.re._0.coun=440307&_fmw.re._0.c=${sender_name}&_fmw.re._0.p=${sender_province}&_fmw.re._0.ci=${sender_city}&_fmw.re._0.cou=${sender_county}&_fmw.re._0.adr= ${Street}&_fmw.re._0.dd=${sender_address}&_fmw.re._0.ad=${sender_address}&_fmw.re._0.z=518116&_fmw.re._0.ddd=&_fmw.re._0.ph=&_fmw.re._0.b=&_fmw.re._0.t=&_fmw.re._0.m=13534007504&initialWeightOld=all&_fmw.f._0.f=&_fmw.f._0.fe=&_fmw.f._0.fet=`
    const newForm = copy
    const newformdata = await GBKFormat.stringGetEncodingGbk(newForm)
    formdata = this.formattingParams(newformdata)
    formdata.companyCode = ''
    formdata.tradeId = '${taobaoTradeId}'
    formdata.action = 'user/consign_action'
    formdata.J_SetUrl =
      '//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies'
    formdata.mailNo = ''
    formdata.orderId = orderID
    formdata.receiverMobilePhone = phone
    formdata.fetcherMobilephone = sender_mobile
    formdata.taobaoTradeId = order.main_order_sn
    formdata.selected_tab = 'logis:dummy'
    formdata['_fmw.r._0.coun'] = ''
    formdata['_fmw.f._0.p'] = ''
    formdata['_fmw.f._0.ci'] = ''
    formdata['_fmw.f._0.cou'] = ''
    formdata['_fmw.re._0.p'] = ''
    formdata['_fmw.re._0.ci'] = ''
    formdata['_fmw.re._0.cou'] = ''
    formdata.event_submit_do_online_consign = ''
    formdata.event_submit_do_dummy = 1

    console.log(formdata)
    const url = `https://wuliu.taobao.com/user/consign.htm?trade_id=${order.main_order_sn}`
    try {
      const { data } = await this.jdNetworkService.post(url, formdata, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'user-agent':
            'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          origin: 'https://wuliu.taobao.com',
          Host: 'wuliu.taobao.com',
          'Accept-Encoding': 'gzip, deflate, br',
          cookies: mall.web_login_info
        }
      })
    } catch (e) {
      console.log(e, e.response.status)
      if (e.response.status === 302) {
        const result = await this.uploadShippingInfo({
          sys_mall_id: order.sys_mall_id,
          order_id: order.main_order_sn,
          order_sn: order.order_sn,
          main_order_sn: order.main_order_sn,
          logistics_name: shippingName,
          tracking_no: trackingNumber,
          order_status: 4,
          delivery_sync_status: 1
        })
        this.writeLog(
          `订单【${order.main_order_sn}】无需物流发货成功,快递单号【${trackingNumber}】`,
          true
        )
      }
    }
  }
  // 把转成GBK的字段进行参数拼接
  formattingParams(formdata) {
    var urlToObject = function(formdata) {
      var urlObject = {}
      var urlArray = formdata.split('%26')
      for (var i = 0, len = urlArray.length; i < len; i++) {
        var urlItem = urlArray[i]
        var item = urlItem.split('%3d')
        urlObject[item[0]] = item[1]
      }
      return urlObject
    }
    var result = urlToObject(formdata)
    return result
  }
  // 获取全局设置(本地化)
  async getGlobalSetting() {
    try {
      const response = await this.$appConfig.getUserConfig()
      const data = JSON.parse(response)
      this.allSeting = data
    } catch {
      this.allSeting = null
    }
  }
  // 筛选有物流信息的订单
  getSendOrders(orders) {
    if (orders) {
      return orders.filter(item => {
        return item.tracking_no
      })
    } else {
      return []
    }
  }
  // 获取需要获取物流信息的订单
  getNeedInfoOrders(orders) {
    if (orders) {
      return orders.filter(item => {
        return !item.tracking_no
      })
      // return orders
    } else {
      return null
    }
  }
  /**
   * 获取所有物流信息列表
   * @param {*} params
   */
  async getNoShippenOrder(
    params = { page: 1, per_page: 100, systemMallId: '', createdTime: '' }
  ) {
    try {
      const response = await this.$api.getNoShippenOrder2({ params: params })
      console.log(response)
      if (
        response.data &&
        response.data.code === 200 &&
        response.data.data.list.data &&
        response.data.data.list.data.length
      ) {
        this.result.push(...response.data.data.list.data)
        this.writeLog(`正在获取需要同步物流的订单, 第${params.page}页`, true)
        params.page++
        await this.getNoShippenOrder(params)
      } else if (!response.data.data.list.length) {
        this.writeLog(`获取完成`, true)
      }
      return this.result
    } catch {
      return this.result
    }
  }
  async getNoShippenOrders(params, buyerAccouns) {
    const url = '/api/order/noShipped'
    const response = await this.jszNetworkService.get(url, { params: params })
    console.log(buyerAccouns, 'buyerAccouns')
    if (
      response.data &&
      response.data.status_code == 200 &&
      response.data.data
    ) {
      this.allOrders.push(...response.data.data)
      this.writeLog(`正在获取需要同步物流的订单, 第${params.page}页`, true)
      params.page++
      this.getNoShippenOrder(params, buyerAccouns)
    } else {
      console.log(this.allOrders.length)
      this.allOrders = this.allOrders.filter(item => {
        return (
          item.can_delivery_status != 3 &&
          item.shot_order_sn &&
          item.shot_order_sn.length > 16 &&
          item.shot_order_sn.length < 26
        )
      })
      console.log(this.allOrders)
      if (this.allOrders.length == 0) {
        this.writeLog(`没有要同步物流的订单`)
        return
      } else {
        this.splitAllOrders(this.allOrders, buyerAccouns)
      }
    }
  }

  async delay(time) {
    return new Promise(resolve => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }

  /**
   * 获取拼读多买手号订单详情
   * @param {*} buyerAccount
   * @param {*} orderId
   */
  getPddOrder(buyerAccount, orderId) { }
  // 设置淘宝备注
  async setRemarks(order) {
    console.log(order, '=====>setRemarks')
    //   const mall = await this.$mallService.getMallById(order.sys_mall_id)
    const mall = this.malls.find(item => {
      return item.id === order.sys_mall_id
    })
    console.log(mall)
    // const mall = await this.$mallService.getMallById(37)
    console.log(mall, '=====>')
    if (!mall.isLogined) {
      return this.writeLog(`店铺登录信息失效，同步备注失败`, false)
    }
    const url = 'https://trade.taobao.com/trade/memo/update_sell_memo.htm'
    let _tb_token_
    mall.web_login_info.forEach(item => {
      if (item.Name === '_tb_token_') {
        _tb_token_ = item.Value
      }
    })
    if (!order?.shot_order_info?.shot_order_sn) {
      return this.writeLog('未获取到拍单号，停止同步备注', false)
    }
    const shotOrder = order?.shot_order_info?.shot_order_sn ?? ''
    const shipmentOrder = order?.tracking_no ?? ''
    const formdata = {
      _tb_token_: _tb_token_,
      event_submit_do_query: 1,
      action: 'memo/UpdateSellMemoAction',
      user_type: 1,
      pageNum: 1,
      auctionTitle: '',
      dateBegin: '',
      dateEnd: '',
      commentStatus: '',
      buyerNick: '',
      auctionStatus: '',
      returnUrl: '',
      logisticsService: '',
      from_flag: '',
      biz_order_id: order.order_sn,
      // memo: order?.shot_order_info?.shot_order_sn ?? ''
      memo: `${shipmentOrder}  ${shotOrder}`
    }
    try {
      const { data } = await this.jdNetworkService.post(url, formdata, {
        headers: {
          isGBK: false,
          cookies: mall.web_login_info,
          accept:
            'text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'content-type': 'application/x-www-form-urlencoded'
        }
      })
    } catch (e) {
      if (e.response.status === 302) {
        console.log('同步备注成功')
        // const params = {
        //   order_id: order.order_id,
        //   order_sn: order.order_sn,
        //   is_sync_purchase: 1
        // }
        // const { data } = await this.$api.upNeedSetRemarks(params)
        // //   this.writeLog(`订单【${order.order_sn}】修改备注成功`, true)
        // console.log(data)
        return
      }
      const params = {
        order_id: order.order_id,
        order_sn: order.order_sn,
        is_sync_purchase: 0
      }
      const { data } = await this.$api.upNeedSetRemarks(params)
      // this.writeLog(`订单【${order.order_sn}】修改备注失败`, false)
      console.log(data)
    }
  }
}
