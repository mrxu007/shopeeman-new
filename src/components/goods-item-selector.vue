<template>
<div class="goods-item-selector">
  <div class="goods-item-header">
    <div class="header-list">
      <div class="header-item">
        <el-select value="searchParams.type" size="mini" v-model="">
          <el-option :value="0" label="关键字"></el-option>
          <el-option :value="1" label="商品编号"></el-option>
        </el-select>
        <el-input size="mini" v-model="searchParams.typeKey"></el-input>
      </div>
      <div class="header-item">
        <div class="item-text">排序</div>
        <el-select value="" size="mini" v-model="searchParams.sort">
          <el-option :value="''" label="默认排序"></el-option>
          <el-option :value="'sales'" label="销量从低往高"></el-option>
          <el-option :value="'-sales'" label="销量从高往低"></el-option>
          <el-option :value="'price'" label="价格从低往高"></el-option>
          <el-option :value="'-price'" label="价格从高往低"></el-option>
        </el-select>
      </div>
      <div class="header-item">
        <div class="item-text">价格区间</div>
        <el-input size="mini" v-model="searchParams.minPrice"></el-input>
        <div style="width: 15px; border: #1a1a1a 1px solid;margin: 0 5px;" />
        <el-input size="mini" v-model="searchParams.maxPrice"></el-input>
      </div>
      <el-button type="primary" size="mini">查询商品</el-button>
      <el-button type="" size="mini">取消查询</el-button>
    </div>
    <div class="header-list">
      <div class="header-item">
        <div class="item-text">各店铺商品数量</div>
        <el-input size="mini" v-model="searchParams.goodsCount"></el-input>
      </div>
      <div class="header-item">
        <div class="item-text">过滤商品编号</div>
        <el-input size="mini" v-model="searchParams.filterNo"></el-input>
        <el-tooltip class="item" effect="dark" content="不同商品id使用,号隔开" placement="top">
          <el-button size="mini" type="text"><i class="el-icon-question" style="padding: 0 2px;"></i></el-button>
        </el-tooltip>
      </div>
      <div class="header-item">
        <div class="item-text">销量区间</div>
        <el-input size="mini" v-model="searchParams.minSales"></el-input>
        <div style="width: 15px; border: #1a1a1a 1px solid;margin: 0 5px;" />
        <el-input size="mini" v-model="searchParams.maxSales"></el-input>
      </div>
    </div>
  </div>
</div>
</template>

<script>
export default {
  name: 'goods-item-selector',
  data(){
    return{
      searchParams:{
        type:1,
        typeKey:'',
        sort:'',
        minPrice:'0',
        maxPrice:'999999',
        goodsCount:'1000',
        filterNo:'',
        minSales:'0',
        maxSales:'999999',
      }
    }
  }
}
</script>

<style lang="less">
.goods-item-selector{

}
</style>