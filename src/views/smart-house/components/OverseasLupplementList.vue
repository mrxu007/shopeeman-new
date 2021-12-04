<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>仓库名称：</span>
          <el-select v-model="form.wherehouseName" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in wherehouseNameList" :key="index" :label="item.warehouse_name" :value="item.id" />
          </el-select>
        </li>
        <li class="status">
          <span>订单出库状态：</span>
          <el-select v-model="form.returnStatus" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in returnStatusList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </li>
        <li>
          <span>出库单创建时间：</span>
          <el-date-picker v-model="form.returnCreateTime" unlink-panels size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
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
    </el-row>
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
        <el-table-column
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column align="center" prop="warehouse_name" label="所属仓库" min-width="160" show-overflow-tooltip />
        <el-table-column align="center" prop="oversea_order_sn" label="订单编号" min-width="150" show-overflow-tooltip />
        <el-table-column prop="reissue_order_sn" label="补件订单编号" min-width="140" align="center" show-overflow-tooltip />
        <el-table-column prop="logistic_no" label="补件物流单号" min-width="160" align="center" show-overflow-tooltip />
        <el-table-column prop="logistic_name" label="补件物流名称" min-width="120" align="center" show-overflow-tooltip />
        <el-table-column prop="created_at" label="补件单创建时间" min-width="140" align="center" />
        <el-table-column prop="updated_at" label="补件单更新时间" min-width="140" align="center" />
        <el-table-column prop="status" label="状态" min-width="100" align="center">
          <template v-slot="{row}">
            {{ row.status?statusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column label="补件商品详情" min-width="130" align="center">
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
        <el-table-column prop="goods_num" label="补件商品总数" width="100" align="center" />
        <el-table-column
          label="操作"
          width="100"
          align="center"
        >
          <template slot-scope="{ row }">
            <el-button v-if="row.status===1" type="primary" size="mini" @click="del(row)">取消补件</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog
        title="退件商品详情"
        :visible.sync="detailsVisible"
        :close-on-click-modal="false"
        :close-on-press-escape="false"
        width="800px"
      >
        <el-table
          :data="detailsData"
          height="450"
          :header-cell-style="{
            backgroundColor: '#f5f7fa',
          }"
          :row-style="{
            color: 'black',
            height: '50px',
          }"
        >
          <el-table-column
            align="center"
            type="index"
            label="序号"
            fixed
          />
          <el-table-column
            min-width="150"
            align="center"
            label="订单编号"
            show-overflow-tooltip
            fixed
          >
            <template>
              {{ overseaOrderSn }}
            </template>
          </el-table-column>
          <el-table-column
            prop="status"
            label="状态"
            min-width="100"
            align="center"
          >
            <template v-slot="{row}">
              {{ row.status?statusObj[row.status]:'' }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="150"
            align="center"
            label="系统商品编号(SysSKU)"
            prop="sys_sku_id"
          />
          <el-table-column
            min-width="120"
            align="center"
            label="商品编号(SKU)"
            prop="sku_id"
          />
          <el-table-column
            min-width="100"
            align="center"
            label="商品名称"
            prop="goods_name"
            show-overflow-tooltip
          />
          <el-table-column
            min-width="100"
            align="center"
            label="数量"
            prop="sku_num"
          />
          <el-table-column
            min-width="100"
            align="center"
            label="商品规格"
            show-overflow-tooltip
            prop="sku_name"
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
          :page-sizes="[50, 100, 200]"
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
      Loading1: false,
      detailsData: [],
      Loading3: false,
      detailsVisible: false,
      currentPage: 1,
      tableData: [],
      overseaOrderSn: '',
      total: 0,
      pageSize: 50,
      page: 1,
      form: {
        wherehouseName: 0, // 仓库名称
        returnStatus: 0, // 订单出库状态
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 15, new Date()], // 出单创建时间
        returnOrderNumber: '', // 订单编号
        returnLogisticsDocNum: '' // 平台物流单号
      },
      returnStatusList: [
        { value: 1, label: '已下单' },
        { value: 2, label: '已确认' },
        { value: 3, label: '已出库' },
        { value: 4, label: '已取消' }
      ],
      wherehouseNameList: [],
      statusObj: {
        1: '已下单',
        2: '已确认',
        3: '已出库',
        4: '已取消'
      }
    }
  },
  async mounted() {
    // 获取仓库
    await this.getOverseasWarehouse()
    await this.getoverseaslupplementlist()
  },
  methods: {
    // 获取仓库 --- 壳
    async getOverseasWarehouse() {
      const myMap = new Map()
      try {
        const res = await this.$appConfig.getGlobalCacheInfo('allWh', '')
        const jsonData = this.isJsonString(res)
        if (jsonData?.length) {
          jsonData.forEach(item => {
            this.wherehouseNameList = this.wherehouseNameList.concat(item.child)
          })
          this.wherehouseNameList = this.wherehouseNameList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
        } else {
          this.$message.error(`仓库列表为空`)
        }
      } catch (error) {
        this.$message.error(`获取仓库列表异常： ${error}`)
      }
    },
    // 判断能否转JSON
    isJsonString(str) {
      if (typeof str === 'string') {
        try {
          JSON.parse(str)
          return JSON.parse(str)
        } catch (e) {
          return str
        }
      } else {
        return str
      }
    },
    // 查看商品详情
    getDetails(val) {
      this.overseaOrderSn = val.oversea_order_sn
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
        overseaOrderSn: this.form.returnOrderNumber, // 出库订单号
        page: this.page,
        pageSize: this.pageSize
      }
      console.log('parmas', parmas)
      try {
        const { data } = await this.$api.getlupplementlist(parmas)
        // console.log(data)
        // console.log(data.data.data.lastItem.sku_list.lastItem.sku_num)
        if (data.code === 200) {
          this.tableData = data.data.data
          this.tableData.map(item => {
            let goods_num = 0
            item.sku_list.map(skuItem => {
              goods_num += skuItem.sku_num ? Number(skuItem.sku_num) : 0
            })
            item.goods_num = goods_num
          })
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
