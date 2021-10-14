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
  ycjRequest, // 对接本地请求
  otherRequest, // 对接云采集请求

  // 请按照一下格式填写
  // 2021-09-24
  // weTbUploadGetHeaders: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadGetHeaders', data), // 上传淘宝图片（由爬虫组提供）
  // weTbUploadPostResult: (data) => tbRequest.post('/ycj/api/v2/taobao/tbX5/weTbUploadPostResult', data) // 上报淘宝图片（由爬虫组提供）

  // 2020-10-09
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析
  getDrderBasicStatV2: (data) => AppRequest.post('/mallDataStatistics/orderBasicStatV2', data), // 数据统计获取订单列表数据
  getDataStat: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 数据统计图表数据
  getExceptionNoOrderIndex: (data) => AppRequest.get('/exceptionNoOrderIndex', { params: data }), // 异常公告签收包裹异常列表
  markPackageToMy: (data) => AppRequest.post('/signPackage/markPackageToMy', data), // 异常公告签收包裹异常：标记为我的
  apply: (data) => AppRequest.post('/packageReturn/apply', data), // 异常公告签收包裹异常：申请退件

  getExceptionNoTrackingNumberIndex: (data) => AppRequest.get('/exceptionNoTrackingNumberIndex', { params: data }), // 异常公告待获取物流单号订单列表
  updateOrderTrackingNumber: (data) => AppRequest.post('/order/updateOrderTrackingNumber', data), // 异常公告待获取物流订单添加采购物流单号

  getExceptionExpiredOrderIndex: (data) => AppRequest.get('/exceptionExpiredOrderIndex', { params: data }), // 异常公告即将过期订单列表

  getExceptionWarehouse: (data) => AppRequest.get('/exceptionWarehouse', { params: data }), // 异常公告仓库异常信息列表
  uploadDealExceptionStatus: (data) => AppRequest.post('/uploadDealExceptionStatus', data) // 异常公告仓库异常处理状态上报
}
