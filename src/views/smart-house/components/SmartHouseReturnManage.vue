<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px;margin-left:25px">
        <li>
          <span>退件状态：</span>
          <el-select
              v-model="form.returnStatus"
              placeholder=""
              size="mini"
              filterable
          >
            <el-option
                label="全部"
                :value="0"
            />
            <el-option
                v-for="(item, index) in returnStatusList"
                :key="index"
                :label="item.label"
                :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>申请退件时间：</span>
          <el-date-picker
              v-model="form.applyReturnTime"
              unlink-panels
              size="mini"
              type="daterange"
              :picker-options="pickerOptions"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </li>
        <li>
          <span>包裹物流编号：</span>
          <el-input
              v-model="form.logisticsNum"
              clearable
              size="mini"
              oninput="value=value.replace(/\s/g,'')"
          />
        </li>
      </ul>
      <ul style="margin-left:25px">
        <li>
          <span>订单编号：</span>
          <el-input
              v-model="form.orderNum"
              clearable
              size="mini"
              oninput="value=value.replace(/\s/g,'')"
          />
        </li>
        <li>
          <span style="text-align: right;width: 84px;">退件时间：</span>
          <el-date-picker
              v-model="form.returnTime"
              unlink-panels
              size="mini"
              type="daterange"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
          />
        </li>

        <li>
          <span>退件物流单号：</span>
          <el-input
              v-model="form.returnLogisticsNum"
              clearable
              size="mini"
              oninput="value=value.replace(/\s/g,'')"
          />
        </li>
      </ul>
      <ul style="margin-top:10px">
        <li>
          <span>退件人手机号：</span>
          <el-input
              v-model="form.returnPhone"
              clearable
              size="mini"
              oninput="value=value.replace(/\s/g,'')"
          />
        </li>
        <li>
          <el-button
              type="primary"
              :disabled="cancelLoading"
              size="mini"
              @click="
              page=1
              getReturnManage()"
          >查询
          </el-button>
          <el-button
              type="primary"
              size="mini"
              :loading="cancelLoading"
              @click="cancelReturn(multipleSelection,2)"
          >批量取消退件
          </el-button>
          <el-button
              type="primary"
              size="mini"
              :loading="cancelLoading"
              @click="exportMall"
          >导出
          </el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
          ref="plTable"
          v-loading="isShowLoading"
          height="calc(100vh - 239px)"
          :data="tableData"
          :row-style="{height:'45px'}"
          :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
          @selection-change="handleSelectionChange"
      >
        <el-table-column
            align="center"
            type="selection"
            width="50"
        />
        <el-table-column
            align="center"
            type="index"
            label="序号"
            min-width="50px"
            fixed
        />
        <el-table-column
            align="center"
            prop="need_return_package_code"
            label="包裹物流单号"
            min-width="180px"
            fixed>
          <template slot-scope="{ row }">
            <span>
              {{ row.need_return_package_code }}
              <span v-if="row.need_return_package_code" class="copyIcon"
                  @click="copy(row.need_return_package_code)">
                <i class="el-icon-document-copy"/></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="order_sn" label="订单编号" min-width="180px">
          <template slot-scope="{ row }">
            <span>
              {{ row.order_sn }}
              <span
                  v-if="row.order_sn"
                  class="copyIcon"
                  @click="copy(row.order_sn)"
              >
                <i class="el-icon-document-copy"/></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="warehouse_name"
            label="签收仓库"
            min-width="130px"
        />
        <el-table-column
            align="center"
            prop="status"
            label="状态"
            min-width="80px"
        >
          <template slot-scope="{ row }">
            {{ statusObj[row.status] ? statusObj[row.status] : '' }}
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="appli_return_time"
            label="申请退件时间"
            min-width="150px"
        />
        <el-table-column
            align="center"
            prop="return_contact"
            label="退件人"
            min-width="100px"
            show-overflow-tooltip
        />
        <el-table-column
            align="center"
            prop="return_phone_number"
            label="退件电话"
            min-width="120px"
            show-overflow-tooltip>
          <template slot-scope="{ row }">
            <span>
              {{ row.return_phone_number }}
              <span v-if="row.return_phone_number"
                  class="copyIcon"
                  @click="copy(row.return_phone_number)">
                <i class="el-icon-document-copy"/>
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column align="center"
            prop="return_address"
            label="退件地址"
            min-width="180px"
            show-overflow-tooltip/>
        <el-table-column
            align="center"
            prop="return_remarks"
            label="退件备注"
            min-width="150px"
            show-overflow-tooltip
        />
        <el-table-column
            align="center"
            prop="return_shipping_number"
            label="退件物流单号"
            min-width="180px"
            show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.return_shipping_number }}
              <span
                  v-if="row.return_shipping_number"
                  class="copyIcon"
                  @click="copy(row.return_shipping_number)"
              >
                <i class="el-icon-document-copy"/>
              </span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
            align="center"
            prop="return_shipping_name"
            label="退件物流公司"
            min-width="150px"
            show-overflow-tooltip
        />
        <el-table-column
            align="center"
            prop="return_time"
            label="退件时间"
            min-width="150px"
        />
        <el-table-column
            align="center"
            prop="warehouse_remarks"
            label="仓库备注"
            min-width="150px"
            show-overflow-tooltip
        />
        <el-table-column
            align="center"
            min-width="120px"
            label="操作"
            fixed="right"
        >
          <template slot-scope="{ row }">
            <el-button
                v-if="row.status != 4 && row.status != 2 && row.status != 3"
                type="primary"
                size="mini"
                @click="cancelReturn(row,1)"
            >取消退件
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
            background
            :current-page="page"
            :page-sizes="[100,200]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
        />
      </div>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear/>
    </div>
  </el-row>
</template>

<script>
import { importOrder } from '@/util/util'

export default {
  data() {
    return {
      pickerOptions: {
        disabledDate: (time) => {
          const pastDay = Date.now() - 93 * 3600 * 24 * 1000
          return time.getTime() > Date.now() || time.getTime() < pastDay
        }
      },
      cancelLoading: false,
      showConsole: true,
      form: {
        returnTime: '', // 退件时间
        applyReturnTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 申请退件时间
        returnStatus: 0, // 退件状态
        orderNum: '', // 订单编号
        logisticsNum: '', // 包裹物流编号
        returnLogisticsNum: '', // 退件物流单号
        returnPhone: '' // 退件人手机号
      },
      total: 0,
      pageSize: 100,
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
      isShowLoading: false,
      statusObj: {
        1: '退件中',
        2: '已退件',
        3: '退件失败',
        4: '取消退件',
        5: '仓库驳回'
      }
    }
  },
  mounted() {
    this.getReturnManage()
  },
  methods: {
    // 取消/批量取消
    async cancelReturn(val, type) {
      this.packageCodes = []
      if (type === 1) {
        this.packageCodes.push(val.need_return_package_code)
      } else {
        if (!val.length) return this.$message('请选择需要取消退件的包裹')
        this.cancelLoading = true
        val.map((item) => {
          this.packageCodes.push(item.need_return_package_code)
        })
      }
      this.showConsole = false
      this.$refs.Logs.writeLog(`开始取消退件...`, true)
      console.log('packageCodes', this.packageCodes)
      const res = await this.$api.cancelReturn({ packageCodes: this.packageCodes })
      if (res.data.code === 200) {
        this.getReturnManage()
        this.$refs.Logs.writeLog(`取消退件成功`, true)
      } else {
        res.data.data.forEach((item) => {
          // this.$refs.Logs.writeLog(`【${item.split('：')[0]}】${item.split('：')[1]}`, false)
          this.$refs.Logs.writeLog(`${item}`, false)
        })
        console.log(res.data.data)
      }
      this.cancelLoading = false
    },
    // 获取退件信息
    async getReturnManage() {
      this.isShowLoading = true
      const returnTime = this.form.returnTime ? `${this.$dayjs(this.form.returnTime[0]).format('YYYY-MM-DD 00:00:00')}/${this.$dayjs(this.form.returnTime[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const applyReturnTime = this.form.applyReturnTime
          ? `${this.$dayjs(this.form.applyReturnTime[0]).format('YYYY-MM-DD 00:00:00')}/${this.$dayjs(this.form.applyReturnTime[1]).format('YYYY-MM-DD 23:59:59')}`
          : ''
      const parmas = {
        packageCode: this.form.logisticsNum,
        orderSn: this.form.orderNum,
        status: Number(this.form.returnStatus),
        returnShippingNumber: this.form.returnLogisticsNum,
        returnPhoneNumber: this.form.returnPhone,
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
        } else {
          this.$message.error('数据获取失败', data.message)
        }
      } catch (error) {
        console.log(`${error}`)
      }
      this.isShowLoading = false
      console.log('tableData', this.tableData)
    },
    //导出
    async exportMall() {
      if (this.multipleSelection.length) {
        const titleData = ['包裹物流单号', '订单编号', '签收仓库', '状态', '申请退件时间', '退件人', '退件电话', '退件地址', '退件备注', '退件物流单号', '退件物流公司', '退件时间', '仓库备注']
        const jsonData = []
        this.multipleSelection.forEach(row => {
          const temp = []
          temp[0] = row.need_return_package_code || ''
          temp[1] = row.order_sn || ''
          temp[2] = row.warehouse_name || ''
          temp[3] = this.statusObj[row.status] || ''
          temp[4] = row.appli_return_time || ''
          temp[5] = row.return_contact || ''
          temp[6] = row.return_phone_number || ''
          temp[7] = row.return_address || ''
          temp[8] = row.return_remarks || ''
          temp[9] = row.return_shipping_number || ''
          temp[10] = row.return_shipping_name || ''
          temp[11] = row.return_time || ''
          temp[12] = row.warehouse_remarks || ''
          jsonData.push(temp)
        })
        await importOrder(titleData, jsonData, '退件列表')
      } else {
        this.$message.error('请选择需要退件的列表')
      }
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
