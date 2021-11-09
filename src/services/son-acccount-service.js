export default class SonAccountService {
  nativeService() {
    return window['OpenServiceBridgeService']
  }

  // 子账号获取
  async childUserList(params) {
    let res = await this.nativeService().post('method.childuser.list', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.childuser.list', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }

  // 子账号新增
  async saveChildUsers(params) {
    let res = await this.nativeService().post('method.childuser.add', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.childuser.add', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 子账号删除
  async deleteChildUser(params) {
    let res = await this.nativeService().post('method.childuser.delete', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.childuser.delete', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 子账号编辑
  async editChildUserDatas(params) {
    let res = await this.nativeService().post('method.childuser.edit', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.childuser.edit', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 子账号权限
  async childuserAuth(params) {
    let res = await this.nativeService().post('method.childuser.auth', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.childuser.auth', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }

  // 买手号获取
  async getBuyerAccountList(params = {}) {
    let res = await this.nativeService().post('method.buyer.list', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.buyer.list', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data).list }
    }
    return { code: res.status, data: res.statusText }
  }

  // 买手号删除
  async removeBuyerAccount(params = {}) {
    let res = await this.nativeService().post('method.buyer.del', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.buyer.del', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 买手号上传
  async upBuyerAccount(params = {}) {
    let res = await this.nativeService().post('method.buyer.add', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.buyer.add', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 买手号隔离
  async setBuyerShareConfig(params = {}) {
    let res = await this.nativeService().post('method.buyer.setShare', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.buyer.setShare', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(res.data) }
    }
    return { code: res.status, data: res.statusText }
  }
  // 用户配置
  async getUserConfig(params = {}) {
    let res = await this.nativeService().post('method.user.getConfig', JSON.stringify(params))
    res = JSON.parse(res)
    console.log('method.user.getConfig', res)
    if (res.status === 200) {
      return { code: 200, data: JSON.parse(JSON.parse(res.data)) }
    }
    return { code: res.status, data: res.statusText }
  }
}

// api_name        api_code
// 测试1123        method.get.data
// 发送短信        method.send.sms
// 用户登录        method.user.login
// 子账号获取        method.childuser.list
// 子账号新增        method.childuser.add
// 子账号编辑        method.childuser.edit
// 子账号删除        method.childuser.delete
// 用户信息        method.user.info
// 用户钱包        method.user.wallet
// 子账号信息        method.childuser.info
// 软件充值        method.user.charge
// 获取会员类型        method.member.list
// 阿里文字翻译收费        method.translate.text
// 阿里图片翻译收费        method.translate.image
// 购买ip消费        method.pay.buyid
// 获取当天翻译费用        method.translate.amount
// 翻译明细        method.translate.detail
// 钱包流水        method.amount.detail
// 用户获取        method.user.get
// 用户列表        method.user.list
// 星卓越用户        method.user.xzy
// 官网会员类型        method.web.member
// 子账号权限        method.childuser.auth
// 获取交易类型列表        method.amount.transType
// 多多进宝        method.commission.ddjb
// 淘宝客蜜源        method.commission.tbk
// 退出登录        method.user.loginOut
// 修改星卓越        method.user.editxzy
// IP区域列表        method.ip.eareList
// 获取IP价钱        method.ip.getprice
// 解绑店铺IP        method.ip.unbindmallip
// 更新IP信息        method.ip.updateip
// 添加自有IP        method.ip.addselfip
// 系统IP续费        method.ip.renewIP
// 分配IP        method.ip.distributionip
// 商户绑定IP        method.ip.businessbindip
// 商户解绑IP        method.ip.businessunbindip
// 店铺IP信息        method.ip.mallipinfo
// 店铺IP信息列表        method.ip.mallbatchipinfo
// IP库存        method.ip.getstock
// 购买IP        method.ip.buyip
// 更新IP店铺绑定        method.ip.updatemallip
// 更新软件到期时间        method.user.updateExpire
// 更新config        method.user.updateConfig
