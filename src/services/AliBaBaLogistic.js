import cheerio, { html } from 'cheerio'

export default class orderDetail {
  $ = undefined
  constructor(htmlContent) {
    this.$ = cheerio.load(htmlContent)
  }
  /**
   * 获取订单详情
   */
  getInfo() {
    const html = this.$
    const obj = {
      trackingNumber: '',
      logisticsCompany: '',
      sendTime: '',
      trackingID: ''
    }
    this.$('.info-list .info-item')
      .children('.val')
      .each(function(i) {
        const value = html(this).text()
        switch (i) {
          case 0: {
            return (obj.trackingNumber = value)
          }
          case 1: {
            return (obj.logisticsCompany = value)
          }
          case 2: {
            return (obj.sendTime = value)
          }
          case 3: {
            return (obj.trackingID = value)
          }
        }
      })
    return obj
  }
}
