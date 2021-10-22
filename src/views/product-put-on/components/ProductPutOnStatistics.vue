<!--
 * @Author: your name
 * @Date: 2021-10-21 09:38:11
 * @LastEditTime: 2021-10-21 11:15:35
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\product-put-on\components\ProductPutOnCategoryblack.vue
-->
<template>
  <div class="putOn-statistics">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose :is-all="true" @changeMallList="changeMallList"></storeChoose>
      </div>
      <div class="tool-row">
          <div class="tool-item mar-right">
          <span>查询时间：</span>
          <el-date-picker
            v-model="statisticsTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          >
          </el-date-picker>
        </div>
        <el-button type="primary" size="mini" @click="searchTableList" class="mar-right">查 询</el-button>
        <el-button type="primary" size="mini" @click="exportData" class="mar-right">导 出</el-button>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="650" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="站点" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="店铺" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="店铺分组" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="上架总量" prop="warehouse_name" align="center" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[10, 20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
export default {
  components: {
    storeChoose,
  },
  data() {
    return {
       pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      statisticsTime:[],
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
    }
  },
  methods: {
    //导出数据
    exportData(){

    },
    //查询
    async searchTableList() {},
  
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
  },
}
</script>

<style lang="less" scoped>
.putOn-statistics {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.tool-bar {
  height: 100px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>