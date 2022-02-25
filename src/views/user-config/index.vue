<template>
  <div class="detail">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="基础设置" name="setBase">
        <setBase :user-info="userInfo" />
      </el-tab-pane>
      <el-tab-pane label="代理翻译设置" name="setProxy">
        <setProxy :user-info="userInfo" />
      </el-tab-pane>
      <el-tab-pane label="拍单发货设置" name="setOrder">
        <setOrder :user-info="userInfo" />
      </el-tab-pane>
      <el-tab-pane label="自动关注取关" name="autoFollow">
        <autoFollow :user-info="userInfo" />
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
      activeName: 'setBase',
      userInfo: ''// 用户信息
    }
  },
  created() {
    this.getUserinfo()
  },
  methods: {
    handleClick(tab, event) {
      // console.log(tab, event)
    },
    // 初始化用户信息
    async getUserinfo() {
      const res = await this.$api.userSet()
      if (res.data.code === 200) {
        this.userInfo = res.data.data
      } else {
        this.$message.warning(`信息获取失败！${res.data.data.message}`)
      }
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

