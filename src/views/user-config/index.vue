<template>
  <div class="detail">
    <el-tabs v-model="activeName" @tab-click="handleClick" style="width: 100%;">
      <el-tab-pane label="基础设置" name="setBase">
        <setBase :user-info="userInfo"/>
      </el-tab-pane>
      <el-tab-pane label="代理翻译设置" name="setProxy">
        <setProxy :user-info="userInfo"/>
      </el-tab-pane>
      <el-tab-pane label="拍单发货设置" name="setOrder">
        <setOrder :user-info="userInfo"/>
      </el-tab-pane>
      <el-tab-pane label="自动关注取关" name="autoFollow">
        <autoFollow :user-info="userInfo"/>
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
  name: 'UserConfig',
  components: {
    setBase,
    setOrder,
    setProxy,
    autoFollow
  },
  data() {
    return {
      activeName: 'setBase',
      userInfo: ''// 用户信息
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab)
    },
    // 初始化用户信息
    async getUserinfo() {

      const res = await this.$appConfig.getUserConfig()
      this.userInfo = JSON.parse(res)
      console.log('userInfo', res)
    }
  }
}

</script>
<style lang="less" scoped>
.detail {
  padding: 0 10px;
  display: flex;
  background-color: white;
  height: 100%;

}
</style>

