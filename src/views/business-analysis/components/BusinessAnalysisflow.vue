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
          <el-select v-model="group" placeholder="请选择分组" multiple collapse-tags clearable size="medium" filterable>
            <el-option v-if="selectall" label="全部" :value="0" />
            <el-option v-if="!selectall" label="全部" :value="-2" />
            <el-option v-for="(item, index) in gruopList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>店铺：</span>
          <el-select v-model="mall" placeholder="请选择店铺" multiple collapse-tags clearable size="medium" filterable>
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
      </ul><br>
      <div style="border:1px solid black;width:100%;height:100%">
        <span style="margin-left:20px">浏览量统计</span>
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
      </div>
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
      start_time: 1634659200,
      end_time: 1634695200,
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
      if (val === 'real_time') {
        this.start_time = 1634659200
        this.end_time = 1634695200
      } else if (val === 'yesterday') {
        this.start_time = 1634054400
        this.end_time = 1634659200
      } else if (val === 'past7days') {
        this.start_time = 1634054400
        this.end_time = 1634659200
      } else if (val === 'past30days') {
        this.start_time = 1632067200
        this.end_time = 1634659200
      }
    },
    site(val, oldVal) {
      this.mall = []
      this.group = []
      this.getInfo()
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
      if (this.mall.length > 0) {
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.exportdata = []
        const timenow = new Date().getTime() - 3600 * 1000 * 24
        const yesterdaytime = this.$dayjs(timenow).format('YYYYMMDD')
        for (let i = 0; i < this.mall.length; i++) {
          const params = {
            start_time: this.start_time,
            end_time: this.end_time,
            period: this.Statisticaltime,
            // group: this.group,
            mallId: this.mall[i],
            fetag: 'fetag',
            dt: yesterdaytime
          }
          console.log('this is my parmas', params)
          const attributeTreeJson = await this.$shopeemanService.getFlow(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let attributeTreeRes
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
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
            console.log('pcppcpccpcpcpcpcpcpc', pc)
            console.log('appappappappappappapp', app)
            data['mallname'] = mallname
            let arrow1 = ''
            if (app.page_views_pct_diff >= 0) {
              arrow1 = '↑'
            } else {
              arrow1 = '↓'
            }
            data['apppage_views'] = `<pre>${app.page_views}
提升率 ${Math.abs(app.page_views_pct_diff * 100).toFixed(2)}% ${arrow1}</pre>`
            let arrow2 = ''
            if (app.avg_page_views_pct_diff >= 0) {
              arrow2 = '↑'
            } else {
              arrow2 = '↓'
            }
            data['appavg_page_views'] = `<pre>${app.avg_page_views.toFixed(2)}
提升率 ${Math.abs(app.avg_page_views_pct_diff * 100).toFixed(2)}% ${arrow2}</pre>`
            let arrow3 = ''
            if (app.avg_stay_time_pct_diff >= 0) {
              arrow3 = '↑'
            } else {
              arrow3 = '↓'
            }
            data['appavg_stay_time'] = `<pre>${app.avg_stay_time}
提升率 ${Math.abs(app.avg_stay_time_pct_diff * 100).toFixed(2)}% ${arrow3}</pre>`
            let arrow4 = ''
            if (app.bounce_rate_pct_diff >= 0) {
              arrow4 = '↑'
            } else {
              arrow4 = '↓'
            }
            data['appbounce_rate'] = `<pre>${(app.bounce_rate * 100).toFixed(2)}%
提升率 ${Math.abs(app.bounce_rate_pct_diff * 100).toFixed(2)}% ${arrow4}</pre>`
            let arrow5 = ''
            if (app.visitors_pct_diff >= 0) {
              arrow5 = '↑'
            } else {
              arrow5 = '↓'
            }
            data['appvisitors'] = `<pre>${app.visitors}
提升率 ${Math.abs(app.visitors_pct_diff * 100).toFixed(2)}% ${arrow5}</pre>`
            let arrow6 = ''
            if (app.new_visitors_pct_diff >= 0) {
              arrow6 = '↑'
            } else {
              arrow6 = '↓'
            }
            data['appnew_visitors'] = `<pre>${app.new_visitors}
提升率 ${Math.abs(app.new_visitors_pct_diff * 100).toFixed(2)}% ${arrow6}</pre>`
            let arrow7 = ''
            if (app.existing_visitors_pct_diff >= 0) {
              arrow7 = '↑'
            } else {
              arrow7 = '↓'
            }
            data['appexisting_visitors'] = `<pre>${app.existing_visitors}
提升率 ${Math.abs(app.existing_visitors_pct_diff * 100).toFixed(2)}% ${arrow7}</pre>`
            let arrow8 = ''
            if (app.new_followers_pct_diff >= 0) {
              arrow8 = '↑'
            } else {
              arrow8 = '↓'
            }
            data['appnew_followers'] = `<pre>${app.new_followers}
提升率 ${Math.abs(app.new_followers_pct_diff * 100).toFixed(2)}% ${arrow8}</pre>`
            let arrow9 = ''
            if (pc.page_views_pct_diff >= 0) {
              arrow9 = '↑'
            } else {
              arrow9 = '↓'
            }
            data['pcpage_views'] = `<pre>${pc.page_views}
提升率 ${Math.abs(pc.page_views_pct_diff * 100).toFixed(2)}% ${arrow9}</pre>`
            let arrow10 = ''
            if (pc.avg_page_views_pct_diff >= 0) {
              arrow10 = '↑'
            } else {
              arrow10 = '↓'
            }
            data['pcavg_page_views'] = `<pre>${pc.avg_page_views.toFixed(2)}
提升率 ${Math.abs(pc.avg_page_views_pct_diff * 100).toFixed(2)}% ${arrow10}</pre>`
            let arrow11 = ''
            if (pc.avg_stay_time_pct_diff >= 0) {
              arrow11 = '↑'
            } else {
              arrow11 = '↓'
            }
            data['pcavg_stay_time'] = `<pre>${pc.avg_stay_time}
提升率 ${Math.abs(pc.avg_stay_time_pct_diff * 100).toFixed(2)}% ${arrow11}</pre>`
            let arrow12 = ''
            if (pc.bounce_rate_pct_diff >= 0) {
              arrow12 = '↑'
            } else {
              arrow12 = '↓'
            }
            data['pcbounce_rate'] = `<pre>${(pc.bounce_rate * 100).toFixed(2)}%
提升率 ${Math.abs(pc.bounce_rate_pct_diff * 100).toFixed(2)}% ${arrow12}</pre>`
            let arrow13 = ''
            if (pc.visitors_pct_diff >= 0) {
              arrow13 = '↑'
            } else {
              arrow13 = '↓'
            }
            data['pcvisitors'] = `<pre>${pc.visitors}
提升率 ${Math.abs(pc.visitors_pct_diff * 100).toFixed(2)}% ${arrow13}</pre>`
            let arrow14 = ''
            if (pc.new_visitors_pct_diff >= 0) {
              arrow14 = '↑'
            } else {
              arrow14 = '↓'
            }
            data['pcnew_visitors'] = `<pre>${pc.new_visitors}
提升率 ${Math.abs(pc.new_visitors_pct_diff * 100).toFixed(2)}% ${arrow14}</pre>`
            let arrow15 = ''
            if (pc.existing_visitors_pct_diff >= 0) {
              arrow15 = '↑'
            } else {
              arrow15 = '↓'
            }
            data['pcexisting_visitors'] = `<pre>${pc.existing_visitors}
提升率 ${Math.abs(pc.existing_visitors_pct_diff * 100).toFixed(2)}% ${arrow15}</pre>`
            let arrow16 = ''
            if (pc.new_followers_pct_diff >= 0) {
              arrow16 = '↑'
            } else {
              arrow16 = '↓'
            }
            data['pcnew_followers'] = `<pre>${pc.new_followers}
提升率 ${Math.abs(pc.new_followers_pct_diff * 100).toFixed(2)}% ${arrow16}</pre>`
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
