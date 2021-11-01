<template>
  <el-row class="contaniner">
    <el-row class="header-two">
      <div style="display: flex;margin-bottom: 10px;">
        <storeChoose @changeMallList="changeMallList"></storeChoose>
        <el-button size="mini" type="primary" @click="synchronousShops">同步店铺金额</el-button>
        <el-button size="mini" @click="batchWithdrawal">批量提现</el-button>
      </div>
      <el-col :span="24" class="header-two-top">
        <p>当前可提现总金额：<span style="color: red">{{canCarry}}</span></p>
        <p>当前提现中总金额：<span style="color: red">{{withdrawal}}</span></p>
        <p style="margin-right: 10px;">
          各店铺满
          <el-input v-model="demand" placeholder="" size="mini"/>
          才可以提现
        </p>
        <p style="margin-right: 5px;">
          预留金额：
          <el-input style="margin: 0 5px;" v-model="reserved" placeholder="" size="mini"/>
        </p>
        <el-button type="primary" size="mini" @click="exportData">导出</el-button>
      </el-col>
    </el-row>
    <el-row class="article">
      <u-table ref="plTable" height="height"
               use-virtual
               :data="tableData"
               :data-changes-scroll-top="false"
               :height="height"
               :row-height="rowHeight"
               :border="false"
               @table-body-scroll="tableScroll">
        <u-table-column align="center" type="selection" width="50"/>
        <u-table-column align="center" type="index" label="序列号" width="80"/>
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
            {{scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] && scope.row.bankAccounts.list[0].bank_name}}
          </template>
          </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" width="120px" label="持卡人">
          <template slot-scope="scope">
            {{scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] && scope.row.bankAccounts.list[0].account_name}}
          </template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="银行卡号">
          <template slot-scope="scope">
            {{scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] && scope.row.bankAccounts.list[0].account_number}}
          </template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="ICNumber">
          <template slot-scope="scope">
            {{scope.row.bankAccounts &&scope.row.bankAccounts.list && scope.row.bankAccounts.list[0] && scope.row.bankAccounts.list[0].mtime}}
          </template>
        </u-table-column>
        <u-table-column align="center" width="120px" label="可提现金额">
          <template slot-scope="scope">{{ scope.row.balance }}</template>
        </u-table-column>
        <u-table-column align="center" width="120px" label="提现中金额">
          <template slot-scope="scope">{{ scope.row.withdrawal_no }}</template>
        </u-table-column>
        <u-table-column align="center" label="今日是否可提现">
          <template slot-scope="scope">{{scope.row.balance && '是' || '否'}}</template>
        </u-table-column>
        <u-table-column align="center" :show-overflow-tooltip="true" label="操作状态">
          <template slot-scope="scope">{{ scope.row.error || '同步成功'}}</template>
        </u-table-column>
        <u-table-column align="center" label="操作">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" v-if="scope.row.bankAccounts&&scope.row.bankAccounts.list[0]" @click="depositVisible = true;active=scope.row">提现</el-button>
          </template>
        </u-table-column>
      </u-table>
    </el-row>
    <div class="deposit_dialog">
      <el-dialog :title="active && (active.mall_alias_name || active.platform_mall_name)+'提现密码'"
                 :visible.sync="depositVisible"
                 :close-on-click-modal="false" width="40%">
        <el-input v-model="depositPassword" size="mini"></el-input>
        <div class="deposit_footer">
          <el-button type="primary" size="mini" @click="batchWithdrawal">确定</el-button>
          <el-button size="mini" @click="depositVisible = false">取消</el-button>
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

  export default {
    components: { storeChoose },
    data() {
      return {
        isShowLog: true,
        depositVisible:false,
        active: null,
        depositPassword:'',
        canCarry: 0,
        withdrawal: 0,
        demand: 50,
        reserved: 30,
        height: 300,
        rowHeight: 50,
        SiteList: [],
        tableData: [],
      }
    },
    created() {
      this.resizeHeight()
      window.addEventListener('resize', (event) => {
        this.resizeHeight()
      })
    },
    methods: {
      synchronousShops() {
        this.tableData = []
        this.SiteList.forEach(async item => {
          console.log(item)
          let time = new Date().getTime()
          let start_date = dateFormat(time, 'yyyy-MM-dd')
          let end_date = dateFormat((time - 30 * 24 * 60 * 60 * 1000), 'yyyy-MM-dd')
          let param1 = {
            shop_id: parseInt(item.platform_mall_id),
            password_hash: '8523cacc5229f136f37bf211ba486138562fe97a050d4859bc88f7a914c11bf1'
          }
          let param2 = {
            shop_id: parseInt(item.platform_mall_id),
            transaction_types: '201,203',
            start_date: start_date,
            end_date: end_date,
            wallet_type: 0,
            page_number: 1,
            page_size: 20
          }
          let param3 = { shop_id: parseInt(item.platform_mall_id), wallet_type: 0 }
          let temp = JSON.parse(JSON.stringify(item))
          let error = ''
          let bankAccountsJson = await this.$shopeemanService.getBankAccounts(item.country, param1, {
            params: {
              page_size: 30,
              page_number: 1
            },
            headers:{'Content-Type' : 'application/x-www-form-urlencoded'}
          })
          let walletTransactionsJson = await this.$shopeemanService.getWalletTransactions(item.country, param2)
          let walletStatusJson = await this.$shopeemanService.getWalletStatus(item.country, param3)
          try {
            let bankAccountsRes = JSON.parse(bankAccountsJson)
            let walletTransactionsRes = JSON.parse(walletTransactionsJson)
            let walletStatusRes = JSON.parse(walletStatusJson)
            let bankAccountsDate = JSON.parse(bankAccountsRes.data)
            let walletTransactionsDate = JSON.parse(walletTransactionsRes.data)
            let walletStatusDate = JSON.parse(walletStatusRes.data)
            console.log('date',bankAccountsDate,walletTransactionsDate,walletStatusDate)
            if (bankAccountsDate.code === 0) {
              temp = Object.assign(temp, { bankAccounts: bankAccountsDate.data })
            }else{
              error += (error && ',' || '') + '无法同步银行卡信息'
            }
            if (walletTransactionsDate.code === 0) {
              temp = Object.assign(temp, { walletTransactionsDate: walletTransactionsDate.data })
            }else{
              error += (error && ',' || '') + '无法同步详细信息'
            }
            if (walletStatusDate.code === 0) {
              temp = Object.assign(temp, walletStatusDate.data)
            }else{
              error += (error && ',' || '') + '无法同步银行卡金额'
            }
            error = error.split(',').length === 3 && '同步失败' || error
          } catch (e) {
            error = '同步失败'
          } finally {
            temp = Object.assign(temp,{error:error})
            let index = this.tableData.findIndex(i=>i.platform_mall_id === temp.platform_mall_id)
            if (index > -1){
              this.tableData.splice(index,1,temp)
            } else{
              this.tableData.push(temp)
            }
            let canCarry = 0
            let withdrawal = 0
            this.tableData.forEach(item=>{
              let withdrawal_no = item.withdrawal_no || 0
              let balance = item.balance || 0
              canCarry += balance
              withdrawal += withdrawal_no
            })
            this.canCarry = canCarry
            this.withdrawal = withdrawal
          }
        })
      },
      batchWithdrawal() {
        const encryptPwd = sha256(md5(this.depositPassword))
        console.log(encryptPwd)
      },
      allBatchWithdrawal(){

      },
      exportData() {
        if (!this.tableData.length) {
          return this.$message.warning('没有可导出的数据')
        }
        let num = 1
        let str = `<tr>
              <td>编号</td>
              <td>站点</td>
              <td>一级类目</td>
              <td>二级类目</td>
              <td>热搜词分类类目</td>
              <td>热搜词名称</td>
              <td>产品数</td>
              <td>更新时间</td>
              <td>近30天销量</td>
            </tr>`
        for (let i = 0; i < this.tableData.length; i++) {
          let item = this.tableData[i]
          let categoryFirst = item.display_path && item.display_path.split('>')[0]
            && `${item.display_path.split('>')[0]}(${item.display_path_cn.split('>')[0]})` || ''
          let categorySecond = item.display_path && item.display_path.split('>')[1]
            && `${item.display_path.split('>')[1]}(${item.display_path_cn.split('>')[1]})` || ''
          str += `<tr><td>${num++}</td>
                    <td>${item.platform_id ? item.platform_id : 0 + '\t'}</td>
                    <td>${categoryFirst + '\t'}</td>
                    <td>${categorySecond + '\t'}</td>
                    <td>${categorySecond + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].keyword_name || '' + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].total_count || 0 + '\t'}</td>
                    <td>${dateFormat(item.update_time * 1000, 'yyyy-MM-dd') + '\t'}</td>
                    <td>${item.hotKeywords[0] && item.hotKeywords[0].keyword_month_sales || 0 + '\t'}</td>
                </tr>`
        }
        exportExcelDataCommon('热搜词推荐', str)
      },
      changeMallList(val) {
        this.SiteList = Object.assign(val)
      },
      resizeHeight() {
        let offerHeight = window.innerHeight
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
  .deposit_dialog{

    .deposit_footer{
      margin-top: 10px;
      display: flex;
      justify-content: flex-end
    }
  }
</style>
