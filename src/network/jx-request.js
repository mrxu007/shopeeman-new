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
  headers: {
    'Accept': 'application/vnd.ppxias.v3+json'
  },
  withCredentials: true,
  adapter: config => {
    return jxAdapter(config)
  }
})
const AppRequest2 = axios.create({ // 壳内转发请求
  baseURL: 'http://local.spm.com',
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
      'Mozilla/5.0 (Windows NT 6.2; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/79.0.3945.130 Safari/537.36',
    'Accept': 'application/vnd.ppxias.v3+json'
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

  // 2021-10-09
  getMallDataStatistics: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 获取数据分析

  // 2021-10-11
  // 软件财务中心---个人中心
  getTransType: (data) => AppRequest.get('/user/transType', { data }), // 获取账单交易类型
  getAccountAmount: (data) => AppRequest.get('/user/accountAmount', { data }), // 查询用户账号余额
  getAccountAmountDetailList: (data) => AppRequest.post('/user/accountAmountDetailList', data), // 查询用户账号余额
  getTranslateDetail: (data) => AppRequest.get('/translate/getTranslateDetail', { params: data }), // 获取翻译明细数据
  getChargeUrlV2: (data) => AppRequest.get('/emptyBag/chargeUrlV2', { params: data }), // 充值
  getTranslateAmount: (data) => AppRequest.get('/translate/getTranslateAmount', { params: data }), // 获取今日翻译费用

  // 账单核算---个人中心
  getOrderStatisticsList: (data) => AppRequest.get('/orderStatistics/index', { params: data }), // 账单核算：列表
  getChildUserList: (data) => AppRequest.post('/user/childUserList', data), // 团队管理-查询子账号列表
  userRoleList: (data) => AppRequest.get('/user/userRoleList', data), // 团队管理-获取子账号角色类型
  saveChildUsers: (data) => AppRequest.post('/user/saveChildUsers', data), // 团队管理-新增子账号列表
  deleteChildUser: (data) => AppRequest.post('/user/deleteChildUser', data), // 团队管理-删除子账号
  editChildUsers: (data) => AppRequest.post('/user/editChildUserDatas', data), // 团队管理-修改子账号信息
  getBindMallCount: (data) => AppRequest.get('/mallGroup/bindMallCount', { params: data }), // 团队管理-获取店铺分组
  getIPTrustList: (data) => AppRequest.get('/getIPTrustList', { params: data }), // 信任IP-获取列表
  updateTrustedIP: (data) => AppRequest.post('/updateTrustedIP', data), // 信任IP-更新用户的IP信任列表
  deleteTrustedIP: (data) => AppRequest.post('/deleteTrustedIP', data), // 信任IP-删除用户的IP信任
  setIpCheck: (data) => AppRequest.post('/user/setIpCheck', data), // 信任IP-设置信任IP是否开启
  getPhoneLists: (data) => AppRequest.get('/user/getPhoneLists', data), // 信任IP-获取手机号码列表
  updatePhoneListForIp: (data) => AppRequest.post('/user/updatePhoneListForIp', data), // 信任IP-配置接收手机验证码的手机号
  // 数据统计
  getDrderBasicStatV2: (data) => AppRequest.post('/mallDataStatistics/orderBasicStatV2', data), // 数据统计获取订单列表数据
  getDataStat: (data) => AppRequest.post('/mallDataStatistics/dataStat', data), // 数据统计图表数据

  // 2021-10-14
  // 店铺管理
  ddMallGoodsGetMallList: (data) => AppRequest.get('/ddMallGoods/getMallList', data), // 联动站点分组获取店铺列表
  mallGroupIndex: (data) => AppRequest.get('/mallGroup/index', { params: data }), // 获取店铺分组列表
  getMallList: (data) => AppRequest.get('/bindMall/mallList', { params: data }), // 获取店铺列表
  updateWatermark: (data) => AppRequest.post('/bindMall/updateWatermark', data), // 修改店铺水印
  updateUserPassword: (data) => AppRequest.post('/bindMall/uploadUserPassword', data), // 修改账户登录密码
  uploadMallCookie: (data) => AppRequest.post('/bindMall/uploadWebLoginInfo', data), // 上报店铺cookie

  // 异常公告
  getExceptionNoOrderIndex: (data) => AppRequest.get('/exceptionNoOrderIndex', { params: data }), // 异常公告签收包裹异常列表
  markPackageToMy: (data) => AppRequest.post('/signPackage/markPackageToMy', data), // 异常公告签收包裹异常：标记为我的
  apply: (data) => AppRequest.post('/packageReturn/apply', data), // 异常公告签收包裹异常：申请退件
  getExceptionNoTrackingNumberIndex: (data) => AppRequest.get('/exceptionNoTrackingNumberIndex', { params: data }), // 异常公告待获取物流单号订单列表
  updateOrderTrackingNumber: (data) => AppRequest.post('/order/updateOrderTrackingNumber', data), // 异常公告待获取物流订单添加采购物流单号
  getExceptionExpiredOrderIndex: (data) => AppRequest.get('/exceptionExpiredOrderIndex', { params: data }), // 异常公告即将过期订单列表
  getExceptionWarehouse: (data) => AppRequest.get('/exceptionWarehouse', { params: data }), // 异常公告仓库异常信息列表
  uploadDealExceptionStatus: (data) => AppRequest.post('/uploadDealExceptionStatus', data), // 异常公告仓库异常处理状态上报

  // 2021-10-18
  // 店铺管理
  getMallManagerStoreMainManagementList: (data) => AppRequest.get('/yunip/api/myiplist', { params: data }), // 店铺主体管理列表
  getPaymentList: (data) => AppRequest2.post('/api/mallAccountBill', data), // 货款对账列表
  getMallSite: (data) => AppRequest2.get('/api/ddMallGoods/getMallList', { params: data }), // 店铺站点信息
  exchangeRateList: (data) => AppRequest2.get('/api/exchangeRateList', { params: data }), // 获取汇率
  updateMallInfo: (data) => AppRequest2.post('/api/bindMall/updateMallInfo', { params: data }) // 同步信息

}
