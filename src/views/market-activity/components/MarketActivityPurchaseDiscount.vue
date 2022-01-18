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
        <el-button size="mini" type="primary" style="margin-left:20px" @click="stopSearch">停止搜索</el-button>
      </div>

      <div class="row2" style="margin-top:8px">
        <!-- <el-button size="mini" type="primary" @click="stopSearch">取消查询</el-button> -->
        <el-button size="mini" type="primary" @click="mallCoupon">创建加购促销活动</el-button>
        <el-button size="mini" type="primary" @click="MallvoucherDelMul">批量删除/结束活动</el-button>
        <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
        <el-checkbox v-model="isShowPast" style="margin-left:-10px">不显示过期活动</el-checkbox>
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
        <u-table-column prop="add_on_deal_name" label="活动名称" align="center" min-width="150px" />
        <u-table-column prop="sub_type" label="活动类型" align="center" min-width="100px">
          <template v-slot="{row}">{{ Number(row.sub_type)===1?'消费满赠':'加购折扣' }}</template>
        </u-table-column>
        <u-table-column prop="voucher_status" label="活动状态" align="center" min-width="100px">
          <template v-slot="{row}">
            <span v-if="row.voucher_status==='进行中'" style="color:#0ad10a">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='即将开始'" style="color:orange">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='已过期'">{{ row.voucher_status }}</span>
          </template>
        </u-table-column>
        <u-table-column prop="" label="促销期间" align="center" min-width="200px">
          <template v-slot="{row}">
            <div style="display:flex;flex-flow: column;">
              <span>{{ row.formStartime }}-{{ row.formEndtime }}</span>
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="min_spend" label="操作" align="center" min-width="180px">
          <template v-slot="{row}">
            <div style="display:flex">
              <el-button v-if="row.voucher_status==='进行中'" size="mini" type="primary" @click="MallvoucherStopFun(row)">停止</el-button>
              <el-button v-if="row.voucher_status==='即将开始'" size="mini" type="primary" @click="MallvoucherDelFun(row)">删除</el-button>
              <el-button size="mini" type="primary" @click="clearLog">编辑商品</el-button>
              <el-button size="mini" type="primary" @click="clearLog">复制活动</el-button>
            </div>
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
                  <el-option v-for="mall in selectMallList" :key="mall.id" :label="mall.mall_alias_name || mall.platform_mall_name" :value="mall.id" />
                </el-select>
              </div>

              <div style="margin-left:50px">
                <!-- 保存之后就不可选了 -->
                <el-radio-group v-model="discountType">
                  <el-radio label="0">折扣优惠</el-radio>
                  <el-radio label="1">赠品满最低消费</el-radio>
                </el-radio-group>
                <span v-if="discountType==='0'" style="margin-left：20px">
                  加购限制
                  <!-- 必须在1-100 -->
                  <el-tooltip class="item" effect="dark" content="买家在同一个订单里最多加购的商品数量是(1-100)" placement="top-start">
                    <el-input v-model="addLimit" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  </el-tooltip>
                </span>
                <span v-if="discountType==='1'">
                  赠品规则 消费<el-input v-model="costNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  以获得
                  <el-tooltip class="item" effect="dark" content="赠品的数量应在(1-50)内" placement="top-start">
                    <el-input v-model="sendNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
                  </el-tooltip>
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
              <!-- 请求保存活动接口 -->
              <el-button size="mini" type="primary" style="margin-left:10px" @click="saveActiveInfo">保存活动</el-button>
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
              <li style="margin-bottom:5px">
                <el-button size="mini" type="primary">开启</el-button>
                <el-button size="mini" type="primary">关闭</el-button>
                <el-button size="mini" type="primary">删除</el-button>
                <!-- 先保存活动信息 -->
                <el-button size="mini" type="primary" style="margin-left: 65px">添加主要商品</el-button>
              </li>
              <!-- row2 -->
              <li>
                <el-table
                  :data="masterGoodslist"
                  :header-cell-style="{ background: '#f7fafa' }"
                  style="width: 360px"
                  height="400px"
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
              <li style="display:flex;margin-bottom:5px">
                <div>折扣：<el-input v-model="addGoodsDiscount" size="mini" style="width:50px" />%</div>
                <el-button size="mini" type="primary" style="margin-left:10px">批量更新</el-button>
                <el-button size="mini" type="primary">开启</el-button>
                <el-button size="mini" type="primary">关闭</el-button>
                <el-button size="mini" type="primary">删除</el-button>
                <!-- 先保存活动信息 -->
                <el-button size="mini" type="primary" style="margin-left: 200px">添加加购商品</el-button>
              </li>
              <li>
                <el-table
                  :data="addGoodsList"
                  :header-cell-style="{ background: '#f7fafa' }"
                  height="400px"
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
      arrList: [],
      willList: [],
      doingList: [],
      pastList: [],
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
      isShowPast: true,
      tableLoading: false,
      singerStop: false, // 单个停止
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      showlog: true,
      activeType: '0', // 活动
      tableList: [], // 主表数据
      proVisible: false, // 弹窗
      dialogtitle: '', // 弹窗标题s
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
    // this.initMall()
  },
  methods: {
    // 取消查询
    stopSearch() {
      terminateThread()
      this.stoptoping = true
      this.$refs.Logs.writeLog(`正在停止查询`)
    },
    // 保存活动
    saveActiveInfo() {
      if (this.discountType === '0' && (Number(this.addLimit) === 0 || Number(this.addLimit) > 100)) {
        this.$message.warning('请输入加购限制,限制范围在1-100')
        return
      }
      if (!this.proName.length || this.proName.length > 24) {
        this.$message.warning('请输入促销名称，名称长不可超过24个字符')
        return
      }
      const cTime = new Date().getTime()
      if (cTime > Number(this.proTime[0])) {
        this.$message.warning('请输入比当前较晚的开始时间')
        return
      }
      if (Number(this.proTime[1] - Number(this.proTime[0]) < 3600 * 1000)) {
        this.$message.warning('结束时间至少比开始时间晚一个小时')
        return
      }
      for (let i = 0; i < this.mallTableSelect.length; i++) {
        this.saveActiveInfoFun(this.mallTableSelect[i])
      }
    },
    async saveActiveInfoFun(val) {
      try {
        this.showlog = false
        const params = {
          country: val.country,
          mallId: val.platform_mall_id
        // add_on_deal_id,
        // add_on_deal_name,
        // start_time,
        // end_time,
        // sub_type,
        // sub_item_limit,
        // sub_item_priority
        }
        const res = await this.MarketManagerAPIInstance.saveActiveAddondeal(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功停止【${val.add_on_deal_name}】优惠活动------`, true)
        } else {
          this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】--catch,${error}`, false)
      }
    },

    // // 初始化店铺信息
    // initMall() {
    //   getMalls(res => {
    //     this.shopAccountMallList = res
    //   })
    // },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.mallTableSelect = val
    },
    // 批量删除/停止
    MallvoucherDelMul() {
      if (!this.mallTableSelect.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      this.$confirm('确定要删除或停止这些活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        for (let i = 0; i < this.mallTableSelect.length; i++) {
          const item = this.mallTableSelect[i]
          if (item.voucher_status === '即将开始') { // 删除
            await this.MallvoucherDel(item)
          }
          if (item.voucher_status === '进行中') { // 停止
            await this.MallvoucherStop(item)
          }
        }
        this.getTableList()
      })
    },
    // 停止
    MallvoucherStopFun(val) {
      this.$confirm('确定要停止该活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.MallvoucherStop(val)
        this.getTableList()
      })
    },
    async  MallvoucherStop(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.stopOndealList(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功停止【${val.add_on_deal_name}】优惠活动------`, true)
        } else {
          this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`停止【${val.add_on_deal_name}】--catch,${error}`, false)
      }
    },
    // 删除
    MallvoucherDelFun(val) {
      this.$confirm('确定要删除该活动吗？, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        await this.MallvoucherDel(val)
        this.getTableList()
      })
    },
    async  MallvoucherDel(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        add_on_deal_id: val.add_on_deal_id
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.delondealList(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------成功删除【${val.add_on_deal_name}】优惠活动------`, true)
        } else {
          let mes = ''
          if (res.message === 'only upcoming campaign can delete') {
            mes = '只有即将进行的活动才能删除'
          }
          this.$refs.Logs.writeLog(`删除【${val.add_on_deal_name}】优惠活动,${mes || res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`删除【${val.add_on_deal_name}】--catch,${error}`, false)
      }
      // if (this.singerStop) {
      // this.getTableList()
      // }
      // this.singerStop = false
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
    // 获取折扣信息
    async  getInfo(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          offset: item.offset,
          count: 50
        }
        const res = await this.MarketManagerAPIInstance.getAddondealList(params)
        if (res.ecode !== 0) {
          let message = ''
          if (res.message === 'token not found') {
            message = '店铺未登录'
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】数据请求失败,${message || res.message}`, false)
          return
        }
        let promotionsList = res.ecode === 0 ? res.data.data.add_on_deal_list : []
        if (!promotionsList.length) {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】暂无数据`)
          return
        }
        while (promotionsList.length) {
          if (this.stoptoping) {
            return
          }
          // 列表数据处理
          for (let i = 0; i < promotionsList.length; i++) {
            if (this.stoptoping) {
              return
            }
            const el = promotionsList[i]
            el.platform_mall_id = item.platform_mall_id
            el.country = item.country
            el.mallName = item.mall_alias_name || item.platform_mall_name
            el.formStartime = this.formatTime(el.start_time * 1000)
            el.formEndtime = this.formatTime(el.end_time * 1000)
            // 时间筛选
            if (Number(el.status) === 1) {
              el.voucher_status = '即将开始'
              this.willList.push(el)
            } else if (Number(el.status) === 2) {
              el.voucher_status = '进行中'
              this.doingList.push(el)
            } else {
              el.voucher_status = '已过期'
              this.pastList.push(el)
            }
            this.arrList.push(el)
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】,正在请求第【${(params.offset / params.count) + 1}】页`, true)
          if (promotionsList.length < params.count) {
            promotionsList.length = []
          } else {
            params.offset = params.offset + params.count
            const res = await this.MarketManagerAPIInstance.logisticsPromotion(params)
            promotionsList = res.data.code === 0 ? res.data.data.add_on_deal_list : []
          }
        }
        // 条件筛选
        if (this.isShowPast) {
          if (this.activeType === '0') {
            this.getTable = this.willList.concat(this.doingList)
          } else if (this.activeType === '1') {
            this.getTable = this.doingList
          } else if (this.activeType === '2') {
            this.getTable = this.willList
          } else {
            this.getTable = []
          }
        } else {
          if (this.activeType === '1') { this.getTable = this.doingList }
          if (this.activeType === '2') { this.getTable = this.willList }
          if (this.activeType === '3') { this.getTable = this.pastList }
          if (this.activeType === '0') { this.getTable = this.arrList }
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
      })
      this.getTable = []
      this.arrList = []
      this.willList = []
      this.doingList = []
      this.pastList = []
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

