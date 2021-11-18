<!--
 * @Author: your name
 * @Date: 2021-11-18 15:59:48
 * @LastEditTime: 2021-11-18 16:04:33
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\OrderManagerStoreAdressSet.vue
-->
<template>
  <div class="store-address">
       <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户充值记录" name="rechargeRecord" />
        <el-tab-pane label="用户账单记录" name="accountRecord" />
      </el-tabs>
    </div>
  </div>
</template>

<script>
export default {
    data(){
        return{

        }
    },
    methods: {
        
    }
}
</script>

<style lang="less" scoped>
.store-address{
    margin: 10px;
}
.activeColor {
  color: red;
}
</style>