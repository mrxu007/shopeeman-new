<template>
  <div class="detail" style="padding:10px">
    <div
      class="condition"
      style="display: flex;"
    >
      <store-choose style="margin-left:-20px" :source="'true'" :input-width="'160px'" @changeMallList="changeMallList"  />
      <el-button type="primary" size="mini" :loading="isStart" @click="startCompare">开始同步</el-button>
      <el-button type="primary" size="mini" @click="cancerCompare">取消同步</el-button>
      <el-button type="primary" size="mini" @click="closelogData">清空日志</el-button>
      <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>
    </div>
    <div style="color:red;margin:10px 0px ">温馨提示：此功能为同步虾皮后台已删除商品至云端</div>
    <div class="tableDes">
      <el-table
        height="calc(100vh - 70px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }">
        <el-table-column label="序号" type="index" align="center" fixed />
        <el-table-column prop="country" label="站点" align="center" min-width="100px">
          <template slot-scope="{row}">{{ row.country | chineseSite }}</template></el-table-column>
        <el-table-column prop="" label="店铺名称" align="center" min-width="100px">
          <template slot-scope="{row}">{{ row.mall_alias_name ? row.mall_alias_name : row.platform_mall_name }}</template>
        </el-table-column>
        <el-table-column prop="totalGoods" label="虾皮商品总数" align="center" min-width="100px">
          <template v-slot="{row}">{{ row.totalGoods? row.totalGoods:'--' }}</template>
        </el-table-column>
        <el-table-column prop="getGoods" label="已获取虾皮商品数量" align="center" min-width="100px">
          <template v-slot="{row}">{{ row.getGoods? row.getGoods:'--' }}</template>
        </el-table-column>
        <el-table-column prop="endstatus" label="同步状态" align="center" min-width="120px" fixed="right" />
      </el-table>
      <Logs ref="autoReplyLogs" v-model="showlog" clear />
    </div>
  </div>
</template>
<script>
import { forEach } from 'jszip'
import storeChoose from '../../../components/store-choose'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
import { batchOperation, terminateThread } from '../../../util/util'
export default {
  components: { storeChoose },
  data() {
    return {
      platformData: {}, // 上家平台数据
      nextTime: null,
      firstTime: null,
      isStart: false,
      dataRuning: false,
      showlog: true,
      tableList: [],
      query: {
        country: 'TH',
        mallGroupIds: []
      },
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      // plantDate: [], // 平台数据
      selectMall: [], // 选择的店铺
      mallTimeList: [] // 定时任务存储
    }
  },
  created() {
    // this.getinfo() // 获取店铺信息
    // 定时任务存储
  },
  methods: {
    // 解密ParentSKU
    async decryptShopeeItemSku(itemSku) {
      try {
        const regexp = /^[+-]?\d*[.]?\d*$/
        if (itemSku.length < 30) {
          const res = await this.$userInfo.user_create_time
          if (res) {
            const userTime = new Date(res).getTime()
            const encryptionTime = new Date('2018-12-20 00:00:00').getTime()
            if (userTime > encryptionTime) {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          }
          if (itemSku.indexOf('_') > -1) {
            const arr = itemSku.split('_')
            if (regexp.test(arr[0]) && regexp.test(arr[1])) {
              const intPlatform = Number(arr[1])
              if (intPlatform === 1 || intPlatform === 2 || intPlatform === 3 || intPlatform === 5 || intPlatform === 6 || intPlatform === 7 || intPlatform === 8) {
                this.platformData['platform'] = intPlatform
                this.platformData['productId'] = arr[0]
              } else {
                this.platformData['platform'] = 5
                this.platformData['productId'] = itemSku
              }
            } else {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          } else {
            if (regexp.test(itemSku)) {
              this.platformData['platform'] = 1
              this.platformData['productId'] = itemSku
            } else {
              this.platformData['platform'] = 5
              this.platformData['productId'] = itemSku
            }
          }
        } else {
          const res = await this.$BaseUtilService.decGoodCode(itemSku)
          if (res.indexOf('-') > -1) {
            const arr = res.split('-')
            this.getPlatformSimpleStr(arr[0], arr)
          } else {
            this.platformData['platform'] = 5
            this.platformData['productId'] = itemSku
          }
        }
      } catch (error) {
        console.log('解密异常', error)
      }
    },
    // 匹配上家平台
    getPlatformSimpleStr(name, arr) {
      try {
        const id = arr[1]
        if (name.toLocaleLowerCase() === 'pdd') {
          this.platformData['platform'] = 1
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tb') {
          this.platformData['platform'] = 2
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tm') {
          this.platformData['platform'] = 2
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'tb') {
          this.platformData['platform'] = 3
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'own') {
          this.platformData['platform'] = 5
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'ghpt') {
          this.platformData['platform'] = 6
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'alibaba') {
          this.platformData['platform'] = 8
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'hyj' || name.toLocaleLowerCase() === 'hlb') {
          this.platformData['platform'] = 7
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
          this.platformData['shopId'] = arr[3]
        } else if (name.toLocaleLowerCase() === 'shopee') {
          this.platformData['platform'] = 11
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
          this.platformData['shopId'] = arr[3]
        } else if (name.toLocaleLowerCase() === 'aliexpress') {
          this.platformData['platform'] = 12
          this.platformData['productId'] = id
        } else if (name.toLocaleLowerCase() === 'lazada') {
          this.platformData['platform'] = 9
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'hyjhw') {
          this.platformData['platform'] = 15
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'jx') {
          this.platformData['platform'] = 10
          this.platformData['productId'] = id
          this.platformData['site'] = arr[2]
        } else if (name.toLocaleLowerCase() === 'crossbroder') {
          this.platformData['platform'] = 13
          this.platformData['productId'] = id
          this.platformData['userId'] = arr.Length > 2 ? arr[2] : ''
        }
      } catch (error) {
        console.log('匹配上家异常', error)
      }
    },
    // 清空日志
    closelogData() {
      this.$refs.autoReplyLogs.consoleMsg = ''
    },
    // 时间格式转换
    add0(m) { return m < 10 ? '0' + m : m },
    formatTime(val) {
      var time = new Date(val)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    // 取消同步
    cancerCompare() {
      // alert(this.dataRuning)
      this.dataRuning = true
      terminateThread()
      this.$refs.autoReplyLogs.writeLog(`正在取消同步---------`)
      // this.$message.success('正在取消同步，大概需要几秒，请耐心等待......')
    },
    async startCompare() {
      this.closelogData()
      this.isStart = true
      this.showlog = false
      this.dataRuning = false
      await this.getinfo()
      await batchOperation(this.tableList, this.comparefun)
      this.$refs.autoReplyLogs.writeLog(`数据请求结束---------`)
      this.isStart = false
    },
    async comparefun(item, count = { count: 1 }) {
      try {
        const goodsinfo = {
          country: this.query.country,
          page_number: 1,
          mallId: item.platform_mall_id,
          page_size: 48
        }
        if (this.dataRuning) { // 终止循环---------
          return
        }
        this.$set(item, 'totalGoods', 0)
        this.$set(item, 'getGoods', 0)
        this.$set(item, 'endstatus', '')
        // 获取官网商品
        const plantList = []// 平台数据
        const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
        if (res.ecode !== 0) {
          this.$set(item, 'endstatus', '店铺未登录')
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】平台数据：店铺未登录`, false)
          return
        }
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】正在获取平台数据`)
        // 四小时同步一次
        const mallName = item.mall_alias_name || item.platform_mall_name
        const TimeList = await this.$appConfig.temporaryCacheInfo('get', 'mallTimeList', '')
        let mallTimeList = JSON.parse(TimeList)
        if (mallTimeList.length) {
          const des = mallTimeList.findIndex(el => { return el.mallName === mallName })
          if (des >= 0) {
            if (mallTimeList[des].nextTime > new Date().getTime()) {
              this.$set(item, 'endstatus', `同步时间未到,下次时间：${this.formatTime(mallTimeList[des].nextTime)}`)
              this.$refs.autoReplyLogs.writeLog(`【店铺：${mallName}】每4小时可进行一次同步，下次同步时间为【${this.formatTime(mallTimeList[des].nextTime)}】`, true)
              return
            } else {
              mallTimeList[des].nextTime = new Date().getTime() + 3600 * 4 * 1000
            }
          } else {
            const mallinfo = {
              mallName: mallName,
              firstTime: new Date().getTime(),
              nextTime: new Date().getTime() + 3600 * 4 * 1000
            }
            mallTimeList.push(mallinfo)
          }
        } else {
          const mallinfo = {
            mallName: mallName,
            firstTime: new Date().getTime(),
            nextTime: new Date().getTime() + 3600 * 4 * 1000
          }
          // mallTimeList.push(mallinfo)
          mallTimeList = [mallinfo]
        }
        this.$appConfig.temporaryCacheInfo('save', 'mallTimeList', mallTimeList)
        // ---end---//
        let array = res.ecode === 0 ? res.data.list : []
        const total = res.data.page_info.total
        if (!total) {
          this.$set(item, 'endstatus', '平台无数据')
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】平台暂无商品`, true)
          return
        }
        console.log('277', array)
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】平台商品总数${total}个`, true)
        while (array.length) {
          if (this.dataRuning) { // 终止循环---------
            return
          }
          this.$set(item, 'totalGoods', total)
          this.$set(item, 'getGoods', Number(item.getGoods) + array.length)
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】正获取第【${goodsinfo.page_number}】页数据,一页${goodsinfo.page_size}个`, true)
          for (let i = 0; i < array.length; i++) { // 解析IP
            const el = array[i]
            await this.decryptShopeeItemSku(el.parent_sku)
            if (this.platformData.platform !== '5' && this.platformData.productId) { // 获取上家IP
              plantList.push({ homeID: this.platformData.productId, gID: el.id })
            }
          }
          if (array.length < 48) {
            array = []
          } else {
            goodsinfo.page_number++
            const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
            array = res.ecode === 0 ? res.data.list : []
          }
        }
        console.log('300', plantList)
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】平台数据获取结束`)
        // 获取服务端商品
        let serList = []
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】正在获取服务端数据`)
        const res0 = await this.$commodityService.getMallAllRecordList(item.id.toString())
        if (JSON.parse(res0).code === 200) {
          serList = JSON.parse(res0).code === 200 ? JSON.parse(res0).data.info : []
          console.log('307', serList) // listing_id 商品id
          if (serList.length) {
            this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端商品总数${serList.length}个`, true)
          } else {
            this.$set(item, 'endstatus', '服务端无数据')
            this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端商品暂无商品信息`, true)
            return
          }
        } else {
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端商品数据：${JSON.parse(res0).msg}`, false)
          return
        }
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端数据获取结束`)
        // 同步--获取被删除的商品数据
        const delList = []
        serList.forEach(ol => {
          const num = plantList.findIndex(el => { return Number(el.homeID) === Number(ol.item_sku) })
          if (num < 0) {
            delList.push({ [ol.sys_mall_id.toString()]: ol.item_sku })
          }
        })
        let delL = delList.splice(0, 100)// 一次上限一百
        console.log('delL', delL)
        if (!delL.length) {
          this.$set(item, 'endstatus', '已是同步状态')
          this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】无需删除，已是同步状态`, true)
          return
        }
        while (delL.length) {
          if (this.dataRuning) { // 终止循环---------
            return
          }
          console.log('delCloudItems - params', delL)
          const tes = await this.$commodityService.delCloudItems(JSON.stringify(delL))
          console.log('delCloudItems', tes)
          const jsontes = JSON.parse(tes)
          if (jsontes.code === 200) {
            this.$set(item, 'endstatus', `同步成功，同步成功数：${delL.length}`)
            this.$refs.autoReplyLogs.writeLog(`-----------`, true)
            this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端已删除【${delL.length}】个商品`, true)
            this.$refs.autoReplyLogs.writeLog(`-----------`, true)
          } else {
            this.$set(item, 'endstatus', `同步失败`)
            this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】服务端删除失败，${jsontes.msg}`, false)
            return
          }
          if (delList.length < 100) {
            delL = []
          } else {
            delL = delList.splice(0, 100)
          }
        }
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】同步完成`)
      } catch (error) {
        this.$refs.autoReplyLogs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】同步失败，发生异常：${error}`, false)
      } finally {
        count.count--
      }
    },
    async getinfo() {
      this.tableList = []
      this.selectMall.forEach(el => {
        // el.totalGoods = 0
        // el.getGoods = 0
        el.plantDate = [] // 官方获取的数据
        this.tableList.push(el)
      })
    },
    // 获取店铺分组
    changeMallList(val) {
      if (val){
        this.selectMall = val.mallList
        this.query.country = val.country
      }
    },
  }
}
</script>
