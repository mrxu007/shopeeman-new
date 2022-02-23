<!--
 * @Author: your name
 * @Date: 2021-11-12 10:09:55
 * @LastEditTime: 2022-02-21 14:50:27
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\autoUploadOrder.vue
-->
<template>
  <div class="auto-order">
    <Logs ref="Logs" v-model="showConsole" clear class="logBox" />
  </div>
</template>

<script >
import { syncStatusAll, syncStatusFirst, statusListSecond, statusListThird } from './orderCenter'
import orderSync from '../../../../services/timeOrder'
import surFaceService from '../../../../services/surfaceOrder'
export default {
  data() {
    return {
      showConsole: false,
      mallList: [],
      statusListFirst: syncStatusFirst,
      statusListSecond: statusListSecond,
      statusListThird: statusListThird
    }
  },
  mounted() {
    this.getAllMall()
    this.$refs.Logs.writeLog(`定时任务分别在五分钟、八分钟之后开启`, true)
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
  },
  methods: {
    // a.第一个定时任务（同步 toship、shipping、completed、cancelled、refund）：5分钟后启动后每隔4小时同步一次 改all
    // b.第二个定时任务（同步 toship、cancelled、refund）：8分钟后启动后每隔30分钟同步一次
    // c.第三个定时任务（同步 shipping、completed）：8分钟后启动后每隔60分钟同步一次
    async syncOrders(statusList, type, timeRange) {
      this.$refs.Logs.writeLog(`【${type}】开始同步`, true)
      for (let mI = 0; mI < this.mallList.length; mI++) {
        const mall = this.mallList[mI]
        for (let i = 0; i < statusList.length; i++) {
          // 同步状态
          const statusObj = statusList[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${this.mallList.length}`, type, timeRange)
        }
      }
    },
    async getAllMall() {
      const res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
      const mallObject = res && JSON.parse(res)
      if (mallObject) {
        for (const key in mallObject) {
          this.mallList.push(mallObject[key])
          // if(mallObject[key].platform_mall_id == "333281690"){
          //   this.mallList.push(mallObject[key])
          // }
        }
      }
      console.log(this.mallList, JSON.parse(res))
    },
    async syncFaceData() {
      this.$refs.Logs.writeLog(`开始同步面单---------------------------`, true)
      const service = new surFaceService(this, this.$refs.Logs.writeLog)
      service.autoStart()
    }
  }
}
</script>

<style lang="less" scoped>
.auto-order {
  /deep/.showLogBox {
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
