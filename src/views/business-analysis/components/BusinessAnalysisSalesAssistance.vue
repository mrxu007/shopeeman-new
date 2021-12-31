<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <storeChoose :span-width="'80px'" :source="'true'" @changeMallList="changeMallList"/>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getallinfo">搜索</el-button>
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
        <el-table-column align="center" label="店铺名称" width="160" prop="mallname" />
        <el-table-column prop="total_item" label="商品总数" width="180" align="center" />
        <el-table-column prop="abnormal_item" label="待改善商品数" width="180" align="center" />
        <el-table-column prop="normal_item" label="优质商品数" width="180" align="center" />
        <el-table-column prop="titlecount" label="偏短的商品名称数" width="180" align="center" />
        <el-table-column prop="categorycount" label="错误分类数" width="200" align="center" />
        <el-table-column prop="descriptioncount" label="偏短的描述商品数" width="200" align="center" />
        <el-table-column prop="imagecount" label="图片太少商品数" width="200" align="center" />
        <el-table-column prop="shippingcount" label="缺失包裹详情商品数" width="200" align="center" />
      </el-table>
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
      Loading3: false,
      selectall: true, // 分组全选和取消全选选项控制
      selectall1: true, // 店铺全选和取消全选选项控制
      eidtVisible: false,
      allgroupid: [],
      allmallid: [],
      tableData: [],
      tableData1: [],
      errmall: [],
      currency: '฿',
      total: 0,
      site: 'TH', // 站点
      siteList: this.$filters.countries_option, // 所有站点
      group: 0, // 分组
      gruopList: [],
      mall: [], // 店铺
      mallList: [],
      start_time: Date.parse(this.$dayjs(new Date()).format('YYYY-MM-DD 00:00:00')) / 1000,
      end_time: Math.round(new Date() / 1000)
    }
  },
  components: {
    storeChoose
  },
  mounted() {
    // const timenow = new Date().getTime()
    // const returnCreateStartTime = this.$dayjs(timenow).format('hh:00')
    // const changea = returnCreateStartTime.split(':')
    // changea[0] = Number(changea[0]) - 1
    // const onehoureago = `${changea[0]}:${changea[1]}`
    // console.log(onehoureago)
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
        const params = {
          mallId: item.platform_mall_id
        }
        console.log('this is my parmas', params)
        const attributeTreeJson = await this.$shopeemanService.getsalesassistance(this.site, params, { headers: { 'Content-Type': 'application/json; charset=utf-8' }})
        let attributeTreeRes
        if (attributeTreeJson) {
          attributeTreeRes = JSON.parse(attributeTreeJson)
        }
        attributeTreeRes.data = JSON.parse(attributeTreeRes.data)
        console.log('this is data', attributeTreeRes)
        if (attributeTreeRes.status === 200) {
          const data = {}
          data['total_item'] = attributeTreeRes.data.result.summary.total_item
          data['abnormal_item'] = attributeTreeRes.data.result.summary.abnormal_item
          data['normal_item'] = attributeTreeRes.data.result.summary.normal_item
          data['titlecount'] = attributeTreeRes.data.result.data.title.count
          data['categorycount'] = attributeTreeRes.data.result.data.category.count
          data['descriptioncount'] = attributeTreeRes.data.result.data.description.count
          data['imagecount'] = attributeTreeRes.data.result.data.image.count
          data['shippingcount'] = attributeTreeRes.data.result.data.shipping.count
          data['mallname'] = mallname
          this.tableData.push(data)
        } else if (attributeTreeRes.status === 403) {
          this.errmall.push(mallname)
        }
      } catch (e) {
        console.log(e)
      } finally {
        --count.count
      }
    },
    async getallinfo() {
      if (this.mall.length > 0) {
        this.Loading1 = true
        this.Loading3 = true
        this.tableData = []
        this.exportdata = []
        this.errmall = []
        await batchOperation(this.mall, this.getTableData)
        this.Loading1 = false
        this.Loading3 = false
      } else {
        this.$message.warning('请选择店铺！')
      }
    }
  }
}
</script>
<!-- 引入less -->
<style lang="less" scoped>
@import '../../../module-less/business-analysis-less/data-screening.less';
</style>
