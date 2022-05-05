<template>
  <div class="auto-order">
    <Logs ref="Logs" v-model="showConsole" clear class="logBox" />
  </div>
</template>

<script>
import { syncStatusFirst, statusListSecond, statusListThird } from './orderCenter'
import orderSync from '../../../../services/timeOrder'
import surFaceService from '../../../../services/surfaceOrder'
import LogisticeSyncService from '../../../../services/logistics-sync-service/logistics-sync-service-new-copy'
import { AutoAddFence } from '@/views/order-manager/components/orderCenter/powderFence'
import { topGoods } from '@/views/market-activity/components/topGoods'
import { batchOperation } from '@/util/util'
export default {
  data() {
    return {
      topGoodsInstance: new topGoods(),
      AutoAddFenceInstance: new AutoAddFence(this),
      showConsole: false,
      mallList: [],
      statusListFirst: syncStatusFirst,
      statusListSecond: statusListSecond,
      statusListThird: statusListThird,
      buyerAccountList: [],
      logisiticeTime: 2,
      isAutoLogisitice: '1', // 2：自动获取 1：不自定获取
      isApplyShopeeLogistics: '2' // 1：申请 2：不申请
    }
  },
  async mounted() {
    await this.getAllMall()
    this.$refs.Logs.writeLog(`定时任务分别在五分钟、八分钟之后开启`, true)
    window['BaseUtilBridgeService'].checkAutoScriptLog('定时任务分别在五分钟、八分钟之后开启')
    try {
      // 自动同步物流，软件启动后6分钟开始，间隔N小时，间隔时间可设置，需要从设置信息中获取
      this.syncLogis()
      // 自动同步虾皮物流、面单
      this.syncShopeeFace()
      // first task 每隔4小时同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListFirst, 'auto-first', 60)
        setInterval(() => {
          this.syncOrders(this.statusListFirst, 'auto-first', 60)
        }, 4 * 60 * 60 * 1000)
      }, 0 * 60 * 1000)
      // second task 每隔30分钟同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListSecond, 'auto-second', 60)
        setInterval(() => {
          this.syncOrders(this.statusListSecond, 'auto-second', 60)
        }, 30 * 60 * 1000)
      }, 0 * 60 * 1000)
      // third task 每隔60分钟同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListThird, 'auto-third', 60)
        setInterval(() => {
          this.syncOrders(this.statusListThird, 'auto-third', 60)
        }, 60 * 60 * 1000)
      }, 0 * 60 * 1000)
      // 爆粉神器
      this.checkTimeAutoFollow()
      // 商品置顶
      this.goodsTop()
    } catch (error) {
      this.$refs.Logs.writeLog(`error${error}`, false)
      console.log(error, 'errorerrorerrorerrorerror')
    }
  },
  methods: {
    // 自动同步面单 8分钟开启，2小时间隔
    async syncShopeeFace() {
      try {
        let configInfo = await this.$appConfig.getUserConfig()
        configInfo = configInfo && JSON.parse(configInfo) || {}
        this.isApplyShopeeLogistics = (configInfo && configInfo.is_apply_shopee_logistics) || '2'
        if (this.isApplyShopeeLogistics === '1') {
          setTimeout(() => {
            this.syncFaceData()
            setInterval(() => {
              this.syncFaceData()
            }, 2 * 60 * 60 * 1000)
          }, 8 * 60 * 1000)
          // 仓库中没有面单 一小时 三分钟
          setTimeout(() => {
            this.syncFaceStore()
            setInterval(() => {
              this.syncFaceStore()
            }, 1 * 60 * 60 * 1000)
          }, 3 * 60 * 1000)
          // 订单中没有面单 2小时 5分钟
          setTimeout(() => {
            this.syncFaceNoFace()
            setInterval(() => {
              this.syncFaceNoFace()
            }, 2 * 60 * 60 * 1000)
          }, 5 * 60 * 1000)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`面单,${error}`, false)
      }
    },
    async syncLogis() {
      let configInfo = await this.$appConfig.getUserConfig()
      configInfo = configInfo && JSON.parse(configInfo) || {}
      this.isAutoLogisitice = (configInfo && configInfo.is_auto_ori_logistics) || '1'
      this.logisiticeTime = (configInfo && configInfo.ori_logistics_interval_time) || 4
      if (this.isAutoLogisitice === '2') {
        await this.getAccountList()
        // 自动同步物流，软件启动后6分钟开始，间隔N小时，间隔时间可设置，需要从设置信息中获取
        setTimeout(() => {
          this.logisticeSync()
          setInterval(() => {
            this.logisticeSync()
          }, Number(this.logisiticeTime) * 60 * 60 * 1000)
        }, 6 * 60 * 1000)
      }
    },
    // a.第一个定时任务（同步 toship、shipping、completed、cancelled、refund）：5分钟后启动后每隔4小时同步一次 改all
    // b.第二个定时任务（同步 toship、cancelled、refund）：8分钟后启动后每隔30分钟同步一次
    // c.第三个定时任务（同步 shipping、completed）：8分钟后启动后每隔60分钟同步一次
    async syncOrders(statusList, type, timeRange) {
      window['BaseUtilBridgeService'].checkAutoScriptLog('开始自动同步订单')
      this.$refs.Logs.writeLog(`【${type}】开始同步`, true)
      const dataList = this.mallList.map(son => {
        return {
          mall: son,
          statusList,
          type,
          timeRange
        }
      })
      const count = 6
      await batchOperation(dataList, this.batchSync, count)
      this.$refs.Logs.writeLog(`【${type}】同步完成！！！！！`, true)
    },
    async batchSync(item, count = { count: 1 }) {
      try {
        // console.log('zz - data', item, count)
        const mall = item.mall
        const statusList = item.statusList
        const type = item.type
        const timeRange = item.timeRange
        for (let i = 0; i < statusList.length; i++) {
        // 同步状态
          const statusObj = statusList[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          // const num = this.mallList.length - count.count + 1
          await orderService.start(`sync-order`, type, timeRange)
        }
      } catch (e) {
        console.log(e)
      } finally {
        count.count--
      }
    },
    async getAllMall() {
      const res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
      const mallObject = res && JSON.parse(res)
      if (mallObject) {
        for (const key in mallObject) {
          this.mallList.push(mallObject[key])
        }
      }
    },
    async syncFaceData() {
      this.$refs.Logs.writeLog(`开始同步面单---------------------------`, true)
      window['BaseUtilBridgeService'].checkAutoScriptLog('开始同步面单、平台物流')
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.autoStart()
    },
    async getAccountList() {
      const { data } = await this.$api.getBuyerList()
      if (data.code === 200) {
        this.buyerAccountList = data.data
      }
    },
    async logisticeSync() {
      window['BaseUtilBridgeService'].checkAutoScriptLog('开始自动同步采购物流')
      this.$refs.Logs.writeLog(`开始自动同步采购物流---------------------------`, true)
      const logisiService = new LogisticeSyncService()
      await logisiService.start(this, this.buyerAccountList, this.$refs.Logs.writeLog)
    },
    // 爆粉生神器--自动刷粉
    checkTimeAutoFollow() {
      // 检测站点任务
      setTimeout(() => {
        this.AutoAddFenceInstance.autoAddFenceActive()
      }, 10 * 60 * 1000)
    },
    // 商品置顶
    goodsTop() {
      setTimeout(() => {
        this.topGoodsInstance.init()
      }, 8 * 60 * 1000)
    },
    // 仓库中没有面单
    async syncFaceStore() {
      this.$refs.Logs.writeLog(`开始同步仓库中没有面单`, true)
      console.log(this.$refs.Logs.writeLog, this.$refs.Logs, '---------------')
      // window['BaseUtilBridgeService'].checkAutoScriptLog('开始同步仓库中没有面单')
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.autoStartStore()
    },
    // 订单中没有面单
    async syncFaceNoFace() {
      // window['BaseUtilBridgeService'].checkAutoScriptLog('开始同步订单中没有面单')
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.autoStartNoLogi()
    }
  }
}
</script>

<style lang="less" scoped>
.auto-order {
  /deep/ .showLogBox {
    height: 600px;
    width: 800px;
    bottom: 100px;

    .consoleBox {
      height: 600px;
      width: 800px;
    }
  }
}
</style>
