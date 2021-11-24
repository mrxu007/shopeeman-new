<template>
  <div class="detail">
    <div class="condition" />
    <div class="tableDetail">
      <el-table
        :data="tableList"
        height="calc(100vh - 312px)"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="" label="店铺名称" align="center" min-width="100px" fixed />
        <el-table-column prop="" label="类目" align="center" min-width="100px" />
        <el-table-column prop="" label="主图" align="center" min-width="100px" />
        <el-table-column prop="" label="商品ID" align="center" min-width="100px" />
        <el-table-column prop="" label="商品标题" align="center" min-width="100px" />
        <el-table-column prop="" label="库存" align="center" min-width="100px" />
        <el-table-column prop="" label="销量" align="center" min-width="100px" />
        <el-table-column prop="" label="价格" align="center" min-width="100px" />
      </el-table>
    </div>
  </div>
</template>
<script>
export default {

}
</script>
