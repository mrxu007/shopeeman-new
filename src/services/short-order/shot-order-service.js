import shotOrderPlatform from './shot-order-platform'
import applicationConfig from '../application-config'
import { dateFormat } from '../../util/util'
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
  shopBuyerAccount = []
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
    this.writeLog = writeLog
    const buyerMap = new Map()
    const buyerList = []

    this.buyerAccounts.forEach(element => {
      const buyerItem = this.conver2BuyerAccount(element)
      buyerList.push(buyerItem)
      buyerMap.set(Number(buyerItem.shotOrderPlatform), buyerItem)
      this.shopBuyerAccount.push(buyerItem)
    })
    console.log(buyerMap, "buyerMap")
    //淘宝天猫海外平台cook
    this.crossBorderAccessToken = buyerMap.get(Number(shotOrderPlatform.CrossBorder)) ? buyerMap.get(Number(shotOrderPlatform.CrossBorder)).Cookiestr : ''
    //支付信息
    const payAccount = {
      UserName: '',
      PayPassword: '',
      Password: ""
    }
    payAccount.UserName = configInfo ? configInfo.pay_account : ''
    payAccount.PayPassword = configInfo ? configInfo.pay_password : ''
    //获取采购地址
    await this.buildPurchaseList(this.orders)
    const res = await this.getShortOrders(buyerMap, payAccount, configInfo, nickInfo)
    let orders = []
    if (res.code === 200) {
      orders = res.data
    } else {
      this.writeLog(`拍单中止${res.data}`, false)
      return false
    }
    const shortGlobalInfo = {
      GatewayEndPoint: '129.204.71.240', //网关ip
      AutoSelectSku: configInfo.auto_sku == 1 ? false : configInfo.auto_sku == 2 ? true : true, //网关ip  非固定传参的字段(暂时默认)
      AutoPay: configInfo.auto_pay == 1 ? false : configInfo.auto_pay == 2 ? true : true, //网关ip  非固定传参的字段(暂时默认)
      AutoNextOrder: configInfo.auto_next_order == 1 ? false : configInfo.auto_next_order == 2 ? true : true, //网关ip  非固定传参的字段(暂时默认)
      ShowSignOrderBtn: false, //基础信息设置
      ShowAutoOrderBtn: false,
      ShowSearchByPddImg: true,
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
      H5x5sec: configInfo.h5_xsec || '', //非固定传参的字段(暂时默认)
      TaobaoCookieForImg: buyerMap.get(Number(shotOrderPlatform.TaoBao)) && buyerMap.get(Number(shotOrderPlatform.TaoBao)).LoginedCookies || [],
      TaobaoRemark: configInfo.taobao_leave_content, //'请不要放价格单,不要放好评卡', //非固定传参的字段(暂时默认)
      AlibabaRemark: configInfo.ali_leave_content, //非固定传参的字段(暂时默认)
      ZhiFuBaoAwid: '',
      ProfitRate: 100,
      SkipPreSale: false,
      SkipColleague: false,
      SoftDomain: '',
      Muid: '',
      TaoBaoCache: this.getCache(buyerMap, Number(shotOrderPlatform.TaoBao)),
      PinduoduoCache: this.getCache(buyerMap, Number(shotOrderPlatform.PinDuoduo)),
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
      PddBuyAccounts: this.shopBuyerAccount,
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
        "陆运": '1',
        "空运": '2',
        "海运": '3'
      },
      GoodsTypeList: {
        "普货": '1',
        "敏感货": '2'
      },
    }
    console.log(shortGlobalInfo, '====All')
    // 最后检测买手号是否传了
    for (let index = 0; index < shortGlobalInfo.ListShotOrdes.length; index++) {
      const item = shortGlobalInfo.ListShotOrdes[index]
      if (!item.buyerAccount) {
        return this.writeLog(`暂无买手号信息`)
      }
    }
    try {
      /**
       * @name : 
       * @param  {*}shortConfigInfoJson : shortGlobalInfo
       * @param  {*}cefLanguage：选择的网页翻译的语种
       * @param  {*}crossBorderAccessToken：天猫淘宝海外cookie
       */
      console.log(JSON.stringify(shortGlobalInfo), configInfo.language_set, this.crossBorderAccessToken)
      this.nativeService.start(JSON.stringify(shortGlobalInfo), configInfo.language_set, this.crossBorderAccessToken)
    } catch (error) {
      return this.writeLog(`拍单失败`)
    }

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
    console.log("-------------", buyerMap, key)
    if (buyerMap.has(key)) {
      return buyerMap.get(key).UserNameCache
    }
    return null
  }
  async getShortOrders(buyerMap, payAccount, configInfo, nickInfo) {
    let info = await window['ConfigBridgeService'].getUserInfo()
    this.rateList = info.ExchangeRates || {}
    const shorOrders = []
    for (let index = 0; index < this.orders.length; index++) {
      const itemOrder = this.orders[index]
      let res = await this.$configService.getWarehouseInfo(itemOrder.mall_info.platform_mall_id)
      let warehouseList = res && JSON.parse(res) || []
      // console.log(warehouseList,"warehouseList-================",res,itemOrder.mall_info.platform_mall_id)
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
      // console.log(warehouseList, "warehouseInfo",Number(itemOrder.goods_info.ori_platform_id))
      if ([1, 10, 2, 3, 8, 13, 15].indexOf(Number(itemOrder.goods_info.ori_platform_id)) > -1) {
        warehouseInfo = warehouseList.find(item => {
          return item.type == 0
        })
      } else if ([9, 11].indexOf(Number(itemOrder.goods_info.ori_platform_id)) > -1) {
        warehouseInfo = warehouseList.find(item => {
          return item.type == 3
        })
      }
      console.log(warehouseInfo, "warehouseInfo")
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
        //上家为shopee但为映射地址
        if (itemOrder.goods_info.ori_platform_id == 11 && !warehouseInfo.shopee_map_id) {
          return {
            code: 50001,
            data: `仓库未映射shopee地址，请重新映射`
          }
        }
      }

      //处理拍单姓名、地址、手机号
      let buyerInfoRes = await this.dealWithBuyerBaseInfo(warehouseInfo, itemOrder, configInfo, nickInfo)
      let buyerInfo = {}
      console.log(buyerInfoRes, "buyerInfoRes")
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
        UserPhone: buyerInfo["buyerPhone"].replaceAll('-',''),
        Provice: buyerInfo["provinceText"],
        City: buyerInfo["cityText"],
        Town: buyerInfo["distinctText"],
        Street: buyerInfo['streetText'],
        PostCode: buyerInfo['postCode'] ? buyerInfo['postCode'].toString() : '000000',
        Address: buyerInfo["buyerAddress"],
        Remark: itemOrder.message_to_seller || '', //itemOrderinfo.buyer_memo
        ProviceId: buyerInfo["provId"],
        CityId: buyerInfo["cityId"],
        TownId: buyerInfo["distId"],
        StreetId: buyerInfo["streetId"],
        Country: buyerInfo["country"] ? buyerInfo["country"] : '',
      }
      //处理goodsInfo
      console.log(itemOrder, itemOrder.goods_info.ori_url, "处理goodsInfo", this.rateList)
      let goodsInfo = {
        "OwnGoodsId": itemOrder.goods_info.goods_id,
        UrlAddress: itemOrder.goods_info.ori_url,
        GoodsTitle: itemOrder.goods_info.goods_name,
        OriGoodsId: itemOrder.goods_info.ori_goods_id,
        GoodsMainImage: this._that.$filters.imageRender([itemOrder.goods_info.goods_img]), //[scope.row.country, scope.row.platform_mall_id, scope.row.product_cover] | imageRender
        SkuId: itemOrder.goods_info.variation_id,
        OriSkuId: itemOrder.goods_info.ori_sku_id,
        SkuName: itemOrder.goods_info.variation_sku !== '' ? itemOrder.goods_info.variation_sku.replace("=|=", ",") : itemOrder.goods_info.variation_name.replace("=|=", ","),
        OriBuyNum: itemOrder.goods_info.goods_count, //后面需要根据是否聚合拍单再做调整
        ShotNumber: itemOrder.goods_info.goods_count,
        Price: (Number(itemOrder.escrow_amount) * Number(this.rateList[itemOrder.country.toUpperCase()])).toFixed(2), //订单收入转换为人民币  
        ExchangePrice: itemOrder.escrow_amount, //汇率订单收入     
        RedirectUrl: this.GetRedirectUrl(itemOrder, nickInfo), //获取优惠调转链接
        PddReamrk: itemOrder.note, //平台备注
        LocalReamrk: itemOrder.remark, //本地备注
        OtherInfo: this._that.$filters.chineseSite(itemOrder.country), //站点中文
        CountryCode: itemOrder.country,
        CurrentExchangeRate: this.rateList[itemOrder.country.toUpperCase()],
        oritype: this.getShortOrderBuyerAccountPlatform(Number(itemOrder.goods_info.ori_platform_id)),
        "ForceQuickOrder": 0,
        "GroupGoodsModels": [],
        "IsOrderDetail": false,
        Purchaselist: this.dealWithPurchaseList(itemOrder, nickInfo), //组装商品采购链接列表
      };

      //处理shotOrderInfo
      let shotOrderInfo = {
        OrderNumber: itemOrder.order_sn, //shopee订单编号
        OrderPriceCnt: (Number(itemOrder.escrow_amount) * Number(this.rateList[itemOrder.country.toUpperCase()])).toFixed(2) || 0,
        OrdeExchangerPriceCnt: itemOrder.escrow_amount + this._that.$filters.siteCoin(itemOrder.country), //汇率价格
        Tag: {
          SysOrderId: itemOrder.id,
          MallId: itemOrder.mall_info.platform_mall_id,
          Site: itemOrder.country,
          ProjectType: 'shopeeman',
          CookieStr: '', //暂先为空值
          Status: itemOrder.order_status, //拍单状态
          Note: itemOrder.note
        },
        SystemOrderId: itemOrder.id,
        KidPayAmount: '',
        MallName: "",
        MallId: "",
        IsGiftOrder: false,
        IsUseHuaWeiCloudPhone: false,
      }
      console.log("itemOrder.goods_info.ori_platform_id", itemOrder.goods_info.ori_platform_id)
      let paramaAll = {
        payAccount: payAccount,
        buyerAccount: buyerMap.get(this.getShortOrderBuyerAccountPlatform(Number(itemOrder.goods_info.ori_platform_id))),
        receiveUserInfo: receiveUserInfo,
        goodsInfo: goodsInfo,
        shotOrderInfo: shotOrderInfo
      }
      shorOrders.push(paramaAll)
      console.log("paramaAll", paramaAll)
    }
    return {
      code: 200,
      data: shorOrders
    }
  }
  //处理采购地址
  dealWithPurchaseList(itemOrder, nickInfo) {
    let shipList = []
    let res = this.goodBuyUrlList.find(item => {
      return item.goods_id === itemOrder.goods_info.goods_id
    })
    let execPlatform = /(yangkeduo.com)|(taobao.com)|(jingxi.com)|(jd.com)|(1688.com)|(tmall.com)|(pinduoduo.com)|(xiapi.xiapibuy.com)|(taobao.global)|(lazada.com)/g
    let execGoods = /goods_id=([0-9]*)/
    let execIDs = /id=([0-9]*)/
    let jxIDs = /sku=([0-9]*)/
    let tmGlobalIDs = /mpId=([0-8]*)/
    let jdlazada1688IDs = /(\d+)\.html/
    let shopeeIDs = /[^\/]+(?!.*\/)/
    let goods_id = ''
    res && res.purchase_detail && res.purchase_detail.length && res.purchase_detail.forEach(item => {
      if (item.purchase_url.match(execGoods)) {
        goods_id = item.purchase_url.match(execGoods)[1]
      } else if (item.purchase_url.match(execIDs)) {
        goods_id = item.purchase_url.match(execIDs)[1]
      } else if (item.purchase_url.match(jxIDs)) {
        goods_id = item.purchase_url.match(jxIDs)[1]
      } else if (item.purchase_url.match(tmGlobalIDs)) {
        goods_id = item.purchase_url.match(tmGlobalIDs)[1]
      } else if (item.purchase_url.match(jdlazada1688IDs)) {
        goods_id = item.purchase_url.match(jdlazada1688IDs)[1]
      } else if (item.purchase_url.match(shopeeIDs)) {
        goods_id = item.purchase_url.match(shopeeIDs)[0]
      }
      let par = {
        Note: item.note, //备注信息
        Url: item.purchase_url, /// 采购链接
        RedirectUrl: this.GetRedirectUrl(itemOrder, nickInfo), // 跳转链接
        PurchaseGoodsId: item.purchase_platform_id, //上家id
      }
      shipList.push(par)
    })
    console.log(res, res.purchase_detail, shipList, "shipList")
    return shipList
  }
  //获取采购地址
  async buildPurchaseList(orders) {
    let goodsIdLists = []
    orders.forEach((item) => {
      goodsIdLists.push(item.goods_info.goods_id)
    })
    let params = {
      goodsIdLists: goodsIdLists.join(',')
    }
    let res = await this.$api.getPurchaseLists(params)
    if (res.data.code === 200) {
      this.goodBuyUrlList = res.data.data
    }
    //  return paramsList
  }
  GetRedirectUrl(itemOrder, nickInfo) {
    let redirectUrl = "";
    switch (itemOrder.goods_info.ori_platform_id) {
      case '1':
        redirectUrl = "http://" + process.env.VUE_APP_ddk + "/ddk/singlePromotion?goodsId=" + itemOrder.goods_info.ori_goods_id + "&muid=" + nickInfo.muid;
        break;
      case '2':
      case '3':
        redirectUrl = "http://" + process.env.VUE_APP_ddk + "/tbk/singlePromotion?goodsId=" + itemOrder.goods_info.ori_goods_id + "&muid=" + nickInfo.muid;
        break;
      default:
        redirectUrl = itemOrder.goods_info.ori_url
        break;
    }
    return redirectUrl;
  }
  //
  dealWithBuyName(warehouseInfo, itemOrder, configInfo, nickInfo) {
    let addressUserInfo = {}
    let buyerName = nickInfo.Nickname + "#" + warehouseInfo.receiving_name;
    if (warehouseInfo.isUser === 1) {
      // 1:拍单时买家姓名自动增加软件用户名称标识（拼多多平台将放在详细地址末尾）
      buyerName = configInfo.shot_order_address_label.includes('1') ? buyerName : warehouseInfo.receiving_name;
    }
    //2:拍单时买家姓名自动增加拍单日期标识（拼多多平台将放在详细地址末尾）
    if (configInfo.shot_order_address_label.includes('2')) {
      buyerName += '-' + dateFormat(new Date().getTime(), 'Md')
    }
    //3:拍单时买家姓名自动增加SPM字样标识（拼多多平台将放在详细地址末尾）
    if (configInfo.shot_order_address_label.includes('3')) {
      buyerName += '-SPM'
    }
    // buyerName = configInfo.IsAutoAddBuyerDate ? buyerName + "-" + dateFormat(new Date().getTime(), 'Md') : buyerName;
    // buyerName = configInfo.IsAutoAddBuyerSPM ? buyerName + "-SPM" : buyerName;
    if (warehouseInfo.isUser == 0 && warehouseInfo.warehouse_id == "23") {
      buyerName = "SM-" + warehouseInfo.receiving_name;
    }
    if (warehouseInfo.isUser == 0 && warehouseInfo.warehouse_id == "8") {
      buyerName = "SPM-" + warehouseInfo.receiving_name;
    }
    //5:拍单时买家姓名自动增加订单后6位
    if (configInfo.shot_order_address_label.includes('5')) {
      buyerName += "-" + itemOrder.order_sn.substring(itemOrder.order_sn.length - 6);
    }
    addressUserInfo['buyerName'] = itemOrder.goods_info.ori_platform_id == 1 ? warehouseInfo.receiving_name : buyerName;
    //手机号处理
    addressUserInfo["buyerPhone"] = warehouseInfo.is_use_own_phone == 1 ? warehouseInfo.own_phone : warehouseInfo.receiving_tel;
    //地址处理：加上订单Id
    let detailAddress = warehouseInfo.detail_address.trim();
    //新加坡地址后缀的特殊性，不能携带订单Id
    if (warehouseInfo.type != 3 && warehouseInfo.country != "SG") {
      if (configInfo.shot_order_address_label.includes('4')) {
        detailAddress += "#" + itemOrder.id;
      }
      //6:拍单时买家地址自动增加订单后6位
      if (configInfo.shot_order_address_label.includes('6')) {
        detailAddress += "#" + itemOrder.order_sn.substring(itemOrder.order_sn.length - 6);
      }
    }
    if (itemOrder.goods_info.ori_platform_id == 1) {
      if (warehouseInfo.isUser != 1) {
        detailAddress += "#" + nickInfo.Nickname + "#" + warehouseInfo.receiving_name;
      }
      // 1:拍单时买家姓名自动增加软件用户名称标识（拼多多平台将放在详细地址末尾）
      // if(configInfo.shot_order_address_label.includes('1')){
      //   detailAddress += '-' + nickInfo.Username
      // }
      //拍单时买家姓名自动增加拍单日期标识（拼多多平台将放在详细地址末尾）
      if (configInfo.shot_order_address_label.includes('2')) {
        detailAddress += '-' + dateFormat(new Date().getTime(), 'Md')
      }
      //3:拍单时买家姓名自动增加SPM字样标识（拼多多平台将放在详细地址末尾）
      if (configInfo.shot_order_address_label.includes('3')) {
        detailAddress += '-SPM'
      }
    }
    addressUserInfo["buyerAddress"] = detailAddress;
    return addressUserInfo
  }
  //处理拍单姓名、地址、手机号
  async dealWithBuyerBaseInfo(warehouseInfo, itemOrder, configInfo, nickInfo) {
    console.log("configInfo", configInfo, nickInfo, warehouseInfo)
    let addressUserInfo = {}
    addressUserInfo["provId"] = warehouseInfo.province_id
    addressUserInfo["cityId"] = warehouseInfo.city_id
    addressUserInfo["distId"] = warehouseInfo.distinct_id
    addressUserInfo["streetId"] = ''
    addressUserInfo["provinceText"] = warehouseInfo.province_text
    addressUserInfo["cityText"] = warehouseInfo.city_text
    addressUserInfo["distinctText"] = warehouseInfo.distinct_text
    addressUserInfo["streetText"] = ''
    addressUserInfo["postCode"] = warehouseInfo.post_code

    ////处理拍单姓名、地址、手机号
    console.log(warehouseInfo, "0000000000")
    let namePhoneAddress = this.dealWithBuyName(warehouseInfo, itemOrder, configInfo, nickInfo)
    console.log(namePhoneAddress, "namePhoneAddress")
    addressUserInfo['buyerName'] = namePhoneAddress['buyerName']
    addressUserInfo['buyerPhone'] = namePhoneAddress['buyerPhone']
    addressUserInfo['buyerAddress'] = namePhoneAddress['buyerAddress']

    //处理 provId/cityId/distId
    if (itemOrder.goods_info.ori_platform_id == 2 || itemOrder.goods_info.ori_platform_id == 3 || itemOrder.goods_info.ori_platform_id == 8) {
      let res = await window['BaseUtilBridgeService'].getTbAddress(warehouseInfo.province_text, warehouseInfo.distinct_text)
      console.log("处理淘宝系地址", res)
      if (res) {
        addressUserInfo["provId"] = res.ProvinceId
        addressUserInfo["cityId"] = res.CityId
        addressUserInfo["distId"] = res.DistrictId
        addressUserInfo["streetId"] = ''
        addressUserInfo["provinceText"] = res.Province
        addressUserInfo["cityText"] = res.City
        addressUserInfo["distinctText"] = res.District
        addressUserInfo["streetText"] = ''
        // addressUserInfo["postCode"] = res.Post
      }
    } else if (itemOrder.goods_info.ori_platform_id == 9 && warehouseInfo.country !== 'SG') {
      let res = await window['BaseUtilBridgeService'].getLazadaAddress(warehouseInfo.distinct_id)
      console.log(res, "处理lazada地址")
      if (res) {
        if (!res.DistrictId) {
          return {
            code: 50001,
            data: `【${itemOrder.order_sn}】未匹配到用户的地址ID`
          }
        }
        addressUserInfo["provId"] = res.ProvinceId
        addressUserInfo["cityId"] = res.CityId
        addressUserInfo["distId"] = res.DistrictId
        addressUserInfo["streetId"] = ''
        addressUserInfo["provinceText"] = res.Province.includes("/") ? res.Province.split('/')[0].trim() : res.Province;
        addressUserInfo["cityText"] = res.City.includes("/") ? res.City.split('/')[0].trim() : res.City;
        addressUserInfo["distinctText"] = res.District
        addressUserInfo["streetText"] = ''
        // addressUserInfo["postCode"] = res.Post
      }
      if (nickInfo.Nickname.includes("_") || nickInfo.Nickname.includes("+")) {
        return {
          code: 50001,
          data: `【用户昵称含有特殊字符，Lazada平台不支持使用特殊字符创建收件人，请联系客服修改`
        }
      }
      let buyerName = addressUserInfo['buyerName']
      if (itemOrder.country == "PH") {
        //菲律宾站点名称不能包含#字符，且必须使用空格分隔，直接使用买家姓名
        buyerName = warehouseInfo.receiving_name + " " + "SPM";
      }
      addressUserInfo['buyerName'] = buyerName.replaceAll("#", "-");
      console.log(addressUserInfo, "1111111111111111111")
    } else if (itemOrder.goods_info.ori_platform_id == 11) {
      if (warehouseInfo.country !== 'SG' && warehouseInfo.type === 3) {
        console.log('50009', warehouseInfo, warehouseInfo.shopee_map_id)
        if (!warehouseInfo.shopee_map_id) {
          return {
            code: 50001,
            data: '该仓库未映射shopee地址，请重新映射'
          }
        }
        let resInfo = await window['BaseUtilBridgeService'].getLazadaAddress(warehouseInfo.distinct_id)
        console.log("处理shopee地址", resInfo)
        let allShopAdress = await this.getAllShopeeAddress(itemOrder.goods_info.ori_platform_id, warehouseInfo.country, warehouseInfo.shopee_map_id, 0)
        if (!allShopAdress) {
          return {
            code: 50001,
            data: '该仓库未映射shopee地址，请重新映射'
          }
        }
        console.log(allShopAdress, "处理shopee地址----allShopAdress")
        if (allShopAdress.provinceInfo) {
          addressUserInfo["provId"] = Object.keys(allShopAdress.provinceInfo)[0]
          addressUserInfo["provinceText"] = allShopAdress.provinceInfo[Object.keys(allShopAdress.provinceInfo)[0]]
        }
        if (allShopAdress.cityInfo) {
          addressUserInfo["cityId"] = Object.keys(allShopAdress.cityInfo)[0]
          addressUserInfo["cityText"] = allShopAdress.cityInfo[Object.keys(allShopAdress.cityInfo)[0]]
        }
        if (allShopAdress.distinceInfo) {
          addressUserInfo["distId"] = Object.keys(allShopAdress.distinceInfo)[0]
          addressUserInfo["distinctText"] = allShopAdress.distinceInfo[Object.keys(allShopAdress.distinceInfo)[0]]
        }
        if (allShopAdress.streetInfo) {
          addressUserInfo["streetId"] = Object.keys(allShopAdress.streetInfo)[0]
          addressUserInfo["streetText"] = allShopAdress.streetInfo[Object.keys(allShopAdress.streetInfo)[0]]
        }
        if (addressUserInfo["provinceText"].includes('~')) {
          addressUserInfo["provinceText"] = addressUserInfo["provinceText"].split('~')[0];
        }
        let postCode = Number(resInfo.Post)
        addressUserInfo["postCode"] = !isNaN(postCode) && postCode !== 0 ? postCode : warehouseInfo.post_code
        addressUserInfo["country"] = warehouseInfo.country
        // addressUserInfo["postCode"] = res.Post
      }
    }
    return {
      code: 200,
      data: addressUserInfo
    }
  }
  async getAllShopeeAddress(platform, country, shopeeMapId, typeMark) {
    let address = {}
    while (true) {
      let shopeeAddrMappingTree = await this.searchShopeeAddrMappingTree(platform, country, shopeeMapId, typeMark)
      if (!shopeeAddrMappingTree || !shopeeAddrMappingTree.length) {
        break
        // return null
      }
      let addressLevel = shopeeAddrMappingTree[0].level
      let detailInfo = {}
      detailInfo[shopeeAddrMappingTree[0].id] = shopeeAddrMappingTree[0].division_name
      switch (addressLevel) {
        case 1:
          address["provinceInfo"] = detailInfo;
          break;
        case 2:
          address["cityInfo"] = detailInfo;
          break;
        case 3:
          address["distinceInfo"] = detailInfo;
          break;
        case 4:
          address["streetInfo"] = detailInfo;
          break;
      }
      shopeeMapId = shopeeAddrMappingTree[0].parant + ''
    }
    return address
  }
  shopAdressPlatform = {
    SPMY: '0',
    SPTW: '1',
    SPVN: '2',
    SPID: '3',
    SPPH: '4',
    SPTH: '5',
    SPSG: '6',
    SPBR: '7',
    LZDMY: '8',
    LZDPH: '9',
    LZDTH: '10',
    LZDSG: '11',
    LZDID: '12',
    LZDVN: '13',
  }
  //shopee地址处理
  async searchShopeeAddrMappingTree(platform, country, shopeeMapId, typeMark) {
    let data = null
    if (platform == 11) {
      switch (country) {
        case "MY":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPMY, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        case "ID":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPID, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        case "TH":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPTH, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        case "PH":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPPH, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        case "SG":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPSG, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        case "VN":
          data = await window['CommodityBridgeService'].callAddrHelper('GetAddress', this.shopAdressPlatform.SPVN, "0", shopeeMapId);
          return data && JSON.parse(data) || null
        default:
          return null;
      }
    } else {
      return null
    }
  }
  /**
   * 转换为拍单系统买手号模型
   */
  conver2BuyerAccount(account) {
    if (account.type === 13) {
      let params = {
        UserNameCache: '',
        Password: '',
        shotOrderPlatform: this.getShortOrderBuyerAccountPlatform(account.type),
        LoginedCookies: [],
        UserName: account.account,
        Cookiestr: account.access_token,
        AccountType: account.type,
        Ua: '',
        Country: account.site || '',
        ShopId: '',
        OrderType: ''
      }
      return params
    }
    let params = {
      UserNameCache: account.cache_path,
      Password: '',
      shotOrderPlatform: this.getShortOrderBuyerAccountPlatform(account.type),
      LoginedCookies: account.login_info,
      UserName: account.name,
      Cookiestr: JSON.stringify(account.login_info),
      // Cookiestr: '',
      AccountType: account.type,
      Ua: account.ua,
      Country: account.site || '',
      ShopId: '',
      OrderType: ''
    }
    return params
  }
  converterCookies(cookies) {
    try {
      const result = JSON.parse(cookies)
      console.log("result", result)
      return result
    } catch (error) {
      console.log(error, "error", cookies)
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