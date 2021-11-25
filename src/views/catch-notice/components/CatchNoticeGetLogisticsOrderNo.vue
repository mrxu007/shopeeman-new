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
          <el-input v-model="form.shotOrderSn" size="mini" clearable />
        </div>
        <el-button size="mini" type="primary" @click="searchHandle">搜索</el-button>
        <el-button size="mini" type="primary" @click="loginHandler(1)">登录拼多多</el-button>
        <el-button size="mini" type="primary" @click="loginHandler(0)">登录淘宝</el-button>
        <el-button size="mini" type="primary" @click="loginHandler(5)">登录1688</el-button>
        <el-button size="mini" type="primary" @click="siteChooseVisible = true" v-show="false">登录Lazada</el-button>
        <el-button size="mini" type="primary" @click="syncLogistics('new')">获取采购物流单号</el-button>
        <el-checkbox v-model="showConsole" style="margin-left: 15px">隐藏日志</el-checkbox>
      </div>
      <!-- 第二行 -->
      <div class="rowTwo">说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;明：采购订单发货需及时获取采购物流单号，此通知只会同步采购后近5天未获取采购物流单号的订单</div>
      <!-- 第三行 -->
      <div class="rowThree">操作指引：请根据采购类型和采购账号登录对应采购账号获取采购物流单号或者手动填写采购物流单号</div>
    </div>
    <!-- 下面表格部分 -->
    <div class="bottom">
      <el-table v-loading="isStart" :header-cell-style="{ background: '#f5f7fa' }" :data="tableData" border style="width: 100%" height="calc(100vh - 160px)" @selection-change="handleSelectionChange">
        <el-table-column align="center" type="selection" width="50" />
        <el-table-column type="index" label="序列号" width="80" />
        <el-table-column label="订单号" prop="order_sn" />
        <el-table-column prop="ori_platform" label="采购类型" />
        <el-table-column prop="shot_order_sn" label="采购订单号" />
        <el-table-column prop="shotted_at" label="采购时间" />
        <el-table-column prop="buy_account_info" label="采购账号">
          <template slot-scope="scope">
            {{ scope.row.buy_account_info && scope.row.buy_account_info.name }}
          </template>
        </el-table-column>
        <el-table-column prop="pay_account_info" label="付款账号">
          <template slot-scope="scope">
            {{ scope.row.pay_account_info && scope.row.pay_account_info.name }}
          </template>
        </el-table-column>
        <el-table-column label="操作">
          <template slot-scope="scope">
            <el-button size="mini" type="primary" @click="logisticsOrderNoHandle(scope.row)">填写采购物流单号</el-button>
          </template>
        </el-table-column>
      </el-table>
      <!-- <el-input v-if="!hideLog" v-model="logData" resize="none" type="textarea" class="flowNumberLog" /> -->
    </div>
    <el-dialog title="站点选择" :visible.sync="siteChooseVisible" width="300px">
      <div class="tool-item">
        <span>站点：</span>
        <el-select v-model="siteCode" placeholder="" size="mini" filterable>
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="loginHandler(7)">确定</el-button>
      </div>
    </el-dialog>
    <!--填写采购物流单号dialog-->
    <el-dialog title="采购物流单号填写" :visible.sync="logisticsOrderNoDialogFormVisible" width="500px">
      <el-form :model="logisticsOrderNoDialogForm" class="dialog-center">
        <el-form-item label="绑定仓库:" label-width="80px">
          <el-select v-model="warehouseId" size="mini" class="inputBox">
            <el-option v-for="item in logisticsOrderNoDialogWarehouseOptions" :key="item.value" :label="item.label" :value="item.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="物流公司:" label-width="80px">
          <el-input v-model="trackingNumberCompany" size="mini" class="inputBox" />
        </el-form-item>
        <el-form-item label="物流单号:" label-width="80px">
          <el-input v-model="trackingNumber" size="mini" class="inputBox" />
        </el-form-item>
      </el-form>
      <div style="color: red">
        <span>关于绑定仓库选项:</span>
        <p>1、仅显示当前订单店铺绑定的仓库</p>
        <p>2、采购类型如果为国内平台时，显示国内中转仓，如果为国外平台，则显示海外仓</p>
      </div>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" size="mini" @click="logisticsOrderNoDialogHandle">保存</el-button>
      </div>
    </el-dialog>
    <Logs ref="Logs" clear v-model="showConsole" />
  </div>
</template>

<script>
import LogisticeSyncService from '../../../services/logistics-sync-service/logistics-sync-service-new'

export default {
  data() {
    return {
      // 控制采购物流单号dialog
      logisticsOrderNoDialogFormVisible: false,
      // 采购物流单号dialog表单数据
      logisticsOrderNoDialogForm: {},
      trackingNumber: '',
      trackingNumberCompany: '',
      warehouseId: '',
      logisticsOrderNoDialogWarehouseOptions: [
        {
          value: '1',
          label: '星卓越泰国海外仓',
        },
        {
          value: '2',
          label: '东莞华夏本土仓',
        },
      ],
      //   搜索条件
      form: {
        shotOrderSn: '', // 采购物流编号
      },
      showConsole: true, // 隐藏日志
      // 表格数据
      tableData: [],
      logData: '', // 日志内容
      isStart: false,
      siteCode: 'TH',
      siteChooseVisible: false,
      siteList: [
        {
          value: 'TH',
          label: '泰国站',
        },
        {
          value: 'MY',
          label: '马来站',
        },
        {
          value: 'VN',
          label: '越南站',
        },
        {
          value: 'ID',
          label: '印尼站',
        },
        {
          value: 'PH',
          label: '菲律宾站',
        },
        {
          value: 'SG',
          label: '新加坡站',
        },
      ],
      buyerAccountList: [],
      multipleSelection: [],
      rowInfo: {},
    }
  },
  mounted() {
    this.getExceptionNoTrackingNumberIndex()
  },
  methods: {
    //各平台登录
    async loginHandler(type) {
      this.siteChooseVisible = false
      let account = ''
      switch (type) {
        case 1:
          account = await this.$buyerAccountService.pddLogin()
          break
        case 0:
          account = await this.$buyerAccountService.taobaoLogin()
          break
        case 5:
          account = await this.$buyerAccountService.alibabaLogin()
          break
        case 7:
          account = await this.$buyerAccountService.lazadaLogin(this.siteCode)
          break
        default:
          this.$message.error('不存在该平台，请校验后再次尝试！')
          break
      }
      if (account) {
        console.log(account)
        this.upBuyerAccountList(account, type)
      }
    },
    //   表格选择
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    changeAccountType(type) {
      let accountType = type
      switch (type) {
        case 1:
          accountType = 1 //拼多多
          break
        case 2:
          accountType = 2 //淘宝
          break
        case 8:
          accountType = 6 //1688
          break
        // case 8:
        //   accountType = 8 //lazada
        //   break
        default:
          break
      }
      return accountType
    },
    changeShotOrderPlatform(type) {
      let shotOrderPlatform = type
      switch (type) {
        case 1:
          shotOrderPlatform = 1 //拼多多
          break
        case 2:
          shotOrderPlatform = 0 //淘宝
          break
        case 8:
          shotOrderPlatform = 5 //1688
          break
        case 9:
          shotOrderPlatform = 7 //lazada
          break
        default:
          break
      }
      return shotOrderPlatform
    },
    //更新买手号列表(自动上传)
    async upBuyerAccountList(account, type) {
      let params = {
        UserName: account.name,
        UserNameCache: account.cache_path,
        Password: '',
        shotOrderPlatform: type,
        LoginedCookies: account.loginCookies,
        UserName: account.name,
        Cookiestr: JSON.stringify(account.loginCookies),
        AccountType: this.changeAccountType(account.type),
        Ua: account.ua,
        Country: account.country || '',
        type: account.type,
      }
      const key = params.AccountType + params.UserName
      console.log(account, params, key)
      await this.$appConfig.UpdateCacheInfo('buyerInfo', key, params)
    },
    // 查询
    async searchHandle() {
      if (this.isStart) {
        this.$message.error('正在获取数据')
        return
      }
      this.isStart = true
      const result = await this.$api.getExceptionNoTrackingNumberIndex(this.form)
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
      } else {
        this.$message.error(result.data.message)
      }
      setTimeout(() => {
        this.isStart = false
      }, 3000)
    },
    // 填写采购物流单号
    async logisticsOrderNoHandle(row) {
      try {
        this.rowInfo = row
        this.logisticsOrderNoDialogFormVisible = true
        let res = await this.$appConfig.getWarehouseInfo(row.platform_mall_id)
        let resObj = res && JSON.parse(res)
        this.warehouseId = resObj && resObj[0] && resObj[0].warehouse_id
      } catch (error) {
        console.log(error)
      }
    },
    // 采购物流单号dialog保存
    async logisticsOrderNoDialogHandle() {
      let params = {
        sysOrderId: this.rowInfo.sys_order_id,
        lists: [{ id: '0', trackingNumber: this.trackingNumber, trackingNumberCompany: this.trackingNumberCompany }],
        warehouseId: this.warehouseId,
      }
      const res = await this.$api.updateOrderTrackingNumber(params)
      console.log(res, 'logisticsOrderNoDialogHandle')
      if (res.data.code === 200) {
        this.logisticsOrderNoDialogFormVisible = false
        this.trackingNumber = ''
        this.trackingNumberCompany = ''
        this.$message({
          message: '采购物流单号添加成功',
          type: 'success',
        })
        this.getExceptionNoTrackingNumberIndex()
      } else {
        this.$message.error(res.data.message)
      }
    },
    async syncLogistics(mode) {
      this.showConsole = false
      this.$refs.Logs.consoleMsg = ''
      this.$refs.Logs.writeLog(`获取采购物流轨迹开始`, true)
      const service = new LogisticeSyncService(this.writeLog, mode)
      let buyers = await this.$appConfig.getGlobalCacheInfo('buyerInfo', 'key')
      if (!buyers) {
        return this.$refs.Logs.writeLog(`没有买手号`, false)
      }
      let resObj = JSON.parse(buyers)
      let buyerAccountList = []
      for (const key in resObj) {
        buyerAccountList.push(resObj[key])
      }
      if (!buyerAccountList.length) {
        return this.$refs.Logs.writeLog(`没有买手号`, false)
      }
      if (this.multipleSelection.length > 0) {
        service.start(this, buyerAccountList, this.multipleSelection)
      } else {
        service.start(this, buyerAccountList)
      }
      console.log(buyerAccountList, resObj)
    },
    // 获取物流单号订单列表
    async getExceptionNoTrackingNumberIndex() {
      const result = await this.$api.getExceptionNoTrackingNumberIndex()
      if (result.data.code === 200) {
        this.tableData = result.data.data.data
        console.log('tableData', this.tableData)
      } else {
        this.$message.error(result.data.message)
      }
    },
  },
}
</script>

<style lang="less" scoped>
.CatchNoticeGetLogisticsOrderNo {
  padding: 16px;
  background: #fff;
}
//上面查询条件部分
.search {
  white-space: nowrap;
  overflow-y: auto;
  & > div {
    margin: 10px 0;
    &:first-child {
      margin-top: 0;
    }
    &:last-child {
      margin-bottom: 0;
    }
  }
  .rowOne {
    display: flex;
    align-items: center;
    //采购物流单号
    .flowNumber {
      margin-right: 10px;
      .el-input {
        width: 150px;
      }
    }
  }
  .rowTwo {
    font-size: 13px;
  }
  .rowThree {
    color: red;
    font-size: 13px;
  }
}
.bottom {
  display: flex;
  margin-top: 10px;
  //表格部分
  .el-table {
    flex: 1;
  }
  //日志部分
  .flowNumberLog {
    width: 300px;
    /deep/.el-textarea__inner {
      border-radius: 0;
      height: calc(100vh - 160px);
    }
  }
}
.inputBox {
  width: 200px;
}
.el-form-item {
  margin: 0 auto;
}
</style>
