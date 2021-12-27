<template>
  <div class="personal-center-style">
    <!--自有商品1 -->
    <main v-if="activeVal === '0'"><BusinessAnalysisDataScreening1 /></main>
    <!--自有商品2 -->
    <main v-if="activeVal === '1'"><BusinessAnalysisDataScreening2 /></main>
    <!--自有商品3 -->
    <main v-if="activeVal === '2'"><BusinessAnalysisDataScreening3 /></main>
    <!--流量 -->
    <main v-if="activeVal === '3'"><BusinessAnalysisflow /></main>
    <!--商品诊断 -->
    <main v-if="activeVal === '4'"><BusinessAnalysisCommodityDiagnosis /></main>
    <!--商品概述 -->
    <main v-if="activeVal === '5'"><BusinessAnalysisCommodityOverview /></main>
    <!--商品表现 -->
    <main v-if="activeVal === '6'"><BusinessAnalysisCommodityPerformance /></main>
    <!--销售额概述 -->
    <main v-if="activeVal === '7'"><BusinessAnalysisSalesvolume /></main>
    <!--销售额结构 -->
    <main v-if="activeVal === '8'"><BusinessAnalysisSalesStructure /></main>
    <!--销售额结构 -->
    <main v-if="activeVal === '9'"><BusinessAnalysisSalesStructure1 /></main>
    <!--销售额结构 -->
    <main v-if="activeVal === '10'"><BusinessAnalysisSalesStructure2 /></main>
    <!--行销活动 -->
    <main v-if="activeVal === '11'"><BusinessAnalysisMarketingActivity /></main>
    <!--行销套装优惠 -->
    <main v-if="activeVal === '12'"><BusinessAnalysisPackageOffer /></main>
    <!--行销关注礼 -->
    <main v-if="activeVal === '13'"><BusinessAnalysisAttentionCeremony /></main>
    <!--行销优惠卷 -->
    <main v-if="activeVal === '14'"><BusinessAnalysisCoupon /></main>
    <!--限时选购 -->
    <main v-if="activeVal === '15'"><BusinessAnalysisLimitedTimePurchase /></main>
    <!--加购优惠 -->
    <main v-if="activeVal === '16'"><BusinessAnalysisAdditionalPurchaseDiscount /></main>
    <!--实时聊天 -->
    <main v-if="activeVal === '17'"><BusinessAnalysisRealTimeChat /></main>
    <!--常见问题助手 -->
    <main v-if="activeVal === '18'"><BusinessAnalysisFAQAssistant /></main>
    <!--常见问题助手 -->
    <main v-if="activeVal === '19'"><BusinessAnalysisSalesAssistance /></main>
  </div>
</template>

<script>
import {
  BusinessAnalysisDataScreening1,
  BusinessAnalysisDataScreening2,
  BusinessAnalysisDataScreening3,
  BusinessAnalysisflow,
  BusinessAnalysisCommodityDiagnosis,
  BusinessAnalysisCommodityOverview,
  BusinessAnalysisCommodityPerformance,
  BusinessAnalysisSalesvolume,
  BusinessAnalysisSalesStructure,
  BusinessAnalysisSalesStructure1,
  BusinessAnalysisSalesStructure2,
  BusinessAnalysisMarketingActivity,
  BusinessAnalysisPackageOffer,
  BusinessAnalysisAttentionCeremony,
  BusinessAnalysisCoupon,
  BusinessAnalysisLimitedTimePurchase,
  BusinessAnalysisAdditionalPurchaseDiscount,
  BusinessAnalysisRealTimeChat,
  BusinessAnalysisFAQAssistant,
  BusinessAnalysisSalesAssistance
} from './index.js'
export default {
  components: {
    BusinessAnalysisDataScreening1,
    BusinessAnalysisDataScreening2,
    BusinessAnalysisDataScreening3,
    BusinessAnalysisflow,
    BusinessAnalysisCommodityDiagnosis,
    BusinessAnalysisCommodityOverview,
    BusinessAnalysisCommodityPerformance,
    BusinessAnalysisSalesvolume,
    BusinessAnalysisSalesStructure,
    BusinessAnalysisSalesStructure1,
    BusinessAnalysisSalesStructure2,
    BusinessAnalysisMarketingActivity,
    BusinessAnalysisPackageOffer,
    BusinessAnalysisAttentionCeremony,
    BusinessAnalysisCoupon,
    BusinessAnalysisLimitedTimePurchase,
    BusinessAnalysisAdditionalPurchaseDiscount,
    BusinessAnalysisRealTimeChat,
    BusinessAnalysisFAQAssistant,
    BusinessAnalysisSalesAssistance
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
