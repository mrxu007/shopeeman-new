<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom:10px;">
        <li>
          <span>退件状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>申请退件时间：</span>
          <el-date-picker
            v-model="form.applyReturnTime"
            unlink-panels
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>退件时间：</span>
          <el-date-picker
            v-model="form.returnTime"
            unlink-panels
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
      </ul>
      <ul>
        <li>
          <span>订单编号：</span>
          <el-input v-model="form.orderNum" clearable size="mini" />
        </li>
        <li>
          <span>包裹物流编号：</span>
          <el-input v-model="form.logisticsNum" clearable size="mini" />
        </li>
        <li>
          <span>退件物流单号：</span>
          <el-input v-model="form.returnLogisticsNum" clearable size="mini" />
        </li>
        <li>
          <span>退件人手机号：</span>
          <el-input v-model="form.returnPhone" clearable size="mini" />
        </li>
        <li>
          <el-button type="primary" size="mini" @click="getReturnManage">查询</el-button>
          <el-button type="primary" size="mini">批量取消退件</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        height="calc(100vh - 205px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="need_return_package_code" label="包裹物流单号" />
        <el-table-column align="center" prop="order_sn" label="订单编号" />
        <el-table-column align="center" prop="warehouse_name" label="签收仓库" />
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="{row}">
            <span v-if="row.status===1">已签收</span>
            <span v-else-if="row.status===2">已经拒收</span>
            <span v-else-if="row.status===3">匹配不到订单包</span>
            <span v-else-if="row.status===4">包裹已销毁</span>
            <span v-else-if="row.status===5">包裹丢件</span>
            <span v-else-if="row.status===6">申请退件</span>
            <span v-else-if="row.status===7">已退件</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appli_return_time" label="申请退件时间" />
        <el-table-column align="center" prop="return_contact" label="退件人" />
        <el-table-column align="center" prop="return_phone_number" label="退件电话" />
        <el-table-column align="center" prop="return_address" label="退件地址" />
        <el-table-column align="center" prop="return_remarks" label="退件备注" />
        <el-table-column align="center" prop="return_shipping_number" label="退件物流单号" />
        <el-table-column align="center" prop="return_time" label="退件时间" />
        <el-table-column align="center" prop="warehouse_remarks" label="仓库备注" />
        <el-table-column align="center" label="操作">
          <el-button type="primary" size="mini">退件</el-button>
          <el-button type="primary" size="mini">取消退件</el-button>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <!-- 退件信息查看弹窗 -->
    <el-dialog
      class="water-dialog"
      title="标题"
      :visible.sync="returnMsg"
      width="612px"
      :before-close="handleClose"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <div class="header-opt" />
      <p class="text-label">导入信息:</p>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      form: {
        returnTime: '', // 退件时间
        applyReturnTime: '', // 申请退件时间
        returnStatus: 0, // 退件状态
        orderNum: '', // 订单编号
        logisticsNum: '', // 包裹物流编号
        returnLogisticsNum: '', // 退件物流单号
        returnPhone: '' // 退件人手机号
      },
      total: 0,
      pageSize: 30,
      page: 1,
      tableData: [],
      returnStatusList: [
        { value: '1', label: '退件中' },
        { value: '2', label: '已退件' },
        { value: '3', label: '退件失败' },
        { value: '4', label: '取消退件' },
        { value: '5', label: '仓库驳回' }
      ],
      returnMsg: false,
      multipleSelection: []
    }
  },
  mounted() {
    this.getReturnManage()
  },
  methods: {
    async getReturnManage() {
      const returnTime = this.form.signingTime ? `${this.$dayjs(this.form.returnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.returnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const applyReturnTime = this.form.applyReturnTime ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        packageCode: this.form.logisticsNum,
        orderSn: this.form.orderNum,
        status: this.form.packageStatus,
        returnShippingNumber: this.form.returnLogisticsNum,
        returnPhoneNumber: this.form.returnPhone,
        returnTime: returnTime,
        appliReturnTime: applyReturnTime,
        page: this.page,
        pageSize: this.pageSize
      }
      console.log(parmas)
      // const res = await this.$api.getReturnManage()
      // console.log('aaaaaaaaaaaaa', res)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    handleClose() {

    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/return-manage.less';
</style>
