<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px;margin-left:24px">
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
          <el-select v-model="type" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in typelist" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button v-if="type==='shopee'" type="primary" :disabled="Loading1" size="mini" @click="categorychooce">shopee类目选择</el-button>
          <el-select v-if="type==='shop'" v-model="b" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in B" :key="index" :label="item.label" :value="item.value" />
          </el-select>
          <el-input v-model="keyword" style="margin-left:10px" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" placeholder="搜索商品" />
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button v-if="btcontrol" type="primary" size="mini" @click="a1">▲选择条件</el-button>
          <el-button v-if="!btcontrol" type="primary" size="mini" @click="a2">▼选择条件</el-button>
          <el-button type="primary" :disabled="Loading2" size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="DerivedData">数据导出</el-button>
          <el-button type="primary" size="mini" @click="clearLog">清除日志</el-button>
        </li>
        <li><el-checkbox
          v-model="showlog"
        >隐藏日志</el-checkbox></li>
      </ul><br>
      <ul v-if="textcontrol">
        <li style="margin-left:36px">访问：</li>
        <li><el-checkbox
          v-model="column1"
        >商品访客数</el-checkbox></li>
        <li><el-checkbox
          v-model="column2"
        >商品页面访问量</el-checkbox></li>
        <li><el-checkbox
          v-model="column3"
        >商品跳出率</el-checkbox></li>
        <li><el-checkbox
          v-model="column4"
        >赞</el-checkbox></li>
      </ul>
      <ul v-if="textcontrol">
        <li>加入购物车：</li>
        <li><el-checkbox
          v-model="column5"
        >商品访客数</el-checkbox></li>
        <li><el-checkbox
          v-model="column6"
        >件数</el-checkbox></li>
        <li><el-checkbox
          v-model="column7"
        >转化率（加入购物车）</el-checkbox></li>
      </ul>
      <ul v-if="textcontrol">
        <li style="margin-left:12px">已下订单：</li>
        <li><el-checkbox
          v-model="column8"
        >买家</el-checkbox></li>
        <li><el-checkbox
          v-model="column9"
        >件数</el-checkbox></li>
        <li><el-checkbox
          v-model="column10"
        >销售额</el-checkbox></li>
        <li><el-checkbox
          v-model="column11"
        >转化率（访问至下单）</el-checkbox></li>
      </ul>
      <ul v-if="textcontrol">
        <li style="margin-left:12px">已下订单：</li>
        <li><el-checkbox
          v-model="column12"
        >买家</el-checkbox></li>
        <li><el-checkbox
          v-model="column13"
        >件数</el-checkbox></li>
        <li><el-checkbox
          v-model="column14"
        >销售额</el-checkbox></li>
        <li><el-checkbox
          v-model="column15"
        >转化率（访问至付款）</el-checkbox></li>
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
        <el-table-column align="center" label="序列号" width="80" prop="index" />
        <el-table-column align="center" label="店铺" width="140" prop="mallname" />
        <el-table-column align="center" label="商品ID" width="140" prop="id" />
        <el-table-column v-if="column1" align="center" prop="uv" label="商品访客数【访问】" width="140" />
        <el-table-column v-if="column2" align="center" prop="pv" label="商品页面访问量【访问】" width="170" />
        <el-table-column v-if="column3" prop="bounce_rate" label="商品跳出率【访问】" width="180" align="center" />
        <el-table-column v-if="column4" prop="likes" label="赞【访问】" width="180" align="center" />
        <el-table-column v-if="column5" prop="add_to_cart_buyers" label="商品访客数【加入购物车】" width="170" align="center" />
        <el-table-column v-if="column6" prop="add_to_cart_units" label="件数【加入购物车】" width="180" align="center" />
        <el-table-column v-if="column7" prop="uv_to_add_to_cart_rate" label="转换率【加入购物车】" width="170" align="center" />
        <el-table-column v-if="column8" prop="placed_buyers" label="买家【已下订单】" width="150" align="center" />
        <el-table-column v-if="column9" prop="placed_units" label="件数【已下订单】" width="180" align="center" />
        <el-table-column v-if="column10" prop="placed_sales" label="销售额【已下订单】" width="180" align="center" />
        <el-table-column v-if="column11" prop="uv_to_placed_buyers_rate" label="转化率（访问至下单)【已下订单】" width="220" align="center" />
        <el-table-column v-if="column12" prop="paid_buyers" label="买家【已付款订单】" width="150" align="center" />
        <el-table-column v-if="column13" prop="paid_units" label="件数【已付款订单】" width="180" align="center" />
        <el-table-column v-if="column14" prop="paid_sales" label="销售额【已付款订单】" width="150" align="center" />
        <el-table-column v-if="column15" prop="uv_to_paid_buyers_rate" label="转化率（访问至付款)【已付款订单】" width="240" align="center" />
      </el-table>
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
      <el-dialog title="类目映射" width="700px" top="25vh" :close-on-click-modal="false" :visible.sync="categoryVisible">
        <categoryMapping
          v-if="categoryVisible"
          :country="site"
          :mall-list="mallList"
          @categoryChange="categoryChange"
        />
      </el-dialog>
    </el-row>
  </el-row>
</template>
<script>
import { exportExcelDataCommon } from '../../../util/util'
import categoryMapping from '../../../components/category-mapping'
export default {
  components: { categoryMapping },
  data() {
    return {
      Loading1: false,
      column1: true,
      column2: false,
      column3: true,
      column4: false,
      column5: true,
      column6: false,
      column7: true,
      column8: true,
      column9: false,
      column10: true,
      column11: true,
      column12: true,
      column13: false,
      column14: true,
      column15: true,
      showlog: false,
      Loading2: true,
      Loading3: false,
      timecant: true,
      timechoose: new Date(),
      serchload: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      btcontrol: true,
      textcontrol: false,
      categoryVisible: false,
      keyword: '',
      categoryid: -1,
      type: `shopee`,
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
      typelist: [
        { value: `shopee`, label: '按shopee分类筛选' },
        { value: `shop`, label: '按商店分类筛选' }
      ],
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
    keyword(val, oldval) {
      this.categoryid = -1
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
    // const monday = this.$dayjs(this.getMonday(new Date())).format('YYYYMMDD 00:00:00')
    // console.log(monday)
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
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.exportdata = []
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
          let params
          let attributeTreeJson
          if (this.categoryid === -1 && this.keyword === '') {
            params = {
              start_time: this.start_time,
              end_time: this.end_time,
              period: this.Statisticaltime,
              mallId: this.mall[i],
              sort_by:	'placed_units.desc',
              metric_ids: 'all',
              limit: 20,
              offset: 0
            }
            console.log('this is my parmas', params)
            attributeTreeJson = await this.$shopeemanService.getperformance(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          } else {
            params = {
              start_time: this.start_time,
              end_time: this.end_time,
              period: this.Statisticaltime,
              mallId: this.mall[i],
              category_type: this.type,
              keyword: this.keyword,
              category:	this.categoryid,
              sort_by:	'placed_units.desc',
              metric_ids: 'all',
              page_size: 20,
              page_num:	1
            }
            console.log('this is my parmas', params)
            attributeTreeJson = await this.$shopeemanService.getperformance1(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          }
          let attributeTreeRes
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
          console.log('this is data', attributeTreeRes)
          if (attributeTreeRes.status === 200) {
            for (let i = 0; i < attributeTreeRes.data.result.items.length; i++) {
              if (attributeTreeRes.data.result.items.length > 1) {
                attributeTreeRes.data.result.items[i]['mallname'] = mallname
                attributeTreeRes.data.result.items[i]['index'] = this.indexs
                this.indexs++
                attributeTreeRes.data.result.items[i]['bounce_rate'] = (attributeTreeRes.data.result.items[i]['bounce_rate'] * 100).toFixed(2) + `%`
                attributeTreeRes.data.result.items[i]['uv_to_add_to_cart_rate'] = (attributeTreeRes.data.result.items[i]['uv_to_add_to_cart_rate'] * 100).toFixed(2) + `%`
                attributeTreeRes.data.result.items[i]['uv_to_placed_buyers_rate'] = (attributeTreeRes.data.result.items[i]['uv_to_placed_buyers_rate'] * 100).toFixed(2) + `%`
                attributeTreeRes.data.result.items[i]['uv_to_paid_buyers_rate'] = (attributeTreeRes.data.result.items[i]['uv_to_paid_buyers_rate'] * 100).toFixed(2) + `%`
                attributeTreeRes.data.result.items[i]['placed_sales'] = `${this.currency}${attributeTreeRes.data.result.items[i]['placed_sales']}`
                attributeTreeRes.data.result.items[i]['paid_sales'] = `${this.currency}${attributeTreeRes.data.result.items[i]['paid_sales']}`
                this.exportdata.push(attributeTreeRes.data.result.items[i])
                this.tableData.push(attributeTreeRes.data.result.items[i])
              }
            }
          } else if (attributeTreeRes.status === 403) {
            this.$refs.Logs.writeLog(`【${mallname}】 数据获取失败：店铺未登录`, false)
            this.errmall.push(mallname)
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
    // 数据导出功能
    async DerivedData() {
      if (this.exportdata.length) {
        let msg = `<tr>
        <td style="width: 200px; text-align:left;">店铺名称</td>
        <td style="width: 200px; text-align:left;">商品ID</td>
        <td style="width: 200px; text-align:left;">商品访客数【访问】</td>
        <td style="width: 200px; text-align:left;">商品页面访问量【访问】</td>
        <td style="width: 200px; text-align:left;">商品跳出率【访问】</td>
        <td style="width: 200px; text-align:left;">赞【访问】</td>
        <td style="width: 200px; text-align:left;">商品访客数【加入购物车】</td>
        <td style="width: 200px; text-align:left;">件数【加入购物车】</td>
        <td style="width: 200px; text-align:left;">转换率【加入购物车】</td>
        <td style="width: 200px; text-align:left;">买家【已下订单】</td>
        <td style="width: 200px; text-align:left;">件数【已下订单】</td>
        <td style="width: 200px; text-align:left;">销售额【已下订单】</td>
        <td style="width: 200px; text-align:left;">转化率 (访问至下单)【已下订单】</td>
        <td style="width: 200px; text-align:left;">买家【已付款订单】</td>
        <td style="width: 200px; text-align:left;">件数【已付款订单】</td>
        <td style="width: 200px; text-align:left;">销售额【已付款订单】</td>
        <td style="width: 200px; text-align:left;">转化率 (访问至付款)【已付款订单】</td>
      </tr>`
        this.exportdata.map((item) => {
          msg += `
        <tr>
          <td style="text-align:left;">${item.mallname}</td>
          <td style="text-align:left;">${item.id}</td>
          <td style="text-align:left;">${item.uv}</td>
          <td style="text-align:left;">${item.pv}</td>
          <td style="text-align:left;">${item.bounce_rate}</td>
          <td style="text-align:left;">${item.likes}</td>
          <td style="text-align:left;">${item.add_to_cart_buyers}</td>
          <td style="text-align:left;">${item.add_to_cart_units}</td>
          <td style="text-align:left;">${item.uv_to_add_to_cart_rate}</td>
          <td style="text-align:left;">${item.placed_buyers}</td>
          <td style="text-align:left;">${item.placed_units}</td>
          <td style="text-align:left;">${item.placed_sales}</td>
          <td style="text-align:left;">${item.uv_to_placed_buyers_rate}</td>
          <td style="text-align:left;">${item.paid_buyers}</td>
          <td style="text-align:left;">${item.paid_units}</td>
          <td style="text-align:left;">${item.paid_sales}</td>
          <td style="text-align:left;">${item.uv_to_paid_buyers_rate}</td>
        </tr>
        `
        })
        exportExcelDataCommon('商品表现信息', msg)
      } else {
        return this.$notify({
          title: '商品表现信息',
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
    a1() {
      this.btcontrol = false
      this.textcontrol = true
    },
    a2() {
      this.btcontrol = true
      this.textcontrol = false
    },
    categoryChange(val) {
      console.log('categoryChange', val)
      if (val) {
        console.log('this is val', val.categoryList[1].category_id)
        this.categoryid = val.categoryList[1].category_id
      }
      this.categoryVisible = false
    },
    categorychooce() {
      this.categoryVisible = true
      this.categoryid = -1
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

<style lang="less">

</style>
