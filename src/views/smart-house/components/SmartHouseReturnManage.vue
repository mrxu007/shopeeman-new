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
          <el-button type="primary" :disabled="cancelLoading" size="mini" @click="getReturnManage">查询</el-button>
          <el-button type="primary" size="mini" :loading="cancelLoading" @click="batchCancelReturn()">批量取消退件</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 205px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column align="center" type="index" label="序号" />
        <el-table-column align="center" prop="need_return_package_code" label="包裹物流单号" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="warehouse_name" label="签收仓库" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="{row}">
            <span v-if="row.status===1">退件中</span>
            <span v-else-if="row.status===2">已退件</span>
            <span v-else-if="row.status===3">退件失败</span>
            <span v-else-if="row.status===4">取消退件</span>
            <span v-else-if="row.status===5">仓库驳回</span>
            <span v-else />
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appli_return_time" label="申请退件时间" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" prop="return_contact" label="退件人" min-width="80" show-overflow-tooltip />
        <el-table-column align="center" prop="return_phone_number" label="退件电话" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" prop="return_address" label="退件地址" min-width="150" show-overflow-tooltip />
        <el-table-column align="center" prop="return_remarks" label="退件备注" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" prop="return_shipping_number" label="退件物流单号" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" prop="return_shipping_name" label="退件物流公司" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" prop="return_time" label="退件时间" min-width="110" show-overflow-tooltip />
        <el-table-column align="center" prop="warehouse_remarks" label="仓库备注" min-width="100" show-overflow-tooltip />
        <el-table-column min-width="120" align="center" label="操作">
          <template slot-scope="{row}">
            <el-button v-if="row.status!=4&&row.status!=2" type="primary" size="mini" @click="cancelReturn(row)">取消退件</el-button>
          </template>
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
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      cancelLoading: false,
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
      packageCodes: [],
      returnStatusList: [
        { value: '1', label: '退件中' },
        { value: '2', label: '已退件' },
        { value: '3', label: '退件失败' },
        { value: '4', label: '取消退件' },
        { value: '5', label: '仓库驳回' }
      ],
      returnMsg: false,
      multipleSelection: [],
      isShowLoading: false
    }
  },
  mounted() {
    this.getReturnManage()
  },
  methods: {
    // 批量取消退件
    async  batchCancelReturn() {
      if (!this.multipleSelection.length) return this.$message('请选择需要取消退件的包裹')
      this.packageCodes = []
      this.multipleSelection.map(item => {
        this.packageCodes.push(item.need_return_package_code)
      })
      this.cancelLoading = true
      await this.cancel()
      this.cancelLoading = false
    },
    // 取消退件
    async cancelReturn(row) {
      this.packageCodes = []
      this.packageCodes.push(row.need_return_package_code)
      await this.cancel()
    },
    async cancel() {
      console.log('packageCodes', this.packageCodes)
      const res = await this.$api.cancelReturn({ packageCodes: this.packageCodes })
      console.log('res', res)
      if (res.data.code === 200) {
        this.getReturnManage()
        this.$message.success('取消退件成功')
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 获取退件信息
    async getReturnManage() {
      this.isShowLoading = true
      const returnTime = this.form.signingTime ? `${this.$dayjs(this.form.returnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.returnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const applyReturnTime = this.form.applyReturnTime ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        packageCode: this.form.logisticsNum.trim(),
        orderSn: this.form.orderNum.trim(),
        status: this.form.returnStatus,
        returnShippingNumber: this.form.returnLogisticsNum.trim(),
        returnPhoneNumber: this.form.returnPhone.trim(),
        returnTime: returnTime,
        appliReturnTime: applyReturnTime,
        page: this.page,
        pageSize: this.pageSize
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getReturnManage(parmas)
        if (data.code === 200) {
          this.tableData = data.data.data
          this.total = data.data.total
          this.isShowLoading = false
        } else {
          this.$message.error('数据获取失败', data.message)
          this.isShowLoading = false
        }
      } catch (error) {
        this.isShowLoading = false
        console.log(error)
      }
      console.log('tableData', this.tableData)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getReturnManage()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getReturnManage()
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
