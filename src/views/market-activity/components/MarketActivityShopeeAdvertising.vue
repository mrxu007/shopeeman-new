
<template>
  <div class="advertisement">
    <div class="header-btn">
      <storeChoose @changeMallList="changeMallList" :is-all="false" />
    </div>
    <div class="select-btn">
      <div class="select-item">
        <div class="base-box">
          <span class="base-title">综合统计</span>
          <div class="base-item">
            <el-date-picker
              v-model="statisticalTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 300px"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
            <el-button type="primary" size="mini" class="mar-left" :disabled="loading" @click="batchGetAdventList">搜 索</el-button>
            <el-button type="primary" size="mini" :disabled="loading" @click="viewDetailVisible = true">查看详情</el-button>
            <el-button type="primary" size="mini" :disabled="loading" @click="exportData">导出数据</el-button>
            <div class="over-view">
              <div class="item">
                <span>余额</span>
                <span class="mar-left">{{ totalAnalysisData.balance }}</span>
              </div>
              <div class="item">
                <span>浏览数</span>
                <span lass="mar-left">{{ totalAnalysisData.impression }}</span>
              </div>
              <div class="item">
                <span>点击次数</span>
                <span class="mar-left">{{ totalAnalysisData.click }}</span>
              </div>
              <div class="item">
                <span>点击率</span>
                <span class="mar-left">{{ totalAnalysisData.impression == 0 ? 0 : ((totalAnalysisData.click / totalAnalysisData.impression) * 100).toFixed(2) }}%</span>
              </div>
              <div class="item">
                <span>订单数</span>
                <span class="mar-left">{{ totalAnalysisData.order }}</span>
              </div>
              <div class="item">
                <span>商品已出售</span>
                <span class="mar-left">{{ totalAnalysisData.order }}</span>
              </div>
              <div class="item">
                <span>销售金额</span>
                <span class="mar-left">{{ totalAnalysisData.orderGmv }}</span>
              </div>
              <div class="item">
                <span>花费</span>
                <span class="mar-left">{{ totalAnalysisData.cost }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="select-item">
        <div class="base-box">
          <span class="base-title">商品统计</span>
          <div class="base-item">
            <div class="select-row">
              <div class="item-box">
                <span>广告类型：</span>
                <el-select v-model="adventType" placeholder="请选择" size="mini" style="width: 140px">
                  <el-option v-for="item in adventTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
              <div class="item-box">
                <span>活动类型：</span>
                <el-select v-model="activeType" placeholder="请选择" size="mini" style="width: 140px">
                  <el-option label="全部" value="all"> </el-option>
                  <el-option v-for="item in activeTypeList" :key="item.value" :label="item.label" :value="item.value"> </el-option>
                </el-select>
              </div>
              <div class="item-box">
                <span>关键字：</span>
                <el-input size="mini" type="primary" v-model="keyWords" placeholder="可输入商品标题查询活动"></el-input>
              </div>
              <el-button type="primary" size="mini" class="mar-left" @click="batchGetAdventList" :disabled="loading">搜 索</el-button>
              <el-button type="primary" size="mini">停止搜索</el-button>
              <el-checkbox v-model="showConsole" class="mar-left">隐藏日志</el-checkbox>
            </div>
            <div class="select-row">
              <el-button type="primary" size="mini" @click="createType = 'single';createAdventVisible = true">创建单个商品关键字广告</el-button>
              <el-button type="primary" size="mini" @click="createType = 'batch';createAdventVisible = true">创建批量商品关键字广告</el-button>
              <el-button type="primary" size="mini">创建关联广告</el-button>
              <el-button type="primary" size="mini">停止创建广告</el-button>
              <el-button type="primary" size="mini" plain>暂停广告活动</el-button>
              <el-button type="primary" size="mini" plain>继续广告活动</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <u-table
        ref="editPlTable"
        :data="tableData"
        use-virtual
        :height="550"
        :row-height="68"
        :data-changes-scroll-top="false"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序号" width="50" />
        <u-table-column width="120px" label="店铺名称" align="center" show-overflow-tooltip>
          <template slot-scope="{ row }"> {{ row.mallInfo.country }}-{{ row.mallInfo.mall_alias_name || row.mallInfo.platform_mall_name }} </template>
        </u-table-column>
        <u-table-column align="center" label="商品图片" width="80">
          <template slot-scope="scope">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
              <div slot="content">
                <el-image :src="[scope.row.image] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image v-bind:src="[scope.row.image, true] | imageRender" style="width: 32px; height: 32px"></el-image>
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column align="center" label="商品ID" min-width="150" prop="product.itemid" />
        <u-table-column align="center" label="商品名称" min-width="150" prop="product.name" show-overflow-tooltip />
        <u-table-column align="center" label="活动类型" min-width="150" prop="campaign.state" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ activeState[row.campaign.state] }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="活动日期" width="260" prop="price" show-overflow-tooltip>
          <template v-slot="{ row }">
            {{ `${$dayjs(row.campaign.start_time * 1000).format('YYYY/MM/DD HH:mm:ss')} - ${row.campaign.end_time == 0 ? '' : $dayjs(row.campaign.end_time * 1000).format('YYYY/MM/DD HH:mm:ss')}` }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="预算" width="120" prop="promotion_price_after_tax">
          <template v-slot="{ row }">
            {{ dealWithQuota(row) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="浏览数" width="120" prop="report.impression.value" />
        <u-table-column align="center" label="点击次数" min-width="150" prop="report.click.value" />
        <u-table-column align="center" label="点击率(%)" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Number(row.report.impression.value) == 0 ? 0 : Math.round((Number(row.report.click.value) / Number(row.report.impression.value)) * 100).toFixed(2) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="订单数" min-width="150" prop="report.order_amount.value" />
        <u-table-column align="center" label="商品已出售" min-width="150" prop="report.order_amount.value" />
        <u-table-column align="center" label="销售金额" min-width="150" prop="report.order_gmv.value" />
        <u-table-column align="center" label="花费" min-width="150" prop="report.cost.value" />
        <u-table-column align="center" label="投资产出比" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Math.round(row.report.gmv_expense_ratio.value).toFixed(2) }}
          </template>
        </u-table-column>
        <u-table-column align="center" label="成本收入对比(%)" min-width="150" prop="user_item_limit">
          <template v-slot="{ row }">
            {{ Math.round(row.report.cir.value * 100).toFixed(2) }}
          </template>
        </u-table-column>
        <!-- <u-table-column align="center" label="操作状态" min-width="150" /> -->
      </u-table>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog v-if="viewDetailVisible" title="店铺综合统计详情概览" :visible.sync="viewDetailVisible" top="5vh" width="1200px" :close-on-click-modal="false">
      <el-table :data="totalData" style="width: 100%" border height="300px">
        <el-table-column label="店铺名称" prop="id">
          <template slot-scope="{ row }"> {{ row.country }}-{{ row.mallName }} </template>
        </el-table-column>
        <el-table-column label="余额" prop="balance"> </el-table-column>
        <el-table-column label="浏览数" prop="impression"> </el-table-column>
        <el-table-column label="点击次数" prop="click"> </el-table-column>
        <el-table-column label="点击率(%)" prop="">
          <template v-slot="{ row }">
            {{ Number(row.impression) == 0 ? 0 : Math.round((Number(row.click) / Number(row.impression)) * 100).toFixed(2) }}
          </template>
        </el-table-column>
        <el-table-column label="订单数" prop="order"> </el-table-column>
        <el-table-column label="商品已出售" prop="order"> </el-table-column>
        <el-table-column label="销售金额" prop="orderGmv"> </el-table-column>
        <el-table-column label="花费" prop="cost"> </el-table-column>
        <el-table-column type="expand" label="查看明细" width="80">
          <template slot-scope="scope">
            <div v-for="(item, index) in analysisData[scope.row.mallId]" :key="index" class="expand-style" style="display: flex">
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.impression }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.click }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.impression == 0 ? 0 : ((item.click / item.impression) * 100).toFixed(2) }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_amount }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_amount }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.order_gmv }}</span>
              </div>
              <div>
                <span>{{ $dayjs(item.timestamp * 1000).format('YYYY/MM/DD HH:mm:ss') }}</span>
                <span class="mar-left">{{ item.cost }}</span>
              </div>
            </div>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <el-dialog :visible.sync="createAdventVisible" v-if="createAdventVisible" top="7vh" title="创建广告关键字" :close-on-click-modal="false" :close-on-press-escape="false" width="1000px">
      <div class="create-style">
        <div class="warning-top">
          <p v-if="createType === 'single'">选择单个商品时，可选择是否开启自动选择关键字或手动选择关键字</p>
          <p v-else>
            选择两个及以上商品，shopee将自动管理广告关键字。相同的预算和时长设置将应用于每个广告。<br />
            最多20个商品，超过将自动选取前20个商品
          </p>
        </div>
        <el-button size="mini" type="primary">添加商品</el-button>
        <el-table :data="createChooseGoods" style="width: 100%; margin: 10px 0" border height="200px" v-if="createChooseGoods.length">
          <el-table-column align="center" type="index" label="" width="20" />
          <el-table-column label="店铺名称" prop="id" width="120">
            <template slot-scope="{ row }"> {{ row.country }}-{{ row.mall_alias_name || row.platform_mall_name }} </template>
          </el-table-column>
          <el-table-column label="商品id" prop="balance"> </el-table-column>
          <el-table-column label="商品图片" prop="impression" width="80"> </el-table-column>
          <el-table-column label="价格" prop="impression"> </el-table-column>
          <el-table-column label="已选商品数量" prop="impression"> </el-table-column>
          <el-table-column label="操作" prop="impression"> </el-table-column>
        </el-table>
        <div class="base-box mar-top">
          <span class="base-title">每个广告的预算</span>
          <div class="base-item">
            <el-radio v-model="budgetSingle" label="1">无限制</el-radio><br />
            <p v-if="budgetSingle == '1'" style="margin: 5px 0">根据您目前的广告预算余额，您的广告最多可获得0个点击数。</p>
            <el-radio v-model="budgetSingle" label="2">设定预算</el-radio>
          </div>
        </div>
        <div class="base-box mar-top">
          <span class="base-title">每个广告的时长</span>
          <div class="base-item">
            <el-radio v-model="timeSingle" label="1">不限时</el-radio><br />
            <el-radio v-model="timeSingle" label="2">设定开始日期/结束日期</el-radio>
          </div>
        </div>
        <!-- v-if="createType === 'single' && createChooseGoods.length == 1" -->
        <div class="base-box mar-top" >
          <span class="base-title">关键字</span>
          <div class="base-item">
            <el-checkbox v-model="autoKeyword" >自动选择</el-checkbox><br />
            <el-checkbox v-model="handleKeyword" >手动选择</el-checkbox>
          </div>
        </div>
        <div class="footer-btn">
          <el-button size="mini" type="primary">确认发布</el-button>
          <el-button size="mini" type="primary">取消发布</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import { batchOperation, delay, terminateThread, exportExcelDataCommon, creatDate } from '@/util/util'
export default {
  components: {
    storeChoose,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      selectMallList: [],
      country: '',
      statisticalTime: [],
      showConsole: false,
      adventType: 'keyword', //广告类型
      adventTypeList: [
        {
          label: '关键字广告',
          value: 'keyword',
        },
        {
          label: '关联广告',
          value: 'targeting',
        },
      ], //广告类型
      activeType: 'all', //活动类型
      activeTypeList: [
        {
          label: '已预设',
          value: 'scheduled',
        },
        {
          label: '进行中',
          value: 'ongoing',
        },
        {
          label: '暂停中',
          value: 'paused',
        },
        {
          label: '已结束',
          value: 'ended',
        },
      ], //活动类型
      keyWords: '', //关键字,
      tableData: [],
      loading: false,
      multipleSelection: [],
      viewDetailVisible: false, //查看详情
      analysisData: {}, //综合统计数据
      totalData: [],
      totalAnalysisData: {
        balance: 0, //余额
        impression: 0, //浏览量
        click: 0, //点击次数
        order: 0, //订单数(商品已出售)
        orderGmv: 0, //销售金额
        cost: 0, //花费
      },
      activeState: {
        ended: '已结束',
        closed: '已结束',
        ongoing: '进行中',
        scheduled: '已预设',
        paused: '暂停中',
      },
      createAdventVisible: true, //广告弹窗
      createType: 'single',
      createChooseGoods: [], //创建弹窗选择的商品
      budgetSingle: '1', //每个广告的预算
      timeSingle: '1', //每个广告的时长
      autoKeyword: false,
      handleKeyword: false,
    }
  },
  mounted() {
    this.statisticalTime = creatDate(1)
  },
  methods: {
    //导出数据
    async exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据！')
      }
      let num = 1
      let str = `<tr>
            <td>编号</td>
            <td>店铺</td>
            <td>商品图片</td>
            <td>商品ID</td>
            <td>商品名称</td>
            <td>活动类型</td>
            <td>活动日期</td>
            <td>预算</td>
            <td>浏览数</td>
            <td>点击次数</td>
            <td>点击率（%）</td>
            <td>订单数</td>
            <td>商品已出售</td>
            <td>销售金额</td>
            <td>花费</td>
            <td>投资产出比</td>
            <td>成本收入对比（%）</td>
            </tr>`
      this.tableData.forEach((item) => {
        str += `<tr><td>${num++}</td>
        <td>${item.mallInfo ? `${item.mallInfo.country}-${item.mallInfo.mall_alias_name || item.mallInfo.platform_mall_name}` : '' + '\t'}</td>
        <td>${item.image ? this.$filters.imageRender(item.image) : '' + '\t'}</td>
        <td>${item.product ? item.product.itemid : '' + '\t'}</td>
        <td>${item.product ? item.product.name : '' + '\t'}</td>
        <td>${item.campaign ? this.activeState[item.campaign.state] : '' + '\t'}</td>
        <td>${
          item.campaign.start_time
            ? `${$dayjs(item.campaign.start_time * 1000).format('YYYY/MM/DD HH:mm:ss')} - ${item.campaign.end_time == 0 ? '' : $dayjs(item.campaign.end_time * 1000).format('YYYY/MM/DD HH:mm:ss')}`
            : '' + '\t'
        }</td>
        <td>${this.dealWithQuota(item) + '\t'}</td>
        <td>${item.report ? item.report.impression.value : '' + '\t'}</td>
        <td>${item.report ? item.report.click.value : '' + '\t'}</td>
        <td>${Number(item.report.impression.value) == 0 ? 0 : Math.round((Number(item.report.click.value) / Number(item.report.impression.value)) * 100).toFixed(2) + '\t'}</td>
        <td>${item.report ? item.report.order_amount.value : '' + '\t'}</td>
        <td>${item.report ? item.report.order_amount.value : '' + '\t'}</td>
        <td>${item.report ? item.report.order_gmv.value : '' + '\t'}</td>
        <td>${item.report ? item.report.cost.value : '' + '\t'}</td>
        <td>${Math.round(item.report.gmv_expense_ratio.value).toFixed(2) + '\t'}</td>
        <td>${Math.round(row.report.cir.value * 100).toFixed(2) + '\t'}</td>
        </tr>
        `
      })
      exportExcelDataCommon('商品广告信息', str)
    },
    //获取用户余额
    async getMallBalance(mall) {
      let params = {
        need_create: 0,
        mallId: mall.platform_mall_id,
      }
      let res = await this.$shopeemanService.getMallBalance(mall.country, params)
      console.log(res, 'res')
      if (res.code === 200) {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额成功，余额【${res.data.balance}】`, true)
        return res.data.balance
      } else if (res.code === 403) {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额失败，店铺未登录`, false)
        return 0
      } else {
        this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取余额失败，${res.data}`, false)
        return 0
      }
    },
    //图表数据
    async getAdventAnalysis(mall, balance) {
      let startTime = Math.round(new Date(this.statisticalTime[0]).getTime() / 1000)
      let endTime = Math.round(new Date(this.statisticalTime[1]).getTime() / 1000)
      let params = {
        start_time: startTime,
        end_time: endTime,
        agg_interval: 4,
        placement_list: [1, 2, 5],
        mallId: mall.platform_mall_id,
      }
      try {
        let res = await this.$shopeemanService.getAdventAnalysis(mall.country, params)
        if (res.code === 200) {
          let totalObj = {
            mallId: mall.platform_mall_id,
            mallName: mall.mall_alias_name || mall.platform_mall_name,
            country: mall.country,
            balance: balance, //余额
            impression: 0, //浏览量
            click: 0, //点击次数
            order: 0, //订单数(商品已出售)
            orderGmv: 0, //销售金额
            cost: 0, //花费
          }
          res.data.forEach((item) => {
            totalObj.impression += item.impression
            totalObj.click += item.click
            totalObj.order += item.order_amount
            totalObj.orderGmv += item.order_gmv
            totalObj.cost += item.cost
          })
          this.totalData.push(totalObj)
          this.analysisData[mall.platform_mall_id] = res.data
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】综合统计数据获取失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】综合统计数据获取失败，${res.data}`, false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    //处理预算
    dealWithQuota(row) {
      if (Number(row.campaign.daily_quota) == 0 && Number(row.campaign.total_expense) == 0) {
        return '无限制'
      } else {
        if (Number(row.campaign.daily_quota) !== 0) {
          return `日预算-${row.campaign.daily_quota}`
        } else if (Number(row.campaign.total_expense) !== 0) {
          return `总预算-${row.campaign.daily_quota}`
        }
      }
    },
    //批量获取数据
    async batchGetAdventList() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.tableData = []
      this.analysisData = {}
      this.totalData = []
      this.loading = true
      this.totalAnalysisData = {
        balance: 0, //余额
        impression: 0, //浏览量
        click: 0, //点击次数
        order: 0, //订单数(商品已出售)
        orderGmv: 0, //销售金额
        cost: 0, //花费
      }
      await batchOperation(this.selectMallList, this.getAdventList)
      this.totalData.forEach((item) => {
        this.totalAnalysisData.balance += item.balance
        this.totalAnalysisData.impression += item.impression
        this.totalAnalysisData.click += item.click
        this.totalAnalysisData.order += item.order
        this.totalAnalysisData.orderGmv += item.orderGmv
        this.totalAnalysisData.cost += item.cost
      })
      this.$refs.Logs.writeLog('查询结束！', true)
      console.log(this.totalData, this.analysisData, '11111')
      this.loading = false
    },
    //列表数据
    async getAdventList(mall, count = { count: 5 }) {
      let startTime = Math.round(new Date(this.statisticalTime[0]).getTime() / 1000)
      let endTime = Math.round(new Date(this.statisticalTime[1]).getTime() / 1000)
      let limit = 40
      let mallCount = 0
      let balance = await this.getMallBalance(mall)
      this.getAdventAnalysis(mall, balance)
      try {
        let params = {
          start_time: startTime,
          end_time: endTime,
          campaign_type: this.adventType,
          filter_content: this.activeType,
          sort_key: 'mtime',
          sort_direction: 1,
          search_content: '',
          offset: 0,
          limit: limit,
          mallId: mall.platform_mall_id,
        }
        let res = await this.$shopeemanService.getAdventList(mall.country, params)

        if (res.code === 200) {
          let array = res.data.campaign_ads_list || []
          while (array.length) {
            mallCount += array.length
            array.forEach((item) => {
              item.mallInfo = mall
              item.image = item.product.images.split(',')[0]
            })
            this.tableData = this.tableData.concat(array)
            params.offset += limit
            let res = await this.$shopeemanService.getAdventList(mall.country, params)
            array = res.code === 200 ? res.data.campaign_ads_list : []
          }
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】功获取到广告数量${mallCount}条`, true)
          console.log(res, 'res', this.tableData)
        } else if (res.code === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取广告失败，店铺未登录`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.mall_alias_name || mall.platform_mall_name}】获取广告失败，${res.data}`, false)
        }
      } catch (error) {
      } finally {
        --count.count
      }
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
    },
  },
}
</script>

<style lang="less" scoped>
.advertisement {
  padding: 10px;
  overflow: hidden;
  background: #fff;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-left {
  margin-left: 10px;
}
.mar-top {
  margin-top: 10px;
}
.header-btn {
  margin: 10px 0;
}
.select-btn {
  margin: 0 10px 10px 10px;
  .select-item {
    margin-bottom: 10px;
  }
}
.content {
  margin-top: 20px;
}
.expand-style {
  display: flex;
  margin: 0 5px 5px 0;
  justify-content: flex-end;
  div {
    margin-left: 10px;
  }
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // min-width: 702px;
  // height: 100%;
  .base-title {
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
  .base-item {
    .over-view {
      margin-top: 15px;
      display: flex;
      .item {
        width: 160px;
        span {
          font-size: 16px !important;
        }
      }
    }
    .select-row {
      display: flex;
      align-items: center;
      margin-top: 10px;
    }
    .item-box {
      display: flex;
      align-items: center;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
      }
    }
  }
}
.create-style {
  max-height: 600px;
  overflow-y: auto;
  .warning-top {
    margin-bottom: 10px;
    color: #a9a9a9;
  }
  .footer-btn {
    margin-top: 10px;
  }
}
</style>
