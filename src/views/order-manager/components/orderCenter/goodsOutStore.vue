<!--
 * @Author: your name
 * @Date: 2021-11-16 15:41:36
 * @LastEditTime: 2021-12-13 18:37:01
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\goodsOutStore.vue
-->
<template>
  <div class="out-store">
    <div class="out-header">
      <span>{{ chooseData.length - chooseDataCopy.length + 1 }}/{{ chooseData.length }}</span>
      <el-button type="primary" size="mini" @click="goNext">{{ chooseData.length > 1 ? '匹配下一单' : '关闭' }}</el-button>
      <el-button type="primary" size="mini" @click="getSheetInfo" v-if="outStoreType === '3' || outStoreType === '4'">获取面单信息</el-button>
      <span class="warning-style">{{ flagText }}</span>
      <p>温馨提示: 1、请确保该主订单下所有子订单商品在海外仓都有库存，如果只有部分订单有库存商品，请不要出库，否则会导致没有库存的商品无法发货；</p>
      <p>温馨提示: 2、商品出库前，请确保平台物流和面单已申请</p>
      <p>温馨提示: 3、共享库存暂不能作为赠品进行出库</p>
    </div>
    <div class="order-content">
      <div class="content-left">
        <div class="order-box">
          <span class="order-title">订单商品信息</span>
          <div class="order-item">
            <el-table ref="muliTbale" :data="orderList" tooltip-effect="dark" style="width: 100%" height="200">
              <el-table-column align="center" type="index" label="序号" min-width="50px" />
              <el-table-column min-width="120px" label="订单编号" prop="order_sn" align="center" />
              <el-table-column width="80px" label="订单状态" prop="order_status" align="center">
                <template slot-scope="scope" v-if="scope.row.order_status">{{ scope.row.order_status }}</template>
              </el-table-column>
              <el-table-column min-width="120px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
              <el-table-column width="120px" label="SKUID" prop="variation_id" align="center" show-overflow-tooltip />

              <el-table-column min-width="120px" label="商品规格" prop="variation_sku" align="center" show-overflow-tooltip />
              <el-table-column align="center" prop="goods_count" label="商品数量" width="80" />
              <el-table-column align="center" prop="ori_platform_id" label="商品图片" width="80">
                <template slot-scope="scope">
                  <el-image v-bind:src="[scope.row.country, scope.row.platform_mall_id, scope.row.goods_img] | imageRender" style="width: 56px; height: 56px"></el-image>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="escrow_amount" label="订单收入" width="100">
                <template slot-scope="scope">{{ scope.row.escrow_amount }}{{ orderInfo.currency }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="操作" width="180">
                <template slot-scope="scope">
                  <div style="display: flex; justify-content: center">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="
                        isGift = false
                        selfGoodsStoreVisible = true
                        addGiftAbroad = ''
                        clickRow = scope.row
                      "
                      >匹配商品</el-button
                    >
                    <el-button
                      v-if="outStoreType !== '4'"
                      type="primary"
                      size="mini"
                      @click="
                        isGift = true
                        selfGoodsStoreVisible = true
                        addGiftAbroad = 'gift'
                        clickRow = scope.row
                      "
                      >添加赠品</el-button
                    >
                  </div>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="order-box mar-top">
          <span class="order-title">匹配商品信息</span>
          <div class="order-item">
            <el-table ref="muliTbale2" :data="matchOrderList" tooltip-effect="dark" style="width: 100%" height="300">
              <el-table-column align="center" type="index" label="序号" min-width="50px" />
              <el-table-column width="140px" label="匹配订单号" prop="orderSn" align="center" />
              <el-table-column width="120px" label="商品编号" prop="sku_id" align="center" show-overflow-tooltip />
              <el-table-column width="80px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip />
              <el-table-column width="80px" label="商品规格" prop="sku_name" align="center" />
              <el-table-column align="center" prop="stock_num" label="可用库存" width="80" />
              <el-table-column align="center" prop="outStock" label="出库数量" min-width="80">
                <template slot-scope="scope">
                  <el-input v-model="outStock[scope.$index]" @input="setOutStock(scope.row, scope.$index)" size="mini"></el-input>
                </template>
              </el-table-column>
              <el-table-column width="120px" label="商品单价(RMB)" prop="sku_price" align="center" />
              <el-table-column label="商品图片" width="80">
                <template slot-scope="scope">
                  <el-image :src="scope.row.sku_image" style="width: 60px; height: 60px" />
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="是否赠品" width="80">
                <template slot-scope="scope">{{ scope.row.isGift ? '是' : '否' }}</template>
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="deleteMatchData(scope.$index)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
        <div class="order-btn">
          <span class="mar-right">出库数</span>
          <span class="mar-right">{{ outTotalStock }}</span>
          <span class="mar-right">出库总价（RMB）</span>
          <span class="mar-right">{{ outTotalPriceRmb }}</span>
          <span class="mar-right">出库总价</span>
          <span class="mar-right">{{ outTotalPrice }}</span>
          <el-button size="mini" type="primary" @click="outStore">立即下单</el-button>
        </div>
      </div>
      <div class="content-right">
        <div class="order-box">
          <span class="order-title">订单信息</span>
          <div class="order-item">
            <div class="order-content-right">
              <div class="item">
                <span>订单编号</span>
                <p class="content">{{ orderInfo.order_sn }}</p>
              </div>
              <div class="item">
                <span>当前站点</span>
                <p class="content">{{ orderInfo.country | chineseSite }}</p>
              </div>
              <div class="item">
                <span>买家姓名</span>
                <p class="content" v-if="orderInfo.receiver_info">{{ orderInfo.receiver_info.name }}</p>
              </div>
              <div class="item">
                <span>买家电话</span>
                <p class="content" v-if="orderInfo.receiver_info">{{ orderInfo.receiver_info.phone }}</p>
              </div>
              <div class="item">
                <span>买家地址</span>
                <p class="content" v-if="orderInfo.receiver_info">{{ orderInfo.receiver_info.address }}</p>
              </div>
              <div class="item">
                <span>物流公司</span>
                <p class="content">{{ orderInfo.logistics_name }}</p>
              </div>
              <div class="item">
                <span>物流单号</span>
                <p class="content">{{ orderInfo.tracking_no }}</p>
              </div>
              <div class="item">
                <span>订单收入</span>
                <p class="content">{{ income }}{{ orderInfo.currency }}</p>
              </div>
            </div>
          </div>
        </div>
        <div class="item">
          <span>毛利</span>
          <p class="content color">{{ grossProfit }}元</p>
        </div>
        <div class="item">
          <span>利率</span>
          <p class="content color">{{ interestRate }}%</p>
        </div>
      </div>
    </div>
    <el-dialog :visible.sync="selfGoodsStoreVisible" width="1200px" append-to-body top="5vh" v-if="selfGoodsStoreVisible">
      <div slot="title">{{ title[Number(outStoreType)] }}</div>
      <div class="go-out-store">
        <self-goods-store @getChooseData="getChooseData" v-if="outStoreType === '1'"></self-goods-store>
        <product-goods-store @getChooseData="getChooseData" v-if="outStoreType === '2'"></product-goods-store>
        <abroad-goods-store @getChooseData="getChooseData" v-if="outStoreType === '3'" :addGiftAbroad="addGiftAbroad"></abroad-goods-store>
        <inLand-goods-store @getChooseData="getChooseData" v-if="outStoreType === '4'"></inLand-goods-store>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import SelfGoodsStore from './SelfGoodsStore'
import ProductGoodsStore from './productGoodsStore'
import InLandGoodsStore from './inLandGoodsStore.vue'
import AbroadGoodsStore from './abroadGoodsStore'
export default {
  name: 'GoodsOutStore',
  components: {
    SelfGoodsStore,
    ProductGoodsStore,
    InLandGoodsStore,
    AbroadGoodsStore,
  },
  props: {
    chooseData: {
      type: Array,
      default: [],
    },
    outStoreType: {
      type: String,
      default: '1',
    },
  },
  data() {
    return {
      total: 0,
      orderInfo: {},
      orderList: [],
      matchOrderList: [],
      chooseDataCopy: [],
      income: 0,
      selfGoodsStoreVisible: false,
      isGift: false,
      outStock: [],
      showInput: [],
      rateList: {},
      outTotalPrice: 0,
      outTotalPriceRmb: 0,
      outTotalStock: 0,
      grossProfit: null,
      interestRate: null,
      flagText: '',
      wid: '', //海外仓仓库ID
      sheetInfo: {},
      addGiftAbroad: '',
      title: ['', '自用仓库商品列表', '产品中心库存列表', '海外仓库存列表', '国内仓库存列表'],
      clickRow: {},
    }
  },
  mounted() {
    console.log(this.outStoreType)
    this.chooseDataCopy = JSON.parse(JSON.stringify(this.chooseData))
    this.total = this.chooseDataCopy.length
    this.orderInfo = this.chooseDataCopy[0]
    this.income = 0
    this.getDetail(this.orderInfo)
    this.exchangeRateList()
    if (this.outStoreType === '3' || this.outStoreType === '4') {
      this.getSheetInfo()
    }
  },
  methods: {
    totalPrice() {
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) > 0)
      // console.log(arr, 'arr')
      let price = 0
      let numberS = 0
      arr.forEach((item) => {
        price += Number(item.sku_price)
        numberS += Number(item.outStock)
      })
      this.outTotalStock = numberS
      this.outTotalPriceRmb = price
      this.outTotalPrice = (price * Number(this.rateList[this.orderInfo.country])).toFixed(2)
      this.grossProfit = ((this.income - this.outTotalPrice) * Number(this.rateList[this.orderInfo.country])).toFixed(2)
      this.interestRate = this.outTotalPriceRmb ? Math.ceil((this.grossProfit / this.outTotalPriceRmb) * 100) : 100
      // console.log(this.rateList[this.orderInfo.country])
    },
    //获取面单信息
    async getSheetInfo() {
      let params = {
        mainOrderSns: this.orderInfo.main_order_sn,
      }
      let res = await this.$api.getLogisticsInformationBatch(params)
      console.log(res, 'res')
      if (res.data.code === 200) {
        this.flagText = '面单信息获取成功'
        this.sheetInfo = res.data.data[0] || []
      } else {
        this.flagText = '面单信息获取失败'
      }
    },
    // 获取汇率
    async exchangeRateList() {
      const data = await this.$api.exchangeRateList()
      if (data.data.code === 200) {
        this.rateList = data.data.data
      }
      console.log(this.rateList)
    },
    async outStore() {
      let arrFilter = this.matchOrderList.filter((item) => !item.isGift)
      if (this.orderList.length !== arrFilter.length) {
        this.$confirm('订单信息不匹配，是否确认出库?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        })
          .then(() => {
            if (this.outStoreType === '4') {
              this.homePlaceOrder()
            } else if (this.outStoreType === '3') {
              this.abroadPlaceOrder()
            } else {
              this.placeOrder()
            }
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消出库',
            })
          })
      } else {
        if (this.outStoreType === '4') {
          await this.homePlaceOrder()
        } else if (this.outStoreType === '3') {
          await this.abroadPlaceOrder()
        } else {
          await this.placeOrder()
        }
      }
    },
    async abroadPlaceOrder() {
      if (!this.matchOrderList.length) {
        return this.$message.warning('请先选择商品！')
      }
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) > 0)
      if (!arr.length) {
        return this.$message.warning('出库数量不能为零！')
      }
      let list = []
      let widInfo = {}
      arr.forEach((item) => {
        widInfo[item.wid] = item.wid
        let obj = {
          sys_sku_id: item.sys_sku_id,
          sku_id: item.sku_id,
          sku_name: item.sku_name,
          stock_num: item.outStock,
          sku_num: item.stock_num,
          goods_name: item.goods_name,
          sku_price: item.sku_price,
          sku_image: item.sku_image,
          sku_url: item.sku_url,
          is_gift: item.isGift ? 1 : 2,
          shared_id: item.shared_id ? item.shared_id + '' : '0',
        }
        list.push(obj)
      })
      if (Object.keys(widInfo).length > 1) {
        return this.$message.warning('只能出库同一个仓库的商品！')
      }
      let params = {
        wid: arr[0].wid,
        oversea_order_sn: this.orderInfo.main_order_sn,
        express_pdf: this.sheetInfo.url,
        type: this.orderInfo.logistics_id,
        logistic_no: this.orderInfo.tracking_no,
        country: this.orderInfo.country,
        sku_list: list,
      }
      let res = await this.$api.outOfStockAbroad(params)
      if (res.data.code === 200) {
        this.$message.success('下单成功')
        this.flagText = '出库成功'
        this.matchOrderList = []
        this.totalPrice()
      } else {
        this.flagText = `出库失败，${res.data.message}`
        return this.$message.error(`出库失败，${res.data.message}`)
      }
      console.log(res, 'abroadPlaceOrder')
    },
    async homePlaceOrder() {
      if (!this.matchOrderList.length) {
        return this.$message.warning('请先选择商品！')
      }
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) == 0)
      if (arr.length) {
        return this.$message.warning('出库数量不能为零！')
      }
      let itemF = this.matchOrderList[0]
      let lists = []
      let widInfo = {}
      this.matchOrderList.forEach((item) => {
        widInfo[item.wid] = item.wid
        let obj = {
          sku_id: item.sku_id,
          goods_name: item.goods_name,
          goods_img: item.sku_image,
          goods_url: item.purchase_goods_url,
          goods_describe: item.sku_spec,
          goods_count: item.outStock,
          goods_price: item.sku_price,
          order_sn: this.orderInfo.order_sn,
        }
        lists.push(obj)
      })
      if (Object.keys(widInfo).length > 1) {
        return this.$message.warning('只能出库同一个仓库的商品！')
      }
      let params = {
        wid: itemF.wid,
        homeOrderSn: this.orderInfo.main_order_sn,
        platformTrackingNumber: this.orderInfo.logistics_name,
        platformLogisticsType: this.orderInfo.tracking_no,
        goodsList: lists,
      }
      let res = await this.$api.homeOutStockOrder(params)
      if (res.data.code === 200) {
        this.$message.success('下单成功')
        this.flagText = '出库成功'
        this.matchOrderList = []
        this.totalPrice()
      } else {
        this.flagText = `出库失败，${res.data.message}`
        return this.$message.error(`出库失败，${res.data.message}`)
      }
      console.log(res, 'placeOrder')
    },
    //立即下单
    async placeOrder() {
      if (!this.matchOrderList.length) {
        return this.$message.warning('请先选择商品！')
      }
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) > 0)
      if (!arr.length) {
        return this.$message.warning('出库数量不能为零！')
      }
      for (let index = 0; index < arr.length; index++) {
        let item = arr[index]
        let params = {
          sysOrderIds: this.orderInfo.id,
          orderSn: item.order_sn,
          shotStatus: '6',
          buyAccountInfo: JSON.stringify({
            name: '自有商品发货 ',
            type: 10000,
          }),
          payAccountInfo: JSON.stringify({
            name: '自有商品发货 ',
            type: 10000,
          }),
          shotAmount: Number(item.sku_price) * Number(this.rateList[this.orderInfo.country]),
          shotAmountRmb: item.sku_price,
          shotOrderSn: item.orderSn + '_' + item.sku_id,
          group_order_id: '',
          type: 0,
          transportType: '2',
          warehouseUserId: 0,
          packageType: '1',
          markStatus: 0,
          merchantNo: '',
          isAutoUpload: true,
          shotPaymentMethod: 0,
          shopId: 0,
          platformId: 10000,
        }
        let res = await this.$api.batchUpdateShotOrder(params)
        if (res.data.code === 200) {
          if (index === arr.length - 1) {
            this.$message.success('下单成功')
            this.flagText = '出库成功'
            this.matchOrderList = []
            this.totalPrice()
            console.log(this.matchOrderList)
          }
        } else {
          this.flagText = `出库失败，${res.data.message}`
          return this.$message.error(`出库失败，${res.data.message}`)
        }
      }
    },
    deleteMatchData(index) {
      this.matchOrderList.splice(index, 1)
      this.outStock[index] = '0'
      this.totalPrice()
    },
    //出库数量
    setOutStock(row, index) {
      if (Number(this.outStock[index]) > Number(row.stock_num)) {
        this.outStock[index] = 0
        return this.$message.warning('出库数量不能大于可出库数量！')
      }
      this.$set(this.matchOrderList[index], 'outStock', this.outStock[index])
      this.totalPrice()
      //   this.matchOrderList[index].outStock = this.outStock
    },
    getChooseData(val) {
      console.log(val, 'val,wid')
      val.isGift = this.isGift
      val.outStock = 0
      val.orderSn = this.clickRow.order_sn
      if (this.isGift) {
        this.matchOrderList.push(val)
        this.outStock[this.matchOrderList.length - 1] = '0'
      } else {
        let index = this.matchOrderList.findIndex((item) => !item.isGift && item.orderSn === val.orderSn)
        if (index > -1) {
          this.matchOrderList[index] = val
        } else {
          this.matchOrderList.push(val)
          this.outStock[this.matchOrderList.length - 1] = '0'
        }
      }
      this.selfGoodsStoreVisible = false
    },
    //获取详情
    async getDetail(orderInfo) {
      let params = {
        mainOrderSn: orderInfo.main_order_sn,
      }
      let { data } = await this.$api.getDetail(params)
      if (data.code === 200) {
        this.orderList = data.data.orderInfos
        this.orderList.forEach((item) => {
          item.country = this.orderInfo.country
          item.platform_mall_id = this.orderInfo.mall_info.platform_mall_id
          this.income += Number(item.escrow_amount)
        })
      }
      console.log(data, '')
    },
    goNext() {
      this.orderInfo = {}
      this.orderList = []
      this.matchOrderList = []
      this.grossProfit = null
      this.interestRate = null
      this.chooseDataCopy.splice(0, 1)
      this.flagText = ''
      if (this.chooseDataCopy.length > 0) {
        this.orderInfo = this.chooseDataCopy[0]
        if (this.outStoreType === '3' || this.outStoreType === '4') {
          this.getSheetInfo()
        }
        this.getDetail(this.orderInfo)
      } else {
        this.$emit('close')
      }
    },
  },
}
</script>

<style lang="less" scoped>
.out-store {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
  .out-header {
    height: 80px;
    color: red;
    .warning-style {
      color: blue;
      font-size: 16px !important;
      margin-left: 20px;
    }
    span {
      margin-right: 10px;
    }
    p {
      height: 20px;
    }
  }
}
.mar-top {
  margin-top: 10px;
}
.mar-right {
  margin-right: 10px;
}
.order-content {
  margin-top: 10px;
  display: flex;
  .content-left {
    // flex: 6;
    width: 80%;
    display: flex;
    flex-direction: column;
    .order-btn {
      display: flex;
      justify-content: center;
      align-items: center;
      margin-top: 10px;
    }
  }
  .content-right {
    // flex: 4;
    width: 20%;
    margin-left: 10px;
    .item {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 10px;
      margin-left: -26px;
      span {
        display: inline-block;
        width: 80px;
        text-align: right;
        margin-right: 10px;
      }
      .content {
        width: 200px;
        border: 1px solid #dcdcdc;
        padding: 5px;
        min-height: 26px;
      }
      .color {
        color: red;
      }
    }
  }
}
.order-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 16px;
  position: relative;
  .order-title {
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
  .order-item {
    .order-content-right {
      display: flex;
      flex-direction: column;
      .item {
        display: flex;
        align-items: center;
        justify-content: center;
        margin-bottom: 10px;
        margin-left: -26px;
        span {
          display: inline-block;
          width: 80px;
          text-align: right;
          margin-right: 10px;
        }
        .content {
          width: 200px;
          border: 1px solid #dcdcdc;
          padding: 5px;
          min-height: 26px;
        }
      }
    }
  }
}
.go-out-store {
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
</style>>

