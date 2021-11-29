<template>
  <div class="detail">
    <div class="condition">
      <!-- row1 -->
      <div class="row1">
        <storeChoose :is-all="true" :show-mall-all="true" @changeMallList="changeMallList" />
        <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>
        <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>
        <el-checkbox v-model="showlog" style="margin: 4px">隐藏日志</el-checkbox>

      </div>
      <!-- row2 -->
      <div class="row2">
        <div class="row2_left" />
        <div class="row2_right" />
      </div>
    </div>
    <div class="tableDetail">
      <el-table
        :data="tableList"
        height="calc(100vh - 312px)"
        :header-cell-style="{ background: '#f7fafa' }"
      >
        <el-table-column type="selection" width="55" fixed />
        <el-table-column prop="" label="店铺名称" align="center" min-width="100px" fixed />
        <el-table-column prop="" label="商品名称" align="center" min-width="100px" />
        <el-table-column prop="" label="商品编号" align="center" min-width="100px" />
        <el-table-column prop="" label="创建名称" align="center" min-width="100px" />
        <el-table-column prop="" label="历史销量" align="center" min-width="100px" />
        <el-table-column prop="" label="浏览数" align="center" min-width="100px" />
        <el-table-column prop="" label="点赞数" align="center" min-width="100px" />
        <el-table-column prop="" label="操作结果" align="center" min-width="100px" fixed="right" />
      </el-table>
    </div>
  </div>
</template>
<script>
import storeChoose from '../../../components/store-choose'
export default {
  components: {
    storeChoose
  },
  methods: {
    // 店铺选择
    changeMallList(val) {}
  }
}
</script>
<style lang="less" scoped>
 .detail{
   min-width: 1280px;
 }
</style>
