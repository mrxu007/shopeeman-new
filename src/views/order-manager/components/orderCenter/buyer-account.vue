<!--
 * @Author: your name
 * @Date: 2021-11-09 10:14:02
 * @LastEditTime: 2021-11-26 10:02:59
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\components\buyer-account.vue
-->
<template>
  <div class="account-plugin">
    <div class="box">
      <div class="left" style="margin-right: 10px">
        <div v-for="(item, index) in operation.left" :key="index" class="btn-item">
          <el-button :type="item.type || ''" :size="item.size || 'mini'" @click="handelBtn(item.key, item.click, item.clickParams)">{{ item.title }}</el-button>
          <el-checkbox v-if="item.check === 'order'" v-model="isOrderSelectAllMall" style="margin-left: 5px">全店同步</el-checkbox>
          <el-checkbox v-if="item.check === 'ship'" v-model="isCheckOrderShip" style="margin-left: 5px">勾选订单同步</el-checkbox>
        </div>
      </div>
      <div class="center">
        <div v-for="(item, index) in operation.center" :key="index" class="account-item">
          <span>{{ item.title }}</span>
          <el-select v-model="selectAccount[platformValue[item.platform]]" :size="item.size || 'mini'" clearable placeholder="请选择" @change="accountChange()">
            <el-option v-for="(items, index) in publicAccount(item.platform)" :key="index" :label="items.name" :value="items.id">
              <span>{{ items.name }}</span>
              <i
                class="el-icon-delete"
                style="float: right; color: #8492a6; font-size: 14px; margin: 10px -10px 0 0"
                @click="
                  activeAccount = items
                  deleteAccount = true
                "
              />
            </el-option>
          </el-select>
          <el-button :size="item.size || 'mini'" style="margin-right: 6px; width: 165px" @click="publicCenter(selectAccount[platformValue[item.platform]], item.platform)">
            {{ item.centerTitle }}</el-button
          >
        </div>
        <div class="account-item">
          <span>天猫淘宝海外账号</span>
          <el-select v-model="selectAccount[platformValue[13]]" size="mini" clearable placeholder="请选择" @change="accountChange()">
            <el-option v-for="(items, index) in buyerAccountListGlobal" :key="index" :label="items.account" :value="items.id">
              <span>{{ items.account }}</span>
            </el-option>
          </el-select>
          <el-button size="mini" @click="reFreshGlobal" style="margin-right: 6px; width: 165px" >刷新天猫淘宝海外平台账号</el-button>
        </div>
      </div>
      <div class="right">
        <div v-for="(item, index) in operation.right" :key="index" class="btn-item">
          <el-button :type="item.type || ''" :size="item.size || 'mini'" @click="handelBtn(item.key, item.click, item.clickParams)">{{ item.title }}</el-button>
        </div>
      </div>
    </div>
    <p />
    <!-- <div class="msg"><i class="el-icon-warning" /><b>温馨提示</b>物流单号无法获取，请重新登录买手号或核对买手号信息是否正确。</div> -->
    <el-dialog title="选择登录平台" :visible.sync="loginAccount" width="520px">
      <div class="btn-header">
        代理设置：
        <el-select v-model="proxyType" placeholder="" size="mini" filterable　style="width:100px;margin-right:10px;">
          <el-option v-for="(item, index) in proxyList" :key="index" :label="item.ip_alias" :value="item.id" />
        </el-select>
        <el-select v-model="siteCode" placeholder="" size="mini" filterable style="width: 100px">
          <el-option v-for="(item, index) in siteList" :key="index" :label="item.label" :value="item.value" />
        </el-select>
      </div>
      <div class="ridioBox">
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            pddLoginHandler()
          "
          >登录拼多多</el-button
        >
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            taobaoLogin()
          "
          >登录淘宝</el-button
        >
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            AlibabaLogin()
          "
          >登录1688</el-button
        >
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            jingxiLogin()
          "
          >登录京喜</el-button
        >
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            lazadaLogin()
          "
          >登录Lazada</el-button
        >
        <el-button
          type="primary"
          style="margin: 0 12px 20px; width: 110px"
          size="mini"
          @click="
            loginAccount = false
            shopeeLogin()
          "
          >登录Shopee</el-button
        >
      </div>
    </el-dialog>
    <el-dialog title="删除买手号" :visible.sync="deleteAccount" width="380px">
      <p v-if="activeAccount" style="font-size: 18px; padding: 0 30px; text-align: center">确定删除买手号:{{ activeAccount.name }}</p>
      <span slot="footer" class="dialog-footer">
        <el-button size="small" style="width: 80px; margin: 0 20px 20px" @click="deleteAccount = false">取 消</el-button>
        <el-button
          size="small"
          style="width: 80px; margin: 0 55px"
          type="primary"
          @click="
            deleteAccount = false
            removebuyerAccount()
          "
          >确 定</el-button
        >
      </span>
    </el-dialog>
  </div>
</template>

<script>
import { syncStatus } from './orderCenter'
import orderSync from '../../../../services/timeOrder'
import LogisticeSyncService from '../../../../services/logistics-sync-service/logistics-sync-service-new-copy'
import shotOrderPlatform from '../../../../services/short-order/shot-order-platform'
export default {
  name: 'BuyerAccount',
  props: {
    // buyerAccountList: {
    //   type: Array,
    //   default: () => [],
    // },
    upData: {
      type: String,
      default: 'buyerAccountList',
    },
    operation: {
      type: Object,
      default: () => {
        return {
          url: {
            getAccount: {
              path: '/api/buyerAccount/',
            },
            upAccount: {
              path: '/api/buyerAccount/store',
            },
            removeAccount: {
              path: '/api/buyerAccount/destroy',
            },
          },
          upData: 'buyerAccountList',
          left: [{ title: '登录买手号', type: 'primary', key: 1 }],
          center: [
            { title: '拼多多账号', platform: 1, centerTitle: '拼多多个人中心' },
            { title: '淘宝账号', platform: 2, centerTitle: '淘宝个人中心' },
            { title: '1688账号', platform: 8, centerTitle: '1688个人中心' },
            { title: '京喜账号', platform: 10, centerTitle: '京喜个人中心' },
            { title: 'lazada账号', platform: 9, centerTitle: 'lazada个人中心' },
            { title: 'shopee账号', platform: 11, centerTitle: 'shopee个人中心' },
            { title: '天猫淘宝海外账号', platform: 13, centerTitle: '刷新天猫淘宝海外平台账号' },
            // { title: '京东账号', platform: 4 }
          ],
          right: [
            // { title: '拼多多优惠券', key: 2 },
            // { title: '下载账号信息', key: 3 }
          ],
        }
      },
    },
  },
  data() {
    return {
      siteCode: 'TH',
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
      selectAccount: {
        accountpdd: '',
        accounttaobao: '',
        account1688: '',
        accountjx: '',
        accountlazada: '',
        accountshopee: '',
        accountCrossBorder: '',
      },
      platformValue: {
        1: 'accountpdd',
        2: 'accounttaobao',
        8: 'account1688',
        10: 'accountjx',
        9: 'accountlazada',
        11: 'accountshopee',
        13: 'accountCrossBorder',
      },
      activeAccount: null,
      loginAccount: false,
      otherOperation: false,
      deleteAccount: false,
      proxyType: '',
      proxyList: [],
      isOrderSelectAllMall: true, //是否全店同步
      isCheckOrderShip: false, //勾选订单同步物流
      buyerAccountList:[],
      buyerAccountListGlobal:[]
    }
  },
  computed: {
    pddAccount() {
      return this.buyerAccountList.filter((item) => item.type == 1)
    },
    tbAccount() {
      return this.buyerAccountList.filter((item) => item.type == 2)
    },
    albbAccount() {
      return this.buyerAccountList.filter((item) => item.type == 8)
    },
    jxAccount() {
      return this.buyerAccountList.filter((item) => item.type == 10)
    },
    lazadaAccount() {
      return this.buyerAccountList.filter((item) => item.type == 9)
    },
    shopeeAccount() {
      return this.buyerAccountList.filter((item) => item.type == 11)
    },
    globalAccount() {
      return this.buyerAccountList.filter((item) => item.type == 13)
    },
  },
  watch: {
    'buyerAccountList.length': {
      handler(newValue, oldValue) {
        if (newValue !== oldValue) {
          this.defaultSelect()
        }
      },
    },
  },
  async mounted() {
    await this.buyerAccount()
    await this.getGlobalAccount()
    this.defaultSelect()
  },
  methods: {
    //刷新天猫淘宝海外平台账号
    async reFreshGlobal(){
       this.buyerAccountListGlobal.forEach(async item => {
        let params = {
          userId: item.user_id
        }
       await  this.$shopeemanService.postChineseLaiZan('http://api.laizand.com/api/open/refreshAccessToken', params, { // options
          headers: {
            'Content-Type':	'application/x-www-form-urlencoded'
          }
        })
      })
      await this.getGlobalAccount()
      this.$message.success('刷新成功!')
    },
    //获取天猫淘宝海外账号
    async getGlobalAccount(){
      const userInfo = await this.$appConfig.getUserInfo()
      let params = {
        uid: userInfo.muid,
        uuid: '0',
        account: '',
        accountAliasName: '',
        app_key: 'KYsyQGFviz2i0uQF'
      }
      let res = await this.$shopeemanService.getChineseLaiZan('http://api.laizand.com/api/open/getTbGlobalUser?', params, { // options
        headers: {
          'Accept': 'application/json, application/xml, text/json, text/x-json, text/javascript, text/xml',
          'Accept-Encoding': ' gzip, deflate',
          'User-Agent': 'RestSharp/106.3.1.0'
        }
      })
      const data = JSON.parse(res)
      const des = data && JSON.parse(data.data)
      if(des&&des.code === 200){
        let arr = des.data.data || []
        arr.forEach(item=>{
          item.type = 13
        })
        this.buyerAccountListGlobal = arr
        this.$parent['buyerAccountListGlobal'] = arr
        // console.log(this.buyerAccountListGlobal,"buyerAccountListGlobal")
        this.defaultSelect()
      }
    },
    //同步物流单号
    async syncLogistics() {
      const service = new LogisticeSyncService(this.$parent.$refs.Logs.writeLog)
      if (!this.buyerAccountList.length) {
        this.$refs.Logs.writeLog(`没有买手号，请登录买手号`, false)
        return this.$message.warning('没有买手号,请登录！')
      }
      if (this.isCheckOrderShip) {
        if (!this.$parent.multipleSelection.length) {
          return this.$message.warning('请先选择订单数据！')
        }
        this.$parent.showConsole = false //打开日志
        this.$parent.$refs.Logs.consoleMsg = ''
        this.$parent.$refs.Logs.writeLog(`获取采购物流轨迹开始`, true)
        service.start(this, this.buyerAccountList, this.$parent.multipleSelection)
      } else {
        this.$parent.showConsole = false //打开日志
        this.$parent.$refs.Logs.consoleMsg = ''
        this.$parent.$refs.Logs.writeLog(`获取采购物流轨迹开始`, true)
        service.start(this, this.buyerAccountList)
      }
      console.log(this.buyerAccountList)
    },
    //同步订单按钮
    async SyncOrder() {
      let mallList = []
      this.$parent.showConsole = false //打开日志
      this.$parent.$refs.Logs.consoleMsg = ''
      if (this.isOrderSelectAllMall) {
        //全店同步
        let res = await this.$appConfig.getGlobalCacheInfo('allMallInfo', 'key')
        let mallObject = res && JSON.parse(res)
        if (mallObject) {
          for (const key in mallObject) {
            mallList.push(mallObject[key])
          }
        }
        console.log(mallList, JSON.parse(res))
      } else {
        mallList = this.$parent.selectMallList
      }
      if (mallList.length == 0) {
        this.$parent.$refs.Logs.writeLog('店铺数据为空，同步操作已取消!', false)
        return
      }
      this.$parent.$refs.Logs.writeLog('开始同步，请耐心等待!', true)
      for (let mI = 0; mI < mallList.length; mI++) {
        let mall = mallList[mI]
        for (let i = 0; i < syncStatus.length; i++) {
          //同步状态
          let statusObj = syncStatus[i]
          const orderService = new orderSync(mall, statusObj, this, this.$parent.$refs.Logs.writeLog)
          await orderService.start(`${mI + 1}/${mallList.length}`, 'manual')
        }
      }
      this.$parent.$refs.Logs.writeLog('订单同步已完成！！！', true)
    },
    //获取代理主体
    async getProxy() {
      let params = {}
      const userInfo = await this.$appConfig.getUserInfo()
      params.uid = userInfo.muid
      const res = await this.$YipService.GetIpList(JSON.stringify(params))
      // console.log(res,JSON.stringify(params))
      let resObj = JSON.parse(res)
      this.proxyList = (resObj && resObj.data) || []
      console.log('getProxy', resObj)
    },
    // 获取买手登录cookie
    getBuyerLoginCookies(login_info) {
      try {
        const result = JSON.parse(login_info)
        return result
      } catch (error) {
        const items = login_info.split(';')
        if (items) {
          const loginCookies = []
          items.forEach((element) => {
            const index = element.indexOf('=')
            const name = element.slice(0, index)
            const value = element.slice(index + 1)
            if (name && value) {
              loginCookies.push({
                Name: name,
                Value: value,
              })
            }
          })
          return loginCookies
        }
      }
    },
    // 公共按钮
    handelBtn(key, clickEvent, params) {
      switch (key) {
        case 1: //登录买手号
          this.loginAccount = true
          this.getProxy()
          return
        case 2: //同步订单
          this.SyncOrder()
          return
        case 3: //同步物流
          this.syncLogistics()
          return
        case 4: //批量拍单
          console.log(this.$parent)
          this.$parent[clickEvent]()
          return
        case 5: //配置列
          this.$parent['columnVisible'] = true
          return
        case 6: //上传买手号
          this.batchUpBuyer(1)
          return
        case 7: //下载买手号
          this.buyerAccount(1)
          return
        case 8: //同步数据至仓库
          if (!this.$parent['multipleSelection'].length) {
            return this.$message.warning('请先选择商品！')
          }
          this.$parent['pushOrderToStoreVisible'] = true
          return
        case 9: //颜色标识
          if (!this.$parent['multipleSelection'].length) {
            return this.$message.warning('请先选择需要标记的商品！')
          }
          this.$parent['colorVisible'] = true
          this.$parent[clickEvent]()
          return
        case 10: //配置列
          if (!this.$parent['multipleSelection'].length) {
            return this.$message.warning('请先选择需要标记的商品！')
          }
          this.$parent['abroadVisible'] = true
          return
        case 11: //设置采购信息
          if (!this.$parent['multipleSelection'].length) {
            return this.$message.warning('请先选择商品！')
          }
          this.$parent['dealType'] = 'batch'
          this.$parent['purchaseInfoVisible'] = true
          return
      }
      if (clickEvent) {
        if (params) {
          this.$parent[clickEvent](params)
        } else {
          this.$parent[clickEvent]()
        }
      }
    },
    // 公共账号列表
    publicAccount(id) {
      switch (id) {
        case 1:
          // console.log(this.pddAccount, 'pddAccount')
          return this.pddAccount
        case 2:
          // console.log(this.tbAccount, 'tbAccount')
          return this.tbAccount
        case 8:
          return this.albbAccount
        case 9:
          return this.lazadaAccount
        case 10:
          return this.jxAccount
        case 11:
          return this.shopeeAccount
        case 13:
          return this.globalAccount
        default:
          return []
      }
    },
    // 公共个人中心
    publicCenter(id, platform) {
      console.log(id, 'id')
      switch (platform) {
        case 1:
          this.pddUserCenterHandler(id)
          break
        case 2:
          this.taobaoUserCenter(id)
          break
        case 8:
          this.AlibabaUserCenter(id)
          break
        case 9:
          this.lazadaUserCenter(id)
          break
        case 10:
          this.jingxiUserCenter(id)
          break
        case 11:
          this.shopeeUserCenter(id)
          break
        default:
          break
      }
    },
    //更新买手号列表(自动上传)
    async upBuyerAccountMedia(account, type) {
      let params = {
        UserNameCache: account.cache_path,
        Password: '',
        shotOrderPlatform: type,
        LoginedCookies: account.loginCookies,
        UserName: account.name,
        Cookiestr: JSON.stringify(account.loginCookies),
        AccountType: account.type,
        Ua: account.ua,
        Country: account.country || '',
        proxyId: this.proxyType,
      }
      const key = params.AccountType + params.UserName
      console.log(account, params, key, 'adddddddddd')
      await this.$appConfig.UpdateCacheInfo('buyerInfo', key, params)
    },
    //转换拍单平台type
    changeType(type) {
      switch (type) {
      case 1:
        return shotOrderPlatform.PinDuoduo
      case 2:
      case 3:
        return shotOrderPlatform.TaoBao
      case 4:
        return shotOrderPlatform.JingDong
      case 8:
        return shotOrderPlatform.Alibaba
      case 9:
        return shotOrderPlatform.Lazada
      case 10:
        return shotOrderPlatform.JingXi
      case 11:
        return shotOrderPlatform.Shopee
      case 13:
        return shotOrderPlatform.CrossBorder
      default:
        return shotOrderPlatform.PinDuoduo
    }
    },
    //转换参数为壳需要
    changeAccountParams(account) {
      let params = {
        UserNameCache: account.cache_path,
        Password: '',
        shotOrderPlatform: this.changeType(account.type),
        LoginedCookies: account.login_info,
        UserName: account.name,
        Cookiestr: JSON.stringify(account.login_info),
        AccountType: account.type,
        Ua: account.ua,
        Country: account.site || '',
      }
      return params
    },
    // 拼多多买手号登录
    async pddLoginHandler() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.pddLogin()
        console.log(account, 'pddLoginHandler')
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    async pddUserCenterHandler(id) {
      const serives = this.gotouser(id)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.pddUserCenter(account)
      }
    },
    // 淘宝登录
    async taobaoLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.taobaoLogin()
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    async taobaoUserCenter(id) {
      const serives = this.gotouser(id)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.taobaoUserCenter(account)
      }
    },
    // 京喜登录
    async jingxiLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.jingxiLogin()
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    // 京喜个人中心
    async jingxiUserCenter(id) {
      const serives = this.gotouser(id)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.jingxiUserCenter(account)
      }
    },
    // 1688登录
    async AlibabaLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.alibabaLogin()
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    async AlibabaUserCenter(id) {
      const serives = this.gotouser(id)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.AlibabaUserCenter(account)
      }
    },
    //lazada登录
    async lazadaLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.lazadaLogin(this.siteCode)
        console.log('lazadaLogin', account)
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    async lazadaUserCenter(id) {
      const serives = this.gotouser(id)
      console.log(serives, 1)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.lazadaUserCenter(this.siteCode, account)
      }
    },
    //shopee登录
    async shopeeLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.shopeeLogin(this.siteCode)
        console.log('shopee', account)
        if (account) {
          this.upBuyerAccountList(account)
        }
      }
    },
    async shopeeUserCenter(id) {
      const serives = this.gotouser(id)
      if (serives) {
        let account = this.changeAccountParams(serives)
        await this.$buyerAccountService.shopeeUserCenter(this.siteCode, account)
      }
    },
    // 个人中心
    gotouser(id) {
      let userInfo = null
      if (id) {
        this.buyerAccountList.forEach((item) => {
          if (item.id === id) {
            userInfo = item
          }
        })
        return userInfo
      } else {
        this.$notify({
          title: '买手号个人中心',
          type: 'error',
          message: `请选择账户`,
        })
      }
    },
    //上传买手号
    async batchUpBuyer() {
      for (let i = 0; i < this.buyerAccountList; i++) {
        let account = this.buyerAccountList[i]
        this.upBuyerAccountList(account)
      }
    },
    // 更新买手号列表(自动上传)服务端
    async upBuyerAccountList(account) {
      let params = {
        name: account.name,
        password: '',
        type: account.type,
        // site: account.country || '', 
        site: this.siteCode || '', 
        loginInfo: account.login_info,
        ua: account.ua,
        cachePath: account.cache_path,
        proxyId: this.proxyType,
      }
      const { data } = await this.$api.upLoadBuyAccount(params)
      if (data.code === 200) {
        this.buyerAccount()
        //  this.syncLogistics(account)
      } else {
        this.$notify({
          title: '买手号信息',
          type: 'warning',
          message: `账户上传失败,请联系客服人员!`,
        })
        //  this.$message.warning('账户上传失败,请联系客服人员!')
      }
    },
    // 更新买手号列表(获取买手号列表)
    async buyerAccount(i) {
      const { data } = await this.$api.getBuyerList()
      let sortData = null
      if (data.code === 200) {
        // 根据时间排序
        sortData = data.data.sort(function (a, b) {
          var x = a['updated_at'].replace(/:/g, '').replace(/-/g, '').replace(' ', '')
          var y = b['updated_at'].replace(/:/g, '').replace(/-/g, '').replace(' ', '')
          return x < y ? 1 : x > y ? -1 : 0
        })
        this.buyerAccountList = sortData || data.data
        this.$parent['buyerAccountList'] = sortData || data.data // await this.$buyerAccountService.getLocalAccounts()
        this.defaultSelect()
        if (i) {
          // this.$message.success('账户信息已更新')
          this.$notify({
            title: '买手号信息',
            type: 'success',
            message: `账户信息已更新`,
          })
        }
      }
    },
    // 默认选中第一个账户信息
    defaultSelect() {
      this.selectAccount.accountpdd = this.$parent[this.upData].filter((item) => {
        return item.type === 1
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 1
          })[0].id
        : ''
      this.selectAccount.accounttaobao = this.$parent[this.upData].filter((item) => {
        return item.type === 2
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 2
          })[0].id
        : ''
      this.selectAccount.account1688 = this.$parent[this.upData].filter((item) => {
        return item.type === 8
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 8
          })[0].id
        : ''
      this.selectAccount.accountjx = this.$parent[this.upData].filter((item) => {
        return item.type === 10
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 10
          })[0].id
        : ''
      this.selectAccount.accountlazada = this.$parent[this.upData].filter((item) => {
        return item.type === 9
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 9
          })[0].id
        : ''
      this.selectAccount.accountshopee = this.$parent[this.upData].filter((item) => {
        return item.type === 11
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.type === 11
          })[0].id
        : ''
        this.selectAccount.accountCrossBorder = this.buyerAccountListGlobal[0]?this.buyerAccountListGlobal[0].id : ''
      this.accountChange()
    },
    // 删除买手号
    async removebuyerAccount() {
      const Account = {
        type: this.activeAccount.type,
        name: this.activeAccount.name,
        site: this.activeAccount.site,
      }
      const { data } = await this.$api.deleteBuyAccount(Account)
      if (data.code === 200) {
        this.$notify({
          title: '买手号管理',
          type: 'success',
          message: `买手号删除成功`,
        })
        this.selectAccount.accountpdd = ''
        this.selectAccount.accountjx = ''
        this.selectAccount.account1688 = ''
        this.selectAccount.accountlazada = ''
        this.selectAccount.accountshopee = ''
        this.selectAccount.accounttaobao = ''
        this.buyerAccount()
      }
    },
    // uincode转义
    decode(s) {
      return unescape(s.replace(/\\(u[0-9a-fA-F]{4})/gm, '%$1'))
    },
    // 拼多多优惠券
    async getPddCoupon() {
      const pddAccountList = []
      this.buyerAccountList.forEach((item) => {
        if (item.type === 1) {
          pddAccountList.push(item)
        }
      })
      if (!pddAccountList.length) {
        return this.$notify({
          title: '拼多多优惠券',
          type: 'warning',
          message: `暂未查询到拼多多账号优惠价`,
        })
      }
      const account = await this.$buyerAccountService.pddCouponWindow(pddAccountList)
      console.log(account)
    },
    accountChange() {
      this.$parent.accountpdd = this.selectAccount.accountpdd
      this.$parent.accounttaobao = this.selectAccount.accounttaobao
      this.$parent.account1688 = this.selectAccount.account1688
      this.$parent.accountjx = this.selectAccount.accountjx
      this.$parent.accountlazada = this.selectAccount.accountlazada
      this.$parent.accountshopee = this.selectAccount.accountshopee
      this.$parent.accountCrossBorder = this.selectAccount.accountCrossBorder
      return {
        accountpdd: this.selectAccount.accountpdd,
        accounttaobao: this.selectAccount.accounttaobao,
        account1688: this.selectAccount.account1688,
        accountjx: this.selectAccount.accountjx,
        accountlazada: this.selectAccount.accountlazada,
        accountshopee: this.selectAccount.accountshopee,
        accountCrossBorder: this.selectAccount.accountCrossBorder,
      }
    },
  },
}
</script>

<style lang="less" scoped>
.account-plugin {
  //   margin: 0 16px;
  position: relative;
  .box {
    display: flex;
  }
  .left {
    width: 120px;
    display: flex;
    flex-direction: column;
    .btn-item {
      display: flex;
      padding-bottom: 8px;
      button {
        width: 100%;
        padding: 7px 10px;
      }
    }
  }
  .right {
    width: 125px;
    display: flex;
    flex-direction: column;
    .btn-item {
      padding-bottom: 8px;
      button {
        width: 100%;
        padding: 7px 10px;
      }
    }
  }
  .account-item {
    padding-bottom: 8px;
    display: flex;
    align-items: center;
    > span {
      display: inline-block;
      width: 120px;
      text-align: right;
    }
    /deep/ .el-select {
      width: 140px;
      margin-right: 20px;
      font-size: 12px;
    }
  }
  /deep/.el-dialog__body {
    padding: 10px 20px;
  }
}
.ridioBox {
  padding: 0 30px;
  .el-radio {
    margin: 20px 10px 0;
  }
}
.btn-header {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-bottom: 30px;
}
</style>
