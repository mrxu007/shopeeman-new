<template>
<div class="category-mapp">
  <div class="category_dialog">
    <div class="category_box">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div class="keepRight">店铺站点：</div>
        {{ country | chineseSite }}
      </div>
      <div class="on_new_dialog_box" v-for="(item,index) in categoryList" :key="index">
        <div class="keepRight">{{index+1}}级类目：</div>
        <el-select v-model="categoryAction[index]" @change="setCategory(categoryAction[index],index)" size="mini"
                   style="width: 200px;">
          <el-option
              v-for="son in item"
              :key="son.id"
              :label="son.category_name+'('+son.category_cn_name+')'"
              :value="son.category_id">
          </el-option>
        </el-select>
      </div>
    </div>
    <div class="category_box" style="margin-left: 20px;">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div class="width_single_150">属性名称：</div>
        <div>属性值<span style="color:red">(必填)</span></div>
      </div>
      <div class="on_new_dialog_box line_height_28" v-for="(item,index) in attributesList" :key="index">
        <div class="width_single_150">{{item.attribute_name}}({{item.attribute_cn_name}})</div>
        <div>
          <el-select v-model="item.options" size="mini" style="width: 180px;">
            <el-option v-for="son in item.new_options_obj" :key="son.value_id" :label="son.value"
                       :value="son.value_id">
            </el-option>
          </el-select>
        </div>
      </div>
    </div>
  </div>
  <div class="on_new_dialog_box" style="margin-top: 25px;justify-content: space-evenly">
    <el-button type="primary" size="mini" @click="confirmCategory()">　确　定　</el-button>
    <el-button size="mini" @click="categoryVisible = false">　取　消　</el-button>
  </div>
</div>
</template>

<script>
  export default {
    name: 'category-mapp'
  }
</script>

<style scoped>

</style>
