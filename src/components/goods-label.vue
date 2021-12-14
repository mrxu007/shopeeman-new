<template>
  <div class="goods_tag_dialog">
    <div class="on_new_dialog_box">
      <div>商品标签：</div>
      <el-select v-model="goodsTagAction" size="mini" style="width: 200px;">
        <el-option
            v-for="item in goodsTagList"
            :key="item.id"
            :label="item.label_name"
            :value="item.label_name">
        </el-option>
      </el-select>
    </div>
    <div class="on_new_dialog_box" style="margin-top: 10px;">
      <div>当前标签：</div>
      <el-input size="mini" style="width: 200px;" v-model="goodsTagCurrent"></el-input>
    </div>
    <div class="on_new_dialog_box" style="justify-content: space-evenly;margin-top: 10px;">
      <el-button type="primary" size="mini" @click="updateGoodsTag">　确　定　</el-button>
      <el-button size="mini" @click="goodsTagVisible = false">　取　消　</el-button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'goods-label',
    data(){
      return{
        goodsTagList: [],
      }
    },
    methods:{
      async updateGoodsTag(){

      },
      async enterGoodsTag() {
        let goodsTagListJson = await this.$commodityService.getGoodsTagList()
        let goodsTagListRes = JSON.parse(goodsTagListJson)
        this.goodsTagList = goodsTagListRes.data || []
      },
    }
  }
</script>

<style scoped>

</style>
