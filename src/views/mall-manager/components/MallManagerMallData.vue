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
                <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
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
              <el-input v-model="form.shopSelectVal" class="unnormal2" placeholder="" size="mini" />
            </li>
            <li>
              <span>客服数据统计时间(仅用于同步数据)：</span>
              <el-select v-model="form.serviceDataTime" class="unnormal3" placeholder="" size="mini" filterable>
                <el-option v-for="(item, index) in serviceDataTimeList" :key="index" :label="item.label" :value="item.value" />
              </el-select>
            </li>
            <li>
              <el-button type="primary" size="mini" @click="getMallStatistics()">查询</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('exportSearch')">导出数据</el-button>
              <el-button type="primary" size="mini" @click="handlerSelectTableOperating('syncMallData')">同步店铺数据</el-button>
            </li>
            <li>
              <el-progress v-show="isShowProgress" style="width:230px" :text-inside="true" :stroke-width="24" :percentage="percentage" status="success" />
            </li>
          </ul>
        </el-col>
      </el-row>
      <el-row class="header-two">
        <el-col :span="24" class="header-two-top">
          <span>当前条件下，待拨款总订单数：<p>{{ frozenAmountOrders }}</p> </span>
          <span>待拨款总金额： <p>{{ parseFloat(frozenAmount).toFixed(2) }}</p></span>
          <span>本周已拨款总金额： <p>{{ parseFloat(weekAmount).toFixed(2) }}</p></span>
          <span>本月已拨款总金额：<p>{{ parseFloat(monthAmount).toFixed(2) }}</p> </span>
          <span>全部已拨款总金额：<p>{{ parseFloat(availableAmount).toFixed(2) }}</p> </span>
        </el-col>
      </el-row>
      <el-row class="article">
        <el-table
          v-loading="isLoading"
          height="calc(100vh - 215px)"
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
          <el-table-column align="center" prop="country" label="站点" />
          <el-table-column align="center" prop="platform_mall_id" label="店铺ID" min-width="120" />
          <el-table-column align="center" label="店铺名称" min-width="130">
            <template slot-scope="{row}">
              {{ row.mall_alias_name?row.mall_alias_name:row.platform_mall_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="店铺分组">
            <template slot-scope="{row}">
              {{ row.group_name }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="操作状态" min-width="100">
            <template slot-scope="{row}">
              {{ row.status }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="recent_order_create_time" label="最近订单创建时间" min-width="150" />
          <el-table-column align="center" label="距今无订单天数" min-width="150">
            <template slot-scope="{row}">
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
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatShopUvData?row.mall_datas.ChatShopUvData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服询问数" min-width="90">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatsEnquiredData?row.mall_datas.ChatsEnquiredData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服访客询问数" min-width="120">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatVisitorsEnquiredData?row.mall_datas.ChatVisitorsEnquiredData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服已回应数" min-width="110">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatRespondedChatsData?row.mall_datas.ChatRespondedChatsData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服无回应数" min-width="110">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatNonRespondedChatsData?row.mall_datas.ChatNonRespondedChatsData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询买家数" min-width="120">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatBuyersData?row.mall_datas.ChatBuyersData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询订单数" min-width="120">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatOrdersData?row.mall_datas.ChatOrdersData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询件数" min-width="110">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatUnitsData?row.mall_datas.ChatUnitsData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服咨询销售额" min-width="120">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatSalesData?row.mall_datas.ChatSalesData:'-' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="客服平均回应时间" min-width="140">
            <template slot-scope="{row}">
              {{ row.mall_datas && row.mall_datas.ChatResponseTimeData?row.mall_datas.ChatResponseTimeData:'-' }}
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
      percentage: 0, // 进度条数据
      isShowProgress: false,
      tableData: [], // 表格数据
      availableAmount: 0, // 全部已拨款总金额
      monthAmount: 0, // 本月已拨款总金额
      weekAmount: 0, // 本周已拨款总金额
      frozenAmount: 0, // 待拨款总金额
      frozenAmountOrders: 0, // 待拨款总订单数
      multipleSelection: [],
      shopeeConfig: new ShopeeConfig(),
      form: {
        groupId: 0, // 店铺分组ID
        agoNoneOrderDays: '0', // 距今无订单天数
        site: '', // 站点
        shopSelect: '0', // 店铺选择
        serviceDataTime: 'real_time', // 客服数据统计时间
        shopSelectVal: '' // 店铺选择值
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
  async mounted() {
    await this.getMallStatistics()
  },
  methods: {
    // 同步店铺数据
    async syncMallData(data) {
      const url = this.shopeeConfig.getSiteDomainCrossBk('VN')
      console.log(url)
      this.isShowProgress = true
      this.percentage = 0
      const { startTime, endTime } = this.getTimeStamp(this.form.serviceDataTime)
      const parmas = {
        start_time: parseInt(startTime / 1000),
        end_time: parseInt(endTime / 1000),
        period: this.form.serviceDataTime,
        fetag: 'fetag'
      }
      console.log(parmas)
      for (let index = 0; index < data.length; index++) {
        this.$set(data[index], 'status', '开始同步')
        this.percentage = parseInt((index + 1) / data.length * 100)
        this.$set(data[index], 'status', '同步完成')
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
      const shopSelectVal = this.form.shopSelectVal.trim()
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
      if (data.code === 200) {
        const res = await this.$api.test()
        const testData = res.data.data.data
        console.log(testData)
        const resData = data.data
        this.total = resData.total
        this.tableData = resData.data
        this.tableData.map(item => {
          item.country = this.shopeeConfig.getSiteCode(item.country)
          item.mall_datas = JSON.parse(item.mall_datas)
          item.available_amount = item.available_amount ? parseInt(item.available_amount) : 0
          item.lastmonth_amount = item.lastmonth_amount ? parseInt(item.lastmonth_amount) : 0
          item.lastweek_amount = item.lastweek_amount ? parseInt(item.lastweek_amount) : 0
          item.frozen_amount = item.frozen_amount ? parseInt(item.frozen_amount) : 0
          item.frozen_amount_orders = item.frozen_amount_orders ? item.frozen_amount_orders : 0
          this.availableAmount += item.available_amount
          this.monthAmount += item.lastmonth_amount
          this.weekAmount += item.lastweek_amount
          this.frozenAmount += item.frozen_amount
          this.frozenAmountOrders += item.frozen_amount_orders
          item.not_order_time = item.recent_order_create_time ? this.formatDay(item.recent_order_create_time) : '无订单记录'
          testData.forEach(nItem => {
            item.group_name = item.platform_mall_id === nItem.platform_mall_id ? nItem.group_name : item.group_name
            item.mall_type = item.platform_mall_id === nItem.platform_mall_id ? nItem.mall_type : item.mall_type
          })
        })

        this.isLoading = false
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(`${data.message}`)
        this.isLoading = false
      }
    },
    formatDay(val) {
      const today = this.$dayjs(new Date()).format('YYYY-MM-DD HH:mm:ss')
      const day1 = new Date(today)
      const day2 = new Date(val)
      const s1 = day1.getTime()
      const s2 = day2.getTime()
      const total = (s1 - s2) / 1000
      const day = parseInt(total / (24 * 60 * 60))
      return day
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
          endTime = (startTime) + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'real_time':
          startTime = toData
          endTime = startTime + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'past7days':
          startTime = toData - 7 * 3600 * 24 * 1000
          endTime = (startTime) + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
        case 'past30days':
          startTime = toData - 30 * 3600 * 24 * 1000
          endTime = (startTime) + 24 * 60 * 60 * 1000 - 1
          return { startTime, endTime }
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
        <td>${item.country ? item.country : '' + '\t'}</td>
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
