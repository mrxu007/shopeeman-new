<template>
  <div class="detai">
    <div class="condition">
      <div class="left-box mar-right">
        <div class="base-box">
          <span class="base-title">基础操作</span>
          <div class="base-item">
            <div class="row">
              <el-button size="mini" type="primary" @click="setShotStatusFun">采购状态变更</el-button>
              <el-button size="mini" type="primary" @click="syncAfterOrder">售后同步</el-button>
              <el-checkbox v-model="mall_compare" class="row_item">全店同步</el-checkbox>
              <el-button size="mini" type="primary" @click="getExportData">导出数据</el-button>
            </div>
            <div class="row">
              <el-button size="mini" type="primary" @click="optionOrder('reject')">批量拒绝买家取消订单</el-button>
              <el-button size="mini" type="primary" @click="optionOrder('accept')">批量接受买家取消订单</el-button>
            </div>
            <div class="row">
              <el-button size="mini" type="primary" @click="colorVisible = true">批量标记颜色标识</el-button>
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
                  style="width: 324px"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="-"
                  :picker-options="pickerOptions"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
                />
              </div>
            </div>

            <div class="row">
              <div class="row_item">
                <label>售后状态：</label>
                <el-select v-model="query.shotOrderStatus" size="mini" style="width: 100px">
                  <el-option label="全部" value="" />
                  <el-option label="取消中" value="5" />
                  <el-option label="已取消" value="6" />
                  <el-option label="退货退款中" value="7" />
                  <el-option label="退款成功" value="9" />
                  <el-option label="退款失败" value="10" />
                </el-select>
              </div>

              <div class="row_item">
                <label>采购状态：</label>
                <el-select v-model="query.refundStatus" size="mini" style="width: 180px">
                  <el-option label="全部" value="" />
                  <el-option label="待拍单" value="1" />
                  <el-option label="拍单中" value="2" />
                  <el-option label="拍单成功" value="3" />
                  <el-option label="拍单失败" value="4" />
                </el-select>
              </div>

              <div class="row_item">
                <label>颜色标识：</label>
                <el-select v-model="query.colorLabelId" size="mini" style="width: 180px">
                  <el-option label="全部" value="" />
                  <el-option v-for="item in colorList" :key="item.id" :label="item.label" :value="item.id" :style="item.color" />
                </el-select>
              </div>

              <div class="row_item">
                <label>申请时间：</label>
                <el-date-picker
                  v-model="cloumn_date2"
                  size="mini"
                  style="width: 324px"
                  type="datetimerange"
                  value-format="yyyy-MM-dd HH:mm:ss"
                  range-separator="-"
                  :picker-options="pickerOptions"
                  start-placeholder="开始日期"
                  end-placeholder="结束日期"
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
                <el-button size="mini" type="primary" style="margin-right: 10px" @click="search">搜索</el-button>
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
      <el-table
        ref="multipleTable"
        width="100%"
        height="calc(100vh - 243px)"
        v-loading="loading"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column label="站点" prop="country" min-width="100px" fixed align="center">
          <template slot-scope="{ row }"
            ><span>{{ row.mall_info.country | chineseSite }}</span></template
          >
        </el-table-column>
        <el-table-column label="店铺名称" prop="mall_info.platform_mall_name" min-width="120px" fixed align="center" />
        <el-table-column align="center" prop="color_id" label="颜色标识" min-width="70">
          <template slot-scope="scope">
            <p :style="{ background: changeColorLabel(scope.row.color_id), height: '26px' }"></p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="color_id" label="标识名称" min-width="70">
          <template slot-scope="scope">
            <span>{{ changeColorLabel(scope.row.color_id, 'name') }}</span>
          </template>
        </el-table-column>
        <el-table-column label="订单编号" prop="order_sn" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span>
              <el-button type="text" @click.native="open('orderDetail', row.order_id, row.mall_info.platform_mall_id, 'orderID')">
                {{ row.order_sn }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.order_sn)"> <i class="el-icon-document-copy" /></el-button>
            </span>
          </template>
        </el-table-column>
        <el-table-column label="退款金额" prop="refund_amount" min-width="100px" align="center" />
        <el-table-column label="售后状态" prop="status" min-width="100px" align="center">
          <template slot-scope="{ row }"
            ><div>{{ sta[row.status] }}</div></template
          ></el-table-column
        >
        <el-table-column label="申请时间" prop="update_time" min-width="180px" align="center" />
        <el-table-column label="采购状态" prop="shot_order_info.shot_status" min-width="90px" align="center">
          <template slot-scope="{ row }"
            ><span>{{ shot_status[row.shot_order_info.shot_status] }}</span></template
          ></el-table-column
        >
        <el-table-column label="售后原因" prop="after_reason" min-width="100px" align="center" />
        <el-table-column label="本地备注" prop="remark" min-width="180px" align="center">
          <template v-slot="{ row }">
            <el-input v-if="row.isChecked" v-model="row.remark" v-fo size="mini" resize="none" placeholder="本地备注" @blur="changeRemark(row)" />
            <span v-else @click="row.isChecked = true">
              <el-input v-model="row.remark" :disabled="!row.isChecked" size="mini" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="商品ID" prop="goods_info.goods_id" min-width="150px" align="center">
          <template slot-scope="{ row }">
            <span>
              <el-button type="text" @click.native="open(null, row.goods_info.goods_id, row.mall_info.platform_mall_id, 'goodsID')">
                {{ row.goods_info.goods_id }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.goods_info.goods_id)"> <i class="el-icon-document-copy" /></el-button
            ></span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量" prop="goods_info.goods_count" min-width="150px" align="center" />
        <el-table-column label="商品图片" prop="goods_info.goods_img" min-width="100px" align="center">
          <template slot-scope="{ row }">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
              <div slot="content">
                <el-image :src="[row.country, row.goods_info.ori_platform_mall_id, row.goods_info.goods_img] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image :src="[row.country, row.goods_info.ori_platform_mall_id, row.goods_info.goods_img] | imageRender" style="width: 56px; height: 56px" />
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="商品类目" prop="goods_info.goods_category_id" min-width="100px" align="center" />
        <el-table-column label="商品规格" prop="goods_info.goods_spec" min-width="100px" align="center" />
        <el-table-column label="采购商品ID" prop="goods_info.ori_goods_id" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.goods_info.ori_goods_id">
              <el-button type="text" @click.native="open(null, row.goods_info.goods_id, null, 'orderGoodsID')">
                {{ row.goods_info.ori_goods_id }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.goods_info.ori_goods_id)"> <i class="el-icon-document-copy" /></el-button
            ></span>
          </template>
        </el-table-column>
        <el-table-column label="采购订单号" prop="shot_order_info.shot_order_sn" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.shot_order_info.shot_order_sn">
              <el-button type="text" @click.native="getorderDetail(row)">
                {{ row.shot_order_info.shot_order_sn }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.shot_order_info.shot_order_sn)"> <i class="el-icon-document-copy" /></el-button
            ></span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="采购价" prop="" min-width="100px" align="center" /> -->
        <el-table-column label="采购时间" prop="shot_order_info.shotted_at" min-width="180px" align="center" />
        <el-table-column label="采购物流单号" prop="shot_order_info.shot_tracking_number" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.shot_order_info.shot_tracking_number"
              >{{ row.shot_order_info.shot_tracking_number }}
              <el-button type="text" class="copyIcon" @click="copy(row.shot_order_info.shot_tracking_number)"> <i class="el-icon-document-copy" /></el-button
            ></span>
          </template>
        </el-table-column>
        <el-table-column label="采购账号" prop="shot_order_info.buy_account" min-width="180px" align="center" />
        <el-table-column label="订单创建时间" prop="after_created_at" min-width="180px" align="center" />
        <el-table-column label="订单截止发货时间" prop="" min-width="180px" align="center" />
        <el-table-column label="退货物流号" prop="return_tracking_number" min-width="180px" align="center" />
        <el-table-column label="退件发货地址" prop="return_delivery_time" min-width="200px" align="center" />
        <el-table-column label="退货地址" prop="return_address" min-width="200px" align="center" />
        <el-table-column label="退货邮寄地址" prop="return_pickup_address" min-width="200px" align="center" />
        <el-table-column label="操作" prop="" min-width="150px" fixed="right" align="center">
          <template v-slot="{ row, $index }">
            <el-dropdown style="width: 100px; margin-left: 10px">
              <el-button style="width: 100px" size="mini" plain type="primary"> 更多操作<i class="el-icon-arrow-down el-icon--right" /> </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div class="dropdownItem" @click="goodsDelete(row)">删除商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="goodsDelist(row)">下架商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click=";(shotVisible = true), (rowData = row)">修改采购状态</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="syncAfterOrder(row)">同步此店铺售后订单</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="setColorSingle(row, $index)">订单颜色标识</div></el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
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
    <Logs ref="Logs" clear v-model="showConsole" />
    <el-dialog title="选择颜色标识" :visible.sync="colorVisible" width="600px" :close-on-click-modal="false" v-if="colorVisible">
      <div class="color-style">
        <el-table ref="colorTable" :data="colorList" tooltip-effect="dark" style="width: 100%" height="500">
          <el-table-column label="标识选择" width="100">
            <template slot-scope="scope">
              <el-radio :label="scope.$index" v-model="colorRadio" @change.native="getCurrentRow(scope.row)"></el-radio>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="颜色">
            <template slot-scope="scope">
              <div class="colorBox" :style="{ background: scope.row.color }"></div>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="标识名称"></el-table-column>
        </el-table>
      </div>
      <span slot="footer">
        <el-button type="primary" size="mini" @click="setColor(multipleSelection)">设置颜色</el-button>
      </span>
    </el-dialog>

    <!-- 批量更改采购状态 colorLabelId1  -->
    <el-dialog title="采购状态变更" class="dialog-color" width="300px" :close-on-click-modal="false" :visible.sync="shotVisible" @closed="closeDialog">
      <div class="color-dialog">
        <div class="form-item">
          <span class="search-title">状态：</span>
          <el-select v-model="shotstatus" size="mini" style="width: 150px; margin-right: 10px" clearable>
            <el-option v-for="item in shotstatusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" size="mini" @click="setShotStatus">保存</el-button>
        </div>
      </div>
    </el-dialog>
  </div>
</template>
<script>
// import orderApi from '../../../module-api/order-manager-api/order-data'
import storeChoose from '../../../components/store-choose.vue'
import { colorLabelList, getMalls, getValue, exportExcelDataCommon, creatDate } from '../../../util/util'
import { statusAfterList } from './orderCenter/orderCenter'
import orderSync from '../../../services/timeOrder'
import { setGoodsDelist, setGoodsDelete } from './orderCenter/handleGoods'
export default {
  components: {
    storeChoose,
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      orderRemark: '',
      activeRemarkID: 0,
      shotVisible: false,
      shotstatus: '', // 采购状态
      shotstatusList: [
        { label: '待拍单', value: 1 },
        { label: '拍单中', value: 2 },
        { label: '拍单成功', value: 3 },
        { label: '拍单失败', value: 4 },
        { label: '待支付', value: 5 },
        { label: '已完成', value: 6 },
        { label: '已取消', value: 7 },
        { label: '已申请退款', value: 8 },
        { label: '退款成功', value: 9 },
        { label: '付款失败', value: 10 },
      ],
      sta: {
        5: '取消中',
        6: '已取消',
        7: '退货退款中',
        9: '退款成功',
        10: '退款失败',
      },
      shot_status: {
        1: '待拍单',
        2: '拍单中',
        3: '拍单完成，待上家发货',
        4: '上家已发货',
        5: '待支付',
        6: '已完成',
        7: '已取消',
        8: '已申请退款',
        9: '退款成功',
        10: '付款失败',
      },
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
        cerateTime: '', // 创建时间
        saleStatus: '', // 售后状态
        refundStatus: '', // 采购状态
        color: '', // 颜色标识
        // orderSn: '', // 订单编号
        // trackingNumber: '', // 采购物流单号
        // shotOrderSn: '', // 采购单号
        shotOrderStatus: '', // 拍单状态
        afterApplyTime: '', // 申请时间
        createdTime: '', // 创建时间
        colorLabelId: '', // 颜色标识id
      },
      page: 1,
      pageSize: 20,
      total: 0,
      tableList: [],
      loading: false,
      // orderInstance: new orderApi(this),
      buyerAccountList: [],
      searchMallList: [],
      statusAfterList: statusAfterList,
      showConsole: true,
      colorRow: {},
      colorList: [],
      colorVisible: false,
      colorRadio: '',
    }
  },
  mounted() {
    // this.getInfo() // 初始化数据
    this.getBuyerList() // 获取买手号信息
    this.getColorList()
    this.cloumn_date2 = creatDate(30)
    setTimeout(() => {
      this.search()
    }, 2000)
  },
  methods: {
    //商品删除
    async goodsDelete(row) {
      this.$confirm('是否删除该商品?', '商品删除', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          setGoodsDelete(this, row)
          // this.setGoodsDelete(row)
        })
        .catch(() => {})
    },
    //商品下架
    async goodsDelist(row) {
      this.$confirm('是否下架该商品?', '商品下架', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning',
      })
        .then(() => {
          setGoodsDelist(this, row)
        })
        .catch(() => {})
    },

    //转换颜色标识名
    changeColorLabel(colorId, type) {
      // console.log('this.colorList', this.colorList)
      let colorInfo = this.colorList.find((item) => item.id == colorId)
      if (type === 'name') {
        return colorInfo ? colorInfo.name : ''
      }
      return colorInfo ? colorInfo.color : ''
    },
    async setColorSingle(row, index) {
      this.clickRow = row
      this.multipleSelection = [row]
      this.colorVisible = true
      await this.getColorList()
    },
    //设置颜色
    async setColor(arrData) {
      let ids = ''
      arrData.forEach((item, index) => {
        if (index === 0) {
          ids = item.id
        } else {
          ids = ids + ',' + item.id
        }
      })
      let params = {
        sysOrderIds: ids,
        id: this.colorRow.id,
      }
      let res = await this.$api.setColorLabel(params)
      if (res.data.code === 200) {
        this.$message.success('设置成功')
        this.closeDialog()
      } else {
        this.$message.error(`设置失败-${res.data.message}`)
      }
    },
    //获取标识选择
    async getColorList() {
      let res = await this.$api.colorLabelList()
      if (res.data.code === 200) {
        this.colorList = res.data.data
      }
    },
    //颜色标识
    getCurrentRow(row) {
      this.colorRow = row
    },
    //同步售后订单
    async syncAfterOrder(row) {
      let mallList = []
      this.showConsole = false //打开日志
      this.$refs.Logs.consoleMsg = ''
      if (row) {
        mallList = [row.mall_info]
      } else {
        if (this.mall_compare) {
          //全店同步
          let res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
          let mallObject = res && JSON.parse(res)
          if (mallObject) {
            for (const key in mallObject) {
              mallList.push(mallObject[key])
            }
          }
          console.log(mallList, JSON.parse(res))
        } else {
          mallList = this.searchMallList
        }
      }
      if (mallList.length == 0) {
        this.$refs.Logs.writeLog('店铺数据为空，同步操作已取消!', false)
        return
      }
      this.$refs.Logs.writeLog(`开始同步售后订单，请耐心等待!`, true)
      for (let mI = 0; mI < mallList.length; mI++) {
        let mall = mallList[mI]
        for (let i = 0; i < statusAfterList.length; i++) {
          //同步状态
          let statusObj = statusAfterList[i]
          const orderService = new orderSync(mall, statusObj, this, this.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${mallList.length}`, 'manual', 7)
        }
      }
      this.$refs.Logs.writeLog('售后订单同步已完成！！！', true)
    },
    // 修改备注
    editRemark(index, activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      this.orderRemark = this.tableList[index].remark
    },
    async changeRemark(row) {
      row.isChecked = false
      const res = await this.$api.orderSaveRemark({
        id: row.id,
        remark: row.remark,
      })
      // debugger
      if (res.data.code !== 200) {
        this.$message.error(`修改失败:${res.data.message}`, false)
        return
      }
      this.$message.success(`修改成功`, true)
    },
    // 下架商品
    // deList(row) {
    //   this.$confirm('是否下架该商品', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {
    //     this.deListFun(row)
    //   })
    // },
    // async deListFun(val) {
    //   const product_id_list = [{ id: Number(val.goods_info.goods_id), unlisted: true }] // unlisted:true 下架  false 发布
    //   const orderinfo = {
    //     country: val.country,
    //     platform_mall_id: val.mall_info.platform_mall_id,
    //     product_id_list,
    //   }
    //   this.loading = true
    //   const res = await this.orderInstance.deListProduct(orderinfo)
    //   this.loading = false
    //   if (res.code === 200) {
    //     this.$message.success('下架成功')
    //   } else {
    //     this.$message.error(res.data)
    //   }
    //   this.search()
    // },
    // 打开第三方窗口
    open(type, goodsid, shopId, des) {
      if (des === 'orderID') {
        // 订单ID
        const reqStr = {
          type: type,
          shopId: shopId,
          id: goodsid,
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
        Country: account.site || '',
      }
      return params
    },
    // 删除
    // delGoods(row) {
    //   this.$confirm('是否要删除该商品', '提示', {
    //     confirmButtonText: '确定',
    //     cancelButtonText: '取消',
    //     type: 'warning',
    //   }).then(() => {
    //     this.delGoodsFun(row)
    //   })
    // },
    // async delGoodsFun(row) {
    //   const orderinfo = {
    //     country: row.country,
    //     platform_mall_id: row.mall_info.platform_mall_id,
    //     product_id_list: [Number(row.goods_info.goods_id)],
    //   }
    //   this.loading = true
    //   const res = await this.orderInstance.deleteProduct(orderinfo)
    //   this.loading = false
    //   console.log('del', res)
    //   if (res.code === 200) {
    //     this.$message.success('删除成功')
    //   } else {
    //     this.$message.error(res.data)
    //   }
    //   this.search()
    // },
    // 批量同意/拒绝买家取消订单
    async optionOrder(type) {
      // 暂时没有需要处理的数据
      this.$message.warning('暂无需要处理的数据')
      // if (!this.multipleSelection.length) {
      //   this.$message.warning('请选择要处理的数据')
      //   return
      // }
      // const list = []
      // this.multipleSelection.forEach(item => {
      //   const orderinfo = {
      //     type: type,
      //     order_id: item.order_id,
      //     country: item.country,
      //     platform_mall_id: item.mall_info.platform_mall_id
      //   }
      //   // debugger
      //   this.orderInstance.refuseCancerOrder(orderinfo).then(res => { list.push(res) })
      // })
    },
    // 初始化时间
    // initDate() {
    //   const d = new Date()
    //   const d1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' 00:00:00'
    //   const d2 = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
    //   this.cloumn_date2 = [d2, d1]
    // },
    //获取导出数据
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
      let params = this.query
      params.sysMallIds = sysMallId
      params[this.selType] = this.inputDes
      params.page = 1
      params.pageSize = 200
      this.loading = true
      const { data } = await this.$api.aftermarket(params)
      let exportData = []
      let dataFlag = (data && data.code === 200 && data.data.data && data.data.data) || []
      console.log(data.data.total)
      while (dataFlag && dataFlag.length) {
        exportData = exportData.concat(dataFlag)
        params.page++
        let { data } = await this.$api.aftermarket(params)
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
                <td>${item.status ? this.sta[item.status] : '' + '\t'}</td>
                <td>${item.update_time ? item.update_time : '' + '\t'}</td>
                <td>${item.after_reason ? item.after_reason : '' + '\t'}</td>
                <td>${item.remark ? item.remark : '' + '\t'}</td>
                <td>${item.shot_order_info && item.shot_order_info.shot_statu ? this.shot_status[item.shot_order_info.shot_status] : '' + '\t'}</td>
                <td>${item.goods_info.goods_id ? item.goods_info.goods_id : '' + '\t'}</td>
                <td>${item.goods_info.goods_count ? item.goods_info.goods_count : '' + '\t'}</td>
                <td>${this.$filters.imageRender([item.platform, item.shopid, item.image]) + '\t'}</td>
                <td>${item.goods_info.goods_category_id ? item.goods_info.goods_category_id : '' + '\t'}</td>
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
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
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
    async setShotStatus() {
      if (this.shotstatus === '') {
        this.$message.warning('请选择变更状态')
        return
      }
      this.isLoading = true
      const list = []
      const query = {
        sysOrderIds: '',
        status: this.shotstatus,
      }
      // rowData为空时,为多选,不同状态sysOrderIds不一样
      if (this.rowData === '') {
        this.multipleSelection.forEach((item) => {
          list.push(item.sys_order_id)
        })
        query.sysOrderIds = list.toString() || ''
      } else {
        query.sysOrderIds = this.rowData.sys_order_id
      }
      try {
        const res = await this.$api.updateShotStatus(query)
        const data = res.data
        if (data.code === 200) {
          this.$message.success('操作成功')
        } else {
          let message = ''
          for (let i = 0; i < data.data.length; i++) {
            const temp = data.data[i]
            if (temp.code !== 200) {
              message = temp.message
              break
            }
          }
          this.$message.warning(message)
        }
        // 清理数据、刷新
        this.shotVisible = false
        this.isLoading = false
        // this.setSelect()
        this.search()
        this.rowData = ''
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
    // 关闭标记颜色弹窗
    closeDialog() {
      // this.setSelect() // 清空选项
      this.colorVisible = false
      // 采购状态清理
      this.shotstatus = ''
      this.shotVisible = false
      this.search()
    },
    // 初始化
    // async getInfo() {
    //   this.initDate()
    //   getMalls().then((res) => {
    //     this.shopAccountList = res
    //     this.query.sysMallIds = []
    //     this.shopAccountList.forEach((item) => {
    //       this.query.sysMallIds.push(item.id)
    //     })
    //     this.search()
    //   })
    // },
    changeMallList(val) {
      this.searchMallList = val
      this.query.sysMallIds = []
      val.forEach((item) => {
        this.query.sysMallIds.push(item.id)
      })
    },
    // 搜索
    search() {
      // this.query.orderSn = ''
      // this.query.trackingNumber = ''
      // this.query.shotOrderSn = ''
      // if (Number(this.selType) === 1) {
      //   this.query.orderSn = this.inputDes
      // }
      // if (Number(this.selType) === 2) {
      //   this.query.trackingNumber = this.inputDes
      // }
      // if (Number(this.selType) === 3) {
      //   this.query.shotOrderSn = this.inputDes
      // }
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
      let params = this.query
      params.sysMallIds = sysMallId
      params[this.selType] = this.inputDes
      params.page = this.page
      params.pageSize = this.pageSize
      this.getTableList(params)
    },
    // 初始化数据
    async getTableList(params) {
      this.loading = true
      this.tableList = []
      try {
        const res = await this.$api.aftermarket(params)
        if (res.status === 200) {
          const list = res.data.data.data || []
          list.forEach((i) => {
            i.isChecked = false
            // i.goods_img= i.goods_info.goods_img
          })
          this.tableList = list
          this.query.page = res.data.data.current_page
          this.total = res.data.data.total
        } else {
          this.$message.error('数据请求失败')
        }
        this.loading = false
      } catch (error) {
        console.log('初始化', error)
        this.loading = false
      }
      console.log(this.tableList)
    },
    // 分页
    handleSizeChange(val) {
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
    },
  },
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
  .condition {
    padding: 16px;
    display: flex;
    background: #fff;
    overflow: auto;
    .left-box {
      width: 400px;
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

