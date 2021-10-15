<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col :span="24" class="header-top">
        <ul>
          <li>
            <span>站点：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>距今无订单天数：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <el-select v-model="site" class="unnormal" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
            <el-input v-model="site" class="unnormal2" placeholder="" size="mini" />
          </li>
          <li>
            <span>客服数据统计时间(仅用于同步数据)：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="primary" size="mini">导出数据</el-button>
            <el-button type="primary" size="mini">同步店铺数据</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="header-two">
      <el-col :span="24" class="header-two-top">
        <span>当前条件下，待拨款总订单数：8 </span>
        <span>待拨款总金额： 1</span>
        <span>本周已拨款总金额： 1</span>
        <span>本月已拨款总金额：1 </span>
        <span>全部已拨款总金额：1 </span>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" :max-height="height" use-virtual :data-changes-scroll-top="false" :row-height="rowHeight" :border="false" @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="100" />
        <u-table-column align="center" label="站点">1</u-table-column>
        <u-table-column align="center" label="店铺ID">1</u-table-column>
        <u-table-column align="center" label="店铺名称">1</u-table-column>
        <u-table-column align="center" label="店铺分组">1</u-table-column>
        <u-table-column align="center" label="操作状态">
          <template>
            <el-button type="primary" size="mini">修改分组</el-button>
          </template>
        </u-table-column>
        <u-table-column align="center" label="最近订单创建时间">1</u-table-column>
        <u-table-column align="center" label="距今无订单天数">1</u-table-column>
        <u-table-column align="center" label="昨日订单数">1</u-table-column>
        <u-table-column align="center" label="近7天订单数">1</u-table-column>
        <u-table-column align="center" label="历史订单数">1</u-table-column>
        <u-table-column align="center" label="店铺额度">1</u-table-column>
        <u-table-column align="center" label="全部产品数">1</u-table-column>
        <u-table-column align="center" label="上架产品数">1</u-table-column>
        <u-table-column align="center" label="售空产品数">1</u-table-column>
        <u-table-column align="center" label="禁卖产品数">1</u-table-column>
        <u-table-column align="center" label="未上架产品数">1</u-table-column>
        <u-table-column align="center" label="聊聊回复率">1</u-table-column>
        <u-table-column align="center" label="卖场评价">1</u-table-column>
        <u-table-column align="center" label="订单未完成率">1</u-table-column>
        <u-table-column align="center" label="关注量">1</u-table-column>
        <u-table-column align="center" label="粉丝量">1</u-table-column>
        <u-table-column align="center" label="商品浏览量">1</u-table-column>
        <u-table-column align="center" label="昨日商品浏览量">1</u-table-column>
        <u-table-column align="center" label="近7天商品浏览量">1</u-table-column>
        <u-table-column align="center" label="近30天商品浏览量">1</u-table-column>
        <u-table-column align="center" label="访客数">1</u-table-column>
        <u-table-column align="center" label="昨日访客数">1</u-table-column>
        <u-table-column align="center" label="近7日访客数">1</u-table-column>
        <u-table-column align="center" label="近30日访客数">1</u-table-column>
        <u-table-column align="center" label="客服不重复访客数">1</u-table-column>
        <u-table-column align="center" label="客服询问数">1</u-table-column>
        <u-table-column align="center" label="客服访客询问数">1</u-table-column>
        <u-table-column align="center" label="客服已回应数">1</u-table-column>
        <u-table-column align="center" label="客服无回应数">1</u-table-column>
        <u-table-column align="center" label="客服咨询买家数">1</u-table-column>
        <u-table-column align="center" label="客服咨询订单数">1</u-table-column>
        <u-table-column align="center" label="客服咨询件数">1</u-table-column>
        <u-table-column align="center" label="客服咨询销售额">1</u-table-column>
        <u-table-column align="center" label="客服平均回应时间">1</u-table-column>
        <u-table-column align="center" label="待拨款订单数">1</u-table-column>
        <u-table-column align="center" label="待拨款金额">1</u-table-column>
        <u-table-column align="center" label="本周已拨款">1</u-table-column>
        <u-table-column align="center" label="本月已拨款">1</u-table-column>
        <u-table-column align="center" label="全部已拨款">1</u-table-column>
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
