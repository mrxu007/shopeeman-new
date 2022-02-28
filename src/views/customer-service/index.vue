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
        <el-button type="primary">软件客服</el-button>
        <el-button type="primary">马来仓客服</el-button>
        <el-button type="primary">泰国仓客服</el-button>
        <el-button type="primary">新加坡仓客服</el-button>
        <el-button type="primary">菲律宾仓客服</el-button>
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

  }
}

</script>
<style lang="less" scoped>

</style>
