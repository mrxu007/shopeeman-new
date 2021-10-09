<!--即将过期订单-->
<template>
  <div class="CatchNoticeExpiringOrder">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 订单编号 -->
        <div class="orderNumber">
          订单编号：
          <el-input v-model="form.orderNumber" size="mini" />
        </div>
        <el-button size="mini" type="primary">搜索</el-button>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：此界面将展示24小时内即将过期的订单，请及时填写采购物流单号或者同步平台物流单号，否者会影响店铺的评分，此界面只显示近一天的订单即将过期的数据
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        操作指引：若订单自动取消时间有误，请点击同步此订单，若订单未填写采购物流单号，请填写采购物流单号；如订单没有平台物流单号，请进行平台物流单号的申请或者手动填写第三方平台物流单号；若没有面单信息，请同步面单信息。
      </div>
    </div>
    <el-table
      :header-cell-style="{background:'#f5f7fa'}"
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100vh - 148px)"
    >
      <el-table-column
        type="index"
        label="序列号"
        width="80"
      />
      <el-table-column
        label="站点"
        prop=""
      />
      <el-table-column
        prop=""
        label="店铺名称"
      />
      <el-table-column
        prop=""
        label="订单编号"
      />
      <el-table-column
        prop=""
        label="订单创建时间"
      />
      <el-table-column
        prop=""
        label="订单自动取消时间"
      />
      <el-table-column
        prop=""
        label="采购状态"
      />
      <el-table-column
        prop=""
        label="采购物流单号"
      />
      <el-table-column
        prop=""
        label="Shopee物流公司"
      />
      <el-table-column
        prop=""
        label="Shopee物流单号"
      />
      <el-table-column
        prop=""
        label="仓库包裹状态"
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
        orderNumber: '' // 订单编号
      },
      // 表格数据
      tableData: []
    }
  },
  mounted() {
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeExpiringOrder{
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
        //订单编号
        .orderNumber{
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
//表格部分
.el-table{
  margin-top: 10px;
}
</style>
