<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList" />
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="DerivedData">导出</el-button>
        </li>
      </ul>
      <el-table
        ref="plTable"
        v-loading="Loading3"
        style="margin-top:10px"
        header-align="center"
        height="calc(100vh - 140px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="店铺名称" width="160" prop="mallname" />
        <el-table-column prop="shop_uv" label="访客数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.shop_uv" />
          </template>
        </el-table-column>
        <el-table-column prop="chats_enquired" label="聊天询问数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.chats_enquired" />
          </template>
        </el-table-column>
        <el-table-column prop="visitors_enquired" label="访客询问数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.visitors_enquired" />
          </template>
        </el-table-column>
        <el-table-column prop="responded_chats" label="已回复聊天数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.responded_chats" />
          </template>
        </el-table-column>
        <el-table-column prop="non_responded_chats" label="未回复聊天数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.non_responded_chats" />
          </template>
        </el-table-column>
        <el-table-column prop="response_time" label="回复时间" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.response_time" />
          </template>
        </el-table-column>
        <el-table-column prop="buyers" label="买家数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.buyers" />
          </template>
        </el-table-column>
        <el-table-column prop="orders" label="订单量" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.orders" />
          </template>
        </el-table-column>
        <el-table-column prop="units" label="下单件数" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.units" />
          </template>
        </el-table-column>
        <el-table-column prop="sales" label="销售额" width="150" align="center">
          <template slot-scope="{row}">
            <div v-html="row.sales" />
          </template>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>
<script>
import { batchOperation, exportExcelDataCommon } from '../../../util/util'
import storeChoose from '@/components/store-choose'
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
      total: 0,
      Statisticaltime: 'yesterday',
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24,
      end_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 01:00:00')) / 1000,
      returnStatisticaltime: [
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
          mallId: item.platform_mall_id
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getrealtime(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          const exportdata = {}
          exportdata['mallname'] = mallname
          exportdata['shop_uv'] = attributeTreeRes.data.result.shop_uv.value
          exportdata['chats_enquired'] = attributeTreeRes.data.result.chats_enquired.value
          exportdata['visitors_enquired'] = attributeTreeRes.data.result.visitors_enquired.value
          exportdata['responded_chats'] = attributeTreeRes.data.result.responded_chats.value
          exportdata['non_responded_chats'] = attributeTreeRes.data.result.non_responded_chats.value
          const time1 = []
          let m = attributeTreeRes.data.result['response_time'].value
          if (m / 3600 >= 1) {
            let a = Math.floor(m / 3600)
            m = m - a * 3600
            if (a / 10 < 1) {
              a = `0${a}`
            }
            time1.push(a)
            if (m / 60 >= 1) {
              let b = Math.floor(m / 60)
              m = m - b * 60
              if (b / 10 < 1) {
                b = `0${b}`
              }
              time1.push(b)
              let c = m
              if (c / 10 < 1) {
                c = `0${c}`
              }
              time1.push(c)
            } else {
              time1.push(`00`)
              let c = m
              if (c / 10 < 1) {
                c = `0${c}`
              }
              time1.push(c)
            }
          } else {
            time1.push(`00`)
            if (m / 60 >= 1) {
              let b = Math.floor(m / 60)
              m = m - b * 60
              if (b / 10 < 1) {
                b = `0${b}`
              }
              time1.push(b)
              let c = m
              if (c / 10 < 1) {
                c = `0${c}`
              }
              time1.push(c)
            } else {
              time1.push(`00`)
              let c = m
              if (c / 10 < 1) {
                c = `0${c}`
              }
              time1.push(c)
            }
          }
          const timeb = `${time1[0]}:${time1[1]}:${time1[2]}`
          exportdata['response_time'] = timeb
          exportdata['buyers'] = attributeTreeRes.data.result.buyers.value
          exportdata['orders'] = attributeTreeRes.data.result.orders.value
          exportdata['units'] = attributeTreeRes.data.result.units.value
          exportdata['sales'] = attributeTreeRes.data.result.sales.value
          this.exportdata.push(exportdata)
          const data = {}
          data['mallname'] = mallname
          for (const item in attributeTreeRes.data.result) {
            let color = 'green'
            if (attributeTreeRes.data.result[item].ratio < 0) {
              color = 'red'
            }
            if (this.Statisticaltime === 'yesterday') {
              if (item === 'sales') {
                data[`${item}`] = `<pre style='color:${color}'>${this.$filters.siteCoin(this.site)}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'response_time') {
                const time = []
                if (attributeTreeRes.data.result[item].value / 3600 >= 1) {
                  let a = Math.floor(attributeTreeRes.data.result[item].value / 3600)
                  attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - a * 3600
                  if (a / 10 < 1) {
                    a = `0${a}`
                  }
                  time.push(a)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                } else {
                  time.push(`00`)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                }
                const timea = `${time[0]}:${time[1]}:${time[2]}`
                data[`${item}`] = `<pre style='color:${color}'>${timea}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>` }
            } else if (this.Statisticaltime === 'past7days') {
              if (item === 'sales') {
                data[`${item}`] = `<pre style='color:${color}'>${this.$filters.siteCoin(this.site)}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'response_time') {
                const time = []
                if (attributeTreeRes.data.result[item].value / 3600 >= 1) {
                  let a = Math.floor(attributeTreeRes.data.result[item].value / 3600)
                  attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - a * 3600
                  if (a / 10 < 1) {
                    a = `0${a}`
                  }
                  time.push(a)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                } else {
                  time.push(`00`)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                }
                const timea = `${time[0]}:${time[1]}:${time[2]}`
                data[`${item}`] = `<pre style='color:${color}'>${timea}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>` }
            } else if (this.Statisticaltime === 'past30days') {
              if (item === 'sales') {
                data[`${item}`] = `<pre style='color:${color}'>${this.$filters.siteCoin(this.site)}${(attributeTreeRes.data.result[item].value).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else if (item === 'response_time') {
                const time = []
                if (attributeTreeRes.data.result[item].value / 3600 >= 1) {
                  let a = Math.floor(attributeTreeRes.data.result[item].value / 3600)
                  attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - a * 3600
                  if (a / 10 < 1) {
                    a = `0${a}`
                  }
                  time.push(a)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                } else {
                  time.push(`00`)
                  if (attributeTreeRes.data.result[item].value / 60 >= 1) {
                    let b = Math.floor(attributeTreeRes.data.result[item].value / 60)
                    attributeTreeRes.data.result[item].value = attributeTreeRes.data.result[item].value - b * 60
                    if (b / 10 < 1) {
                      b = `0${b}`
                    }
                    time.push(b)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  } else {
                    time.push(`00`)
                    let c = attributeTreeRes.data.result[item].value
                    if (c / 10 < 1) {
                      c = `0${c}`
                    }
                    time.push(c)
                  }
                }
                const timea = `${time[0]}:${time[1]}:${time[2]}`
                data[`${item}`] = `<pre style='color:${color}'>${timea}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>`
              } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item].value}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[item].ratio * 100).toFixed(2)}%</pre>` }
            }
          }
          this.tableData.push(data)
        } else if (attributeTreeRes.status === 403) {
          this.errmall.push(mallname)
        }
      } catch (e) {
        console.log(e)
      } finally {
        --count.count
      }
    },
    async getallinfo() {
      if (this.mall.length > 0) {
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.exportdata = []
        this.errmall = []
        await batchOperation(this.mall, this.getTableData)
        this.Loading1 = false
        this.Loading3 = false
      } else {
        this.$message.warning('请选择店铺！')
      }
    },
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">访客数</td>
        <td style="width: 200px; text-align:left;">聊天询问数</td>
        <td style="width: 200px; text-align:left;">访客询问数</td>
        <td style="width: 200px; text-align:left;">已回复聊天数</td>
        <td style="width: 200px; text-align:left;">未回复聊天数</td>
        <td style="width: 200px; text-align:left;">回复时间</td>
        <td style="width: 200px; text-align:left;">买家数</td>
        <td style="width: 200px; text-align:left;">订单量</td>
        <td style="width: 200px; text-align:left;">下单件数</td>
        <td style="width: 200px; text-align:left;">销售额</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.shop_uv}</td>
          <td style="text-align:left;">${item.chats_enquired}</td>
          <td style="text-align:left;">${item.visitors_enquired}</td>
          <td style="text-align:left;">${item.responded_chats}</td>
          <td style="text-align:left;">${item.non_responded_chats}</td>
          <td style="text-align:left;">${item.response_time}</td>
          <td style="text-align:left;">${item.buyers}</td>
          <td style="text-align:left;">${item.orders}</td>
          <td style="text-align:left;">${item.units}</td>
          <td style="text-align:left;">${this.$filters.siteCoin(this.site)}${item.sales}</td>
        </tr>
        `
        })
        exportExcelDataCommon('实时聊天信息', msg)
      } else {
        return this.$notify({
          title: '实时聊天信息',
          type: 'warning',
          message: `没有可以导出的信息`
        })
      }
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
