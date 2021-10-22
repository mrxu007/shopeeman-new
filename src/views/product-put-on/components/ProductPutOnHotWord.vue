<template>
  <div class="product-put-on-hot-word">
    <div>
      <category-choose :isAll="true" :level="2" @setCategory="setCategory"></category-choose>
    </div>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="680" @selection-change="selectionChange">
        <el-table-column type="selection" width="55"> </el-table-column>
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column width="120px" label="站点" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="项目来源" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="一级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="二级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="末级类目" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="创建时间" prop="created_at" align="center" >
          <template slot-scope="scope">{{ $dayjs(scope.row.created_at).format('YYYY-MM-DD') }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="操作结果" prop="warehouse_name" align="center" />
        <el-table-column min-width="60px" label="操作" prop="warehouse_name" align="center" />
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
  import CategoryChoose from '../../../components/category-choose.vue'
  export default {
    components: {
      CategoryChoose,
    },
    data() {
      return {

      }
    },
    mounted() {

    },
    methods: {
      setCategory(val){
        this.selectCategory = val
        console.log('setCategory', val)
      }
    },
  }
</script>

<style lang="less" scoped>
  .product-put-on-hot-word{

  }
</style>
