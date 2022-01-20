

<template>
  <div class="personal-center-style">
    <!--自有商品 -->
    <main v-if="activeVal === '0'"><ProductCenterOwnGoods /></main>
  </div>
</template>

<script>
import {
  ProductCenterOwnGoods } from './index.js'
export default {
  components: {
    ProductCenterOwnGoods
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
