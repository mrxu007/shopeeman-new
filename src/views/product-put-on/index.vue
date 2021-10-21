<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-09 11:56:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="catch-notice-style">
    <!--爆款选品 -->
    <main v-if="activeVal === '0'"><ProductPutOnPopularSelection /></main>

    <!--成交价格建议 -->
    <main v-if="activeVal === '1'"><ProductPutOnHotSuggest /></main>

    <!--热搜词推荐 -->
    <main v-if="activeVal === '2'"><ProductPutOnHotWord /></main>

    <!--上新统计 -->
    <main v-if="activeVal === '3'"><ProductPutOnStatistics /></main>

    <!--品牌词库 -->
    <main v-if="activeVal === '4'"><ProductPutOnBandlibrary /></main>

    <!--类目黑名单 -->
    <main v-if="activeVal === '4'"><ProductPutOnCategoryblack /></main>
  </div>
</template>

<script>
import {
  ProductPutOnPopularSelection,
  ProductPutOnHotSuggest,
  ProductPutOnHotWord,
  ProductPutOnStatistics,
  ProductPutOnBandlibrary,
  ProductPutOnCategoryblack
} from './index'
export default {
  components: {
    ProductPutOnPopularSelection,
    ProductPutOnHotSuggest,
    ProductPutOnHotWord,
    ProductPutOnStatistics,
    ProductPutOnBandlibrary,
    ProductPutOnCategoryblack
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
