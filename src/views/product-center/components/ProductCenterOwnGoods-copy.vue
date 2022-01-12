<!--
 * @Author: your name
 * @Date: 2022-01-11 16:12:55
 * @LastEditTime: 2022-01-11 16:50:55
 * @LastEditors: Please set LastEditors
 * @Description: 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
 * @FilePath: \shopeeman-new\src\views\product-center\components\ProductCenterOwnGoods-copy.vue
-->
<template>
  <div class="product-center">
    <div class="selectBox">
      <div class="select-row">
        <div class="item-box">
          <span>商品创建时间:</span>
          <el-date-picker v-model="form.returnCreateTime" unlink-panels size="mini" type="daterange" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" />
        </div>
        <div class="item-box">
          <product-choose ref="isClean" @CateId="CateId" class="mar-left" />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ProductChoose from '../../../components/product-choose-product-center.vue'
export default {
  components: {
    ProductChoose
  },
  data() {
    return {
      form: {
        returnCreateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品创建时间
        returnCategory: '', // 商品类目
        returnStatus: -1, // 商品状态
        returnUpdateTime: [new Date().getTime() - 3600 * 1000 * 24 * 30, new Date()], // 商品更新时间
        returnSkuId: '', // sku编码
        returnGoodsName: '', // 商品名称
        returnGoodsId: '', // 商品ID
      },
    }
  },
  methods:{
    CateId(val) {
      console.log(val,"val")
      this.form.returnCategory = val
    },
  }
}
</script>

<style lang="less" scoped>
.product-center {
  margin: 10px;
  overflow: hidden;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-left{
  margin-left: 10px;
}
.selectBox {
  padding: 16px;
  display: flex;
  background: #fff;
  overflow: auto;
  .select-row {
    display: flex;
  }
}
.item-box {
  display: flex;
  align-items: center;
  span {
    display: inline-block;
    width: 80px;
    text-align: right;
  }
}
</style>