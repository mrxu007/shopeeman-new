<!--软件财务中心-->
<template>
  <div class="PersonalCenterSoftwareFinance">
    <!--账户相关信息-->
    <div class="message">
      <div v-if="amountLoading">账户余额：<span class="warning-style">获取中...</span></div>
      <div v-else>账户余额：{{ account.balance }}元</div>
      <div class="bottonGroup">
        <el-button type="primary" size="mini" @click="getAccountAmount">刷新余额</el-button>
        <el-button type="primary" size="mini" @click="rechargeVisible = true">充值</el-button>
      </div>
      <div>今日翻译费用：{{ account.translationCosts }}元</div>
      <div style="margin-left:10px;">
        <el-button v-if="account.translationCosts>'0'" type="primary" size="mini" @click="getTransDetail('')">翻译明细</el-button>
      </div>
    </div>
    <!-- 上面查询条件部分 -->
    <div class="search">
      <!-- 第一行 -->
      <div class="rowOne">
        <!-- 创建时间 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="creationTime">
              <label>创建时间：</label>
              <el-date-picker v-model="form.creationTime" type="daterange" range-separator="-" value-format="yyyy-MM-dd" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" />
            </div>
          </el-col>
          <!-- 交易时间 -->
          <el-col :span="8">
            <div class="tradingTime">
              <label>交易时间：</label>
              <el-date-picker v-model="form.tradingTime" type="daterange" value-format="yyyy-MM-dd" range-separator="-" start-placeholder="开始日期" end-placeholder="结束日期" size="mini" />
            </div>
          </el-col>
          <!-- 金额范围 -->
          <el-col :span="8">
            <div class="moneyRange">
              <label>金额范围：</label>
              <el-input v-model="form.minMoney" size="mini" clearable />
              <span>-</span>
              <el-input v-model="form.maxMoney" size="mini" clearable />
            </div>
          </el-col>
        </el-row>
      </div>

      <!-- 第二行 -->
      <div class="rowTwo">
        <!-- 交易状态 -->
        <el-row :gutter="20">
          <el-col :span="8">
            <div class="transactionStatus">
              <label>交易状态：</label>
              <el-select v-model="form.transactionStatus" size="mini">
                <el-option v-for="item in tranStatus" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <!-- 资金流向 -->
          <el-col :span="8">
            <div class="moneyFlow">
              <label>资金流向：</label>
              <el-select v-model="form.moneyFlow" style="width: 207px;" size="mini" multiple collapse-tags clearable @change="changeSelect($event, 'moneyFlow')">
                <el-option label="全部" :value="0" @click.native="selectAll('moneyFlow', moneyFlow)" />
                <el-option v-for="item in moneyFlow" :key="item.id" :label="item.label" :value="item.id" />
              </el-select>
            </div>
          </el-col>
          <!-- 交易类型 -->
          <el-col :span="8">
            <div class="transactionType">
              <label>交易类型：</label>
              <el-select v-model="form.transactionType" style="width: 198px;" size="mini" multiple collapse-tags clearable @change="changeSelect($event, 'transactionType')">
                <el-option label="全部" :value="0" @click.native="selectAll('transactionType', transactionType)" />
                <el-option v-for="item in transactionType" :key="item.id" :label="item.name" :value="item.id" />
              </el-select>
            </div>
          </el-col>
        </el-row>
      </div>
      <!-- 第三行 -->
      <div class="rowThree">
        <!-- 订单编号 -->
        <el-row :gutter="24">
          <el-col :span="8">
            <div class="orderNumber">
              <label>订单编号：</label>
              <el-input v-model="form.orderNumber" size="mini" clearable />
            </div>
          </el-col>
          <!-- 星卓越大包号 -->
          <el-col :span="8">
            <div class="bigBagNumber">
              星卓越大包号：
              <el-input v-model="form.bigBagNumber" size="mini" />
            </div>
          </el-col>
          <el-col :span="8">
            <div class="searchRowThreeBottonGroup">
              <el-button type="primary" size="mini" @click="selectList">查询</el-button>
              <el-button type="primary" size="mini" @click="reset">重置查询条件</el-button>
              <el-button type="primary" size="mini" @click="exportData">导出数据</el-button>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
    <!-- 表格区 -->
    <div class="content">
      <el-table
        ref="multipleTable"
        v-loading="tableLoading"
        :data="allbillingData"
        tooltip-effect="dark"
        height="calc(100vh - 256px)"
        :header-cell-style="{
          textAlign: 'center',
          backgroundColor: '#f5f7fa',
        }"
      >
        <el-table-column align="center" type="index" label="序号" min-width="50px" fixed>
          <template slot-scope="scope">{{ (currentPage - 1) * pageSize + scope.$index + 1 }}</template>
        </el-table-column>
        <el-table-column min-width="180px" label="交易号" align="center" fixed>
          <template slot-scope="scope">
            <p class="tabletext">
              <span style="cursor: pointer"> {{ scope.row.trans_number }}</span><span class="copyIcon" @click="copy(scope.row.trans_number)">
                <i class="el-icon-document-copy" />
              </span>
            </p>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" label="订单编号" align="center">
          <template slot-scope="scope">
            <p v-if="scope.row.order_sn" class="tabletext">
              <span style="cursor: pointer">{{ scope.row.order_sn }}</span><span class="copyIcon" @click="copy(scope.row.order_sn)"><i class="el-icon-document-copy" /></span>
            </p>
          </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="type"
          label="资金流向"
          min-width="80px"
        ><template slot-scope="scope">
          <p v-if="scope.row.type > 0">{{ scope.row.type === 1 ? '收入' : '支出' }}</p>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="trans_type"
          label="交易类型"
          min-width="100px"
        ><template slot-scope="scope">
          <p v-if="scope.row.trans_type > 0">{{ changeTypeName(scope.row.trans_type, transactionType) }}</p>
        </template>
        </el-table-column>
        <el-table-column
          align="center"
          prop="trans_type"
          label="交易状态"
          min-width="70px"
        ><template slot-scope="scope">
          <p v-if="scope.row.trans_type > 0">{{ changeTypeName(scope.row.trans_status, tranStatus) }}</p>
        </template>
        </el-table-column>
        <el-table-column prop="trans_time" label="交易时间" align="center" min-width="140px">
          <template slot-scope="scope"> {{ scope.row.trans_time }} </template>
        </el-table-column>
        <el-table-column prop="created_at" label="创建时间" align="center" min-width="140px">
          <template slot-scope="scope"> {{ scope.row.created_at }} </template>
        </el-table-column>
        <el-table-column align="center" prop="amount" label="交易金额" min-width="70px" />
        <el-table-column align="center" prop="current_amount" label="账户余额" min-width="80px" />
        <el-table-column align="center" prop="package_sn" label="大包号" min-width="80px" />
        <el-table-column align="center" prop="sys_sku_id" label="商品skuID" min-width="80px" />
        <el-table-column
          align="center"
          label="费用明细"
          min-width="90px"
        ><template slot-scope="scope">
          <el-button v-if="scope.row.trans_type === 2" type="primary" size="mini" @click="getTransDetail(scope.row)">翻译明细</el-button>
        </template>
        </el-table-column>
        <el-table-column align="center" prop="remark" label="备注" min-width="150px" show-overflow-tooltip fixed="right" />
      </el-table>
      <div class="pagination">
        <el-pagination
          background
          :page-sizes="[20, 30, 50, 100]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
        <!-- </div> -->
      </div>
    </div>
    <!-- dialog充值 -->
    <el-dialog title="账户充值" :visible.sync="rechargeVisible" width="900px">
      <div class="recharge-box">
        <p>账户余额：{{ account.balance }}</p>
        <div class="account-box">
          <div v-for="(item, index) in rechargeList" :key="index" class="account-item" :class="{ activeColor: amount === item }" @click="amount = item">￥{{ item }}</div>
        </div>
        <div class="account-input">充值金额：<el-input v-model="amount" size="mini" style="width: 200px" clearable /></div>
        <el-button type="primary" class="btn" @click="recharge">立即充值</el-button>
      </div>
    </el-dialog>
    <!-- dialog翻译明细 -->
    <el-dialog title="翻译明细" :visible.sync="translateDetailVisible" width="900px">
      <div class="tranDetail">
        <div class="header-selsect">
          <!-- <div class="select-item">
            <p>翻译类型:</p>
            <el-select
              v-model="translateType"
              style="width:130px;"
              placeholder="请选择"
              size="mini"
              clearable
            >
              <el-option
                v-for="(item,index) in transType"
                :key="index"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
          </div> -->
          <div class="select-item">
            <p>翻译时间:</p>
            <el-date-picker
              v-model="chooseDate"
              :disabled="true"
              type="daterange"
              size="mini"
              format="yyyy-MM-dd HH:mm:ss"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['00:00:00', '23:59:59']"
            />
          </div>
          <!-- <el-button type="primary" size="mini" @click="getTransDetail">查询</el-button> -->
          <el-button type="primary" size="mini" @click="exportDetailData">导出数据</el-button>
        </div>
        <div class="table-style">
          <el-table :data="tranDetailData" tooltip-effect="dark" max-height="650">
            <el-table-column align="center" type="index" label="序号" width="50" />
            <el-table-column prop="type" label="翻译类型" align="center" width="90px">
              <template slot-scope="scope">
                <p>{{ scope.row.type == 1 ? '文字' : '图片' }}</p>
              </template>
            </el-table-column>
            <el-table-column
              align="center"
              label="翻译字符串"
              min-width="70"
              show-overflow-tooltip
            ><template slot-scope="scope">
              <p>{{ scope.row.text }}</p>
            </template>
            </el-table-column>
            <el-table-column prop="amount" label="翻译金额" align="center" width="90px" />
            <el-table-column prop="created_at" label="翻译时间" align="center" width="160px" />
          </el-table>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { exportExcelDataCommon, creatDate } from '../../../util/util'
export default {
  data() {
    return {
      account: {
        balance: '', // 账户余额
        translationCosts: '0' // 今日翻译费用
      },
      //   搜索条件
      form: {
        creationTime: [], // 创建时间
        tradingTime: [], // 交易时间
        minMoney: '', // 最小金额
        maxMoney: '', // 最大金额
        transactionStatus: 0, // 交易状态
        moneyFlow: [], // 资金流向
        transactionType: [], // 交易类型
        orderNumber: '', // 订单编号
        bigBagNumber: '' // 星卓越大包号：
      },
      // 交易状态下拉选择
      tranStatus: [
        {
          id: 0,
          name: '全部'
        },
        {
          id: 1,
          name: '成功'
        },
        {
          id: 2,
          name: '失败'
        },
        {
          id: 3,
          name: '退款'
        },
        {
          id: 4,
          name: '等待付款'
        }
      ],
      // 资金流向select
      moneyFlow: [
        {
          id: 1,
          label: '收入'
        },
        {
          id: 2,
          label: '支出'
        }
      ],
      // 交易类型select
      transactionType: [],
      pageSize: 20, // 页码
      currentPage: 1, // 页码
      total: 0, // 表格总数
      allbillingData: [], // 表格数据
      tableLoading: false,
      translateDetailVisible: false, // 翻译明细弹窗
      tranDetailData: [], // 翻译明细
      chooseDate: [],
      rechargeVisible: false, // 充值弹窗
      rechargeList: [100, 200, 500, 1000, 2000, 5000],
      amount: '',
      exportDataList: [],
      uuid: '',
      uid: '',
      amountLoading: false
    }
  },
  async mounted() {
    this.form.moneyFlow.push(0)
    this.moneyFlow.map((item) => {
      this.form.moneyFlow.push(item.id)
    })
    this.form.creationTime = creatDate(31)
    // 查询交易类型
    await this.getTransType()
    // 查询用户账号余额
    await this.getAccountAmount()
    // 获取翻译费用
    await this.getTranslateAmount()
    await this.selectList()
  },
  methods: {
    async exportData() {
      if (!this.total) {
        return this.$message.warning('没有可以导出的订单')
      }
      this.exportDataList = []
      const params = {}
      params.page = this.currentPage
      params.pageSize = this.pageSize
      params.createdAt = this.form.creationTime.length ? this.form.creationTime[0] + ' 00:00:00/' + this.form.creationTime[1] + ' 23:59:59' : '/'
      params.transTime = this.form.tradingTime.length ? this.form.tradingTime[0] + ' 00:00:00/' + this.form.tradingTime[1] + ' 23:59:59' : '/'
      params.transStatus = this.form.transactionStatus
      params.type = this.form.moneyFlow
      params.amount = `${this.form.minMoney !== '' ? Number(this.form.minMoney) : 0}/${this.form.maxMoney !== '' ? Number(this.form.maxMoney) : 0}`
      params.transType = this.form.transactionType
      params.orderSn = this.form.orderNumber
      params.childName = ''
      params.packageSn = this.form.bigBagNumber
      this.tableLoading = true
      const { data } = await this.$api.getAccountAmountDetailList(params)
      let amountData = data.data && data.data.data.length ? data.data.data : undefined
      while (amountData) {
        this.exportDataList = this.exportDataList.concat(amountData)
        params.page++
        const { data } = await this.$api.getAccountAmountDetailList(params)
        amountData = data.data && data.data.data.length ? data.data.data : undefined
      }
      this.tableLoading = false
      this.exportExcel(this.exportDataList)
    },
    // 导出翻译明细数据
    exportDetailData() {
      if (!this.tranDetailData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>翻译类型</td>
              <td>翻译字符串</td>
              <td>翻译金额</td>
              <td>翻译时间</td>
            </tr>`
      for (let i = 0; i < this.tranDetailData.length; i++) {
        const item = this.tranDetailData[i]
        str += `<tr><td>${num++}</td>
                    <td>${item.type ? (item.type === 1 ? '文字' : '图片') : '' + '\t'}</td>
                    <td>${item.text ? item.text : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td> 
                    <td>${item.created_at ? item.created_at : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('翻译明细数据', str)
    },
    // 导出数据
    exportExcel(data) {
      if (!data.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>交易号</td>
              <td>订单编号</td>
              <td>资金流向</td>
              <td>交易类型</td>
              <td>交易状态</td>
              <td>交易时间</td>
              <td>创建时间</td>
              <td>交易金额</td>
              <td>账户余额</td>
              <td>大包号</td>
              <td>商品SkuId</td>
              <td>备注</td>
            </tr>`
      for (let i = 0; i < data.length; i++) {
        const item = data[i]
        str += `<tr><td>${num++}</td>
                    <td style="mso-number-format:'\@';">${item.trans_number ? item.trans_number : '' + '\t'}</td>
                    <td style="mso-number-format:'\@';">${item.order_sn ? item.order_sn : '' + '\t'}</td>
                    <td>${item.type && item.type === 1 ? '收入' : '支出' || '' + '\t'}</td>
                    <td>${item.trans_type ? this.changeTypeName(item.trans_type, this.transactionType) : '' + '\t'}</td>
                    <td>${item.trans_status ? this.changeTypeName(item.trans_status, this.tranStatus) : '' + '\t'}</td>
                    <td>${item.trans_time ? item.trans_time : '' + '\t'}</td> 
                    <td>${item.created_at ? item.created_at : '' + '\t'}</td>
                    <td>${item.amount ? item.amount : '' + '\t'}</td>
                    <td>${item.current_amount ? item.current_amount : '' + '\t'}</td>
                    <td>${item.package_sn ? item.package_sn : '' + '\t'}</td>
                    <td>${item.sys_sku_id ? item.sys_sku_id : '' + '\t'}</td>
                    <td>${item.remark ? item.remark : '' + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('账单数据', str)
    },
    // 充值
    async recharge() {
      const params = { amount: this.amount }
      try {
        const res = await this.$api.getChargeUrlV2(params)
        if (res.data.code === 200) {
          window.open(res.data.data.url)
        } else {
          this.$message.success(res.data.message)
        }
      } catch (error) {
        console.log(error)
        this.$message.error('充值失败')
      }
    },
    // 获取今日翻译费用
    async getTranslateAmount() {
      const res = await this.$api.getTranslateAmount()
      if (res.data.code === 200) {
        this.account.translationCosts = res.data.data.amount
      }
    },
    // 获取翻译明细
    async getTransDetail(row) {
      console.log(row)
      this.translateDetailVisible = true
      const date = row ? row.trans_time ? row.trans_time.split(' ')[0] : '' : ''
      const todayStart = creatDate(0)[0] + ' 00:00:00'
      const todayEnd = creatDate(0)[0] + ' 23:23:23'
      this.chooseDate = row ? [date + ' 00:00:00', date + ' 23:59:59'] : [todayStart, todayEnd]
      // this.chooseDate = ['2021-09-17 00:00:00','2021-09-17 23:59:59']
      const params = {
        uid: row ? row.uid : '',
        uuid: row ? row.uuid : '',
        startTime: this.chooseDate[0],
        endTime: this.chooseDate[1]
      }
      const res = await this.$api.getTranslateDetail(params)
      if (res.data.code === 200) {
        this.tranDetailData = res.data.data
      } else {
        this.$message.warning(res.data.message)
      }
      console.log('getTransDetail')
    },
    // 重置
    reset() {
      this.form = {
        creationTime: [], // 创建时间
        tradingTime: [], // 交易时间
        minMoney: '', // 最小金额
        maxMoney: '', // 最大金额
        transactionStatus: '', // 交易状态
        moneyFlow: [], // 资金流向
        transactionType: [], // 交易类型
        orderNumber: '', // 订单编号
        bigBagNumber: '' // 星卓越大包号：
      }
    },
    // 查询列表数据
    async selectList() {
      const params = {}
      params.page = this.currentPage
      params.pageSize = this.pageSize
      params.createdAt = this.form.creationTime && this.form.creationTime.length ? this.form.creationTime[0] + ' 00:00:00/' + this.form.creationTime[1] + ' 23:59:59' : '/'

      params.transTime = this.form.tradingTime && this.form.tradingTime.length ? this.form.tradingTime[0] + ' 00:00:00/' + this.form.tradingTime[1] + ' 23:59:59' : '/'
      params.transStatus = this.form.transactionStatus
      params.type = this.form.moneyFlow
      params.amount = `${this.form.minMoney !== '' ? Number(this.form.minMoney) : 0}/${this.form.maxMoney !== '' ? Number(this.form.maxMoney) : 0}`
      params.transType = this.form.transactionType
      params.orderSn = this.form.orderNumber
      params.childName = ''
      params.packageSn = this.form.bigBagNumber
      this.tableLoading = true

      const res = await this.$api.getAccountAmountDetailList(params)

      if (res.data.code === 200) {
        this.allbillingData = res.data.data.data
        this.total = res.data.data.total
      }
      this.tableLoading = false
    },
    // 获取账单交易类型
    async getTransType() {
      const res = await this.$api.getTransType()
      if (res.data.code === 200) {
        this.transactionType = res.data.data
        this.form.transactionType.push(0)
        this.transactionType.map((item) => {
          this.form.transactionType.push(item.id)
        })
      } else {
        this.$message.error(res.data.message)
      }
    },
    // 查询用户账号余额
    async getAccountAmount() {
      this.amountLoading = true
      const res = await this.$api.getAccountAmount()
      if (res.data.code === 200) {
        this.account.balance = res.data.data
      } else {
        this.$message.error(res.data.message)
      }
      this.amountLoading = false
      this.getTranslateAmount()
    },
    // 日期选择器时间处理
    setDateFmt(data) {
      data[0] = data[0] + ' 00:00:00'
      data[1] = data[1] + ' 23:59:59'
      return data
    },
    // 转换类型中文
    changeTypeName(id, baseData) {
      let str = ''
      const data = baseData.find((item) => item.id === id)
      str = data ? data.name : ''
      return str
    },
    // 全选
    selectAll(key, baseData) {
      if (this.form[key].length < baseData.length) {
        this.form[key] = []
        this.form[key].push(0)
        baseData.map((item) => {
          this.form[key].push(item.id)
        })
      } else {
        this.form[key] = []
      }
    },
    changeSelect(val, key) {
      if (!val.includes(0) && val.length === this.form[key].length) {
      } else if (val.includes(0) && val.length - 1 < this.form[key].length) {
        this.form[key] = this.form[key].filter((item) => {
          return item !== 0
        })
      }
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.selectList()
    },
    handleSizeChange(size) {
      this.pageSize = size
      this.selectList()
    },
    // 点击复制
    copy(attr) {
      const target = document.createElement('div')
      target.id = 'tempTarget'
      target.style.opacity = '0'
      target.innerText = attr
      document.body.appendChild(target)
      try {
        const range = document.createRange()
        range.selectNode(target)
        window.getSelection().removeAllRanges()
        window.getSelection().addRange(range)
        document.execCommand('copy')
        window.getSelection().removeAllRanges()
        this.$message.success('复制成功')
      } catch (e) {
        // console.log('复制失败')
      }
      target.parentElement.removeChild(target)
    }
  }
}
</script>

<style lang="less" scoped>
.PersonalCenterSoftwareFinance {
  min-width: 1200px;
  padding: 16px;
  background: #fff;
  /deep/ .el-dialog__body {
    padding: 10px 20px;
  }
}
// 账户相关信息
.message {
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  white-space: nowrap;
  overflow: hidden;
  .warning-style {
    color: red;
    font-size: 16px;
  }
  .bottonGroup {
    margin: 0 10px;
  }
}
//上面查询条件部分
.search {
  // min-width: 1000px;
  & > div {
    margin: 10px 0;
  }
  /deep/.el-row {
    min-width: 920px !important;
    /deep/.el-col {
      // width: 300px !important;
      // padding: 0px !important;
    }
  }
  .rowOne {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    //创建时间和交易时间
    .creationTime {
      /deep/.el-date-editor {
        // width: 198px;
        width: 207px;
      }
    }
    .tradingTime {
      /deep/.el-date-editor {
        width: 207px;
      }
    }
    //交易时间
    .tradingTime {
      margin: 0 10px;
    }
    //金额范围
    .moneyRange {
      span {
        margin: 0 10px;
      }
      .el-input {
        width: 86px;
      }
    }
  }
  .rowTwo {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    //资金流向和交易类型
    .moneyFlow,
    .transactionType {

      display: flex;
    align-items: baseline;
      // margin: 0 10px;
      /deep/.el-checkbox {
        margin-right: 16px;
        .el-checkbox__label {
          padding-left: 5px;
        }
      }
    }
    //交易状态
    .transactionStatus {
      .el-select {
        width: 207px;
      }
    }
    //资金流向
    .moneyFlow {
      margin: 0 10px;
      display: flex;
      align-items: baseline;
    }
  }
  .rowThree {
    display: flex;
    align-items: center;
    flex-wrap: nowrap;
    white-space: nowrap;
    overflow: hidden;
    // 订单编号和星卓越大包号
    .orderNumber {
      .el-input {
        width: 207px;
      }
    }
    //卓越大包号
    .bigBagNumber {
      margin: 0 -15px;
      .el-input {
        width: 204px;
      }
    }
    .searchRowThreeBottonGroup {
    }
  }
}
//表格区
.content {
  margin-top: 20px;
  // height: calc(100vh - 220px);
}
.copyIcon {
  i {
    color: red;
    cursor: pointer;
  }
}
.pagination {
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
}
//dialog
.tranDetail {
  .header-selsect {
    display: flex;
    .select-item {
      // width: 345px;
      margin-right: 20px;
      .check-ground {
        flex: 1;
        display: flex;
        justify-content: center;
        align-content: space-between;
      }
      .middle {
        margin: 0 4px;
      }
      p {
        padding-right: 8px;
        font-size: 14px;
        font-weight: normal;
        font-stretch: normal;
        line-height: 23px;
        letter-spacing: 0px;
        color: #666666;
      }
      display: flex;
      align-items: center;
      padding-right: 10px;
    }
  }
  .table-style {
    margin-top: 10px;
  }
}
.recharge-box {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  font-size: 18px;
  .account-box {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    .account-item {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 180px;
      height: 120px;
      border: 1px solid #dcdcdc;
      border-radius: 8px;
      margin: 20px;
      cursor: pointer;
    }
    .activeColor {
      background: #ffdead;
    }
  }
  .account-input {
    margin-top: 20px;
    display: flex;
  }
  .btn {
    margin: 60px 0 20px;
    width: 300px;
  }
}
</style>
