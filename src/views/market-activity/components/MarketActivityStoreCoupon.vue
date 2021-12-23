<template>
  <div class="detail">
    <div class="condetion" style="background-color: white;padding:8px">
      <div class="row1">
        <storeChoose style="margin-left:-20px" :show-mall-all="true" @changeMallList="changeMallList" />
        <div>
          <label>优惠劵类型：</label>
          <el-select v-model="saleType" placeholder="请选择" size="mini" style="width:120px">
            <el-option label="全部" value="" />
            <el-option label="已预订" value="2" />
            <el-option label="进行中" value="3" />
            <el-option label="已结束" value="4" />
          </el-select>
        </div>
      </div>

      <div class="row2" style="margin-top:8px">
        <el-button size="mini" type="primary" @click="getTableList">查询</el-button>
        <el-button size="mini" type="primary">取消查询</el-button>
        <el-button size="mini" type="primary" @click="mallCoupon">创建店铺优惠劵</el-button>
        <el-button size="mini" type="primary" @click="goodsCoupon">创建商品优惠劵</el-button>
        <el-button size="mini" type="primary">停止创建活动</el-button>
        <el-button size="mini" type="primary">批量终止活动</el-button>
        <el-button size="mini" type="primary">批量删除活动</el-button>
        <el-button size="mini" type="primary">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">隐藏日志</el-checkbox>
      </div>
    </div>
    <Logs ref="Logs" v-model="showlog" clear />
    <div class="tableDetail" style="margin-top: 8px;">
      <u-table
        :data="tableList"
        height="600px"
        use-virtual
        :border="false"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <u-table-column type="selection" width="55" fixed />
        <u-table-column type="index" fixed label="序号" min-width="50px" />
        <u-table-column prop="" label="站点" align="center" min-width="50px" fixed>
          <template v-slot="{row}">{{ row.country | chineseSite }}</template>
        </u-table-column>
        <u-table-column prop="mallName" label="店铺" align="center" min-width="150px" />
        <u-table-column prop="name" label="优惠劵" align="center" min-width="150px" />
        <u-table-column prop="voucher_code" label="优惠码" align="center" min-width="180px" />
        <u-table-column prop="voucher_type" label="优惠类型" align="center" min-width="100px">
          <!-- <template v-slot="{row}">{{ row.rule && row.rule.shopids.length===0 ? '店铺优惠卷' :'商品优惠卷' }}</template> -->
        </u-table-column>
        <u-table-column prop="value" label="折扣金额" align="center" min-width="100px">
          <template v-slot="{row}">{{ row.value }}{{ row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column prop="" label="最高上限数额" align="center" min-width="100px" />
        <u-table-column prop="usage_limit" label="优惠劵可使用数量" align="center" min-width="150px" />
        <u-table-column prop="min_price" label="最低消费记录" align="center" min-width="100px" />
        <u-table-column prop="distributed_count" label="已领取" align="center" min-width="100px">
          <!-- <template v-slot="{row}">{{row.}}</template> -->
        </u-table-column>
        <u-table-column prop="current_usage" label="已使用" align="center" min-width="100px" />
        <u-table-column prop="" label="期间" align="center" min-width="200px">
          <template v-slot="{row}">
            <div>{{ row.formStartime }}-</div>
            <div>{{ row.formEndtime }}</div>
          </template>
        </u-table-column>
        <u-table-column prop="voucher_status" label="状态" align="center" min-width="100px">
          <template v-slot="{row}">
            <span v-if="row.voucher_status==='进行中'" style="color:#0ad10a">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='即将开始'" style="color:orange">{{ row.voucher_status }}</span>
            <span v-if="row.voucher_status==='已过期'">{{ row.voucher_status }}</span>
          </template>
        </u-table-column>
        <u-table-column prop="" label="是否在基本页面显示" align="center" min-width="150px">
          <template v-slot="{row}">{{ row.rule && row.rule.hide ?'是':'否' }}</template>
        </u-table-column>
        <u-table-column prop="" label="操作" align="center" min-width="100px" fixed="right">
          <template v-slot="{row}">
            <span> <el-button v-if="row.voucher_status==='进行中' || row.voucher_status==='即将开始'" size="mini" type="primary">删除</el-button> </span>
          </template>
        </u-table-column>
      </u-table>
    </div>
    <!-- 新建店铺优惠劵 -->
    <el-dialog
      class="edit-group-dialog"
      :visible.sync="CouponVisible"
      width="620px"
      top="5vh"
      :title="dialogtitle"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-form label-position="right" label-width="160px">

        <el-form-item label="当前站点">
          <!-- {{ rowx.goods_name }} -->
          泰国
        </el-form-item>

        <el-form-item label="币种">
          {{ }}(优惠劵活动使用的是当地币种)
          <!-- <el-input v-model="rowx.sku_name" size="mini" disabled/> -->
        </el-form-item>

        <el-form-item label="优惠劵名称">
          <el-input v-model="couponName" size="mini" style="width:260px" />
        </el-form-item>

        <el-form-item label="奖励类型">
          <el-radio-group v-model="rewardType">
            <!-- 折扣 -->
            <el-radio label="0">折扣</el-radio>
            <!-- shoppe币折扣 -->
            <el-radio label="1">Shoppe币折扣
              <el-tooltip class="item" effect="dark" content="买家使用Shoppee币回扣优惠劵并获得Shoppee币作为回报。Shoppee币成本将由您吸收" placement="right-start">
                <i class="el-icon-question" />
              </el-tooltip></el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="折扣类型 | 优惠限额" class="discountitem">
          <el-select v-if="rewardType==='0'" v-model="discountType" placeholder="请选择" size="mini" style="width:100px">
            <el-option label="折扣" value="0" />
            <el-option label="折扣金额" value="1" />
          </el-select>
          <!-- 选择折扣 -->
          <span v-if="rewardType==='1'">折扣 ：</span>
          <div>
            <el-input v-model="discountNum" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
            <span v-if="discountType==='0' || rewardType==='1'" style="color:red">%折扣,付款金额中的-%将退还给买家</span>
          </div>
          <!-- <div v-if="discountType==='0'" class="color:red"></div> -->
        </el-form-item>

        <el-form-item label="最高优惠金额">
          <el-radio-group v-model="limitPrice">
            <el-radio :label="0">无限制</el-radio>
            <el-radio :label="1">设置金额：<el-input v-model="maxPrice" size="mini" style="width:80px" onkeyup="value=value.replace(/[^\d]/g,0)" /></el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="最低消费金额">
          <el-input v-model="minPrice" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
        </el-form-item>

        <el-form-item label="优惠时限">
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
        </el-form-item>
        <el-form-item label="优惠劵可使用数量(必填)">
          <el-input v-model="useQuantity" size="mini" style="width:100px" onkeyup="value=value.replace(/[^\d]/g,0)" />
        </el-form-item>

        <el-form-item label="优惠劵显示页面">
          <el-radio-group v-model="couponhide">
            <el-radio label="0">在基本页面显示</el-radio>
            <el-radio label="1">不显示</el-radio>
          </el-radio-group>
          <!-- 选择--基本页面显示  -->
          <div v-if="couponhide==='0'" style="color:red;line-height: 16px;height:32px">选择此选项以便买家可以在商品页面，商品详情页面和购物车页面上查看您的优惠劵。</div>
          <!-- 选择--不显示 -->
          <div v-if="couponhide==='1'" style="color:red;line-height: 16px;height:32px">您的优惠劵不会显示在任何页面上但您可以与用户分享优惠劵代码。</div>
        </el-form-item>

        <el-form-item label="优惠商品">
          <!-- 店铺优惠卷  coupontype 1-->
          <span v-if="coupontype==='1'">所有商品</span>
          <!-- 商品优惠卷 coupontype 2 -->
          <div v-if="coupontype==='2'">
            <el-button size="mini" type="primary">添加商品</el-button>
            <!--商品优惠卷 表格 -->
            <el-table
              class="goodstable"
              :data="couponGoodslist"
              :header-cell-style="{ background: '#f7fafa' }"
              height="120px"
            >
              <el-table-column prop="id" label="商品ID" align="center" min-width="100px" />
              <el-table-column label="操作" align="center" min-width="100px">
                <template><span><el-button size="mini" type="primary">删除</el-button></span></template>
              </el-table-column>
            </el-table>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button v-if="coupontype==='1'" size="mini" type="primary">创建店铺优惠劵</el-button>
          <el-button v-if="coupontype==='2'" size="mini" type="primary">创建商品优惠劵</el-button>
          <el-button size="mini" type="primary">取消</el-button>
        </el-form-item>
      </el-form>
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
      MarketManagerAPIInstance: new MarketManagerAPI(this),
      showlog: true,
      saleType: '', // 优惠卷
      tableList: [], // 主表数据
      CouponVisible: false, // 弹窗
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
      dateTime: [], // 优惠时限
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() < (new Date().getTime() - 3600 * 1000 * 24)
        }
      },
      useQuantity: '', // 优惠劵可使用数量
      couponhide: '0', // 优惠劵显示页面 0 在基本页面显示 1 不显示
      couponGoodslist: [], // 优惠卷指定商品
      selectMallList: [], // 选择的店铺
      stoptoping: false
    }
  },
  // computed:{
  //   discountType(){

  //   }
  // },

  methods: {
    // 取消查询
    stopSearch() {
      terminateThread()
      this.stoptoping = true
      this.$refs.autoReplyLogs.writeLog(`正在停止查询`)
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
        const res = await this.MarketManagerAPIInstance.Mallvoucher(params)
        if (res.ecode === 0) {
          const list = res.data.data.voucher_list
          list.forEach(el => {
            el.country = item.country
            el.mallName = item.mall_alias_name || item.platform_mall_name
            el.voucher_type = el.rule.shopids?.length > 0 ? '店铺优惠卷' : '商品优惠卷'
            el.formStartime = this.formatTime(el.start_time * 1000)
            el.formEndtime = this.formatTime(el.end_time * 1000)
            const nowD = new Date().getTime()
            if (nowD < el.start_time * 1000) {
              el.voucher_status = '即将开始'
            } else if (nowD > el.start_time * 1000 && nowD < el.end_time * 1000) {
              el.voucher_status = '进行中'
            } else {
              el.voucher_status = '已过期'
            }
          })
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】总数据：${res.data.data.total_count}条,正在请求第【${(params.offset / params.limit) + 1}】页`, true)
          this.getTable.push(...list)// 存储数据
          if (res.data.list?.length >= params.limit) {
            item.offset = item.offset + params.limit
            this.getInfo(item, { count: 1 })
          }
        } else {
          this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】${res.message}`, false)
        }
      } catch (error) {
        this.$refs.Logs.writeLog(`【${item.mall_alias_name || item.platform_mall_name}】--catch，${error}`, false)
      } finally {
        count.count--
      }
    },
    // 初始化
    async getTableList() {
      this.selectMallList.forEach(el => {
        el.offset = 0
      })
      this.getTable = []
      this.showlog = false
      this.$refs.Logs.writeLog(`开始请求数据`, true)
      const res1 = await batchOperation(this.selectMallList, this.getInfo)
      this.$refs.Logs.writeLog(`请求数据结束`)
      this.tableList = this.getTable
    },
    // 创建店铺优惠卷
    mallCoupon() {
      this.CouponVisible = true
      this.coupontype = '1'
      this.dialogtitle = '新建店铺优惠劵'
    },
    // 创建商品优惠卷
    goodsCoupon() {
      this.CouponVisible = true
      this.coupontype = '2'
      this.dialogtitle = '新建商品优惠劵'
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
</style>

