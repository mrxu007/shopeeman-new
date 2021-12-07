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
          <span>订单类型：</span>
          <el-select v-model="Status" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
        </li>
      </ul><br>
      <div style="border:1px solid black;width:940px;float: left;">
        <span style="margin-left:20px">客服数据</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px;width:1000px"
          header-align="center"
          height="calc(100vh - 540px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="店铺名称" width="160" prop="product_id" sortable />
          <el-table-column align="center" prop="wid" label="买家总数" width="155" sortable />
          <el-table-column align="center" prop="oversea_order_sn" label="新买家数量" width="155" sortable />
          <el-table-column prop="reissue_order_sn" label="现有买家" width="155" align="center" sortable />
          <el-table-column prop="logistic_no" label="潜在买家" width="155" align="center" sortable />
          <el-table-column prop="logistic_type" label="重复购买率" width="150" align="center" sortable />
        </el-table>
      </div>
      <div style="border:1px solid black;width:745px;float: right;">
        <span style="margin-left:20px">指标数据</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px;width:1200px"
          header-align="center"
          height="calc(100vh - 540px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="店铺名称" width="140" prop="product_id" sortable />
          <el-table-column align="center" prop="wid" label="销售量" width="145" sortable />
          <el-table-column align="center" prop="oversea_order_sn" label="订单总数" width="145" sortable />
          <el-table-column prop="reissue_order_sn" label="访客转换率" width="145" align="center" sortable />
          <el-table-column prop="logistic_no" label="各订单销售额" width="145" align="center" sortable />
          <el-table-column prop="logistic_type" label="访客" width="145" align="center" sortable />
          <el-table-column prop="logistic_type" label="页面浏览量" width="145" align="center" sortable />
        </el-table>
      </div>
      <div style="border:1px solid black;width:100%;margin-top:390px">
        <span style="margin-left:20px">排行数据</span>
        <el-table
          ref="plTable"
          v-loading="Loading3"
          style="margin-top:10px"
          header-align="center"
          height="calc(100vh - 520px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" label="店铺名称" width="140" prop="product_id" sortable />
          <el-table-column align="center" prop="wid" label="按商品销量排行" width="355" sortable />
          <el-table-column align="center" prop="oversea_order_sn" label="按下单数排行" width="355" sortable />
          <el-table-column prop="reissue_order_sn" label="按页面访客量排行" width="355" align="center" sortable />
          <el-table-column prop="logistic_no" label="按转换率排行" width="355" align="center" sortable />
          <el-table-column prop="logistic_type" label="按类目销量排行" width="355" align="center" sortable />
        </el-table>
      </div>
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
      allgroupid: [],
      allmallid: [],
      tableData: [],
      Status: 1,
      total: 0,
      Statisticaltime: 1,
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      returnStatisticaltime: [
        { value: 1, label: '实时' },
        { value: 2, label: '昨日' },
        { value: 3, label: '近7天' },
        { value: 4, label: '近30天' }
      ],
      returnStatusList: [
        { value: 1, label: '下单' },
        { value: 2, label: '确认订单' },
        { value: 3, label: '付费订单' }
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
    }
  },
  mounted() {
    this.getInfo()
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
      console.log('1111111111111111111111', res.data)
      if (res.data.code === 200) {
        res.data.data.forEach(el => {
          if (el.group_id) {
            this.gruopList.push({ label: el.group_name, value: el.group_id })
            this.allgroupid.push(el.group_id)
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
        for (let i = 0; i < this.mallList.length; i++) {
          this.allmallid.push(this.mallList[i].value)
        }
      } else {
        this.$message.warning('店铺列表获取失败！')
      }
    },
    getallinfo() {
      const params = {
        group: this.group,
        mall: this.mall
      }
      console.log(params.group, params.mall)
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
