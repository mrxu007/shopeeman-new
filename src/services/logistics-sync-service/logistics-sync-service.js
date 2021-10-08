import jxRequest from '../../network/jx-request'
import PddService from '../pdd-services/pdd-service'
import tborderDetail from '../tbOrder-detail'
import BaseUtilService from '../BaseUtilService'
import AliBaBaLogistic from '../AliBaBaLogistic'
/**
 * 物流同步服务
 */
export default class logisticeSyncService {
    jdNetworkService=jxRequest.jdRequest;
    jszNetworkService=jxRequest.jxRequest;
    $api = jxRequest
    logCallback;
    mode;
    malls;
    allSeting;
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
    async start(mall, buyerAccouns, singleOrders) {
      this.getGlobalSetting()
      const loginMalls = mall.filter(b => b.isLogined == true)
      if (!loginMalls || loginMalls.length == 0) {
        this.writeLog(`当前没有登录状态的店铺.`)
        return
      }
      this.malls = mall
      const mallIds = loginMalls.map(n => n.id).join(',')
      let allOrders = []
      // let allOrders = await this.getNoShippenOrder({page:1,systemMallId:mallIds});
      if (singleOrders) {
        allOrders = singleOrders
      } else {
        allOrders = await this.getNoShippenOrder({ page: 1, systemMallId: mallIds })
      }
      console.log(allOrders, 'allOrders')
      // 同步物流单号到 标记备注那
      allOrders.forEach(item => {
        this.setRemarks(item)
      })
      const others = allOrders.filter(item => {
        return item.tracking_no
      })
      this.writeLog(`获取到【${others.length}】可以直接发货的物流`, !!others.length)
      allOrders = allOrders.filter(item => {
        return !item.tracking_no
      })
      console.log(allOrders, '所有带同步物流订单列表')
      this.writeLog(`获取到【${allOrders.length}】条需要同步物流的订单`, !!allOrders.length)
      if (this.mode === 'new') {
        this.directSendNewDelivery(others)
      } else {
        this.directSendDelivery(others)
      }
      console.log(others, 'others')
      // 把相同买手号的订单放到字典中
      const accounsMap = new Map()

      allOrders.forEach(element => {
        const singleaccountName = element.shot_order_info.buyer_account ? JSON.parse(element.shot_order_info.buyer_account).name : ''
        const singleaccount = element.shot_order_info.buyer_account ? JSON.parse(element.shot_order_info.buyer_account).type : ''
        const accountName = element?.buyer_account_info?.name ?? singleaccountName
        const type = element?.buyer_account_info?.type ?? singleaccount
        console.log(singleaccountName, singleaccount, accountName, type, '========single')
        const account = buyerAccouns.find(n => n.name == accountName && n.type == type)
        if (account) {
          if (accounsMap.has(account)) {
            const value = accounsMap.get(account)
            value.push(element)
          } else {
            accounsMap.set(account, [element])
          }
        } else {
          this.writeLog(`订单【${element.order_sn}】对应的买手号【${element?.buyer_account_info?.name ?? singleaccountName}】没有找到，请登录对应买手号.`, false)
        }
      })
      console.log(accounsMap, 'full')
      if (accounsMap.size != 0) {
        for (var key of accounsMap.keys()) { // 只循环key
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
          case 1:// 拼多多
            await this.pddSyncLogistic(buyerAccount, orders)
            break
          case 3:// 淘宝
            await this.taobaoSyncLogistic(buyerAccount, orders)
            break
          case 10:// 京东
            await this.jdSyncLogistic(buyerAccount, orders)
            break
          case 8:// 1688
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
    async pddSyncLogistic(buyerAccount, orders) {
      console.log(buyerAccount, 'buyerAccount')
      const pddService = new PddService(buyerAccount)
      for (let index = 0; index < orders.length; index++) {
        const item = orders[index]
        try {
          const logisticInfo = await pddService.getPddLogisticsInfo(item?.shot_order_sn ?? item.shot_order_info.shot_order_sn)
          console.log('logisticInfo', logisticInfo)
          if (logisticInfo) {
            if (logisticInfo.trackingNumber == null) {
              this.writeLog(`订单【${item.order_sn}】未发货`, false, '#ff9900')
              const result = await this.uploadShippingInfo({
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
            const orderID = await this.gettbOrderDetail(item)

            // const response1=await this.orderDelivery(item,trackingNumber,orderID,tbshippingName);

            await this.delay(2000)
            try {
              var response = await this.searchOrder(item)
            } catch {
              response = { page: { totalNumber: 0 }}
            }
            console.log(response)
            // return
            // const { page: { totalNumber }} = response
            const totalNumber = 0
            console.log(totalNumber, 'totalNumber')
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】:${msg}`);
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】`,totalNumber>0?true:false);
            if (totalNumber == 0) {
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
              if (this.allSeting.pddTrackingWay === 2) {
                const response1 = await this.noOrderDelivery(item, trackingNumber, orderID, shippingName)
              } else if (this.allSeting.pddTrackingWay === 3) {
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
              } else {
                if (this.mode === 'new') {
                  const response1 = await this.newOrderDelivery(item, trackingNumber, orderID, shippingName)
                } else {
                  const response1 = await this.orderDelivery(item, trackingNumber, orderID, shippingName)
                }
              }
              this.writeLog(`更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'}`, result.message)
              // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
            } else {
              this.writeLog(`订单【${item.order_sn}】已发货`, true)
              const result = await this.uploadShippingInfo({
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
            this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家拼多多物流信息失败.`, false)
            console.log('caback1')
            const result = await this.uploadShippingInfo({
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
          this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家拼多多物流信息失败,账号可能不在线.`, false)
          console.log(item)
          console.log('caback2')
          const result = await this.uploadShippingInfo({
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
      console.log(buyerAccount)
      const tbService = new BaseUtilService()
      for (let index = 0; index < orders.length; index++) {
        const item = orders[index]
        try {
          const logisticInfo = await tbService.getLogisticByOrderIdAsync(buyerAccount, item?.shot_order_sn ?? item.shot_order_info.shot_order_sn)
          console.log('logisticInfo', logisticInfo)
          if (logisticInfo.TaoBaoData && logisticInfo.TaoBaoData.TaoBaoOrderList.length) {
            if (logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].MailNo == null) {
              this.writeLog(`订单【${item.order_sn}】未发货`)
              const result = await this.uploadShippingInfo({
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
            const tbPartnerCode = logisticInfo.TaoBaoData.TaoBaoOrderList[0].TaoBaoBagList[0].PartnerCode
            const tbshippingName = this.changetbOrderName(shippingName)
            console.log(trackingNumber, tbshippingName, 'tbshippingName')
            try {
              var orderID = await this.gettbOrderDetail(item)
            } catch {
              orderID = ''
            }
            console.log(orderID, 'orderID 淘宝')
            // const response1 = await this.orderDelivery(item, trackingNumber, orderID, shippingName)

            // const response1=await this.orderDelivery(item,trackingNumber,orderID,tbshippingName);

            await this.delay(2000)
            try {
              var response = await this.searchOrder(item)
            } catch {
              response = { page: { totalNumber: 0 }}
            }
            console.log(response, '淘宝')
            // return
            const totalNumber = 0
            console.log(totalNumber, 'totalNumber')
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】:${msg}`);
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】`,totalNumber>0?true:false);
            if (totalNumber == 0) {
              const result = await this.uploadShippingInfo({
                sys_mall_id: item.sys_mall_id,
                order_id: item.main_order_sn,
                order_sn: item.order_sn,
                main_order_sn: item.main_order_sn,
                logistics_name: tbPartnerCode ? this.changetbOrderCode(tbPartnerCode) : shippingName,
                tracking_no: trackingNumber,
                order_status: item.order_status,
                delivery_sync_status: 4
              })
              if (this.mode === 'new') {
                const response1 = await this.newOrderDelivery(item, trackingNumber, orderID, shippingName, tbPartnerCode)
              } else {
                const response1 = await this.orderDelivery(item, trackingNumber, orderID, shippingName)
              }
              this.writeLog(`更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'}`, result.message)
              // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
            } else {
              this.writeLog(`订单【${item.order_sn}】已发货`, true)
              const result = await this.uploadShippingInfo({
                sys_mall_id: item.sys_mall_id,
                order_id: item.main_order_sn,
                order_sn: item.order_sn,
                main_order_sn: item.main_order_sn,
                logistics_name: tbPartnerCode ? this.changetbOrderCode(tbPartnerCode) : shippingName,
                tracking_no: trackingNumber,
                order_status: item.order_status,
                delivery_sync_status: 1
              })
              // this.writeLog(`更新订单【${item.order_sn}】物流信息${result.success?"成功":"失败"}`);
            }
          } else {
            this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家淘宝物流信息失败,账号可能不在线.`, false)
            console.log('aback1')
            const result = await this.uploadShippingInfo({
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
          this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家淘宝物流信息失败,账号可能不在线.`, false)
          console.log(item)
          console.log('caback2')
          const result = await this.uploadShippingInfo({
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
     * 京东买手号物流同步
     */
    async jdSyncLogistic(buyerAccount, orders) {
      console.log(buyerAccount)
      const jdService = new BaseUtilService()
      for (let index = 0; index < orders.length; index++) {
        const item = orders[index]
        try {
          const logisticInfo = await jdService.getJxLogisticByOrderIdAsync(buyerAccount, item?.shot_order_sn ?? item.shot_order_info.shot_order_sn)
          console.log('logisticInfo', logisticInfo)
          if (logisticInfo.CarriageId && logisticInfo.Carrier) {
            if (logisticInfo.CarriageId == null) {
              this.writeLog(`订单【${item.order_sn}】未发货`)
              const result = await this.uploadShippingInfo({
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
            const orderID = await this.gettbOrderDetail(item)

            // const response1=await this.orderDelivery(item,trackingNumber,orderID,tbshippingName);

            await this.delay(2000)
            const response = await this.searchOrder(item)
            console.log(response)
            // return
            const { page: { totalNumber }} = response
            console.log(totalNumber, 'totalNumber')
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】:${msg}`);
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】`,totalNumber>0?true:false);
            if (totalNumber == 0) {
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
                const response1 = await this.newOrderDelivery(item, trackingNumber, orderID, shippingName)
              } else {
                const response1 = await this.orderDelivery(item, trackingNumber, orderID, shippingName)
              }
              this.writeLog(`更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'}`, result.message)
              // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
            } else {
              this.writeLog(`订单【${item.order_sn}】已发货`, true)
              const result = await this.uploadShippingInfo({
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
            this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家京东物流信息失败.`, false)
            console.log('aback1')
            const result = await this.uploadShippingInfo({
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
          this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家京东物流信息失败,账号可能不在线.`, false)
          console.log(item)
          console.log('caback2')
          const result = await this.uploadShippingInfo({
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
      console.log(buyerAccount)
      const AliBaBaService = new BaseUtilService()
      for (let index = 0; index < orders.length; index++) {
        const item = orders[index]
        try {
          // 拿到的物流信息是html形式需要解析
          let logisticInfo = await AliBaBaService.getAliBaBaLogisticByOrderIdAsync(buyerAccount, item?.shot_order_sn ?? item.shot_order_info.shot_order_sn)
          // 解析1688物流信息
          const analysisAliBaBaService = new AliBaBaLogistic(logisticInfo)
          const info = await analysisAliBaBaService.getInfo()
          logisticInfo = info
          if (logisticInfo.trackingNumber && logisticInfo.logisticsCompany) {
            if (logisticInfo.trackingNumber == '') {
              this.writeLog(`订单【${item.order_sn}】未发货`)
              const result = await this.uploadShippingInfo({
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
            const tbshippingName = this.changetbOrderName(shippingName)
            console.log(tbshippingName, 'tbshippingName')
            const orderID = await this.gettbOrderDetail(item)

            // const response1=await this.orderDelivery(item,trackingNumber,orderID,tbshippingName);

            await this.delay(2000)
            try {
              var response = await this.searchOrder(item)
            } catch {
              response = { page: { totalNumber: 0 }}
            }
            console.log(response, '1688')
            // return
            // const { page: { totalNumber }} = response
            const totalNumber = 0
            console.log(totalNumber, 'totalNumber')
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】:${msg}`);
            // this.writeLog(`订单【${item.order_sn}】发货${totalNumber>0?"成功":"失败"},快递单号【${trackingNumber}】`,totalNumber>0?true:false);
            if (totalNumber == 0) {
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
                const response1 = await this.newOrderDelivery(item, trackingNumber, orderID, shippingName)
              } else {
                const response1 = await this.orderDelivery(item, trackingNumber, orderID, shippingName)
              }
              this.writeLog(`更新订单【${item.order_sn}】物流信息${result.message ? '成功' : '失败'}`, result.message)
              // this.writeLog(`更新订单【${item.order_sn}】物流信息`);
            } else {
              this.writeLog(`订单【${item.order_sn}】已发货`, true)
              const result = await this.uploadShippingInfo({
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
            this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家1688物流信息失败.`, false)
            console.log('aback1')
            const result = await this.uploadShippingInfo({
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
          this.writeLog(`订单【${item?.shot_order_sn ?? item.shot_order_info.shot_order_sn}】获取上家1688物流信息失败,账号可能不在线.`, false)
          console.log(item)
          console.log('caback2')
          const result = await this.uploadShippingInfo({
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
      const newText = JSON.parse(JSON.stringify(trackingNumber)
        .replace('圆通速递', 'YTO')
        .replace('圆通快递', 'YTO')
        .replace('韵达快递', 'YUNDA')
        .replace('天天快递', 'TTKDEX')
        .replace('顺丰速运', 'SF')
        .replace('顺丰快递', 'SF')
        .replace('百世快递', 'HTKY')
        .replace('申通快递', 'STO')
        .replace('中通快递', 'ZTO')
        .replace('优速快递', 'UC')
        .replace('EMS', 'EMS')
        .replace('国通快递', 'GTO')
        .replace('快捷快递', 'FAST')
        .replace('其它', 'OTHER')
        .replace('极兔速递', 'OTHER')
        .replace('邮政快递包裹', 'POSTB')
        .replace('EMS经济快递', 'EYB'))
      return newText
    }
    // 转换订单状态 物流公司名称
    changetbOrderCode(shippingName) {
      const newText = JSON.parse(JSON.stringify(shippingName)
        .replace('YTO', '圆通速递')
        .replace('YUNDA', '韵达快递')
        .replace('TTKDEX', '天天快递')
        .replace('SF', '顺丰速运')
        .replace('HTKY', '百世快递')
        .replace('ZTO', '中通快递')
        .replace('UC', '优速快递')
        .replace('EMS', 'EMS')
        .replace('GTO', '国通快递')
        .replace('FAST', '快捷快递')
        .replace('OTHER', '其它')
        .replace('POSTB', '邮政快递包裹')
        .replace('EYB', 'EMS经济快递'))
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
        'auctionType': 0,
        'close': 0,
        'pageNum': 1,
        'pageSize': 15,
        'queryMore': 'true',
        'rxAuditFlag': 0,
        'rxElectronicAllFlag': 0,
        'rxElectronicAuditFlag': 0,
        'rxHasSendFlag': 0,
        'rxOldFlag': 0,
        'rxSendFlag': 0,
        'rxSuccessflag': 0,
        'rxWaitSendflag': 0,
        'tradeTag': 0,
        'useCheckcode': 'false',
        'useOrderInfo': 'false',
        'errorCheckcode': 'false',
        'action': 'itemlist/SoldQueryAction',
        'orderId': order.main_order_sn,
        'prePageNo': 1,
        'buyerNick': '',
        'dateBegin': 0,
        'dateEnd': 0,
        'logisticsService': '',
        'queryOrder': 'desc',
        'rateStatus': '',
        'refund': '',
        'sellerNick': '',
        'tabCode': 'haveSendGoods',
        'orderStatus': 'SEND'
      }
      const url = 'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&isFrame=true&from=tejia'
      const response = await this.jdNetworkService.post(url, formdata, { headers: {
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookies: mall.web_login_info,
        referer: 'https://trade.taobao.com/trade/itemlist/list_sold_items.htm?isFrame=true&from=tejia'
      }})
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
    async uploadShippingInfo(params = { sys_mall_id: '', order_id: '', order_sn: '', main_order_sn: '', logistics_name: '', tracking_no: '', delivery_time: '' }) {
      const url = '/api/tbtj/callback/deliver'
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
    async newOrderDelivery(order, trackingNumber, orderID, shippingName, tbPartnerCode) {
      const mall = this.malls.find(n => n.id == order.sys_mall_id)
      const uuid = this.uuid()
      const dateCookie = this.updateCookie(mall, uuid)
      const tbshippingName = this.changetbOrderName(shippingName)
      // 请求接口验证状态
      const param = await this.getNewOrderDelivery(order)
      if (!param) {
        return this.writeLog(`订单【${order.main_order_sn}】获取参数失败`, false)
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
              cpCode: tbPartnerCode || tbshippingName,
              label: tbPartnerCode ? this.changetbOrderCode(tbPartnerCode) : this.changetbOrderCode(shippingName)
            }
          }
        ]
      }
      formdata['x-frames-allow-from'] = 'wuliu2'
      console.log(dateCookie)
      try {
        const url = `https://wuliu2.taobao.com/user/do_consign.do`
        const { data } = await this.jdNetworkService.post(url, formdata, { headers: {
          isGBK: false,
          urlencoded: false,
          'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
          referer: `https://wuliu2.taobao.com/user/consign.htm?tradeId=${order.main_order_sn}&x-frames-allow-from=wuliu2`,
          origin: 'https://wuliu2.taobao.com',
          cookies: JSON.stringify(dateCookie)
        }})
        console.log(data)
        if (data.success) {
          const result = await this.uploadShippingInfo({
            sys_mall_id: order.sys_mall_id,
            order_id: order.main_order_sn,
            order_sn: order.order_sn,
            main_order_sn: order.main_order_sn,
            logistics_name: tbPartnerCode ? this.changetbOrderCode(tbPartnerCode) : shippingName,
            // logistics_name: shippingName,
            tracking_no: trackingNumber,
            order_status: 4,
            delivery_sync_status: 1
          })
          return this.writeLog(`订单【${order.main_order_sn}】发货成功,快递单号【${trackingNumber}】`, true)
        }

        this.writeLog(`订单【${order.main_order_sn}】发货失败,快递单号【${trackingNumber}】</br> 淘宝官方平台错误信息：${data.message}`, false)
      } catch (e) {
        this.writeLog(`订单【${order.main_order_sn}】发货失败,快递单号【${trackingNumber}】`, false)
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
        const { data } = await this.jdNetworkService.get(url, { headers: {
          isGBK: false,
          cookies: mall.web_login_info,
          accept: 'application/json',
          'Accept-Encoding': 'gzip, deflate, br',
          referer: url
        }})

        if (data && data.success === false) {
          this.writeLog(`订单【${mainOrderSn}】不是发货状态,出库失败`, false)
          return false
        }

        const sourData = data.data
        const orderId = sourData?.OrderBlock?.fields.dataSource[0]?.baseInfo?.fields[0]?.value
        const receiverDisplayAddress = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[0]?.value
        const receiverMobilePhone = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[1]?.value
        const receiverProvince = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[2]?.value
        const receiverDetailAddress = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[3]?.value
        const receiverCity = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[4]?.value
        const receiverCountryId = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[5]?.value
        const receiverDivisionId = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[7]?.value
        const receiverZipCode = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[9]?.value
        const receiverContactName = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[10]?.value
        const receiverDistrict = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[11]?.value
        const receiverTown = sourData?.OrderBlock?.fields?.dataSource[0]?.children[0]?.info.fields[13]?.value
        const fetcherContactId = sourData?.ContactsBlock.fields.dataSource[0].fields[0].value
        const refunderContactId = sourData?.ContactsBlock.fields.dataSource[1].fields[0].value
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
      const { Street, ZipCode, sender_city, sender_name, sender_county, sender_mobile, sender_address, sender_province } = order.mall_address
      const { state, city, town, zip_code, phone, buyer_name, detail_address } = order.receiver_info
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
      formdata.J_SetUrl = '//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies'
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
        const { data } = await this.jdNetworkService.post(url, formdata, { headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          'origin': 'https://wuliu.taobao.com',
          'Host': 'wuliu.taobao.com',
          'Accept-Encoding': 'gzip, deflate, br',
          cookies: mall.web_login_info
        }})
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
          this.writeLog(`订单【${order.main_order_sn}】发货成功,快递单号【${trackingNumber}】`, true)
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
      const { Street, ZipCode, sender_city, sender_name, sender_county, sender_mobile, sender_address, sender_province } = order.mall_address
      const { state, city, town, zip_code, phone, buyer_name, detail_address } = order.receiver_info
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
      formdata.J_SetUrl = '//wuliu.taobao.com/user/consign_setting.htm?tab_source=setDefCompanies'
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
        const { data } = await this.jdNetworkService.post(url, formdata, { headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9',
          'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/85.0.4183.121 Safari/537.36',
          'origin': 'https://wuliu.taobao.com',
          'Host': 'wuliu.taobao.com',
          'Accept-Encoding': 'gzip, deflate, br',
          cookies: mall.web_login_info
        }})
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
          this.writeLog(`订单【${order.main_order_sn}】无需物流发货成功,快递单号【${trackingNumber}】`, true)
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
    // 获取全局设置
    async getGlobalSetting() {
      const url = '/api/user/getOverallFit'
      const { data } = await this.jszNetworkService.get(url)
      this.allSeting = data.data
    }
    /**
     * 获取需要同步的物流
     * @param {*} params
     */
    async getNoShippenOrder(params = { page: 1, systemMallId: '', createdTime: '' }) {
      let result = []
      const url = '/api/tbtj/order/deliver'
      const response = await this.jszNetworkService.get(url, { params: params })
      if (response.data.code == 200) {
        result = response.data.data.list
      }
      console.log(result)
      return result
    }

    async delay(time) {
      return new Promise((resolve) => {
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
    getPddOrder(buyerAccount, orderId) {

    }
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
