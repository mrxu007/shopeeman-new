<!--
 * @Author: your name
 * @Date: 2021-11-23 11:11:14
 * @LastEditTime: 2021-11-23 21:14:14
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\billDetail.vue
-->
<template>
  <div class="bill-detail">
    <div class="bill-top">
      <el-table :data="tableData" style="width: 100%" height="200">
        <el-table-column type="index" label="序号" width="50"> </el-table-column>
        <el-table-column prop="order_sn" label="订单编号" width="180"> </el-table-column>
        <el-table-column prop="goods_name" label="商品名称" min-width="200" show-overflow-tooltip> </el-table-column>
        <el-table-column prop="goods_count" label="商品数量" width="80"> </el-table-column>
        <el-table-column prop="shot_amount" label="采购金额" width="80">
          <template slot-scope="scope">{{ scope.row.shot_amount }}元</template>
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
        <div class="item" v-for="(item,key,index) in amountLeft" :key="index">
          <p>{{item.label}}</p>
          <p>{{item.value}}</p>
        </div>
      </div>
      <div class="content-right">
          
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
      rateList: [],
      billType: 'SP',
      amountLeft: {
        goodsAmount: {
          label: '商品金额',
          value: 0,
          valueRate: 0,
        }, //商品金额
        goodsPrice: {
          label: '商品价格',
          value: 0,
          valueRate: 0,
        }, //商品价格
        shipAmount: {
          label: '运费总额',
          value: 0,
          valueRate: 0,
        }, //运费总额
        buyPayShipAmount: {
          label: '买家支付的运费',
          value: 0,
          valueRate: 0,
        }, //买家支付的运费
        thirdShip: {
          label: '第三方运费',
          value: 0,
          valueRate: 0,
        }, //第三方运费
        actualShipAmount: {
          label: '实际运费（shopee代付）',
          value: 0,
          valueRate: 0,
        }, //实际运费（shopee代付）
        costAndPay: {
          label: '费用与收费',
          value: 0,
          valueRate: 0,
        }, //费用与收费
        commission: {
          label: '佣金',
          value: 0,
          valueRate: 0,
        }, //佣金
        fees: {
          label: '交易手续费',
          value: 0,
        }, //交易手续费
        payService: {
          label: '服务费',
          value: 0,
          valueRate: 0,
        }, //服务费
        creditFees: {
          label: '信用卡交易费用',
          value: 0,
          valueRate: 0,
        }, //信用卡交易费用
        customs: {
          label: '关税',
          value: 0,
          valueRate: 0,
        }, //关税
        discountAmount: {
          label: '优惠券与回扣',
          value: 0,
          valueRate: 0,
        }, //优惠券与回扣
        saleDiscount: {
          label: '卖家提供促销代码优惠',
          value: 0,
          valueRate: 0,
        }, //卖家提供促销代码优惠
        shopeeBack: {
          label: 'shopee回扣金额',
          value: 0,
          valueRate: 0,
        }, //shopee回扣金额
        shopeeCoinBack: {
          label: '卖家shopee币现金返现',
          value: 0,
          valueRate: 0,
        }, //卖家shopee币现金返现
        shopShipBack: {
          label: 'shopee运费回扣',
          value: 0,
          valueRate: 0,
        }, //shopee运费回扣
      },
      amountRight: {
        orderIncoming: 0, //订单收入
        actualPay: 0, //买家实付金额
        goodsPrice: 0, //商品金额
        shipAmount: 0, //运费
        importTax: 0, //进口税
        discountAmount: 0, //卖家优惠金额
        shopeeCoin: 0, //shopee币折抵
        platformDiscount: 0, //平台优惠金额
        creditFees: 0, //信用卡交易费
        shotAmount: 0, //采购金额
        refundAmount: 0, //退款金额
        grossProfitShip: 0, //毛利（含邮费）
        grossProfit: 0, //毛利
      },
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
    async getAmountDetailFromShopee(){
         let params = {
            order_id: this.chooseData.order_id,
            shop_id: this.chooseData.mall_info.platform_mall_id
        }
        let res3 = await this.$shopeemanService.getIncomeTransactionHistoryDetail(this.chooseData.country, params)
        if (res3.code === 200) {
            
        }else{
            console.log(res3.data)
        }
        console.log(res3, "res3")
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
        display: flex;
        justify-content: space-between;
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
