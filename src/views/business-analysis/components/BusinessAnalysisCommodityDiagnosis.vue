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
          <span>类型：</span>
          <el-select v-model="type" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in typelist" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>资料期间：</span>
          <el-date-picker
            v-model="time"
            style="height:20px"
            type="date"
            placeholder="选择日期"
          /></li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
        </li>
        <li><el-checkbox
          v-model="showlog"
        >隐藏日志</el-checkbox></li>
      </ul><br>
      <div class="logging">
        <Logs ref="Logs" v-model="showlog" clear />
      </div>
      <span v-if="type===10000" style="color:red">类型定义：与之前7天相比，这些产品的销售额在过去7天内下降了30%或更多的产品</span>
      <span v-if="type===10002" style="color:red">类型定义:在过去7天内收到过两星及以下评价的产品</span>
      <span v-if="type===10003" style="color:red">类型定义:在过去45天内有2单及以上的订单申请退货或者退货率在10%及以上的产品</span>
      <span v-if="type===10004" style="color:red">类型定义:在过去15天内有10单及以上的订单逾期发货或者逾期发货率在5%及以上的产品</span>
      <span v-if="type===10006" style="color:red">类型定义:在过去7天中，商品转化率(浏览-确定)低于相同二级分类商品中位数。商品转化率(浏览-确定)=已确定订单的买家数除以访客总数</span>
      <span v-if="type===10007" style="color:red">类型定义:和上一个7天相比，商品浏览量在过去7天中下降了50%以上</span>
      <span v-if="type===10008" style="color:red">类型定义:由于卖家取消或是商品未成功出货，在过去7天内造成订单取消数量高于2或订单取消率高于5%</span>
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
        <el-table-column align="center" label="序列号" width="60" prop="index" />
        <el-table-column align="center" label="店铺名称" width="180" prop="mallname" />
        <el-table-column v-if="false" align="center" label="店铺id" width="180" prop="mallid" />
        <el-table-column align="center" prop="type" label="类型" width="180" />
        <el-table-column align="center" prop="productid" label="商品ID" width="180" />
        <el-table-column prop="img" label="商品图片" width="200" align="center">
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.img"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <img
                  :src="row.img"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.img"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="商品标题" width="400" align="center" />
        <el-table-column v-if="type===10000" prop="d2" :label="`销售额(${time1}-${time2})`" width="180" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10000" prop="d3" :label="`销售额(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10002" prop="d2" :label="`总评论(${time2}-${time3})`" width="180" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10002" prop="d3" :label="`差评(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10003" prop="d2" :label="`退货申请(${time2}-${time3})`" width="180" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10003" prop="d3" :label="`退货率(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10004" prop="d3" :label="`高逾期出货率(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10004" prop="d2" :label="`逾期出货订单数(${time2}-${time3})`" width="200" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10008" prop="d3" :label="`订单取消率(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10008" prop="d2" :label="`已取消的订单数(${time2}-${time3})`" width="220" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10006" prop="d3" :label="`转化率(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column v-if="type===10006" prop="d2" :label="`访客数(${time2}-${time3})`" width="180" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10007" prop="d2" :label="`逾期出货订单数(${time1}-${time2})`" width="200" align="center" /><!--  跟着类型走 -->
        <el-table-column v-if="type===10007" prop="d3" :label="`逾期出货率(${time2}-${time3})`" width="180" align="center" /> <!-- 跟着类型走 -->
        <el-table-column prop="pcnew_followers" label="操作" width="130" align="center">
          <template slot-scope="{ row }">
            <el-button type="primary" size="mini" @click="viewDetails(row)">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
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
      showlog: false,
      exportdata: [], // 导出数据
      type: 10000,
      indexs: 1,
      typelist: [
        { value: 10000, label: '销售额下降' },
        { value: 10002, label: '差评' },
        { value: 10003, label: '高退货率' },
        { value: 10004, label: '高逾期出货率' },
        { value: 10006, label: '低转化率' },
        { value: 10007, label: '低浏览量' },
        { value: 10008, label: '高卖家取消率' }
      ],
      time: new Date().getTime(),
      time1: new Date().getTime() - 3600 * 1000 * 24 * 14,
      time2: new Date().getTime() - 3600 * 1000 * 24 * 7,
      time3: new Date().getTime(),
      allgroupid: [],
      errmall: [],
      allmallid: [],
      tableData: [],
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
    site(val, oldVal) {
      this.mall = []
      this.group = []
      this.getInfo()
    },
    type(val, oldVal) {
      this.getallinfo()
    }
  },
  mounted() {
    this.getInfo()
    this.time1 = this.$dayjs(this.time1).format('MM/DD')
    this.time2 = this.$dayjs(this.time2).format('MM/DD')
    this.time3 = this.$dayjs(this.time3).format('MM/DD')
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
        this.errmall = []
        let currency = ''
        this.indexs = 1
        if (this.site === 'MY') {
          currency = 'RM'
        }
        if (this.site === 'TW') {
          currency = '$'
        }
        if (this.site === 'VN') {
          currency = '₫'
        }
        if (this.site === 'ID') {
          currency = 'Rp'
        }
        if (this.site === 'PH') {
          currency = '₱'
        }
        if (this.site === 'TH') {
          currency = '฿'
        }
        if (this.site === 'SG') {
          currency = '$'
        }
        if (this.site === 'BR') {
          currency = 'R$'
        }
        if (this.site === 'MX') {
          currency = 'MX$'
        }
        if (this.site === 'CO') {
          currency = '$'
        }
        if (this.site === 'CL') {
          currency = '$'
        }
        if (this.site === 'PL') {
          currency = 'zł'
        }
        const timenow = this.$dayjs(this.time).format('YYYYMMDD')
        for (let i = 0; i < this.mall.length; i++) {
          const params = {
            metric_id: this.type,
            // group: this.group,
            mallId: this.mall[i],
            dt: timenow,
            country: this.site,
            shopid: this.mall[i],
            page_num: 1,
            page_size: 20
          }
          let mallname
          for (let j = 0; j < this.mallList.length; j++) {
            if (this.mallList[j].value === this.mall[i]) {
              mallname = this.mallList[j].label
            }
          }
          let type
          for (let k = 0; k < this.typelist.length; k++) {
            if (this.typelist[k].value === this.type) {
              type = this.typelist[k].label
            }
          }
          console.log('this is my parmas', params)
          const attributeTreeJson = await this.$shopeemanService.getdiagnosis(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
          let attributeTreeRes
          if (attributeTreeJson) {
            attributeTreeRes = JSON.parse(attributeTreeJson)
          }
          if (attributeTreeRes.status === 200) {
            this.$refs.Logs.writeLog(`【${mallname}】 查询 【${type}】 数据 成功`, true)
            attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
            console.log('ces', attributeTreeRes.data.data.list)
            if (this.type === 10000 && attributeTreeRes.data.data.list) { // 销售额
              for (let j = 0; j < attributeTreeRes.data.data.list.length; j++) {
                const data = {}
                data['index'] = this.indexs
                this.indexs++
                data['mallname'] = mallname
                data['mallid'] = this.mall[i]
                data['type'] = type
                data['productid'] = attributeTreeRes.data.data.list[j].itemid
                data['img'] = attributeTreeRes.data.data.list[j].image
                data['title'] = attributeTreeRes.data.data.list[j].title
                data['d2'] = `${currency}${attributeTreeRes.data.data.list[j].d1}`
                data['d3'] = `${currency}${attributeTreeRes.data.data.list[j].d2} ${attributeTreeRes.data.data.list[j].d3}%`
                this.tableData.push(data)
              }
            } else if (this.type === 10002 && attributeTreeRes.data.data.list) { // 差评
              for (let j = 0; j < attributeTreeRes.data.data.list.length; j++) {
                const data = {}
                data['index'] = this.indexs
                this.indexs++
                data['mallname'] = mallname
                data['mallid'] = this.mall[i]
                data['type'] = type
                data['productid'] = attributeTreeRes.data.data.list[j].itemid
                data['img'] = attributeTreeRes.data.data.list[j].image
                data['title'] = attributeTreeRes.data.data.list[j].title
                data['d2'] = attributeTreeRes.data.data.list[j].d1
                data['d3'] = attributeTreeRes.data.data.list[j].d2
                this.tableData.push(data)
              }
            } else if (this.type === 10008 || this.type === 10006 && attributeTreeRes.data.data.list) { // 高卖家取消率和滴转化率
              for (let j = 0; j < attributeTreeRes.data.data.list.length; j++) {
                const data = {}
                data['index'] = this.indexs
                this.indexs++
                data['mallname'] = mallname
                data['mallid'] = this.mall[i]
                data['type'] = type
                data['productid'] = attributeTreeRes.data.data.list[j].itemid
                data['img'] = attributeTreeRes.data.data.list[j].image
                data['title'] = attributeTreeRes.data.data.list[j].title
                data['d2'] = attributeTreeRes.data.data.list[j].d1
                data['d3'] = attributeTreeRes.data.data.list[j].d3 + '%'
                this.tableData.push(data)
              }
            } else if ((this.type === 10007 && attributeTreeRes.data.data.list)) {
              for (let j = 0; j < attributeTreeRes.data.data.list.length; j++) {
                const data = {}
                data['index'] = this.indexs
                this.indexs++
                data['mallname'] = mallname
                data['mallid'] = this.mall[i]
                data['type'] = type
                data['productid'] = attributeTreeRes.data.data.list[j].itemid
                data['img'] = attributeTreeRes.data.data.list[j].image
                data['title'] = attributeTreeRes.data.data.list[j].title
                data['d2'] = `${attributeTreeRes.data.data.list[j].d1}`
                data['d3'] = `${attributeTreeRes.data.data.list[j].d2} ${attributeTreeRes.data.data.list[j].d3}%`
                this.tableData.push(data)
              }
            } else {
              if (attributeTreeRes.data.data.list) {
                for (let j = 0; j < attributeTreeRes.data.data.list.length; j++) {
                  const data = {}
                  data['index'] = this.indexs
                  this.indexs++
                  data['mallname'] = mallname
                  data['mallid'] = this.mall[i]
                  data['type'] = type
                  data['productid'] = attributeTreeRes.data.data.list[j].itemid
                  data['img'] = attributeTreeRes.data.data.list[j].image
                  data['title'] = attributeTreeRes.data.data.list[j].title
                  data['d2'] = attributeTreeRes.data.data.list[j].d2
                  data['d3'] = attributeTreeRes.data.data.list[j].d3 + '%'
                  this.tableData.push(data)
                }
              }
            }
          } else {
            this.$refs.Logs.writeLog(`【${mallname}】 查询 【${type}】 数据 异常：店铺未登录`, false)
            this.errmall.push(mallname)
          }
        }
        if (this.errmall.length > 0) {
          this.$message.error(`店铺【${this.errmall}】未登录`)
        }
        this.Loading1 = false
        this.Loading3 = false
      } else {
        this.$message({
          message: '请先选择店铺',
          type: 'warning'
        })
      }
    },
    // 打开详情页面
    viewDetails(row) {
      const reqStr = {
        type: 'itemDetail',
        shopId: row.mallid,
        id: row.productid
      }
      this.$BaseUtilService.getOrderDetailInfo(row.mallid, JSON.stringify(reqStr))
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
