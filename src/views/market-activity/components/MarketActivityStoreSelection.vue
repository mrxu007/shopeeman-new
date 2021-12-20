<template>
  <el-row class="contaniner">
    <el-row class="header">
      <ul>
        <li>
          <div class="base-box">
            <span class="base-title">店铺分组</span>
            <div class="base-item">
              <storeChoose @changeMallList="changeMallList" />
            </div>
            <div class="base-item" style="margin-left:18px">
              <el-checkbox>只查询已启用的精选组</el-checkbox>
              <el-checkbox style="margin-left: 17px;">每隔 <el-input size="mini" class="input" clearable /> 小时循环启用精选组</el-checkbox>
            </div>
            <div style="margin-left:18px">
              <el-button type="primary" size="mini">查询精选组</el-button>
              <el-button type="primary" size="mini">添加单个精选组</el-button>
              <el-button type="primary" size="mini">批量删除精选组</el-button>
              <el-button type="primary" size="mini">批量关闭精选组</el-button>
              <el-checkbox v-model="showConsole" style="margin:0 10px">隐藏日志</el-checkbox>
              <el-button type="primary" size="mini">清除日志</el-button>
            </div>
          </div>
        </li>
        <li>
          <div class="base-box">
            <span class="base-title">添加精选组参数数据</span>
            <div class="base-item">
              <span>每个店铺添加 <el-input size="mini" class="input" clearable /> 组精选商品<span class="red-span">（最大10组）</span></span>
              <span>每组精选添加 <el-input size="mini" class="input" clearable /> 个商品<span class="red-span">（最少4个，最多8个）</span></span>
            </div>
            <div class="base-item">
              <span>精选商品排序 </span>
              <el-select
                v-model="goodsSort"
                size="mini"
                filterable
              >
                <el-option
                  v-for="(item,index) in goodsSortList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
                <el-button type="primary" size="mini">开始批量添加</el-button>
                <el-button type="primary" size="mini">停止添加</el-button>
              </el-select>
            </div>

          </div>
        </li>
      </ul>
    </el-row>
    <el-row id="article">
      <u-table
        ref="plTable"
        :data="tableData"
        use-virtual
        :height="760"
        :row-height="68"
        :data-changes-scroll-top="false"
        :border="false"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
        @selection-change="handleSelectionChange"
      >
        <u-table-column align="center" type="selection" label="序号" min-width="50" />
        <u-table-column align="center" type="index" label="序号" min-width="50" />
      </u-table>
    </el-row>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </el-row>
</template>

<script>
import StoreChoose from '../../../components/store-choose'
export default {
  components: {
    StoreChoose
  },
  data() {
    return {

      goodsSort: 0, // 排序
      showConsole: true, // 日志
      country: '', // 站点

      selectMallList: [], // 店铺选择数据
      tableData: [], // 表格数据
      multipleSelection: [], // 选择数据

      goodsSortList: [
        { value: 0, label: '最热销' },
        { value: 1, label: '最近更新' },
        { value: 2, label: '价格（从低至高）' },
        { value: 3, label: '价格（从高至低）' }
      ]
    }
  },
  methods: {
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
      console.log('changeMallList', val)
    }
  }
}
</script>

<style lang="less" scoped>
@import '../../../module-less/market-activity-less/store-selection.less';
</style>
