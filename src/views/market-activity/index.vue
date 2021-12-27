<!--
 * @Author: your name
 * @Date: 2021-12-27 10:59:26
 * @LastEditTime: 2021-12-27 11:54:19
 * @LastEditors: your name
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\market-activity\index.vue
-->

<template>
  <div class="personal-center-style">
    <!--    商品折扣-->
    <main v-if="activeVal === '0'"><MarketActivityGoodsDiscount /></main>
    <!--    商品置顶-->
    <main v-if="activeVal === '1'"><MarketActivityGoodsPlacedAtTop /></main>
    <!--    店铺优惠券-->
    <main v-if="activeVal === '2'"><MarketActivityStoreCoupon /></main>
    <!--    爆粉神器-->
    <main v-if="activeVal === '3'"><MarketActivityExplosivePowderArtifact /></main>
    <!--    商店精选-->
    <main v-if="activeVal === '4'"><MarketActivityStoreSelection /></main>
    <!--    店铺关注礼-->
    <main v-if="activeVal === '5'"><MarketActivityStoreAttentionGift /></main>
    <!--    运费促销-->
    <main v-if="activeVal === '6'"><MarketActivityFreightPromotion /></main>
    <!--    套装优惠-->
    <main v-if="activeVal === '7'"><MarketActivitySuitThePreferential /></main>
    <!--    加购优惠-->
    <main v-if="activeVal === '8'"><MarketActivityPurchaseDiscount /></main>
    <!--    批量私聊-->
    <main v-if="activeVal === '9'"><MarketActivityBatchMode /></main>
    <!--    Shopee广告-->
    <main v-if="activeVal === '10'"><MarketActivityShopeeAdvertising /></main>
  </div>
</template>

<script>
import {
  MarketActivityGoodsDiscount,
  MarketActivityGoodsPlacedAtTop,
  MarketActivityStoreCoupon,
  MarketActivityExplosivePowderArtifact,
  MarketActivityStoreSelection,
  MarketActivityStoreAttentionGift,
  MarketActivityFreightPromotion,
  MarketActivitySuitThePreferential,
  MarketActivityPurchaseDiscount,
  MarketActivityBatchMode,
  MarketActivityShopeeAdvertising, } from './index'
export default {
  components: {
    MarketActivityGoodsDiscount,
    MarketActivityGoodsPlacedAtTop,
    MarketActivityStoreCoupon,
    MarketActivityExplosivePowderArtifact,
    MarketActivityStoreSelection,
    MarketActivityStoreAttentionGift,
    MarketActivityFreightPromotion,
    MarketActivitySuitThePreferential,
    MarketActivityPurchaseDiscount,
    MarketActivityBatchMode,
    MarketActivityShopeeAdvertising,
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
