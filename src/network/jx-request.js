/*
 * @Author: your name
 * @Date: 2021-10-08 14:16:18
 * @LastEditTime: 2021-10-13 17:52:43
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \shopeeman-new\src\network\jx-request.js
 */
import axios from 'axios'
import jxAdapter from './jx-apdater'
import tbAdaptert from './gateway/gateway-adapter'
const AppRequest = axios.create({ // 壳内转发请求
  baseURL: process.env.VUE_APP_BASE_API,
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const ycjRequest = axios.create({ // 云采集请求
  baseURL: 'http://129.204.71.240',
  timeout: 5000,
  withCredentials: true,
  adapter: config => {
    return tbAdaptert(config)
  }
})
const otherRequest = axios.create({ // 第三方请求
  timeout: 5000,
  headers: {
    'User-Agent':
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
export default {
  AppRequest, // 对接第三方请求
  ycjRequest, // 对接云采集请求
  otherRequest, // 对接第三方请求

  // 请按照一下格式填写
  // 2021-09-24
  // weTbUploadGetHeaders: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadGetHeaders', data), // 上传淘宝图片（由爬虫组提供）
  // weTbUploadPostResult: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadPostResult', data) // 上报淘宝图片（由爬虫组提供）

  // 2020-10-09
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析
  //个人中心 -> 软件财务中心
  getTransType: (data) => AppRequest.get('/user/transType', {data}),  //获取账单交易类型
  getAccountAmount: (data) => AppRequest.get('/user/accountAmount', {data}), //查询用户账号余额
  getAccountAmountDetailList: (data) => AppRequest.post('/user/accountAmountDetailList', data), //查询用户账号余额
  getTranslateDetail: (data) => AppRequest.get('/translate/getTranslateDetail', {params: data}), //获取翻译明细数据
  getChargeUrlV2: (data) => AppRequest.get('/emptyBag/chargeUrlV2', {params: data}), //充值
  getTranslateAmount: (data) => AppRequest.get('/translate/getTranslateAmount', {params: data}), //获取今日翻译费用
  
  //个人中心 -> 账单核算
  getOrderStatisticsList: (data) => AppRequest.get('/orderStatistics/index', {params: data}), //账单核算：列表

 
  
  
}
