<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-19 17:04:27
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="drawal-record">
    <div class="tool-bar">
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>站点：</span>
          <el-select v-model="countryVal" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>店铺分组：</span>
          <el-select v-model="groupId" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option label="无分组" :value="-1" />
            <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="tool-item">
          <span>店铺：</span>
          <el-select v-model="mallSelect" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in 4" :key="index" />
          </el-select>
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>时间：</span>
          <el-date-picker
            v-model="recordTime"
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
        <el-button type="primary" size="mini" class="mar-right" @click="clear">查询提现记录</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="exportData">导 出</el-button>
        <el-checkbox v-model="showConsole" class="mar-right">隐藏日志</el-checkbox>
        <p class="activeColor">当前提现金额合计：{{}}</p>
      </div>
    </div>
    <div class="content">
      <el-table v-loading="tableLoading" ref="multipleTable" :data="tableData" tooltip-effect="dark" max-height="650">
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="140px" label="站点" prop="warehouse_name" align="center" />
        <el-table-column min-width="140px" label="店铺名称" prop="trans_number" align="center" />
        <el-table-column align="center" prop="transaction_id" label="交易流水号" min-width="120" />
        <el-table-column align="center" prop="bank_name" label="银行" min-width="70" />
        <el-table-column align="center" prop="bank_account_name" label="持卡人" min-width="70" />
        <el-table-column prop="bank_account_number" label="银行卡号" align="center" min-width="120px" />
        <el-table-column align="center" prop="ic_number" label="IcNumber" min-width="70" />
        <el-table-column align="center" prop="current_amount" label="提现金额" min-width="70">
          <template slot-scope="scope">{{ scope.row.withdrawals_money / 100 }}</template>
        </el-table-column>
        <el-table-column align="center" prop="withdrawals_time" label="提现时间" min-width="80" />
        <el-table-column align="center" prop="complete_time" label="完成时间" min-width="80" />
        <el-table-column align="center" prop="status" label="提现状态" min-width="80">
          <template slot-scope="scope">{{ changeTypeName(scope.row.status, statusList) }}</template>
        </el-table-column>
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
    <Logs ref="Logs" clear v-model="showConsole" />
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
      showConsole: true,
      countryVal: '',
      groupId: '',
      mallSelect: '',
      countries: [
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '泰国站', value: 'TH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' },
      ],
      recordTime: [],
      tableData: [],
      tableLoading: false,
      statusList: [
        {
          value: '0',
          label: '未知状态',
        },
        {
          value: '2',
          label: '提现中',
        },
        {
          value: '3',
          label: '已提现',
        },
        {
          value: '4',
          label: '提现失败',
        },
      ],
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
    }
  },
  mounted() {
    this.getMallList()
  },
  methods: {
    async getMallList() {},
    exportData() {
      this.$refs.Logs.writeLog('sdhgkjdjhglk', true)
    },
    clear() {
      this.$refs.Logs.consoleMsg = ''
    },
    handleCurrentChange(val) {
      this.currentPage = val
    },
    handleSizeChange(size) {
      this.pageSize = size
    },
    //转换类型中文
    changeTypeName(value, statusList) {
      let str = ''
      let data = baseData.find((item) => item.value == value)
      str = data ? data.label : ''
      return str
    },
  },
}
</script>

<style lang="less" scoped>
.drawal-record {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.activeColor {
  color: red;
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