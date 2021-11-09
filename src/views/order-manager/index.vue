<template>
  <div class="catch-notice-style">
    <!--虾皮售后 -->
    <main v-if="activeVal === '1'"><OrderManagerAfterSale /></main>

    <!--丢件信息查询 -->
    <main v-if="activeVal === '4'"><OrderManagerLostSearch /></main>

    <!--采购信息查询 -->
    <main v-if="activeVal === '5'"><OrderManagerPriceChangeRecorde /></main>
  </div>
</template>

<script>
import {
  OrderManagerAfterSale,
  OrderManagerLostSearch,
  OrderManagerPriceChangeRecorde
} from './index'
export default {
  components: {
    OrderManagerAfterSale,
    OrderManagerLostSearch,
    OrderManagerPriceChangeRecorde
  },
  data() {
    return {
      activeVal: 5
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
