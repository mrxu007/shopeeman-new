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
          <el-button type="primary" size="mini" :disabled="cancelLoading" @click="getSignPackageList">查询</el-button>
          <el-button type="primary" size="mini" :disabled="cancelLoading" @click="batchReturnParts">批量申请退件</el-button>
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
        <el-table-column align="center" prop="package_code" label="包裹物流单号" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="variation_sku" label="商品规格" min-width="120" show-overflow-tooltip />
        <el-table-column align="center" prop="warehouse_name" label="签收仓库" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="package_time" label="签收时间" min-width="150" show-overflow-tooltip />
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
            <el-tooltip
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 40px; height: 40px"
            >
              <div slot="content">
                <img
                  :src="row.package_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image :src="row.package_image" alt="" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column align="center" label="退件信息">
          <template slot-scope="{row}">
            <el-button v-if="row.isApplyReturn===2" type="primary" size="mini" @click="getReturnInfo(row)">查看</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="appli_return_time" label="申请退件时间" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="return_shipping_number" label="退件物流单号" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" prop="return_time" label="退件时间" />
        <el-table-column align="center" prop="return_shipping_name" label="退件物流公司" min-width="130" show-overflow-tooltip />
        <el-table-column align="center" label="操作" min-width="100px">
          <template slot-scope="{row}">
            <el-button v-if="row.isApplyReturn===1" :disabled="cancelLoading" type="primary" size="mini" @click="returnParts(row)">退件</el-button>
            <el-button v-if="row.isApplyReturn===2" :disabled="cancelLoading" type="primary" size="mini" @click="cancelReturn(row)">取消退件</el-button>
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
      width="400px"
      :close-on-press-escape="false"
      :show-close="!isButLoading"
      @close="handleClose"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="收件人">
          <el-input v-model="returnMsg.returnContact" size="mini" />
        </el-form-item>
        <el-form-item label="联系电话">
          <el-input v-model="returnMsg.returnPhoneNumber" size="mini" />
        </el-form-item>
        <el-form-item label="退件地区">
          <el-cascader ref="refTbCate" v-model="applyRegion" :props="props" clearable size="mini" @change="targetCate" />
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input v-model="returnMsg.returnAddress" type="textarea" size="mini" />
        </el-form-item>
        <p style="color:red;">shoppe平台包裹：上传平台返回的退件包裹二维码</p>
        <p style="color:red;">Lazada平台包裹：上传平台返回的退件包裹PDF文件</p>
        <el-form-item label="包裹文件">
          <el-upload ref="importRef" accept=".png,.jpg " action="https://jsonplaceholder.typicode.com/posts/" :on-change="importUrlEvent" :show-file-list="false" :auto-upload="false">
            <el-button :data="importUrl" size="mini" type="primary"> 导入文件 </el-button>
          </el-upload>
        </el-form-item>
        <el-form-item label="退件备注">
          <el-input v-model="returnMsg.returnRemarks" type="textarea" size="mini" />
        </el-form-item>
      </el-form>
      <div style="text-align: center;">
        <el-button :loading="isButLoading" type="primary" size="mini" style="width:100px;" @click="saveReturnMsg">保存</el-button>
      </div>
    </el-dialog>
    <!--退件详情-->
    <el-dialog
      class="dialog"
      title="退件详情"
      :close-on-click-modal="false"
      :visible.sync="returnInfoDialog"
      width="400px"
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
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </el-row>
</template>

<script>
export default {
  data() {
    return {
      showConsole: true,
      applyRegion: [], // 退件地址
      selectAddress: { // 选择地址
        province: '',
        city: '',
        area: '',
        address: ''
      },
      returnMsg: { // 退件信息
        lists: [],
        returnContact: '',
        returnPhoneNumber: '',
        returnAddress: '',
        returnRemarks: '',
        returnFile: ''
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
      isButLoading: false,
      cancelLoading: false,
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
      returnInfoDialog: false, // 退件详情
      multipleSelection: [],
      packageCodes: [],
      props: {
        lazy: true,
        that: this,
        lazyLoad(node, resolve) {
          const { level } = node
          setTimeout(async() => {
            let nodes = []
            if (level === 0) {
              const res = await this.that.$BaseUtilService.getPddAddressModel('0')
              nodes = res.map(item => {
                item.label = item.RegionName
                item.leaf = item.RegionType >= 3
                item.value = item.RegionId
                return item
              })
            } else {
              const res = await this.that.$BaseUtilService.getPddAddressModel(node.value)
              nodes = res.map(item => {
                item.label = item.RegionName
                item.leaf = item.RegionType >= 3
                item.value = item.RegionId
                return item
              })
            }
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes || [])
          }, 1000)
        }
      }
    }
  },
  mounted() {
    this.getSignPackageList()
  },
  methods: {
    getImages(_url) {
      if (_url !== undefined) {
        const _u = _url.substring(7)
        return 'https://images.weserv.nl/?url=' + _u
      }
    },
    // 导入事件
    importUrlEvent(file) {
      console.log(file)
      const files = { 0: file.raw }
      if (!/\.(jpg|png)$/.test(files[0].name.toLowerCase())) {
        this.$refs.Logs.writeLog('格式错误,请上传jpg、png格式的文件', false)
        this.showConsole = false
        return
      }
      console.log(files)
      this.importUrl()
    },
    importUrl() {

    },
    // 用户选择后最终的类目id
    async targetCate(val) {
      if (val.length > 0) {
        console.log('val', val)
        this.selectCateFinally = ''
        const finallyname = this.$refs.refTbCate.getCheckedNodes()[0]
        console.log('finallyname', finallyname)
        const nameArr = {}
        finallyname.pathLabels.map(item => {
          if (!nameArr[item]) {
            nameArr[item] = '1'
          }
        })
        this.returnMsg.returnAddress = Object.keys(nameArr).toString().replace(/,/g, '')
      }
    },
    // 查看退件详情
    async getReturnInfo(row) {
      const parmas = {
        packageCode: row.package_code,
        gpcId: row.gpcId
      }
      const { data } = await this.$api.getReturnInfo(parmas)
      if (data.code === 200) {
        this.returnInfoDialog = true
        this.returnInfoVal = { // 退件详情
          return_contact: data.data.return_contact,
          return_phone_number: data.data.return_phone_number,
          return_amount: data.data.return_amount,
          return_shipping_number: data.data.return_shipping_number,
          return_shipping_name: data.data.return_shipping_name,
          return_address: data.data.return_address,
          return_remarks: data.data.return_remarks
        }
      } else {
        this.$message.error(data.message)
      }
    },
    // 批量取消退件
    async  batchCancelReturn() {
      if (!this.multipleSelection.length) return this.$message('请选择需要取消退件的包裹')
      this.packageCodes = []
      this.multipleSelection.map(item => {
        this.packageCodes.push(item.package_code)
      })
      this.cancelLoading = true
      await this.cancel()
      this.cancelLoading = false
    },
    // 取消退件
    async cancelReturn(row) {
      this.packageCodes = []
      this.packageCodes.push(row.package_code)
      await this.cancel()
    },
    async cancel() {
      console.log('packageCodes', this.packageCodes)
      const res = await this.$api.cancelReturn({ packageCodes: this.packageCodes })
      console.log('res', res)
      if (res.data.code === 200) {
        this.getSignPackageList()
        this.$message.success('取消退件成功')
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 批量申请退件
    batchReturnParts() {
      if (!this.multipleSelection.length) return this.$message('请选择需要申请退件的包裹')
      this.returnMsgDialog = true
      this.returnMsg.lists = []
      this.multipleSelection.forEach(item => {
        this.returnMsg.lists.push({ gpcId: item.gpcId, packageCode: item.package_code })
      })
    },
    // 退件
    returnParts(row) {
      this.returnMsg.lists = []
      this.returnMsgDialog = true
      this.returnMsg.lists.push({ gpcId: row.gpcId, packageCode: row.package_code })
    },
    // 保存退件信息
    async saveReturnMsg() {
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!this.returnMsg.returnContact) return this.$message('收件人不能为空')
      if (!this.returnMsg.returnPhoneNumber) return this.$message('联系电话不能为空')
      if (!reg.test(this.returnMsg.returnPhoneNumber)) return this.$message('联系电话码格式有误')
      if (!this.applyRegion || !this.applyRegion.length) return this.$message('退件地区不能为空')
      if (!this.returnMsg.returnAddress) return this.$message('详细地址不能为空')
      this.isButLoading = true
      console.log('this.returnMsg', this.returnMsg)
      const { data } = await this.$api.applicationForreJection(this.returnMsg)
      if (data.code === 200) {
        data.data.forEach(item => {
          this.$refs.Logs.writeLog(`物流单号【${item.split('：')[0]}】申请退件成功`, true)
        })
      } else {
        data.data.forEach(item => {
          this.$refs.Logs.writeLog(`【${item.split('：')[0]}】${item.split('：')[1]}`, false)
        })
        console.log(data)
      }
      this.showConsole = false
      this.getSignPackageList()
      this.returnMsgDialog = false
      this.isButLoading = false
    },
    // 获取数据
    async getSignPackageList() {
      this.isShowLoading = true
      const signingTime = this.form.signingTime ? `${this.$dayjs(this.form.signingTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.signingTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const applyReturnTime = this.form.applyReturnTime ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        packageCode: this.form.logisticsNum.trim(),
        mainOrderSn: this.form.orderNum.trim(),
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
            this.tableData.map(item => {
              item.package_image = this.getImages(item.package_image)
            })
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
      this.getSignPackageList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getSignPackageList()
    },
    handleClose() {
      this.returnMsg = {}
      this.applyRegion = []
      this.returnInfoVal = {}
      this.isButLoading = false
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
