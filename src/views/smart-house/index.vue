<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-27 21:34:16
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="smart-house-style">
    <!--仓库工作台 -->
    <main v-if="activeVal === '0'"><SmartHouseWorkBench /></main>

    <!--包裹列表 -->
    <main v-if="activeVal === '1'"><SmartHousePackage /></main>

    <!--国内仓退件管理 -->
    <main v-if="activeVal === '2'"><SmartHouseReturnManage /></main>

    <!--失物招领 -->
    <main v-if="activeVal === '3'"><SmartHouseUnclaimed /></main>

    <!--拒签收管理 -->
    <main v-if="activeVal === '5'"><SmartHouseRefuseSign /></main>

    <!--我的赔付 -->
    <main v-if="activeVal === '5'"><SmartHouseAbnormalPayment /></main>

    <!--自有仓库 -->
    <main v-if="activeVal === '6'"><SmartHousePrivateWarehouse /></main>
  </div>
</template>

<script>
import {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartHouseReturnManage,
  SmartHouseUnclaimed,
  SmartHouseAbnormalPayment,
  SmartHousePrivateWarehouse,
  SmartHouseRefuseSign
} from './index'
export default {
  components: {
    SmartHouseWorkBench,
    SmartHousePackage,
    SmartHouseReturnManage,
    SmartHouseUnclaimed,
    SmartHouseAbnormalPayment,
    SmartHousePrivateWarehouse,
    SmartHouseRefuseSign
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
