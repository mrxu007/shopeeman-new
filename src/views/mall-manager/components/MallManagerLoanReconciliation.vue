<template>
  <div class="content">
    <div class="overdata_view">
      <h3>金额总览$</h3>
      <div>
        <span>即将拨款：</span>
        <span>已完成拨款：</span>
      </div>
    </div>

    <div class="all_condition">
      <div class="condition_item">
        <span>站点：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺分组：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>店铺：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>平台店铺ID：</span>
        <el-input v-model="query.prot_mallID" placeholder="输入多个ID请使用','号隔开" size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <span>拨款时间：</span>
        <el-date-picker
          v-model="cloumn_date"
          size="mini"
          style="width: 310px"
          type="datetimerange"
          value-format="yyyy-MM-dd HH:mm:ss"
          range-separator="-"
          :picker-options="pickerOptions"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        />
      </div>

      <div class="condition_item">
        <span>状态：</span>
        <el-select v-model="query.siteid" size="mini" width="150px" placeholder="站点">
          <el-option value="" label="全部" />
          <el-option v-for="item in siteList" :key="item.id" :label="item.value" :value="item.id" />
        </el-select>
      </div>

      <div class="condition_item">
        <span>订单编号：</span>
        <el-input v-model="query.orderID" placeholder="订单编号" size="mini" style="width:180px" />
      </div>

      <div class="condition_item">
        <div>
          <el-switch
            v-model="showRMB"
            active-color="#13ce66"
            inactive-color="grey"
          />
          <span>
            显示人民币：
          </span>
          <span>
            (当前汇率:0.1931)
          </span>
        </div>

        <div>
          <el-checkbox v-model="showLog"> 隐藏日志(当前汇率:0.1931)</el-checkbox>
        </div>
      </div>

      <div class="condition_item">
        <el-button size="mini" type="primary">同步数据</el-button>
        <el-button size="mini" type="primary">取消同步</el-button>
        <el-button size="mini" type="primary">搜索</el-button>
        <el-button size="mini" type="primary">导出</el-button>
        <el-button size="mini" type="primary">清空日志</el-button>
      </div>
    </div>

    <div class="table_clo">
      <div class="data_table" style="height: 100%;background-color:white">
        <el-table
          height="calc(100vh - 260px)"
          :data="tableList"
          :row-style="{ height: '50px' }"
          style="width: 100%;height: calc(100vh - 260px)"
          :header-cell-style="{ background: '#f7fafa' }"
        >
          <el-table-column label="序号" type="index" />
          <el-table-column prop="" label="站点" align="center" />
          <el-table-column prop="" label="店铺名称" align="center" />
          <el-table-column prop="" label="订单编号" align="center" />
          <el-table-column prop="" label="状态" align="center" />
          <el-table-column prop="" label="拨款单号" align="center" />
          <el-table-column prop="" label="拨款金额" align="center" />
          <el-table-column prop="" label="拨款金额(RMB)" align="center" />
          <el-table-column prop="" label="拨款时间" align="center" />
          <el-table-column prop="" label="账单详情" align="center" />
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
  </div>
</template>
<script>
export default {
  data() {
    return {
      tableList: [],
      page: 1,
      pageSize: 20,
      total: 0,
      siteList: [
        { id: 1, value: '美国' },
        { id: 2, value: '中国' },
        { id: 3, value: '英国' }
      ],
      query: {
        siteid: '',
        prot_mallID: '',
        orderID: ''
      },
      cloumn_date: [],
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      showRMB: true,
      showLog: true
    }
  },
  created() {
    this.initDate()
  },
  methods: {
    // 初始化时间
    initDate() {
      const d = new Date()
      const d1 =
        d.getFullYear() +
        '-' +
        (d.getMonth() + 1) +
        '-' +
        d.getDate() +
        ' 23:59:59'
      const d2 =
        d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date = [d2, d1]
      this.cloumn_date && this.cloumn_date.length > 0
        ? this.cloumn_date.join('/').toString()
        : ''
    },
    handleSizeChange(val) {
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    }
  }
}
</script>
<style lang="less">

.content{
    min-width: 1200px;
    // padding: 5px;
    // margin: 10px;
    // margin-right:10px ;
    .overdata_view , .all_condition, .table_clo{
    background-color: white;
    padding: 5px;
    margin: 10px;
    border-radius: 10px;
    }
    .table_clo{
     border-radius: 0px;
     padding: 2px;
    }
    .all_condition{
    display: flex;
    flex-wrap: wrap;
    // justify-content:center;
    // margin-bottom: 30px;
    align-items: center;
    .condition_item {
      width: auto;
      display: inline-block !important;
      display: inline;
      margin-bottom: 8px;
      margin-right: 10px;
      span {
        margin-right: 5px;
      }
    }
    }
}
</style>
