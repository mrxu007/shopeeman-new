<!--签收包裹异常-->
<template>
  <div class="CatchNoticeSignForPackage">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 签收时间 -->
        <div class="signingTime">签收时间：<el-date-picker v-model="form.selectTime" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" /></div>
        <!-- 采购物流单号 -->
        <div class="logisticsNumber">
          采购物流单号：
          <el-input v-model="form.packageCode" size="mini" clearable oninput="value=value.replace(/\s+/g,'')" />
        </div>
        <el-button size="mini" type="primary" @click="getExceptionNoOrderIndex">搜索</el-button>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：包裹已签收，但是匹配不到订单，仓库无法发货，需及时匹配订单，此界面只显示近7天的数据包裹异常数据</div>
      <!-- 第三行 -->
      <div class="rowThree">操作指引：请在此界面手动标记订单号或者在【订单列表】右键【同步此订单】获取订单信息</div>
    </div>
    <el-table v-loading="buttonStatus.getList" :header-cell-style="{ background: '#f5f7fa' }" :data="tableData" style="width: 100%" height="calc(100vh - 135px)">
      <el-table-column type="index" label="序列号" width="80" align="center" />
      <el-table-column label="仓库" prop="warehouse_name" min-width="100" align="center" />
      <el-table-column prop="package_time" label="签收时间" min-width="140" align="center" />
      <el-table-column label="包裹图片" align="center">
        <template slot-scope="scope">
          <el-tooltip
            v-if="scope.row.package_image"
            effect="light"
            placement="right-end"
            :visible-arrow="false"
            :enterable="false"
            style="width: 50px; height: 50px"
          >
            <div slot="content">
              <el-image
                style="width: 400px; height: 400px"
                :src="scope.row.package_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
            </div>
            <el-image
              style="width: 40px; height: 40px"
              :src="scope.row.package_image"
            >
              <div slot="error" class="image-slot" />
            </el-image>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column prop="package_code" label="采购物流单号" min-width="140" align="center" />
      <el-table-column label="操作" min-width="230" align="center">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="markMyOrderHandle(scope.row)">标记为我的订单</el-button>
          <el-button size="mini" type="primary" @click="applyReturnPartsHandle(scope.row)">申请退件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--标记为我的订单dialog-->
    <el-dialog title="标记为我的订单" :visible.sync="markMyOrderDialogFormVisible" width="300px">
      <span style="color: red; margin-left: 17px">温馨提示：请填写子订单号</span>
      <el-form :model="markMyOrderDialogForm" label-position="right" label-width="80px">
        <el-form-item label="订单编号:">
          <el-input v-model="markMyOrderDialogForm.orderSn" autocomplete="off" size="mini" clearable oninput="value=value.replace(/\s+/g,'')" style="width: 165px" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="markMyOrderDialogHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!--申请退件dialog-->
    <el-dialog title="填写退件信息" :visible.sync="applyDialogFormVisible" width="400px">
      <!-- <span style="color: red">温馨提示：请填写子订单号</span> -->
      <el-form :model="applyForm" label-position="right" label-width="80px">
        <el-form-item label="包裹号:">
          <span style="color: red">{{ applyForm.lists[0].packageCode }}</span>
        </el-form-item>
        <el-form-item label="收件人:">
          <el-input v-model="applyForm.returnContact" size="mini" style="width: 178px" clearable oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="联系电话:">
          <el-input v-model="applyForm.returnPhoneNumber" size="mini" style="width: 178px" clearable oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="退件地区:">
          <el-cascader ref="refTbCate" v-model="applyRegion" :props="props" clearable size="mini" @change="targetCate" />
        </el-form-item>
        <el-form-item label="详细地址:">
          <el-input v-model="applyForm.returnAddress" type="textarea" resize="none" size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
        <el-form-item label="退件备注:">
          <el-input v-model="applyForm.returnRemarks" type="textarea" resize="none" size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button :loading="saveLoading" type="primary" size="mini" @click="applyDialogHandle">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { delay } from '@/util/util'
export default {
  data() {
    return {
      saveLoading: false,
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
      },

      //   搜索条件
      form: {
        packageCode: '', // 创建时间
        selectTime: [new Date().getTime() - 3600 * 1000 * 24 * 7, new Date()]
      },
      // 控制标记为我的dialog
      markMyOrderDialogFormVisible: false,
      // 控制标记为我的dialog表单数据
      markMyOrderDialogForm: {
        id: '',
        orderSn: ''
      },
      // 控制申请退件dialog
      applyDialogFormVisible: false,
      // 申请退件dialog表单数据
      applyForm: {
        lists: [
          {
            gpcId: 0,
            packageCode: ''
          }
        ],
        returnContact: '',
        returnPhoneNumber: '',
        returnAddress: '',
        returnRemarks: ''
      },
      applyRegion: [],
      // 表格数据
      tableData: [],
      // 按钮状态
      buttonStatus: {
        getList: false
      },
      selectCateFinally: ''
    }
  },
  mounted() {
    this.getExceptionNoOrderIndex()
  },
  methods: {
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
        this.applyForm.returnAddress = Object.keys(nameArr).toString().replace(/,/g, '')
      }
    },
    // 获取签收包裹异常列表
    async getExceptionNoOrderIndex() {
      if (!this.form.selectTime) {
        this.$message.error('请先选择时间')
        return
      }
      if (this.buttonStatus.getList) {
        return
      }
      this.buttonStatus.getList = true
      const startTime = this.formatSearch(this.form.selectTime[0])
      const endTime = this.formatSearch(this.form.selectTime[1])
      const packageCode = this.form.packageCode
      const params = {}
      startTime && endTime ? params['packageTime'] = `${startTime}/${endTime}` : ''
      packageCode ? params['packageCode'] = packageCode : ''
      const res = await this.$api.getExceptionNoOrderIndex(params)
      if (res.data.code === 200) {
        this.tableData = res.data.data.data
      } else {
        this.$message.error(res.data.message)
      }
      this.buttonStatus.getList = false
    },
    // 标记为我的订单
    markMyOrderHandle(row) {
      this.markMyOrderDialogForm = {
        id: '',
        orderSn: ''
      }
      this.markMyOrderDialogForm.id = row.id
      this.markMyOrderDialogFormVisible = true
    },
    // 标记为我的订单dialog确定
    async markMyOrderDialogHandle() {
      const result = await this.$api.markPackageToMy(this.markMyOrderDialogForm)
      if (result.data.code === 200) {
        this.markMyOrderDialogFormVisible = false
        this.$message({
          message: '标记成功',
          type: 'success'
        })
        this.getExceptionNoOrderIndex()
      } else {
        this.$message.error(result.data.message)
      }
    },
    // 申请退件dialog确定
    async applyDialogHandle() {
      if (!this.applyForm.returnContact) {
        this.$message.error('收件人不能为空')
        return
      }
      if (!this.applyForm.returnPhoneNumber) {
        return this.$message.error('联系电话不能为空')
      }
      if (!this.applyRegion || !this.applyRegion.length) {
        return this.$message.error('退件地区不能为空')
      }
      if (!this.applyForm.returnAddress) {
        return this.$message.error('详细地址不能为空')
      }
      if (!this.applyForm.returnRemarks) {
        return this.$message.error('退件备注不能为空')
      }
      this.saveLoading = true
      const res = await this.$api.applicationForreJection(this.applyForm)
      console.log(res.data.data[0])
      if (res.data.code === 200) {
        this.applyDialogFormVisible = false
        this.$message({
          message: '申请退件成功',
          type: 'success'
        })
      } else {
        let errData = res.data.data[0]
        errData = errData.substring(errData.indexOf(':') + 1)
        this.$message.error(errData)
      }
      this.saveLoading = false
    },
    // 申请退件
    applyReturnPartsHandle(row) {
      this.applyForm.lists = []
      this.applyForm.lists.push({ gpcId: row.id, packageCode: row.package_code })
      this.applyForm['returnPhoneNumber'] = ''
      this.applyForm['returnContact'] = ''
      this.applyForm['returnRemarks'] = ''
      this.applyForm['returnAddress'] = ''
      this.applyRegion = []
      this.applyDialogFormVisible = true
    },
    // 格式化搜索时间
    formatSearch(data) {
      const time = new Date(data)
      // 分别获取年月日时分秒
      const year = time.getFullYear()
      const month = ((time.getMonth() + 1) + '').padStart(2, 0)
      const day = (time.getDate() + '').padStart(2, 0)
      const hours = (time.getHours() + '').padStart(2, 0)
      const minutes = (time.getMinutes() + '').padStart(2, 0)
      const seconds = (time.getSeconds() + '').padStart(2, 0)
      const result = `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
      return result
    }
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeSignForPackage {
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
  }
  .rowOne {
    display: flex;
    align-items: center;
    //签收时间
    .signingTime {
      /deep/.el-date-editor {
        width: 208px;
        .el-range-separator {
          text-align: center;
          padding: 0px;
        }
      }
    }
    //采购物流单号
    .logisticsNumber {
      margin: 0 15px;
      .el-input {
        width: 150px;
      }
    }
  }
  .rowTwo {
    font-size: 13px;
  }
  .rowThree {
    color: red;
    font-size: 13px;
  }
}
//表格部分
.el-table {
  margin-top: 10px;
}
/deep/.el-dialog {
  .el-dialog__header {
    text-align: left;
  }
  .el-dialog__body {
    padding-bottom: 0px;
    padding-top: 10px;
    .el-form {
      margin-top: 10px;
      .el-form-item {
        margin-bottom: 10px;
      }
    }
  }
  .dialog-footer {
    text-align: center;
  }
}
</style>
