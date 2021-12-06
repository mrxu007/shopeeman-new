<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul>
        <li />
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 160px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
  </el-row>
</template>

<script>
import GoodsList from '../../../module-api/goods-manager-api/goods-list'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      isShowLoading: false,
      GoodsList: new GoodsList(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [] // 表格数据
    }
  },
  async mounted() {

  },
  methods: {
    // 打开商品链接
    openUrl(row) {
      window.open(row)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      // this.getStock()
    },
    handleCurrentChange(val) {
      this.page = val
      // this.getStock()
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/goods-manager-less/goods-list.less';
</style>
