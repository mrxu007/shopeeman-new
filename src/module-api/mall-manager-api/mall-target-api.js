
class MallTargetApi {
  constructor(that) {
    this._this = that
  }

  async theQuarterPoint(mallInfo, api) {
    try {
      const { platform_mall_id, country } = mallInfo
      const params = { 'mallId': platform_mall_id }
      let res = await this._this.$shopeemanService.getChinese(country, api, params)
      res = JSON.parse(res)
      debugger
      if (res.status === 200) {
        return { code: 200, data: { totalPoints: JSON.parse(res.data)?.data?.totalPoints || 0 } }// 本季度计分
      }
      return { code: res.status, data: res.statusText }
    } catch (e) {
      return { code: -2, data: `theQuarterPoint-catch: ${e}` }
    }
  }
  async getShopPerformance(mallInfo, api) {
    try {
      const { platform_mall_id, country, platform_mall_name } = mallInfo
      const params = { 'mallId': platform_mall_id }
      let res = await this._this.$shopeemanService.getChinese(country, api, params)
      debugger
      res = JSON.parse(res)
      if (res.status === 200) {
        const { listingViolations, fulFillMent, customerService, customerSatisfaction } = JSON.parse(res.data).data
        const data = {}
        data['buyer_satisfaction'] = customerSatisfaction[0].my === null ? null : customerSatisfaction[0].my// 买家满意度

        data['non_performance_rate'] = fulFillMent[0].my === null ? null : fulFillMent[0].my / 10000 // 不履行率
        data['cancel_rate'] = fulFillMent[0].children[0].my === null ? null : fulFillMent[0].children[0].my / 10000 // 取消率
        data['return_rate'] = fulFillMent[0].children[1].my// 退货/退款率
        data['delay_rate'] = fulFillMent[1].my === null ? null : fulFillMent[1].my / 10000 // 延迟发货率
        data['ready_time'] = fulFillMent[2].my// 准备时间

        data['serious_listing_violations'] = listingViolations[0].my// 严重的上市违规
        data['email_num'] = listingViolations[0].children[0].my// 垃圾邮件列表
        data['knowledge_Protect'] = listingViolations[0].children[1].my// 假冒/知识产权侵权
        data['lawless_goods'] = listingViolations[0].children[2].my// 违禁物品
        data['pre_order_list'] = listingViolations[1].children[0].my// 预购清单%
        data['violation_days'] = listingViolations[1].children[0].my// 违反预订单的天数
        data['other_error'] = listingViolations[2].my // 其他上市违规

        data['response_speed'] = customerService[0].my// 反映速度
        data['response_time'] = customerService[1].my// 响应时间

        data['buyer_satisfaction_last'] = customerSatisfaction[0].lastPeriod// 上期买家满意度

        data['non_performance_rate_last'] = fulFillMent[0].lastPeriod === null ? null : fulFillMent[0].lastPeriod / 10000 // 上期不履行率
        data['cancel_rate_last'] = fulFillMent[0].children[0].lastPeriod === null ? null : fulFillMent[0].children[0].lastPeriod / 10000 // 上期取消率
        data['return_rate_last'] = fulFillMent[0].children[1].lastPeriod === null ? null : fulFillMent[0].children[1].lastPeriod / 10000 // 上期退货/退款率
        data['delay_rate_last'] = fulFillMent[1].lastPeriod === null ? null : fulFillMent[1].lastPeriod / 10000 // 上期延迟发货率
        data['ready_time_last'] = fulFillMent[2].lastPeriod// 上期准备时间

        data['serious_listing_violations_last'] = listingViolations[0].lastPeriod// 上期严重的上市违规
        data['email_num_last'] = listingViolations[0].children[0].lastPeriod// 上期垃圾邮件列表
        data['knowledge_Protect_last'] = listingViolations[0].children[1].lastPeriod// 上期假冒/知识产权侵权
        data['lawless_goods_last'] = listingViolations[0].children[2].lastPeriod// 上期违禁物品
        data['pre_order_list_last'] = listingViolations[1].children[0].lastPeriod// 上期预购清单%
        data['violation_days_last'] = listingViolations[1].children[0].lastPeriod// 上期违反预订单的天数
        data['other_error_last'] = listingViolations[2].lastPeriod// 上期其他上市违规

        data['response_speed_last'] = customerService[0].lastPeriod// 上期反映速度
        data['response_time_last'] = customerService[1].lastPeriod// 上期响应时间

        data['MallName'] = platform_mall_name
        data['MallId'] = platform_mall_id
        data['SiteStr'] = country
        data['Site'] = country
        return { code: 200, data }
      }
      return { code: res.status, data: res.statusText }
    } catch (e) {
      return { code: -2, data: `theQuarterPoint-catch: ${e}` }
    }
  }
}

export {
  MallTargetApi
}
