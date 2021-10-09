<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-09 18:27:05
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\components\PersonalCenterCheckaccounting.vue
-->
<template>
  <div class="check-account">
    <!-- btn区 -->
    <div class="header-btn">
      <div class="btn-item mar-right">
        统计时间：
        <el-date-picker
          v-model="statisticsTime"
          size="mini"
          value-format="yyyy-MM-dd"
          type="daterange"
          style="width: 200px"
          range-separator="-"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          :picker-options="pickerOptions"
        >
        </el-date-picker>
      </div>
      <el-button type="primary" size="mini" class="mar-right">查 询</el-button>
      <el-button type="primary" size="mini" class="mar-right">查看列表数据</el-button>
      <el-button type="primary" size="mini" class="mar-right">导 出</el-button>
    </div>
    <!-- 数据总览 -->
    <div class="overview">
        <el-row :span="24">
            <el-col :span="6">
                <div class="overview-cart">
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">充值总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">采购商品退回金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">退件总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6" >
                <div class="overview-cart">
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">翻译总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">主体IP消费总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">总消费金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="overview-cart">
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">采购商品总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">异常赔付总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">总收入金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                </div>
            </el-col>
            <el-col :span="6">
                <div class="overview-cart">
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">仓库发货总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                    <div class="cart-item">
                        <img src="../../../assets/img/default.png" class="mar-right" alt="">
                        <span class="text-center mar-right">其他总金额（元）</span>
                        <span class="text-right">0</span>
                    </div>
                </div>
            </el-col>
        </el-row>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      statisticsTime: [], //统计时间
      //不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
    }
  },
  methods: {},
}
</script>

<style lang="less" scoped>
.check-account {
  padding: 16px;
  background: #fff;
}
.mar-right {
  margin-right: 10px;
}
// btn区
.header-btn {
  display: flex;
  .btn-item {
    display: felx;
    align-items: center;
  }
}
// 数据总览
.overview{
    margin-top: 10px;
    .overview-cart{
        padding: 16px;
        font-size: 18px;
        .cart-item{
            display: flex;
            align-items: center;
            padding: 10px;
            img{
                height: 32px;
                width: 32px;
            }
            span{
                display: inline-block;
            }
            .text-center{
                flex: 1;
            }
            .text-right{
                width: 40px;
                font-weight: 900;
                font-size: 24px;
            }
        }
    }
}
</style>