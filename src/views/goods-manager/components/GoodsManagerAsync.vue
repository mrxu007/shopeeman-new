<template>
  <div v-loading="loading" class="detail" style="padding:10px">
    <div
      class="condition"
      style="display: flex;"
    >
      <Storechoosemall :show-mall="true" @changeMallList="changeMallList" @getSite="changeSite" />
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
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column label="序号" type="index" align="center" fixed />
        <el-table-column prop="country" label="站点" align="center" min-width="100px">
          <template slot-scope="{row}">{{ row.country | chineseSite }}</template></el-table-column>
        <el-table-column prop="" label="店铺名称" align="center" min-width="100px">
          <template slot-scope="{row}">{{ row.mall_alias_name ? row.mall_alias_name : row.platform_mall_name }}</template>
        </el-table-column>
        <el-table-column prop="totalGoods" label="虾皮商品总数" align="center" min-width="100px" />
        <el-table-column prop="getGoods" label="已获取虾皮商品数量" align="center" min-width="100px" fixed="right" />
      </el-table>
      <Logs ref="autoReplyLogs" v-model="showlog" clear />
    </div>
  </div>
</template>
<script>
import Storechoosemall from '../../../components/store-choose-mall'
import GoodsManagerAPI from '../../../module-api/goods-manager-api/goods-data'
export default {
  components: { Storechoosemall },
  data() {
    return {
      isStart: false,
      dataRuning: false,
      loading: false,
      showlog: true,
      tableList: [],
      query: {
        country: 'TH',
        mallGroupIds: []
      },
      GoodsManagerAPIInstance: new GoodsManagerAPI(this),
      plantDate: []// 平台数据
    }
  },
  created() {
    // this.getinfo() // 获取店铺信息
  },
  methods: {
    // 清空日志
    closelogData() {
      this.$refs.autoReplyLogs.consoleMsg = ''
    },
    // 取消同步
    cancerCompare() {
      // alert(this.dataRuning)
      this.dataRuning = true
      this.$message.success('正在取消同步，大概需要几秒，请耐心等待......')
    },
    // 开始同步
    async startCompare() {
      this.isStart = true
      this.showlog = false
      this.dataRuning = false
      await this.getinfo()
      for (var i = 0; i < this.tableList.length; i++) {
        if (this.dataRuning) { // 终止循环---------
          break
        }
        const goodsinfo = {
          country: this.query.country,
          page_number: 1,
          mallId: this.tableList[i].platform_mall_id,
          page_size: 48
        }
        this.plantDate = [] // 服务端数据
        let arrIndex = 2

        // 循环获取平台商品
        for (let index = 1; index <= arrIndex; index++) {
          goodsinfo.page_number = index
          this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】正在获取虾皮商品数据...`, true)
          const res = await this.GoodsManagerAPIInstance.getSkuList(goodsinfo)
          if (this.dataRuning) { // 终止循环---------
            this.$refs.autoReplyLogs.writeLog(`取消同步`)
            break
          }
          // console.log('************', res)
          if (res.ecode === 0) {
            const total = res.data.page_info.total
            const psize = res.data.page_info.page_size
            arrIndex = total / psize === 0 ? total / psize : Math.floor(total / psize) + 1
            this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】商品总数${res.data.page_info.total}个`, true)
            this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】正获取第【${index}】页数据,一页${goodsinfo.page_size}个`, true)
            const lol = res.data.list
            this.plantDate.push(...lol)
            this.tableList[i].totalGoods = total
            this.tableList[i].getGoods = this.plantDate.length
            this.$set(this.tableList, i, this.tableList[i])
            if (this.dataRuning) { // 终止循环------------
              this.$refs.autoReplyLogs.writeLog(`取消同步`)
              break
            }
            if (index === arrIndex) { // 平台商品获取结束
              this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】虾皮商品数据获取完毕，开始获取服务端商品数据`, true)
              if (this.dataRuning) { // 终止循环-----------
                this.$refs.autoReplyLogs.writeLog(`取消同步`)
                break
              }
              // 获取服务器商品
              const sysMallId = this.tableList[i].id
              try {
                const res = await this.$commodityService.getMallAllRecordList(sysMallId.toString())// 获取服务端商品信息
                const serviceRes = JSON.parse(res)
                console.log('service-mallid' + this.tableList[i].platform_mall_id, serviceRes)
                if (serviceRes.code === 200) {
                  const serviceList = serviceRes.data.info // 保存服务端数据
                  this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】虾皮商品数据获取完毕，服务端商品总数${serviceList.length}`, true)
                  this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】虾皮商品数据获取完毕，服务端商品数据获取完毕`, true)
                  // 过滤服务端未出现的数据
                  const delarr = []
                  serviceList.forEach(ol => {
                    const nonIndex = this.plantDate.findIndex(el => { return Number(el.id) === Number(ol.listing_id) })
                    if (nonIndex < 0) {
                      delarr.push(ol.listing_id)
                    }
                  })
                  console.log('48---------', this.plantDate, '**', serviceList, '**', delarr)
                  this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】开始同步商品数据`, true)
                  if (this.dataRuning) { // 终止循环---------
                    this.$refs.autoReplyLogs.writeLog(`取消同步`)
                    break
                  }
                  if (delarr.length === 0) {
                    this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】同步结束`, true)
                    break
                  }
                  alert('1')
                  const query = {
                    sysmallId: delarr.toString()
                  }
                  // 删除服务端数据
                  if (this.dataRuning) { // 终止循环----------
                    this.$refs.autoReplyLogs.writeLog(`取消同步`)
                    break
                  }
                  const tes = await this.$commodityService.delCloudItems(query)
                  const jsontes = JSON.parse(tes)
                  if (jsontes.code === 200) {
                    this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】同步完成`, true)
                    // this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】服务端删除${}商品`, true)
                  } else {
                    this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】同步失败，服务端异常`, true)
                  }
                } else {
                  this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】虾皮商品数据获取完毕，服务端商品数据获取失败`, false)
                  break
                }
              } catch (error) {
                this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】店铺,数据捕获异常，${error}`, false)
                continue
              }
            }
          } else {
            this.$refs.autoReplyLogs.writeLog(`店铺【${this.tableList[i].mall_alias_name || this.tableList[i].platform_mall_name}】同步失败，发生异常：店铺未登录,请重新登录`, false)
            break
          }
        }
      }
      this.isStart = false
    },
    async getinfo() {
      const params = {
        country: this.query.country,
        mallGroupIds: this.query.mallGroupIds.toString()
      }
      this.loading = true
      const res = await this.$api.ddMallGoodsGetMallList(params)
      this.loading = false
      this.tableList = []
      if (res.data.code === 200) {
        // this.tableList = res.data.data
        res.data.data.forEach(el => {
          el.totalGoods = 0
          el.getGoods = 0
          this.tableList.push(el)
        })
      } else {
        this.$message.warning('店铺列表获取失败！')
      }
    },
    // 获取店铺分组
    changeMallList(val) {
      this.query.mallGroupIds = []
      if (val?.length > 0) {
        val.forEach(item => {
          this.query.mallGroupIds.push(item.group_id)
        })
      }
    },
    // 获取站点
    changeSite(val) {
      this.query.country = val
    }
  }
}
</script>
