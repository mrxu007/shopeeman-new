import shotOrderPlatform from './shot-order-platform'
import applicationConfig from '../application-config'
import BaseUtilService from '../BaseUtilService'
export default class {
  orders = undefined;
  buyerAccounts = undefined;
  Ua = ''
  nativeService = null;
  constructor(orders, buyerAccounts, skuList) {
    this.orders = orders
    this.buyerAccounts = buyerAccounts
    this.purchaseList = skuList
    this.nativeService = window['ShortOrderBridgeService']
  }
  /**
   * 开始拍单
   */
  async start() {
    console.log(this.orders, this.buyerAccounts, 'short order info')
    const buyerMap = new Map()
    const buyerList = []

    this.buyerAccounts.forEach(element => {
      const buyerItem = this.conver2BuyerAccount(element)
      buyerList.push(buyerItem)
      buyerMap.set(buyerItem.shotOrderPlatform, buyerItem)
    })
    const configService = new applicationConfig()
    const payAccount = { UserName: '', PayPassword: '', AutoPay: false }
    payAccount.UserName = await configService.getConfigByName('zfbAccount')
    payAccount.PayPassword = await configService.getConfigByName('zfbPassword')
    payAccount.AutoPay = await configService.getConfigByName('autoPay')
    console.log(payAccount, '=====>')
    const orders = this.getShortOrders(buyerMap, payAccount)
    const shortGlobalInfo = {
      ListShotOrdes: orders,
      AutoSelectSku: true,
      AutoPay: Number(payAccount.AutoPay) === 1,
      AutoNextOrder: true,
      TaobaoRemark: '请不要放价格单,不要放好评卡',
      IsOpenCoding: true,
      SoftDomain: '47.107.127.230:5551',
      TaobaoCookieForImg: orders[0]?.buyerAccount?.LoginedCookies ?? ''
    }
    this.orders.forEach(item => {
      const selectShotOrderPlatform = item.purchases.purchase_platform_id
      this.setCache(selectShotOrderPlatform, shortGlobalInfo, buyerMap)
    })
    console.log(shortGlobalInfo, '====All')
    this.nativeService.start(JSON.stringify(shortGlobalInfo))
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
      case 5 || 8:
        shortGlobalInfo.AlibabaCache = this.getCache(buyerMap, shotOrderPlatform.Alibaba)
    }
    return shortGlobalInfo
  }
  getCache(buyerMap, key) {
    if (buyerMap.has(key)) {
      return buyerMap.get(key).UserNameCache
    }
    return null
  }
  getShortOrders(buyerMap, payAccount) {
    const shorOrders = []
    for (let index = 0; index < this.orders.length; index++) {
      const itemOrder = this.orders[index]
      const item = this.convert2ShortOrder(itemOrder)
      item.payAccount = payAccount
      item.buyerAccount = buyerMap.get(item.goodsInfo.oritype)
      item.goodsInfo.OtherInfo = itemOrder.ext ? itemOrder.ext.huohao : ''// 设置货号
      console.log(item.shotOrderInfo.Tag.purchases, 'item.shotOrderInfo.Tag.purchase')
      console.log(item.shotOrderInfo.Tag.purchases.purchase_platform_id, 'item.shotOrderInfo.Tag.purchases.purchase_platform_id')
      if (item.shotOrderInfo.Tag.purchases) {
        console.log(itemOrder, 'itemOrder')
        if (itemOrder.purchases.purchase_platform_id == 1)// 拼多多
        {
          item.goodsInfo.RedirectUrl = `http://47.107.127.230:5551/ddk/singlePromotion?goodsId=${itemOrder.purchases.purchase_goods_id}&muid=${itemOrder.uid}`
        } else if (itemOrder.purchases.purchase_platform_id == 2 || itemOrder.purchases.purchase_platform_id == 3)// 淘宝
        {
          item.goodsInfo.RedirectUrl = `http://47.107.127.230:5551/tbk/singlePromotion?goodsId=${itemOrder.purchases.purchase_goods_id}&muid=${itemOrder.uid}`
        } else if (itemOrder.purchases.purchase_platform_id == 5 || itemOrder.purchases.purchase_platform_id == 8) // 1688
        {
          item.goodsInfo.RedirectUrl = `${itemOrder.purchases.purchase_url}`
        } else if (itemOrder.purchases.purchase_platform_id == 4 || itemOrder.purchases.purchase_platform_id == 10) // 京东
        {
          item.goodsInfo.oritype = shotOrderPlatform.JingXi
          item.goodsInfo.RedirectUrl = `https://item.m.jd.com/product/${itemOrder.purchases.purchase_goods_id}.html`
        }
      }
      console.log(shorOrders)
      shorOrders.push(item)
    }

    return shorOrders
  }
  /**
   * 转换为拍单系统买手号模型
   */
  conver2BuyerAccount(buyerAccount) {
    if (!buyerAccount.loginCookies) {
      buyerAccount.loginCookies = this.converterCookies(buyerAccount.login_info)
    }
    let cachePath = buyerAccount.cache_path
    cachePath = cachePath.replace('Cache\\', '')
    const loginCookies = buyerAccount.loginCookies.find(n => n.Name == 'PDDAccessToken')
    return {
      UserName: buyerAccount.name,
      UserNameCache: cachePath,
      Password: '',
      shotOrderPlatform: this.getShortOrderBuyerAccountPlatform(buyerAccount.type),
      LoginedCookies: buyerAccount.type === 3 || buyerAccount.type === 2 || buyerAccount.type === 10 || buyerAccount.type === 8 ? buyerAccount.loginCookies : [loginCookies],
      Cookiestr: this.getCookieStr(buyerAccount.loginCookies, buyerAccount.type),
      Ua: buyerAccount.ua ? buyerAccount.ua : ''
    }
  }
  // pdd获取Ua 针对商品下架问题
  // async pddGetUA(){
  //     const pddUA = new BaseUtilService()
  //     this.Ua = await pddUA.getPurchaseUa()
  // }
  converterCookies(cookies) {
    try {
      const result = JSON.parse(cookies)
      return result
    } catch (error) {
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
  convert2ShortOrder(order) {
    console.log(order, 'origin order info')
    const skuId = parseInt(order.goods_info.platform_goods_id)
    const purchaselist = []
    const data = this.purchaseList.find(item => {
      return item.goods_id == skuId
    })
    console.log('convert2ShortOrder', data)
    if (data && data.purchase_info) {
      data.purchase_info.forEach(item => {
        if (item.purchaseUr) {
          item.purchaseUr = item.purchaseUr.replace(/\/\/yangkeduo/, '//mobile.yangkeduo')
        }
        const obj = {
          Note: item.remark, Url: item.purchaseUr, RedirectUrl: item.purchaseUr,
          PurchaseGoodsId: this.getGoodsIdByLink(item.purchaseUr, item.purchasePlatform)
        }
        purchaselist.push(obj)
      })
    }
    console.log('purchaselist', purchaselist)
    let mainImage = order.goods_info.goods_img
    if (!_.startsWith(mainImage, 'http')) {
      const suffix = _.startsWith(mainImage, '//') ? 'https' : 'https://'
      mainImage = `${suffix}${mainImage}`
    }
    // 京喜拍单地址过长会导致支付失败需要截取部分字符串
    if (order.purchases.purchase_platform_id == 10) {
      const str = order.receiver_info.detail_address
      const num = this.find(str, '，', 2)
      order.receiver_info.detail_address = str.substring(num + 1)
    }
    const result = {
      payAccount: {
        UserName: '',
        Password: '',
        PayPassword: ''
      },
      receiveUserInfo: {
        UserName: order.receiver_info.buyer_name,
        UserPhone: order.receiver_info.phone,
        Provice: order.receiver_info.state,
        City: order.receiver_info.city,
        Town: order.receiver_info.town,
        Street: '',
        PostCode: '',
        Address: order.receiver_info.detail_address.split('，').slice(2, -1).join(),
        Remark: order.platform_remark, // 买家留言
        ProviceId: order.receiver_info.province_id,
        CityId: order.receiver_info.city_id,
        TownId: order.receiver_info.town_id
      },
      goodsInfo: {
        UrlAddress: order.purchases.purchase_url,
        GoodsTitle: order.goods_info.goods_title,
        GoodsMainImage: order.goods_info.sku_img,
        SkuId: order.goods_info.platform_goods_id,
        SkuName: this.goodsSize(order.goods_info.sku_name),
        ShotNumber: Number.parseInt(order.goods_info.goods_count),
        Price: Number.parseFloat(order.total_amount),
        RedirectUrl: order.purchases.purchase_url,
        PddReamrk: order.platform_remark,
        LocalReamrk: order.local_remark ? order.local_remark : '',
        oritype: this.getShotOrderPlatform(order.purchases.purchase_platform_id),
        GoodsId: this.getGoodsIdByLink(order.purchases.purchase_url, order.purchases.purchase_platform_id),
        OwnGoodsId: order.purchases.goods_id ? order.purchases.goods_id : '',
        Purchaselist: purchaselist
      },
      shotOrderInfo: {
        OrderNumber: `${order.order_sn}_${skuId}`,
        OrderPriceCnt: Number.parseFloat(order.total_amount), // 支付金额
        Tag: order,
        MallName: order.mall_info.platform_mall_name
      }
    }
    // 1688拍单需要替换省市区的ID
    if (order.purchases.purchase_platform_id == 8) {
      var promise = new Promise(function (resolve, reject) {
        const AliBaBaService = new BaseUtilService()
        AliBaBaService.getTbAddressModel(
          order.receiver_info.state
        ).then(res => {
          console.log(1)
          result.receiveUserInfo.ProviceId = res.RegionId
          AliBaBaService.getTbAddressModel(
            order.receiver_info.city
          ).then(res => {
            console.log(2)
            result.receiveUserInfo.CityId = res.RegionId
            AliBaBaService.getTbAddressModel(
              order.receiver_info.town
            ).then(res => {
              console.log(3)
              result.receiveUserInfo.TownId = res.RegionId
            })
          })
        })
        resolve()
      })
      promise.then(() => console.log('1688拍单'))
    }
    return result
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
      case 3:
        return shotOrderPlatform.TaoBao
      case 4:
        return shotOrderPlatform.JingDong
      case 2:
        return shotOrderPlatform.HYJ
      case 5:
        return shotOrderPlatform.Alibaba
      case 8:
        return shotOrderPlatform.Alibaba
      case 10:
        return shotOrderPlatform.JingXi
      default:
        return shotOrderPlatform.PinDuoduo
    }
  }

  getGoodsIdByLink(url, platform) {
    console.log(url)
    if (platform == 8) {
      const regex = url.match('/(?<goodsId>[0-9]*?).html')
      const { goodsId } = regex.groups
      return goodsId
    } else {
      const goodsId = this.getQueryString(url, 'goods_id')
      if (goodsId) { return goodsId }
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
}
