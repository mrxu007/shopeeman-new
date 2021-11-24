<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>仓库名称：</span>
          <el-select v-model="form.wherehouseName" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in wherehouseNameList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>订单出库状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>出库单创建时间：</span>
          <el-date-picker v-model="form.returnCreateTime" unlink-panels size="mini" type="datetimerange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" />
        </li>
      </ul>
      <ul>
        <li>
          <span>订单编号：</span>
          <el-input v-model="form.returnOrderNumber" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <span>平台物流单号：</span>
          <el-input v-model="form.returnLogisticsDocNum" clearable size="mini" oninput="value=value.replace(/\s+/g,'')" />
        </li>
        <li>
          <el-button type="primary" :disabled="Loading1" size="mini" @click="getoverseaslupplementlist">搜索</el-button>
        </li>
      </ul>
      <el-row id="article">
        <el-table
          ref="plTable"
          v-loading="Loading3"
          header-align="center"
          height="calc(100vh - 205px)"
          :data="tableData"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
          @selection-change="handleSelectionChange"
        >
          <el-table-column align="center" type="selection" width="50" />
          <el-table-column align="center" label="序号" width="70" prop="id" fixed />
          <el-table-column align="center" prop="wid" label="所属仓库" width="100" />
          <el-table-column align="center" prop="oversea_order_sn" label="订单编号" width="150" />
          <el-table-column prop="reissue_order_sn" label="补件订单编号" width="140" align="center" />
          <el-table-column prop="logistic_no" label="补件物流单号" width="160" align="center" />
          <el-table-column prop="logistic_type" label="补件物流类型" width="120" align="center" />
          <el-table-column prop="created_at" label="补件单创建时间" width="140" align="center" />
          <el-table-column prop="updated_at" label="补件单更新时间" width="140" align="center" />
          <el-table-column prop="status" label="状态" width="100" align="center" />
          <el-table-column label="补件商品详情" width="120" align="center">
            <template slot-scope="{row}">
              <el-button
                size="mini"
                type="primary"
                @click="
                  detailsVisible = true
                  getDetails(row)"
              >查看商品详情</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="sku_list.lastItem.sku_num" label="补件商品总数" width="100" align="center" />
          <el-table-column label="操作" width="140" align="center">
            <template slot-scope="{ row }">
              <el-button v-if="row.status===1" type="primary" size="mini" @click="del(row)">取消补件</el-button>
            </template>
          </el-table-column>
        </el-table>
        <el-dialog title="数据详情" :visible.sync="detailsVisible" width="80%">
          <el-table :data="detailsData">
            <el-table-column
              width="100"
              align="center"
              label="id"
              prop="id"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="补发订单Id"
              prop="reissue_order_id"
              fixed
            />
            <el-table-column
              width="150"
              align="center"
              label="星卓越系统产品编号"
              prop="sys_sku_id"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="SkuId"
              prop="sku_id"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="Sku数量"
              prop="sku_num"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="Sku名称"
              prop="sku_name"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="商品名称"
              prop="goods_name"
              fixed
            />
            <el-table-column
              width="100"
              align="center"
              label="状态"
              prop="status"
              fixed
            />
            <el-table-column
              width="150"
              align="center"
              label="删除时间"
              prop="deleted_at"
              fixed
            />
            <el-table-column
              width="150"
              align="center"
              label="创建时间"
              prop="created_at"
              fixed
            />
            <el-table-column
              width="150"
              align="center"
              label="更新时间"
              prop="updated_at"
              fixed
            />
          </el-table>
        </el-dialog>
        <div class="pagination">
          <el-pagination
            background
            :current-page.sync="currentPage"
            :page-size="pageSize"
            layout="total,sizes, prev, pager, next, jumper"
            :total="total"
            :page-sizes="[20, 50, 100, 200]"
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
          />
        </div>
      </el-row>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      Loading1: false,
      detailsData: [],
      Loading3: false,
      detailsVisible: false,
      currentPage: 1,
      tableData: [],
      total: 0,
      pageSize: 50,
      page: 1,
      form: {
        wherehouseName: 17, // 仓库名称
        returnStatus: 0, // 订单出库状态
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 出单创建时间
        returnOrderNumber: '', // 订单编号
        returnLogisticsDocNum: '' // 平台物流单号
      },
      returnStatusList: [
        { value: 1, label: '已下单' },
        { value: 2, label: '已确认' },
        { value: 3, label: '已出库' },
        { value: 4, label: '已取消' }
      ],
      wherehouseNameList: [
        { value: 17, label: '泰国存储仓' },
        { value: 27, label: '星卓越菲律宾存储仓' },
        { value: 28, label: '星卓越马来存储仓' },
        { value: 75, label: '超世代（越南仓海外仓）' },
        { value: 110, label: '锦汐越南海外仓' }
      ]
    }
  },
  mounted() {
    this.getoverseaslupplementlist()
  },
  methods: {
    // 查看商品详情
    getDetails(val) {
      this.detailsData = val.sku_list
    },
    // 取消补件功能
    async del(val) {
      this.$confirm('此操作将取消该补件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async() => {
        const { data } = await this.$api.cancelsupplement({
          id: val.id
        })
        if (data.message === 'success') {
          this.$message.success(`取消成功`)
        } else {
          this.$message.error(`取消失败${data.message}`)
        }
        this.getoverseaslupplementlist()
      })
    },
    // 搜索功能
    async getoverseaslupplementlist() {
      this.Loading1 = true
      this.Loading3 = true
      const returnCreateTime = this.form.returnCreateTime ? `${this.$dayjs(this.form.returnCreateTime[0]).format('YYYY-MM-DD HH:mm:ss')}/${this.$dayjs(this.form.returnCreateTime[1]).format('YYYY-MM-DD HH:mm:ss')}` : ''
      const parmas = {
        wid: this.form.wherehouseName, // 仓库id
        status: Number(this.form.returnStatus), // 订单出库状态
        createdTime: returnCreateTime, // 出单创建时间
        logisticNo: this.form.returnLogisticsDocNum, // 物流单号
        overseaOrderSn: this.form.returnOrderNumber // 出库订单号
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getlupplementlist(parmas)
        // console.log(data)
        // console.log(data.data.data.lastItem.sku_list.lastItem.sku_num)
        if (data.code === 200) {
          this.tableData = data.data.data
          console.log(this.tableData)
          this.total = data.data.total
        } else {
          this.$message.error(`数据获取失败${data.message}`)
        }
      } catch (error) {
        console.log(error)
      }
      this.Loading1 = false
      this.Loading3 = false
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getoverseaslupplementlist()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getoverseaslupplementlist()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>
<style lang="less" scoped>
@import '../../../module-less/smart-house-less/foreign-lupplement.less';
</style>
