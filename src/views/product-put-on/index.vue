<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-21 14:28:04
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="product-put-on-style">
    <!-- 平台选品库 ：关键词采集、商品链接采集、整店采集、图搜同款、天猫淘宝海外平台采集 -->
    <main v-if="activeVal === '0'"><ProductPutOnPlatformSelection /></main>

    <!-- 平台选品库：采集设置 -->
    <main v-if="activeVal === '1'"><ProductPutOnSettings /></main>

    <!-- 私有选品库 -->
    <main v-if="activeVal === '2'"><ProductPutOnPersonalLibrary /></main>

    <!-- 一键上新 -->
    <main v-if="activeVal === '3'"><ProductPutOnShangxin /></main>

    <!-- 定时刊登 -->
    <main v-if="activeVal === '4'"><ProductPutOnTimerPublish /></main>

    <!--爆款选品 -->
    <main v-if="activeVal === '5'"><ProductPutOnPopularSelection /></main>

    <!--成交价格建议 -->
    <main v-if="activeVal === '6'"><ProductPutOnHotSuggest /></main>

    <!--热搜词推荐 -->
    <main v-if="activeVal === '7'"><ProductPutOnHotWord /></main>

    <!--上新统计 -->
    <main v-if="activeVal === '8'"><ProductPutOnStatistics /></main>

    <!--品牌词库 -->
    <main v-if="activeVal === '9'"><ProductPutOnBandlibrary /></main>

    <!--类目黑名单 -->
    <main v-if="activeVal === '13'"><ProductPutOnCategoryblack /></main>

    <!-- 拼多多买手号 -->
    <main v-if="activeVal === '10'"><ProductPutOnPDD /></main>

    <!-- 天猫淘宝海外平台 -->
    <main v-if="activeVal === '12'"><ProductPutOnTaobao /></main>
    <main v-if="activeVal === '10'"><ProductPutOnCategoryblack /></main>

    <!-- 拼多多选品库 -->
    <main v-if="activeVal === '11'"><ProductPutOnPddAccount /></main>
  </div>
</template>

<script>
import {
  ProductPutOnPlatformSelection,
  ProductPutOnSettings,
  ProductPutOnPersonalLibrary,
  ProductPutOnShangxin,
  ProductPutOnTimerPublish,
  ProductPutOnPopularSelection,
  ProductPutOnHotSuggest,
  ProductPutOnHotWord,
  ProductPutOnStatistics,
  ProductPutOnBandlibrary,
  ProductPutOnCategoryblack,
  ProductPutOnPDD,
  ProductPutOnTaobao,
  ProductPutOnPddAccount
} from './index'
export default {
  components: {
    ProductPutOnPlatformSelection,
    ProductPutOnSettings,
    ProductPutOnPersonalLibrary,
    ProductPutOnShangxin,
    ProductPutOnTimerPublish,
    ProductPutOnPopularSelection,
    ProductPutOnHotSuggest,
    ProductPutOnHotWord,
    ProductPutOnStatistics,
    ProductPutOnBandlibrary,
    ProductPutOnCategoryblack,
    ProductPutOnPDD,
    ProductPutOnTaobao,
    ProductPutOnPddAccount

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
