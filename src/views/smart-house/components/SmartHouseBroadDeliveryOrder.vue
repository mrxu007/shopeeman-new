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
      <ul>
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
            @click="cancelOverseaOrder(multipleSelection,2)"
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
          width="50"
          fixed
        />
        <el-table-column
          align="center"
          type="index"
          label="序号"
          width="50"
          fixed
        />
        <el-table-column
          prop="country"
          label="站点"
          min-width="100"
          align="center"
          show-overflow-tooltip
          fixed
        >
          <template slot-scope="{row}">
            {{ row.country | chineseSite }}
          </template>
        </el-table-column>
        <el-table-column
          prop="oversea_order_sn"
          label="订单编号"
          min-width="135"
          align="center"
          show-overflow-tooltip
          fixed
        />
        <el-table-column
          prop="logistic_no"
          label="平台物流单号"
          align="center"
          min-width="130"
          show-overflow-tooltip
        />
        <el-table-column
          label="所属仓库"
          align="center"
          min-width="100"
          prop="warehouse_name"
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
          min-width="150"
          show-overflow-tooltip
        >
          <template slot-scope="{row}">
            {{ row.status?statusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          label="出库商品详情"
          align="center"
          min-width="125"
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
          min-width="95"
        />
        <el-table-column
          prop="remark"
          label="仓库备注"
          align="center"
          min-width="150"
          show-overflow-tooltip
        />
        <el-table-column
          prop="goods_price"
          label="出库商品总价(RMB)"
          align="center"
          min-width="135"
        />
        <el-table-column
          label="出库商品详情"
          min-width="180"
        >
          <template slot-scope="{row}">
            <el-button
              v-if="row.status!=5 && row.status !=3"
              size="mini"
              type="primary"
              @click="cancelOverseaOrder(row,1)"
            >取消订单</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="setUid(row)"
            >补 件</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作状态"
          align="center"
          min-width="140"
          fixed="right"
          show-overflow-tooltip
        >
          <template slot-scope="{ row }">
            <span :style="row.color && 'color:' + row.color">{{ row.orderStatus }}</span>
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
                <el-image
                  :src="row.sku_image"
                  style="width: 400px; height: 400px"
                >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div>
              <el-image
                style="width: 40px; height: 40px"
                :src="row.sku_image"
              >
                <div slot="error" class="image-slot" />
              </el-image>
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
            v-model="stockForm.wid"
            size="mini"
            filterable
          >
            <el-option :value="'0'" label="全部" />
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
            v-model="stockForm.sys_sku_id"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>商品编号：</span>
          <el-input
            v-model="stockForm.sku_id"
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>商品规格：</span>
          <el-input
            v-model="stockForm.sku_name"
            clearable
            size="mini"
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
              page =1
              getStock()"
          >搜 索</el-button>
          <el-button
            type="primary"
            size="mini"
            @click="batchReissue"
          >批量补件</el-button>
        </li>
      </ul>
      <el-table
        v-loading="reissueLoading"
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
          width="130"
          align="center"
          label="仓库名称"
          prop="warehouse_name"
          fixed
        />
        <el-table-column
          width="120"
          align="center"
          label="系统商品编号"
          prop="sys_sku_id"
        />
        <el-table-column
          width="120"
          align="center"
          label="商品编号(SkuId)"
          prop="sku_id"
        />
        <el-table-column
          width="130"
          align="center"
          label="商品名称"
          prop="goods_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          align="center"
          label="商品规格"
          prop="sku_name"
          show-overflow-tooltip
        />
        <el-table-column
          width="150"
          align="center"
          label="库存数量"
          prop="stock_num"
        />
        <el-table-column
          width="150"
          align="center"
          label="商品单价(RMB)"
          prop="sku_price"
        >
          <template slot-scope="{row}">
            {{ row.sku_price?row.sku_price/100:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="150"
          align="center"
          label="商品链接"
          prop="sku_url"
        />
        <el-table-column
          width="80"
          align="center"
          label="商品图片"
        >
          <template slot-scope="{row}">
            <el-tooltip
              v-if="row.sku_image || row.real_image_url"
              effect="light"
              placement="right-end"
              :visible-arrow="false"
              :enterable="false"
              style="width: 50px; height: 50px"
            >
              <div slot="content">
                <el-image
                  :src="row.sku_image || row.real_image_url"
                  style="width: 400px; height: 400px"
                >
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                  >
                  <div slot="error" class="image-slot" />
                </el-image>
                <el-image
                  style="width: 40px; height: 40px"
                  :src="row.sku_image || row.real_image_url"
                >
                  <div slot="placeholder" class="image-slot">
                    加载中<span class="dot">...</span>
                  </div>
                  >
                  <div slot="error" class="image-slot" />
                </el-image>
              </div></el-tooltip>
          </template>
        </el-table-column>
        <el-table-column
          width="130"
          align="center"
          label="货架仓位"
          prop="position"
        />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page="stockPage"
          :page-sizes="[30, 50, 100]"
          :page-size="stockPageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="stockTotal"
          @size-change="reissueSizeChange"
          @current-change="reissueCurrentChange"
        />
      </div>
    </el-dialog>
    <!--批量补件弹窗-->
    <el-dialog
      class="batchrei-dialog"
      title="批量补件"
      :visible.sync="batchreiVisible"
      width="300px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :show-close="!batchreiLoading"
      @close="batchreiClose"
    >
      <div class="wrap">
        <span>补件数量：</span>
        <el-input
          v-model="reissueNum"
          clearable
          size="mini"
          oninput="value=value.replace(/\s+/g,'')"
        />
      </div>
      <div class="footer">
        <el-button
          :loading="batchreiLoading"
          size="mini"
          type="primary"
          @click="addReissueStore(reissueSelection)"
        >确 定</el-button>
      </div>
    </el-dialog>
  </el-row>
</template>

<script>
import BroadDeliveryOrder from '../../../module-api/smart-house-api/broad-delivery-order'
import { exportExcelDataCommon } from '../../../util/util'
export default {
  data() {
    return {
      showConsole: true,
      isShowLoading: false,
      reissueLoading: false,
      detailsVisible: false,
      reissueVisible: false,
      batchreiVisible: false,
      batchreiLoading: false,
      BroadDeliveryOrder: new BroadDeliveryOrder(this),

      filterZero: false,

      total: 0,
      pageSize: 30,
      page: 1,
      stockTotal: 0,
      stockPageSize: 30,
      stockPage: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据
      reissueSelection: [], // 海外仓补件选择数据
      detailsData: [], // 商品详情数据
      reissueData: [], // 海外仓补件数据
      reissueNum: '', // 补件数量
      overseaOrderSn: '', // 补件出库单号

      form: { // 条件搜索
        wid: '', // 仓库id
        oversea_order_sn: '', // 出库单号
        logistic_no: '', // 物流单号
        created_time: '', // 创建时间
        status: ''// 订单出库状态
      },

      stockForm: { // 仓库条件搜索
        app_uid: '', // 用户id
        wid: '0', // 仓库id
        sku_id: '', // 商品编号
        sku_name: '', // 商品规格名
        is_zero_filter: 0, // 过滤0库存
        sys_sku_id: '', // 系统商品编号
        type: 'query'
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
    // 取消/批量取消订单
    async cancelOverseaOrder(val, type) {
      let data = []
      if (type === 1) {
        data.push(val)
      } else {
        if (!val?.length) return this.$message('请选择需要取消订单的商品')
        data = val
      }
      for (let index = 0; index < data.length; index++) {
        const element = data[index]
        if (element.status !== 5 && element.status !== 3) {
          const pamars = {}
          pamars['wid'] = element.wid
          pamars['overseaOrderSn'] = element.oversea_order_sn
          const res = await this.BroadDeliveryOrder.cancelOverseaOrder(pamars)
          console.log('cancelOverseaOrder', res)
          if (res.code === 200) {
            this.$set(element, 'orderStatus', '取消订单成功')
            this.$set(element, 'color', 'green')
          } else {
            this.$set(element, 'orderStatus', res.data)
            this.$set(element, 'color', 'red')
          }
        }
      }
    },
    // 批量补件
    batchReissue() {
      if (!this.reissueSelection?.length) return this.$message('请选择需要补件的商品')
      const flag = this.reissueSelection.every(item => item.wid === this.reissueSelection[0].wid)
      if (flag) {
        this.batchreiVisible = true
      } else {
        this.$message.error('无法同时补件不同仓库的商品')
      }
    },
    // 海外仓补件
    async addReissueStore(val) {
      const skuLists = []
      const pamars = {}
      let flag = false
      if (!(/(^[1-9]\d*$)/.test(Number(this.reissueNum)))) return this.$message('请输入大于0的正整数')
      for (let index = 0; index < val.length; index++) {
        const element = val[index]
        if (Number(element.stock_num) < Number(this.reissueNum)) {
          this.$refs.Logs.writeLog(`商品【${element.goods_name}】:库存数小于补件数`, false)
          flag = true
        } else {
          const obj = {
            sku_id: element.sku_id,
            sys_sku_id: element.sys_sku_id,
            sku_name: element.sku_name,
            goods_name: element.goods_name,
            number: this.reissueNum
          }
          skuLists.push(obj)
        }
      }
      pamars['overseaOrderSn'] = this.overseaOrderSn
      pamars['wid'] = val[0].wid
      pamars['skuLists'] = skuLists
      if (!skuLists?.length) return this.$message('库存数小于补件数')
      this.batchreiLoading = true
      const res = await this.BroadDeliveryOrder.addReissueStore(pamars)
      if (res.code === 200) {
        this.$message.success('补件成功')
        this.batchreiVisible = false
      } else {
        this.$message.error(res.data)
      }
      if (flag) this.showConsole = false
      this.batchreiLoading = false
    },
    // 设置uid
    setUid(row) {
      this.overseaOrderSn = row.oversea_order_sn
      this.stockForm.app_uid = row.uid
      this.reissueVisible = true
      this.getStock()
    },
    // 打开商品链接
    openUrl(row) {
      window.open(row)
    },
    // 获取库存
    async getStock() {
      this.reissueLoading = true
      this.stockForm.page_num = this.stockPageSize
      this.stockForm.page = this.stockPage
      this.stockForm.is_zero_filter = this.filterZero ? 1 : 0
      const res = await this.BroadDeliveryOrder.getStock(this.stockForm)
      if (res.code === 200) {
        this.stockTotal = res.data.total
        this.reissueData = res.data.data
        for (let index = 0; index < this.reissueData.length; index++) {
          const element = this.reissueData[index]
          // 获取海外仓库中文名
          const resName = await this.BroadDeliveryOrder.overseasWh(element.wid)
          if (resName.code === 200) {
            this.$set(element, 'warehouse_name', resName.data)
          }
        }
        console.log('reissueData', this.reissueData)
      } else {
        this.$message.error(res.data)
      }
      this.reissueLoading = false
    },
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
            goods_num += skuItem.sku_num ? skuItem.sku_num : 0
            goods_price += skuItem.sku_price ? parseInt(skuItem.sku_price) * skuItem.sku_num : 0
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
      if (this.total === 0) return this.$message('暂无导出数据')
      this.isShowLoading = true
      const exportData = []
      let resData = []
      const params = this.form
      params.pageSize = this.pageSize
      params.page = 1
      while (resData.length < this.total) {
        const res = await this.BroadDeliveryOrder.getOutOfStockList(params)
        if (res.code === 200) {
          resData = resData.concat(res.data.data)
          params.page++
        } else {
          this.$refs.Logs.writeLog('导出数据错误', res.data)
          this.isShowLoading = false
          break
        }
      }
      resData.forEach(item => {
        item.sku_list.forEach(skuItem => {
          const obj = {}
          obj['country'] = item.country
          obj['oversea_order_sn'] = item.oversea_order_sn
          obj['logistic_no'] = item.logistic_no
          obj['warehouse_name'] = item.warehouse_name
          obj['created_at'] = item.created_at
          obj['deliver_time'] = item.deliver_time
          obj['status'] = item.status
          obj['sys_sku_id'] = skuItem.sys_sku_id
          obj['sku_id'] = skuItem.sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['sku_num'] = skuItem.sku_num
          obj['sku_id'] = skuItem.sku_id
          obj['goods_name'] = skuItem.goods_name
          obj['sku_price'] = skuItem.sku_price
          obj['sku_name'] = skuItem.sku_name
          obj['sku_image'] = skuItem.sku_image
          obj['sku_url'] = skuItem.sku_url
          exportData.push(obj)
        })
      })
      let str = `<tr>
          <td>站点</td>
          <td>订单编号</td>
          <td>平台物流单号</td>
          <td>所属仓库</td>
          <td>出库单创建时间</td>
          <td>订单出库时间</td>
          <td>状态</td>
          <td>系统商品编号</td>
          <td>商品编号</td>
          <td>商品名称</td>
          <td>出库数量</td>
          <td>商品单价(RMB)</td>
          <td>商品规格</td>
          <td>商品图片</td>
          <td>商品链接</td>
        </td>`
      exportData.forEach(item => {
        str += `<tr>
        <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
        <td>${item.oversea_order_sn ? item.oversea_order_sn : '' + '\t'}</td>
        <td>${item.logistic_no ? item.logistic_no : '' + '\t'}</td>
        <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
        <td>${item.created_at ? item.created_at : '' + '\t'}</td>
        <td>${item.deliver_time ? item.deliver_time : '' + '\t'}</td>
        <td>${this.statusObj[item.status] ? this.statusObj[item.status] : '' + '\t'}</td>
        <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
        <td>${item.sku_id ? item.sku_id : '' + '\t'}</td>
        <td>${item.goods_name ? item.goods_name : '' + '\t'}</td>
        <td>${item.sku_num ? item.sku_num : '' + '\t'}</td>
         <td>${item.sku_price ? item.sku_price : '' + '\t'}</td>
        <td>${item.sku_name ? item.sku_name : '' + '\t'}</td>
        <td>${item.sku_image ? item.sku_image : '' + '\t'}</td>
        <td>${item.sku_url ? item.sku_url : '' + '\t'}</td>
        </tr>`
      })
      this.isShowLoading = false
      exportExcelDataCommon('海外仓出库订单数据', str)
    },
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.getOutOfStockList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.getOutOfStockList()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    reissueSizeChange(val) {
      this.stockPage = 1
      this.stockPageSize = val
      this.getStock()
    },
    reissueCurrentChange(val) {
      this.stockPage = val
      this.getStock()
    },
    reissueSelectionChange(val) {
      this.reissueSelection = val
    },
    reissueClose(done) {
      done()
      this.stockForm.wid = '0'
      this.stockForm.app_uid = ''
      this.stockForm.sku_id = ''
      this.stockForm.sku_name = ''
      this.stockForm.is_zero_filter = 0
      this.stockForm.sys_sku_id = ''
      this.filterZero = false
      this.overseaOrderSn = ''
    },
    batchreiClose() {
      this.reissueNum = ''
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/smart-house-less/broad-deliver-order.less';
</style>
