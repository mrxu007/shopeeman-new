<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-03 16:22:13
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
          style="width: 207px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        />
      </div>
      <el-button type="primary" size="mini" class="mar-right" @click="getOrderStatisticsList">查 询</el-button>
      <el-button type="primary" size="mini" class="mar-right" @click="detailVisible = true">查看列表数据</el-button>
      <el-button type="primary" size="mini" class="mar-right" @click="exportData">导 出</el-button>
      <p style="color: red">统计数据对应财务中心以交易时间为维度的流水账单</p>
    </div>
    <!-- 数据总览 -->
    <div class="overview">
      <el-row :span="24">
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always" class="cart">
              <div class="cart-item">
                <img src="../../../assets/img/chargeTotalFee.png" class="mar-right" alt="">
                <span class="text-center mar-right">充值总金额（元）</span>
                <span class="text-right">{{ recharge_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/purchaseReturn.png" class="mar-right" alt="">
                <span class="text-center mar-right">采购商品退回金额（元）</span>
                <span class="text-right">{{ purchase_goods_return_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/return.png" class="mar-right" alt="">
                <span class="text-center mar-right">退件总金额（元）</span>
                <span class="text-right">{{ return_column }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/translate.png" class="mar-right" alt="">
                <span class="text-center mar-right">翻译总金额（元）</span>
                <span class="text-right">{{ translation_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/IP.png" class="mar-right" alt="">
                <span class="text-center mar-right">主体IP消费总金额（元）</span>
                <span class="text-right">{{ mall_main_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/totalConsumption.png" class="mar-right" alt="">
                <span class="text-center mar-right">总消费金额（元）</span>
                <span class="text-right">{{ total_expense_amount }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/purchase.png" class="mar-right" alt="">
                <span class="text-center mar-right">采购商品总金额（元）</span>
                <span class="text-right">{{ purchase_goods_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/exception.png" class="mar-right" alt="">
                <span class="text-center mar-right">异常赔付总金额（元）</span>
                <span class="text-right">{{ abnormal_payment_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/totalIncome.png" class="mar-right" alt="">
                <span class="text-center mar-right">总收入金额（元）</span>
                <span class="text-right">{{ total_revenue_amount }}</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/warehouse.png" class="mar-right" alt="">
                <span class="text-center mar-right">仓库发货总金额（元）</span>
                <span class="text-right">{{ warehouse_ship_column }}</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/other.png" class="mar-right" alt="">
                <span class="text-center mar-right">其他总金额（元）</span>
                <span class="text-right">{{ other_column }}</span>
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
          <chart-line id="chartLine" :option="lineData" />
        </div>
      </div>
    </div>
    <el-dialog title="数据详情" :visible.sync="detailVisible" width="70%">
      <div>
        <el-table :data="statisticsDetailData" tooltip-effect="dark" height="500">
          <el-table-column align="center" type="index" label="序号" min-width="50px" fixed />
          <el-table-column prop="stat_date" label="统计日期" align="center" min-width="180px" />
          <el-table-column prop="recharge" label="充值金额（收入）" align="center" min-width="90px">
            <template slot-scope="{ row }">
              {{ row.recharge ? parseFloat(row.recharge).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="translation" label="翻译金额（消费）" align="center" min-width="90px">
            <template slot-scope="{ row }">
              {{ row.translation ? parseFloat(row.translation).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="purchase_goods" label="采购商品金额（消费）" align="center" min-width="110px">
            <template slot-scope="{ row }">
              {{ row.purchase_goods ? parseFloat(row.purchase_goods).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="warehouse_ship" label="仓库发货金额（消费）" align="center" min-width="110px">
            <template slot-scope="{ row }">
              {{ row.warehouse_ship ? parseFloat(row.warehouse_ship).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="return" label="退件金额（消费）" align="center" min-width="90px">
            <template slot-scope="{ row }">
              {{ row.return ? parseFloat(row.return).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="purchase_goods_return" label="采购商品退回金额（收入）" align="center" min-width="130px">
            <template slot-scope="{ row }">
              {{ row.purchase_goods_return ? parseFloat(row.purchase_goods_return).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="mall_main" label="主体IP消费金额（消费）" align="center" min-width="120px">
            <template slot-scope="{ row }">
              {{ row.mall_main ? parseFloat(row.mall_main).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="abnormal_payment" label="异常赔付金额（收入）" align="center" min-width="110">
            <template slot-scope="{ row }">
              {{ row.abnormal_payment ? parseFloat(row.abnormal_payment).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="other" label="其它金额（消费）" align="center" min-width="90px">
            <template slot-scope="{ row }">
              {{ row.other ? parseFloat(row.other).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="income_amount_total" label="用户当天消费总金额" align="center" min-width="100px">
            <template slot-scope="{ row }">
              {{ row.income_amount_total ? parseFloat(row.income_amount_total).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
          <el-table-column prop="consum_amount_total" label="用户当天收入总金额" align="center" min-width="100px" fixed="right">
            <template slot-scope="{ row }">
              {{ row.consum_amount_total ? parseFloat(row.consum_amount_total).toFixed(2) : '0.00' }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import ChartLine from '../../../components/echart.vue'
import { creatDate, exportExcelDataCommon } from '../../../util/util'
export default {
  components: {
    ChartLine
  },
  data() {
    return {
      statisticsTime: [], // 统计时间
      // 不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      lineData: {
        tooltip: {
          trigger: 'axis'
        },
        xAxis: {
          type: 'category',
          data: ['2021-2-2', '2023-5-6', '2015-6-10']
        },
        yAxis: {
          type: 'value'
        },
        legend: {
          data: ['仓库发货金额', '主体IP消费金额', '总消费金额', '充值金额', '采购金额', '采购退回金额', '异常赔付金额', '其它总金额', '翻译金额', '退件金额', '总收入金额']
        },
        series: [
          {
            name: '仓库发货金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '主体IP消费金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '总消费金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '充值金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '采购金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '采购退回金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '异常赔付金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '其它总金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '翻译金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '退件金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          },
          {
            name: '总收入金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line'
          }
        ]
      },
      recharge_column: 0, // 充值总金额
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
      statisticsDetailData: [], // 列表数据
      detailVisible: false
    }
  },
  mounted() {
    this.statisticsTime = creatDate(31)
    this.getOrderStatisticsList()
  },
  methods: {
    // 获取统计数据
    async getOrderStatisticsList() {
      const transTime = JSON.parse(JSON.stringify(this.statisticsTime))
      const params = {
        transTime: transTime.length ? this.setDateFmt(transTime).join('/') : '/'
      }
      console.log(params)
      const res = await this.$api.getOrderStatisticsList(params)
      console.log(res, 'getOrderStatisticsList')
      if (res.data.code === 200 && res.data.data) {
        this.recharge_column = res.data.data.recharge_column || 0
        this.translation_column = res.data.data.translation_column || 0
        this.purchase_goods_column = res.data.data.purchase_goods_column || 0
        this.warehouse_ship_column = res.data.data.warehouse_ship_column || 0
        this.return_column = res.data.data.return_column || 0
        this.purchase_goods_return_column = res.data.data.purchase_goods_return_column || 0
        this.mall_main_column = res.data.data.mall_main_column || 0
        this.abnormal_payment_column = res.data.data.abnormal_payment_column || 0
        this.other_column = res.data.data.other_column || 0
        this.total_expense_amount = res.data.data.total_expense_amount || 0
        this.total_revenue_amount = res.data.data.total_revenue_amount || 0

        this.statisticsDetailData = res.data.data.data ? res.data.data.data : []
        const lineData = res.data.data.data ? res.data.data.data.reverse() : []
        const xAxisData = []
        const options = {}
        options['recharge'] = []
        options['translation'] = []
        options['purchase_goods'] = []
        options['warehouse_ship'] = []
        options['return'] = []
        options['purchase_goods_return'] = []
        options['mall_main'] = []
        options['abnormal_payment'] = []
        options['other'] = []
        options['income_amount_total'] = []
        options['consum_amount_total'] = []
        for (let i = 0; i < lineData.length; i++) {
          const item = lineData[i]
          xAxisData.push(item.stat_date)
          options['recharge'].push(Number(item.recharge))
          options['translation'].push(Number(item.translation))
          options['purchase_goods'].push(Number(item.purchase_goods))
          options['warehouse_ship'].push(Number(item.warehouse_ship))
          options['return'].push(Number(item.return))
          options['purchase_goods_return'].push(Number(item.purchase_goods_return))
          options['mall_main'].push(Number(item.mall_main))
          options['abnormal_payment'].push(Number(item.abnormal_payment))
          options['other'].push(Number(item.other))
          options['income_amount_total'].push(Number(item.income_amount_total))
          options['consum_amount_total'].push(Number(item.consum_amount_total))
        }
        console.log('xAxisData', xAxisData, options['income_amount_total'])
        this.lineData.xAxis.data = xAxisData
        this.lineData.series[0].data = options.warehouse_ship
        this.lineData.series[1].data = options.mall_main
        this.lineData.series[2].data = options.consum_amount_total
        this.lineData.series[3].data = options.recharge
        this.lineData.series[4].data = options.purchase_goods
        this.lineData.series[5].data = options.purchase_goods_return
        this.lineData.series[6].data = options.abnormal_payment
        this.lineData.series[7].data = options.other
        this.lineData.series[8].data = options.translation
        this.lineData.series[9].data = options.return
        this.lineData.series[10].data = options.income_amount_total
      }
      console.log('getOrderStatisticsList', res, this.lineData)
    },
    // 导出数据
    exportData() {
      if (!this.statisticsDetailData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>统计日期</td>
              <td>充值金额（收入）</td>
              <td>翻译金额（消费）</td>
              <td>采购商品金额（消费）</td>
              <td>仓库发货金额（消费）</td>
              <td>退件金额（消费）</td>
              <td>采购商品退回金额（收入）</td>
              <td>主体IP消费金额（消费）</td>
              <td>异常赔付金额（收入）</td>
              <td>其它金额（消费）</td>
              <td>用户当天消费总金额</td>
              <td>用户当天收入总金额</td>
            </tr>`
      for (let i = 0; i < this.statisticsDetailData.length; i++) {
        const item = this.statisticsDetailData[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.stat_date ? item.stat_date : 0 + '\t'}</td>
                    <td>${item.recharge ? item.recharge : 0 + '\t'}</td>
                    <td>${item.translation ? item.translation : 0 + '\t'}</td> 
                    <td>${item.purchase_goods ? item.purchase_goods : 0 + '\t'}</td>
                    <td>${item.warehouse_ship ? item.warehouse_ship : 0 + '\t'}</td>
                    <td>${item.return ? item.return : 0 + '\t'}</td>
                    <td>${item.purchase_goods_return ? item.purchase_goods_return : 0 + '\t'}</td>
                    <td>${item.mall_main ? item.mall_main : 0 + '\t'}</td>
                    <td>${item.abnormal_payment ? item.abnormal_payment : 0 + '\t'}</td>
                    <td>${item.other ? item.other : 0 + '\t'}</td>
                    <td>${item.income_amount_total ? item.income_amount_total : 0 + '\t'}</td>
                    <td>${item.consum_amount_total ? item.consum_amount_total : 0 + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('统计数据详情', str)
    },
    // 日期选择器时间处理
    setDateFmt(data) {
      data[0] = data[0] + ' 00:00:00'
      data[1] = data[1] + ' 23:59:59'
      return data
    }
  }
}
</script>

<style lang="less" scoped>
.check-account {
  padding: 16px;
  background: #fff;
  height: 100%;
  min-width: 1280px;
  overflow: auto;
  /deep/ .el-dialog__body {
    padding: 10px 20px;
    /deep/.el-table {
      /deep/tr > th > .cell {
        height: 40px !important;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
  }
}
.mar-right {
  margin-right: 10px;
}
// btn区
.header-btn {
  display: flex;
  align-items: center;
  .btn-item {
    display: flex;
    align-items: center;
  }
}
// 数据总览
.overview {
  margin-top: 10px;
  .overview-card {
    padding: 16px;
    font-size: 16px;
    height: 240px;
    min-width: 330px;
    .el-card {
      height: 100%;
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
        font-size: 18px;
      }
    }
  }
}
//数据图表
.statistic-charts {
  margin-top: 10px;
  padding: 0 16px;
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
      height: 500px;
    }
  }
}
</style>
