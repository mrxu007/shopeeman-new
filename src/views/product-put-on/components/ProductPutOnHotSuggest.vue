<template>
  <div class="contaniner">
    <div class="operation">
      <div class="o-item">
        <category-choose :is-all="false" :level="3" @setCategory="setCategory" />
      </div>
      <div class="o-item">
        <span>排序：</span>
        <el-select v-model="form.sort" size="mini" filterable>
          <el-option v-for="(item, index) in sortList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="o-item" style="margin-left:10px">
        <el-button type="primary" size="mini" @click="getAvgPrice">搜索</el-button>
      </div>
    </div>
    <div class="table-content">
      <el-table
        v-loading="isloading"
        :data="tableData"
        :border="false"
        height="calc(100vh - 135px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column type="index" align="center" label="序号" min-width="50" fixed>
          <template slot-scope="scope">
            {{ scope.$index + 1 }}
          </template>
        </el-table-column>
        <el-table-column prop="platform_id" align="center" show-overflow-tooltip label="站点" min-width="80" fixed />
        <el-table-column prop="date" align="center" show-overflow-tooltip label="日期" min-width="90" />
        <el-table-column prop="category1" align="center" show-overflow-tooltip label="一级类目" min-width="150" />
        <el-table-column prop="category2" align="center" show-overflow-tooltip label="二级类目" min-width="150" />
        <el-table-column prop="category3" align="center" show-overflow-tooltip label="三级类目" min-width="150" />
        <el-table-column prop="goods_price_avg" align="center" show-overflow-tooltip label="商品平均价" min-width="90" />
        <el-table-column prop="goods_count_rise_day" align="center" show-overflow-tooltip label="商品日增长数" min-width="110" />
        <el-table-column prop="sales_rate_day" align="center" show-overflow-tooltip label="动销率(日)" min-width="90" />
        <el-table-column prop="goods_count" align="center" show-overflow-tooltip label="商品总数(日)" min-width="110" />
        <el-table-column prop="has_sales_goods_count_day" align="center" show-overflow-tooltip label="有销量的商品数(日)" min-width="150" fixed="right" />
      </el-table>
    </div>
  </div>
</template>

<script>
import CategoryChoose from '../../../components/category-choose.vue'
export default {
  components: {
    CategoryChoose
  },
  data() {
    return {
      isloading: false,
      form: {
        site: '4', // 站点
        sort: 'date', // 排序
        cat_id_1: '', // 类目一
        cat_id_2: '', // 类目二
        cat_id_3: '' // 类目三
      },
      sortList: [
        { value: 'date', label: '日期' },
        { value: 'goods_price_avg', label: '商品平均价' },
        { value: 'goods_count_rise_day', label: '商品日增长数' },
        { value: 'sales_rate_day', label: '动销率(日)' },
        { value: 'goods_count', label: '商品总数(日)' },
        { value: 'has_sales_goods_count_day', label: '有销量的商品数(日)' }
      ],
      siteObj: {
        'SG': '1',
        'ID': '2',
        'TW': '3',
        'TH': '4',
        'VN': '6',
        'MY': '5',
        'PH': '7',
        'BR': '8',
        'MX': '9'
      },
      platformId: {
        '1': '新加坡',
        '2': '印尼',
        '3': '台湾',
        '4': '泰国',
        '5': '马来',
        '6': '越南',
        '7': '菲律宾',
        '8': '巴西',
        '9': '墨西哥',
        '10': '哥伦比亚',
        '11': '智利',
        '12': '波兰'
      },
      tableData: [] // 表格数据
    }
  },
  mounted() {
    this.getAvgPrice()
  },
  methods: {
    async setCategory(val) {
      this.form.site = this.siteObj[val.country]
      this.form.cat_id_1 = val.categoryFirst
      this.form.cat_id_2 = val.categorySecond
      this.form.cat_id_3 = val.categoryThird
      console.log('setCategory', val)
    },
    // 获取数据列表
    async getAvgPrice() {
      this.isloading = true
      const parmas = {
        platform_id: this.form.site,
        order_by: this.form.sort,
        cat_id_1: this.form.cat_id_1,
        cat_id_2: this.form.cat_id_2,
        cat_id_3: this.form.cat_id_3
      }
      try {
        const res = await this.$commodityService.getAvgPrice(parmas)
        const jsonData = JSON.parse(res)
        if (jsonData.msg === 'success') {
          this.tableData = jsonData.data
          this.tableData.map(item => {
            item.platform_id = this.platformId[item.platform_id]
            const categoryEn = item.display_path.split('>')
            const categoryCn = item.display_path_cn.split('>')
            item.category1 = categoryEn[0] ? categoryEn[0] + '(' + categoryCn[0] + ')' : ''
            item.category2 = categoryEn[1] ? categoryEn[1] + '(' + categoryCn[1] + ')' : ''
            item.category3 = categoryEn[2] ? categoryEn[2] + '(' + categoryCn[2] + ')' : ''
          })
          console.log('tableData', jsonData)
          this.isloading = false
        } else {
          this.$message.error(`获取数据失败:${jsonData.status_code}`)
          this.isloading = false
        }
      } catch (err) {
        this.tableData = []
        console.log(err)
        this.isloading = false
      }
    }
  }
}
</script>

<style lang="less">
@import '../../../module-less/product-put-less/hot-suggest.less';

.contaniner{
   min-width: 1200px;
  .operation{
    display: flex;
    flex-wrap: wrap;
    height: 40px;
    .o-item{
      margin-right: 0px;
    }
  }
}
</style>
