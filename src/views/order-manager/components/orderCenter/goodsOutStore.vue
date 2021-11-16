<!--
 * @Author: your name
 * @Date: 2021-11-16 15:41:36
 * @LastEditTime: 2021-11-16 17:17:47
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\order-manager\components\orderCenter\goodsOutStore.vue
-->
<template>
  <div class="out-store">
    <div class="out-header">
      <span>{{ chooseData.length - chooseDataCopy.length + 1 }}/{{ chooseData.length }}</span>
      <el-button type="primary" size="mini" @click="goNext">{{ chooseData.length > 1 ? '匹配下一单' : '关闭' }}</el-button>
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
                <template slot-scope="scope">{{ scope.row.escrow_amount }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="操作" width="180">
                <template slot-scope="scope">
                  <div style="display: flex">
                    <el-button type="primary" size="mini" @click="">匹配商品</el-button>
                    <el-button type="primary" size="mini" @click="">添加商品</el-button>
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
              <el-table-column width="120px" label="匹配订单号" prop="country" align="center">
                <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.country }}</template>
              </el-table-column>
              <el-table-column width="120px" label="商品编号" prop="platform_mall_name" align="center" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.platform_mall_name }}</template>
              </el-table-column>
              <el-table-column width="120px" label="商品名称" prop="platform_mall_name" align="center" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.platform_mall_name }}</template>
              </el-table-column>
              <el-table-column width="120px" label="商品规格" prop="platform_mall_name" align="center" show-overflow-tooltip>
                <template slot-scope="scope" v-if="scope.row.mall_info">{{ scope.row.mall_info.platform_mall_name }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="可用库存" width="80">
                <template slot-scope="scope">{{ changeTypeName(scope.row.goods_info.ori_platform_id, goodsSourceList) }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="出库数量" min-width="80">
                <template slot-scope="scope">{{ changeTypeName(scope.row.goods_info.ori_platform_id, goodsSourceList) }}</template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="商品图片" min-width="80">
                <template slot-scope="scope">
                  <el-image v-bind:src="[scope.row.country, scope.row.platform_mall_id, scope.row.product_cover] | imageRender" style="width: 400px; height: 400px"></el-image>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="是否赠品" width="80">
                <template slot-scope="scope"></template>
              </el-table-column>
              <el-table-column align="center" prop="ori_platform_id" label="操作" min-width="160">
                <template slot-scope="scope">
                  <el-button type="primary" size="mini" @click="">匹配商品</el-button>
                  <el-button type="primary" size="mini" @click="">添加商品</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
        </div>
      </div>
      <div class="content-right">
        <div class="order-box">
          <span class="order-title">订单信息</span>
          <div class="order-item"></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsOutStore',
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
    }
  },
  mounted() {
    this.chooseDataCopy = JSON.parse(JSON.stringify(this.chooseData))
    this.total = this.chooseDataCopy.length
    this.orderInfo = this.chooseDataCopy[0]
    this.getDetail(this.orderInfo)
    console.log(this.chooseDataCopy)
  },
  methods: {
    //获取详情
    async getDetail(orderInfo) {
      let params = {
        mainOrderSn: orderInfo.main_order_sn,
      }
      let { data } = await this.$api.getDetail(params)
      if (data.code === 200) {
        this.orderList = data.data.orderInfos
        this.orderList.forEach((item) => {
          item.country = orderInfo.country
          item.platform_mall_id = orderInfo.mall_info.platform_mall_id
        })
      }
      console.log(data, '')
    },
    goNext() {
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
.order-content {
  margin-top: 10px;
  display: flex;
  .content-left {
    // flex: 6;
    width: 80%;
    display: flex;
    flex-direction: column;
  }
  .content-right {
    // flex: 4;
    width: 20%;
    margin-left: 10px;
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
  }
}
</style>>

