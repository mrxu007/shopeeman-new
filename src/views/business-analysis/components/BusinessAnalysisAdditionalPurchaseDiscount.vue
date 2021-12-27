<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>站点：</span>
          <el-select v-model="site" size="mini" filterable>
            <el-option v-for="(item,index) in siteList" :key="index" :value="item.value" :label="item.label" />
          </el-select>
        </li>
        <li>
          <span>店铺分组：</span>
          <el-select v-model="group" class="mall" placeholder="请选择分组" multiple collapse-tags clearable size="mini" filterable>
            <el-option v-if="selectall" label="全部" :value="0" />
            <el-option v-if="!selectall" label="全部" :value="-2" />
            <el-option v-for="(item, index) in gruopList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>店铺：</span>
          <el-select v-model="mall" class="mall" placeholder="请选择店铺" multiple collapse-tags clearable size="mini" filterable>
            <el-option v-if="selectall1" label="全部" :value="0" />
            <el-option v-if="!selectall1" label="全部" :value="-2" />
            <el-option v-for="(item, index) in mallList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>统计时间：</span>
          <el-select v-model="Statisticaltime" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatisticaltime" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="DerivedData1">导出加购折扣数据</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="DerivedData2">导出赠品满最低消费数据</el-button>
        </li>
      </ul>
      <el-table
        ref="plTable"
        v-loading="Loading3"
        style="margin-top:10px"
        header-align="center"
        height="calc(100vh - 100px)"
        :data="tableData1"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" label="店铺名称" width="160" prop="mallname" />
        <el-table-column label="加购折扣" align="center">
          <el-table-column prop="sales" label="销售（主要及加购商品）" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.sales" />
            </template>
          </el-table-column>
          <el-table-column prop="add_on_item_sales" label="加购商品销售" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.add_on_item_sales" />
            </template>
          </el-table-column>
          <el-table-column prop="main_item_units" label="已售出的商品总件数" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.main_item_units" />
            </template>
          </el-table-column>
          <el-table-column prop="add_on_item_units" label="已售出的加购商品件数" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.add_on_item_units" />
            </template>
          </el-table-column>
          <el-table-column prop="orders" label="订单量" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.orders" />
            </template>
          </el-table-column>
          <el-table-column prop="buyers" label="买家数" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.buyers" />
            </template>
          </el-table-column>
          <el-table-column prop="main_item_sales_per_buyer" label="每位买家的销售额" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.main_item_sales_per_buyer" />
            </template>
          </el-table-column>
          <el-table-column prop="add_on_item_sales_per_buyer" label="每位买家的加购商品销售" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.add_on_item_sales_per_buyer" />
            </template>
          </el-table-column>
        </el-table-column>
        <el-table-column label="赠品满最低消费" align="center">
          <el-table-column prop="main_item_sales1" label="主商品销售" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.main_item_sales1" />
            </template>
          </el-table-column>
          <el-table-column prop="main_item_units1" label="已售主商品总件数" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.main_item_units1" />
            </template>
          </el-table-column>
          <el-table-column prop="orders1" label="订单量" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.orders1" />
            </template>
          </el-table-column>
          <el-table-column prop="buyers1" label="买家数" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.buyers1" />
            </template>
          </el-table-column>
          <el-table-column prop="main_item_sales_per_buyer1" label="每位买家的主商品销售" width="180" align="center">
            <template slot-scope="{row}">
              <div v-html="row.main_item_sales_per_buyer1" />
            </template>
          </el-table-column>
        </el-table-column>
      </el-table>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      eidtVisible: false,
      exportdata1: [], // 导出数据1
      exportdata2: [], // 导出数据2
      allgroupid: [],
      allmallid: [],
      tableData1: [],
      tableData2: [],
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
    group(val, oldVal) {
      this.mall = []
      for (let i = 0; i < val.length; i++) {
        if (val[i] === 0) {
          this.group = this.allgroupid
          this.mall = [].concat(this.allmallid)
          this.selectall = false
        } else if (val[i] === -2) {
          this.group = []
          this.mall = []
          this.selectall = true
        } else {
          for (let j = 0; j < this.mallList.length; j++) {
            if (val[i] === this.mallList[j].group_id) {
              this.mall.push(this.mallList[j].value)
            }
          }
        }
      }
    },
    mall(val, oldVal) {
      for (let i = 0; i < val.length; i++) {
        if (val[i] === 0) {
          this.mall = this.allmallid
          this.selectall1 = false
        }
        if (val[i] === -2) {
          this.mall = []
          this.selectall1 = true
        }
      }
    },
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
    site(val, oldVal) {
      this.mall = []
      this.group = []
      this.getInfo()
      if (this.site === 'MY') {
        this.currency = 'RM'
      }
      if (this.site === 'TW') {
        this.currency = '$'
      }
      if (this.site === 'VN') {
        this.currency = '₫'
      }
      if (this.site === 'ID') {
        this.currency = 'Rp'
      }
      if (this.site === 'PH') {
        this.currency = '₱'
      }
      if (this.site === 'TH') {
        this.currency = '฿'
      }
      if (this.site === 'SG') {
        this.currency = '$'
      }
      if (this.site === 'BR') {
        this.currency = 'R$'
      }
      if (this.site === 'MX') {
        this.currency = 'MX$'
      }
      if (this.site === 'CO') {
        this.currency = '$'
      }
      if (this.site === 'CL') {
        this.currency = '$'
      }
      if (this.site === 'PL') {
        this.currency = 'zł'
      }
    }
  },
  mounted() {
    this.getInfo()
    // const timenow = new Date().getTime()
    // const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
    // const changea = returnCreateStartTime.split(':')
    // changea[0] = Number(changea[0]) - 1
    // const onehoureago = `${changea[0]}:${changea[1]}`
    // console.log(onehoureago)
  },
  methods: {
    // 分组信息查找
    async getInfo() {
      const params = {
        country: this.site,
        mallGroupIds: this.group
      }
      const res = await this.$api.ddMallGoodsGetMallList(params)
      this.mallList = []; this.gruopList = []; this.allgroupid = []; this.allmallid = []
      // console.log('1111111111111111111111', res.data)
      if (res.data.code === 200) {
        res.data.data.forEach(el => {
          if (el.group_id) {
            this.gruopList.push({ label: el.group_name, value: el.group_id })
          }
          if (el.id) {
            this.mallList.push({ label: el.mall_alias_name ? el.mall_alias_name : el.platform_mall_name, value: el.platform_mall_id, group_id: el.group_id })
          }
        })
        for (let i = 0; i < this.gruopList.length - 1; i++) {
          for (let j = i + 1; j < this.gruopList.length; j++) {
            if (this.gruopList[i].value === this.gruopList[j].value) {
              this.gruopList.splice(j, 1)
            }
          }
        }
        for (let i = 0; i < this.gruopList.length; i++) {
          this.allgroupid.push(this.gruopList[i].value)
        }
        for (let i = 0; i < this.mallList.length; i++) {
          this.allmallid.push(this.mallList[i].value)
        }
      } else {
        this.$message.warning('店铺列表获取失败！')
      }
    },
    async getallinfo() {
      if (this.mall.length > 0) {
        this.Loading1 = true
        this.Loading3 = true
        this.tableData1 = []
        this.tableData2 = []
        this.exportdata1 = []
        this.exportdata2 = []
        this.errmall = []
        let data = {}
        for (let i = 0; i < this.mall.length; i++) {
          data = {}
          const params = {
            start_time: this.start_time,
            end_time: this.end_time,
            period: this.Statisticaltime,
            // group: this.group,
            mallId: this.mall[i]
          }
          console.log('this is my parmas', params)
          const attributeTreeJson = await this.$shopeemanService.getAdditionalpurchase1(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let attributeTreeRes
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
          // console.log('this is data', attributeTreeRes)
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
          }
          if (attributeTreeRes.status === 200) {
            const exportdata = {}
            exportdata['mallname'] = mallname
            exportdata['sales'] = attributeTreeRes.data.result.sales
            exportdata['buyers'] = attributeTreeRes.data.result.buyers
            exportdata['orders'] = attributeTreeRes.data.result.orders
            exportdata['add_on_item_sales'] = attributeTreeRes.data.result.add_on_item_sales
            exportdata['add_on_item_units'] = attributeTreeRes.data.result.add_on_item_units
            exportdata['add_on_item_sales_per_buyer'] = attributeTreeRes.data.result.add_on_item_sales_per_buyer
            exportdata['main_item_sales'] = attributeTreeRes.data.result.main_item_sales
            exportdata['main_item_units'] = attributeTreeRes.data.result.main_item_units
            exportdata['main_item_sales_per_buyer'] = attributeTreeRes.data.result.main_item_sales_per_buyer
            this.exportdata1.push(exportdata)
            data['mallname'] = mallname
            for (const item in attributeTreeRes.data.result) {
              const itemlv = `${item}_pct_diff`
              let color = 'green'
              if (attributeTreeRes.data.result[itemlv] < 0) {
                color = 'red'
              }
              if (this.Statisticaltime === 'real_time') {
                const timenow = new Date().getTime()
                const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
                const changea = returnCreateStartTime.split(':')
                changea[0] = Number(changea[0]) - 1
                const onehoureago = `${changea[0]}:${changea[1]}`
                if (item === 'sales' || item === 'add_on_item_sales' || item === 'main_item_sales_per_buyer' || item === 'add_on_item_sales_per_buyer') {
                  data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else {
                  data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                }
              } else if (this.Statisticaltime === 'yesterday') {
                if (item === 'sales' || item === 'add_on_item_sales' || item === 'main_item_sales_per_buyer' || item === 'add_on_item_sales_per_buyer') {
                  data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              } else if (this.Statisticaltime === 'past7days') {
                if (item === 'sales' || item === 'add_on_item_sales' || item === 'main_item_sales_per_buyer' || item === 'add_on_item_sales_per_buyer') {
                  data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              } else if (this.Statisticaltime === 'past30days') {
                if (item === 'sales' || item === 'add_on_item_sales' || item === 'main_item_sales_per_buyer' || item === 'add_on_item_sales_per_buyer') {
                  data[`${item}`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              }
            }
          } else if (attributeTreeRes.status === 403) {
            this.errmall.push(mallname)
          }
          let res = await this.$shopeemanService.getAdditionalpurchase2(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          if (res) {
            res = JSON.parse(res)
          }
          res.data = JSON.parse(res.data)
          console.log('this is data', res)
          if (res.status === 200) {
            const exportdata = {}
            exportdata['mallname'] = mallname
            exportdata['main_item_sales'] = attributeTreeRes.data.result.main_item_sales
            exportdata['main_item_units'] = attributeTreeRes.data.result.main_item_units
            exportdata['orders'] = attributeTreeRes.data.result.orders
            exportdata['buyers'] = attributeTreeRes.data.result.buyers
            exportdata['main_item_sales_per_buyer'] = attributeTreeRes.data.result.main_item_sales_per_buyer
            this.exportdata2.push(exportdata)
            for (const item in attributeTreeRes.data.result) {
              const itemlv = `${item}_pct_diff`
              let color = 'green'
              if (attributeTreeRes.data.result[itemlv] < 0) {
                color = 'red'
              }
              if (this.Statisticaltime === 'real_time') {
                const timenow = new Date().getTime()
                const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
                const changea = returnCreateStartTime.split(':')
                changea[0] = Number(changea[0]) - 1
                const onehoureago = `${changea[0]}:${changea[1]}`
                if (item === 'main_item_sales' || item === 'main_item_sales_per_buyer') {
                  data[`${item}1`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else {
                  data[`${item}1`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 00:00 - ${onehoureago}  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                }
              } else if (this.Statisticaltime === 'yesterday') {
                if (item === 'main_item_sales' || item === 'main_item_sales_per_buyer') {
                  data[`${item}1`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}1`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              } else if (this.Statisticaltime === 'past7days') {
                if (item === 'main_item_sales' || item === 'main_item_sales_per_buyer') {
                  data[`${item}1`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}1`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              } else if (this.Statisticaltime === 'past30days') {
                if (item === 'main_item_sales' || item === 'main_item_sales_per_buyer') {
                  data[`${item}1`] = `<pre style='color:${color}'>${this.currency}${(attributeTreeRes.data.result[item]).toFixed(2)}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>`
                } else { data[`${item}1`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[itemlv] * 100).toFixed(2)}%</pre>` }
              }
            }
            this.tableData1.push(data)
          }
        }
        if (this.errmall.length > 0) {
          this.$message.error(`店铺【${this.errmall}】未登录`)
        }
        this.Loading1 = false
        this.Loading3 = false
      } else {
        this.$message.warning('请选择店铺！')
      }
    },
    // 数据导出1功能
    async DerivedData1() {
      if (this.exportdata1.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">销售（主要及加购商品）</td>
        <td style="width: 200px; text-align:left;">加购商品销售</td>
        <td style="width: 200px; text-align:left;">已出售的商品总件数</td>
        <td style="width: 200px; text-align:left;">已出售的加购商品总件数</td>
        <td style="width: 200px; text-align:left;">订单量</td>
        <td style="width: 200px; text-align:left;">买家数</td>
        <td style="width: 200px; text-align:left;">每位买家的销售额</td>
        <td style="width: 200px; text-align:left;">每位买家的加购商品销售</td>
      </tr>`
        this.exportdata1.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.sales}</td>
          <td style="text-align:left;">${item.add_on_item_sales}</td>
          <td style="text-align:left;">${item.main_item_units}</td>
          <td style="text-align:left;">${item.add_on_item_units}</td>
          <td style="text-align:left;">${item.orders}</td>
          <td style="text-align:left;">${item.buyers}</td>
          <td style="text-align:left;">${item.main_item_sales_per_buyer}</td>
          <td style="text-align:left;">${item.add_on_item_sales_per_buyer}</td>
        </tr>
        `
        })
        exportExcelDataCommon('加购折扣信息', msg)
      } else {
        return this.$notify({
          title: '加购折扣信息',
          type: 'warning',
          message: `没有可以导出的信息`
        })
      }
    },
    // 数据导出2功能
    async DerivedData2() {
      if (this.exportdata2.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">主商品销售</td>
        <td style="width: 200px; text-align:left;">已售主商品总件数</td>
        <td style="width: 200px; text-align:left;">订单量</td>
        <td style="width: 200px; text-align:left;">买家数</td>
        <td style="width: 200px; text-align:left;">每位买家的主商品销售</td>
      </tr>`
        this.exportdata2.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.main_item_sales}</td>
          <td style="text-align:left;">${item.main_item_units}</td>
          <td style="text-align:left;">${item.orders}</td>
          <td style="text-align:left;">${item.buyers}</td>
          <td style="text-align:left;">${item.main_item_sales_per_buyer}</td>
        </tr>
        `
        })
        exportExcelDataCommon('赠品满最低消费信息', msg)
      } else {
        return this.$notify({
          title: '赠品满最低消费信息',
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
