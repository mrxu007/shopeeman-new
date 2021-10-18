<template>
  <div class="content">
    <div class="overdata_view">
      <span>金额总览</span>
      <div>
        <span>即将拨款：</span>
        <span>已完成拨款：</span>
      </div>
    </div>

    <div class="all_condition">
      <div class="condition_item">
        <span>站点：</span>
      </div>

      <div class="condition_item">
        <span>店铺分组：</span>
      </div>

      <div class="condition_item">
        <span>店铺：</span>
      </div>

      <div class="condition_item">
        <span>平台店铺ID：</span>
      </div>

      <div class="condition_item">
        <span>拨款时间：</span>
      </div>

      <div class="condition_item">
        <span>状态：</span>
      </div>

      <div class="condition_item">
        <span>订单编号：</span>
      </div>

      <div class="condition_item">
        显示人民币：(当前汇率:0.1931)
      </div>

      <div class="condition_item">
        隐藏日志(当前汇率:0.1931)
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary">同步数据</el-button>
        <el-button size="mini" type="primary">取消同步</el-button>
        <el-button size="mini" type="primary">搜索</el-button>
        <el-button size="mini" type="primary">导出</el-button>
        <el-button size="mini" type="primary">清空日志</el-button>
      </div>
    </div>

    <div class="data_table">
      <el-table :data="tableList">
        <el-table-column label="序号" type="index" />
        <el-table-column prop="" label="站点" />
        <el-table-column prop="" label="店铺名称" />
        <el-table-column prop="" label="订单编号" />
        <el-table-column prop="" label="状态" />
        <el-table-column prop="" label="拨款单号" />
        <el-table-column prop="" label="拨款金额" />
        <el-table-column prop="" label="拨款金额(RMB)" />
        <el-table-column prop="" label="拨款时间" />
        <el-table-column prop="" label="账单详情" />
      </el-table>
      <div class="pagination">

        <el-pagination
          background
          :current-page.sync="page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />

      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: '',
      page: 1,
      pageSize: 20

    }
  },
  methods: {
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    }
  }
}
</script>
