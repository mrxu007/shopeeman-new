<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-09 11:56:10
 * @LastEditors: your name
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\index.vue
-->
<template>
  <div class="personal-center-style">
    <!--软件财务中心 -->
    <main v-if="activeVal === '0'"><PersonalCenterSoftwareFinance /></main>
    <!--仓库财务中心 -->
    <main v-if="activeVal === '1'"><PersonalCenterStoreFinance /></main>
    <!--账单核算 -->
    <main v-if="activeVal === '2'"><PersonalCenterCheckaccounting /></main>
    <!--团队管理 -->
    <main v-if="activeVal === '3'"><PersonalCenterTeamManagement /></main>
    <!--信任IP管理 -->
    <main v-if="activeVal === '4'"><PersonalCenterTrustIPManagement /></main>
  </div>
</template>

<script>
import {
  PersonalCenterCheckaccounting,
  PersonalCenterSoftwareFinance,
  PersonalCenterStoreFinance,
  PersonalCenterTeamManagement,
  PersonalCenterTrustIPManagement } from './index'
export default {
  components: {
    PersonalCenterCheckaccounting,
    PersonalCenterSoftwareFinance,
    PersonalCenterStoreFinance,
    PersonalCenterTeamManagement,
    PersonalCenterTrustIPManagement
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
