<template>
  <div>
    <el-button type="primary" size="mini">获取数据</el-button>
  </div>
</template>

<script>
const data1 = { 'mallDatas': '', 'sysMallId': 35, 'violationScore': 0, 'orderServiceIndicators': { 'buyer_satisfaction': 3900000, 'non_performance_rate': null, 'cancel_rate': null, 'return_rate': null, 'delay_rate': null, 'ready_time': null, 'serious_listing_violations': 0, 'email_num': 0, 'knowledge_Protect': 0, 'lawless_goods': 0, 'pre_order_list': 30, 'violation_days': 30, 'other_error': 0, 'response_speed': 570000, 'response_time': null, 'buyer_satisfaction_last': 3900000, 'non_performance_rate_last': null, 'cancel_rate_last': null, 'return_rate_last': null, 'delay_rate_last': null, 'ready_time_last': null, 'serious_listing_violations_last': null, 'email_num_last': null, 'knowledge_Protect_last': null, 'lawless_goods_last': null, 'pre_order_list_last': 30, 'violation_days_last': 30, 'other_error_last': null, 'response_speed_last': null, 'response_time_last': null, 'MallName': 'bibbyrunp1907', 'MallId': '227067897', 'SiteStr': 'TH', 'Site': 'TH' }}

export default {
  mounted() {
    this.getMallDataStatistics()
  },
  methods: {
    async getMallDataStatistics() {
      const res = await this.$api.getMallDataStatistics({ 'sysMallIds': '424,6448,6466,6676,24057,27681,108591,195471,232877,352204,355973,355991,356024,649527,649578,649644,649656,649740,649746,649747,716742,716743,716757,716760,716765,897750', 'days': '7' })
      debugger
    }
  }
}
</script>

<style>
</style>
