<template>
  <div class="auto-order">
    <Logs ref="Logs" v-model="showConsole" clear class="logBox"/>
  </div>
</template>

<script>
import { syncStatusAll, syncStatusFirst, statusListSecond, statusListThird } from './orderCenter'
import orderSync from '../../../../services/timeOrder'
import surFaceService from '../../../../services/surfaceOrder'
import LogisticeSyncService from '../../../../services/logistics-sync-service/logistics-sync-service-new-copy'
export default {
  data() {
    return {
      showConsole: false,
      mallList: [],
      statusListFirst: syncStatusFirst,
      statusListSecond: statusListSecond,
      statusListThird: statusListThird,
      orderService: new orderSync(),
      surFaceService: new surFaceService(),
      logisticeSyncService: new LogisticeSyncService(),
      buyerAccountList: [],
      logisiticeTime: 2,
      isAutoLogisitice: '2', //1：自动获取 2：不自动获取
    }
  },
  mounted() {
    this.getAllMall()
    this.$refs.Logs.writeLog(`定时任务分别在五分钟、八分钟之后开启`, true)
    window['BaseUtilBridgeService'].checkAutoScriptLog('定时任务分别在五分钟、八分钟之后开启')
    try {
      //自动同步物流，软件启动后6分钟开始，间隔N小时，间隔时间可设置，需要从设置信息中获取
      this.syncLogis()

      // first task 每隔4小时同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListFirst, 'auto-first', 60)
        setInterval(() => {
          this.syncOrders(this.statusListFirst, 'auto-first', 60)
        }, 4 * 60 * 60 * 1000)
      }, 5 * 60 * 1000)
      // second task 每隔30分钟同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListSecond, 'auto-second', 60)
        setInterval(() => {
          this.syncOrders(this.statusListSecond, 'auto-second', 60)
        }, 30 * 60 * 1000)
      }, 8 * 60 * 1000)
      // third task 每隔60分钟同步一次
      setTimeout(() => {
        this.syncOrders(this.statusListThird, 'auto-third', 60)
        setInterval(() => {
          this.syncOrders(this.statusListThird, 'auto-third', 60)
        }, 60 * 60 * 1000)
      }, 8 * 60 * 1000)
      // 自动同步面单 8分钟开启，2小时间隔
      setTimeout(() => {
        this.syncFaceData()
        setInterval(() => {
          this.syncFaceData()
        }, 2 * 60 * 60 * 1000)
      }, 8 * 60 * 1000)
    } catch (error) {
      this.$refs.Logs.writeLog(`error${error}`, false)
      console.log(error, 'errorerrorerrorerrorerror')
    }
  },
  methods: {
    async syncLogis() {
      let configInfo = await window['ConfigBridgeService'].getUserConfig()
      configInfo = configInfo && JSON.parse(configInfo) || {}
      this.isAutoLogisitice = (configInfo && configInfo.is_auto_ori_logistics) || '1'
      this.logisiticeTime = (configInfo && configInfo.ori_logistics_interval_time) || 4
      if (this.isAutoLogisitice === '1') {
        await this.getAccountList()
        //自动同步物流，软件启动后6分钟开始，间隔N小时，间隔时间可设置，需要从设置信息中获取
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
      for (let mI = 0; mI < this.mallList.length; mI++) {
        const mall = this.mallList[mI]
        for (let i = 0; i < statusList.length; i++) {
          // 同步状态
          const statusObj = statusList[i]
          // const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await this.orderService.start(`${mI + 1}/${this.mallList.length}`, type, timeRange, mall, statusObj, this, this.$refs.Logs.writeLog)
        }
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
      console.log(this.mallList, JSON.parse(res))
    },
    async syncFaceData() {
      this.$refs.Logs.writeLog(`开始同步面单---------------------------`, true)
      window['BaseUtilBridgeService'].checkAutoScriptLog('开始同步面单、平台物流')
      // const service = new surFaceService(this, this.$refs.Logs.writeLog)
      this.surFaceService.autoStart(this, this.$refs.Logs.writeLog)
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
      await this.logisticeSyncService.start(this, this.buyerAccountList, this.$refs.Logs.writeLog)
    },
  },
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
