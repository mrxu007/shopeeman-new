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
        <el-table-column align="center" label="店铺名称" width="260" prop="mallname" />
        <el-table-column prop="new_followers" label="新粉丝" width="250" align="center" />
        <el-table-column prop="viewers" label="观众" width="250" align="center" />
        <el-table-column prop="buyers" label="买家" width="250" align="center" />
        <el-table-column prop="sales" label="销售量" width="250" align="center" />
        <el-table-column prop="cost" label="每位买家的销售额" width="250" align="center" />
        <el-table-column prop="appexisting_visitors" label="操作" width="150" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="view(row)">关注礼概览</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="关注礼概览" :visible.sync="eidtVisible" width="61%">
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
          <el-table-column align="center" label="关注礼名称" width="160" prop="follow_prize_name" />
          <el-table-column align="center" prop="start_day" label="开始时间" width="150" />
          <el-table-column align="center" prop="end_day" label="结束时间" width="150" />
          <el-table-column prop="new_followers" label="新粉丝" width="100" align="center" />
          <el-table-column align="center" prop="viewers" label="观众" width="100" />
          <el-table-column align="center" prop="buyers" label="买家数" width="130" />
          <el-table-column align="center" prop="sales" label="销售量" width="100" />
          <el-table-column prop="sales_per_buyer" label="每位买家的销售额" width="130" align="center" />
        </el-table>
      </el-dialog>
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
      eidtVisible: false,
      exportdata: [], // 导出数据
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData1: [],
      errmall: [],
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
    },
  },
  mounted() {
    // this.getInfo()
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
        let mallname = item.mall_alias_name || item.platform_mall_name
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          // group: this.group,
          mallId: item.platform_mall_id,
          status: 0
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getattention(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          const exportdata = {}
          exportdata['mallname'] = mallname
          exportdata['viewers'] = attributeTreeRes.data.result.viewers.value
          exportdata['sales'] = attributeTreeRes.data.result.sales.value
          exportdata['claims'] = attributeTreeRes.data.result.claims.value
          exportdata['usage_rate'] = attributeTreeRes.data.result.usage_rate.value
          exportdata['new_followers'] = attributeTreeRes.data.result.new_followers.value
          exportdata['orders'] = attributeTreeRes.data.result.orders.value
          exportdata['buyers'] = attributeTreeRes.data.result.buyers.value
          exportdata['cost'] = attributeTreeRes.data.result.cost.value
          this.exportdata.push(exportdata)
          const data = {}
          data['mallname'] = mallname
          for (const item in attributeTreeRes.data.result) {
            if (item === 'sales' || item === 'cost') {
              data[`${item}`] = `${this.$filters.currencyShow(this.site)}${attributeTreeRes.data.result[item].value}`
            } else {
              data[`${item}`] = attributeTreeRes.data.result[item].value
            }
          }

          let res = await this.$shopeemanService.getattentionview(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          if (res) {
            res = JSON.parse(res)
            res.data = JSON.parse(res.data)
          }
          console.log('zhelizhelizheli', res)
          data['view'] = res.data.data
          if (data['view']) {
            for (let k = 0; k < data['view'].length; k++) {
              data['view'][k].start_day = this.$dayjs(data['view'][k].start_day * 1000).format('YYYY-MM-DD hh:mm:ss')
              data['view'][k].end_day = this.$dayjs(data['view'][k].end_day * 1000).format('YYYY-MM-DD hh:mm:ss')
              data['view'][k].sales = `${this.$filters.currencyShow(this.site)}${data['view'][k].sales}`
              data['view'][k].sales_per_buyer = `${this.$filters.currencyShow(this.site)}${data['view'][k].sales_per_buyer}`
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
        <td style="width: 200px; text-align:left;">新粉丝</td>
        <td style="width: 200px; text-align:left;">观众</td>
        <td style="width: 200px; text-align:left;">买家</td>
        <td style="width: 200px; text-align:left;">销售量</td>
        <td style="width: 200px; text-align:left;">每位买家的销售额</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.new_followers}</td>
          <td style="text-align:left;">${item.viewers}</td>
          <td style="text-align:left;">${item.buyers}</td>
          <td style="text-align:left;">${item.sales}</td>
          <td style="text-align:left;">${item.cost}</td>
        </tr>
        `
        })
        exportExcelDataCommon('关注礼信息', msg)
      } else {
        return this.$notify({
          title: '关注礼信息',
          type: 'warning',
          message: `没有可以导出的信息`
        })
      }
    },
    // 关注礼概览
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
