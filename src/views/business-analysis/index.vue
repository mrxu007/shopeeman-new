<template>
  <div class="personal-center-style">
    <!--自有商品 -->
    <main v-if="activeVal === '0'"><BusinessAnalysisDataScreening /></main>
  </div>
</template>

<script>
import {
  BusinessAnalysisDataScreening } from './index.js'
export default {
  components: {
    BusinessAnalysisDataScreening
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
