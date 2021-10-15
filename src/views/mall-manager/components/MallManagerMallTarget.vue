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
            <span>订单完成指标：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>买家满意指标：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>流程服务指标：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
        </ul>
      </el-col>
      <el-col class="header-top">
        <ul>
          <li>
            <span>评分等级：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>违反上架指标：</span>
            <el-select v-model="site" placeholder="" size="mini" filterable>
              <el-option v-for="(item, index) in 4" :key="index" />
            </el-select>
          </li>
          <li>
            <span>店铺ID：</span>
            <el-input v-model="site" placeholder="" size="mini" />
          </li>
          <li>
            <el-button type="primary" size="mini">查询</el-button>
            <el-button type="primary" size="mini">同步店铺指标数据</el-button>
            <el-button type="primary" size="mini">导出数据</el-button>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" :max-height="height" use-virtual :data-changes-scroll-top="false" :row-height="rowHeight" :border="false" @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="100" />
        <u-table-column align="center" label="站点">1</u-table-column>
        <u-table-column align="center" label="店铺名称">1</u-table-column>
        <u-table-column align="center" label="店铺ID">1</u-table-column>
        <u-table-column align="center" label="操作状态">
          <template>
            <el-button type="primary" size="mini">修改分组</el-button>
          </template>
        </u-table-column>
        <u-table-column align="center" label="本季度计分">1</u-table-column>
        <u-table-column align="center" label="买家满意度">1</u-table-column>
        <u-table-column align="center" label="上家买家满意度">1</u-table-column>
        <u-table-column align="center" label="买家满意度计分">1</u-table-column>
        <u-table-column align="center" label="订单完成率">
          <u-table-column align="center" label="未完成率">1</u-table-column>
          <u-table-column align="center" label="取消率">1</u-table-column>
          <u-table-column align="center" label="退货/退款率">1</u-table-column>
          <u-table-column align="center" label="逾期出货率">1</u-table-column>
          <u-table-column align="center" label="准备时间">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="上期订单完成率">
          <u-table-column align="center" label="未完成率">1</u-table-column>
          <u-table-column align="center" label="取消率">1</u-table-column>
          <u-table-column align="center" label="退货/退款率">1</u-table-column>
          <u-table-column align="center" label="逾期出货率">1</u-table-column>
          <u-table-column align="center" label="准备时间">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="订单未完成率计分">
          <u-table-column align="center" label="未完成率">1</u-table-column>
          <u-table-column align="center" label="取消率">1</u-table-column>
          <u-table-column align="center" label="退货/退款率">1</u-table-column>
          <u-table-column align="center" label="逾期出货率">1</u-table-column>
          <u-table-column align="center" label="准备时间">1</u-table-column>
        </u-table-column>

        <u-table-column align="center" label="违反上架规范">
          <u-table-column align="center" label="严重违规商品">1</u-table-column>
          <u-table-column align="center" label="垃圾商品">1</u-table-column>
          <u-table-column align="center" label="仿冒品或侵犯知识产权商品">1</u-table-column>
          <u-table-column align="center" label="违禁商品">1</u-table-column>
          <u-table-column align="center" label="预购商品的%">1</u-table-column>
          <u-table-column align="center" label="预购商品的天数%超过目标">1</u-table-column>
          <u-table-column align="center" label="违反其他上架爱规范">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="上期违反上架规范">
          <u-table-column align="center" label="严重违规商品">1</u-table-column>
          <u-table-column align="center" label="垃圾商品">1</u-table-column>
          <u-table-column align="center" label="仿冒品或侵犯知识产权商品">1</u-table-column>
          <u-table-column align="center" label="违禁商品">1</u-table-column>
          <u-table-column align="center" label="预购商品的%">1</u-table-column>
          <u-table-column align="center" label="预购商品的天数%超过目标">1</u-table-column>
          <u-table-column align="center" label="违反其他上架爱规范">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="违反上架规范计分">
          <u-table-column align="center" label="严重违规商品">1</u-table-column>
          <u-table-column align="center" label="垃圾商品">1</u-table-column>
          <u-table-column align="center" label="仿冒品或侵犯知识产权商品">1</u-table-column>
          <u-table-column align="center" label="违禁商品">1</u-table-column>
          <u-table-column align="center" label="预购商品的%">1</u-table-column>
          <u-table-column align="center" label="预购商品的天数%超过目标">1</u-table-column>
          <u-table-column align="center" label="违反其他上架爱规范">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="客服">
          <u-table-column align="center" label="聊天回应">1</u-table-column>
          <u-table-column align="center" label="回应速度">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="上期客服">
          <u-table-column align="center" label="聊天回应">1</u-table-column>
          <u-table-column align="center" label="回应速度">1</u-table-column>
        </u-table-column>
        <u-table-column align="center" label="客服计分">
          <u-table-column align="center" label="聊天回应">1</u-table-column>
          <u-table-column align="center" label="回应速度">1</u-table-column>
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
@import '../../../module-less/mall-manager-less/mall-target.less';
</style>
