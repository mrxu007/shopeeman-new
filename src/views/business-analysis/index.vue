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
  BusinessAnalysisSalesStructure
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
    BusinessAnalysisSalesStructure
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
