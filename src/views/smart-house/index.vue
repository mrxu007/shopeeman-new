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
    <main v-if="activeVal === '1'"><Refusesign /></main>
  </div>
</template>

<script>
import {
  SmartHouseWorkBench,
  Refusesign
} from './index'
export default {
  components: {
    SmartHouseWorkBench,
    Refusesign
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
