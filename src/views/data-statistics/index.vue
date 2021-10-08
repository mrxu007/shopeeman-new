<template>
  <div class="catch-notice-style">
    <!-- 数据统计 -->
    <main v-if="activeVal === '0'"><DataStatisticsList /></main>
  </div>
</template>

<script>
import { DataStatisticsList } from './index'
export default {
  components: {
    DataStatisticsList
  },
  data() {
    return {
      activeVal: 0
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
