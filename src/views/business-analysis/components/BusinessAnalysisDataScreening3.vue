<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList"/>
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label"
                       :value="item.value"/>
          </el-select>
        </li>
        <li>
          <span>订单类型：</span>
          <el-select v-model="Status" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value"/>
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
        </li>
      </ul>
      <br>
      <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 140px)"
          :data="tableData3"
          :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="店铺名称" width="140" prop="mallname"/>
        <el-table-column v-if="false" align="center" label="站点" width="140" prop="site"/>
        <el-table-column v-if="false" align="center" label="店铺id" width="140" prop="mallid"/>
        <el-table-column align="center" prop="ranktype" label="排行类型" width="355">
          <template slot-scope="{ row }">
            <div v-html="row.ranktype"/>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="img" label="商品图片" width="355">
          <template slot-scope="{ row }">
            <el-tooltip
                v-if="row.img"
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 40px; height: 40px">
              <div slot="content">
                <img :src="[row.img] | imageRender"
                    width="300px"
                    height="300px">
              </div>
              <el-image
                  style="width: 40px; height: 40px"
                  :src="[row.img,true] | imageRender"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="goodsname" label="商品名称" width="830" align="center"/>
      </el-table>
    </el-row>
  </el-row>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { batchOperation } from '@/util/util'

export default {
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      allgroupid: [],
      errmall: [],
      allmallid: [],
      tableData3: [],
      Status: 'palced',
      total: 0,
      Statisticaltime: 'real_time',
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000,
      end_time: Math.round(new Date() / 1000),
      returnStatisticaltime: [
        { value: 'real_time', label: '实时' },
        { value: 'yesterday', label: '昨日' },
        { value: 'past7days', label: '近7天' },
        { value: 'past30days', label: '近30天' }
      ],
      returnStatusList: [
        { value: 'palced', label: '下单' },
        { value: 'confirmed', label: '确认订单' },
        { value: 'paid', label: '付费订单' }
      ]
    }
  },
  components: {
    storeChoose
  },
  watch: {
    Statisticaltime(val, oldVal) {
      if (this.site === 'TH' || this.site === 'ID' || this.site === 'VN') {
        if (val === 'real_time') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000
          this.end_time = Math.round(new Date() / 1000)
          this.timecant = true
        } else if (val === 'yesterday') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past7days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past30days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24 * 30
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000
          this.timecant = true
        } else if (val === 'day') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 01:00:00')) / 1000
          this.timecant = false
        } else if (val === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24 * 6
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 01:00:00')) / 1000
          this.timecant = false
        } else if (val === 'month') {
          const timea = this.$dayjs(this.timechoose).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 01:00:00')) / 1000
            console.log(this.end_time)
            // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 01:00:00')) / 1000
            console.log(this.end_time)
          }
          this.timecant = false
        }
      } else if (this.site === 'BR') {
        if (val === 'real_time') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000
          this.end_time = Math.round(new Date() / 1000)
          this.timecant = true
        } else if (val === 'yesterday') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past7days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past30days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24 * 30
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 11:00:00')) / 1000
          this.timecant = true
        } else if (val === 'day') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 11:00:00')) / 1000
          this.timecant = false
        } else if (val === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24 * 6
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 11:00:00')) / 1000
          this.timecant = false
        } else if (val === 'month') {
          const timea = this.$dayjs(this.timechoose).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 11:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 11:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 11:00:00')) / 1000
            console.log(this.end_time)
            // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 11:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 11:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 11:00:00')) / 1000
            console.log(this.end_time)
          }
          this.timecant = false
        }
      } else {
        if (val === 'real_time') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000
          this.end_time = Math.round(new Date() / 1000)
          this.timecant = true
        } else if (val === 'yesterday') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past7days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000
          this.timecant = true
        } else if (val === 'past30days') {
          this.start_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24 * 30
          this.end_time = Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000
          this.timecant = true
        } else if (val === 'day') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 00:00:00')) / 1000
          this.timecant = false
        } else if (val === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24 * 6
          this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-DD 00:00:00')) / 1000
          this.timecant = false
        } else if (val === 'month') {
          const timea = this.$dayjs(this.timechoose).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 00:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 00:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 00:00:00')) / 1000
            console.log(this.end_time)
            // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 00:00:00')) / 1000
            let timeq = this.$dayjs(this.timechoose).format('YYYY-MM-01 00:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 00:00:00')) / 1000
            console.log(this.end_time)
          }
          this.timecant = false
        }
      }
    }
  },
  mounted() {
  },
  methods: {
    // 获取店铺信息
    changeMallList(val) {
      this.site = val.country
      this.mall = val.mallList
    },
    async getTableData(item, count = { count: 1 }) {
      try {
        let mallname = item.mall_alias_name || item.platform_mall_name
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          orderType: this.Status,
          // group: this.group,
          mallId: item.platform_mall_id,
          fetag: 'fetag',
          limit: 5
        }
        console.log('this is my parmas', params)
        const ress = await this.$shopeemanService.getCateRank(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        const ress1 = await this.$shopeemanService.getRank(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        const dt = JSON.parse(ress)
        const dt1 = JSON.parse(ress1)
        dt.data = JSON.parse(dt.data)
        dt1.data = JSON.parse(dt1.data)
        console.log(dt.data)
        console.log(dt1.data)
        if (dt1.data.code === 0) {
          for (const item in dt1.data.result) {
            if (item === 'product_pv' && dt1.data.result[item]) {
              for (let j = 0; j < dt1.data.result[item].length; j++) {
                const data = {}
                data.site = this.site
                data.mallid = item.platform_mall_id
                data.mallname = mallname
                data.ranktype = '<pre>按商品销量排行</pre>' + '<pre>销量 ' + dt1.data.result[item][j].value + '</pre>'
                data.img = dt1.data.result[item][j].image
                data.goodsname = dt1.data.result[item][j].item_name
                this.tableData3.push(data)
              }
            }
            if (item === 'sales' && dt1.data.result[item]) {
              for (let j = 0; j < dt1.data.result[item].length; j++) {
                const data = {}
                data.site = this.site
                data.mallid = item.platform_mall_id
                data.mallname = mallname
                data.ranktype = '<pre>按下单数排行</pre>' + '<pre>下单数 ' + dt1.data.result[item][j].value + '</pre>'
                data.img = dt1.data.result[item][j].image
                data.goodsname = dt1.data.result[item][j].item_name
                this.tableData3.push(data)
              }
            }
            if (item === 'orders' && dt1.data.result[item]) {
              for (let j = 0; j < dt1.data.result[item].length; j++) {
                const data = {}
                data.site = this.site
                data.mallid = item.platform_mall_id
                data.mallname = mallname
                data.ranktype = '<pre>按页面访客量排行</pre>' + '<pre>访客量 ' + dt1.data.result[item][j].value + '</pre>'
                data.img = dt1.data.result[item][j].image
                data.goodsname = dt1.data.result[item][j].item_name
                this.tableData3.push(data)
              }
            }
            if (item === 'uv_to_paid_buyers_rate' && dt1.data.result[item]) {
              for (let j = 0; j < dt1.data.result[item].length; j++) {
                const data = {}
                data.site = this.site
                data.mallid = item.platform_mall_id
                data.mallname = mallname
                data.ranktype = '<pre>按转换率排行</pre>' + '<pre>转换率 ' + (dt1.data.result[item][j].value * 100).toFixed(2) + '%</pre>'
                data.img = dt1.data.result[item][j].image
                data.goodsname = dt1.data.result[item][j].item_name
                this.tableData3.push(data)
              }
            }
          }
        }
        if (dt.data.code === 0 && dt.data.result) {
          for (let j = 0; j < dt.data.result.length; j++) {
            const data = {}
            data.site = this.site
            data.mallid = item.platform_mall_id
            data.mallname = mallname
            data.ranktype = '<pre>按类目销量排行</pre>' + '<pre>销售量 ' + dt.data.result[j].value + '</pre>'
            data.img = ''
            data.goodsname = dt.data.result[j].l1_cat_name + '===>' + dt.data.result[j].l2_cat_name
            this.tableData3.push(data)
          }
        }
      } catch (e) {
        console.log(e)
      } finally {
        --count.count
      }
    },
    async getallinfo() {
      this.Loading1 = true
      this.tableData1 = []
      if (this.mall.length > 0) {
        await batchOperation(this.mall, this.getTableData)
        this.$message.success('查询完成')
      } else {
        this.$message({
          message: '请先选择店铺',
          type: 'warning'
        })
      }
      this.Loading1 = false
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
