<template>
  <div class="catch-notice-style">
    <!--店铺列表 -->
    <main v-if="activeVal === '0'"><MallManagerMallList /></main>

    <!--店铺分组 -->
    <main v-if="activeVal === '1'"><MallManagerMallGroup /></main>

    <!--店铺数据 -->
    <main v-if="activeVal === '2'"><MallManagerMallData /></main>

    <!--店铺指标 -->
    <main v-if="activeVal === '3'"><MallManagerMallTarget /></main>

    <!--店铺提现 -->
    <main v-if="activeVal === '4'"><MallManagerMallWithdrawal /></main>

    <!--提现记录 -->
    <main v-if="activeVal === '5'"><MallManagerWithdrawalRecord /></main>

    <!--贷款对账 -->
    <main v-if="activeVal === '6'"><MallManagerLoanReconciliation /></main>

    <!--聊天助手 -->
    <main v-if="activeVal === '7'"><MallManagerChat /></main>

    <!--店铺评价 -->
    <main v-if="activeVal === '8'"><MallManagerStoreEvaluation /></main>

    <!--店铺主体管理 -->
    <main v-if="activeVal === '9'"><MallManagerStoreMainManagement /></main>
  </div>
</template>

<script>
import {
  MallManagerChat,
  MallManagerLoanReconciliation,
  MallManagerMallData,
  MallManagerMallGroup,
  MallManagerMallList,
  MallManagerMallTarget,
  MallManagerMallWithdrawal,
  MallManagerStoreEvaluation,
  MallManagerStoreMainManagement,
  MallManagerWithdrawalRecord } from './index'
export default {
  components: {
    MallManagerChat,
    MallManagerLoanReconciliation,
    MallManagerMallData,
    MallManagerMallGroup,
    MallManagerMallList,
    MallManagerMallTarget,
    MallManagerMallWithdrawal,
    MallManagerStoreEvaluation,
    MallManagerStoreMainManagement,
    MallManagerWithdrawalRecord
  },
  data() {
    return {
      activeVal: 0
    }
  },
  mounted() {
    if (this.$route.query.activeVal) {
      this.activeVal = this.$route.query.activeVal
    }
  }
}
</script>

<style lang="less">
</style>
