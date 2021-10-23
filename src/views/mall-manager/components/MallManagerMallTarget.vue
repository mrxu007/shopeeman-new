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
              <el-select v-model="form.site" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺ID：</span>
              <el-input v-model="form.mallId" class="shopId" placeholder="" size="mini" />
            </li>
            <li>
              <el-button type="primary" size="mini" @click="getMallStatistics()">查询</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('syncMallData')">同步店铺指标数据</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('exportSearch')">导出数据</el-button>
            </li>
            <li>
              <el-progress v-show="isShowProgress" style="width:230px" :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" />
            </li>
            <!-- <li>
              <span>订单完成指标：</span>
              <el-select v-model="form.orderIndex" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>买家满意指标：</span>
              <el-select v-model="form.buyerIndex" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>流程服务指标：</span>
              <el-select v-model="form.serviceIndex" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li> -->
          </ul>
        </el-col>
        <el-col class="header-top">
          <ul>
            <!-- <li>
              <span>评分等级：</span>
              <el-select v-model="form.rating" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in ratingList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>违反上架指标：</span>
              <el-select v-model="form.violationPutIndex" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in formIndexList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <span>店铺ID：</span>
              <el-input v-model="form.mallId" class="shopId" placeholder="" size="mini" />
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
        <el-table
          ref="plTable"
          v-loading="isLoading"
          height="calc(100vh - 155px)"
          :data-changes-scroll-top="false"
          :border="false"
          :data="tableData"
          @table-body-scroll="tableScroll"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" type="index" label="序列号" width="80" />
          <el-table-column align="center" prop="country" label="站点" />
          <el-table-column align="center" prop="platform_mall_id" label="店铺ID" min-width="120" />
          <el-table-column align="center" label="店铺名称" min-width="130">
            <template slot-scope="{row}">
              {{ row.mall_alias_name?row.mall_alias_name:row.platform_mall_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作状态" min-width="100">
            <template slot-scope="{row}">
              {{ row.status }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="本季度计分" min-width="100">
            <template slot-scope="{row}">
              {{ row.order_service_indicators&&row.order_service_indicators.SumPoints?row.order_service_indicators.SumPoints:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="买家满意度" min-width="100">
            <template slot-scope="{row}">
              {{ row.order_service_indicators&&row.order_service_indicators.BuyerSatisfaction?row.order_service_indicators.BuyerSatisfaction:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="上期买家满意度" min-width="120">
            <template slot-scope="{row}">
              {{ row.order_service_indicators&&row.order_service_indicators.WeekBuyerSatisfaction?row.order_service_indicators.WeekBuyerSatisfaction:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="买家满意度计分" min-width="120">
            <template slot-scope="{row}">
              {{ row.order_service_indicators&&row.order_service_indicators.BuyerSatisfactionPoint?row.order_service_indicators.BuyerSatisfactionPoint:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="订单完成率">
            <el-table-column align="center" label="未完成率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.UnOrderRate?row.order_service_indicators.UnOrderRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="取消率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.CancellOrderRate?row.order_service_indicators.CancellOrderRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ReturnOrRefundRate?row.order_service_indicators.ReturnOrRefundRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.OverTimeDeliveryRate?row.order_service_indicators.OverTimeDeliveryRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="准备时间">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PrepareTime?row.order_service_indicators.PrepareTime:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="上期订单完成率">
            <el-table-column align="center" label="未完成率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekUnOrderRate?row.order_service_indicators.WeekUnOrderRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="取消率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekCancellOrderRate?row.order_service_indicators.WeekCancellOrderRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekReturnOrRefundRate?row.order_service_indicators.WeekReturnOrRefundRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekOverTimeDeliveryRate?row.order_service_indicators.WeekOverTimeDeliveryRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="准备时间">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekPrepareTime?row.order_service_indicators.WeekPrepareTime:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="订单未完成率计分">
            <el-table-column align="center" label="未完成率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.UnOrderRatePoint?row.order_service_indicators.UnOrderRatePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="取消率">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.CancellOrderRatePoint?row.order_service_indicators.CancellOrderRatePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="退货/退款率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ReturnOrRefundRatePoint?row.order_service_indicators.ReturnOrRefundRatePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="逾期出货率" min-width="100">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.OverTimeDeliveryRatePoint?row.order_service_indicators.OverTimeDeliveryRatePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="准备时间">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PrepareTimePoint?row.order_service_indicators.PrepareTimePoint:'-' }}
              </template>
            </el-table-column>
          </el-table-column>

          <el-table-column align="center" label="违反上架规范">
            <el-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ViolatingGoods?row.order_service_indicators.ViolatingGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="垃圾商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.JunkGoods?row.order_service_indicators.JunkGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.CounterfeitGoods?row.order_service_indicators.CounterfeitGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违禁商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ProhibitedGoods?row.order_service_indicators.ProhibitedGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的%" min-width="120">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PreOrderedGoodsRate?row.order_service_indicators.PreOrderedGoodsRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PreOrderedOverTarget?row.order_service_indicators.PreOrderedOverTarget:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.OtherViolatingGoods?row.order_service_indicators.OtherViolatingGoods:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="上期违反上架规范">
            <el-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekViolatingGoods?row.order_service_indicators.WeekViolatingGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="垃圾商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekJunkGoods?row.order_service_indicators.WeekJunkGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekCounterfeitGoods?row.order_service_indicators.WeekCounterfeitGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违禁商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekProhibitedGoods?row.order_service_indicators.WeekProhibitedGoods:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的%" min-width="120">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekPreOrderedGoodsRate?row.order_service_indicators.WeekPreOrderedGoodsRate:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekPreOrderedOverTarget?row.order_service_indicators.WeekPreOrderedOverTarget:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekOtherViolatingGoods?row.order_service_indicators.WeekOtherViolatingGoods:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="违反上架规范计分">
            <el-table-column align="center" label="严重违规商品" min-width="110">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ViolatingGoodsPoint?row.order_service_indicators.ViolatingGoodsPoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="垃圾商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.JunkGoodsPoint?row.order_service_indicators.JunkGoodsPoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="仿冒品或侵犯知识产权商品" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.CounterfeitGoodsPoint?row.order_service_indicators.CounterfeitGoodsPoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违禁商品">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ProhibitedGoodsPoint?row.order_service_indicators.ProhibitedGoodsPoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的%" min-width="110">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PreOrderedGoodsRatePoint?row.order_service_indicators.PreOrderedGoodsRatePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="预购商品的天数%超过目标" min-width="190">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.PreOrderedOverTargetPoint?row.order_service_indicators.PreOrderedOverTargetPoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="违反其他上架规范" min-width="140">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.OtherViolatingGoodsPoint?row.order_service_indicators.OtherViolatingGoodsPoint:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="客服">
            <el-table-column align="center" label="聊天回应">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ChatResponse?row.order_service_indicators.ChatResponse:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="回应速度">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ResponseSpeed?row.order_service_indicators.ResponseSpeed:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="上期客服">
            <el-table-column align="center" label="聊天回应">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekChatResponse?row.order_service_indicators.WeekChatResponse:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="回应速度">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.WeekResponseSpeed?row.order_service_indicators.WeekResponseSpeed:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
          <el-table-column align="center" label="客服计分">
            <el-table-column align="center" label="聊天回应">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ChatResponsePoint?row.order_service_indicators.ChatResponsePoint:'-' }}
              </template>
            </el-table-column>
            <el-table-column align="center" label="回应速度">
              <template slot-scope="{row}">
                {{ row.order_service_indicators&&row.order_service_indicators.ResponseSpeedPoint?row.order_service_indicators.ResponseSpeedPoint:'-' }}
              </template>
            </el-table-column>
          </el-table-column>
        </el-table>
        <div class="pagination">
          <el-pagination
            background
            :current-page="page"
            :page-sizes="[700, 1000, 1500, 2000]"
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
import ShopeeConfig from '@/services/shopeeman-config'
import { exportExcelDataCommon } from '@/util/util'
export default {
  components: {
    mallGroup
  },
  data() {
    return {
      page: 1,
      total: 0,
      pageSize: 700,
      isLoading: false,
      tableData: [], // 表格数据
      multipleSelection: [],
      percentage: 0, // 进度条数据
      isShowProgress: false,
      shopeeConfig: new ShopeeConfig(),
      form: {
        site: '', // 站点
        orderIndex: '0', // 订单完成指标
        buyerIndex: '0', // 买家满意指标
        serviceIndex: '0', // 流程服务指标
        rating: '0', // 评分等级
        violationPutIndex: '0', // 违反上架指标
        mallId: ''// 店铺ID
      },
      siteList: [
        { value: '', label: '全部' },
        { value: 'TH', label: '泰国站' },
        { value: 'MY', label: '马来站' },
        { value: 'TW', label: '台湾站' },
        { value: 'PH', label: '菲律宾站' },
        { value: 'ID', label: '印尼站' },
        { value: 'SG', label: '新加坡站' },
        { value: 'VN', label: '越南站' }
      ],
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
      ]
    }
  },
  async mounted() {
    await this.getMallStatistics()
  },
  methods: {
    // 同步店铺指标数据
    async syncMallData(data) {
      const url = this.shopeeConfig.getSiteDomainCrossBk('VN')
      console.log(url)
      this.isShowProgress = true
      this.percentage = 0
      for (let index = 0; index < data.length; index++) {
        this.$set(data[index], 'status', '开始同步')
        this.percentage = parseInt((index + 1) / data.length * 100)
        this.$set(data[index], 'status', '同步完成')
      }
    },
    // 获取数据
    async getMallStatistics() {
      this.isLoading = true
      const parmas = {
        country: this.form.site,
        mallId: this.form.mallId.trim(),
        groupId: this.form.groupId,
        page: this.page,
        pageSize: this.pageSize
      }
      const { data } = await this.$api.getMallStatistics(parmas)
      if (data.code === 200) {
        const resData = data.data
        this.total = resData.total
        this.tableData = resData.data
        this.tableData.map(item => {
          item.country = this.shopeeConfig.getSiteCode(item.country)
          item.order_service_indicators = item.order_service_indicators ? JSON.parse(item.order_service_indicators) : ''
        })
        this.isLoading = false
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
    // 导出采集,excel
    exportSearch(data) {
      // 要导出的json数据
      // const jsonData = this.multipleSelection
      const jsonData = data
      if (!jsonData?.length) {
        return this.$message('暂无导出数据')
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
      jsonData.forEach((item) => {
        str += `<tr>
        <td>${item.country ? item.country : '' + '\t'}</td>
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
      })
      exportExcelDataCommon('店铺指标', str)
    },
    getGroupId(data) {
      this.form.groupId = data
    },
    tableScroll() {},
    handleSizeChange(val) {
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
