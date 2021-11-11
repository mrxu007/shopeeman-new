import orderService from './order-service'
import jx from '../network/jx-request'
import api from '../network/jx-request'
import applicationConfig from '../services/application-config'
import JSEncrypt from 'jsencrypt'
import shopeemanService from '../services/shopeeman-service'

export default class {
  tbNetworkService = jx.tbRequest;
  $api = api;
  $shopeemanService = new shopeemanService()
  jdNetworkService = jx.jdRequest;
  jszNetworkService = jx.jxRequest
  isStop = false;
  mall = undefined;
  _this = null;
  pageSize = 40;
  orderService = new orderService();
  skuImageCache = {};
  syncStatus = undefined
  mallNo = ''
  upLoadType = ''
  constructor(mall, syncStatus, that, mallNo, upLoadType) {
    this.mall = mall,
    this._this = that
    this.syncStatus = syncStatus
    this.mallNo = mallNo
    this.upLoadType = upLoadType
  }
  //单个订单同步
  async startSingel(order){
    let params = {
      order_id: order.order_id,
      shop_id: order.shop_id
    }
    let res = await this.$shopeemanService.getDetailsSinger(order.country, params)
    if (res.code === 200) {
      let orderDetail = [res.data]
      await this.getOrderOtherInfo(orderDetail)
      await this.upLoadOrders(orderDetail)
      this._this.$parent.$refs.Logs.writeLog(`【${order.order_id}】订单同步成功`,true)
    }else{
      this._this.$parent.$refs.Logs.writeLog(`【${order.order_id}】订单同步失败${res.data}`,false)
    }
  }
  //手动同步||自动同步
  async start() {
    try {
      let params = {
        from_page_number: 1,
        source: this.syncStatus.value,
        page_size: this.pageSize,
        page_number: 1,
        total: 0,
        is_massship: false,
        shop_id: this.mall.platform_mall_id
      }
      let res = await this.$shopeemanService.getOrderIdList(this.mall.country, params)
      console.log(res, "res")
      if (res.code === 200) {
        let {
          orders,
          page_info
        } = res.data
        let orderDetailListCount = 0
        let orderDetailListFa = []
        while (orders.length) {
          //orderLen-a<5
          for (let a = 0; a < orders.length; a = a + 5) {
            let orderArr = orders.slice(a, a + 5)
            let resDetail = await this.$shopeemanService.getDetailsByOrderIds(this.mall.country, {
              orders: orderArr,
              shop_id: this.mall.platform_mall_id
            })
            console.log(resDetail, "resDetail")
            if (resDetail.code === 200) {
              let orderDetailList = resDetail.data && resDetail.data.orders || []
              orderDetailListFa = orderDetailListFa.concat(resDetail.data.orders)
              if (orderDetailList && orderDetailList.length) {
                //过滤不是今天的订单 new Date().getTime()-item.create_time*1000 < 1*24*60*60*1000
                let orderDetailListFilter = orderDetailList.filter(item=>{return new Date().getTime()-item.create_time*1000 > 1*24*60*60*1000})
                orderDetailListCount += orderDetailListFilter.length
                await this.getOrderOtherInfo(orderDetailListFilter)
                await this.upLoadOrders(orderDetailListFilter)
              }
            }
          }
          //自动翻页
          if (orders.length < 40) {
            orders = []
          } else {
            params.page_number++
            let pageUp = await this.$shopeemanService.getOrderIdList(this.mall.country, params)
            orders = pageUp && pageUp.data && pageUp.data.orders || []
          }
        }
        this._this.$parent.$refs.Logs.writeLog(`【${this.mallNo}】 店铺【${this.mall.platform_mall_name}【${this.syncStatus.label}】成功-【${orderDetailListCount}】条`, true)
      } else if (res.code === 403) {
        return this._this.$parent.$refs.Logs.writeLog(`【${this.mallNo}】 店铺【${this.mall.platform_mall_name}】未登录`, false)
      } else {
        return this._this.$parent.$refs.Logs.writeLog(`【${this.mallNo}】 店铺【${this.mall.platform_mall_name}${res.code}-${res.data}`, false)
      }
    } catch (e) {
      console.log(e)
      return this._this.$parent.$refs.Logs.writeLog(`【${this.mallNo}】 店铺【${this.mall.platform_mall_name}】同步失败`, false)
    }
  }

  async getOrderOtherInfo(orderDetailList) {
    for (let i = 0; i < orderDetailList.length; i++) {
      let order = orderDetailList[i]
      let params = {
        order_id: order.order_id,
        shop_id: this.mall.platform_mall_id
      }
      //3、获取订单交易记录
      let res3 = await this.$shopeemanService.getIncomeTransactionHistoryDetail(this.mall.country, params)
      console.log(res3, "res3")
      if (res3.code === 200) {
        order['transactionHistoryDetail'] = res3.data
      }
      //4、获取订单历史轨迹
      let res4 = await this.$shopeemanService.getOrdeTrackingHistory(this.mall.country, params)
      console.log(res4, "res4")
      if (res4.code === 200) {
        order['ordeTrackingHistory'] = res4.data
      }
      //5、获取物流轨迹的发货时间 
      let res5 = await this.$shopeemanService.getLogisticsTrackingHistory(this.mall.country, params)
      console.log(res5, "res5")
      if (res5.code === 200) {
        order['logisticsTrackingHistory'] = res5.data
      }
      console.log(order, "orderAll")
    }
  }
 
  //服务端检测订单
  async checkOrderUpload(orderDetailListFilter){

  }

  //订单上报
  async upLoadOrders(orderDetailListFilter) {
    for(let i=0;i<orderDetailListFilter.length;i++){
      //1、服务端检测订单
    }
    //1、服务端检测订单
    //2、上报
  }





  /**
   * 同步单个订单并上传服务器
   */
  // async tbsyncOrder(mall, orderItem) {
  //   console.log(orderItem)
  //   console.log(mall.id)
  //   const {
  //     id,
  //     buyer: {
  //       nick
  //     },
  //     statusInfo: {
  //       text
  //     },
  //     orderInfo: {
  //       createTime
  //     },
  //     payInfo: {
  //       postType,
  //       actualFee
  //     },
  //     subOrders
  //   } = orderItem
  //   let after_sale
  //   // 判断是否是售后
  //   subOrders.forEach(item => {
  //     if (item.operations) {
  //       const str = item.operations[0].text
  //       switch (str) {
  //         case (str.match(RegExp(/请卖家处理/)) || {}).input:
  //           after_sale = 1
  //           break
  //         case (str.match(RegExp(/退运保险/)) || {}).input:
  //           after_sale = 2
  //           break
  //         case (str.match(RegExp(/待退货/)) || {}).input:
  //           after_sale = 3
  //           break
  //         case (str.match(RegExp(/退款成功/)) || {}).input:
  //           after_sale = 4
  //           break
  //         default:
  //           after_sale = 1
  //       }
  //     } else {
  //       after_sale = 0
  //     }
  //   })
  //   const newtext = JSON.parse(
  //     JSON.stringify(text)
  //     .replace('全部', 1)
  //     .replace('等待买家付款', 2)
  //     .replace('买家已付款', 3)
  //     .replace('卖家已发货', 4)
  //     .replace('交易成功', 5)
  //     .replace('交易关闭', 6)
  //     .replace('待付款和待发货订单', 7)
  //     .replace('未完成的订单', 8)
  //     .replace('退款中的订单', 9)
  //     .replace('定金已付', 10)
  //     .replace('异常订单', 11)
  //     .replace('资金保护中', 11)
  //     .replace('部分发货', 11)
  //   )
  //   const isExist = await this.orderExist(orderItem.id, newtext)
  //   if (isExist && after_sale === 0) {
  //     return this.writeLog(`更新订单${id}成功`, true)
  //   }
  //   const order = {
  //     sys_mall_id: mall.id,
  //     order_id: id,
  //     main_order_sn: id,
  //     order_status: newtext,
  //     payment_method: 1,
  //     order_create_time: createTime,
  //     order_update_time: this.creatDate(),
  //     pay_time: createTime,
  //     promised_shipping_times: this.creatDate(2),
  //     total_amount: actualFee,
  //     // buyer_shipping_cost: postType.match(/\d+/g).join("."),
  //     buyer_shipping_cost: postType.match(/\d+/g)[0],
  //     // actual_total_shipping_cost: postType.match(/\d+/g).join("."),
  //     actual_total_shipping_cost: postType.match(/\d+/g)[0],
  //     platform_remark: '',
  //     order_after_sale: after_sale,
  //     seller_id: '0'
  //   }
  //   const goods_list = []
  //   for (let index = 0; index < subOrders.length; index++) {
  //     const {
  //       goodsID,
  //       skuPic
  //     } = await this.getGoodsID(mall, `https:${subOrders[index].itemInfo.itemUrl}`)
  //     if (!goodsID) {
  //       return this.writeLog(`同步【${id}】订单失败获取商品ID失败,店铺信息可能失效,请重新登录店铺 `, false)
  //     }
  //     const obj = {
  //       goods_id: goodsID,
  //       sku_id: subOrders[index].itemInfo.skuId.toString(),
  //       sku_name: JSON.stringify(subOrders[index].itemInfo.skuText),
  //       buyer_account: nick,
  //       goodCode: subOrders[index] ? .itemInfo ? .extra ? subOrders[index] ? .itemInfo ? .extra[0] ? .value ? ? '' : '',
  //       goods_title: subOrders[index].itemInfo.title,
  //       discounted_price: subOrders[index].priceInfo.realTotal,
  //       original_price: subOrders[index].priceInfo.realTotal,
  //       goods_count: subOrders[index].quantity,
  //       sku_img: `https:${skuPic}`,
  //       goods_url: `https:${subOrders[index].itemInfo.itemUrl}`
  //     }
  //     goods_list.push(obj)
  //   }
  //   order.goods_list = goods_list
  //   console.log(order)
  //   try {
  //     const url = '/api/order/sync'
  //     const {
  //       data
  //     } = await this.jszNetworkService.post(url, order)
  //     // const { data } = await this.$api.syncOrder(order)
  //   } catch (e) {
  //     this.writeLog(`同步【${id}】订单失败 错误原因:${e.response.data.data}.`, false)
  //     console.log(`同步【${id}】订单失败 错误原因:${e.response.data.data}.`, false)
  //   }
  // }
  /**
   * 检测订单是否已同步过
   * @param {number} orderId
   */
  async orderExist(orderId, status) {
    const userInfo = await new applicationConfig().getUserInfo()
    if (!userInfo) {
      return true
    }
    const url = `/api/order/checkExist?muid=${userInfo.muid}&orderSn=${orderId}&orderKey=${orderId}_${status}`
    // const param = `muid=${userInfo.muid}&orderSn=${orderId}&orderKey=${orderId}_${status}`
    // const params = { muid: userInfo.muid, orderSn: orderId, orderKey: `${orderId}_${status}` }
    // const response = this.$api.orderExist({ params })
    const response = await this.jszNetworkService.get(url)
    console.log(response, 'check order exist')
    console.log(response.data)
    return response && response.data && response.data.orderKey == `${orderId}_${status}`
  }
  async searchOrder(mall, formData, x5sec) {
    const url = 'https://trade.taobao.com/trade/itemlist/asyncSold.htm?event_submit_do_query=1&_input_charset=utf8&isFrame=true&from=tejia'
    const response = await this.jdNetworkService.post(url, formData, {
      headers: {
        x5sec,
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        cookies: mall.web_login_info,
        referer: 'https://trade.taobao.com/trade/itemlist/list_sold_items.htm?isFrame=true&from=tejia'
      }
    })
    console.log(response)
    if (response.status == 200 && response.data.mainOrders) {
      return response.data
    }
  }
  // 云采集获取订单列表x5
  async yflowsearchOrder(mall, orderparams) {
    console.log(mall)
    let response = null
    // const url = '/yflow/api/tbX5/tbOrder'
    // const params = {
    //   cookie: JSON.stringify(mall.web_login_info),
    //   needx5: '1'
    // }
    // // 获取云采集x5
    // const { data } = await this.tbNetworkService.post(url, params)
    // const x5sec = data.msg
    if (!this.onlineStatus) {
      this.writeLog(`${mall.platform_mall_name}店铺已掉线,请重新登录店铺`, false)
      return
    }
    if (this.isStop) {
      return
    }
    try {
      response = await this.yflowsearchNewOrder(mall, orderparams)
      console.log(response, '====>')
      const {
        page,
        mainOrders
      } = response
    } catch (err) {
      console.log(err)
      this.number++
      await this.delay(1500)
      if (this.number === 10) {
        return undefined
      } else {
        response = await this.yflowsearchOrder(mall, orderparams)
      }
    }
    return response
    // 获取x5成功 并且x5有效 更新cookie信息（存起来）
    // await this.updateCookie(mall, x5sec)
  }
  // 修改cookie
  async updateCookie(mall, x5sec) {
    const allCookie = JSON.parse(JSON.stringify(mall.web_login_info))
    const isexist = false
    allCookie.forEach(item => {
      if (item['Name'] === 'x5sec') {
        item['Value'] = x5sec
        this.isrepeat = true
      }
    })
    if (!isexist) {
      const cookie1 = mall.web_login_info[0]
      cookie1['Name'] = 'x5sec'
      cookie1['Value'] = x5sec
      allCookie.unshift(cookie1)
    }
    mall.web_login_info = allCookie
    this._this.$mallService.modify(mall)
    this.mall = await this._this.$mallService.getMallById(mall.id)
    return allCookie
  }
  // async yflowsearchOrder(mall, orderparams) {
  //   console.log(mall)
  //   const url = '/yflow/api/tbX5/tbOrder'
  //   const params = {
  //     cookie: JSON.stringify(mall.web_login_info),
  //     data: JSON.stringify(orderparams)
  //   }
  //   const { data } = await this.tbNetworkService.post(url, params)
  //   return JSON.parse(data.data)
  // }
  async yflowsearchNewOrder(mall, orderparams) {
    console.log(mall)
    const url = '/yflow/api/tbX5V1/tbOrder'
    const params = {
      cookie: JSON.stringify(mall.web_login_info),
      data: JSON.stringify(orderparams)
    }
    try {
      const {
        data
      } = await this.tbNetworkService.post(url, params)
      if (data.code === 505) {
        // data.data = 'cytKtANc:pass0MGOz@43.242.157.2:10229'
        this.writeLog(`${data.msg}`, false)
        const str = this.Rescrypte(data.data)
        await this.openidentifying(str, mall)
        return
      }
      if (data.code === 205) {
        this.onlineStatus = false
        return null
      }
      if (data.code === 0) {
        return JSON.parse(data.data)
      } else {
        return null
      }
    } catch {
      return null
    }
  }
  async openidentifying(IP, mall) {
    const info = this.splitIP(IP)
    const result = await this._this.$mallService.OpenMallAdminCode(mall, info.userName, info.password, info.host)
    if (result) {
      this.isStop = result.isStop
    }
    console.log(result)
  }
  // 获取当前时间
  creatDate(i = 0) {
    this.dateList = []
    const base = new Date()
    base.setTime(base.getTime() + 3600 * 1000 * 24 * i)
    let baseVal = [
      base.getFullYear(),
      base.getMonth() + 1,
      base.getDate() + ' '
    ].join('-')
    const aa = [base.getHours(), base.getMinutes(), base.getSeconds()].join(':')
    baseVal = baseVal.concat(aa)
    return baseVal
  }
  // 淘宝获取商品id
  async getGoodsID(mall, url) {
    const {
      data
    } = await this.jdNetworkService.get(url, {
      headers: {
        cookies: mall.web_login_info
      }
    })
    const str = data.toString()
    let skuPic
    const goodsID = str.match(/\\"itemId\\":([0-9]*)/) ? str.match(/\\"itemId\\":([0-9]*)/)[1] : ''
    let strs = data.toString().match(/JSON.parse\(('{.*}')\)/)
    console.log(strs)
    if (strs) {
      strs = strs[0]
      const StringData = eval(strs.replace(/^\"|\"$/g, ''))
      const cloendata = _.cloneDeep(StringData)
      console.log(cloendata)
      skuPic = cloendata.baseSnapDO.itemSnapDO.picSnapInfo.skuPic ? cloendata.baseSnapDO.itemSnapDO.picSnapInfo.skuPic : cloendata.baseSnapDO.itemSnapDO.picSnapInfo.masterMap
      console.log(skuPic)
    }
    return {
      goodsID,
      skuPic
    }
  }
  dateFormat(time, fmt) {
    var o = {
      'M+': time.getMonth() + 1, // 月份
      'd+': time.getDate(), // 日
      'h+': time.getHours(), // 小时
      'm+': time.getMinutes(), // 分
      's+': time.getSeconds(), // 秒
      'q+': Math.floor((time.getMonth() + 3) / 3), // 季度
      'S': time.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (time.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  }
  // 解密
  Rescrypte(str) {
    var decrypt = new JSEncrypt() // 创建解密对象实例
    // 之前ssl生成的秘钥
    var priKey = `-----BEGIN PRIVATE KEY-----
      MIICdQIBADANBgkqhkiG9w0BAQEFAASCAl8wggJbAgEAAoGBALE54PcnSK7/bwas
      iac4EFlsZjcyUS/xzEfP4q/PxVHOXXX5Qx16CVV4LY+tC2sbiufVReG4o+a30c5I
      rBfDVgIVw6N7Na6Mnab/VaCDlQuZ5MRa58mU4IlZBPTRIagYB/tmCj8M2VTzCYVl
      DBe84VZ+ngmaBcaFjhPgF9GY2RrpAgMBAAECgYBV+7K9tn15Ccyf/E28p2KnQARH
      e04QaMune6CLk84z5l9JwWlif7bPlMLmFhqYGIDIAZ0p6h767OwJnRCBZu/uu4Xi
      z2SQ7knxpdiDKa3pCW+DSwkpYyGVaDmfXYuoSbKkBlWZaRtg6Uif6W97/831vYSZ
      PWtmt7hX4GskVzUXEQJBAOjrJd5aPi+O8hAY/BH2nwa1VN3MbcIzA0fdYMILKWpP
      Qytdbsot5neTzYWKSjSfZTABuCWw9GKmqc+omZXvR78CQQDCyeIEwawMld96u56p
      U0yqLOrpP6aRsh/t7gfgPKzyXBVTr30Vo+lXFnIAz+vgGQ/HCiX2BFazUfPlk7vG
      zodXAkAt1umTAyut7HITXPdvCZxuk41qQWtwht2kbRs31T6HX6YWiMLfI31yFzKh
      j3/fL2eYtR3qvRK7v5U3+zSO35K9AkAJkUbzutuLhrUCX0LMyFWkqi4jpMe2skwV
      MLLcVb6c7N7zTFRVgsaMS4Lv/UZ1rGV0/k+dBNuJVUYoiZgYjL5jAkAFpn9ampO1
      NOGPXf6CKhMVbitkp0nPcFQVa/3KT1dprM4coC0vyfvnCQwfwxJuO8ZGQ8uRQgA9
      LqPzJgtnq0RI
      -----END PRIVATE KEY-----`
    decrypt.setPrivateKey(priKey) // 设置秘钥
    var uncrypted = decrypt.decrypt(str) // 解密之前拿公钥加密的内容
    console.log(uncrypted, '解密')
    return uncrypted
  }
  // 分割代理IP
  splitIP(IP) {
    if (IP) {
      const str = IP
      const arr = str.split('@')
      const obj = {
        userName: arr[0].split(':')[0],
        password: arr[0].split(':')[1],
        host: arr[1]
      }
      return obj
    } else {
      return ''
    }
  }
  /**
   * 暂停n毫秒后返回
   */
  async delay(time) {
    return new Promise((resolve) => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
}