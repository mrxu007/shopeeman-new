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
          <el-select v-model="group" placeholder="请选择分组" multiple collapse-tags clearable size="mini" filterable>
            <el-option v-if="selectall" label="全部" :value="0" />
            <el-option v-if="!selectall" label="全部" :value="-2" />
            <el-option v-for="(item, index) in gruopList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>店铺：</span>
          <el-select v-model="mall" placeholder="请选择店铺" multiple collapse-tags clearable size="mini" filterable>
            <el-option v-if="selectall1" label="全部" :value="0" />
            <el-option v-if="!selectall1" label="全部" :value="-2" />
            <el-option v-for="(item, index) in mallList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
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
      <div style="border:1px solid black;width:56.5%;float: left;">
        <span style="margin-left:20px">分类结构</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 540px)"
          :data="tableData1"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="序列号" width="100" prop="index" />
          <el-table-column align="center" prop="mallname" label="店铺" width="140" />
          <el-table-column align="center" prop="l1_cat_name" label="分类" width="160" />
          <el-table-column prop="sales" label="销售额" width="130" align="center" />
          <el-table-column prop="sales_percentage" label="销售额%" width="100" align="center" />
          <el-table-column prop="buyers" label="买家" width="120" align="center" />
          <el-table-column prop="conversion_rate" label="转化率" width="100" align="center" />
          <el-table-column label="查看明细" width="100" align="center">
            <template slot-scope="{ row }">
              <el-button type="primary" size="mini" @click="view(row)">查看</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <div style="border:1px solid black;width:43%;float: right;">
        <span style="margin-left:20px">订单价格结构</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 540px)"
          :data="tableData2"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="序列号" width="60" prop="index" />
          <el-table-column align="center" prop="mallname" label="店铺" width="140" />
          <el-table-column align="center" prop="price_zone" label="价格范围" width="120" />
          <el-table-column prop="buyers" label="买家" width="100" align="center" />
          <el-table-column prop="buyers_percentage" label="买家%" width="100" align="center" />
          <el-table-column prop="sales" label="销售额" width="100" align="center" />
          <el-table-column prop="conversion_rate" label="转化率" width="100" align="center" />
        </el-table>
      </div>
      <div style="border:1px solid black;width:100%;margin-top:385px">
        <span style="margin-left:20px">买家结构</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 570px)"
          :data="tableData3"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="序列号" width="100" prop="index" />
          <el-table-column align="center" prop="mallname" label="店铺" width="230" />
          <el-table-column align="center" prop="buyers_type" label="买家类型" width="207" />
          <el-table-column prop="buyers" label="买家" width="230" align="center" />
          <el-table-column prop="buyers_percentage" label="买家%" width="230" align="center" />
          <el-table-column prop="sales" label="销售额" width="230" align="center" />
          <el-table-column prop="sales_percentage" label="销售额%" width="230" align="center" />
          <el-table-column prop="conversion_rate" label="转化率" width="230" align="center" />
        </el-table>
      </div>
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
    this.getInfo()
    // const timenow = new Date().getTime() - 3600 * 1000 * 24
    // const returnCreateStartTime = this.$dayjs(timenow).format('YYYYMMDD')
    // console.log(returnCreateStartTime)
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
        for (let i = 0; i < this.mall.length; i++) {
          if (this.serchload === true) {
            this.Loading3 = false
            setTimeout(() => {
              this.Loading1 = false
            }, 3000)
            this.serchload = false
            return
          }
          // await delay(2000)
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
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

          const attributeTreeJson2 = await this.$shopeemanService.getsalasstructure2(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let res
          if (attributeTreeJson2) {
            res = JSON.parse(attributeTreeJson2)
          }
          if (res.status === 200) {
            res.data = JSON.parse(res.data)
            // console.log('wuhuwhuwhuwhuwhuwuwhuwhuwhuwuwhuwuh', res)
            for (let h = 0; h < res.data.data.length; h++) {
              const data = {}
              data['index'] = this.indexs1
              this.indexs1++
              data['mallname'] = mallname
              if (res.data.data[h].price_zone[1] === -1) {
                data['price_zone'] = `${this.currency}${res.data.data[h].price_zone[0]} - ${this.currency} 无上限`
              } else {
                data['price_zone'] = `${this.currency}${res.data.data[h].price_zone[0]} - ${this.currency}${res.data.data[h].price_zone[1]}`
              }
              data['buyers'] = res.data.data[h].buyers
              data['buyers_percentage'] = (res.data.data[h].buyers_percentage * 100).toFixed(2) + `%`
              data['sales'] = `${this.currency}${res.data.data[h].sales}`
              data['sales_percentage'] = (res.data.data[h].sales_percentage * 100).toFixed(2) + `%`
              data['conversion_rate'] = (res.data.data[h].conversion_rate * 100).toFixed(2) + `%`
              // console.log('zhelizhelizheli', data)
              this.tableData2.push(data)
            }
          }

          const attributeTreeJson3 = await this.$shopeemanService.getsalasstructure3(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let res1
          if (attributeTreeJson3) {
            res1 = JSON.parse(attributeTreeJson3)
          }
          if (res1.status === 200) {
            res1.data = JSON.parse(res1.data)
            console.log('wuhuwhuwhuwhuwhuwuwhuwhuwhuwuwhuwuh', res1)
            for (let h = 0; h < res1.data.data.length; h++) {
              const data = {}
              data['index'] = this.indexs2
              this.indexs2++
              data['mallname'] = mallname
              data['buyers'] = res1.data.data[h].buyers
              data['buyers_type'] = res1.data.data[h].buyers_type
              if (data['buyers_type'] === 'new_buyers') {
                data['buyers_type'] = `新买家`
              } else if (data['buyers_type'] === 'existing_buyers') {
                data['buyers_type'] = `现有买家`
              }
              data['buyers_percentage'] = (res1.data.data[h].buyers_percentage * 100).toFixed(2) + `%`
              data['sales'] = `${this.currency}${res1.data.data[h].sales}`
              data['sales_percentage'] = (res1.data.data[h].sales_percentage * 100).toFixed(2) + `%`
              data['conversion_rate'] = (res1.data.data[h].conversion_rate * 100).toFixed(2) + `%`
              console.log('zhelizhelizheli', data)
              this.tableData3.push(data)
            }
          }
        }
        if (this.errmall.length > 0) {
          this.$message.error(`店铺【${this.errmall}】未登录`)
        }
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
