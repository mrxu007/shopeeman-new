<!--
 * @Author: your name
 * @Date: 2021-11-30 10:53:52
 * @LastEditTime: 2022-01-06 11:05:56
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\secondSale.vue
-->
<template>
  <div class="second-sale">
    <div class="header">
      <div class="btn-header">
        <div class="item mar-right">
          <span>商品ID：</span>
          <el-input v-model="goodsId" size="mini" />
        </div>
        <div class="item mar-right">
          <span>规格编号：</span>
          <el-input v-model="skuId" size="mini" />
        </div>
        <div class="item mar-right">
          <span>商品货号：</span>
          <el-input v-model="goodsNum" size="mini" />
        </div>
        <el-button type="primary" size="mini" @click="getSecondSaleList">搜 索</el-button>
      </div>
      <p>温馨提示：1：二次销售商品不会进行拆包！！！；2：同一订单不允许同时操作国内中转发货和国外二次销售！！</p>
      <p>温馨提示：3：二次销售匹配的商品会自动拉取历史的采购价进行计算；2：包裹以平台物流单号为维度进行二次出库，并推送到包裹所在仓库</p>
    </div>
    <div class="content">
      <div class="order-box">
        <span class="order-title">订单商品信息</span>
        <div class="order-item">
          <el-table
            ref="muliTbale"
            :data="orderList"
            tooltip-effect="dark"
            style="width: 100%"
            height="160"
            :header-cell-style="{
              textAlign: 'center',
              backgroundColor: '#f5f7fa',
            }"
          >
            <el-table-column min-width="130px" label="订单编号" prop="order_sn" align="center" />
            <el-table-column width="80px" label="采购状态" align="center">
              <template v-if="scope.row.order_status" slot-scope="scope">{{ changeShotStatus(scope.row.shot_order_info.shot_status) }}</template>
            </el-table-column>
            <el-table-column min-width="120px" label="商品名称" prop="goods_name" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.goods_info.goods_name || '' }}</template>
            </el-table-column>
            <el-table-column width="120px" label="SKUID" prop="variation_id" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.goods_info.variation_id || '' }}</template>
            </el-table-column>
            <el-table-column min-width="120px" label="商品规格" prop="variation_sku" align="center" show-overflow-tooltip>
              <template slot-scope="scope">{{ scope.row.goods_info.variation_name || '' }}</template>
            </el-table-column>
            <el-table-column align="center" label="商品货号" min-width="120">
              <template slot-scope="scope">{{ scope.row.goods_info.variation_sku || '' }}</template>
            </el-table-column>
            <el-table-column align="center" label="商品ID" min-width="120">
              <template slot-scope="scope">
                <p>{{ scope.row.goods_info.goods_id }}</p>
              </template>
            </el-table-column>
            <el-table-column align="center" label="商品数量" min-width="80">
              <template slot-scope="scope">{{ scope.row.goods_info.goods_count }}</template>
            </el-table-column>
            <el-table-column align="center" label="商品图片" min-width="80">
              <template slot-scope="scope">
                <el-tooltip effect="light" placement="right-end" :visible-arrow="false" :enterable="false" style="width: 56px; height: 56px; display: inline-block">
                  <div slot="content">
                    <el-image :src="[scope.row.goods_info.goods_img] | imageRender" style="width: 400px; height: 400px" />
                  </div>
                  <el-image :src="[scope.row.goods_info.goods_img,true] | imageRender" style="width: 56px; height: 56px" />
                </el-tooltip>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="escrow_amount" label="订单收入" min-width="80">
              <template
                slot-scope="scope"
              ><p>
                {{ scope.row.escrow_amount }}<span>{{ scope.row.country | siteCoin }}</span>
              </p></template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="order-box">
        <span class="order-title">二次销售海外商品信息</span>
        <div class="order-item">
          <el-table
            ref="muliTbale"
            v-loading="tableLoading"
            :data="secondOrderList"
            tooltip-effect="dark"
            style="width: 100%"
            height="350"
            :header-cell-style="{
              textAlign: 'center',
              backgroundColor: '#f5f7fa',
            }"
          >
            <el-table-column min-width="60px" label="站点" align="center">
              <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
            </el-table-column>
            <el-table-column width="120px" label="包裹所在仓库" align="center" prop="receive_warehouse_name" />
            <el-table-column min-width="120px" label="平台物流单号" prop="platform_tracking_number" align="center" />
            <el-table-column width="120px" label="退件类型" prop="variation_id" align="center">
              <template slot-scope="scope">{{ returnType[Number(scope.row.id)] }}</template>
            </el-table-column>
            <el-table-column min-width="80px" label="退件状态" prop="variation_sku" align="center">
              <template slot-scope="scope">{{ returnStatus[Number(scope.row.id)] }}</template>
            </el-table-column>
            <el-table-column align="center" label="规格编号" min-width="120" prop="variation_id" />
            <el-table-column align="center" label="商品货号" min-width="120" prop="">
              <template v-slot="{row}">{{ row.goods_info.variation_sku || '' }}</template>
            </el-table-column>
            <el-table-column align="center" label="商品ID" min-width="120" prop="goods_id" />
            <el-table-column align="center" label="商品数量" min-width="80" prop="goods_count" />
            <el-table-column align="center" label="商品图片" min-width="80">
              <template slot-scope="scope">
                <el-image :src="[scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
              </template>
            </el-table-column>
            <el-table-column align="center" prop="goods_price" label="商品价格" min-width="80" />
            <el-table-column align="center" label="操作" min-width="80">
              <template slot-scope="scope">
                <el-button size="mini" type="primary" @click="matchAndOut(scope.row)">匹配出库</el-button>
              </template>
            </el-table-column>
          </el-table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { changeShotStatus } from './orderCenter'
export default {
  name: 'SecondSale',
  props: {
    chooseData: {
      type: Object,
      default: {}
    },
    secondOrderData: {
      type: Array,
      default: []
    }
  },
  data() {
    return {
      goodsId: '',
      skuId: '',
      goodsNum: '',
      orderList: [],
      secondOrderList: [],
      returnType: ['未知', '跨境', '本土预售', '本土拍单', '采购物流单号', '备货暂存'],
      returnStatus: ['已收货或上架', '已匹配订单', '已下架'],
      tableLoading: false
    }
  },
  mounted() {
    this.orderList = [this.chooseData]
    console.log('111', this.orderList)
    if (this.chooseData.secondType === 'skuID') {
      this.skuId = this.chooseData.goods_info.variation_id
    } else if (this.chooseData.secondType === 'goodsId') {
      this.goodsId = this.chooseData.goods_info.goods_id
    } else if (this.chooseData.secondType === 'skuName') {
      this.goodsNum = this.chooseData.goods_info.goods_spec
    }
    this.secondOrderList = this.secondOrderData
    console.log(this.chooseData)
  },
  methods: {
    // 二次销售出库
    async matchAndOut(row) {
      if (row.country !== this.chooseData.country) {
        return this.$message.warning('必须为相同站点才能进行商品二次销售')
      }
      const params = {
        id: row.id,
        sysOrderId: this.chooseData.id
      }
      const res = await this.$api.uploadSecondSale(params)
      console.log(res, 'res')
      if (res.data.code === 200) {
        this.$message.success(`匹配出库成功！`)
        this.$emit('close')
      } else {
        this.$message.error(`匹配出库失败，${res.data.message}`)
      }
    },
    // 搜索
    async getSecondSaleList() {
      const params = {
        goodsId: this.goodsId,
        variationId: this.skuId,
        goodsSpec: this.goodsNum
      }
      this.tableLoading = true
      const res = await this.$api.getsecondlist(params)
      if (res.data.code === 200) {
        this.secondOrderList = res.data.data
      }
      this.tableLoading = false
      console.log('getSecondSaleList', this.secondOrderList)
    },
    changeShotStatus
  }
}
</script>

<style lang="less" scoped>
.mar-right {
  margin-right: 10px;
}
.inputWidth {
  width: 180px;
}
.second-sale {
  .header {
    p {
      height: 26px;
      color: red;
    }
    .btn-header {
      margin-bottom: 10px;
      display: flex;
      .item {
        display: flex;
        align-items: center;
        span {
          display: inline-block;
          width: 80px;
          text-align: left;
        }
      }
    }
  }
  .content {
    margin-top: 20px;
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
      }
    }
  }
}
</style>
