<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <div class="left-box mar-right">
        <div class="base-box">
          <span class="base-title">基础操作</span>
          <div class="base-item">
            <div class="row">
              <el-button size="mini" type="primary" class="btnWidth" @click="setShotStatusFun">采购状态变更</el-button>
              <el-button size="mini" type="primary" @click="syncAfterOrder('')">售后同步</el-button>
              <el-checkbox v-model="mall_compare" class="mar-left">全店同步</el-checkbox>
            </div>
            <div class="row">
              <el-button size="mini" type="primary" class="btnWidth" @click="respondCancelRequest('reject', '拒绝')">批量拒绝买家取消订单</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="respondCancelRequest('accept', '接受')">批量接受买家取消订单</el-button>
            </div>
            <div class="row">
              <el-button size="mini" type="primary" class="btnWidth" @click="colorVisible = true">批量标记颜色标识</el-button>
              <el-button size="mini" type="primary" class="btnWidth" @click="getExportData">导出数据</el-button>
            </div>
          </div>
        </div>
      </div>
      <div class="right-box">
        <div class="base-box">
          <span class="base-title">基础操作</span>
          <div class="base-item">
            <div class="row">
              <storeChoose :is-all="true" :show-mall="true" @changeMallList="changeMallList" />
              <div class="row_item">
                <label>创建时间：</label>
                <el-date-picker
                  v-model="cloumn_date1"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  style="width: 200px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @change="changeTime($event, 'cloumn_date1')"
                />
              </div>
            </div>

            <div class="row">
              <div class="row_item">
                <label>售后状态：</label>
                <el-select v-model="query.refundStatus" size="mini" style="width: 100px" multiple collapse-tags filterable @change="changeSelect($event,'refundStatus', afterSaleList)">
                  <el-option label="全部" :value="''" @click.native="selectAll('refundStatus', afterSaleList)" />
                  <el-option v-for="(item, index) in afterSaleList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </div>

              <div class="row_item">
                <label>采购状态：</label>
                <el-select v-model="query.shotOrderStatus" size="mini" multiple collapse-tags filterable style="width: 180px" @change="changeSelect($event,'shotOrderStatus', shotstatusList)">
                  <el-option label="全部" :value="''" @click.native="selectAll('shotOrderStatus', shotstatusList)" />
                  <el-option v-for="(item, index) in shotstatusList" :key="index" :label="item.label" :value="item.value" />
                </el-select>
              </div>

              <div class="row_item">
                <label>颜色标识：</label>
                <el-select v-model="query.colorLabelId" size="mini" style="width: 180px">
                  <el-option label="全部" :value="0" />
                  <el-option label="未标识" :value="-1" />
                  <el-option label="已标识" :value="-2" />
                  <el-option v-for="item in selectColorList" :key="item.id" :label="item.name" :value="item.id" :style="{ color: item.color }" />
                </el-select>
              </div>

              <div class="row_item">
                <label>申请时间：</label>
                <el-date-picker
                  v-model="cloumn_date2"
                  size="mini"
                  value-format="yyyy-MM-dd"
                  type="daterange"
                  style="width: 200px"
                  range-separator="-"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                  :picker-options="pickerOptions"
                  @change="changeTime($event, 'cloumn_date2')"
                />
              </div>
            </div>
            <div class="row">
              <div class="row_item">
                <el-select v-model="selType" size="mini" style="width: 120px; margin-right: 3px" @change="inputDes = ''">
                  <el-option label="订单编号" value="orderSn" />
                  <el-option label="采购物流单号" value="trackingNumber" />
                  <el-option label="采购单号" value="shotOrderSn" />
                </el-select>
                <el-input v-model="inputDes" size="mini" style="width: 180px" clearable />
              </div>
              <div class="row_item">
                <el-button size="mini" type="primary" style="margin-right: 10px" @click="search(1)">搜索</el-button>
              </div>
            </div>
            <div class="row" style="margin-top: 10px">
              <div class="row_item">
                <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="table-form">
      <u-table
        ref="multipleTable"
        v-loading="loading"
        :border="false"
        use-virtual
        height="640px"
        :data="tableList"
        tooltip-effect="dark"
        :row-style="{ height: '60px !important' }"
        :cell-style="{ padding: '0px' }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column type="selection" width="55" fixed />
        <u-table-column align="center" type="index" label="序号" width="50" fixed="left">
          <template slot-scope="scope">{{ (page - 1) * pageSize + scope.$index + 1 }}</template>
        </u-table-column>
        <u-table-column label="订单编号" prop="order_sn" min-width="180px" fixed="left">
          <template slot-scope="{ row }">
            <span>
              <i class="el-icon-document-copy copyStyle" @click="copy(row.order_sn)" />
              <span class="tableActive" @click="viewDetails('orderDetail', row.order_id, row.mall_info.platform_mall_id)">{{ row.order_sn }}</span>
            </span>
          </template>
        </u-table-column>
        <u-table-column label="操作" prop="" min-width="150px" fixed="left" align="center">
          <template v-slot="{ row, $index }">
            <el-dropdown style="width: 100px; margin-left: 10px">
              <el-button style="width: 100px" size="mini" plain type="primary"> 更多操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div class="dropdownItem" @click="goodsDelete(row)">删除商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="goodsDelist(row)">下架商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click=";(shotVisible = true), (multipleSelection = [row])">修改采购状态</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="syncAfterOrder(row)">同步此店铺售后订单</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="setColorSingle(row)">订单颜色标识</div></el-dropdown-item>
                <el-dropdown-item> <div class="dropdownItem" @click="SyncOrderSingle(row)">同步此订单</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </u-table-column>
        <u-table-column label="站点" prop="country" min-width="60px" align="center">
          <template
            slot-scope="{ row }"
          ><span>{{ row.mall_info.country | chineseSite }}</span></template>
        </u-table-column>
        <u-table-column label="店铺名称" prop="mall_info.platform_mall_name" width="120px" align="center" show-overflow-tooltip />
        <u-table-column align="center" prop="color_id" label="颜色标识" width="120" show-overflow-tooltip>
          <template slot-scope="scope">
            <p :style="{ background: changeColorLabel(scope.row.color_id), height: '20px' }" />
            <span>{{ changeColorLabel(scope.row.color_id, 'name') }}</span>
          </template>
        </u-table-column>
        <u-table-column label="退款金额" prop="refund_amount" min-width="100px" align="center" />
        <u-table-column align="center" prop="shot_order_info.shot_amount" label="采购价" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount }}{{ scope.row.country | siteCoin }}</template>
        </u-table-column>
        <u-table-column align="center" prop="shot_amount_rmb" label="采购价(RMB)" width="100">
          <template slot-scope="scope">{{ scope.row.shot_order_info.shot_amount_rmb }}元</template>
        </u-table-column>
        <u-table-column label="售后状态" prop="status" min-width="100px" align="center">
          <template
            slot-scope="{ row }"
          ><p :style="{ color: changeOrderStatus(row.status, 'color') }">{{ changeOrderStatus(row.status) }}</p></template></u-table-column>
        <u-table-column label="申请时间" prop="update_time" min-width="180px" align="center" />
        <u-table-column label="采购状态" prop="shot_order_info.shot_status" min-width="90px" align="center">
          <template
            slot-scope="{ row }"
          ><span :style="{ color: changeShotStatus(row.shot_order_info.shot_status, 'color') }">{{ changeShotStatus(row.shot_order_info.shot_status) }}</span></template></u-table-column>
        <u-table-column label="售后原因" prop="after_reason" min-width="150px" align="center" show-overflow-tooltip />
        <u-table-column align="center" prop="remark" label="本地备注" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <div v-show="!(scope.row.id === activeRemarkID)" style="cursor: pointer;" @click="editRemark(scope.row.id)">
              <!-- <el-input v-model="scope.row.remark" disabled size="mini" @dblclick="copy(scope.row.remark)">{{ scope.row.remark }}</el-input> -->
              <el-input v-model="scope.row.remark" disabled size="mini" />
            </div>
            <el-input
              v-if="scope.row.id === activeRemarkID"
              v-model="orderRemark"
              size="mini"
              @blur="changeRemark(scope.row)"
            />
          </template>
        </u-table-column>
        <u-table-column label="商品ID" prop="goods_info.goods_id" min-width="150px">
          <template slot-scope="{ row }">
            <span>
              <i class="el-icon-document-copy copyStyle" @click="copy(row.goods_info.goods_id)" />
              <span class="tableActive" @click="openUrl(row, 'product')">{{ row.goods_info.goods_id }}</span>
            </span>
          </template>
        </u-table-column>
        <u-table-column label="商品数量" prop="goods_info.goods_count" min-width="150px" align="center" />
        <u-table-column label="商品图片" prop="goods_info.goods_img" min-width="100px" align="center">
          <template slot-scope="{ row }">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 32px; height: 32px; display: inline-block">
              <div slot="content">
                <el-image :src="[row.goods_info.goods_img] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image :src="[row.goods_info.goods_img, true] | imageRender" style="width: 32px; height: 32px" />
            </el-tooltip>
          </template>
        </u-table-column>
        <u-table-column align="center" label="商品类目" width="120">
          <template slot-scope="scope">
            <span>{{ scope.row.goods_info ? getCategoryName(scope.row.goods_info.goods_category_id, scope.row.country) : '未匹配到类目' }} </span>
          </template>
        </u-table-column>
        <u-table-column label="商品规格" prop="goods_info.variation_name" min-width="100px" align="center" />
        <u-table-column label="采购商品ID" prop="goods_info.ori_goods_id" min-width="180px">
          <template slot-scope="{ row }">
            <i v-if="row.goods_info.ori_goods_id" class="el-icon-document-copy copyStyle" @click="copy(row.goods_info.ori_goods_id)" />
            <span v-if="row.goods_info.ori_goods_id">
              <el-button type="text" @click="openUrl(row.goods_info.ori_url)">
                {{ row.goods_info.ori_goods_id }}
              </el-button>
            </span>
          </template>
        </u-table-column>
        <u-table-column label="采购订单号" width="150" show-overflow-tooltip>
          <template slot-scope="scope">
            <i v-if="scope.row.shot_order_info.shot_order_sn" class="el-icon-document-copy copyStyle" @click="copy(scope.row.shot_order_info.shot_order_sn)" />
            <span class="tableActive" @click="clickBuyOrder(scope.row)">{{ scope.row.shot_order_info.shot_order_sn }}</span>
          </template>
        </u-table-column>
        <u-table-column label="采购时间" prop="shot_order_info.shotted_at" min-width="180px" align="center" />
        <u-table-column label="采购物流单号" prop="shot_order_info.shot_tracking_number" min-width="180px">
          <template slot-scope="{ row }">
            <i v-if="row.shot_order_info.shot_tracking_number" class="el-icon-document-copy copyStyle" @click="copy(row.shot_order_info.shot_tracking_number)" />
            <span v-if="row.shot_order_info.shot_tracking_number" class="tableActive">{{ row.shot_order_info.shot_tracking_number }} </span>
          </template>
        </u-table-column>
        <u-table-column align="center" prop="buy_account_info" label="采购账号" width="120">
          <template slot-scope="scope">{{ scope.row.shot_order_info.buy_account_info ? scope.row.shot_order_info.buy_account_info.name : '' }}</template>
        </u-table-column>
        <u-table-column label="订单创建时间" prop="after_created_at" min-width="180px" align="center" />
        <u-table-column label="订单截止发货时间" prop="" min-width="180px" align="center" />
        <u-table-column label="退货物流号" prop="return_tracking_number" min-width="180px" align="center" />
        <u-table-column label="退件发货地址" prop="return_delivery_time" min-width="200px" align="center" />
        <u-table-column label="退货地址" prop="return_address" min-width="200px" align="center" />
        <u-table-column label="退货邮寄地址" prop="return_pickup_address" min-width="200px" align="center" />
      </u-table>
      <div class="pagination">
        <el-pagination
          background
          :current-page.sync="page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
    <el-dialog v-if="colorVisible" title="选择颜色标识" :visible.sync="colorVisible" width="600px" :close-on-click-modal="false">
      <div class="color-style">
        <el-table ref="colorTable" :data="colorList" tooltip-effect="dark" style="width: 100%" height="500">
          <el-table-column label="标识选择" width="100">
            <template slot-scope="scope">
              <el-radio v-model="colorRadio" :label="scope.$index" @change.native="getCurrentRow(scope.row)" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="颜色">
            <template slot-scope="scope">
              <div class="colorBox" :style="{ background: scope.row.color }" />
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标识名称" />
        </el-table>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setColor(multipleSelection)">设置颜色</el-button>
      </span>
    </el-dialog>

    <!-- 批量更改采购状态 colorLabelId1  -->
    <el-dialog title="采购状态变更" class="dialog-color" width="300px" :close-on-click-modal="false" :visible.sync="shotVisible">
      <div class="color-dialog">
        <div class="form-item">
          <span class="search-title">状态：</span>
          <el-select v-model="shotstatus" size="mini" style="width: 150px; margin-right: 10px" clearable>
            <el-option v-for="item in shotstatusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" size="mini" @click="setShotStatus(multipleSelection)">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
import { changeShotStatus, changeOrderStatus, statusAfterList, shotStatusList } from './orderCenter/orderCenter'
import storeChoose from '../../../components/store-choose.vue'
import { exportExcelDataCommon, creatDate, getDaysBetween } from '../../../util/util'
import orderSync from '../../../services/timeOrder'
import { setGoodsDelist, setGoodsDelete } from './orderCenter/handleGoods'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      orderRemark: '',
      activeRemarkID: 0,
      shotVisible: false,
      shotstatus: '', // 采购状态
      shotstatusList: shotStatusList,

      afterSaleList: [
        { label: '取消中', value: 5 },
        { label: '已取消', value: 6 },
        { label: '退货退款中', value: 7 },
        { label: '退款成功', value: 9 },
        { label: '退款失败', value: 10 }
      ],
      rowData: '', // 操作行数据
      multipleSelection: [],
      colorVisible: false,
      mall_compare: true, // 全店同步
      showConsole: false, // 隐藏日志
      selType: 'orderSn', // 订单编号 采购物流单号 采购单号
      inputDes: '',
      cloumn_date1: [],
      cloumn_date2: [],
      query: {
        sysMallIds: '', // 店铺ids
        refundStatus: [''], // 售后状态
        color: '', // 颜色标识
        shotOrderStatus: [''], // 拍单状态
        afterApplyTime: '', // 申请时间
        createdTime: '', // 创建时间
        colorLabelId: 0 // 颜色标识id
      },
      page: 1,
      pageSize: 20,
      total: 0,
      tableList: [],
      loading: false,
      buyerAccountList: [],
      searchMallList: [],
      statusAfterList: statusAfterList,
      showConsole: true,
      colorRow: {},
      colorList: [],
      colorVisible: false,
      colorRadio: '',
      selectColorList: [],
      categoryInfo: {}
    }
  },
  computed: {
    getCategoryName() {
      return function(id, country) {
        if (!this.categoryInfo[id]) {
          this.categoryInfo[id] = '正在获取类目...'
          this.getCategoryInfo(id, country)
          return this.categoryInfo[id] || ''
        }
        return this.categoryInfo[id] || ''
      }
    }
  },
  mounted() {
    this.loading = true
    this.getBuyerList() // 获取买手号信息
    this.getColorList()
    this.cloumn_date1 = creatDate(15)
    setTimeout(() => {
      this.search()
    }, 2000)
  },
  methods: {
    async clickBuyOrder(row) {
      console.log(row, 'row', this.buyerAccountList)
      if (!row.shot_order_info.buy_account_info) {
        return this.$message.warning('订单无买手号信息')
      }
      const buy = this.buyerAccountList.find((n) => n.name === row.shot_order_info.buy_account_info.name && n.type == row.shot_order_info.buy_account_info.type)
      let account = ''
      if (!buy) {
        return this.$message.warning(`请登录相应买手号！${row.shot_order_info.buy_account_info.name || '订单无买手号信息'}`)
      }
      switch (buy.type) {
        case 1:
          account = this.changeAccountParams(buy)
          await this.$buyerAccountService.pddOrderCenter(account, row.shot_order_info.shot_order_sn)
          break
        case 2:
        case 3:
          account = this.changeAccountParams(buy)
          await this.$buyerAccountService.taobaoOrderCenter(account, row.shot_order_info.shot_order_sn)
          break
        case 8:
          account = this.changeAccountParams(buy)
          await this.$buyerAccountService.AlibabaOrderCenter(account, row.shot_order_info.shot_order_sn)
          break
        case 9:
          account = this.changeAccountParams(buy)
          await this.$buyerAccountService.lazadaOrderCenter(row.country, account, row.shot_order_info.shot_order_sn)
          break
        case 11:
          let url = ''
          if (row.shot_order_info.buy_account_info.orderType) {
            url = `/user/purchase/order/${row.shot_order_info.buy_account_info.orderId}?type=${row.shot_order_info.buy_account_info.orderType}`
          } else {
            url = `/user/purchase/order/${row.shot_order_info.buy_account_info.orderId}/?shopid=${row.shot_order_info.shop_id}`
          }
          account = this.changeAccountParams(buy)
          await this.$buyerAccountService.shopeeOrderCenter(row.country, account, url)
          break
        default:
          break
      }
    },
    changeSelect(val, key, baseData) {
      if (!val.includes('') && val.length === baseData.length) {
        // this.formData.sysMallId.unshift('全选')
      } else if (val.includes('') && val.length - 1 < baseData.length) {
        this.query[key] = this.query[key].filter((item) => {
          return item !== ''
        })
      }
    },
    // 全选
    selectAll(key, baseData) {
      if (this.query[key].length < baseData.length) {
        this.query[key] = []
        baseData.map((item) => {
          this.query[key].push(item.value || item.ShipId)
        })
      } else {
        this.query[key] = []
      }
    },
    // 同步此订单
    async SyncOrderSingle(row) {
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`【${row.order_id}】开始同步，请耐心等待!`, true)
      const orderService = new orderSync()
      await orderService.startSingel(row, this.$refs.Logs.writeLog)
    },
    changeTime(val, key, subKey) {
      const days = getDaysBetween(new Date(val[0]).getTime(), new Date(val[1]).getTime())
      if (days > 93) {
        if (subKey) {
          this[key][subKey] = creatDate(30)
        } else {
          this[key] = creatDate(30)
        }
        return this.$message.warning(`只支持查询或导出93天内的数据,请重新选择时间！`)
      }
      console.log(days, val, 'time-time')
    },
    // 拒绝-接受
    async respondCancelRequest(type, typeC) {
      if (!this.multipleSelection.length) {
        return this.$message.warning('请选择要操作的数据')
      }
      this.showConsole = false
      for (let i = 0; i < this.multipleSelection.length; i++) {
        const order = this.multipleSelection[i]
        const params = {
          action: type,
          order_id: order.order_id,
          mallId: order.mall_info.platform_mall_id
        }
        const res = await this.$shopeemanService.respondCancelRequest(order.country, params)
        if (res.code === 200) {
          this.$refs.Logs.writeLog(`订单【${order.order_sn}】${typeC}买家取消订单操作成功`, true)
        } else {
          if (res.code === 403) {
            this.$refs.Logs.writeLog(`订单【${order.order_sn}】${typeC}买家取消订单操作失败，店铺未登录`, false)
          } else {
            if (res.data.indexOf('order not ready to cancel') > -1) {
              // code 120410416
              this.$refs.Logs.writeLog(`订单【${order.order_sn}】${typeC}该订单状态无法执行此操作，可能已回复，请知悉！`, true)
            } else {
              this.$refs.Logs.writeLog(`订单【${order.order_sn}】${typeC}买家取消订单操作失败，${res.data}`, false)
            }
          }
        }
      }
    },
    // 商品删除
    async goodsDelete(row) {
      this.$confirm('是否删除该商品?', '商品删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setGoodsDelete(this, row)
        })
        .catch(() => {})
    },
    // 商品下架
    async goodsDelist(row) {
      this.$confirm('是否下架该商品?', '商品下架', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          setGoodsDelist(this, row)
        })
        .catch(() => {})
    },
    // 转换颜色标识名
    changeColorLabel(colorId, type) {
      const colorInfo = this.colorList.find((item) => item.id == colorId)
      if (type === 'name') {
        return colorInfo && colorInfo.id !== 0 ? colorInfo.name : ''
      }
      return colorInfo ? colorInfo.color : ''
    },
    async setColorSingle(row) {
      this.clickRow = row
      this.multipleSelection = [row]
      this.colorVisible = true
    },
    // 设置颜色
    async setColor(arrData) {
      let ids = ''
      arrData.forEach((item, index) => {
        if (index === 0) {
          ids = item.id
        } else {
          ids = ids + ',' + item.id
        }
      })
      const params = {
        sysOrderIds: ids,
        id: this.colorRow.id
      }
      const res = await this.$api.setColorLabel(params)
      if (res.data.code === 200) {
        arrData.forEach((item) => {
          const index = this.tableList.findIndex((n) => n.id == item.id)
          if (index > -1) {
            this.tableList[index].color_id = this.colorRow.id
          }
        })
        this.colorVisible = false
        this.colorRow = {}
        this.$message.success('设置成功')
      } else {
        this.$message.error(`设置失败-${res.data.message}`)
      }
    },
    // 获取标识选择
    async getColorList() {
      const res = await this.$api.colorLabelList()
      if (res.data.code === 200) {
        this.selectColorList = JSON.parse(JSON.stringify(res.data.data))
        this.colorList = res.data.data
        const obj = {
          id: 0,
          name: '取消标识',
          color: ''
        }
        this.colorList.unshift(obj)
      }
    },
    // 颜色标识
    getCurrentRow(row) {
      this.colorRow = row
    },
    // 同步售后订单
    async syncAfterOrder(row) {
      let mallList = []
      this.showConsole = false // 打开日志
      this.$refs.Logs.consoleMsg = ''
      console.log(row)
      if (row) {
        mallList = [row.mall_info]
      } else {
        if (this.mall_compare) {
          // 全店同步
          const res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
          const mallObject = res && JSON.parse(res)
          if (mallObject) {
            for (const key in mallObject) {
              mallList.push(mallObject[key])
            }
          }
        } else {
          mallList = this.searchMallList
        }
      }
      if (mallList.length == 0) {
        this.$refs.Logs.writeLog('店铺数据为空，同步操作已取消!', false)
        return
      }
      console.log(mallList)
      this.$refs.Logs.writeLog(`开始同步售后订单，请耐心等待!`, true)
      for (let mI = 0; mI < mallList.length; mI++) {
        const mall = mallList[mI]
        for (let i = 0; i < statusAfterList.length; i++) {
          // 同步状态
          const statusObj = statusAfterList[i]
          console.log(mall, 'mall')
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${mallList.length}`, 'manual', 60)
        }
      }
      this.$refs.Logs.writeLog('售后订单同步已完成！！！', true)
    },
    // 修改备注
    editRemark(activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      console.log(this.tableList)
      const index = this.tableList.findIndex(son => son.id === activeRemarkID)
      this.orderRemark = this.tableList[index].remark
    },
    // 修改单个备注
    async changeRemark(val) {
      // const index = this.tableList.findIndex(son => son.id === val.id)
      const res = await this.$api.setLocalRemark({ id: val.id, remark: this.orderRemark })
      console.log('----', res)
      if (res.data.code === 200) {
        this.$message.success(`设置备注成功`)
        this.$set(val, 'remark', this.orderRemark)
        // this.tableList[index].remark = this.orderRemark
        this.activeRemarkID = ''
        return
      }
      this.$message.error(`设置备注失败`)
      this.activeRemarkID = ''
    },
    // async changeRemark(row) {
    //   // row.isChecked = false
    //   const res = await this.$api.orderSaveRemark({
    //     id: row.id,
    //     remark: row.remark,
    //   })
    //   if (res.data.code !== 200) {
    //     this.$message.error(`修改失败:${res.data.message}`, false)
    //     return
    //   }
    //   this.activeRemarkID = ''
    //   this.$message.success(`修改成功`, true)
    // },
    // 打开订单页面
    viewDetails(type, id, shopId) {
      const reqStr = {
        type: type,
        shopId: shopId,
        id: id
      }
      this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
    },
    // 打开外部窗口
    async openUrl(data, type) {
      let url = data
      if (type === 'product') {
        const params = {
          platform_mall_id: data.mall_info.platform_mall_id
        }
        const webUrl = await this.$shopeemanService.getWebUrl(data.country, params)
        console.log(webUrl, 'webUrl', data.country)
        url = webUrl + '/product' + '/' + data.mall_info.platform_mall_id + '/' + data.goods_info.goods_id
      }
      this.$BaseUtilService.openUrl(url)
    },
    // 打开第三方窗口
    open(type, goodsid, shopId, des) {
      if (des === 'orderID') {
        // 订单ID
        const reqStr = {
          type: type,
          shopId: shopId,
          id: goodsid
        }
        this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
      }
      if (des === 'goodsID') {
        // 商品ID
        window.BaseUtilBridgeService.openUrl('https://id.xiapibuy.com/product/' + shopId + '/' + goodsid)
      }

      if (des === 'orderGoodsID') {
        // 采购商品id
        window.BaseUtilBridgeService.openUrl('http://mobile.yangkeduo.com/goods.html?goods_id=' + goodsid)
      }
    },
    // 获取订单详情
    async getBuyerList() {
      const res = await this.$api.getBuyerList()
      if (res.data.code === 200) {
        this.buyerAccountList = res.data.data
      }
      console.log('getBuyerList', this.buyerAccountList)
    },
    getorderDetail(row) {
      console.log('row', row)
      if (!row.shot_order_info.buy_account_info) {
        this.$message.warning('云端没有此账户信息，请让拍单人员上传或登录')
        return
      }
      let userInfo = null
      this.buyerAccountList.forEach((item) => {
        if (item.name === row.shot_order_info.buy_account_info.name && item.type === row.shot_order_info.buy_account_info.name) {
          userInfo = item
        }
      })
      const account = this.changeAccountParams(userInfo) // 获取账号全部信息
      const type = this.changeType(account)
      const params = this.changeAccountParams(account)
      // type
      // 暂无数据****
    },
    changeType(type) {
      switch (type) {
        // pdd
        case 1:
          return 1
        // tb
        case 2:
          return 0
        // 1688
        case 8:
          return 5
        // jingxi
        case 10:
          return 3
        // lazada
        case 9:
          return 7
        // shopee
        case 11:
          return 8
        default:
          return type
      }
    },
    // 转换参数为壳需要
    changeAccountParams(account) {
      const params = {
        UserNameCache: account.cache_path,
        Password: '',
        shotOrderPlatform: this.changeType(account.type),
        LoginedCookies: account.login_info,
        UserName: account.name,
        Cookiestr: JSON.stringify(account.login_info),
        AccountType: account.type,
        Ua: account.ua,
        Country: account.site || ''
      }
      return params
    },
    // 获取导出数据
    async getExportData() {
      let sysMallId = ''
      this.searchMallList.forEach((item, index) => {
        if (index === 0) {
          sysMallId = item.id
        } else {
          sysMallId = sysMallId + ',' + item.id
        }
      })
      this.query.createdTime = this.cloumn_date1 && this.cloumn_date1.length > 0 ? this.cloumn_date1.join('/').toString() : ''
      this.query.afterApplyTime = this.cloumn_date2 && this.cloumn_date2.length > 0 ? this.cloumn_date2.join('/').toString() : ''
      const params = this.query
      params.sysMallIds = sysMallId
      params[this.selType] = this.inputDes
      params['shotOrderStatus'] = this.query.shotOrderStatus.join(',')
      params['refundStatus'] = this.query.refundStatus.join(',')
      params.page = 1
      params.pageSize = 200
      this.loading = true
      const { data } = await this.$api.aftermarket(params)
      let exportData = []
      let dataFlag = (data && data.code === 200 && data.data.data && data.data.data) || []
      while (dataFlag && dataFlag.length) {
        exportData = exportData.concat(dataFlag)
        params.page++
        const { data } = await this.$api.aftermarket(params)
        dataFlag = (data && data.code === 200 && data.data.data && data.data.data) || []
      }
      this.loading = false
      this.tableToExcel(exportData)
    },
    // 导出
    tableToExcel(exportData) {
      if (!exportData.length) {
        this.$message.warning('没有可导出的数据！')
        return
      }
      let num = 1
      let str = `<tr>
            <td>编号</td>
            <td>站点</td>
            <td>店铺名称</td>
            <td>颜色标识</td>
            <td>订单编号</td>
            <td>退款金额</td>
            <td>采购价</td>
            <td>采购价(RMB)</td>
            <td>售后状态</td>
            <td>申请时间</td>
            <td>售后原因</td>
            <td>本地备注</td>
            <td>采购状态</td>
            <td>商品ID</td>
            <td>商品数量</td>
            <td>商品图片</td>
            <td>商品类目</td>
            <td>商品规格</td>
            <td>采购商品ID</td>
            <td>采购订单号</td>
            <td>采购时间</td>
            <td>采购物流单号</td>
            <td>采购账号</td>
            <td>订单创建时间</td>
            <td>退货物流号</td>
            <td>退货地址</td>
            <td>退货邮寄地址</td>
            </tr>`
      const arr = exportData
      arr.forEach((item) => {
        str += `<tr><td>${num++}</td>
                <td>${item.mall_info && item.mall_info.country ? this.$filters.chineseSite(item.mall_info.country) : '' + '\t'}</td>
                <td>${item.mall_info && item.mall_info.platform_mall_name ? item.mall_info.platform_mall_name : '' + '\t'}</td>
                <td>${item.color_id ? this.changeColorLabel(item.color_id, 'name') : '-' + '\t'}</td>
                <td style="mso-number-format:'\@';">${item.order_sn ? item.order_sn : '' + '\t'}</td>
                <td>${item.refund_amount ? item.refund_amount : '' + '\t'}</td>
                <td>${(item.shot_order_info?.shot_amount || '') + this.$filters.siteCoin(item.country) + '\t'}</td>
                <td>${(item.shot_order_info?.shot_amount_rmb || '') + '\t'}</td>
                <td>${item.status ? changeOrderStatus(item.status) : '' + '\t'}</td>
                <td>${item.update_time ? item.update_time : '' + '\t'}</td>
                <td>${item.after_reason ? item.after_reason : '' + '\t'}</td>
                <td>${item.remark ? item.remark : '' + '\t'}</td>
                <td>${item.shot_order_info && item.shot_order_info.shot_statu ? changeShotStatus(item.shot_order_info.shot_status) : '' + '\t'}</td>
                <td>${item.goods_info.goods_id ? item.goods_info.goods_id : '' + '\t'}</td>
                <td>${item.goods_info.goods_count ? item.goods_info.goods_count : '' + '\t'}</td>
                <td>${this.$filters.imageRender([item.image]) + '\t'}</td>
                <td>${item.goods_info.goods_category_id ? this.getCategoryName(item.goods_info.goods_category_id, item.country) : '' + '\t'}</td>
                <td>${item.goods_info.goods_spec ? item.goods_info.goods_spec : '' + '\t'}</td>
                <td>${item.shot_order_info.shot_order_sn ? item.shot_order_info.shot_order_sn : '' + '\t'}</td>
                <td>${item.shot_order_info.shotted_at ? item.shot_order_info.shotted_at : '' + '\t'}</td>
                <td>${item.shot_order_info.shot_tracking_number ? item.shot_order_info.shot_tracking_number : '' + '\t'}</td>
                 <td>${item.shot_order_info.buy_account ? item.shot_order_info.buy_account : '' + '\t'}</td>
              <td>${item.after_created_at ? item.after_created_at : '' + '\t'}</td>
               <td>${item.return_tracking_number ? item.return_tracking_number : '' + '\t'}</td>
               <td>${item.return_address ? item.return_address : '' + '\t'}</td>
               <td>${item.return_pickup_address ? item.return_pickup_address : '' + '\t'}</td>
                </tr>`
      })
      exportExcelDataCommon('虾皮售后数据', str)
      // this.setSelect() // 清空列表
    },
    generateUUID() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = (d + Math.random() * 16) % 16 | 0
        d = Math.floor(d / 16)
        return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
      })
      return uuid
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('multipleSelection', this.multipleSelection)
    },
    // 递增
    indexMethod(index) {
      index = index + 1 + (this.page - 1) * this.pageSize
      return index
    },
    // 采购状态变更
    setShotStatusFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.shotVisible = true
    },
    async setShotStatus(arr) {
      if (!arr.length) {
        return this.$message.warning('请选择数据')
      }
      if (this.shotstatus === '') {
        return this.$message.warning('请选择变更状态')
      }
      this.isLoading = true
      const list = []
      const query = {
        sysOrderIds: '',
        status: this.shotstatus
      }
      arr.forEach((item) => {
        list.push(item.sys_order_id)
      })
      query.sysOrderIds = list.toString() || ''
      try {
        const res = await this.$api.updateShotStatus(query)
        const data = res.data
        if (data.code === 200) {
          this.$message.success('操作成功')
          arr.forEach((item) => {
            const index = this.tableList.findIndex((n) => n.id == item.id)
            if (index > -1) {
              this.tableList[index].shot_order_info.shot_status = this.shotstatus
            }
          })
        } else {
          this.$message.error('操作失败')
        }
        // 清理数据、刷新
        this.shotVisible = false
        this.isLoading = false
      } catch (err) {
        // this.setSelect()
        this.shotVisible = false
        console.log(err)
        this.isLoading = false
      }
    },
    // 设置订单颜色标识
    setColorLabelFun() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请勾选需要操作的数据')
        return
      }
      this.colorVisible = true
    },
    changeMallList(val) {
      this.searchMallList = val
    },
    async getCategoryInfo(id, country) {
      const res = await this.$commodityService.getCategoryTbInfo(country, id.toString(), '0', '')
      const resObj = res && JSON.parse(res)
      if (resObj && resObj.code === 200 && resObj.data.categories && resObj.data.categories.length) {
        this.categoryInfo[id] = resObj.data.categories[0].category_cn_name || ''
      } else {
        this.categoryInfo[id] = '类目获取失败'
      }
    },
    // 获取类目
    // async getCategoryInfo(country, cateId) {
    //   if (this.categoryInfo[cateId]) {
    //     return this.categoryInfo[cateId]
    //   } else {
    //     this.categoryInfo[cateId] = ''
    //     let res = await this.$commodityService.getCategoryTbInfo(country, cateId.toString(), '0', '')
    //     let resObj = res && JSON.parse(res)
    //     // console.log(resObj, '类目')
    //     if (resObj && resObj.code === 200 && resObj.data.categories && resObj.data.categories.length) {
    //       let categoryName = resObj.data.categories[0].category_cn_name
    //       this.categoryInfo[cateId] = categoryName
    //       // console.log(this.categoryInfo[cateId], categoryName)
    //       return categoryName
    //     } else {
    //       return ''
    //     }
    //   }
    // },
    // 搜索
    async search(page) {
      let params = {}
      const sysMallIdList = []
      this.page = page || this.page
      this.searchMallList.forEach((item) => {
        sysMallIdList.push(item.id)
      })
      this.query.createdTime = this.cloumn_date1 && this.cloumn_date1.length > 0 ? this.cloumn_date1.join('/').toString() : ''
      this.query.afterApplyTime = this.cloumn_date2 && this.cloumn_date2.length > 0 ? this.cloumn_date2.join('/').toString() : ''
      console.log(this.query, 'query')
      params = JSON.parse(JSON.stringify(this.query))
      params.sysMallIds = sysMallIdList.toString()
      params[this.selType] = this.inputDes
      params['refundStatus'] = this.query.refundStatus.join(',')
      params['shotOrderStatus'] = this.query.shotOrderStatus.join(',')
      params.page = this.page
      params.pageSize = this.pageSize
      this.loading = true
      this.tableList = []
      try {
        const res = await this.$api.aftermarket(params)
        this.loading = false
        if (res.status === 200) {
          const list = res.data.data.data || []
          this.tableList = list
          this.total = res.data.data.total
          // this.$nextTick(() => {
          //   this.getCate()
          // })
        } else {
          this.$message.error('数据请求失败')
        }
      } catch (error) {
        console.log('初始化', error)
        this.loading = false
      }
      console.log(this.tableList)
    },
    async getCate() {
      this.tableList.forEach(async(row, i) => {
        // row.isChecked = false
        // row.categoryName = ''
        // row.categoryName = await this.getCategoryInfo(row.country, row.goods_info.goods_category_id)
      })
    },
    changeOrderStatus,
    changeShotStatus,
    // 分页
    handleSizeChange(val) {
      this.page = 1
      this.pageSize = val
      this.search()
    },
    handleCurrentChange(val) {
      this.page = val
      this.search()
    },
    // 复制
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
    }
  }
}
</script>
<style lang="less">
.detai {
  min-width: 1280px;
  padding: 10px;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .tableActive {
    color: red;
    cursor: pointer;
  }
  .copyStyle {
    margin-right: 8px;
    cursor: pointer;
  }
  .btnWidth {
    width: 150px;
  }
  .mar-left {
    margin-left: 10px;
  }
  .condition {
    padding: 16px;
    display: flex;
    background: #fff;
    overflow: auto;
    .left-box {
      width: 350px;
    }
    .right-box {
      flex: 1;
    }
    .row {
      display: flex;
      margin-bottom: 5px;
      align-items: center;
      .row_item {
        margin-left: 20px;
        margin-right: 10px;
        /deep/.el-select__tags {
          max-width: 153px !important;
          display: flex;
          flex-wrap: nowrap;
          overflow: hidden;
        }
      }
    }
  }
  .base-box {
    border: 1px solid #dcdcdc;
    border-radius: 4px;
    padding: 10px;
    position: relative;
    // min-width: 380px;
    height: 100%;
    .base-title {
      padding: 0 5px;
      display: inline-block;
      height: 20px;
      line-height: 20px;
      text-align: center;
      background: #fff;
      position: absolute;
      left: 10px;
      top: -10px;
    }
    .base-item {
      display: flex;
      flex-wrap: wrap;

      /deep/ .el-range-input {
        width: 70px
      }
      /deep/ .el-range-separator {
        width: 5px;
        padding: 0;
      }
    }
  }
  .table-form {
    border: 0.5px solid rgb(224, 224, 224);
    margin-top: 10px;
    background: #fff;
  }
}
.mar-right {
  margin-right: 10px;
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  height: 35px;
}
.colorBox {
  height: 30px;
  width: 80px;
}
.color-dialog {
  margin-bottom: 30px;
}
</style>

