
<template>
  <div class="advertisement">
    <div class="header-btn">
      <storeChoose @changeMallList="changeMallList" />
    </div>
    <div class="select-btn">
      <div class="top">
        <div class="base-box">
          <span class="base-title">综合统计</span>
          <div class="base-item">
            <el-date-picker
              v-model="statisticalTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 300px"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
            />
            <el-button type="primary" size="mini" class="mar-left">搜 索</el-button>
            <el-button type="primary" size="mini" >查看详情</el-button>
            <el-button type="primary" size="mini" >停止搜索</el-button>
            <el-checkbox v-model="showConsole" class="mar-left">隐藏日志</el-checkbox>
          </div>
        </div>
      </div>
    </div>
    <Logs ref="Logs" clear v-model="showConsole" />
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import { batchOperation, delay, terminateThread, exportExcelDataCommon,creatDate } from '@/util/util'
export default {
  components: {
    storeChoose,
  },
  data() {
    return {
       pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        },
      },
      selectMallList: [],
      country: '',
      statisticalTime:[],
      showConsole:false
    }
  },
  mounted(){
    this.statisticalTime = creatDate(1)
  },
  methods: {
    changeMallList(val) {
      this.selectMallList = val
      this.country = val.country
    },
  },
}
</script>

<style lang="less" scoped>
.advertisement {
  margin: 10px;
  overflow: hidden;
  background: #fff;
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.mar-left{
  margin-left: 10px;
}
.header-btn {
  margin: 10px 0;
}
.select-btn {
  margin: 0 10px 10px 10px;
}
.base-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 10px;
  position: relative;
  // min-width: 702px;
  height: 100%;
  .base-title {
    padding: 0 5px;
    display: inline-block;
    height: 20px;
    line-height: 20px;
    text-align: center;
    background: #fff;
    position: absolute;
    left: 10px;
    top: -10px;
  }
  .base-item {
  }
}
</style>
