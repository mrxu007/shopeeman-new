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
          <el-input v-model="form.orderSn" size="mini" />
        </div>
        <el-button size="mini" type="primary" @click="searchHandle">搜索</el-button>
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
      height="calc(100vh - 160px)"
    >
      <el-table-column
        type="index"
        label="序列号"
        width="80"
      />
      <el-table-column
        label="站点"
        prop="country"
      />
      <el-table-column
        prop="platform_mall_name"
        label="店铺名称"
      />
      <el-table-column
        prop="order_sn"
        label="订单编号"
      />
      <el-table-column
        prop="created_time"
        label="订单创建时间"
      />
      <el-table-column
        prop="ship_by_date"
        label="订单自动取消时间"
        width="140"
      />
      <el-table-column
        prop="shot_status"
        label="采购状态"
        :formatter="formatterShotStatus"
      />
      <el-table-column
        prop="original_tracking_number"
        label="采购物流单号"
      />
      <el-table-column
        prop="logistics_id"
        label="Shopee物流公司"
        width="140"
      />
      <el-table-column
        prop="logistics_id"
        label="Shopee物流单号"
        width="140"
      />
      <el-table-column
        prop="package_status"
        label="仓库包裹状态"
      />
      <el-table-column
        label="操作"
        width="300px"
      >
        <template slot-scope="scope">
          <el-button size="mini" type="primary">同步此订单</el-button>
          <el-button size="mini" type="primary">填写采购物流单号</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   搜索条件
      form: {
        orderSn: '' // 订单编号
      },
      // 表格数据
      tableData: []
    }
  },
  mounted() {
    this.getExceptionExpiredOrderIndex()
  },
  methods: {
    // 搜索
    async searchHandle() {
      const result = await this.$api.getExceptionExpiredOrderIndex(this.form)
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
      } else {
        this.$message.error(result.data.message)
      }
    },
    // 格式化采购状态
    formatterShotStatus(row, column) {
      const shotStatus = row.shot_status
      switch (shotStatus) {
        case 1:
          return '待拍单'
        case 2:
          return '拍单中'
        case 3:
          return '拍单完成，待上家发货'
        case 4:
          return '上家已发货'
        case 5:
          return '待支付'
        case 6:
          return '已完成'
        case 7:
          return '已取消'
        case 8:
          return '已申请退款'
        case 9:
          return '退款成功'
        case 10:
          return '付款失败'
      }
    },
    async getExceptionExpiredOrderIndex() {
      const result = await this.$api.getExceptionExpiredOrderIndex()
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
      } else {
        this.$message.error(result.data.message)
      }
    }
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
