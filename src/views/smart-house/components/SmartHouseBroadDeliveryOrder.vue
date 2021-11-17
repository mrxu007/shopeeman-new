<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul style="margin-bottom: 10px">
        <li>
          <span>仓库名称：</span>
          <el-select
            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in 4"
              :key="index"
            />
          </el-select>
        </li>
        <li>
          <span>订单出库状态：</span>
          <el-select
            size="mini"
            filterable
          >
            <el-option
              v-for="(item, index) in 4"
              :key="index"
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
            clearable
            size="mini"
            oninput="value=value.replace(/\s+/g,'')"
          />
        </li>
        <li>
          <span>平台物流单号：</span>
          <el-input
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
        height="calc(100vh - 250px)"
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
        />
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
          min-width="100"
        />
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
          min-width="100"
        />
        <el-table-column
          label="出库商品详情"
          align="center"
          min-width="130"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
            >取消订单</el-button>
            <el-button
              size="mini"
              type="primary"
              @click="
                detailsVisible = true
                getDetails(row)"
            >补件</el-button>
          </template>
        </el-table-column>
        <el-table-column
          label="操作"
          align="center"
          min-width="95"
        >
          <template slot-scope="{row}">
            <el-button
              size="mini"
              type="primary"
              @click="deleteHomeForecast(row,1)"
            >删 除</el-button>
          </template>
        </el-table-column>
        <el-table-column
          prop="remark"
          label="操作状态"
          align="center"
          min-width="140"
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
    <!-- 查看商品详情弹窗 -->
    <el-dialog
      class="details-dialog"
      title="预报商品详情"
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
          width="100"
          align="center"
          label="预报物流单号"
          prop="package_code"
          fixed
        />
        <el-table-column
          width="80"
          align="center"
          label="商品状态"
        >
          <template slot-scope="{row}">
            {{ row.status?skuStatusObj[row.status]:'' }}
          </template>
        </el-table-column>
        <el-table-column
          width="120"
          align="center"
          label="商品编号(SKU)"
          prop="sku_id"
        />
        <el-table-column
          width="150"
          align="center"
          label="签收时间"
          prop="sign_time"
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
          label="商品购买数量"
          prop="purchase_num"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品签收数量"
          prop="sign_num"
        />
        <el-table-column
          width="100"
          align="center"
          label="商品规格"
          prop="sku_spec"
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
              v-if="row.goods_url"
              type="primary"
              size="mini"
              @click="openUrl(row.goods_url)"
            >查看商品链接</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-dialog>
    <!-- 发起预报弹窗 -->
    <el-dialog
      class="foreign-dialog"
      title="预报中转仓备货商品"
      :visible.sync="foreignVisible"
      width="1200px"
      :close-on-click-modal="false"
      :close-on-press-escape="false"
      :before-close="foreignClose"
    >
      <div style="display:flex;">
        <div>
          <ul>
            <li>
              <span>中转仓库：</span>
              <el-select
                v-model="foreignWid"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item, index) in foreignWidList"
                  :key="index"
                  :label="`${item.warehouse_name}(${item.detail_address})`"
                  :value="item.id"
                />
              </el-select>
            </li>
          </ul>
          <ul>
            <li>
              <el-button
                type="primary"
                size="mini"
                :disabled="isforeignClose"
                @click="itselfGoodsImport"
              >自有商品导入</el-button>
              <el-upload ref="importRef" :disabled="isforeignClose" style="margin:0 10px" accept=".xls, .xlsx" action="https://jsonplaceholder.typicode.com/posts/" :on-change="importTemplate" :show-file-list="false" :auto-upload="false">
                <el-button :disabled="isforeignClose" :data="importTemplateData" size="mini" type="primary"> 批量Excel导入 </el-button>
              </el-upload>
              <el-button
                type="primary"
                size="mini"
                @click="downloadTemplate"
              >下载预报模板</el-button>
              <el-button
                type="primary"
                size="mini"
                :disabled="isforeignClose"
                @click="exportTickData"
              >导出勾选数据</el-button>
            </li>
          </ul>
        </div>
      </div>
      <span style="color:red">
        提示：1：应仓库要求，预报单中需包含商品的体积(长宽高)，需下载最新版的预报模板
        &nbsp;&nbsp;&nbsp;&nbsp;2：导入商品会导入到对应的中转仓库，请选择好再导入
      </span>
      <el-table
        height="420"
        :data="foreignData"
        :header-cell-style="{
          backgroundColor: '#f5f7fa',
        }"
        :row-style="{
          color: 'black',
          height: '50px',
        }"
        @selection-change="foreignSelectionChange"
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
      BroadDeliveryOrder: new BroadDeliveryOrder(this),

      total: 0,
      pageSize: 30,
      page: 1,

      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据

      form: { // 条件搜索
        wid: 17, // 仓库id
        oversea_order_sn: '', // 出库单号
        logistic_no: '', // 物流单号
        created_time: '', // 创建时间
        status: ''
      }
    }
  },
  async mounted() {
    this.form.created_time = [new Date().getTime() - 3600 * 1000 * 24 * 45, new Date()]
    // 获取数据
    this.getOutOfStockList()
  },
  methods: {
    // 获取数据
    async getOutOfStockList() {
      this.isShowLoading = true
      this.form.page = this.page
      this.form.pageSize = this.pageSize
      const res = await this.BroadDeliveryOrder.getOutOfStockList(this.form)

      this.isShowLoading = false
    },
    // 出库商品详情
    getDetails() {

    },
    // 导出数据
    async exportTableData() {
      this.isShowLoading = true
      const exportData = []
      const len = this.total % 30 === 0 ? this.total / 30 : Math.floor(this.total / 30) + 1
      for (let index = 0; index < len; index++) {
        this.form.page = index
        this.form.pageSize = this.pageSize
        const res = await this.StrockUpHome.getHomeWarehouse(this.form)
        if (res.code === 200) {
          const resData = res.data.data
          resData.forEach(item => {
            item.home_stocking_forecast_sub.forEach(skuItem => {
              const obj = {}
              obj['package_code'] = item.package_code
              obj['purchase_order_sn'] = item.purchase_order_sn
              obj['wid'] = item.wid
              obj['created_at'] = item.created_at
              obj['purchase_num'] = skuItem.purchase_num
              obj['sign_num'] = skuItem.sign_num
              obj['remark'] = item.remark
              obj['status'] = skuItem.status
              obj['sku_id'] = skuItem.sku_id
              obj['goods_name'] = skuItem.goods_name
              obj['sku_spec'] = skuItem.sku_spec
              obj['sku_image'] = skuItem.sku_image
              obj['goods_url'] = skuItem.goods_url
              exportData.push(obj)
            })
          })
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
@import '../../../module-less/smart-house-less/strock-up-home.less';
</style>
