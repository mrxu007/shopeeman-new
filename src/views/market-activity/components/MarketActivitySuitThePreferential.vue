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
      </ul>
      <ul>
        <li>
          <span>活动：</span>
          <el-select v-model="status" placeholder="请选择店铺" clearable size="mini" filterable>
            <el-option label="全部" :value="1" />
            <el-option v-for="(item, index) in statuslist" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="creat">创建套装促销活动</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">停止活动创建</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">批量删除/结束勾选活动</el-button>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="clearLog">清除日志</el-button>
        </li>
        <li>
          <el-checkbox
            v-model="showlog"
          >隐藏日志</el-checkbox>
          <el-checkbox
            v-model="showexpiredactivities"
          >不显示过期活动</el-checkbox>
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
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" label="序列号" width="100" prop="index" />
        <el-table-column align="center" label="店铺" width="180" prop="mallname" />
        <el-table-column prop="name" label="套装促销名称" width="200" align="center" />
        <el-table-column prop="status" label="活动状态" width="200" align="center" />
        <el-table-column prop="num" label="商品数量" width="200" align="center" />
        <el-table-column prop="time" label="促销期间" width="280" align="center" />
        <el-table-column prop="shippingcount" label="操作" width="400" align="center">
          <template slot-scope="{row}">
            <el-button v-if="row.sign===2" type="primary" :disabled="Loading1" size="mini" @click="getallinfo">结束</el-button>
            <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">编辑商品</el-button>
            <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">复制活动</el-button>
            <el-button v-if="row.sign===2" type="primary" :disabled="Loading1" size="mini" @click="getallinfo">分享链接</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="关注礼概览" :visible.sync="creatactivity1" width="61%">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          :data="a"
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
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
      <el-dialog title="创建套装促销活动" :close-on-click-modal="false" :close-on-press-escape="false" :visible.sync="creatactivity" width="26%">
        <el-row>
          <ul>
            <li>
              <span>套装名称：</span>
              <el-input v-model="creatname" clearable size="mini" placeholder="24个字符以内" oninput="value=value.replace(/\s+/g,'')" />
            </li>
          </ul><br>
          <ul>
            <li>
              <span>套装期间：</span>
              <el-date-picker
                v-model="creattime"
                unlink-panels
                size="mini"
                type="daterange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
              />
            </li>
          </ul><br><br>
          <ul>
            <li>
              <span>套装类型：</span>
              <el-radio-group v-model="radio">
                <el-radio :label="2">折扣比率</el-radio>
                <el-radio :label="3">折扣金额</el-radio>
                <el-radio :label="1">套装特价</el-radio>
              </el-radio-group>
            </li>
          </ul><br><br>
          <ul v-if="radio===2">
            <li>
              <span>购买</span>
              <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
              <span>个商品</span>
              <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" /><span>%</span>
            </li>
          </ul>
          <ul v-if="radio===2" style="margin-top:10px">
            <li>
              <span style="color:red">*折扣比率 = 总结算价 - {{ creatdiscount }}%</span>
            </li>
          </ul>
          <ul v-if="radio===3">
            <li>
              <span>购买</span>
              <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
              <span>个商品</span>
              <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" /><span>{{ currency }}</span>
            </li>
          </ul>
          <ul v-if="radio===3" style="margin-top:10px">
            <li>
              <span style="color:red">*折扣比率 = 总结算价 - {{ currency }}{{ creatdiscount }}%</span>
            </li>
          </ul>
          <ul v-if="radio===1">
            <li>
              <span>购买</span>
              <el-input v-model="creatnum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
              <span>个商品</span>
              <el-input v-model="creatdiscount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" /><span>{{ currency }}</span>
            </li>
          </ul>
          <ul v-if="radio===1" style="margin-top:10px">
            <li>
              <span style="color:red">套装特价 {{ currency }}{{ creatdiscount }}</span>
            </li>
          </ul><br>
          <ul>
            <li>
              <span>购买限制：买家最多可以购买此套装优惠</span>
              <el-input v-model="creatcount" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
              <span>次</span>
            </li>
          </ul><br><br>
          <ul>
            <li>
              <el-button type="primary" style="margin-left:130px" :disabled="Loading1" size="mini" @click="savecreat">保存</el-button>
              <el-button type="primary" :disabled="Loading1" size="mini" @click="cancecreat">取消</el-button>
            </li>
          </ul>
        </el-row>
      </el-dialog>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      Loading1: false,
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      eidtVisible: false,
      showlog: false,
      showexpiredactivities: false,
      creatactivity: false,
      creatactivity1: false,
      radio: 2,
      creatnum: 2,
      creatdiscount: 1,
      creatcount: 1,
      indexs: 1,
      creatname: '',
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData2: [], // 过滤过期活动列表
      tableData1: [],
      errmall: [],
      creattime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date().getTime()],
      status: 1,
      currency: '฿',
      total: 0,
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000,
      end_time: Math.round(new Date() / 1000),
      statuslist: [
        { label: '进行中', value: 3 },
        { label: '即将到来', value: 2 },
        { label: '已到期', value: 4 }
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
    showexpiredactivities(val, oldVal) {
      if (val === true) {
        this.tableData = this.tableData2
      } else {
        this.tableData = this.tableData1
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
        this.indexs = 1
        this.Loading1 = true
        this.Loading3 = true
        let indexs1 = 1
        this.tableData = []
        this.tableData1 = []
        this.tableData2 = []
        this.exportdata = []
        this.errmall = []
        for (let i = 0; i < this.mall.length; i++) {
          const params = {
            // group: this.group,
            mallId: this.mall[i],
            status: this.status,
            limit:	10,
            offset:	0
          }
          console.log('this is my parmas', params)
          const attributeTreeJson = await this.$shopeemanService.getdiscount(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let attributeTreeRes
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
          console.log('this is data', attributeTreeRes)
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
          }
          if (attributeTreeRes.status === 200) {
            if (attributeTreeRes.data.data.bundle_deal_list) {
              for (let j = 0; j < attributeTreeRes.data.data.bundle_deal_list.length; j++) {
                let sign = 1
                if (attributeTreeRes.data.data.bundle_deal_list[j].end_time > Math.round(new Date() / 1000)) {
                  sign = 2
                }
                const data = {}
                data['index'] = this.indexs
                this.indexs++
                data['name'] = attributeTreeRes.data.data.bundle_deal_list[j].name
                data['status'] = attributeTreeRes.data.data.bundle_deal_list[j].status
                data['num'] = attributeTreeRes.data.data.bundle_deal_list[j].extinfo_images.item_total_count
                data['time'] = `${this.$dayjs(attributeTreeRes.data.data.bundle_deal_list[j].start_time * 1000).format('YYYY-MM-DD HH:mm:ss')}至${this.$dayjs(attributeTreeRes.data.data.bundle_deal_list[j].end_time * 1000).format('YYYY-MM-DD HH:mm:ss')}`
                data['mallname'] = mallname
                data['sign'] = sign
                if (sign === 2) {
                  data['index'] = indexs1
                  indexs1++
                  this.tableData2.push(data)
                }
                this.tableData1.push(data)
                if (this.showexpiredactivities === true) {
                  this.tableData = this.tableData2
                } else {
                  this.tableData = this.tableData1
                }
              }
            }
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
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 创建套装促销活动
    creat() {
      this.creatactivity = true
    },
    // 保存创建活动
    async savecreat() {
      if (this.mall.length < 1) {
        this.$message.warning('请选择店铺！')
      }
      let params
      if (this.radio === 1) {
        params = {
          mallId: this.mall,
          name: this.creatname,
          rule_type: this.radio,
          min_amount: this.creatnum,
          start_time: Math.floor(this.creattime[0] / 1000),
          end_time: Math.floor(this.creattime[1] / 1000),
          usage_limit: this.creatcount,
          fix_price: this.creatdiscount,
          discount_value: 0,
          discount_percentage: 0
        }
      } else if (this.radio === 2) {
        params = {
          mallId: this.mall,
          name: this.creatname,
          rule_type: this.radio,
          min_amount: this.creatnum,
          start_time: Math.floor(this.creattime[0] / 1000),
          end_time: Math.floor(this.creattime[1] / 1000),
          usage_limit: this.creatcount,
          fix_price: 0,
          discount_value: 0,
          discount_percentage: this.creatdiscount
        }
      } else {
        params = {
          mallId: this.mall,
          name: this.creatname,
          rule_type: this.radio,
          min_amount: this.creatnum,
          start_time: Math.floor(this.creattime[0] / 1000),
          end_time: Math.floor(this.creattime[1] / 1000),
          usage_limit: this.creatcount,
          fix_price: 0,
          discount_value: this.creatdiscount,
          discount_percentage: 0
        }
      }
      console.log('this is parmas', params)
      const attributeTreeJson = await this.$shopeemanService.creatdiscount(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
      let attributeTreeRes
      if (attributeTreeJson) {
        attributeTreeRes = JSON.parse(attributeTreeJson)
      }
      attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
      console.log('this is data', attributeTreeRes)
    },
    // 取消创建活动
    cancecreat() {
      this.creatactivity = false
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screeningcopy.less';
</style>
