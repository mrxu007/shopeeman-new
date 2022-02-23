import cheerio from 'cheerio'

export default class orderDetail {
    $=undefined;
    constructor(htmlContent) {
      this.$ = cheerio.load(htmlContent)
    }
    /**
     * 获取订单id
     */
    getOrderId() {
      const orderSn = this.$('.state-fs18').html()
      return orderSn
    }
    /**
     * 获取买家信息
     */
    getBuyerInfo() {
      let name = ''; let address = ''
      const html = this.$
      this.$('.copyable').children('td [colspan="2"]').each(function(i, elem) {
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
      this.$('.order-information').eq(0).find('td[class="ordinf-td ordinf-td-w"]').eq(2).find('tr').each(function(i, elem) {
        const name = html(this).find('td').eq(0).text()
        let value = html(this).find('td').eq(1).text()
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
      const remark = this.$('.public-ftb').eq(1).text()
      return remark
    }
    /**
     * 检查详情数据是否获取成功
     */
    checkData() {

    }
}
