/**
 * 海外仓出库订单
 */
export default class BroadDeliveryOrder {
  constructor(that) {
    this._this = that
  }
  // 海外仓出库订单：列表
  async getOutOfStockList(item) {
    try {
      const created_time = item.created_time ? `${this._this.$dayjs(item.created_time[0]).format('YYYY-MM-DD 00:00:00')}/${this._this.$dayjs(item.created_time[1]).format('YYYY-MM-DD 23:59:59')}` : ''
      const pamars = {
        wid: item.wid,
        oversea_order_sn: item.oversea_order_sn,
        logistic_no: item.logistic_no,
        created_time: created_time,
        status: item.status
      }
      const res = await this._this.getOutOfStockList(pamars)
      console.log(res)
    } catch (error) {
      return { code: -2, data: `getOutOfStockList-catch：${error}` }
    }
  }
}

