<template>
  <div class="catch-notice-style">
    <!--虾皮售后 -->
    <main v-if="activeVal === '1'"><AfterSale /></main>

    <!--丢件信息查询 -->
    <main v-if="activeVal === '4'"><LostSearch /></main>

    <!--采购信息查询 -->
    <main v-if="activeVal === '5'"><PriceChangeRecorde /></main>
  </div>
</template>

<script>
import {
  AfterSale,
  LostSearch,
  PriceChangeRecorde
} from './index'
export default {
  components: {
    AfterSale,
    LostSearch,
    PriceChangeRecorde
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
