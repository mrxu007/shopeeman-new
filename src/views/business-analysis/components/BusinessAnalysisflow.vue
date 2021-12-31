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
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="DerivedData">导出</el-button>
        </li>
      </ul><br>
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
        <el-table-column align="center" label="店铺名称" width="160" prop="mallname" sortable />
        <el-table-column align="center" prop="apppage_views" label="App端浏览量" width="120" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.apppage_views" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appavg_page_views" label="App端平均浏览量" width="160" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appavg_page_views" />
          </template>
        </el-table-column>
        <el-table-column prop="appavg_stay_time" label="App端平均浏览时间" width="160" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appavg_stay_time" />
          </template>
        </el-table-column>
        <el-table-column prop="appbounce_rate" label="App端网页跳出率" width="160" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appbounce_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="appvisitors" label="App端访客量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appvisitors" />
          </template>
        </el-table-column>
        <el-table-column prop="appnew_visitors" label="App端新访客量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appnew_visitors" />
          </template>
        </el-table-column>
        <el-table-column prop="appexisting_visitors" label="App端现有访客量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appexisting_visitors" />
          </template>
        </el-table-column>
        <el-table-column prop="appnew_followers" label="App新粉丝量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.appnew_followers" />
          </template>
        </el-table-column>
        <el-table-column prop="pcpage_views" label="Pc端浏览量" width="130" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcpage_views" />
          </template>
        </el-table-column>
        <el-table-column prop="pcavg_page_views" label="Pc端平均浏览量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcavg_page_views" />
          </template>
        </el-table-column>
        <el-table-column prop="pcavg_stay_time" label="Pc端平均浏览时间" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcavg_stay_time" />
          </template>
        </el-table-column>
        <el-table-column prop="pcbounce_rate" label="Pc端网页跳出率" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcbounce_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="pcvisitors" label="Pc端访客量" width="130" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcvisitors" />
          </template>
        </el-table-column>
        <el-table-column prop="pcnew_visitors" label="Pc端新访客量" width="130" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcnew_visitors" />
          </template>
        </el-table-column>
        <el-table-column prop="pcexisting_visitors" label="Pc端现有访客量" width="150" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcexisting_visitors" />
          </template>
        </el-table-column>
        <el-table-column prop="pcnew_followers" label="Pc新浏粉丝量" width="130" align="center" sortable>
          <template slot-scope="{ row }">
            <div v-html="row.pcnew_followers" />
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
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      exportdata: [], // 导出数据
      allgroupid: [],
      allmallid: [],
      tableData: [],
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
    // const timenow = new Date().getTime() - 3600 * 1000 * 24
    // const returnCreateStartTime = this.$dayjs(timenow).format('YYYYMMDD')
    // console.log(returnCreateStartTime)
  },
  methods: {
    // 获取店铺信息
    changeMallList(val) {
      this.site = val.country
      this.mall = val.mallList
    },
    async getTableData(item, count = { count: 1 }) {
      try {
        const timenow = new Date().getTime() - 3600 * 1000 * 24
        const yesterdaytime = this.$dayjs(timenow).format('YYYYMMDD')
        let mallname = item.mall_alias_name || item.platform_mall_name
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          mallId: item.platform_mall_id,
          fetag: 'fetag',
          dt: yesterdaytime
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getFlow(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
          // console.log('ces', attributeTreeRes.data)
          const pc = attributeTreeRes.data.result.data.pc
          const app = attributeTreeRes.data.result.data.app
          const exportdata = {}
          exportdata['mallname'] = mallname
          exportdata['apppage_views'] = app.page_views
          exportdata['appavg_page_views'] = app.avg_page_views
          exportdata['appavg_stay_time'] = app.avg_stay_time
          exportdata['appbounce_rate'] = app.bounce_rate
          exportdata['appvisitors'] = app.visitors
          exportdata['appnew_visitors'] = app.new_visitors
          exportdata['appexisting_visitors'] = app.existing_visitors
          exportdata['appnew_followers'] = app.new_followers
          exportdata['pcpage_views'] = pc.page_views
          exportdata['pcavg_page_views'] = pc.avg_page_views
          exportdata['pcavg_stay_time'] = pc.avg_stay_time
          exportdata['pcbounce_rate'] = pc.bounce_rate
          exportdata['pcvisitors'] = pc.visitors
          exportdata['pcnew_visitors'] = pc.new_visitors
          exportdata['pcexisting_visitors'] = pc.existing_visitors
          exportdata['pcnew_followers'] = pc.new_followers
          this.exportdata.push(exportdata)
          const data = {}
          data['mallname'] = mallname
          let color = `green`
          let arrow1 = ''
          if (app.page_views_pct_diff >= 0) {
            arrow1 = '↑'
          } else {
            arrow1 = '↓'
            color = `red`
          }
          data['apppage_views'] = `<pre style="color:${color}">${app.page_views}
提升率 ${Math.abs(app.page_views_pct_diff * 100).toFixed(2)}% ${arrow1}</pre>`
          let arrow2 = ''
          if (app.avg_page_views_pct_diff >= 0) {
            color = `green`
            arrow2 = '↑'
          } else {
            arrow2 = '↓'
            color = `red`
          }
          data['appavg_page_views'] = `<pre style="color:${color}">${app.avg_page_views.toFixed(2)}
提升率 ${Math.abs(app.avg_page_views_pct_diff * 100).toFixed(2)}% ${arrow2}</pre>`
          let arrow3 = ''
          if (app.avg_stay_time_pct_diff >= 0) {
            color = `green`
            arrow3 = '↑'
          } else {
            arrow3 = '↓'
            color = `red`
          }
          data['appavg_stay_time'] = `<pre style="color:${color}">${app.avg_stay_time}
提升率 ${Math.abs(app.avg_stay_time_pct_diff * 100).toFixed(2)}% ${arrow3}</pre>`
          let arrow4 = ''
          if (app.bounce_rate_pct_diff >= 0) {
            color = `green`
            arrow4 = '↑'
          } else {
            arrow4 = '↓'
            color = `red`
          }
          data['appbounce_rate'] = `<pre style="color:${color}">${(app.bounce_rate * 100).toFixed(2)}%
提升率 ${Math.abs(app.bounce_rate_pct_diff * 100).toFixed(2)}% ${arrow4}</pre>`
          let arrow5 = ''
          if (app.visitors_pct_diff >= 0) {
            color = `green`
            arrow5 = '↑'
          } else {
            arrow5 = '↓'
            color = `red`
          }
          data['appvisitors'] = `<pre style="color:${color}">${app.visitors}
提升率 ${Math.abs(app.visitors_pct_diff * 100).toFixed(2)}% ${arrow5}</pre>`
          let arrow6 = ''
          if (app.new_visitors_pct_diff >= 0) {
            color = `green`
            arrow6 = '↑'
          } else {
            arrow6 = '↓'
            color = `red`
          }
          data['appnew_visitors'] = `<pre style="color:${color}">${app.new_visitors}
提升率 ${Math.abs(app.new_visitors_pct_diff * 100).toFixed(2)}% ${arrow6}</pre>`
          let arrow7 = ''
          if (app.existing_visitors_pct_diff >= 0) {
            color = `green`
            arrow7 = '↑'
          } else {
            arrow7 = '↓'
            color = `red`
          }
          data['appexisting_visitors'] = `<pre style="color:${color}">${app.existing_visitors}
提升率 ${Math.abs(app.existing_visitors_pct_diff * 100).toFixed(2)}% ${arrow7}</pre>`
          let arrow8 = ''
          if (app.new_followers_pct_diff >= 0) {
            color = `green`
            arrow8 = '↑'
          } else {
            arrow8 = '↓'
            color = `red`
          }
          data['appnew_followers'] = `<pre style="color:${color}">${app.new_followers}
提升率 ${Math.abs(app.new_followers_pct_diff * 100).toFixed(2)}% ${arrow8}</pre>`
          let arrow9 = ''
          if (pc.page_views_pct_diff >= 0) {
            color = `green`
            arrow9 = '↑'
          } else {
            arrow9 = '↓'
            color = `red`
          }
          data['pcpage_views'] = `<pre style="color:${color}">${pc.page_views}
提升率 ${Math.abs(pc.page_views_pct_diff * 100).toFixed(2)}% ${arrow9}</pre>`
          let arrow10 = ''
          if (pc.avg_page_views_pct_diff >= 0) {
            color = `green`
            arrow10 = '↑'
          } else {
            arrow10 = '↓'
            color = `red`
          }
          data['pcavg_page_views'] = `<pre style="color:${color}">${pc.avg_page_views.toFixed(2)}
提升率 ${Math.abs(pc.avg_page_views_pct_diff * 100).toFixed(2)}% ${arrow10}</pre>`
          let arrow11 = ''
          if (pc.avg_stay_time_pct_diff >= 0) {
            color = `green`
            arrow11 = '↑'
          } else {
            arrow11 = '↓'
            color = `red`
          }
          data['pcavg_stay_time'] = `<pre style="color:${color}">${pc.avg_stay_time}
提升率 ${Math.abs(pc.avg_stay_time_pct_diff * 100).toFixed(2)}% ${arrow11}</pre>`
          let arrow12 = ''
          if (pc.bounce_rate_pct_diff >= 0) {
            color = `green`
            arrow12 = '↑'
          } else {
            arrow12 = '↓'
            color = `red`
          }
          data['pcbounce_rate'] = `<pre style="color:${color}">${(pc.bounce_rate * 100).toFixed(2)}%
提升率 ${Math.abs(pc.bounce_rate_pct_diff * 100).toFixed(2)}% ${arrow12}</pre>`
          let arrow13 = ''
          if (pc.visitors_pct_diff >= 0) {
            color = `green`
            arrow13 = '↑'
          } else {
            arrow13 = '↓'
            color = `red`
          }
          data['pcvisitors'] = `<pre style="color:${color}">${pc.visitors}
提升率 ${Math.abs(pc.visitors_pct_diff * 100).toFixed(2)}% ${arrow13}</pre>`
          let arrow14 = ''
          if (pc.new_visitors_pct_diff >= 0) {
            color = `green`
            arrow14 = '↑'
          } else {
            arrow14 = '↓'
            color = `red`
          }
          data['pcnew_visitors'] = `<pre style="color:${color}">${pc.new_visitors}
提升率 ${Math.abs(pc.new_visitors_pct_diff * 100).toFixed(2)}% ${arrow14}</pre>`
          let arrow15 = ''
          if (pc.existing_visitors_pct_diff >= 0) {
            color = `green`
            arrow15 = '↑'
          } else {
            arrow15 = '↓'
            color = `red`
          }
          data['pcexisting_visitors'] = `<pre style="color:${color}">${pc.existing_visitors}
提升率 ${Math.abs(pc.existing_visitors_pct_diff * 100).toFixed(2)}% ${arrow15}</pre>`
          let arrow16 = ''
          if (pc.new_followers_pct_diff >= 0) {
            color = `green`
            arrow16 = '↑'
          } else {
            arrow16 = '↓'
            color = `red`
          }
          data['pcnew_followers'] = `<pre style="color:${color}">${pc.new_followers}
提升率 ${Math.abs(pc.new_followers_pct_diff * 100).toFixed(2)}% ${arrow16}</pre>`
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
        // this.Loading3 = true
        this.tableData = []
        this.exportdata = []
        this.errmall = []
        await batchOperation(this.mall, this.getTableData)
        this.Loading1 = false
        this.Loading3 = false
      }
    },
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">App端浏览量</td>
        <td style="width: 200px; text-align:left;">App端平均浏览量</td>
        <td style="width: 200px; text-align:left;">App端平均浏览时间</td>
        <td style="width: 200px; text-align:left;">App端网页跳出率</td>
        <td style="width: 200px; text-align:left;">App端访客量</td>
        <td style="width: 200px; text-align:left;">App端新访客量</td>
        <td style="width: 200px; text-align:left;">App端现有访客量</td>
        <td style="width: 200px; text-align:left;">App新粉丝量</td>
        <td style="width: 200px; text-align:left;">Pc端浏览量</td>
        <td style="width: 200px; text-align:left;">Pc端平均浏览量</td>
        <td style="width: 200px; text-align:left;">Pc端平均浏览时间</td>
        <td style="width: 200px; text-align:left;">Pc端网页跳出率</td>
        <td style="width: 200px; text-align:left;">Pc端访客量</td>
        <td style="width: 200px; text-align:left;">Pc端新访客量</td>
        <td style="width: 200px; text-align:left;">Pc端现有访客量</td>
        <td style="width: 200px; text-align:left;">Pc新粉丝量</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.apppage_views}</td>
          <td style="text-align:left;">${item.appavg_page_views.toFixed(2)}</td>
          <td style="text-align:left;">${item.appavg_stay_time}</td>
          <td style="text-align:left;">${item.appbounce_rate * 100}%</td>
          <td style="text-align:left;">${item.appvisitors}</td>
          <td style="text-align:left;">${item.appnew_visitors}</td>
          <td style="text-align:left;">${item.appexisting_visitors}</td>
          <td style="text-align:left;">${item.appnew_followers}</td>
          <td style="text-align:left;">${item.pcpage_views}</td>
          <td style="text-align:left;">${item.pcavg_page_views.toFixed(2)}</td>
          <td style="text-align:left;">${item.pcavg_stay_time}</td>
          <td style="text-align:left;">${item.pcbounce_rate * 100}%</td>
          <td style="text-align:left;">${item.pcvisitors}</td>
          <td style="text-align:left;">${item.pcnew_visitors}</td>
          <td style="text-align:left;">${item.pcexisting_visitors}</td>
          <td style="text-align:left;">${item.pcnew_followers}</td>
        </tr>
        `
        })
        exportExcelDataCommon('流量信息', msg)
      } else {
        return this.$notify({
          title: '流量信息',
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
