<!--签收包裹异常-->
<template>
  <div class="CatchNoticeSignForPackage">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 签收时间 -->
        <div class="signingTime">
          签收时间：<el-date-picker
            v-model="form.packageTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </div>
        <!-- 采购物流单号 -->
        <div class="logisticsNumber">
          采购物流单号：
          <el-input v-model="form.packageCode" size="mini" />
        </div>
        <el-button size="mini" type="primary" @click="searchHandle">搜索</el-button>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：包裹已签收，但是匹配不到订单，仓库无法发货，需及时匹配订单，此界面只显示近7天的数据包裹异常数据
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        操作指引：请在此界面手动标记订单号或者在【订单列表】右键【同步此订单】获取订单信息
      </div>
    </div>
    <el-table
      :header-cell-style="{background:'#f5f7fa'}"
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100vh - 160px)"
    >
      <el-table-column
        type="index"
        label="序列号"
        width="80"
      />
      <el-table-column
        label="仓库"
        prop="warehouse_name"
      />
      <el-table-column
        prop="package_time"
        label="签收时间"
      />
      <el-table-column
        label="包裹图片"
      >
        <template slot-scope="scope">
          <el-image
            style="width: 40px; height: 40px"
            :src="scope.row.package_image"
            :preview-src-list="[scope.row.package_image]"
          />
        </template>
      </el-table-column>
      <el-table-column
        prop="package_code"
        label="采购物流单号"
      />
      <el-table-column
        label="操作"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="markMyOrderHandle(scope.row)">标记为我的订单</el-button>
          <el-button size="mini" type="primary" @click="applyReturnPartsHandle(scope.row)">申请退件</el-button>
        </template>
      </el-table-column>
    </el-table>
    <!--标记为我的订单dialog-->
    <el-dialog title="标记为我的订单" :visible.sync="markMyOrderDialogFormVisible" width="500px">
      <span style="color:red">温馨提示：请填写子订单号</span>
      <el-form :model="markMyOrderDialogForm">
        <el-form-item label="订单编号:" label-width="80px">
          <el-input v-model="markMyOrderDialogForm.orderSn" autocomplete="off" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="markMyOrderDialogHandle">确 定</el-button>
      </div>
    </el-dialog>

    <!--申请退件dialog-->
    <el-dialog title="标记为我的订单" :visible.sync="applyDialogFormVisible" width="500px">
      <span style="color:red">温馨提示：请填写子订单号</span>
      <el-form :model="applyDialogForm">
        <el-form-item label="收件人:" label-width="80px">
          <el-input v-model="applyDialogForm.returnContact" />
        </el-form-item>
        <el-form-item label="联系电话:" label-width="80px">
          <el-input v-model="applyDialogForm.returnPhoneNumber" />
        </el-form-item>
        <el-form-item label="退件地区:" label-width="80px"><el-cascader
          v-model="applyDialogForm.applyRegion"
          :options="options"
        />
        </el-form-item>
        <el-form-item label="详细地址:" label-width="80px">
          <el-input v-model="applyDialogForm.applyAddress" />
        </el-form-item>
        <el-form-item label="退件备注:" label-width="80px">
          <el-input v-model="applyDialogForm.returnRemarks" type="textarea" resize="none" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="applyDialogHandle">保存</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      options: [{
        value: 'zhinan',
        label: '指南',
        children: [{
          value: 'shejiyuanze',
          label: '设计原则',
          children: [{
            value: 'yizhi',
            label: '一致'
          }, {
            value: 'fankui',
            label: '反馈'
          }, {
            value: 'xiaolv',
            label: '效率'
          }, {
            value: 'kekong',
            label: '可控'
          }]
        }, {
          value: 'daohang',
          label: '导航',
          children: [{
            value: 'cexiangdaohang',
            label: '侧向导航'
          }, {
            value: 'dingbudaohang',
            label: '顶部导航'
          }]
        }]
      }, {
        value: 'zujian',
        label: '组件',
        children: [{
          value: 'basic',
          label: 'Basic',
          children: [{
            value: 'layout',
            label: 'Layout 布局'
          }, {
            value: 'color',
            label: 'Color 色彩'
          }, {
            value: 'typography',
            label: 'Typography 字体'
          }, {
            value: 'icon',
            label: 'Icon 图标'
          }, {
            value: 'button',
            label: 'Button 按钮'
          }]
        }, {
          value: 'form',
          label: 'Form',
          children: [{
            value: 'radio',
            label: 'Radio 单选框'
          }, {
            value: 'checkbox',
            label: 'Checkbox 多选框'
          }, {
            value: 'input',
            label: 'Input 输入框'
          }, {
            value: 'input-number',
            label: 'InputNumber 计数器'
          }, {
            value: 'select',
            label: 'Select 选择器'
          }, {
            value: 'cascader',
            label: 'Cascader 级联选择器'
          }, {
            value: 'switch',
            label: 'Switch 开关'
          }, {
            value: 'slider',
            label: 'Slider 滑块'
          }, {
            value: 'time-picker',
            label: 'TimePicker 时间选择器'
          }, {
            value: 'date-picker',
            label: 'DatePicker 日期选择器'
          }, {
            value: 'datetime-picker',
            label: 'DateTimePicker 日期时间选择器'
          }, {
            value: 'upload',
            label: 'Upload 上传'
          }, {
            value: 'rate',
            label: 'Rate 评分'
          }, {
            value: 'form',
            label: 'Form 表单'
          }]
        }, {
          value: 'data',
          label: 'Data',
          children: [{
            value: 'table',
            label: 'Table 表格'
          }, {
            value: 'tag',
            label: 'Tag 标签'
          }, {
            value: 'progress',
            label: 'Progress 进度条'
          }, {
            value: 'tree',
            label: 'Tree 树形控件'
          }, {
            value: 'pagination',
            label: 'Pagination 分页'
          }, {
            value: 'badge',
            label: 'Badge 标记'
          }]
        }, {
          value: 'notice',
          label: 'Notice',
          children: [{
            value: 'alert',
            label: 'Alert 警告'
          }, {
            value: 'loading',
            label: 'Loading 加载'
          }, {
            value: 'message',
            label: 'Message 消息提示'
          }, {
            value: 'message-box',
            label: 'MessageBox 弹框'
          }, {
            value: 'notification',
            label: 'Notification 通知'
          }]
        }, {
          value: 'navigation',
          label: 'Navigation',
          children: [{
            value: 'menu',
            label: 'NavMenu 导航菜单'
          }, {
            value: 'tabs',
            label: 'Tabs 标签页'
          }, {
            value: 'breadcrumb',
            label: 'Breadcrumb 面包屑'
          }, {
            value: 'dropdown',
            label: 'Dropdown 下拉菜单'
          }, {
            value: 'steps',
            label: 'Steps 步骤条'
          }]
        }, {
          value: 'others',
          label: 'Others',
          children: [{
            value: 'dialog',
            label: 'Dialog 对话框'
          }, {
            value: 'tooltip',
            label: 'Tooltip 文字提示'
          }, {
            value: 'popover',
            label: 'Popover 弹出框'
          }, {
            value: 'card',
            label: 'Card 卡片'
          }, {
            value: 'carousel',
            label: 'Carousel 走马灯'
          }, {
            value: 'collapse',
            label: 'Collapse 折叠面板'
          }]
        }]
      }, {
        value: 'ziyuan',
        label: '资源',
        children: [{
          value: 'axure',
          label: 'Axure Components'
        }, {
          value: 'sketch',
          label: 'Sketch Templates'
        }, {
          value: 'jiaohu',
          label: '组件交互文档'
        }]
      }],
      //   搜索条件
      form: {
        packageCode: '', // 创建时间
        packageTime: '' // 交易状态
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
      applyDialogForm: {
        lists: {
          gpcId: 0,
          packageCode: ''
        },
        applyRegion: [],
        applyAddress: '',
        returnContact: '',
        returnPhoneNumber: '',
        returnAddress: '',
        returnRemarks: ''
      },
      // 表格数据
      tableData: [
      ]
    }
  },
  mounted() {
    this.getExceptionNoOrderIndex()
  },
  methods: {
    // 搜索按钮
    async searchHandle() {
      if (this.form.packageTime) {
        const startTiem = this.formatSearch(this.form.packageTime[0])
        const endTiem = this.formatSearch(this.form.packageTime[1])
        this.form.packageTime = `${startTiem}/${endTiem}`
      }
      const result = await this.$api.getExceptionNoOrderIndex(this.form)
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
      } else {
        this.$message.error(result.data.message)
      }
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
      } else {
        this.$message.error(result.data.message)
      }
    },
    // 申请退件dialog确定
    async applyDialogHandle() {
      if (!this.applyDialogForm.applyRegion || this.applyDialogForm.applyRegion.length === 0) {
        this.$message.error('退件地区不能为空')
        return
      } else if (!this.applyDialogForm.applyAddress.trim()) {
        this.$message.error('退件详细地址不能为空')
        return
      }

      this.applyDialogForm.applyRegion = this.applyDialogForm.applyRegion.join('/')
      this.applyDialogForm.returnAddress = `${this.applyDialogForm.applyRegion} ${this.applyDialogForm.applyAddress}`
      // const result = await this.$api.apply(this.applyDialogForm)
      // console.log(result)
      // if (result.data.code === 200) {
      //   this.applyDialogFormVisible = false
      //   this.$message({
      //     message: '申请退件成功',
      //     type: 'success'
      //   })
      // } else {
      //   this.$message.error(result.data.message)
      // }
    },
    // 申请退件
    applyReturnPartsHandle(row) {
      this.applyDialogForm = {
        lists: {
          gpcId: 0,
          packageCode: ''
        },
        applyRegion: [],
        applyAddress: '',
        returnContact: '',
        returnPhoneNumber: '',
        returnAddress: '',
        returnRemarks: ''
      }
      this.applyDialogForm.lists.packageCode = row.package_code
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
    },
    // 获取签收包裹异常列表
    async getExceptionNoOrderIndex() {
      const result = await this.$api.getExceptionNoOrderIndex()
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
      } else {
        this.$message.error(result.data.message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeSignForPackage{
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
    .rowOne{
        display: flex;
        align-items: center;
        //签收时间
        .signingTime{
            /deep/.el-date-editor{
                width: 198px;
            }
        }
        //采购物流单号
        .logisticsNumber{
          margin: 0 10px;
            .el-input{
                width: 80px;
            }
        }
    }
    .rowThree{
      color: red;
    }
}
//表格部分
.el-table{
  margin-top: 10px;
}
/deep/.el-dialog{
  .el-dialog__header{
    text-align: left;
  }
  .el-dialog__body{
    padding-bottom: 0px;
    padding-top: 10px;
    .el-form{
      margin-top: 10px;
      .el-form-item{
        .el-form-item__label{
          text-align: left;
        }
        margin-bottom: 10px;
      }
    }
  }
}
</style>
