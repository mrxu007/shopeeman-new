<template>
  <div v-loading="loading" class="detai">
    <div class="condition">
      <!-- 第一行 -->
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
          <el-select v-model="query.shotOrderStatus" size="mini" style="width:100px">
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
          <el-select v-model="query.refundStatus" size="mini" style="width: 180px;">
            <el-option label="全部" value="" />
            <el-option label="待拍单" value="1" />
            <el-option label="拍单中" value="2" />
            <el-option label="拍单成功" value="3" />
            <el-option label="拍单失败" value="4" />
          </el-select>
        </div>

        <div class="row_item">
          <label>颜色标识：</label>
          <el-select v-model="query.colorLabelId" size="mini" style="width: 180px;">
            <el-option label="全部" value="" />
            <el-option v-for="item in colorLogoList" :key="item.id" :label="item.label" :value="item.id" :style="item.color" />
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
          <el-select v-model="selType" size="mini" style="width:120px;margin-right:3px" @change="inputDes=''">
            <el-option label="订单编号" value="1" />
            <el-option label="采购物流单号" value="2" />
            <el-option label="采购单号" value="3" />
          </el-select>
          <el-input v-model="inputDes" size="mini" style="width:180px" clearable />
        </div>
        <div class="row_item">
          <el-button size="mini" type="primary" style="margin-right:10px" @click="search">搜索</el-button>
          <!-- <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox> -->
        </div>
      </div>
      <div class="row" style="margin-top:10px">
        <div class="row_item">

          <el-button size="mini" type="primary" @click="setShotStatusFun">采购状态变更</el-button>
          <el-button size="mini" type="primary" @click="optionOrder('reject')">批量拒绝买家取消订单</el-button>
          <el-button size="mini" type="primary" @click="setColorLabelFun">批量标记颜色标识</el-button>
          <el-button size="mini" type="primary" @click="optionOrder('accept')">批量接受买家取消订单</el-button>
          <el-button size="mini" type="primary" @click="tableToExcel">导出数据</el-button>
          <el-button size="mini" type="primary">售后同步</el-button>
          <el-checkbox v-model="mall_compare" class="row_item">全店同步</el-checkbox>
          <el-checkbox v-model="shoeLog">隐藏日志</el-checkbox>

        </div>
      </div>
    </div>

    <div class="table-form">
      <el-table
        ref="multipleTable"
        width="100%"
        height="calc(100vh - 213px)"
        :data="tableList"
        :header-cell-style="{ background: '#f7fafa' }"
        @selection-change="handleSelectionChange"
      >
        <!-- :row-key="generateUUID" -->
        <el-table-column type="selection" width="55" fixed />
        <el-table-column label="站点" prop="country" min-width="100px" fixed align="center">
          <template slot-scope="{row}"><span>{{ row.mall_info.country | chineseSite }}</span></template> </el-table-column>
        <el-table-column label="店铺名称" prop="mall_info.platform_mall_name" min-width="120px" fixed align="center" />
        <!-- <el-table-column label="店铺分组" prop="" min-width="120px" align="center" /> -->
        <!-- <el-table-column label="颜色标识" prop="color_id" min-width="100px" align="center" /> -->
        <el-table-column label="颜色标识" prop="colorText" min-width="100px" align="center" />
        <!-- <el-table-column label="标识名称" prop="" min-width="120px" align="center" /> -->
        <el-table-column label="订单编号" prop="order_sn" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span>
              <el-button type="text" @click.native="open('itemDetail', row.goods_info.goods_id, row.mall_info.platform_mall_id,'orderID')">
                {{ row.order_sn }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.order_sn)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="退款金额" prop="refund_amount" min-width="100px" align="center" />
        <el-table-column label="售后状态" prop="status" min-width="100px" align="center">
          <template slot-scope="{row}"><div>{{ sta[row.status] }}</div></template></el-table-column>
        <el-table-column label="申请时间" prop="update_time" min-width="180px" align="center" />
        <el-table-column label="采购状态" prop="shot_order_info.shot_status" min-width="90px" align="center">
          <template slot-scope="{row}"><span>{{ shot_status[row.shot_order_info.shot_status] }}</span></template></el-table-column>
        <el-table-column label="售后原因" prop="after_reason" min-width="100px" align="center" />
        <el-table-column label="本地备注" prop="remark" min-width="180px" align="center">
          <template v-slot="{ row }">
            <el-input
              v-if="row.isChecked"
              v-model="row.remark"
              v-fo
              size="mini"
              resize="none"
              placeholder="本地备注"
              @blur="changeRemark(row)"
            />
            <span v-else @click="row.isChecked = true">
              <el-input v-model="row.remark" :disabled="!row.isChecked" size="mini" />
            </span>
          </template>
        </el-table-column>
        <el-table-column label="商品ID" prop="goods_info.goods_id" min-width="150px" align="center">
          <template slot-scope="{ row }">
            <span>
              <el-button type="text" @click.native="open(null, row.goods_info.goods_id, row.mall_info.platform_mall_id,'goodsID')">
                {{ row.goods_info.goods_id }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.goods_info.goods_id)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="商品数量" prop="goods_info.goods_count" min-width="150px" align="center" />
        <el-table-column label="商品图片" prop="goods_info.goods_img" min-width="100px" align="center">
          <template slot-scope="{row}">
            <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
              <div slot="content">
                <el-image :src="[row.country , row.goods_info.ori_platform_mall_id , row.goods_info.goods_img ] | imageRender" style="width: 400px; height: 400px" />
              </div>
              <el-image :src="[row.country , row.goods_info.ori_platform_mall_id , row.goods_info.goods_img ] | imageRender" style="width: 56px; height: 56px" />
            </el-tooltip>
          </template> </el-table-column>
        <el-table-column label="商品类目" prop="goods_info.goods_category_id" min-width="100px" align="center" />
        <el-table-column label="商品规格" prop="goods_info.goods_spec" min-width="100px" align="center" />
        <el-table-column label="采购商品ID" prop="goods_info.ori_goods_id" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.goods_info.ori_goods_id">
              <el-button type="text" @click.native="open(null, row.goods_info.goods_id, null,'orderGoodsID')">
                {{ row.goods_info.ori_goods_id }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.goods_info.ori_goods_id)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="采购订单号" prop="shot_order_info.shot_order_sn" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.shot_order_info.shot_order_sn">
              <el-button type="text" @click.native="getorderDetail(row)">
                {{ row.shot_order_info.shot_order_sn }}
              </el-button>
              <el-button type="text" class="copyIcon" @click="copy(row.shot_order_info.shot_order_sn)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
        <!-- <el-table-column label="采购价" prop="" min-width="100px" align="center" /> -->
        <el-table-column label="采购时间" prop="shot_order_info.shotted_at" min-width="180px" align="center" />
        <el-table-column label="采购物流单号" prop="shot_order_info.shot_tracking_number" min-width="180px" align="center">
          <template slot-scope="{ row }">
            <span v-if="row.shot_order_info.shot_tracking_number">{{ row.shot_order_info.shot_tracking_number }}
              <el-button type="text" class="copyIcon" @click="copy(row.shot_order_info.shot_tracking_number)">
                <i class="el-icon-document-copy" /></el-button></span>
          </template>
        </el-table-column>
        <el-table-column label="采购账号" prop="shot_order_info.buy_account" min-width="180px" align="center" />
        <el-table-column label="订单创建时间" prop="after_created_at" min-width="180px" align="center" />
        <!-- <el-table-column label="订单截止发货时间" prop="" min-width="180px" align="center" /> -->
        <el-table-column label="退货物流号" prop="return_tracking_number" min-width="180px" align="center" />
        <!-- <el-table-column label="退件发货地址" prop="return_delivery_time" min-width="200px" align="center" /> -->
        <el-table-column label="退货地址" prop="return_address" min-width="200px" align="center" />
        <el-table-column label="退货邮寄地址" prop="return_pickup_address" min-width="200px" align="center" />
        <el-table-column label="操作状态" prop="" min-width="150px" fixed="right" align="center">
          <template v-slot="{ row }">
            <el-dropdown style="width: 100px;margin-left: 10px;">
              <el-button style="width: 100px;" size="mini" plain type="primary">
                更多操作<i class="el-icon-arrow-down el-icon--right" />
              </el-button>
              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item><div class="dropdownItem" @click="delGoods(row)"> 删除商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="deList(row)"> 下架商品</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="shotVisible = true,rowData=row"> 修改采购状态</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem"> 同步此店铺售后订单</div></el-dropdown-item>
                <el-dropdown-item><div class="dropdownItem" @click="colorVisible = true,rowData=row"> 订单颜色标识</div></el-dropdown-item>

              </el-dropdown-menu>
            </el-dropdown>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination" style="display:flex;justify-content: flex-end;">
        <el-pagination
          background
          :current-page.sync="query.page"
          :page-sizes="[20, 50, 100, 200]"
          :page-size="query.pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <!-- 批量标记颜色弹窗 colorLabelId1 colorLogoList -->
    <el-dialog title="标记颜色标识" class="dialog-color" width="400px" top="6vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="colorVisible" @closed="closeDialog">
      <div class="color-dialog">
        <div class="form-item">
          <span class="search-title">颜色标识：</span>
          <el-select v-model="colorLabelId1" size="mini" style="width: 150px" clearable>
            <el-option v-for="item in colorLogoList" :key="item.id" :label="item.label" :value="item.id" :style="item.color" />
          </el-select>
          <el-button type="primary" size="mini" @click="setColorLabel">保存</el-button>
        </div>
      </div>
    </el-dialog>

    <!-- 批量更改采购状态 colorLabelId1 colorLogoList -->
    <el-dialog title="采购状态变更" class="dialog-color" width="300px" top="6vh" :close-on-press-escape="false" :close-on-click-modal="false" :visible.sync="shotVisible" @closed="closeDialog">
      <div class="color-dialog">
        <div class="form-item">
          <span class="search-title">状态：</span>
          <el-select v-model="shotstatus" size="mini" style="width: 150px" clearable>
            <el-option v-for="item in shotstatusList" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
          <el-button type="primary" size="mini" @click="setShotStatus">保存</el-button>
        </div>
      </div>
    </el-dialog>

  </div>

</template>
<script>
import orderApi from '../../../module-api/order-manager-api/order-data'
import storeChoose from '../../../components/store-choose.vue'
import { colorLabelList, getMalls, getValue, exportExcelDataCommon } from '../../../util/util'

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
        { label: '付款失败', value: 10 }
      ],
      sta: {
        5: '取消中',
        6: '已取消',
        7: '退货退款中',
        9: '退款成功',
        10: '退款失败'
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
        10: '付款失败'
      },
      rowData: '', // 操作行数据
      multipleSelection: [],
      colorVisible: false,
      colorLabelId1: '',
      colorLogoList: [],
      mall_compare: false, // 全店同步
      shoeLog: false, // 隐藏日志
      selType: '1', // 订单编号 采购物流单号 采购单号
      inputDes: '',
      cloumn_date1: [],
      cloumn_date2: [],
      query: {
        sysMallIds: '', // 店铺ids
        cerateTime: '', // 创建时间
        saleStatus: '', // 售后状态
        refundStatus: '', // 采购状态
        color: '', // 颜色标识
        orderSn: '', // 订单编号
        trackingNumber: '', // 采购物流单号
        shotOrderSn: '', // 采购单号
        shotOrderStatus: '', // 拍单状态
        afterApplyTime: '', // 申请时间
        createdTime: '', // 创建时间
        colorLabelId: '', // 颜色标识id
        page: 1,
        pageSize: 20
      },
      total: 0,
      tableList: [],
      loading: false,
      orderInstance: new orderApi(this),
      buyerAccountList: []
    }
  },
  created() {
    this.getInfo()// 初始化数据
    this.getBuyerList()// 获取买手号信息
  },
  methods: {
    // 修改备注
    editRemark(index, activeRemarkID) {
      this.activeRemarkID = activeRemarkID
      this.orderRemark = this.tableList[index].remark
    },
    async changeRemark(row) {
      row.isChecked = false
      const res = await this.$api.orderSaveRemark({
        id: row.order_id,
        remark: row.remark
      })
      // debugger
      if (res.data.code !== 200) {
        this.$message.error(`修改失败:${res.data.message}`, false)
        return
      }
      this.$message.success(`修改成功`, true)
    },
    // 下架商品
    deList(row) {
      this.$confirm('是否下架该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deListFun(row)
      })
    },
    async deListFun(val) {
      const product_id_list = [{ id: Number(val.goods_info.goods_id), unlisted: true }]// unlisted:true 下架  false 发布
      const orderinfo = {
        country: val.country,
        platform_mall_id: val.mall_info.platform_mall_id,
        product_id_list
      }
      this.loading = true
      const res = await this.orderInstance.deListProduct(orderinfo)
      this.loading = false
      if (res.code === 200) {
        this.$message.success('下架成功')
      } else {
        this.$message.error(res.data)
      }
      this.search()
    },
    // 打开第三方窗口
    open(type, goodsid, shopId, des) {
      if (des === 'orderID') { // 订单ID
        const reqStr = {
          type: type,
          shopId: shopId,
          id: goodsid
        }
        this.$BaseUtilService.getOrderDetailInfo(shopId, JSON.stringify(reqStr))
      }
      if (des === 'goodsID') { // 商品ID
        window.BaseUtilBridgeService.openUrl('https://id.xiapibuy.com/product/' + shopId + '/' + goodsid)
      }

      if (des === 'orderGoodsID') { // 采购商品id
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
      const userInfo = null
      // if (row.shot_order_info.buy_account_info.) {
      //   this.buyerAccountList.forEach((item) => {
      //     if (item.id === id) {
      //       userInfo = item
      //     }
      //   })
      //   return userInfo
      // } else {
      //   this.$notify({
      //     title: '买手号个人中心',
      //     type: 'error',
      //     message: `请选择账户`,
      //   })
      // }
    },
    // 删除
    delGoods(row) {
      this.$confirm('是否要删除该商品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.delGoodsFun(row)
      })
    },
    async delGoodsFun(row) {
      const orderinfo = {
        country: row.country,
        platform_mall_id: row.mall_info.platform_mall_id,
        product_id_list: [Number(row.goods_info.goods_id)]
      }
      this.loading = true
      const res = await this.orderInstance.deleteProduct(orderinfo)
      this.loading = false
      console.log('del', res)
      if (res.code === 200) {
        this.$message.success('删除成功')
      } else {
        this.$message.error(res.data)
      }
      this.search()
    },
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
    initDate() {
      const d = new Date()
      const d1 = d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate() + ' 00:00:00'
      const d2 = d.getFullYear() + '-' + d.getMonth() + '-' + d.getDate() + ' 23:59:59'
      this.cloumn_date2 = [d2, d1]
    },
    // 导出
    tableToExcel() {
      if (!this.multipleSelection.length) {
        this.$message.warning('请选择要导出的数据')
        return
      }
      let num = 1
      let str = `<tr><td>编号</td><td>站点</td><td>店铺名称</td><td>颜色标识</td><td>订单标识</td><td>订单编号</td><td>退款金额</td><td>售后状态</td><td>申请时间</td><td>售后原因</td><td>本地备注</td><td>采购状态</td>
            <td>商品ID</td><td>商品数量</td><td>商品图片</td><td>商品类目</td><td>商品规格</td><td>采购商品ID</td><td>采购订单号</td>
            <td>采购时间</td><td>采购物流单号</td><td>采购账号</td><td>订单创建时间</td>
            <td>退货物流号</td><td>退货地址</td><td>退货邮寄地址</td>
            </tr>`
      const arr = this.multipleSelection
      arr.forEach(item => {
        str += `<tr><td>${num++}</td>
                <td>${item.mall_info && item.mall_info.country ? this.$filters.chineseSite(item.mall_info.country) : '' + '\t'}</td>
                <td>${item.mall_info && item.mall_info.platform_mall_name ? item.mall_info.platform_mall_name : '' + '\t'}</td>
                <td>${item.colorText ? item.colorText : '-' + '\t'}</td>
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
      this.setSelect()// 清空列表
    },
    generateUUID() {
      var d = new Date().getTime()
      if (window.performance && typeof window.performance.now === 'function') {
        d += performance.now() // use high-precision timer if available
      }
      var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(
        /[xy]/g,
        function(c) {
          var r = (d + Math.random() * 16) % 16 | 0
          d = Math.floor(d / 16)
          return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16)
        }
      )
      return uuid
    },
    // 多选
    handleSelectionChange(val) {
      this.multipleSelection = val
      console.log('multipleSelection', this.multipleSelection)
    },
    // 递增
    indexMethod(index) {
      index = (index + 1) + (this.page - 1) * this.pageSize
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
        status: this.shotstatus
      }
      // rowData为空时,为多选,不同状态sysOrderIds不一样
      if (this.rowData === '') {
        this.multipleSelection.forEach(item => {
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
        this.setSelect()
        this.search()
        this.rowData = ''
      } catch (err) {
        this.setSelect()
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
    async setColorLabel() {
      if (this.colorLabelId1 === '') {
        this.$message.warning('请选择要标记的颜色')
        return
      }
      this.isLoading = true
      const list = []
      const query = {
        sysOrderIds: '',
        id: this.colorLabelId1
      }
      // rowData为空时,为多选,不同状态sysOrderIds不一样
      if (this.rowData === '') {
        this.multipleSelection.forEach(item => {
          list.push(item.sys_order_id)
        })
        query.sysOrderIds = list.toString() || ''
      } else {
        query.sysOrderIds = this.rowData.sys_order_id
      }
      try {
        const res = await this.$api.setColorLabel(query)
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
        this.colorVisible = false
        this.isLoading = false
        this.setSelect()
        this.search()
        this.rowData = ''
      } catch (err) {
        this.setSelect()
        this.colorVisible = false
        console.log(err)
        this.isLoading = false
      }
    },
    // 关闭标记颜色弹窗
    closeDialog() {
      this.setSelect()// 清空选项
      // 颜色清理
      this.colorLabelId1 = this.colorLogoList[0].id || ''
      this.colorVisible = false

      // 采购状态清理
      this.shotstatus = ''
      this.shotVisible = false
    },
    // 重置列表勾选状态
    setSelect() {
      this.tableList.forEach((row) => {
        this.$refs.multipleTable.toggleRowSelection(row, false)
      })
    },
    // 初始化
    async getInfo() {
      this.initDate()
      colorLabelList().then((res) => {
        this.colorLogoList = res
      })
      getMalls().then(res => {
        this.shopAccountList = res
        this.query.sysMallIds = []
        this.shopAccountList.forEach(item => {
          this.query.sysMallIds.push(item.id)
        })
        this.search()
      })
    },
    changeMallList(val) {
      // console.log('999', val)
      this.query.sysMallIds = []
      val.forEach(item => {
        this.query.sysMallIds.push(item.id)
      })
    },
    // 搜索
    search() {
      this.query.orderSn = ''
      this.query.trackingNumber = ''
      this.query.shotOrderSn = ''
      if (Number(this.selType) === 1) {
        this.query.orderSn = this.inputDes
      }
      if (Number(this.selType) === 2) {
        this.query.trackingNumber = this.inputDes
      }
      if (Number(this.selType) === 3) {
        this.query.shotOrderSn = this.inputDes
      }
      this.query.createdTime = this.cloumn_date1 && this.cloumn_date1.length > 0 ? this.cloumn_date1.join('/').toString() : ''
      this.query.afterApplyTime = this.cloumn_date2 && this.cloumn_date2.length > 0 ? this.cloumn_date2.join('/').toString() : ''
      const params = this.query
      params.sysMallIds = this.query.sysMallIds.toString() || ''

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
          list.forEach(i => {
            i.colorText = getValue(this.colorLogoList, 'label', 'id', i.color_id) || '-'
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
    },
    // 分页
    handleSizeChange(val) { this.query.pageSize = val; this.search() },
    handleCurrentChange(val) { this.query.page = val; this.search() },
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

    .detai{
        min-width: 1280px;
        padding: 10px;
        .condition{
            display: flex;
            align-items: flex-start;
            flex-flow: column;

            // .condition—item{
            //     margin-right: 15px;
            // }
            .row{
               display: flex;
               margin-bottom: 5px;
               .row_item{
                 margin-left: 20px;
                 margin-right: 10px;
               }
            }
        }
        .table-form{
            border: 0.5px solid rgb(224, 224, 224);
            margin-top: 10px;
        }
    }
</style>

