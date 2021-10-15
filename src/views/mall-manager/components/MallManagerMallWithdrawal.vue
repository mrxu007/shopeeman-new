<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col class="header-top">
        <ul>
          <li>
            <span>站点：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>店铺分组：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>店铺：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="mini">同步店铺金额</el-button>
            <el-button type="primary" size="mini">批量提现</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="header-two">
      <el-col :span="24" class="header-two-top">
        <span>当前可提现总金额：0</span>
        <span>当前提现中总金额：0</span>
        <p>
          <span>各店铺满</span>
          <el-input v-model="site" placeholder="" size="mini" />
          <span>才可以提现</span>
        </p>
        <span>预留金额：</span>
        <el-input v-model="site" placeholder="" size="mini" />
        <el-button type="primary" size="mini">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" :max-height="height" use-virtual :data-changes-scroll-top="false" :row-height="rowHeight" :border="false" @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="100" />
        <u-table-column align="center" label="站点">1</u-table-column>
        <u-table-column align="center" label="店铺名称">1</u-table-column>
        <u-table-column align="center" label="店铺别名">1</u-table-column>
        <u-table-column align="center" label="银行">1</u-table-column>
        <u-table-column align="center" label="持卡人">1</u-table-column>
        <u-table-column align="center" label="银行卡号">1</u-table-column>
        <u-table-column align="center" label="ICNumber">1</u-table-column>
        <u-table-column align="center" label="可提现金额">1</u-table-column>
        <u-table-column align="center" label="提现中金额">1</u-table-column>
        <u-table-column align="center" label="今日是否可提现">1</u-table-column>
        <u-table-column align="center" label="操作状态"> 1 </u-table-column>
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
@import '../../../module-less/mall-manager-less/mall-withdrawal.less';
</style>
