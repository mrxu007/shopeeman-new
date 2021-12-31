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
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 140px)"
          :data="tableData1"
          :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="店铺名称" width="280" prop="mallname" sortable/>
        <el-table-column align="center" prop="buyers" label="买家总数" width="280" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.buyers"/>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="new_buyers" label="新买家数量" width="280" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.new_buyers"/>
          </template>
        </el-table-column>
        <el-table-column prop="existing_buyers" label="现有买家" width="280" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.existing_buyers"/>
          </template>
        </el-table-column>
        <el-table-column prop="potential_buyers" label="潜在买家" width="280" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.potential_buyers"/>
          </template>
        </el-table-column>
        <el-table-column prop="repeat_purchase_rate" label="重复购买率" width="280" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.repeat_purchase_rate"/>
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
      tableData1: [],
      Status: 'palced',
      total: 0,
      Statisticaltime: 'real_time',
      site: 'TH', // 站点
      mall: [], // 店铺
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
    // this.getInfo()
  },
  methods: {
    // 获取店铺信息
    changeMallList(val) {
      this.site = val.country
      this.mall = val.mallList
    },
    // 分组信息查找
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
    async getTableData(item, count = { count: 1 }) {
      try {
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          orderType: this.Status,
          mallId: item.platform_mall_id,
          fetag: 'fetag',
          limit: 5
        }
        let mallname = item.mall_alias_name || item.platform_mall_name
        let res = await this.$shopeemanService.getCustomers(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' } })
        res = JSON.parse(res)
        console.log('this is res.data', res)
        if (res.status === 200) {
          res.data = JSON.parse(res.data)
          if (this.Statisticaltime === 'real_time') {
            for (const item in res.data) {
              if (item === 'buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['buyers_change'] < 0) {
                  color = 'red'
                  arrow = '↓'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]} vs 00:00 - 13:00 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'new_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['new_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['new_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'existing_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['existing_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['existing_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'potential_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['potential_buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['potential_buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 00:00 - 13:00 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'repeat_purchase_rate') {
                let color = 'green'
                let arrow = ''
                if (res.data['repeat_purchase_rate_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['repeat_purchase_rate_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${(res.data[item] * 100).toFixed(2)}%
vs 00:00 - 13:00 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'yesterday') {
            for (const item in res.data) {
              if (item === 'buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前一天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'new_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['new_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['new_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前一天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'existing_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['existing_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['existing_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前一天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'potential_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['potential_buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['potential_buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前一天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'repeat_purchase_rate') {
                let color = 'green'
                let arrow = ''
                if (res.data['repeat_purchase_rate_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['repeat_purchase_rate_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${(res.data[item] * 100).toFixed(2)}%
vs 前一天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'past7days') {
            for (const item in res.data) {
              if (item === 'buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前7天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'new_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['new_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['new_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前7天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'existing_buyers') {
                let arrow = ''
                let color = 'green'
                if (res.data['existing_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['existing_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前7天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'potential_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['potential_buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['potential_buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前7天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'repeat_purchase_rate') {
                let color = 'green'
                let arrow = ''
                if (res.data['repeat_purchase_rate_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['repeat_purchase_rate_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${(res.data[item] * 100).toFixed(2)}%
vs 前7天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'past30days') {
            for (const item in res.data) {
              if (item === 'buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['buyers_change'] < 0) {
                  color = 'red'
                  arrow = '↓'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前30天 ${Math.abs(res.data['buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'new_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['new_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['new_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前30天 ${Math.abs(res.data['new_buyers_rate'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'existing_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['existing_buyers_rate'] > 0) {
                  arrow = '↑'
                } else if (res.data['existing_buyers_rate'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前30天 ${Math.abs(res.data['existing_buyers_rate'] * 100).toFixed(2)}% ${arrow}<pre>`
              }
              if (item === 'potential_buyers') {
                let color = 'green'
                let arrow = ''
                if (res.data['potential_buyers_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['potential_buyers_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${res.data[item]}
vs 前30天 ${Math.abs(res.data['potential_buyers_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
              if (item === 'repeat_purchase_rate') {
                let arrow = ''
                let color = 'green'
                if (res.data['repeat_purchase_rate_change'] > 0) {
                  arrow = '↑'
                } else if (res.data['repeat_purchase_rate_change'] < 0) {
                  arrow = '↓'
                  color = 'red'
                }
                res.data[item] = `<pre style="color:${color}">${(res.data[item] * 100).toFixed(2)}%
vs 前30天 ${Math.abs(res.data['repeat_purchase_rate_change'] * 100).toFixed(2)}% ${arrow}</pre>`
              }
            }
          }
          res.data['mallname'] = mallname
          this.tableData1.push(res.data)
        }
      }catch (e) {
        console.log(e)
      }finally {
        --count.count
      }
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
