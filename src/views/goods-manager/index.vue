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
    <!--商品列表 -->
    <main v-if="activeVal === '0'"><GoodsManagerList /></main>

    <!--商品同步 -->
    <main v-if="activeVal === '1'"><GoodsManagerAsync /></main>

    <!--商品分类 -->
    <main v-if="activeVal === '2'"><GoodsManagerCategory /></main>

    <!--互赞平台 -->
    <main v-if="activeVal === '3'"><GoodsManagerOtherPlatform /></main>
  </div>
</template>

<script>
import {
  GoodsManagerList,
  GoodsManagerAsync,
  GoodsManagerCategory,
  GoodsManagerOtherPlatform
} from './index'
export default {
  components: {
    GoodsManagerList,
    GoodsManagerAsync,
    GoodsManagerCategory,
    GoodsManagerOtherPlatform
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
