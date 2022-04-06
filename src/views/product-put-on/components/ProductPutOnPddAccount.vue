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
        <el-button type="primary" size="mini" @click="exportPhone">导入手机号</el-button>
        <el-button v-show="radio==='1'" type="primary" size="mini">网页一键登录</el-button>
        <el-button type="primary" size="mini">一键删除</el-button>
      </div>
    </div>
    <!-- 右边 -->
    <div class="right_detail">
      <el-table
        :data="tableList"
        height="100vh"
        style="width: calc(87vw);"
        :header-cell-style="{'background': '#f7fafa'}"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          type="selection"
          width="55"
        />
        <el-table-column label="买手号" prop="mobile" min-width="200px" />
        <el-table-column label="登录状态" prop="" min-width="200px">
          <template slot-scope="{row}">{{ row.status===1?'已登录':'已失效' }}</template>
        </el-table-column>
        <el-table-column label="采集状态" prop="" min-width="200px">
          <template slot-scope="{row}">{{ row.crawler_is_enable===1?'可用':'不可用' }}</template>
        </el-table-column>
        <el-table-column label="是否需要验证" prop="" min-width="200px" />
        <el-table-column label="采集成功数量" prop="" min-width="200px">
          <template>
            <span>0</span>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- dialog -->
    <el-dialog
      title="买手号导入"
      :visible.sync="dialogVisible_phone"
      width="400px"
      class="dialogVisible_phone"
      @closed="clearDialog"
    >
      <span style="color:red">手机号，一行一个</span>
      <el-input v-model="phoneList" type="textarea" resize="none" rows="15" style="margin:10px 0px" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible_phone = false">导入</el-button>
      </span>
    </el-dialog>
    <!-- dialog token-->
    <el-dialog
      title="买手号导入"
      :visible.sync="dialogVisible_token"
      width="400px"
      class="dialogVisible_phone"
      @closed="clearDialog"
    >
      <div style="color:red;margin-bottom: 5px;">Token导入有两种格式：</div>
      <div style="color:red;margin-bottom: 5px;">1、纯Token一行一个</div>
      <div style="color:red">2、买手号----Uid----Token,一行一个</div>
      <el-input v-model="TokenList" type="textarea" resize="none" rows="15" style="margin:10px 0px" />
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="dialogVisible_token = false">导入</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      dialogVisible_phone: false,
      dialogVisible_token: false,
      phoneList: [],
      TokenList: [],
      radio: '1',
      tableList: []
    }
  },
  created() {
    // this.gettableList()// 初始化
  },
  methods: {
    // 清理弹窗
    clearDialog() {
      this.phoneList = []
    },
    // 导入手机号
    exportPhone() {
      this.dialogVisible_phone = true
    },
    // 多选
    handleSelectionChange(val) {
    // 获取参数
    },
    // 初始化
    async gettableList() {
      this.tableList = []
      const res = await this.$api.getpddBuyerAccount()
      console.log(res)
      if (res.data.code === 200) {
        const list = res.data.data
        this.tableList = list
        // list.forEach(el => {
        //   el.tokenInfo = JSON.parse(el.auto_info)
        //   this.tableList.push(el)
        // })
        this.tableList.forEach(el => {
          // 先检测买手号是否能用，再检测能否采集

        })
      } else {
        this.$message.error('列表数据请求失败！')
      }
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
        .dialogVisible_phone{
          /deep/ .el-dialog{
            .el-dialog__body{
               padding-top: 0px;
               padding-bottom: 0px
            }
          }
        }
</style>
