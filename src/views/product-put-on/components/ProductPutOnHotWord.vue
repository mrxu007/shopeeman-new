<template>
  <div class="product-put-on-hot-word">
    <div class="category-choose-box">
      <category-choose :level="2" @setCategory="setCategory" />
      <el-button size="mini" type="primary" @click="getKeyWord">查询</el-button>
      <el-button size="mini" @click="exportData">导出</el-button>
    </div>
    <div class="content">
      <el-table ref="multipleTable" v-loading="tableLoading" :row-style="{ height: '80px' }" :data="tableData" tooltip-effect="dark" :height="'calc(100vh - 80px)'">
        <el-table-column align="center" type="index" label="序号" min-width="50" fixed>
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="80px" label="站点" prop="country" align="center" fixed>
          <template slot-scope="scope">{{ scope.row.platform_id | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="150px" label="一级类目" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.display_path.split('>')[0] }}({{ scope.row.display_path_cn.split('>')[0] }})</template>
        </el-table-column>
        <el-table-column min-width="150px" label="二级类目" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.display_path.split('>')[1] &&
            (scope.row.display_path.split('>')[1]+'('+scope.row.display_path_cn.split('>')[1]+')') || '' }}</template>
        </el-table-column>
        <el-table-column min-width="150px" label="热搜词分类类目" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.hotKeywords[0]&&scope.row.hotKeywords[0].keyword_name }}</template>
        </el-table-column>
        <el-table-column min-width="100px" label="热搜词名称" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.hotKeywords[0]&&scope.row.hotKeywords[0].keyword_name || '' }}</template>
        </el-table-column>
        <el-table-column min-width="100px" label="产品数" prop="" align="center">
          <template slot-scope="scope">{{ scope.row.hotKeywords[0]&&scope.row.hotKeywords[0].total_count || '' }}</template>
        </el-table-column>
        <el-table-column min-width="100px" label="更新时间" prop="created_at" align="center">
          <template slot-scope="scope">{{ $dayjs(scope.row.update_time*1000).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column min-width="100px" label="近30天销量" prop="warehouse_name" align="center" fixed="right">
          <template slot-scope="scope">{{ scope.row.hotKeywords[0]&&scope.row.hotKeywords[0].keyword_month_sales || '' }}</template>
        </el-table-column>
      </el-table>
      <!--      <div class="pagination">-->
      <!--        <el-pagination-->
      <!--            background-->
      <!--            :page-sizes="[10, 20, 50, 100]"-->
      <!--            :page-size="pageSize"-->
      <!--            layout="total, sizes, prev, pager, next, jumper"-->
      <!--            :total="total"-->
      <!--            @current-change="handleCurrentChange"-->
      <!--            @size-change="handleSizeChange"-->
      <!--        />-->
      <!--      </div>-->
    </div>
  </div>
</template>

<script>
import CategoryChoose from '../../../components/category-choose.vue'
import { exportExcelDataCommon, dateFormat } from '../../../util/util'

export default {
  components: {
    CategoryChoose
  },
  data() {
    return {
      tableData: [],
      country: '',
      platformId: '4',
      categoryFirst: '',
      categorySecond: '',
      tableLoading: false,
      currentPage: 1,
      total: 0,
      pageSize: 20
    }
  },
  mounted() {
    this.getKeyWord()
  },
  methods: {
    setCategory(select) {
      this.country = select.country
      this.platformId = select.platformId
      this.categoryFirst = select.categoryFirst
      this.categorySecond = select.categorySecond
    },
    async getKeyWord() {
      const params = {
        platform_id: this.platformId,
        cat_id_1: this.categoryFirst,
        cat_id_2: this.categorySecond
      }
      this.tableLoading = true
      const resJson = await this.$commodityService.getKeyWord(params)
      try {
        const res = JSON.parse(resJson)
        this.tableData = res.data
        console.log(res)
        this.total = res.data.length
      } catch (e) {
        this.$message.error('热搜词列表请求失败')
      } finally {
        this.tableLoading = false
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.searchTableList()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.searchTableList()
    },
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>一级类目</td>
              <td>二级类目</td>
              <td>热搜词分类类目</td>
              <td>热搜词名称</td>
              <td>产品数</td>
              <td>更新时间</td>
              <td>近30天销量</td>
            </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        const categoryFirst = item.display_path && item.display_path.split('>')[0] &&
            `${item.display_path.split('>')[0]}(${item.display_path_cn.split('>')[0]})` || ''
        const categorySecond = item.display_path && item.display_path.split('>')[1] &&
            `${item.display_path.split('>')[1]}(${item.display_path_cn.split('>')[1]})` || ''
        str += `<tr><td>${num++}</td>
                    <td>${this.$filters.chineseSite(item.platform_id) + '\t'}</td>
                    <td>${categoryFirst + '\t'}</td>
                    <td>${categorySecond + '\t'}</td>
                    <td>${categorySecond + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].keyword_name || '' + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].total_count || 0 + '\t'}</td>
                    <td>${dateFormat(item.update_time * 1000, 'yyyy-MM-dd') + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].keyword_month_sales || 0 + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('热搜词推荐', str)
    }
  }
}
</script>

<style lang="less" scoped>
  .product-put-on-hot-word {
    min-width: 1280px;
    margin: 10px;
    padding: 10px;
    background: #fff;

    .category-choose-box {
      margin-bottom: 10px;
      display: flex;
    }
  }
</style>
