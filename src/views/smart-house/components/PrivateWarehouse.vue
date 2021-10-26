<!--
 * @Author: your name
 * @Date: 2021-10-25 16:40:41
 * @LastEditTime: 2021-10-25 17:22:52
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\smart-house\components\PrivateWarehouse.vue
-->
<template>
  <div class="private-store">
    <!-- btn区 -->
    <div class="tool-bar">
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>查询时间：</span>
          <el-date-picker
            v-model="searchTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
            :default-time="['00:00:00', '23:59:59']"
          >
          </el-date-picker>
        </div>
        <div class="tool-item mar-right">
          <span>商品ID：</span>
          <el-input v-model="goodsID" placeholder="" size="mini" clearable></el-input>
        </div>
        <div class="tool-item mar-right">
          <span>站点：</span>
          <el-select v-model="countryVal" size="mini" filterable>
            <el-option  label="全部" :value="''" />
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <el-button type="primary" size="mini" @click="searchTableList" class="mar-right">查 询</el-button>
        <el-button type="primary" size="mini" @click="" class="mar-right">新增商品</el-button>
      </div>
    </div>
     <!-- 表格区 -->
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="650" >
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
         <el-table-column width="120px" label="商品ID" prop="country" align="center">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="商品名称" prop="warehouse_name" align="center" >
            <template slot-scope="scope">{{ scope.row.platform_mall_name }}</template>
        </el-table-column>
        <el-table-column min-width="60px" label="商品链接" prop="group_name" align="center" />
        <el-table-column min-width="60px" label="商品图片" prop="upCount" align="center" />
        <el-table-column min-width="60px" label="库存" prop="upCount" align="center" />
        <el-table-column min-width="60px" label="SKU ID" prop="upCount" align="center" />
        <el-table-column min-width="60px" label="SKU名称" prop="upCount" align="center" />
        <el-table-column min-width="60px" label="价格" prop="upCount" align="center" />
        <el-table-column min-width="60px" label="创建时间" prop="upCount" align="center" />
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
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      goodsID: '',
      countryVal: '',
      searchTime: [],
      countries: [
        { label: '泰国站', value: 'TH' },
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' },
        { label: '墨西哥站', value: 'MX' },
        { label: '哥伦比亚站', value: 'CO' },
        { label: '智利站', value: 'CL' },
        { label: '波兰站', value: 'PL' },
      ],
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
      tableData:[],
      tableLoading:false
    }
  },
  mounted() {
    let end = new Date().getTime()
    let start = end - 30 * 24 * 60 * 60 * 1000
    this.searchTime = [this.$dayjs(start).format('YYYY-MM-DD'), this.$dayjs(end).format('YYYY-MM-DD')]
  },
  methods: {
      async searchTableList(){

      },
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
.private-store {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.tool-bar {
  height: 60px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
      }
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
</style>