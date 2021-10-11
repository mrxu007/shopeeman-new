<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-11 15:47:27
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
          <div class="overview-card">
            <el-card shadow="always" class="cart">
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">充值总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">采购商品退回金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">退件总金额（元）</span>
                <span class="text-right">0</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">翻译总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">主体IP消费总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">总消费金额（元）</span>
                <span class="text-right">0</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">采购商品总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">异常赔付总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">总收入金额（元）</span>
                <span class="text-right">0</span>
              </div>
            </el-card>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="overview-card">
            <el-card shadow="always">
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">仓库发货总金额（元）</span>
                <span class="text-right">0</span>
              </div>
              <div class="cart-item">
                <img src="../../../assets/img/default.png" class="mar-right" alt="" />
                <span class="text-center mar-right">其他总金额（元）</span>
                <span class="text-right">0</span>
              </div>
            </el-card>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class="statistic-charts">
      <div class="account-box">
        <span class="account-title">数据统计</span>
        <div class="account-item">
          <chart-line :lineData="lineData"></chart-line>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ChartLine from '../../components/echart-line.vue'
export default {
  components: {
    ChartLine,
  },
  data() {
    return {
      statisticsTime: [], //统计时间
      //不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      lineData: {
        xAxis: ['2021-2-2', '2023-5-6', '2015-6-10'],
        legend: ['仓库发货金额', '主体IP消费金额', '总消费金额', '充值金额', '采购金额', '采购退回金额'],
        series: [
          {
            name: '仓库发货金额',
            data: [0, 0, 0],
            smooth: true,
            type: 'line',
          },
          {
            name: '主体IP消费金额',
            data: [0, 2, 0],
            smooth: true,
            type: 'line',
          },
          {
            name: '充值金额',
            data: [0, -1, 0],
            smooth: true,
            type: 'line',
          },
        ],
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
  height: 100%;
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
.overview {
  margin-top: 10px;
  .overview-card {
    padding: 16px;
    font-size: 18px;
    height:240px;
    .el-card{
        height:100%;
    }
    .cart-item {
      display: flex;
      align-items: center;
      padding: 10px;
      img {
        height: 32px;
        width: 32px;
      }
      span {
        display: inline-block;
      }
      .text-center {
        flex: 1;
      }
      .text-right {
        width: 40px;
        font-weight: 900;
        font-size: 24px;
      }
    }
  }
}
//数据图表
.statistic-charts {
  margin-top: 10px;
  .account-box {
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 16px;
    position: relative;
    .account-title {
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
    .account-item {
    }
  }
}
</style>