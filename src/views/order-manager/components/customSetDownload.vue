<template>
  <div>
    <el-table :data="goodsList" tooltip-effect="dark">
      <div v-for="(gPros,index) in goodsProps" :key="index">
        <el-table-column v-if="gPros.propName!=='goods_img'" align="center" :prop="gPros.propName" :label="gPros.label" min-width="120" />
        <el-table-column v-else align="center" :prop="gPros.propName" :label="gPros.label" min-width="120">
          <template slot-scope="scope">
            <el-image :src="[scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
          </template>
        </el-table-column>
      </div>
    <!-- <el-table-column align="center" prop="goods_name" label="商品名称" min-width="180" show-overflow-tooltip fixed />
      <el-table-column align="center" prop="order_sn" label="订单编号" min-width="120" />
      <el-table-column align="center" label="商品图片" min-width="80">
        <template slot-scope="scope">
          <el-image :src="[scope.row.goods_img] | imageRender" style="width: 56px; height: 56px" />
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goods_id" label="商品ID" min-width="120">
        <template slot-scope="scope">
          <el-button size="mini" type="primary" @click="openUrl(clickRow, scope.row.goods_id, 'product')">{{ scope.row.goods_id }}</el-button>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="goods_count" label="商品数量" min-width="120" />
      <el-table-column align="center" prop="outer_goods_id" label="parentSKU" min-width="120" show-overflow-tooltip />
      <el-table-column align="center" prop="variation_name" label="商品规格" min-width="120" fixed="right" /> -->
    </el-table>
  </div>
</template>
<script>
export default {

  props: {
    goodsProps: {
      type: Array,
      default: () => []
    },
    goodsList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
    }
  }
}
</script>
