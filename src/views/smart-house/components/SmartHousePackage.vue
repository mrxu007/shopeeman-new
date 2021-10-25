<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom:10px;">
        <li>
          <span>包裹签收时间：</span>
          <el-date-picker
            v-model="form.signingTime"
            unlink-panels
            size="mini"
            type="datetimerange"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
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
      </ul>
      <ul>
        <li>
          <span>包裹状态：</span>
          <el-select v-model="form.packageStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in packageStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>订单编号：</span>
          <el-input v-model="form.orderNum" clearable size="mini" />
        </li>
        <li>
          <span>包裹物流编号：</span>
          <el-input v-model="form.logisticsNum" clearable size="mini" />
        </li>
        <li>
          <el-button type="primary" size="mini" @click="getSignPackageList">查询</el-button>
          <el-button type="primary" size="mini">批量申请退件</el-button>
          <el-button type="primary" size="mini">批量取消退件</el-button>
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
        <el-table-column align="center" prop="package_code" label="包裹物流单号" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="variation_sku" label="商品规格" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" prop="warehouse_name" label="签收仓库" min-width="100" show-overflow-tooltip />
        <el-table-column align="center" prop="package_time" label="签收时间" min-width="130" show-overflow-tooltip />
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
        <el-table-column align="center" prop="package_image" label="签收图片" width="120px">
          <template slot-scope="{row}">
            <!-- <el-image :src="[scope.row.platform , scope.row.shopid , scope.row.package_image ]| imageRender" /> -->
            <img
              style="width: 40px; height: 40px"
              :src="row.package_image"
            >
            <!-- <img :src="row.package_image" alt=""> -->
          </template>
        </el-table-column>
        <el-table-column align="center" label="退件信息">
          <template slot-scope="{row}">
            <el-button type="primary" size="mini" @click="getDeturnInfo(row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appli_return_time" label="申请退件时间" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="return_shipping_number" label="退件物流单号" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="return_time" label="退件时间" />
        <el-table-column align="center" prop="created_at" label="退件物流公司" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" label="操作" min-width="100px">
          <template slot-scope="{row}">
            <el-button v-if="row.isApplyReturn===1" type="primary" size="mini" @click="returnParts(row)">退件</el-button>
            <el-button v-if="row.isApplyReturn===2" type="primary" size="mini" @click="cancelReturn(row)">取消退件</el-button>
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
    <!-- 退件信息查看弹窗 -->
    <el-dialog
      class="dialog"
      title="填写退件信息"
      :close-on-click-modal="false"
      :visible.sync="returnMsgDialog"
      width="25%"
      @close="handleClose"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="收件人">
          <el-input v-model="returnMsg.name" size="mini" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="returnMsg.phone" size="mini" />
        </el-form-item>
        <el-form-item label="退件地址">
          <el-input v-model="returnMsg.address" type="textarea" size="mini" />
          <el-button type="primary" size="mini" @click="selectAddressDia = true">选择地址</el-button>
        </el-form-item>
        <el-form-item label="退件备注">
          <el-input v-model="returnMsg.remarks" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" style="width:100px;" @click="saveReturnMsg">保存</el-button>
        </el-form-item>
      </el-form>
      <el-dialog
        class="dialog"
        width="20%"
        title="选择地址"
        :visible.sync="selectAddressDia"
        append-to-body
        :close-on-click-modal="false"
      >
        <el-form label-position="right" label-width="80px">
          <el-form-item label="收货省">
            <el-input v-model="selectAddress.name" size="mini" />
          </el-form-item>
          <el-form-item label="收货市">
            <el-input v-model="selectAddress.phone" size="mini" />
          </el-form-item>
          <el-form-item label="收货区">
            <el-input v-model="selectAddress.address" type="textarea" size="mini" />
          </el-form-item>
          <el-form-item label="详细地址">
            <el-input v-model="selectAddress.phone" size="mini" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" size="mini">确定</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </el-dialog>
    <!--退件详情-->
    <el-dialog
      class="dialog"
      title="退件详情"
      :close-on-click-modal="false"
      :visible.sync="returnInfoDialog"
      width="25%"
      @close="handleClose"
    >
      <el-form label-position="right" label-width="100px">
        <el-form-item label="退件人">
          <el-input v-model="returnInfoVal.return_contact" size="mini" />
        </el-form-item>
        <el-form-item label="退件电话">
          <el-input v-model="returnInfoVal.return_phone_number" size="mini" />
        </el-form-item>
        <el-form-item label="退件金额">
          <el-input v-model="returnInfoVal.return_amount" size="mini" />
        </el-form-item>
        <el-form-item label="退件物流单号">
          <el-input v-model="returnInfoVal.return_shipping_number" size="mini" />
        </el-form-item>
        <el-form-item label="退件物流公司">
          <el-input v-model="returnInfoVal.return_shipping_name" size="mini" />
        </el-form-item>
        <el-form-item label="退件地址">
          <el-input v-model="returnInfoVal.return_address" type="textarea" size="mini" />
        </el-form-item>
        <el-form-item label="退件备注">
          <el-input v-model="returnInfoVal.return_remarks" type="textarea" size="mini" />
        </el-form-item>
      </el-form>
    </el-dialog>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      selectAddress: { // 选择地址
        province: '',
        city: '',
        area: '',
        address: ''
      },
      returnMsg: { // 退件信息
        list: {
          gpcId: 0,
          packageCode: ''
        },
        name: '',
        phone: '',
        address: '',
        remarks: ''
      },
      returnInfoVal: { // 退件详情
        return_contact: '',
        return_phone_number: '',
        return_amount: '',
        return_shipping_number: '',
        return_shipping_name: '',
        return_address: '',
        return_remarks: ''
      },
      isShowLoading: false,
      form: {
        signingTime: '', // 包裹签收时间
        applyReturnTime: '', // 申请退件时间
        packageStatus: 0, // 包裹状态
        orderNum: '', // 订单编号
        logisticsNum: ''// 包裹物流编号
      },
      total: 0,
      pageSize: 30,
      page: 1,
      tableData: [],
      packageStatusList: [
        { value: '1', label: '已签收' },
        { value: '2', label: '已经拒收' },
        { value: '3', label: '匹配不到订单包' },
        { value: '4', label: '包裹已销毁' },
        { value: '5', label: '包裹丢件' },
        { value: '6', label: '申请退件' },
        { value: '7', label: '已退件' }
      ],
      returnMsgDialog: false,
      selectAddressDia: false, // 选择地址弹窗
      returnInfoDialog: false, // 退件详情
      multipleSelection: []
    }
  },
  mounted() {
    this.getSignPackageList()
  },
  methods: {
    // 查看退件详情
    async getDeturnInfo(row) {
      this.returnInfoDialog = true
      const parmas = {
        packageCodes: row.package_code,
        gpcId: row.gpcId
      }
      const res = await this.$api.getDeturnInfo(parmas)
    },
    // 取消退件
    async cancelReturn(row) {
      const parmas = {
        packageCodes: row.package_code
      }
      const res = await this.$api.cancelReturn(parmas)
      if (res.data.code === 200) {
        this.getSignPackageList()
        this.$message.success('取消退件成功')
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 退件
    returnParts(row) {
      console.log(row)
      this.returnMsgDialog = true
      this.returnMsg.list.gpcId = row.gpcId
      this.returnMsg.packageCode = row.package_code
    },
    // 保存退件信息
    async saveReturnMsg() {
      if (!this.returnMsg.name) return this.$message('收件人不能为空')
      if (!this.returnMsg.phone) return this.$message('联系电话不能为空')
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!reg.test(this.returnMsg.phone)) return this.$message('联系电话码格式有误')
      if (!this.returnMsg.address) return this.$message('退件地址不能为空')
      const parmas = {
        lists: {
          gpcId: this.returnMsg.list.gpcId,
          packageCode: this.returnMsg.list.gpcId
        },
        returnContact: this.returnMsg.name,
        returnPhoneNumber: this.returnMsg.phone,
        returnAddress: this.returnMsg.address,
        returnRemarks: this.returnMsg.remarks
      }
      const res = await this.$api.applicationForreJection(parmas)
      if (res.data.code === 200) {
        this.returnMsgDialog = false
        this.getSignPackageList()
        this.$message.success('申请退件成功')
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 获取数据
    async getSignPackageList() {
      this.isShowLoading = true
      const signingTime = this.form.signingTime ? `${this.$dayjs(this.form.signingTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.signingTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const applyReturnTime = this.form.applyReturnTime ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        packageCode: this.form.logisticsNum,
        mainOrderSn: this.form.orderNum,
        status: this.form.packageStatus,
        packageTime: signingTime,
        appliReturnTime: applyReturnTime,
        page: this.page,
        pageSize: this.pageSize
      }
      console.log(parmas)
      try {
        const { data } = await this.$api.getSignPackageList(parmas)
        if (data.code === 200) {
          this.total = data.data.total
          const resData = data.data.data
          if (resData) {
            this.tableData = resData
            console.log('data', resData)
            this.isShowLoading = false
          }
        } else {
          this.$message.error('获取数据失败', data.message)
          this.isShowLoading = false
        }
      // console.log('data', data)
      } catch (error) {
        console.log(error)
        this.isShowLoading = false
      }
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
    },
    handleCurrentChange(val) {
      this.page = val
    },
    handleClose() {
      this.returnMsg.list.gpcId = 0
      this.returnMsg.list.packageCode = ''
      this.returnMsg.name = ''
      this.returnMsg.phone = ''
      this.returnMsg.address = ''
      this.returnMsg.remarks = ''
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/hose-package.less';
</style>
