<!--
 * @Author: your name
 * @Date: 2021-11-23 11:11:14
 * @LastEditTime: 2021-11-25 16:49:13
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\billDetail.vue
-->
<template>
  <div class="bill-detail" v-loading="tableLoading">
    <div class="bill-top">
      <el-table :data="tableData" style="width: 100%" height="200">
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" width="180"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goods_count" label="商品数量" width="80"> </el-table-column>
        <el-table-column prop="shot_amount" label="采购金额" width="80">
          <template slot-scope="scope">{{ scope.row.shot_amount }}</template>
        </el-table-column>
        <el-table-column align="center" prop="order_status" label="发货状态" min-width="80">
          <template slot-scope="scope">{{ changeTypeName(scope.row.order_status, orderStatusList) }}</template>
        </el-table-column>
        <el-table-column align="center" label="采购状态" min-width="120">
          <template slot-scope="scope">{{ changeTypeName(scope.row.shot_status, shotStatusList) }}</template>
        </el-table-column>
      </el-table>
    </div>
    <div class="bill-content">
      <div class="content-left">
        <div class="item" v-for="(item, key, index) in amountLeft" :key="index">
          <p>{{ item.label }}</p>
          <p> 
            {{ changeMoney(item.value) }} 
            <span v-if="billType">{{ chooseData.country | siteCoin }}</span>
            <span v-else>元</span>
          </p>
        </div>
      </div>
      <div class="content-right">
        <div class="item" v-for="(item, key, index) in amountRight" :key="index">
          <p>{{ item.label }}</p>
          <p>
            {{ changeMoney(item.value) }}
            <span v-if="billType">{{ chooseData.country | siteCoin }}</span>
            <span v-else>元</span>
          </p>
        </div>
        <div class="item activeColor">
          <p>当前金额单位</p>
          <p v-if="billType">{{ chooseData.country | siteCoin }}</p>
          <p v-else>人民币</p>
        </div>
        <div class="item activeColor">
          <p>当前站点</p>
          <p>{{ chooseData.country | chineseSite }}</p>
        </div>
        <div class="item activeColor">
          <p>当前汇率</p>
          <p>{{ rateList[chooseData.country] }}</p>
        </div>
        <div class="item">
          <el-button type="primary" size="mini" @click="changeSite">{{ billType ? '显示人民币' : '显示当地币种' }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { orderStatusList, shotStatusList } from './orderCenter'
export default {
  name: 'BillDetail',
  data() {
    return {
      tableData: [],
      orderStatusList: orderStatusList,
      shotStatusList: shotStatusList,
      rateList: {},
      billType: true, //当地币种默认
      amountLeft: {
        goodsAmount: {
          label: '商品金额',
          value: 0,
        }, //商品金额
        goodsPrice: {
          label: '商品价格',
          value: 0,
        }, //商品价格
        shipAmount: {
          label: '运费总额',
          value: 0,
        }, //运费总额
        buyPayShipAmount: {
          label: '买家支付的运费',
          value: 0,
        }, //买家支付的运费
        thirdShip: {
          label: '第三方运费',
          value: 0,
        }, //第三方运费
        actualShipAmount: {
          label: '实际运费（shopee代付）',
          value: 0,
        }, //实际运费（shopee代付）
        costAndPay: {
          label: '费用与收费',
          value: 0,
        }, //费用与收费
        commission: {
          label: '佣金',
          value: 0,
        }, //佣金
        fees: {
          label: '交易手续费',
          value: 0,
        }, //交易手续费
        payService: {
          label: '服务费',
          value: 0,
        }, //服务费
        creditFees: {
          label: '信用卡交易费用',
          value: 0,
        }, //信用卡交易费用
        customs: {
          label: '关税',
          value: 0,
        }, //关税
        discountAmount: {
          label: '优惠券与回扣',
          value: 0,
        }, //优惠券与回扣
        saleDiscount: {
          label: '卖家提供促销代码优惠',
          value: 0,
        }, //卖家提供促销代码优惠
        shopeeBack: {
          label: 'shopee回扣金额',
          value: 0,
        }, //shopee回扣金额
        shopeeCoinBack: {
          label: '卖家shopee币现金返现',
          value: 0,
        }, //卖家shopee币现金返现
        shopShipBack: {
          label: 'shopee运费回扣',
          value: 0,
        }, //shopee运费回扣
      },
      amountRight: {
        orderIncoming: {
          label: '订单收入',
          value: 0,
        }, //订单收入
        actualPay: {
          label: '买家实付金额',
          value: 0,
        }, //买家实付金额
        goodsPrice: {
          label: '商品金额',
          value: 0,
        }, //商品金额
        shipAmount: {
          label: '运费',
          value: 0,
        }, //运费
        importTax: {
          label: '进口税',
          value: 0,
        }, //进口税
        discountAmount: {
          label: '卖家优惠金额',
          value: 0,
        }, //卖家优惠金额
        shopeeCoin: {
          label: 'shopee币折抵',
          value: 0,
        }, //shopee币折抵
        platformDiscount: {
          label: '平台优惠金额',
          value: 0,
        }, //平台优惠金额
        creditFees: {
          label: '信用卡交易费',
          value: 0,
        }, //信用卡交易费
        shotAmount: {
          label: '采购金额',
          value: 0,
        }, //采购金额
        refundAmount: {
          label: '退款金额',
          value: 0,
        }, //退款金额
        grossProfitShip: {
          label: '毛利（含邮费）',
          value: 0,
        }, //毛利（含邮费）
        grossProfit: {
          label: '毛利',
          value: 0,
        }, //毛利
      },
      tableLoading: false,
      shotAmount: 0, //采购金额
      warehouseShipAmount: 0, //仓库发货金额
    }
  },
  props: {
    chooseData: {
      type: Object,
      default: {},
    },
  },
  mounted() {
    this.getRate()
    this.getAmountDetail()
    this.getAmountDetailFromShopee()
  },
  methods: {
    //切换币种
    changeSite() {
      this.billType = !this.billType
    },
    changeMoney(val) {
      if (this.billType) {
        return val
      } else {
        return (val * Number(this.rateList[this.chooseData.country])).toFixed(2)
      }
    },
    async getAmountDetailFromShopee() {
      let params = {
        order_id: this.chooseData.order_id,
        shop_id: this.chooseData.mall_info.platform_mall_id,
      }
      this.tableLoading = true
      let res3 = await this.$shopeemanService.getIncomeTransactionHistoryDetail(this.chooseData.country, params)
      if (res3.code === 200) {
        console.log('明细', res3.data)
        let amountDetail = res3.data
        this.amountLeft.goodsAmount.value = amountDetail.payment_info.merchant_subtotal.product_price || 0 //
        this.amountLeft.goodsPrice.value = amountDetail.payment_info.merchant_subtotal.product_price || 0 //
        //运费
        this.amountLeft.buyPayShipAmount.value = amountDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_buyer || 0 //买家支付的运费
        this.amountLeft.thirdShip.value = amountDetail.payment_info.shipping_subtotal.shipping_fee_discount_3pl || 0 //第三方运费
        this.amountLeft.actualShipAmount.value = amountDetail.payment_info.shipping_subtotal.shipping_fee_paid_by_shopee_on_your_behalf || 0 //实际运费
        this.amountLeft.shipAmount.value = this.amountLeft.buyPayShipAmount.value + this.amountLeft.thirdShip.value + this.amountLeft.actualShipAmount.value //运费总额
        //费用与收费
        this.amountLeft.commission.value = amountDetail.payment_info.fees_and_charges.commission_fee || 0 //佣金
        this.amountLeft.fees.value = amountDetail.payment_info.fees_and_charges.transaction_fee || 0 //交易手续费
        this.amountLeft.payService.value = amountDetail.payment_info.fees_and_charges.service_fee || 0 //服务费
        this.amountLeft.creditFees.value = amountDetail.payment_info.fees_and_charges.credit_card_charge || 0 //信用卡交易费用
        this.amountLeft.customs.value = amountDetail.payment_info.buyer_paid_tax_amount || 0 //关税
        this.amountLeft.costAndPay.value =
          this.amountLeft.commission.value + this.amountLeft.fees.value + this.amountLeft.payService.value + this.amountLeft.creditFees.value + this.amountLeft.customs.value //费用与收费
        //优惠券与回扣
        this.amountLeft.saleDiscount.value = amountDetail.payment_info.rebate_and_voucher.voucher_code || 0 //卖家提供促销代码优惠
        this.amountLeft.shopeeBack.value = amountDetail.payment_info.rebate_and_voucher.product_discount_rebate_from_shopee || 0 //shopee回扣金额
        this.amountLeft.shopeeCoinBack.value = amountDetail.payment_info.rebate_and_voucher.seller_absorbed_coin_cash_back || 0 //卖家shopee币现金返现
        this.amountLeft.shopShipBack.value = amountDetail.payment_info.rebate_and_voucher.shipping_rebate_from_shopee || 0 //shopee运费回扣
        this.amountLeft.discountAmount.value = this.amountLeft.saleDiscount.value + this.amountLeft.shopeeBack.value + this.amountLeft.shopeeCoinBack.value + this.amountLeft.shopShipBack.value //优惠券与回扣

        //
        this.amountRight.orderIncoming.value = amountDetail.amount || 0 //订单收入
        this.amountRight.actualPay.value = amountDetail.buyer_payment_info.merchant_subtotal || 0 //买家实付金额
        this.amountRight.goodsPrice.value = amountDetail.payment_info.merchant_subtotal.product_price || 0 //商品金额
        this.amountRight.shipAmount.value = amountDetail.buyer_payment_info.shipping_fee || 0 //运费
        this.amountRight.importTax.value = amountDetail.buyer_payment_info.import_tax || 0 //进口税
        this.amountRight.discountAmount.value = amountDetail.buyer_payment_info.seller_voucher || 0 //卖家优惠金额
        this.amountRight.shopeeCoin.value = amountDetail.buyer_payment_info.shopee_coins_redeemed || 0 //shopee币抵扣
        this.amountRight.platformDiscount.value = amountDetail.buyer_payment_info.shopee_voucher || 0 //平台优惠金额
        this.amountRight.creditFees.value = amountDetail.buyer_payment_info.credit_card_promotion || 0 //信用卡交易费
        this.amountRight.shotAmount.value = this.shotAmount || 0 //采购金额
        this.amountRight.refundAmount.value = amountDetail.payment_info.merchant_subtotal.refund_amount || 0 //退款金额
        //毛利含邮 = 订单收入 - 采购金额
        this.amountRight.grossProfitShip.value = this.amountRight.orderIncoming.value - this.shotAmount //毛利含邮
        //最终毛利 = 订单收入 - 采购金额 - 仓库发货金额
        this.amountRight.grossProfit.value =  this.amountRight.orderIncoming.value - this.shotAmount - this.warehouseShipAmount//毛利
        this.amountRight.orderIncoming.value = amountDetail.amount || 0 //买家实付金额
      } else {
        console.log(res3.data)
      }
      console.log(res3, 'res3')
      this.tableLoading = false
    },
    async getRate() {
      const data = await this.$api.exchangeRateList()
      if (data.data.code === 200) {
        this.rateList = data.data.data
      }
      console.log(this.rateList)
    },
    async getAmountDetail() {
      let params = {
        mainOrderSn: this.chooseData.main_order_sn,
      }
      let res = await this.$api.getDetail(params)
      if (res.data.code === 200) {
        this.tableData = res.data.data.orderInfos
        this.tableData.forEach((item) => {
          this.shotAmount += Number(item.shot_amount)
          this.warehouseShipAmount += Number(item.warehouse_ship_amount)
        })
      }
      console.log(res, 'res')
    },
    //商品来源中文信息
    changeTypeName(code, arr) {
      let res = arr.find((item) => {
        return item.value == code
      })
      return (res && res.label) || ''
    },
  },
}
</script>

<style lang="less" scoped>
.bill-detail {
  .bill-top {
  }
  .bill-content {
    display: flex;
    height: 500px;
    margin-top: 10px;
    .content-left,
    .content-right {
      .item {
        p {
          width: 50%;
        }
        display: flex;
        justify-content: space-between;
      }
      .activeColor {
        color: red;
      }
      p {
        height: 28px;
      }
    }
    .content-left {
      flex: 4;
    }
    .content-right {
      flex: 6;
      margin-left: 20px;
    }
  }
}
</style>
