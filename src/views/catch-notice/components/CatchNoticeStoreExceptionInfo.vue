<!--仓库异常信息-->
<template>
  <div class="CatchNoticeStoreExceptionInfo">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <div class="exceptionType">
          异常类型：
          <el-select
            v-model="form.type"
            size="mini"
            multiple
            collapse-tags
            @change="exceptionTypeOneChangeHandle"
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in exceptionTypeOptionsOne"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="exceptionType">
          处理方式：
          <el-select
            v-model="form.wechatStatus"
            size="mini"
            multiple
            collapse-tags
            @change="exceptionTypeTwoChangeHandle"
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in exceptionTypeOptionsTwo"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="exceptionType">
          仓库处理状态：
          <el-select
            v-model="form.status"
            size="mini"
            multiple
            collapse-tags
            @change="dealStatusChangeHandel"
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in status"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="creationTime">
          创建时间：<el-date-picker
            v-model="form.dateStat"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </div>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        <div class="orderNumber">
          物流单号：
          <el-input v-model="form.packageCode" size="mini" />
        </div>
        <div class="orderNumber">
          订单号：
          <el-input v-model="form.orderSn" size="mini" />
        </div>
        <div class="searchRowThreeBottonGroup">
          <el-button type="primary" size="mini" @click="getExceptionWarehouse">搜索</el-button>
          <el-button type="primary" size="mini" @click="orderBatchDealHandle">订单批量处理</el-button>
        </div>
      </div>
    </div>
    <el-table
      v-loading="isLoading"
      :header-cell-style="{background:'#f5f7fa'}"
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100vh - 134px)"
      @selection-change="selectionChangeHandle"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="仓库名称"
        prop="warehouse_name"
      />
      <el-table-column
        prop="package_order_sn"
        label="订单号"
      />
      <el-table-column
        prop="package_code"
        label="物流单号"
      />
      <el-table-column
        prop="wechat_status"
        label="处理方式"
        :formatter="formatterWechatStatus"
      />
      <el-table-column
        prop="content"
        label="异常信息"
      />
      <el-table-column
        prop="type"
        label="异常类型"
        :formatter="formatterContent"
      />
      <el-table-column
        label="异常图片"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.image"
            :preview-src-list="[scope.row.image]"
          >
            <div slot="error" class="image-slot" />
          </el-image>
        </template>
      </el-table-column>
      <el-table-column
        prop="created_at"
        label="创建时间"
      />
      <el-table-column
        prop="updated_at"
        label="更改时间"
      />
      <el-table-column
        prop="status"
        label="仓库处理状态"
        :formatter="formatterStatus"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="orderDealHandle(scope.row)">订单处理</el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--订单处理dialog-->
    <el-dialog title="选择处理方式" :visible.sync="orderDealDialogFormVisible" width="400px">
      <el-form :model="orderDealDialogForm">
        <el-form-item label="处理方式:" label-width="80px">
          <el-select v-model="orderDealDialogForm.wechatStatus" size="mini" placeholder="请选择处理方式">
            <el-option v-for="item in wechatStatusDialogOption" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          :loading="butLoading"
          @click="orderDealDialogHandle"
        >确 定</el-button>
      </div>
    </el-dialog>
    <!--批量订单处理dialog-->
    <el-dialog title="选择处理方式" :visible.sync="orderBatchDealDialogFormVisible" width="400px">
      <el-form :model="orderBatchDealDialogForm">
        <el-form-item label="处理方式:" label-width="80px">
          <el-select v-model="orderBatchDealDialogForm.wechatStatus" size="mini" placeholder="请选择处理方式">
            <el-option v-for="item in wechatStatusDialogOption" :key="item.id" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button
          size="mini"
          type="primary"
          :loading="butBatchLoading"
          @click="orderBatchDealDialogHandle"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      butLoading: false, // 弹窗按钮加载
      butBatchLoading: false,
      // dialog下拉选择状态
      wechatStatusDialogOption: [
        // {
        //   id: 0,
        //   value: 0,
        //   label: '暂未处理'
        // },
        {
          id: 1,
          value: 1,
          label: '退件'
        }, {
          id: 2,
          value: 2,
          label: '暂存仓库'
        }, {
          id: 3,
          value: 3,
          label: '坚持发货'
        }, {
          id: 4,
          value: 4,
          label: '等候补发'
        }
        // {
        //   id: 5,
        //   value: 5,
        //   label: '订单匹配完成'
        // }, {
        //   id: 6,
        //   value: 6,
        //   label: '处理完成'
        // }, {
        //   id: 50,
        //   value: 50,
        //   label: '通知提示'
        // }
      ],
      //   搜索条件
      form: {
        type: [], // 异常类型
        wechatStatus: [], // 处理方式：
        status: [], // 仓库处理状态
        dateStat: [new Date().getTime() - 3600 * 1000 * 24 * 15, new Date()], // 创建时间
        packageCode: '', // 物流单号
        orderSn: ''// 订单号
      },
      // 控制订单处理dialog
      orderDealDialogFormVisible: false,
      // 订单处理dialog表单数据
      orderDealDialogForm: {
        id: '',
        wechatStatus: 1
      },
      // 控制批量订单处理
      orderBatchDealDialogFormVisible: false,
      // 批量订单处理dialog表单数据
      orderBatchDealDialogForm: {
        id: [],
        wechatStatus: 1
      },
      // 第一个异常类型options
      exceptionTypeOptionsOne: [{
        id: 1,
        value: 1,
        label: '到货实物颜色与订单要求产品不符'
      }, {
        id: 2,
        value: 2,
        label: '到货包裹是空包'
      }, {
        id: 3,
        value: 3,
        label: '到货包裹码数错误'
      }, {
        id: 4,
        value: 4,
        label: '到货包裹里多订单无法区分识别'
      }, {
        id: 5,
        value: 5,
        label: '到货包裹缺件少件，无法满足对应销售订单'
      }, {
        id: 6,
        value: 6,
        label: '到货包裹脏污、破损'
      }, {
        id: 7,
        value: 7,
        label: '到货包裹渠道无法支持'
      }, {
        id: 8,
        value: 8,
        label: '到货包裹超材超重，无法寄出'
      }, {
        id: 9,
        value: 9,
        label: '到货包裹运费偏高，请确认是否选择发货'
      }, {
        id: 10,
        value: 10,
        label: '到货包裹无法打印面单，请及时同步'
      }, {
        id: 11,
        value: 11,
        label: '系统已欠费，无法寄出，请及时安排充值'
      }, {
        id: 12,
        value: 12,
        label: '无法支持尾程物流渠道，请安排处理'
      }, {
        id: 13,
        value: 13,
        label: '包裹未匹配订单，请及时处理'
      }, {
        id: 50,
        value: 50,
        label: '备货缺件，无法发货'
      }
      ],
      // 记录是否全选
      exceptionTypeOptionsOneAll: true,
      // 处理方式options
      exceptionTypeOptionsTwo: [{
        id: 0,
        value: 0,
        label: '暂未处理'
      }, {
        id: 1,
        value: 1,
        label: '退件'
      }, {
        id: 2,
        value: 2,
        label: '暂存仓库'
      }, {
        id: 3,
        value: 3,
        label: '坚持发货'
      }, {
        id: 4,
        value: 4,
        label: '等候补发'
      }, {
        id: 5,
        value: 5,
        label: '订单匹配完成'
      }, {
        id: 6,
        value: 6,
        label: '处理完成'
      }, {
        id: 50,
        value: 50,
        label: '通知提示'
      }],
      // 记录是否全选
      exceptionTypeOptionsTwoAll: true,
      // 仓库处理状态
      status: [
        {
          id: 1,
          value: 1,
          label: '未处理'
        }, {
          id: 2,
          value: 2,
          label: '处理中'
        }, {
          id: 3,
          value: 3,
          label: '已处理'
        }
      ],
      // 记录是否全选
      dealStatusAll: true,
      // 表格数据
      tableData: [],
      // 表格选中的数据
      tableCheck: [],
      isLoading: false
    }
  },
  mounted() {
    this.initSelect()
    this.getExceptionWarehouse()
  },
  methods: {
    // 初始选择值
    initSelect() {
      this.form.type.push('all')
      this.exceptionTypeOptionsOne.map(item => {
        this.form.type.push(item.id)
      })
      this.form.wechatStatus.push('all')
      this.exceptionTypeOptionsTwo.map(item => {
        this.form.wechatStatus.push(item.id)
      })
      this.form.status.push('all')
      this.status.map(item => {
        this.form.status.push(item.id)
      })
    },
    // 当表格check改变时
    selectionChangeHandle(value) {
      this.tableCheck = value
    },
    // 订单批量处理
    orderBatchDealHandle() {
      if (!this.tableCheck?.length) return this.$message('请选择需要批量处理的订单')
      this.orderBatchDealDialogFormVisible = true
    },
    // 批量订单处理dialog确定
    async orderBatchDealDialogHandle() {
      this.butBatchLoading = true
      this.orderBatchDealDialogForm.id = []
      this.tableCheck.forEach(item => {
        this.orderBatchDealDialogForm.id.push(item.id)
      })
      const params = {
        ids: this.orderBatchDealDialogForm.id.toString(),
        wechatStatus: this.orderBatchDealDialogForm.wechatStatus
      }
      const result = await this.$api.uploadDealExceptionStatus(params)
      if (result.data.code === 200) {
        this.orderDealDialogFormVisible = false
        this.$message.success('订单处理成功')
        this.getExceptionWarehouse()
      } else {
        this.$message.error(result.data.message)
      }
      this.butBatchLoading = false
    },
    // 订单处理dialog确定
    async orderDealDialogHandle() {
      this.butLoading = true
      const result = await this.$api.uploadDealExceptionStatus(this.orderDealDialogForm)
      if (result.data.code === 200) {
        this.orderDealDialogFormVisible = false
        this.$message({
          message: '订单处理成功',
          type: 'success'
        })
        this.getExceptionWarehouse()
      } else {
        this.$message.error(result.data.message)
      }
      this.butLoading = false
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
    },
    // 订单处理
    orderDealHandle(row) {
      this.orderDealDialogForm.ids = row.id
      this.orderDealDialogFormVisible = true
    },
    // 格式化仓库异常类型
    formatterContent(row, column) {
      const shotStatus = row.type
      switch (shotStatus) {
        case 1:
          return '到货实物颜色与订单要求产品不符'
        case 2:
          return '到货包裹是空包'
        case 3:
          return '到货包裹码数错误'
        case 4:
          return '到货包裹里多订单无法区分识别'
        case 5:
          return '到货包裹缺件少件，无法满足对应销售订单'
        case 6:
          return '到货包裹脏污、破损'
        case 7:
          return '到货包裹渠道无法支持'
        case 8:
          return '到货包裹超材超重，无法寄出'
        case 9:
          return '到货包裹运费偏高，请确认是否选择发货'
        case 10:
          return '到货包裹无法打印面单，请及时同步'
        case 11:
          return '系统已欠费无法出库，请及时安排充值'
        case 12:
          return '无法支持尾程物流渠道，请安排处理'
        case 13:
          return '包裹未匹配订单，请及时处理'
        case 50:
          return '备货缺件，无法发货'
      }
    },
    // 格式化处理方式
    formatterWechatStatus(row, column) {
      const shotStatus = row.wechat_status
      switch (shotStatus) {
        case 0:
          return '暂未处理'
        case 1:
          return '退件'
        case 2:
          return '暂存仓库'
        case 3:
          return '坚持发货'
        case 4:
          return '等候补发'
        case 5:
          return '订单匹配完成'
        case 6:
          return '处理完成'
        case 50:
          return '通知提示'
      }
    },
    // 格式化仓库处理状态
    formatterStatus(row, column) {
      const shotStatus = row.status
      switch (shotStatus) {
        case 1:
          return '未处理'
        case 2:
          return '处理中'
        case 3:
          return '已处理'
      }
    },
    // 异常信息列表
    async getExceptionWarehouse() {
      this.isLoading = true
      const parmas = {}
      const startTiem = this.formatSearch(this.form.dateStat[0])
      const endTiem = this.formatSearch(this.form.dateStat[1])
      parmas.dateStat = `${startTiem}/${endTiem}`
      parmas.type = (this.form.type.filter(item => {
        return item !== 'all'
      })).join(',')
      parmas.wechatStatus = (this.form.wechatStatus.filter(item => {
        return item !== 'all'
      })).join(',')
      parmas.status = (this.form.status.filter(item => {
        return item !== 'all'
      })).join(',')
      parmas.packageCode = this.form.packageCode
      parmas.orderSn = this.form.orderSn
      const result = await this.$api.getExceptionWarehouse(parmas)
      console.log(result)
      if (result.data.code === 200) {
        this.tableData = result.data.data
      } else {
        this.$message.error(result.data.message)
      }
      this.isLoading = false
    },
    // 异常类型
    exceptionTypeOneChangeHandle(val) {
      // 当为全选时
      if (this.exceptionTypeOptionsOneAll) {
        this.exceptionTypeOptionsOneAll = false
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.type = val.filter(item => {
            return item !== 'all'
          })
        } else { // 不为全选时
          this.form.type = []
        }
      } else {
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.type = ['all']
          this.exceptionTypeOptionsOne.forEach(item => {
            this.form.type.push(item.value)
          })
          this.exceptionTypeOptionsOneAll = true
        } else {
          if (val.length === this.exceptionTypeOptionsOne.length) {
            this.form.type = ['all']
            this.exceptionTypeOptionsOne.forEach(item => {
              this.form.type.push(item.value)
            })
            this.exceptionTypeOptionsOneAll = true
          } else {
            this.form.type = val
          }
        }
      }
    },

    // 仓库处理状态：
    exceptionTypeTwoChangeHandle(val) {
      // 当为全选时
      if (this.exceptionTypeOptionsTwoAll) {
        this.exceptionTypeOptionsTwoAll = false
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.wechatStatus = val.filter(item => {
            return item !== 'all'
          })
        } else { // 不为全选时
          this.form.wechatStatus = []
        }
      } else {
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.wechatStatus = ['all']
          this.exceptionTypeOptionsTwo.forEach(item => {
            this.form.wechatStatus.push(item.value)
          })
          this.exceptionTypeOptionsTwoAll = true
        } else {
          if (val.length === this.exceptionTypeOptionsTwo.length) {
            this.form.wechatStatus = ['all']
            this.exceptionTypeOptionsTwo.forEach(item => {
              this.form.wechatStatus.push(item.value)
            })
            this.exceptionTypeOptionsTwoAll = true
          } else {
            this.form.wechatStatus = val
          }
        }
      }
    },

    // 仓库处理
    dealStatusChangeHandel(val) {
      // 当为全选时
      if (this.dealStatusAll) {
        this.dealStatusAll = false
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.status = val.filter(item => {
            return item !== 'all'
          })
        } else { // 不为全选时
          this.form.status = []
        }
      } else {
        if (val.indexOf('all') > -1) { // 当为全选时
          this.form.status = ['all']
          this.status.forEach(item => {
            this.form.status.push(item.value)
          })
          this.dealStatusAll = true
        } else {
          if (val.length === this.status.length) {
            this.form.status = ['all']
            this.status.forEach(item => {
              this.form.status.push(item.value)
            })
            this.dealStatusAll = true
          } else {
            this.form.status = val
          }
        }
      }
    }

  }
}
</script>

<style lang="less" scoped>
.CatchNoticeStoreExceptionInfo{
    padding: 16px;
    background: #fff;
}
//上面查询条件部分
.search{
    white-space: nowrap;
    overflow-y: auto;
    &>div{
        margin: 10px 0;
        &:first-child{
          margin-top: 0;
        }
    }
    .rowOne,.rowTwo{
      &>div{
        margin-right: 10px;
      }
    }
    .rowOne{
        display: flex;
        align-items: center;
        .exceptionType,.exceptionType,.exceptionType{
          /deep/.el-select{
            width: 200px;
            .el-select__tags{
              .el-tag{
                max-width: 100px;
              }
            }
          }
        }
        //创建时间和交易时间
        .creationTime{
          /deep/.el-date-editor {
            width: 208px;
            .el-range-separator{
              text-align: center;
              padding: 0px;
            }
          }
        }
    }
    .rowTwo{
        display: flex;
        align-items: center;
        // 物流单号和订单号
        .orderNumber,.orderNumber{
          .el-input{
              width: 120px;
          }
        }
    }
}
//表格部分
.el-table{
  margin-top: 10px;
}
</style>
