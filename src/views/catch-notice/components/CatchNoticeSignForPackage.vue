<!--签收包裹异常-->
<template>
  <div class="CatchNoticeSignForPackage">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 签收时间 -->
        <div class="signingTime">
          签收时间：<el-date-picker
            v-model="form.signingTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </div>
        <!-- 采购物流单号 -->
        <div class="logisticsNumber">
          采购物流单号：
          <el-input v-model="form.logisticsNumber" size="mini" />
        </div>
        <el-button size="mini" type="primary">搜索</el-button>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：包裹已签收，但是匹配不到订单，仓库无法发货，需及时匹配订单，此界面只显示近7天的数据包裹异常数据
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        操作指引：请在此界面手动标记订单号或者在【订单列表】右键【同步此订单】获取订单信息
      </div>
    </div>
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
        label="仓库"
        prop=""
      />
      <el-table-column
        prop=""
        label="签收时间"
      />
      <el-table-column
        prop=""
        label="包裹图片"
      />
      <el-table-column
        prop=""
        label="采购物流单号"
      />
      <el-table-column
        label="操作"
      />
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   搜索条件
      form: {
        signingTime: '', // 创建时间
        logisticsNumber: '' // 交易状态
      },
      // 表格数据
      tableData: [
      ]
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeSignForPackage{
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
    }
    .rowOne{
        display: flex;
        align-items: center;
        //签收时间
        .signingTime{
            /deep/.el-date-editor{
                width: 198px;
            }
        }
        //采购物流单号
        .logisticsNumber{
          margin: 0 10px;
            .el-input{
                width: 80px;
            }
        }
    }
    .rowThree{
      color: red;
    }
}
//表格部分
.el-table{
  margin-top: 10px;
}
</style>
