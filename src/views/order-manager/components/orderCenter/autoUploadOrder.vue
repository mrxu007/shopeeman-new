<!--
 * @Author: your name
 * @Date: 2021-11-12 10:09:55
 * @LastEditTime: 2021-11-12 11:29:31
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\autoUploadOrder.vue
-->
<template>
  <div class="auto-order">
    <Logs ref="Logs" clear v-model="showConsole" class="logBox" />
  </div>
</template>

<script >
import { syncStatusAll, statusListSecond, statusListThird } from './orderCenter'
import orderSync from '../../../../services/timeOrder'
export default {
  data() {
    return {
      showConsole: false,
      mallList: [],
      statusListFirst: syncStatusAll,
      statusListSecond: statusListSecond,
      statusListThird: statusListThird,
    }
  },
  mounted() {
    this.getAllMall()
    //first task 每隔4小时同步一次
    setTimeout(() => {
      this.syncOrders(this.statusListFirst, 'auto-first')
      setInterval(() => {
        this.syncOrders(this.statusListFirst, 'auto-first')
      }, 4 * 60 * 60 * 1000)
    }, 5 * 60 * 1000)
    //second task 每隔30分钟同步一次
    setTimeout(() => {
      this.syncOrders(this.statusListSecond, 'auto-second')
      setInterval(() => {
        this.syncOrders(this.statusListSecond, 'auto-second')
      }, 30 * 60 * 1000)
    }, 8 * 60 * 1000)
    //third task 每隔60分钟同步一次
    setTimeout(() => {
      this.syncOrders(this.statusListThird, 'auto-third')
      setInterval(() => {
        this.syncOrders(this.statusListThird, 'auto-third')
      }, 60 * 60 * 1000)
    }, 8 * 60 * 1000)
  },
  methods: {
    //a.第一个定时任务（同步 toship、shipping、completed、cancelled、refund）：5分钟后启动后每隔4小时同步一次
    //b.第二个定时任务（同步 toship、cancelled、refund）：8分钟后启动后每隔30分钟同步一次
    //c.第三个定时任务（同步 shipping、completed）：8分钟后启动后每隔60分钟同步一次
    async syncOrders(statusList, type) {
      this.$refs.Logs.writeLog(`【${type}】开始同步`, true)
      for (let mI = 0; mI < this.mallList.length; mI++) {
        let mall = this.mallList[mI]
        for (let i = 0; i < statusList.length; i++) {
          //同步状态
          let statusObj = statusList[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${this.mallList.length}`, type)
        }
      }
    },
    async getAllMall() {
      let res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
      let mallObject = res && JSON.parse(res)
      if (mallObject) {
        for (const key in mallObject) {
          this.mallList.push(mallObject[key])
        }
      }
      console.log(this.mallList, JSON.parse(res))
    },
  },
}
</script>

<style lang="less" scoped>
.auto-order {
  /deep/.showLogBox {
    height: 600px;
    width: 800px;
    .consoleBox {
      height: 600px;
      width: 800px;
    }
  }
}
</style>