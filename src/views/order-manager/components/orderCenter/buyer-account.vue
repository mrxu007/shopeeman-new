<!--
 * @Author: your name
 * @Date: 2021-11-09 10:14:02
 * @LastEditTime: 2021-11-10 17:32:03
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
        </div>
      </div>
      <div class="center">
        <div v-for="(item, index) in operation.center" :key="index" class="account-item">
          <span>{{ item.title }}</span>
          <el-select v-model="selectAccount[platformValue[item.AccountType]]" :size="item.size || 'mini'" clearable placeholder="请选择" @change="accountChange()">
            <el-option v-for="(items, index) in publicAccount(item.AccountType)" :key="index" :label="items.UserName" :value="items.UserName">
              <span>{{ items.UserName }}</span>
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
export default {
  name: 'BuyerAccount',
  props: {
    buyerAccountList: {
      type: Array,
      default: () => [],
    },
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
            { title: '拼多多账号', platform: 1, centerTitle: '拼多多个人中心', AccountType: 1 },
            { title: '淘宝账号', platform: 0, centerTitle: '淘宝个人中心', AccountType: 2 },
            { title: '1688账号', platform: 5, centerTitle: '1688个人中心', AccountType: 8 },
            { title: '京喜账号', platform: 10, centerTitle: '京喜个人中心', AccountType: 10 },
            { title: 'lazada账号', platform: 7, centerTitle: 'lazada个人中心', AccountType: 9 },
            { title: 'shopee账号', platform: 8, centerTitle: 'shopee个人中心', AccountType: 11 },
            { title: '天猫淘宝海外账号', platform: 8, centerTitle: '刷新天猫淘宝海外平台账号', AccountType: 888 },
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
      },
      platformValue: {
        1: 'accountpdd',
        3: 'accounttaobao',
        8: 'account1688',
        10: 'accountjx',
        9: 'accountlazada',
        11: 'accountshopee',
      },
      activeAccount: null,
      loginAccount: false,
      otherOperation: false,
      deleteAccount: false,
      proxyType: '',
      proxyList: [],
    }
  },
  computed: {
    pddAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 1)
    },
    tbAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 2)
    },
    albbAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 8)
    },
    jxAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 10)
    },
    lazadaAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 9)
    },
    shopeeAccount() {
      return this.buyerAccountList.filter((item) => item.AccountType == 11)
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
  mounted() {
    this.defaultSelect()
  },
  methods: {
    //获取代理主体
    async getProxy() {
      let params = {}
      const userInfo = await this.$appConfig.getUserInfo()
      params.uid = userInfo.muid
      const res = await this.$YipService.GetIpList(JSON.stringify(params))
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
        case 1:
          this.loginAccount = true
          this.getProxy()
          return
        case 2:
          this.getPddCoupon()
          return
        case 3:
          this.buyerAccount(true)
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
          console.log(this.pddAccount,"pddAccount")
          return this.pddAccount
        case 2:
          console.log(this.tbAccount,"tbAccount")
          return this.tbAccount
        case 8:
          return this.albbAccount
        case 9:
          return this.lazadaAccount
        case 10:
          return this.jxAccount
        case 11:
          return this.shopeeAccount
        default:
          return []
      }
    },
    // 公共个人中心
    publicCenter(id, platform) {
      switch (platform) {
        case 1:
          this.pddUserCenterHandler(id)
          break
        case 2:
          this.taobaoUserCenter(id)
          break
        case 4:
          this.jingDongUserCenter(id)
          break
        case 8:
          this.AlibabaUserCenter(id)
          break
        case 10:
          this.jingxiUserCenter(id)
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
      }
      const key = params.AccountType + params.UserName
      console.log(account, params, key, 'adddddddddd')
      await this.$appConfig.UpdateCacheInfo('buyerInfo', key, params)
    },
    // 拼多多买手号登录
    async pddLoginHandler() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.pddLogin()
        console.log(account, 'pddLoginHandler')
        if (account) {
          this.upBuyerAccountMedia(account, 1)
          this.upBuyerAccountList(account)
        }
      }
    },
    async pddUserCenterHandler(id) {
      const serives = this.gotouser(id)
      if (serives) {
        console.log(serives, 11)
        serives.loginCookies = this.getBuyerLoginCookies(serives.login_info)
        var accounts = await this.$buyerAccountService.pddUserCenter(serives, url)
        console.log(accounts)
      }
    },
    // 淘宝登录
    async taobaoLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.taobaoLogin()
        if (account) {
          this.upBuyerAccountList(account)
          this.upBuyerAccountMedia(account, 0)
        }
      }
    },
    async taobaoUserCenter(id) {
      const serives = this.gotouser(id)
      console.log(serives, 1)
      if (serives) {
        console.log(serives, 11)
        var accounts = await this.$buyerAccountService.taobaoUserCenter(serives, url)
        console.log(accounts)
      }
    },
    // 京喜登录
    async jingxiLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.jingxiLogin()
        if (account) {
          this.upBuyerAccountList(account)
          this.upBuyerAccountMedia(account, 3)
        }
      }
    },
    // 京喜个人中心
    async jingxiUserCenter(id) {
      const serives = this.gotouser(id)
      if (serives) {
        var accounts = await this.$buyerAccountService.jingxiUserCenter(serives, url)
      }
    },
    // 1688登录
    async AlibabaLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.alibabaLogin()
        if (account) {
          this.upBuyerAccountList(account)
          this.upBuyerAccountMedia(account, 5)
        }
      }
    },
    async AlibabaUserCenter(id) {
      const serives = this.gotouser(id)
      console.log(serives, 1)
      if (serives) {
        console.log(serives, 11)
        var accounts = await this.$buyerAccountService.AlibabaUserCenter(serives, url)
        console.log(accounts)
      }
    },
    //lazada登录
    async lazadaLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.lazadaLogin(this.siteCode)
        if (account) {
          this.upBuyerAccountList(account)
          this.upBuyerAccountMedia(account, 7)
        }
      }
    },
    async lazadaUserCenter(id) {
      const serives = this.gotouser(id)
      console.log(serives, 1)
      if (serives) {
        console.log(serives, 11)
        var accounts = await this.$buyerAccountService.lazadaUserCenter(serives, url)
        console.log(accounts)
      }
    },
    //shopee登录
    async shopeeLogin() {
      if (this.$buyerAccountService) {
        const account = await this.$buyerAccountService.shopeeLogin(this.siteCode)
        if (account) {
          this.upBuyerAccountList(account)
          this.upBuyerAccountMedia(account, 8)
        }
      }
    },
    async shopeeUserCenter(id) {
      const serives = this.gotouser(id)
      console.log(serives, 1)
      if (serives) {
        console.log(serives, 11)
        var accounts = await this.$buyerAccountService.shopeeUserCenter(this.siteCode)
        console.log(accounts)
      }
    },
    // 个人中心
    gotouser(id) {
      let userInfo = null
      console.log(id, 1234)
      if (id) {
        this.buyerAccountList.forEach((item) => {
          if (item.id === id) {
            userInfo = item
          }
        })
        return userInfo
      } else {
        // this.$message.error('请选择账户')
        this.$notify({
          title: '买手号个人中心',
          type: 'error',
          message: `请选择账户`,
        })
      }
    },
    // 更新买手号列表(自动上传)
    async upBuyerAccountList(account) {
      let params = {
        name: account.type,
        password: account.name,
        type: account.login_info,
        site: account.cache_path,
        login_info: account.oldName,
      }
      // const { data } = await this.$api.upBuyerAccount(Account)
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
      // const { data } = await this.$api.buyerAccount()
      if (this.operation?.url?.getAccount?.click) {
        return this.$parent[this.operation.url.getAccount.click](i)
      }
      const { data } = await this.$apiRequest.get(this.operation?.url?.getAccount?.path || '/api/buyerAccount')
      let sortData = null
      if (data.code === 200) {
        if (this.operation?.url?.getAccount?.sort) {
          // 根据时间排序
          const sortParams = this.operation?.url?.getAccount?.sort || 'updated_at'
          sortData = data.data.sort(function (a, b) {
            var x = a[sortParams].replace(/:/g, '').replace(/-/g, '').replace(' ', '')
            var y = b[sortParams].replace(/:/g, '').replace(/-/g, '').replace(' ', '')
            return x < y ? 1 : x > y ? -1 : 0
          })
        }
        this.$parent[this.upData] = sortData || data.data // await this.$buyerAccountService.getLocalAccounts()
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
      console.log(this.$parent[this.upData])
      this.selectAccount.accountpdd = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 1
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 1
          })[0].UserName
        : ''
        console.log(this.selectAccount.accountpdd,"accountpdd")
      this.selectAccount.accounttaobao = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 2
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 2
          })[0].UserName
        : ''
         console.log(this.selectAccount.accounttaobao,"accounttaobao")
      this.selectAccount.account1688 = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 8
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 8
          })[0].UserName
        : ''
      this.selectAccount.accountjx = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 10
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 10
          })[0].UserName
        : ''
      this.selectAccount.accountlazada = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 9
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 9
          })[0].UserName
        : ''
      this.selectAccount.accountshopee = this.$parent[this.upData].filter((item) => {
        return item.AccountType === 11
      })[0]
        ? this.$parent[this.upData].filter((item) => {
            return item.AccountType === 11
          })[0].UserName
        : ''
    },
    // 删除买手号
    async removebuyerAccount() {
      const Account = {
        type: this.activeAccount.type,
        name: this.activeAccount.name,
      }
      if (this.operation?.url?.removeAccount?.click) {
        return this.$parent[this.operation?.url.removeAccount.click](Account)
      }
      // const { data } = await this.$api.removeBuyerAccount(Account)
      const { data } = await this.$apiRequest.post(this.operation?.url?.removeAccount?.path || '/api/buyerAccount/destroy', Account)
      if (data.code === 200) {
        //  this.$message.success('买手号删除成功')
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
      return {
        accountpdd: this.selectAccount.accountpdd,
        accounttaobao: this.selectAccount.accounttaobao,
        account1688: this.selectAccount.account1688,
        accountjx: this.selectAccount.accountjx,
        accountlazada: this.selectAccount.accountlazada,
        accountshopee: this.selectAccount.accountshopee,
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
    width: 94px;
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
