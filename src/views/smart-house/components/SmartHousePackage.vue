<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>包裹签收时间：</span>
          <el-date-picker
            v-model="form.signingTime"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>订单编号：</span>
          <el-input
            v-model="form.orderNum"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>包裹物流编号：</span>
          <el-input
            v-model="form.logisticsNum"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
      </ul>
      <ul>
        <li>
          <span>申请退件时间：</span>
          <el-date-picker
            v-model="form.applyReturnTime"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>包裹状态：</span>
          <el-select
            v-model="form.packageStatus"
            placeholder=""
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="(item, index) in packageStatusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            :disabled="cancelLoading"
            @click="
              page =1
              getSignPackageList()"
          >查询</el-button>
          <el-button
            type="primary"
            size="mini"
            :disabled="cancelLoading"
            @click="returnParts(multipleSelection,1)"
          >批量申请退件</el-button>
          <el-button
            type="primary"
            size="mini"
            :loading="cancelLoading"
            @click="cancelReturn(multipleSelection)"
          >批量取消退件</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 210px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          min-width="50px"
          fixed
        />
        <!-- <el-table-column
          align="center"
          type="index"
          label="序号"
          fixed
        /> -->
        <el-table-column
          align="center"
          prop="package_code"
          label="包裹物流单号"
          min-width="150px"
          fixed
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.package_code }}
              <span
                v-if="row.package_code"
                class="copyIcon"
                @click="copy(row.package_code)"
              ><i class="el-icon-document-copy" /></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="order_sn"
          label="订单编号"
          min-width="180px"
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.order_sn }}
              <span
                v-if="row.order_sn"
                class="copyIcon"
                @click="copy(row.order_sn)"
              ><i class="el-icon-document-copy" />
              </span></span>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="variation_sku"
          label="商品规格"
          min-width="120px"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="warehouse_name"
          label="签收仓库"
          min-width="130px"
          show-overflow-tooltip
        />
        <el-table-column
          align="center"
          prop="package_time"
          label="签收时间"
          min-width="180px"
        />
        <el-table-column
          align="center"
          prop="status"
          label="状态"
          min-width="70px"
        >
          <template slot-scope="{ row }">
            {{ statusObj[row.status]?statusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="package_image"
          label="签收图片"
          min-width="120px"
        >
          <template slot-scope="{ row }">
            <el-tooltip
              v-if="row.package_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.package_image"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                :src="row.package_image"
                alt=""
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          label="退件信息"
          min-width="180px"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.isApplyReturn === 2"
              type="primary"
              size="mini"
              @click="getReturnInfo(row)"
            >查看</el-button>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="appli_return_time"
          label="申请退件时间"
          min-width="180px"
        />
        <el-table-column
          align="center"
          prop="return_shipping_number"
          label="退件物流单号"
          min-width="180px"
        />
        <el-table-column
          align="center"
          prop="return_time"
          label="退件时间"
          min-width="180px"
        />
        <el-table-column
          align="center"
          prop="return_shipping_name"
          label="退件物流公司"
          min-width="180px"
        />
        <el-table-column
          label="操作"
          min-width="120px"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <el-button
              v-if="row.isApplyReturn === 1"
              :disabled="cancelLoading"
              type="primary"
              size="mini"
              @click="returnParts(row,2)"
            >{{ row.warehouse_type === 3?'海外仓退件':'退件' }} </el-button>
            <el-button
              v-if="row.isApplyReturn === 2"
              :disabled="cancelLoading"
              type="primary"
              size="mini"
              @click="cancelReturn(row)"
            >取消退件</el-button>
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
    <el-dialog
      class="dialog"
      title="填写退件信息"
      :close-on-click-modal="false"
      :visible.sync="returnMsgDialog"
      width="350px"
      :close-on-press-escape="false"
      :show-close="!isButLoading"
      @close="handleClose"
    >
      <el-form label-position="right" label-width="80px">
        <el-form-item label="收件人：">
          <el-input
            v-model="returnMsg.returnContact"
            clearable
            placeholder="请填写收件人"
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <el-form-item label="联系电话：">
          <el-input
            v-model="returnMsg.returnPhoneNumber"
            clearable
            placeholder="请填写联系电话"
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <div v-if="!isOverseas">
          <address-model ref="addressModel" is-init @sendData="sendData" />
        </div>
        <el-form-item :label="isOverseas?'退件地址：':'详细地址：'">
          <el-input
            v-model="returnMsg.returnAddress"
            type="textarea"
            placeholder="请填写详细地址"
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
        <div v-if="isOverseas">
          <div class="tip">
            <p>shoppe平台包裹：上传平台返回的退件包裹二维码</p>
            <p>Lazada平台包裹：上传平台返回的退件包裹PDF文件</p>
          </div>
          <el-form-item label="包裹文件：">
            <div style="display: flex">
              <div>
                <el-button
                  :loading="upFileLiadding"
                  type="primary"
                  size="mini"
                  @click="reupload"
                >
                  <i class="el-icon-upload el-icon--right"> 上传文件 </i>
                </el-button>
              </div>
              <div class="img-box" style="width: 40px; height: 40px; margin-left:5px">
                <img
                  :src="returnMsg.returnFile"
                  alt=""
                  width="40px"
                  height="40px"
                >
              </div>
            </div>
          </el-form-item>
        </div>
        <el-form-item label="退件备注：">
          <el-input
            v-model="returnMsg.returnRemarks"
            type="textarea"
            size="mini"
            placeholder="请填写退件备注"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </el-form-item>
      </el-form>
      <div style="text-align: center">
        <el-button
          :loading="isButLoading"
          type="primary"
          size="mini"
          style="width: 100px"
          @click="saveReturnMsg"
        >保 存</el-button>
      </div>
    </el-dialog>
    <!--退件详情-->
    <el-dialog class="dialog" title="退件详情" :close-on-click-modal="false" :visible.sync="returnInfoDialog" width="400px" @close="handleClose">
      <el-form label-position="right" label-width="100px">
        <el-form-item label="退件人">
          <el-input
            v-model="returnInfoVal.return_contact"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件电话">
          <el-input
            v-model="returnInfoVal.return_phone_number"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件金额">
          <el-input
            v-model="returnInfoVal.return_amount"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件物流单号">
          <el-input
            v-model="returnInfoVal.return_shipping_number"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件物流公司">
          <el-input
            v-model="returnInfoVal.return_shipping_name"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件地址">
          <el-input
            v-model="returnInfoVal.return_address"
            type="textarea"
            size="mini"
          />
        </el-form-item>
        <el-form-item label="退件备注">
          <el-input
            v-model="returnInfoVal.return_remarks"
            type="textarea"
            size="mini"
          />
        </el-form-item>
      </el-form>
    </el-dialog>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </el-row>
</template>

<script>
import AddressModel from '../../../components/address-model.vue'
export default {
  components: {
    AddressModel
  },
  data() {
    return {
      address: '', // 省市区地址
      isOverseas: false, // 是否国外仓
      showConsole: true,
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
      upFileLiadding: false,
      form: {
        signingTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()], // 包裹签收时间
        applyReturnTime: '', // 申请退件时间
        packageStatus: 0, // 包裹状态
        orderNum: '', // 订单编号
        logisticsNum: '' // 包裹物流编号
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
      statusObj: {
        1: '已签收',
        2: '已经拒收',
        3: '匹配不到订单包',
        4: '包裹已销毁',
        5: '包裹丢件',
        6: '申请退件',
        7: '已退件'
      },
      returnMsgDialog: false,
      returnInfoDialog: false, // 退件详情
      multipleSelection: [],
      packageCodes: []
    }
  },
  mounted() {
    this.getSignPackageList()
  },
  methods: {
    // 上传文件
    reupload() {
      const input = document.createElement('input')
      input.type = 'file'
      input.onchange = () => {
        const fileData = input.files[0]
        if (!/\.(jpg|png|pdf)$/.test(fileData.name.toLowerCase())) {
          this.$refs.Logs.writeLog('格式错误,请上传jpg、png、pdf格式的文件', false)
          this.showConsole = false
          return
        }
        const reader = new FileReader()
        reader.readAsDataURL(fileData) // 异步读取文件内容，结果用data:url的字符串形式表示
        /* 当读取操作成功完成时调用*/
        reader.onload = async(e) => {
          console.log(e) // 查看对象属性里面有个result属性，属性值，是一大串的base64格式的东西，这个就是我们要的图片
          const base64Str = reader.result // 取得数据 这里的this指向FileReader（）对象的实例reader
          this.upFileLiadding = true
          const imageUrl = await this.$ossService.uploadFile(base64Str, Math.round(Math.random() * 100000000) + '.png')
          console.log(imageUrl, 'imageUrl')
          this.returnMsg.returnFile = ''
          this.returnMsg.returnFile = imageUrl
          this.upFileLiadding = false
        }
      }
      const event = new MouseEvent('click')
      input.dispatchEvent(event)
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
        this.returnInfoVal = {
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
    // 取消退件/批量取消退件
    async cancelReturn(val) {
      this.packageCodes = []
      if (Array.isArray(val)) {
        if (!val.length) return this.$message('请选择需要取消退件的包裹')
        val.map((item) => {
          this.packageCodes.push(item.package_code)
        })
      } else {
        this.packageCodes.push(val.package_code)
      }
      this.cancelLoading = true
      const res = await this.$api.cancelReturn({ packageCodes: this.packageCodes })
      console.log('res', res)
      if (res.data.code === 200) {
        this.getSignPackageList()
        this.$message.success('取消退件成功')
      } else {
        this.$message.error(res.data.message)
      }
      this.cancelLoading = false
    },
    // 退件/批量申请退件
    returnParts(val, type) {
      this.handleClose()
      if (type === 1) {
        if (!val.length) return this.$message('请选择需要申请退件的包裹')
        if (val.every(item => item.warehouse_type === val[0].warehouse_type)) {
          val.map((item) => {
            this.returnMsg.lists.push({ gpcId: item.gpcId, packageCode: item.package_code })
            if (item.warehouse_type === 3) this.isOverseas = true
          })
          this.returnMsgDialog = true
        } else {
          this.$message.error('无法同时退不同仓库的包裹')
        }
      } else {
        this.returnMsg.lists.push({ gpcId: val.gpcId, packageCode: val.package_code })
        if (val.warehouse_type === 3) this.isOverseas = true
        this.returnMsgDialog = true
      }
    },
    // 保存退件信息
    async saveReturnMsg() {
      const reg = /^1([38]\d|5[0-35-9]|7[3678])\d{8}$/
      if (!this.returnMsg.returnContact) return this.$message('收件人不能为空')
      if (!this.returnMsg.returnPhoneNumber) return this.$message('联系电话不能为空')
      if (!reg.test(this.returnMsg.returnPhoneNumber) && !this.isOverseas) return this.$message('联系电话码格式有误')
      if (!this.returnMsg.returnAddress) return this.$message('详细地址不能为空')
      if (!this.returnMsg.returnFile && this.isOverseas) return this.$message('海外仓必须上传退件包裹文件')
      this.isButLoading = true
      this.showConsole = false
      const newData = JSON.parse(JSON.stringify(this.returnMsg))
      newData.returnAddress = this.address.replaceAll(',', ' ') + this.returnMsg.returnAddress
      try {
        const { data } = await this.$api.applicationForreJection(newData)
        if (data.code === 200) {
          data.data.forEach((item) => {
            this.$refs.Logs.writeLog(`物流单号【${item.split('：')[0]}】申请退件成功`, true)
            this.getSignPackageList()
          })
        } else {
          data.data.forEach((item) => {
            this.$refs.Logs.writeLog(`【${item.split('：')[0]}】${item.split('：')[1]}`, false)
          })
          console.log(data)
        }
      } catch (error) {
        this.$message.error('保存退件信息异常')
      }
      this.returnMsgDialog = false
      this.isButLoading = false
    },
    // 获取数据
    async getSignPackageList() {
      this.isShowLoading = true
      const signingTime = this.form.signingTime ? `${this.$dayjs(this.form.signingTime[0]).format('YYYY-MM-DD 00:00:00')}/${this.$dayjs(this.form.signingTime[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const applyReturnTime = this.form.applyReturnTime
        ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD 00:00:00')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD 23:59:59')}`
        : ''
      const parmas = {
        packageCode: this.form.logisticsNum,
        mainOrderSn: this.form.orderNum,
        status: Number(this.form.packageStatus),
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
          }
        } else {
          this.$message.error('获取数据失败', data.message)
        }
      } catch (error) {
        console.log(`${error}`)
      }
      this.isShowLoading = false
    },
    // 点击复制
    copy(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    },
    sendData(val) {
      console.log('addressData', val)
      const { province_text, city_text, distinct_text } = val
      this.address = province_text + ',' + city_text + ',' + distinct_text + ','
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
      this.returnMsg = {
        lists: [],
        returnFile: ''
      }
      this.returnInfoVal = {}
      this.isButLoading = false
      this.isOverseas = false
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
