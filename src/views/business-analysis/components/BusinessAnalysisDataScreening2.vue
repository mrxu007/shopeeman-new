<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList"/>
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>订单类型：</span>
          <el-select v-model="Status" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
        </li>
      </ul><br>
      <el-table
        ref="plTable"
        v-loading="Loading3"
        style="margin-top:10px"
        header-align="center"
        height="calc(100vh - 140px)"
        :data="tableData2"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="店铺名称" width="160" prop="mallname" sortable />
        <el-table-column align="center" prop="place_gmv" label="销售量" width="260" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.place_gmv" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="place_orders" label="订单总数" width="260" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.place_orders" />
          </template>
        </el-table-column>
        <el-table-column prop="shop_uv_to_placed_buyers_rate" label="访客转换率" width="260" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.shop_uv_to_placed_buyers_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="place_sales_per_order" label="各订单销售额" width="260" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.place_sales_per_order" />
          </template>
        </el-table-column>
        <el-table-column prop="shop_uv" label="访客" width="245" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.shop_uv" />
          </template>
        </el-table-column>
        <el-table-column prop="shop_pv" label="页面浏览量" width="245" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.shop_uv" />
          </template>
        </el-table-column>
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
      allmallid: [],
      tableData2: [],
      errmall: [],
      Status: 'palced',
      total: 0,
      Statisticaltime: 'real_time',
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000,
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
    },
  },
  components: {
    storeChoose
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
            mallId: item.platform_mall_id,
            fetag: 'fetag',
            limit: 5
          }
          const attributeTreeJson = await this.$shopeemanService.dashboard(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let attributeTreeRes = ''
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          console.log('this is data', attributeTreeRes)
          if (attributeTreeRes.status === 200) {
            attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
            if (this.Statisticaltime === 'real_time') { // 转换格式
              for (const item in attributeTreeRes.data.result) {
                let color = `green`
                let arrow = ''
                if (attributeTreeRes.data.result[item].chain_ratio > 0) {
                  arrow = '↑'
                } else if (attributeTreeRes.data.result[item].chain_ratio < 0) {
                  color = `red`
                  arrow = '↓'
                }
                if (item === 'shop_uv_to_placed_buyers_rate') {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%
vs 00:00 - 13:00  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                } else {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${parseInt(attributeTreeRes.data.result[item].value)}
vs 00:00 - 13:00  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'yesterday') {
              for (const item in attributeTreeRes.data.result) {
                let color = `green`
                let arrow = ''
                if (attributeTreeRes.data.result[item].chain_ratio > 0) {
                  arrow = '↑'
                } else if (attributeTreeRes.data.result[item].chain_ratio < 0) {
                  arrow = '↓'
                  color = `red`
                }
                if (item === 'shop_uv_to_placed_buyers_rate') {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%
vs 前一天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                } else {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${parseInt(attributeTreeRes.data.result[item].value)}
vs 前一天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'past7days') {
              for (const item in attributeTreeRes.data.result) {
                let color = `green`
                let arrow = ''
                if (attributeTreeRes.data.result[item].chain_ratio > 0) {
                  arrow = '↑'
                } else if (attributeTreeRes.data.result[item].chain_ratio < 0) {
                  arrow = '↓'
                  color = `red`
                }
                if (item === 'shop_uv_to_placed_buyers_rate') {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%
vs 前7天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                } else {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${parseInt(attributeTreeRes.data.result[item].value)}
vs 前7天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                }
              }
            }
            if (this.Statisticaltime === 'past30days') {
              for (const item in attributeTreeRes.data.result) {
                let color = `green`
                let arrow = ''
                if (attributeTreeRes.data.result[item].chain_ratio > 0) {
                  arrow = '↑'
                } else if (attributeTreeRes.data.result[item].chain_ratio < 0) {
                  arrow = '↓'
                  color = `red`
                }
                if (item === 'shop_uv_to_placed_buyers_rate') {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%
vs 前30天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                } else {
                  attributeTreeRes.data.result[item] = `<pre style="color:${color}">${parseInt(attributeTreeRes.data.result[item].value)}
vs 前30天  ${Math.abs(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%` + ` ${arrow}</pre>`
                }
              }
            }
            attributeTreeRes.data.result['mallname'] = mallname
            this.tableData2.push(attributeTreeRes.data.result)
          }

      }catch (e) {
        console.log(e)
      }finally {
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
