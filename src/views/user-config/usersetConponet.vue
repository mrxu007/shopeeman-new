<template>
  <div style="display:flex">
    <el-button class="btn" type="text" @click="btnclick(1)">
      <img v-show="showCustomBtn" src="@/assets/image/userSet/customer_normal.png" alt="">
      <span>客服</span>
    </el-button>
    <el-button class="btn" type="text" @click="btnclick(2)">
      <img v-show="noticeBtn" src="@/assets/image/userSet/notice_normal.png" alt="">
      <span style="height:5px" />
      <span>历史公告</span>
    </el-button>
    <el-button class="btn" type="text" @click="btnclick(3)">
      <img src="@/assets/image/userSet/baike_normal.png" alt="">
      <span>百科</span>
    </el-button>
    <el-button class="btn" type="text" @click="btnclick(4)">
      <img src="@/assets/image/userSet/setup_normal.png" alt="">
      <span>设置</span>
    </el-button>
    <el-button class="btn" type="text" @click="btnclick(5)">
      <img src="@/assets/image/userSet/update_normal.png" alt="">
      <span>更新</span>
    </el-button>
    <el-button class="btn" type="text" @click="btnclick(6)">
      <img src="@/assets/image/userSet/back_normal.png" alt="">
      <span>退出</span>
    </el-button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      showCustomBtn: true,
      noticeBtn: true
    }
  },
  created() {
    this.ishiddenBtn()
  },
  methods: {
    async ishiddenBtn() {
      const res = await window.BaseUtilBridgeService.getVersionAndAppCode()
      const app_code = res.app_code || ''
      if (app_code !== 'shopeemain' && app_code !== ('shopeeman') && app_code !== ('shopeeke')) {
        this.showCustomBtn = false
      }
      if (app_code === 'shopeeke') {
        this.noticeBtn = false
      }
    },
    async btnclick(type) {
      switch (type) {
        case 1: // 客服
          this.$router.push('/customer-service')
          break
        case 2: // 历史广告
          this.$router.push('/history-notice')
          break
        case 3: // 百科
          this.$router.push('/encyclopedia')
          break
        case 4: // 设置
          this.$router.push('/user-config')
          break
        case 5: // 更新
          await window.BaseUtilBridgeService.checkVersion()
          this.$message.success('系统正在更新.....')
          break
        case 6: // 退出
          this.$confirm('确定要退出吗？')
            .then(async() => {
              await window.BaseUtilBridgeService.exitApp()
            })
            .catch(() => {})
          break
        default:
          break
      }
    }
  }
}
</script>
<style lang="less" scoped>
.btn {
  display: flex;
  flex-flow: column;
  margin: 0px 15px;
  img {
    width: 25px;
    margin: 0px auto;
    margin-bottom: 5px;
  }
  span {
    color: black;
  }
}
</style>
