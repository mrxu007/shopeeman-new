<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList" />
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option
              v-for="(item, index) in returnStatisticaltime"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :loading="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" size="mini" @click="DerivedData">导出</el-button>
        </li>
      </ul>
      <!-- v-loading="Loading3" -->
      <el-table
        ref="plTable"
        style="margin-top:10px"
        header-align="center"
        height="calc(100vh - 85px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column label="序号" min-width="60px" type="index" align="center" fixed />
        <el-table-column align="center" label="店铺名称" min-width="250px" prop="mallname" />
        <el-table-column align="center" prop="usage_rate" label="使用率" min-width="250px">
          <template slot-scope="{ row }">
            <div v-html="row.usage_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="buyers" label="买家数" min-width="250px" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.buyers" />
          </template>
        </el-table-column>
        <el-table-column prop="orders" label="订单量" min-width="250px" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.orders" />
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="销售额" min-width="250px" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.sales" />
          </template>
        </el-table-column>
        <el-table-column prop="claims" label="领取数" min-width="250px" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.claims" />
          </template>
        </el-table-column>
        <el-table-column prop="appexisting_visitors" label="操作" min-width="150px" align="center" fixed="right">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="view(row)">优惠卷概览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="优惠卷概览" :visible.sync="eidtVisible" width="66%">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          :data="tableData1"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="套装优惠名称" width="160" prop="voucher_code" />
          <el-table-column align="center" prop="start_time" label="开始时间" width="140" />
          <el-table-column align="center" prop="end_time" label="结束时间" width="140" />
          <el-table-column prop="sales" label="销售额" width="100" align="center" />
          <el-table-column align="center" prop="orders" label="订单数" width="100" />
          <el-table-column align="center" prop="units" label="订购的优惠套装数" width="130" />
          <el-table-column align="center" prop="units" label="售出件数" width="100" />
          <el-table-column prop="buyers" label="买家数" width="100" align="center" />
          <el-table-column prop="sales_per_buyer" label="每位买家的销售额" width="130" align="center" />
        </el-table>
      </el-dialog>
    </el-row>
  </el-row>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon, batchOperation } from '../../../util/util'

export default {
  components: {
    storeChoose
  },
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      eidtVisible: false,
      exportdata: [], // 导出数据
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData1: [],
      errmall: [],
      currency: '฿',
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
    }
  },
  mounted() {
    // const timenow = new Date().getTime()
    // const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
    // const changea = returnCreateStartTime.split(':')
    // changea[0] = Number(changea[0]) - 1
    // const onehoureago = `${changea[0]}:${changea[1]}`
    // console.log(onehoureago)
  },
  methods: {
    // 获取店铺信息
    changeMallList(val) {
      this.site = val.country
      this.mall = val.mallList
    },
    async getTableData(item, count = { count: 1 }) {
      try {
        const mallname = item.mall_alias_name || item.platform_mall_name
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          // group: this.group,
          mallId: item.platform_mall_id,
          status: 0
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getcoupon(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes = ''
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        if (attributeTreeRes.status === 200) {
          const exportdata = {}
          exportdata['mallname'] = mallname
          exportdata['sales'] = attributeTreeRes.data.result.sales.value
          exportdata['claims'] = attributeTreeRes.data.result.claims.value
          exportdata['orders'] = attributeTreeRes.data.result.orders.value
          exportdata['buyers'] = attributeTreeRes.data.result.buyers.value
          exportdata['usage_rate'] = attributeTreeRes.data.result.usage_rate.value
          exportdata['cost'] = attributeTreeRes.data.result.cost.value
          this.exportdata.push(exportdata)
          const data = {}
          data['mallname'] = mallname
          for (const item in attributeTreeRes.data.result) {
            let color = 'green'
            if (attributeTreeRes.data.result[item].chain_ratio < 0) {
              color = 'red'
            }
            if (this.Statisticaltime === 'real_time') {
              const timenow = new Date().getTime()
              const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
              const changea = returnCreateStartTime.split(':')
              changea[0] = Number(changea[0]) - 1
              const onehoureago = `${changea[0]}:${changea[1]}`
              if (item === 'sales' || item === 'cost') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'usage_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              }
            } else if (this.Statisticaltime === 'yesterday') {
              if (item === 'sales' || item === 'cost') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'usage_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              }
            } else if (this.Statisticaltime === 'past7days') {
              if (item === 'sales' || item === 'cost') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'usage_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%</pre>` + `<pre style='color:${color}'>vs 前七天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              }
            } else if (this.Statisticaltime === 'past30days') {
              if (item === 'sales' || item === 'cost') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'usage_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data.result[item].value * 100).toFixed(2)}%</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].chain_ratio * 100).toFixed(2)}%</pre>`
              }
            }
          }

          let res = await this.$shopeemanService.getcouponview(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          if (res) {
            res = JSON.parse(res)
            res.data = JSON.parse(res.data)
          }
          console.log('zhelizhelizheli', res)
          data['view'] = res.data.data
          if (data['view']) {
            for (let k = 0; k < data['view'].length; k++) {
              data['view'][k].sales = `${this.currency}${(data['view'][k].sales).toFixed(2)}`
              data['view'][k].sales_per_buyer = `${this.currency}${(data['view'][k].sales_per_buyer).toFixed(2)}`
              data['view'][k].start_time = this.$dayjs(data['view'][k].start_time * 1000).format('YYYY-MM-DD hh:mm:ss')
              data['view'][k].end_time = this.$dayjs(data['view'][k].end_time * 1000).format('YYYY-MM-DD hh:mm:ss')
            }
          }
          this.tableData.push(data)
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
    },
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">使用率</td>
        <td style="width: 200px; text-align:left;">买家数</td>
        <td style="width: 200px; text-align:left;">订单量</td>
        <td style="width: 200px; text-align:left;">销售额</td>
        <td style="width: 200px; text-align:left;">领取数</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.usage_rate}</td>
          <td style="text-align:left;">${item.buyers}</td>
          <td style="text-align:left;">${item.orders}</td>
          <td style="text-align:left;">${item.sales}</td>
          <td style="text-align:left;">${item.claims}</td>
        </tr>
        `
        })
        exportExcelDataCommon('套装优惠信息', msg)
      } else {
        return this.$notify({
          title: '套装优惠信息',
          type: 'warning',
          message: `没有可以导出的信息`
        })
      }
    },
    // 优惠卷概览
    async view(row) {
      this.eidtVisible = true
      this.tableData1 = row.view
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
