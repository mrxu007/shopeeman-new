<template>
  <div class="detail">
    <div class="condetion" style="background-color: white;padding:8px">
      <div class="row1">
        <storeChoose style="margin-left:-20px" :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
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
        <el-button size="mini" type="primary">查询</el-button>
        <el-button size="mini" type="primary">取消商品</el-button>
        <el-button size="mini" type="primary" @click="mallCoupon">创建店铺优惠劵</el-button>
        <el-button size="mini" type="primary" @click="goodsCoupon">创建商品优惠劵</el-button>
        <el-button size="mini" type="primary">停止创建活动</el-button>
        <el-button size="mini" type="primary">批量终止活动</el-button>
        <el-button size="mini" type="primary">批量删除活动</el-button>
        <el-button size="mini" type="primary">清除日志</el-button>
        <el-checkbox v-model="showlog" style="margin-left:8px">商品点赞</el-checkbox>
      </div>
    </div>
    <div class="tableDetail" style="margin-top: 8px;">
      <el-table
        :data="tableList"
        height="calc(100vh - 100px)"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column type="index" fixed label="序号" min-width="50px" />
        <el-table-column prop="" label="站点" align="center" min-width="50px" fixed />
        <el-table-column prop="" label="店铺" align="center" min-width="150px" />
        <el-table-column prop="" label="优惠劵" align="center" min-width="100px" />
        <el-table-column prop="" label="优惠码" align="center" min-width="100px" />
        <el-table-column prop="" label="优惠类型" align="center" min-width="100px" />
        <el-table-column prop="" label="折扣金额" align="center" min-width="100px" />
        <el-table-column prop="" label="最高上限数额" align="center" min-width="100px" />
        <el-table-column prop="" label="优惠劵壳使用数量" align="center" min-width="150px" />
        <el-table-column prop="" label="最低消费记录" align="center" min-width="100px" />
        <el-table-column prop="" label="已领取" align="center" min-width="100px" />
        <el-table-column prop="" label="已使用" align="center" min-width="100px" />
        <el-table-column prop="" label="期间" align="center" min-width="100px" />
        <el-table-column prop="" label="状态" align="center" min-width="100px" />
        <el-table-column prop="" label="是否在基本页面显示" align="center" min-width="150px" />
        <el-table-column prop="" label="操作" align="center" min-width="100px" fixed="right" />
      </el-table>
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

export default {
  components: {
    storeChoose
  },
  data() {
    return {
      showlog: false,
      saleType: '', // 优惠卷
      tableList: [], // 主表数据
      CouponVisible: true, // 弹窗
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
      couponGoodslist: [] // 优惠卷指定商品
    }
  },
  // computed:{
  //   discountType(){

  //   }
  // },

  methods: {

    changeMallList() {},
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

