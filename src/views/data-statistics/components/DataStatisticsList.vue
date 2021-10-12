<template>
  <div class="DataStatisticsList">
    <!--实时概况-->
    <div class="realTimeOverview">
      <div class="title">
        <h3>实时概况</h3>
      </div>
      <div class="search">
        <div class="top">
          <div class="switchStore">
            <span>切换店铺：</span>
            <el-select
              v-model="form.store"
              size="mini"
            >
              <el-option
                label="全部"
                value="all"
              />
              <el-option
                v-for="item in storeData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="form.accountNumber"
              size="mini"
              multiple
              collapse-tags
            >
              <el-option
                label="全部"
                value="all"
              />
              <el-option
                v-for="item in accountNumberData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-select
              v-model="form.site"
              size="mini"
              multiple
              collapse-tags
            >
              <el-option
                label="全部"
                value="all"
              />
              <el-option
                v-for="item in siteData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
          <div class="historyChart">
            <span>历史图表：</span>
            <el-select
              v-model="form.history"
              size="mini"
            >
              <el-option
                v-for="item in historyData"
                :key="item.id"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div>
        </div>
        <div class="bottom">
          <div>
            <span>实时概况：</span>
            <el-date-picker
              v-model="form.dateTime"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              size="mini"
            />
          </div>
          <div>
            <el-button type="primary" size="mini" @click="searchHandle">查询</el-button>
            <el-button type="primary" size="mini">查看列表数据</el-button>
            <el-button type="primary" size="mini" plain>导出</el-button>
          </div>
        </div>
      </div>
    </div>
    <div class="data">
      <div class="topData">
        <el-card class="box-card topLeft" shadow="never">
          <div class="left">
            <div class="item">
              <img :src="transactionAmountPng">
              <span>成交金额（元）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.totalDealAmount }}</span>
            </div>
            <div class="item">
              <img :src="orderNumberPng">
              <span>shopee订单数（单）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.platformOrderCount }}</span>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <img :src="cancelOrderPng">
              <span>已取消订金额（元）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.totalCanceledEscrowAmount }}</span>
            </div>
            <div class="item">
              <img :src="alreadyCancelPng">
              <span>已取消订单数（单）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.platformCancelOrderCount }}</span>
            </div>
          </div>
        </el-card>
        <el-card class="box-card topCenter" shadow="never">
          <div class="item">
            <img :src="cancelPng">
            <span>订单即将取消（单）</span>
            <img :src="questionPng">：
            <span>{{ orderListData.shipDelayingNum }}</span>
          </div>
          <div class="item">
            <img :src="warehouseDeliveryPng">
            <span>仓库发货订单数（单）</span>
            <img :src="questionPng">：
            <span>{{ orderListData.totalOutboundNum }}</span>
          </div>
        </el-card>
        <el-card class="box-card topRight" shadow="never">
          <div class="item">
            <img :src="noOrderPng">
            <span>匹配不到订单数（单）</span>
            <img :src="questionPng">：
            <span>{{ orderListData.noOrderNum }}</span>
          </div>
          <div class="item">
            <img :src="printFailPng">
            <span>页面打印失败数（单）</span>
            <img :src="questionPng">：
            <span>{{ orderListData.printOrderFailNum }}</span>
          </div>
        </el-card>
      </div>
      <div class="bottomData">
        <div class="bottomLeft">
          <div class="left">
            <div class="item">
              <img :src="purchasePng">
              <span>已采购单数（单）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.totalCompletedShotNum }}</span>
            </div>
            <div class="item">
              <img :src="waitPurchasePng">
              <span>待采购单数（单）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.waitShotNum }}</span>
            </div>
          </div>
          <div class="right">
            <div class="item">
              <img :src="purchasedPng">
              <span>已采购金额（元）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.totalCompletedShotAmount }}</span>
            </div>
          </div>
        </div>

        <div class="bottomRight">
          <div class="left">
            <div class="item">
              <img :src="outMoneyPng">
              <span>仓库出库金额（元）</span>
              <img :src="questionPng">：
              <span>{{ orderListData.totalOutStockAmount }}</span>
            </div>
          </div>
        </div>
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
          <div class="checkLegend saleCount">
            <el-checkbox v-model="systemOrderChecked">系统订单数量</el-checkbox>
            <el-checkbox v-model="shopeeOrderChecked">虾皮订单数量</el-checkbox>
            <el-checkbox v-model="orderIncomeChecked">订单收入</el-checkbox>
          </div>

          <Echart id="saleCountChart" width="100%" height="calc(100% - 60px)" :option="saleCountOption" />
          <h6>统计日期</h6>
        </div>
        <div class="rightChart">
          <span class="tit">售后统计</span>
          <div class="checkLegend afterSaleCount">
            <el-checkbox v-model="addSaleMoney">新增售后金额</el-checkbox>
            <el-checkbox v-model="orderCancelAdd">订单已取消新增采购单数</el-checkbox>
            <el-checkbox v-model="orderCancelAddMoney">订单已取消新增采购金额</el-checkbox>
            <el-checkbox v-model="addSale">新增售后单数</el-checkbox>
            <el-checkbox v-model="saleRefundMoney">已采购售后退款成功金额</el-checkbox>
            <el-checkbox v-model="saleRefund">已采购售后退款成功数</el-checkbox>
            <el-checkbox v-model="orderCance">订单已取消单数</el-checkbox>
          </div>
          <Echart id="afterSaleChart" width="100%" height="calc(100% - 80px)" :option="afterSaleCountOption" />
          <h6>统计日期</h6>
        </div>
      </div>
      <div class="chartBottom">
        <div class="leftCahrt">
          <span class="tit">采购统计</span>

          <div class="checkLegend purchaseCount">
            <el-checkbox v-model="purchaseNumber">采购数量</el-checkbox>
            <el-checkbox v-model="purchaseMoney">采购金额</el-checkbox>
          </div>
          <Echart id="purchaseChart" width="100%" height="calc(100% - 60px)" :option="purchaseOption" />
          <h6>统计日期</h6>
        </div>
        <div class="rightChart">
          <span class="tit">仓库发货统计</span>

          <div class="checkLegend shipmentStatistics">
            <el-checkbox v-model="signFor">签收</el-checkbox>
            <el-checkbox v-model="warehousing">入库</el-checkbox>
            <el-checkbox v-model="exWarehouse">出库</el-checkbox>
            <el-checkbox v-model="rejection">拒收</el-checkbox>
            <el-checkbox v-model="cannotMatch">匹配不到订单</el-checkbox>
            <el-checkbox v-model="waitSonOrder">等待子订单</el-checkbox>
            <el-checkbox v-model="pagePrintFail">页面打印失败</el-checkbox>
            <el-checkbox v-model="otherException">其它异常</el-checkbox>
          </div>
          <Echart id="shipmentStatisticsChart" width="100%" height="calc(100% - 60px)" :option="shipmentStatisticsOption" />
          <h6>统计日期</h6>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Echart from '../components/chart.vue'
export default {
  components: {
    Echart
  },
  data() {
    return {
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
      // 查询数据
      form: {
        store: '', // 店铺
        accountNumber: [], // 账号
        site: [], // 站点
        history: '', // 历史图表时间
        dateTime: ''// 实时概况时间
      },
      // 店铺select
      storeData: [{
        id: 1,
        value: 1,
        label: '马来站'
      }, {
        id: 2,
        value: 2,
        label: '台湾站'
      }, {
        id: 3,
        value: 3,
        label: '菲律宾站'
      }, {
        id: 4,
        value: 4,
        label: '泰国站'
      }, {
        id: 5,
        value: 5,
        label: '印尼站'
      }, {
        id: 6,
        value: 6,
        label: '新加坡站'
      }, {
        id: 7,
        value: 7,
        label: '越南站'
      }, {
        id: 8,
        value: 8,
        label: '巴西站'
      }],
      // 账号select
      accountNumberData: [
        {
          id: 1,
          value: 1,
          label: '裕琳'
        }, {
          id: 2,
          value: 2,
          label: '小源'
        }, {
          id: 3,
          value: 3,
          label: '大王'
        },
        {
          id: 4,
          value: 4,
          label: '业星'
        }, {
          id: 5,
          value: 5,
          label: '亚鑫'
        }, {
          id: 6,
          value: 6,
          label: '1111'
        }, {
          id: 7,
          value: 7,
          label: '胡亚鑫测试号'
        }, {
          id: 8,
          value: 8,
          label: '晨曦'
        }, {
          id: 9,
          value: 9,
          label: '程曦'
        }, {
          id: 10,
          value: 10,
          label: '测试'
        }, {
          id: 11,
          value: 11,
          label: '菲菲测试'
        }
      ],
      // 站点select
      siteData: [
        {
          id: 1,
          value: 1,
          label: 'TH-123'
        }, {
          id: 2,
          value: 2,
          label: 'MY-11'
        }, {
          id: 3,
          value: 3,
          label: 'TW-12'
        }
      ],
      // 历史select
      historyData: [
        {
          id: 1,
          value: 1,
          label: '近7天'
        }, {
          id: 2,
          value: 2,
          label: '近30天'
        },
        {
          id: 3,
          value: 3,
          label: '近60天'
        }
      ],
      systemOrderChecked: false,
      shopeeOrderChecked: false,
      orderIncomeChecked: false,
      addSaleMoney: false,
      orderCancelAdd: false,
      orderCancelAddMoney: false,
      addSale: false,
      saleRefundMoney: false,
      saleRefund: false,
      orderCance: false,
      signFor: false,
      warehousing: false,
      exWarehouse: false,
      rejection: false,
      cannotMatch: false,
      waitSonOrder: false,
      pagePrintFail: false,
      otherException: false,
      purchaseNumber: false,
      purchaseMoney: false,
      // 销售统计图表数据
      saleCountOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20px',
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
          type: 'value'
        },
        series: [
          {
            id: 'systemOrderNumber',
            name: '系统订单数量',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            }
          },
          {
            id: 'shopeeOrderNumber',
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
            }
          }
        ]
      },

      // 售后统计图标数据
      afterSaleCountOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20px',
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
          type: 'value'
        },
        series: [
          {
            name: '新增售后金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5ae214'
            }
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
            }
          },
          {
            name: '新增售后单数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#bba433'
            }
          }, {
            name: '已采购售后退款成功金额',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#a633bb'
            }
          }, {
            name: '已采购售后退款成功数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#333dbb'
            }
          }, {
            name: '订单已取消单数',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#d41a1a'
            }
          }
        ]
      },

      // 采购统计图标数据
      purchaseOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20px',
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
          type: 'value'
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
            }
          }
        ]
      },
      // 仓库发货统计
      shipmentStatisticsOption: {
        tooltip: {
          trigger: 'axis'
        },
        grid: {
          top: '20px',
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
          type: 'value'
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
          }, {
            name: '匹配不到订单',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#a633bb'
            }
          }, {
            name: '等待子订单',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#333dbb'
            }
          }, {
            name: '页面打印失败',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#d41a1a'
            }
          }, {
            name: '其它异常',
            type: 'line',
            data: [],
            itemStyle: {
              color: '#5f4009'
            }
          }
        ]
      }
    }
  },
  mounted() {
    this.getOrderListData()
    this.getChartData()
  },
  methods: {
    // 查询
    async searchHandle() {
      console.log()
      if (this.form.overviewTime) {
        const startTiem = this.formatSearch(this.form.overviewTime[0])
        const endTiem = this.formatSearch(this.form.overviewTime[1])
        this.form.overviewTime = `${startTiem}/${endTiem}`
      }
    },
    // 格式化搜索时间
    formatSearch(data) {
      const time = new Date(data)
      // 分别获取年月日时分秒
      const year = time.getFullYear()
      const month = ((time.getMonth() + 1) + '').padStart(2, 0)
      const day = (time.getDate() + '').padStart(2, 0)
      const hours = (time.getHours() + '').padStart(2, 0)
      const minutes = (time.getMinutes() + '').padStart(2, 0)
      const seconds = (time.getSeconds() + '').padStart(2, 0)
      const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      return result
    },
    // 获取订单列表数据
    async getOrderListData() {
      const startTime = this.formatSearch(new Date().getTime())
      // 当前时间
      const currentDate = new Date()
      // 向后推59天
      const endTiem = this.formatSearch(currentDate.setDate(currentDate.getDate() + 59))
      const dateTime = `${startTime}/${endTiem}`
      const result = await this.$api.getDrderBasicStatV2({ dateTime: dateTime })
      if (result.data.code === '200') {
        this.orderListData = result.data.data
      } else {
        this.$message.error(result.data.message)
      }
    },
    // 获取图表数据
    async getChartData() {
      const result = await this.$api.getDataStat()
      await this.formatChartsOption(result.data)
    },
    // 将图表数据拼接到echarts参数种
    formatChartsOption(data) {
      console.log(data)
      const xAxisData = Object.keys(data).reverse()
      this.saleCountOption.xAxis.data = xAxisData
      this.afterSaleCountOption.xAxis.data = xAxisData
      this.purchaseOption.xAxis.data = xAxisData
      this.shipmentStatisticsOption.xAxis.data = xAxisData
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
      this.afterSaleCountOption.series[0].data = []
      this.afterSaleCountOption.series[1].data = []
      this.afterSaleCountOption.series[2].data = []
      // 仓库发货统计数据
      this.shipmentStatisticsOption.series[0].data = []
      this.shipmentStatisticsOption.series[1].data = []
      this.shipmentStatisticsOption.series[2].data = []
      this.shipmentStatisticsOption.series[3].data = []
      this.shipmentStatisticsOption.series[4].data = []
      this.shipmentStatisticsOption.series[5].data = []
      this.shipmentStatisticsOption.series[6].data = []
      this.shipmentStatisticsOption.series[7].data = []
      for (const key in data) {
        this.saleCountOption.series[0].data.push(data[key].order.ppxias_order_num)
        this.saleCountOption.series[1].data.push(data[key].order.shopee_order_num)
        this.saleCountOption.series[2].data.push(data[key].order.escrow_amount)

        this.afterSaleCountOption.series[0].data.push(data[key].return.return_amount)
        this.afterSaleCountOption.series[1].data.push(data[key].return.shot_return_cancelled_num)
        this.afterSaleCountOption.series[2].data.push(data[key].return.shot_return_cancelled_amount)
        this.afterSaleCountOption.series[3].data.push(data[key].return.return_num)
        this.afterSaleCountOption.series[4].data.push(data[key].return.shot_return_success_amount)
        this.afterSaleCountOption.series[5].data.push(data[key].return.shot_return_success_num)
        this.afterSaleCountOption.series[6].data.push(data[key].return.return_cancelled_num)

        this.afterSaleCountOption.series[0].data.push(data[key].shot.shot_num)
        this.afterSaleCountOption.series[1].data.push(data[key].shot.shot_amount)

        this.shipmentStatisticsOption.series[0].data.push(data[key].warehouse.signing_package_num)
        this.shipmentStatisticsOption.series[1].data.push(data[key].warehouse.storage_num)
        this.shipmentStatisticsOption.series[2].data.push(data[key].warehouse.outbound_num)
        this.shipmentStatisticsOption.series[3].data.push(data[key].warehouse.reject_package_num)
        this.shipmentStatisticsOption.series[4].data.push(data[key].warehouse.today_no_orde_num)
        this.shipmentStatisticsOption.series[5].data.push(data[key].warehouse.today_wait_order_num)
        this.shipmentStatisticsOption.series[6].data.push(data[key].warehouse.today_print_order_fail_num)
        this.shipmentStatisticsOption.series[7].data.push(data[key].warehouse.other_abnormal)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.DataStatisticsList{
    background: #fff;
    padding: 16px;
    white-space: nowrap;
    overflow-y: auto;
}
//实时概况
.realTimeOverview{
    display: flex;
    align-items: center;
    .search{
        margin-left: 30px;
        .top,.bottom{
            display: flex;

        }
        .top{
            .el-select{
                width: 150px;
                margin-right: 10px;
            }
        }
        .bottom{
            margin-top: 10px;
            .el-date-editor{
                width: 310px;
                margin-right: 10px;
            }
        }
    }
}
.data{
    margin-top: 16px;
    .item{
        display: flex;
        align-items: center;
        span{
            margin: 0 10px;
        }
        img{
            width: 24px;
            height: 24px;
        }
    }
    .topData,.bottomData{
        display: flex;
        .topLeft,.topCenter,.topRight,.bottomLeft,.bottomRight{
                min-width: 400px;
                .item{
                    &:last-child{
                        margin-top: 16px;
                    }
                }
        }
        .topCenter{
            margin: 0 32px;
        }
        .topLeft,.bottomLeft{
            min-width: 760px;
            /deep/.el-card__body{
                display: flex;
                justify-content: space-between;
            }
        }
        .topLeft{
            .left,.right{
                flex: 1;
            }
        }

    }
    .bottomData{
        margin-top: 16px;
        .bottomLeft{
            width: 760px;
            padding: 20px;
            padding-top: 0;
            box-sizing: border-box;
            display: flex;
            justify-content: space-between;
            .left,.right{
                flex: 1;
            }
            .right{
                .item{
                        &:last-child{
                            margin-top: 0;
                        }
                }
            }
        }
        .bottomRight{
            min-width: 808px;
            padding-left: 52px;
            .item{
                &:last-child{
                    margin-top: 0;
                }
            }
        }
    }
}
.chart{
    .title{
        display: flex;
        align-items: baseline;
        .tip{
            color: red;
            font-size: 12px;
        }
    }
    /deep/.checkLegend{
        margin-top: 16px;
        text-align: center;
        &.saleCount,&.purchaseCount{
            .el-checkbox{
                &:nth-child(1){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #5ae214 !important;
                        background-color: #5ae214 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #5ae214 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #5ae214 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #5ae214 !important;
                    }
                }
                &:nth-child(2){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #2389f3 !important;
                        background-color: #2389f3 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #2389f3 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #2389f3 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #2389f3 !important;
                    }
                }
                &:nth-child(3){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #F32823 !important;
                        background-color: #F32823 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #F32823 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #F32823 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #F32823 !important;
                    }
                }
            }
        }
        &.afterSaleCount,&.shipmentStatistics{
            display: flex;
            flex-wrap: wrap;
            width: 680px;
            margin: auto;
            margin-top: 16px;
            .el-checkbox{
                &:nth-child(1){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #5ae214 !important;
                        background-color: #5ae214 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #5ae214 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #5ae214 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #5ae214 !important;
                    }
                }
                &:nth-child(2){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #23e9f3 !important;
                        background-color: #23e9f3 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #23e9f3 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #23e9f3 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #23e9f3 !important;
                    }
                }
                &:nth-child(3){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #919494 !important;
                        background-color: #919494 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #919494 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #919494 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #919494 !important;
                    }
                }
                &:nth-child(4){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #bba433 !important;
                        background-color: #bba433 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #bba433 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #bba433 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #bba433 !important;
                    }
                }
                &:nth-child(5){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #a633bb !important;
                        background-color: #a633bb !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #a633bb !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #a633bb !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #a633bb !important;
                    }
                }
                &:nth-child(6){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #333dbb !important;
                        background-color: #333dbb !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #333dbb !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #333dbb !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #333dbb !important;
                    }
                }
                &:nth-child(7){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #d41a1a !important;
                        background-color: #d41a1a !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #d41a1a !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #d41a1a !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #d41a1a !important;
                    }
                }
                &:nth-child(8){
                    .el-checkbox__input.is-checked .el-checkbox__inner,
                    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
                        border-color: #5f4009 !important;
                        background-color: #5f4009 !important;
                    }
                    .el-checkbox__input.is-checked+.el-checkbox__label,.el-checkbox__input+.el-checkbox__label{
                            color: #5f4009 !important;
                    }
                    .el-checkbox__inner:hover{
                        border-color: #5f4009 !important;
                    }
                    .el-checkbox__input.is-focus .el-checkbox__inner {
                        border-color: #5f4009 !important;
                    }
                }
            }
        }
    }
    .chartTop,.chartBottom{
        display: flex;
        justify-content: space-between;
        margin-top: 16px;
        .leftCahrt,.rightChart{
            min-width: 800px;
            height: 450px;
            border: 1px solid #ececec;
            border-radius: 10px;
            position: relative;
            h6{
                text-align: center;
            }
            .tit{
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
