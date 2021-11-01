export default class YipService {
  nativeService() {
    return window['CommodityBridgeService']
  }
  // 删除
  // targetId
  delInfor(targetId) {
    return this.nativeService().callCloudIpFunction('DeleteSelfIP', targetId)
  }

  /**
       *  ip信息解密
       * @name : GetIPinfor
       * @param  {ipinfo} //ipinfo信息
       */
  async GetIPinfor(ipinfo) {
    return await this.nativeService().callSafeUtil('AesDecrypt', ipinfo, '')
  }
  /**
       *  获取IP区域列表
       * @name : GetCloudIPAreaList
       * @param  {*}
       */
  async GetCloudIPAreaList() {
    return await this.nativeService().callCloudIpFunction('GetCloudIPAreaList')
  }
  /**
       * 购买IP
       * @name : BuyCloudIP
       * @param  {int} lineId 线路ID
       * @param  {string} uid 主账号ID
       * @param  {string} ipAlias P别名（主体名称）（默认IP）
       * @param  {string} uuid 子账号ID
       * @param  {int} num 购买数量 默认1
       * @param  {int} period 购买时长 默认1个月；1、表示1个月;2、表示一季
       */
  async BuyCloudIP(lineId, uid, ipAlias, uuid, num, period, isPresale) {
    return await this.nativeService().callCloudIpFunction('BuyCloudIP', lineId, uid, ipAlias, uuid, num, period, isPresale)
  }
  /**
       * 添加自有IP
       * @name : AddSelfIP
       * @param  {*}
       */
  async AddSelfIP(param) {
    return await this.nativeService().callCloudIpFunction('AddSelfIP', param)
  }
  /**
       * IP续费
       * @name : RenewIP
       * @param  {int} targetId IP绑定ID
       * @param  {string} uid 用户主ID
       * @param  {string} uuid 用户子ID
       * @param  {int} period 购买时长 1一个月；2一个季度 默认1
       */
  async RenewIP(targetId, uid, uuid, period) {
    return await this.nativeService().callCloudIpFunction('RenewIP', targetId, uid, uuid, period)
  }
  // IP过期检测
  async GetExpireIps(uid, uuid, futureTime) {
    return await this.nativeService().callCloudIpFunction('GetExpireIps', uid, uuid, futureTime)
  }
  /**
       * 绑定店铺
       * @name : BindingMall
       * @param  {string} uid
       * @param  {int} targetId IP绑定ID
       * @param  {string} mallIds 店铺ID
       */
  async BindingMall(uid, targetId, mallIds) {
    return await this.nativeService().callCloudIpFunction('BindingMall', uid, targetId, mallIds)
  }
  /**
       * 绑定店铺
       * @name : NewBindingMallBySysMallId
       * @param  {string} uid
       * @param  {int} targetId IP绑定ID
       * @param  {string} mallIds 店铺ID
       */
  async NewBindingMallBySysMallId(targetId, mallIds) {
    return await this.nativeService().callCloudIpFunction('NewBindingMallBySysMallId', uid, targetId, mallIds)
  }
  /**
       * 获取IP价格
       * @name : getIPPrice
       * @param  {int} lineId 线路ID
       */
  async GetIPPrice(lineId) {
    return await this.nativeService().callCloudIpFunction('GetIPPrice', lineId)
  }
  /**
       * 删除自有IP
       * @name : deleteSelfIP
       * @param  {int} targetId  线路ID
       */
  async DeleteSelfIP(targetId) {
    return await this.nativeService().callCloudIpFunction('DeleteSelfIP', targetId)
  }
  /**
       * 更新自有主体IP
       * @name : UpdateSelfIP
       * @param  {*}
       */
  async UpdateSelfIP(param) {
    return await this.nativeService().callCloudIpFunction('UpdateSelfIP', param)
  }
  /**
       * 获取IP列表
       * @name : GetIpList
       * @param  { object }
       */
  async GetIpList(param) {
    return await this.nativeService().callCloudIpFunction('GetIpList', param)
  }
  /**
       * 绑定主体IP
       * @name : BindingIP
       * @param  {int} targetId  线路ID
       */
  async BindingIP(targetId) {
    return await this.nativeService().callCloudIpFunction('BindingIP', targetId)
  }
  /**
       * 解绑主体IP
       * @name : UnBindingIP
       * @param  {int} targetId  线路ID
       */
  async UnBindingIP(targetId) {
    return await this.nativeService().callCloudIpFunction('UnBindingIP', targetId)
  }
  /**
       * 商户IP地址绑定店铺
       * @name : BindingDistributionipBySysMallId
       * @param  {int} targetId  线路ID
       */
  async BindingDistributionipBySysMallId(uid, targetId, mallIds) {
    return await this.nativeService().callCloudIpFunction('BindingDistributionipBySysMallId', uid, targetId, mallIds)
  }
  /**
       * 店铺IP简要列表
       * @name : GetIpSimpleInfo
       * @param  {int} uid
       * @param  {string} mapField  根据某个字段值映射返回格式
       */
  async GetIpSimpleInfo(uid, mapField) {
    return await this.nativeService().callCloudIpFunction('GetIpSimpleInfo', uid, mapField)
  }
  /**
       * 解绑店铺IP
       * @name : UnBindingIP
       * @param  {int} uid
       * @param  {int} targetId
       * @param  {string} mallIds  根据某个字段值映射返回格式
       */
  async UnBindingIP(uid, targetId, mallIds) {
    return await this.nativeService().callCloudIpFunction('UnBindingIP', uid, targetId, mallIds)
  }
  /**
       * 根据店铺ID批量获取店铺IP信息
       * @name : Mallbatchipinfo
       * @param  {string} mallIds
       */
  async Mallbatchipinfo(mallIds) {
    return await this.nativeService().callCloudIpFunction('Mallbatchipinfo', mallIds)
  }
}

