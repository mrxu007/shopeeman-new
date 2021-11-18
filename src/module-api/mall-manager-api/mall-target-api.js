
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
      if (res.status === 200) {
        return { code: 200, data: { totalPoints: JSON.parse(res.data)?.data?.totalPoints || 0 }}// 本季度计分
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
      res = JSON.parse(res)
      console.log('getShopPerformance', res)
      if (res.status === 200) {
        const { listingViolations, fulFillMent, customerService, customerSatisfaction } = JSON.parse(res.data).data
        const data = {}
        data['buyer_satisfaction'] = customerSatisfaction[0].my === null ? null : customerSatisfaction[0].my// 买家满意度

        // data['non_performance_rate'] = fulFillMent[0].my === null ? null : fulFillMent[0].my / 10000 // 不履行率
        data['non_performance_rate'] = fulFillMent[0].my === null ? null : (fulFillMent[0].my / 10000).toFixed(2) // 不履行率
        // data['cancel_rate'] = fulFillMent[0].children[0].my === null ? null : fulFillMent[0].children[0].my / 10000 // 取消率
        data['cancel_rate'] = fulFillMent[0].children[0].my === null ? null : (fulFillMent[0].children[0].my / 10000).toFixed(2) // 取消率
        data['return_rate'] = fulFillMent[0].children[1].my// 退货/退款率
        data['delay_rate'] = fulFillMent[1].my === null ? null : fulFillMent[1].my / 10000 // 延迟发货率
        data['ready_time'] = fulFillMent[2].my// 准备时间

        data['serious_listing_violations'] = listingViolations[0].my// 严重的上市违规
        data['email_num'] = listingViolations[0].children[0].my// 垃圾邮件列表
        data['knowledge_Protect'] = listingViolations[0].children[1].my// 假冒/知识产权侵权
        data['lawless_goods'] = listingViolations[0].children[2].my// 违禁物品
        data['pre_order_list'] = listingViolations[1].children[0].my// 预购清单%
        data['violation_days'] = listingViolations[1].children[0].LastPeriod// 违反预订单的天数
        data['other_error'] = listingViolations[2].my // 其他上市违规

        data['response_speed'] = customerService[0].my// 反映速度
        data['response_time'] = customerService[1].my// 响应时间

        data['buyer_satisfaction_last'] = customerSatisfaction[0].lastPeriod// 上期买家满意度

        // data['non_performance_rate_last'] = fulFillMent[0].lastPeriod === null ? null : fulFillMent[0].lastPeriod / 10000 // 上期不履行率
        data['non_performance_rate_last'] = fulFillMent[0].lastPeriod === null ? null : (fulFillMent[0].lastPeriod / 10000).toFixed(2) // 上期不履行率
        data['cancel_rate_last'] = fulFillMent[0].children[0].lastPeriod === null ? null : (fulFillMent[0].children[0].lastPeriod / 10000).toFixed(2) // 上期取消率
        data['return_rate_last'] = fulFillMent[0].children[1].lastPeriod === null ? null : (fulFillMent[0].children[1].lastPeriod / 10000).toFixed(2) // 上期退货/退款率
        data['delay_rate_last'] = fulFillMent[1].lastPeriod === null ? null : (fulFillMent[1].lastPeriod / 10000).toFixed(2) // 上期延迟发货率
        data['ready_time_last'] = fulFillMent[2].lastPeriod// 上期准备时间

        data['serious_listing_violations_last'] = listingViolations[0].lastPeriod// 上期严重的上市违规
        data['email_num_last'] = listingViolations[0].children[0].lastPeriod// 上期垃圾邮件列表
        data['knowledge_Protect_last'] = listingViolations[0].children[1].lastPeriod// 上期假冒/知识产权侵权
        data['lawless_goods_last'] = listingViolations[0].children[2].lastPeriod// 上期违禁物品
        data['pre_order_list_last'] = listingViolations[1].lastPeriod// 上期预购清单%
        data['violation_days_last'] = listingViolations[1].children[0].lastPeriod// 上期违反预订单的天数
        data['other_error_last'] = listingViolations[2].lastPeriod// 上期其他上市违规

        data['response_speed_last'] = customerService[0].lastPeriod// 上期反映速度
        data['response_time_last'] = customerService[1].lastPeriod// 上期响应时间

        data['MallName'] = platform_mall_name
        data['MallId'] = platform_mall_id
        data['SiteStr'] = country
        data['Site'] = country

        // 补充
        data['BuyerSatisfactionPoint'] = customerSatisfaction[0].Point // 买家满意度计分
        data['UnOrderRatePoint'] = fulFillMent[0].point// 订单未完成率计分
        data['CancellOrderRatePoint'] = fulFillMent[0].children[0].point// 订单取消率计分
        data['ReturnOrRefundRatePoint'] = fulFillMent[0].children[1].point// 订单退货/退款率计分
        data['OverTimeDeliveryRatePoint'] = fulFillMent[1].point// 订单逾期出货率计分
        data['ViolatingGoodsPoint'] = listingViolations[0].Point // 严重违规商品数计分
        data['JunkGoodsPoint'] = listingViolations[0].children[0].Point // 垃圾商品计分
        data['CounterfeitGoodsPoint'] = listingViolations[0].children[1].Point// 仿冒品或者侵权商品计分
        data['ProhibitedGoodsPoint'] = listingViolations[0].children[2].Point// 违禁商品计分
        data['PreOrderedGoodsRatePoint'] = listingViolations[1].Point ? (Number(listingViolations[1].Point) / 10000).toFixed(2) + '%' : ''// 预购商品的%计分（除以10000，保留2位
        data['PreOrderedOverTargetPoint'] = listingViolations[1].children[0].Point// 预购商品的天数%超过目标计分
        data['OtherViolatingGoodsPoint'] = listingViolations[2].Point// 违反其它上架规范计分
        data['ChatResponsePoint'] = customerService[0].Point// 聊天回应计分
        data['ResponseSpeedPoint'] = customerService[1].Point // 回应速度计分

        data['BuyerSatisfactionMetricId'] = customerSatisfaction[0].metricId// 买家满意度的MetricId
        data['UnOrderRateMetricId'] = fulFillMent[0].metricId // 订单未完成率的MetricId
        data['CancellOrderRateMetricId'] = fulFillMent[0].children[0].metricId// 订单取消率的MetricId
        data['ReturnOrRefundRateMetricId'] = fulFillMent[0].children[1].metricId // 退货/退款率的MetricId
        data['OverTimeDeliveryRateMetricId'] = fulFillMent[1].metricId// 逾期出货的MetricId
        data['PrepareTimeMetricId'] = fulFillMent[2].metricId// 订单准备时间的MetricId
        data['ViolatingGoodsMetricId'] = listingViolations[0].metricId // 严重违规商品的MetricId
        data['JunkGoodsMetricId'] = listingViolations[0].children[0].metricId// 垃圾商品的MetricId
        data['CounterfeitGoodsMetricId'] = listingViolations[0].children[1].metricId// 仿冒品或者侵权的MetricIdd
        data['ProhibitedGoodsMetricId'] = listingViolations[0].children[2].metricId// 违禁商品的MetricId
        data['PreOrderedGoodsRateMetricId'] = listingViolations[1].metricId// 预购商品的 %的MetricId
        data['PreOrderedOverTargetMetricId'] = listingViolations[1].children[0].metricId// 预购商品的天数%超过目标的MetricId
        data['OtherViolatingGoodsMetricId'] = listingViolations[2].metricId// 违反其它上架规范的MetricId
        data['ChatResponseMetricId'] = customerService[0].metricId//  聊天回应的MetricId
        data['ResponseSpeedMetricId'] = customerService[1].metricId// 回应速度的MetricId
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
