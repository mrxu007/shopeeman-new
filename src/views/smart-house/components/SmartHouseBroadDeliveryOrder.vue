<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>仓库名称：</span>
          <el-select
            v-model="form.wid"
            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :value="item.id"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li>
          <span>订单出库状态：</span>
          <el-select
            v-model="form.status"
            size="mini"
            filterable
          >
            <el-option
              label="全部"
              :value="''"
            />
            <el-option
              v-for="(item, index) in statusList"
              :key="index"
              :label="item.lable"
              :value="item.value"
            />
          </el-select>
        </li>
        <li>
          <span>出库单创建时间：</span>
          <el-date-picker
            v-model="form.created_time"
            unlink-panels
            size="mini"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
          />
        </li>
      </ul>
      <ul style="margin-bottom: 10px">
        <li>
          <span>订单编号：</span>
          <el-input
            v-model="form.oversea_order_sn"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>平台物流单号：</span>
          <el-input
            v-model="form.logistic_no"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1
              getOutOfStockList()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            :loading="isDeleteLoading"
            @click="deleteHomeForecast(multipleSelection,2)"
          >批量取消订单</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="exportTableData"
          >导出数据</el-button>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <el-table
        ref="plTable"
        v-loading="isShowLoading"
        height="calc(100vh - 220px)"
        :data="tableData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
          fixed
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          prop="country"
          label="站点"
          min-width="120"
          align="center"
          fixed
        >
          <template slot-scope="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column
          prop="oversea_order_sn"
          label="订单编号"
          min-width="150"
          align="center"
        />
        <el-table-column
          prop="logistic_no"
          label="平台物流单号"
          align="center"
          min-width="150"
        />
        <el-table-column
          prop="wid"
          label="所属仓库"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="created_at"
          label="出库单创建时间"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="deliver_time"
          label="订单出库时间"
          align="center"
          min-width="140"
        />
        <el-table-column
          prop="status"
          label="状态"
          align="center"
          min-width="140"
        >
          <template slot-scope="{row}">
            {{ row.status?statusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="出库商品详情"
          align="center"
          min-width="130"
        >
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
        <el-table-column
          prop="goods_num"
          label="出库商品总数"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="remark"
          label="仓库备注"
          align="center"
          min-width="100"
        />
        <el-table-column
          prop="goods_price"
          label="出库商品总价(RMB)"
          align="center"
          min-width="140"
        />
        <el-table-column
          label="出库商品详情"
          min-width="180"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status!=3"
              size="mini"
              type="primary"
            >取消订单</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="reissueVisible = true"
            >补件</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="操作状态"
          align="center"
          min-width="100"
          fixed="right"
        />
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
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
    <!-- 查看出库商品详情弹窗 -->
    <el-dialog
      class="details-dialog"
      title="出库商品详情"
      :visible.sync="detailsVisible"
      width="800px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
    >
      <el-table
        height="420"
        :data="detailsData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
      >
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          prop="order_sn"
          width="150"
          align="center"
          label="订单编号"
          fixed
        />
        <el-table-column
          width="100"
          align="center"
          label="出库商品状态"
        >
          <template slot-scope="{row}">
            {{ row.status?skuStatusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="系统商品编号(SysSku)"
          prop="sys_sku_id"
        />
        <el-table-column
          width="150"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品名称"
          prop="goods_name"
        />
        <el-table-column
          width="100"
          align="center"
          label="出库数量"
          prop="sku_num"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品规格"
          prop="sku_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <img
                  :src="row.sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.sku_url"
              type="primary"
              size="mini"
              @click="openUrl(row.sku_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 海外仓补件弹窗 -->
    <el-dialog
      class="reissue-dialog"
      title="海外仓补件"
      :visible.sync="reissueVisible"
      width="1200px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="reissueClose"
    >
      <ul>
        <li>
          <span>仓库名称：</span>
          <el-select
            v-model="form.wid"
            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in widList"
              :key="index"
              :value="item.id"
              :label="item.warehouse_name"
            />
          </el-select>
        </li>
        <li>
          <span>系统商品编号：</span>
          <el-input
            v-model="form.oversea_order_sn"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>商品编号：</span>
          <el-input
            v-model="form.logistic_no"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>商品规格：</span>
          <el-input
            v-model="form.oversea_order_sn"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <el-checkbox v-model="filterZero">过滤0库存</el-checkbox>
        </li>
        <li>
          <el-button
            type="primary"
            size="mini"
            @click="
              page =1"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
          >批量补件</el-button>
        </li>
      </ul>
      <el-table
        height="420"
        :data="reissueData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
        @selection-change="reissueSelectionChange"
      >
        <el-table-column
          align="center"
          type="selection"
          width="50"
          fixed
        />
        <el-table-column
          width="50"
          align="center"
          type="index"
          label="序号"
          fixed
        />
        <el-table-column
          width="100"
          align="center"
          label="预报物流单号"
          prop="packageCode"
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          label="采购单号"
          prop="purchaseOrderSn"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品编号(SKU)"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_id }}
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          align="center"
          label="商品名称"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].goods_name }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品数量"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].purchase_num }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品单价(RMB)"
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_price }}
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="商品规格"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.skuList[0].sku_spec }}
          </template>
        </el-table-column>
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.skuList[0].sku_image"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <img
                  :src="row.skuList[0].sku_image"
                  width="300px"
                  height="300px"
                >
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.skuList[0].sku_image"
              />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品链接"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.skuList[0].goods_url"
              type="primary"
              size="mini"
              @click="openUrl(row.skuList[0].goods_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
        <el-table-column
          width="100"
          align="center"
          label="备注"
          prop="remark"
          show-overflow-tooltip
        />
        <el-table-column
          width="100"
          align="center"
          label="操作状态"
          prop="status"
          fixed="right"
        >
          <template slot-scope="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.status }}</span>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
  </el-row>
</template>

<script>
import BroadDeliveryOrder from '../../../module-api/smart-house-api/broad-delivery-order'
import { exportExcelDataCommon, delay } from '../../../util/util'
export default {
  data() {
    return {
      detailsVisible: false,
      isShowLoading: false,
      reissueVisible: true,
      BroadDeliveryOrder: new BroadDeliveryOrder(this),

      filterZero: false,

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      detailsData: [], // 商品详情数据

      form: { // 条件搜索
        wid: '', // 仓库id
        oversea_order_sn: '', // 出库单号
        logistic_no: '', // 物流单号
        created_time: '', // 创建时间
        status: ''// 订单出库状态
      },

      statusObj: {
        1: '初始化数据(推送出库单)',
        2: '已构建出库单',
        3: '海外仓订单出库',
        4: '海外仓订单申请退件',
        5: '海外仓订单已交运'
      },
      skuStatusObj: {
        '-1': '未出库',
        '1': '订单初始化',
        '2': '预扣库存',
        '3': '已出库',
        '4': '已签收'
      },

      widList: [], // 仓库列表
      statusList: [
        {
          value: 1,
          lable: '初始化数据(推送出库单)'
        },
        {
          value: 2,
          lable: '已构建出库单'
        },
        {
          value: 3,
          lable: '海外仓订单出库'
        },
        {
          value: 4,
          lable: '海外仓订单申请退件'
        },
        {
          value: 5,
          lable: '海外仓订单已交运'
        }
      ]
    }
  },
  async mounted() {
    this.form.created_time = [new Date().getTime() - 3600 * 1000 * 24 * 15, new Date()]
    // 获取仓库
    await this.getOverseasWarehouse()
    // 获取数据
    await this.getOutOfStockList()
  },
  methods: {
    // 获取仓库
    async getOverseasWarehouse() {
      const myMap = new Map()
      const res = await this.BroadDeliveryOrder.getOverseasWarehouse()
      if (res.code === 200) {
        res.data.forEach(item => {
          this.widList = this.widList.concat(item.child)
        })
      } else {
        this.$message.error(res.data)
      }
      this.widList = this.widList.filter((item) => !myMap.has(item.id) && myMap.set(item.id, 1))
      this.form.wid = this.widList[0].id
    },
    // 获取数据
    async getOutOfStockList() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.BroadDeliveryOrder.getOutOfStockList(this.form)
      console.log('tableData', res)
      if (res.code === 200) {
        this.tableData = res.data.data
        this.tableData.map(item => {
          let goods_num = 0
          let goods_price = 0
          item.sku_list.forEach(skuItem => {
            goods_num += skuItem.stock_num ? skuItem.stock_num : 0
            goods_price += skuItem.sku_price ? parseInt(skuItem.sku_price) : 0
          })
          item.goods_num = goods_num
          item.goods_price = goods_price
        })
        this.total = res.data.total
      } else {
        this.$message.error(res.data)
      }
      this.isShowLoading = false
    },
    // 查看商品详情
    getDetails(row) {
      this.detailsData = row.sku_list
      this.detailsData.map(item => {
        item.order_sn = row.oversea_order_sn
      })
    },
    // 导出数据
    async exportTableData() {
      this.isShowLoading = true
      let exportData = []
      const len = this.total % 30 === 0 ? this.total / 30 : Math.floor(this.total / 30) + 1
      for (let index = 0; index < len; index++) {
        this.form.page = index
        this.form.pageSize = this.pageSize
        const res = await this.StrockUpHome.getHomeWarehouse(this.form)
        if (res.code === 200) {
          const resData = res.data.data
          exportData = exportData.concat(resData)
        } else {
          this.$refs.Logs.writeLog('导出数据错误', res.data)
        }
      }
      if (!exportData?.length) {
        this.isShowLoading = false
        this.$message('暂无数据导出')
        return
      }
      let str = `<tr>
          <td>预报物流单号</td>
          <td>采购单号</td>
          <td>中转仓</td>
          <td>预报时间</td>
          <td>商品预购买数量</td>
          <td>商品签收数量</td>
          <td>备注</td>
          <td>商品状态</td>
          <td>商品编号(SKU)</td>
          <td>商品名称</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.package_code ? item.package_code : '' + '\t'}</td>
        <td>${item.purchase_order_sn ? item.purchase_order_sn : '' + '\t'}</td>
        <td>${item.wid ? item.wid : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.purchase_num ? item.purchase_num : '' + '\t'}</td>
        <td>${item.sign_num ? item.sign_num : '' + '\t'}</td>
        <td>${item.remark ? item.remark : '' + '\t'}</td>
        <td>${item.status ? this.skuStatusObj[item.status] : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_spec ? item.sku_spec : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.goods_url ? item.goods_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('国内仓预报单数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getHomeWarehouse()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getHomeWarehouse()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/broad-deliver-order.less';
</style>
