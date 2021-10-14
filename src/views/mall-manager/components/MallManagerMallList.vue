<template>
  <el-row class="contaniner">
    <el-row class="header">
      <el-col :span="8" class="header-lft">
        <ul>
          <li>
            <span>站点：</span>
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
            <span>店铺状态：</span>
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
        </ul>
      </el-col>
      <el-col :span="16" class="header-rht">
        <ul>
          <li>
            <el-checkbox>强制登录</el-checkbox>
            <el-button type="primary" size="mini">一键登录</el-button>
            <el-button type="primary" size="mini">导入店铺</el-button>
            <el-button type="primary" size="mini">导出店铺</el-button>
            <el-button type="primary" size="mini">修改账号登录密码</el-button>
            <el-button type="primary" size="mini">修改店铺水印文字</el-button>
            <el-button type="primary" size="mini">设置店铺封面</el-button>
            <el-button type="primary" size="mini">设置退货地址</el-button>
            <el-button type="primary" size="mini">刷新登录状态</el-button>
            <el-button type="primary" size="mini">同步店铺信息</el-button>
            <el-button type="primary" size="mini">更新浏览器识别码</el-button>
            <el-button type="primary" size="mini">一键解绑店铺</el-button>
            <el-button type="primary" size="mini">开启店铺休假模式</el-button>
            <el-button type="primary" size="mini">关闭店铺休假模式</el-button>
            <el-button type="primary" size="mini">批量修改物流方式</el-button>
            <el-button type="primary" size="mini">查询</el-button>
            <el-checkbox>隐藏日志</el-checkbox>
            <p class="res-text">温馨提示：导入新加披站点店铺时，若账号为手机号时，填写模板时请填写完整(带有国家区号)的手机号，否则登录失败</p>
          </li>
        </ul>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" :max-height="height" use-virtual :data-changes-scroll-top="false" :row-height="rowHeight" :border="false" @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="100" />
        <u-table-column align="center" label="分组">1</u-table-column>
        <u-table-column align="center" label="站点">1</u-table-column>
        <u-table-column align="center" label="店铺真实名称">1</u-table-column>
        <u-table-column align="center" label="店铺ID">1</u-table-column>
        <u-table-column align="center" label="是否优质店铺">1</u-table-column>
        <u-table-column align="center" label="店铺账号">1</u-table-column>
        <u-table-column align="center" label="店铺水印文字">1</u-table-column>
        <u-table-column align="center" label="店铺额度">1</u-table-column>
        <u-table-column align="center" label="店铺别名">1</u-table-column>
        <u-table-column align="center" label="登录状态">1</u-table-column>
        <u-table-column align="center" label="店铺状态">1</u-table-column>
        <u-table-column align="center" label="授权日期">1</u-table-column>
      </u-table>
    </el-row>
  </el-row>
</template>

<script>
export default {
  methods: {
    tableScroll({ scrollTop, scrollLeft, table, judgeFlse }) {
      // {scrollTop， scrollLeft, table, judgeFlse: 这个参数返回一个boolean值，为true则代表表格滚动到了底部了，false没有滚动到底部，必须开起大数据渲染模式才能有值哦}, event
      console.log(scrollTop, scrollLeft, table, judgeFlse)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/mall-manager-less/mall-list.less';
</style>
