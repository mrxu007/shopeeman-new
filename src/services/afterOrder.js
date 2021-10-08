import jxRequest from '../network/jx-request'

export default class {
  jdNetworkService = jxRequest.jdRequest
  jszNetworkService = jxRequest.jxRequest
  exportafterOrder = jxRequest.exportafterOrder
  mall = undefined
  disputes = []
  disputeData = null
  disputePagination = null
  disputeCommon = null
  disputeSignature = null
  disputeHierarchy = null
  writeLog = undefined
  constructor(mall, logCallback) {
    this.mall = mall
    this.writeLog = logCallback
  }

  async start(isForce = false) {
    this.getRefundList(this.mall)
  }
  /**
   * 同步单个订单并上传服务器
   */
  async tbsyncOrder(mall, orderItem) {
    console.log(orderItem)
    console.log(mall.id)
    const {
      id,
      statusInfo: { text },
      orderInfo: { createTime },
      payInfo: { postType, actualFee },
      subOrders
    } = orderItem
    let after_sale
    //判断是否是售后
    subOrders.forEach(item => {
      if (item.operations) {
        let str = item.operations[0].text
        switch (str) {
          case (str.match(RegExp(/请卖家处理/)) || {}).input:
            return (after_sale = 1)
            break
          case (str.match(RegExp(/退运保险/)) || {}).input:
            return (after_sale = 2)
            break
          default:
            return (after_sale = 1)
        }
      } else {
        after_sale = 0
      }
    })
    let newtext = JSON.parse(
      JSON.stringify(text)
        .replace('全部', 1)
        .replace('等待买家付款', 2)
        .replace('买家已付款', 3)
        .replace('卖家已发货', 4)
        .replace('交易成功', 5)
        .replace('交易关闭', 6)
        .replace('待付款和待发货订单', 7)
        .replace('未完成的订单', 8)
        .replace('退款中的订单', 9)
        .replace('定金已付', 10)
        .replace('异常订单', 11)
    )
    let order = {
      sys_mall_id: mall.id,
      order_id: id,
      main_order_sn: id,
      order_status: newtext,
      payment_method: 1,
      order_create_time: createTime,
      order_update_time: this.creatDate(),
      pay_time: createTime,
      promised_shipping_times: this.creatDate(2),
      total_amount: actualFee,
      // buyer_shipping_cost: postType.match(/\d+/g).join("."),
      buyer_shipping_cost: postType.match(/\d+/g)[0],
      // actual_total_shipping_cost: postType.match(/\d+/g).join("."),
      actual_total_shipping_cost: postType.match(/\d+/g)[0],
      platform_remark: '',
      order_after_sale: after_sale,
      seller_id: '0'
    }
    let goods_list = []
    for (let index = 0; index < subOrders.length; index++) {
      let { goodsID, skuPic } = await this.getGoodsID(
        mall,
        `https:${subOrders[index].itemInfo.itemUrl}`
      )
      let obj = {
        goods_id: goodsID,
        sku_id: subOrders[index].itemInfo.skuId.toString(),
        sku_name: JSON.stringify(subOrders[index].itemInfo.skuText),
        goods_title: subOrders[index].itemInfo.title,
        discounted_price: subOrders[index].priceInfo.realTotal,
        original_price: subOrders[index].priceInfo.realTotal,
        goods_count: subOrders[index].quantity,
        sku_img: `https:${skuPic}`,
        goods_url: `https:${subOrders[index].itemInfo.itemUrl}`
      }
      goods_list.push(obj)
    }
    order.goods_list = goods_list
    console.log(order)
    try {
      let url = '/api/tbtj/order/sync'
      const { data } = await this.jszNetworkService.post(url, order)
    } catch (e) {
      console.log(
        `同步【${id}】订单失败 错误原因:${e.response.data.data}.`,
        false
      )
    }
  }
  //获取当前时间
  creatDate(i = 0) {
    this.dateList = []
    let base = new Date()
    base.setTime(base.getTime() + 3600 * 1000 * 24 * i)
    let baseVal = [
      base.getFullYear(),
      base.getMonth() + 1,
      base.getDate() + ' '
    ].join('-')
    let aa = [base.getHours(), base.getMinutes(), base.getSeconds()].join(':')
    baseVal = baseVal.concat(aa)
    return baseVal
  }
  //淘宝获取商品id
  async getGoodsID(mall, url) {
    const { data } = await this.jdNetworkService.get(url, {
      headers: {
        cookies: mall.web_login_info
      }
    })
    let str = data.toString()
    let skuPic
    let goodsID = str.match(/\\"itemId\\":([0-9]*)/)
      ? str.match(/\\"itemId\\":([0-9]*)/)[1]
      : ''
    let strs = data.toString().match(/JSON.parse\(('{.*}')\)/)
    console.log(strs)
    if (strs) {
      strs = strs[0]
      let StringData = eval(strs.replace(/^\"|\"$/g, ''))
      let cloendata = _.cloneDeep(StringData)
      console.log(cloendata)
      skuPic = cloendata.baseSnapDO.itemSnapDO.picSnapInfo.skuPic
        ? cloendata.baseSnapDO.itemSnapDO.picSnapInfo.skuPic
        : cloendata.baseSnapDO.itemSnapDO.picSnapInfo.masterMap
      console.log(skuPic)
    }
    return { goodsID, skuPic }
  }
  dateFormat(time, fmt) {
    var o = {
      'M+': time.getMonth() + 1, //月份
      'd+': time.getDate(), //日
      'h+': time.getHours(), //小时
      'm+': time.getMinutes(), //分
      's+': time.getSeconds(), //秒
      'q+': Math.floor((time.getMonth() + 3) / 3), //季度
      S: time.getMilliseconds() //毫秒
    }
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(
        RegExp.$1,
        (time.getFullYear() + '').substr(4 - RegExp.$1.length)
      )
    for (var k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(
          RegExp.$1,
          RegExp.$1.length == 1
            ? o[k]
            : ('00' + o[k]).substr(('' + o[k]).length)
        )
      }
    }
    return fmt
  }
  getRefundList(mall) {
    let url =
      'https://refund2.taobao.com/dispute/sellerDisputeList.htm?type=1&showFrame=false'
    this.jdNetworkService
      .get(url, {
        headers: {
          isGBK: false,
          cookies: mall.web_login_info
        }
      })
      .then(response => {
        let page = 1
        let regx = response.data.match(/var disputeData.*/)
        if (regx) {
          let disputeData = JSON.parse(
            regx[0].substring(18, regx[0].length - 1)
          )
          console.log(disputeData)
          // return
          this.disputeHierarchy = disputeData.hierarchy
          this.procDisputeData(disputeData, page, mall).then(async () => {
            // if (!this.disputePagination) return
            page = parseInt(this.disputePagination.defaultCurrent)
            let pageSize = parseInt(this.disputePagination.defaultPageSize)
            let total = parseInt(this.disputePagination.total)
            let totalPages = Math.ceil(total / pageSize)
            for (page; page < totalPages; ) {
              await (async () => {
                return new Promise(async (resolve, reject) => {
                  // await sleepES6(500)
                  await this.getRefundPages(page + 1, mall)
                    .then(async disp => {
                      await this.procDisputeData(disp, page + 1, mall).then(
                        () => {
                          resolve()
                        }
                      )
                    })
                    .catch(err => {
                      console.log(err)
                      reject(err)
                    })
                })
              })(page)
                .then(() => {
                  page++
                })
                .catch(err => {
                  console.log(err)
                  page++
                })
            }
          })
          console.log(disputeData)
        }
      })
      .catch(err => {
        console.log(err)
      })
  }
  async getRefundPages(page, mall) {
    return new Promise((resolve, reject) => {
      let url =
        // 'https://refund2.taobao.com/dispute/sellerDisputeList.htm?type=1&showFrame=false'
        'https://refund2.taobao.com/dispute/adjust/adjustSellerList.json'
      this.disputeData.data.listPagination_1.fields.defaultCurrent = page.toString()
      let postData = {
        operator: 'listPagination_1',
        data: this.disputeData.data,
        linkage: {
          common: {
            compress: this.disputeCommon.compress,
            queryParams: this.disputeCommon.queryParams,
            validateParams: this.disputeCommon.validateParams
          },
          signature: this.disputeSignature
        },
        hierarchy: this.disputeHierarchy
      }
      let _tb_token_
      mall.web_login_info.forEach(item => {
        if (item.Name === '_tb_token_') {
          _tb_token_ = item.Value
        }
      })
      this.jdNetworkService
        .post(
          url,
          { _tb_token_, data: postData },
          {
            headers: {
              isGBK: false,
              cookies: mall.web_login_info,
              'Content-Type': 'application/x-www-form-urlencoded',
              urlencoded: false,
              accept: 'application/json',
              authority: 'refund2.taobao.com',
              Host: 'refund2.taobao.com',
              origin: 'https://refund2.taobao.com',
              accept: 'application/json, text/plain, */*',
              'content-type': 'application/x-www-form-urlencoded',
              'sec-fetch-site': 'same-origin',
              'sec-fetch-mode': 'cors',
              'sec-fetch-dest': 'empty',
              'accept-encoding': 'gzip, deflate, br',
              'accept-language': 'zh-CN,zh;q=0.9,en;q=0.8',
              referer:
                'https://refund2.taobao.com/dispute/sellerDisputeList.htm?type=1&showFrame=false'
            }
          }
        )
        .then(response => {
          if (response.data.success) {
            let disputeData = response.data.resultData
            // console.log(disputeData)
            resolve(disputeData)
          } else {
            reject(new Error('NETWORK_ERROR'))
          }
        })
        .catch(err => {
          console.log(err)
          reject(err)
        })
    })
  }
  async procDisputeData(disputeData, page, mall) {
    // return new Promise((resolve, reject) => {
    this.disputeData = disputeData
    let pagination = null
    if (disputeData.data && disputeData.data.listPagination_1) {
      pagination = disputeData.data.listPagination_1.fields
      this.disputePagination = pagination
    } else {
      console.log(pagination)
      pagination = {
        total: '20',
        defaultPageSize: '20',
        jumpToTop: 'true',
        defaultCurrent: `${page}`,
        simple: '',
        showQuickJumper: 'true'
      }
      this.disputePagination = pagination
    }
    // this.disputePagination = disputeData.data.listPagination_1.fields
    let newdisputes = []
    let newArry = []
    Object.keys(disputeData.data).forEach(item => {
      newArry.push(item)
    })
    let gridItems = disputeData.linkage.input
    console.log(newArry, 'newArry')
    let listIndex = -1
    console.log(this.disputes, '测试')
    newArry.forEach((name, index) => {
      // if (name.indexOf('ListGrid') >= -1) {
      let dispute = disputeData.data[name]
      let id = dispute.id.split('@')[0]
      let exist = this.disputes.filter(item => {
        return item.id === 'page' + '_' + id
      })[0]
      if (dispute.bizName === 'disputeBody') {
        listIndex++
        newdisputes.push({
          sys_mall_id: mall.id,
          after_id: id,
          refund_amount: dispute.fields.options[1].title.name,
          after_ship_status: dispute.fields.options[5].title.name,
          after_reason: dispute.fields.options[3].title.name,
          order_after_status: dispute.fields.options[6].title.name,
          after_created_time: dispute.fields.options[2].title.name
          // type: dispute.fields.options[2].title.name,
          // imgURl: dispute.fields.itemInfo.imgURl,
          // after_reason: dispute.fields.options[3].title.name,
          // after_ship_status: dispute.fields.options[5].title.name,
          // order_after_status: dispute.fields.options[6].title.name,
          // sku: dispute.fields.itemInfo.sku,
          // title: dispute.fields.itemInfo.title,
          // linkUrl: dispute.fields.itemInfo.linkUrl
        })
        if (newdisputes[listIndex]) {
          newArry.forEach(item => {
            let disputes = disputeData.data[item]
            if (
              item ===
              `sellerGridHeaderContainer_${newdisputes[listIndex].after_id}`
            ) {
              newdisputes[listIndex].order_id = disputes.fields.numbers[2].value
              newdisputes[listIndex].main_order_sn =
                disputes.fields.numbers[2].value
              newdisputes[listIndex].after_nick_name = disputes.fields.shop.name
              newdisputes[listIndex].order_after_type =
                disputes.fields.numbers[0].title
            }
          })
        }
      }
      // }
    })
    this.disputeCommon = disputeData.linkage.common
    this.disputeSignature = disputeData.linkage.signature
    this.disputes = this.disputes.concat(newdisputes)
    console.log(newdisputes)
    console.log(this.disputes)
    this.writeLog(
      `正在同步售后订单【${mall.platform_mall_name},第${page}页,共有${newdisputes.length}条数据`
    )
    let syncCount = 0
    for (let index = 0; index < newdisputes.length; index++) {
      syncCount++
      const orderItem = newdisputes[index]
      await this.tbsyncOrder(mall, orderItem)
      this.writeLog(
        `正在同步售后订单【${syncCount}/${newdisputes.length}】【${orderItem.main_order_sn}】`
      )
    }
    this.writeLog(`【${mall.platform_mall_name}】,第${page}页,同步完成`)
    // resolve()
    // }).then(() => {
    //   if (page + 1 > parseInt(this.disputePagination.defaultCurrent)) {
    //     this.total = this.disputes.length
    //     console.log(123456465)
    //   }
    // })
  }
  async tbsyncOrder(mall, orderItem) {
    const {
      sys_mall_id,
      after_id,
      refund_amount,
      after_ship_status,
      after_reason,
      order_after_status,
      order_id,
      main_order_sn,
      after_nick_name,
      order_after_type,
      after_created_time
    } = orderItem
    let status = this.orderafterStatus(order_after_status)
    let order = {
      sys_mall_id,
      order_id,
      after_id,
      main_order_sn,
      after_created_time,
      after_updated_time: this.creatDate(),
      after_last_created_time: this.creatDate(),
      refund_amount: refund_amount.substring(1),
      after_nick_name,
      after_ship_status: after_ship_status
        .replace(/已发货/g, 2)
        .replace(/已收货/g, 2)
        .replace(/未发货/g, 1) //发货状态
        .replace(/已经退货/g, 3),
      after_reason: after_reason,
      after_reason_type: this.afterReason(after_reason),
      order_after_sale: 1,
      order_after_status: status, //售后状态
      order_after_type: orderItem.order_after_type
        .replace(/\(售中\)/g, 2)
        .replace(/\(售后\)/g, 3) //售后类型
    }
    try {
      const { data } = await this.exportafterOrder(order)
    } catch (e) {
      this.writeLog(
        `同步【${main_order_sn}】订单失败 错误原因:${e.response.data.data}.`,
        false
      )
    }
  }
  //判断售后状态
  orderafterStatus(str) {
    switch (str) {
      case (str.match(RegExp(/进行中的订单/)) || {}).input:
        return (status = 2)
        break
      case (str.match(RegExp(/退款待处理/)) || {}).input:
        return (status = 3)
        break
      case (str.match(RegExp(/已拒绝退款/)) || {}).input:
        return (status = 4)
        break
      case (str.match(RegExp(/待买家发货/)) || {}).input:
        return (status = 5)
        break
      case (str.match(RegExp(/待商家收货/)) || {}).input:
        return (status = 6)
        break
      case (str.match(RegExp(/退款关闭/)) || {}).input:
        return (status = 7)
        break
      case (str.match(RegExp(/退款成功/)) || {}).input:
        return (status = 8)
        break
      case (str.match(RegExp(/退款完结/)) || {}).input:
        return (status = 9)
        break
      default:
        return (status = 1)
    }
  }
  //判断售后原因
  afterReason(str) {
    console.log(str)
    let array = new Map([
      ['全部', 0],
      ['大小尺寸不符', 1],
      ['主商品破损', 2],
      ['材质面料不符', 3],
      ['配件破损', 4],
      ['质量问题', 5],
      ['商品信息描述不符', 6],
      ['商品破损少件等', 7],
      ['其他', 8],
      ['拍错/多拍', 9],
      ['假货问题', 10],
      ['卖家发错货', 11],
      ['做工问题', 12],
      ['移动电源故障', 13],
      ['资费问题', 14],
      ['屏幕问题', 15],
      ['性能故障', 16],
      ['发货问题', 17],
      ['配件问题', 18],
      ['发票问题', 19],
      ['功能缺失', 20],
      ['卖家服务问题', 21],
      ['CPU问题', 22],
      ['硬盘问题', 23],
      ['兼容性问题', 24],
      ['效果问题', 25],
      ['软件问题', 26],
      ['部件问题', 27],
      ['容量/参数与描述不符', 28],
      ['认为是二手/翻新', 29],
      ['开关机问题', 30],
      ['信号问题', 31],
      ['驱动问题', 32],
      ['充电问题', 33],
      ['宠物活体传染性疾病/死亡', 34],
      ['体型外貌不符', 35],
      ['品种不符', 36],
      ['款式颜色不符', 37],
      ['摩托车整车问题', 38],
      ['出版社/年份/版本与描述不符', 39],
      ['印刷问题', 40],
      ['物流问题', 41],
      ['年份/产权不符', 42],
      ['功能不符', 43],
      ['虚假发货', 44],
      ['快递问题', 45],
      ['空包裹/少货', 46],
      ['未按约定时间发货', 47],
      ['协商一致退款', 48],
      ['退货纠纷', 49],
      ['食物变质', 50],
      ['三无产品', 51],
      ['生产保质期不符', 52],
      ['水果腐烂/水产死亡', 53],
      ['退运费', 54],
      ['使用后过敏', 55],
      ['香味等与描述不符', 56],
      ['奶粉爆罐/扁罐', 57],
      ['褪色/缩水/起球', 58],
      ['镜片度数不符', 59],
      ['拍错/不喜欢', 60],
      ['卖家承诺问题', 61],
      ['安装质量问题', 62],
      ['充值未到账', 63],
      ['未查看卡密', 64],
      ['未收到货', 65],
      ['期限/流量不符', 66],
      ['卡已被使用', 67],
      ['少货', 68],
      ['因卖家原因被官方罚没', 69],
      ['不可抗拒因素', 70],
      ['部分完成代练', 71],
      ['缺货', 72],
      ['账号/装备被卖家找回', 73],
      ['商品数量不足', 74],
      ['签证问题', 75],
      ['退房/提前退房', 76],
      ['售后服务', 77],
      ['服务未收到', 78],
      ['服务不满意', 79],
      ['退货无忧', 80],
      ['商品丢失', 81],
      ['货物破损已拒签', 82],
      ['地址填写错误', 83],
      ['商家无法配送，联系我取消', 84],
      ['商家缺货/打烊，联系我取消', 85],
      ['配送时间太长', 86],
      ['骑手提前点确认送达', 87],
      ['骑手送错订单', 88],
      ['未按约定时间送达', 89],
      ['未履约送货入户承诺', 90],
      ['包裹破损', 91],
      ['包裹丢失', 92],
      ['包裹少件/漏发', 93],
      ['包裹错发', 94],
      ['包裹派送时效', 95],
      ['包裹入库时效', 96],
      ['包裹运费争议', 97],
      ['包裹超大/超重', 98],
      ['包裹内含禁运品', 99],
      ['空包裹/少货', 100],
      ['商品信息描述不符', 101],
      ['大小尺寸不符', 102],
      ['商品破损少件等', 103],
      ['商品信息描述不符', 104],
      ['卖家发错货', 105],
      ['大小尺寸不符', 106],
      ['退货无忧', 107],
      ['商品破损少件等', 108],
      ['卖家发错货', 109],
      ['质量问题', 110],
      ['材质面料不符', 111],
      ['快递问题', 112],
      ['未按约定时间发货', 113],
      ['虚假发货', 114],
      ['拍错/多拍', 115],
      ['假货问题', 116],
      ['买卖双方协商一致退款', 117],
      ['缺货', 118],
      ['未按约定时间发货', 119],
      ['功能不符', 120],
      ['地址/电话信息填写错误', 121],
      ['没用/少用优惠', 122],
      ['交易风险', 123],
      ['商品拍错', 124],
      ['送达时间过早/过晚', 125],
      ['服用后不良反应', 126],
      ['未按约定时间送达', 127],
      ['快递/物流无跟踪记录', 128],
      ['快递/物流一直未送到', 129],
      ['不喜欢/不想要', 130],
      ['我不想要了', 131],
      ['订单信息拍错（规格/尺码/颜色等', 132],
      ['包装/商品破损/污渍/裂痕/变形', 133],
      ['7天无理由退换货', 134]
    ])
    let matchvalue = array.get(str)
    if (!matchvalue) {
      return 0
    }
    return matchvalue
  }
  //打印日志
  writeLog(msg, success = true) {
    if (!msg) return
    const color = success ? 'green' : 'red'
    const time = this.dateFormat(new Date(Date.now()), 'hh:mm:ss')
    this.log = `<p style="color:${color}">${time}:${msg}</p>` + this.log
  }
  /**
   * 暂停n毫秒后返回
   */
  async delay(time) {
    return new Promise(resolve => {
      const timeId = setTimeout(() => {
        clearTimeout(timeId)
        resolve(true)
      }, time)
    })
  }
}
