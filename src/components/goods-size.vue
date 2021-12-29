<template>
  <div class="contaniner category-mapp">
    <div class="on_new_dialog_box">
      <div class="keepRight" style="margin-right: 5px;">商品重量(kg)：</div>
      <el-input size="mini" v-model="goodsSize.weight"></el-input>
    </div>
    <div class="on_new_dialog_box">
      <div class="keepRight" style="margin-right: 5px;">商品长度(cm)：</div>
      <el-input size="mini" v-model="goodsSize.long"></el-input>
    </div>
    <div class="on_new_dialog_box">
      <div class="keepRight" style="margin-right: 5px;">商品宽度(cm)：</div>
      <el-input size="mini" v-model="goodsSize.width"></el-input>
    </div>
    <div class="on_new_dialog_box">
      <div class="keepRight" style="margin-right: 5px;">商品高度(cm)：</div>
      <el-input size="mini" v-model="goodsSize.height"></el-input>
    </div>
    <div style="display:flex;justify-content: space-evenly;margin: 15px 0;">
      <el-button size="mini" @click="$emit('goodsSizeChange',goodsSize)" type="primary">确定</el-button>
      <el-button size="mini" @click="$emit('goodsSizeChange','')">取消</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goods-size',
    data(){
      return{
        goodsSize:{
          width: '0',
          height: '0',
          long: '0',
          weight: '0',
        },
      }
    }
  }
</script>

<style scoped>

</style>
