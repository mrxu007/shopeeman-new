
<template>
  <div class="personal-center-style">
    <!--自有商品 -->
    <main v-if="activeVal === '0'"><ProductCenterOwnGoods /></main>
    <main v-if="activeVal === '1'"><ProductCenterOwnGoodsCopy /></main>
  </div>
</template>

<script>
import {
  ProductCenterOwnGoods,ProductCenterOwnGoodsCopy } from './index.js'
export default {
  components: {
    ProductCenterOwnGoods,
    ProductCenterOwnGoodsCopy
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
