<!--软件财务中心-->
<template>
  <div class="PersonalCenterSoftwareFinance">
    <!--账户相关信息-->
    <div class="message">
      <div>账户余额：{{ account.balance }}元</div>
      <div class="bottonGroup">
        <el-button type="primary" size="mini">刷新余额</el-button>
        <el-button type="primary" size="mini">充值</el-button>
      </div>
      <div>今日翻译费用：{{ account.translationCosts }}元</div>
    </div>
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 创建时间 -->
        <div class="creationTime">
          创建时间：<el-date-picker v-model="form.creationTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" />
        </div>
        <!-- 交易时间 -->
        <div class="tradingTime">交易时间：<el-date-picker v-model="form.tradingTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" /></div>
        <!-- 金额范围 -->
        <div class="moneyRange">
          金额范围：
          <el-input v-model="form.minMoney" size="mini" />
          <span>-</span>
          <el-input v-model="form.maxMoney" size="mini" />
        </div>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        <!-- 交易状态 -->
        <div class="transactionStatus">
          交易状态：
          <el-select v-model="form.transactionStatus" size="mini">
            <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- 资金流向 -->
        <div class="moneyFlow">
          资金流向：
          <el-select v-model="form.moneyFlow" size="mini">
            <el-option v-for="item in moneyFlow" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <!-- 交易类型 -->
        <div class="transactionType">
          交易类型：
          <el-select v-model="form.transactionType" size="mini">
            <el-option v-for="item in transactionType" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        <!-- 订单编号 -->
        <div class="orderNumber">
          订单编号：
          <el-input v-model="form.orderNumber" size="mini" />
        </div>
        <!-- 星卓越大包号 -->
        <div class="bigBagNumber">
          星卓越大包号：
          <el-input v-model="form.bigBagNumber" size="mini" />
        </div>
        <div class="searchRowThreeBottonGroup">
          <el-button type="primary" size="mini">查询</el-button>
          <el-button type="primary" size="mini">充值查询条件</el-button>
          <el-button type="primary" size="mini">导出数据</el-button>
        </div>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table
        ref="multipleTable"
        :data="allbillingData"
        tooltip-effect="dark"
        max-height="625"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="140px" label="交易号" align="center">
          <template slot-scope="scope">
            <p class="tabletext">
              <span style="cursor: pointer"> {{ scope.row.trans_number }}</span
              ><span class="copyIcon" @click="copy(scope.row.trans_number)">
                <i class="el-icon-document-copy" />
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="130px" label="订单编号" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.package_order_sn" class="tabletext">
              <span style="cursor: pointer">{{ scope.row.package_order_sn }}</span
              ><span class="copyIcon" @click="copy(scope.row.package_order_sn)"><i class="el-icon-document-copy" /></span>
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="type" label="资金流向" min-width="60"
          ><template slot-scope="scope">
            <p v-if="scope.row.type > 0">
              {{}}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="trans_type" label="交易类型" min-width="70"
          ><template slot-scope="scope">
            <p v-if="scope.row.trans_type > 0">
              {{}}
            </p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="trans_type" label="交易状态" min-width="70"
          ><template slot-scope="scope">
            <p v-if="scope.row.trans_type > 0">
              {{}}
            </p>
          </template>
        </el-table-column>
        <el-table-column prop="trans_time" label="交易时间" align="center" min-width="90px">
          <template slot-scope="scope">
            {{}}
          </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center" width="90px" />
        <el-table-column align="center" prop="amount" label="交易金额" min-width="70" />
        <el-table-column align="center" prop="current_amount" label="账户余额" min-width="80" />
        <el-table-column align="center" prop="current_amount" label="大包号" min-width="80" />
        <el-table-column align="center" prop="current_amount" label="商品skuID" min-width="80" />
        <el-table-column align="center" prop="current_amount" label="费用明细" min-width="80" />
        <el-table-column align="center" prop="remark" label="备注" min-width="100" />
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
      account: {
        balance: '-0.08', // 账户余额
        translationCosts: '0', // 今日翻译费用
      },
      //   搜索条件
      form: {
        creationTime: '', // 创建时间
        tradingTime: '', // 交易时间
        minMoney: '', // 最小金额
        maxMoney: '', // 最大金额
        transactionStatus: '', // 交易状态
        moneyFlow: [], // 资金流向
        transactionType: [], // 交易类型
        orderNumber: '', // 订单编号
        bigBagNumber: '', // 星卓越大包号：
      },
      // 交易状态下拉选择
      options: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '成功',
        },
        {
          value: 2,
          label: '失败',
        },
        {
          value: 3,
          label: '退款',
        },
        {
          value: 4,
          label: '等待付款',
        },
      ],
      // 资金流向select
      moneyFlow: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '收入',
        },
        {
          value: 2,
          label: '支出',
        },
      ],
      // 交易类型select
      transactionType: [
        {
          value: 0,
          label: '全部',
        },
        {
          value: 1,
          label: '充值',
        },
        {
          value: 2,
          label: '翻译',
        },
        {
          value: 3,
          label: '采购商品',
        },
        {
          value: 4,
          label: '仓库发货',
        },
        {
          value: 5,
          label: '退件',
        },
        {
          value: 6,
          label: '采购商品退回',
        },
        {
          value: 7,
          label: '主体IP消费',
        },
        {
          value: 8,
          label: '异常赔付',
        },
        {
          value: 9,
          label: '海外仓备货',
        },
        {
          value: 10,
          label: '软件开户',
        },
        {
          value: 11,
          label: '费用冲正',
        },
        {
          value: 12,
          label: '海外仓发货',
        },
        {
          value: 13,
          label: '钱包迁移',
        },
      ],
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
      allbillingData: [], //表格数据
    }
  },
  mounted() {},
  methods: {
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
.PersonalCenterSoftwareFinance {
  padding: 16px;
  background: #fff;
}
// 账户相关信息
.message {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  .bottonGroup {
    margin: 0 10px;
  }
}
//上面查询条件部分
.search {
  & > div {
    margin: 10px 0;
  }
  .rowOne {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    //创建时间和交易时间
    .creationTime,
    .tradingTime {
      /deep/.el-date-editor {
        width: 198px;
      }
    }
    //交易时间
    .tradingTime {
      margin: 0 10px;
    }
    //金额范围
    .moneyRange {
      span {
        margin: 0 10px;
      }
      .el-input {
        width: 80px;
      }
    }
  }
  .rowTwo {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    //资金流向和交易类型
    .moneyFlow,
    .transactionType {
      display: flex;
      margin: 0 10px;
      /deep/.el-checkbox {
        margin-right: 16px;
        .el-checkbox__label {
          padding-left: 5px;
        }
      }
    }
    //交易状态
    .transactionStatus {
      .el-select {
        width: 140px;
      }
    }
  }
  .rowThree {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    // 订单编号和星卓越大包号
    .orderNumber,
    .bigBagNumber {
      .el-input {
        width: 120px;
      }
    }
    //卓越大包号
    .bigBagNumber {
      margin: 0 10px;
    }
    .searchRowThreeBottonGroup {
    }
  }
}
//表格区
.content {
  margin-top: 20px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 10px;
}
</style>
