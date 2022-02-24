<template>
  <div class="detail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="setBase">
        <setBase />
      </el-tab-pane>
      <el-tab-pane label="代理翻译设置" name="setProxy">
        <setProxy />
      </el-tab-pane>
      <el-tab-pane label="拍单发货设置" name="setOrder">
        <setOrder />
      </el-tab-pane>
      <el-tab-pane label="自动关注取关" name="autoFollow">
        <autoFollow />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import setBase from './setBase.vue'
import setOrder from './setOrder.vue'
import setProxy from './setProxy.vue'
import autoFollow from './autoFollow.vue'
export default {
  components: {
    setBase,
    setOrder,
    setProxy,
    autoFollow
  },
  data() {
    return {
      activeName: 'setProxy'
    }
  },
  created() {

  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event)
    }
  }
}

</script>
<style lang="less" scoped>
.detail{
     background-color: white;
     min-width: 1280px;
     height: 100%;

 }
</style>

