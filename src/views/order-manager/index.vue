<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-27 21:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="order-manager-style">
    <!--订单列表 -->
    <main v-if="activeVal === '0'"><OrderManagerList /></main>

    <!--虾皮售后 -->
    <main v-if="activeVal === '1'"><OrderManagerAfterSales /></main>

    <!--仓库收藏地址设置 -->
    <main v-if="activeVal === '2'"><OrderManagerReceivingAddress /></main>

    <!--发货管理 -->
    <main v-if="activeVal === '3'"><OrderManagerDeliveryManagement /></main>

    <!--丢件信息查询 -->
    <main v-if="activeVal === '5'"><OrderManagerLostInfoQuery /></main>

    <!--采购价变更记录 -->
    <main v-if="activeVal === '6'"><OrderManagerChangeRecord /></main>
  </div>
</template>

<script>
import {
  OrderManagerList,
  OrderManagerAfterSales,
  OrderManagerReceivingAddress,
  OrderManagerDeliveryManagement,
  OrderManagerLostInfoQuery,
  OrderManagerChangeRecord
} from './index'
export default {
  components: {
    OrderManagerList,
    OrderManagerAfterSales,
    OrderManagerReceivingAddress,
    OrderManagerDeliveryManagement,
    OrderManagerLostInfoQuery,
    OrderManagerChangeRecord
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
