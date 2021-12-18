<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-06 11:18:47
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\mall-manager\components\MallManagerWithdrawalRecord.vue
-->
<template>
  <div class="drawal-record">
    <div class="tool-bar">
      <div class="tool-row">
        <storeChoose @changeMallList="changeMallList" />
      </div>
      <div class="tool-row">
        <div class="tool-item mar-right">
          <span>时间：</span>
          <el-date-picker
            v-model="recordTime"
            size="mini"
            value-format="yyyy-MM-dd"
            type="daterange"
            style="width: 180px"
            range-separator="-"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            :picker-options="pickerOptions"
          />
        </div>
        <el-button type="primary" size="mini" class="mar-right" @click="searchRecord">查询提现记录</el-button>
        <el-button type="primary" size="mini" class="mar-right" @click="exportData">导 出</el-button>
        <el-checkbox v-model="showConsole" class="mar-right">隐藏日志</el-checkbox>
        <div class="activeColor">当前提现金额合计：{{ parseFloat(totalAmount).toFixed(2) }}</div>
      </div>
    </div>
    <div class="content">
      <el-table ref="multipleTable" v-loading="tableLoading" :data="tableDataCut" tooltip-effect="dark" height="calc(100vh - 215px)">
        <el-table-column align="center" type="index" label="序号" width="50">
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="80px" label="站点" prop="country" align="center">
          <template slot-scope="{row}">
            {{ row.country|chineseSite }}
          </template>
        </el-table-column>
        <el-table-column min-width="80px" label="店铺名称" prop="platform_mall_name" align="center" />
        <el-table-column align="center" prop="transaction_id" label="交易流水号" min-width="120" />
        <el-table-column align="center" prop="bank_name" label="银行" min-width="70" />
        <el-table-column align="center" prop="bank_account_name" label="持卡人" min-width="70" />
        <el-table-column prop="bank_account_number" label="银行卡号" align="center" min-width="120px" />
        <el-table-column align="center" prop="ic_number" label="IcNumber" min-width="100" />
        <el-table-column align="center" prop="amount" label="提现金额" min-width="70">
          <template slot-scope="scope">{{ scope.row.amount*-1 }} {{ scope.row.country | siteCoin }}</template>
        </el-table-column>
        <el-table-column align="center" prop="ctime" label="提现时间" min-width="120">
          <template slot-scope="scope">{{ $dayjs(scope.row.ctime * 1000).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" prop="complete_time" label="完成时间" min-width="120">
          <template slot-scope="scope">{{ scope.row.complete_time===0?'':$dayjs(scope.row.complete_time * 1000).format('YYYY-MM-DD HH:mm:ss') }}</template>
        </el-table-column>
        <el-table-column align="center" prop="status" label="提现状态" min-width="80">
          <template slot-scope="scope">{{ changeTypeName(scope.row.status, statusList) }}</template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </div>
    </div>
    <Logs ref="Logs" v-model="showConsole" clear />
  </div>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import { exportExcelDataCommon, creatDate } from '../../../util/util'
export default {
  components: {
    storeChoose
  },
  data() {
    return {
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      showConsole: true,
      countryVal: '',
      groupId: '',
      selectMallList: [],
      recordTime: [],
      tableData: [],
      tableDataCut: [],
      tableLoading: false,
      statusList: [
        {
          value: '0',
          label: '未知状态'
        },
        {
          value: '2',
          label: '提现中'
        },
        {
          value: '3',
          label: '已提现'
        },
        {
          value: '4',
          label: '提现失败'
        }
      ],
      pageSize: 20, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      mallPageSize: 50,
      totalAmount: 0
    }
  },
  mounted() {
    // 初始化时间
    this.recordTime = creatDate(30)
  },
  methods: {
    changeMallList(val) {
      console.log('changeMallList', val,new Date().getTime())
      this.selectMallList = val
    },
    // 查询列表
    async searchRecord() {
      if (!this.selectMallList.length) {
        return this.$message.warning('请选择店铺')
      }
      this.totalAmount = 0
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.tableData = []
      this.tableDataCut = []
      this.total = 0
      this.tableLoading = true
      this.$refs.Logs.writeLog(`开始同步！`, true)
      for (let i = 0; i < this.selectMallList.length; i++) {
        if (this.cancelAction) {
          return
        }
        const mall = this.selectMallList[i]
        const pageNumber = 1
        await this.getRecordList(pageNumber, mall)
      }
      console.log(this.tableData, 'searchRate')
      this.dataCut()
      this.tableLoading = false
    },
    async getRecordList(pageNumber, mall) {
      const params = {
        wallet_type: 0,
        page_number: pageNumber,
        page_size: this.mallPageSize,
        start_date: this.recordTime[0],
        end_date: this.recordTime[1],
        transaction_types: '201,203',
        shop_id: mall.platform_mall_id
      }
      try {
        const res = await this.$shopeemanService.getWithDrawalRecord(mall.country, params)
        const resObj = JSON.parse(res)
        if (resObj.status === 200) {
          const data = JSON.parse(resObj.data)
          if (data.code === 0) {
            data.data.list &&
              data.data.list.forEach(async(item) => {
                item.country = mall.country
                item.platform_mall_name = mall.platform_mall_name
                item.mall_alias_name = mall.mall_alias_name
                item.platform_mall_id = mall.platform_mall_id
                const resBank = await this.$shopeemanService.getBankAccount(mall.country, { bank_account_id: item.bank_account_id, shop_id: mall.platform_mall_id })
                const resObjBank = resBank && JSON.parse(resBank)
                console.log(resObjBank)
                if (resObjBank.status === 200) {
                  const bankData = JSON.parse(resObjBank.data)
                  if (bankData.code === 0) {
                    item.bank_name = bankData.data.bank_name
                    item.bank_account_number = bankData.data.account_number
                    item.bank_account_name = bankData.data.full_name
                    item.ic_number = bankData.data.ic_number
                  }
                } else if (resObjBank.status === 403) {
                  this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】请检查店铺是否登录！`, false)
                } else {
                  this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】获取失败！`, false)
                }
                // this.totalAmount += (item.amount * -1) / 100
                this.totalAmount += (item.amount * -1)
                this.tableData.push(item)
                this.total = this.tableData.length
              })
            this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】获取到第【${pageNumber}】页提现记录数据【${data.data.list.length}】条`, true)
            if (data.data.list.length >= this.mallPageSize) {
              pageNumber++
              this.getRecordList(pageNumber, mall)
            }
          } else {
            this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】${data.message}`, false)
          }
        } else if (resObj.status === 403) {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】请检查店铺是否登录！`, false)
        } else {
          this.$refs.Logs.writeLog(`店铺【${mall.platform_mall_name}】获取失败！`, false)
        }
      } catch (error) {
        console.log(error)
      }
    },
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>店铺名</td>
              <td>交易流水号</td>
              <td>银行</td>
              <td>持卡人</td>
              <td>银行卡号</td>
              <td>IcNumber</td>
              <td>提现金额</td>
              <td>提现时间</td>
              <td>完成时间</td>
              <td>提现状态</td>
            </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.country ? this.$filters.chineseSite(item.country) : '' + '\t'}</td>
                    <td>${item.platform_mall_name ? item.platform_mall_name : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.transaction_id && item.transaction_id + '\t'}</td>
                    <td>${item.bank_name ? item.bank_name : '' + '\t'}</td>
                    <td>${item.bank_account_name ? item.bank_account_name : '' + '\t'}</td>
                    <td>${item.bank_account_number ? item.bank_account_number : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.ic_number ? item.ic_number : '' + '\t'}</td>
                    <td>${item.amount ? item.amount * -1 : '' + '\t'}</td>
                    <td>${item.ctime ? this.$dayjs(item.ctime * 1000).format('YYYY-MM-DD HH:mm:ss') : '' + '\t'}</td>
                    <td>${item.complete_time ? this.$dayjs(item.complete_time * 1000).format('YYYY-MM-DD HH:mm:ss') : '' + '\t'}</td>
                    <td>${item.status ? this.changeTypeName(item.status, this.statusList) : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('提现记录', str)
    },
    // 分页设置
    dataCut() {
      this.tableDataCut = this.tableData.slice((this.currentPage - 1) * this.pageSize, this.currentPage * this.pageSize)
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.dataCut()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.dataCut()
    },
    // 转换类型中文
    changeTypeName(value, baseData) {
      let str = ''
      const data = baseData.find((item) => item.value == value)
      str = data ? data.label : ''
      return str
    }
  }
}
</script>

<style lang="less" scoped>
.drawal-record {
  // min-width: 1200px;
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
  overflow-x: auto ;
  .tool-row {
    margin:10px 10px 0 0;
    display: flex;
    align-items: center;
    // flex-wrap: wrap;
    .tool-item {
      display: flex;
      align-items: center;
      /deep/.el-range-input{
        width: 68px !important;
      }
      span{
        display: inline-block;
        width:80px;
        text-align: right;
      }
    }
  }
}
.content {
  margin: 20px 0;
  background: #fff;
  height: calc(100vh - 160px);
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 20px;
    height: 35px;
  }
}
</style>
