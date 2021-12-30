<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px;margin-left:24px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList"/>
      </ul>
      <ul>
        <li>
          <span>资料期间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>资料期间：</span>
          <el-date-picker
            v-model="timechoose"
            :disabled="timecant"
            size="mini"
            type="date"
            placeholder="选择日期"
          /></li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading2" size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="DerivedData">数据导出</el-button>
          <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
        </li>
        <li><el-checkbox
          v-model="showlog"
        >隐藏日志</el-checkbox></li>
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
        <el-table-column align="center" label="序列号" width="80" prop="index" />
        <el-table-column align="center" label="店铺" width="140" prop="mallname" />
        <el-table-column align="center" prop="uv" label="商品访客数【访问】" width="180">
          <template slot-scope="{ row }">
            <div v-html="row.uv" />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="pv" label="商品页面访问量【访问】" width="180">
          <template slot-scope="{ row }">
            <div v-html="row.pv" />
          </template>
        </el-table-column>
        <el-table-column prop="iv" label="已访问的商品【访问】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.iv" />
          </template>
        </el-table-column>
        <el-table-column prop="bounce_rate" label="商品跳出率【访问】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.bounce_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="like_unit_num" label="赞【访问】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.like_unit_num" />
          </template>
        </el-table-column>
        <el-table-column prop="atc_unit_num" label="件数【加入购物车】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.atc_unit_num" />
          </template>
        </el-table-column>
        <el-table-column prop="atc_rate" label="转换率【加入购物车】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.atc_rate" />
          </template>
        </el-table-column>
        <el-table-column prop="placed_unit_num" label="件数【已付款订单】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.placed_unit_num" />
          </template>
        </el-table-column>
        <el-table-column prop="paid_gmv" label="销售额【已付款订单】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.paid_gmv" />
          </template>
        </el-table-column>
        <el-table-column prop="paid_items" label="已付款的商品【已付款订单】" width="180" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.paid_items" />
          </template>
        </el-table-column>
        <el-table-column prop="uv_to_confirmed_buyers_rate" label="转化率（访问至确定)【已付款订单】" width="240" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.uv_to_confirmed_buyers_rate" />
          </template>
        </el-table-column>
      </el-table>
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
    </el-row>
  </el-row>
</template>
<script>
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon ,batchOperation } from '../../../util/util'
export default {
  data() {
    return {
      Loading1: false,
      showlog: true,
      Loading2: true,
      Loading3: false,
      timecant: true,
      timechoose: new Date(),
      serchload: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      exportdata: [], // 导出数据
      allgroupid: [],
      allmallid: [],
      tableData: [],
      errmall: [],
      indexs: 1,
      currency: '฿',
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
        { value: 'past7days', label: '过去7天' },
        { value: 'past30days', label: '过去30天' },
        { value: 'day', label: '按日' },
        { value: 'week', label: '按周' },
        { value: 'month', label: '按月' }
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
          this.start_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 01:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 01:00:00')) / 1000 + 3600 * 24 * 7
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
          this.start_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 11:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 11:00:00')) / 1000 + 3600 * 24 * 7
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
          this.start_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 00:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(this.timechoose)).format('YYYY-MM-DD 00:00:00')) / 1000 + 3600 * 24 * 7
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
    timechoose(val, oldval) {
      if (this.site === 'TH' || this.site === 'ID' || this.site === 'VN') {
        if (this.Statisticaltime === 'day') {
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000
        } else if (this.Statisticaltime === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 01:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 01:00:00')) / 1000 + 3600 * 24 * 7
        } else if (this.Statisticaltime === 'month') {
          const timea = this.$dayjs(val).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 01:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 01:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 01:00:00')) / 1000
            console.log(this.end_time)
          // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 01:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 01:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 01:00:00')) / 1000
            console.log(this.end_time)
          }
        }
      } else if (this.site === 'BR') {
        if (this.Statisticaltime === 'day') {
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 11:00:00')) / 1000
        } else if (this.Statisticaltime === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 11:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 11:00:00')) / 1000 + 3600 * 24 * 7
        } else if (this.Statisticaltime === 'month') {
          const timea = this.$dayjs(val).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 11:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 11:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 11:00:00')) / 1000
            console.log(this.end_time)
          // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 11:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 11:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 11:00:00')) / 1000
            console.log(this.end_time)
          }
        }
      } else {
        if (this.Statisticaltime === 'day') {
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 00:00:00')) / 1000
        } else if (this.Statisticaltime === 'week') {
          this.start_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 00:00:00')) / 1000
          this.end_time = Date.parse(this.$dayjs(this.getMonday(val)).format('YYYY-MM-DD 00:00:00')) / 1000 + 3600 * 24 * 7
        } else if (this.Statisticaltime === 'month') {
          const timea = this.$dayjs(val).format('YYYY-MM-01')
          const month = timea.split('-')[1]
          if (month === '12') {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 00:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 00:00:00').split('')
            timeq[5] = '0'
            timeq[6] = '1'
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 00:00:00')) / 1000
            console.log(this.end_time)
          // this.end_time = Date.parse(this.$dayjs(this.timechoose).format('YYYY-MM-01 01:00:00')[5]) / 1000
          } else {
            this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-01 00:00:00')) / 1000
            let timeq = this.$dayjs(val).format('YYYY-MM-01 11:00:00').split('')
            const timew = month.split('')
            timeq[5] = timew[0]
            timeq[6] = Number(timew[1]) + 1
            timeq = timeq.join('')
            this.end_time = Date.parse(this.$dayjs(timeq).format('YYYY-MM-01 00:00:00')) / 1000
            console.log(this.end_time)
          }
        }
      }
    },
    Loading3(val, oldval) {
      if (this.Loading3 === true) {
        this.Loading2 = false
      } else {
        this.Loading2 = true
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
        if (this.serchload === true) {
          this.Loading3 = false
          setTimeout(() => {
            this.Loading1 = false
          }, 3000)
          this.serchload = false
          return
        }
        let mallname = item.mall_alias_name || item.platform_mall_name
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          // group: this.group,
          mallId: item.platform_mall_id
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getoverview(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          const exportdata = {}
          for (const item in attributeTreeRes.data) {
            exportdata['mallname'] = mallname
            if (item === 'paid_gmv') {
              exportdata[`${item}`] = `${this.currency}${attributeTreeRes.data[item].value}`
            } else {
              exportdata[`${item}`] = attributeTreeRes.data[item].value
            }
          }
          this.exportdata.push(exportdata)
          const data = {}
          let text = ''
          data['mallname'] = mallname
          data['index'] = this.indexs
          this.indexs++
          if (this.Statisticaltime === 'real_time') {
            text = 'vs 00:00-17:00 昨天 '
            for (const item in attributeTreeRes.data) {
              let color = 'green'
              if (attributeTreeRes.data[item].ratio < 0) {
                color = 'red'
              }
              if (item === 'bounce_rate' || item === 'atc_rate' || item === 'uv_to_placed_buyers_rate' || item === 'uv_to_paid_buyers_rate' || item === 'uv_to_confirmed_buyers_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data[item].value * 100).toFixed(2)}%</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else if (item === 'paid_gmv') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'yesterday' || this.Statisticaltime === 'day') {
            text = 'vs 前一天 '
            for (const item in attributeTreeRes.data) {
              let color = 'green'
              if (attributeTreeRes.data[item].ratio < 0) {
                color = 'red'
              }
              if (item === 'bounce_rate' || item === 'atc_rate' || item === 'uv_to_placed_buyers_rate' || item === 'uv_to_paid_buyers_rate' || item === 'uv_to_confirmed_buyers_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data[item].value * 100).toFixed(2)}%</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else if (item === 'paid_gmv') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'past7days' || this.Statisticaltime === 'week') {
            text = 'vs 前7天 '
            for (const item in attributeTreeRes.data) {
              let color = 'green'
              if (attributeTreeRes.data[item].ratio < 0) {
                color = 'red'
              }
              if (item === 'bounce_rate' || item === 'atc_rate' || item === 'uv_to_placed_buyers_rate' || item === 'uv_to_paid_buyers_rate' || item === 'uv_to_confirmed_buyers_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data[item].value * 100).toFixed(2)}%</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else if (item === 'paid_gmv') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              }
            }
          }
          if (this.Statisticaltime === 'past30days' || this.Statisticaltime === 'month') {
            text = 'vs 前30天 '
            for (const item in attributeTreeRes.data) {
              let color = 'green'
              if (attributeTreeRes.data[item].ratio < 0) {
                color = 'red'
              }
              if (item === 'bounce_rate' || item === 'atc_rate' || item === 'uv_to_placed_buyers_rate' || item === 'uv_to_paid_buyers_rate' || item === 'uv_to_confirmed_buyers_rate') {
                data[`${item}`] = `<pre style='color:${color}'>${(attributeTreeRes.data[item].value * 100).toFixed(2)}%</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else if (item === 'paid_gmv') {
                data[`${item}`] = `<pre style='color:${color}'>${this.currency}${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              } else {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data[item].value}</pre><pre style='color:${color}'>${text}${(Number(attributeTreeRes.data[item].ratio) * 100).toFixed(2)}%</pre>`
              }
            }
          }
          console.log('datadatadata', data)
          if (Object.getOwnPropertyNames(data).length > 8) {
            this.tableData.push(data)
          }
        } else if (attributeTreeRes.status === 403) {
          this.$refs.Logs.writeLog(`【${mallname}】 数据获取失败：店铺未登录`, false)
          this.errmall.push(mallname)
        }
      } catch (e) {
        console.log(e)
      } finally {
        --count.count
      }
    },
    async getallinfo() {
      if (this.Statisticaltime === 'day' || this.Statisticaltime === 'week' || this.Statisticaltime === 'month') {
        if (this.timechoose.length < 1) {
          this.$message.error(`请选择您需要查看的日期`)
          return
        }
      }
      if (this.mall.length > 0) {
        this.indexs = 1
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.exportdata = []
        this.errmall = []
        this.$refs.Logs.writeLog('开始查询')
        await batchOperation(this.mall, this.getTableData)
        this.$refs.Logs.writeLog('查询结束')
        this.Loading3 = false
        setTimeout(() => {
          this.Loading1 = false
        }, 3000)
      } else {
        this.$message({
          message: '请选择店铺',
          type: 'warning'
        })
      }
    },
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">商品访客数【访问】</td>
        <td style="width: 200px; text-align:left;">商品页面访问量【访问】</td>
        <td style="width: 200px; text-align:left;">已访问的商品【访问】</td>
        <td style="width: 200px; text-align:left;">商品跳出率【访问】</td>
        <td style="width: 200px; text-align:left;">赞【访问】</td>
        <td style="width: 200px; text-align:left;">件数【加入购物车】</td>
        <td style="width: 200px; text-align:left;">转换率【加入购物车】</td>
        <td style="width: 200px; text-align:left;">件数【已付款订单】</td>
        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>
        <td style="width: 200px; text-align:left;">已付款的商品【已付款订单】</td>
        <td style="width: 200px; text-align:left;">转化率 (访问至确定)【已付款订单】</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.uv}</td>
          <td style="text-align:left;">${item.pv}</td>
          <td style="text-align:left;">${item.iv}</td>
          <td style="text-align:left;">${(item.bounce_rate * 100).toFixed(2)}%</td>
          <td style="text-align:left;">${item.like_unit_num}</td>
          <td style="text-align:left;">${item.atc_unit_num}</td>
          <td style="text-align:left;">${(item.atc_rate * 100).toFixed(2)}%</td>
          <td style="text-align:left;">${item.placed_unit_num}</td>
          <td style="text-align:left;">${item.paid_gmv}</td>
          <td style="text-align:left;">${item.paid_items}</td>
          <td style="text-align:left;">${(item.uv_to_confirmed_buyers_rate * 100).toFixed(2)}%</td>
        </tr>
        `
        })
        exportExcelDataCommon('商品概述信息', msg)
      } else {
        return this.$notify({
          title: '商品概述信息',
          type: 'warning',
          message: `没有可以导出的信息`
        })
      }
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 取消功能
    cancel() {
      this.serchload = true
    },
    getMonday(date) { // 返回本周的周一的0时0分0秒
      const day = date.getDay()
      let deltaDay
      if (day === 0) {
        deltaDay = 6
      } else {
        deltaDay = day - 1
      }
      const monday = new Date(date.getTime() - deltaDay * 24 * 60 * 60 * 1000)
      monday.setHours(0)
      monday.setMinutes(0)
      monday.setSeconds(0)
      return monday // 返回本周的周一的0时0分0秒
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
