<template>
  <el-row class="contaniner">
    <el-col class="left" :span="3">
      <mallGroup :get-data="getMallStatistics" @getGroupId="getGroupId" />
    </el-col>
    <el-col class="right" :span="21">
      <el-row class="header">
        <el-col class="header-top">
          <ul>
            <li>
              <span>站点：</span>
              <el-select v-model="form.site" class="unnormal" size="mini" filterable>
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺ID：</span>
              <el-input v-model="form.mallId" class="shopId" size="mini" clearable oninput="value=value.replace(/\s+/g,'')" />
            </li>
            <li>
              <el-button
                type="primary"
                size="mini"
                @click="
                  page = 1
                  getMallStatistics()"
              >查询</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('syncMallData')">同步店铺指标数据</el-button>
              <el-button type="primary" size="mini" @click="exportSearch()">导出数据</el-button>
            </li>
            <li>
              <el-progress v-show="isShowProgress" style="width: 230px" :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" />
            </li>
            <!-- <li>
              <span>订单完成指标：</span>
              <el-select v-model="form.orderIndex"  size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>买家满意指标：</span>
              <el-select v-model="form.buyerIndex"  size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>流程服务指标：</span>
              <el-select v-model="form.serviceIndex"  size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li> -->
          </ul>
        </el-col>
        <el-col class="header-top">
          <ul>
            <!-- <li>
              <span>评分等级：</span>
              <el-select v-model="form.rating"  size="mini" filterable>
                <el-option v-for="(item, index) in ratingList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>违反上架指标：</span>
              <el-select v-model="form.violationPutIndex"  size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺ID：</span>
              <el-input v-model="form.mallId" class="shopId"  size="mini" />
            </li>
            <li>
              <el-button type="primary" size="mini" @click="getMallStatistics()">查询</el-button>
              <el-button type="primary" size="mini">同步店铺指标数据</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('exportSearch')">导出数据</el-button>
            </li>-->
          </ul>
        </el-col>
      </el-row>
      <el-row class="article">
        <u-table
          ref="plTable"
          v-loading="isLoading"
          use-virtual
          :height="height"
          :row-height="rowHeight"
          :data-changes-scroll-top="false"
          :border="false"
          @table-body-scroll="tableScroll"
          @selection-change="handleSelectionChange"
        >
          <u-table-column align="center" type="selection" width="50" />
          <u-table-column align="center" type="index" label="序列号" width="80" />
          <u-table-column align="center" prop="country" label="站点">
            <template slot-scope="{ row }">
              {{ row.country | chineseSite }}
            </template>
          </u-table-column>
          <u-table-column align="center" prop="platform_mall_id" label="店铺ID" min-width="120" />
          <u-table-column align="center" label="店铺名称" min-width="130">
            <template slot-scope="{ row }">
              {{ row.mall_alias_name ? row.mall_alias_name : row.platform_mall_name }}
            </template>
          </u-table-column>
          <u-table-column align="center" label="操作状态" min-width="100">
            <template slot-scope="{ row }">
              <span :style="row.color &&('color:'+row.color)">{{ row.status }}</span>
            </template>
          </u-table-column>
          <u-table-column align="center" label="本季度计分" min-width="100">
            <template slot-scope="{ row }">
              {{ row.order_service_indicators && row.order_service_indicators.SumPoints ? row.order_service_indicators.SumPoints : '-' }}
            </template>
          </u-table-column>
          <u-table-column align="center" label="买家满意度" min-width="100">
            <template slot-scope="{ row }">
              {{ row.order_service_indicators && row.order_service_indicators.BuyerSatisfaction ? row.order_service_indicators.BuyerSatisfaction : '-' }}
            </template>
          </u-table-column>
          <u-table-column align="center" label="上期买家满意度" min-width="120">
            <template slot-scope="{ row }">
              {{ row.order_service_indicators && row.order_service_indicators.WeekBuyerSatisfaction ? row.order_service_indicators.WeekBuyerSatisfaction : '-' }}
            </template>
          </u-table-column>
          <u-table-column align="center" label="买家满意度计分" min-width="120">
            <template slot-scope="{ row }">
              {{ row.order_service_indicators && row.order_service_indicators.BuyerSatisfactionPoint ? row.order_service_indicators.BuyerSatisfactionPoint : '-' }}
            </template>
          </u-table-column>
          <u-table-column align="center" label="订单完成率">
            <u-table-column align="center" label="未完成率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.UnOrderRate ? row.order_service_indicators.UnOrderRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="取消率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.CancellOrderRate ? row.order_service_indicators.CancellOrderRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ReturnOrRefundRate ? row.order_service_indicators.ReturnOrRefundRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.OverTimeDeliveryRate ? row.order_service_indicators.OverTimeDeliveryRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="准备时间">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PrepareTime ? row.order_service_indicators.PrepareTime : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="上期订单完成率">
            <u-table-column align="center" label="未完成率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekUnOrderRate ? row.order_service_indicators.WeekUnOrderRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="取消率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekCancellOrderRate ? row.order_service_indicators.WeekCancellOrderRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekReturnOrRefundRate ? row.order_service_indicators.WeekReturnOrRefundRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekOverTimeDeliveryRate ? row.order_service_indicators.WeekOverTimeDeliveryRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="准备时间">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekPrepareTime ? row.order_service_indicators.WeekPrepareTime : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="订单未完成率计分">
            <u-table-column align="center" label="未完成率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.UnOrderRatePoint ? row.order_service_indicators.UnOrderRatePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="取消率">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.CancellOrderRatePoint ? row.order_service_indicators.CancellOrderRatePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ReturnOrRefundRatePoint ? row.order_service_indicators.ReturnOrRefundRatePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.OverTimeDeliveryRatePoint ? row.order_service_indicators.OverTimeDeliveryRatePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="准备时间">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PrepareTimePoint ? row.order_service_indicators.PrepareTimePoint : '-' }}
              </template>
            </u-table-column>
          </u-table-column>

          <u-table-column align="center" label="违反上架规范">
            <u-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ViolatingGoods ? row.order_service_indicators.ViolatingGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="垃圾商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.JunkGoods ? row.order_service_indicators.JunkGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.CounterfeitGoods ? row.order_service_indicators.CounterfeitGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违禁商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ProhibitedGoods ? row.order_service_indicators.ProhibitedGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的%" min-width="120">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PreOrderedGoodsRate ? row.order_service_indicators.PreOrderedGoodsRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PreOrderedOverTarget ? row.order_service_indicators.PreOrderedOverTarget : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.OtherViolatingGoods ? row.order_service_indicators.OtherViolatingGoods : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="上期违反上架规范">
            <u-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekViolatingGoods ? row.order_service_indicators.WeekViolatingGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="垃圾商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekJunkGoods ? row.order_service_indicators.WeekJunkGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekCounterfeitGoods ? row.order_service_indicators.WeekCounterfeitGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违禁商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekProhibitedGoods ? row.order_service_indicators.WeekProhibitedGoods : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的%" min-width="120">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekPreOrderedGoodsRate ? row.order_service_indicators.WeekPreOrderedGoodsRate : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekPreOrderedOverTarget ? row.order_service_indicators.WeekPreOrderedOverTarget : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekOtherViolatingGoods ? row.order_service_indicators.WeekOtherViolatingGoods : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="违反上架规范计分">
            <u-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ViolatingGoodsPoint ? row.order_service_indicators.ViolatingGoodsPoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="垃圾商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.JunkGoodsPoint ? row.order_service_indicators.JunkGoodsPoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.CounterfeitGoodsPoint ? row.order_service_indicators.CounterfeitGoodsPoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违禁商品">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ProhibitedGoodsPoint ? row.order_service_indicators.ProhibitedGoodsPoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的%" min-width="110">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PreOrderedGoodsRatePoint ? row.order_service_indicators.PreOrderedGoodsRatePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.PreOrderedOverTargetPoint ? row.order_service_indicators.PreOrderedOverTargetPoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.OtherViolatingGoodsPoint ? row.order_service_indicators.OtherViolatingGoodsPoint : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="客服">
            <u-table-column align="center" label="聊天回应">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ChatResponse ? row.order_service_indicators.ChatResponse : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="回应速度">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ResponseSpeed ? row.order_service_indicators.ResponseSpeed : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="上期客服">
            <u-table-column align="center" label="聊天回应">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekChatResponse ? row.order_service_indicators.WeekChatResponse : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="回应速度">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.WeekResponseSpeed ? row.order_service_indicators.WeekResponseSpeed : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
          <u-table-column align="center" label="客服计分">
            <u-table-column align="center" label="聊天回应">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ChatResponsePoint ? row.order_service_indicators.ChatResponsePoint : '-' }}
              </template>
            </u-table-column>
            <u-table-column align="center" label="回应速度">
              <template slot-scope="{ row }">
                {{ row.order_service_indicators && row.order_service_indicators.ResponseSpeedPoint ? row.order_service_indicators.ResponseSpeedPoint : '-' }}
              </template>
            </u-table-column>
          </u-table-column>
        </u-table>
        <div class="pagination">
          <el-pagination
            background
            :current-page="page"
            :page-sizes="[200, 700, 1000, 2000]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-row>
    </el-col>
  </el-row>
</template>

<script>
import mallGroup from '@/components/mall-group.vue'
import { exportExcelDataCommon, batchOperation } from '@/util/util'
import { MallTargetApi } from '../../../module-api/mall-manager-api/mall-target-api'
export default {
  components: {
    mallGroup
  },
  data() {
    return {
      page: 1,
      total: 0,
      pageSize: 200,
      height: 680,
      rowHeight: 50,
      isLoading: false,
      tableData: [], // 表格数据
      multipleSelection: [],
      percentage: 0, // 进度条数据
      isShowProgress: false,
      countries: this.$filters.countries_option,
      mallTargetApiInstance: new MallTargetApi(this),
      form: {
        site: 0, // 站点
        orderIndex: '0', // 订单完成指标
        buyerIndex: '0', // 买家满意指标
        serviceIndex: '0', // 流程服务指标
        rating: '0', // 评分等级
        violationPutIndex: '0', // 违反上架指标
        mallId: ''// 店铺ID
      },
      formIndexList: [
        { value: '0', label: '全部' },
        { value: '1', label: '正常' },
        { value: '2', label: '异常' }
      ],
      ratingList: [
        { value: '0', label: '全部' },
        { value: '1', label: '佳' },
        { value: '2', label: '差' },
        { value: '3', label: '危险' }
      ],
      addPercentage: 0
    }
  },
  mounted() {
    this.getMallStatistics()
  },
  methods: {
    // 同步店铺指标数据
    async syncMallData(data) {
      if (!data) {
        return this.$message('暂无同步数据')
      }
      this.isShowProgress = true
      this.percentage = 0
      const len = data.length
      this.addPercentage = 100 / len
      const res = await batchOperation(data, this.syncMall)
      console.log(1, '完成', res)
      this.percentage = 100
    },
    // 店铺同步
    async syncMall(item, count = { count: 1 }) {
      try {
        console.log('item - count', item, count)
        this.$set(item, 'status', '开始同步')
        this.$set(item, 'color', '')
        const res1 = this.mallTargetApiInstance.theQuarterPoint(item, '/api/v2/shops/sellerCenter/ongoingPoints')
        const res2 = this.mallTargetApiInstance.getShopPerformance(item, '/api/v2/shops/sellerCenter/shopPerformance')
        const res3 = await Promise.all([res1, res2])
        const params = {
          'mallDatas': '',
          'sysMallId': item.id
        }
        if (res3[0].code === 200 && res3[1].code === 200) {
          params['violationScore'] = res3[0].data.totalPoints
          const des = res3[1].data
          item.order_service_indicators['BuyerSatisfaction'] = des.buyer_satisfaction ? parseInt(Number(des.buyer_satisfaction) / 1000000) : ''
          item.order_service_indicators['WeekBuyerSatisfaction'] = des.buyer_satisfaction_last ? parseInt(Number(des.buyer_satisfaction_last) / 1000000) : '' // 上期买家满意度
          item.order_service_indicators['BuyerSatisfactionPoint'] = des.BuyerSatisfactionPoint // 买家满意度计分
          item.order_service_indicators['UnOrderRate'] = des.non_performance_rate ? des.non_performance_rate + '%' : 0 // 订单未完成率
          item.order_service_indicators['CancellOrderRate'] = des.cancel_rate ? des.cancel_rate + '%' : 0// 订单取消率
          item.order_service_indicators['ReturnOrRefundRate'] = des.return_rate ? (Number(des.return_rate) / 10000).toFixed(2) + '%' : '' // 退货/退款率
          item.order_service_indicators['OverTimeDeliveryRate'] = des.delay_rate // 逾期出货率
          item.order_service_indicators['PrepareTime'] = des.ready_time ? (Number(des.ready_time) / 3600 / 24).toFixed(2) + '天' : '' // 订单准备时间
          item.order_service_indicators['WeekUnOrderRate'] = des.non_performance_rate_last ? des.non_performance_rate_last + '%' : '' // 上期订单未完成率
          item.order_service_indicators['WeekCancellOrderRate'] = des.cancel_rate_last ? des.cancel_rate_last + '%' : ''// 上期订单取消率
          item.order_service_indicators['WeekReturnOrRefundRate'] = des.return_rate_last ? (Number(des.return_rate_last) / 10000).toFixed(2) + '%' : '' // 上期订单退货/退款率
          item.order_service_indicators['WeekOverTimeDeliveryRate'] = des.delay_rate_last // 上期订单逾期出货率
          item.order_service_indicators['WeekPrepareTime'] = des.ready_time_last ? (Number(des.ready_time_last) / 3600 / 24).toFixed(2) + '天' : ''// 上期订单准备时间
          item.order_service_indicators['UnOrderRatePoint'] = des.UnOrderRatePoint ? des.UnOrderRatePoint + '%' : 0 // 订单未完成率计分
          item.order_service_indicators['CancellOrderRatePoint'] = des.CancellOrderRatePoint ? des.CancellOrderRatePoint + '%' : 0// 订单取消率计分
          item.order_service_indicators['ReturnOrRefundRatePoint'] = des.ReturnOrRefundRatePoint ? des.ReturnOrRefundRatePoint + '%' : 0// 订单退货/退款率计分
          item.order_service_indicators['OverTimeDeliveryRatePoint'] = des.OverTimeDeliveryRatePoint ? des.OverTimeDeliveryRatePoint + '%' : 0// 订单逾期出货率计分
          item.order_service_indicators['PrepareTimePoint'] = des.PrepareTimePoint // 订单准备时间计分
          item.order_service_indicators['ViolatingGoods'] = des.serious_listing_violations // 严重违规商品数
          item.order_service_indicators['JunkGoods'] = des.email_num // 垃圾商品数
          item.order_service_indicators['CounterfeitGoods'] = des.knowledge_Protect // 仿冒品或侵犯知识产权商品数
          item.order_service_indicators['ProhibitedGoods'] = des.lawless_goods // 违禁商品数
          item.order_service_indicators['PreOrderedGoodsRate'] = des.pre_order_list ? (Number(des.pre_order_list) / 10000).toFixed(2) + '%' : '' // 预购商品的%

          item.order_service_indicators['PreOrderedOverTarget'] = des.violation_days // 预购商品的天数%超过目标
          item.order_service_indicators['OtherViolatingGoods'] = des.other_error // 违反其它上架规范数
          item.order_service_indicators['WeekViolatingGoods'] = des.serious_listing_violations_last // 上期严重违规商品数
          item.order_service_indicators['WeekJunkGoods'] = des.email_num_last // 上期垃圾商品数
          item.order_service_indicators['WeekCounterfeitGoods'] = des.knowledge_Protect_last // 上期仿冒品或侵犯知识产权商品数
          item.order_service_indicators['WeekProhibitedGoods'] = des.lawless_goods_last // 上期违禁商品数
          item.order_service_indicators['WeekPreOrderedGoodsRate'] = des.pre_order_list_last ? (Number(des.pre_order_list_last) / 10000).toFixed(2) + '%' : ''// 上期预购商品的%
          item.order_service_indicators['WeekPreOrderedOverTarget'] = des.violation_days_last// 上期预购商品的天数%超过目标
          item.order_service_indicators['WeekOtherViolatingGoods'] = des.other_error_last // 上期违反其它上架规范数
          item.order_service_indicators['ViolatingGoodsPoint'] = des.ViolatingGoodsPoint // 严重违规商品数计分
          item.order_service_indicators['JunkGoodsPoint'] = des.JunkGoodsPoint // 垃圾商品数计分
          item.order_service_indicators['CounterfeitGoodsPoint'] = des.CounterfeitGoodsPoint // 仿冒品或侵犯知识产权商品计分
          item.order_service_indicators['ProhibitedGoodsPoint'] = des.ProhibitedGoodsPoint // 违禁商品计分
          item.order_service_indicators['PreOrderedGoodsRatePoint'] = des.PreOrderedGoodsRatePoint // 预购商品的 %计分
          item.order_service_indicators['PreOrderedOverTargetPoint'] = des.PreOrderedOverTargetPoint // 预购商品的天数%超过目标计分
          item.order_service_indicators['OtherViolatingGoodsPoint'] = des.OtherViolatingGoodsPoint // 违反其它上架规范计分
          item.order_service_indicators['ChatResponse'] = des.response_speed ? (Number(des.response_speed) / 10000).toFixed(2) + '%' : '' // 聊天回应
          item.order_service_indicators['ResponseSpeed'] = des.response_time ? (Number(des.response_time) / 86400).toFixed(2) > 1 ? (Number(des.response_time) / 86400).toFixed(2) : 1 + '天以内' : '', // 回应速度
          item.order_service_indicators['WeekChatResponse'] = des.response_speed_last ? (Number(des.response_speed_last) / 10000).toFixed(2) + '%' : ''// 上期聊天回应
          item.order_service_indicators['WeekResponseSpeed'] = des.response_time_last ? (Number(des.response_time_last) / 86400).toFixed(2) > 1 ? (Number(des.response_time_last) / 86400).toFixed(2) : 1 + '天以内' : ''// 上期回应速度
          item.order_service_indicators['ChatResponsePoint'] = des.ChatResponsePoint // 聊天回应计分
          item.order_service_indicators['ResponseSpeedPoint'] = des.ResponseSpeedPoint // 回应速度计分
          item.order_service_indicators['SumPoints'] = res3[0].data.totalPoints // 季度计分

          // item.order_service_indicators['BuyerSatisfactionMetricId'] = des.BuyerSatisfactionMetricId // 买家满意度的MetricId
          // item.order_service_indicators['UnOrderRateMetricId'] = des.UnOrderRateMetricId // 订单未完成率的MetricId
          // item.order_service_indicators['CancellOrderRateMetricId'] = des.CancellOrderRateMetricId // 订单取消率的MetricId
          // item.order_service_indicators['ReturnOrRefundRateMetricId'] = des.ReturnOrRefundRateMetricId // 退货/退款率的MetricId
          // item.order_service_indicators['OverTimeDeliveryRateMetricId'] = des.OverTimeDeliveryRateMetricId // 逾期出货的MetricId
          // item.order_service_indicators['PrepareTimeMetricId'] = des.PrepareTimeMetricId // 订单准备时间的MetricId
          // item.order_service_indicators['ViolatingGoodsMetricId'] = des.ViolatingGoodsMetricId // 严重违规商品的MetricId
          // item.order_service_indicators['JunkGoodsMetricId'] = des.JunkGoodsMetricId // 垃圾商品的MetricId
          // item.order_service_indicators['CounterfeitGoodsMetricId'] = des.CounterfeitGoodsMetricId // 仿冒品或者侵权的MetricId
          // item.order_service_indicators['ProhibitedGoodsMetricId'] = des.ProhibitedGoodsMetricId // 违禁商品的MetricId
          // item.order_service_indicators['PreOrderedGoodsRateMetricId'] = des.PreOrderedGoodsRateMetricId // 预购商品的 %的MetricId
          // item.order_service_indicators['PreOrderedOverTargetMetricId'] = des.PreOrderedOverTargetMetricId // 预购商品的天数%超过目标的MetricId
          // item.order_service_indicators['OtherViolatingGoodsMetricId'] = des.OtherViolatingGoodsMetricId // 违反其它上架规范的MetricId
          // item.order_service_indicators['ChatResponseMetricId'] = des.ChatResponseMetricId // 聊天回应的MetricId
          // item.order_service_indicators['ResponseSpeedMetricId'] = des.ResponseSpeedMetricId // 回应速度的MetricId
          const tagetdes = {
            BuyerSatisfaction: des.buyer_satisfaction ? parseInt(Number(des.buyer_satisfaction) / 1000000) : '', // 买家满意度
            WeekBuyerSatisfaction: des.buyer_satisfaction_last ? parseInt(Number(des.buyer_satisfaction_last) / 1000000) : '', // 上期买家满意度
            BuyerSatisfactionPoint: des.BuyerSatisfactionPoint, // 买家满意度计分
            UnOrderRate: des.non_performance_rate ? des.non_performance_rate + '%' : 0, // 订单未完成率
            CancellOrderRate: des.cancel_rate ? des.cancel_rate + '%' : 0, // 订单取消率
            ReturnOrRefundRate: des.return_rate ? (Number(des.return_rate) / 10000).toFixed(2) + '%' : '', // 退货/退款率
            OverTimeDeliveryRate: des.delay_rate ? des.delay_rate + '%' : 0, // 逾期出货率
            PrepareTime: des.ready_time ? (Number(des.ready_time) / 3600 / 24).toFixed(2) + '天' : '', // 订单准备时间
            WeekUnOrderRate: des.non_performance_rate_last ? des.non_performance_rate_last + '%' : '', // 上期订单未完成率
            WeekCancellOrderRate: des.cancel_rate_last ? des.cancel_rate_last + '%' : '', // 上期订单取消率
            WeekReturnOrRefundRate: des.return_rate_last ? (Number(des.return_rate_last) / 10000).toFixed(2) + '%' : '', // 上期订单退货/退款率
            WeekOverTimeDeliveryRate: des.delay_rate_last, // 上期订单逾期出货率
            WeekPrepareTime: des.ready_time_last ? (Number(des.ready_time_last) / 3600 / 24).toFixed(2) + '天' : '', // 上期订单准备时间
            UnOrderRatePoint: des.UnOrderRatePoint ? des.UnOrderRatePoint + '%' : '', // 订单未完成率计分
            CancellOrderRatePoint: des.CancellOrderRatePoint ? des.CancellOrderRatePoint + '%' : 0, // 订单取消率计分
            ReturnOrRefundRatePoint: des.ReturnOrRefundRatePoint ? des.ReturnOrRefundRatePoint + '%' : 0, // 订单退货/退款率计分
            OverTimeDeliveryRatePoint: des.OverTimeDeliveryRatePoint ? des.OverTimeDeliveryRatePoint + '%' : 0, // 订单逾期出货率计分
            PrepareTimePoint: des.PrepareTimePoint, // 订单准备时间计分
            ViolatingGoods: des.serious_listing_violations, // 严重违规商品数
            JunkGoods: des.email_num, // 垃圾商品数
            CounterfeitGoods: des.knowledge_Protect, // 仿冒品或侵犯知识产权商品数
            ProhibitedGoods: des.lawless_goods, // 违禁商品数
            PreOrderedGoodsRate: des.pre_order_list ? (Number(des.pre_order_list) / 10000).toFixed(2) + '%' : '', // 预购商品的%
            PreOrderedOverTarget: des.violation_days, // 预购商品的天数%超过目标
            OtherViolatingGoods: des.other_error, // 违反其它上架规范数
            WeekViolatingGoods: des.serious_listing_violations_last, // 上期严重违规商品数
            WeekJunkGoods: des.email_num_last, // 上期垃圾商品数
            WeekCounterfeitGoods: des.knowledge_Protect_last, // 上期仿冒品或侵犯知识产权商品数
            WeekProhibitedGoods: des.lawless_goods_last, // 上期违禁商品数
            WeekPreOrderedGoodsRate: des ? (Number(des.pre_order_list_last) / 10000).toFixed(2) + '%' : '', // 上期预购商品的%
            WeekPreOrderedOverTarget: des.violation_days_last, // 上期预购商品的天数%超过目标
            WeekOtherViolatingGoods: des.other_error_last, // 上期违反其它上架规范数
            ViolatingGoodsPoint: des.ViolatingGoodsPoint, // 严重违规商品数计分
            JunkGoodsPoint: des.JunkGoodsPoint, // 垃圾商品数计分
            CounterfeitGoodsPoint: des.CounterfeitGoodsPoint, // 仿冒品或侵犯知识产权商品计分
            ProhibitedGoodsPoint: des.ProhibitedGoodsPoint, // 违禁商品计分
            PreOrderedGoodsRatePoint: des.PreOrderedGoodsRatePoint, // 预购商品的 %计分
            PreOrderedOverTargetPoint: des.PreOrderedOverTargetPoint, // 预购商品的天数%超过目标计分
            OtherViolatingGoodsPoint: des.OtherViolatingGoodsPoint, // 违反其它上架规范计分
            ChatResponse: des.response_speed ? (Number(des.response_speed) / 10000).toFixed(2) + '%' : '', // 聊天回应
            ResponseSpeed: des.response_time ? (Number(des.response_time) / 86400).toFixed(2) > 1 ? (Number(des.response_time) / 86400).toFixed(2) : 1 + '天以内' : '', // 回应速度
            WeekChatResponse: des.response_speed_last ? (Number(des.response_speed_last) / 10000).toFixed(2) + '%' : '', // 上期聊天回应
            WeekResponseSpeed: des.response_time_last ? (Number(des.response_time_last) / 86400).toFixed(2) > 1 ? (Number(des.response_time_last) / 86400).toFixed(2) : 1 + '天以内' : '', // 上期回应速度
            ChatResponsePoint: des.ChatResponsePoint, // 聊天回应计分
            ResponseSpeedPoint: des.ResponseSpeedPoint, // 回应速度计分
            SumPoints: res3[0].data.totalPoints // 季度计分

            // BuyerSatisfactionMetricId: des.BuyerSatisfactionMetricId, // 买家满意度的MetricId
            // UnOrderRateMetricId: des.UnOrderRateMetricId, // 订单未完成率的MetricId
            // CancellOrderRateMetricId: des.CancellOrderRateMetricId, // 订单取消率的MetricId
            // ReturnOrRefundRateMetricId: des.ReturnOrRefundRateMetricId, // 退货/退款率的MetricId
            // OverTimeDeliveryRateMetricId: des.OverTimeDeliveryRateMetricId, // 逾期出货的MetricId
            // PrepareTimeMetricId: des.PrepareTimeMetricId, // 订单准备时间的MetricId
            // ViolatingGoodsMetricId: des.ViolatingGoodsMetricId, // 严重违规商品的MetricId
            // JunkGoodsMetricId: des.JunkGoodsMetricId, // 垃圾商品的MetricId
            // CounterfeitGoodsMetricId: des.CounterfeitGoodsMetricId, // 仿冒品或者侵权的MetricId
            // ProhibitedGoodsMetricId: des.ProhibitedGoodsMetricId, // 违禁商品的MetricId
            // PreOrderedGoodsRateMetricId: des.PreOrderedGoodsRateMetricId, // 预购商品的 %的MetricId
            // PreOrderedOverTargetMetricId: des.PreOrderedOverTargetMetricId, // 预购商品的天数%超过目标的MetricId
            // OtherViolatingGoodsMetricId: des.OtherViolatingGoodsMetricId, // 违反其它上架规范的MetricId
            // ChatResponseMetricId: des.ChatResponseMetricId, // 聊天回应的MetricId
            // ResponseSpeedMetricId: des.ResponseSpeedMetricId // 回应速度的MetricId
          }
          params['orderServiceIndicators'] = tagetdes
          // console.log('***************', params)
          const res4 = await this.$api.mallStatisticsSave(params)
          // console.log('res4', res4)
          if (res4.data.code === 200) {
            this.$set(item, 'status', '同步成功')
          } else {
            this.$set(item, 'color', `#F56C6C`)
            this.$set(item, 'status', '同步失败:上报失败')
          }
        } else {
          this.$set(item, 'color', `#F56C6C`)
          this.$set(item, 'status', `同步失败`)
        }
        console.log('syncMall', res1, res2, res3)
      } catch (e) {
        console.log('错误', e)
        this.$set(item, 'color', `#F56C6C`)
        this.$set(item, 'status', `同步失败`)
      } finally {
        --count.count
        this.percentage += this.addPercentage
      }
    },
    // 获取数据
    async getMallStatistics() {
      this.isLoading = true
      const parmas = {
        country: this.form.site,
        mallId: this.form.mallId,
        groupId: this.form.groupId,
        page: this.page,
        pageSize: this.pageSize
      }
      const { data } = await this.$api.getMallStatistics(parmas)
      if (data.code === 200) {
        const resData = data.data
        this.total = resData.total
        this.tableData = resData.data
        if (this.tableData) {
          this.tableData.map(item => {
            item.order_service_indicators = item.order_service_indicators ? JSON.parse(item.order_service_indicators) : ''
          })
        }
        this.isLoading = false
        this.$refs.plTable.reloadData(this.tableData)
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(`${data.message}`)
        this.isLoading = false
      }
    },
    // 勾选表格操作
    handlerSelectTableOperating(OperatingName) {
      if (this.multipleSelection.length) {
        this[OperatingName](this.multipleSelection)
      } else {
        this[OperatingName](this.tableData)
      }
    },
    // 导出excel
    async exportSearch() {
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isLoading = true
      const exportData = []
      const parmas = {
        country: this.form.site,
        mallId: this.form.mallId,
        groupId: this.form.groupId,
        page: 1,
        pageSize: this.pageSize
      }
      while (exportData.length < this.total) {
        try {
          const { data } = await this.$api.getMallStatistics(parmas)
          if (data.code === 200) {
            const resData = data.data.data
            if (resData) {
              for (let index = 0; index < resData.length; index++) {
                const element = resData[index]
                element.order_service_indicators = element.order_service_indicators ? JSON.parse(element.order_service_indicators) : ''
              }
            }
            resData.forEach(item => {
              exportData.push(item)
            })
            parmas.page++
          } else {
            this.$message.error(`${data.message}`)
            this.isLoading = false
          }
        } catch (error) {
          console.log(error)
          this.isLoading = false
          break
        }
      }
      let str =
        `<tr>
          <td>站点</td>
          <td>店铺ID</td>
          <td>店铺名称</td>
          <td>本季度计分</td>
          <td>买家满意度</td>
          <td>上家买家满意度</td>
          <td>买家满意度计分</td>
          <td>订单未完成率</td>
          <td>订单取消率</td>
          <td>订单退货/退款率</td>
          <td>订单逾期出货率</td>
          <td>订单准备时间</td>
          <td>上期订单未完成率</td>
          <td>上期订单取消率</td>
          <td>上期订单退货/退款率</td>
          <td>上期订单逾期出货率</td>
          <td>上期订单准备时间</td>
          <td>订单未完成率计分</td>
          <td>订单取消率计分</td>
          <td>订单退货/退款率计分</td>
          <td>订单逾期出货率计分</td>
          <td>订单准备时间计分</td>
          <td>严重违规商品</td>
          <td>垃圾商品</td>
          <td>仿冒品或侵犯知识产权商品</td>
          <td>违禁商品</td>
          <td>预购商品的%</td>
          <td>预购商品的天数%超过目标</td>
          <td>违反其他上架规范</td>
          <td>上期严重违规商品</td>
          <td>上期垃圾商品</td>
          <td>上期仿冒品或侵犯知识产权商品</td>
          <td>上期违禁商品</td>
          <td>上期预购商品的%</td>
          <td>上期预购商品的天数%超过目标</td>
          <td>上期违反其他上架规范</td>
          <td>严重违规商品计分</td>
          <td>垃圾商品计分</td>
          <td>仿冒品或侵犯知识产权商品计分</td>
          <td>违禁商品计分</td>
          <td>预购商品的%计分</td>
          <td>预购商品的天数%超过目标计分</td>
          <td>违反其他上架规范计分</td>
          <td>客服聊天回应</td>
          <td>客服回应速度</td>
          <td>上期客服聊天回应</td>
          <td>上期客服回应速度</td>
          <td>客服聊天回应计分</td>
          <td>客服回应速度计分</td>

        </tr>`
      // <td>买家满意度的MetricId</td>
      // <td>订单未完成率的MetricId</td>
      // <td>订单取消率的MetricId</td>
      // <td>退货/退款率的MetricId</td>
      // <td>逾期出货的MetricId</td>
      // <td>订单准备时间的MetricId</td>
      // <td>严重违规商品的MetricId</td>
      // <td>垃圾商品的MetricId</td>
      // <td>仿冒品或者侵权的MetricId</td>
      // <td>违禁商品的MetricId</td>
      // <td>预购商品的 %的MetricId</td>
      // <td>预购商品的天数%超过目标的MetricId</td>
      // <td>违反其它上架规范的MetricId</td>
      // <td>聊天回应的MetricId</td>
      // <td>回应速度的MetricId</td>
      exportData.forEach((item) => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.platform_mall_id ? item.platform_mall_id : '' + '\t'}</td>
        <td>${item.mall_alias_name ? item.mall_alias_name : item.platform_mall_name + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.SumPoints ? item.order_service_indicators.SumPoints : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.BuyerSatisfaction ? item.order_service_indicators.BuyerSatisfaction : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekBuyerSatisfaction ? item.order_service_indicators.WeekBuyerSatisfaction : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.BuyerSatisfactionPoint ? item.order_service_indicators.BuyerSatisfactionPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.UnOrderRate ? item.order_service_indicators.UnOrderRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.CancellOrderRate ? item.order_service_indicators.CancellOrderRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ReturnOrRefundRate ? item.order_service_indicators.ReturnOrRefundRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.OverTimeDeliveryRate ? item.order_service_indicators.OverTimeDeliveryRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PrepareTime ? item.order_service_indicators.PrepareTime : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekUnOrderRate ? item.order_service_indicators.WeekUnOrderRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekCancellOrderRate ? item.order_service_indicators.WeekCancellOrderRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekReturnOrRefundRate ? item.order_service_indicators.WeekReturnOrRefundRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekOverTimeDeliveryRate ? item.order_service_indicators.WeekOverTimeDeliveryRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekPrepareTime ? item.order_service_indicators.WeekPrepareTime : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.UnOrderRatePoint ? item.order_service_indicators.UnOrderRatePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.CancellOrderRatePoint ? item.order_service_indicators.CancellOrderRatePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ReturnOrRefundRatePoint ? item.order_service_indicators.ReturnOrRefundRatePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.OverTimeDeliveryRatePoint ? item.order_service_indicators.OverTimeDeliveryRatePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PrepareTimePoint ? item.order_service_indicators.PrepareTimePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ViolatingGoods ? item.order_service_indicators.ViolatingGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.JunkGoods ? item.order_service_indicators.JunkGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.CounterfeitGoods ? item.order_service_indicators.CounterfeitGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ProhibitedGoods ? item.order_service_indicators.ProhibitedGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedGoodsRate ? item.order_service_indicators.PreOrderedGoodsRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedOverTarget ? item.order_service_indicators.PreOrderedOverTarget : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.OtherViolatingGoods ? item.order_service_indicators.OtherViolatingGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekViolatingGoods ? item.order_service_indicators.WeekViolatingGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekJunkGoods ? item.order_service_indicators.WeekJunkGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekCounterfeitGoods ? item.order_service_indicators.WeekCounterfeitGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekProhibitedGoods ? item.order_service_indicators.WeekProhibitedGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekPreOrderedGoodsRate ? item.order_service_indicators.WeekPreOrderedGoodsRate : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekPreOrderedOverTarget ? item.order_service_indicators.WeekPreOrderedOverTarget : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekOtherViolatingGoods ? item.order_service_indicators.WeekOtherViolatingGoods : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ViolatingGoodsPoint ? item.order_service_indicators.ViolatingGoodsPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.JunkGoodsPoint ? item.order_service_indicators.JunkGoodsPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.CounterfeitGoodsPoint ? item.order_service_indicators.CounterfeitGoodsPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ProhibitedGoodsPoint ? item.order_service_indicators.ProhibitedGoodsPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedGoodsRatePoint ? item.order_service_indicators.PreOrderedGoodsRatePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedOverTargetPoint ? item.order_service_indicators.PreOrderedOverTargetPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.OtherViolatingGoodsPoint ? item.order_service_indicators.OtherViolatingGoodsPoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ChatResponse ? item.order_service_indicators.ChatResponse : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ResponseSpeed ? item.order_service_indicators.ResponseSpeed : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekChatResponse ? item.order_service_indicators.WeekChatResponse : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.WeekResponseSpeed ? item.order_service_indicators.WeekResponseSpeed : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ChatResponsePoint ? item.order_service_indicators.ChatResponsePoint : '' + '\t'}</td>
        <td>${item.order_service_indicators && item.order_service_indicators.ResponseSpeedPoint ? item.order_service_indicators.ResponseSpeedPoint : '' + '\t'}</td>

                                                       
        </tr>`
        // <td>${item.order_service_indicators && item.order_service_indicators.BuyerSatisfactionMetricId ? item.order_service_indicators.BuyerSatisfactionMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.UnOrderRateMetricId ? item.order_service_indicators.UnOrderRateMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.CancellOrderRateMetricId ? item.order_service_indicators.CancellOrderRateMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.ReturnOrRefundRateMetricId ? item.order_service_indicators.ReturnOrRefundRateMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.OverTimeDeliveryRateMetricId ? item.order_service_indicators.OverTimeDeliveryRateMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.PrepareTimeMetricId ? item.order_service_indicators.PrepareTimeMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.ViolatingGoodsMetricId ? item.order_service_indicators.ViolatingGoodsMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.JunkGoodsMetricId ? item.order_service_indicators.JunkGoodsMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.CounterfeitGoodsMetricId ? item.order_service_indicators.CounterfeitGoodsMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.ProhibitedGoodsMetricId ? item.order_service_indicators.ProhibitedGoodsMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedGoodsRateMetricId ? item.order_service_indicators.PreOrderedGoodsRateMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.PreOrderedOverTargetMetricId ? item.order_service_indicators.PreOrderedOverTargetMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.OtherViolatingGoodsMetricId ? item.order_service_indicators.OtherViolatingGoodsMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.ChatResponseMetricId ? item.order_service_indicators.ChatResponseMetricId : '' + '\t'}</td>
        // <td>${item.order_service_indicators && item.order_service_indicators.ResponseSpeedMetricId ? item.order_service_indicators.ResponseSpeedMetricId : '' + '\t'}</td>
      })
      exportExcelDataCommon('店铺指标', str)
      this.isLoading = false
    },
    getGroupId(data) {
      this.form.groupId = data
      this.page = 1
    },
    tableScroll() {},
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getMallStatistics()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getMallStatistics()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-target.less';
</style>
