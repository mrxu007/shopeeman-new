<template>
  <div class="refuse-sign">
    <div class="operating-box">
      <div class="form-item">
        <span class="title">采购物流单号：</span>
        <el-input
          v-model="trackingNumber"
          style="width: 180px;"
          clearable
          size="mini"
        />

        <el-button
          type="primary"
          size="mini"
          :loading="serchLoading"
          @click="serchData(1)"
        >搜索</el-button>
        <el-button
          type="primary"
          size="mini"
          @click="dialogVisible=true"
        >添加</el-button>
      </div>
    </div>
    <div class="table-box">
      <el-table
        v-loading="isLoading"
        height="calc(100vh - 150px)"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa'
        }"
        :cell-style="{ textAlign: 'center' }"
      >
        <el-table-column label="序号" align="center" width="50px">
          <template slot-scope="scope">{{ scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column label="采购物流单号" prop="value" min-width="140px">
          <template slot-scope="scope">
            <span>{{ scope.row.value }}
              <span
                class="copyIcon"
                @click="copy(scope.row.value)"
              ><i
                class="el-icon-document-copy"
              /></span></span>
          </template>
        </el-table-column>
        <el-table-column label="仓库名称" prop="warehouse_name" min-width="90px" />
        <el-table-column label="类别" prop="orderType" min-width="90px" />
        <el-table-column label="添加时间" prop="created_at" min-width="150px" />
        <el-table-column label="拒收时间" prop="appli_rejected_time" min-width="150px" />
        <el-table-column label="状态" prop="status" min-width="70px">
          <template slot-scope="scope">
            <div v-if="scope.row.status" class="btn-box">
              {{ statusText[scope.row.status] }}
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" min-width="80px">
          <template slot-scope="scope">
            <div class="btn-box">
              <el-button
                size="mini"
                type="primary"
                @click="cancelSign(scope.row.id)"
              >删除</el-button>
            </div>
          </template>
        </el-table-column>
      </el-table>
      <div class="page_to">
        <el-pagination
          style="display: inline-block;"
          background
          :current-page="page"
          :page-size="pageSize"
          layout="total,sizes, prev, pager, next, jumper"
          :total="total"
          :page-sizes="[20, 50, 100, 200]"
          @size-change="handleSizeChange"
          @current-change="newPage"
        />
      </div>
    </div>
    <el-dialog
      title="添加签收管理信息"
      :visible.sync="dialogVisible"
      width="360px"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @closed="trackingNumberAdd=''"
    >
      <p style="font-size: 14px;padding: 0px 14px 0 31px"><span style="color: red">*</span>申请类别：   <el-select
        v-model="chooseType"
        size="mini"
        style="width: 180px;"
      >
        <el-option
          v-for="item in typeList"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select></p>
      <p style="font-size: 14px;padding: 12px 14px 0 60px"><span style="color: red">*</span>仓库：<el-select
        v-model="warehouseUserId"
        size="mini"
        style="width: 180px;"
      >
        <el-option
          v-for="item in warehouseUserList"
          :key="item.value"
          :label="item.warehouse_name"
          :value="item.id"
        />
      </el-select></p>

      <p style="font-size: 14px;padding: 12px 14px 0 4px"><span style="color: red">*</span>采购物流单号： <el-input
        v-model="trackingNumberAdd"
        style="width: 180px;"
        clearable
        size="mini"
      /></p>
      <span slot="footer" style="text-align: center;display: block;margin:-10px 0 10px" class="dialog-footer">
        <el-button
          size="mini"
          @click="dialogVisible = false"
        >取 消</el-button>
        <el-button
          :loading="addLoding"
          size="mini"
          type="primary"
          style="margin-left:20px"
          @click="packageSign"
        >确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { getValue, creatDate } from '../../../util/util'

export default {
  data() {
    return {
      addLoding: false,
      warehouseUserList: [],
      warehouseUserId: '', // 仓库id
      serchLoading: false,
      trackingNumber: '', // 采购物流单号
      tableData: [],
      isLoading: false,
      createdAt: [],
      typeList: [ // 添加类别列表
        {
          label: '申请拒签',
          value: 1
        },
        {
          label: '申请签收',
          value: 2
        }
      ],
      Type: 0,
      chooseType: 1, // 选择添加类型
      trackingNumberAdd: '', // 采购物流单号添加
      statusText: ['', '未到货', '已拒收', '已签收'],
      pageSize: 20,
      page: 1,
      total: 0,
      dialogVisible: false,
      pickerOptions: {
        disabledDate: time => {
          return time.getTime() > Date.now()
        }
      }
    }
  },
  mounted() {
    this.createdAt = creatDate(30)
    this.serchData()
    this.getUserWarehouse()// 获取仓库信息
    // this.getstory()
  },
  methods: {
    async getUserWarehouse() {
      const res = await this.$api.getUserWarehouse()
      this.warehouseUserList
      if (res.data.code === 200) {
        this.warehouseUserList = res.data.data.filter(item => {
          return item.isUser === 0
        })
        this.warehouseUserId = this.warehouseUserList[0].id
        console.log('warehouseUserList', res.data.data)
      } else {
        this.$message.error('获取仓库数据失败')
      }
    },
    // 翻页
    newPage(val) {
      this.page = val
      this.serchData(val)
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.page = 1
      this.serchData()
    },
    // 查询拒签列表数据
    async serchData(page) {
      this.serchLoading = true
      this.tableData = []
      this.isLoading = true
      const params = {
        pages: page || 1,
        pageSize: this.pageSize,
        trackingNumber: this.trackingNumber
      }
      if (this.createdAt && this.createdAt.length) {
        params.createdAt = this.setDateFmt(this.createdAt).join('/')
      }
      try {
        const { data } = await this.$api.refuseList({ params })
        console.log(data)
        if (data.code === 200) {
          const list = data.data || []
          for (let i = 0; i < list.length; i++) {
            const item = list[i]
            item.orderType = getValue(this.typeList, 'label', 'value', item.type)
          }
          this.total = data.data.total
          this.tableData = list
          console.log('tableData', this.tableData)
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
        this.isLoading = false
        this.serchLoading = false
      } catch (err) {
        console.log(err)
        this.isLoading = false
        this.serchLoading = false
      }
    },
    // 添加拒签
    async packageSign() {
      if (!this.trackingNumberAdd) {
        return this.$message('请填写物流单号')
      }
      this.addLoding = true
      const query = {
        trackingNumber: this.trackingNumberAdd,
        type: this.chooseType,
        warehouseUserId: this.warehouseUserId
      }
      try {
        const { data } = await this.$api.packageSign(query)
        console.log(data, '---')
        if (data.code === 200) {
          this.dialogVisible = false
          this.serchData()
          this.$message({
            type: 'success',
            message: '添加成功'
          })
        } else {
          this.$message({
            type: 'error',
            message: data.message
          })
        }
      } catch (err) {
        console.log(err)
        // this.$message.error('添加失败')
      }
      this.addLoding = false
    },
    // 取消拒收 删除
    async cancelSign(ids) {
      this.$confirm('数据无法恢复，确定删除吗, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        this.isLoading = true
        const query = {
          ids
        }
        try {
          const { data } = await this.$api.cancelSign(query)
          if (data.code === 200) {
            this.serchData()

            this.$message({
              type: 'success',
              message: '删除成功'
            })
          } else {
            this.$message({
              type: 'error',
              message: data.message
            })
          }
          this.isLoading = false
          this.serchData()
        } catch (err) {
          console.log(err)
          this.isLoading = false
          this.serchData()
        // this.$message.error('删除失败')
        }
      })
    },
    // 日期选择器时间处理
    setDateFmt(data) {
      data[0] = data[0].length > 15 ? data[0] : data[0] + ' 00:00:00'
      data[1] = data[1].length > 15 ? data[1] : data[1] + ' 23:59:59'
      return data
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
        this.$message({
          type: 'success',
          message: '复制成功'
        })
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    }
  }
}
</script>

<style lang="less" scoped>

.refuse-sign {
    .copyIcon {
    color: var(--themeColor);
    margin-left: 1px;
    font-size: 16px;
    cursor: pointer;
  }
  .operating-box {

    padding: 15px;
    border-radius: 10px;
    background: #fff;

    .form-item {
      display: flex;
      align-items: center;
      width: 450px;
      .title {
        text-align: right;
      }

      .el-input, .el-select {
        width: 200px;
      }

      .el-button {
        margin-left: 10px;
      }

      .ml-10 {
        margin-left: 10px;
      }
    }
  }

  .table-box {
    margin-top: 10px;
    padding: 15px;
    border-radius: 10px;
    background: #fff;

    .btn-box {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 40px;
    }
  }
      .page_to{
      text-align: right;
      padding: 10px 0 0;
    }
}

</style>
