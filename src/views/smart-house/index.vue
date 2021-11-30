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

    <!--退件管理 -->
    <main v-if="activeVal === '2'"><SmartHouseReturnManage /></main>

    <!--二次销售列表 -->
    <main v-if="activeVal === '3'"><SmartHouseSecondarySalesList /></main>

    <!--失物招领 -->
    <!-- <main v-if="activeVal === '4'"><SmartHouseUnclaimed /></main> -->
    <!--
    二次销售列表
    <main v-if="activeVal === '4'"><SmartHouseTheSecondSaleList /></main> -->

    <!--拒签收管理 -->
    <main v-if="activeVal === '5'"><SmartHouseRefuseSign /></main>

    <!--我的赔付 -->
    <main v-if="activeVal === '6'"><SmartHouseAbnormalPayment /></main>

    <!--自有仓库 -->
    <main v-if="activeVal === '7'"><SmartHousePrivateWarehouse /></main>

    <!--商品备货-海外仓商品备货 -->
    <main v-if="activeVal === '8'"><SmartHouseStockUpForeign /></main>

    <!--商品备货-国内仓商品备货 -->
    <main v-if="activeVal === '9'"><SmartHouseStockUpHome /></main>

    <!-- 库存列表-海外仓库存 -->
    <main v-if="activeVal === '10'"><SmartHouseaBroadStock /></main>

    <!-- 库存列表-海外仓共享库存管理 -->
    <main v-if="activeVal === '11'"><SmartHouseShareBroadStockManager /></main>

    <!-- 库存列表-共享给我的海外仓库存 -->
    <main v-if="activeVal === '12'"><SmartHouseShareMyBroadStock /></main>

    <!-- 库存列表-国内仓库存 -->
    <main v-if="activeVal === '13'"><SmartHouseChineseStock /></main>

    <!-- 出库订单-海外仓出库订单 -->
    <main v-if="activeVal === '14'"><SmartHouseBroadDeliveryOrder /></main>

    <!-- 出库订单-国内仓出库订单 -->
    <main v-if="activeVal === '15'"><SmartHouseChineseDeliveryOrder /></main>

    <!-- 海外仓补件列表 -->
    <main v-if="activeVal === '16'"><SmartHouseBroadPickUpList /></main>

    <!-- 海外仓共享库存管理 -->
    <main v-if="activeVal === '17'"><SmartHouseOverseasWarehouse /></main>

    <!-- 海外仓补件列表 -->
    <main v-if="activeVal === '18'"><SmartHouseOverseasLupplementList /></main>
  </div>
</template>

<script>
import {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartHouseReturnManage,
  SmartHouseSecondarySalesList,
  SmartHouseUnclaimed,
  // SmartHouseTheSecondSaleList,
  SmartHouseAbnormalPayment,
  SmartHousePrivateWarehouse,
  SmartHouseRefuseSign,
  SmartHouseStockUpForeign,
  SmartHouseStockUpHome,
  SmartHouseaBroadStock,
  SmartHouseShareBroadStockManager,
  SmartHouseShareMyBroadStock,
  SmartHouseChineseStock,
  SmartHouseBroadDeliveryOrder,
  SmartHouseChineseDeliveryOrder,
  SmartHouseBroadPickUpList,
  SmartHouseOverseasWarehouse,
  SmartHouseOverseasLupplementList
} from './index'
export default {
  components: {
    SmartHouseWorkBench,
    SmartHousePackage,
    SmartHouseReturnManage,
    SmartHouseSecondarySalesList,
    SmartHouseUnclaimed,
    // SmartHouseTheSecondSaleList,
    SmartHouseAbnormalPayment,
    SmartHousePrivateWarehouse,
    SmartHouseRefuseSign,
    SmartHouseStockUpForeign,
    SmartHouseStockUpHome,
    SmartHouseaBroadStock,
    SmartHouseShareBroadStockManager,
    SmartHouseShareMyBroadStock,
    SmartHouseChineseStock,
    SmartHouseBroadDeliveryOrder,
    SmartHouseChineseDeliveryOrder,
    SmartHouseBroadPickUpList,
    SmartHouseOverseasWarehouse,
    SmartHouseOverseasLupplementList
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
