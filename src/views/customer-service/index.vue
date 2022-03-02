<template>
  <div class="detail">
    <el-dialog
      title="客服"
      :visible.sync="dialogVisible"
      width="600px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      :show-close="false"
    >
      <div style="display:flex">
        <el-button type="primary" @click="openUrl(1)">软件客服</el-button>
        <el-button type="primary"@click="openUrl(2)">马来仓客服</el-button>
        <el-button type="primary" @click="openUrl(3)">泰国仓客服</el-button>
        <el-button type="primary" @click="openUrl(4)">新加坡仓客服</el-button>
        <el-button type="primary" @click="openUrl(5)">菲律宾仓客服</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

export default {

  data() {
    return {
      dialogVisible: true
    }
  },
  created() {
  },
  methods: {
    openUrl(num) {
      let url = null
      switch (num) {
        case 1:
          url = 'https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?'
          break
        case 2:
          url = 'https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?'
          break
        case 3:
          url = 'https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?'
          break
        case 4:
          url = 'https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?'
          break
        case 5:
          url = 'https://tb.53kf.com/code/client/31aa8e76fb1bfc5b6dfa4e2f8170322f3/8?'
          break
        default:
          break
      }
      console.log(this.$userInfo)
      //   url+=`${this.$userInfo.muid}&u_cust_name=${this.$userInfo.Username}-${this.$userInfo.Nickname}&u_custom_info=${----}&custom_channel=shopeeman`
      url += `${this.$userInfo.muid}&u_cust_name=${this.$userInfo.Username}-${this.$userInfo.Nickname}&u_custom_info=shopeeman&custom_channel=shopeeman`
      this.$BaseUtilService.openUrl(url)
    }
  }
}

</script>
<style lang="less" scoped>

</style>
