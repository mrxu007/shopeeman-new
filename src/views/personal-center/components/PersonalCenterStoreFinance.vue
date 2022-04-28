<!--
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-11-02 11:57:11
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\views\personal-center\components\PersonalCenterStoreFinance.vue
-->
<template>
  <div class="store-finance">
    <div class="herder-bar">
      <!-- 余额信息 -->
      <div class="account-box mar-right">
        <span class="account-title">余额信息</span>
        <div class="account-item">
          <span v-if="balanceLoading">余额：<span class="warning-style">获取中...</span></span>
          <span
              v-else
          >余额：<span class="warning-style">{{ userBalance }} 元</span></span>
          <el-button type="primary" size="mini" @click="searchUserBalance">刷新余额</el-button>
        </div>
      </div>
      <!-- 余额信息 -->
      <div class="account-box mar-right">
        <span class="account-title">仓库积分信息</span>
        <div class="account-item">
          <span v-if="integralLoading">总积分：<span class="warning-style">获取中...</span></span>
          <span v-else>总积分：<span class="warning-style">{{ integralNumber }} </span></span>
          <el-button type="" size="mini" @click="integralVisible = true">查看详情</el-button>
          <el-button type="primary" size="mini" @click="getIntegralNumberRecord">刷新积分</el-button>
        </div>
      </div>
      <!-- 充值 -->
      <div class="account-box">
        <span class="account-title">充值</span>
        <div class="account-item">
          <div class="acount-item-sub mar-right">
            <span>充值金额：</span>
            <el-input v-model="rechargeMoney" size="mini" style="width: 80px" clearable/>
          </div>
          <div class="acount-item-sub mar-right">
            <span>充值备注：</span>
            <el-input v-model="rechargeRemark" size="mini" style="width: 200px" clearable/>
          </div>
          <div class="acount-item-sub">
            <el-button type="primary" size="mini" @click="userRecharge">充值</el-button>
          </div>
        </div>
      </div>
    </div>
    <!-- tab区 -->
    <div class="tab-box">
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane label="用户充值记录" name="rechargeRecord"/>
        <el-tab-pane label="用户账单记录" name="accountRecord"/>
        <el-tab-pane label="积分日志记录" name="integralRecord"/>
      </el-tabs>
    </div>
    <!-- 内容区 -->
    <div class="content">
      <div class="btn-box" v-if="activeName !== 'integralRecord'">
        <div class="btn-item mar-right">
          交易时间：
          <el-date-picker
              v-model="tradeTime"
              size="mini"
              value-format="yyyy-MM-dd"
              type="daterange"
              style="width: 207px"
              range-separator="-"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :picker-options="pickerOptions"
          />
        </div>
        <div v-if="activeName === 'accountRecord'" class="btn-item mar-right">
          交易类型：
          <el-select v-model="tradeType" size="mini">
            <el-option v-for="item in tradeTypeList" :key="item.value" :label="item.label" :value="item.value"/>
          </el-select>
        </div>
        <div v-if="activeName === 'accountRecord'" class="btn-item mar-right">
          订单号：
          <el-input v-model="orderNumber" size="mini" style="width: 200px" clearable/>
        </div>
        <div v-if="activeName === 'rechargeRecord'">
          <el-button type="primary" size="mini" class="mar-right" @click="searchRechargeRecord">搜 索</el-button>
          <el-button type="primary" size="mini" @click="exportTableData">导 出</el-button>
        </div>
        <div v-if="activeName === 'accountRecord'">
          <el-button type="primary" size="mini" class="mar-right" @click="searchBillRecord">搜 索</el-button>
          <el-button type="primary" size="mini" @click="exportTableData">导 出</el-button>
        </div>
      </div>
      <!-- 表格区 -->
      <div v-if="activeName === 'rechargeRecord'" class="container">
        <el-table
            ref="multipleTable"
            v-loading="tableLoading"
            height="calc(100vh - 257px)"
            :data="tableData"
            tooltip-effect="dark"
            :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="index" label="序号" min-width="50px" fixed>
            <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column min-width="180px" label="内部交易单号" prop="trade_no" align="center" fixed/>
          <el-table-column min-width="100px" label="充值金额" prop="amount" align="center"/>
          <el-table-column align="center" label="交易时间" min-width="180px">
            <template slot-scope="scope"> {{ $dayjs(scope.row.trans_time * 1000).format('YYYY-MM-DD') }}</template>
          </el-table-column>
          <el-table-column align="center" prop="receipt_amount" label="实收金额" min-width="100px"/>
          <el-table-column align="center" prop="buyer_pay_amount" label="买家付款金额" min-width="100px"/>
          <el-table-column label="交易状态" align="center" min-width="80px">
            <template v-if="scope.row.status" slot-scope="scope"> {{
                scope.row.status === 1 ? '进行中' : '充值成功'
              }}
            </template>
          </el-table-column>
          <el-table-column prop="is_recharge" label="是否已充值" align="center" min-width="80px">
            <template v-if="scope.row.is_recharge" slot-scope="scope"> {{
                scope.row.is_recharge === 1 ? '是' : '否'
              }}
            </template>
          </el-table-column>
          <el-table-column align="center" prop="seller_id" label="买家支付宝用户号" min-width="180px"/>
          <el-table-column align="center" prop="buyer_id" label="买家支付宝唯一用户号" min-width="180px"/>
          <el-table-column align="center" prop="remark" label="备注" min-width="100px">
            <template slot-scope="{row}">
              {{ row.remark ? row.remark.replace('"', '').replace('"', '') : '--' }}
            </template>
          </el-table-column>
          <el-table-column align="center" label="支付时间" min-width="180px">
            <template slot-scope="scope"> {{ $dayjs(scope.row.pay_time * 1000).format('YYYY-MM-DD') }}</template>
          </el-table-column>
          <el-table-column align="center" label="交易创建时间" min-width="180px" fixed="right">
            <template slot-scope="scope"> {{ $dayjs(scope.row.gmt_create * 1000).format('YYYY-MM-DD') }}</template>
          </el-table-column>
        </el-table>
      </div>
      <div v-if="activeName === 'accountRecord'" class="container">
        <el-table
            ref="multipleTable"
            v-loading="tableLoading"
            :data="tableData"
            height="calc(100vh - 258px)"
            tooltip-effect="dark"
            :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="index" label="序号" min-width="50px">
            <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column min-width="150px" label="仓库名称" prop="warehouse_name" align="center"/>
          <el-table-column min-width="150px" label="交易号" prop="trans_number" align="center"/>
          <el-table-column align="center" prop="type" label="资金流向" min-width="100px">
            <template v-if="scope.row.type" slot-scope="scope"> {{ scope.row.type === 1 ? '收入' : '支出' }}</template>
          </el-table-column>
          <el-table-column align="center" prop="trans_type" label="交易类型" min-width="100px">
            <template slot-scope="scope"> {{ changeTypeName(scope.row.trans_type, tradeTypeList) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="package_order_sn" label="订单编号" min-width="180px"/>
          <el-table-column prop="amount" label="交易金额" align="center" min-width="100px"/>
          <el-table-column align="center" prop="trans_status" label="交易状态" min-width="100px">
            <template slot-scope="scope"> {{ changeTypeName(scope.row.trans_status, tradeStatusList) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="current_amount" label="当前剩余金额" min-width="100px"/>
          <el-table-column align="center" prop="customs_money" label="清关费用" min-width="100px"/>
          <el-table-column align="center" prop="first_express_money" label="头程物流费用" min-width="100px"/>
          <el-table-column align="center" prop="warhouse_money" label="仓库操作费" min-width="100px"/>
          <el-table-column align="center" prop="order_outbound_img" label="出库图片" min-width="100px">
            <template slot-scope="scope">
              <el-image v-if="scope.row.order_outbound_img" :src="scope.row.order_outbound_img"/>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="120px" show-overflow-tooltip/>
          <el-table-column align="center" prop="trans_time" label="交易时间" min-width="180px" fixed="right"/>
        </el-table>
      </div>
      <div v-if="activeName === 'integralRecord'" class="container">
        <el-table
            ref="multipleTable"
            v-loading="tableLoading"
            :data="tableData"
            height="calc(100vh - 258px)"
            tooltip-effect="dark"
            :header-cell-style="{
            textAlign: 'center',
            backgroundColor: '#f5f7fa',
          }"
        >
          <el-table-column align="center" type="index" label="序号" min-width="50px">
            <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
          </el-table-column>
          <el-table-column min-width="150px" label="仓库名称" prop="warehouse_name" align="center"/>
          <el-table-column min-width="150px" label="交易号" prop="trans_number" align="center"/>
          <el-table-column align="center" prop="type" label="资金流向" min-width="100px">
            <template v-if="scope.row.type" slot-scope="scope"> {{ scope.row.type === 1 ? '收入' : '支出' }}</template>
          </el-table-column>
          <el-table-column align="center" prop="trans_type" label="交易类型" min-width="100px">
            <template slot-scope="scope"> {{ changeTypeName(scope.row.trans_type, tradeTypeList) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="package_order_sn" label="订单编号" min-width="180px"/>
          <el-table-column prop="amount" label="交易金额" align="center" min-width="100px"/>
          <el-table-column align="center" prop="trans_status" label="交易状态" min-width="100px">
            <template slot-scope="scope"> {{ changeTypeName(scope.row.trans_status, tradeStatusList) }}</template>
          </el-table-column>
          <el-table-column align="center" prop="current_amount" label="当前剩余金额" min-width="100px"/>
          <el-table-column align="center" prop="customs_money" label="清关费用" min-width="100px"/>
          <el-table-column align="center" prop="first_express_money" label="头程物流费用" min-width="100px"/>
          <el-table-column align="center" prop="warhouse_money" label="仓库操作费" min-width="100px"/>
          <el-table-column align="center" prop="order_outbound_img" label="出库图片" min-width="100px">
            <template slot-scope="scope">
              <el-image v-if="scope.row.order_outbound_img" :src="scope.row.order_outbound_img"/>
            </template>
          </el-table-column>
          <el-table-column align="center" prop="remark" label="备注" width="120px" show-overflow-tooltip/>
          <el-table-column align="center" prop="trans_time" label="交易时间" min-width="180px" fixed="right"/>
        </el-table>
      </div>
      <div class="pagination">
        <el-pagination
            background
            :page-sizes="[10, 20, 50, 100]"
            :page-size="pageSize"
            layout="total, sizes, prev, pager, next, jumper"
            :total="total"
            @current-change="handleCurrentChange"
            @size-change="handleSizeChange"
        />
      </div>
    </div>
    <div class="dialog_shell">
      <el-dialog title="积分详情" width="800" top="15vh" :visible.sync="integralVisible">
        <el-table ref="plTable" :data="integralList" height="500" style="margin-bottom: 20px;">
          <el-table-column label="序号" width="60" type="index" align="center"/>
          <el-table-column label="分组" width="120" prop="group" align="center"/>
          <el-table-column label="仓库名称" min-width="120" prop="group_text" align="center"/>
          <el-table-column label="积分数" width="100" prop="points_text" align="center"/>
          <el-table-column label="创建时间" width="150" prop="created_at" align="center"/>
          <el-table-column label="更新时间" width="150" prop="updated_at" align="center"/>
        </el-table>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { exportExcelDataCommon } from '../../../util/util'

export default {
  data() {
    return {
      integralLoading: true,  //积分获取
      integralList: [],  // 积分列表
      integralNumber: 0,  //积分总数
      integralVisible: false,  //
      integralTableData: [], //积分日志
      rechargeRemark: '', // 充值金额
      rechargeMoney: '', // 充值备注
      activeName: 'rechargeRecord', // tab
      tradeTime: [], // 交易时间
      // 不能选择当前日期之后的时间
      pickerOptions: {
        disabledDate(time) {
          return time.getTime() > Date.now()
        }
      },
      pageSize: 20, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      tableData: [], // 表格数据
      orderNumber: '', // 订单号
      tradeType: '', // 交易类型
      tradeTypeList: [
        {
          value: '',
          label: '全部'
        },
        {
          value: '1',
          label: '仓库发货'
        },
        {
          value: '2',
          label: '退件'
        },
        {
          value: '3',
          label: '异常赔付'
        },
        {
          value: '4',
          label: '清关赔付'
        },
        {
          value: '5',
          label: '退款'
        },
        {
          value: '6',
          label: '补扣'
        },
        {
          value: '11',
          label: '海外中转仓出库'
        },
        {
          value: '12',
          label: '中转仓增值'
        },
        {
          value: '13',
          label: '海外仓上架入仓'
        },
        {
          value: '14',
          label: '贴单出库'
        },
        {
          value: '15',
          label: '补单出库'
        },
        {
          value: '16',
          label: '海外退件'
        }
      ],
      tradeStatusList: [
        {
          value: '1',
          label: '成功'
        },
        {
          value: '2',
          label: '失败'
        },
        {
          value: '3',
          label: '退款'
        },
        {
          value: '4',
          label: '等待付款'
        },
        {
          value: '5',
          label: '已向用户发起扣款'
        }
      ],
      muid: null, // app_uid
      mappingUid: null, // mapping_uid
      balanceLoading: false,
      userBalance: 0, // 余额
      exportDataList: [],
      tableLoading: false
    }
  },
  async mounted() {
    // app_uid
    await this.getAppUid()
    // 用户充值记录查询
    this.searchRechargeRecord()
    // 用户账户余额查询
    this.searchUserBalance()
    // 获取积分
    this.getIntegralNumberRecord()
  },
  methods: {
    async userRecharge() {
      if (Number(this.rechargeMoney) < 35) return this.$message.warning('最低不能小于35元')
      try {
        await this.$BaseUtilService.openUrl(`http://user.xzy.17hyj.com/externalPay?amount=${this.rechargeMoney}&app_uid=${this.mappingUid}&remark=${this.rechargeRemark}&appKey=VcLFERYDXw2U`)
      } catch (error) {
        this.$message.error(`充值打开失败`)
      }
      // window.open(`http://user.xzy.17hyj.com/externalPay?amount=${this.rechargeMoney}&app_uid=${this.mappingUid}&remark=${this.rechargeRemark}`)
    },
    async exportTableData() {
      if (!this.total) {
        return this.$message.warning('没有可以导出的订单')
      }
      this.exportDataList = []
      this.tableLoading = true
      if (this.activeName === 'rechargeRecord') {
        const params = {
          app_uid: this.muid,
          page_size: 200,
          page: this.currentPage,
          trans_time: this.tradeTime.length ? this.tradeTime[0] + ' 00:00:00/' + this.tradeTime[1] + ' 23:59:59' : ''
        }
        while (this.exportDataList.length < this.total) {
          try {
            const resf = await this.$XzyNetMessageService.post('xzy.UserGetUserRecharge', params)
            const resObj = resf && JSON.parse(resf)
            if (resObj.status === 200) {
              const info = resObj && resObj.data && JSON.parse(resObj.data)
              this.exportDataList = this.exportDataList.concat(info.data.data)
              params.page++
            } else {
              this.$message.error('导出数据错误')
              break
            }
          } catch (error) {
            this.$message.error('导出数据异常')
            break
          }
        }
        // const resf = await this.$XzyNetMessageService.post('xzy.UserGetUserRecharge', params)
        // // console.log(res)
        // if (resf) {
        //   const resObj = resf && JSON.parse(resf)
        //   const info = resObj && resObj.data && JSON.parse(resObj.data)
        //   let totalPage = (info.data && info.data.total_page) || 0
        //   while (params.page <= totalPage) {
        //     this.exportDataList = this.exportDataList.concat(info.data.data)
        //     params.page++
        //     const res = await this.$XzyNetMessageService.post('xzy.UserGetUserRecharge', params)
        //     totalPage = (res && JSON.parse(res).data && JSON.parse(JSON.parse(res).data) && JSON.parse(JSON.parse(res).data).data && JSON.parse(JSON.parse(res).data).data.total_page) || 0
        //   }
        // }
        this.exportRecharge(this.exportDataList)
      } else if (this.activeName === 'accountRecord') {
        const params = {
          app_uid: this.muid,
          page_size: 200,
          page: this.currentPage,
          trans_time: this.tradeTime.length ? this.tradeTime[0] + ' 00:00:00/' + this.tradeTime[1] + ' 23:59:59' : '',
          package_order_sn: this.orderNumber,
          trans_type: this.tradeType
        }
        while (this.exportDataList.length < this.total) {
          try {
            const resf = await this.$XzyNetMessageService.post('xzy.UserGetUserAccountAmount', params)
            const resObj = resf && JSON.parse(resf)
            if (resObj.status === 200) {
              const info = resObj && resObj.data && JSON.parse(resObj.data)
              this.exportDataList = this.exportDataList.concat(info.data.data)
              params.page++
            } else {
              this.$message.error('导出数据错误')
              break
            }
          } catch (error) {
            this.$message.error('导出数据异常')
            break
          }
        }
        // const resf = await this.$XzyNetMessageService.post('xzy.UserGetUserAccountAmount', params)
        // if (resf) {
        //   const resObj = resf && JSON.parse(resf)
        //   const info = resObj && resObj.data && JSON.parse(resObj.data)
        //   let totalPage = (info && info.data && info.data.total_page) || 0
        //   while (params.page <= totalPage) {
        //     this.exportDataList = this.exportDataList.concat(info.data.data)
        //     params.page++
        //     const res = await this.$XzyNetMessageService.post('xzy.UserGetUserAccountAmount', params)
        //     totalPage = (res && JSON.parse(res).data && JSON.parse(JSON.parse(res).data) && JSON.parse(JSON.parse(res).data).data && JSON.parse(JSON.parse(res).data).data.total_page) || 0
        //   }
        // }
        this.exportAccount(this.exportDataList)
      }
      this.tableLoading = false
    },
    // 导出充值记录
    exportRecharge(data) {
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>内部交易单号</td>
              <td>充值金额</td>
              <td>交易时间</td>
              <td>实收金额</td>
              <td>买家付款金额</td>
              <td>交易状态</td>
              <td>是否已充值</td>
              <td>卖家支付宝用户号</td>
              <td>买家支付宝唯一用户号</td>
              <td>备注</td>
              <td>支付时间</td>
              <td>交易创建时间</td>
            </tr>`
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        str += `<tr><td>${num++}</td>
                    <td style="mso-number-format:'\@';">${item.trade_no ? item.trade_no : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td>
                    <td>${item.trans_time && this.$dayjs(item.trans_time * 1000).format('YYYY-MM-DD') + '\t'}</td>
                    <td>${item.receipt_amount ? item.receipt_amount : '' + '\t'}</td>
                    <td>${item.buyer_pay_amount ? item.buyer_pay_amount : '' + '\t'}</td>
                    <td>${item.status ? (item.status === 1 ? '进行中' : '充值成功') : '' + '\t'}</td> 
                    <td>${item.is_recharge ? (item.is_recharge === 1 ? '是' : '否') : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.seller_id ? item.seller_id : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.buyer_id ? item.buyer_id : '' + '\t'}</td>
                    <td>${item.remark ? item.remark.replace('"', '').replace('"', '') : '' + '\t'}</td>
                    <td>${item.pay_time ? this.$dayjs(item.pay_time * 1000).format('YYYY-MM-DD') : '' + '\t'}</td>
                    <td>${item.gmt_create ? this.$dayjs(item.gmt_create * 1000).format('YYYY-MM-DD') : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('充值记录数据', str)
    },
    // 导出账单记录
    exportAccount(data) {
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>仓库名称</td>
              <td>交易号</td>
              <td>资金流向</td>
              <td>交易类型</td>
              <td>订单编号</td>
              <td>交易金额</td>
              <td>交易状态</td>
              <td>当前剩余金额</td>
              <td>清关费用</td>
              <td>头程物流费用</td>
              <td>仓库操作费</td>
              <td>备注</td>
              <td>交易时间</td>
            </tr>`
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.warehouse_name ? item.warehouse_name : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.trans_number ? item.trans_number : '' + '\t'}</td>
                    <td>${item.type && item.type === 1 ? '收入' : '支出' + '\t'}</td>
                    <td>${item.trans_type ? this.changeTypeName(item.trans_type, this.tradeTypeList) : '' + '\t'}</td>
                    <td>${item.package_order_sn ? item.package_order_sn : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td> 
                    <td>${item.trans_status ? this.changeTypeName(item.trans_status, this.tradeStatusList) : '' + '\t'}</td>
                    <td>${item.current_amount ? item.current_amount : '' + '\t'}</td>
                    <td>${item.customs_money ? item.customs_money : '' + '\t'}</td>
                    <td>${item.first_express_money ? item.first_express_money : '' + '\t'}</td>
                    <td>${item.warhouse_money ? item.warhouse_money : '' + '\t'}</td>
                    <td>${item.remark ? item.remark : '' + '\t'}</td>
                    <td>${item.trans_time ? item.trans_time : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('用户账单记录数据', str)
    },
    // app_uid
    async getAppUid() {
      const res = await this.$appConfig.getUserInfo()
      this.mappingUid = res.mapping_uid
      this.muid = res.muid
    },
    // 用户账户余额查询
    async searchUserBalance() {
      this.balanceLoading = true
      const params = {
        app_uid: this.muid
      }
      try {
        const res = await this.$XzyNetMessageService.post('xzy.UserGetUserDetail', params)
        const resObj = res && JSON.parse(res)
        const info = resObj && resObj.data && JSON.parse(resObj.data)
        if (info && info.code === 200) {
          this.userBalance = info.data.amount
        }
        // await sleep(1000)
      } catch (error) {
        console.log(error)
      }
      this.balanceLoading = false
    },
    // 用户账单记录查询
    async searchBillRecord() {
      const params = {
        app_uid: this.muid,
        page_size: this.pageSize,
        page: this.currentPage,
        trans_time: this.tradeTime.length ? this.tradeTime[0] + ' 00:00:00/' + this.tradeTime[1] + ' 23:59:59' : '',
        package_order_sn: this.orderNumber,
        trans_type: this.tradeType
      }
      this.tableLoading = true
      try {
        const res = await this.$XzyNetMessageService.post('xzy.UserGetUserAccountAmount', params)
        const resObj = res && JSON.parse(res)
        const info = resObj && resObj.data && JSON.parse(resObj.data)
        if (info && info.code === 200) {
          this.tableData = info.data.data
          this.total = info.data.total
        }
      } catch (error) {
        console.log(error)
      }
      this.tableLoading = false
    },
    // 用户充值记录查询
    async searchRechargeRecord() {
      const params = {
        app_uid: this.muid,
        page_size: this.pageSize,
        page: this.currentPage,
        trans_time: this.tradeTime.length ? this.tradeTime[0] + ' 00:00:00/' + this.tradeTime[1] + ' 23:59:59' : ''
      }
      this.tableLoading = true
      try {
        const res = await this.$XzyNetMessageService.post('xzy.UserGetUserRecharge', params)
        const resObj = res && JSON.parse(res)
        const info = resObj && resObj.data && JSON.parse(resObj.data)
        if (info && info.code === 200) {
          this.tableData = info.data.data
          this.total = info.data.total
        }
        // console.log(res, resObj, resObj.data, info)
      } catch (error) {
        console.log(error)
      }
      this.tableLoading = false
    },
    // 获取积分
    async getIntegralNumberRecord() {
      this.integralLoading = true
      try {
        const params = {
          app_uid: this.muid,
          uid: 2,
          wid: '6'
        }
        const res = await this.$XzyNetMessageService.post('xzy.app_user.points', params)
        const resObj = res && JSON.parse(res)
        this.integralNumber = 0
        const info = resObj && resObj.data && JSON.parse(resObj.data)
        console.log('info', info)
        if (info && info.code === 200) {
          this.integralList = info.data || []
          if (this.integralList.length) {
            let integralTemp = info.data.map(son => (Number(son.points_text) || 0))
            this.integralNumber = eval(integralTemp.join('+'))
          }
        }
      } catch (error) {
        console.log(error)
      }
      this.integralLoading = false
    },
    //
    async searchIntegralRecord() {
      const params = {
        app_uid: this.muid,
        page_size: this.pageSize,
        page: this.currentPage,
        wid: '6',
        // trans_time: this.tradeTime.length ? this.tradeTime[0] + ' 00:00:00/' + this.tradeTime[1] + ' 23:59:59' : ''
      }
      this.tableLoading = true
      try {
        const res = await this.$XzyNetMessageService.post('xzy.app_user.pointLogs', params)
        const resObj = res && JSON.parse(res)
        const info = resObj && resObj.data && JSON.parse(resObj.data)
        console.log('pointLogs', info)
      } catch (error) {
        console.log(error)
      }

      this.tableLoading = false
    },
    // 转换类型中文
    changeTypeName(value, baseData) {
      let str = ''
      const data = baseData.find((item) => item.value === value)
      str = data ? data.label : ''
      return str
    },
    // 日期选择器时间处理
    setDateFmt(data) {
      const nData = []
      nData[0] = data[0] + ' 00:00:00'
      nData[1] = data[1] + ' 23:59:59'
      return nData
    },
    // 切换tab
    handleClick() {
      this.pageSize = 20
      this.currentPage = 1
      this.total = 0
      this.tableData = []
      this.tradeTime = []
      this.tradeType = ''
      this.orderNumber = ''
      if (this.activeName === 'rechargeRecord') {
        this.searchRechargeRecord()
      } else if (this.activeName === 'accountRecord') {
        this.searchBillRecord()
      } else if (this.activeName === 'integralRecord') {
        this.searchIntegralRecord()
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      if (this.activeName === 'rechargeRecord') {
        this.searchRechargeRecord()
      } else if (this.activeName === 'accountRecord') {
        this.searchBillRecord()
      }
    },
    handleSizeChange(size) {
      this.pageSize = size
      if (this.activeName === 'rechargeRecord') {
        this.searchRechargeRecord()
      } else if (this.activeName === 'accountRecord') {
        this.searchBillRecord()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.store-finance {
  min-width: 1200px;
  padding: 16px;
  background: #fff;
}

.herder-bar {
  display: flex;
}

.mar-right {
  margin-right: 10px;
}

//余额信息 充值
.account-box {
  border: 1px solid #dcdcdc;
  border-radius: 4px;
  padding: 16px;
  position: relative;

  .account-title {
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

  .account-item {
    display: flex;
    align-items: center;

    span {
      margin-right: 20px;
      display: inline-block;
    }

    .acount-item-sub {
      display: flex;
      align-items: center;
    }

    .warning-style {
      margin-right: 0;
      min-width: 70px;
      color: red;
      font-size: 16px;
    }
  }
}

//tab区
.tab-box {
  margin-top: 10px;
}

//内容区
.content {
  margin-top: 10px;

  .btn-box {
    display: flex;

    .btn-item {
      display: flex;
      align-items: center;
    }
  }

  .container {
    margin-top: 10px;
  }

  .pagination {
    display: flex;
    justify-content: flex-end;
    margin-top: 10px;
  }
}
</style>
