import shotOrderPlatform from './shot-order-platform'
import applicationConfig from '../application-config'
import BaseUtilService from '../BaseUtilService'
import {
  dateFormat
} from '../../util/util'
import jxRequest from '../../network/jx-request'
export default class {
  orders = undefined;
  buyerAccounts = undefined;
  Ua = ''
  nativeService = null;
  IsPddBatchOrder = false; // 是否开启拼多多聚合拍单
  _that = null
  $configService = new applicationConfig()
  $api = jxRequest
  writeLog = undefined
  rateList = {}
  IsBatchOrder = false
  crossBorderAccessToken = ''
  goodBuyUrlList = [] //采购地址
  constructor(orders, buyerAccounts, that, IsPddBatchOrder) {
    this.orders = orders
    this.buyerAccounts = buyerAccounts
    this._that = that
    this.nativeService = window['ShotOrderBridgeService']
    this.IsPddBatchOrder = IsPddBatchOrder
  }
 
  /**
   * 开始拍单
   */
  async start(writeLog) {
    let configInfo = await this.$configService.getUserConfig()
    configInfo = configInfo && JSON.parse(configInfo)
    console.log(configInfo, "configInfo")
    let nickInfo = await this.$configService.getUserInfo()
    console.log(nickInfo, "nickInfo")
    this.writeLog = writeLog
    console.log(this.orders, this.buyerAccounts, 'short order info')
    const buyerMap = new Map()
    const buyerList = []

    this.buyerAccounts.forEach(element => {
      const buyerItem = this.conver2BuyerAccount(element)
      buyerList.push(buyerItem)
      buyerMap.set(buyerItem.shotOrderPlatform, buyerItem)
    })
    //淘宝天猫海外平台cook
    this.crossBorderAccessToken = buyerMap.get(shotOrderPlatform.CrossBorder) ? buyerMap.get(shotOrderPlatform.CrossBorder).Cookiestr : '1'
    //支付信息
    const payAccount = {
      UserName: '',
      PayPassword: '',
      Password: ""
    }
    payAccount.UserName = configInfo?configInfo.pay_account:''
    payAccount.PayPassword = configInfo?configInfo.pay_pass:''
    //获取采购地址
    await this.buildPurchaseList(this.orders)
    const res = await this.getShortOrders(buyerMap, payAccount,configInfo,nickInfo)
    let orders = []
    if (res.code === 200) {
      orders = res.data
    } else {
      this.writeLog(`拍单中止${res.data}-${res.code}`, false)
      return false
    }
    const shortGlobalInfo = {
      GatewayEndPoint: '129.204.71.240', //网关ip
      AutoSelectSku: true, //网关ip  非固定传参的字段(暂时默认)
      AutoPay: true, //网关ip  非固定传参的字段(暂时默认)
      AutoNextOrder: true, //网关ip  非固定传参的字段(暂时默认)
      ShowSignOrderBtn: false, //基础信息设置
      ShowAutoOrderBtn: false,
      ShowSearchByPddImg: false,
      LianZhongAccount: '',
      LianZhongPassword: '',
      ChaojiyingAccount: '',
      ChaojiyingPassword: '',
      HlbAppKey: '', //基础信息设置
      HlbAppSecret: '', //基础信息设置
      ShowRemark: false,
      ParentId: '',
      KidId: '',
      KidName: '',
      ShowTurnToHuoLaoBan: false,
      PlatFormType: '',
      StpBackGround: '#1f74fa',
      BtnGround: '#f4a000',
      H5x5sec: '', //非固定传参的字段(暂时默认)
      TaobaoCookieForImg: buyerMap.get(shotOrderPlatform.TaoBao)&&buyerMap.get(shotOrderPlatform.TaoBao).Cookiestr || '',
      TaobaoRemark:  configInfo.taobao_leave_content,//'请不要放价格单,不要放好评卡', //非固定传参的字段(暂时默认)
      AlibabaRemark: '', //非固定传参的字段(暂时默认)
      ZhiFuBaoAwid: '',
      ProfitRate: 100,
      SkipPreSale: false,
      SkipColleague: false,
      SoftDomain: '',
      Muid: '',

      TaoBaoCache: this.getCache(buyerMap, shotOrderPlatform.TaoBao),
      PinduoduoCache: this.getCache(buyerMap, shotOrderPlatform.PinDuoduo),
      ListShotOrdes: orders,
      UseLifeSpanHandler: false,
      Currency: '￥',
      ExchangeRate: 1,
      NeedDeleteAllAddr: true,
      UseTraiffPrice: false,
      ForceShowHlb: false,
      Use1688GroupShot: false,
      IsShowGoodsTypeStp: true, //基础信息设置
      IsShowExchangeRatePrice: true, //基础信息设置
      IsSendRemark: false,
      IsNeed1688UnPaidInfo: false,
      ClickHiddenPop: false,
      ShowKidPayAmount: false,
      IsMandatoryOrder: true, //基础信息设置
      IsOpenKidAutoOrder: false,
      IsUseCloudCoding: true, //基础信息设置
      IsShowKidRate: false,
      IsOpenPddShortCut: false, //非固定传参的字段(暂时默认)
      IsShowMaxWindow: false,
      IsUseAbsolutePath: false,
      IsOpenCoding: true, //基础信息设置

      LocalProxy: '',
      WebProxy: '',
      PddBuyAccounts: this.buyerAccounts,
      IsRandomChangePddAccount: false,
      IsCloudShot: false,
      IsForceCloudAccount: false,
      IsOpenQuickCloudShot: false,
      IsOpenQuickCloudShotAndCloudShot: false,
      IsOpenAutoShot: false,
      IsWechatPay: false,
      ShowImgSearchPdd: true,
      IsRemarkPddOrder: false,
      IsPddBatchOrder: false, //非固定传参的字段(暂时默认)
      TransTypeList: {
        '陆运': '1',
        '空运': '2',
        '海运': '3'
      },
      GoodsTypeList: {
        '普货': '1',
        '敏感货': '2'
      },
    }
    // this.orders.forEach(item => {
    //   const selectShotOrderPlatform = item.purchases.purchase_platform_id
    //   this.setCache(selectShotOrderPlatform, shortGlobalInfo, buyerMap)
    // })
    console.log(shortGlobalInfo, '====All')
    // 最后检测买手号是否传了
    for (let index = 0; index < shortGlobalInfo.ListShotOrdes.length; index++) {
      const item = shortGlobalInfo.ListShotOrdes[index]
      if (!item.buyerAccount) {
        return this.writeLog(`暂无买手号信息`)
      }
    }
    //Start( shortConfigInfoJson ，cefLanguage,crossBorderAccessToken)
    //cefLanguage：选择的网页翻译的语种
    //crossBorderAccessToken：天猫淘宝海外cookie
    //shortConfigInfoJson : shortGlobalInfo
    console.log(JSON.stringify(shortGlobalInfo), configInfo.language_set, this.crossBorderAccessToken)
    this.nativeService.start(shortGlobalInfo,JSON.stringify(shortGlobalInfo), configInfo.language_set, this.crossBorderAccessToken)
  }
  // 单个拍单设置相应的缓存 多个拍单保留全部
  setCache(selectShotOrderPlatform, shortGlobalInfo, buyerMap) {
    switch (selectShotOrderPlatform) {
      case 1:
        shortGlobalInfo.PinduoduoCache = this.getCache(buyerMap, shotOrderPlatform.PinDuoduo)
        break
      case 2 || 3:
        shortGlobalInfo.TaoBaoCache = this.getCache(buyerMap, shotOrderPlatform.TaoBao)
        break
        // case 5 || 8:
        //   shortGlobalInfo.AlibabaCache = this.getCache(buyerMap, shotOrderPlatform.Alibaba)
        //   break
        // case 10:
        //   shortGlobalInfo.JingXiCache = this.getCache(buyerMap, shotOrderPlatform.JingXi)
    }
    return shortGlobalInfo
  }
  getCache(buyerMap, key) {
    if (buyerMap.has(key)) {
      return buyerMap.get(key).UserNameCache
    }
    return null
  }
  async getShortOrders(buyerMap, payAccount,configInfo,nickInfo) {
    const data = await this.$api.exchangeRateList()
    if (data.data.code === 200) {
      this.rateList = data.data.data
    }
    console.log(this.rateList)
    
    const shorOrders = []
    for (let index = 0; index < this.orders.length; index++) {
      const itemOrder = this.orders[index]
      let res = await this.$configService.getWarehouseInfo(itemOrder.mall_info.platform_mall_id)
      let warehouseList = res && JSON.parse(res) || []
      //1.判断店铺是否有绑定仓库（未绑定提示：$"店铺【{mallname}】未匹配到收货地址，请前往【仓库收货地址设置】进行设置"  并返回不在继续拍单）
      if (!warehouseList.length) {
        return {
          code: 50001,
          data: `店铺【${itemOrder.mall_info.platform_mall_name}】未匹配到收货地址，请前往【仓库收货地址设置】进行设置`
        }
      }
      //1.上家平台为国内平台（拼多多、京喜、淘宝、天猫、1688、货老板、天猫淘宝海外平台）使用国内仓（仓库信息里的type为0则为国内仓）
      //2.上家平台为国外平台（Lazada、Shopee）使用国外仓
      let warehouseInfo = null
      console.log(warehouseList, "warehouseInfo")
      if ([1, 10, 2, 3, 8, 13, 15].indexOf(Number(itemOrder.goods_info.ori_platform_id)) > -1) {
        warehouseInfo = warehouseList.find(item => {
          return item.type == 0
        })
      } else if ([9, 11].indexOf(Number(itemOrder.goods_info.ori_platform_id)) > -1) {
        warehouseInfo = warehouseList.find(item => {
          return item.type == 3
        })
      }
      console.log(warehouseInfo)
      //仓库信息为空或者仓库信息中的仓库id为空（warehouse_id）提示   $"店铺【{orderinfo.mallname}】未绑定收货地址，请前往【仓库收货地址设置】进行设置。"
      if (!warehouseInfo) {
        return {
          code: 50002,
          data: `店铺【${itemOrder.mall_info.platform_mall_name}】未匹配到收货地址，请前往【仓库收货地址设置】进行设置`
        }
      } else {
        if (!warehouseInfo.warehouse_id) {
          return {
            code: 50002,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】未匹配到收货地址，请前往【仓库收货地址设置】进行设置`
          }
        }
        if (!warehouseInfo.receiving_name) {
          return {
            code: 50003,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】绑定的仓库未设置收件人信息，请前往【仓库收货地址设置】进行设置。`
          }
        }
        if (!warehouseInfo.receiving_tel) {
          return {
            code: 50004,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】绑定的仓库未设置收件人联系电话，请前往【仓库收货地址设置】进行设置。`
          }
        }
        if (warehouseInfo.warehouse_status === '2') {
          return {
            code: 50005,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】绑定的仓库未设置收件人联系电话，请前往【仓库收货地址设置】进行设置。`
          }
        }
        //如果为系统仓库（isUser  0为系统，1为自有）并且仓库绑定的国家（country）和订单信息中的站点信息不匹配  
        if (warehouseInfo.isUser === 0 && warehouseInfo.country !== itemOrder.country) {
          return {
            code: 50006,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】绑定的仓库地址${warehouseInfo.warehouse_name}站点不一致，请前往【仓库收货地址设置】进行重新选择仓库。`
          }
        }
        // 如果为系统类型（type）不为0，但是上家平台为国内平台
        if (warehouseInfo.type !== 0 && [1, 10, 2, 3, 8, 13, 15].indexOf(itemOrder.goods_info.ori_platform_id) > -1) {
          return {
            code: 50007,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】绑定的仓库地址${warehouseInfo.warehouse_name}为海外仓，无法对拼多多/淘宝/1688订单进行拍单操作。`
          }
        }
        //  如果为系统类型（type）不为3，但是上家平台不是国外平台 
        if (warehouseInfo.type !== 3 && [9, 11].indexOf(itemOrder.goods_info.ori_platform_id) > -1) {
          return {
            code: 50008,
            data: `店铺【${itemOrder.mall_info.platform_mall_name}】为国内仓，无法对Lazada/Shopee订单进行拍单操作。`
          }
        }
      }

      //处理拍单姓名、地址、手机号
      let buyerInfoRes = await this.dealWithBuyerBaseInfo(warehouseInfo, itemOrder, configInfo, nickInfo)
      let buyerInfo = {}
      console.log(buyerInfoRes,"buyerInfoRes")
      if (buyerInfoRes.code === 200) {
        buyerInfo = buyerInfoRes.data
      } else {
        return {
          code: 50009,
          data: `${buyerInfoRes.data}`
        }
      }

      //receiveUserInfo：收货信息
      let receiveUserInfo = {
        UserName: buyerInfo["buyerName"],
        UserPhone: buyerInfo["buyerPhone"],
        Provice: buyerInfo["provinceText"],
        City: buyerInfo["cityText"],
        Town: buyerInfo["distinctText"],
        Street: buyerInfo['streetText'],
        PostCode: warehouseInfo.post_code ? warehouseInfo.post_code : '000000',
        Address: buyerInfo["buyerAddress"],
        Remark: itemOrder.node, //itemOrderinfo.buyer_memo
        ProviceId: buyerInfo["provId"],
        CityId: buyerInfo["cityId"],
        TownId: buyerInfo["distId"],
        StreetId: buyerInfo["streetId"],
        Country: warehouseInfo.country ? warehouseInfo.country : '',
      }
      //处理goodsInfo
      let goodsInfo = {
        Purchaselist: this.dealWithPurchaseList(itemOrder,nickInfo), //组装商品采购链接列表
        UrlAddress: itemOrder.goods_info.ori_url,
        GoodsTitle: itemOrder.goods_info.goods_name,
        OriGoodsId: itemOrder.goods_info.ori_goods_id,
        GoodsMainImage: itemOrder.goods_info.goods_img,
        SkuId: "",
        OriSkuId: itemOrder.goods_info.ori_sku_id,
        SkuName: itemOrder.goods_info.variation_sku !== '' ? itemOrder.goods_info.variation_sku : itemOrder.goods_info.variation_name,
        OriBuyNum: itemOrder.goods_info.goods_count, //后面需要根据是否聚合拍单再做调整
        Price: Math.round(Number(itemOrder.escrow_amount) * this.rateList[itemOrder.country.toUpperCase()]), //订单收入转换为人民币  
        ExchangePrice: itemOrder.escrow_amount, //汇率订单收入     
        RedirectUrl: this.GetRedirectUrl(itemOrder, nickInfo), //获取优惠调转链接
        PddReamrk: itemOrder.note, //平台备注
        LocalReamrk: itemOrder.remark, //本地备注
        OtherInfo: this._that.$filters.chineseSite(itemOrder.country), //站点中文
        CountryCode: itemOrder.country,
        CurrentExchangeRate: this.rateList[itemOrder.country.toUpperCase()],
        oritype: this.getShortOrderBuyerAccountPlatform(itemOrder.goods_info.ori_platform_id)
      };

      //处理shotOrderInfo
      let shotOrderInfo = {
        OrderNumber: itemOrder.order_sn, //shopee订单编号
        OrderPriceCnt: Math.round(itemOrder.escrowAmount * this.rateList[itemOrder.country.toUpperCase()]),
        OrdeExchangerPriceCnt: itemOrder.escrow_amount, //汇率价格
        Tag: {
          SysOrderId: itemOrder.id,
          MallId: itemOrder.mall_info.platform_mall_id,
          Site: itemOrder.country,
          ProjectType: 'shopeeman',
          CookieStr: '', //暂先为空值
          Status: itemOrder.order_status, //拍单状态
          Note: itemOrder.note
        }
      }
      let paramaAll = {
        buyerAccount: buyerMap.get(this.getShortOrderBuyerAccountPlatform(itemOrder.goods_info.ori_platform_id)),
        payAccount: payAccount,
        receiveUserInfo: receiveUserInfo,
        goodsInfo: goodsInfo,
        shotOrderInfo: shotOrderInfo
      }
      shorOrders.push(paramaAll)
      console.log("paramaAll",paramaAll)
    }
    return {
      code: 200,
      data: shorOrders
    }
  }
  //处理采购地址
  dealWithPurchaseList(itemOrder){
    let shipList = []
    let res = this.goodBuyUrlList.filter(item=>{return item.goods_id === itemOrder.goods_info.ori_goods_id})
    res&&res.purchase_detail&&res.purchase_detail.length&&res.purchase_detail.forEach(item=>{
      let par = {
        Note: item.note,//备注信息
        Url : item.purchase_url,/// 采购链接
        RedirectUrl : this.GetRedirectUrl(itemOrder, nickInfo),// 跳转链接
        PurchaseGoodsId: item.purchase_platform_id,//上家id
      }
      shipList.push(par)
    })
    return shipList
  }
  //获取采购地址
  async buildPurchaseList(orders) {
    let goodsIdLists = []
    orders.forEach((item)=>{
      goodsIdLists.push(item.goods_info.goods_id) 
    })
    let params = {
      goodsIdLists:goodsIdLists.join(',')
    }
    let res = await this.$api.getPurchaseLists(params)
    if(res.data.code===0){
      this.goodBuyUrlList = res.data.data
    }
    console.log("buildPurchaseList",this.goodBuyUrlList)
  //  return paramsList
  }
  GetRedirectUrl(itemOrder, nickInfo) {
    let redirectUrl = "";
    switch (itemOrder.goods_info.ori_platform_id) {
      case 1:
        redirectUrl = itemOrder.goods_info.ori_url;
        redirectUrl = "http://" + process.env.VUE_APP_PPXDOMAIN + "/ddk/singlePromotion?goodsId=" + itemOrder.goods_info.ori_goods_id + "&muid=" + nickInfo.muid;
        break;
      case 2:
      case 3:
        redirectUrl = itemOrder.goods_info.ori_url;
        redirectUrl = "http://" + process.env.VUE_APP_PPXDOMAIN + "/tbk/singlePromotion?goodsId=" + itemOrder.goods_info.ori_goods_id + "&muid=" + nickInfo.muid;
        break;
      default:
        redirectUrl = itemOrder.goods_info.ori_url
        break;
    }
    return redirectUrl;
  }
  //处理拍单姓名、地址、手机号
  async dealWithBuyerBaseInfo(warehouseInfo, itemOrder, configInfo, nickInfo) {
    let addressUserInfo = {}
    addressUserInfo["provId"] = warehouseInfo.province_id
    addressUserInfo["cityId"] = warehouseInfo.city_id
    addressUserInfo["distId"] = warehouseInfo.distinct_id
    addressUserInfo["streetId"] = ''
    addressUserInfo["provinceText"] = warehouseInfo.province_text
    addressUserInfo["cityText"] = warehouseInfo.city_text
    addressUserInfo["distinctText"] = warehouseInfo.distinct_text
    addressUserInfo["streetText"] = ''

    let buyerName = nickInfo.Nickname + "#" + warehouseInfo.receiving_name;
    if (warehouseInfo.isUser === 1) {
      buyerName = configInfo.IsAutoAddBuyerName ? buyerName : warehouseInfo.receiving_name;
    }
    buyerName = configInfo.IsAutoAddBuyerDate ? buyerName + "-" + dateFormat(new Date().getTime(), 'Md') : buyerName;
    buyerName = configInfo.IsAutoAddBuyerSPM ? buyerName + "-SPM" : buyerName;
    if (warehouseInfo.isUser == 0 && warehouseInfo.warehouse_id == "23") {
      buyerName = "SM-" + warehouseInfo.receiving_name;
    }
    if (warehouseInfo.isUser == 0 && warehouseInfo.warehouse_id == "8") {
      buyerName = "SPM-" + warehouseInfo.receiving_name;
    }
    if (configInfo.IsAutoAddOrderSnToBuyer) {
      buyerName += "-" + itemOrder.order_sn.Substring(itemOrder.order_sn.Length - 6);
    }
    addressUserInfo['buyerName'] = itemOrder.goods_info.ori_platform_id == 1 ? warehouseInfo.receiving_name : buyerName;
    //手机号处理
    addressUserInfo["buyerPhone"] = warehouseInfo.is_use_own_phone == 1 ? warehouseInfo.own_phone : warehouseInfo.receiving_tel;
    //地址处理：加上订单Id
    let detailAddress = warehouseInfo.detail_address.trim();
    //新加坡地址后缀的特殊性，不能携带订单Id
    if (warehouseInfo.type != 3 && warehouseInfo.country != "SG") {
      if (configInfo.IsAutoAddBuyerAddr) {
        detailAddress += "#" + itemOrder.id;
      }
      if (configInfo.IsAutoAddOrderSnToAddress) {
        detailAddress += "#" + itemOrder.order_sn.Substring(itemOrder.order_sn.Length - 6);
      }
    }
    if (itemOrder.goods_info.ori_platform_id == 1) {
      if (warehouseInfo.isUser != 1) {
        detailAddress += "#" + nickInfo.Nickname + "#" + warehouseInfo.receiving_name;
      }
      detailAddress = configInfo.IsAutoAddBuyerDate ? detailAddress + "-" + dateFormat(new Date().getTime(), 'Md') : detailAddress;
      detailAddress = configInfo.IsAutoAddBuyerSPM ? detailAddress + "-SPM" : detailAddress;
    }
    addressUserInfo["buyerAddress"] = detailAddress;
    //处理 provId/cityId/distId
    if (itemOrder.goods_info.ori_platform_id == 2 || itemOrder.goods_info.ori_platform_id == 3 || itemOrder.goods_info.ori_platform_id == 8) {
      let res = await window['BaseUtilBridgeService'].getTbAddress()
    } else if (itemOrder.goods_info.ori_platform_id == 9 && warehouseInfo.country === 'SG') {
      let res = await window['BaseUtilBridgeService'].getTbAddress(warehouseInfo.distinct_id)
      console.log(res, 'SG')
    } else if (itemOrder.goods_info.ori_platform_id == 11) {
      if (warehouseInfo.country === 'SG' && warehouseInfo.type === 3) {
        if (!warehouseInfo.shopee_map_id) {
          return {
            code: 50001,
            data: '该仓库未映射shopee地址，请重新映射'
          }
        }
      }
    }
    return {
      code: 200,
      data: addressUserInfo
    }
  }
  /**
   * 转换为拍单系统买手号模型
   */
  conver2BuyerAccount(account) {
    let params = {
      UserNameCache: account.cache_path,
      Password: '',
      shotOrderPlatform: this.getShortOrderBuyerAccountPlatform(account.type),
      LoginedCookies: account.login_info,
      UserName: account.name,
      // Cookiestr: JSON.stringify(account.login_info),
      Cookiestr: '',
      AccountType: account.type,
      Ua: account.ua,
      Country: account.site || '',
      ShopId :'',
      OrderType: ''
    }
    console.log(JSON.stringify(account.login_info),"6565")
    return params
  }
  // conver2BuyerAccount(buyerAccount) {
  //   if (!buyerAccount.loginCookies) {
  //     buyerAccount.loginCookies = this.converterCookies(buyerAccount.login_info)
  //   }
  //   let cachePath = buyerAccount.cache_path
  //   cachePath = cachePath.replace('Cache\\', '')
  //   const loginCookies = buyerAccount.loginCookies.find(n => n.Name == 'PDDAccessToken')
  //   return {
  //     UserName: buyerAccount.name,
  //     UserNameCache: cachePath,
  //     Password: '',
  //     shotOrderPlatform: this.getShortOrderBuyerAccountPlatform(buyerAccount.type),
  //     AccountType: buyerAccount.type,
  //     LoginedCookies: buyerAccount.type === 3 || buyerAccount.type === 2 || buyerAccount.type === 10 || buyerAccount.type === 8 ? buyerAccount.loginCookies : [loginCookies],
  //     Cookiestr: this.getCookieStr(buyerAccount.loginCookies, buyerAccount.type),
  //     Ua: buyerAccount.ua ? buyerAccount.ua : ''
  //   }
  // }
  converterCookies(cookies) {
    try {
      const result = JSON.parse(cookies)
      console.log("result", result)
      return result
    } catch (error) {
      console.log(error, "error")
      const items = cookies.split(';')
      if (items) {
        const resultCookie = []
        items.forEach(element => {
          const index = element.indexOf('=')
          const name = element.slice(0, index)
          const value = element.slice(index + 1)
          if (name && value) {
            resultCookie.push({
              Name: name,
              Value: value,
              Domain: 'mobile.yangkeduo.com'
            })
          }
        })
        return resultCookie
      }
    }
  }
  getCookieStr(cookies, type) {
    if (type == 1) {
      return this.getPddCookieStrByName(cookies, 'PDDAccessToken')
    }
    if (type == 10) {
      return this.getJinxiCookieStrByName(cookies, 'pt_key')
    }
  }
  getPddCookieStrByName(cookies, name) {
    const token = cookies.find(b => b.Name == name)
    if (token) {
      return `${token.Name}=${token.Value}`
    }
    return null
  }
  getJinxiCookieStrByName(cookies, name) {
    console.log(cookies, name)
    const token = cookies.find(b => b.Name == name)
    if (token) {
      return `${token.Value}`
    }
    return null
  }
  /**
   * 转换为拍单系统订单模型
   */
  // convert2ShortOrder(order) {
  //   console.log(order, 'origin order info')
  //   const skuId = parseInt(order.goods_info.platform_goods_id)
  //   const purchaselist = []
  //   const data = this.purchaseList.find(item => {
  //     return item.goods_id == skuId
  //   })
  //   console.log('convert2ShortOrder', data)
  //   if (data && data.purchase_info) {
  //     data.purchase_info.forEach(item => {
  //       if (item.purchaseUr) {
  //         item.purchaseUr = item.purchaseUr.replace(/\/\/yangkeduo/, '//mobile.yangkeduo')
  //       }
  //       const obj = {
  //         Note: item.remark,
  //         Url: item.purchaseUr,
  //         RedirectUrl: item.purchaseUr,
  //         PurchaseGoodsId: this.getGoodsIdByLink(item.purchaseUr, item.purchasePlatform)
  //       }
  //       purchaselist.push(obj)
  //     })
  //   }
  //   console.log('purchaselist', purchaselist)

  //   let mainImage = order.goods_info.goods_img
  //   if (!_.startsWith(mainImage, 'http')) {
  //     const suffix = _.startsWith(mainImage, '//') ? 'https' : 'https://'
  //     mainImage = `${suffix}${mainImage}`
  //   }
  //   // 京喜拍单地址过长会导致支付失败需要截取部分字符串
  //   if (order.purchases.purchase_platform_id == 10) {
  //     const str = order.receiver_info.detail_address
  //     const num = this.find(str, '，', 2)
  //     order.receiver_info.detail_address = str.substring(num + 1)
  //   }
  //   const result = {
  //     payAccount: {
  //       UserName: '',
  //       Password: '',
  //       PayPassword: ''
  //     },
  //     receiveUserInfo: {
  //       UserName: order.receiver_info.buyer_name,
  //       UserPhone: order.receiver_info.phone,
  //       Provice: order.receiver_info.state,
  //       City: order.receiver_info.city,
  //       Town: order.receiver_info.town,
  //       Street: '',
  //       PostCode: '',
  //       Address: order.receiver_info.detail_address.split('，').slice(2, -1).join(),
  //       Remark: '' // 拼多多设置备注
  //       // ProviceId: order.receiver_info.province_id,
  //       // CityId: order.receiver_info.city_id,
  //       // TownId: order.receiver_info.town_id
  //     },
  //     goodsInfo: {
  //       UrlAddress: order.purchases.purchase_url,
  //       GoodsTitle: order.goods_info.goods_title,
  //       GoodsMainImage: order.goods_info.sku_img,
  //       SkuId: order.goods_info.platform_goods_id,
  //       // OriSkuId: order ? .OriGoodsSkuId || '', // new（传入映射的OriGoodsSkuId）
  //       SkuName: this.goodsSize(order.goods_info.sku_name),
  //       OriSkuName: this.goodsSize(order.goods_info.sku_name), // new字段
  //       ShotNumber: Number.parseInt(order.goods_info.goods_count),
  //       BuyNum: Number.parseInt(order.goods_info.goods_count), // new字段
  //       // OriBuyNum: order ? .OriGoodsNum || Number.parseInt(order.goods_info.goods_count), // new （传入映射的OriGoodsNum）
  //       Price: Number.parseFloat(order.total_amount),
  //       RedirectUrl: order.purchases.purchase_url,
  //       PddReamrk: order.platform_remark,
  //       LocalReamrk: order.local_remark ? order.local_remark : '',
  //       oritype: this.getShotOrderPlatform(order.purchases.purchase_platform_id),
  //       GoodsId: this.getGoodsIdByLink(order.purchases.purchase_url, order.purchases.purchase_platform_id),
  //       OriGoodsId: this.getGoodsIdByLink(order.purchases.purchase_url, order.purchases.purchase_platform_id), // new字段
  //       OwnGoodsId: order.purchases.goods_id ? order.purchases.goods_id : '',
  //       Purchaselist: purchaselist
  //     },
  //     shotOrderInfo: {
  //       OrderNumber: `${order.order_sn}_${skuId}`,
  //       OrderPriceCnt: Number.parseFloat(order.total_amount), // 支付金额
  //       Tag: order,
  //       MallName: order.mall_info.platform_mall_name
  //     }
  //   }
  //   // 1688拍单需要替换省市区的ID
  //   if (order.purchases.purchase_platform_id == 8) {
  //     var promise = new Promise(function (resolve, reject) {
  //       const AliBaBaService = new BaseUtilService()
  //       AliBaBaService.getTbAddressModel(
  //         order.receiver_info.state
  //       ).then(res => {
  //         console.log(1)
  //         result.receiveUserInfo.ProviceId = res.RegionId
  //         AliBaBaService.getTbAddressModel(
  //           order.receiver_info.city
  //         ).then(res => {
  //           console.log(2)
  //           result.receiveUserInfo.CityId = res.RegionId
  //           AliBaBaService.getTbAddressModel(
  //             order.receiver_info.town
  //           ).then(res => {
  //             console.log(3)
  //             result.receiveUserInfo.TownId = res.RegionId
  //           })
  //         })
  //       })
  //       resolve()
  //     })
  //     promise.then(() => console.log('1688拍单'))
  //   }
  //   return result
  // }

  /**
   * 查询某个字符出现的位置
   * @param {*} str  字符串
   * @param {*} cha  查找的值
   * @param {*} num  出现第几次
   */
  find(str, cha, num) {
    let x = str.indexOf(cha)
    for (let i = 0; i < num - 1; i++) {
      x = str.indexOf(cha, x + 1)
    }
    return x
  }
  // 商品规格处理
  goodsSize(goodsSizeInfo) {
    const type = JSON.parse(goodsSizeInfo)
    let arrStr = ''
    if (type instanceof Array) {
      type.forEach((item, index) => {
        arrStr += item['value'] + (index + 1 === type.length ? '' : ',')
      })
      return arrStr
    } else {
      return type.value
    }
  }
  getShotOrderPlatform(platform) {
    switch (platform) {
      case 1:
        return shotOrderPlatform.PinDuoduo
      case 2:
      case 3:
        return shotOrderPlatform.TaoBao
      case 4:
        return shotOrderPlatform.JingDong
      case 7:
        return shotOrderPlatform.HYJ
      case 8:
        return shotOrderPlatform.Alibaba
      case 10:
        return shotOrderPlatform.JingXi
      default:
        return shotOrderPlatform.PinDuoduo
    }
  }
  /**
   * 拍单买手号平台
   * @param {*} type
   */
  getShortOrderBuyerAccountPlatform(type) {
    switch (type) {
      case 1:
        return shotOrderPlatform.PinDuoduo
      case 2:
      case 3:
        return shotOrderPlatform.TaoBao
        // case 3:
        //   return shotOrderPlatform.TaoBao
      case 4:
        return shotOrderPlatform.JingDong
        // case 2:
        //   return shotOrderPlatform.HYJ
      case 5:
        return shotOrderPlatform.Alibaba
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
  }

  getGoodsIdByLink(url, platform) {
    console.log(url)
    if (platform == 8) {
      const regex = url.match('/(?<goodsId>[0-9]*?).html')
      const {
        goodsId
      } = regex.groups
      return goodsId
    } else {
      const goodsId = this.getQueryString(url, 'goods_id')
      if (goodsId) {
        return goodsId
      }
      const id = this.getQueryString(url, 'id')
      return id
    }
  }
  getQueryString(url, name) {
    const arr = decodeURIComponent(url.split('?')[1]).split('&')
    const request = []
    let temp = []
    for (let i = 0; i < arr.length; i++) {
      temp = arr[i].split('=')
      request[temp[0]] = temp[1]
    }
    return request[name] || null
  }
  // 打开货老板售后
  SingleOrderData(a, b) {
    console.log(a, b)
    return this.nativeService.jumpHyj(a, b)
  }
}