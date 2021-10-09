<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-09 17:51:29
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\components\PersonalCenterStoreFinance.vue
-->
<template>
  <div class="store-finance">
    <div class="herder-bar">
      <!-- 余额信息 -->
      <div class="account-box mar-right">
        <span class="account-title">余额信息</span>
        <div class="account-item">
          <span>余额：{{}} 元</span>
          <el-button type="primary" size="mini">刷新余额</el-button>
        </div>
      </div>
      <!-- 充值 -->
      <div class="account-box">
        <span class="account-title">充值</span>
        <div class="account-item">
          <div class="acount-item-sub mar-right">
            <span>充值金额：</span>
            <el-input size="mini" v-model="rechargeMoney" style="width: 80px" clearable></el-input>
          </div>
          <div class="acount-item-sub mar-right">
            <span>充值备注：</span>
            <el-input size="mini" v-model="rechargeRemark" style="width: 200px" clearable></el-input>
          </div>
          <div class="acount-item-sub">
            <el-button type="primary" size="mini">充值</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户充值记录" name="rechargeRecord"></el-tab-pane>
        <el-tab-pane label="用户账单记录" name="accountRecord"></el-tab-pane>
      </el-tabs>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <div class="btn-box">
        <div class="btn-item mar-right">
          交易时间：
          <el-date-picker
            v-model="tradeTime"
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
        <div class="btn-item mar-right" v-if="activeName === 'accountRecord'">
          交易类型：
          <el-select v-model="tradeType" size="mini">
            <el-option v-for="item in tradeTypeList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="btn-item mar-right" v-if="activeName === 'accountRecord'">
          订单号：
          <el-input size="mini" v-model="orderNumber" style="width: 200px" clearable></el-input>
        </div>
        <div v-if="activeName === 'rechargeRecord'">
          <el-button type="primary" size="mini" class="mar-right">搜 索</el-button>
          <el-button type="primary" size="mini">导 出</el-button>
        </div>
        <div v-if="activeName === 'accountRecord'">
          <el-button type="primary" size="mini" class="mar-right">搜 索</el-button>
          <el-button type="primary" size="mini">导 出</el-button>
        </div>
      </div>
      <!-- 表格区 -->
      <div class="container" v-if="activeName === 'rechargeRecord'">
        <el-table
          ref="multipleTable"
          :data="tableData"
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
          <el-table-column min-width="140px" label="内部交易单号" align="center">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column min-width="130px" label="充值金额" align="center">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column align="center" prop="type" label="交易时间" min-width="60"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column align="center" prop="trans_type" label="实收金额" min-width="70"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column align="center" prop="trans_type" label="买家付款金额" min-width="70"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column prop="trans_time" label="交易状态" align="center" min-width="90px">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column prop="created_at" label="是否已充值" align="center" width="90px" />
          <el-table-column align="center" prop="amount" label="买家支付宝用户号" min-width="70" />
          <el-table-column align="center" prop="current_amount" label="买家支付宝唯一用户号" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="备注" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="支付时间" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="交易创建时间" min-width="80" />
        </el-table>
      </div>
      <div class="container" v-if="activeName === 'accountRecord'">
        <el-table
          ref="multipleTable"
          :data="tableData"
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
          <el-table-column min-width="140px" label="仓库名称" align="center">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column min-width="130px" label="交易号" align="center">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column align="center" prop="type" label="资金流向" min-width="60"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column align="center" prop="trans_type" label="交易类型" min-width="70"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column align="center" prop="trans_type" label="订单编号" min-width="70"><template slot-scope="scope"> {{}} </template> </el-table-column>
          <el-table-column prop="trans_time" label="交易金额" align="center" min-width="90px">
            <template slot-scope="scope"> {{}} </template>
          </el-table-column>
          <el-table-column prop="created_at" label="交易状态" align="center" width="90px" />
          <el-table-column align="center" prop="amount" label="当前剩余金额" min-width="70" />
          <el-table-column align="center" prop="current_amount" label="清关费用" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="头程物流费用" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="仓库操作费" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="出库图片" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="备注" min-width="80" />
          <el-table-column align="center" prop="current_amount" label="交易时间" min-width="80" />
        </el-table>
      </div>
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

<script >
export default {
  data() {
    return {
      rechargeRemark: '', //充值金额
      rechargeMoney: '', //充值备注
      activeName: 'rechargeRecord', //tab
      tradeTime: [], //交易时间
      //不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      pageSize: 20, //页码
      currentPage: 1, //页码
      total: 0, //表格总数
      tableData: [], //表格数据
      orderNumber: '', //订单号
      tradeType: '', //交易类型
      tradeTypeList: [
        {
          value: '0',
          label: '全部',
        },
        {
          value: '1',
          label: '仓库发货',
        },
      ],
    }
  },
  methods: {
    //切换tab
    handleClick() {
      this.pageSize = 20
      this.currentPage = 1
      this.total = 0
      this.tableData = []
      this.tradeTime = []
      this.tradeType = ''
      this.orderNumber = ''
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
.store-finance {
  padding: 16px;
  background: #fff;
}
.herder-bar {
  display: flex;
}
.mar-right {
  margin-right: 10px;
}
//余额信息 充值
.account-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 16px;
  position: relative;
  .account-title {
    padding: 0 5px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #fff;
    position: absolute;
    left: 10px;
    top: -10px;
  }
  .account-item {
    display: flex;
    align-items: center;
    span {
      margin-right: 20px;
      display: inline-block;
    }
    .acount-item-sub {
      display: flex;
      align-items: center;
    }
  }
}
//tab区
.tab-box {
  margin-top: 10px;
}
//内容区
.content {
  margin-top: 10px;
  .btn-box {
    display: flex;
    .btn-item {
      display: flex;
      align-items: center;
    }
  }
  .container {
    margin-top: 10px;
  }
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>