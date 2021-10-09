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
        <el-button size="mini" type="primary">获取采购物流单号</el-button>、
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
      hideLog: false// 隐藏日志
    }
  },
  mounted() {
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
        flex-wrap: nowrap;
        white-space: nowrap;
        overflow: hidden;
        //采购物流单号
        .flowNumber{
          margin-right: 10px;
            .el-input{
                width: 80px;
            }
        }
    }
    .rowThree,.rowTwo{
      white-space: nowrap;
      overflow: hidden;
    }
    .rowThree{
      color: red;
    }
}
</style>
