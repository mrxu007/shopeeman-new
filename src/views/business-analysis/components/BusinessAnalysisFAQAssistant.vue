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
        <el-table-column align="center" label="店铺名称" width="220" prop="mallname" />
        <el-table-column align="center" prop="triggered_faq_cnt" label="被触发的FAQ数" width="220">
          <template slot-scope="{ row }">
            <div v-html="row.triggered_faq_cnt" />
          </template>
        </el-table-column>
        <el-table-column prop="question_clicks" label="被点击的FAQ数" width="220" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.question_clicks" />
          </template>
        </el-table-column>
        <el-table-column prop="resolved_question_cnt" label="问题解决次数" width="220" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.resolved_question_cnt" />
          </template>
        </el-table-column>
        <el-table-column prop="transferred_live_agent_cnt" label="转实时专员次数" width="220" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.transferred_live_agent_cnt" />
          </template>
        </el-table-column>
        <el-table-column prop="helpful_clicks" label="有帮助点击数" width="220" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.helpful_clicks" />
          </template>
        </el-table-column>
        <el-table-column prop="unhelpful_clicks" label="没有帮助点击数" width="220" align="center">
          <template slot-scope="{ row }">
            <div v-html="row.unhelpful_clicks" />
          </template>
        </el-table-column>
        <el-table-column prop="appexisting_visitors" label="操作" width="150" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="view(row)">FAQ问题列表</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="FAQ问题列表" :visible.sync="eidtVisible" width="56%">
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
          <el-table-column align="center" label="FAQ问题" width="200" prop="faq_info">
            <template slot-scope="{row}">
              <div v-html="row.faq_info" />
            </template>
          </el-table-column>
          <el-table-column align="center" prop="question_clicks" label="被点击的FAQ" width="140" />
          <el-table-column align="center" prop="ctr" label="点击率" width="140" />
          <el-table-column prop="resolved_question_cnt" label="问题解决次数" width="100" align="center" />
          <el-table-column align="center" prop="resolution_rate" label="解决率" width="100" />
          <el-table-column align="center" prop="helpful_clicks" label="有帮助点击数" width="130" />
          <el-table-column align="center" prop="helpful_rate" label="有帮助率" width="100" />
        </el-table>
      </el-dialog>
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
      exportdata: [], // 导出数据
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData1: [],
      errmall: [],
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
        this.tableData = []
        this.exportdata = []
        this.errmall = []
        for (let i = 0; i < this.mall.length; i++) {
          const params = {
            start_time: this.start_time,
            end_time: this.end_time,
            period: this.Statisticaltime,
            // group: this.group,
            mallId: this.mall[i]
          }
          console.log('this is my parmas', params)
          const attributeTreeJson = await this.$shopeemanService.getfaqassistant(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
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
            exportdata['triggered_faq_cnt'] = attributeTreeRes.data.result.triggered_faq_cnt
            exportdata['question_clicks'] = attributeTreeRes.data.result.question_clicks
            exportdata['resolved_question_cnt'] = attributeTreeRes.data.result.resolved_question_cnt
            exportdata['transferred_live_agent_cnt'] = attributeTreeRes.data.result.transferred_live_agent_cnt
            exportdata['helpful_clicks'] = attributeTreeRes.data.result.helpful_clicks
            exportdata['unhelpful_clicks'] = attributeTreeRes.data.result.unhelpful_clicks
            this.exportdata.push(exportdata)
            const data = {}
            data['mallname'] = mallname
            for (const item in attributeTreeRes.data.result) {
              const itema = `${item}_pct_diff`
              let color = 'green'
              if (attributeTreeRes.data.result[itema] < 0) {
                color = 'red'
              }
              if (this.Statisticaltime === 'yesterday') {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前一天  ${(attributeTreeRes.data.result[itema] * 100).toFixed(2)}%</pre>`
              } else if (this.Statisticaltime === 'past7days') {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前7天  ${(attributeTreeRes.data.result[itema] * 100).toFixed(2)}%</pre>`
              } else if (this.Statisticaltime === 'past30days') {
                data[`${item}`] = `<pre style='color:${color}'>${attributeTreeRes.data.result[item]}</pre>` + `<pre style='color:${color}'>vs 前30天  ${(attributeTreeRes.data.result[itema] * 100).toFixed(2)}%</pre>`
              }
            }

            let res = await this.$shopeemanService.getfaqassistant1(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
            if (res) {
              res = JSON.parse(res)
              res.data = JSON.parse(res.data)
            }
            console.log('zhelizhelizheli', res)
            data['view'] = res.data.result
            if (data['view']) {
              for (let k = 0; k < data['view'].length; k++) {
                data['view'][k].faq_info = `<pre>${data['view'][k].faq_info.faq_type}</pre><pre>${data['view'][k].faq_info.faq_question}</pre><pre>更新时间：${this.$dayjs(data['view'][k].faq_info.update_time * 1000).format('YYYY-MM-DD HH:mm:ss')}</pre>`
                data['view'][k].ctr = `${(data['view'][k].ctr * 100).toFixed(2)}%`
                data['view'][k].resolution_rate = `${(data['view'][k].resolution_rate * 100).toFixed(2)}%`
                data['view'][k].helpful_rate = `${(data['view'][k].helpful_rate * 100).toFixed(2)}%`
              }
            }
            this.tableData.push(data)
          } else if (attributeTreeRes.status === 403) {
            this.errmall.push(mallname)
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
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">被触发的FAQ数</td>
        <td style="width: 200px; text-align:left;">被点击的FAQ数</td>
        <td style="width: 200px; text-align:left;">问题解决次数</td>
        <td style="width: 200px; text-align:left;">转实时专员次数</td>
        <td style="width: 200px; text-align:left;">有帮助点击数</td>
        <td style="width: 200px; text-align:left;">没有帮助点击数</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.triggered_faq_cnt}</td>
          <td style="text-align:left;">${item.question_clicks}</td>
          <td style="text-align:left;">${item.resolved_question_cnt}</td>
          <td style="text-align:left;">${item.transferred_live_agent_cnt}</td>
          <td style="text-align:left;">${item.helpful_clicks}</td>
          <td style="text-align:left;">${item.unhelpful_clicks}</td>
        </tr>
        `
        })
        exportExcelDataCommon('常见问题助手信息', msg)
      } else {
        return this.$notify({
          title: '常见问题助手信息',
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
