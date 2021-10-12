<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-12 18:02:37
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\components\PersonalCenterCheckaccounting.vue
-->
<template>
  <div class="check-account">
    <!-- btn区 -->
    <div class="header-btn">
      <div class="btn-item mar-right">
        统计时间：
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
      <el-button type="primary" size="mini" class="mar-right" @click="getOrderStatisticsList">查 询</el-button>
      <el-button type="primary" size="mini" class="mar-right">查看列表数据</el-button>
      <el-button type="primary" size="mini" class="mar-right">导 出</el-button>
    </div>
    <!-- 数据总览 -->
    <div class="overview">
      <el-row :span="24">
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always" class="cart">
              <div class="cart-item">
                <img src="../../../assets/img/chargeTotalFee.png" class="mar-right" alt="" />
                <span class="text-center mar-right">充值总金额（元）</span>
                <span class="text-right">{{recharge_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/purchaseReturn.png" class="mar-right" alt="" />
                <span class="text-center mar-right">采购商品退回金额（元）</span>
                <span class="text-right">{{purchase_goods_return_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/return.png" class="mar-right" alt="" />
                <span class="text-center mar-right">退件总金额（元）</span>
                <span class="text-right">{{return_column}}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/translate.png" class="mar-right" alt="" />
                <span class="text-center mar-right">翻译总金额（元）</span>
                <span class="text-right">{{translation_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/IP.png" class="mar-right" alt="" />
                <span class="text-center mar-right">主体IP消费总金额（元）</span>
                <span class="text-right">{{mall_main_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/totalConsumption.png" class="mar-right" alt="" />
                <span class="text-center mar-right">总消费金额（元）</span>
                <span class="text-right">{{total_expense_amount}}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/purchase.png" class="mar-right" alt="" />
                <span class="text-center mar-right">采购商品总金额（元）</span>
                <span class="text-right">{{purchase_goods_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/exception.png" class="mar-right" alt="" />
                <span class="text-center mar-right">异常赔付总金额（元）</span>
                <span class="text-right">{{abnormal_payment_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/totalIncome.png" class="mar-right" alt="" />
                <span class="text-center mar-right">总收入金额（元）</span>
                <span class="text-right">{{total_revenue_amount}}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/warehouse.png" class="mar-right" alt="" />
                <span class="text-center mar-right">仓库发货总金额（元）</span>
                <span class="text-right">{{warehouse_ship_column}}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/other.png" class="mar-right" alt="" />
                <span class="text-center mar-right">其他总金额（元）</span>
                <span class="text-right">{{other_column}}</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistic-charts">
      <div class="account-box">
        <span class="account-title">数据统计</span>
        <div class="account-item">
          <chart-line :lineData="lineData"></chart-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from '../../components/echart-line.vue'
export default {
  components: {
    ChartLine,
  },
  data() {
    return {
      statisticsTime: [], //统计时间
      //不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      lineData: {
        xAxis: ['2021-2-2', '2023-5-6', '2015-6-10'],
        legend: ['仓库发货金额', '主体IP消费金额', '总消费金额', '充值金额', '采购金额', '采购退回金额'],
        series: [
          {
            name: '仓库发货金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line',
          },
          {
            name: '主体IP消费金额',
            data: [0, 2, 0],
            smooth: true,
            type: 'line',
          },
          {
            name: '充值金额',
            data: [0, -1, 0],
            smooth: true,
            type: 'line',
          },
        ],
      },
    recharge_column: 0,
    translation_column: 0,
    purchase_goods_column: 0,
    warehouse_ship_column: 0,
    return_column: 0,
    purchase_goods_return_column: 0,
    mall_main_column: 0,
    abnormal_payment_column: 0,
    other_column: 0,
    total_expense_amount: 0,
    total_revenue_amount: 0,
    }
  },
  mounted(){
      let end = new Date().getTime()
      let start = end - 31 * 24 * 60 * 60 * 1000
      this.statisticsTime = [this.$dayjs(start).format('YYYY-MM-DD'), this.$dayjs(end).format('YYYY-MM-DD')]
      this.getOrderStatisticsList()
  },
  methods: {
    async getOrderStatisticsList(){
        let params = {
            transTime: this.statisticsTime.length?this.setDateFmt(this.statisticsTime).join('/'):''
        }
        let res = await this.$api.getOrderStatisticsList(params)
        if(res.data.status_code===200){
            this.recharge_column = res.data.data.recharge_column
            this.translation_column = res.data.data.translation_column
            this.purchase_goods_column = res.data.data.purchase_goods_column
            this.warehouse_ship_column = res.data.data.warehouse_ship_column
            this.return_column = res.data.data.return_column
            this.purchase_goods_return_column = res.data.data.purchase_goods_return_column
            this.mall_main_column = res.data.data.mall_main_column
            this.abnormal_payment_column = res.data.data.abnormal_payment_column
            this.other_column = res.data.data.other_column
            this.total_expense_amount = res.data.data.total_expense_amount
            this.total_revenue_amount = res.data.data.total_revenue_amount
        }
        console.log("getOrderStatisticsList",res)
    },
      // 日期选择器时间处理
    setDateFmt(data) {
      data[0] = data[0] + ' 00:00:00'
      data[1] = data[1] + ' 23:59:59'
      return data
    },
  },
}
</script>

<style lang="less" scoped>
.check-account {
  padding: 16px;
  background: #fff;
  height: 100%;
}
.mar-right {
  margin-right: 10px;
}
// btn区
.header-btn {
  display: flex;
  .btn-item {
    display: felx;
    align-items: center;
  }
}
// 数据总览
.overview {
  margin-top: 10px;
  .overview-card {
    padding: 16px;
    font-size: 18px;
    height:240px;
    .el-card{
        height:100%;
    }
    .cart-item {
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        height: 32px;
        width: 32px;
      }
      span {
        display: inline-block;
      }
      .text-center {
        flex: 1;
      }
      .text-right {
        font-weight: 900;
        font-size: 24px;
      }
    }
  }
}
//数据图表
.statistic-charts {
  margin-top: 10px;
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
    }
  }
}
</style>