<template>
  <div class="detail">
    <!-- 左边 -->
    <div class="left_detail">

      <div
        class="row1"
        style="border-bottom: 2px solid red;"
      >手动录入</div>

      <div class="row2" style="margin-bottom: 20px">
        <el-radio v-model="radio" label="1">手机号</el-radio>
        <el-radio v-model="radio" label="2">Token</el-radio>
      </div>

      <div class="row2">
        <span style="color:red">该模块目前仅支持拼多多平台</span>
      </div>

      <div class="btn_item">
        <el-button type="primary" size="mini">搜 索</el-button>
        <el-button type="primary" size="mini">状态检测</el-button>
        <el-button type="primary" size="mini">导入手机号</el-button>
        <el-button type="primary" size="mini">网页一键登录</el-button>
        <el-button type="primary" size="mini">一键删除</el-button>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right_detail">
      <el-table
        :data="tableList"
        :row-key="generateUUID"
        height="100vh"
        style="width: calc(87vw);"
        :header-cell-style="{'background': '#f7fafa'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="买手号" prop="" min-width="200px" />
        <el-table-column label="登录状态" prop="" min-width="200px" />
        <el-table-column label="采集状态" prop="" min-width="200px" />
        <el-table-column label="是否需要验证" prop="" min-width="200px" />
        <el-table-column label="采集成功数量" prop="" min-width="200px" />
      </el-table>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      radio: '1',
      tableList: []
    }
  },
  methods: {
    generateUUID() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      return uuid
    },

    // 多选
    handleSelectionChange(val) {
    // 获取参数
    }
  }
}
</script>

<style lang="less" scoped>
    .detail{
        min-width: 1200px;
        display: flex;
        .left_detail{
            background-color: white;
            height: 100vh;
            padding-right: 20px;
            .row1{
            color:red;
            font-weight: 600;
            font-size: 15px !important;
            width: 100px;
            height: 30px;
            background-color: white;
            display: flex;
            justify-content: center;
            align-items: center;
            }
            .row1,.row2{
                // margin-bottom: 5px;
                margin: 10px;
            }
            .btn_item{
            display: flex;
            flex-flow: column;
            align-items: flex-end;
            .el-button{
                width: 180px;
                margin-bottom: 20px;
            }
            }
        }
    }
</style>
