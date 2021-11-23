<!--
 * @Author: your name
 * @Date: 2021-11-09 10:09:21
 * @LastEditTime: 2021-11-18 16:16:18
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\index.vue
-->
<template>
  <div class="catch-notice-style">
    <!--订单列表 -->
    <main v-if="activeVal === '0'"><OrderManagerOrderCenter /></main>
    <!--订单列表 -->
    <main v-if="activeVal === '2'"><OrderManagerStoreAdressSet /></main>
    <!--虾皮售后 -->
    <!-- <main v-if="activeVal === '1'"><OrderManagerAfterSale /></main> -->

    <!--丢件信息查询 -->
    <!-- <main v-if="activeVal === '4'"><OrderManagerLostSearch /></main> -->

    <!--采购信息查询 -->
    <!-- <main v-if="activeVal === '5'"><OrderManagerPriceChangeRecorde /></main> -->
  </div>
</template>

<script>
import {
  // OrderManagerAfterSale,
  // OrderManagerLostSearch,
  // OrderManagerPriceChangeRecorde,
  OrderManagerOrderCenter,
  OrderManagerStoreAdressSet
} from './index'
export default {
  components: {
    // OrderManagerAfterSale,
    // OrderManagerLostSearch,
    // OrderManagerPriceChangeRecorde,
    OrderManagerOrderCenter,
    OrderManagerStoreAdressSet
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
