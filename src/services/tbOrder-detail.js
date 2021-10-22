import cheerio, { html } from 'cheerio'

export default class orderDetail {
  $ = undefined
  constructor(htmlContent) {
    // console.log(htmlContent);
    this.$ = cheerio.load(htmlContent)
  }
  /**
   * 获取订单详情
   */
  getInfo() {
    const html = this.$
    const obj = {
      receiverInfo: '',
      buyersChoose: '',
      logisticsCompany: '',
      platform_remark: ''
    }
    this.$('.logis-info .logis-infoul li')
      .children('span')
      .each(function(i) {
        const value = html(this).text()
        if (i == 0) {
          obj.receiverInfo = value.replace(/\s*/g, '')
        } else if (i == 1) {
          obj.buyersChoose = value.replace(/\s*/g, '')
        } else if (i == 2) {
          obj.logisticsCompany = value.replace(/\s*/g, '')
        } else {
          obj.platform_remark = value.replace(/\s*/g, '')
        }
      })
    return obj
  }
  getorderID() {
    const reg = /[1-9][0-9]*/g
    let orderID = this.$('.logis tbody').attr('id')
    if (orderID) {
      orderID = orderID.match(reg)[0]
    } else {
      console.log('登录信息失效')
    }
    return orderID
  }
  //   getOrderId() {
  //     //    const  orderSn=this.$(".state-fs18").html();
  //     const test = this.$('.logis-info .logis-infoul li label').text()
  //     let name = test.split('：')
  //     console.log(name)
  //     const test2 = this.$('.logis-info .logis-infoul li span').text()
  //     console.log(test)
  //     let value = test2.split(' ')
  //     console.log(value)
  //     var str_1 = test2.replace(/\s*/g, '')
  //     console.log(str_1)
  //     console.log(typeof test2)
  //     let html = this.$
  //     this.$('.logis-info .logis-infoul li')
  //       .children('span')
  //       .each(function(i, elem) {
  //         let val = html(this).text()
  //         if (i === 0) {
  //           console.log(val.replace(/^\s*|\s*$/g, ''))
  //         } else {
  //           console.log(val.replace(/\s*/g, ''))
  //         }
  //       })
  //     //    return orderSn;
  //   }

  /**
   * 获取买家信息
   */
  getBuyerInfo() {
    let name = ''
    let address = ''
    const html = this.$
    this.$('.copyable')
      .children('td [colspan="2"]')
      .each(function(i, elem) {
        const value = html(this).text()
        if (i == 0) {
          name = value
        } else if (i == 1) {
          address = value
        }
      })
    const mobile = this.$('#mobile').text()
    return { name: name, address: address, mobile: mobile }
  }
  /**
   * 获取支付信息
   */
  getPaymentInfo() {
    const result = []
    const html = this.$
    this.$('.order-information')
      .eq(0)
      .find('td[class="ordinf-td ordinf-td-w"]')
      .eq(2)
      .find('tr')
      .each(function(i, elem) {
        const name = html(this)
          .find('td')
          .eq(0)
          .text()
        let value = html(this)
          .find('td')
          .eq(1)
          .text()
        value = value.trim().replace('￥', '')
        result.push({ name: name, value: value })
      })
    return result
  }

  /**
   * 获取商家备注
   */
  getRemark() {
    const remark = this.$('#remark').text()
    return remark
  }
  /**
   * 获取买家留言
   */
  getBuyerRemark() {
    const remark = this.$('.public-ftb')
      .eq(1)
      .text()
    return remark
  }
  /**
   * 检查详情数据是否获取成功
   */
  checkData() {}
}
