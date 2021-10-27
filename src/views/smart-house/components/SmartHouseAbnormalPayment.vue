<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>赔付状态：</span>
          <el-select
            v-model="form.status"
            placeholder=""
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>赔付类型：</span>
          <el-select
            v-model="form.type"
            placeholder=""
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="(item, index) in typeList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>赔付原因：</span>
          <el-select
            v-model="form.typeCause"
            placeholder=""
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="0"
            />
            <el-option
              v-for="(item, index) in typeCauseList"
              :key="index"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>申请赔付时间：</span>
          <el-date-picker
            v-model="form.createAt"
            unlink-panels
            type="datetimerange"
            :picker-options="pickerOptions"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </li>
      </ul>
      <ul>
        <li>
          <span>订单编号：</span>
          <el-input
            v-model="form.orderSn"
            clearable
            size="mini"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="getAbnormalPayment"
          >查询</el-button>
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
        <el-table-column
          align="center"
          type="index"
          label="序号"
          min-width="50"
        />
        <el-table-column
          prop="warehouse_name"
          label="所属仓库"
          min-width="150"
        />
        <el-table-column
          prop="order_sn"
          label="订单编号"
          min-width="180"
        >
          <template slot-scope="{ row }">
            <span>
              {{ row.order_sn }}
              <span
                v-if="row.order_sn"
                class="copyIcon"
                @click="copy(row.order_sn)"
              >
                <i class="el-icon-document-copy" /></span>
            </span>
          </template>
        </el-table-column>
        <el-table-column
          prop="created_at"
          label="申请赔付时间"
          min-width="160"
        />
        <el-table-column
          prop="money"
          label="申请赔付金额"
          min-width="110"
        />
        <el-table-column
          prop="amount"
          label="实际赔付金融"
          min-width="120"
        />
        <el-table-column
          prop="status"
          label="状态"
          min-width="80"
        >
          <template slot-scope="{ row }">
            <span
              v-if="row.status=== '审核通过'"
              style="color:#00bfa5;"
            >
              {{ row.status }}
            </span>
            <span v-else>{{ row.status }}</span>
          </template>
        </el-table-column>
        <el-table-column
          prop="images"
          label="图片凭证"
          min-width="180"
          align="center"
        >
          <template slot-scope="{row}">
            <div
              v-for="(item,index) in row.images"
              :key="index"
            >
              <el-tooltip
                effect="light"
                placement="right-end"
                :visible-arrow="false"
                :enterable="false"
                style="width: 50px; height: 50px"
              >
                <div slot="content">
                  <img
                    :src="item"
                    width="300px"
                    height="300px"
                  >
                </div>
                <el-image
                  style="width: 40px; height: 40px"
                  :src="item"
                />
              </el-tooltip>
            </div>
          </template>
        </el-table-column>
        <el-table-column
          prop="type"
          label="赔付类型"
          min-width="120"
        />
        <el-table-column
          prop="type_cause"
          label="赔付原因"
          min-width="180"
        />
        <el-table-column
          prop="updated_at"
          label="更新时间"
          min-width="160"
        />
        <el-table-column
          prop="remark"
          label="用户备注"
          min-width="110"
        />
        <el-table-column
          prop="check_remark"
          label="审核备注"
          min-width="100"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="page"
          :page-sizes="[50, 100, 200]"
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
      isShowLoading: false,
      form: {
        status: 0, // 赔付状态
        createAt: [new Date().getTime() - 3600 * 1000 * 24 * 15, new Date()], // 申请赔付时间
        type: 0, // 赔付类型
        typeCause: 0, // 赔付原因
        orderSn: '', // 包裹物流编号
        returnLogisticsNum: '', // 退件物流单号
        returnPhone: '' // 退件人手机号
      },
      statusList: [
        { value: 1, label: '待审核' },
        { value: 2, label: '审核通过' },
        { value: 3, label: '审核失败' }
      ],
      typeList: [
        { value: 1, label: '赔付运费' },
        { value: 2, label: '赔付采购价' },
        { value: 4, label: '赔付采购价+运费' }
      ],
      typeCauseList: [
        { value: 1, label: '仓库丢件' },
        { value: 2, label: '仓库漏发' },
        { value: 3, label: '超材出库' },
        { value: 4, label: '买家收货不符' },
        { value: 5, label: '包裹到齐48小时未出库' },
        { value: 6, label: '已出库，虾皮仓未发货致订单取消' }
      ],
      total: 0,
      pageSize: 50,
      page: 1,
      tableData: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick(picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },
  mounted() {
    this.getAbnormalPayment()
  },
  methods: {
    // 获取退件信息
    async getAbnormalPayment() {
      this.isShowLoading = true
      const parmas = JSON.parse(JSON.stringify(this.form))
      parmas.createAt = parmas.createAt ? `${this.$dayjs(parmas.createAt[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(parmas.createAt[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      try {
        const { data } = await this.$api.getAbnormalPayment(parmas)
        if (data.code === 200) {
          this.tableData = data.data.data
          this.tableData.map(item => {
            item.images = item.images.map(imgItem => {
              imgItem = imgItem.replace('[', '').replace(']', '').replace('"', '').replace('"', '').trim()
              return imgItem
            })
          })
          this.total = data.data.total
        } else {
          this.$message.error('数据获取失败', data.message)
        }
      } catch (error) {
        console.log(error)
      }
      console.log('tableData', this.tableData)
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
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getAbnormalPayment()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getAbnormalPayment()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/abnormal-payment.less';
</style>
