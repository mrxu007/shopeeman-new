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
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading2" size="mini" @click="cancel">取消</el-button>
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
        height="calc(100vh - 120px)"
        :data="tableData1"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="序列号" width="100" prop="index" />
        <el-table-column align="center" prop="mallname" label="店铺" width="250" />
        <el-table-column align="center" prop="l1_cat_name" label="分类" width="270" />
        <el-table-column prop="sales" label="销售额" width="270" align="center" />
        <el-table-column prop="sales_percentage" label="销售额%" width="210" align="center" />
        <el-table-column prop="buyers" label="买家" width="270" align="center" />
        <el-table-column prop="conversion_rate" label="转化率" width="210" align="center" />
        <el-table-column label="查看明细" width="100" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="view(row)">查看</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="查看子分类" :visible.sync="eidtVisible" width="40%">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="子分类" width="160" prop="l2_cat_name" />
          <el-table-column align="center" prop="sales" label="销售额" width="140" />
          <el-table-column align="center" prop="sales_percentage" label="销售额%" width="120" />
          <el-table-column prop="buyers" label="买家" width="130" align="center" />
          <el-table-column prop="conversion_rate" label="转化率%" width="100" align="center" />
        </el-table>
      </el-dialog>
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
    </el-row>
  </el-row>
</template>
<script>
import storeChoose from '@/components/store-choose'
import { batchOperation } from '@/util/util'

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
      eidtVisible: false,
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData1: [],
      tableData2: [],
      tableData3: [],
      errmall: [],
      indexs: 1,
      indexs1: 1,
      indexs2: 1,
      currency: '฿',
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
        { value: 'past7days', label: '过去7天' },
        { value: 'past30days', label: '过去30天' }
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
    timechoose(val, oldval) {
      if (this.site === 'TH' || this.site === 'ID' || this.site === 'VN') {
        if (this.Statisticaltime === 'day') {
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000
        } else if (this.Statisticaltime === 'week') {
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 01:00:00')) / 1000
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
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 11:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 11:00:00')) / 1000
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
          this.start_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 00:00:00')) / 1000 - 3600 * 24 * 7
          this.end_time = Date.parse(this.$dayjs(val).format('YYYY-MM-DD 00:00:00')) / 1000
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
        let mallname = item.mall_alias_name || item.platform_mall_name
        if (this.serchload === true) {
          this.Loading3 = false
          setTimeout(() => {
            this.Loading1 = false
          }, 3000)
          this.serchload = false
          return
        }
        const params = {
          start_time: this.start_time,
          end_time: this.end_time,
          period: this.Statisticaltime,
          // group: this.group,
          mallId: this.mall[i]
        }
        console.log('this is my parmas', params)

        const attributeTreeJson1 = await this.$shopeemanService.getsalasstructure1(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson1) {
          attributeTreeRes = JSON.parse(attributeTreeJson1)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        // console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          if (attributeTreeRes.data.data) {
            for (let j = 0; j < attributeTreeRes.data.data.length; j++) {
              const data = {}
              data['mallname'] = mallname
              data['index'] = this.indexs
              this.indexs++
              data['l1_cat_name'] = attributeTreeRes.data.data[j].l1_cat_name
              data['sales'] = `${this.currency}${attributeTreeRes.data.data[j].sales}`
              data['sales_percentage'] = (attributeTreeRes.data.data[j].sales_percentage * 100).toFixed(2) + `%`
              data['buyers'] = `-`
              data['conversion_rate'] = `-%`
              data['l2_cats'] = attributeTreeRes.data.data[j].l2_cats
              for (let l = 0; l < data['l2_cats'].length; l++) {
                data['l2_cats'][l].sales = `${this.currency}${data['l2_cats'][l].sales}`
                data['l2_cats'][l].sales_percentage = (data['l2_cats'][l].sales_percentage * 100).toFixed(2) + `%`
                data['l2_cats'][l].conversion_rate = (data['l2_cats'][l].conversion_rate * 100).toFixed(2) + `%`
              }
              // console.log('datadatadata', data)
              this.tableData1.push(data)
            }
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
        this.indexs1 = 1
        this.indexs2 = 1
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.tableData1 = []
        this.tableData2 = []
        this.tableData3 = []
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
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 取消功能
    cancel() {
      this.serchload = true
    },
    // 表格里查看功能
    view(row) {
      this.eidtVisible = true
      this.tableData = row.l2_cats
      console.log(row.l2_cats)
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
