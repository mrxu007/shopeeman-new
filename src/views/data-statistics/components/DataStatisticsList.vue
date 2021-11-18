<template>
  <div class="DataStatisticsList">
    <!--实时概况-->
    <div class="realTimeOverview">
      <div class="title">
        <h3>实时概况</h3>
      </div>
      <div class="search">
        <div class="top">
          <storeChoose :is-all="true" @changeMallList="changeMallList" />
        </div>
        <div class="bottom">
          <div class="historyChart">
            <span>历史图表：</span>
            <el-select v-model="history" size="mini" class="inputbox mar-right">
              <el-option v-for="item in historyData" :key="item.value" :label="item.label" :value="item.value" />
            </el-select>
          </div>
          <div>
            <span>实时概况：</span>
            <el-date-picker
              v-model="dateTime"
              style="width:260px;"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
          </div>
          <div>
            <el-button
              type="primary"
              size="mini"
              @click="
                getOrderListData()
                getChartData()
              "
            >查询</el-button>
            <el-button type="primary" size="mini" @click="detailVisible = true">查看列表数据</el-button>
            <el-button type="primary" size="mini" plain @click="exportData">导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="dataView">
        <el-card shadow="never">
          <div class="item-box">
            <div class="item">
              <img :src="transactionAmountPng">
              <span class="item-name">成交金额（元）</span>
              <el-tooltip effect="dark" content="订单收入-订单状态为已取消的订单收入" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalDealAmount }}</span>
            </div>
            <div class="item">
              <img :src="orderNumberPng">
              <span class="item-name">shopee订单数（单）</span>
              <el-tooltip effect="dark" content="shopee平台的订单数" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.platformOrderCount }}</span>
            </div>
            <div class="item">
              <img :src="purchasePng">
              <span class="item-name">已采购单数（单）</span>
              <el-tooltip effect="dark" content="采购总单数" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalCompletedShotNum }}</span>
            </div>
            <div class="item">
              <img :src="waitPurchasePng">
              <span class="item-name">待采购单数（单）</span>
              <el-tooltip effect="dark" content="近7天待采购数量总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.waitShotNum }}</span>
            </div>
          </div>
          <div class="item-box">
            <div class="item">
              <img :src="cancelOrderPng">
              <span class="item-name">已取消订金额（元）</span>
              <el-tooltip effect="dark" content="已取消订单收入总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalCanceledEscrowAmount }}</span>
            </div>
            <div class="item">
              <img :src="alreadyCancelPng">
              <span class="item-name">已取消订单数（单）</span>
              <el-tooltip effect="dark" content="订单状态为已取消的订单数量" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.platformCancelOrderCount }}</span>
            </div>
            <div class="item">
              <img :src="purchasedPng">
              <span class="item-name">已采购金额（元）</span>
              <el-tooltip effect="dark" content="采购总金额" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalCompletedShotAmount }}</span>
            </div>
          </div>
          <div class="item-box">
            <div class="item">
              <img :src="cancelPng">
              <span class="item-name">订单即将取消（单）</span>
              <el-tooltip effect="dark" content="还有两天就即将取消的订单数量总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.shipDelayingNum }}</span>
            </div>
            <div class="item">
              <img :src="warehouseDeliveryPng">
              <span class="item-name">仓库发货订单数（单）</span>
              <el-tooltip effect="dark" content="仓库发货状态为已出库的订单数量总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalOutboundNum }}</span>
            </div>
            <div class="item">
              <img :src="outMoneyPng">
              <span class="item-name">仓库出库金额（元）</span>
              <el-tooltip effect="dark" content="仓库发货状态为已出库并生成账单流水的金额总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.totalOutStockAmount }}</span>
            </div>
          </div>
          <div class="item-box">
            <div class="item">
              <img :src="noOrderPng">
              <span class="item-name">匹配不到订单数（单）</span>
              <el-tooltip effect="dark" content="今日匹配不到订单的包裹数量总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.noOrderNum }}</span>
            </div>
            <div class="item">
              <img :src="printFailPng">
              <span class="item-name">页面打印失败数（单）</span>
              <el-tooltip effect="dark" content="今日面单打印失败的订单数量总和" placement="bottom-start">
                <img :src="questionPng">
              </el-tooltip>
              :
              <span>{{ orderListData.printOrderFailNum }}</span>
            </div>
          </div>
        </el-card>
      </div>
    </div>
    <div class="chart">
      <div class="title">
        <h3>历史图表数据</h3>
        <span class="tip">（默认展示至少近7天的图标数据）</span>
      </div>
      <div class="chartTop">
        <div class="leftCahrt">
          <span class="tit">销售统计</span>
          <Echart id="saleCountChart" width="100%" height="calc(100% - 20px)" :option="saleCountOption" />
          <h6>统计日期</h6>
        </div>
        <div class="rightChart">
          <span class="tit">售后统计</span>
          <Echart id="afterSaleChart" width="100%" height="calc(100% - 20px)" :option="afterSaleCountOption" />
          <h6>统计日期</h6>
        </div>
      </div>
      <div class="chartBottom">
        <div class="leftCahrt">
          <span class="tit">采购统计</span>
          <Echart id="purchaseChart" width="100%" height="calc(100% - 20px)" :option="purchaseOption" />
          <h6>统计日期</h6>
        </div>
        <div class="rightChart">
          <span class="tit">仓库发货统计</span>
          <Echart id="shipmentStatisticsChart" width="100%" height="calc(100% - 20px)" :option="shipmentStatisticsOption" />
          <h6>统计日期</h6>
        </div>
      </div>
    </div>
    <el-dialog title="数据详情" :visible.sync="detailVisible" width="80%">
      <div>
        <el-table :data="statisticsDetailData" tooltip-effect="dark" height="500">
          <el-table-column align="center" type="index" label="序号" width="50" />
          <el-table-column align="center" label="统计日期" prop="date" min-width="120px" />
          <el-table-column label="虾皮订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.order.shopee_order_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="系统订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.order.ppxias_order_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="销售金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.order.escrow_amount || 0 }}
            </template>
          </el-table-column>
          <!-- <el-table-column label="总利润（含邮费）" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.order.gross_profit || 0 }}
            </template>
          </el-table-column> -->
          <el-table-column label="已取消订单" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.return_cancelled_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="退款成功单量" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.return_success_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="退款成功金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.return_success_amount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="采购单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.shot.shot_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="采购金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.shot.shot_amount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="新增售后单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.return_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="新增售后金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.return_amount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="已采购新增售后单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.shot_return_cancelled_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="已采购新增售后金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.shot_return_cancelled_amount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="已采购售后退款成功单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.shot_return_success_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="已采购售后退款成功金额" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.return.shot_return_success_amount || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="签收包裹数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.signing_package_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="拒收包裹数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.reject_package_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="入库订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.storage_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="出库订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.outbound_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="匹配不到订单包裹数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.today_no_orde_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="面单打印失败订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.today_print_order_fail_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="等待子订单数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.today_wait_order_num || 0 }}
            </template>
          </el-table-column>
          <el-table-column label="退件包裹数" align="center" min-width="120px">
            <template slot-scope="scope">
              {{ scope.row.warehouse.returned_num || 0 }}
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { creatDate, exportExcelDataCommon, delay } from '../../../util/util'
import storeChoose from '../../../components/store-choose'
import Echart from '../components/chart.vue'
export default {
  components: {
    Echart,
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      // 订单列表数据
      orderListData: {
        totalDealAmount: '0.00',
        totalCanceledEscrowAmount: '0.00',
        platformOrderCount: '0',
        platformCancelOrderCount: '0',
        waitShotNum: '0',
        totalCompletedShotAmount: '0.00',
        totalCompletedShotNum: '0',
        totalOutStockAmount: '0.00',
        shipDelayingNum: '0',
        totalOutboundNum: '0',
        noOrderNum: '0',
        printOrderFailNum: '0'
      },
      // 问号图标
      questionPng: require('@/assets/image/data-statistics/question.png'),
      // 成交金额图标
      transactionAmountPng: require('@/assets/image/data-statistics/transactionAmount.png'),
      // 已采购金额图标
      purchasedPng: require('@/assets/image/data-statistics/purchased.png'),
      // 已采购单数图标
      purchasePng: require('@/assets/image/data-statistics/purchase.png'),
      // 订单数图标
      orderNumberPng: require('@/assets/image/data-statistics/orderNumber.png'),
      // 待采购图标
      waitPurchasePng: require('@/assets/image/data-statistics/waitPurchase.png'),
      // 出库金额图标
      outMoneyPng: require('@/assets/image/data-statistics/outMoney.png'),
      // 打印失败图标
      printFailPng: require('@/assets/image/data-statistics/printFail.png'),
      // 已取消订单金额图标
      cancelOrderPng: require('@/assets/image/data-statistics/cancelOrder.png'),
      // 仓库发货订单数图标
      warehouseDeliveryPng: require('@/assets/image/data-statistics/warehouseDelivery.png'),
      // 匹配不到订单数图标
      noOrderPng: require('@/assets/image/data-statistics/noOrder.png'),
      // 订单即将取消图标
      cancelPng: require('@/assets/image/data-statistics/cancel.png'),
      // 已取消订单数图标
      alreadyCancelPng: require('@/assets/image/data-statistics/alreadyCancel.png'),
      history: 7, // 历史图表时间
      dateTime: [], // 实时概况时间
      // 历史select
      historyData: [
        {
          value: 7,
          label: '近7天'
        },
        {
          value: 30,
          label: '近30天'
        },
        {
          value: 60,
          label: '近60天'
        }
      ],
      // 销售统计图表数据
      saleCountOption: {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          top: 20,
          data: ['系统订单数量', '虾皮订单数量', '订单收入']
        },
        grid: {
          top: '60px',
          left: '50px',
          right: '50px',
          bottom: '20px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '销售数量'
          },
          {
            type: 'value',
            name: '销售金额'
          }
        ],
        series: [
          {
            name: '系统订单数量',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            }
          },
          {
            name: '虾皮订单数量',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#2389f3'
            }
          },
          {
            name: '订单收入',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#F32823'
            },
            yAxisIndex: 1
          }
        ]
      },
      // 售后统计图表数据
      afterSaleCountOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '120px',
          left: '50px',
          right: '50px',
          bottom: '20px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '订单数量'
          },
          {
            type: 'value',
            name: '订单金额'
          }
        ],
        legend: {
          top: 30,
          data: ['新增售后金额', '订单已取消新增采购单数', '订单已取消新增采购金额', '新增售后单数', '已采购售后退款成功金额', '已采购售后退款成功数', '订单已取消单数']
        },
        series: [
          {
            name: '新增售后金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            },
            yAxisIndex: 1
          },
          {
            name: '订单已取消新增采购单数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#23e9f3'
            }
          },
          {
            name: '订单已取消新增采购金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#919494'
            },
            yAxisIndex: 1
          },
          {
            name: '新增售后单数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#bba433'
            }
          },
          {
            name: '已采购售后退款成功金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#a633bb'
            },
            yAxisIndex: 1
          },
          {
            name: '已采购售后退款成功数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#333dbb'
            }
          },
          {
            name: '订单已取消单数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#d41a1a'
            }
          }
        ]
      },
      // 采购统计图表数据
      purchaseOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '60px',
          left: '50px',
          right: '50px',
          bottom: '20px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: [
          {
            type: 'value',
            name: '采购数量'
          },
          {
            type: 'value',
            name: '采购金额'
          }
        ],
        legend: {
          top: 20,
          data: ['采购数量', '采购金额']
        },
        series: [
          {
            name: '采购数量',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            }
          },
          {
            name: '采购金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#2389f3'
            },
            yAxisIndex: 1
          }
        ]
      },
      // 仓库发货统计图表数据
      shipmentStatisticsOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '60px',
          left: '50px',
          right: '50px',
          bottom: '20px'
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: 'value',
          name: '数量'
        },
        legend: {
          top: 20,
          data: ['签收', '入库', '出库', '拒收', '匹配不到订单', '等待子订单', '页面打印失败', '其它异常']
        },
        series: [
          {
            name: '签收',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            }
          },
          {
            name: '入库',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#23e9f3'
            }
          },
          {
            name: '出库',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#919494'
            }
          },
          {
            name: '拒收',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#bba433'
            }
          },
          {
            name: '匹配不到订单',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#a633bb'
            }
          },
          {
            name: '等待子订单',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#333dbb'
            }
          },
          {
            name: '页面打印失败',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#d41a1a'
            }
          },
          {
            name: '其它异常',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5f4009'
            }
          }
        ]
      },
      selectMallList: [],
      statisticsDetailData: [],
      detailVisible: false
    }
  },
  mounted() {
    this.dateTime = creatDate(0)
    this.getOrderListData()
    this.getChartData()
  },
  methods: {
    // 数据导出
    exportData() {
      if (!this.statisticsDetailData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>序号</td>
              <td>统计日期</td>
              <td>虾皮订单数</td>
              <td>系统订单数</td>
              
              <td>销售金额</td>
              <td>已取消单量</td>
              <td>退款成功单量</td>
              <td>退款成功金额</td>
              <td>采购单数</td>
              <td>采购金额</td>
              <td>新增售后单数</td>
              <td>新增售后金额</td>
              <td>已采购新增售后单数</td>
              <td>已采购新增售后金额</td>
              <td>已采购售后退款成功单数</td>
              <td>已采购售后退款成功金额</td>
              <td>签收包裹数</td>
              <td>拒收包裹数</td>
              <td>入库订单数</td>
              <td>出库订单数</td>
              <td>匹配不到订单包裹数</td>
              <td>面单打印失败订单数</td>
              <td>等待子订单数</td>
              <td>退件包裹数</td>
            </tr>`
      for (let i = 0; i < this.statisticsDetailData.length; i++) {
        const item = this.statisticsDetailData[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.date || '' + '\t'}</td>
                    <td>${item.order ? item.order.shopee_order_num : 0 + '\t'}</td>
                    <td>${item.order ? item.order.ppxias_order_num : 0 + '\t'}</td>
                    <td>${item.order ? item.order.escrow_amount : 0 + '\t'}</td>
                
                    <td>${item.return ? item.return.return_cancelled_num : 0 + '\t'}</td>
                    <td>${item.return ? item.return.return_success_num : 0 + '\t'}</td>
                    <td>${item.return ? item.return.return_success_amount : 0 + '\t'}</td>
                    <td>${item.shot ? item.shot.shot_num : 0 + '\t'}</td>
                    <td>${item.shot ? item.shot.shot_amount : 0 + '\t'}</td>
                    <td>${item.return ? item.return.return_num : 0 + '\t'}</td>
                    <td>${item.return ? item.return.return_amount : 0 + '\t'}</td>
                    <td>${item.return ? item.return.shot_return_cancelled_num : 0 + '\t'}</td>
                    <td>${item.return ? item.return.shot_return_cancelled_amount : 0 + '\t'}</td>
                    <td>${item.return ? item.return.shot_return_success_num : 0 + '\t'}</td>
                    <td>${item.return ? item.return.shot_return_success_amount : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.signing_package_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.reject_package_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.storage_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.outbound_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.today_no_orde_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.today_print_order_fail_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.today_wait_order_num : 0 + '\t'}</td>
                    <td>${item.warehouse ? item.warehouse.returned_num : 0 + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('统计详情列表', str)
    },
    changeMallList(val) {
      this.selectMallList = val
      console.log('changeMallList', val)
    },
    // 查询
    async searchHandle() {
      if (this.form.overviewTime) {
        const startTiem = this.formatSearch(this.form.overviewTime[0])
        const endTiem = this.formatSearch(this.form.overviewTime[1])
        this.form.overviewTime = `${startTiem}/${endTiem}`
      }
    },
    // 获取订单列表数据
    async getOrderListData() {
      const days = (new Date(this.dateTime[1]).getTime() - new Date(this.dateTime[0]).getTime()) / 86400000 || 0
      if (days > 60) {
        this.$alert('只支持查询或导出60天内的数据,请重新选择时间！', '提示', {
          confirmButtonText: '确定',
          type: 'warning'
        })
        return
      }
      let sysMallIds = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallIds = item.id
        } else {
          sysMallIds = sysMallIds + ',' + item.id
        }
      })
      const dateTime = this.dateTime.length ? this.dateTime[0] + ' 00:00:00' + '/' + this.dateTime[1] + ' 23:59:59' : ''
      const params = {
        sysMallIds: sysMallIds,
        dateTime: dateTime
      }
      const result = await this.$api.getDrderBasicStatV2(params)
      if (result.data.code === 200) {
        this.orderListData = result.data.data
      } else {
        this.$message.error(result.data.message)
      }
    },
    // 获取图表数据
    async getChartData() {
      let sysMallIds = ''
      this.selectMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallIds = item.id
        } else {
          sysMallIds = sysMallIds + ',' + item.id
        }
      })
      const params = {
        sysMallIds: sysMallIds,
        days: this.history
      }
      const result = await this.$api.getDataStat(params)
      console.log(result)
      this.formatChartsOption(result.data.data)
    },
    // 将图表数据拼接到echarts参数种
    formatChartsOption(data) {
      // 销售统计图表数据
      this.saleCountOption.series[0].data = []
      this.saleCountOption.series[1].data = []
      this.saleCountOption.series[2].data = []
      // 售后统计图表
      this.afterSaleCountOption.series[0].data = []
      this.afterSaleCountOption.series[1].data = []
      this.afterSaleCountOption.series[2].data = []
      this.afterSaleCountOption.series[3].data = []
      this.afterSaleCountOption.series[4].data = []
      this.afterSaleCountOption.series[5].data = []
      this.afterSaleCountOption.series[6].data = []

      //   采购统计图表数据
      this.purchaseOption.series[0].data = []
      this.purchaseOption.series[1].data = []
      // 仓库发货统计数据
      this.shipmentStatisticsOption.series[0].data = []
      this.shipmentStatisticsOption.series[1].data = []
      this.shipmentStatisticsOption.series[2].data = []
      this.shipmentStatisticsOption.series[3].data = []
      this.shipmentStatisticsOption.series[4].data = []
      this.shipmentStatisticsOption.series[5].data = []
      this.shipmentStatisticsOption.series[6].data = []
      this.shipmentStatisticsOption.series[7].data = []
      const xAxisData = []
      const options = {}
      options['shopee_order_num'] = []
      options['ppxias_order_num'] = []
      options['escrow_amount'] = []
      options['gross_profit'] = []
      options['real_gross_profit'] = []

      options['shot_num'] = []
      options['shot_amount'] = []

      options['shot_return_success_num'] = []
      options['shot_return_success_amount'] = []
      options['return_cancelled_num'] = []
      options['shot_return_cancelled_num'] = []
      options['shot_return_cancelled_amount'] = []
      options['return_num'] = []
      options['return_amount'] = []
      options['return_success_num'] = []
      options['return_success_amount'] = []
      options['shot_return_num'] = []
      options['shot_return_amount'] = []

      options['signing_package_num'] = []
      options['storage_num'] = []
      options['outbound_num'] = []
      options['reject_package_num'] = []
      options['today_no_orde_num'] = []
      options['today_wait_order_num'] = []
      options['today_print_order_fail_num'] = []
      options['other_abnormal'] = []
      options['returned_num'] = []
      const lineData = data ? data.reverse() : []
      this.statisticsDetailData = data || []
      for (let i = 0; i < lineData.length; i++) {
        const item = lineData[i]
        xAxisData.push(item.date)
        options['shopee_order_num'].push(Number(item.order.shopee_order_num))
        options['ppxias_order_num'].push(Number(item.order.ppxias_order_num))
        options['escrow_amount'].push(Number(item.order.escrow_amount))
        options['gross_profit'].push(Number(item.order.gross_profit))
        options['real_gross_profit'].push(Number(item.order.real_gross_profit))

        options['shot_num'].push(Number(item.shot.shot_num))
        options['shot_amount'].push(Number(item.shot.shot_amount))

        options['shot_return_success_num'].push(Number(item.return.shot_return_success_num))
        options['shot_return_success_amount'].push(Number(item.return.shot_return_success_amount))
        options['return_cancelled_num'].push(Number(item.return.return_cancelled_num))
        options['shot_return_cancelled_num'].push(Number(item.return.shot_return_cancelled_num))
        options['shot_return_cancelled_amount'].push(Number(item.return.shot_return_cancelled_amount))
        options['return_num'].push(Number(item.return.return_num))
        options['return_amount'].push(Number(item.return.return_amount))
        options['return_success_num'].push(Number(item.return.return_success_num))
        options['return_success_amount'].push(Number(item.return.return_success_amount))
        options['shot_return_num'].push(Number(item.return.shot_return_num))
        options['shot_return_amount'].push(Number(item.return.shot_return_amount))

        options['signing_package_num'].push(Number(item.warehouse.signing_package_num))
        options['storage_num'].push(Number(item.warehouse.storage_num))
        options['outbound_num'].push(Number(item.warehouse.outbound_num))
        options['reject_package_num'].push(Number(item.warehouse.reject_package_num))
        options['today_no_orde_num'].push(Number(item.warehouse.today_no_orde_num))
        options['today_wait_order_num'].push(Number(item.warehouse.today_wait_order_num))
        options['today_print_order_fail_num'].push(Number(item.warehouse.today_print_order_fail_num))
        options['other_abnormal'].push(Number(item.warehouse.other_abnormal))
        options['returned_num'].push(Number(item.warehouse.returned_num))
      }
      this.saleCountOption.xAxis.data = xAxisData
      this.afterSaleCountOption.xAxis.data = xAxisData
      this.purchaseOption.xAxis.data = xAxisData
      this.shipmentStatisticsOption.xAxis.data = xAxisData
      // 销售统计图表数据
      this.saleCountOption.series[0].data = options['ppxias_order_num']
      this.saleCountOption.series[1].data = options['shopee_order_num']
      this.saleCountOption.series[2].data = options['escrow_amount']
      // 售后统计图表
      this.afterSaleCountOption.series[0].data = options['return_amount']
      this.afterSaleCountOption.series[1].data = options['shot_return_cancelled_num']
      this.afterSaleCountOption.series[2].data = options['shot_return_cancelled_amount']
      this.afterSaleCountOption.series[3].data = options['return_num']
      this.afterSaleCountOption.series[4].data = options['shot_return_success_amount']
      this.afterSaleCountOption.series[5].data = options['shot_return_success_num']
      this.afterSaleCountOption.series[6].data = options['return_cancelled_num']

      //   采购统计图表数据
      this.purchaseOption.series[0].data = options['shot_num']
      this.purchaseOption.series[1].data = options['shot_amount']
      // 仓库发货统计数据
      this.shipmentStatisticsOption.series[0].data = options['signing_package_num']
      this.shipmentStatisticsOption.series[1].data = options['storage_num']
      this.shipmentStatisticsOption.series[2].data = options['outbound_num']
      this.shipmentStatisticsOption.series[3].data = options['reject_package_num']
      this.shipmentStatisticsOption.series[4].data = options['today_no_orde_num']
      this.shipmentStatisticsOption.series[5].data = options['today_wait_order_num']
      this.shipmentStatisticsOption.series[6].data = options['today_print_order_fail_num']
      this.shipmentStatisticsOption.series[7].data = options['other_abnormal']
    }
  }
}
</script>

<style lang="less" scoped>
.DataStatisticsList {
  background: #fff;
  padding: 16px;
  white-space: nowrap;
  overflow-y: auto;
}

//实时概况
.realTimeOverview {
  display: flex;
  align-items: center;
  .search {
    margin-left: 30px;
    .inputbox {
      width: 100px;
    }
    .mar-right{
      margin-right:10px;
    }
    .top,
    .bottom {
      display: flex;
    }
    .top {
      .el-select {
        // width: 200px;
        margin-right: 10px;
      }
    }
    .bottom {
      margin-top: 10px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
      .el-date-editor {
        width: 310px;
        margin-right: 10px;
      }
    }
  }
}
.data {
  margin-top: 16px;
  .dataView {
    display: flex;
    min-width: 1200px;
    /deep/.el-card__body {
      display: flex;
      justify-content: space-between;
      .item-name{
        width: 110px !important;
        display: block;
      }
      // 1px solid #EBEEF5;
    }
    /deep/.el-card {
      width: 100%;
    }
    .item-box {
      flex: 1;
      .item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
        span {
          margin: 0 10px;
        }
        img {
          width: 24px;
          height: 24px;
          cursor: pointer;
        }
      }
    }
  }
}
.chart {
  .title {
    display: flex;
    align-items: baseline;
    .tip {
      color: red;
      font-size: 12px;
    }
  }
  /deep/.checkLegend {
    margin-top: 16px;
    text-align: center;
    &.saleCount,
    &.purchaseCount {
      .el-checkbox {
        &:nth-child(1) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #5ae214 !important;
            background-color: #5ae214 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #5ae214 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #5ae214 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #5ae214 !important;
          }
        }
        &:nth-child(2) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #2389f3 !important;
            background-color: #2389f3 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #2389f3 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #2389f3 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #2389f3 !important;
          }
        }
        &:nth-child(3) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #f32823 !important;
            background-color: #f32823 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #f32823 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #f32823 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #f32823 !important;
          }
        }
      }
    }
    &.afterSaleCount,
    &.shipmentStatistics {
      display: flex;
      flex-wrap: wrap;
      width: 680px;
      margin: auto;
      margin-top: 16px;
      .el-checkbox {
        &:nth-child(1) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #5ae214 !important;
            background-color: #5ae214 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #5ae214 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #5ae214 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #5ae214 !important;
          }
        }
        &:nth-child(2) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #23e9f3 !important;
            background-color: #23e9f3 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #23e9f3 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #23e9f3 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #23e9f3 !important;
          }
        }
        &:nth-child(3) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #919494 !important;
            background-color: #919494 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #919494 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #919494 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #919494 !important;
          }
        }
        &:nth-child(4) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #bba433 !important;
            background-color: #bba433 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #bba433 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #bba433 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #bba433 !important;
          }
        }
        &:nth-child(5) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #a633bb !important;
            background-color: #a633bb !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #a633bb !important;
          }
          .el-checkbox__inner:hover {
            border-color: #a633bb !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #a633bb !important;
          }
        }
        &:nth-child(6) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #333dbb !important;
            background-color: #333dbb !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #333dbb !important;
          }
          .el-checkbox__inner:hover {
            border-color: #333dbb !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #333dbb !important;
          }
        }
        &:nth-child(7) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #d41a1a !important;
            background-color: #d41a1a !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #d41a1a !important;
          }
          .el-checkbox__inner:hover {
            border-color: #d41a1a !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #d41a1a !important;
          }
        }
        &:nth-child(8) {
          .el-checkbox__input.is-checked .el-checkbox__inner,
          .el-checkbox__input.is-indeterminate .el-checkbox__inner {
            border-color: #5f4009 !important;
            background-color: #5f4009 !important;
          }
          .el-checkbox__input.is-checked + .el-checkbox__label,
          .el-checkbox__input + .el-checkbox__label {
            color: #5f4009 !important;
          }
          .el-checkbox__inner:hover {
            border-color: #5f4009 !important;
          }
          .el-checkbox__input.is-focus .el-checkbox__inner {
            border-color: #5f4009 !important;
          }
        }
      }
    }
  }
  .chartTop,
  .chartBottom {
    display: flex;
    justify-content: space-between;
    margin-top: 16px;
    .leftCahrt,
    .rightChart {
      min-width: 800px;
      height: 450px;
      border: 1px solid #ececec;
      border-radius: 10px;
      position: relative;
      h6 {
        text-align: center;
      }
      .tit {
        width: 65px;
        display: block;
        background: #fff;
        text-align: center;
        position: absolute;
        top: -10px;
        left: 10px;
      }
    }
  }
}
</style>
