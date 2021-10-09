<!--仓库异常信息-->
<template>
  <div class="CatchNoticeStoreExceptionInfo">
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <div class="exceptionType">
          异常类型：
          <el-select
            v-model="form.exceptionTypeOne"
            size="mini"
            multiple
            collapse-tags
            @change="exceptionTypeHandleOne"
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in exceptionTypeOptionsOne"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="exceptionType">
          异常类型：
          <el-select
            v-model="form.exceptionTypeTwo"
            size="mini"
            multiple
            collapse-tags
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in exceptionTypeOptionsTwo"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="exceptionType">
          仓库处理状态：
          <el-select
            v-model="form.dealStatus"
            size="mini"
            multiple
            collapse-tags
          >
            <el-option
              label="全部"
              value="all"
            />
            <el-option
              v-for="item in dealStatus"
              :key="item.id"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </div>
        <div class="creationTime">
          创建时间：<el-date-picker
            v-model="form.creationTime"
            type="daterange"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            size="mini"
          />
        </div>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">
        <div class="orderNumber">
          物流单号：
          <el-input v-model="form.flowNumber" size="mini" />
        </div>
        <div class="orderNumber">
          订单号：
          <el-input v-model="form.orderNumber" size="mini" />
        </div>
        <div class="searchRowThreeBottonGroup">
          <el-button type="primary" size="mini">搜索</el-button>
          <el-button type="primary" size="mini">更改订单状态</el-button>
        </div>
      </div>
    </div>
    <el-table
      :header-cell-style="{background:'#f5f7fa'}"
      :data="tableData"
      border
      style="width: 100%"
      height="calc(100vh - 134px)"
    >
      <el-table-column
        type="selection"
        width="55"
      />
      <el-table-column
        label="仓库名称"
        prop=""
      />
      <el-table-column
        prop=""
        label="订单号"
      />
      <el-table-column
        prop=""
        label="物流单号"
      />
      <el-table-column
        prop=""
        label="处理方式"
      />
      <el-table-column
        prop=""
        label="异常信息"
      />
      <el-table-column
        prop=""
        label="异常类型"
      />
      <el-table-column
        prop=""
        label="异常图片"
      />
      <el-table-column
        prop=""
        label="创建时间"
      />
      <el-table-column
        prop=""
        label="更改时间"
      />
      <el-table-column
        prop=""
        label="仓库处理状态"
      />
      <el-table-column
        label="操作"
      /></el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //   搜索条件
      form: {
        exceptionTypeOne: [], // 异常类型一
        exceptionTypeTwo: [], // 异常类型二
        dealStatus: [], // 仓库处理状态
        creationTime: '', // 创建时间
        flowNumber: '', // 物流单号
        orderNumber: ''// 订单号
      },

      // 第一个异常类型options
      exceptionTypeOptionsOne: [{
        id: 2,
        value: 1,
        label: '到货实物颜色与订单要求产品不符'
      }, {
        id: 3,
        value: 2,
        label: '到货包裹是空包'
      }, {
        id: 4,
        value: 3,
        label: '到货包裹码数错误'
      }, {
        id: 5,
        value: 4,
        label: '到货包裹里多订单无法区分识别'
      }, {
        id: 6,
        value: 5,
        label: '到货包裹缺件少件，无法满足对应销售订单'
      }, {
        id: 7,
        value: 6,
        label: '到货包裹脏污、破损'
      }, {
        id: 8,
        value: 7,
        label: '到货包裹渠道无法支持'
      }, {
        id: 9,
        value: 8,
        label: '到货包裹超材超重，无法寄出'
      }, {
        id: 10,
        value: 9,
        label: '到货包裹运费偏高，请确认是否选择发货'
      }, {
        id: 11,
        value: 10,
        label: '到货包裹无法打印面单，请及时同步'
      }, {
        id: 12,
        value: 11,
        label: '系统已欠费，无法寄出，请及时安排充值'
      }, {
        id: 13,
        value: 12,
        label: '无法支持尾程物流渠道，请安排处理'
      }, {
        id: 14,
        value: 13,
        label: '包裹未匹配订单，请及时处理'
      }, {
        id: 15,
        value: 14,
        label: '订单取消，包裹拒收'
      }, {
        id: 16,
        value: 15,
        label: '备件缺货无法发货'
      }
      ],
      // 第一个异常类型options
      exceptionTypeOptionsTwo: [{
        id: 1,
        value: 1,
        label: '暂未处理'
      }, {
        id: 2,
        value: 2,
        label: '退件'
      }, {
        id: 3,
        value: 3,
        label: '暂存仓库'
      }, {
        id: 4,
        value: 4,
        label: '坚持发货'
      }, {
        id: 5,
        value: 5,
        label: '等候补发'
      }, {
        id: 6,
        value: 6,
        label: '订单匹配完成'
      }, {
        id: 7,
        value: 7,
        label: '处理完成'
      }, {
        id: 8,
        value: 8,
        label: '通知提示'
      }],
      // 仓库处理状态
      dealStatus: [
        {
          id: 1,
          value: 1,
          label: '未处理'
        }, {
          id: 2,
          value: 2,
          label: '处理中'
        }, {
          id: 3,
          value: 3,
          label: '已处理'
        }
      ],
      // 表格数据
      tableData: []
    }
  },
  methods: {
    // 格式化多选下拉框的数据
    formatSelectData(value) {
      return value.join(',')
    },
    // 异常类型改变
    exceptionTypeHandleOne(value) {
      // 当选中全选时
      // const exitAll = value.findIndex(item => {
      //   return item === 'all'
      // })
      // if (exitAll >= 0) {
      //   this.form.exceptionType = ['all']
      //   this.exceptionTypeOptions.forEach(item => {
      //     this.form.exceptionType.push(item.value)
      //   })
      // } else {
      //   value.forEach(item => {
      //     this.form.exceptionType(this.exceptionTypeOptions.find(item1 => {
      //       return item === item1.value
      //     }))
      //   })
      // }
    }
  }
}
</script>

<style lang="less" scoped>
.CatchNoticeStoreExceptionInfo{
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
    .rowOne,.rowTwo{
      &>div{
        margin-right: 10px;
      }
    }
    .rowOne{
        display: flex;
        align-items: center;
        .exceptionType,.exceptionType,.exceptionType{
          .el-select{
            width: 200px;
          }
        }
        //创建时间和交易时间
        .creationTime{
            /deep/.el-date-editor{
                width: 198px;
            }
        }
    }
    .rowTwo{
        display: flex;
        align-items: center;
        // 物流单号和订单号
        .orderNumber,.orderNumber{
          .el-input{
              width: 80px;
          }
        }
    }
}
//表格部分
.el-table{
  margin-top: 10px;
}
</style>
