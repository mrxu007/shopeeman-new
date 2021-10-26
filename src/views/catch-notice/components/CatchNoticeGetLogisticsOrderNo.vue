<!--待获取物流单号订单-->
<template>
  <div class="CatchNoticeGetLogisticsOrderNo">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 采购物流编号 -->
        <div class="flowNumber">
          采购物流编号：
          <el-input v-model="form.shotOrderSn" size="mini" />
        </div>
        <el-button size="mini" type="primary" @click="searchHandle">搜索</el-button>
        <el-button size="mini" type="primary">登录拼多多</el-button>
        <el-button size="mini" type="primary">登录淘宝</el-button>
        <el-button size="mini" type="primary">登录1688</el-button>
        <el-button size="mini" type="primary">登录Lazada</el-button>
        <el-button size="mini" type="primary" @click="flowNumberHandle">获取采购物流单号</el-button>、
        <el-checkbox v-model="hideLog">隐藏日志</el-checkbox>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：采购订单发货需及时获取采购物流单号，此通知只会同步采购后近5天未获取采购物流单号的订单</div>
      <!-- 第三行 -->
      <div class="rowThree">操作指引：请根据采购类型和采购账号登录对应采购账号获取采购物流单号或者手动填写采购物流单号</div>
    </div>
    <!-- 下面表格部分 -->
    <div class="bottom">
      <el-table v-loading="isStart" :header-cell-style="{ background: '#f5f7fa' }" :data="tableData" border style="width: 100%" height="calc(100vh - 160px)">
        <el-table-column type="index" label="序列号" width="80" />
        <el-table-column label="订单号" prop="order_sn" />
        <el-table-column prop="ori_platform" label="采购类型" />
        <el-table-column prop="shot_order_sn" label="采购订单号" />
        <el-table-column prop="shotted_at" label="采购时间" />
        <el-table-column prop="buy_account_info" label="采购账号" />
        <el-table-column prop="pay_account_info" label="付款账号" />
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="logisticsOrderNoHandle(scope.row)">填写采购物流单号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-input v-if="!hideLog" v-model="logData" resize="none" type="textarea" class="flowNumberLog" />
    </div>

    <!--填写采购物流单号dialog-->
    <el-dialog title="采购物流单号填写" :visible.sync="logisticsOrderNoDialogFormVisible" width="500px">
      <el-form :model="logisticsOrderNoDialogForm">
        <el-form-item label="绑定仓库:" label-width="80px">
          <el-select v-model="logisticsOrderNoDialogForm.warehouseId" size="mini">
            <el-option v-for="item in logisticsOrderNoDialogWarehouseOptions" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="物流公司:" label-width="80px">
          <el-input v-model="logisticsOrderNoDialogForm.lists[0].trackingNumber" size="mini" />
        </el-form-item>
        <el-form-item label="物流单号:" label-width="80px">
          <el-input v-model="logisticsOrderNoDialogForm.lists[0].trackingNumberCompany" size="mini" />
        </el-form-item>
      </el-form>
      <div style="color: red">
        <span>关于绑定仓库选项:</span>
        <p>1、仅显示当前订单店铺绑定的仓库</p>
        <p>2、采购类型如果为国内平台时，显示国内中转仓，如果为国外平台，则显示海外仓</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="logisticsOrderNoDialogHandle">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // 控制采购物流单号dialog
      logisticsOrderNoDialogFormVisible: true,
      // 采购物流单号dialog表单数据
      logisticsOrderNoDialogForm: {
        sysOrderId: '',
        lists: [{ id: '0', trackingNumber: '', trackingNumberCompany: '' }],
        warehouseId: ''
      },
      logisticsOrderNoDialogWarehouseOptions: [{
        id: 1,
        value: '星卓越泰国海外仓',
        label: '星卓越泰国海外仓'
      }, {
        id: 2,
        value: '东莞华夏本土仓',
        label: '东莞华夏本土仓'
      }],
      //   搜索条件
      form: {
        shotOrderSn: '' // 采购物流编号
      },
      hideLog: false, // 隐藏日志
      // 表格数据
      tableData: [],
      logData: '', // 日志内容
      isStart: false
    }
  },
  mounted() {
    this.getExceptionNoTrackingNumberIndex()
    this.test()
  },
  methods: {
    async test() {
      const res = await this.$appConfig.getWarehouseInfo('41')
      debugger
    },
    // 查询
    async searchHandle() {
      if (this.isStart) {
        this.$message.error('正在获取数据')
        return
      }
      this.isStart = true
      const result = await this.$api.getExceptionNoTrackingNumberIndex(this.form)
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(result.data.message)
      }
      setTimeout(() => {
        this.isStart = false
      }, 3000)
    },
    // 填写采购物流单号
    logisticsOrderNoHandle(row) {
      this.logisticsOrderNoDialogForm = {
        sysOrderId: '',
        lists: [{ id: '0', trackingNumber: '', trackingNumberCompany: '' }],
        warehouseId: ''
      }
      this.logisticsOrderNoDialogForm.sysOrderId = row.sys_order_id
      this.logisticsOrderNoDialogFormVisible = true
    },
    // 采购物流单号dialog保存
    async logisticsOrderNoDialogHandle() {
      // const result = await this.$api.updateOrderTrackingNumber(this.logisticsOrderNoDialogForm)
      // if (result.data.code === 200) {
      //   this.logisticsOrderNoDialogFormVisible = false
      //   this.$message({
      //     message: '采购物流单号添加成功',
      //     type: 'success'
      //   })
      // } else {
      //   this.$message.error(result.data.message)
      // }
    },
    // 获取采购物流单号
    flowNumberHandle() {
      this.hideLog = false
    },
    // 获取物流单号订单列表
    async getExceptionNoTrackingNumberIndex() {
      const result = await this.$api.getExceptionNoTrackingNumberIndex()
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(result.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeGetLogisticsOrderNo {
  padding: 16px;
  background: #fff;
}
//上面查询条件部分
.search {
  white-space: nowrap;
  overflow-y: auto;
  & > div {
    margin: 10px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .rowOne {
    display: flex;
    align-items: center;
    //采购物流单号
    .flowNumber {
      margin-right: 10px;
      .el-input {
        width: 80px;
      }
    }
  }
  .rowThree {
    color: red;
  }
}
.bottom {
  display: flex;
  margin-top: 10px;
  //表格部分
  .el-table {
    flex: 1;
  }
  //日志部分
  .flowNumberLog {
    width: 300px;
    /deep/.el-textarea__inner {
      border-radius: 0;
      height: calc(100vh - 160px);
    }
  }
}
</style>
