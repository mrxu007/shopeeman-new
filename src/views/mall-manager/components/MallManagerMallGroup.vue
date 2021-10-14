<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col :span="24" class="header-top">
        <ul>
          <li>
            <span>分组名称：</span>
            <el-input v-model="test" placeholder="" size="mini" />
          </li>
          <li>
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="primary" size="mini">新增分组</el-button>
            <el-button type="primary" size="mini">删除当前分组</el-button>
            <el-button type="primary" size="mini">绑定运营</el-button>
            <el-button type="primary" size="mini">绑定客服</el-button>
            <el-button type="primary" size="mini">绑定跟单</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" :max-height="height" use-virtual :data-changes-scroll-top="false" :row-height="rowHeight" :border="false" @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="100" />
        <u-table-column align="center" label="分组名称">1</u-table-column>
        <u-table-column align="center" label="绑定运营">1</u-table-column>
        <u-table-column align="center" label="绑定客服">1</u-table-column>
        <u-table-column align="center" label="绑定跟单">1</u-table-column>
        <u-table-column align="center" label="操作">
          <template>
            <el-button type="primary" size="mini">修改分组</el-button>
          </template>
        </u-table-column>
      </u-table>
    </el-row>
  </el-row>
</template>

<script>
export default {

}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-data.less';
</style>
