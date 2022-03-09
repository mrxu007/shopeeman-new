<template>
  <el-row class="contaniner">
    <el-row class="header">
      <div class="on_new_dialog_box" style="margin-bottom: 10px;">
        <div class="keepRight">店铺站点：</div>
        <el-select v-model="countryOption" size="mini" filterable style="width: 140px">
          <el-option v-for="(item, index) in countriesOption" :key="index" :label="item.label" :value="item.value"/>
        </el-select>
        <div class="keepRight">任务名称：</div>
        <el-input size="mini" v-model="taskName" style="width: 140px;"></el-input>
        <div class="keepRight">任务日期：</div>
        <el-date-picker v-model="taskTimeStart" type="date" size="mini" placeholder="选择开始日期" style="width: 140px"></el-date-picker>
        <div style="width: 8px;height: 1px;background: #1a1a1a;margin: 0 5px;"></div>
        <el-date-picker v-model="taskTimeEnd" type="date" size="mini" placeholder="选择结束日期" style="width: 140px"></el-date-picker>
      </div>
      <div class="on_new_dialog_box" style="margin-bottom: 10px;margin-left: 20px;">
        <el-button size="mini" type="primary">搜索任务</el-button>
        <el-button size="mini" type="primary">启动任务</el-button>
        <el-button size="mini" >取消任务</el-button>
        <el-button size="mini" type="primary">删除任务</el-button>
      </div>
    </el-row>
  </el-row>
</template>
<script>
export default {
  data() {
    return {
      countriesOption: this.$filters.countries_option,
      countryOption: 'TH',
      taskName:'',
      taskTimeStart:new Date(new Date().getTime() + 3600 * 1000 * 24),
      taskTimeEnd:new Date(new Date().getTime() + 3600 * 1000 * 24 * 3),
    }
  }

}
</script>