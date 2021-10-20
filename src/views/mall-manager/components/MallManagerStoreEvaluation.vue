<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-19 11:45:19
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="store-evaluation">
    <div class="tool-bar">
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>站点：</span>
          <el-select v-model="countryVal" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option v-for="(item, index) in countries" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>店铺分组：</span>
          <el-select v-model="groupId" placeholder="" size="mini" filterable>
            <el-option label="全部" :value="0" />
            <el-option label="无分组" :value="-1" />
            <el-option v-for="(item, index) in 4" :key="index" :label="item" :value="item" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>店铺：</span>
          <el-select v-model="mallSelect" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in 4" :key="index" />
          </el-select>
        </div>
        <div class="tool-item">
          <span>时间：</span>
          <el-date-picker
            v-model="assessTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 200px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>回复类型：</span>
          <el-select v-model="replayType" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in replayTypeList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <span>评价星数：</span>
          <el-select v-model="startNum" placeholder="" size="mini" filterable>
            <el-option v-for="(item, index) in startNumList" :key="index" :label="item.label" :value="item.value" />
          </el-select>
        </div>
        <div class="tool-item mar-right">
          <el-input v-model="userName" placeholder="请输入内容" size="mini" class="input-with-select">
            <el-select slot="prepend" v-model="userNameSelect" placeholder="用户名称" style="width: 120px">
              <el-option v-for="(item, index) in userType" :key="index" :label="item.label" :value="item.value" />
            </el-select>
          </el-input>
        </div>
        <el-button type="primary" size="mini" class="mar-right">查询</el-button>
        <el-button type="primary" size="mini" class="mar-right">批量回复</el-button>
        <el-button type="primary" size="mini" class="mar-right">取消操作</el-button>
        <el-button type="primary" size="mini" class="mar-right">导出数据</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="clearLog">清除日志</el-button>
        <div class="tool-item mar-right">
          <el-checkbox v-model="showConsole">隐藏日志</el-checkbox>
        </div>
      </div>
    </div>
    <div class="content">
      <el-table ref="multipleTable" v-loading="tableLoading" :data="tableData" tooltip-effect="dark" max-height="650">
        <el-table-column type="selection" width="55" />
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="140px" label="站点" prop="warehouse_name" align="center" />
        <el-table-column min-width="140px" label="店铺名称" prop="trans_number" align="center" />
        <el-table-column align="center" prop="type" label="订单编号商品名称" min-width="60" />
        <el-table-column align="center" prop="trans_type" label="商品ID" min-width="70" />
        <el-table-column align="center" prop="package_order_sn" label="商品图片" min-width="70" />
        <el-table-column prop="amount" label="买家姓名" align="center" min-width="90px" />
        <el-table-column align="center" prop="trans_status" label="评价星数" min-width="70">
          <template slot-scope="scope" />
        </el-table-column>
        <el-table-column align="center" prop="current_amount" label="评价时间" min-width="70" />
        <el-table-column align="center" prop="customs_money" label="评价内容" min-width="80" />
        <el-table-column align="center" prop="first_express_money" label="您的回复" min-width="80" />
        <el-table-column align="center" prop="warhouse_money" label="回复时间" min-width="80" />
        <el-table-column align="center" prop="trans_status" label="操作状态" min-width="70">
          <template slot-scope="scope" />
        </el-table-column>
      </el-table>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
  </div>
</template>

<script>
export default {
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      countryVal: '',
      groupId: '',
      mallSelect: '',
      countries: [
        { label: '马来站', value: 'MY' },
        { label: '台湾站', value: 'TW' },
        { label: '新加坡站', value: 'SG' },
        { label: '菲律宾站', value: 'PH' },
        { label: '泰国站', value: 'TH' },
        { label: '越南站', value: 'VN' },
        { label: '印尼站', value: 'ID' },
        { label: '巴西站', value: 'BR' }
      ],
      assessTime: [],
      tableData: [],
      tableLoading: false,
      replayType: '',
      replayTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '待回复'
        },
        {
          value: '',
          label: '已回复'
        }
      ],
      startNum: '',
      startNumList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '5',
          label: '五颗星'
        },
        {
          value: '4',
          label: '四颗星'
        },
        {
          value: '3',
          label: '三颗星'
        },
        {
          value: '2',
          label: '两颗星'
        },
        {
          value: '1',
          label: '一颗星'
        }
      ],
      userName: '',
      userNameSelect: '',
      userType: [
        {
          value: '用户名称',
          label: '用户名称'
        },
        {
          value: '商品名称',
          label: '商品名称'
        },
        {
          value: '规格名称',
          label: '规格名称'
        }
      ],
      showConsole: true
    }
  },
  methods: {
    // 清除日志
    clearLog() {
      this.$refs.Logs.consoleMsg = ''
    }
  }
}
</script>

<style lang="less" scoped>
.store-evaluation {
  min-width: 1280px;
  margin: 10px;
}
.mar-right {
  margin-right: 10px;
}
.activeColor {
  color: red;
}
.tool-bar {
  height: 100px;
  background: #fff;
  .tool-row {
    padding: 16px 16px 0 16px;
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 150px);
}
</style>
