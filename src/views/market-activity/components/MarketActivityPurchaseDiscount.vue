<template>
  <div class="detail">
    <div class="condetion" style="background-color: white;padding:8px">
      <div class="row1">
        <storeChoose style="margin-left:-20px" :show-mall-all="true" @changeMallList="changeMallList" />
        <div style="margin-left:20px">
          <label>状态：</label>
          <el-select v-model="activeType" placeholder="请选择" size="mini" style="width:120px">
            <el-option label="全部" value="0" />
            <el-option label="进行中" value="1" />
            <el-option label="接下来有活动" value="2" />
            <el-option label="活动已过期" value="3" />
          </el-select>
        </div>
        <el-button size="mini" type="primary" style="margin-left:20px" @click="getTableList">搜索</el-button>
      </div>

      <div class="row2" style="margin-top:8px">
        <!-- <el-button size="mini" type="primary" @click="stopSearch">取消查询</el-button> -->
        <el-button size="mini" type="primary" @click="mallCoupon">创建加购促销活动</el-button>
        <!-- <el-button size="mini" @click="stopCreate">批量删除/结束活动</el-button> -->
        <el-button size="mini" type="primary" @click="MallvoucherStopMul">批量删除/结束活动</el-button>
        <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
        <el-checkbox v-model="isShowPast" style="margin-left:8px">不显示过期活动</el-checkbox>
      </div>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
    <div class="tableDetail" style="margin-top: 8px;">
      <u-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="tableList"
        height="800px"
        use-virtual
        :border="false"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column type="selection" width="55" fixed />
        <u-table-column type="index" fixed label="序号" min-width="50px" />
        <!-- <u-table-column prop="" label="站点" align="center" min-width="50px" fixed>
          <template v-slot="{row}">{{ row.country | chineseSite }}</template>
        </u-table-column> -->
        <u-table-column prop="mallName" label="店铺" align="center" min-width="150px" />
        <u-table-column prop="follow_prize_name" label="促销名称" align="center" min-width="150px" />
        <u-table-column prop="quota" label="活动状态" align="center" min-width="180px" />
        <u-table-column prop="claimed" label="促销期间" align="center" min-width="100px">
          <!-- <template v-slot="{row}">{{ row.rule && row.rule.shopids.length===0 ? '店铺优惠卷' :'商品优惠卷' }}</template> -->
        </u-table-column>
        <u-table-column prop="discountInfo" label="运送渠道" align="center" min-width="180px" />
        <u-table-column prop="topNum" label="运费" align="center" min-width="150px" />
        <u-table-column prop="min_spend" label="操作" align="center" min-width="150px">
          <template>
            <el-button size="mini" type="primary" @click="clearLog">删除</el-button>
            <el-button size="mini" type="primary" @click="clearLog">编辑商品</el-button>
            <el-button size="mini" type="primary" @click="clearLog">复制活动</el-button>
          </template>
        </u-table-column>
      </u-table>
    </div>
    <!-- 加购优惠 -->
    <el-dialog
      class="edit-group-dialog"
      :visible.sync="proVisible"
      width="1150px"
      height="600px"
      top="5vh"
      title="加购优惠"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <ul>
        <!-- 基本资料 -->
        <li>
          <div style="margin-left: 10px;margin-bottom: 5px;">基本资料</div>
          <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
            <!-- row1 -->
            <li style="display: flex;margin-bottom:10px">
              <div>
                操作店铺
                <el-select v-model="optionMall" placeholder="请选择" size="mini" style="width:120px">
                  <el-option label="全部" value="" />
                  <el-option v-for="mall in shopAccountMallList" :key="mall.id" :label="mall.label" :value="mall.id" />
                </el-select>
              </div>

              <div style="margin-left:50px">
                <el-radio-group v-model="discountType">
                  <el-radio label="0">折扣优惠</el-radio>
                  <el-radio label="1">赠品满最低消费</el-radio>
                </el-radio-group>
                <span v-if="discountType==='0'">
                  加购限制 <el-input v-model="addLimit" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                </span>
                <span v-if="discountType==='1'">
                  赠品规则 消费<el-input v-model="costNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  以获得<el-input v-model="sendNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  个赠品
                </span>
              </div>
            </li>
            <!-- row2 -->
            <li style="display: flex;">
              <div>
                促销名称 <el-input v-model="proName" size="mini" style="width:120px" maxlength="24" />
              </div>
              <div style="margin-left:50px">
                活动时间
                <el-tooltip class="item" effect="dark" content="开始时间必须比当前时间晚一个小时;结束时间必须比开始时间晚一个小时" placement="top-start">
                  <el-date-picker
                    v-model="proTime"
                    style="width:315px;"
                    size="mini"
                    value-format="timestamp"
                    type="datetimerange"
                    range-separator="-"
                    start-placeholder="开始日期"
                    end-placeholder="结束日期"
                    :picker-options="pickerOptions"
                  />
                </el-tooltip>
              </div>
              <el-button size="mini" type="primary" style="margin-left:10px" @click="clearLog">保存活动</el-button>
              <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
              <el-checkbox v-model="showlog" style="margin-left:8px;margin-top:5px">隐藏日志</el-checkbox>
            </li>
          </ul>
        </li>
        <!-- 主要商品  加购商品 -->
        <li style="display:flex;margin-top:10px">
          <!-- 主要商品-->
          <div class="masterGoods">
            <div style="margin-left: 10px;margin-bottom: 5px;">主要商品</div>
            <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
              <!-- row1 -->
              <li>
                <el-button size="mini" type="primary">开启</el-button>
                <el-button size="mini" type="primary">关闭</el-button>
                <el-button size="mini" type="primary">删除</el-button>
                <el-button size="mini" type="primary" style="margin-left: 50px">添加主要商品</el-button>
              </li>
              <!-- row2 -->
              <li>
                <el-table
                  :data="masterGoodslist"
                  :header-cell-style="{ background: '#f7fafa' }"
                >
                  <el-table-column type="index" label="店铺" align="center" min-width="60px" />
                  <el-table-column prop="itemid" label="商品" align="center" min-width="100px" />
                  <el-table-column prop="itemid" label="状态" align="center" min-width="100px" />
                  <el-table-column label="操作" align="center" min-width="100px">
                    <template v-slot="{row}"><span><el-button size="mini" type="primary" @click="delCouponGoods(row)">删除</el-button></span></template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </div>
          <!-- 加购商品 -->
          <div class="addGoods" style="margin-left:10px">
            <div style="margin-left: 10px;margin-bottom: 5px;">加购商品</div>
            <ul style="border: 1px solid #d4d1d1;padding: 10px;border-radius: 8px;">
              <li>
                <div>折扣：<el-input v-model="addGoodsDiscount" size="mini" style="width:50px" />%</div>
                <el-button size="mini" type="primary">批量更新</el-button>
                <el-button size="mini" type="primary">开启</el-button>
                <el-button size="mini" type="primary">关闭</el-button>
                <el-button size="mini" type="primary">删除</el-button>
                <el-button size="mini" type="primary">添加加购商品</el-button>
              </li>
              <li>
                <el-table
                  :data="addGoodsList"
                  :header-cell-style="{ background: '#f7fafa' }"
                >
                  <el-table-column align="center" type="selection" width="50" />
                  <el-table-column type="index" label="店铺" align="center" min-width="60px" />
                  <el-table-column prop="itemid" label="商品" align="center" min-width="100px" />
                  <el-table-column prop="itemid" label="原价" align="center" min-width="100px" />
                  <el-table-column prop="itemid" label="折扣" align="center" min-width="100px" />
                  <el-table-column prop="itemid" label="加购价格" align="center" min-width="100px" />
                  <el-table-column prop="itemid" label="状态" align="center" min-width="100px" />
                  <el-table-column label="操作" align="center" min-width="100px">
                    <template v-slot="{row}"><span><el-button size="mini" type="primary" @click="delCouponGoods(row)">删除</el-button></span></template>
                  </el-table-column>
                </el-table>
              </li>
            </ul>
          </div>
        </li>
      </ul>
    </el-dialog>
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import { GoodsMallgetValue, getMalls, batchOperation, terminateThread } from '../../../util/util'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      // 弹窗
      addGoodsDiscount: '', // 添加折扣
      addGoodsList: [], // 加购商品
      masterGoodslist: [], // 主要商品
      sendNum: 0, // 获得赠品
      costNum: 0, // 消费金额
      addLimit: 0,
      optionMall: '',

      //
      freightobj: {
        minCost: null,
        freightType: 0,
        freight: 1
      },
      freightlist: [], // 运费列表
      deliverWay: [], // 运输渠道
      proTimeType: '0', // 促销时间类型
      proTime: [], // 促销时间
      proName: '', // 促销名称
      isShowPast: false,
      tableLoading: false,
      singerStop: false, // 单个停止
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      showlog: true,
      activeType: '0', // 活动
      tableList: [], // 主表数据
      proVisible: true, // 弹窗
      dialogtitle: '', // 弹窗标题
      coupontype: '2', // 创建优惠卷类型 1.店铺 2.商品
      // 创建优惠卷参数
      couponName: '', // 优惠劵名称
      rewardType: '0', // 奖励类型 0 折扣 1 Shoppe币折扣
      discountType: '0', // 0 折扣优惠 1 赠品满最低消费
      discountNum: '', // 折扣数额
      limitPrice: '0', // 最高优惠金额限制类型 0 无限制 1设置金额
      maxPrice: '', // 最高优惠金额
      minPrice: '', // 最低消费金额
      pickerOptions: {
        disabledDate(time) {
          // return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      shopAccountMallList: [], // 所有的店铺信息
      selectMallList: [], // 选择的店铺
      stoptoping: false,
      mallTableSelect: [],
      getTable: []
    }
  },
  // computed:{
  //   discountType(){

  //   }
  // },
  created() {
    this.freightlist.push(this.freightobj)
    this.initMall()
  },
  methods: {
    // 初始化店铺信息
    initMall() {
      getMalls(res => {
        this.shopAccountMallList = res
      })
    },
    // 删除规则
    delrule(val) {
      const index = this.couponGoodslist.findIndex(el => { return el === val })
      this.freightlist.splice(index, 1)
    },
    // 保存
    save() {},
    // 新增运费规则
    addRule() {
      this.freightlist.push(this.freightobj)
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.mallTableSelect = val
    },
    // 批量停止
    async  MallvoucherStopMul() {
      if (!this.mallTableSelect.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      for (let i = 0; i < this.mallTableSelect.length; i++) {
        if (Number(this.mallTableSelect[i].promotion_type) === 2) {
          await this.MallvoucherStop(this.mallTableSelect[i])
        }
      }
      this.getTableList()
    },
    // 停止
    async  MallvoucherStop(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        campaign_id: Number(val.campaign_id),
        action: 'stop'
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.MallPrizeDel(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------已停止【${val.follow_prize_name}】优惠活动------`, true)
        } else {
          this.$refs.Logs.writeLog(`停止【${val.follow_prize_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`停止【${val.follow_prize_name}】--catch,${error}`, false)
      }
      if (this.singerStop) {
        this.getTableList()
      }
      this.singerStop = false
    },
    // 批量删除
    MallvoucherDelMul() {
      if (!this.mallTableSelect.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }

      this.$confirm('确定要删除这些优惠卷吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.MallvoucherDelMulFun()
      }).catch(() => {
      })
    },
    async  MallvoucherDelMulFun() {
      for (let i = 0; i < this.mallTableSelect.length; i++) {
        if (Number(this.mallTableSelect[i].promotion_type) === 1) {
          await this.MallvoucherDel(this.mallTableSelect[i])
        }
      }
      this.getTableList()
    },
    // 删除
    MallvoucherDelFun(val) {
      this.$confirm('确定该优惠卷吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.MallvoucherDel(val)
      }).catch(() => {
      })
    },
    async  MallvoucherDel(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        campaign_id: Number(val.campaign_id),
        action: 'delete'
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.MallPrizeDel(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功删除【${val.follow_prize_name}】优惠活动------`, true)
        } else {
          this.$refs.Logs.writeLog(`删除【${val.follow_prize_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`删除【${val.follow_prize_name}】--catch,${error}`, false)
      }
      if (this.singerStop) {
        this.getTableList()
      }
      this.singerStop = false
    },
    // 取消查询
    stopSearch() {
      terminateThread()
      this.stoptoping = true
      this.$refs.Logs.writeLog(`正在停止查询`)
    },
    // 停止创建活动
    stopCreate() {
      terminateThread()
      this.$refs.Logs.writeLog(`已停止创建`)
    },
    // 时间格式转换
    add0(m) { return m < 10 ? '0' + m : m },
    formatTime(val) {
      var time = new Date(val)
      var y = time.getFullYear()
      var m = time.getMonth() + 1
      var d = time.getDate()
      var h = time.getHours()
      var mm = time.getMinutes()
      var s = time.getSeconds()
      return y + '-' + this.add0(m) + '-' + this.add0(d) + ' ' + this.add0(h) + ':' + this.add0(mm) + ':' + this.add0(s)
    },
    // 店铺选择
    changeMallList(val) {
      this.selectMallList = val
    },
    // 获取店铺优惠卷信息
    async  getInfo(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          offset: item.offset,
          limit: 20
        }
        const res = await this.MarketManagerAPIInstance.FollowPrize(params)
        if (res.data.code === 0) {
          const list = res.data.data.follow_prize_list
          list.forEach(el => {
            el.platform_mall_id = item.platform_mall_id
            el.country = item.country
            el.mallName = item.mall_alias_name || item.platform_mall_name
            el.formStartime = this.formatTime(el.start_time * 1000)
            el.formEndtime = this.formatTime(el.end_time * 1000)
          })
          item.prizeList.push(...list)
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】总数据：${res.data.data.total_count}条,正在请求第【${(params.offset / params.limit) + 1}】页`, true)
          // this.getTable.push(...list)// 存储数据
          if (list?.length >= params.limit) {
            item.offset = item.offset + params.limit
            this.getInfo(item, { count: 1 })
          } else {
            const ableUserList = [] // 需要查看详情的优惠券
            const arrList = []
            const willList = []
            const doingList = []
            const pastList = []
            for (let i = 0; i < item.prizeList.length; i++) {
              const el = item.prizeList[i]
              el.discountInfo = ''// 折扣金额（折）
              el.topNum = ''// 最高上限数额
              el.min_spend = ''// 最低消费金额
              const nowD = new Date().getTime()
              if (nowD < el.start_time * 1000) {
                el.voucher_status = '即将开始'
                el.promotion_type = 1
                ableUserList.push(el)
              } else if (nowD > el.start_time * 1000 && nowD < el.end_time * 1000) {
                el.voucher_status = '进行中'
                el.promotion_type = 2
                ableUserList.push(el)
              } else {
                el.voucher_status = '已过期'
                el.promotion_type = 3
              }
              // 条件筛选
              if (this.saleType === '1' && nowD < el.start_time * 1000) { willList.push(el) }
              if (this.saleType === '2' && nowD > el.start_time * 1000 && nowD < el.end_time * 1000) { doingList.push(el) }
              if (this.saleType === '3' && nowD > el.end_time * 1000) { pastList.push(el) }
              arrList.push(el)
            }
            if (this.saleType === '1') { this.getTable.push(...willList) }
            if (this.saleType === '2') { this.getTable.push(...doingList) }
            if (this.saleType === '3') { this.getTable.push(...pastList) }
            if (this.saleType === '0') { this.getTable.push(...arrList) }
            // this.getTable.push(...item.prizeList)
            // 查看未过期活动详情
            if (!ableUserList.length) {
              return
            }
            this.$refs.Logs.writeLog(`正在查看店铺【${item.mall_alias_name || item.platform_mall_name}】优惠卡券详情`, true)
            const res1 = await batchOperation(ableUserList, this.getPrizeDetail)
            this.$refs.Logs.writeLog(`店铺【${item.mall_alias_name || item.platform_mall_name}】查找完毕`, true)
          }
        } else {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】${res.data.message || '店铺异常'}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】--catch，${error}`, false)
      } finally {
        count.count--
      }
    },
    // 获取优惠券详情
    async getPrizeDetail(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          campaign_id: item.campaign_id
        }
        const res1 = await this.MarketManagerAPIInstance.FollowPrizeDetail(params)
        if (res1.data.code === 0) {
          const data = res1.data.data
          let discountInfo = null
          let topNum = null
          const min_spend = data.min_spend
          // 折扣
          if (Number(data.reward_type) === 0) {
            if (data.discount.value) { // 折扣金额
              discountInfo = data.discount.value
              topNum = ''
            } else { // 折扣
              discountInfo = `${(100 - Number(data.discount.percentage)) / 10}折`
              topNum = data.discount.cap === '0.00' ? '无限制' : data.discount.cap
            }
          }
          // shoppB
          if (Number(data.reward_type) === 1) {
            discountInfo = `${data.coin_cash_back.percentage}%折扣,(Shopee币回扣)`
            topNum = data.coin_cash_back.cap === '0.00' ? '无限制' : data.coin_cash_back.cap + '(Shopee币)'
          }
          this.$set(item, 'discountInfo', discountInfo)
          this.$set(item, 'topNum', topNum)
          this.$set(item, 'min_spend', min_spend)
        } else {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】,${res1.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`Detailcatch，${error}`, false)
      } finally {
        count.count--
      }
    },
    // 初始化
    async getTableList() {
      this.$refs.multipleTable.clearSelection()// 清空多选
      // this.clearLog()
      this.selectMallList.forEach(el => {
        el.offset = 0
        el.prizeList = [] // 优惠券列表
      })
      this.getTable = []
      this.showlog = false
      this.tableLoading = true
      this.$refs.Logs.writeLog(`正在请求数据......`, true)
      const res1 = await batchOperation(this.selectMallList, this.getInfo)
      this.$refs.Logs.writeLog(`请求数据结束`)
      this.tableLoading = false
      this.tableList = this.getTable
    },
    // 创建店铺优惠卷
    mallCoupon() {
      this.showlog = true
      if (!this.selectMallList.length) {
        this.$message.warning('请选择店铺')
        return
      }
      this.proVisible = true
    },
    async mallCouponFun() {
      // this.selectMallList.forEach(el => {
      //   this.createCoupon(el)
      // })
      if (this.discountNum > 100) {
        this.$message.warning('请输入有效折扣')
        return
      }
      if ((this.dateTime[1] - this.dateTime[0]) <= 3600 * 24 * 1000) {
        this.$message.warning('活动期间不能少于一天')
        return
      }
      if (this.couponName.length > 20) {
        this.$message.warning('关注礼名称不能超过20个字符')
        return
      }
      this.proVisible = false
      this.showlog = false
      this.$refs.Logs.writeLog(`正在创建任务......`)
      const res1 = await batchOperation(this.selectMallList, this.createCoupon)
      this.$refs.Logs.writeLog(`创建任务结束`)
      this.getTableList()
    },
    // 创建店铺优惠卷--接口
    async createCoupon(val, count = { count: 1 }) {
      try {
        let discount = null // 折扣--折扣
        let coin_cash_back = null // 虾皮折扣
        if (this.rewardType === '0') { // 普通折扣
          if (this.discountType === '0') {
            discount = {
              percentage: (100 - this.discountNum) / 10,
              cap: this.limitPrice === '0' ? null : this.maxPrice
            }
          } else {
            discount = {
              value: Number(this.discountNum)
            }
          }
        } else { // 虾皮折扣
          coin_cash_back = {
            percentage: this.discountNum,
            cap: this.limitPrice === '0' ? 0 : this.maxPrice
          }
        }

        const params = {
          country: val.country,
          mallId: val.platform_mall_id,
          discount: discount,
          end_time: this.dateTime[1] / 1000,
          follow_prize_name: this.couponName,
          min_spend: this.minPrice,
          quota: this.useQuantity,
          reward_type: this.rewardType,
          start_time: this.dateTime[0] / 1000
          // coin_cash_back: coin_cash_back
        }
        if (this.rewardType === '1') {
          params.coin_cash_back = coin_cash_back
        }
        const result = await this.MarketManagerAPIInstance.followPrizeCreate(params)// 创建优惠券
        if (result.ecode !== 0) {
          this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建失败：${result.message}`, false)
        } else {
          this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建成功`, true)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建失败：${error}};`, false)
      } finally {
        count.count--
      }
    }
  }
}
</script>
<style lang="less" scoped>
 .detail{
   min-width: 1200px;
     .row1,.row2{
       display: flex;
       align-items: center;
     }

  .edit-group-dialog {
  /deep/.el-dialog__body {
    // padding: 24px 15px;
        padding-top: 0px;
  }
  /deep/.el-form-item {
    margin-bottom: 0px;

  }
  /deep/.discountitem{
    .el-form-item__content{
          display: flex;
    }
  }
}
  /deep/.goodstable{
    .el-table__header-wrapper{
      .el-table__header{
        /deep/.has-gutter{
          .el-table__cell{
            padding: 0px 0px;
          }
        }
      }
    }
  }

 }
 .freightType{
       display: flex;
    align-items: baseline;
 }
</style>

