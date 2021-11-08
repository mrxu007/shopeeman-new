<template>
  <el-row class="contaniner">
    <el-col :span="3">
      <mallGroup :get-data="getMallStatistics" @getGroupId="getGroupId" />
    </el-col>
    <el-col class="right" :span="21">
      <el-row class="header">
        <el-col :span="24" class="header-top">
          <ul>
            <li>
              <span>站点：</span>
              <el-select v-model="form.site" class="unnormal" placeholder="" size="mini" filterable>
                <el-option label="全部" :value="0" />
                <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <!-- <li>
              <span>距今无订单天数：</span>
              <el-select v-model="form.agoNoneOrderDays" class="unnormal1" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in agoNoneOrderDaysList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li> -->
            <li>
              <el-select v-model="form.shopSelect" class="unnormal" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in shopSelectList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
              <el-input v-model="form.shopSelectVal" class="unnormal2" placeholder="" size="mini" clearable oninput="value=value.replace(/\s+/g,'')" />
            </li>
            <li>
              <span>客服数据统计时间(仅用于同步数据)：</span>
              <el-select v-model="form.serviceDataTime" class="unnormal3" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in serviceDataTimeList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <el-button
                type="primary"
                size="mini"
                @click="
                  page = 1
                  getMallStatistics()
                "
                >查询</el-button
              >
              <el-button type="primary" size="mini" @click="exportSearch()">导出数据</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('syncMallData')">同步店铺数据</el-button>
            </li>
            <li>
              <el-progress v-show="isShowProgress" style="width: 230px" :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" />
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="header-two">
        <el-col :span="24" class="header-two-top">
          <span
            >当前条件下，待拨款总订单数：
            <p>{{ frozenAmountOrders }}</p>
          </span>
          <span
            >待拨款总金额：
            <p>{{ parseFloat(frozenAmount).toFixed(2) }}</p></span
          >
          <span
            >本周已拨款总金额：
            <p>{{ parseFloat(weekAmount).toFixed(2) }}</p></span
          >
          <span
            >本月已拨款总金额：
            <p>{{ parseFloat(monthAmount).toFixed(2) }}</p>
          </span>
          <span
            >全部已拨款总金额：
            <p>{{ parseFloat(availableAmount).toFixed(2) }}</p>
          </span>
        </el-col>
      </el-row>
      <el-row class="article">
        <el-table
          v-loading="isLoading"
          height="calc(100vh - 225px)"
          :data-changes-scroll-top="false"
          :border="false"
          :data="tableData"
          :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
          @table-body-scroll="tableScroll"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" type="index" label="序列号" width="80" />
          <el-table-column align="center" prop="country" label="站点">
            <template slot-scope="{ row }">
              {{ row.country | chineseSite }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="platform_mall_id" label="店铺ID" min-width="120" />
          <el-table-column align="center" label="店铺名称" min-width="130">
            <template slot-scope="{ row }">
              {{ row.mall_alias_name ? row.mall_alias_name : row.platform_mall_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="店铺分组">
            <template slot-scope="{ row }">
              {{ row.group_name === 'All' ? '' : row.group_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作状态" min-width="100" show-overflow-tooltip>
            <template slot-scope="{ row }">
              <span :style="row.color && 'color:' + row.color">{{ row.status }}</span>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recent_order_create_time" label="最近订单创建时间" min-width="150" />
          <el-table-column align="center" label="距今无订单天数" min-width="150">
            <template slot-scope="{ row }">
              {{ row.not_order_time }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="yesterday_order_num" label="昨日订单数" min-width="90" />
          <el-table-column align="center" prop="week_order_num" label="近7天订单数" min-width="100" />
          <el-table-column align="center" prop="history_order_num" label="历史订单数" min-width="90" />
          <el-table-column align="center" prop="mall_quota" label="店铺额度" />
          <el-table-column align="center" prop="all_product_num" label="全部产品数" min-width="90" />
          <el-table-column align="center" prop="active_product_num" label="上架产品数" min-width="100" />
          <el-table-column align="center" prop="soldout_product_num" label="售空产品数" min-width="90" />
          <el-table-column align="center" prop="banned_product_num" label="禁卖产品数" min-width="90" />
          <el-table-column align="center" prop="unlisted_product_num" label="未上架产品数" min-width="110" />
          <el-table-column align="center" prop="chat_response_rate" label="聊聊回复率" min-width="90" />
          <el-table-column align="center" prop="rating_star" label="卖场评价" />
          <el-table-column align="center" prop="order_non_fulfillment_rate" label="订单未完成率" min-width="110" />
          <el-table-column align="center" prop="followers_number" label="关注量" />
          <el-table-column align="center" prop="fans_number" label="粉丝量" />
          <el-table-column align="center" prop="today_view_product_count" label="商品浏览量" min-width="90" />
          <el-table-column align="center" prop="yesterday_view_product_count" label="昨日商品浏览量" min-width="120" />
          <el-table-column align="center" prop="week_view_product_count" label="近7天商品浏览量" min-width="130" />
          <el-table-column align="center" prop="month_view_product_count" label="近30天商品浏览量" min-width="140" />
          <el-table-column align="center" prop="today_view_person_count" label="访客数" />
          <el-table-column align="center" prop="yesterday_view_person_count" label="昨日访客数" min-width="90" />
          <el-table-column align="center" prop="week_view_person_count" label="近7日访客数" min-width="100" />
          <el-table-column align="center" prop="month_view_person_count" label="近30日访客数" min-width="110" />
          <el-table-column align="center" label="客服不重复访客数" min-width="140">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatShopUvData ? row.mall_datas.ChatShopUvData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服询问数" min-width="90">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatsEnquiredData ? row.mall_datas.ChatsEnquiredData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服访客询问数" min-width="120">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatVisitorsEnquiredData ? row.mall_datas.ChatVisitorsEnquiredData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服已回应数" min-width="110">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatRespondedChatsData ? row.mall_datas.ChatRespondedChatsData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服无回应数" min-width="110">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatNonRespondedChatsData ? row.mall_datas.ChatNonRespondedChatsData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询买家数" min-width="120">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatBuyersData ? row.mall_datas.ChatBuyersData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询订单数" min-width="120">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatOrdersData ? row.mall_datas.ChatOrdersData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询件数" min-width="110">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatUnitsData ? row.mall_datas.ChatUnitsData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询销售额" min-width="120">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatSalesData ? row.mall_datas.ChatSalesData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服平均回应时间" min-width="140">
            <template slot-scope="{ row }">
              {{ row.mall_datas && row.mall_datas.ChatResponseTimeData ? row.mall_datas.ChatResponseTimeData : '-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="frozen_amount_orders" label="待拨款订单数" min-width="110" />
          <el-table-column align="center" prop="frozen_amount" label="待拨款金额" min-width="110" />
          <el-table-column align="center" prop="lastweek_amount" label="本周已拨款" min-width="110" />
          <el-table-column align="center" prop="lastmonth_amount" label="本月已拨款" min-width="110" />
          <el-table-column align="center" prop="available_amount" label="全部已拨款" min-width="100" />
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
import { exportExcelDataCommon, batchOperation } from '@/util/util'
import { MallDataApi } from '../../../module-api/mall-manager-api/mall-data-api'
export default {
  components: {
    mallGroup
  },
  data() {
    return {
      mallDataApiInstance: new MallDataApi(this),
      page: 1,
      total: 0,
      pageSize: 700,
      isLoading: false,
      percentage: 0, // 进度条数据
      isShowProgress: false,
      tableData: [], // 表格数据
      availableAmount: 0, // 全部已拨款总金额
      monthAmount: 0, // 本月已拨款总金额
      weekAmount: 0, // 本周已拨款总金额
      frozenAmount: 0, // 待拨款总金额
      frozenAmountOrders: 0, // 待拨款总订单数
      multipleSelection: [],
      countries: this.$filters.countries_option,
      form: {
        groupId: 0, // 店铺分组ID
        agoNoneOrderDays: '0', // 距今无订单天数
        site: 0, // 站点
        shopSelect: '0', // 店铺选择
        serviceDataTime: 'real_time', // 客服数据统计时间
        shopSelectVal: '' // 店铺选择值
      },
      // agoNoneOrderDaysList: [
      //   { value: '0', label: '全部' },
      //   { value: '1', label: '7天内' },
      //   { value: '2', label: '大于7天小于等于14天' },
      //   { value: '3', label: '大于14天小于等于30天' },
      //   { value: '4', label: '30天以上' }
      // ],
      shopSelectList: [
        { value: '0', label: '店铺名称' },
        { value: '1', label: '店铺ID' },
        { value: '2', label: '店铺别名' }
      ],
      serviceDataTimeList: [
        { value: 'yesterday', label: '昨天' },
        { value: 'real_time', label: '今天' },
        { value: 'past7days', label: '7天' },
        { value: 'past30days', label: '30天' }
      ]
    }
  },
  mounted() {
    this.getMallStatistics()
  },
  methods: {
    // 同步店铺数据
    async syncMallData(data) {
      if (!data) {
        return this.$message('暂无同步数据')
      }
      console.log(data, 'syncMallData')
      // const url = this.shopeeConfig.getSiteDomainCrossBk('VN')
      // console.log(url)
      this.isShowProgress = true
      this.percentage = 0
      const res = await batchOperation(data, this.syncMall)
      this.percentage = 100
      console.log(1, '完成', res)
    },
    async syncMall(item, count = { count: 1 }) {
      try {
        this.$set(item, 'status', '开始同步...')
        const res1 = await this.mallDataApiInstance.getProductStatisticalData(item, '/api/v3/product/get_product_statistical_data/')
        console.log(res1, 'res1')
        if (res1.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          return
        }
        const res2 = await this.mallDataApiInstance.getShopProfile(item, '/api/marketing/v4/shop/profile/')
        console.log(res2, 'res2')
        if (res2.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        const res3 = await this.mallDataApiInstance.getShopMetricsvalue(item, '/api/marketing/v4/shop/metrics_value/')
        console.log(res3, 'res3')
        if (res3.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        const todayStart = new Date(new Date().toLocaleDateString()).getTime()
        const todayEnd = new Date(new Date().toLocaleDateString()).getTime() + 24 * 60 * 60 * 1000 - 1
        // 今日访客
        const paramsToday = {
          mallId: item.platform_mall_id,
          start_time: Math.round(todayStart / 1000),
          end_time: Math.round(todayEnd / 1000),
          period: 'real_time',
          fetag: 'fetag'
        }
        const res4 = await this.mallDataApiInstance.getKeyMetrics(item, '/api/mydata/v3/dashboard/key-metrics/', paramsToday, 'today')
        console.log(res4, 'res4')
        if (res4.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        // 昨日访客
        const paramsYesterday = {
          mallId: item.platform_mall_id,
          start_time: Math.round((todayStart - 1 * 24 * 60 * 60) / 1000),
          end_time: Math.round((todayEnd - 1 * 24 * 60 * 60) / 1000),
          period: 'yesterday',
          fetag: 'fetag'
        }
        const res5 = await this.mallDataApiInstance.getKeyMetrics(item, '/api/mydata/v3/dashboard/key-metrics/', paramsYesterday, 'yesterday')
        console.log(res5, 'res5')
        if (res5.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        // 近七天访客
        const params7 = {
          mallId: item.platform_mall_id,
          start_time: Math.round(todayEnd / 1000),
          end_time: Math.round((todayEnd - 7 * 24 * 60 * 60) / 1000),
          period: 'past7days',
          fetag: 'fetag'
        }
        const res6 = await this.mallDataApiInstance.getKeyMetrics(item, '/api/mydata/v3/dashboard/key-metrics/', params7, 'past7days')
        console.log(res6, 'res6')
        if (res6.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        // 近30天访客
        const params30 = {
          mallId: item.platform_mall_id,
          start_time: Math.round(todayEnd / 1000),
          end_time: Math.round((todayEnd - 30 * 24 * 60 * 60) / 1000),
          period: 'past30days',
          fetag: 'fetag'
        }
        const res7 = await this.mallDataApiInstance.getKeyMetrics(item, '/api/mydata/v3/dashboard/key-metrics/', params30, 'past30days')
        console.log(res7, 'res7')
        if (res7.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        // 近30天聊天
        const paramsChat30 = {
          mallId: item.platform_mall_id,
          start_time: Math.round(todayEnd / 1000),
          end_time: Math.round((todayEnd - 30 * 24 * 60 * 60) / 1000),
          period: 'past30days'
        }
        const res8 = await this.mallDataApiInstance.getChatDashboard(item, '/api/mydata/v2/chat/dashboard/funnel/', paramsChat30, 'past30days')
        console.log(res8, 'res8')
        if (res8.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        // 拨款信息
        const res9 = await this.mallDataApiInstance.getIncomeMeta(item, '/api/v3/finance/get_income_meta/')
        console.log(res9, 'res9')
        if (res9.code === 403) {
          this.$set(item, 'status', '店铺未登录')
          this.$set(item, 'color', 'red')
          await this.mallDataApiInstance.uploadMallData(item)
          return
        }
        this.$set(item, 'status', '同步完成')
        this.$set(item, 'color', 'green')
        const res10 = await this.mallDataApiInstance.uploadMallData(item)
        console.log(res10, 'res10')
        if (res10.code === 200) {
          this.$set(item, 'status', '同步成功-上报成功')
          this.$set(item, 'color', 'green')
        } else {
          this.$set(item, 'status', '同步成功-上报失败')
          this.$set(item, 'color', 'red')
        }
        console.log(item, 'down')
      } catch (e) {
        console.log('错误', e)
        this.$set(item, 'status', '同步失败')
        this.$set(item, 'color', 'red')
      } finally {
        --count.count
        // this.percentage += this.addPercentage
      }
    },
    // 获取数据
    async getMallStatistics() {
      this.isLoading = true
      this.availableAmount = 0
      this.monthAmount = 0
      this.weekAmount = 0
      this.frozenAmount = 0
      this.frozenAmountOrders = 0
      const shopSelectVal = this.form.shopSelectVal
      const parmas = {
        country: this.form.site,
        groupId: this.form.groupId,
        mallName: this.form.shopSelect === '0' ? shopSelectVal : '',
        mallId: this.form.shopSelect === '1' ? shopSelectVal : '',
        mallAliasName: this.form.shopSelect === '2' ? shopSelectVal : '',
        page: this.page,
        pageSize: this.pageSize
      }
      const { data } = await this.$api.getMallStatistics(parmas)
      console.log(data)
      if (data.code === 200) {
        const resData = data.data
        this.total = resData.total
        this.tableData = resData.data
        if (this.tableData) {
          for (let index = 0; index < this.tableData.length; index++) {
            const element = this.tableData[index]
            const res = await this.$appConfig.getGlobalCacheInfo('mallInfo', element.platform_mall_id)
            const jsonData = JSON.parse(res)
            // element.country = this.$filters.chineseSite(element.country)
            element.mall_datas = JSON.parse(element.mall_datas)
            element.available_amount = element.available_amount ? parseInt(element.available_amount) : 0
            element.lastmonth_amount = element.lastmonth_amount ? parseInt(element.lastmonth_amount) : 0
            element.lastweek_amount = element.lastweek_amount ? parseInt(element.lastweek_amount) : 0
            element.frozen_amount = element.frozen_amount ? parseInt(element.frozen_amount) : 0
            element.frozen_amount_orders = element.frozen_amount_orders ? element.frozen_amount_orders : 0
            this.availableAmount += element.available_amount
            this.monthAmount += element.lastmonth_amount
            this.weekAmount += element.lastweek_amount
            this.frozenAmount += element.frozen_amount
            this.frozenAmountOrders += element.frozen_amount_orders
            element.not_order_time = this.formatDay(element.recent_order_create_time)
            element.group_name = jsonData.GroupName
            // element['status']= ''
            // element['color'] = ''
          }
        }
        this.isLoading = false
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(`${data.message}`)
        this.isLoading = false
      }
    },
    formatDay(val) {
      if (val) {
        const day2 = new Date(val)
        const s1 = new Date().getTime()
        const s2 = day2.getTime()
        const total = (s1 - s2) / 1000
        const day = parseInt(total / (24 * 60 * 60))
        return day
      } else {
        return '无订单记录'
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
    // 获取时间戳
    getTimeStamp(val) {
      const toData = new Date(new Date().toLocaleDateString()).getTime()
      let startTime = ''
      let endTime = ''
      switch (val) {
        case 'yesterday':
          startTime = toData - 3600 * 24 * 1000
          endTime = startTime + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'real_time':
          startTime = toData
          endTime = startTime + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'past7days':
          startTime = toData - 7 * 3600 * 24 * 1000
          endTime = startTime + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'past30days':
          startTime = toData - 30 * 3600 * 24 * 1000
          endTime = startTime + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
      }
    },
    // 导出excel
    async exportSearch() {
      this.isLoading = true
      const exportData = []
      const len = this.total % 700 === 0 ? this.total / 700 : Math.floor(this.total / 700) + 1
      const shopSelectVal = this.form.shopSelectVal
      for (let index = 1; index <= len; index++) {
        const parmas = {
          country: this.form.site,
          groupId: this.form.groupId,
          mallName: this.form.shopSelect === '0' ? shopSelectVal : '',
          mallId: this.form.shopSelect === '1' ? shopSelectVal : '',
          mallAliasName: this.form.shopSelect === '2' ? shopSelectVal : '',
          page: index
        }
        try {
          const { data } = await this.$api.getMallStatistics(parmas)
          if (data.code === 200) {
            const resData = data.data.data
            if (resData) {
              for (let index = 0; index < resData.length; index++) {
                const element = resData[index]
                const res = await this.$appConfig.getGlobalCacheInfo('mallInfo', element.platform_mall_id)
                const jsonData = JSON.parse(res)
                element.country = this.$filters.chineseSite(element.country)
                element.mall_datas = JSON.parse(element.mall_datas)
                element.not_order_time = this.formatDay(element.recent_order_create_time)
                element.group_name = jsonData.GroupName
              }
            }
            resData.forEach((item) => {
              exportData.push(item)
            })
          } else {
            this.$message.error(`${data.message}`)
            this.isLoading = false
          }
        } catch (error) {
          console.log(error)
          this.isLoading = false
        }
      }
      const jsonData = exportData
      if (!jsonData?.length) {
        this.isLoading = false
        this.$message('暂无导出数据')
        return
      }
      let str = `<tr>
          <td>站点</td>
          <td>店铺ID</td>
          <td>店铺名称</td>
          <td>店铺分组</td>
          <td>最近创建订单时间</td>
          <td>距今无订单数</td>
          <td>昨日订单数</td>
          <td>近7天订单数</td>
          <td>历史订单总数</td>
          <td>店铺额度</td>
          <td>全部产品数</td>
          <td>上架产品数</td>
          <td>售空产品数</td>
          <td>禁卖产品数</td>
          <td>未上架产品数</td>
          <td>聊聊回复率</td>
          <td>卖场评价</td>
          <td>订单未完成率</td>
          <td>关注量</td>
          <td>粉丝量</td>
          <td>商品浏览量</td>
          <td>昨日商品浏览量</td>
          <td>近7天商品浏览量</td>
          <td>近30天商品浏览量</td>
          <td>访客数</td>
          <td>昨日访客数</td>
          <td>近7日访客数</td>
          <td>近30日访客数</td>
          <td>客服不重复访客数</td>
          <td>客服询问数</td>
          <td>客服访客询问数</td>
          <td>客服已回应数</td>
          <td>客服无回应数</td>
          <td>客服咨询买家数</td>
          <td>客服咨询订单数</td>
          <td>客服咨询件数</td>
          <td>客服咨询销售额</td>
          <td>客服平均回应时间</td>
          <td>待拨款订单数</td>
          <td>待拨款金额</td>
          <td>本周已拨款</td>
          <td>本月已拨款</td>
          <td>全部已拨款</td>
        </tr>`
      jsonData.forEach((item) => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.platform_mall_id ? item.platform_mall_id : '' + '\t'}</td>
        <td>${item.mall_alias_name ? item.mall_alias_name : item.platform_mall_name + '\t'}</td>
        <td>${item.group_name ? item.group_name : '' + '\t'}</td>
        <td>${item.recent_order_create_time ? item.recent_order_create_time : '' + '\t'}</td>
        <td>${item.not_order_time ? item.not_order_time : '' + '\t'}</td>
        <td>${item.yesterday_order_num ? item.yesterday_order_num : '' + '\t'}</td>
        <td>${item.week_order_num ? item.week_order_num : '' + '\t'}</td>
        <td>${item.history_order_num ? item.history_order_num : '' + '\t'}</td>
        <td>${item.mall_quota ? item.mall_quota : '' + '\t'}</td>
        <td>${item.all_product_num ? item.all_product_num : '' + '\t'}</td>
        <td>${item.active_product_num ? item.active_product_num : '' + '\t'}</td>
        <td>${item.soldout_product_num ? item.soldout_product_num : '' + '\t'}</td>
        <td>${item.banned_product_num ? item.banned_product_num : '' + '\t'}</td>
        <td>${item.unlisted_product_num ? item.unlisted_product_num : '' + '\t'}</td>
        <td>${item.chat_response_rate ? item.chat_response_rate : '' + '\t'}</td>
        <td>${item.rating_star ? item.rating_star : '' + '\t'}</td>
        <td>${item.order_non_fulfillment_rate ? item.order_non_fulfillment_rate : '' + '\t'}</td>
        <td>${item.followers_number ? item.followers_number : '' + '\t'}</td>
        <td>${item.fans_number ? item.fans_number : '' + '\t'}</td>
        <td>${item.today_view_product_count ? item.today_view_product_count : '' + '\t'}</td>
        <td>${item.yesterday_view_product_count ? item.yesterday_view_product_count : '' + '\t'}</td>
        <td>${item.week_view_product_count ? item.week_view_product_count : '' + '\t'}</td>
        <td>${item.month_view_product_count ? item.month_view_product_count : '' + '\t'}</td>
        <td>${item.today_view_person_count ? item.today_view_person_count : '' + '\t'}</td>
        <td>${item.yesterday_view_person_count ? item.yesterday_view_person_count : '' + '\t'}</td>
        <td>${item.week_view_person_count ? item.week_view_person_count : '' + '\t'}</td>
        <td>${item.month_view_person_count ? item.month_view_person_count : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatShopUvData ? item.mall_datas.ChatShopUvData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatsEnquiredData ? item.mall_datas.ChatsEnquiredData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatVisitorsEnquiredData ? item.mall_datas.ChatVisitorsEnquiredData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatRespondedChatsData ? item.mall_datas.ChatRespondedChatsData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatNonRespondedChatsData ? item.mall_datas.ChatNonRespondedChatsData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatBuyersData ? item.mall_datas.ChatBuyersData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatOrdersData ? item.mall_datas.ChatOrdersData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatUnitsData ? item.mall_datas.ChatUnitsData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatSalesData ? item.mall_datas.ChatSalesData : '' + '\t'}</td>
        <td>${item.mall_datas && item.mall_datas.ChatResponseTimeData ? item.mall_datas.ChatResponseTimeData : '' + '\t'}</td>
        <td>${item.frozen_amount_orders ? item.frozen_amount_orders : '' + '\t'}</td>
        <td>${item.frozen_amount ? item.frozen_amount : '' + '\t'}</td>
        <td>${item.lastweek_amount ? item.lastweek_amount : '' + '\t'}</td>
        <td>${item.lastmonth_amount ? item.lastmonth_amount : '' + '\t'}</td>
        <td>${item.available_amount ? item.available_amount : '' + '\t'}</td>
        </tr>`
      })
      exportExcelDataCommon('店铺数据', str)
      this.isLoading = false
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
@import '../../../module-less/mall-manager-less/mall-data.less';
</style>
