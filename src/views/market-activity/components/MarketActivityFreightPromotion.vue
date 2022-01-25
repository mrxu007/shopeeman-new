<template>
  <div class="detail">
    <div class="condetion" style="background-color: white;padding:8px">
      <div class="row1">
        <storeChoose style="margin-left:-20px" :show-mall-all="true" @changeMallList="changeMallList" />
        <div style="margin-left:20px">
          <label>活动：</label>
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
        <el-button size="mini" type="primary" @click="addProTest">创建运费促销活动</el-button>
        <el-button size="mini" @click="stopCreate">停止活动创建</el-button>
        <el-button size="mini" type="primary" @click="MallstopTestMul">批量结束勾选活动</el-button>
        <el-button size="mini" type="primary" @click="clearLog">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
        <el-checkbox v-model="isShowPast">不显示过期活动</el-checkbox>
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
        <u-table-column prop="" label="站点" align="center" min-width="50px" fixed>
          <template v-slot="{row}">{{ row.country | chineseSite }}</template>
        </u-table-column>
        <u-table-column prop="mallName" label="店铺" align="center" min-width="100px" />
        <u-table-column prop="promotion_name" label="促销名称" align="center" min-width="150px" />
        <u-table-column prop="voucher_status" label="活动状态" align="center" min-width="80px">
          <template v-slot="{row}">
            <span v-if="row.voucher_status==='进行中'" style="color:#0ad10a">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='即将开始'" style="color:orange">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='已过期'">{{ row.voucher_status }}</span>
          </template>
        </u-table-column>
        <u-table-column prop="" label="促销期间" align="center" min-width="120px">
          <template v-slot="{row}">
            <div>
              <div v-if="row.end_time === 3220050630">
                无限制
              </div>
              <div v-else style="display:flex;flex-flow: column;">
                <span>{{ row.formStartime }}-</span>
                <span>{{ row.formEndtime }}</span>
              </div>
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="deliverWay" label="运送渠道" align="center" min-width="180px" />
        <u-table-column prop="topNum" label="运费" align="center" min-width="150px">
          <template v-slot="{row}">
            <div v-for="(i,index) in row.tiers" :key="index" style="display:flex">
              <span>购买满{{ row.country | siteCoin }}{{ i.min_order_total }},</span>
              <span v-if="Number(i.discount_delta)===0">免运费</span>
              <span v-else>运费减免{{ row.country | siteCoin }}{{ i.discount_delta }}</span>
            </div>
          </template>
        </u-table-column>
        <u-table-column prop="min_spend" label="操作" align="center" min-width="80px" fixed="right">
          <template v-slot="{row}">
            <el-button v-if="row.voucher_status==='进行中'" type="primary" size="mini" @click="MallstopTest(row)">停止</el-button>
            <el-button v-if="row.voucher_status==='即将开始'" type="primary" size="mini" @click="MalldelTest(row)">删除 </el-button>
          </template>
        </u-table-column>
      </u-table>
    </div>
    <!-- 运费促销 -->
    <el-dialog
      class="edit-group-dialog"
      :visible.sync="proVisible"
      width="860px"
      top="5vh"
      title="运费促销"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="160px">

        <el-form-item label="促销名称">
          <el-input v-model="proName" placeholder="字符长度需小于20" size="mini" style="width:200px" />
        </el-form-item>

        <el-form-item label="促销时间" style="color:red">
          <el-radio-group v-model="proTimeType">
            <el-radio label="0">无限制</el-radio>
            <el-radio label="1">所选的促销期间
              <el-date-picker
                v-model="proTime"
                style="width:330px;"
                size="mini"
                value-format="timestamp"
                type="datetimerange"
                range-separator="-"
                start-placeholder="开始日期"
                end-placeholder="结束日期"
                :picker-options="pickerOptions"
                @focus="proTimeType='1'"
              />
            </el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="运输渠道">
          <!-- 从接口获取 -->
          <el-checkbox-group v-model="deliverWay">
            <el-checkbox v-for="item in deliverWayList" :key="item.channelid" :disabled="isDeliverWay" :label="item.channelid">{{ item.name }}</el-checkbox>
          </el-checkbox-group>
          <el-button size="mini" type="primary" @click.native="getdeliverWay(),showlog=false">刷新物流渠道</el-button>
        </el-form-item>

        <el-form-item label="运费" align="center">
          <!-- 表格 -->
          <el-table :data="freightlist" :header-cell-style="{ background: '#f7fafa' }" :row-style="{ height: '60px' }">
            <el-table-column type="index" label="阶层" max-width="60px" />
            <el-table-column prop="minCost" label="最低消费金额" width="190px">
              <template slot-scope="scope">
                {{ selectMallList[0] && selectMallList[0].country | siteCoin }}
                |
                <el-tooltip class="item" effect="dark" :content="content1" placement="top-start">
                  <span>
                    <el-input v-model="scope.row.minCost" size="mini" style="width:120px;" onkeyup="value=value.replace(/[^\d]/g,0)" @focus="checkMinCost(scope.row,scope.$index)" @blur="clearCost(scope.row)" /><br>
                  </span>
                </el-tooltip>
                <span style="color:red;margin-top: -4px;">
                  {{ scope.row.minCostLimit }}
                </span>
                <!-- <span v-if="scope.$index>1">少过{{ freightlist[scope.$index-1].minCost }}。</span> -->
              </template>
            </el-table-column>
            <el-table-column prop="freight" label="运费" width="340px">
              <template slot-scope="scope">
                <el-radio-group v-model="scope.row.freightType" class="freightType" @change="changeFreightType(scope.row)">
                  <el-radio label="1">免运费</el-radio>
                  <el-radio label="0">
                    补贴{{ selectMallList[0] && selectMallList[0].country | siteCoin }}|
                    <el-tooltip class="item" effect="dark" :content="content2" placement="top-start">
                      <span>
                        <el-input v-model="scope.row.freight" size="mini" style="width:120px" @focus="checkFreightCost(scope.row,scope.$index)" @blur="clearFreight(scope.row)" /><br>
                      </span>
                    </el-tooltip>
                    <span v-if="scope.row.freightType==='0'" style="color:red">
                      {{ scope.row.freightLimit }}
                    </span>
                    <!-- <span v-if="scope.$index>1 && scope.row.freightType==='0'">少过{{ freightlist[scope.$index-1].freight }}。</span> -->
                  </el-radio>
                </el-radio-group>
              </template>
            </el-table-column>
            <el-table-column prop="" label="操作" width="80px" align="center">
              <template v-slot="{row}">
                <el-button v-if="freightlist.length>1" size="mini" type="primary" @click="delrule(row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 按钮 -->
          <span v-if="freightlist.length>1" style="color:red;margin-left:-330px">
            较高的最低消费将享有较高的运费折扣。免运费只能使用一层
          </span>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" :disabled="freightlist.length>=3" @click="addRule">新增促销规则</el-button>
        </el-form-item>
        <el-form-item>
          <el-button size="mini" type="primary" @click="addProTestFun">保存</el-button>
          <el-button size="mini" type="primary" @click="proVisible=false">取消</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>

<script>
import { forEach } from 'jszip'
import storeChoose from '../../../components/store-choose'
import MarketManagerAPI from '../../../module-api/market-manager-api/market-data'
import { GoodsMallgetValue, getMalls, batchOperation, terminateThread } from '../../../util/util'
import { t } from 'umy-table/lib/locale'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      runload: false, // 刷新加载按钮
      freightArrange: {
        MY: {
          MaxMinAmmount: 10000.00, // 最低消费金额的最大
          MinAmmount: 0, // 最低消费金额的最小值
          MaxFreeAmmount: 10000.00, // 补贴的最大值
          FreeAmmount: 0.50 // 补贴的最小值
        },
        VN: {
          MinAmmount: 0,
          FreeAmmount: 1,
          MaxFreeAmmount: 999000,
          MaxMinAmmount: 20000000
        },
        PH: {
          MinAmmount: 0,
          FreeAmmount: 1,
          MaxFreeAmmount: 999,
          MaxMinAmmount: 5000
        },
        ID: {
          MinAmmount: 0,
          FreeAmmount: 1,
          MaxFreeAmmount: 500000,
          MaxMinAmmount: 5000000
        },
        TW: {
          MinAmmount: 0,
          FreeAmmount: 0,
          MaxFreeAmmount: 999999999,
          MaxMinAmmount: 999999999
        },
        TH: {
          MinAmmount: 0,
          FreeAmmount: 1,
          MaxFreeAmmount: 1500,
          MaxMinAmmount: 30000
        },
        BR: {
          MinAmmount: 999999999,
          FreeAmmount: 0,
          MaxFreeAmmount: 999999999,
          MaxMinAmmount: 0
        },
        SG: {
          MinAmmount: 0,
          FreeAmmount: 0.5,
          MaxFreeAmmount: 999999.00,
          MaxMinAmmount: 5000
        }
      },
      arrList: [],
      willList: [],
      doingList: [],
      pastList: [],
      isDeliverWay: false, // 运输渠道是否可选
      deliverWayList: [], // 获取物流
      // isNolimit: 0, // 时间限制规则： 0(无限制、选择限制) 1（有时间限制） -1(无限制)
      freightlist: [
        {
          minCost: '',
          freightType: '0',
          freight: '',
          minCostLimit: '', // 消费提示
          freightLimit: '' // 运费提示
        }
      ], // 运费列表
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
      dialogtitle: '', // 弹窗标题
      coupontype: '2', // 创建优惠卷类型 1.店铺 2.商品
      // 创建优惠卷参数
      couponName: '', // 优惠劵名称
      rewardType: '0', // 奖励类型 0 折扣 1 Shoppe币折扣
      discountType: '1', // 0 折扣 1 折扣金额
      discountNum: '', // 折扣数额
      limitPrice: '0', // 最高优惠金额限制类型 0 无限制 1设置金额
      maxPrice: '', // 最高优惠金额
      minPrice: '', // 最低消费金额
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      useQuantity: '', // 优惠劵可使用数量
      couponhide: '0', // 优惠劵显示页面 0 在基本页面显示 1 不显示
      couponGoodslist: [], // 优惠卷指定商品
      selectMallList: [], // 选择的店铺
      stoptoping: false,
      mallTableSelect: [],
      getTable: [],
      minCostLimit: '', // 最低消费金额
      freightLimit: ''// 最低运费
    }
  },
  computed: {
    content1() {
      const maxCost = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MaxMinAmmount
      const minCost = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MinAmmount
      return `当前站点最低消费金额取值范围${minCost}-${maxCost}`
    },
    content2() {
      const maxFree = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MaxFreeAmmount
      const minFree = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].FreeAmmount
      return `当前站点运费折扣取值范围${minFree}-${maxFree}`
    }
  },
  // computed:{
  //   discountType(){

  //   }
  // },
  created() {
    // this.freightlist.push(this.freightobj)
  },
  methods: {
    // 获取物流[一次只能单个店铺查询]
    async getProDelivery(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id
      }
      try {
        this.$refs.Logs.writeLog(`正在获取【${val.mall_alias_name || val.platform_mall_name}】物流信息`)
        const res = await this.MarketManagerAPIInstance.ProDelivery(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`获取【${val.mall_alias_name || val.platform_mall_name}】物流成功`, true)
          const array = res.data.data.enabled || []
          if (!array.length) {
            this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】暂无物流选项`, false)
            return
          }
          if (!this.deliverWayList.length) {
            this.deliverWayList = array
          } else {
            array.forEach(el => {
              const index = this.deliverWayList.findIndex(ol => { return (el.channelid) === (ol.channelid) })
              if (index < 0) {
                this.deliverWayList.push(el)
              }
            })
          }
          // array?.forEach(el => {
          //   if (this.deliverWayList.length) {
          //     // 过滤重复物流
          //     const index = this.deliverWayList.findIndex(ol => { return ol === el })
          //     if (index < 0) {
          //       this.deliverWayList = this.deliverWayList.push(el)
          //     }
          //   } else {
          //     this.deliverWayList = this.deliverWayList.concat(array)
          //   }
          // })
        } else {
          let mes = ''
          if (res.message === 'token not found') {
            mes = '店铺未登录'
          }
          this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】物流：${mes || res.message}`, false)
        }
      } catch (error) {
        this.$message.warning(`${error}`)
      }
    },
    // 删除表单规则
    delrule(val) {
      const index = this.couponGoodslist.findIndex(el => { return el === val })
      this.freightlist.splice(index, 1)
    },
    // 保存
    save() {},
    // 新增运费规则
    addRule() {
      const fobj = {
        minCost: '',
        freightType: '0',
        freight: ''
      }
      this.freightlist.push(fobj)
    },
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    },
    // 多选
    handleSelectionChange(val) {
      this.mallTableSelect = val
    },
    // 批量结束运费促销
    MallstopTestMul() {
      if (!this.mallTableSelect.length) {
        this.$message.warning('请选择要操作的数据')
        return
      }
      this.$confirm('您确定要结束此运费促销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        for (let i = 0; i < this.mallTableSelect.length; i++) {
          await this.MallstopTestFun(this.mallTableSelect[i])
        }
        this.getTableList()
      }).catch(() => {
      })
    },
    // 结束运费促销
    MallstopTest(val) {
      this.$confirm('您确定要结束此运费促销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.MallstopTestFun(val)
      }).catch(() => {
      })
    },
    async  MallstopTestFun(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        datainfo: val
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.stopPromotion(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------已停止【${val.promotion_name}】优惠活动------`, true)
          this.$set(val, 'voucher_status', '已过期')
          this.$set(val, 'formEndtime', this.formatTime(new Date().getTime()))
          this.$set(val, 'end_time', new Date().getTime() / 1000)
        } else {
          this.$refs.Logs.writeLog(`停止【${val.promotion_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`停止【${val.promotion_name}】--catch,${error}`, false)
      }
    },
    // 删除运费促销
    async MalldelTest(val) {
      this.$confirm('您确定要删除此运费促销吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.MalldelTestFun(val)
      }).catch(() => {
      })
    },
    async MalldelTestFun(val) {
      const params = {
        country: val.country,
        mallId: val.platform_mall_id,
        datainfo: val
      }
      try {
        this.showlog = false
        const res = await this.MarketManagerAPIInstance.stopPromotion(params)
        if (res.ecode === 0) {
          this.$refs.Logs.writeLog(`------已删除【${val.promotion_name}】优惠活动------`, true)
          const index = this.tableList.findIndex(el => { return el === val })
          this.tableList.splice(index, 1)
        } else {
          this.$refs.Logs.writeLog(`删除【${val.promotion_name}】优惠活动,${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`删除【${val.promotion_name}】--catch,${error}`, false)
      }
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
    // 获取运费促销列表
    async  getInfo(item, count = { count: 1 }) {
      try {
        const params = {
          country: item.country,
          mallId: item.platform_mall_id,
          offset: item.offset,
          limit: 10
        }
        const res = await this.MarketManagerAPIInstance.logisticsPromotion(params)
        if (res.ecode !== 0) {
          let message = ''
          if (res.message === 'token not found') {
            message = '店铺未登录'
          }
          if (res.message === 'marketing module no permission') {
            message = '营销无权限模块'
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】数据请求失败,${message || res.message}`, false)
          return
        }
        let promotionsList = res.ecode === 0 ? res.data.data.promotions : []
        let channels_info = res.ecode === 0 ? res.data.data.channels_info : []
        if (!promotionsList.length) {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】暂无数据`)
          return
        }
        while (promotionsList.length) {
          // 列表数据处理
          for (let i = 0; i < promotionsList.length; i++) {
            const el = promotionsList[i]
            el.platform_mall_id = item.platform_mall_id
            el.country = item.country
            el.mallName = item.mall_alias_name || item.platform_mall_name
            el.formStartime = this.formatTime(el.start_time * 1000)
            el.formEndtime = this.formatTime(el.end_time * 1000)
            // 时间筛选
            const nowD = new Date().getTime()
            if (nowD < el.start_time * 1000) {
              el.voucher_status = '即将开始'
              this.willList.push(el)
            } else if (nowD > el.start_time * 1000 && nowD < el.end_time * 1000) {
              el.voucher_status = '进行中'
              this.doingList.push(el)
            } else {
              el.voucher_status = '已过期'
              this.pastList.push(el)
            }
            // 运输渠道
            const index = channels_info.findIndex(ol => { return Number(el.channel_ids[0]) === Number(ol.channel_id) })
            el.deliverWay = channels_info[index].name
            el.channalData = channels_info[index]
            this.arrList.push(el)
          }
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】总数据：${res.data.data.total_num}条,正在请求第【${(params.offset / params.limit) + 1}】页`, true)
          if (promotionsList.length < params.limit) {
            promotionsList.length = []
          } else {
            params.offset = params.offset + params.limit
            const res = await this.MarketManagerAPIInstance.logisticsPromotion(params)
            promotionsList = res.data.code === 0 ? res.data.data.promotions : []
            channels_info = res.data.code === 0 ? res.data.data.channels_info : []
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
    // 初始化
    async getTableList() {
      this.$refs.multipleTable.clearSelection()// 清空多选
      // this.clearLog()
      this.selectMallList.forEach(el => {
        el.offset = 0
        el.prizeList = [] // 优惠券列表
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
    // 创建促销任务--运费规则
    checkMinCost(val, int) {
      // if (!Number(val) || Number(val) > 10000) {
      //   this.minCostLimit = '最低消费金额范围0 -30000'
      // } else {
      //   this.minCostLimit = ''
      // }
      if (this.freightlist.length > 1) {
        for (let i = 0; i < this.freightlist.length; i++) {
          if (int === i) continue
          const item = this.freightlist[i]
          if (item.freightType === '1') { // 免运费
            this.$set(val, 'minCostLimit', `少过${item.minCost}`)
          }
        }
      }
    },
    clearCost(val) {
      this.$set(val, 'minCostLimit', ``)
    },
    clearFreight(val) {
      this.$set(val, 'freightLimit', ``)
    },
    // 改变运费类型选择，清空输入框
    changeFreightType(val) {
      this.$set(val, 'freight', ``)
    },
    checkFreightCost(val, int) {
      // if (!Number(val) || Number(val) > 1500) {
      //   this.freightLimit = '最低消费金额范围0 -1500'
      // } else {
      //   this.freightLimit = ''
      // }
      // // 运费规则限制
      const aa = [] // 折扣数组
      if (this.freightlist.length > 1) {
        for (let i = 0; i < this.freightlist.length; i++) {
          if (int === i) continue
          const item = this.freightlist[i]
          if (item.freightType === '1') { // 免运费
            this.$set(val, 'freightLimit', `多于${aa[0] || '0'}`)
          } else { // 不免运费
            aa.push(Number(item.freight))
            if (Number(item.minCost) > Number(val.minCost)) {
              this.$set(val, 'freightLimit', `少过${Math.min(...aa)}`)
            } else {
              this.$set(val, 'freightLimit', `多过${Math.max(...aa)}`)
            }
          }
          // if (item.freightType !== '1' && Number(item.minCost) < Number(val.minCost)) { // 补贴
          //   this.$set(val, 'freightLimit', `少过${item.freight || 0}`)
          // } else if (item.freight !== '1' && Number(item.minCost) > Number(val.minCost)) {
          //   this.$set(val, 'freightLimit', `多过${item.freight}`)
          // } else {
          //   this.$set(val, 'freightLimit', ``)
          // }
        }
        console.log(aa)
      }
    },
    // 创建促销任务--显示弹窗
    addProTest() {
      this.showlog = true
      if (!this.selectMallList.length) {
        this.$message.warning('请选择需要创建的店铺')
        return
      }
      this.proVisible = true
      this.deliverWayList = []
      this.getdeliverWay()
    },
    // 物流接口
    async getdeliverWay() {
      for (let i = 0; i < this.selectMallList.length; i++) {
        await this.getProDelivery(this.selectMallList[i])// 获取物流
      }
      this.$refs.Logs.writeLog(`物流请求结束`)
    },
    // 创建促销任务--执行1
    async addProTestFun() {
      if (!this.proName || this.proName.length > 20) {
        this.$message.warning('促销名称不能为空，且不能大于20个字符')
        return
      }
      if (this.proTime.length) { // 自动勾选该选项
        this.proTimeType === '1'
      }
      if (this.proTimeType === '1') {
        if (!this.proTime.length) {
          this.$message.warning('请选择活动有效时间')
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
      }
      if (!this.deliverWay.length) {
        this.$message.warning('运输渠道不能为空')
        return
      }
      // 消费金额取值范围
      const maxCost = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MaxMinAmmount
      const minCost = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MinAmmount
      // 运费促销取值范围
      const maxFree = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].MaxFreeAmmount
      const minFree = this.freightArrange[this.selectMallList[0].country.toLocaleUpperCase()].FreeAmmount
      for (let j = 0; j < this.freightlist.length; j++) {
        const el = this.freightlist[j]
        if (!el.minCost || (el.freightType === '0' && !el.freight)) {
          this.$message.warning('请设置运费规则')
          return
        }
        if (Number(el.minCost) > maxCost || Number(el.minCost) < minCost) {
          this.$message.warning(`当前站点最低消费金额取值范围${minCost}-${maxCost}`)
          return
        }
        if (el.freightType !== '1' && (Number(el.freight) > maxFree || Number(el.freight) < minFree)) {
          this.$message.warning(`当前站点运费折扣取值范围${minFree}-${maxFree}`)
          return
        }

        for (let k = 0; k < this.freightlist.length; k++) {
          if (j === k) continue
          const ol = this.freightlist[k]
          if (el.freightType === '1' && ol.freightType === '1') {
            this.$message.warning('免运费只能使用在一层，且在最低消费金额最大层')
            return
          }
          if (el.freightType === '1' && Number(el.minCost) < Number(ol.minCost)) {
            this.$message.warning('免运费只能使用在最低消费金额最大层')
            return
          }
          if (el.freightType !== '1' && ol.freightType !== '1' && Number(el.minCost) < Number(ol.minCost) && Number(el.freight) > Number(ol.freight)) {
            this.$message.warning('更高的最低消费金额应有更高的运费折扣金额')
            return
          }
        }
      }

      // if (this.freightlist.length>1) {
      //   this.freightlist.forEach(el => {
      //      this.freightlist.forEach(ol=>{
      //        if (el.freightType==='1' && el.minCost>=ol.minCost && ol.freight>0) { //免运费

      //        }
      //      })
      //   });
      // for (let i = 0; i < this.freightlist.length; i++) {
      //   if (i >= 1) {
      //     if (this.freightlist[i].minCost >= this.freightlist[i - 1].minCost) {
      //       this.$message.warning('多层最低消费金额应小于上一层最低消费金额')
      //       return
      //     }
      //     if (this.freightlist[0].freightType !== '1' && this.freightlist[i].freightType === '1') {
      //       this.$message.warning('免运费应在最高层使用')
      //       return
      //     }
      //     if (this.freightlist[0].freightType !== '0' && this.freightlist[i].freight >= this.freightlist[i - 1].freight) {
      //       this.$message.warning('多层运费金额应小于上一层运费金额')
      //       return
      //     }
      //   }
      // }
      // }
      this.proVisible = false
      this.showlog = false
      this.$refs.Logs.writeLog(`正在创建任务......`)
      const res1 = await batchOperation(this.selectMallList, this.createPromiton)
      this.$refs.Logs.writeLog(`创建任务结束`)
      this.getTableList()
    },
    // 创建促销任务--执行2
    async createPromiton(val, count = { count: 1 }) {
      // 时间
      let sTime = ''
      let eTime = ''
      if (this.proTimeType === '0') {
        sTime = Math.floor(new Date().getTime() / 1000)
        eTime = 3220050630
      } else {
        sTime = Math.floor(Number(this.proTime[0]) / 1000)
        eTime = Math.floor(Number(this.proTime[1]) / 1000)
      }
      // 运费列表
      const tierList = []
      this.freightlist.forEach((el, index) => {
        const tier = {
          discount_flag: el.freightType === '0' ? 4 : 2, // 2 免运费 4 运费减免
          placeholder: el.freightLimit,
          index: index,
          min_order_total: Number(el.minCost),
          discount_delta: el.freightType === '0' ? Number(el.freight) : 0
        }
        tierList.push(tier)
      })
      try {
        const params = {
          country: val.country,
          mallId: val.platform_mall_id,
          start_time: sTime,
          end_time: eTime,
          tiers: tierList,
          channel_ids: this.deliverWay,
          promotion_name: this.proName
        }
        console.log(params.channel_ids)
        const result = await this.MarketManagerAPIInstance.checkPromotionTest(params)// 创建优惠券
        if (result.ecode !== 0) {
          let mes = ''
          if (result.data.code === 1400109500) {
            mes = '所选期间与该店铺的其他活动期间重叠'
          }
          if (result.data.code === 1400101105) {
            mes = '运输渠道未知,或者时间勾选错误'
          }
          if (result.message === 'token not found') {
            mes = '店铺未登录'
          }
          this.$refs.Logs.writeLog(`【${val.mall_alias_name || val.platform_mall_name}】创建失败：${mes || result.message}`, false)
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

