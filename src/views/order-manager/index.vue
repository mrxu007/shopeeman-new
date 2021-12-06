<!--
 * @Author: your name
 * @Date: 2021-11-09 10:09:21
 * @LastEditTime: 2021-11-24 10:29:44
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\order-manager\index.vue
-->
<template>
  <div class="catch-notice-style">
    <!--订单列表 -->
    <main v-if="activeVal === '0'"><OrderManagerOrderCenter /></main>

    <!--虾皮售后 -->
    <main v-if="activeVal === '1'"><OrderManagerAfterSales /></main>

    <!--仓库收货地址设置 -->
    <main v-if="activeVal === '2'"><OrderManagerStoreAdressSet /></main>

    <!--仓库收货地址设置-->
    <!-- <main v-if="activeVal === '2'"><OrderManagerReceivingAddress /></main> -->

    <!--发货管理 -->
    <main v-if="activeVal === '3'"><OrderManagerDeliveryManagement /></main>

    <!--丢件信息查询 -->
    <main v-if="activeVal === '4'"><OrderManagerLostInfoQuery /></main>

    <!--采购价变更记录 -->
    <main v-if="activeVal === '6'"><OrderManagerChangeRecord /></main>

  </div>
</template>

<script>
import {
  OrderManagerOrderCenter,
  // OrderManagerList,
  OrderManagerAfterSales,
  OrderManagerReceivingAddress,
  OrderManagerDeliveryManagement,
  OrderManagerLostInfoQuery,
  OrderManagerChangeRecord,
  OrderManagerStoreAdressSet
} from './index'
export default {
  components: {
    OrderManagerOrderCenter,
    // OrderManagerList,
    OrderManagerAfterSales,
    OrderManagerReceivingAddress,
    OrderManagerDeliveryManagement,
    OrderManagerLostInfoQuery,
    OrderManagerChangeRecord,
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
