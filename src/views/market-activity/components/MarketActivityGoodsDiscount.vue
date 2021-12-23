<template>
  <el-row class="contaniner">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="活动列表" name="list">
        <el-row class="header">
          <ul>
            <storeChoose @changeMallList="changeMallList" />
          </ul>
          <ul>
            <li>
              <span>活动：</span>
              <el-select
                v-model="discountType"
                size="mini"
                filterable
                :disabled="isDisabled"
              >
                <el-option :value="''" label="全部" />
                <el-option
                  v-for="(item,index) in discountTypeList"
                  :key="index"
                  :value="item.value"
                  :label="item.label"
                />
              </el-select>
            </li>
          </ul>
        </el-row>
        <el-row id="article" />
      </el-tab-pane>
      <el-tab-pane label="活动编辑" name="edit">
        <el-row class="header" />
        <el-row id="article" />
      </el-tab-pane>
    </el-tabs>
    <div class="logging">
      <Logs ref="Logs" v-model="showConsole" clear />
    </div>
  </el-row>
</template>

<script>
import { batchOperation, delay, terminateThread } from '@/util/util'
import StoreChoose from '../../../components/store-choose'
import GoodsDiscount from '../../../module-api/market-activity-api/goods-discount'
export default {
  components: {
    StoreChoose
  },
  data() {
    return {
      activeName: 'list',
      GoodsDiscount: new GoodsDiscount(this),

      showConsole: true, // 日志

      selectMallList: [], // 店铺选择数据
      tableData: [], // 表格数据
      multipleSelection: [] // 选择数据
    }
  },
  methods: {
    handleClick(tab, event) {

    },
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
@import '../../../module-less/market-activity-less/goods-discount.less';
</style>
