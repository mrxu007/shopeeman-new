<template>
  <el-row class="contaniner">
    <el-row class="header-two">
      <div style="display: flex;margin-bottom: 10px;">
        <storeChoose @changeMallList="changeMallList" />
        <el-button size="mini" type="primary" @click="synchronousShops">同步店铺金额</el-button>
        <!--        <el-button size="mini" @click="allBatchWithdrawal()">批量提现</el-button>-->
        <el-button size="mini" @click="tiedCardPrepare()">批量绑卡</el-button>
      </div>
      <el-col :span="24" class="header-two-top">
        <p>当前可提现总金额：<span style="color: red">{{ canCarry }}</span></p>
        <p>当前提现中总金额：<span style="color: red">{{ withdrawal }}</span></p>
        <p style="margin-right: 10px;">
          各店铺满
          <el-input v-model="demand" placeholder="" size="mini" style="width:100px;" />
          才可以提现
        </p>
        <p style="margin-right: 5px;">
          预留金额：
          <el-input v-model="reserved" style="margin: 0 5px;" placeholder="" size="mini" />
        </p>
        <el-button type="primary" size="mini" @click="exportData">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table
        ref="plTable"
        height="height"
        use-virtual
        :data="tableData"
        :data-changes-scroll-top="false"
        :height="height"
        :row-height="rowHeight"
        :border="false"
        @selection-change="handleSelectionChange"
        @table-body-scroll="tableScroll"
      >
        <u-table-column align="center" type="selection" width="50" />
        <u-table-column align="center" type="index" label="序列号" width="60" />
        <u-table-column align="center" label="站点" width="120px">
          <template slot-scope="scope">{{ scope.row.country | chineseSite }}</template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" width="120px" label="店铺名称">
          <template slot-scope="scope">{{ scope.row.platform_mall_name }}</template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" width="120px" label="店铺别名">
          <template slot-scope="scope">{{ scope.row.mall_alias_name }}</template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" width="120px" label="银行">
          <template slot-scope="scope">
            {{ scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] &&
              scope.row.bankAccounts.list[0].bank_name }}
          </template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" width="120px" label="持卡人">
          <template slot-scope="scope">
            {{ scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] &&
              scope.row.bankAccounts.list[0].account_name }}
          </template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="银行卡号">
          <template slot-scope="scope">
            {{ scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] &&
              scope.row.bankAccounts.list[0].account_number }}
          </template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="ICNumber">
          <template slot-scope="scope">
            {{ scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] &&
              scope.row.bankAccounts.list[0].mtime }}
          </template>
        </u-table-column>
        <u-table-column align="center" width="120px" label="可提现金额">
          <template slot-scope="scope">{{ scope.row.balance }}</template>
        </u-table-column>
        <u-table-column align="center" width="120px" label="提现中金额">
          <template slot-scope="scope">{{ scope.row.withdrawal_no }}</template>
        </u-table-column>
        <u-table-column align="center" label="今日是否可提现">
          <template slot-scope="scope">{{ scope.row.num_of_free_times && '是' || '否' }}</template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="操作状态">
          <template slot-scope="scope">{{ scope.row.error || '同步成功' }}</template>
        </u-table-column>
        <!--        <u-table-column align="center" label="操作">-->
        <!--          <template slot-scope="scope">-->
        <!--            <el-button type="primary" size="mini" v-if="scope.row.bankAccounts&&scope.row.bankAccounts.list[0]"-->
        <!--                       @click="depositVisible = true;active=scope.row">提现-->
        <!--            </el-button>-->
        <!--          </template>-->
        <!--        </u-table-column>-->
      </u-table>
    </el-row>
    <div class="deposit_dialog">
      <el-dialog
        :title="active && (active.mall_alias_name || active.platform_mall_name)+'提现密码'"
        :visible.sync="depositVisible"
        :close-on-click-modal="false"
        width="500px"
      >
        <el-input v-model="depositPassword" size="mini" />
        <div class="deposit_footer">
          <el-button size="mini" @click="cancel">取消</el-button>
          <el-button type="primary" size="mini" @click="batchWithdrawal">确定</el-button>
        </div>
      </el-dialog>
    </div>
    <div class="tiedCard_dialog">
      <el-dialog title="绑定银行卡" :visible.sync="tiedCardVisible" :close-on-click-modal="false" width="350px">
        <div v-if="active" class="tiedCardBox">
          <div class="tiedCardItem">
            <span class="tiedCardLabel">当前店铺名：</span>
            {{ active && (active.mall_alias_name || active.platform_mall_name) }}
          </div>
          <div class="tiedCardItem">
            <span class="tiedCardLabel">当前手机号：</span>
            {{ active && active.phone }}
          </div>
          <div class="tiedCardItem">
            <span class="tiedCardLabel">银行账号：</span>
            {{ bankCard && bankCard.bank_name }}
          </div>
          <div class="tiedCardItem">
            <span class="tiedCardLabel">持卡人姓名：</span>
            {{ bankCard && bankCard.full_name }}
          </div>
          <div class="tiedCardItem">
            <span class="tiedCardLabel">IC卡号：</span>
            {{ bankCard && bankCard.ic_number }}
          </div>
          <div class="tiedCardItem">
            <span class="tiedCardLabel">银行名称：</span>
            {{ bankCard && bankCard.account_number }}
          </div>
          <div class="tiedCardItem">
            <el-input v-model="cardCode" size="mini">
              <el-button slot="append" @click="getWalletOtpSeed"> 发送验证码</el-button>
            </el-input>
          </div>
          <div class="tiedCardItem" style="display: flex;justify-content: flex-end">
            <el-button size="mini" @click="cancel">取消</el-button>
            <el-button type="primary" size="mini" @click="tiedCard">确定</el-button>
          </div>
        </div>
      </el-dialog>
    </div>
  </el-row>
</template>

<script>
import storeChoose from '../../../components/store-choose'
import { sha256 } from 'js-sha256'
import md5 from 'js-md5'
import { exportExcelDataCommon, dateFormat } from '../../../util/util'
import MallListAPI from '../../../module-api/mall-manager-api/mall-list-api'

export default {
  components: { storeChoose },
  data() {
    return {
      mallListAPIInstance: new MallListAPI(this),
      isShowLog: true,
      depositVisible: false,
      tiedCardVisible: false,
      active: null,
      depositPassword: '',
      canCarry: 0,
      withdrawal: 0,
      demand: 50,
      reserved: 30,
      height: 300,
      rowHeight: 50,
      SiteList: [],
      tableData: [],
      selectData: [],
      cardCode: '',
      selectIndex: -1,
      bankList: [],
      bankCard: null,
      seed: ''
    }
  },
  watch: {
    selectData(val, oldval) {
      console.log(val)
      this.selectIndex = -1
    }
  },
  created() {
    this.resizeHeight()
    window.addEventListener('resize', (event) => {
      this.resizeHeight()
    })
  },
  mounted() {
    this.getBankList()
  },
  methods: {
    synchronousShops() {
      this.tableData = []
      this.SiteList.forEach(async item => {
        const time = new Date().getTime()
        const start_date = dateFormat(time, 'yyyy-MM-dd')
        const resJson = await this.$appConfig.getGlobalCacheInfo('mallInfo', item.platform_mall_id)
        const res = JSON.parse(resJson)
        const password = res && res.mall_account_info && res.mall_account_info.password || ''
        const encryptPwd = password && sha256(md5(password)) || ''
        const end_date = dateFormat((time - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
        const param1 = {
          shop_id: parseInt(item.platform_mall_id),
          password_hash: encryptPwd
        }
        const param2 = {
          shop_id: parseInt(item.platform_mall_id),
          transaction_types: '201,203',
          start_date: start_date,
          end_date: end_date,
          wallet_type: 0,
          page_number: 1,
          page_size: 20
        }
        const param3 = { shop_id: parseInt(item.platform_mall_id), wallet_type: 0 }
        let temp = JSON.parse(JSON.stringify(item))
        let error = ''
        const bankAccountsJson = await this.$shopeemanService.getBankAccounts(item.country, param1, {
          params: {
            page_size: 30,
            page_number: 1
          },
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
        })
        const walletTransactionsJson = await this.$shopeemanService.getWalletTransactions(item.country, param2)
        const walletStatusJson = await this.$shopeemanService.getWalletStatus(item.country, param3)
        try {
          const bankAccountsRes = JSON.parse(bankAccountsJson)
          const walletTransactionsRes = JSON.parse(walletTransactionsJson)
          const walletStatusRes = JSON.parse(walletStatusJson)
          const bankAccountsDate = JSON.parse(bankAccountsRes.data)
          const walletTransactionsDate = JSON.parse(walletTransactionsRes.data)
          const walletStatusDate = JSON.parse(walletStatusRes.data)
          console.log('date', bankAccountsDate, walletTransactionsDate, walletStatusDate)
          if (bankAccountsDate.code === 0) {
            temp = Object.assign(temp, { bankAccounts: bankAccountsDate.data })
          } else {
            error += (error && ',' || '') + '无法同步银行卡信息'
          }
          if (walletTransactionsDate.code === 0) {
            temp = Object.assign(temp, { walletTransactionsDate: walletTransactionsDate.data })
          } else {
            error += (error && ',' || '') + '无法同步详细信息'
          }
          if (walletStatusDate.code === 0) {
            temp = Object.assign(temp, walletStatusDate.data)
          } else {
            error += (error && ',' || '') + '无法同步银行卡金额'
          }
          error = error.split(',').length === 3 && '同步失败' || error
        } catch (e) {
          error = '同步失败'
        } finally {
          temp = Object.assign(temp, { error: error })
          const index = this.tableData.findIndex(i => i.platform_mall_id === temp.platform_mall_id)
          if (index > -1) {
            this.tableData.splice(index, 1, temp)
          } else {
            this.tableData.push(temp)
          }
          let canCarry = 0
          let withdrawal = 0
          this.tableData.forEach(item => {
            const withdrawal_no = item.withdrawal_no || 0
            const balance = item.balance || 0
            canCarry += balance
            withdrawal += withdrawal_no
          })
          this.canCarry = canCarry
          this.withdrawal = withdrawal
        }
      })
    },
    async batchWithdrawal() {
      const encryptPwd = sha256(md5(this.depositPassword))
      const param = { payment_password: encryptPwd, mallId: this.active.platform_mall_id }
      const verifyPaymentJson = await this.$shopeemanService.verifyPaymentPass(this.active.country, param)
      const verifyPaymentRes = JSON.parse(verifyPaymentJson)
      console.log('verifyPaymentRes', verifyPaymentRes)
      this.depositVisible = false
      this.selectIndex++
      this.allBatchWithdrawal(true)
    },
    allBatchWithdrawal(type) {
      if (this.selectData.length || type) {
        if (this.selectIndex < 0) {
          this.selectIndex = 0
          this.active = this.selectData[this.selectIndex]
          this.depositVisible = true
        } else {
          this.active = this.selectData[this.selectIndex] || null
          if (this.active) {
            this.depositVisible = true
          } else {
            this.selectIndex = -1
          }
        }
      } else {
        this.$message.error('至少选择一条店铺信息')
      }
    },
    cancel() {
      if (this.selectIndex >= 0) {
        this.selectIndex++
        if (this.depositVisible) {
          this.depositVisible = false
          this.allBatchWithdrawal(true)
        } else {
          this.tiedCardVisible = false
          this.tiedCardPrepare(true)
        }
      } else {
        this.depositVisible = false
        this.tiedCardVisible = false
      }
    },
    async getBankList() {
      const res = await this.mallListAPIInstance.getBankList()
      this.bankList = res.data || []
      console.log('getBankList', this.bankList)
    },
    tiedCardPrepare(type) {
      if (this.selectData.length || type) {
        this.selectData.forEach(async item => {
          this.account_number = true
          const resJson = await this.$appConfig.getGlobalCacheInfo('mallInfo', item.platform_mall_id)
          const res = JSON.parse(resJson)
          this.$set(item, 'phone', res.mall_account_info && res.mall_account_info.phone || '')
        })
        this.allTiedCard()
      } else {
        this.$message.error('至少选择一条银行卡信息')
      }
    },
    allTiedCard() {
      this.cardCode = ''
      this.seed = ''
      if (this.selectData.length || type) {
        if (this.selectIndex < 0) {
          this.selectIndex = 0
          this.active = this.selectData[this.selectIndex]
          const bank = this.bankList.filter(i => i.site === this.active.country)
          const bank_list = bank && bank[0] && bank[0].bank_list || []
          const index = Math.floor(Math.random() * bank_list.length)
          this.bankCard = bank_list[index] || null
          this.tiedCardVisible = true
        } else {
          this.active = this.selectData[this.selectIndex] || null
          if (this.active) {
            const bank = this.bankList.filter(i => i.site.toLocaleUpperCase() === this.active.country)
            console.log(bank)
            const bank_list = bank && bank[0] && bank[0].bank_list || []
            const index = Math.floor(Math.random() * bank_list.length)
            this.bankCard = bank_list[index] || null
            this.tiedCardVisible = true
          } else {
            this.selectIndex = -1
          }
        }
      } else {
        this.$message.error('至少选择一条店铺信息')
      }
    },
    async getWalletOtpSeed() {
      const getWalletOtpSeedJson = await this.$shopeemanService.getWalletOtpSeed(this.active.country, { mallId: this.active.platform_mall_id })
      const getWalletOtpSeedRes = JSON.parse(getWalletOtpSeedJson)
      console.log(getWalletOtpSeedRes)
      if (getWalletOtpSeedRes.status >= 200 && getWalletOtpSeedRes.status < 300) {
        const data = JSON.parse(getWalletOtpSeedRes.data).data
        console.log(data)
        this.seed = data.seed
        this.$message.success('发送成功')
      } else {
        this.$message.error('发送失败')
      }
    },
    async tiedCard() {
      if (!this.seed || !this.cardCode) {
        const error = !this.seed &&　'请发送验证码，并输入' || '请输入验证码'
        this.$message.error(error)
        return
      }
      const param = {
        mallId: this.active.platform_mall_id,
        // phone:this.active.phone,
        account_name: this.bankCard.full_name,
        account_number: this.bankCard.account_number,
        bank_account_id: null,
        bank_code: '',
        bank_name: this.bankCard.bank_name,
        bank_name_id: this.bankCard.bank_name_id,
        ic_number: this.bankCard.ic_number,
        branch_name: '',
        region: '',
        status: 4
      }
      const option = {
        'params': {
          seed: this.seed,
          code: this.cardCode,
          otp_seed: 'bank-account'
        }
      }
      const bindBankAccountJson = await this.$shopeemanService.bindBankAccount(this.active.country, param, option)
      const bindBankAccountRes = JSON.parse(bindBankAccountJson)
      console.log('bindBankAccountRes', bindBankAccountRes)
      this.tiedCardVisible = false
      this.selectIndex++
      this.allTiedCard(true)
    },
    handleSelectionChange(val) {
      this.selectData = val
    },
    exportData() {
      if (!this.tableData.length) {
        return this.$message.warning('没有可导出的数据')
      }
      let num = 1
      let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>店铺名称</td>
              <td>银行</td>
              <td>持卡人</td>
              <td>银行卡号</td>
              <td>ICNumber</td>
              <td>可提现金额</td>
              <td>提现中金额</td>
            </tr>`
      for (let i = 0; i < this.tableData.length; i++) {
        const item = this.tableData[i]
        const categoryFirst = item.display_path && item.display_path.split('>')[0] &&
            `${item.display_path.split('>')[0]}(${item.display_path_cn.split('>')[0]})` || ''
        const categorySecond = item.display_path && item.display_path.split('>')[1] &&
            `${item.display_path.split('>')[1]}(${item.display_path_cn.split('>')[1]})` || ''
        str += `<tr><td>${num++}</td>
                    <td>${this.$filters.chineseSite(item.country) + '\t'}</td>
                    <td>${item.platform_mall_name + '\t'}</td>
                    <td>${(item.bankAccounts && item.bankAccounts.list && item.bankAccounts.list[0] && item.bankAccounts.list[0].bank_name || '') + '\t'}</td>
                    <td>${(item.bankAccounts && item.bankAccounts.list && item.bankAccounts.list[0] && item.bankAccounts.list[0].account_name || '') + '\t'}</td>
                    <td>${(item.bankAccounts && item.bankAccounts.list && item.bankAccounts.list[0] && item.bankAccounts.list[0].account_number || '') + '\t'}</td>
                    <td>${(item.bankAccounts && item.bankAccounts.list && item.bankAccounts.list[0] && item.bankAccounts.list[0].mtime || '') + '\t'}</td>
                    <td>${(item.balance || '') + '\t'}</td>
                    <td>${(item.withdrawal_no || '') + '\t'}</td>
                </tr>`
      }
      exportExcelDataCommon('热搜词推荐', str)
    },
    changeMallList(val) {
      this.SiteList = Object.assign(val)
    },
    resizeHeight() {
      const offerHeight = window.outerHeight
      this.height = offerHeight - 150
    },
    tableScroll() {

    }
  }

}
</script>

<style lang="less" scoped>
  @import '../../../module-less/mall-manager-less/mall-withdrawal.less';
</style>

<style lang="less">
  .deposit_dialog {

    .deposit_footer {
      margin-top: 10px;
      display: flex;
      justify-content: flex-end
    }
  }
  .tiedCard_dialog{
    .el-dialog__title{
      font-weight: 700;
    }
    .el-dialog__body{
     padding: 15px;
    }
    .tiedCardItem{
      margin-bottom: 10px;
      .tiedCardLabel{
        font-weight: 700;
      }
    }
  }
</style>
