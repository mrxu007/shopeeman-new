<template>
  <div id="warehouse">
    <main v-if="activeVal == 0"><workbench /></main>
    <!-- <main v-if="activeVal == 1"><packageList /></main>
    <main v-if="activeVal == 2"><returnGoods /></main>
    <main v-if="activeVal == 3"><addressSetting /></main>
    <main v-if="activeVal == 4"><unclaimedPackage /></main>
    <main v-if="activeVal == 5"><refuseSign /></main> -->
  </div>
</template>

<script>
import workbench from './workbench'
// import packageList from './package-list'
// import returnGoods from './return-goods'
// import addressSetting from './address-setting'
// import unclaimedPackage from './unclaimed-package'
// import refuseSign from './refuse-sign'

export default {
  components: {
    workbench, // 工作台
    // packageList, // 包裹列表
    // returnGoods, // 退件管理
    // addressSetting, // 仓库收货地址设置
    // unclaimedPackage, // 失误招领
    // refuseSign // 拒签收管理
  },
  data() {
    return {
      activeVal: 0
    }
  },
  created() {
    if (this.$route.query.activeVal) {
      this.activeVal = this.$route.query.activeVal
    }
  }
}
</script>

<style lang="less">
@import '../../assets/css/base.less';
#warehouse {
  min-width: 1230px;
  padding: 10px;
  font-family: MicrosoftYaHei;
  font-weight: normal;
  font-stretch: normal;
  color: @comColor;

  .form-items {
    display: flex;
    align-items: center;
  }

  .ml-10 {
    margin-left: 10px;
  }
}
</style>
