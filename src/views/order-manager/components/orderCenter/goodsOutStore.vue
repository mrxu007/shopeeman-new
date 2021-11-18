<!--
 * @Author: your name
 * @Date: 2021-11-16 15:41:36
 * @LastEditTime: 2021-11-18 15:32:48
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\goodsOutStore.vue
-->
<template>
  <div class="out-store">
    <div class="out-header">
      <span>{{ chooseData.length - chooseDataCopy.length + 1 }}/{{ chooseData.length }}</span>
      <el-button type="primary" size="mini" @click="goNext">{{ chooseData.length > 1 ? '匹配下一单' : '关闭' }}</el-button>
      <span style="color:blue;" v-if="flag">自有仓库出库成功</span>
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
              <el-table-column align="center" prop="escrow_amount" label="订单收入" width="80">
                <template slot-scope="scope">{{ scope.row.escrow_amount }}{{ orderInfo.currency }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="操作" width="180">
                <template slot-scope="scope">
                  <div style="display: flex">
                    <el-button
                      type="primary"
                      size="mini"
                      @click="
                        isGift = false
                        selfGoodsStoreVisible = true
                      "
                      >匹配商品</el-button
                    >
                    <el-button
                      type="primary"
                      size="mini"
                      @click="
                        isGift = true
                        selfGoodsStoreVisible = true
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
          <el-button size="mini" type="primary" @click="placeOrder">立即下单</el-button>
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
            <p class="content color">{{  grossProfit }}元</p>
        </div>
        <div class="item">
            <span>利率</span>
            <p class="content color">{{ interestRate }}%</p>
        </div>
      </div>
    </div>
    <el-dialog title="自有仓库列表" :visible.sync="selfGoodsStoreVisible" width="1200px" append-to-body top="5vh">
      <self-goods-store @getChooseData="getChooseData"></self-goods-store>
    </el-dialog>
  </div>
</template>

<script>
import SelfGoodsStore from './SelfGoodsStore'
export default {
  name: 'GoodsOutStore',
  components: {
    SelfGoodsStore,
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
      outTotalPrice:0,
      outTotalPriceRmb:0,
      outTotalStock:0,
      flag:false,
      grossProfit:null,
      interestRate:null
    }
  },
  mounted() {
    this.chooseDataCopy = JSON.parse(JSON.stringify(this.chooseData))
    this.total = this.chooseDataCopy.length
    this.orderInfo = this.chooseDataCopy[0]
    this.income = 0
    this.getDetail(this.orderInfo)
    this.exchangeRateList()
    console.log(this.chooseDataCopy)
  },
  methods: {
    totalPrice() {
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) > 0)
      console.log(arr,"arr")
      let price = 0
      let numberS = 0
      arr.forEach((item) => {
        price += Number(item.sku_price)
        numberS += Number(item.outStock)
      })
      this.outTotalStock = numberS
      this.outTotalPriceRmb = price
      this.outTotalPrice = (price*Number(this.rateList[this.orderInfo.country])).toFixed(2)
      this.grossProfit = ((this.income-this.outTotalPrice)/Number(this.rateList[this.orderInfo.country])).toFixed(2)
      this.interestRate = Math.ceil(this.grossProfit/this.outTotalPriceRmb*100)
      console.log(this.rateList[this.orderInfo.country])
    },
    // 获取汇率
    async exchangeRateList() {
      const data = await this.$api.exchangeRateList()
      if (data.data.code === 200) {
        this.rateList = data.data.data
      }
      console.log(this.rateList)
    },
    //立即下单
    async placeOrder() {
      let arr = this.matchOrderList.filter((item) => Number(item.outStock) > 0)
      arr.forEach(async (item,index) => {
        let params = {
          sysOrderIds: this.orderInfo.id,
          orderSn: item.order_sn,
          shotStatus: '6',
          buyAccountInfo:JSON.stringify( {
            name: '自有商品发货 ',
            type: 10000,
          }),
          payAccountInfo: JSON.stringify( {
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
        if(res.data.code === 200){
            this.flag = true
        }else{
            this.flag = false
        }
        console.log(res, 'placeOrder')
        if(this.flag && index === arr.length-1){
          this.$message.success('下单成功')
          this.matchOrderList = []
          this.totalPrice()
          console.log(this.matchOrderList)
      }
      })
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
      val.isGift = this.isGift
      val.outStock = 0
      val.orderSn = this.orderInfo.order_sn
      if (this.isGift) {
        this.matchOrderList.push(val)
        this.outStock[this.matchOrderList.length - 1] = '0'
      } else {
        let index = this.matchOrderList.findIndex((item) => !item.isGift)
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
      this.flag = false
      if (this.chooseDataCopy.length > 0) {
        this.orderInfo = this.chooseDataCopy[0]
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
  .out-header {
    height: 80px;
    color: red;
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
        margin-top:10px;
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
        .color{
            color:red;
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
</style>>

