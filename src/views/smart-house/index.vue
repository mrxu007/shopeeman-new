<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-21 14:28:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="catch-notice-style">
    <!--爆款选品 -->
    <main v-if="activeVal === '0'"><SmartHouseWorkBench /></main>

    <!--包裹列表 -->
    <main v-if="activeVal === '1'"><SmartHousePackage /></main>

    <!--国内仓退件管理 -->
    <main v-if="activeVal === '2'"><SmartReturnManage /></main>
  </div>
</template>

<script>
import {
  SmartHouseWorkBench,
  SmartHousePackage,
  SmartReturnManage
} from './index'
export default {
  components: {
    SmartHouseWorkBench,
    SmartHousePackage,
    SmartReturnManage
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
