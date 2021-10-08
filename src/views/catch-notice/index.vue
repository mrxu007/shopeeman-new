<template>
  <div class="catch-notice-style">
    <!-- 即将过期订单 -->
    <main v-if="activeVal === '0'"><CatchNoticeExpiringOrder /></main>

    <!-- 待获取物流单号 -->
    <main v-if="activeVal === '1'"><CatchNoticeGetLogisticsOrderNo /></main>

    <!-- 仓库公众号绑定 -->
    <main v-if="activeVal === '2'"><CatchNoticeOfficialAccountBind /></main>

    <!-- 签收包裹异常 -->
    <main v-if="activeVal === '3'"><CatchNoticeSignForPackage /></main>

    <!-- 仓库异常信息 -->
    <main v-if="activeVal === '4'"><CatchNoticeStoreExceptionInfo /></main>
  </div>
</template>

<script>
import {
  CatchNoticeExpiringOrder,
  CatchNoticeGetLogisticsOrderNo,
  CatchNoticeOfficialAccountBind,
  CatchNoticeSignForPackage,
  CatchNoticeStoreExceptionInfo } from './index'
export default {
  components: {
    CatchNoticeExpiringOrder,
    CatchNoticeGetLogisticsOrderNo,
    CatchNoticeOfficialAccountBind,
    CatchNoticeSignForPackage,
    CatchNoticeStoreExceptionInfo
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

<style>
</style>
