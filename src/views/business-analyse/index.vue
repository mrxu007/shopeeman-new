<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-09 11:56:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="personal-center-style">
    <!--    商品折扣-->
    <main v-if="activeVal === '0'"><BusinessAnalyseDataOverview /></main>
    <!--    商品置顶-->
    <main v-if="activeVal === '1'"><BusinessAnalyseTraffic /></main>
    <!--    店铺优惠券-->
    <main v-if="activeVal === '2'"><BusinessAnalyseGoods /></main>
    <!--    爆粉神器-->
    <main v-if="activeVal === '3'"><BusinessAnalyseSales /></main>
    <!--    商店精选-->
    <main v-if="activeVal === '4'"><BusinessAnalyseMarketing /></main>
    <!--    店铺关注礼-->
    <main v-if="activeVal === '5'"><BusinessAnalyseChat /></main>
    <!--    运费促销-->
    <main v-if="activeVal === '6'"><BusinessAnalyseSalesCoaching /></main>
  </div>
</template>

<script>
import {
  BusinessAnalyseDataOverview,
  BusinessAnalyseTraffic,
  BusinessAnalyseGoods,
  BusinessAnalyseSales,
  BusinessAnalyseMarketing,
  BusinessAnalyseChat,
  BusinessAnalyseSalesCoaching,
} from './index'
export default {
  components: {
    BusinessAnalyseDataOverview,
    BusinessAnalyseTraffic,
    BusinessAnalyseGoods,
    BusinessAnalyseSales,
    BusinessAnalyseMarketing,
    BusinessAnalyseChat,
    BusinessAnalyseSalesCoaching,
  },
  data() {
    return {
      activeVal: '0'
    }
  },
  mounted() {
    if (this.$route.query.activeVal) {
      this.activeVal = this.$route.query.activeVal
    }
  }
}
</script>

<style>
</style>
