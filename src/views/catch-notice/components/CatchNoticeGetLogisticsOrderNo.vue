<!--待获取物流单号订单-->
<template>
  <div class="CatchNoticeGetLogisticsOrderNo">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 采购物流编号 -->
        <div class="flowNumber">
          采购物流编号：
          <el-input v-model="form.flowNumber" size="mini" />
        </div>
        <el-button size="mini" type="primary">搜索</el-button>
        <el-button size="mini" type="primary">登录拼多多</el-button>
        <el-button size="mini" type="primary">登录淘宝</el-button>
        <el-button size="mini" type="primary">登录1688</el-button>
        <el-button size="mini" type="primary">登录Lazada</el-button>
        <el-button size="mini" type="primary" @click="flowNumberHandle">获取采购物流单号</el-button>、
        <el-checkbox v-model="hideLog">隐藏日志</el-checkbox>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：采购订单发货需及时获取采购物流单号，此通知只会同步采购后近5天未获取采购物流单号的订单
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        操作指引：请根据采购类型和采购账号登录对应采购账号获取采购物流单号或者手动填写采购物流单号
      </div>
    </div>
    <!-- 下面表格部分 -->
    <div class="bottom">
      <el-table
        :header-cell-style="{background:'#f5f7fa'}"
        :data="tableData"
        border
        style="width: 100%"
        height="calc(100vh - 160px)"
      >
        <el-table-column
          type="index"
          label="序列号"
          width="80"
        />
        <el-table-column
          label="订单号"
          prop=""
        />
        <el-table-column
          prop=""
          label="采购类型"
        />
        <el-table-column
          prop=""
          label="采购订单号"
        />
        <el-table-column
          prop=""
          label="采购时间"
        />
        <el-table-column
          prop=""
          label="采购账号"
        />
        <el-table-column
          prop=""
          label="付款账号"
        />
        <el-table-column
          label="操作"
        />
      </el-table>
      <el-input
        v-if="!hideLog"
        v-model="logData"
        resize="none"
        type="textarea"
        class="flowNumberLog"
      />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   搜索条件
      form: {
        flowNumber: '' // 采购物流编号
      },
      hideLog: false, // 隐藏日志
      // 表格数据
      tableData: [],
      logData: ''// 日志内容
    }
  },
  methods: {
    // 获取采购物流单号
    flowNumberHandle() {
      this.hideLog = false
    }
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeGetLogisticsOrderNo{
    padding: 16px;
    background: #fff;
}
//上面查询条件部分
.search{
    white-space: nowrap;
    overflow-y: auto;
    &>div{
        margin: 10px 0;
        &:first-child{
          margin-top: 0;
        }
        &:last-child{
          margin-bottom: 0;
        }
    }
    .rowOne{
        display: flex;
        align-items: center;
        //采购物流单号
        .flowNumber{
          margin-right: 10px;
            .el-input{
                width: 80px;
            }
        }
    }
    .rowThree{
      color: red;
    }
}
.bottom{
  display: flex;
  margin-top: 10px;
  //表格部分
  .el-table{
    flex: 1;
  }
  //日志部分
  .flowNumberLog{
      width: 300px;
      /deep/.el-textarea__inner{
        border-radius: 0;
        height:calc(100vh - 160px);
      }
  }
}
</style>
